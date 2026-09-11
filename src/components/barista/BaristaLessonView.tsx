import React, { useState, useRef, useEffect } from "react";
import { BaristaLesson, BaristaTopic, BaristaQuestion } from "../../types/barista";
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Gauge, 
  Maximize2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Star, 
  Flame, 
  Sparkles, 
  Lightbulb, 
  ShieldCheck, 
  Smile, 
  HelpCircle,
  Video
} from "lucide-react";
import confetti from "canvas-confetti";
import { OwlMascot } from "../OwlMascot";

interface BaristaLessonViewProps {
  lesson: BaristaLesson;
  topic: BaristaTopic;
  onExit: () => void;
  onLessonComplete: (lessonId: string, earnedXp: number) => void;
  onNextLesson?: () => void;
  hasNextLesson?: boolean;
}

type LessonStage = "guide" | "questions" | "scorecard";

export const BaristaLessonView: React.FC<BaristaLessonViewProps> = ({
  lesson,
  topic,
  onExit,
  onLessonComplete,
  onNextLesson,
  hasNextLesson = false,
}) => {
  const [stage, setStage] = useState<LessonStage>("guide");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [accumulatedXp, setAccumulatedXp] = useState<number>(0);

  // Video player states
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSlowMo, setIsSlowMo] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);

  // Reset states when lesson changes
  useEffect(() => {
    setStage("guide");
    setCurrentQuestionIdx(0);
    setSelectedOptionId(null);
    setHasSubmittedAnswer(false);
    setCorrectAnswersCount(0);
    setAccumulatedXp(0);
    setIsPlaying(true);
    setIsSlowMo(false);
  }, [lesson.id]);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const handleToggleSlowMo = () => {
    if (!videoRef.current) return;
    const nextRate = isSlowMo ? 1.0 : 0.5;
    videoRef.current.playbackRate = nextRate;
    setIsSlowMo(!isSlowMo);
  };

  // Questions handling
  const currentQuestion: BaristaQuestion | undefined = lesson.questions[currentQuestionIdx];
  const selectedOption = currentQuestion?.options.find((o) => o.id === selectedOptionId);

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || hasSubmittedAnswer) return;
    setHasSubmittedAnswer(true);

    if (selectedOption?.isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
      setAccumulatedXp((prev) => prev + 10);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < lesson.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasSubmittedAnswer(false);
    } else {
      // Completed all questions in this lesson!
      setStage("scorecard");
      const totalEarned = accumulatedXp + lesson.xp;
      onLessonComplete(lesson.id, totalEarned);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  // Progress calculations
  const totalSteps = 1 + lesson.questions.length;
  const currentStepNum = stage === "guide" ? 1 : stage === "questions" ? 2 + currentQuestionIdx : totalSteps;
  const progressPercent = Math.min(Math.round((currentStepNum / totalSteps) * 100), 100);

  return (
    <div className="min-h-screen bg-[#F7F9FA] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 shadow-xs">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button
            id="btn-exit-barista-lesson"
            onClick={onExit}
            className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Return to Topic"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress Bar */}
          <div className="flex-1">
            <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
              <div
                className="h-full bg-[#58CC02] rounded-full transition-all duration-300 shadow-xs"
                style={{ width: `${progressPercent}%` }}
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
              Step {currentStepNum}/{totalSteps}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 sm:py-8 pb-20">
        {/* ============================================================ */}
        {/* STAGE 1: SIGN VIDEO & MOTION DEMONSTRATION GUIDE             */}
        {/* ============================================================ */}
        {stage === "guide" && (
          <div className="space-y-6">
            {/* Topic & Sign Title Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                <span>Topic {topic.number}: {topic.title}</span>
                <span>•</span>
                <span>Lesson {lesson.order}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-['Fredoka',sans-serif] flex items-center gap-2">
                <span>{lesson.sign.name}</span>
                <span className="text-2xl">{lesson.sign.emoji}</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5">
                {lesson.sign.meaning}
              </p>
            </div>

            {/* Workplace Situation Banner */}
            <div className="bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl p-4 text-amber-950 text-xs sm:text-sm">
              <strong className="block font-bold text-amber-900 mb-0.5">
                Counter Situation:
              </strong>
              <p>{lesson.sign.customerContext}</p>
            </div>

            {/* Video Demonstration Card */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-gray-700">
                    Sign Language Demonstration
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-gray-500">
                  Visual Technique Guide
                </span>
              </div>

              {/* Video Player or Motion Slot */}
              <div className="relative aspect-video bg-gray-900 flex items-center justify-center overflow-hidden">
                {lesson.sign.videoSrc ? (
                  <video
                    ref={videoRef}
                    src={lesson.sign.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* Visual Motion Slot if video is pending production */
                  <div className="w-full h-full bg-linear-to-br from-amber-950/90 via-slate-900 to-black flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-4xl mb-3 shadow-inner">
                      {lesson.sign.emoji || "☕"}
                    </div>
                    <span className="text-base font-bold text-white font-['Fredoka',sans-serif] mb-1">
                      {lesson.sign.name} Gesture Motion
                    </span>
                    <p className="text-xs text-amber-200/90 max-w-md leading-relaxed">
                      {lesson.sign.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      Visual Reference Slot Ready
                    </span>
                  </div>
                )}

                {/* Video Controls Overlay */}
                {lesson.sign.videoSrc && (
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 bg-black/60 backdrop-blur-xs p-2 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleTogglePlay}
                        className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={handleReplay}
                        className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                        title="Replay from start"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleToggleSlowMo}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                          isSlowMo ? "bg-amber-500 text-white" : "bg-white/20 hover:bg-white/30 text-white"
                        }`}
                        title="Toggle Slow-Motion (0.5x)"
                      >
                        <Gauge className="w-3.5 h-3.5" />
                        <span>0.5x Slow-Mo</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setIsEnlarged(true)}
                      className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                      title="Enlarge Video"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Hand & Facial Breakdown Tips */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs mb-1">
                      <span>✋ Hand & Wrist Movement:</span>
                    </div>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      {lesson.sign.motionTip}
                    </p>
                  </div>

                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs mb-1">
                      <span>🙂 Facial Expression:</span>
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {lesson.sign.facialExpressionTip}
                    </p>
                  </div>
                </div>

                {/* Hand Shape Technique Checklist */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Key Execution Points:
                  </h4>
                  <ul className="space-y-1.5">
                    {lesson.sign.handShapeTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Golden Customer Etiquette Rule */}
                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl text-emerald-950 text-xs sm:text-sm">
                  <strong className="block font-bold text-emerald-900 mb-0.5">
                    Counter Etiquette Rule:
                  </strong>
                  <p>{lesson.sign.etiquetteTip}</p>
                </div>
              </div>
            </div>

            {/* Next Action: Move to practice questions */}
            <div className="flex justify-end pt-2">
              <button
                id="btn-start-barista-questions"
                onClick={() => setStage("questions")}
                className="w-full sm:w-auto bg-[#58CC02] hover:bg-[#46A302] active:translate-y-0.5 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-[0_4px_0_#3B8B00] hover:shadow-[0_2px_0_#3B8B00] flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Practice Questions ({lesson.questions.length} Items)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 2: PRACTICE QUESTIONS & FEEDBACK                       */}
        {/* ============================================================ */}
        {stage === "questions" && currentQuestion && (
          <div className="space-y-6">
            {/* Question Header Banner */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Question {currentQuestionIdx + 1} of {lesson.questions.length}
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  Sign: {lesson.sign.name}
                </span>
              </div>

              {currentQuestion.scenarioContext && (
                <p className="text-xs text-gray-500 font-medium mb-3 italic">
                  Scenario: {currentQuestion.scenarioContext}
                </p>
              )}

              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                return (
                  <div
                    key={option.id}
                    onClick={() => {
                      if (!hasSubmittedAnswer) setSelectedOptionId(option.id);
                    }}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? hasSubmittedAnswer
                          ? option.isCorrect
                            ? "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs"
                            : "bg-red-50 border-red-400 text-red-950 shadow-xs"
                          : "bg-amber-50 border-amber-500 text-amber-950 shadow-xs"
                        : hasSubmittedAnswer && option.isCorrect
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                        : "bg-white border-gray-200 hover:border-gray-300 text-gray-800 hover:shadow-2xs"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                        isSelected
                          ? hasSubmittedAnswer
                            ? option.isCorrect
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-red-500 bg-red-500 text-white"
                            : "border-amber-600 bg-amber-600 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                      {option.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Instant Feedback Card on Answer Submission */}
            {hasSubmittedAnswer && selectedOption && (
              <div
                className={`p-5 rounded-2xl border flex items-start gap-4 ${
                  selectedOption.isCorrect
                    ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                    : "bg-amber-50 border-amber-200 text-amber-950"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {selectedOption.isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                  )}
                </div>

                <div className="flex-1 text-xs sm:text-sm">
                  <strong className="block font-bold mb-1">
                    {selectedOption.isCorrect ? "Correct Answer! (+10 XP)" : "Review Suggestion"}
                  </strong>
                  <p className="mb-2 leading-relaxed">{selectedOption.feedback}</p>
                  <p className="text-gray-600 italic leading-relaxed">
                    Explanation: {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStage("guide")}
                className="text-xs font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 cursor-pointer py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Video & Guide</span>
              </button>

              {!hasSubmittedAnswer ? (
                <button
                  id="btn-check-barista-answer"
                  disabled={!selectedOptionId}
                  onClick={handleSubmitAnswer}
                  className={`font-bold py-3.5 px-8 rounded-xl transition-all text-sm cursor-pointer ${
                    selectedOptionId
                      ? "bg-[#58CC02] hover:bg-[#46A302] text-white shadow-[0_3px_0_#3B8B00]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  id="btn-continue-barista-question"
                  onClick={handleNextQuestion}
                  className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 px-8 rounded-xl transition-all text-sm flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>
                    {currentQuestionIdx < lesson.questions.length - 1
                      ? "Next Question"
                      : "Complete Lesson"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 3: SCORECARD & COMPLETION CELEBRATION                 */}
        {/* ============================================================ */}
        {stage === "scorecard" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md text-center max-w-lg mx-auto space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-4xl mx-auto shadow-xs">
              🏆
            </div>

            <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
              Lesson Complete!
            </div>

            <div>
              <h2 className="text-3xl font-black text-gray-900 font-['Fredoka',sans-serif] mb-1">
                {lesson.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Fantastic work! You've mastered this essential counter sign and understand how to apply it with respectful Deaf etiquette.
              </p>
            </div>

            {/* Mascot Coach feedback */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center gap-4 text-left">
              <div className="shrink-0">
                <OwlMascot mood="success" size={48} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Coach Owl Feedback
                </span>
                <p className="text-xs text-gray-800 font-semibold leading-relaxed">
                  "Your attentiveness at the register makes all the difference. Keep up the daily streak!"
                </p>
              </div>
            </div>

            {/* Rewards Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                <span className="text-xs font-bold text-amber-700 block mb-1">Total XP Earned</span>
                <span className="text-2xl font-black text-amber-900 font-['Fredoka',sans-serif] flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                  <span>+{accumulatedXp + lesson.xp}</span>
                </span>
              </div>

              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 text-center">
                <span className="text-xs font-bold text-orange-700 block mb-1">Daily Streak</span>
                <span className="text-2xl font-black text-orange-900 font-['Fredoka',sans-serif] flex items-center justify-center gap-1">
                  <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                  <span>Active</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              {hasNextLesson && onNextLesson ? (
                <button
                  id="btn-next-barista-lesson"
                  onClick={onNextLesson}
                  className="w-full bg-[#58CC02] hover:bg-[#46A302] active:translate-y-0.5 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-[0_4px_0_#3B8B00] hover:shadow-[0_2px_0_#3B8B00] flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <span>Continue to Next Lesson</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : null}

              <button
                id="btn-back-to-barista-topic"
                onClick={onExit}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 px-6 rounded-2xl transition-colors text-sm cursor-pointer"
              >
                Back to {topic.title}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Video Enlarge Modal Lightbox */}
      {isEnlarged && lesson.sign.videoSrc && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-white/20 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative">
            <div className="p-4 bg-gray-800/80 border-b border-white/10 flex items-center justify-between text-white">
              <span className="font-bold text-sm">
                Demonstration: {lesson.sign.name}
              </span>
              <button
                onClick={() => setIsEnlarged(false)}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video">
              <video
                src={lesson.sign.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
