"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Flame, Sparkles, RotateCcw, Crown, Heart, ArrowRight } from "lucide-react";
import { playFireBurnSound, playCardFlipSound } from "@/lib/audio";

interface AgeTransitionProps {
  friendName: string;
  previousAge?: number;
  currentAge?: number;
}

export default function AgeTransition({
  friendName,
  previousAge = 22,
  currentAge = 23,
}: AgeTransitionProps) {
  // State: "idle" -> "burning" -> "ignited"
  const [stage, setStage] = useState<"idle" | "burning" | "ignited">("idle");

  const handleBurn = () => {
    if (stage === "burning") return;
    setStage("burning");
    playFireBurnSound();

    // Trigger golden celebration confetti when age 23 appears
    setTimeout(() => {
      setStage("ignited");
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#FFAE42", "#FFE9A8", "#F8DDE3", "#FF6B6B", "#8B78D6"],
          disableForReducedMotion: true,
        });
      } catch {
        // Fallback
      }
    }, 1800);
  };

  const handleReset = () => {
    playCardFlipSound();
    setStage("idle");
  };

  return (
    <div className="relative w-full max-w-lg mx-auto my-10 px-4 select-none">
      <div className="relative rounded-3xl bg-gradient-to-b from-white/95 to-warm-ivory/90 p-7 sm:p-9 shadow-soft border border-white/80 backdrop-blur-xl text-center overflow-hidden">
        {/* Decorative Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-soft-peach/60 border border-soft-peach text-xs uppercase font-mono tracking-wider text-dark-plum/70 mb-4">
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
          <span>The Milestone Ceremony</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-dark-plum mb-2">
          {stage === "ignited" ? `Welcome to Year ${currentAge}! ✨` : `Farewell Year ${previousAge}…`}
        </h3>

        <p className="font-sans text-xs sm:text-sm text-dark-plum/70 max-w-xs mx-auto mb-6 leading-relaxed">
          {stage === "ignited"
            ? `Chapter ${previousAge} is officially sealed in gold. Here's to making ${currentAge} your brightest chapter yet!`
            : `Every milestone deserves a celebratory spark. Ready to burn away the old year and ignite the new?`}
        </p>

        {/* Center Dynamic Stage Box */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            {/* STAGE 1: Previous Age (Year 22) */}
            {stage === "idle" && (
              <motion.div
                key="age-old"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[#FAF3EB] via-white to-[#F5ECE0] border-2 border-[#E5DAC8] shadow-md flex flex-col items-center justify-center p-4 cursor-pointer group"
                onClick={handleBurn}
              >
                <span className="text-[11px] font-mono uppercase tracking-widest text-dark-plum/50 mb-1">
                  CHAPTER
                </span>
                <span className="font-serif text-6xl sm:text-7xl font-bold text-dark-plum tracking-tight group-hover:scale-105 transition-transform">
                  {previousAge}
                </span>
                <span className="text-xs text-soft-violet font-serif italic mt-1">
                  (Ready to burn)
                </span>
              </motion.div>
            )}

            {/* STAGE 2: Burning in Flame & Ember Style */}
            {stage === "burning" && (
              <motion.div
                key="age-burning"
                className="relative w-full h-full rounded-3xl bg-[#1A0C0E] border-2 border-orange-500/80 shadow-[0_0_40px_rgba(255,107,50,0.6)] flex flex-col items-center justify-center p-4 overflow-hidden"
              >
                {/* Fiery animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 via-red-600/30 to-yellow-500/20 animate-pulse" />

                {/* Flying Flame Ember Particles */}
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 60, x: 0, opacity: 1, scale: 1 }}
                    animate={{
                      y: -120 - Math.random() * 80,
                      x: (Math.random() - 0.5) * 140,
                      opacity: [1, 0.8, 0],
                      scale: [1, 1.4, 0.2],
                    }}
                    transition={{
                      duration: 1.2 + Math.random() * 0.8,
                      repeat: Infinity,
                      delay: Math.random() * 0.6,
                      ease: "easeOut",
                    }}
                    className="absolute bottom-4 left-1/2 w-2.5 h-2.5 rounded-full bg-gradient-to-t from-yellow-300 via-orange-400 to-red-500 shadow-[0_0_10px_#FFAE42]"
                  />
                ))}

                {/* Burning Disintegrating Previous Age Number */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 0.7, 0],
                    opacity: [1, 0.9, 0.4, 0],
                    filter: ["brightness(1)", "brightness(2) blur(2px)", "brightness(3) blur(6px)"],
                  }}
                  transition={{ duration: 1.7, ease: "easeInOut" }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <Flame className="w-10 h-10 text-orange-400 animate-bounce mb-1" />
                  <span className="font-serif text-6xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-orange-500 via-yellow-300 to-white">
                    {previousAge}
                  </span>
                  <span className="text-xs font-mono text-yellow-200 mt-1 uppercase tracking-widest">
                    Burning Chapter {previousAge}...
                  </span>
                </motion.div>
              </motion.div>
            )}

            {/* STAGE 3: New Age Ignited in Gold & Sparkles (Year 23) */}
            {stage === "ignited" && (
              <motion.div
                key="age-new"
                initial={{ scale: 0.3, rotate: -15, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className="relative w-full h-full rounded-3xl bg-gradient-to-tr from-[#FFFDF5] via-[#FFF9ED] to-[#FFF0F4] border-2 border-butter-yellow shadow-[0_0_40px_rgba(255,233,168,0.8)] flex flex-col items-center justify-center p-4 overflow-hidden"
              >
                {/* Radiant golden stardust burst in background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,233,168,0.5)_0%,transparent_70%)] animate-pulse" />

                {/* Crown Icon */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Crown className="w-8 h-8 text-butter-yellow fill-butter-yellow drop-shadow-md mb-1" />
                </motion.div>

                <span className="text-[11px] font-mono uppercase tracking-widest text-soft-violet font-semibold">
                  OFFICIALLY TURNING
                </span>

                {/* Stylish 23 Typography with Shimmer */}
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="font-serif text-6xl sm:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-dark-plum via-[#8A2B5B] to-soft-violet drop-shadow-sm my-1"
                >
                  {currentAge}
                </motion.span>

                <div className="flex items-center gap-1.5 text-xs text-dark-plum/70 font-handwriting text-base">
                  <Sparkles className="w-3.5 h-3.5 text-butter-yellow" />
                  <span>Golden Chapter {currentAge}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3">
          {stage === "idle" ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBurn}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white text-xs sm:text-sm font-semibold shadow-[0_4px_20px_rgba(255,107,50,0.4)] hover:brightness-105 transition-all"
            >
              <Flame className="w-4 h-4 fill-white text-white" />
              <span>Burn Year {previousAge} & Ignite {currentAge} 🔥</span>
            </motion.button>
          ) : stage === "ignited" ? (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-dark-plum/5 hover:bg-dark-plum/10 text-dark-plum text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Age Transition</span>
            </button>
          ) : (
            <span className="text-xs text-orange-600 font-mono animate-pulse">
              Igniting the new era...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
