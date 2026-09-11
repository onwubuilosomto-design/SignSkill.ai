/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ASL_WORDS } from "./data/aslWords";
import { EvaluationResult, MediaCapturePayload } from "./types";
import { NavbarStats } from "./components/NavbarStats";
import { ChallengeCard } from "./components/ChallengeCard";
import { WebcamCapture } from "./components/WebcamCapture";
import { Scorecard } from "./components/Scorecard";
import { DemoSidebar } from "./components/DemoSidebar";
import { OwlMascot } from "./components/OwlMascot";
import { MobileBottomNav, MobileTab } from "./components/MobileBottomNav";
import { VocabularyLibrary } from "./components/VocabularyLibrary";
import { StatsView } from "./components/StatsView";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { PWAInstallButton } from "./components/PWAInstallButton";
import { ModeSelectionHome } from "./components/ModeSelectionHome";
import { LearningPage } from "./components/learning/LearningPage";
import { BaristaPage } from "./components/barista/BaristaPage";

const WORDS = ["HELLO", "THANK YOU", "HELP", "YES", "NO"];

export default function App() {
  // Navigation mode: "home" (landing page) | "general" (ASL practice) | "barista" (Café Barista track) | "learn" (Customer Service Duolingo training)
  const [selectedMode, setSelectedMode] = useState<"home" | "general" | "barista" | "learn">(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/barista" || window.location.pathname === "/cafe") {
        return "barista";
      }
      if (window.location.pathname === "/learn") {
        return "learn";
      }
      if (window.location.pathname === "/practice") {
        return "general";
      }
    }
    return "home";
  });

  // Keep browser history and URL in sync
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === "/barista" || window.location.pathname === "/cafe") {
        setSelectedMode("barista");
      } else if (window.location.pathname === "/learn") {
        setSelectedMode("learn");
      } else if (window.location.pathname === "/practice") {
        setSelectedMode("general");
      } else {
        setSelectedMode("home");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (mode: "home" | "general" | "barista" | "learn") => {
    setSelectedMode(mode);
    const path = mode === "barista" ? "/barista" : mode === "learn" ? "/learn" : mode === "general" ? "/practice" : "/";
    if (typeof window !== "undefined" && window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
  };

  // Gamification state in App Memory
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem("signlingo_streak");
    return saved !== null ? parseInt(saved, 10) : 5;
  });

  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem("signlingo_points");
    return saved !== null ? parseInt(saved, 10) : 120;
  });

  const [targetWord, setTargetWord] = useState<string>(() => {
    const saved = localStorage.getItem("signlingo_target_word");
    return saved || "HELLO";
  });

  const [activeTab, setActiveTab] = useState<MobileTab>("practice");
  const [isMockActive, setIsMockActive] = useState<boolean>(false);
  const [isDemoControlsOpen, setIsDemoControlsOpen] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [isGhostOverlayActive, setIsGhostOverlayActive] = useState<boolean>(false);

  // Sync gamification state to localStorage
  useEffect(() => {
    localStorage.setItem("signlingo_streak", streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("signlingo_points", points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem("signlingo_target_word", targetWord);
  }, [targetWord]);

  // Current ASL Word metadata
  const currentWordInfo = ASL_WORDS.find(
    (w) => w.word.toUpperCase() === targetWord.toUpperCase()
  );

  // Core Evaluation Pipeline (accepts either video or image capture payload)
  const handleEvaluate = async (captureData: MediaCapturePayload | string) => {
    setIsAnalyzing(true);
    setEvaluationResult(null);

    const payload: MediaCapturePayload =
      typeof captureData === "string"
        ? { imageBase64: captureData, mimeType: "image/jpeg" }
        : captureData;

    // If Mock Safety Bypass is active (from Hackathon Demo Controls)
    if (isMockActive) {
      setTimeout(() => {
        setIsAnalyzing(false);
        setEvaluationResult({
          is_correct: true,
          score: 95,
          feedback:
            "Outstanding form! Your wrist alignment, palm orientation, and gesture motion perfectly match the standard ASL configuration.",
        });
      }, 750);
      return;
    }

    try {
      const response = await fetch("/api/evaluate-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoBase64: payload.videoBase64,
          imageBase64: payload.imageBase64,
          keyframeBase64: payload.keyframeBase64,
          targetWord: targetWord,
          mimeType: payload.mimeType || (payload.videoBase64 ? "video/webm" : "image/jpeg"),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: EvaluationResult = await response.json();
      setEvaluationResult(data);
    } catch (err: any) {
      console.error("Evaluation error:", err);
      setEvaluationResult({
        is_correct: false,
        score: 0,
        feedback: `API Evaluation failure: ${err?.message || "Could not reach evaluation server"}`,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Switch to next word and award points/streak on success
  const handleNextWord = () => {
    const currentIdx = WORDS.indexOf(targetWord);
    const nextIdx = (currentIdx + 1) % WORDS.length;
    const nextWord = WORDS[nextIdx];

    // Reward points only on actual validation success sequences
    if (evaluationResult?.is_correct) {
      setPoints((prev) => prev + 20);
      setStreak((prev) => prev + 1);
    }

    setTargetWord(nextWord);
    setEvaluationResult(null);
  };

  // Practice the same word again
  const handleRetry = () => {
    setEvaluationResult(null);
  };

  // Direct word switch
  const handleSelectWord = (word: string) => {
    setTargetWord(word);
    setEvaluationResult(null);
    setActiveTab("practice"); // Jump back to camera practice if coming from library
  };

  // Handle bottom tab bar clicks
  const handleTabChange = (tab: MobileTab) => {
    if (tab === "controls") {
      setIsDemoControlsOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  // Trigger simulated success directly from demo controls
  const handleTriggerMock = () => {
    setIsAnalyzing(true);
    setEvaluationResult(null);
    setActiveTab("practice");
    setTimeout(() => {
      setIsAnalyzing(false);
      setEvaluationResult({
        is_correct: true,
        score: 96,
        feedback: `Flawless execution! Your fingers and wrist alignment for "${targetWord}" perfectly match the standard ASL reference frame.`,
      });
    }, 600);
  };

  // If on the mode selection homepage, render landing page
  if (selectedMode === "home") {
    return (
      <>
        <ModeSelectionHome
          onSelectGeneral={() => navigateTo("general")}
          onSelectBarista={() => navigateTo("barista")}
          onSelectLearn={() => navigateTo("barista")}
          streak={streak}
          points={points}
          onOpenDemoControls={() => setIsDemoControlsOpen(true)}
          isMockActive={isMockActive}
        />

        {/* Hackathon Demo Controls Sidebar Drawer */}
        <DemoSidebar
          isOpen={isDemoControlsOpen}
          onClose={() => setIsDemoControlsOpen(false)}
          isMockActive={isMockActive}
          onToggleMock={setIsMockActive}
          targetWord={targetWord}
          onSelectWord={handleSelectWord}
          allWords={ASL_WORDS}
          streak={streak}
          points={points}
          onUpdateStats={(newStreak, newPoints) => {
            setStreak(newStreak);
            setPoints(newPoints);
          }}
          onTriggerMockEvaluation={handleTriggerMock}
        />
      </>
    );
  }

  // If in the Café Barista section
  if (selectedMode === "barista") {
    return (
      <BaristaPage
        onBackToTracks={() => navigateTo("home")}
        streak={streak}
        points={points}
        onUpdatePoints={(newPoints) => setPoints(newPoints)}
        onOpenDemoControls={() => setIsDemoControlsOpen(true)}
        isMockActive={isMockActive}
      />
    );
  }

  // If on the Customer Service Duolingo-style training page (/learn)
  if (selectedMode === "learn") {
    return (
      <LearningPage
        onBackToTracks={() => navigateTo("home")}
        onSwitchToGeneralPractice={() => navigateTo("general")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-gray-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Performance Stats Bar */}
      <NavbarStats
        streak={streak}
        points={points}
        onOpenDemoControls={() => setIsDemoControlsOpen(true)}
        isMockActive={isMockActive}
        onBackToHome={() => navigateTo("home")}
        modeTitle="General ASL"
      />

      {/* Main Container with safe bottom padding for mobile navigation */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-5 sm:py-8 pb-24 sm:pb-12">
        {/* Track Banner */}
        <div className="mb-4 flex items-center justify-between bg-white border border-green-200 rounded-xl px-3.5 py-2.5 shadow-xs flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-green-700">Track: General ASL</span>
            <span className="hidden sm:inline text-xs text-gray-500">• 5 Essential Signs</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="btn-switch-to-barista"
              onClick={() => navigateTo("barista")}
              className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-amber-200 flex items-center gap-1"
            >
              <span>☕ Café Barista Track</span>
              <span>→</span>
            </button>
            <button
              id="btn-switch-track"
              onClick={() => navigateTo("home")}
              className="text-xs font-bold text-gray-600 hover:text-green-700 hover:bg-green-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-gray-200"
            >
              ← Change Track
            </button>
          </div>
        </div>

        {/* PWA Mobile Banner */}
        <PWAInstallButton variant="banner" />

        {/* Mock Data Active Banner if safety bypass enabled */}
        {isMockActive && (
          <div className="mb-4 bg-amber-100 border-l-4 border-amber-500 p-3 rounded-r-lg text-amber-900 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs">
            <span>🛡️ Hackathon Safety Bypass Active: Simulating successful 95% scores</span>
            <button
              onClick={() => setIsMockActive(false)}
              className="text-xs underline font-bold hover:text-amber-950 cursor-pointer ml-2"
            >
              Disable Bypass
            </button>
          </div>
        )}

        {/* Mobile View Switching: Practice Tab */}
        {activeTab === "practice" && (
          <>
            {/* Challenge Card */}
            <ChallengeCard
              currentWord={targetWord}
              wordInfo={currentWordInfo}
              allWords={ASL_WORDS}
              onSelectWord={handleSelectWord}
              isGhostEnabled={isGhostOverlayActive}
              onToggleGhost={() => setIsGhostOverlayActive((prev) => !prev)}
            />

            {/* Webcam Capture Component */}
            <WebcamCapture
              onCapture={handleEvaluate}
              isAnalyzing={isAnalyzing}
              targetWord={targetWord}
              videoSrc={currentWordInfo?.videoSrc}
              isGhostEnabled={isGhostOverlayActive}
              onToggleGhost={setIsGhostOverlayActive}
            />

            {/* AI Performance Scorecard */}
            {evaluationResult && (
              <Scorecard
                result={evaluationResult}
                targetWord={targetWord}
                onNextWord={handleNextWord}
                onRetry={handleRetry}
              />
            )}
          </>
        )}

        {/* Mobile View Switching: Words Library Tab */}
        {activeTab === "library" && (
          <VocabularyLibrary
            words={ASL_WORDS}
            currentWord={targetWord}
            onSelectWord={handleSelectWord}
          />
        )}

        {/* Mobile View Switching: Stats Tab */}
        {activeTab === "stats" && (
          <StatsView
            streak={streak}
            points={points}
            targetWord={targetWord}
          />
        )}

        {/* Footer info */}
        <footer className="mt-8 pt-6 border-t border-gray-200/80 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <OwlMascot size={24} mood="normal" />
            <span className="font-semibold text-gray-700">SignLingo AI</span>
            <span>• ASL Learning Coach</span>
          </div>
          <div className="text-gray-500">
            Powered by Gemini Multimodal Vision • Daily Streak System
          </div>
        </footer>
      </main>

      {/* Native Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onChangeTab={handleTabChange}
        streak={streak}
      />

      {/* Offline Status Indicator */}
      <OfflineIndicator />

      {/* Hackathon Demo Controls Sidebar Drawer */}
      <DemoSidebar
        isOpen={isDemoControlsOpen}
        onClose={() => setIsDemoControlsOpen(false)}
        isMockActive={isMockActive}
        onToggleMock={setIsMockActive}
        targetWord={targetWord}
        onSelectWord={handleSelectWord}
        allWords={ASL_WORDS}
        streak={streak}
        points={points}
        onUpdateStats={(newStreak, newPoints) => {
          setStreak(newStreak);
          setPoints(newPoints);
        }}
        onTriggerMockEvaluation={handleTriggerMock}
      />
    </div>
  );
}
