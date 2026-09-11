import React, { useState, useEffect } from "react";
import { TRAINING_LEVELS } from "../../data/trainingLevels";
import { Lesson, Level } from "../../types/training";
import { TrainingProgress } from "./TrainingProgress";
import { LevelMap } from "./LevelMap";
import { LessonView } from "./LessonView";
import { OwlMascot } from "../OwlMascot";
import { ArrowLeft, RotateCcw, Flame, Star, Sparkles, BookOpen, Hand } from "lucide-react";
import { PWAInstallButton } from "../PWAInstallButton";

interface LearningPageProps {
  onBackToTracks: () => void;
  onSwitchToGeneralPractice?: () => void;
}

const STORAGE_KEYS = {
  COMPLETED_LESSONS: "signlingo_cs_completed_lessons",
  XP: "signlingo_cs_xp",
  STREAK: "signlingo_cs_streak",
  LAST_ACTIVE: "signlingo_cs_last_active",
};

export const LearningPage: React.FC<LearningPageProps> = ({
  onBackToTracks,
  onSwitchToGeneralPractice,
}) => {
  // Completed Lessons
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      return saved ? JSON.parse(saved) : ["l1-attention"]; // Seed with first lesson or empty
    } catch {
      return ["l1-attention"];
    }
  });

  // XP
  const [xp, setXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.XP);
      return saved ? parseInt(saved, 10) : 120;
    } catch {
      return 120;
    }
  });

  // Streak
  const [streak, setStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STREAK);
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  // Active Lesson being trained
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.COMPLETED_LESSONS,
        JSON.stringify(completedLessonIds)
      );
    } catch {
      // Safe fallback
    }
  }, [completedLessonIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.XP, xp.toString());
    } catch {
      // Safe fallback
    }
  }, [xp]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STREAK, streak.toString());
    } catch {
      // Safe fallback
    }
  }, [streak]);

  // Determine current active level
  let currentLevelNumber = 1;
  for (const lvl of TRAINING_LEVELS) {
    const isLevelAllDone = lvl.lessons.every((l) =>
      completedLessonIds.includes(l.id)
    );
    if (!isLevelAllDone) {
      currentLevelNumber = lvl.number;
      break;
    }
    currentLevelNumber = lvl.number;
  }

  const currentLevel =
    TRAINING_LEVELS.find((l) => l.number === currentLevelNumber) ||
    TRAINING_LEVELS[0];

  const totalLessonsInCurLevel = currentLevel.lessons.length;
  const completedInCurLevel = currentLevel.lessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;

  const levelProgressPercent = Math.round(
    (completedInCurLevel / totalLessonsInCurLevel) * 100
  );

  // Find next uncompleted lesson
  let nextUpLesson: Lesson | undefined;
  for (const lvl of TRAINING_LEVELS) {
    for (const les of lvl.lessons) {
      if (!completedLessonIds.includes(les.id)) {
        nextUpLesson = les;
        break;
      }
    }
    if (nextUpLesson) break;
  }

  // Handle lesson completion
  const handleLessonComplete = (lessonId: string, earnedXp: number) => {
    setXp((prev) => prev + earnedXp);
    setStreak((prev) => prev + 1);

    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
    }

    setActiveLesson(null);
  };

  // Reset progress helper for tester convenience
  const handleResetProgress = () => {
    if (window.confirm("Reset all customer service training progress to default?")) {
      setCompletedLessonIds(["l1-attention"]);
      setXp(120);
      setStreak(3);
      setActiveLesson(null);
    }
  };

  // If a lesson is active, render the dedicated Lesson View
  if (activeLesson) {
    const parentLevel =
      TRAINING_LEVELS.find((l) => l.id === activeLesson.levelId) || currentLevel;

    return (
      <LessonView
        lesson={activeLesson}
        levelNumber={parentLevel.number}
        levelTitle={parentLevel.title}
        onExit={() => setActiveLesson(null)}
        onLessonComplete={handleLessonComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-gray-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand & Back Button */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2.5">
              <button
                id="btn-back-to-tracks"
                onClick={onBackToTracks}
                className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Return to Track Selection"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Tracks</span>
              </button>

              <div className="flex items-center gap-2">
                <OwlMascot size={36} mood="normal" />
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-gray-900 font-['Fredoka',sans-serif] flex items-center gap-1.5">
                    SignLingo <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 tracking-normal font-sans">Service AI</span>
                  </h1>
                </div>
              </div>
            </div>

            <div className="sm:hidden flex items-center gap-2">
              <PWAInstallButton variant="header" />
            </div>
          </div>

          {/* User Progress Stats Bar */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center sm:justify-end flex-wrap">
            {/* Daily Streak Box */}
            <div
              id="streak-box-learn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-xs bg-amber-50 border-l-4 border-amber-400 text-amber-900"
              title="Consecutive practice streak"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>{streak} Day Streak</span>
            </div>

            {/* Total Points Box */}
            <div
              id="points-box-learn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-xs bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900"
              title="Experience points"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{xp} XP</span>
            </div>

            {/* General Practice Toggle if provided */}
            {onSwitchToGeneralPractice && (
              <button
                onClick={onSwitchToGeneralPractice}
                className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 hover:text-green-700 bg-gray-100 hover:bg-green-50 border border-gray-200 transition-colors cursor-pointer"
                title="Switch to General ASL Practice"
              >
                <Hand className="w-3.5 h-3.5" />
                <span>General ASL</span>
              </button>
            )}

            {/* Reset Progress Helper */}
            <button
              onClick={handleResetProgress}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              title="Reset training progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 sm:py-8 pb-16">
        {/* Core Persona Banner */}
        <div className="mb-6 bg-linear-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner shrink-0">
              ☕
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200 block mb-0.5">
                Frontline Accessibility Training
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-['Fredoka',sans-serif]">
                Customer-Service Worker Simulation
              </h2>
              <p className="text-xs text-emerald-50/90 font-medium">
                Train your responses, etiquette, and facial warmth to confidently serve Deaf and Hard-of-Hearing patrons.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Header */}
        <TrainingProgress
          currentLevel={currentLevel}
          totalLevels={TRAINING_LEVELS.length}
          completedLessonCount={completedInCurLevel}
          totalLessonCount={totalLessonsInCurLevel}
          levelProgressPercent={levelProgressPercent}
          xp={xp}
          streak={streak}
          nextUpLessonTitle={nextUpLesson?.title}
          onJumpToNext={() => {
            if (nextUpLesson) setActiveLesson(nextUpLesson);
          }}
        />

        {/* Duolingo-style Level Map */}
        <LevelMap
          levels={TRAINING_LEVELS}
          completedLessonIds={completedLessonIds}
          currentLevelNumber={currentLevelNumber}
          onSelectLesson={(lesson) => setActiveLesson(lesson)}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/80 bg-white py-6 text-center text-xs text-gray-500">
        <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <OwlMascot size={22} mood="normal" />
            <span className="font-semibold text-gray-700">SignLingo AI</span>
            <span>• Customer Service Accessibility Training</span>
          </div>
          <p className="text-gray-400">
            Route: /learn • Workplace Roleplay & Visual Etiquette
          </p>
        </div>
      </footer>
    </div>
  );
};
