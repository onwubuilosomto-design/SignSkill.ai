import React from "react";
import { AslWord } from "../types";
import { BookOpen, Sparkles, Check, ArrowRight } from "lucide-react";

interface VocabularyLibraryProps {
  words: AslWord[];
  currentWord: string;
  onSelectWord: (word: string) => void;
}

export const VocabularyLibrary: React.FC<VocabularyLibraryProps> = ({
  words,
  currentWord,
  onSelectWord,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-bold text-gray-900 font-['Fredoka',sans-serif]">
            ASL Vocabulary Library
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
          {words.length} Signs
        </span>
      </div>

      <p className="text-xs sm:text-sm text-gray-600 mb-4">
        Tap any word to load it directly into your live camera training view:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {words.map((item) => {
          const isSelected = item.word.toUpperCase() === currentWord.toUpperCase();
          return (
            <div
              key={item.word}
              onClick={() => onSelectWord(item.word)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-green-50/60 border-green-400 ring-2 ring-green-300 shadow-xs"
                  : "bg-gray-50/70 border-gray-200 hover:bg-gray-100/80 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✋</span>
                  <span className="font-bold text-sm sm:text-base text-gray-900 font-['Fredoka',sans-serif]">
                    {item.word}
                  </span>
                </div>
                {isSelected ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-200/80 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Active
                  </span>
                ) : (
                  <span className="text-xs text-gray-400 flex items-center gap-0.5">
                    Practice <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </div>

              <div className="flex items-start gap-2.5 mb-2">
                {item.videoSrc ? (
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-slate-900 border border-gray-200 shrink-0 shadow-2xs">
                    <video
                      src={item.videoSrc}
                      poster={item.imageSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs text-[9px] text-white px-1 py-0.2 rounded font-bold">
                      2.5s
                    </div>
                  </div>
                ) : item.imageSrc ? (
                  <img
                    src={item.imageSrc}
                    alt={`Sign for ${item.word}`}
                    className="w-16 h-14 rounded-lg object-cover border border-gray-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
                <p className="text-xs text-gray-600 leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>

              <div className="text-[11px] text-green-800 bg-white/80 p-2 rounded-xl border border-gray-100">
                <span className="font-semibold text-green-700">💡 Motion: </span>
                {item.motionTip}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
