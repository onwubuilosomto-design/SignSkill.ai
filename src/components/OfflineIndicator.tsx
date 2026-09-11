import React from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { WifiOff } from "lucide-react";

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      id="offline-banner"
      className="fixed bottom-20 sm:bottom-4 left-4 right-4 sm:right-auto sm:left-4 z-40 flex items-center justify-between sm:justify-start gap-2.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-white shadow-lg animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 text-white" />
        <span>Offline Mode — Cached vocabulary available.</span>
      </div>
      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
    </div>
  );
};
