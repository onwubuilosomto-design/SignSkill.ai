import React from "react";
import { OwlMascot } from "./OwlMascot";
import { Sliders, Flame, Diamond, ArrowLeft } from "lucide-react";
import { PWAInstallButton } from "./PWAInstallButton";

interface NavbarStatsProps {
  streak: number;
  points: number;
  onOpenDemoControls: () => void;
  isMockActive: boolean;
  onBackToHome?: () => void;
  modeTitle?: string;
}

export const NavbarStats: React.FC<NavbarStatsProps> = ({
  streak,
  points,
  onOpenDemoControls,
  isMockActive,
  onBackToHome,
  modeTitle,
}) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center gap-2.5">
            {onBackToHome && (
              <button
                id="btn-back-to-home"
                onClick={onBackToHome}
                className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors mr-1 cursor-pointer"
                title="Return to Mode Selection"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Tracks</span>
              </button>
            )}

            <button 
              onClick={onBackToHome}
              className={`flex items-center gap-2.5 text-left ${onBackToHome ? "cursor-pointer group" : ""}`}
              title={onBackToHome ? "Back to Mode Selection" : undefined}
            >
              <OwlMascot size={40} mood="normal" />
              <div className="flex items-baseline gap-2">
                <h1
                  id="app-title"
                  className="text-2xl font-bold tracking-tight text-gray-900 font-['Fredoka',sans-serif] flex items-center gap-1.5"
                >
                  SignLingo <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 tracking-normal font-sans">ASL AI</span>
                </h1>
                {modeTitle && (
                  <span className="hidden md:inline-block text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md border border-gray-200">
                    {modeTitle}
                  </span>
                )}
              </div>
            </button>
          </div>

          <div className="sm:hidden flex items-center gap-1.5">
            <PWAInstallButton variant="header" />
          </div>
        </div>

        {/* Top Performance Stats Bar matching Streamlit */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center sm:justify-end flex-wrap">
          {/* Daily Streak Box */}
          <div
            id="streak-box"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-bold shadow-xs transition-transform hover:scale-102"
            style={{
              backgroundColor: "#FFF3CD",
              borderLeft: "5px solid #FFC107",
              color: "#856404",
            }}
            title="Maintain your daily learning streak!"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>Daily Streak: {streak} Days</span>
          </div>

          {/* Total Points Box */}
          <div
            id="points-box"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-bold shadow-xs transition-transform hover:scale-102"
            style={{
              backgroundColor: "#E2F0D9",
              borderLeft: "5px solid #70AD47",
              color: "#385723",
            }}
            title="Earn +20 XP for every successfully signed challenge!"
          >
            <Diamond className="w-4 h-4 text-emerald-600 fill-emerald-500" />
            <span>Total Points: {points} XP</span>
          </div>

          {/* Install Button on desktop / tablet */}
          <div className="hidden sm:block">
            <PWAInstallButton variant="header" />
          </div>

          {/* Hackathon Demo Controls button */}
          <button
            id="demo-controls-toggle-btn"
            onClick={onOpenDemoControls}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isMockActive
                ? "bg-amber-50 border-amber-300 text-amber-800 ring-2 ring-amber-300"
                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
            title="Open Hackathon Demo Controls"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Demo Controls</span>
            {isMockActive && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
