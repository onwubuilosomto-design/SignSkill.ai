import React from "react";
import { Flame, Diamond, Award, Calendar, Smartphone, CheckCircle2 } from "lucide-react";
import { PWAInstallButton } from "./PWAInstallButton";

interface StatsViewProps {
  streak: number;
  points: number;
  targetWord: string;
}

export const StatsView: React.FC<StatsViewProps> = ({
  streak,
  points,
  targetWord,
}) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDayIdx = (new Date().getDay() + 6) % 7; // Monday = 0

  return (
    <div className="space-y-4">
      {/* Daily Streak Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 font-['Fredoka',sans-serif]">
                Daily Streak: {streak} Days
              </h3>
              <p className="text-xs text-gray-500">Practice every day to keep your streak alive!</p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
            🔥 On Fire
          </span>
        </div>

        {/* 7-day streak visualizer */}
        <div className="grid grid-cols-7 gap-2 text-center pt-2">
          {days.map((day, idx) => {
            const isPastOrToday = idx <= currentDayIdx;
            return (
              <div
                key={day}
                className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 text-xs ${
                  idx === currentDayIdx
                    ? "bg-amber-100 border border-amber-300 font-bold text-amber-900"
                    : isPastOrToday
                    ? "bg-amber-50 text-amber-800"
                    : "bg-gray-50 text-gray-400"
                }`}
              >
                <span className="text-[10px] font-semibold">{day}</span>
                {isPastOrToday ? (
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-gray-300" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Points and Milestones */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Diamond className="w-6 h-6 text-emerald-600 fill-emerald-500" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 font-['Fredoka',sans-serif]">
                Total Points: {points} XP
              </h3>
              <p className="text-xs text-gray-500">20 XP earned per valid gesture check</p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            Level {Math.floor(points / 60) + 1}
          </span>
        </div>

        {/* Progress bar towards next level */}
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Next Level Goal</span>
            <span className="font-bold text-gray-800">
              {points % 60} / 60 XP
            </span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, ((points % 60) / 60) * 100)}%` }}
            />
          </div>
        </div>

        {/* Badges / Milestones */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
          <div className="p-2.5 bg-gray-50 rounded-xl flex items-center gap-2 border border-gray-100">
            <Award className="w-4 h-4 text-amber-500" />
            <div>
              <p className="font-bold text-gray-800">Fast Learner</p>
              <p className="text-[10px] text-gray-500">Completed first 5 challenges</p>
            </div>
          </div>
          <div className="p-2.5 bg-gray-50 rounded-xl flex items-center gap-2 border border-gray-100">
            <Award className="w-4 h-4 text-purple-500" />
            <div>
              <p className="font-bold text-gray-800">Sign Master</p>
              <p className="text-[10px] text-gray-500">Mastered basic ASL greetings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile App Install Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 font-['Fredoka',sans-serif]">
              Mobile App Experience
            </h3>
            <p className="text-xs text-gray-500">Install to your phone home screen</p>
          </div>
        </div>

        <ul className="text-xs text-gray-600 space-y-1.5 mb-4">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
            <span>Standalone full-screen interface without browser URL bar</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
            <span>Flip between front and rear cameras with one tap</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
            <span>Haptic feedback and offline vocabulary caching</span>
          </li>
        </ul>

        <PWAInstallButton variant="card" />
      </div>
    </div>
  );
};
