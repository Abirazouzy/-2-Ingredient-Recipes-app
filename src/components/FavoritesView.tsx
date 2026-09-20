import React from 'react';
import { Bookmark, Sparkles, Utensils, ArrowLeft } from 'lucide-react';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';
import { MASCOT_IMAGES } from '../assets/mascot';

interface FavoritesViewProps {
  favoriteRecipes: Recipe[];
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onBackToBrowse: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteRecipes,
  onToggleFavorite,
  onSelectRecipe,
  onBackToBrowse,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToBrowse}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 hover:text-sky-950 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All 2-Ingredient Recipes</span>
          </button>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-500 fill-amber-400" />
            <span>Saved 2-Ingredient Favorites ({favoriteRecipes.length})</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Your personal stash of fast treats ready in under 10 minutes.
          </p>
        </div>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div className="py-16 px-6 text-center bg-[#FFFDF7] rounded-3xl border-2 border-dashed border-sky-200">
          <div className="w-24 h-24 mx-auto rounded-3xl overflow-hidden bg-sky-100 border-4 border-white shadow-sm mb-4">
            <img
              src={MASCOT_IMAGES.main}
              alt="Chef Pip Mascot"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No saved recipes yet!
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-5">
            Click the little bookmark ribbon on any recipe card to save your favorite 2-ingredient wonders here.
          </p>
          <button
            onClick={onBackToBrowse}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-sky-950 bg-sky-300 hover:bg-sky-400 border border-sky-400/80 shadow-2xs cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>Browse 2-Ingredient Recipes</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectRecipe}
            />
          ))}
        </div>
      )}
    </div>
  );
};
