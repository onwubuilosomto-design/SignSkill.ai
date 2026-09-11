import React, { useState } from "react";
import { usePWAInstall } from "../hooks/usePWAInstall";
import { Download, Smartphone, Share, PlusSquare, X, Check } from "lucide-react";

interface PWAInstallButtonProps {
  variant?: "header" | "card" | "banner";
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = "header",
  className = "",
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If running in standalone mobile mode already
  if (isInstalled) {
    if (variant === "card") {
      return (
        <div className="flex items-center gap-2 text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-xl border border-green-200">
          <Check className="w-4 h-4 text-green-600" />
          <span>Installed as Mobile App</span>
        </div>
      );
    }
    return null;
  }

  // Handle click based on platform
  const handleClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      // Show guided install sheet for iOS or manual instructions
      setShowGuide(true);
    }
  };

  return (
    <>
      {variant === "header" ? (
        <button
          id="pwa-install-header-btn"
          type="button"
          onClick={handleClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-500 hover:bg-green-600 text-white shadow-xs transition-all cursor-pointer ${className}`}
          title="Install SignLingo on your device"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{isInstallable ? "Install App" : isIOS ? "Get iOS App" : "Install App"}</span>
        </button>
      ) : variant === "banner" ? (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3.5 rounded-2xl shadow-sm flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold font-['Fredoka',sans-serif]">
                Install SignLingo for Mobile
              </p>
              <p className="text-[11px] text-white/90">
                Fullscreen camera, faster AI grading, and home screen access.
              </p>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="px-3.5 py-1.5 bg-white text-green-700 font-bold text-xs rounded-xl shadow-xs hover:bg-green-50 shrink-0 cursor-pointer"
          >
            Install
          </button>
        </div>
      ) : (
        <button
          id="pwa-install-action-btn"
          type="button"
          onClick={handleClick}
          className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm cursor-pointer transition-all ${className}`}
        >
          <Download className="w-4 h-4" />
          <span>Install SignLingo Mobile App</span>
        </button>
      )}

      {/* Guided Install Modal for iOS and other browsers */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 sm:p-6 shadow-2xl border border-gray-100 text-gray-900 relative">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Fredoka',sans-serif]">
                  Install SignLingo App
                </h3>
                <p className="text-xs text-gray-500">
                  {isIOS ? "iOS Safari Home Screen Setup" : "Add to Mobile Home Screen"}
                </p>
              </div>
            </div>

            {isIOS ? (
              <div className="space-y-3 my-4 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-xl">
                  <Share className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p>
                    1. Tap the <strong className="text-gray-900">Share</strong> button in your Safari bottom navigation bar.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-xl">
                  <PlusSquare className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
                  <p>
                    2. Scroll down and tap <strong className="text-gray-900">Add to Home Screen</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 bg-green-50 rounded-xl text-green-900">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p>
                    3. Tap <strong className="text-green-950">Add</strong> in the top-right corner to launch in full standalone mode!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 my-4 text-xs sm:text-sm text-gray-700">
                <p className="text-xs text-gray-600">
                  To install on Android, Chrome, or Edge:
                </p>
                <div className="p-3 bg-gray-50 rounded-xl space-y-2 text-xs">
                  <p>1. Open your browser menu (<strong>⋮</strong> or three dots).</p>
                  <p>2. Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.</p>
                  <p>3. Confirm to access SignLingo directly from your home screen app icon.</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowGuide(false)}
              className="mt-2 w-full rounded-xl bg-gray-900 hover:bg-black py-2.5 text-xs sm:text-sm font-bold text-white transition cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
