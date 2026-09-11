import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { EvaluationResult } from "../types";
import { OwlMascot } from "./OwlMascot";
import { ArrowRight, RotateCcw, CheckCircle2, AlertTriangle, Sparkles, Award } from "lucide-react";

interface ScorecardProps {
  result: EvaluationResult;
  targetWord: string;
  onNextWord: () => void;
  onRetry: () => void;
}

export const Scorecard: React.FC<ScorecardProps> = ({
  result,
  targetWord,
  onNextWord,
  onRetry,
}) => {
  // Trigger balloons/confetti effect on success
  useEffect(() => {
    if (result.is_correct) {
      // Confetti shower
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#58CC02", "#FFC800", "#1CB0F6", "#FF4B4B", "#CE82FF"],
      });

      // Side fireworks burst
      const end = Date.now() + 1000;
      const interval: any = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() * 0.5 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [result]);

  return (
    <div
      id="ai-scorecard"
      className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
        <h3 className="text-xl font-black text-gray-900 font-['Fredoka',sans-serif] flex items-center gap-2">
          <span>📊 AI Performance Scorecard</span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
            For "{targetWord}"
          </span>
        </h3>
        {result.is_correct && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>+20 XP & +1 Streak!</span>
          </div>
        )}
      </div>

      {/* Main Status Banner */}
      {result.is_correct ? (
        <div
          id="scorecard-success-banner"
          className="bg-green-50 border-2 border-green-500/40 rounded-xl p-4 sm:p-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-black text-green-900 font-['Fredoka',sans-serif]">
                🎉 EXCELLENT WORK!
              </p>
              <p className="text-xs sm:text-sm text-green-700 font-medium">
                Your sign matches the official ASL hand gesture accurately.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-green-200 shadow-xs">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-xs text-gray-500 font-bold uppercase">Score</span>
            <span className="text-2xl font-black text-green-600 font-['Fredoka',sans-serif]">
              {result.score}/100
            </span>
          </div>
        </div>
      ) : (
        <div
          id="scorecard-error-banner"
          className="bg-amber-50 border-2 border-amber-400/40 rounded-xl p-4 sm:p-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-black text-amber-900 font-['Fredoka',sans-serif]">
                ⚠️ NOT QUITE RIGHT!
              </p>
              <p className="text-xs sm:text-sm text-amber-800 font-medium">
                Check the coach tips below to align your fingers and palm orientation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-amber-200 shadow-xs">
            <span className="text-xs text-gray-500 font-bold uppercase">Score</span>
            <span className="text-2xl font-black text-amber-600 font-['Fredoka',sans-serif]">
              {result.score}/100
            </span>
          </div>
        </div>
      )}

      {/* Coach Feedback Box */}
      <div
        id="coach-feedback-box"
        className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-4 sm:p-5 mb-6 flex items-start gap-4"
      >
        <OwlMascot
          size={56}
          mood={result.is_correct ? "success" : "encourage"}
          className="shrink-0 drop-shadow-xs"
        />
        <div className="flex-1">
          <h4 className="text-sm font-bold text-blue-900 mb-1 flex items-center gap-1.5">
            <span>🦉 Coach Feedback</span>
          </h4>
          <p className="text-sm text-gray-800 leading-relaxed font-medium">
            {result.feedback}
          </p>
        </div>
      </div>

      {/* Buttons matching Streamlit Try Next Word control */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <button
          id="retry-current-word-btn"
          type="button"
          onClick={onRetry}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-2xs font-['Fredoka',sans-serif]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Practice Again</span>
        </button>

        <button
          id="try-next-word-btn"
          type="button"
          onClick={onNextWord}
          className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-[#58CC02] hover:bg-[#46A302] text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:translate-y-0.5 font-['Fredoka',sans-serif]"
        >
          <span>🔄 Try Next Word</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
