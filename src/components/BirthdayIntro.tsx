"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Gift, ArrowRight, Heart } from "lucide-react";
import { playSparkleSound } from "@/lib/audio";

interface BirthdayIntroProps {
  friendName: string;
  onOpenComplete: () => void;
}

export default function BirthdayIntro({ friendName, onOpenComplete }: BirthdayIntroProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    playSparkleSound();

    try {
      // Golden & pastel confetti burst
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FFE9A8", "#F8DDE3", "#FFD8C2", "#E8E2F7", "#8B78D6"],
        disableForReducedMotion: true,
      });
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setOpened(true);
      setTimeout(() => {
        onOpenComplete();
      }, 1000);
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#FFF9F2] via-[#FFF3EC] to-[#F8EBE3] select-none overflow-hidden"
    >
      {/* Morphing ambient glowing orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-soft-blush/40 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full bg-muted-lavender/40 blur-3xl"
        />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-butter-yellow/30 blur-2xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
        {/* Floating Decorative Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-soft-blush/60 text-xs font-mono tracking-widest text-dark-plum/70 shadow-xs mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-butter-yellow animate-spin" style={{ animationDuration: "6s" }} />
          <span>A SPECIALLY CURATED DIGITAL SURPRISE</span>
        </motion.div>

        {/* 3D Holographic Gift Box Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          onClick={handleOpen}
          className="relative mb-10 cursor-pointer group"
        >
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-3xl bg-gradient-to-tr from-white via-soft-blush/30 to-white/90 p-1.5 shadow-[0_20px_50px_rgba(56,44,67,0.12)] border border-white/80 backdrop-blur-xl flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_25px_60px_rgba(248,221,227,0.6)]">
            {/* Shimmer light bar across card */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 group-hover:translate-x-[250%] transition-transform duration-1000" />
            </div>

            <div className="w-full h-full rounded-2xl bg-gradient-to-b from-white/95 to-warm-ivory/90 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden border border-white/60">
              {/* Animated Gift Icon with golden badge */}
              <motion.div
                animate={isOpening ? { scale: [1, 1.3, 0.9], rotate: [0, -12, 12, 0] } : { y: [0, -8, 0] }}
                transition={isOpening ? { duration: 0.7 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-soft-blush via-muted-lavender to-butter-yellow p-0.5 shadow-md flex items-center justify-center text-dark-plum mb-3"
              >
                <div className="w-full h-full rounded-2xl bg-white/80 flex items-center justify-center backdrop-blur-xs">
                  <Gift className="w-12 h-12 stroke-[1.4] text-dark-plum group-hover:text-soft-violet transition-colors" />
                </div>
              </motion.div>

              <span className="text-xs uppercase tracking-widest text-dark-plum/60 font-medium">
                For {friendName}
              </span>
              <span className="text-[10px] text-soft-violet font-serif italic mt-0.5">
                (Click to unwrap)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl text-dark-plum tracking-tight mb-3"
        >
          Hey, Birthday Girl! ✨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-sm sm:text-base text-dark-plum/75 max-w-sm mb-8 leading-relaxed font-sans"
        >
          Someone made an interactive, unforgettable little journey for your special day.
        </motion.p>

        {/* Primary Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleOpen}
          disabled={isOpening}
          className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-dark-plum text-warm-ivory text-sm font-medium tracking-wide shadow-soft hover:bg-dark-plum/90 hover:shadow-glow transition-all duration-300"
        >
          <span>{isOpening ? "Unwrapping Surprise..." : "Open Your Surprise"}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        {/* Skip Option */}
        <button
          onClick={onOpenComplete}
          className="mt-6 text-xs text-dark-plum/45 hover:text-dark-plum underline underline-offset-4 transition-colors"
        >
          Skip intro & enter directly
        </button>
      </div>
    </motion.div>
  );
}
