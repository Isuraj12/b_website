"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Cake,
  Award,
  Camera,
  Compass,
  Mail,
  Orbit,
  PartyPopper,
  Play,
  Pause,
  Grid,
} from "lucide-react";
import { playCardFlipSound } from "@/lib/audio";

export interface Chapter {
  id: number;
  title: string;
  shortLabel: string;
  icon: React.ReactNode;
}

export const chapters: Chapter[] = [
  { id: 0, title: "Prologue: The Gift", shortLabel: "Gift", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 1, title: "Chapter I: Birthday Spotlight", shortLabel: "Spotlight", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 2, title: "Chapter II: Make a Wish", shortLabel: "Wish Cake", icon: <Cake className="w-3.5 h-3.5" /> },
  { id: 3, title: "Chapter III: Friendship Awards", shortLabel: "Honors", icon: <Award className="w-3.5 h-3.5" /> },
  { id: 4, title: "Chapter IV: Botanical Scrapbook", shortLabel: "Scrapbook", icon: <Camera className="w-3.5 h-3.5" /> },
  { id: 5, title: "Chapter V: Wish Oracle", shortLabel: "Oracle", icon: <Compass className="w-3.5 h-3.5" /> },
  { id: 6, title: "Chapter VI: The Sealed Letter", shortLabel: "Letter", icon: <Mail className="w-3.5 h-3.5" /> },
  { id: 7, title: "Chapter VII: 3D Memory Universe", shortLabel: "Universe", icon: <Orbit className="w-3.5 h-3.5" /> },
  { id: 8, title: "Grand Finale: Celebration", shortLabel: "Finale", icon: <PartyPopper className="w-3.5 h-3.5" /> },
];

interface ChapterDockProps {
  currentChapter: number;
  onSelectChapter: (id: number) => void;
  isAutoTour: boolean;
  onToggleAutoTour: () => void;
  onToggleOverview: () => void;
}

export default function ChapterDock({
  currentChapter,
  onSelectChapter,
  isAutoTour,
  onToggleAutoTour,
  onToggleOverview,
}: ChapterDockProps) {
  const isDark = currentChapter >= 7;

  const handlePrev = () => {
    if (currentChapter > 0) {
      playCardFlipSound();
      onSelectChapter(currentChapter - 1);
    }
  };

  const handleNext = () => {
    if (currentChapter < chapters.length - 1) {
      playCardFlipSound();
      onSelectChapter(currentChapter + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentChapter]);

  const currentCh = chapters.find((c) => c.id === currentChapter) || chapters[0];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 pointer-events-auto select-none">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex items-center justify-between gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-full backdrop-blur-xl shadow-2xl border transition-all duration-500 ${isDark
            ? "bg-[#101330]/85 border-soft-violet/30 text-warm-ivory shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            : "bg-white/85 border-white/60 text-dark-plum shadow-[0_15px_35px_rgba(56,44,67,0.1)]"
          }`}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentChapter === 0}
          aria-label="Previous Chapter"
          className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 ${currentChapter === 0
              ? "opacity-30 cursor-not-allowed"
              : isDark
                ? "hover:bg-white/10 active:scale-95"
                : "hover:bg-dark-plum/5 active:scale-95"
            }`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Center Chapter Progress Dots & Label */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center gap-1 sm:gap-1.5 mb-1">
            {chapters.map((ch) => {
              const isActive = ch.id === currentChapter;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    playCardFlipSound();
                    onSelectChapter(ch.id);
                  }}
                  title={ch.title}
                  className={`group relative transition-all duration-300 ${isActive ? "w-6 sm:w-8 h-2 rounded-full" : "w-2 h-2 rounded-full"
                    } ${isActive
                      ? isDark
                        ? "bg-butter-yellow shadow-[0_0_10px_#FFE9A8]"
                        : "bg-dark-plum shadow-xs"
                      : isDark
                        ? "bg-white/25 hover:bg-white/50"
                        : "bg-dark-plum/20 hover:bg-dark-plum/40"
                    }`}
                />
              );
            })}
          </div>

          {/* Chapter Title Badge */}
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] sm:text-xs font-mono font-medium tracking-wide ${isDark ? "text-butter-yellow" : "text-soft-violet"
              }`}>
              {currentChapter + 1}/{chapters.length}
            </span>
            <span className="text-xs sm:text-sm font-serif font-medium tracking-tight truncate max-w-[170px] sm:max-w-[240px]">
              {currentCh.title}
            </span>
          </div>
        </div>

        {/* Quick Actions: Auto-Tour & Overview */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleAutoTour}
            title={isAutoTour ? "Pause Tour" : "Start Auto Tour"}
            className={`p-2 rounded-full transition-all duration-200 ${isAutoTour
                ? "bg-butter-yellow text-dark-plum font-semibold scale-105"
                : isDark
                  ? "hover:bg-white/10 text-warm-ivory/80"
                  : "hover:bg-dark-plum/5 text-dark-plum/70"
              }`}
          >
            {isAutoTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onToggleOverview}
            title="All Chapters Grid"
            className={`p-2 rounded-full transition-all duration-200 ${isDark ? "hover:bg-white/10 text-warm-ivory/80" : "hover:bg-dark-plum/5 text-dark-plum/70"
              }`}
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentChapter === chapters.length - 1}
          aria-label="Next Chapter"
          className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 ${currentChapter === chapters.length - 1
              ? "opacity-30 cursor-not-allowed"
              : isDark
                ? "bg-soft-violet/30 hover:bg-soft-violet/50 active:scale-95 text-butter-yellow"
                : "bg-dark-plum text-warm-ivory hover:bg-dark-plum/90 active:scale-95"
            }`}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </motion.div>
    </div>
  );
}
