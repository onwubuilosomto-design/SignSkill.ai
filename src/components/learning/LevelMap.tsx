import React from "react";
import { Level, Lesson } from "../../types/training";
import { LevelCard } from "./LevelCard";
import { Sparkles, Trophy, Award, BookOpen } from "lucide-react";

interface LevelMapProps {
  levels: Level[];
  completedLessonIds: string[];
  currentLevelNumber: number;
  onSelectLesson: (lesson: Lesson) => void;
}

export const LevelMap: React.FC<LevelMapProps> = ({
  levels,
  completedLessonIds,
  currentLevelNumber,
  onSelectLesson,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-gray-900 font-['Fredoka',sans-serif]">
            Training Progression Path
          </h3>
        </div>
        <span className="text-xs font-semibold text-gray-500">
          5 Workplace Milestones
        </span>
      </div>

      {levels.map((level) => {
        // A level is unlocked if it's Level 1, or if all lessons in the previous level are completed
        const prevLevel = levels.find((l) => l.number === level.number - 1);
        const isUnlocked =
          level.number === 1 ||
          (prevLevel !== undefined &&
            prevLevel.lessons.every((l) => completedLessonIds.includes(l.id)));

        const isCurrentLevel = level.number === currentLevelNumber;

        return (
          <LevelCard
            key={level.id}
            level={level}
            isUnlocked={isUnlocked}
            completedLessonIds={completedLessonIds}
            onSelectLesson={onSelectLesson}
            isCurrentLevel={isCurrentLevel}
          />
        );
      })}

      {/* Graduation Certificate / Master Milestone card */}
      <div className="bg-linear-to-r from-amber-500 via-orange-500 to-pink-500 rounded-3xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-4xl shadow-inner shrink-0">
          🎖️
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold font-['Fredoka',sans-serif] mb-1">
            Inclusive Service Workplace Certified
          </h4>
          <p className="text-xs text-white/90 leading-relaxed">
            Complete all 5 levels to unlock the Customer Service Deaf Awareness Badge and demonstrate true accessibility excellence at your counter.
          </p>
        </div>
        <div className="shrink-0">
          <div className="px-4 py-2 bg-white text-orange-700 font-bold rounded-xl text-xs shadow-md">
            Target: 500+ XP
          </div>
        </div>
      </div>
    </div>
  );
};
