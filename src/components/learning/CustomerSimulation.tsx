import React from "react";
import { CustomerMood } from "../../types/training";
import { Sparkles, Smile, HelpCircle, CheckCircle, Clock } from "lucide-react";

interface CustomerSimulationProps {
  mood: CustomerMood;
  customerName?: string;
  avatarEmoji?: string;
  speechText?: string;
  signDescription?: string;
  contextNote?: string;
  isCompact?: boolean;
}

export const CustomerSimulation: React.FC<CustomerSimulationProps> = ({
  mood,
  customerName = "Simulated Customer",
  avatarEmoji = "👤",
  speechText,
  signDescription,
  contextNote,
  isCompact = false,
}) => {
  // Map mood to styling, icon, and readable status
  const moodConfig = {
    WAITING: {
      label: "Waiting Patiently",
      badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
      faceColor: "border-slate-300 bg-slate-50",
      icon: Clock,
      avatarBorder: "border-slate-300",
      statusEmoji: "⏳",
      expressionDescription: "Maintaining calm eye contact at the counter",
    },
    HAPPY: {
      label: "Happy & Understood",
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
      faceColor: "border-emerald-400 bg-emerald-50/70",
      icon: Smile,
      avatarBorder: "border-emerald-500 ring-4 ring-emerald-100",
      statusEmoji: "😊",
      expressionDescription: "Nodding with a warm, appreciative smile",
    },
    CONFUSED: {
      label: "Confused / Uncertain",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
      faceColor: "border-amber-400 bg-amber-50/70",
      icon: HelpCircle,
      avatarBorder: "border-amber-500 ring-4 ring-amber-100",
      statusEmoji: "🤔",
      expressionDescription: "Brows furrowed, waiting for clarification",
    },
    NEEDS_SMILE: {
      label: "Needs Warm Expression",
      badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-300",
      faceColor: "border-indigo-400 bg-indigo-50/70",
      icon: Smile,
      avatarBorder: "border-indigo-500 ring-4 ring-indigo-100",
      statusEmoji: "🙂",
      expressionDescription: "Understood your sign, but feels the interaction was cold",
    },
    SUCCESS: {
      label: "Delighted & Accommodated",
      badgeBg: "bg-green-100 text-green-900 border-green-400",
      faceColor: "border-green-500 bg-green-50",
      icon: CheckCircle,
      avatarBorder: "border-green-600 ring-4 ring-green-200",
      statusEmoji: "🎉",
      expressionDescription: "Thoroughly satisfied with your service & care!",
    },
  }[mood];

  const IconComponent = moodConfig.icon;

  if (isCompact) {
    return (
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 shadow-xs">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 shrink-0 ${moodConfig.avatarBorder} bg-white shadow-xs`}>
          {avatarEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-900 truncate">{customerName}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${moodConfig.badgeBg}`}>
              {moodConfig.statusEmoji} {moodConfig.label}
            </span>
          </div>
          {speechText && <p className="text-xs text-gray-600 truncate mt-0.5">"{speechText}"</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border-2 transition-all duration-300 p-4 sm:p-5 relative ${moodConfig.faceColor} shadow-xs`}>
      {/* Simulation Role Tag */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-600">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>Simulated Customer Simulation</span>
        </div>
        <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border shadow-xs ${moodConfig.badgeBg}`}>
          <IconComponent className="w-3.5 h-3.5" />
          <span>{moodConfig.statusEmoji} {moodConfig.label}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Customer Avatar Visual */}
        <div className="relative shrink-0 flex items-center gap-3">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl border-2 bg-white shadow-md ${moodConfig.avatarBorder} transition-transform duration-300 hover:scale-105`}>
            {avatarEmoji}
          </div>
          <div className="sm:hidden">
            <h4 className="font-bold text-gray-900 text-sm">{customerName}</h4>
            <p className="text-[11px] text-gray-500">{moodConfig.expressionDescription}</p>
          </div>
        </div>

        {/* Customer Dialogue / Communication Box */}
        <div className="flex-1 w-full">
          <div className="hidden sm:flex items-center justify-between mb-1">
            <h4 className="font-bold text-gray-900 text-sm">{customerName}</h4>
            <span className="text-xs text-gray-500 italic">{moodConfig.expressionDescription}</span>
          </div>

          {/* Speech / Sign bubble */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-xs relative">
            {speechText ? (
              <div className="mb-1.5">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                  Customer Says / Requests:
                </span>
                <p className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
                  "{speechText}"
                </p>
              </div>
            ) : null}

            {signDescription && (
              <div className="flex items-center gap-2 pt-1 border-t border-gray-100 mt-1.5 text-xs text-gray-700">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="font-medium">
                  <strong className="text-gray-900">Sign Communication:</strong> {signDescription}
                </span>
              </div>
            )}

            {contextNote && (
              <p className="text-[11px] text-gray-500 mt-1 italic">
                Context: {contextNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
