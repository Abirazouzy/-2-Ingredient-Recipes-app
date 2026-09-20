import React from 'react';
import { Sparkles, Bookmark, Shuffle, ChefHat, Clock } from 'lucide-react';
import { MASCOT_IMAGES } from '../assets/mascot';

interface HeaderProps {
  onOpenPantryLab: () => void;
  onSurpriseMe: () => void;
  onOpenFavorites: () => void;
  favoritesCount: number;
  activeTab: 'browse' | 'favorites';
  setActiveTab: (tab: 'browse' | 'favorites') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPantryLab,
  onSurpriseMe,
  onOpenFavorites,
  favoritesCount,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FFFDF5]/90 backdrop-blur-md border-b border-sky-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand with Rabbit Chef Mascot Icon */}
        <div 
          onClick={() => setActiveTab('browse')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-sky-100 border-2 border-sky-200 shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
            <img 
              src={MASCOT_IMAGES.main} 
              alt="Chef Pip the Rabbit"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-1.5">
                Pip's Kitchen
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200/80">
                <Clock className="w-3 h-3 text-amber-700" />
                &lt; 10 min
              </span>
            </div>
            <p className="text-xs text-slate-600 hidden sm:block">
              2 ingredients • delicious • under ten minutes
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Surprise Me / Random Pick */}
          <button
            onClick={onSurpriseMe}
            id="surprise-recipe-btn"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors shadow-2xs cursor-pointer active:scale-95"
            title="Pick a random recipe in under 10 minutes"
          >
            <Shuffle className="w-4 h-4 text-sky-600" />
            <span>Surprise Me</span>
          </button>

          {/* Pantry Lab Button */}
          <button
            onClick={onOpenPantryLab}
            id="pantry-lab-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-sky-950 bg-sky-200 hover:bg-sky-300 border border-sky-300/80 shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <ChefHat className="w-4 h-4 text-sky-800" />
            <span className="hidden xs:inline">Chef Pip's</span> Lab
            <span className="px-1.5 py-0.2 rounded-md bg-white/70 text-[10px] font-bold text-sky-800">
              AI
            </span>
          </button>

          {/* Favorites Toggle */}
          <button
            onClick={onOpenFavorites}
            id="favorites-toggle-btn"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-2xs cursor-pointer active:scale-95 ${
              activeTab === 'favorites'
                ? 'bg-amber-200 text-amber-950 border border-amber-300'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/80'
            }`}
          >
            <Bookmark className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">Saved</span>
            {favoritesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
