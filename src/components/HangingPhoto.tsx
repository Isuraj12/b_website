"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Maximize2 } from "lucide-react";
import { playCardFlipSound, playSparkleSound } from "@/lib/audio";

interface HangingPhotoProps {
  src: string;
  caption: string;
  date?: string;
  onClick?: () => void;
}

export default function HangingPhoto({
  src,
  caption,
  date = "Special Moment",
  onClick,
}: HangingPhotoProps) {
  const [isSwingingFaster, setIsSwingingFaster] = useState(false);

  const handleClick = () => {
    setIsSwingingFaster(true);
    playCardFlipSound();
    playSparkleSound();
    setTimeout(() => setIsSwingingFaster(false), 2000);
    if (onClick) onClick();
  };

  return (
    <div className="relative flex flex-col items-center select-none py-4">
      {/* 1. Horizontal Twine / Golden Thread across the top */}
      <div className="relative w-64 sm:w-80 h-4 flex items-center justify-center">
        {/* Thread Line */}
        <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C2A384] to-transparent shadow-xs" />
        
        {/* Tiny golden pins at thread ends */}
        <div className="absolute left-4 w-2 h-2 rounded-full bg-[#8A5A36] border border-[#FFE9A8] shadow-xs" />
        <div className="absolute right-4 w-2 h-2 rounded-full bg-[#8A5A36] border border-[#FFE9A8] shadow-xs" />
      </div>

      {/* 2. Hanging Vertical String with Clothespin and Polaroid */}
      <motion.div
        animate={
          isSwingingFaster
            ? { rotate: [-8, 8, -6, 6, -3, 3, 0] }
            : { rotate: [-3.5, 3.5, -3.5] }
        }
        transition={
          isSwingingFaster
            ? { duration: 1.8, ease: "easeOut" }
            : { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ transformOrigin: "top center" }}
        className="flex flex-col items-center cursor-pointer group"
        onClick={handleClick}
      >
        {/* Vertical Twine Thread */}
        <div className="w-[1.5px] h-8 sm:h-12 bg-gradient-to-b from-[#C2A384] to-[#A88665]" />

        {/* Wooden Clothespin / Gold Clip holding the photo */}
        <div className="relative z-10 -mb-2 flex flex-col items-center">
          {/* Clip Body */}
          <div className="w-4 h-9 bg-gradient-to-b from-[#D4A373] via-[#FAEDCD] to-[#CCD5AE] rounded-xs shadow-md border border-[#B58253] flex items-center justify-center">
            {/* Metal Spring Ring */}
            <div className="w-5 h-1.5 bg-[#8E7D6B] rounded-full border border-black/20" />
          </div>
        </div>

        {/* Polaroid Photo Frame */}
        <div className="relative w-48 sm:w-56 p-3 pb-5 bg-white rounded-2xl shadow-[0_15px_35px_rgba(56,44,67,0.14)] border border-[#E8DFC8] group-hover:shadow-[0_20px_45px_rgba(248,221,227,0.5)] transition-all duration-300 transform group-hover:scale-102">
          {/* Subtle paper grain texture */}
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-warm-ivory mb-2.5 border border-dark-plum/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover expand badge */}
            <div className="absolute inset-0 bg-dark-plum/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2 rounded-full bg-white/90 text-dark-plum shadow-md backdrop-blur-xs">
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Handwritten Caption */}
          <div className="text-center px-1">
            <p className="font-serif text-xs sm:text-sm text-dark-plum font-medium leading-tight mb-1">
              “{caption}”
            </p>
            <div className="flex items-center justify-center gap-1 text-[10px] text-dark-plum/50 font-handwriting">
              <Sparkles className="w-2.5 h-2.5 text-butter-yellow" />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
