"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface SectionDividerProps {
  variant?: "floral" | "sparkle" | "botanical" | "stars" | "cosmic";
  className?: string;
}

export default function SectionDivider({ variant = "floral", className = "" }: SectionDividerProps) {
  if (variant === "cosmic") {
    return (
      <div className={`relative w-full py-10 flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}>
        {/* Deep gradient transition from daylight pastel to midnight space */}
        <div className="w-full h-24 bg-gradient-to-b from-transparent via-[#060818]/60 to-[#060818]" />
      </div>
    );
  }

  return (
    <div className={`relative w-full py-6 sm:py-8 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Left delicate faded line */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C25A6C]/25 to-[#C25A6C]/40 max-w-xs" />

      {/* Center Botanical / Flourish Emblem */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-4 flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-[#FAD9DE]/60 backdrop-blur-xs shadow-2xs"
      >
        {variant === "floral" && (
          <>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#C25A6C]" fill="currentColor">
              <path d="M12 2C13.5 6 17 6.5 17 9.5C17 12 14.5 13 12 13C9.5 13 7 12 7 9.5C7 6.5 10.5 6 12 2Z" />
              <path d="M12 22C10.5 18 7 17.5 7 14.5C7 12 9.5 11 12 11C14.5 11 17 12 17 14.5C17 17.5 13.5 18 12 22Z" />
              <path d="M2 12C6 10.5 6.5 7 9.5 7C12 7 13 9.5 13 12C13 14.5 12 17 9.5 17C6.5 17 6 13.5 2 12Z" />
              <path d="M22 12C18 13.5 17.5 17 14.5 17C12 17 11 14.5 11 12C11 9.5 12 7 14.5 7C17.5 7 18 10.5 22 12Z" />
              <circle cx="12" cy="12" r="2.5" fill="#FFE9A8" />
            </svg>
            <span className="font-serif italic text-xs text-[#8B7863]">A Special Chapter</span>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#C25A6C]" fill="currentColor">
              <path d="M12 2C13.5 6 17 6.5 17 9.5C17 12 14.5 13 12 13C9.5 13 7 12 7 9.5C7 6.5 10.5 6 12 2Z" />
              <path d="M12 22C10.5 18 7 17.5 7 14.5C7 12 9.5 11 12 11C14.5 11 17 12 17 14.5C17 17.5 13.5 18 12 22Z" />
              <circle cx="12" cy="12" r="2.5" fill="#FFE9A8" />
            </svg>
          </>
        )}

        {variant === "sparkle" && (
          <>
            <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
            <span className="font-serif italic text-xs text-[#8B7863]">Golden Moments</span>
            <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
          </>
        )}

        {variant === "botanical" && (
          <>
            <Heart className="w-3 h-3 text-[#C25A6C] fill-current" />
            <span className="font-serif italic text-xs text-[#8B7863]">Pressed with Love</span>
            <Heart className="w-3 h-3 text-[#C25A6C] fill-current" />
          </>
        )}

        {variant === "stars" && (
          <>
            <Sparkles className="w-3.5 h-3.5 text-[#8B78D6]" />
            <span className="font-serif italic text-xs text-[#8B7863]">Starlit Prophecies</span>
            <Sparkles className="w-3.5 h-3.5 text-[#8B78D6]" />
          </>
        )}
      </motion.div>

      {/* Right delicate faded line */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C25A6C]/25 to-[#C25A6C]/40 max-w-xs" />
    </div>
  );
}

