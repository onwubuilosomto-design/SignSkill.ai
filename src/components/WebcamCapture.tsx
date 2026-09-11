import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Camera,
  RefreshCw,
  Upload,
  CheckCircle,
  VideoOff,
  Sparkles,
  SwitchCamera,
  Play,
  Pause,
  RotateCcw,
  Video as VideoIcon,
  CircleDot,
  Square,
} from "lucide-react";
import { MediaCapturePayload } from "../types";

interface WebcamCaptureProps {
  onCapture: (payload: MediaCapturePayload | string) => void;
  isAnalyzing: boolean;
  targetWord: string;
  videoSrc?: string;
  isGhostEnabled?: boolean;
  onToggleGhost?: (enabled: boolean) => void;
}

export const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  onCapture,
  isAnalyzing,
  targetWord,
  videoSrc,
  isGhostEnabled,
  onToggleGhost,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const ghostVideoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const keyframeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recordedPayload, setRecordedPayload] = useState<MediaCapturePayload | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [previewIsPlaying, setPreviewIsPlaying] = useState<boolean>(true);

  // Ghost Overlay state (for mirroring hand alignment on live feed)
  const [internalGhostActive, setInternalGhostActive] = useState<boolean>(false);
  const ghostActive = isGhostEnabled !== undefined ? isGhostEnabled : internalGhostActive;
  const setGhostActive = onToggleGhost ? onToggleGhost : setInternalGhostActive;
  const [ghostOpacity, setGhostOpacity] = useState<number>(0.45);
  const [ghostSpeed, setGhostSpeed] = useState<number>(1.0);

  const computedVideoSrc = videoSrc || `/videos/asl_${targetWord.toLowerCase().replace(/[\s-]+/g, "_")}_demo.mp4`;

  // Sync ghost video playback rate
  useEffect(() => {
    if (ghostVideoRef.current) {
      ghostVideoRef.current.playbackRate = ghostSpeed;
    }
  }, [ghostSpeed, ghostActive]);

  const RECORD_MAX_SECONDS = 2.5; // Short 1-3 sec video recording

  // Subtle mobile haptic feedback
  const triggerHaptic = (ms = 40) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(ms);
      } catch {
        // Safe ignore
      }
    }
  };

  // Tone generation for countdown, recording start and complete
  const playTone = (freq = 440, duration = 0.08, type: OscillatorType = "sine") => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Safe ignore
    }
  };

  // Initialize camera with facingMode
  const startCamera = useCallback(async (facing: "user" | "environment" = facingMode) => {
    setCameraError(null);
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: facing,
        },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.warn("Camera access warning:", err);
      setCameraError(
        "Camera access was denied or is unavailable. You can still test by uploading a video/photo or using Demo Controls!"
      );
    }
  }, [stream, facingMode]);

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (recordingTimerRef.current) clearTimeout(recordingTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [facingMode]);

  // Ensure videoRef receives stream on re-render when returning to live mode
  useEffect(() => {
    if (videoRef.current && stream && !recordedVideoUrl && !capturedImage) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, recordedVideoUrl, capturedImage]);

  // Toggle front/back camera on mobile
  const toggleCameraFacing = () => {
    triggerHaptic(30);
    const newFacing = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacing);
  };

  // Capture single frame snapshot to canvas
  const grabFrameCanvas = (): string | null => {
    if (!videoRef.current) return null;
    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) return null;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.85);
  };

  // Instant photo capture fallback
  const takeSnapshot = () => {
    const dataUrl = grabFrameCanvas();
    if (!dataUrl) return;

    triggerHaptic(50);
    playTone(650, 0.1);
    setCapturedImage(dataUrl);
    setRecordedVideoUrl(null);
    setRecordedPayload({ imageBase64: dataUrl, mimeType: "image/jpeg" });
    onCapture({ imageBase64: dataUrl, mimeType: "image/jpeg" });
  };

  // Detect supported mime type for MediaRecorder
  const getSupportedVideoMimeType = (): string => {
    const candidates = [
      "video/webm;codecs=vp8,opus",
      "video/webm;codecs=vp9,opus",
      "video/webm",
      "video/mp4",
    ];
    for (const type of candidates) {
      if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return "";
  };

  // Stop active recording and process blob
  const stopRecording = useCallback(() => {
    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    setIsRecording(false);
    triggerHaptic(60);
    playTone(520, 0.1);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.warn("MediaRecorder stop error:", e);
      }
    }
  }, []);

  // Actual recording initiation after countdown ends
  const startRecording = useCallback(() => {
    if (!stream) {
      takeSnapshot();
      return;
    }

    // Play recording start sound and haptic
    playTone(880, 0.15, "triangle");
    triggerHaptic(80);

    recordedChunksRef.current = [];
    setIsRecording(true);
    setRecordingSeconds(0);
    setCapturedImage(null);
    setRecordedVideoUrl(null);

    // Capture initial keyframe
    const initialKeyframe = grabFrameCanvas();

    let mimeType = getSupportedVideoMimeType();
    let recorder: MediaRecorder;

    try {
      recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    } catch (e) {
      console.warn("Could not create MediaRecorder with mimeType, using default:", e);
      recorder = new MediaRecorder(stream);
    }

    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const finalMimeType = recorder.mimeType || mimeType || "video/webm";
      const blob = new Blob(recordedChunksRef.current, { type: finalMimeType });
      const objectUrl = URL.createObjectURL(blob);
      setRecordedVideoUrl(objectUrl);

      // Mid-gesture keyframe
      const midKeyframe = grabFrameCanvas() || initialKeyframe;

      // Convert video Blob to base64 Data URL for Gemini server evaluation
      const reader = new FileReader();
      reader.onload = () => {
        const videoBase64 = reader.result as string;
        const payload: MediaCapturePayload = {
          videoBase64,
          keyframeBase64: midKeyframe || undefined,
          mimeType: finalMimeType,
          previewUrl: objectUrl,
        };
        setRecordedPayload(payload);
        onCapture(payload);
      };
      reader.readAsDataURL(blob);
    };

    recorder.start(100);

    // Track elapsed seconds smoothly
    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setRecordingSeconds(Math.min(RECORD_MAX_SECONDS, elapsed));
    }, 50);

    // Auto stop after RECORD_MAX_SECONDS (2.5s)
    recordingTimerRef.current = setTimeout(() => {
      stopRecording();
    }, RECORD_MAX_SECONDS * 1000);
  }, [stream, stopRecording]);

  // Start 3-second countdown followed by 1-3 sec video recording
  const startRecordingSequence = () => {
    if (isAnalyzing || countdown !== null || isRecording) return;

    triggerHaptic(30);
    playTone(480, 0.1);
    setCountdown(3);

    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCountdown(current);
        triggerHaptic(30);
        playTone(480 + (3 - current) * 80, 0.09);
      } else {
        clearInterval(interval);
        setCountdown(null);
        startRecording();
      }
    }, 1000);
  };

  // Retake / discard recorded video or image
  const handleRetake = () => {
    triggerHaptic(25);
    if (recordedVideoUrl) {
      URL.revokeObjectURL(recordedVideoUrl);
    }
    setRecordedVideoUrl(null);
    setCapturedImage(null);
    setRecordedPayload(null);
    setCountdown(null);
    setIsRecording(false);
    setRecordingSeconds(0);

    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  };

  // File upload handler (supports both videos and photos)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    triggerHaptic(40);
    const isVideoFile = file.type.startsWith("video/");
    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        if (isVideoFile) {
          const preview = URL.createObjectURL(file);
          setRecordedVideoUrl(preview);
          setCapturedImage(null);
          const payload: MediaCapturePayload = {
            videoBase64: dataUrl,
            mimeType: file.type || "video/webm",
            previewUrl: preview,
          };
          setRecordedPayload(payload);
          onCapture(payload);
        } else {
          setCapturedImage(dataUrl);
          setRecordedVideoUrl(null);
          const payload: MediaCapturePayload = {
            imageBase64: dataUrl,
            mimeType: file.type || "image/jpeg",
          };
          setRecordedPayload(payload);
          onCapture(payload);
        }
      }
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Toggle preview video playback
  const togglePreviewPlay = () => {
    if (previewVideoRef.current) {
      if (previewIsPlaying) {
        previewVideoRef.current.pause();
        setPreviewIsPlaying(false);
      } else {
        previewVideoRef.current.play();
        setPreviewIsPlaying(true);
      }
    }
  };

  const replayPreview = () => {
    if (previewVideoRef.current) {
      previewVideoRef.current.currentTime = 0;
      previewVideoRef.current.play();
      setPreviewIsPlaying(true);
    }
  };

  return (
    <div
      id="webcam-container"
      className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
        <div>
          <label className="text-base sm:text-lg font-bold text-gray-900 font-['Fredoka',sans-serif] flex items-center gap-2">
            <VideoIcon className="w-5 h-5 text-green-600" />
            <span>Sign "{targetWord}" to the camera:</span>
          </label>
          <p className="text-xs text-gray-500">
            Click capture for a 3s countdown, then perform your 1-3s sign language gesture!
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap justify-end">
          {/* Ghost Overlay Mirror Toggle */}
          {!recordedVideoUrl && !capturedImage && !cameraError && (
            <button
              type="button"
              id="ghost-overlay-toggle-btn"
              onClick={() => {
                triggerHaptic(30);
                setGhostActive(!ghostActive);
              }}
              disabled={isRecording || countdown !== null}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all active:scale-95 shadow-2xs ${
                ghostActive
                  ? "bg-purple-600 text-white hover:bg-purple-700 ring-2 ring-purple-300"
                  : "bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200"
              }`}
              title="Toggle Ghost Overlay: mirrors the gesture demonstration over your live camera"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{ghostActive ? "👻 Ghost: ON" : "👻 Ghost Guide"}</span>
            </button>
          )}

          {/* Flip Camera Button for mobile devices */}
          {!recordedVideoUrl && !capturedImage && !cameraError && (
            <button
              type="button"
              id="flip-camera-btn"
              onClick={toggleCameraFacing}
              disabled={isRecording || countdown !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              title="Flip Front / Rear Camera"
            >
              <SwitchCamera className="w-3.5 h-3.5 text-green-600" />
              <span className="hidden xs:inline">{facingMode === "user" ? "Rear Cam" : "Front Cam"}</span>
            </button>
          )}

          {(recordedVideoUrl || capturedImage) && (
            <button
              type="button"
              id="retake-media-btn"
              onClick={handleRetake}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-all disabled:opacity-50 active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{recordedVideoUrl ? "Re-record Sign" : "Retake"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Viewfinder / Recording Box */}
      <div className="relative w-full aspect-4/3 max-w-xl mx-auto rounded-2xl overflow-hidden bg-slate-950 shadow-inner flex items-center justify-center border-4 border-dashed border-gray-200 group touch-manipulation">
        {recordedVideoUrl ? (
          // Recorded Video Review View
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <video
              ref={previewVideoRef}
              src={recordedVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Top recorded badge */}
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5 shadow-sm">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Sign Video Recorded for "{targetWord}" (2.5s)</span>
            </div>

            {/* Bottom playback controls */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl text-white text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePreviewPlay}
                  className="p-1 rounded-lg hover:bg-white/20 transition cursor-pointer"
                >
                  {previewIsPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={replayPreview}
                  className="p-1 rounded-lg hover:bg-white/20 transition cursor-pointer"
                  title="Replay from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-gray-300 font-mono">Looping 2.5s gesture</span>
              </div>
              <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">
                Ready for Gemini
              </span>
            </div>
          </div>
        ) : capturedImage ? (
          // Display captured frame if photo was taken
          <div className="relative w-full h-full">
            <img
              src={capturedImage}
              alt="Captured ASL gesture"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
              <span>Snapshot Captured for "{targetWord}"</span>
            </div>
          </div>
        ) : cameraError ? (
          // Camera Error View
          <div className="text-center p-6 max-w-md text-white">
            <VideoOff className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <p className="text-sm font-semibold mb-2">{cameraError}</p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => startCamera(facingMode)}
                className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-xs cursor-pointer min-h-[44px]"
              >
                Retry Camera
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Video/Photo
              </button>
            </div>
          </div>
        ) : (
          // Live Viewfinder
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${facingMode === "user" ? "transform -scale-x-100" : ""}`}
            />

            {/* Ghost Mirror Overlay Video Layer */}
            {ghostActive && !recordedVideoUrl && !capturedImage && !cameraError && (
              <div
                id="ghost-overlay-layer"
                className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden transition-opacity duration-150"
                style={{ opacity: isRecording ? Math.min(ghostOpacity, 0.35) : ghostOpacity }}
              >
                <video
                  ref={ghostVideoRef}
                  src={computedVideoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`w-full h-full object-cover mix-blend-screen filter contrast-125 brightness-110 ${
                    facingMode === "user" ? "transform -scale-x-100" : ""
                  }`}
                />
              </div>
            )}

            {/* Hand Alignment Target Frame Overlay */}
            <div className="absolute inset-4 sm:inset-8 border-2 border-dashed border-white/70 rounded-3xl pointer-events-none flex flex-col items-center justify-between p-3 sm:p-4 z-15">
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-green-400 rounded-tl-xl" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-green-400 rounded-tr-xl" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-green-400 rounded-bl-xl" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-green-400 rounded-br-xl" />

              {/* Top Banner inside viewfinder */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {isRecording ? (
                  <div className="bg-red-600/90 text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-2 shadow-lg animate-pulse">
                    <CircleDot className="w-4 h-4 animate-ping" />
                    <span>REC: {(recordingSeconds).toFixed(1)}s / {RECORD_MAX_SECONDS}s</span>
                  </div>
                ) : countdown !== null ? (
                  <div className="bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md animate-pulse">
                    ⏱️ Get Ready in {countdown}s!
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="bg-black/50 backdrop-blur-xs text-white text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                      ✋ Hand Target: {targetWord}
                    </div>
                    {ghostActive && (
                      <div className="bg-purple-600/90 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs animate-in fade-in duration-200">
                        <span>👻 Ghost Mirror Guide</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Big Animated 3-Second Countdown Display */}
              {countdown !== null && (
                <div className="flex flex-col items-center justify-center animate-in zoom-in-75 duration-200">
                  <div className="text-7xl sm:text-8xl font-black text-amber-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-['Fredoka',sans-serif] animate-bounce">
                    {countdown}
                  </div>
                  <span className="text-white text-xs sm:text-sm font-bold bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full mt-2">
                    Get ready to perform sign!
                  </span>
                </div>
              )}

              {/* Active Recording Center Graphic */}
              {isRecording && (
                <div className="flex flex-col items-center justify-center animate-in fade-in duration-150">
                  <div className="w-16 h-16 rounded-full bg-red-600/30 border-4 border-red-500 flex items-center justify-center mb-2 animate-pulse">
                    <div className="w-6 h-6 rounded-full bg-red-500" />
                  </div>
                  <span className="text-white text-xs font-extrabold bg-black/70 backdrop-blur-xs px-3 py-1 rounded-full">
                    Performing "{targetWord}" Sign Motion...
                  </span>
                </div>
              )}

              {/* Bottom Target Zone Hint or Recording Progress Bar */}
              {isRecording ? (
                <div className="w-full max-w-xs bg-black/50 backdrop-blur-xs p-1.5 rounded-full border border-white/20">
                  <div
                    className="h-2.5 bg-gradient-to-r from-amber-400 to-red-500 rounded-full transition-all duration-75 ease-linear shadow-xs"
                    style={{
                      width: `${Math.min(100, (recordingSeconds / RECORD_MAX_SECONDS) * 100)}%`,
                    }}
                  />
                </div>
              ) : ghostActive ? (
                <div className="text-[11px] text-purple-200 bg-purple-950/70 backdrop-blur-xs px-3 py-0.5 rounded-full border border-purple-400/30">
                  Mirror your hand onto the instructor's silhouette
                </div>
              ) : (
                <div className="text-[11px] text-white/80 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                  Keep hand clearly inside bounds
                </div>
              )}
            </div>

            {/* Interactive Ghost Overlay Controls Pill inside Viewfinder */}
            {ghostActive && !isRecording && countdown === null && (
              <div className="absolute bottom-2 left-3 right-3 z-20 flex items-center justify-between bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs border border-purple-500/40 shadow-lg animate-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider hidden xs:inline">
                    Opacity:
                  </span>
                  {[0.25, 0.45, 0.7].map((op) => (
                    <button
                      key={op}
                      type="button"
                      onClick={() => setGhostOpacity(op)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition ${
                        ghostOpacity === op
                          ? "bg-purple-600 text-white shadow-xs"
                          : "bg-white/20 text-gray-300 hover:bg-white/30"
                      }`}
                    >
                      {Math.round(op * 100)}%
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider hidden xs:inline">
                    Speed:
                  </span>
                  {[1.0, 0.5].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setGhostSpeed(spd)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition ${
                        ghostSpeed === spd
                          ? "bg-purple-600 text-white shadow-xs"
                          : "bg-white/20 text-gray-300 hover:bg-white/30"
                      }`}
                    >
                      {spd === 0.5 ? "0.5x" : "1.0x"}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setGhostActive(false)}
                    className="ml-1 text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/20 cursor-pointer"
                    title="Close Ghost Overlay"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Gemini Analyzing Overlay Banner */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center text-white z-20">
            <div className="w-12 h-12 border-4 border-[#58CC02] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-base font-bold text-[#58CC02] font-['Fredoka',sans-serif] text-center px-4">
              🦉 Gemini is analyzing your sign language video...
            </p>
            <p className="text-xs text-gray-300 mt-1.5 text-center px-4 max-w-sm">
              Evaluating your motion trajectory, finger formation, and gesture transition from start to finish
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons Toolbar with mobile touch targets (min 44px) */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {!recordedVideoUrl && !capturedImage ? (
          <>
            {/* The User-Requested 3-Second Countdown & Short 1-3s Video Record Button */}
            {!isRecording ? (
              <button
                id="capture-video-btn"
                type="button"
                onClick={startRecordingSequence}
                disabled={isAnalyzing || !!cameraError || countdown !== null}
                className="min-h-[48px] px-6 py-3 bg-[#58CC02] hover:bg-[#46A302] active:scale-97 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 text-sm sm:text-base font-['Fredoka',sans-serif] flex-1 sm:flex-initial"
              >
                <CircleDot className="w-5 h-5 text-red-100" />
                <span>
                  {countdown !== null ? `Starting in ${countdown}...` : "🎬 Record Sign (3s Countdown)"}
                </span>
              </button>
            ) : (
              <button
                id="stop-recording-btn"
                type="button"
                onClick={stopRecording}
                className="min-h-[48px] px-6 py-3 bg-red-600 hover:bg-red-700 active:scale-97 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all text-sm sm:text-base font-['Fredoka',sans-serif]"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Finish Recording ({(recordingSeconds).toFixed(1)}s)</span>
              </button>
            )}

            {/* Instant Snapshot option */}
            <button
              id="instant-photo-btn"
              type="button"
              onClick={takeSnapshot}
              disabled={isAnalyzing || !!cameraError || countdown !== null || isRecording}
              className="min-h-[48px] px-4 py-3 bg-gray-100 hover:bg-gray-200 active:scale-97 text-gray-700 font-semibold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-all disabled:opacity-50"
              title="Quick still photo snapshot"
            >
              <Camera className="w-4 h-4 text-gray-600" />
              <span>Snapshot</span>
            </button>
          </>
        ) : (
          /* When video or photo is ready */
          <button
            id="evaluate-again-btn"
            type="button"
            onClick={() => {
              triggerHaptic(40);
              if (recordedPayload) {
                onCapture(recordedPayload);
              }
            }}
            disabled={isAnalyzing}
            className="min-h-[48px] px-6 py-3 bg-[#58CC02] hover:bg-[#46A302] active:scale-97 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 text-sm font-['Fredoka',sans-serif] w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Re-evaluate Video with Gemini</span>
          </button>
        )}

        {/* Upload Video or Image Button */}
        <button
          id="upload-media-btn"
          type="button"
          onClick={() => {
            triggerHaptic(20);
            fileInputRef.current?.click();
          }}
          disabled={isAnalyzing || isRecording || countdown !== null}
          className="min-h-[48px] px-4 py-3 bg-gray-100 hover:bg-gray-200 active:scale-97 text-gray-700 font-semibold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          title="Upload a video or photo file from your device"
        >
          <Upload className="w-4 h-4 text-gray-500" />
          <span>Upload Video/Photo</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};
