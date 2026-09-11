import React from "react";
import { X, CheckCircle, ShieldAlert, Cpu, Sparkles, RefreshCw } from "lucide-react";
import { AslWord } from "../types";

interface DemoSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMockActive: boolean;
  onToggleMock: (active: boolean) => void;
  targetWord: string;
  onSelectWord: (word: string) => void;
  allWords: AslWord[];
  streak: number;
  points: number;
  onUpdateStats: (streak: number, points: number) => void;
  onTriggerMockEvaluation: () => void;
}

export const DemoSidebar: React.FC<DemoSidebarProps> = ({
  isOpen,
  onClose,
  isMockActive,
  onToggleMock,
  targetWord,
  onSelectWord,
  allWords,
  streak,
  points,
  onUpdateStats,
  onTriggerMockEvaluation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col overflow-y-auto border-l border-gray-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-gray-900 text-base font-['Fredoka',sans-serif]">
              🛠️ Hackathon Demo Controls
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 cursor-pointer"
            aria-label="Close demo controls"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6 flex-1 text-sm">
          {/* Streamlit Fallback Simulation Toggle */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="fallback-toggle"
                className="font-bold text-gray-900 cursor-pointer text-sm select-none"
              >
                Simulate Successful API Grading Response
              </label>
              <input
                id="fallback-toggle"
                type="checkbox"
                checked={isMockActive}
                onChange={(e) => onToggleMock(e.target.checked)}
                className="w-5 h-5 accent-green-600 rounded cursor-pointer"
              />
            </div>

            <p className="text-xs text-gray-600 mt-2">
              Safety bypass for live hackathon presentations or when running without a webcam.
            </p>

            {isMockActive ? (
              <div className="mt-3 bg-green-100 border border-green-300 text-green-800 text-xs px-3 py-2 rounded-lg font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                <span>Mock Data Active: Safety bypass operational.</span>
              </div>
            ) : (
              <div className="mt-3 bg-gray-100 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <span>Live Gemini API Grading Active</span>
              </div>
            )}

            {/* Quick Instant Test Button */}
            <button
              id="instant-eval-btn"
              type="button"
              onClick={onTriggerMockEvaluation}
              className="mt-3 w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate Scorecard for "{targetWord}" Now</span>
            </button>
          </div>

          {/* Quick Target Word Switcher */}
          <div>
            <label className="font-bold text-gray-800 block mb-2 text-xs uppercase tracking-wider text-gray-500">
              Select Target Challenge Word
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {allWords.map((wordItem) => {
                const isSelected = wordItem.word.toUpperCase() === targetWord.toUpperCase();
                return (
                  <button
                    key={wordItem.id}
                    onClick={() => onSelectWord(wordItem.word)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? "bg-green-50 border-green-500 text-green-900 font-bold shadow-2xs"
                        : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{wordItem.emoji}</span>
                      <span>{wordItem.word}</span>
                    </span>
                    {isSelected && (
                      <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">
                        ACTIVE
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gamification Stats Overrides */}
          <div className="border-t border-gray-100 pt-4">
            <label className="font-bold text-gray-800 block mb-2 text-xs uppercase tracking-wider text-gray-500">
              App Memory Gamification State
            </label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs text-gray-500 block">Streak (Days)</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-black text-lg text-amber-600 font-['Fredoka',sans-serif]">
                    {streak}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateStats(Math.max(0, streak - 1), points)}
                      className="w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      onClick={() => onUpdateStats(streak + 1, points)}
                      className="w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs text-gray-500 block">Total XP</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-black text-lg text-emerald-600 font-['Fredoka',sans-serif]">
                    {points}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateStats(streak, Math.max(0, points - 20))}
                      className="w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      onClick={() => onUpdateStats(streak, points + 20)}
                      className="w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onUpdateStats(5, 120)}
              className="w-full py-1.5 text-xs text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer font-medium"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset to Default (Streak: 5, XP: 120)</span>
            </button>
          </div>

          {/* Model Specification info */}
          <div className="border-t border-gray-100 pt-3 text-[11px] text-gray-500 space-y-1">
            <p>
              <span className="font-semibold text-gray-700">AI Model:</span> gemini-3.8-flash (Spatial Vision)
            </p>
            <p>
              <span className="font-semibold text-gray-700">Response Mode:</span> Structured JSON Schema
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-xl text-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
