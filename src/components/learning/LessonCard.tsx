import React from "react";
import { Lesson } from "../../types/training";
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Star, 
  Clock, 
  Eye, 
  Hand, 
  Heart, 
  Smile, 
  Coffee, 
  Compass, 
  AlertCircle, 
  HelpCircle, 
  Zap, 
  ShoppingBag, 
  Award, 
  CheckSquare, 
  RefreshCw, 
  FileText 
} from "lucide-react";

interface LessonCardProps {
  lesson: Lesson;
  status: "completed" | "current" | "available" | "locked";
  onSelect: (lesson: Lesson) => void;
  accentColor?: string;
  orderNumber: number;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  status,
  onSelect,
  accentColor = "#10B981",
  orderNumber,
}) => {
  // Select icon dynamically
  const renderIcon = () => {
    const props = { className: "w-5 h-5 stroke-[2.2]" };
    switch (lesson.iconName) {
      case "Eye": return <Eye {...props} />;
      case "Hand": return <Hand {...props} />;
      case "Heart": return <Heart {...props} />;
      case "Smile": return <Smile {...props} />;
      case "Coffee": return <Coffee {...props} />;
      case "Compass": return <Compass {...props} />;
      case "AlertCircle": return <AlertCircle {...props} />;
      case "HelpCircle": return <HelpCircle {...props} />;
      case "Zap": return <Zap {...props} />;
      case "ShoppingBag": return <ShoppingBag {...props} />;
      case "Award": return <Award {...props} />;
      case "CheckSquare": return <CheckSquare {...props} />;
      case "RefreshCw": return <RefreshCw {...props} />;
      case "FileText": return <FileText {...props} />;
      default: return <Hand {...props} />;
    }
  };

  const isClickable = status !== "locked";

  return (
    <div
      id={`lesson-card-${lesson.id}`}
      onClick={() => {
        if (isClickable) onSelect(lesson);
      }}
      className={`relative rounded-2xl border-2 transition-all duration-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        status === "completed"
          ? "bg-white border-emerald-300 hover:border-emerald-400 hover:shadow-md cursor-pointer"
          : status === "current"
          ? "bg-white border-green-500 shadow-md ring-4 ring-green-100 cursor-pointer hover:shadow-lg"
          : status === "available"
          ? "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer"
          : "bg-gray-50/80 border-gray-200 text-gray-400 cursor-not-allowed opacity-75"
      }`}
    >
      {/* Left section with node icon and title */}
      <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
        {/* Status Node Icon */}
        <div className="relative shrink-0">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              status === "completed"
                ? "bg-emerald-100 text-emerald-700 shadow-xs"
                : status === "current"
                ? "bg-green-500 text-white shadow-md animate-bounce-subtle"
                : status === "available"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {status === "completed" ? (
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            ) : status === "locked" ? (
              <Lock className="w-5 h-5 text-gray-400" />
            ) : (
              renderIcon()
            )}
          </div>

          {/* Small number badge */}
          <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-white border border-gray-200 text-[10px] font-bold text-gray-600 flex items-center justify-center shadow-xs">
            {orderNumber}
          </span>
        </div>

        {/* Content Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <h4
              className={`text-base font-bold truncate font-['Fredoka',sans-serif] ${
                status === "locked" ? "text-gray-400" : "text-gray-900"
              }`}
            >
              {lesson.title}
            </h4>
            {status === "current" && (
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                Next Up
              </span>
            )}
            {status === "completed" && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Completed
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 line-clamp-1 mb-1.5">
            {lesson.description}
          </p>

          <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-400 flex-wrap">
            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
              <span>+{lesson.xp} XP</span>
            </span>
            <span>{lesson.exercises.length} Exercises</span>
          </div>
        </div>
      </div>

      {/* Right action button */}
      <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 flex items-center justify-end">
        {status === "locked" ? (
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium px-3 py-2 bg-gray-100 rounded-xl">
            <Lock className="w-3.5 h-3.5" />
            <span>Locked</span>
          </div>
        ) : status === "completed" ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(lesson);
            }}
            className="w-full sm:w-auto text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition-colors border border-emerald-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>Review</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(lesson);
            }}
            className="w-full sm:w-auto text-xs font-bold text-white bg-[#58CC02] hover:bg-[#46A302] active:translate-y-0.5 px-4 py-2.5 rounded-xl transition-all shadow-[0_3px_0_#3B8B00] hover:shadow-[0_1px_0_#3B8B00] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start</span>
            <Play className="w-3.5 h-3.5 fill-white" />
          </button>
        )}
      </div>
    </div>
  );
};
