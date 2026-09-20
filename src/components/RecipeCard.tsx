import React from 'react';
import { Clock, Flame, Bookmark, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
  onSelect: (recipe: Recipe) => void;
}

const CATEGORY_COLORS: Record<Recipe['category'], { bg: string; text: string; border: string }> = {
  sweet: { bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-200' },
  savory: { bg: 'bg-sky-100', text: 'text-sky-900', border: 'border-sky-200' },
  breakfast: { bg: 'bg-orange-100', text: 'text-orange-900', border: 'border-orange-200' },
  drink: { bg: 'bg-teal-100', text: 'text-teal-900', border: 'border-teal-200' },
};

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  const catStyle = CATEGORY_COLORS[recipe.category] || CATEGORY_COLORS.sweet;

  return (
    <div
      onClick={() => onSelect(recipe)}
      className="group relative bg-[#FFFDF7] hover:bg-white rounded-2xl border border-sky-100 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Header Row */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${catStyle.bg} ${catStyle.text} border ${catStyle.border}`}>
              {recipe.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-md">
              <Flame className="w-3 h-3 text-amber-500" />
              {recipe.method}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Time badge */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
              <Clock className="w-3 h-3 text-amber-600" />
              {recipe.totalTimeMinutes} min
            </span>

            {/* Favorite button */}
            <button
              onClick={(e) => onToggleFavorite(e, recipe.id)}
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                isFavorite 
                  ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title={isFavorite ? 'Remove from saved' : 'Save recipe'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-900 transition-colors line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
          {recipe.subtitle}
        </p>
      </div>

      {/* The 2 Core Ingredients Section */}
      <div className="px-5 py-3.5 bg-gradient-to-b from-[#FEFCE8]/40 to-[#F0F9FF]/50 border-y border-sky-50">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          <span>2 Main Ingredients</span>
          <span className="text-amber-700 lowercase font-medium">zero fuss</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 bg-white/90 border border-amber-100/90 rounded-xl px-3 py-1.5 text-xs text-slate-800 shadow-3xs">
            <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
              1
            </span>
            <span className="font-semibold truncate">{recipe.ingredient1.name}</span>
            <span className="text-[11px] text-slate-500 ml-auto flex-shrink-0">
              {recipe.ingredient1.amount} {recipe.ingredient1.unit}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/90 border border-sky-100/90 rounded-xl px-3 py-1.5 text-xs text-slate-800 shadow-3xs">
            <span className="w-4 h-4 rounded-full bg-sky-200 text-sky-900 text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
              2
            </span>
            <span className="font-semibold truncate">{recipe.ingredient2.name}</span>
            <span className="text-[11px] text-slate-500 ml-auto flex-shrink-0">
              {recipe.ingredient2.amount} {recipe.ingredient2.unit}
            </span>
          </div>
        </div>

        {recipe.optionalPantryBonus && (
          <p className="mt-2 text-[11px] text-slate-500 italic flex items-center gap-1 truncate">
            <Sparkles className="w-3 h-3 text-amber-500 flex-shrink-0" />
            <span>Bonus pinch: {recipe.optionalPantryBonus}</span>
          </p>
        )}
      </div>

      {/* Footer with Chef Pip Tip snippet & View Action */}
      <div className="p-5 pt-3 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-500">
          {recipe.nutrition.calories} kcal
        </span>

        <button 
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-sky-950 bg-sky-100 hover:bg-sky-200 group-hover:bg-sky-300 transition-colors cursor-pointer"
        >
          <span>Cook Recipe</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
