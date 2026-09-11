import React from "react";
import { Level, Lesson } from "../../types/training";
import { LessonCard } from "./LessonCard";
import { Lock, CheckCircle2, ChevronDown, ChevronUp, Star, Award } from "lucide-react";

interface LevelCardProps {
  level: Level;
  isUnlocked: boolean;
  completedLessonIds: string[];
  activeLessonId?: string;
  onSelectLesson: (lesson: Lesson) => void;
  isCurrentLevel: boolean;
}

export const LevelCard: React.FC<LevelCardProps> = ({
  level,
  isUnlocked,
  completedLessonIds,
  activeLessonId,
  onSelectLesson,
  isCurrentLevel,
}) => {
  const completedCount = level.lessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;
  const isLevelCompleted = completedCount === level.lessons.length;
  const totalXpInLevel = level.lessons.reduce((sum, l) => sum + l.xp, 0);

  return (
    <div
      id={`level-section-${level.id}`}
      className={`rounded-3xl border-2 transition-all mb-8 overflow-hidden ${
        isLevelCompleted
          ? "bg-white border-emerald-300 shadow-sm"
          : isCurrentLevel
          ? "bg-white border-gray-300 shadow-md ring-2 ring-emerald-500/20"
          : isUnlocked
          ? "bg-white border-gray-200 shadow-sm"
          : "bg-gray-50/70 border-gray-200/80 opacity-70"
      }`}
    >
      {/* Level Header Banner */}
      <div
        className="p-5 sm:p-6 text-white relative flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          backgroundColor: isUnlocked ? level.accentColor || "#10B981" : "#64748B",
        }}
      >
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner shrink-0">
            {level.badge}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/80 bg-black/10 px-2.5 py-0.5 rounded-full">
                Level {level.number}
              </span>
              {isLevelCompleted ? (
                <span className="text-[11px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Completed
                </span>
              ) : !isUnlocked ? (
                <span className="text-[11px] font-bold bg-black/20 text-white/90 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              ) : (
                <span className="text-[11px] font-bold bg-white/25 text-white px-2 py-0.5 rounded-full">
                  {completedCount} / {level.lessons.length} Lessons
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Fredoka',sans-serif]">
              {level.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 font-medium line-clamp-1">
              {level.description}
            </p>
          </div>
        </div>

        {/* Total XP in this level */}
        <div className="self-end sm:self-center shrink-0 flex items-center gap-2 bg-black/15 px-3 py-1.5 rounded-xl text-xs font-bold text-white/95">
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          <span>+{totalXpInLevel} XP</span>
        </div>
      </div>

      {/* Lessons List / Path */}
      <div className="p-4 sm:p-6 space-y-3 bg-white">
        {level.lessons.map((lesson, idx) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          const isLocked =
            !isUnlocked ||
            (!isCompleted &&
              idx > 0 &&
              !completedLessonIds.includes(level.lessons[idx - 1].id));
          const isCurrent =
            isUnlocked &&
            !isCompleted &&
            (idx === 0 || completedLessonIds.includes(level.lessons[idx - 1].id));

          const status: "completed" | "current" | "available" | "locked" = isCompleted
            ? "completed"
            : isLocked
            ? "locked"
            : isCurrent
            ? "current"
            : "available";

          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              status={status}
              onSelect={onSelectLesson}
              accentColor={level.accentColor}
              orderNumber={idx + 1}
            />
          );
        })}
      </div>
    </div>
  );
};
