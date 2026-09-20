import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Sparkles, Clock, Flame, Utensils, RotateCcw, Shuffle, Bookmark, ChefHat } from 'lucide-react';
import { Recipe, RecipeCategory } from './types';
import { INITIAL_RECIPES } from './data/recipes';
import { Header } from './components/Header';
import { RabbitMascotBanner } from './components/RabbitMascotBanner';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { PantryLabModal } from './components/PantryLabModal';
import { FavoritesView } from './components/FavoritesView';
import { MASCOT_IMAGES } from './assets/mascot';

const CATEGORY_TABS: { id: RecipeCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All Recipes', icon: '🍽️' },
  { id: 'under5', label: 'Under 5 Mins', icon: '⚡' },
  { id: 'sweet', label: 'Sweet & Treats', icon: '🍰' },
  { id: 'savory', label: 'Savory & Cheesy', icon: '🧀' },
  { id: 'breakfast', label: 'Fast Breakfast', icon: '🥞' },
  { id: 'drink', label: 'Drinks & Shakes', icon: '🥤' },
];

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem('pip_custom_recipes');
      if (saved) {
        const custom = JSON.parse(saved);
        return [...custom, ...INITIAL_RECIPES];
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_RECIPES;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pip_favorite_ids');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['banana-pancakes', 'nutella-mug-cake']; // starter favorites
  });

  const [activeTab, setActiveTab] = useState<'browse' | 'favorites'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [maxMinutes, setMaxMinutes] = useState<number>(10);

  // Modals
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isPantryLabOpen, setIsPantryLabOpen] = useState(false);

  // Sync favorites to local storage
  useEffect(() => {
    try {
      localStorage.setItem('pip_favorite_ids', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRecipeCreated = (newRecipe: Recipe) => {
    setRecipes((prev) => [newRecipe, ...prev]);
    try {
      const customOnly = [newRecipe, ...recipes.filter((r) => r.isCustom)];
      localStorage.setItem('pip_custom_recipes', JSON.stringify(customOnly));
    } catch (e) {
      console.error(e);
    }
    setSelectedRecipe(newRecipe);
  };

  const handleSurpriseMe = () => {
    const pool = recipes.filter((r) => r.totalTimeMinutes <= 8);
    const randomPick = pool[Math.floor(Math.random() * pool.length)];
    if (randomPick) {
      setSelectedRecipe(randomPick);
    }
  };

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      // Time filter (strictly <= 10)
      if (r.totalTimeMinutes > maxMinutes) return false;

      // Category tab filter
      if (selectedCategory === 'under5' && r.totalTimeMinutes > 5) return false;
      if (selectedCategory !== 'all' && selectedCategory !== 'under5' && r.category !== selectedCategory) {
        return false;
      }

      // Method filter
      if (selectedMethod !== 'all' && r.method !== selectedMethod) {
        return false;
      }

      // Search query (matches title, subtitle, ingredients)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesSubtitle = r.subtitle.toLowerCase().includes(q);
        const matchesIng1 = r.ingredient1.name.toLowerCase().includes(q);
        const matchesIng2 = r.ingredient2.name.toLowerCase().includes(q);
        const matchesTags = r.tags.some((t) => t.toLowerCase().includes(q));
        return matchesTitle || matchesSubtitle || matchesIng1 || matchesIng2 || matchesTags;
      }

      return true;
    });
  }, [recipes, selectedCategory, selectedMethod, maxMinutes, searchQuery]);

  const favoriteRecipesList = useMemo(() => {
    return recipes.filter((r) => favorites.includes(r.id));
  }, [recipes, favorites]);

  return (
    <div className="min-h-screen bg-[#FEFDF8] text-slate-900 flex flex-col antialiased selection:bg-sky-200 selection:text-sky-900">
      {/* Top Header */}
      <Header
        onOpenPantryLab={() => setIsPantryLabOpen(true)}
        onSurpriseMe={handleSurpriseMe}
        onOpenFavorites={() => setActiveTab(activeTab === 'favorites' ? 'browse' : 'favorites')}
        favoritesCount={favorites.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-7">
        {activeTab === 'favorites' ? (
          <FavoritesView
            favoriteRecipes={favoriteRecipesList}
            onToggleFavorite={toggleFavorite}
            onSelectRecipe={setSelectedRecipe}
            onBackToBrowse={() => setActiveTab('browse')}
          />
        ) : (
          <>
            {/* Mascot Banner with Chef Pip */}
            <RabbitMascotBanner
              onOpenPantryLab={() => setIsPantryLabOpen(true)}
              onQuickFilter={(cat) => {
                setSelectedCategory(cat);
                setMaxMinutes(5);
              }}
            />

            {/* Search, Filter & Category Bar */}
            <div className="space-y-4">
              {/* Search & Quick Controls Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by ingredient (e.g. banana, nutella, egg, cheese) or dish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-sky-200/90 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-300 shadow-2xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Method selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 hidden md:inline">Method:</span>
                  <select
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="px-3 py-2.5 rounded-2xl bg-white border border-sky-200 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-sky-300 shadow-2xs cursor-pointer"
                  >
                    <option value="all">All Methods</option>
                    <option value="Skillet">🍳 Skillet</option>
                    <option value="Microwave">⚡ Microwave</option>
                    <option value="Air Fryer">♨️ Air Fryer</option>
                    <option value="Blender">🌪️ Blender</option>
                    <option value="No-Cook">🥣 No-Cook</option>
                  </select>

                  {/* Max Time Filter */}
                  <button
                    onClick={() => {
                      if (maxMinutes === 10) setMaxMinutes(5);
                      else if (maxMinutes === 5) setMaxMinutes(3);
                      else setMaxMinutes(10);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-2xs cursor-pointer ${
                      maxMinutes < 10
                        ? 'bg-amber-200 text-amber-950 border border-amber-300'
                        : 'bg-white text-slate-700 border border-sky-200 hover:bg-sky-50'
                    }`}
                    title="Click to toggle max cook time"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>&le; {maxMinutes} min</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {CATEGORY_TABS.map((tab) => {
                  const isActive = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setSelectedCategory(tab.id);
                        if (tab.id === 'under5') setMaxMinutes(5);
                      }}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-3xs cursor-pointer ${
                        isActive
                          ? 'bg-sky-200 text-sky-950 border-2 border-sky-300 shadow-2xs scale-102'
                          : 'bg-white hover:bg-sky-50 text-slate-700 border border-sky-100 hover:border-sky-200'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recipes Grid Header */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {filteredRecipes.length} Quick 2-Ingredient Recipes
                </h3>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  (strictly &le; {maxMinutes} minutes)
                </span>
              </div>

              {(searchQuery || selectedCategory !== 'all' || selectedMethod !== 'all' || maxMinutes !== 10) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedMethod('all');
                    setMaxMinutes(10);
                  }}
                  className="text-xs text-sky-800 hover:text-sky-950 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>

            {/* Recipes Grid */}
            {filteredRecipes.length === 0 ? (
              <div className="py-16 px-6 text-center bg-white rounded-3xl border-2 border-dashed border-sky-200">
                <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden bg-sky-50 border-2 border-sky-100 shadow-3xs mb-3">
                  <img
                    src={MASCOT_IMAGES.cooking}
                    alt="Chef Pip Mascot"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-base font-bold text-slate-800">
                  No recipes found with these filters
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Chef Pip couldn't spot that combo yet. Try clearing your search or ask Chef Pip in the Lab!
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedMethod('all');
                      setMaxMinutes(10);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 border border-amber-200 cursor-pointer"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => setIsPantryLabOpen(true)}
                    className="px-4 py-2 rounded-xl bg-sky-200 text-sky-950 text-xs font-bold hover:bg-sky-300 border border-sky-300 cursor-pointer"
                  >
                    Ask Chef Pip to Create It
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favorites.includes(recipe.id)}
                    onToggleFavorite={toggleFavorite}
                    onSelect={setSelectedRecipe}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Floating Surprise Button on Mobile */}
      <div className="md:hidden fixed bottom-5 right-5 z-20">
        <button
          onClick={handleSurpriseMe}
          className="p-3.5 rounded-full bg-amber-300 text-amber-950 shadow-lg border-2 border-white flex items-center justify-center active:scale-95 cursor-pointer"
          title="Pick random 2-ingredient recipe"
        >
          <Shuffle className="w-5 h-5" />
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gradient-to-t from-[#FFFDF0] to-transparent border-t border-sky-100/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-sky-100 border border-sky-200 shadow-2xs">
              <img
                src={MASCOT_IMAGES.main}
                alt="Chef Pip"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Pip's 2-Ingredient Kitchen
              </p>
              <p className="text-[11px] text-slate-500">
                Buttermilk & baby blue vibes • Ready in under ten minutes
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Crafted for rapid cravings • Every recipe strictly 2 ingredients
          </p>
        </div>
      </footer>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Pantry Lab Modal */}
      <PantryLabModal
        isOpen={isPantryLabOpen}
        onClose={() => setIsPantryLabOpen(false)}
        onRecipeCreated={handleRecipeCreated}
      />
    </div>
  );
}
