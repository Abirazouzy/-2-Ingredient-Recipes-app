import React, { useState } from 'react';
import { X, Clock, Flame, Bookmark, Sparkles, Check, CheckCircle2, Share2, Users, Utensils, Heart } from 'lucide-react';
import { Recipe } from '../types';
import { KitchenTimer } from './KitchenTimer';
import { MASCOT_IMAGES } from '../assets/mascot';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  if (!recipe) return null;

  const toggleIngredientCheck = (key: string) => {
    setCheckedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleStepCheck = (index: number) => {
    setCheckedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const formatAmount = (baseAmount: number, multiplier: number) => {
    const total = baseAmount * multiplier;
    // Format nicely like 1/2, 1/3 or clean decimals
    if (Math.abs(total - 0.33) < 0.05) return '1/3';
    if (Math.abs(total - 0.5) < 0.01) return '1/2';
    if (Math.abs(total - 0.75) < 0.01) return '3/4';
    if (Math.abs(total - 0.25) < 0.01) return '1/4';
    if (Number.isInteger(total)) return total.toString();
    return total.toFixed(1);
  };

  const handleShare = () => {
    const text = `🍽️ ${recipe.title} (Ready in ${recipe.totalTimeMinutes} mins with only 2 ingredients!)\n` +
      `1. ${recipe.ingredient1.name} (${recipe.ingredient1.amount} ${recipe.ingredient1.unit})\n` +
      `2. ${recipe.ingredient2.name} (${recipe.ingredient2.amount} ${recipe.ingredient2.unit})\n` +
      `Chef Pip says: "${recipe.bunnyChefTip}"`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-[#FFFDF7] rounded-3xl border-2 border-sky-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar with Buttermilk / Babyblue styling */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#FEFCE8] via-[#FFFDF5] to-[#E0F2FE] border-b border-sky-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-200/80 text-amber-950 border border-amber-300">
                {recipe.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white/80 px-2.5 py-0.5 rounded-md border border-slate-200">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                {recipe.method}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-950 bg-sky-200/90 px-2.5 py-0.5 rounded-full border border-sky-300">
                <Clock className="w-3.5 h-3.5 text-sky-800" />
                Ready in {recipe.totalTimeMinutes} minutes
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {recipe.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {recipe.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={(e) => onToggleFavorite(e, recipe.id)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isFavorite 
                  ? 'text-amber-500 bg-amber-100 hover:bg-amber-200' 
                  : 'text-slate-400 hover:text-slate-600 bg-white border border-slate-200'
              }`}
              title={isFavorite ? 'Saved' : 'Save recipe'}
            >
              <Bookmark className={`w-5 h-5 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-sky-700 bg-white border border-slate-200 hover:bg-sky-50 transition-colors cursor-pointer"
              title="Copy recipe"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Servings Scaler */}
          <div className="flex items-center justify-between p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-2xl">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-800" />
              <span className="text-xs font-bold text-amber-950">Scale Servings:</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 4].map((mult) => (
                <button
                  key={mult}
                  onClick={() => setServingsMultiplier(mult)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    servingsMultiplier === mult
                      ? 'bg-amber-300 text-amber-950 shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200/80'
                  }`}
                >
                  {mult * recipe.servings} {mult * recipe.servings === 1 ? 'serving' : 'servings'}
                </button>
              ))}
            </div>
          </div>

          {/* The 2 Core Ingredients Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-sky-600" />
                <span>The 2 Core Ingredients</span>
              </h3>
              <span className="text-xs text-slate-500">Tap to check off</span>
            </div>

            <div className="space-y-2.5">
              {/* Ingredient 1 */}
              <div 
                onClick={() => toggleIngredientCheck('ing1')}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  checkedIngredients['ing1']
                    ? 'bg-emerald-50/60 border-emerald-200 text-slate-400 line-through'
                    : 'bg-white border-sky-100 hover:border-sky-200 text-slate-800 shadow-3xs'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 transition-colors ${
                  checkedIngredients['ing1']
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-300 bg-white'
                }`}>
                  {checkedIngredients['ing1'] && <Check className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      {recipe.ingredient1.name}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100/80 text-amber-900">
                      {formatAmount(recipe.ingredient1.amount, servingsMultiplier)} {recipe.ingredient1.unit}
                    </span>
                  </div>
                  {recipe.ingredient1.notes && (
                    <p className="text-xs text-slate-500 mt-0.5">{recipe.ingredient1.notes}</p>
                  )}
                </div>
              </div>

              {/* Ingredient 2 */}
              <div 
                onClick={() => toggleIngredientCheck('ing2')}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  checkedIngredients['ing2']
                    ? 'bg-emerald-50/60 border-emerald-200 text-slate-400 line-through'
                    : 'bg-white border-sky-100 hover:border-sky-200 text-slate-800 shadow-3xs'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 transition-colors ${
                  checkedIngredients['ing2']
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-300 bg-white'
                }`}>
                  {checkedIngredients['ing2'] && <Check className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      {recipe.ingredient2.name}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-100/80 text-sky-900">
                      {formatAmount(recipe.ingredient2.amount, servingsMultiplier)} {recipe.ingredient2.unit}
                    </span>
                  </div>
                  {recipe.ingredient2.notes && (
                    <p className="text-xs text-slate-500 mt-0.5">{recipe.ingredient2.notes}</p>
                  )}
                </div>
              </div>
            </div>

            {recipe.optionalPantryBonus && (
              <div className="mt-2.5 p-3 rounded-xl bg-amber-50/50 border border-dashed border-amber-200 text-xs text-slate-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>Optional pantry pinch:</strong> {recipe.optionalPantryBonus}
                </span>
              </div>
            )}
          </div>

          {/* Chef Pip's Secret Bunny Tip Card */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#FEFCE8] to-[#F0F9FF] border border-sky-200 p-4 sm:p-5 flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-sky-100 border-2 border-white shadow-2xs flex-shrink-0">
              <img
                src={MASCOT_IMAGES.cooking}
                alt="Chef Pip Mascot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xs font-extrabold text-sky-950 uppercase tracking-wider">
                  Chef Pip's Master Advice
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                "{recipe.bunnyChefTip}"
              </p>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Quick Method ({recipe.steps.length} Steps)</span>
              <span className="text-xs text-slate-500 lowercase font-medium">
                Prep: {recipe.prepTimeMinutes}m • Cook: {recipe.cookTimeMinutes}m
              </span>
            </h3>

            <div className="space-y-3">
              {recipe.steps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleStepCheck(idx)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    checkedSteps[idx]
                      ? 'bg-slate-50/80 border-slate-200 text-slate-400 line-through'
                      : 'bg-white border-sky-100 hover:border-sky-200 text-slate-800 shadow-3xs'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    checkedSteps[idx]
                      ? 'bg-emerald-500 text-white'
                      : 'bg-sky-100 text-sky-900 border border-sky-200'
                  }`}>
                    {checkedSteps[idx] ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed flex-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Cooking Timer */}
          <div>
            <KitchenTimer
              initialMinutes={recipe.cookTimeMinutes || recipe.totalTimeMinutes}
              recipeTitle={recipe.title}
            />
          </div>

          {/* Nutrition Facts Snapshot */}
          <div className="p-4 bg-white rounded-2xl border border-sky-100">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              Nutrition Snapshot (Per Serving)
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                <span className="block text-xs text-slate-500">Calories</span>
                <span className="text-sm font-bold text-slate-900">{recipe.nutrition.calories}</span>
              </div>
              <div className="p-2 rounded-xl bg-sky-50/60 border border-sky-100">
                <span className="block text-xs text-slate-500">Protein</span>
                <span className="text-sm font-bold text-slate-900">{recipe.nutrition.protein}</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                <span className="block text-xs text-slate-500">Carbs</span>
                <span className="text-sm font-bold text-slate-900">{recipe.nutrition.carbs}</span>
              </div>
              <div className="p-2 rounded-xl bg-sky-50/60 border border-sky-100">
                <span className="block text-xs text-slate-500">Fat</span>
                <span className="text-sm font-bold text-slate-900">{recipe.nutrition.fat}</span>
              </div>
            </div>
            {recipe.nutrition.highlight && (
              <p className="mt-2 text-center text-[11px] text-sky-800 font-medium">
                ✨ {recipe.nutrition.highlight}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
