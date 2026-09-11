import React, { useState } from "react";
import { Lesson, SimulatedEvaluationResult } from "../../types/training";
import { ExerciseView } from "./ExerciseView";
import { X, Trophy, Star, ArrowRight, Flame, Sparkles, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface LessonViewProps {
  lesson: Lesson;
  levelNumber: number;
  levelTitle: string;
  onExit: () => void;
  onLessonComplete: (lessonId: string, earnedXp: number) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  levelNumber,
  levelTitle,
  onExit,
  onLessonComplete,
}) => {
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [accumulatedXp, setAccumulatedXp] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentExercise = lesson.exercises[currentExerciseIdx];
  const totalExercises = lesson.exercises.length;
  const progressPercent = Math.round(((currentExerciseIdx) / totalExercises) * 100);

  const handleExerciseComplete = (xpEarned: number) => {
    const updatedXp = accumulatedXp + xpEarned;
    setAccumulatedXp(updatedXp);

    if (currentExerciseIdx < totalExercises - 1) {
      setCurrentExerciseIdx((prev) => prev + 1);
    } else {
      // Finished all exercises in this lesson!
      // Add lesson bonus XP
      const finalXp = updatedXp + lesson.xp;
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleFinishLesson = () => {
    onLessonComplete(lesson.id, accumulatedXp + lesson.xp);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 shadow-xs">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          {/* Close / Exit button */}
          <button
            id="btn-exit-lesson"
            onClick={onExit}
            className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Return to Training Map"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress Bar */}
          <div className="flex-1">
            <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
              <div
                className="h-full bg-[#58CC02] rounded-full transition-all duration-300 shadow-xs"
                style={{
                  width: `${isCompleted ? 100 : Math.max(progressPercent, 6)}%`,
                }}
              />
            </div>
          </div>

          {/* XP & Step Counter */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-bold shadow-2xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>+{accumulatedXp} XP</span>
            </div>
            <span className="text-xs font-bold text-gray-500 hidden sm:inline">
              {currentExerciseIdx + 1}/{totalExercises}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 sm:py-8">
        {!isCompleted ? (
          <div>
            {/* Exercise Title Header */}
            <div className="mb-5">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                <span>Level {levelNumber}: {levelTitle}</span>
                <span>•</span>
                <span>{lesson.title}</span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 font-['Fredoka',sans-serif]">
                {currentExercise.title}
              </h2>
            </div>

            {/* Exercise Component */}
            <ExerciseView
              exercise={currentExercise}
              onExerciseComplete={handleExerciseComplete}
            />
          </div>
        ) : (
          /* Lesson Completion Celebration Screen */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md text-center my-auto max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-4xl mx-auto mb-5 shadow-sm">
              🏆
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-3">
              Lesson Complete!
            </div>

            <h2 className="text-3xl font-black text-gray-900 font-['Fredoka',sans-serif] mb-2">
              {lesson.title}
            </h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Outstanding work! You've strengthened your customer-service confidence and mastered key interactions for serving deaf customers.
            </p>

            {/* Reward Badges */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                <span className="text-xs font-bold text-amber-700 block mb-1">XP Earned</span>
                <span className="text-2xl font-black text-amber-900 font-['Fredoka',sans-serif] flex items-center justify-center gap-1">
                  <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
                  <span>+{accumulatedXp + lesson.xp}</span>
                </span>
              </div>

              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 text-center">
                <span className="text-xs font-bold text-orange-700 block mb-1">Daily Streak</span>
                <span className="text-2xl font-black text-orange-900 font-['Fredoka',sans-serif] flex items-center justify-center gap-1">
                  <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
                  <span>+1 Day</span>
                </span>
              </div>
            </div>

            {/* Finish CTA */}
            <button
              id="btn-finish-lesson"
              onClick={handleFinishLesson}
              className="w-full bg-[#58CC02] hover:bg-[#46A302] active:translate-y-0.5 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-[0_4px_0_#3B8B00] hover:shadow-[0_2px_0_#3B8B00] flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <span>Continue Training Path</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
