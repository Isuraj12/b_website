"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, RotateCcw, ArrowRight, Wind } from "lucide-react";
import { playCandleBlowSound, playCardFlipSound } from "@/lib/audio";

interface WishCakeProps {
  onNext?: () => void;
  id?: string;
}

export default function WishCake({ onNext, id = "section-cake" }: WishCakeProps) {
  const [isLit, setIsLit] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleMakeWish = () => {
    setIsLit(true);
    setWishMade(true);
    playCandleBlowSound();

    try {
      // Confetti burst from bottom center
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.62 },
        colors: ["#FFE9A8", "#F8DDE3", "#FFD8C2", "#E8E2F7", "#8B78D6"],
        disableForReducedMotion: true,
      });
    } catch {
      // Graceful fallback
    }
  };

  const handleReset = () => {
    setIsLit(false);
    setWishMade(false);
    playCardFlipSound();
  };

  return (
    <div id={id} className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 py-16 select-none">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Chapter Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-blush/60 text-dark-plum/70 text-xs uppercase tracking-wider font-mono font-medium mb-3 backdrop-blur-xs border border-soft-blush">
          <Sparkles className="w-3.5 h-3.5 text-soft-violet" />
          <span>Chapter 02 • Traditions & Smiles</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-dark-plum tracking-tight mb-4">
          Make a Birthday Wish
        </h2>

        <p className="font-sans text-dark-plum/75 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
          Take a quiet second, close your eyes, think of something exciting for this year, and ignite the candles.
        </p>

        {/* Illustrated Interactive Cake with Embers & Candles */}
        <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center mb-8">
          {/* Animated floating golden embers when lit */}
          {isLit && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    y: -140 - Math.random() * 60,
                    x: (Math.random() - 0.5) * 120,
                    scale: [0.5, 1.2, 0.2],
                  }}
                  transition={{
                    duration: 2.5 + Math.random() * 1.5,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeOut",
                  }}
                  className="absolute left-1/2 top-1/4 w-2 h-2 rounded-full bg-butter-yellow blur-[1px] shadow-[0_0_8px_#FFE9A8]"
                />
              ))}
            </div>
          )}

          <svg
            viewBox="0 0 320 320"
            className="w-full h-full drop-shadow-xl select-none"
            aria-label="Illustrated Birthday Cake"
          >
            {/* Candlelight glow */}
            {isLit && (
              <circle
                cx="160"
                cy="70"
                r="70"
                fill="#FFE9A8"
                opacity="0.4"
                className="animate-pulse"
              />
            )}

            {/* Cake Plate Stand */}
            <ellipse cx="160" cy="275" rx="120" ry="16" fill="#E8E2F7" />
            <path d="M125,275 C125,292 195,292 195,275 Z" fill="#DDE9D7" />
            <ellipse cx="160" cy="272" rx="110" ry="12" fill="#FFFFFF" />

            {/* Bottom Layer */}
            <path
              d="M70,200 C70,190 250,190 250,200 L250,260 C250,270 70,270 70,260 Z"
              fill="#F8DDE3"
            />
            <path
              d="M70,200 C70,210 250,210 250,200 L250,215 C250,225 70,225 70,215 Z"
              fill="#FFE9A8"
              opacity="0.85"
            />
            {/* Frosting drips */}
            <path
              d="M70,210 Q85,225 100,210 Q115,228 130,210 Q145,226 160,210 Q175,228 190,210 Q205,225 220,210 Q235,226 250,210"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Top Layer */}
            <path
              d="M95,135 C95,127 225,127 225,135 L225,195 C225,203 95,203 95,195 Z"
              fill="#FFD8C2"
            />
            <ellipse cx="160" cy="135" rx="65" ry="10" fill="#FFFFFF" />
            <circle cx="110" cy="195" r="4" fill="#382C43" opacity="0.15" />
            <circle cx="135" cy="195" r="4" fill="#382C43" opacity="0.15" />
            <circle cx="160" cy="195" r="4" fill="#382C43" opacity="0.15" />
            <circle cx="185" cy="195" r="4" fill="#382C43" opacity="0.15" />
            <circle cx="210" cy="195" r="4" fill="#382C43" opacity="0.15" />

            {/* 3 Candles */}
            <rect x="120" y="85" width="8" height="42" rx="4" fill="#E8E2F7" />
            <line x1="124" y1="85" x2="124" y2="78" stroke="#382C43" strokeWidth="1.5" />

            <rect x="156" y="75" width="8" height="52" rx="4" fill="#FFE9A8" />
            <line x1="160" y1="75" x2="160" y2="68" stroke="#382C43" strokeWidth="1.5" />

            <rect x="192" y="85" width="8" height="42" rx="4" fill="#DDE9D7" />
            <line x1="196" y1="85" x2="196" y2="78" stroke="#382C43" strokeWidth="1.5" />

            {/* Flickering Animated Flames */}
            {isLit && (
              <g className="animate-flame">
                <path
                  d="M124,56 C119,67 117,73 124,78 C131,73 129,67 124,56 Z"
                  fill="#FFAE42"
                />
                <circle cx="124" cy="73" r="3.2" fill="#FFF3B0" />

                <path
                  d="M160,44 C154,57 152,64 160,68 C168,64 166,57 160,44 Z"
                  fill="#FFAE42"
                />
                <circle cx="160" cy="63" r="4" fill="#FFF3B0" />

                <path
                  d="M196,56 C191,67 189,73 196,78 C203,73 201,67 196,56 Z"
                  fill="#FFAE42"
                />
                <circle cx="196" cy="73" r="3.2" fill="#FFF3B0" />
              </g>
            )}
          </svg>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col items-center">
          {!isLit ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMakeWish}
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-dark-plum text-warm-ivory text-sm font-medium tracking-wide shadow-soft hover:bg-dark-plum/90 hover:shadow-glow transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-butter-yellow" />
              <span>Make a Wish & Light Candles ✨</span>
            </motion.button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-3xl bg-white/95 border border-muted-lavender/60 shadow-xl max-w-md backdrop-blur-md"
              >
                <p className="font-serif text-xl text-dark-plum mb-2">
                  “Wish made? Good. Now let the universe handle the paperwork.”
                </p>
                <p className="font-sans text-xs text-dark-plum/60">
                  ✨ The candles are burning bright with endless good vibes.
                </p>
              </motion.div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-dark-plum/60 hover:text-dark-plum transition-colors underline underline-offset-4"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay candle wish</span>
                </button>

                {onNext && (
                  <button
                    onClick={() => {
                      playCardFlipSound();
                      onNext();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-soft-violet/15 hover:bg-soft-violet/25 text-xs font-medium text-dark-plum transition-colors"
                  >
                    <span>Next Chapter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
