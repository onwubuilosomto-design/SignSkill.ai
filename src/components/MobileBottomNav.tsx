import React from "react";
import { Target, BookOpen, Flame, Sliders } from "lucide-react";

export type MobileTab = "practice" | "library" | "stats" | "controls";

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onChangeTab: (tab: MobileTab) => void;
  streak: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onChangeTab,
  streak,
}) => {
  return (
    <nav
      id="mobile-bottom-nav"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-1.5 flex items-center justify-around shadow-lg pb-[max(0.375rem,env(safe-area-inset-bottom))]"
    >
      <button
        onClick={() => onChangeTab("practice")}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-h-[44px] ${
          activeTab === "practice"
            ? "text-green-600 font-bold"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        <Target className={`w-5 h-5 ${activeTab === "practice" ? "stroke-[2.5]" : "stroke-2"}`} />
        <span className="text-[10px] mt-0.5 font-['Fredoka',sans-serif]">Practice</span>
      </button>

      <button
        onClick={() => onChangeTab("library")}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-h-[44px] ${
          activeTab === "library"
            ? "text-green-600 font-bold"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        <BookOpen className={`w-5 h-5 ${activeTab === "library" ? "stroke-[2.5]" : "stroke-2"}`} />
        <span className="text-[10px] mt-0.5 font-['Fredoka',sans-serif]">Words</span>
      </button>

      <button
        onClick={() => onChangeTab("stats")}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-h-[44px] relative ${
          activeTab === "stats"
            ? "text-amber-500 font-bold"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        <div className="relative">
          <Flame className={`w-5 h-5 ${activeTab === "stats" ? "fill-amber-500 text-amber-500" : "text-gray-500"}`} />
          <span className="absolute -top-1 -right-2 text-[9px] bg-amber-500 text-white font-black px-1 rounded-full">
            {streak}
          </span>
        </div>
        <span className="text-[10px] mt-0.5 font-['Fredoka',sans-serif]">Streak</span>
      </button>

      <button
        onClick={() => onChangeTab("controls")}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-h-[44px] ${
          activeTab === "controls"
            ? "text-green-600 font-bold"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        <Sliders className={`w-5 h-5 ${activeTab === "controls" ? "stroke-[2.5]" : "stroke-2"}`} />
        <span className="text-[10px] mt-0.5 font-['Fredoka',sans-serif]">Controls</span>
      </button>
    </nav>
  );
};
