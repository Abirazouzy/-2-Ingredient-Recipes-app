import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, CheckCircle2, Plus, Minus, Volume2 } from 'lucide-react';
import { playTimerCompletionChime, playTickChime } from '../utils/audio';
import { MASCOT_IMAGES } from '../assets/mascot';

interface KitchenTimerProps {
  initialMinutes?: number;
  recipeTitle?: string;
  onClose?: () => void;
}

export const KitchenTimer: React.FC<KitchenTimerProps> = ({
  initialMinutes = 5,
  recipeTitle,
  onClose,
}) => {
  const [totalSeconds, setTotalSeconds] = useState(Math.min(initialMinutes * 60, 600)); // cap at 10 min
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update if initialMinutes changes
  useEffect(() => {
    const s = Math.min(initialMinutes * 60, 600);
    setTotalSeconds(s);
    setRemainingSeconds(s);
    setIsRunning(false);
    setIsCompleted(false);
  }, [initialMinutes]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setIsCompleted(true);
            playTimerCompletionChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const toggleRun = () => {
    if (isCompleted) {
      // restart
      setRemainingSeconds(totalSeconds);
      setIsCompleted(false);
      setIsRunning(true);
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setRemainingSeconds(totalSeconds);
  };

  const adjustMinutes = (deltaMins: number) => {
    const nextTotal = Math.max(60, Math.min(600, totalSeconds + deltaMins * 60));
    setTotalSeconds(nextTotal);
    setRemainingSeconds(nextTotal);
    setIsCompleted(false);
  };

  const setPreset = (mins: number) => {
    const s = mins * 60;
    setTotalSeconds(s);
    setRemainingSeconds(s);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;

  return (
    <div className="bg-gradient-to-b from-[#FFFDF5] to-[#F0F9FF] border border-sky-200 rounded-3xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Chef Pip's &lt;10 Min Cooking Timer
            </h4>
            {recipeTitle && (
              <p className="text-xs text-slate-500 line-clamp-1">{recipeTitle}</p>
            )}
          </div>
        </div>

        {/* Test sound button */}
        <button
          onClick={() => playTimerCompletionChime()}
          className="text-xs text-sky-700 hover:text-sky-900 p-1.5 rounded-lg hover:bg-sky-100 flex items-center gap-1 cursor-pointer"
          title="Test chime sound"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Chime</span>
        </button>
      </div>

      {/* Timer Display & Animation */}
      {isCompleted ? (
        <div className="py-4 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md mb-3 bg-amber-50">
            <img
              src={MASCOT_IMAGES.cooking}
              alt="Chef Pip Happy"
              className="w-full h-full object-cover animate-bounce"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Ding! Deliciousness is ready!</span>
          </div>
          <p className="text-xs text-slate-600">
            Under 10 minutes and hot to enjoy! Grab a fork!
          </p>
        </div>
      ) : (
        <div className="py-2 flex flex-col items-center justify-center">
          {/* Main Time Counter */}
          <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 tabular-nums">
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </div>
          <span className="text-xs font-medium text-slate-500 mt-1">
            {isRunning ? 'Chef Pip is timing your stove...' : 'Ready to start'}
          </span>

          {/* Progress bar */}
          <div className="w-full bg-sky-100 rounded-full h-2.5 mt-4 overflow-hidden">
            <div
              className="bg-amber-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Preset Quick Chips */}
      {!isRunning && !isCompleted && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-[11px] text-slate-500 font-medium mr-1">Quick:</span>
          {[2, 3, 5, 8, 10].map((m) => (
            <button
              key={m}
              onClick={() => setPreset(m)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                totalSeconds === m * 60
                  ? 'bg-sky-300 text-sky-950 border border-sky-400'
                  : 'bg-white text-slate-700 hover:bg-sky-50 border border-sky-100'
              }`}
            >
              {m}m
            </button>
          ))}
        </div>
      )}

      {/* Action Controls */}
      <div className="mt-5 flex items-center justify-center gap-3">
        {!isRunning && !isCompleted && (
          <button
            onClick={() => adjustMinutes(-1)}
            disabled={totalSeconds <= 60}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 disabled:opacity-40 cursor-pointer"
            title="Minus 1 minute"
          >
            <Minus className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={toggleRun}
          className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer ${
            isRunning
              ? 'bg-amber-200 hover:bg-amber-300 text-amber-950 border border-amber-300'
              : isCompleted
              ? 'bg-sky-300 hover:bg-sky-400 text-sky-950 border border-sky-400'
              : 'bg-sky-300 hover:bg-sky-400 text-sky-950 border border-sky-400'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </>
          ) : isCompleted ? (
            <>
              <RotateCcw className="w-4 h-4" />
              <span>Cook Again</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Start Timer</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 cursor-pointer"
          title="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {!isRunning && !isCompleted && (
          <button
            onClick={() => adjustMinutes(1)}
            disabled={totalSeconds >= 600}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 disabled:opacity-40 cursor-pointer"
            title="Add 1 minute"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
