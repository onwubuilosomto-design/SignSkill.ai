import React from "react";
import { OwlMascot } from "./OwlMascot";
import { 
  Hand, 
  Coffee, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Diamond,
  Sliders
} from "lucide-react";
import { PWAInstallButton } from "./PWAInstallButton";

interface ModeSelectionHomeProps {
  onSelectGeneral: () => void;
  onSelectBarista: () => void;
  onSelectLearn?: () => void;
  streak: number;
  points: number;
  onOpenDemoControls: () => void;
  isMockActive: boolean;
}

export const ModeSelectionHome: React.FC<ModeSelectionHomeProps> = ({
  onSelectGeneral,
  onSelectBarista,
  onSelectLearn,
  streak,
  points,
  onOpenDemoControls,
  isMockActive,
}) => {
  return (
    <div className="min-h-screen bg-[#F7F9FA] text-gray-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo and Brand */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2.5">
              <OwlMascot size={38} mood="normal" />
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-gray-900 font-['Fredoka',sans-serif] flex items-center gap-1.5">
                  SignLingo <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 tracking-normal font-sans">ASL AI</span>
                </span>
              </div>
            </div>

            <div className="sm:hidden">
              <PWAInstallButton variant="header" />
            </div>
          </div>

          {/* User Progress Stats */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center sm:justify-end flex-wrap">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-xs"
              style={{
                backgroundColor: "#FFF3CD",
                borderLeft: "4px solid #FFC107",
                color: "#856404",
              }}
              title="Daily practice streak"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{streak} Day Streak</span>
            </div>

            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-xs"
              style={{
                backgroundColor: "#E2F0D9",
                borderLeft: "4px solid #70AD47",
                color: "#385723",
              }}
              title="Total practice points"
            >
              <Diamond className="w-4 h-4 text-emerald-600 fill-emerald-500" />
              <span>{points} XP</span>
            </div>

            <button
              onClick={onOpenDemoControls}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isMockActive
                  ? "bg-amber-50 border-amber-300 text-amber-800 ring-2 ring-amber-300"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
              title="Hackathon Demo Controls"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Demo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <OwlMascot size={58} mood="success" />
            <div className="text-left bg-white border border-green-200 rounded-2xl px-4 py-2 shadow-xs relative">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wider">Ready to practice?</p>
              <p className="text-sm font-medium text-gray-700">Choose a track to start signing with AI guidance!</p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-['Fredoka',sans-serif] mb-3">
            Select Your Learning Track
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
            Learn real-time American Sign Language gestures through interactive computer vision. Start with everyday essentials or preview upcoming role tracks.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-12">
          {/* Track 1: General (Active) */}
          <div 
            id="track-card-general"
            className="bg-white rounded-2xl border-2 border-green-500 shadow-md hover:shadow-xl transition-all duration-200 p-6 flex flex-col justify-between relative overflow-hidden ring-4 ring-green-100/50"
          >
            {/* Top highlight ribbon */}
            <div className="absolute top-0 right-0 bg-green-500 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
              Available Now
            </div>

            <div>
              {/* Icon & Category */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shadow-xs">
                  <Hand className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-green-600">Core Track</span>
                  <h2 className="text-xl font-bold text-gray-900 font-['Fredoka',sans-serif]">General ASL</h2>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Foundational vocabulary and essential polite gestures for everyday communication and universal interactions.
              </p>

              {/* Sample Vocabulary Chips */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Included Signs:</p>
                <div className="flex flex-wrap gap-1.5">
                  {["HELLO", "THANK YOU", "HELP", "YES", "NO"].map((w) => (
                    <span 
                      key={w}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-2 mb-6 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Interactive camera grading & gesture AI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Video motion demos & hand shape guides</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Streak tracking and gamified XP rewards</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div>
              <button
                id="btn-start-general"
                onClick={onSelectGeneral}
                className="w-full bg-[#58CC02] hover:bg-[#46A302] active:translate-y-0.5 text-white font-bold py-3.5 px-5 rounded-xl transition-all shadow-[0_4px_0_#3B8B00] hover:shadow-[0_2px_0_#3B8B00] flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <span>Start General Practice</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Track 2: Customer Service - Café Barista */}
          <div 
            id="track-card-barista"
            onClick={onSelectBarista}
            className="bg-white rounded-2xl border-2 border-amber-500 shadow-md hover:shadow-xl transition-all duration-200 p-6 flex flex-col justify-between relative overflow-hidden ring-4 ring-amber-100/50 cursor-pointer"
          >
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
              Available Now
            </div>

            <div>
              {/* Icon & Category */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
                  <Coffee className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Customer Service</span>
                  <h2 className="text-xl font-bold text-gray-900 font-['Fredoka',sans-serif]">Café Barista</h2>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Specialized sign language tailored for café counters, taking drink orders, milk substitutions, and serving Deaf customers.
              </p>

              {/* Sample Vocabulary Chips */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Key Topics:</p>
                <div className="flex flex-wrap gap-1.5">
                  {["GREETINGS", "TAKING ORDERS", "COFFEE & DRINKS", "MILK & SIZES", "PAYMENT"].map((w) => (
                    <span 
                      key={w}
                      className="px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-lg border border-amber-200/60"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-2 mb-6 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>10 counter situation topics & video guides</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Interactive practice questions & instant feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Etiquette guides for inclusive counter hospitality</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div>
              <button
                id="btn-start-barista"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBarista();
                }}
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] active:translate-y-0.5 text-white font-bold py-3.5 px-5 rounded-xl transition-all shadow-[0_4px_0_#B45309] hover:shadow-[0_2px_0_#B45309] flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <span>Start Café Barista</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Track 3: Customer Service - Retail & Front Desk (Upcoming) */}
          <div 
            id="track-card-retail"
            className="bg-white/80 rounded-2xl border border-gray-200 p-6 flex flex-col justify-between relative overflow-hidden hover:border-gray-300 transition-all duration-200"
          >
            <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl border-l border-b border-blue-200">
              Coming Soon
            </div>

            <div>
              {/* Icon & Category */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                  <ShoppingBag className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Customer Service</span>
                  <h2 className="text-xl font-bold text-gray-900 font-['Fredoka',sans-serif]">Retail & Desk</h2>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Essential customer service gestures for retail floors, checkout registers, hospitality counters, and store directions.
              </p>

              {/* Sample Vocabulary Chips */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Planned Signs:</p>
                <div className="flex flex-wrap gap-1.5">
                  {["CAN I HELP?", "RECEIPT", "RESTROOM", "BAG", "DISCOUNT"].map((w) => (
                    <span 
                      key={w}
                      className="px-2.5 py-1 bg-blue-50 text-blue-800 text-xs font-semibold rounded-lg border border-blue-200/60"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-2 mb-6 text-xs text-gray-500">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>Store aisle directions & customer queries</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>Register checkout & return policy signs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>Accessible hospitality greetings</span>
                </li>
              </ul>
            </div>

            {/* Disabled State / Preview CTA */}
            <div>
              <button
                disabled
                className="w-full bg-gray-100 text-gray-400 font-semibold py-3 px-4 rounded-xl border border-gray-200 flex items-center justify-center gap-2 text-sm cursor-not-allowed"
              >
                <span>Role In Development</span>
              </button>
            </div>
          </div>
        </div>

        {/* Why Learn Role-Based ASL info banner */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Sparkles className="w-7 h-7" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900 font-['Fredoka',sans-serif] mb-1">
              Building Inclusive Customer Experiences
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Customer service roles are the front line of accessibility. By learning both core ASL and role-specific signs, team members can greet, assist, and connect comfortably with the Deaf and Hard-of-Hearing community.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={onSelectGeneral}
              className="w-full md:w-auto px-5 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore General Signs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-gray-200/80 bg-white py-6 text-center text-xs text-gray-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <OwlMascot size={22} mood="normal" />
            <span className="font-semibold text-gray-700">SignLingo AI</span>
            <span>• Multimodal Vision ASL Learning</span>
          </div>
          <p className="text-gray-400">
            Role-Based & General American Sign Language Practice
          </p>
        </div>
      </footer>
    </div>
  );
};
