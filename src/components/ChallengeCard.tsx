import React, { useState, useRef, useEffect } from "react";
import { AslWord } from "../types";
import { BookOpen, ChevronDown, ChevronUp, Sparkles, Lightbulb, Play, Pause, RotateCcw, Gauge, Maximize2, X, Check, Video } from "lucide-react";

interface ChallengeCardProps {
  currentWord: string;
  wordInfo?: AslWord;
  allWords: AslWord[];
  onSelectWord: (word: string) => void;
  isGhostEnabled?: boolean;
  onToggleGhost?: () => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  currentWord,
  wordInfo,
  allWords,
  onSelectWord,
  isGhostEnabled,
  onToggleGhost,
}) => {
  const [showTips, setShowTips] = useState<boolean>(true);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Toggle hint video visibility
  const toggleHint = () => {
    setShowHint((prev) => !prev);
  };

  // Sync playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
    if (modalVideoRef.current) {
      modalVideoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play();
    }
  };

  const toggleSpeed = () => {
    const nextRate = playbackRate === 1.0 ? 0.5 : 1.0;
    setPlaybackRate(nextRate);
  };

  return (
    <div
      id="challenge-card"
      className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 mb-6 transition-all"
    >
      {/* Target Word Selection Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Words:
        </span>
        {allWords.map((item) => {
          const isActive = item.word.toUpperCase() === currentWord.toUpperCase();
          return (
            <button
              key={item.id}
              id={`select-word-${item.id}`}
              onClick={() => {
                onSelectWord(item.word);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-green-500 text-white shadow-xs scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {item.emoji} {item.word}
            </button>
          );
        })}
      </div>

      {/* Challenge Title and Quick Hint Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-['Fredoka',sans-serif] flex items-center gap-2">
          <span>🎯 Today's Challenge:</span>
          <span className="text-green-600 bg-green-50 px-3 py-0.5 rounded-lg border border-green-200">
            '{currentWord}'
          </span>
        </h2>

        {/* Quick Hint Action Button in Header */}
        <button
          id="header-hint-toggle-btn"
          type="button"
          onClick={toggleHint}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-2xs self-start sm:self-auto ${
            showHint
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
          }`}
          title="Toggle gesture video demonstration"
        >
          <Video className={`w-4 h-4 ${showHint ? "text-white" : "text-amber-700"}`} />
          <span>{showHint ? "Hide Video Hint" : "🎬 Video Hint"}</span>
        </button>
      </div>

      <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
        Position yourself clearly in front of the camera and strike your best American Sign Language gesture for the targeted word.
      </p>

      {/* Interactive ASL Reference Guide & Text Description */}
      {wordInfo && (
        <div className="mt-3 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 sm:p-4 text-amber-950">
          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="w-full flex items-center justify-between text-left font-bold text-sm text-amber-900 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>How to sign "{currentWord}" (ASL Guide)</span>
            </div>
            {showTips ? (
              <ChevronUp className="w-4 h-4 text-amber-700" />
            ) : (
              <ChevronDown className="w-4 h-4 text-amber-700" />
            )}
          </button>

          {showTips && (
            <div className="mt-2.5 pt-2.5 border-t border-amber-200/60 text-xs sm:text-sm space-y-3">
              {/* Text Description Row with Embedded Hint Button */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-white/90 p-3 rounded-xl border border-amber-200/70 shadow-2xs">
                <div className="flex-1 pr-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-0.5 flex items-center gap-1">
                    <span>Gesture Description:</span>
                  </div>
                  <p className="font-medium text-gray-800 text-xs sm:text-sm leading-relaxed">
                    {wordInfo.description}
                  </p>
                </div>

                {/* The Requested "Hint" Button directly where the gesture is described in text */}
                <button
                  id="gesture-text-hint-btn"
                  type="button"
                  onClick={toggleHint}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95 ${
                    showHint
                      ? "bg-amber-600 text-white hover:bg-amber-700"
                      : "bg-amber-500 hover:bg-amber-600 text-white"
                  }`}
                  aria-expanded={showHint}
                >
                  <Video className="w-4 h-4 text-white" />
                  <span>{showHint ? "Hide Video Hint" : "🎬 Video Hint"}</span>
                </button>
              </div>

              {/* Video Demonstration Revealed on Hint Click */}
              {showHint && (wordInfo.videoSrc || wordInfo.imageSrc) && (
                <div
                  id="gesture-hint-video-container"
                  className="mt-3 bg-white rounded-2xl p-3 sm:p-4 border-2 border-amber-300 shadow-md animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900 font-['Fredoka',sans-serif] flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-amber-600" />
                        Gesture Demonstration Video (1-3s)
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-md border border-green-200">
                        {wordInfo.word}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 cursor-pointer text-[11px] font-semibold flex items-center gap-1"
                        title="Enlarge video"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden xs:inline">Enlarge</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowHint(false)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 cursor-pointer"
                        title="Hide hint"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Video Player Display */}
                  <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-gray-200 aspect-4/3 max-h-72 sm:max-h-80 mx-auto group">
                    <video
                      ref={videoRef}
                      src={wordInfo.videoSrc || `/videos/asl_${wordInfo.id}_demo.mp4`}
                      poster={wordInfo.imageSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Controls overlay */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-auto bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl text-white text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="p-1 rounded-lg hover:bg-white/20 transition cursor-pointer"
                          title={isPlaying ? "Pause Video" : "Play Video"}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={handleReplay}
                          className="p-1 rounded-lg hover:bg-white/20 transition cursor-pointer"
                          title="Replay"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={toggleSpeed}
                          className={`px-2 py-0.5 rounded-md font-bold text-[10px] cursor-pointer transition ${
                            playbackRate === 0.5 ? "bg-amber-400 text-black" : "bg-white/20 text-white"
                          }`}
                          title="Toggle Slow Motion"
                        >
                          {playbackRate === 0.5 ? "0.5x Slow-Mo" : "1.0x"}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-1 text-[11px] text-gray-200 hover:text-white cursor-pointer"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Enlarge</span>
                      </button>
                    </div>
                  </div>

                  {/* Correspondence caption connecting video directly to text description */}
                  <div className="mt-2.5 p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/60 text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-900">Matches motion description:</p>
                        <p className="text-gray-700 text-[11px] sm:text-xs leading-relaxed">
                          "{wordInfo.description}"
                        </p>
                      </div>
                    </div>

                    {/* Quick activate Ghost Overlay button */}
                    {onToggleGhost && (
                      <button
                        type="button"
                        id="activate-ghost-btn"
                        onClick={() => {
                          if (!isGhostEnabled) {
                            onToggleGhost();
                          }
                          document.getElementById("webcam-container")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shadow-2xs ${
                          isGhostEnabled
                            ? "bg-purple-600 text-white hover:bg-purple-700"
                            : "bg-purple-100 text-purple-900 hover:bg-purple-200 border border-purple-300"
                        }`}
                        title="Mirror this gesture directly over your camera feed"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>{isGhostEnabled ? "👻 Ghost Active on Camera" : "👻 Mirror with Ghost Overlay"}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Hand Shape Step Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {wordInfo.handShapeTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 rounded-lg p-2 text-xs border border-amber-200/60 flex items-start gap-1.5"
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enlarged Modal Lightbox for High-Res Gesture Video Inspection */}
      {isModalOpen && wordInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 text-gray-900 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤟</span>
                <div>
                  <h3 className="text-base font-bold font-['Fredoka',sans-serif]">
                    ASL Gesture: {wordInfo.word}
                  </h3>
                  <p className="text-xs text-gray-500">Short Gesture Video Demonstration</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-950 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-4/3 max-h-[55vh] rounded-xl overflow-hidden bg-black flex items-center justify-center">
                <video
                  ref={modalVideoRef}
                  src={wordInfo.videoSrc || `/videos/asl_${wordInfo.id}_demo.mp4`}
                  poster={wordInfo.imageSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Modal Video Playback Controls */}
              <div className="mt-3 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReplay}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Replay
                </button>
                <button
                  type="button"
                  onClick={toggleSpeed}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                    playbackRate === 0.5 ? "bg-amber-400 text-black font-bold" : "bg-white/15 text-white"
                  }`}
                >
                  <Gauge className="w-3.5 h-3.5" /> {playbackRate === 0.5 ? "0.5x Slow-Mo" : "1.0x Speed"}
                </button>
              </div>
            </div>

            <div className="p-4 bg-amber-50/60 border-t border-amber-100">
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong className="text-gray-900">How to sign: </strong>
                {wordInfo.description}
              </p>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Close & Practice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
