import React, { useState } from 'react';
import { X, Sparkles, ChefHat, ArrowRight, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { Recipe, PantryIngredient } from '../types';
import { PANTRY_QUICK_PICKS } from '../data/recipes';
import { MASCOT_IMAGES } from '../assets/mascot';

interface PantryLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecipeCreated: (recipe: Recipe) => void;
}

export const PantryLabModal: React.FC<PantryLabModalProps> = ({
  isOpen,
  onClose,
  onRecipeCreated,
}) => {
  const [ing1, setIng1] = useState('');
  const [ing2, setIng2] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePick = (item: PantryIngredient) => {
    if (!ing1) {
      setIng1(item.name);
    } else if (!ing2 && ing1 !== item.name) {
      setIng2(item.name);
    } else {
      // replace ing2
      setIng2(item.name);
    }
  };

  const handleClear = () => {
    setIng1('');
    setIng2('');
    setErrorMsg(null);
  };

  const handleCook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ing1.trim() || !ing2.trim()) {
      setErrorMsg('Please select or type both ingredients!');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      // Call server route
      const res = await fetch('/api/recipe-ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredient1: ing1.trim(),
          ingredient2: ing2.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.recipe) {
          const generated: Recipe = {
            id: `custom-${Date.now()}`,
            title: data.recipe.title || `${ing1} & ${ing2} Quick Bites`,
            subtitle: data.recipe.flavorProfile || `Whipped up by Chef Pip in ${data.recipe.totalTimeMinutes || 5} minutes`,
            category: (data.recipe.category?.toLowerCase() as any) || 'snack',
            totalTimeMinutes: Math.min(Number(data.recipe.totalTimeMinutes) || 6, 10),
            prepTimeMinutes: Math.min(Number(data.recipe.prepTimeMinutes) || 2, 4),
            cookTimeMinutes: Math.min(Number(data.recipe.cookTimeMinutes) || 4, 8),
            method: (data.recipe.method as any) || 'Skillet',
            ingredient1: {
              name: ing1.trim(),
              amount: 1,
              unit: data.recipe.ingredient1Details || 'portion',
            },
            ingredient2: {
              name: ing2.trim(),
              amount: 1,
              unit: data.recipe.ingredient2Details || 'portion',
            },
            optionalPantryBonus: data.recipe.optionalPantryPinch,
            servings: 1,
            steps: data.recipe.steps || [
              `Prepare ${ing1} and ${ing2}.`,
              `Combine and cook on medium heat or microwave for 3-4 minutes.`,
              `Serve immediately warm!`,
            ],
            bunnyChefTip: data.recipe.bunnyChefTip || 'Keep your heat moderate so the two ingredients fuse smoothly without scorching!',
            tags: ['Chef Pip AI', 'Custom 2-Ingredient', 'Under 10 Mins'],
            nutrition: {
              calories: parseInt(data.recipe.nutritionEstimate?.calories) || 220,
              protein: '8g',
              carbs: '22g',
              fat: '9g',
              highlight: data.recipe.nutritionEstimate?.highlight || 'Freshly made custom fast bite',
            },
            isCustom: true,
          };

          onRecipeCreated(generated);
          onClose();
          return;
        }
      }

      // Offline intelligent fallback recipe generator
      const fallbackRecipe: Recipe = {
        id: `custom-${Date.now()}`,
        title: `Chef Pip's ${ing1} & ${ing2} Gourmet Melt`,
        subtitle: `A warm 5-minute skillet creation marrying ${ing1} and ${ing2}`,
        category: 'savory',
        totalTimeMinutes: 5,
        prepTimeMinutes: 2,
        cookTimeMinutes: 3,
        method: 'Skillet',
        ingredient1: {
          name: ing1.trim(),
          amount: 1,
          unit: 'cup or portion',
          notes: 'freshly sliced or prepped',
        },
        ingredient2: {
          name: ing2.trim(),
          amount: 0.5,
          unit: 'cup or portion',
          notes: 'room temperature for quick melting',
        },
        optionalPantryBonus: 'Pinch of sea salt or black pepper',
        servings: 1,
        steps: [
          `Gently prep and portion your ${ing1} and ${ing2} on a clean cutting board.`,
          `Warm a small non-stick pan over medium heat with a light spray.`,
          `Add ${ing1} and layer ${ing2} directly on top so they meld together.`,
          `Cover with a small lid for 2.5 minutes to melt and caramelize evenly.`,
          `Slide onto a plate and enjoy piping hot in under 5 minutes!`,
        ],
        bunnyChefTip: `When pairing ${ing1} with ${ing2}, gentle heat is your best friend — it lets the flavors bloom together in record time!`,
        tags: ['Chef Pip Lab', '5-Minute Flash', 'Easy'],
        nutrition: {
          calories: 230,
          protein: '10g',
          carbs: '18g',
          fat: '11g',
          highlight: 'Quick satisfying comfort',
        },
        isCustom: true,
      };

      onRecipeCreated(fallbackRecipe);
      onClose();
    } catch (err: any) {
      setErrorMsg('Chef Pip is taking a breather. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-xl bg-[#FFFDF7] rounded-3xl border-2 border-sky-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#FEFCE8] to-[#E0F2FE] border-b border-sky-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-sky-100 border-2 border-white shadow-2xs flex-shrink-0">
              <img
                src={MASCOT_IMAGES.cooking}
                alt="Chef Pip Mascot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-1.5">
                Chef Pip's 2-Ingredient Lab
              </h3>
              <p className="text-xs text-slate-600">
                Pick or type any 2 ingredients — recipe ready in &lt;10 mins!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 2 Selected Ingredient Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border-2 border-amber-200/80">
              <span className="block text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1">
                Ingredient 1
              </span>
              <input
                type="text"
                placeholder="e.g. Banana, Nutella, Bread..."
                value={ing1}
                onChange={(e) => setIng1(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-amber-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50/70 border-2 border-sky-200/80">
              <span className="block text-[11px] font-bold text-sky-900 uppercase tracking-wider mb-1">
                Ingredient 2
              </span>
              <input
                type="text"
                placeholder="e.g. Egg, Cheese, Peanut Butter..."
                value={ing2}
                onChange={(e) => setIng2(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-sky-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
              />
            </div>
          </div>

          {/* Quick pantry pick chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Tap to quick-fill:
              </span>
              {(ing1 || ing2) && (
                <button
                  onClick={handleClear}
                  className="text-xs text-sky-700 hover:text-sky-900 font-medium cursor-pointer"
                >
                  Clear slots
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {PANTRY_QUICK_PICKS.map((item) => {
                const isSelected = ing1 === item.name || ing2 === item.name;
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePick(item)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-300 text-amber-950 border border-amber-400 shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-sky-100/70 border border-sky-100 hover:border-sky-200'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit CTA */}
          <button
            onClick={handleCook}
            disabled={loading || !ing1.trim() || !ing2.trim()}
            className="w-full py-3.5 px-6 rounded-2xl bg-sky-300 hover:bg-sky-400 disabled:opacity-50 text-sky-950 font-extrabold text-sm sm:text-base border border-sky-400/80 shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-sky-800" />
                <span>Chef Pip is whisking up your recipe...</span>
              </>
            ) : (
              <>
                <ChefHat className="w-5 h-5 text-sky-900" />
                <span>Chef Pip, Cook in &lt;10 Mins!</span>
                <ArrowRight className="w-4 h-4 text-sky-900" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
