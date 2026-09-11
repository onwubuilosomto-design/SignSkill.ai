import React from "react";
import { BaristaTopic, BaristaLesson } from "../../types/barista";
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Star, 
  HelpCircle, 
  Sparkles,
  Award,
  Video,
  ChevronRight
} from "lucide-react";

interface BaristaTopicDetailViewProps {
  topic: BaristaTopic;
  completedLessonIds: string[];
  onSelectLesson: (lesson: BaristaLesson) => void;
  onBackToTopics: () => void;
}

export const BaristaTopicDetailView: React.FC<BaristaTopicDetailViewProps> = ({
  topic,
  completedLessonIds,
  onSelectLesson,
  onBackToTopics,
}) => {
  const completedInTopic = topic.lessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;
  const totalInTopic = topic.lessons.length;
  const topicPercent = totalInTopic > 0 ? Math.round((completedInTopic / totalInTopic) * 100) : 0;
  const isTopicCompleted = topicPercent === 100;

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          id="btn-back-to-barista-topics"
          onClick={onBackToTopics}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Barista Topics</span>
        </button>

        <span className="text-xs font-semibold text-gray-500">
          Topic {topic.number} of 10
        </span>
      </div>

      {/* Topic Hero Banner */}
      <div 
        className="rounded-3xl p-6 sm:p-7 text-white shadow-sm relative overflow-hidden"
        style={{ backgroundColor: topic.accentColor || "#D97706" }}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner shrink-0">
              {topic.badge}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-black/20 text-white px-2.5 py-0.5 rounded-full">
                  Topic {topic.number}
                </span>
                {isTopicCompleted ? (
                  <span className="text-[10px] font-bold bg-white text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Completed
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-white/25 text-white px-2.5 py-0.5 rounded-full">
                    {completedInTopic} / {totalInTopic} Lessons Done
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Fredoka',sans-serif]">
                {topic.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/90 font-medium max-w-xl mt-1 leading-relaxed">
                {topic.description}
              </p>
            </div>
          </div>

          <div className="self-end sm:self-center shrink-0 flex flex-col items-end gap-1.5">
            <span className="text-xs font-extrabold text-white/90 bg-black/15 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>+{topic.lessons.reduce((s, l) => s + l.xp, 0)} Total XP</span>
            </span>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute -right-8 -bottom-8 text-8xl opacity-10 select-none pointer-events-none">
          {topic.badge}
        </div>
      </div>

      {/* Lessons List Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 font-['Fredoka',sans-serif]">
            Topic Lessons & Practice
          </h3>
          <p className="text-xs text-gray-500">
            Each lesson includes video demonstration, gesture technique, and interactive questions.
          </p>
        </div>
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
          {topicPercent}% Complete
        </span>
      </div>

      {/* Lessons Sequence */}
      <div className="space-y-3">
        {topic.lessons.map((lesson, idx) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          const isFirstUncompleted = 
            !isCompleted && (idx === 0 || completedLessonIds.includes(topic.lessons[idx - 1].id));

          return (
            <div
              key={lesson.id}
              id={`barista-lesson-card-${lesson.id}`}
              onClick={() => onSelectLesson(lesson)}
              className={`rounded-2xl border-2 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 cursor-pointer ${
                isCompleted
                  ? "bg-white border-emerald-300 hover:border-emerald-400 shadow-2xs hover:shadow-md"
                  : isFirstUncompleted
                  ? "bg-white border-amber-500 shadow-md ring-4 ring-amber-100 hover:shadow-lg"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              {/* Left Column: Number Node & Title */}
              <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                <div className="relative shrink-0">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-emerald-100 text-emerald-700 shadow-2xs"
                        : isFirstUncompleted
                        ? "bg-amber-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                    ) : (
                      <span className="text-xl">{lesson.sign.emoji || "☕"}</span>
                    )}
                  </div>

                  {/* Order number tag */}
                  <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-white border border-gray-200 text-[10px] font-bold text-gray-700 flex items-center justify-center shadow-2xs">
                    {idx + 1}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-base font-bold text-gray-900 truncate font-['Fredoka',sans-serif]">
                      {lesson.title}
                    </h4>
                    {isFirstUncompleted && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        Up Next
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1 mb-1.5">
                    {lesson.sign.meaning}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                      <span>+{lesson.xp} XP</span>
                    </span>
                    <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                      <Video className="w-3 h-3 text-blue-600" />
                      <span>Video & Guide</span>
                    </span>
                    <span>{lesson.questions.length} Practice Questions</span>
                  </div>
                </div>
              </div>

              {/* Right Action Button */}
              <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 flex items-center justify-end">
                {isCompleted ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLesson(lesson);
                    }}
                    className="w-full sm:w-auto text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl transition-colors border border-emerald-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>Review Lesson</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLesson(lesson);
                    }}
                    className="w-full sm:w-auto text-xs font-bold text-white bg-[#58CC02] hover:bg-[#46A302] active:translate-y-0.5 px-5 py-2.5 rounded-xl transition-all shadow-[0_3px_0_#3B8B00] hover:shadow-[0_1px_0_#3B8B00] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Start Lesson</span>
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
