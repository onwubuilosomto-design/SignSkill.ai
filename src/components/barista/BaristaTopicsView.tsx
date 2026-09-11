import React from "react";
import { BaristaTopic } from "../../types/barista";
import { 
  Coffee, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Star, 
  Sparkles, 
  Award,
  ChevronRight,
  BookOpen
} from "lucide-react";

interface BaristaTopicsViewProps {
  topics: BaristaTopic[];
  completedLessonIds: string[];
  onSelectTopic: (topic: BaristaTopic) => void;
  onBackToTracks: () => void;
}

export const BaristaTopicsView: React.FC<BaristaTopicsViewProps> = ({
  topics,
  completedLessonIds,
  onSelectTopic,
  onBackToTracks,
}) => {
  // Calculate overall barista statistics
  const totalLessons = topics.reduce((sum, t) => sum + t.lessons.length, 0);
  const completedLessonsCount = topics.reduce(
    (sum, t) => sum + t.lessons.filter((l) => completedLessonIds.includes(l.id)).length,
    0
  );
  const overallPercentage = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
  const completedTopicsCount = topics.filter((t) => 
    t.lessons.length > 0 && t.lessons.every((l) => completedLessonIds.includes(l.id))
  ).length;

  return (
    <div className="space-y-6">
      {/* Track Navigation & Mode Header */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
            ☕
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                Track: Café Barista
              </span>
              <span className="text-xs text-amber-700 font-semibold hidden sm:inline">
                • 10 Counter Topics
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-amber-950 font-['Fredoka',sans-serif]">
              Inclusive Counter Service ASL
            </h2>
            <p className="text-xs text-amber-800">
              Master sign language for taking orders, beverage customization, and Deaf hospitality.
            </p>
          </div>
        </div>

        <button
          id="btn-back-to-tracks"
          onClick={onBackToTracks}
          className="self-start sm:self-center text-xs font-bold text-amber-800 hover:text-amber-900 bg-white hover:bg-amber-100/60 border border-amber-300 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-2xs shrink-0 flex items-center gap-1.5"
        >
          <span>← Change Track</span>
        </button>
      </div>

      {/* Progress & Milestone Summary */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-bold text-gray-900">
              Barista Track Progress: {completedTopicsCount} of {topics.length} Topics Completed
            </span>
          </div>
          <span className="text-xs font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
            {overallPercentage}% Mastered ({completedLessonsCount}/{totalLessons} Lessons)
          </span>
        </div>

        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
          <div
            className="h-full bg-linear-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(overallPercentage, 2)}%` }}
          />
        </div>
      </div>

      {/* Topics Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-gray-900 font-['Fredoka',sans-serif]">
            Café Situations & Topics
          </h3>
        </div>
        <span className="text-xs font-medium text-gray-500">
          Select a topic to start learning
        </span>
      </div>

      {/* Topics Grid - Using exact topic card styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {topics.map((topic) => {
          const completedInTopic = topic.lessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;
          const totalInTopic = topic.lessons.length;
          const topicPercent = totalInTopic > 0 ? Math.round((completedInTopic / totalInTopic) * 100) : 0;
          const isCompleted = topicPercent === 100;
          const isStarted = topicPercent > 0;

          return (
            <div
              key={topic.id}
              id={`topic-card-${topic.id}`}
              onClick={() => onSelectTopic(topic)}
              className={`bg-white rounded-2xl border-2 p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer group hover:shadow-md ${
                isCompleted
                  ? "border-emerald-300 hover:border-emerald-400"
                  : isStarted
                  ? "border-amber-300 hover:border-amber-400 shadow-xs"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div>
                {/* Top Badge & Progress Pill */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-2xs shrink-0 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `${topic.accentColor}18`, color: topic.accentColor }}
                    >
                      {topic.badge}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">
                        Topic {topic.number}
                      </span>
                      <h4 className="text-base font-bold text-gray-900 font-['Fredoka',sans-serif] group-hover:text-amber-700 transition-colors">
                        {topic.title}
                      </h4>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Completed
                    </span>
                  ) : isStarted ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full shrink-0">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {topicPercent}%
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full shrink-0">
                      Not started
                    </span>
                  )}
                </div>

                {/* Subtitle & Description */}
                <p className="text-xs text-gray-600 mb-3.5 line-clamp-2 leading-relaxed">
                  {topic.description}
                </p>

                {/* Phrase Preview Chips */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Signs taught:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.phrases.slice(0, 5).map((phrase, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-gray-50 text-gray-700 border border-gray-200"
                      >
                        {phrase}
                      </span>
                    ))}
                    {topic.phrases.length > 5 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-gray-400 bg-gray-100">
                        +{topic.phrases.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <span className="font-bold text-gray-700">{completedInTopic}/{totalInTopic}</span> lessons completed
                </div>

                <button
                  id={`btn-open-topic-${topic.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTopic(topic);
                  }}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                    isCompleted
                      ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : isStarted
                      ? "bg-amber-500 hover:bg-amber-600 text-white shadow-[0_2px_0_#b45309]"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  <span>{isCompleted ? "Review Topic" : isStarted ? "Continue" : "Start Topic"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
