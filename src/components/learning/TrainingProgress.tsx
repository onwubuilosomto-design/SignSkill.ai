import React from "react";
import { XpDisplay } from "./XpDisplay";
import { ArrowRight, CheckCircle2, Trophy, Compass, Sparkles } from "lucide-react";
import { Level } from "../../types/training";

interface TrainingProgressProps {
  currentLevel: Level;
  totalLevels: number;
  completedLessonCount: number;
  totalLessonCount: number;
  levelProgressPercent: number;
  xp: number;
  streak: number;
  nextUpLessonTitle?: string;
  onJumpToNext?: () => void;
}

export const TrainingProgress: React.FC<TrainingProgressProps> = ({
  currentLevel,
  totalLevels,
  completedLessonCount,
  totalLessonCount,
  levelProgressPercent,
  xp,
  streak,
  nextUpLessonTitle,
  onJumpToNext,
}) => {
  return (
    <div className="w-full bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-sm mb-6 relative overflow-hidden">
      {/* Decorative top color bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: currentLevel.accentColor || "#10B981" }}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold tracking-widest text-gray-500 uppercase">
              Customer Service Training
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
          </div>

          <div className="flex items-baseline gap-2.5 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-['Fredoka',sans-serif] tracking-tight">
              Level {currentLevel.number}: {currentLevel.title}
            </h2>
            <span className="text-sm font-semibold text-gray-500">
              — {currentLevel.subtitle}
            </span>
          </div>
        </div>

        {/* Gamification Stats */}
        <XpDisplay xp={xp} streak={streak} currentLevelNumber={currentLevel.number} />
      </div>

      {/* Progress Bar Container */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-2">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              {completedLessonCount} of {totalLessonCount} lessons completed
            </span>
          </span>
          <span className="font-extrabold text-gray-900 text-sm">
            {levelProgressPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
          <div
            className="h-full rounded-full transition-all duration-500 shadow-xs"
            style={{
              width: `${Math.max(levelProgressPercent, 4)}%`,
              backgroundColor: currentLevel.accentColor || "#10B981",
            }}
          />
        </div>
      </div>

      {/* "Where you are / What to do next" Orientation Footer */}
      <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>
            <strong className="text-gray-900">What's Next:</strong>{" "}
            {nextUpLessonTitle ? nextUpLessonTitle : "All current lessons finished! Ready for next level."}
          </span>
        </div>

        {nextUpLessonTitle && onJumpToNext && (
          <button
            onClick={onJumpToNext}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors border border-emerald-200 cursor-pointer shadow-2xs"
          >
            <span>Continue Training</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
