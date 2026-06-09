"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT?: any;
  }
}

function Equalizer({ isPlaying, isMuted }: { isPlaying: boolean; isMuted: boolean }) {
  const active = isPlaying && !isMuted;
  return (
    <svg className="h-3.5 w-4 text-claude" viewBox="0 0 16 16" fill="currentColor">
      {/* Bar 1 */}
      <rect x="1" y="4" width="2" height="8" rx="0.5">
        {active && (
          <animate
            attributeName="height"
            values="4;12;4"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
        {active && (
          <animate
            attributeName="y"
            values="10;2;10"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
      </rect>
      {/* Bar 2 */}
      <rect x="5" y="2" width="2" height="12" rx="0.5">
        {active && (
          <animate
            attributeName="height"
            values="2;14;2"
            dur="0.6s"
            repeatCount="indefinite"
          />
        )}
        {active && (
          <animate
            attributeName="y"
            values="12;0;12"
            dur="0.6s"
            repeatCount="indefinite"
          />
        )}
      </rect>
      {/* Bar 3 */}
      <rect x="9" y="6" width="2" height="8" rx="0.5">
        {active && (
          <animate
            attributeName="height"
            values="3;10;3"
            dur="0.9s"
            repeatCount="indefinite"
          />
        )}
        {active && (
          <animate
            attributeName="y"
            values="11;4;11"
            dur="0.9s"
            repeatCount="indefinite"
          />
        )}
      </rect>
      {/* Bar 4 */}
      <rect x="13" y="8" width="2" height="6" rx="0.5">
        {active && (
          <animate
            attributeName="height"
            values="2;8;2"
            dur="0.7s"
            repeatCount="indefinite"
          />
        )}
        {active && (
          <animate
            attributeName="y"
            values="12;6;12"
            dur="0.7s"
            repeatCount="indefinite"
          />
        )}
      </rect>
    </svg>
  );
}

export default function MusicPlayer({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const rawId = useId();
  const playerId = `yt-player-${rawId.replace(/:/g, "")}`;
  const { language } = useLanguage();

  const labels = {
    en: { clickToUnmute: "Click to unmute 🎵", playing: "ON AIR", muted: "MUTED" },
    pt: { clickToUnmute: "Clique para ouvir 🎵", playing: "NO AR", muted: "MUDO" },
    es: { clickToUnmute: "Clic para escuchar 🎵", playing: "AL AIRE", muted: "SILENCIO" },
  };

  const currentLang = language === "es" ? "es" : language === "en" ? "en" : "pt";
  const label = labels[currentLang];

  useEffect(() => {
    const initPlayer = () => {
      if (window.YT && window.YT.Player && !playerRef.current) {
        playerRef.current = new window.YT.Player(playerId, {
          height: "0",
          width: "0",
          videoId: "BNLoR8BbhgQ",
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: "BNLoR8BbhgQ",
            controls: 0,
            showinfo: 0,
            rel: 0,
            enablejsapi: 1,
            playsinline: 1,
          },
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReady: (event: any) => {
              event.target.mute();
              event.target.playVideo();
              setReady(true);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onStateChange: (event: any) => {
              // 1 = playing, 2 = paused
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }

    // Dismiss tooltip after 7 seconds automatically
    const timer = setTimeout(() => setShowTooltip(false), 7000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current || !ready) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current || !ready) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
      setShowTooltip(false);
      // Auto resume if paused
      playerRef.current.playVideo();
      setIsPlaying(true);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* Hidden YouTube Target Element */}
      <div id={playerId} className="pointer-events-none fixed -top-10 -left-10 h-0 w-0 opacity-0" />

      {/* Floating Control Widget */}
      <div className={cn("z-50 animate-fade-up", className)}>
        {/* Tooltip hint to unmute */}
        {isMuted && showTooltip && (
          <div className="absolute right-0 bottom-full md:bottom-auto md:top-full mb-2 md:mb-0 md:mt-2 w-48 rounded-lg border border-claude-dim bg-surface p-2 text-center text-xs font-medium text-cream shadow-xl animate-fade-up">
            <button
              onClick={toggleMute}
              className="w-full text-left font-semibold text-claude-soft hover:underline cursor-pointer"
            >
              {label.clickToUnmute}
            </button>
          </div>
        )}

        <div className={cn(
          "flex items-center gap-3.5 rounded-full border border-border bg-surface/85 px-4 py-2 text-xs shadow-lg backdrop-blur transition-all duration-300 hover:border-claude-dim/60",
          isPlaying && !isMuted ? "shadow-[0_0_15px_rgba(217,119,87,0.15)]" : ""
        )}>
          {/* Status Indicators */}
          <div className="flex items-center gap-2 pr-1 border-r border-border/80">
            <span className="relative flex h-2 w-2">
              {isPlaying && !isMuted && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              )}
              <span className={cn(
                "relative inline-flex rounded-full h-2 w-2",
                isPlaying && !isMuted ? "bg-red-500" : "bg-muted/70"
              )}></span>
            </span>
            <span className="font-semibold tracking-wider text-[10px] text-cream uppercase">
              {isMuted ? label.muted : label.playing}
            </span>
          </div>

          {/* Station Logo & Equalizer */}
          <div className="flex items-center gap-2">
            <Radio className="size-3.5 text-muted/80" />
            <span className="font-display font-semibold text-cream">Claude FM</span>
            <Equalizer isPlaying={isPlaying} isMuted={isMuted} />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              disabled={!ready}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 text-muted transition hover:bg-surface hover:text-cream cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {isPlaying ? <Pause className="size-3.5 fill-current" /> : <Play className="size-3.5 fill-current ml-0.5" />}
            </button>
            <button
              onClick={toggleMute}
              disabled={!ready}
              aria-label={isMuted ? "Unmute music" : "Mute music"}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full transition cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
                isMuted
                  ? "bg-claude/15 text-claude-soft hover:bg-claude/25"
                  : "bg-surface-2 text-muted hover:bg-surface hover:text-cream"
              )}
            >
              {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
