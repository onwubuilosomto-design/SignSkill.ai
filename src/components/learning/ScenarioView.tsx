import React, { useState } from "react";
import { ScenarioContent, CustomerMood } from "../../types/training";
import { CustomerSimulation } from "./CustomerSimulation";
import { CheckCircle2, AlertCircle, ArrowRight, Sparkles, Trophy } from "lucide-react";

interface ScenarioViewProps {
  content: ScenarioContent;
  onComplete: (xpEarned: number) => void;
}

export const ScenarioView: React.FC<ScenarioViewProps> = ({ content, onComplete }) => {
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [customerMood, setCustomerMood] = useState<CustomerMood>("WAITING");
  const [turnHistory, setTurnHistory] = useState<{
    turn: number;
    success: boolean;
    feedback: string;
  }[]>([]);
  const [isScenarioFinished, setIsScenarioFinished] = useState(false);

  const currentTurn = content.turns[currentTurnIdx];

  const handleSelectOption = (optionId: string) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
  };

  const handleConfirmTurn = () => {
    if (!selectedOptionId || hasAnswered) return;
    const chosen = currentTurn.workerOptions.find((o) => o.id === selectedOptionId);
    if (!chosen) return;

    setHasAnswered(true);
    setCustomerMood(chosen.customerReaction);

    setTurnHistory((prev) => [
      ...prev,
      {
        turn: currentTurnIdx + 1,
        success: chosen.isCorrect,
        feedback: chosen.feedback,
      },
    ]);
  };

  const handleNextTurn = () => {
    if (currentTurnIdx < content.turns.length - 1) {
      setCurrentTurnIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
      setCustomerMood("WAITING");
    } else {
      setIsScenarioFinished(true);
      setCustomerMood("SUCCESS");
    }
  };

  const chosenOption = currentTurn?.workerOptions.find((o) => o.id === selectedOptionId);

  if (isScenarioFinished) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4 shadow-xs">
          <Trophy className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 font-['Fredoka',sans-serif] mb-2">
          Scenario Completed!
        </h3>
        <p className="text-sm text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
          {content.successSummary}
        </p>

        {/* Customer simulation recap */}
        <div className="mb-6 max-w-md mx-auto text-left">
          <CustomerSimulation
            mood="SUCCESS"
            customerName={content.customerPersona.name}
            avatarEmoji={content.customerPersona.avatar}
            speechText="Thank you so much! You made my visit so smooth and welcoming."
            contextNote={content.setting}
          />
        </div>

        <button
          onClick={() => onComplete(15)}
          className="bg-[#58CC02] hover:bg-[#46A302] active:translate-y-0.5 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-[0_4px_0_#3B8B00] hover:shadow-[0_2px_0_#3B8B00] inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Claim +15 XP & Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Workplace Setting header */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md">
              Workplace Scenario Simulation
            </span>
            <span className="text-xs text-slate-400">
              Round {currentTurnIdx + 1} of {content.turns.length}
            </span>
          </div>
          <h3 className="text-lg font-bold font-['Fredoka',sans-serif]">
            {content.setting}
          </h3>
        </div>
        <div className="text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          Target: {content.customerGoal}
        </div>
      </div>

      {/* Simulated Customer */}
      <CustomerSimulation
        mood={customerMood}
        customerName={content.customerPersona.name}
        avatarEmoji={content.customerPersona.avatar}
        speechText={currentTurn.customerSpeech}
        signDescription={currentTurn.customerSign}
        contextNote={content.customerPersona.note}
      />

      {/* Worker Response Choices */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs">
        <div className="mb-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Your Turn — How should you respond as the worker?
          </span>
          <p className="text-sm font-semibold text-gray-800">
            Select the best customer-service action to advance the interaction:
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {currentTurn.workerOptions.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? hasAnswered
                      ? option.isCorrect
                        ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                        : "bg-red-50 border-red-400 text-red-950"
                      : "bg-blue-50/80 border-blue-500 text-blue-950 shadow-xs"
                    : hasAnswered && option.isCorrect
                    ? "bg-emerald-50/50 border-emerald-300 text-emerald-900"
                    : "bg-white border-gray-200 hover:border-gray-300 text-gray-800"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                    isSelected
                      ? hasAnswered
                        ? option.isCorrect
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-red-500 bg-red-500 text-white"
                        : "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="flex-1 text-sm font-medium leading-relaxed">
                  {option.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback Alert if confirmed */}
        {hasAnswered && chosenOption && (
          <div
            className={`p-4 rounded-xl mb-5 flex items-start gap-3 ${
              chosenOption.isCorrect
                ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                : "bg-amber-50 border border-amber-200 text-amber-900"
            }`}
          >
            {chosenOption.isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs sm:text-sm">
              <strong className="block font-bold mb-0.5">
                {chosenOption.isCorrect ? "Great Customer Response!" : "Needs Adjustment"}
              </strong>
              <p>{chosenOption.feedback}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-end">
          {!hasAnswered ? (
            <button
              disabled={!selectedOptionId}
              onClick={handleConfirmTurn}
              className={`font-bold py-3 px-6 rounded-xl transition-all text-sm cursor-pointer ${
                selectedOptionId
                  ? "bg-[#58CC02] hover:bg-[#46A302] text-white shadow-[0_3px_0_#3B8B00]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm Response
            </button>
          ) : (
            <button
              onClick={handleNextTurn}
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm flex items-center gap-2 cursor-pointer"
            >
              <span>
                {currentTurnIdx < content.turns.length - 1 ? "Next Dialogue Step" : "Complete Scenario"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
