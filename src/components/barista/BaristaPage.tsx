import React, { useState, useEffect } from "react";
import { BARISTA_TOPICS } from "../../data/baristaTopics";
import { BaristaTopic, BaristaLesson } from "../../types/barista";
import { BaristaTopicsView } from "./BaristaTopicsView";
import { BaristaTopicDetailView } from "./BaristaTopicDetailView";
import { BaristaLessonView } from "./BaristaLessonView";
import { NavbarStats } from "../NavbarStats";

interface BaristaPageProps {
  onBackToTracks: () => void;
  streak: number;
  points: number;
  onUpdatePoints: (newPoints: number) => void;
  onOpenDemoControls: () => void;
  isMockActive: boolean;
}

export const BaristaPage: React.FC<BaristaPageProps> = ({
  onBackToTracks,
  streak,
  points,
  onUpdatePoints,
  onOpenDemoControls,
  isMockActive,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<BaristaTopic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<BaristaLesson | null>(null);

  // Load completed lesson IDs from localStorage
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("signlingo_barista_completed_lessons");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever completedLessonIds changes
  useEffect(() => {
    try {
      localStorage.setItem("signlingo_barista_completed_lessons", JSON.stringify(completedLessonIds));
    } catch {
      // Storage fallback
    }
  }, [completedLessonIds]);

  const handleLessonComplete = (lessonId: string, earnedXp: number) => {
    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
    }
    onUpdatePoints(points + earnedXp);
  };

  const handleNextLesson = () => {
    if (!selectedTopic || !selectedLesson) return;
    const currentIdx = selectedTopic.lessons.findIndex((l) => l.id === selectedLesson.id);
    if (currentIdx !== -1 && currentIdx < selectedTopic.lessons.length - 1) {
      setSelectedLesson(selectedTopic.lessons[currentIdx + 1]);
    } else {
      // All lessons in topic done, return to topic view
      setSelectedLesson(null);
    }
  };

  // Check if there is another lesson in current topic
  const hasNextLesson = Boolean(
    selectedTopic &&
    selectedLesson &&
    selectedTopic.lessons.findIndex((l) => l.id === selectedLesson.id) < selectedTopic.lessons.length - 1
  );

  // If inside an active lesson, render full-screen lesson view
  if (selectedLesson && selectedTopic) {
    return (
      <BaristaLessonView
        lesson={selectedLesson}
        topic={selectedTopic}
        onExit={() => setSelectedLesson(null)}
        onLessonComplete={handleLessonComplete}
        onNextLesson={handleNextLesson}
        hasNextLesson={hasNextLesson}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-gray-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar Stats */}
      <NavbarStats
        streak={streak}
        points={points}
        onOpenDemoControls={onOpenDemoControls}
        isMockActive={isMockActive}
        onBackToHome={selectedTopic ? () => setSelectedTopic(null) : onBackToTracks}
        modeTitle="Café Barista ASL"
      />

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-5 sm:py-8 pb-20 sm:pb-12">
        {selectedTopic ? (
          <BaristaTopicDetailView
            topic={selectedTopic}
            completedLessonIds={completedLessonIds}
            onSelectLesson={(lesson) => setSelectedLesson(lesson)}
            onBackToTopics={() => setSelectedTopic(null)}
          />
        ) : (
          <BaristaTopicsView
            topics={BARISTA_TOPICS}
            completedLessonIds={completedLessonIds}
            onSelectTopic={(topic) => setSelectedTopic(topic)}
            onBackToTracks={onBackToTracks}
          />
        )}
      </main>
    </div>
  );
};
