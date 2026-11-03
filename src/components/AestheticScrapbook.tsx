"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Volume2,
  VolumeX,
  Heart,
  Calendar,
  Flower2,
  Bookmark,
  Mail,
  X,
  RotateCcw,
} from "lucide-react";
import { GalleryPhoto } from "@/types/birthday";
import PhotoLightbox from "./PhotoLightbox";
import { playPageFlipSound, playSparkleSound } from "@/lib/audio";
import confetti from "canvas-confetti";

interface AestheticScrapbookProps {
  photos: GalleryPhoto[];
  friendName: string;
  senderName: string;
}

// Botanical SVG Illustrations
function PressedRose({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`pointer-events-none drop-shadow-xs select-none ${className}`}>
      {/* Dried Stem & Leaves */}
      <path d="M40 75 C40 60 42 45 40 38" stroke="#687258" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M40 55 C32 50 25 52 22 48 C28 44 36 47 40 52" fill="#758263" fillOpacity="0.85" />
      <path d="M40 45 C48 40 56 42 60 38 C54 34 46 38 40 43" fill="#687258" fillOpacity="0.8" />
      {/* Pressed Rose Petals with sepia/vintage rose undertones */}
      <ellipse cx="40" cy="30" rx="14" ry="12" fill="#C25A6C" fillOpacity="0.88" />
      <path d="M30 30 C30 20 40 18 48 24 C44 32 34 32 30 30 Z" fill="#9F3C4E" fillOpacity="0.9" />
      <ellipse cx="42" cy="27" rx="8" ry="7" fill="#E88A99" fillOpacity="0.85" />
      <path d="M37 25 C39 21 44 21 46 25 C44 28 39 28 37 25 Z" fill="#D36B7E" />
    </svg>
  );
}

function PressedLavender({ className = "w-10 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 100" fill="none" className={`pointer-events-none drop-shadow-xs select-none ${className}`}>
      {/* Slender Stem */}
      <path d="M30 95 C30 65 30 35 30 15" stroke="#627056" strokeWidth="1.8" strokeLinecap="round" />
      {/* Delicate purple blossoms */}
      <ellipse cx="30" cy="18" rx="4" ry="5" fill="#8B78D6" fillOpacity="0.85" />
      <ellipse cx="25" cy="28" rx="4.5" ry="5.5" fill="#9C8BE0" fillOpacity="0.8" />
      <ellipse cx="35" cy="30" rx="4.5" ry="5.5" fill="#7E68CD" fillOpacity="0.85" />
      <ellipse cx="24" cy="42" rx="4.5" ry="6" fill="#8B78D6" fillOpacity="0.8" />
      <ellipse cx="36" cy="44" rx="4.5" ry="6" fill="#9C8BE0" fillOpacity="0.85" />
      <ellipse cx="26" cy="56" rx="4" ry="5.5" fill="#7E68CD" fillOpacity="0.8" />
      <ellipse cx="34" cy="58" rx="4" ry="5.5" fill="#8B78D6" fillOpacity="0.8" />
      {/* Small side leaf */}
      <path d="M30 75 C24 70 20 62 23 58 C26 64 28 68 30 72" fill="#627056" fillOpacity="0.75" />
    </svg>
  );
}

function PressedChamomile({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 70" fill="none" className={`pointer-events-none drop-shadow-xs select-none ${className}`}>
      {/* Stem */}
      <path d="M35 68 C35 55 35 45 35 38" stroke="#6B775C" strokeWidth="2" strokeLinecap="round" />
      {/* White/Ivory Petals */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <ellipse
          key={i}
          cx="35"
          cy="35"
          rx="5"
          ry="14"
          fill="#FFFDF7"
          stroke="#E6DFD1"
          strokeWidth="0.8"
          transform={`rotate(${angle} 35 35)`}
          fillOpacity="0.92"
        />
      ))}
      {/* Golden Center */}
      <circle cx="35" cy="35" r="7.5" fill="#E8B838" />
      <circle cx="35" cy="35" r="5" fill="#D49E1F" />
    </svg>
  );
}

function PressedEucalyptus({ className = "w-14 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 100" fill="none" className={`pointer-events-none drop-shadow-xs select-none ${className}`}>
      <path d="M35 95 C35 60 36 30 35 10" stroke="#758269" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="26" cy="22" rx="9" ry="7" fill="#8B9B7E" fillOpacity="0.8" transform="rotate(-15 26 22)" />
      <ellipse cx="44" cy="26" rx="9" ry="7" fill="#7D8D70" fillOpacity="0.85" transform="rotate(15 44 26)" />
      <ellipse cx="24" cy="42" rx="10" ry="8" fill="#7D8D70" fillOpacity="0.85" transform="rotate(-20 24 42)" />
      <ellipse cx="46" cy="46" rx="10" ry="8" fill="#8B9B7E" fillOpacity="0.8" transform="rotate(20 46 46)" />
      <ellipse cx="22" cy="65" rx="11" ry="8.5" fill="#8B9B7E" fillOpacity="0.8" transform="rotate(-25 22 65)" />
      <ellipse cx="48" cy="68" rx="11" ry="8.5" fill="#7D8D70" fillOpacity="0.85" transform="rotate(25 48 68)" />
    </svg>
  );
}

// Decorative Washi Tape Strips
function WashiTape({
  className = "",
  style = {},
  variant = "floral",
}: {
  className?: string;
  style?: React.CSSProperties;
  variant?: "floral" | "lace" | "gold" | "sage";
}) {
  const backgrounds = {
    floral:
      "bg-gradient-to-r from-[#FAD9DE]/85 via-[#FCE4E8]/90 to-[#FAD9DE]/85 border-y border-[#F3B7C2]/40 shadow-xs",
    lace:
      "bg-gradient-to-r from-white/90 via-[#F7F2EC]/90 to-white/90 border-y border-dashed border-[#D2C5B2]/60 shadow-xs",
    gold:
      "bg-gradient-to-r from-[#F6DE98]/85 via-[#FFECA8]/90 to-[#F6DE98]/85 border-y border-[#E2C366]/40 shadow-xs",
    sage:
      "bg-gradient-to-r from-[#DDE9D7]/85 via-[#E8F2E3]/90 to-[#DDE9D7]/85 border-y border-[#BCCEA9]/40 shadow-xs",
  };

  return (
    <div
      style={style}
      className={`h-4 sm:h-5 rounded-xs backdrop-blur-xs select-none pointer-events-none ${backgrounds[variant]} ${className}`}
    >
      {/* Decorative dashed or pattern edge */}
      <div className="w-full h-full opacity-35 bg-[radial-gradient(#382C43_0.8px,transparent_0.8px)] [background-size:6px_6px]" />
    </div>
  );
}

// Vintage Scalloped Postage Stamp
function PostageStamp({
  label,
  price,
  icon,
  className = "",
}: {
  label: string;
  price: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative p-2 rounded-sm bg-[#FFFDF9] border border-[#DED4C5] shadow-xs flex flex-col items-center justify-between text-center select-none ${className}`}
      style={{
        backgroundImage: "radial-gradient(#CBBDA8 0.7px, transparent 0.7px)",
        backgroundSize: "6px 6px",
      }}
    >
      {/* Scalloped simulated border notches */}
      <div className="border border-dashed border-[#B8A68D] p-1.5 w-full h-full flex flex-col items-center justify-between">
        <div className="flex items-center justify-between w-full text-[9px] font-mono text-[#8B7863] leading-none">
          <span>AIRMAIL</span>
          <span>{price}</span>
        </div>
        <div className="my-1 text-[#C25A6C]">{icon || <Heart className="w-3.5 h-3.5 fill-current" />}</div>
        <div className="text-[8px] font-serif uppercase tracking-wider text-[#695A48] font-bold">{label}</div>
      </div>
    </div>
  );
}

export default function AestheticScrapbook({ photos, friendName, senderName }: AestheticScrapbookProps) {
  // Current spread index:
  // 0: Hardcover Front
  // 1: Dedication & Golden Memories (Pages 1 & 2)
  // 2: Roadtrips & Spontaneous Adventures (Pages 3 & 4)
  // 3: Coffee Talks & City Starlight (Pages 5 & 6)
  // 4: Celebrations & Secret Pocket Letter (Pages 7 & 8)
  // 5: Hardcover Back & Dedication
  const [currentSpread, setCurrentSpread] = useState(0);
  const [flipDirection, setFlipDirection] = useState<"forward" | "backward">("forward");
  const [isFlipping, setIsFlipping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const totalSpreads = 6;

  const triggerFlipAudio = useCallback(() => {
    if (soundEnabled) {
      playPageFlipSound();
    }
  }, [soundEnabled]);

  const turnNext = useCallback(() => {
    if (isFlipping || currentSpread >= totalSpreads - 1) return;
    setIsFlipping(true);
    setFlipDirection("forward");
    triggerFlipAudio();
    setCurrentSpread((prev) => prev + 1);
    setTimeout(() => setIsFlipping(false), 550);
  }, [isFlipping, currentSpread, totalSpreads, triggerFlipAudio]);

  const turnPrev = useCallback(() => {
    if (isFlipping || currentSpread <= 0) return;
    setIsFlipping(true);
    setFlipDirection("backward");
    triggerFlipAudio();
    setCurrentSpread((prev) => prev - 1);
    setTimeout(() => setIsFlipping(false), 550);
  }, [isFlipping, currentSpread, triggerFlipAudio]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex !== null) return;
      if (e.key === "ArrowRight") turnNext();
      if (e.key === "ArrowLeft") turnPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [turnNext, turnPrev, selectedPhotoIndex]);

  const handleOpenSecretLetter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEnvelopeOpen(true);
    playSparkleSound();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.55 },
        colors: ["#FFE9A8", "#F8DDE3", "#FFD8C2", "#8B78D6"],
        disableForReducedMotion: true,
      });
    } catch {}
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center items-center py-16 px-4 sm:px-6 select-none overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-soft-blush/70 border border-soft-blush text-xs font-mono font-medium text-dark-plum/80 shadow-xs mb-3 backdrop-blur-md"
        >
          <Flower2 className="w-3.5 h-3.5 text-[#C25A6C]" />
          <span>CHAPTER 04 • BOTANICAL MEMORY SCRAPBOOK</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-5xl text-dark-plum tracking-tight mb-3"
        >
          Moments Preserved in Petals
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-dark-plum/75 text-sm sm:text-base leading-relaxed max-w-lg mx-auto"
        >
          A handcrafted keepsake album with pressed wild blossoms, candid polaroids, washi tape, and tactile turning pages.
        </motion.p>
      </div>

      {/* Main Scrapbook Stage Controls Bar */}
      <div className="max-w-4xl w-full flex items-center justify-between mb-4 px-2 z-10 text-xs text-dark-plum/70 font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) triggerFlipAudio();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-2xs backdrop-blur-md transition-all ${
              soundEnabled
                ? "bg-white/80 border-soft-blush text-dark-plum hover:bg-white"
                : "bg-white/40 border-dark-plum/10 text-dark-plum/50 hover:bg-white/60"
            }`}
            title="Toggle Realistic Page Turning Audio"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#C25A6C]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>Paper Sound: {soundEnabled ? "On" : "Muted"}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-serif italic text-dark-plum/60 hidden sm:inline">
            {currentSpread === 0
              ? "Album Front Cover"
              : currentSpread === totalSpreads - 1
              ? "Album Back Cover"
              : `Spread ${currentSpread} of ${totalSpreads - 2}`}
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalSpreads }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx !== currentSpread && !isFlipping) {
                    setFlipDirection(idx > currentSpread ? "forward" : "backward");
                    triggerFlipAudio();
                    setCurrentSpread(idx);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSpread === idx ? "w-6 bg-[#C25A6C]" : "w-2 bg-dark-plum/20 hover:bg-dark-plum/40"
                }`}
                aria-label={`Jump to page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3D SCRAPBOOK ALBUM COMPONENT */}
      <div className="relative w-full max-w-4xl perspective-[2200px] z-10">
        {/* Drop shadow underneath entire album */}
        <div className="absolute inset-0 max-w-4xl mx-auto rounded-3xl bg-[#382C43]/15 blur-2xl transform translate-y-6 pointer-events-none" />

        {/* Outer Album Container with Realistic Spine, Cover Trim & Depth */}
        <div className="relative min-h-[500px] sm:min-h-[580px] w-full rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#3D2633] via-[#4D3141] to-[#3D2633] p-2 sm:p-4 shadow-[0_25px_60px_rgba(56,44,67,0.22)] border-2 border-[#684357]/60">
          {/* Gold metal corners on book exterior */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#E5C378] rounded-tl-sm pointer-events-none opacity-80" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#E5C378] rounded-tr-sm pointer-events-none opacity-80" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#E5C378] rounded-bl-sm pointer-events-none opacity-80" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#E5C378] rounded-br-sm pointer-events-none opacity-80" />

          {/* Central Book Spine Shadow & Stitched Seam */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/25 via-black/40 to-black/25 z-30 pointer-events-none hidden md:block">
            <div className="w-full h-full border-x border-dashed border-[#E5C378]/30" />
          </div>

          {/* Hanging Satin Silk Bookmark Ribbon */}
          <div className="absolute top-0 left-[51%] w-4 h-28 sm:h-36 bg-gradient-to-b from-[#A63A50] to-[#802638] shadow-md z-40 pointer-events-none transform -translate-x-1/2 rounded-b-sm border-x border-[#BD4961]/50">
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#802638] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
          </div>

          {/* SPREAD CONTENT WRAPPER WITH 3D PAGE FLIP ANIMATION */}
          <div className="relative w-full h-full min-h-[480px] sm:min-h-[550px] overflow-hidden rounded-xl sm:rounded-2xl">
            <AnimatePresence mode="wait" initial={false}>
              {/* ==================== SPREAD 0: ALBUM COVER ==================== */}
              {currentSpread === 0 && (
                <motion.div
                  key="spread-cover"
                  initial={{ opacity: 0, rotateY: flipDirection === "backward" ? -40 : 40 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: flipDirection === "forward" ? -40 : 40 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="w-full h-full min-h-[480px] sm:min-h-[550px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#59394B] via-[#432938] to-[#2E1A26] p-6 sm:p-12 flex flex-col items-center justify-center text-center relative border border-[#7D5369]/60 shadow-inner overflow-hidden cursor-pointer group"
                  onClick={turnNext}
                >
                  {/* Subtle Linen / Texture Pattern */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#FFE9A8_1px,transparent_1px)] [background-size:12px_12px]" />

                  {/* Gold Foil Embossed Botanical Frame */}
                  <div className="relative max-w-md w-full p-8 sm:p-10 rounded-2xl border-2 border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col items-center justify-center backdrop-blur-xs bg-black/10">
                    <div className="absolute -top-4 bg-[#432938] px-4 text-[#E5C378] flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Special Edition</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>

                    {/* Illustrated Floral Wreath Ring */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-dashed border-[#E5C378]/60 animate-spin" style={{ animationDuration: "35s" }} />
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#C25A6C]/30 to-[#FFE9A8]/20 flex items-center justify-center">
                        <PressedRose className="w-16 h-16" />
                      </div>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl text-[#FBF5E8] tracking-tight mb-2 drop-shadow-md">
                      {friendName}&apos;s Scrapbook
                    </h1>

                    <p className="font-serif italic text-[#E5C378] text-base sm:text-lg mb-4">
                      Memories, Milestones & Moments
                    </p>

                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E5C378] to-transparent my-2" />

                    <p className="font-sans text-xs sm:text-sm text-[#E3D4C4]/80 tracking-wide max-w-xs mb-6">
                      A celebration of unforgettable laughs, quiet moments, and golden days.
                    </p>

                    {/* Open Album Call to Action */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E5C378] to-[#CCA247] text-[#2E1A26] font-medium text-xs tracking-wider uppercase shadow-md group-hover:shadow-[0_0_20px_rgba(229,195,120,0.5)] transition-all"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Open The Pages</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>

                  <div className="absolute bottom-4 text-[11px] font-mono tracking-widest text-[#E5C378]/50">
                    CLICK ANYWHERE OR USE ARROW KEYS TO TURN
                  </div>
                </motion.div>
              )}

              {/* ==================== SPREAD 1: DEDICATION & GOLDEN MEMORIES (PAGES 1 & 2) ==================== */}
              {currentSpread === 1 && (
                <motion.div
                  key="spread-1"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="w-full h-full min-h-[480px] sm:min-h-[550px] grid grid-cols-1 md:grid-cols-2 bg-[#FBF7EE] text-dark-plum relative shadow-inner"
                >
                  {/* LEFT PAGE (PAGE 1) - Dedication Bookplate */}
                  <div
                    onClick={turnPrev}
                    className="p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DEC8] relative bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFE0] cursor-pointer"
                  >
                    {/* Washi tape at top */}
                    <WashiTape variant="sage" className="w-24 mx-auto -mt-2 mb-4 rotate-1" />

                    {/* Bookplate Card */}
                    <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E3D7C1] shadow-xs relative">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-dashed border-[#D5C7AF]">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-[#887762]">
                          EX LIBRIS • MEMORIA
                        </span>
                        <PostageStamp label="Cherished" price="2026" className="w-12 h-14" />
                      </div>

                      <h3 className="font-serif italic text-2xl sm:text-3xl text-dark-plum mb-3 leading-snug">
                        “To days that became our favorite stories.”
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-dark-plum/75 leading-relaxed mb-4">
                        Dear {friendName}, looking through these photographs is like opening a warm summer afternoon.
                        Every smile, inside joke, and spontaneous adventure reminds me how lucky we are to have you in our corner.
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-[#EAE1D1] text-xs font-serif italic text-[#8B7863]">
                        <span>Dedicated with love,</span>
                        <span className="font-bold text-[#C25A6C]">{senderName}</span>
                      </div>
                    </div>

                    {/* Pressed Lavender sprig tucked into corner */}
                    <div className="relative flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <PressedLavender className="w-8 h-16" />
                        <span className="font-serif italic text-xs text-[#7A6B56]">Lavandula angustifolia • Calm & Joy</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#A69784]">Page 1</span>
                    </div>

                    {/* Prev turn hint button */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-mono text-[#A69784] opacity-75 hover:opacity-100">
                      <ChevronLeft className="w-3.5 h-3.5" /> Turn to Cover
                    </div>
                  </div>

                  {/* RIGHT PAGE (PAGE 2) - Polaroid 1 with Cherry Blossom Washi */}
                  <div
                    onClick={turnNext}
                    className="p-6 sm:p-8 flex flex-col justify-between relative bg-gradient-to-bl from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFE0] cursor-pointer group"
                  >
                    {/* Washi tape pinning the polaroid */}
                    <WashiTape variant="floral" className="w-28 mx-auto -mt-2 mb-2 -rotate-2" />

                    {/* Polaroid Photo 1 */}
                    <div className="relative mx-auto my-auto max-w-xs w-full">
                      <motion.div
                        whileHover={{ scale: 1.03, rotate: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhotoIndex(0);
                        }}
                        className="bg-white p-3.5 sm:p-4 rounded-lg shadow-md border border-[#E0D5C3] transition-all group-hover:shadow-lg"
                      >
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-amber-50 mb-3 border border-black/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photos[0]?.src || "/images/memories/memory-01.jpg"}
                            alt={photos[0]?.caption || "Golden Hour Memory"}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-dark-plum opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="font-serif italic text-base text-dark-plum mb-0.5">
                            {photos[0]?.caption || "One for the memories."}
                          </p>
                          <p className="font-mono text-[11px] text-[#9E8B75]">
                            {photos[0]?.date || "Golden Hour Glow"}
                          </p>
                        </div>
                      </motion.div>

                      {/* Pressed Rose Petal Overlapping the Polaroid Corner */}
                      <div className="absolute -bottom-3 -right-3 z-10 pointer-events-none">
                        <PressedRose className="w-14 h-14 rotate-12" />
                      </div>
                    </div>

                    {/* Handwritten annotation at bottom */}
                    <div className="flex items-center justify-between mt-4">
                      <p className="font-serif italic text-xs text-[#8B7863]">
                        “When the light was just right and nobody wanted the day to end.”
                      </p>
                      <span className="font-mono text-[11px] text-[#A69784]">Page 2</span>
                    </div>

                    {/* Next turn corner dog-ear */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-mono text-[#C25A6C] font-semibold group-hover:translate-x-1 transition-transform">
                      Turn Page <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==================== SPREAD 2: ROADTRIPS & ADVENTURES (PAGES 3 & 4) ==================== */}
              {currentSpread === 2 && (
                <motion.div
                  key="spread-2"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="w-full h-full min-h-[480px] sm:min-h-[550px] grid grid-cols-1 md:grid-cols-2 bg-[#FBF7EE] text-dark-plum relative shadow-inner"
                >
                  {/* LEFT PAGE (PAGE 3) - Polaroid 2 & Ticket Stub */}
                  <div
                    onClick={turnPrev}
                    className="p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DEC8] relative bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFE0] cursor-pointer group"
                  >
                    <WashiTape variant="gold" className="w-24 mx-auto -mt-2 mb-2 rotate-2" />

                    <div className="relative mx-auto my-auto max-w-xs w-full">
                      {/* Polaroid 2 */}
                      <motion.div
                        whileHover={{ scale: 1.03, rotate: -1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhotoIndex(1);
                        }}
                        className="bg-white p-3.5 sm:p-4 rounded-lg shadow-md border border-[#E0D5C3] transition-all group-hover:shadow-lg"
                      >
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-rose-50 mb-3 border border-black/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photos[1]?.src || "/images/memories/memory-02.jpg"}
                            alt={photos[1]?.caption || "An unexpectedly good day"}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-dark-plum opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="font-serif italic text-base text-dark-plum mb-0.5">
                            {photos[1]?.caption || "An unexpectedly good day."}
                          </p>
                          <p className="font-mono text-[11px] text-[#9E8B75]">
                            {photos[1]?.date || "Weekend Escapes"}
                          </p>
                        </div>
                      </motion.div>

                      {/* Travel Ticket Badge pinned beside photo */}
                      <div className="absolute -top-3 -right-3 p-2 bg-[#FAF0DC] border border-[#DECAA2] rounded-md shadow-xs rotate-6 text-center select-none">
                        <div className="text-[9px] font-mono tracking-wider text-[#735E3B]">WEEKEND PASS</div>
                        <div className="text-[11px] font-serif font-bold text-[#8A511B]">ADVENTURE • 1A</div>
                      </div>

                      {/* Pressed Eucalyptus sprig */}
                      <div className="absolute -bottom-4 -left-4 pointer-events-none">
                        <PressedEucalyptus className="w-14 h-20 -rotate-12" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-serif italic text-xs text-[#8B7863]">
                        “The best trips are never fully planned.”
                      </span>
                      <span className="font-mono text-[11px] text-[#A69784]">Page 3</span>
                    </div>

                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-mono text-[#A69784] opacity-75 hover:opacity-100">
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </div>
                  </div>

                  {/* RIGHT PAGE (PAGE 4) - Polaroid 3 & Chamomile */}
                  <div
                    onClick={turnNext}
                    className="p-6 sm:p-8 flex flex-col justify-between relative bg-gradient-to-bl from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFE0] cursor-pointer group"
                  >
                    <WashiTape variant="lace" className="w-28 mx-auto -mt-2 mb-2 -rotate-1" />

                    <div className="relative mx-auto my-auto max-w-xs w-full">
                      {/* Polaroid 3 */}
                      <motion.div
                        whileHover={{ scale: 1.03, rotate: 1.5 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhotoIndex(2);
                        }}
                        className="bg-white p-3.5 sm:p-4 rounded-lg shadow-md border border-[#E0D5C3] transition-all group-hover:shadow-lg"
                      >
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-teal-50 mb-3 border border-black/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photos[2]?.src || "/images/memories/memory-03.jpg"}
                            alt={photos[2]?.caption || "Replay Worthy"}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-dark-plum opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="font-serif italic text-base text-dark-plum mb-0.5">
                            {photos[2]?.caption || "The kind of moment that deserves a replay."}
                          </p>
                          <p className="font-mono text-[11px] text-[#9E8B75]">
                            {photos[2]?.date || "Spontaneous Roadtrip"}
                          </p>
                        </div>
                      </motion.div>

                      {/* Chamomile flower pinned */}
                      <div className="absolute -top-3 -left-3 pointer-events-none">
                        <PressedChamomile className="w-12 h-12 rotate-45" />
                      </div>

                      {/* Gold Foil Sticker */}
                      <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-[#FFF3C4] border border-[#E8C860] text-[10px] font-mono tracking-wider text-[#8A6C0B] shadow-xs rotate-3">
                        ✨ PURE MAGIC
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-serif italic text-xs text-[#8B7863]">
                        “A sunset that took our breath away.”
                      </span>
                      <span className="font-mono text-[11px] text-[#A69784]">Page 4</span>
                    </div>

                    <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-mono text-[#C25A6C] font-semibold group-hover:translate-x-1 transition-transform">
                      Turn Page <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==================== SPREAD 3: COFFEE TALKS & CITY LIGHTS (PAGES 5 & 6) ==================== */}
              {currentSpread === 3 && (
                <motion.div
                  key="spread-3"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="w-full h-full min-h-[480px] sm:min-h-[550px] grid grid-cols-1 md:grid-cols-2 bg-[#FBF7EE] text-dark-plum relative shadow-inner"
                >
                  {/* LEFT PAGE (PAGE 5) - Polaroid 4 & Coffee Stain Detail */}
                  <div
                    onClick={turnPrev}
                    className="p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DEC8] relative bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFE0] cursor-pointer group"
                  >
                    <WashiTape variant="sage" className="w-24 mx-auto -mt-2 mb-2 rotate-1" />

                    <div className="relative mx-auto my-auto max-w-xs w-full">
                      {/* Coffee Ring Stain Effect */}
                      <div className="absolute -top-4 -left-4 w-28 h-28 rounded-full border-4 border-[#C7AA87]/30 border-dashed pointer-events-none opacity-60" />

                      <motion.div
                        whileHover={{ scale: 1.03, rotate: -1.5 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhotoIndex(3);
                        }}
                        className="bg-white p-3.5 sm:p-4 rounded-lg shadow-md border border-[#E0D5C3] transition-all group-hover:shadow-lg relative z-10"
                      >
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-orange-50 mb-3 border border-black/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photos[3]?.src || "/images/memories/memory-04.jpg"}
                            alt={photos[3]?.caption || "Coffee and Long Talks"}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-dark-plum opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="font-serif italic text-base text-dark-plum mb-0.5">
                            {photos[3]?.caption || "Proof that the simplest plans can be the best."}
                          </p>
                          <p className="font-mono text-[11px] text-[#9E8B75]">
                            {photos[3]?.date || "Coffee & Long Talks"}
                          </p>
                        </div>
                      </motion.div>

                      {/* Recipe Note card pinned */}
                      <div className="absolute -bottom-3 -right-3 p-2.5 rounded bg-[#FFFBF0] border border-[#E8DCC2] shadow-xs rotate-3 z-20 max-w-[170px]">
                        <p className="font-serif text-[11px] italic text-[#63503B] leading-tight">
                          ☕ 3 cups laughter, 2 hours of talking about everything, 0 regrets.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-serif italic text-xs text-[#8B7863]">
                        “Warm mugs, cool weather, endless stories.”
                      </span>
                      <span className="font-mono text-[11px] text-[#A69784]">Page 5</span>
                    </div>

                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-mono text-[#A69784] opacity-75 hover:opacity-100">
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </div>
                  </div>

                  {/* RIGHT PAGE (PAGE 6) - Polaroid 5 & Starlight Violets */}
                  <div
                    onClick={turnNext}
                    className="p-6 sm:p-8 flex flex-col justify-between relative bg-gradient-to-bl from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFE0] cursor-pointer group"
                  >
                    <WashiTape variant="floral" className="w-28 mx-auto -mt-2 mb-2 -rotate-2" />

                    <div className="relative mx-auto my-auto max-w-xs w-full">
                      <motion.div
                        whileHover={{ scale: 1.03, rotate: 1.2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhotoIndex(4);
                        }}
                        className="bg-white p-3.5 sm:p-4 rounded-lg shadow-md border border-[#E0D5C3] transition-all group-hover:shadow-lg"
                      >
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-purple-50 mb-3 border border-black/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photos[4]?.src || "/images/memories/memory-05.jpg"}
                            alt={photos[4]?.caption || "A tiny moment"}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-dark-plum opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="font-serif italic text-base text-dark-plum mb-0.5">
                            {photos[4]?.caption || "A tiny moment, a good memory."}
                          </p>
                          <p className="font-mono text-[11px] text-[#9E8B75]">
                            {photos[4]?.date || "Sunset Walk & Starlight"}
                          </p>
                        </div>
                      </motion.div>

                      {/* Lavender blossom & star stickers */}
                      <div className="absolute -bottom-3 -left-3 pointer-events-none">
                        <PressedLavender className="w-8 h-16 rotate-45" />
                      </div>

                      <div className="absolute -top-2 -right-2 flex gap-1 text-[#E5C378]">
                        <Sparkles className="w-4 h-4 fill-current animate-pulse" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-serif italic text-xs text-[#8B7863]">
                        “City lights dancing in the background.”
                      </span>
                      <span className="font-mono text-[11px] text-[#A69784]">Page 6</span>
                    </div>

                    <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-mono text-[#C25A6C] font-semibold group-hover:translate-x-1 transition-transform">
                      Turn Page <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==================== SPREAD 4: CELEBRATIONS & SECRET LETTER POCKET (PAGES 7 & 8) ==================== */}
              {currentSpread === 4 && (
                <motion.div
                  key="spread-4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="w-full h-full min-h-[480px] sm:min-h-[550px] grid grid-cols-1 md:grid-cols-2 bg-[#FBF7EE] text-dark-plum relative shadow-inner"
                >
                  {/* LEFT PAGE (PAGE 7) - Polaroid 6 & Confetti */}
                  <div
                    onClick={turnPrev}
                    className="p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DEC8] relative bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFE0] cursor-pointer group"
                  >
                    <WashiTape variant="gold" className="w-24 mx-auto -mt-2 mb-2 rotate-1" />

                    <div className="relative mx-auto my-auto max-w-xs w-full">
                      <motion.div
                        whileHover={{ scale: 1.03, rotate: -1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhotoIndex(5);
                        }}
                        className="bg-white p-3.5 sm:p-4 rounded-lg shadow-md border border-[#E0D5C3] transition-all group-hover:shadow-lg"
                      >
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-rose-50 mb-3 border border-black/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photos[5]?.src || "/images/memories/memory-06.jpg"}
                            alt={photos[5]?.caption || "More moments like these"}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-dark-plum opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="font-serif italic text-base text-dark-plum mb-0.5">
                            {photos[5]?.caption || "More moments like these, please."}
                          </p>
                          <p className="font-mono text-[11px] text-[#9E8B75]">
                            {photos[5]?.date || "Celebration Nights"}
                          </p>
                        </div>
                      </motion.div>

                      {/* Pressed Red Rose Petal */}
                      <div className="absolute -bottom-3 -right-3 pointer-events-none">
                        <PressedRose className="w-14 h-14 rotate-12" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-serif italic text-xs text-[#8B7863]">
                        “To every milestone ahead.”
                      </span>
                      <span className="font-mono text-[11px] text-[#A69784]">Page 7</span>
                    </div>

                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-mono text-[#A69784] opacity-75 hover:opacity-100">
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </div>
                  </div>

                  {/* RIGHT PAGE (PAGE 8) - TACTILE INTERACTIVE KRAFT ENVELOPE POCKET */}
                  <div
                    onClick={turnNext}
                    className="p-6 sm:p-8 flex flex-col justify-between relative bg-gradient-to-bl from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFE0] cursor-pointer group"
                  >
                    <WashiTape variant="sage" className="w-28 mx-auto -mt-2 mb-2 rotate-2" />

                    <div className="relative mx-auto my-auto max-w-xs w-full flex flex-col items-center">
                      {/* The Kraft Envelope Attached to the page */}
                      <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleOpenSecretLetter}
                        className="relative w-64 h-44 rounded-2xl bg-[#E4D1B9] border-2 border-[#C9B397] shadow-md flex flex-col items-center justify-center p-4 cursor-pointer overflow-hidden group/env hover:shadow-lg transition-all"
                      >
                        {/* Flap lines */}
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#D9C4A9] [clip-path:polygon(0_0,100%_0,50%_100%)] border-b border-[#BEA689]" />

                        {/* Wax seal on flap */}
                        <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#962A3B] to-[#5C1420] border-2 border-[#B84255] shadow-md flex items-center justify-center text-[#FFE9A8]">
                          <Heart className="w-5 h-5 fill-current" />
                        </div>

                        <div className="relative z-10 mt-3 text-center">
                          <p className="font-serif italic text-sm text-[#4D3925] font-semibold">
                            Secret Birthday Note
                          </p>
                          <p className="font-mono text-[10px] tracking-wider text-[#735A42] uppercase">
                            Click to slide out letter
                          </p>
                        </div>
                      </motion.div>

                      {/* Chamomile & four-leaf clover motif */}
                      <div className="mt-4 flex items-center gap-2 text-xs font-serif italic text-[#735A42]">
                        <PressedChamomile className="w-8 h-8" />
                        <span>A secret wish tucked into the pocket</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-serif italic text-xs text-[#8B7863]">
                        “A little note meant just for you.”
                      </span>
                      <span className="font-mono text-[11px] text-[#A69784]">Page 8</span>
                    </div>

                    <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-mono text-[#C25A6C] font-semibold group-hover:translate-x-1 transition-transform">
                      Turn to Back <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==================== SPREAD 5: ALBUM BACK COVER ==================== */}
              {currentSpread === 5 && (
                <motion.div
                  key="spread-back"
                  initial={{ opacity: 0, rotateY: flipDirection === "backward" ? -40 : 40 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: flipDirection === "forward" ? -40 : 40 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="w-full h-full min-h-[480px] sm:min-h-[550px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#59394B] via-[#432938] to-[#2E1A26] p-6 sm:p-12 flex flex-col items-center justify-center text-center relative border border-[#7D5369]/60 shadow-inner overflow-hidden"
                >
                  <div className="relative max-w-md w-full p-8 rounded-2xl border-2 border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col items-center justify-center backdrop-blur-xs bg-black/10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#C25A6C]/30 to-[#FFE9A8]/20 flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-[#E5C378]" />
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF5E8] mb-3">
                      To Be Continued…
                    </h3>

                    <p className="font-serif italic text-base sm:text-lg text-[#E5C378] mb-4">
                      “The best pages of your story are still being written.”
                    </p>

                    <p className="font-sans text-xs sm:text-sm text-[#E3D4C4]/80 leading-relaxed mb-6">
                      May this year bring countless more candid photos, spontaneous adventures, belly laughs, and memories to tape onto these pages.
                    </p>

                    {/* Button to flip back to the beginning */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setFlipDirection("backward");
                        triggerFlipAudio();
                        setCurrentSpread(0);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E5C378] to-[#CCA247] text-[#2E1A26] font-medium text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Flip Back to Front</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Realistic Book Page Depth & Stacking Shadow on the edge */}
          <div className="absolute right-0 top-3 bottom-3 w-2.5 bg-gradient-to-l from-[#F5ECE0] via-[#E8DEC8] to-transparent rounded-r-md pointer-events-none opacity-90 hidden sm:block shadow-xs" />
          <div className="absolute left-0 top-3 bottom-3 w-2.5 bg-gradient-to-r from-[#F5ECE0] via-[#E8DEC8] to-transparent rounded-l-md pointer-events-none opacity-90 hidden sm:block shadow-xs" />
        </div>
      </div>

      {/* Tactile Book Navigation Ribbon at bottom */}
      <div className="mt-8 flex items-center justify-center gap-4 z-10">
        <button
          onClick={turnPrev}
          disabled={currentSpread === 0 || isFlipping}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-serif text-sm border shadow-soft transition-all duration-300 ${
            currentSpread === 0
              ? "opacity-35 cursor-not-allowed bg-white/40 border-dark-plum/5 text-dark-plum/40"
              : "bg-white/90 border-soft-blush text-dark-plum hover:bg-white hover:shadow-md"
          }`}
        >
          <ChevronLeft className="w-4 h-4 text-[#C25A6C]" />
          <span>Previous Page</span>
        </button>

        <span className="font-mono text-xs text-dark-plum/60 px-2">
          {currentSpread + 1} / {totalSpreads}
        </span>

        <button
          onClick={turnNext}
          disabled={currentSpread === totalSpreads - 1 || isFlipping}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-serif text-sm border shadow-soft transition-all duration-300 ${
            currentSpread === totalSpreads - 1
              ? "opacity-35 cursor-not-allowed bg-white/40 border-dark-plum/5 text-dark-plum/40"
              : "bg-dark-plum text-warm-ivory border-dark-plum hover:bg-dark-plum/90 hover:shadow-md"
          }`}
        >
          <span>Next Page</span>
          <ChevronRight className="w-4 h-4 text-[#FFE9A8]" />
        </button>
      </div>

      {/* SECRET LETTER MODAL SLIDEOUT */}
      <AnimatePresence>
        {isEnvelopeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-md w-full rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5ECE0] p-7 sm:p-8 border-2 border-[#E3D7C5] shadow-2xl text-dark-plum"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsEnvelopeOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 text-dark-plum transition-colors"
                title="Close note"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <PressedRose className="w-8 h-8" />
                <span className="font-mono text-xs text-[#8B7863] tracking-widest uppercase">
                  A SECRET BIRTHDAY NOTE
                </span>
              </div>

              <h4 className="font-serif italic text-2xl text-dark-plum mb-3">
                “A note from the bottom of my heart…”
              </h4>

              <div className="space-y-3 font-sans text-sm sm:text-base text-dark-plum/85 leading-relaxed mb-6">
                <p>
                  Happy Birthday, {friendName}! 🎉
                </p>
                <p>
                  If this scrapbook proves anything, it&apos;s that life with you is never boring. You bring so much genuine light, warmth, and laughter wherever you go.
                </p>
                <p>
                  Here&apos;s to another year of spontaneous plans, laughing until our stomachs ache, and making memories that deserve their own pages!
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#EAE1D1]">
                <div className="font-serif italic text-sm text-[#8B7863]">
                  Always cheering for you,
                </div>
                <div className="font-serif font-bold text-base text-[#C25A6C]">
                  {senderName} 💖
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL PHOTO LIGHTBOX (When user clicks any photo in the scrapbook) */}
      <PhotoLightbox
        photos={photos}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(newIdx) => setSelectedPhotoIndex(newIdx)}
      />
    </div>
  );
}

