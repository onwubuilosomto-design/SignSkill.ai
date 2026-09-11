import React from "react";
import { Flame, Star, Award, ShieldCheck } from "lucide-react";

interface XpDisplayProps {
  xp: number;
  streak: number;
  currentLevelNumber?: number;
  compact?: boolean;
}

export const XpDisplay: React.FC<XpDisplayProps> = ({
  xp,
  streak,
  currentLevelNumber = 1,
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div 
          id="compact-xp-badge"
          className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs"
        >
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>{xp} XP</span>
        </div>
        <div 
          id="compact-streak-badge"
          className="flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-900 px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs"
        >
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
          <span>{streak}d</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      {/* XP Badge */}
      <div
        id="training-xp-badge"
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold shadow-xs transition-transform hover:scale-102 cursor-default bg-amber-50 border-l-4 border-amber-400 text-amber-900"
        title="Experience points earned through customer-service training"
      >
        <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
        <span>⭐ {xp} XP</span>
      </div>

      {/* Streak Badge */}
      <div
        id="training-streak-badge"
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold shadow-xs transition-transform hover:scale-102 cursor-default bg-orange-50 border-l-4 border-orange-500 text-orange-900"
        title="Consecutive daily customer service practice streak"
      >
        <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
        <span>🔥 {streak} day streak</span>
      </div>

      {/* Level Badge */}
      <div
        id="training-level-badge"
        className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold shadow-xs transition-transform hover:scale-102 cursor-default bg-blue-50 border-l-4 border-blue-500 text-blue-900"
        title="Current Training Level"
      >
        <Award className="w-4 h-4 text-blue-600" />
        <span>Level {currentLevelNumber}</span>
      </div>
    </div>
  );
};
