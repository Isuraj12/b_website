"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, RotateCcw, PartyPopper } from "lucide-react";
import { playCelebrationFanfare, playSparkleSound } from "@/lib/audio";

interface FinalCelebrationProps {
  friendName: string;
  onRestart?: () => void;
  id?: string;
}

const cheerfulMessages = [
  "May your year be packed with spontaneous road trips and endless iced coffees!",
  "Here's to zero stress, maximum dessert, and 100% unforgettable memories!",
  "Keep shining, keep smiling, and don't forget to eat an extra slice of cake today!",
  "May all your wildest dreams turn into your proudest accomplishments!",
  "Wishing you a year filled with loud belly-laughs and serene Sunday mornings!",
];

export default function FinalCelebration({ friendName, onRestart, id = "section-celebration" }: FinalCelebrationProps) {
  const [randomMessage, setRandomMessage] = useState<string | null>(null);

  const handleCelebrate = () => {
    playCelebrationFanfare();

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#F8DDE3", "#FFE9A8", "#E8E2F7", "#FFD8C2", "#8B78D6"],
        disableForReducedMotion: true,
      });
    } catch {
      // Graceful fallback
    }

    const nextMsg = cheerfulMessages[Math.floor(Math.random() * cheerfulMessages.length)];
    setRandomMessage(nextMsg);
  };

  return (
    <div id={id} className="relative min-h-[85vh] flex flex-col justify-center items-center py-16 px-6 text-warm-ivory select-none">
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Celebration Icon Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono uppercase tracking-wider text-butter-yellow backdrop-blur-md mb-6">
          <PartyPopper className="w-4 h-4 text-butter-yellow" />
          <span>Chapter 08 • The Birthday Finale</span>
        </div>

        {/* Main Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white tracking-tight mb-5 leading-tight">
          And That&apos;s Your Birthday Surprise! 🎉
        </h2>

        {/* Supporting Message */}
        <p className="font-sans text-base sm:text-lg text-warm-ivory/80 max-w-lg mb-10 leading-relaxed">
          Hope this brought a bright smile to your face. Here&apos;s to a marvelous, adventure-filled year ahead, {friendName}!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCelebrate}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-butter-yellow via-soft-blush to-soft-peach text-dark-plum text-sm font-semibold tracking-wide shadow-[0_0_30px_rgba(255,233,168,0.5)] hover:brightness-105 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-dark-plum" />
            <span>Celebrate One More Time ✨</span>
          </motion.button>

          {onRestart && (
            <button
              onClick={() => {
                playSparkleSound();
                onRestart();
              }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-warm-ivory text-sm font-medium border border-white/15 backdrop-blur-sm transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay From Beginning</span>
            </button>
          )}
        </div>

        {/* Random Uplifting Message Card */}
        <AnimatePresence>
          {randomMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="p-5 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl max-w-md text-base text-butter-yellow font-serif shadow-2xl"
            >
              ✨ {randomMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
