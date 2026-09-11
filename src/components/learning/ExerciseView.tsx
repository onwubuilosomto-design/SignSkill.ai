import React, { useState } from "react";
import {
  Exercise,
  LearnContent,
  IdentifyContent,
  ChooseResponseContent,
  PracticeContent,
  ScenarioContent,
  CustomerMood,
  SimulatedEvaluationResult,
} from "../../types/training";
import { CustomerSimulation } from "./CustomerSimulation";
import { ScenarioView } from "./ScenarioView";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Camera,
  Play,
  RotateCcw,
  Smile,
  HelpCircle,
  Check,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";

interface ExerciseViewProps {
  exercise: Exercise;
  onExerciseComplete: (xpEarned: number) => void;
  onEvaluationComplete?: (result: SimulatedEvaluationResult) => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  exercise,
  onExerciseComplete,
  onEvaluationComplete,
}) => {
  // Shared interaction states
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [customerMood, setCustomerMood] = useState<CustomerMood>("WAITING");
  const [practiceResult, setPracticeResult] = useState<SimulatedEvaluationResult | null>(null);
  const [isPracticing, setIsPracticing] = useState(false);

  // ============================================================
  // EXERCISE TYPE 1: LEARN
  // ============================================================
  if (exercise.type === "learn") {
    const content = exercise.content as LearnContent;
    return (
      <div className="space-y-6">
        {/* Situation Briefing Banner */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Workplace Context
            </span>
            <span className="text-xs text-gray-500">• Customer Service Guide</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-gray-900 leading-relaxed mb-4">
            {content.workplaceSituation}
          </p>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 mb-5">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Sign to Learn:
            </span>
            <h3 className="text-2xl font-black text-gray-900 font-['Fredoka',sans-serif]">
              {content.signName}
            </h3>
            <p className="text-xs text-gray-600 font-medium">{content.meaning}</p>
          </div>

          {/* Visual Sign Demonstration (Image or Video) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 items-center">
            {content.videoSrc ? (
              <div className="rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center relative shadow-xs border border-gray-200">
                <video
                  src={content.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  Motion Guide
                </span>
              </div>
            ) : content.imageSrc ? (
              <div className="rounded-xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center relative shadow-xs border border-gray-200">
                <img
                  src={content.imageSrc}
                  alt={content.signName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  Reference Frame
                </span>
              </div>
            ) : (
              <div className="rounded-xl bg-green-50 border border-green-200 p-4 aspect-video flex flex-col items-center justify-center text-center">
                <Sparkles className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-xs font-bold text-green-800">
                  {content.signName} Sign Motion
                </span>
              </div>
            )}

            {/* Motion & Etiquette tips */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <strong className="text-blue-900 block font-bold mb-1">
                  ✋ Hand & Wrist Movement:
                </strong>
                <p className="text-blue-800">{content.motionDescription}</p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <strong className="text-amber-900 block font-bold mb-1">
                  🙂 Facial Expression Tip:
                </strong>
                <p className="text-amber-800">{content.facialExpressionTip}</p>
              </div>
            </div>
          </div>

          {/* Golden Customer Etiquette Rule */}
          <div className="p-4 bg-emerald-50/70 border-l-4 border-emerald-500 rounded-r-xl text-emerald-950 text-xs sm:text-sm font-medium mb-6">
            <strong className="block font-bold text-emerald-900 mb-0.5">
              Service Etiquette Rule:
            </strong>
            <p>{content.customerEtiquetteTip}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => onExerciseComplete(exercise.xpReward)}
              className="bg-[#58CC02] hover:bg-[#46A302] active:translate-y-0.5 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-[0_4px_0_#3B8B00] hover:shadow-[0_2px_0_#3B8B00] flex items-center gap-2 text-sm cursor-pointer"
            >
              <span>Understood (+{exercise.xpReward} XP)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // EXERCISE TYPE 2: IDENTIFY
  // ============================================================
  if (exercise.type === "identify") {
    const content = exercise.content as IdentifyContent;
    const selectedOption = content.options.find((o) => o.id === selectedOptionId);

    const handleSubmitIdentify = () => {
      if (!selectedOptionId || hasSubmitted) return;
      setHasSubmitted(true);
      if (selectedOption?.isCorrect) {
        setCustomerMood("HAPPY");
      } else {
        setCustomerMood("CONFUSED");
      }
    };

    return (
      <div className="space-y-6">
        {/* Simulated Customer */}
        <CustomerSimulation
          mood={customerMood}
          customerName="Customer at Counter"
          avatarEmoji="🧑‍🦱"
          speechText={content.customerPrompt}
          contextNote={content.customerContext}
        />

        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Comprehension Check
            </span>
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              {content.question}
            </h3>
          </div>

          <div className="space-y-3 mb-6">
            {content.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => {
                    if (!hasSubmitted) setSelectedOptionId(option.id);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? hasSubmitted
                        ? option.isCorrect
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                          : "bg-red-50 border-red-400 text-red-950"
                        : "bg-blue-50 border-blue-500 text-blue-950 shadow-xs"
                      : hasSubmitted && option.isCorrect
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                      : "bg-white border-gray-200 hover:border-gray-300 text-gray-800"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                      isSelected
                        ? hasSubmitted
                          ? option.isCorrect
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-red-500 bg-red-500 text-white"
                          : "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm font-medium">{option.text}</span>
                </div>
              );
            })}
          </div>

          {/* Feedback section */}
          {hasSubmitted && selectedOption && (
            <div
              className={`p-4 rounded-xl mb-5 flex items-start gap-3 ${
                selectedOption.isCorrect
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                  : "bg-amber-50 border border-amber-200 text-amber-900"
              }`}
            >
              {selectedOption.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs sm:text-sm">
                <strong className="block font-bold mb-0.5">
                  {selectedOption.isCorrect ? "Correct Interpretation!" : "Review Suggestion"}
                </strong>
                <p className="mb-1">{selectedOption.feedback}</p>
                <p className="text-gray-600 italic">{content.explanation}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            {!hasSubmitted ? (
              <button
                disabled={!selectedOptionId}
                onClick={handleSubmitIdentify}
                className={`font-bold py-3 px-6 rounded-xl transition-all text-sm cursor-pointer ${
                  selectedOptionId
                    ? "bg-[#58CC02] hover:bg-[#46A302] text-white shadow-[0_3px_0_#3B8B00]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={() => onExerciseComplete(exercise.xpReward)}
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Continue (+{exercise.xpReward} XP)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // EXERCISE TYPE 3: CHOOSE RESPONSE
  // ============================================================
  if (exercise.type === "choose-response") {
    const content = exercise.content as ChooseResponseContent;
    const selectedOption = content.options.find((o) => o.id === selectedOptionId);

    const handleSubmitChoose = () => {
      if (!selectedOptionId || hasSubmitted) return;
      setHasSubmitted(true);
      if (selectedOption) {
        setCustomerMood(selectedOption.customerReaction);
      }
    };

    return (
      <div className="space-y-6">
        {/* Customer Simulation */}
        <CustomerSimulation
          mood={customerMood}
          customerName="Customer"
          avatarEmoji="👩‍💼"
          speechText={content.customerDialogue}
          signDescription={content.customerSignSummary}
          contextNote={content.customerContext}
        />

        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Customer Service Behaviour
            </span>
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              {content.question}
            </h3>
          </div>

          <div className="space-y-3 mb-6">
            {content.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => {
                    if (!hasSubmitted) setSelectedOptionId(option.id);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? hasSubmitted
                        ? option.isAppropriate
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                          : "bg-red-50 border-red-400 text-red-950"
                        : "bg-blue-50 border-blue-500 text-blue-950 shadow-xs"
                      : hasSubmitted && option.isAppropriate
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                      : "bg-white border-gray-200 hover:border-gray-300 text-gray-800"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                      isSelected
                        ? hasSubmitted
                          ? option.isAppropriate
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-red-500 bg-red-500 text-white"
                          : "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm font-medium">{option.text}</span>
                </div>
              );
            })}
          </div>

          {/* Feedback Alert */}
          {hasSubmitted && selectedOption && (
            <div
              className={`p-4 rounded-xl mb-5 flex items-start gap-3 ${
                selectedOption.isAppropriate
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                  : "bg-amber-50 border border-amber-200 text-amber-900"
              }`}
            >
              {selectedOption.isAppropriate ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs sm:text-sm">
                <strong className="block font-bold mb-0.5">
                  Service Consequence:
                </strong>
                <p className="mb-1.5">{selectedOption.serviceOutcome}</p>
                <p className="text-gray-600 italic">
                  <strong>Why it matters:</strong> {content.whyThisMatters}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            {!hasSubmitted ? (
              <button
                disabled={!selectedOptionId}
                onClick={handleSubmitChoose}
                className={`font-bold py-3 px-6 rounded-xl transition-all text-sm cursor-pointer ${
                  selectedOptionId
                    ? "bg-[#58CC02] hover:bg-[#46A302] text-white shadow-[0_3px_0_#3B8B00]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm Choice
              </button>
            ) : (
              <button
                onClick={() => onExerciseComplete(exercise.xpReward)}
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Continue (+{exercise.xpReward} XP)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // EXERCISE TYPE 4: PRACTICE / PERFORM
  // ============================================================
  if (exercise.type === "practice") {
    const content = exercise.content as PracticeContent;

    const handleSimulateEvaluation = (mode: "perfect" | "blank-face" | "incorrect") => {
      let result: SimulatedEvaluationResult;
      if (mode === "perfect") {
        result = {
          detectedSign: content.targetSign,
          accuracyScore: 94,
          facialExpressionValid: true,
          feedbackTip: "Excellent form! Clean hand trajectory and a warm, inviting smile.",
          customerReaction: "HAPPY",
        };
      } else if (mode === "blank-face") {
        result = {
          detectedSign: content.targetSign,
          accuracyScore: 88,
          facialExpressionValid: false,
          feedbackTip:
            "Hand sign was technically correct! However, your facial expression was flat. In Deaf culture, a warm smile is essential for welcoming service.",
          customerReaction: "NEEDS_SMILE",
        };
      } else {
        result = {
          detectedSign: "UNCLEAR_MOTION",
          accuracyScore: 42,
          facialExpressionValid: false,
          feedbackTip: "Hand shape did not match standard ASL configuration. Review the reference demo.",
          customerReaction: "CONFUSED",
        };
      }

      setPracticeResult(result);
      setCustomerMood(result.customerReaction);

      // Clean integration point for future / existing Gemini evaluation
      if (onEvaluationComplete) {
        onEvaluationComplete(result);
      }
    };

    return (
      <div className="space-y-6">
        {/* Customer Simulation */}
        <CustomerSimulation
          mood={customerMood}
          customerName="Customer"
          avatarEmoji="🙋‍♂️"
          speechText={`Looking at you: waiting for sign "${content.targetSign}"`}
          contextNote={content.workplaceScenario}
        />

        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Your Turn to Perform
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 font-['Fredoka',sans-serif] mt-1">
                Sign: "{content.targetSign}"
              </h3>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-4">{content.promptToWorker}</p>

          {/* Demonstration & Guidance Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {content.referenceVideoSrc ? (
              <div className="rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center relative shadow-xs border border-gray-200">
                <video
                  src={content.referenceVideoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  ASL Reference
                </span>
              </div>
            ) : content.referenceImageSrc ? (
              <div className="rounded-xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center relative shadow-xs border border-gray-200">
                <img
                  src={content.referenceImageSrc}
                  alt={content.targetSign}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  ASL Reference
                </span>
              </div>
            ) : null}

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <strong className="text-gray-900 block font-bold mb-1">
                  Hand Shape:
                </strong>
                <p className="text-gray-600">{content.handShapeTip}</p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <strong className="text-amber-900 block font-bold mb-1">
                  Required Expression:
                </strong>
                <p className="text-amber-800">{content.idealFacialExpression}</p>
              </div>
            </div>
          </div>

          {/* Key Evaluation Criteria */}
          <div className="mb-6">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Graded Evaluation Criteria:
            </span>
            <ul className="space-y-1.5 text-xs text-gray-700">
              {content.criteria.map((c, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Simulation & Evaluation controls */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Test Worker Performance & Customer Reaction</span>
              </span>
              <span className="text-[11px] text-slate-500">Instant AI Feedback</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => handleSimulateEvaluation("perfect")}
                className="p-3 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-all cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-800">
                    Sign + Warm Smile
                  </span>
                  <Smile className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Correct hand sign with hospitable customer expression
                </p>
              </button>

              <button
                onClick={() => handleSimulateEvaluation("blank-face")}
                className="p-3 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-xl text-left transition-all cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-800">
                    Sign + Blank Face
                  </span>
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Hand motion correct, but zero smile or eye warmth
                </p>
              </button>

              <button
                onClick={() => handleSimulateEvaluation("incorrect")}
                className="p-3 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 rounded-xl text-left transition-all cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-rose-800">
                    Hesitant / Misaligned
                  </span>
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Hand motion incomplete or facing wrong orientation
                </p>
              </button>
            </div>
          </div>

          {/* Performance Result Display */}
          {practiceResult && (
            <div
              className={`p-4 rounded-xl mb-5 border ${
                practiceResult.accuracyScore >= 80 && practiceResult.facialExpressionValid
                  ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                  : practiceResult.accuracyScore >= 80 && !practiceResult.facialExpressionValid
                  ? "bg-amber-50 border-amber-300 text-amber-900"
                  : "bg-rose-50 border-rose-300 text-rose-900"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Accuracy Score: {practiceResult.accuracyScore}%
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white shadow-2xs">
                  Customer: {practiceResult.customerReaction}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {practiceResult.feedbackTip}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              disabled={!practiceResult}
              onClick={() => onExerciseComplete(exercise.xpReward)}
              className={`font-bold py-3.5 px-8 rounded-xl transition-all text-sm flex items-center gap-2 cursor-pointer ${
                practiceResult
                  ? "bg-[#58CC02] hover:bg-[#46A302] text-white shadow-[0_3px_0_#3B8B00]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>Finish Practice (+{exercise.xpReward} XP)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // EXERCISE TYPE 5: SCENARIO
  // ============================================================
  if (exercise.type === "scenario") {
    return (
      <ScenarioView
        content={exercise.content as ScenarioContent}
        onComplete={(xp) => onExerciseComplete(xp || exercise.xpReward)}
      />
    );
  }

  return null;
};
