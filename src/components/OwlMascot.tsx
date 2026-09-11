import React from "react";

interface OwlMascotProps {
  mood?: "normal" | "analyzing" | "success" | "encourage";
  className?: string;
  size?: number;
}

export const OwlMascot: React.FC<OwlMascotProps> = ({
  mood = "normal",
  className = "",
  size = 64
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label={`Owl mascot: ${mood}`}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="drop-shadow-sm overflow-visible"
      >
        {/* Owl Body */}
        <ellipse cx="50" cy="52" rx="38" ry="42" fill="#58CC02" />
        {/* Belly patch */}
        <ellipse cx="50" cy="58" rx="26" ry="28" fill="#78D82A" />
        <ellipse cx="50" cy="62" rx="20" ry="20" fill="#8CE23D" />

        {/* Feathers on belly */}
        <path
          d="M 44 54 Q 50 58 56 54"
          stroke="#46A302"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 42 62 Q 50 67 58 62"
          stroke="#46A302"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 45 70 Q 50 74 55 70"
          stroke="#46A302"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Wings */}
        <ellipse
          cx="16"
          cy="54"
          rx="9"
          ry="20"
          fill="#46A302"
          transform={mood === "success" ? "rotate(-25 16 54)" : "rotate(-10 16 54)"}
        />
        <ellipse
          cx="84"
          cy="54"
          rx="9"
          ry="20"
          fill="#46A302"
          transform={mood === "success" ? "rotate(25 84 54)" : "rotate(10 84 54)"}
        />

        {/* Feet */}
        <ellipse cx="40" cy="92" rx="7" ry="4" fill="#FF9600" />
        <ellipse cx="60" cy="92" rx="7" ry="4" fill="#FF9600" />

        {/* Eyebrows / Tuft */}
        <path
          d="M 28 20 Q 38 12 48 24"
          stroke="#3C8C00"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 72 20 Q 62 12 52 24"
          stroke="#3C8C00"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Big Eye Sockets */}
        <circle cx="36" cy="38" r="14" fill="#FFFFFF" stroke="#46A302" strokeWidth="2.5" />
        <circle cx="64" cy="38" r="14" fill="#FFFFFF" stroke="#46A302" strokeWidth="2.5" />

        {/* Pupils & Eye Expressions */}
        {mood === "success" ? (
          <>
            {/* Happy squint eyes */}
            <path
              d="M 28 40 Q 36 32 44 40"
              stroke="#2E384D"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 56 40 Q 64 32 72 40"
              stroke="#2E384D"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
          </>
        ) : mood === "analyzing" ? (
          <>
            {/* Focused looking eyes */}
            <circle cx="39" cy="38" r="7" fill="#1CB0F6" />
            <circle cx="39" cy="38" r="4.5" fill="#144673" />
            <circle cx="41" cy="36" r="2" fill="#FFFFFF" />

            <circle cx="67" cy="38" r="7" fill="#1CB0F6" />
            <circle cx="67" cy="38" r="4.5" fill="#144673" />
            <circle cx="69" cy="36" r="2" fill="#FFFFFF" />

            {/* Magnifying glass */}
            <circle cx="72" cy="32" r="9" fill="none" stroke="#FFC800" strokeWidth="3" />
            <line x1="78" y1="38" x2="88" y2="48" stroke="#FF9600" strokeWidth="3.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Normal big pupils */}
            <circle cx="37" cy="38" r="6.5" fill="#2E384D" />
            <circle cx="63" cy="38" r="6.5" fill="#2E384D" />
            <circle cx="39" cy="36" r="2.2" fill="#FFFFFF" />
            <circle cx="65" cy="36" r="2.2" fill="#FFFFFF" />
          </>
        )}

        {/* Beak */}
        <polygon points="50,44 43,51 57,51" fill="#FF9600" />
        <polygon points="50,54 45,51 55,51" fill="#E67300" />

        {/* Cheerful blush */}
        {(mood === "success" || mood === "normal") && (
          <>
            <ellipse cx="23" cy="46" rx="4" ry="2.5" fill="#FF8484" opacity="0.6" />
            <ellipse cx="77" cy="46" rx="4" ry="2.5" fill="#FF8484" opacity="0.6" />
          </>
        )}
      </svg>
    </div>
  );
};
