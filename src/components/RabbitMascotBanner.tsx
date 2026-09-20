import React, { useState } from 'react';
import { Sparkles, Clock, Utensils, Lightbulb, RefreshCw } from 'lucide-react';
import { MASCOT_IMAGES } from '../assets/mascot';

interface RabbitMascotBannerProps {
  onOpenPantryLab: () => void;
  onQuickFilter: (category: 'under5') => void;
}

const CHEF_QUOTES = [
  "Hop into the kitchen! With only 2 ingredients, your prep is practically zero!",
  "Rule of Two: When simple flavors meet, every bite tastes twice as rich!",
  "Under ten minutes means you can satisfy any midnight craving before the kettle boils!",
  "Got random items in the fridge? Tell me 2 ingredients and I'll create a treat!",
  "Great cooking isn't about dozens of pots and pans — it's about two soulmate ingredients!"
];

export const RabbitMascotBanner: React.FC<RabbitMascotBannerProps> = ({
  onOpenPantryLab,
  onQuickFilter,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % CHEF_QUOTES.length);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FEFCE8] via-[#FFFDF5] to-[#F0F9FF] border-2 border-sky-100/90 shadow-sm p-5 sm:p-7">
      {/* Decorative subtle background accents */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-sky-200/30 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-amber-200/25 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Rabbit Chef Mascot Portrait with cute frame */}
        <div className="relative group flex-shrink-0">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden bg-sky-100/90 border-4 border-white shadow-md p-1.5 flex items-center justify-center">
            <img
              src={MASCOT_IMAGES.main}
              alt="Chef Pip the Rabbit"
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Badge */}
          <div className="absolute -bottom-2 -right-2 bg-amber-300 text-amber-950 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm border-2 border-white flex items-center gap-1">
            <span>Chef Pip</span>
          </div>
        </div>

        {/* Content & Speech Bubble */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-semibold mb-3 border border-sky-200/70">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Buttermilk & Baby Blue Kitchen</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800 leading-tight">
            Delicious 2-Ingredient Recipes in Under 10 Minutes
          </h2>

          {/* Pip's Quote Bubble */}
          <div className="mt-3.5 relative bg-white/90 border border-sky-100 rounded-2xl p-3.5 sm:p-4 text-slate-700 shadow-2xs">
            <div className="flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm font-medium leading-relaxed italic flex-1">
                "{CHEF_QUOTES[quoteIndex]}"
              </p>
              <button
                onClick={nextQuote}
                title="Next chef tip"
                className="text-slate-400 hover:text-sky-600 p-1 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={onOpenPantryLab}
              id="banner-pantry-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-sky-950 bg-sky-300 hover:bg-sky-400 border border-sky-400/50 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Utensils className="w-4 h-4 text-sky-900" />
              <span>Ask Pip to Match 2 Ingredients</span>
            </button>

            <button
              onClick={() => onQuickFilter('under5')}
              id="banner-flash-recipes-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300/80 shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-amber-700" />
              <span>⚡ Under 5-Minute Flash Eats</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
