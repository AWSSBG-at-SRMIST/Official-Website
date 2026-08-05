"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX } from "lucide-react";

function fmt(s: number) {
  if (!isFinite(s)) return "--:--";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

interface VideoPlayerProps {
  src: string;
  fallbackHref: string;
  title?: string;
}

export function VideoPlayer({ src, fallbackHref, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  const skip = useCallback((sec: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + sec));
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * duration;
  }, [duration]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrent(v.currentTime);
    const onMeta = () => { setDuration(v.duration); setLoaded(true); };
    const onEnd = () => setPlaying(false);
    const onProgress = () => {
      if (v.buffered.length > 0)
        setBuffered(v.buffered.end(v.buffered.length - 1));
    };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("ended", onEnd);
    v.addEventListener("progress", onProgress);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("ended", onEnd);
      v.removeEventListener("progress", onProgress);
    };
  }, []);

  if (error) {
    return (
      <div className="border-2 border-primary/25 bg-surface-container-lowest flex flex-col items-center justify-center gap-5 py-20 px-6 text-center">
        <p className="text-on-surface-variant text-sm">Could not stream video directly.</p>
        <a
          href={fallbackHref}
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-primary text-primary px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary hover:text-on-primary transition-colors"
        >
          Watch on Google Drive →
        </a>
      </div>
    );
  }

  const progress = duration ? (current / duration) * 100 : 0;
  const bufferPct = duration ? (buffered / duration) * 100 : 0;

  return (
    <div className="border-2 border-primary/25 bg-surface-container-lowest overflow-hidden">
      {/* Video area */}
      <div className="relative bg-black aspect-video">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain"
          onError={() => setError(true)}
          onClick={toggle}
          playsInline
          preload="metadata"
        />

        {/* Center play overlay — shows when paused */}
        {!playing && (
          <button
            onClick={toggle}
            aria-label="Play"
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors"
          >
            <div className="w-16 h-16 bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors">
              <Play size={30} className="text-on-primary translate-x-0.5" />
            </div>
          </button>
        )}

        {/* Title badge top-left */}
        {title && (
          <div className="absolute top-3 left-3 bg-surface-container-lowest/90 border border-primary/30 px-3 py-1 pointer-events-none">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{title}</span>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div className="bg-surface-container border-t-2 border-on-surface/8 px-4 py-3 flex flex-col gap-2.5">

        {/* Progress bar */}
        <div
          ref={progressRef}
          onClick={seek}
          className="relative h-1 bg-on-surface/10 cursor-pointer group/bar"
          role="slider"
          aria-label="Seek"
        >
          {/* Buffered */}
          <div
            className="absolute inset-y-0 left-0 bg-on-surface/20 transition-all"
            style={{ width: `${bufferPct}%` }}
          />
          {/* Played */}
          <div
            className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary opacity-0 group-hover/bar:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>

        {/* Buttons row */}
        <div className="flex items-center gap-3">

          {/* Back 10s */}
          <button
            onClick={() => skip(-10)}
            title="Back 10 seconds"
            className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-none"
          >
            <RotateCcw size={13} />
            <span className="font-mono text-[11px] font-bold leading-none">10</span>
          </button>

          {/* Play / Pause */}
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="w-9 h-9 bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors flex-shrink-0 focus-visible:outline-none"
          >
            {playing
              ? <Pause size={15} className="text-on-primary" />
              : <Play size={15} className="text-on-primary translate-x-px" />
            }
          </button>

          {/* Forward 10s */}
          <button
            onClick={() => skip(10)}
            title="Forward 10 seconds"
            className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-none"
          >
            <span className="font-mono text-[11px] font-bold leading-none">10</span>
            <RotateCw size={13} />
          </button>

          {/* Mute */}
          <button
            onClick={toggleMute}
            title={muted ? "Unmute" : "Mute"}
            className="text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-none"
          >
            {muted
              ? <VolumeX size={15} />
              : <Volume2 size={15} />
            }
          </button>

          {/* Timer */}
          <span className="ml-auto font-mono text-[11px] text-on-surface-variant tracking-wider tabular-nums">
            {fmt(current)}&nbsp;/&nbsp;{loaded ? fmt(duration) : "--:--"}
          </span>
        </div>
      </div>
    </div>
  );
}
