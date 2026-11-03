"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { chapters } from "./ChapterDock";
import { playCardFlipSound } from "@/lib/audio";

interface ChapterOverviewProps {
  isOpen: boolean;
  currentChapter: number;
  onClose: () => void;
  onSelectChapter: (id: number) => void;
}

export default function ChapterOverview({
  isOpen,
  currentChapter,
  onClose,
  onSelectChapter,
}: ChapterOverviewProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-dark-plum/70 backdrop-blur-xl select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/60"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-soft-violet" />
              <h3 className="font-serif text-2xl text-dark-plum">Chapters Index</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-dark-plum/5 text-dark-plum/60 hover:text-dark-plum transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grid of Chapters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {chapters.map((ch) => {
              const isActive = ch.id === currentChapter;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    playCardFlipSound();
                    onSelectChapter(ch.id);
                    onClose();
                  }}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl text-left transition-all duration-200 border ${
                    isActive
                      ? "bg-soft-blush/60 border-soft-blush shadow-soft font-medium text-dark-plum scale-102"
                      : "bg-warm-ivory/60 hover:bg-white border-dark-plum/5 hover:border-dark-plum/15 text-dark-plum/80"
                  }`}
                >
                  <span className="p-2 rounded-xl bg-white text-soft-violet shadow-xs">
                    {ch.icon}
                  </span>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-dark-plum/50">
                      Chapter 0{ch.id + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-serif line-clamp-1">
                      {ch.shortLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
