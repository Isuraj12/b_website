"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Laugh, Trophy, Gift, Dices, Sparkles, Check, ArrowRight } from "lucide-react";
import { WishCategory } from "@/types/birthday";
import { playCardFlipSound } from "@/lib/audio";

interface WishGeneratorProps {
  wishes: WishCategory[];
  onNext?: () => void;
  id?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5" />,
  Laugh: <Laugh className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
  Gift: <Gift className="w-5 h-5" />,
};

export default function WishGenerator({ wishes, onNext, id = "section-wishes" }: WishGeneratorProps) {
  const [activeWishId, setActiveWishId] = useState<string>(wishes[0]?.id || "adventures");
  const [isShuffling, setIsShuffling] = useState(false);

  const selectedWish = wishes.find((w) => w.id === activeWishId) || wishes[0];

  const handleSelect = (id: string) => {
    playCardFlipSound();
    setActiveWishId(id);
  };

  const handleSurpriseMe = () => {
    playCardFlipSound();
    setIsShuffling(true);

    let count = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * wishes.length);
      setActiveWishId(wishes[randomIdx].id);
      count++;
      if (count > 6) {
        clearInterval(interval);
        setIsShuffling(false);
      }
    }, 100);
  };

  return (
    <div id={id} className="relative min-h-[85vh] flex flex-col justify-center items-center text-center py-16 px-6 select-none">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        {/* Chapter Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-butter-yellow/60 text-dark-plum/70 text-xs uppercase tracking-wider font-mono font-medium mb-3 border border-butter-yellow">
          <Sparkles className="w-3.5 h-3.5 text-soft-violet" />
          <span>Chapter 05 • Celestial Tarot Oracle</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-dark-plum tracking-tight mb-4">
          Let&apos;s See What This Year Has in Store…
        </h2>

        <p className="font-sans text-dark-plum/75 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
          Tap an oracle card to unveil your birthday prophecy, or let fate shuffle the deck.
        </p>

        {/* 4 Interactive Celestial Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-8">
          {wishes.map((item) => {
            const isSelected = item.id === activeWishId;
            const icon = iconMap[item.iconName] || <Sparkles className="w-5 h-5" />;

            return (
              <motion.button
                key={item.id}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleSelect(item.id)}
                className={`relative rounded-3xl p-5 sm:p-6 text-center flex flex-col items-center justify-between border transition-all duration-300 shadow-soft ${
                  isSelected
                    ? "bg-gradient-to-b from-white to-[#F8F3FF] border-soft-violet/50 shadow-[0_15px_30px_rgba(139,120,214,0.25)] ring-2 ring-soft-violet/40"
                    : "bg-white/70 hover:bg-white border-white/80 text-dark-plum/80"
                }`}
              >
                {/* Mystic Star Icon */}
                <div
                  className={`p-3 rounded-2xl mb-3 transition-colors ${
                    isSelected
                      ? "bg-gradient-to-tr from-soft-violet to-[#96557F] text-white shadow-xs"
                      : "bg-dark-plum/5 text-dark-plum/70"
                  }`}
                >
                  {icon}
                </div>

                <span className="font-serif text-sm sm:text-base font-medium text-dark-plum leading-snug">
                  {item.label}
                </span>

                <span className="text-[10px] font-mono tracking-wider uppercase text-dark-plum/40 mt-2">
                  {isSelected ? "✦ Revealed" : "Tap to flip"}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Shuffle Button */}
        <div className="mb-8">
          <button
            onClick={handleSurpriseMe}
            disabled={isShuffling}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-white/80 hover:bg-white text-dark-plum border border-soft-blush shadow-xs transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Dices className={`w-4 h-4 text-soft-violet ${isShuffling ? "animate-spin" : ""}`} />
            <span>Shuffle & Surprise Me</span>
          </button>
        </div>

        {/* Revealed Oracle Prophecy Card */}
        <div className="w-full max-w-2xl min-h-[220px]">
          <AnimatePresence mode="wait">
            {selectedWish && (
              <motion.div
                key={selectedWish.id}
                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-xl border border-white/90 text-center flex flex-col items-center justify-center overflow-hidden"
              >
                <div
                  className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${selectedWish.accentColor} opacity-20 blur-2xl pointer-events-none`}
                />

                <span className="text-[11px] uppercase tracking-widest text-soft-violet font-mono mb-2">
                  ✦ {selectedWish.tagline} ✦
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-dark-plum mb-4">
                  {selectedWish.label}
                </h3>

                <p className="font-sans text-base sm:text-lg text-dark-plum/85 leading-relaxed max-w-lg mb-6">
                  “{selectedWish.wish}”
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50/90 px-3.5 py-1.5 rounded-full border border-emerald-200 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Sealed into the universe for you</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Next Chapter Progression */}
        {onNext && (
          <div className="mt-8">
            <button
              onClick={() => {
                playCardFlipSound();
                onNext();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-plum text-warm-ivory text-xs sm:text-sm font-medium hover:bg-dark-plum/90 transition-all duration-300 shadow-soft hover:shadow-glow"
            >
              <span>Read The Sealed Letter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
