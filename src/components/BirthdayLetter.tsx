"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feather, Sparkles, ArrowRight, Stamp } from "lucide-react";
import { BirthdayLetter as BirthdayLetterType } from "@/types/birthday";
import { playCardFlipSound, playSparkleSound } from "@/lib/audio";

interface BirthdayLetterProps {
  letter: BirthdayLetterType;
  friendName: string;
  senderName: string;
  onNext?: () => void;
  id?: string;
}

export default function BirthdayLetter({
  letter,
  friendName,
  senderName,
  onNext,
  id = "section-letter",
}: BirthdayLetterProps) {
  const [isUnsealed, setIsUnsealed] = useState(false);

  const greeting = letter.greeting
    .replace("[FRIEND_NAME]", friendName)
    .replace("[YOUR_NAME]", senderName);

  const sender = letter.sender
    .replace("[FRIEND_NAME]", friendName)
    .replace("[YOUR_NAME]", senderName);

  const handleBreakSeal = () => {
    setIsUnsealed(true);
    playCardFlipSound();
    setTimeout(() => {
      playSparkleSound();
    }, 400);
  };

  return (
    <div id={id} className="relative min-h-[85vh] flex flex-col justify-center items-center py-16 px-6 select-none">
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
        {/* Chapter Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted-lavender/60 text-dark-plum/70 text-xs uppercase tracking-wider font-mono font-medium mb-3 border border-muted-lavender">
          <Feather className="w-3.5 h-3.5 text-soft-violet" />
          <span>Chapter 06 • The Sealed Letter</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-dark-plum tracking-tight mb-3 text-center">
          One Last Thing…
        </h2>

        <p className="font-sans text-dark-plum/75 text-sm sm:text-base leading-relaxed mb-8 text-center">
          A personal, handwritten letter sealed with friendship and care.
        </p>

        {/* Sealed Letter vs Opened Letter */}
        <div className="relative w-full max-w-2xl">
          {!isUnsealed ? (
            /* Folded Parchment with 3D Wax Seal */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleBreakSeal}
              className="cursor-pointer relative w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EB] to-[#F5ECE0] border-2 border-[#E3D7C5] shadow-[0_20px_50px_rgba(56,44,67,0.1)] flex flex-col items-center justify-center p-8 text-center group overflow-hidden"
            >
              {/* Envelope flap lines */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#382c43_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="text-xs uppercase tracking-widest text-dark-plum/50 font-mono mb-6">
                Strictly Confidential for {friendName}
              </div>

              {/* Crimson / Gold Wax Seal */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8A2B3B] via-[#6B1E2B] to-[#450F18] border-2 border-[#AA384B] shadow-xl flex flex-col items-center justify-center text-amber-100 mb-4 transition-transform"
              >
                <Sparkles className="w-8 h-8 text-amber-200" />
                <span className="text-[9px] font-mono tracking-widest uppercase text-amber-200/80 mt-1">
                  SEALED
                </span>
              </motion.div>

              <span className="font-serif text-base text-dark-plum/80 font-medium">
                Tap wax seal to unfold letter
              </span>
            </motion.div>
          ) : (
            /* Unfolded Stationery Letter */
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#EDE5DA] paper-texture overflow-hidden"
            >
              {/* Air Mail Stamp */}
              <div className="absolute top-6 right-6 w-16 h-20 border-2 border-dashed border-dark-plum/20 rounded-md p-1.5 flex flex-col items-center justify-center text-center opacity-70 select-none pointer-events-none">
                <Sparkles className="w-4 h-4 text-butter-yellow" />
                <span className="text-[9px] font-mono uppercase tracking-wider text-dark-plum/60 mt-1">
                  AIR MAIL
                </span>
                <span className="text-[8px] font-serif text-dark-plum/40">2026</span>
              </div>

              {/* Letter Content */}
              <div className="relative z-10 space-y-5 text-dark-plum/85 leading-relaxed font-sans text-base sm:text-lg">
                <h3 className="font-serif text-2xl sm:text-3xl text-dark-plum font-normal mb-6">
                  {greeting}
                </h3>

                {letter.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === letter.paragraphs.length - 1
                        ? "font-serif text-xl sm:text-2xl text-dark-plum pt-4 font-normal"
                        : ""
                    }
                  >
                    {p
                      .replace("[FRIEND_NAME]", friendName)
                      .replace("[YOUR_NAME]", senderName)}
                  </p>
                ))}

                {/* Signoff */}
                <div className="pt-8 flex flex-col items-start border-t border-dark-plum/10">
                  <span className="text-sm text-dark-plum/60 italic font-serif">
                    {letter.signoff}
                  </span>
                  <span className="font-handwriting text-3xl sm:text-4xl text-dark-plum font-normal mt-1">
                    — {sender}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Next Chapter Progression */}
        {isUnsealed && onNext && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                playCardFlipSound();
                onNext();
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-dark-plum text-warm-ivory text-xs sm:text-sm font-medium hover:bg-dark-plum/90 transition-all duration-300 shadow-soft hover:shadow-glow"
            >
              <span>Enter The 3D Memory Universe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
