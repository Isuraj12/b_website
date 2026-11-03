"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { MusicConfig } from "@/types/birthday";

interface MusicControlProps {
  config: MusicConfig;
}

export default function MusicControl({ config }: MusicControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!config?.src) return;

    const audio = new Audio(config.src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.45;

    audio.addEventListener("error", () => {
      // Graceful fallback if audio asset is missing or unsupported
      setHasError(true);
      setIsPlaying(false);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [config?.src]);

  const toggleMusic = () => {
    if (!audioRef.current || hasError) return;

    setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay policy or media decode issue
          setIsPlaying(false);
        });
    }
  };

  if (!config?.enabled || hasError) {
    return null;
  }

  return (
    <div className="fixed top-5 right-5 z-40">
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute background music" : "Play celebratory background music"}
        className={`group flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-300 shadow-soft backdrop-blur-md border ${
          isPlaying
            ? "bg-dark-plum text-warm-ivory border-dark-plum/20 shadow-glow"
            : "bg-white/90 text-dark-plum/80 border-dark-plum/10 hover:bg-white hover:text-dark-plum"
        } hover:scale-105 active:scale-95`}
      >
        <span className="relative flex items-center justify-center">
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-butter-yellow animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-butter-yellow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-butter-yellow"></span>
              </span>
            </>
          ) : (
            <VolumeX className="w-4 h-4 opacity-70 group-hover:opacity-100" />
          )}
        </span>
        <span className="hidden sm:inline-block tracking-wide">
          {isPlaying ? "Music On" : "Sound"}
        </span>
      </button>
    </div>
  );
}
