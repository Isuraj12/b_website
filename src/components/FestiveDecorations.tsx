"use client";

import React from "react";
import { motion } from "framer-motion";

// SVG illustrated balloons drifting upward
const balloonData = [
  { id: 1, color: "#F8DDE3", stringColor: "#E8B4C0", left: "6%", delay: 0, duration: 18, size: 52 },
  { id: 2, color: "#FFE9A8", stringColor: "#E2CA78", left: "18%", delay: 4, duration: 22, size: 60 },
  { id: 3, color: "#E8E2F7", stringColor: "#C5BBE3", left: "82%", delay: 2, duration: 20, size: 56 },
  { id: 4, color: "#FFD8C2", stringColor: "#E8B095", left: "92%", delay: 6, duration: 19, size: 48 },
  { id: 5, color: "#DDE9D7", stringColor: "#B5CCA9", left: "32%", delay: 8, duration: 24, size: 44 },
  { id: 6, color: "#F8DDE3", stringColor: "#E8B4C0", left: "70%", delay: 10, duration: 21, size: 50 },
];

// Falling/drifting flower petals
const petalData = [
  { id: 1, left: "10%", delay: 0, duration: 14, scale: 0.9, rotateStart: 0, rotateEnd: 360 },
  { id: 2, left: "25%", delay: 3, duration: 16, scale: 1.1, rotateStart: 45, rotateEnd: 420 },
  { id: 3, left: "45%", delay: 1.5, duration: 13, scale: 0.8, rotateStart: 90, rotateEnd: 270 },
  { id: 4, left: "65%", delay: 5, duration: 17, scale: 1.0, rotateStart: -30, rotateEnd: 300 },
  { id: 5, left: "80%", delay: 2.5, duration: 15, scale: 1.2, rotateStart: 120, rotateEnd: 480 },
  { id: 6, left: "94%", delay: 7, duration: 18, scale: 0.7, rotateStart: 0, rotateEnd: 360 },
];

export default function FestiveDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none">
      {/* 1. Elegant Victorian / Botanical Corner Flourishes */}
      {/* Top Left Corner */}
      <div className="absolute top-0 left-0 w-28 h-28 sm:w-36 sm:h-36 opacity-35 text-[#8B78D6]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <path d="M 0,0 L 55,0 C 45,15 35,25 25,25 C 25,35 15,45 0,55 Z" fill="#FFE9A8" fillOpacity="0.25" />
          <path d="M 0,0 C 30,5 50,25 55,55" strokeWidth="1.8" />
          <path d="M 0,0 C 15,10 25,20 28,40" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="55" cy="55" r="3" fill="#F8DDE3" />
          <circle cx="28" cy="40" r="2.5" fill="#FFE9A8" />
          <circle cx="15" cy="15" r="2" fill="#8B78D6" />
          <path d="M 12,25 Q 18,18 25,12" strokeWidth="1" />
        </svg>
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-0 right-0 w-28 h-28 sm:w-36 sm:h-36 opacity-35 text-[#F8DDE3] -scale-x-100">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <path d="M 0,0 L 55,0 C 45,15 35,25 25,25 C 25,35 15,45 0,55 Z" fill="#E8E2F7" fillOpacity="0.3" />
          <path d="M 0,0 C 30,5 50,25 55,55" strokeWidth="1.8" stroke="#8B78D6" />
          <circle cx="55" cy="55" r="3" fill="#FFE9A8" />
          <circle cx="28" cy="40" r="2.5" fill="#8B78D6" />
        </svg>
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute bottom-0 left-0 w-28 h-28 sm:w-36 sm:h-36 opacity-35 text-[#FFE9A8] -scale-y-100">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <path d="M 0,0 C 30,5 50,25 55,55" strokeWidth="1.8" stroke="#8B78D6" />
          <circle cx="55" cy="55" r="3" fill="#F8DDE3" />
        </svg>
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-36 sm:h-36 opacity-35 text-[#8B78D6] -scale-x-100 -scale-y-100">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <path d="M 0,0 C 30,5 50,25 55,55" strokeWidth="1.8" />
          <circle cx="55" cy="55" r="3" fill="#FFE9A8" />
        </svg>
      </div>

      {/* 2. Floating Celebratory Balloons */}
      {balloonData.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: "115vh", x: 0 }}
          animate={{
            y: "-30vh",
            x: [0, 18, -18, 12, 0],
          }}
          transition={{
            y: { duration: b.duration, repeat: Infinity, ease: "linear", delay: b.delay },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ left: b.left, width: b.size }}
          className="absolute flex flex-col items-center opacity-85"
        >
          {/* Balloon Body with 3D highlight */}
          <div
            className="relative rounded-full shadow-md"
            style={{
              width: b.size,
              height: b.size * 1.22,
              backgroundColor: b.color,
              background: `radial-gradient(circle at 35% 30%, #FFFFFF 0%, ${b.color} 55%, rgba(56, 44, 67, 0.2) 100%)`,
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            {/* Balloon Knot */}
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1.5 rounded-b-sm"
              style={{ backgroundColor: b.stringColor }}
            />
          </div>

          {/* Balloon String */}
          <svg width="20" height="60" viewBox="0 0 20 60" fill="none" className="overflow-visible">
            <path
              d="M 10,0 Q 4,15 14,30 T 8,55"
              stroke={b.stringColor}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}

      {/* 3. Floating Flower Petals Drifting Downwards */}
      {petalData.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-10vh", x: 0, rotate: p.rotateStart }}
          animate={{
            y: "110vh",
            x: [0, -25, 25, 0],
            rotate: p.rotateEnd,
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
            x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: p.duration * 0.8, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ left: p.left, transform: `scale(${p.scale})` }}
          className="absolute opacity-75"
        >
          {/* SVG Sakura / Daisy Petal */}
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path
              d="M 12,2 C 16,6 20,11 18,17 C 16,21 11,22 8,19 C 5,16 6,10 12,2 Z"
              fill={p.id % 2 === 0 ? "#F8DDE3" : "#FFE9A8"}
              stroke="#FFFFFF"
              strokeWidth="0.8"
              opacity="0.9"
            />
          </svg>
        </motion.div>
      ))}

      {/* 4. Cute Scattered Aesthetic Stickers in Background */}
      <motion.div
        animate={{ y: [-4, 4, -4], rotate: [-6, -2, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 left-6 sm:left-14 p-2 bg-white/80 rounded-2xl shadow-soft border border-soft-blush/60 text-xs flex items-center gap-1.5 backdrop-blur-xs rotate-[-6deg]"
      >
        <span className="text-base">🌸</span>
        <span className="font-handwriting text-sm text-dark-plum/80 font-bold">celebrate!</span>
      </motion.div>

      <motion.div
        animate={{ y: [4, -4, 4], rotate: [8, 12, 8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 right-6 sm:right-16 p-2 bg-white/80 rounded-2xl shadow-soft border border-butter-yellow/60 text-xs flex items-center gap-1.5 backdrop-blur-xs rotate-[8deg]"
      >
        <span className="text-base">✨</span>
        <span className="font-handwriting text-sm text-dark-plum/80 font-bold">pure joy</span>
      </motion.div>

      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-8 sm:left-20 p-2 bg-white/80 rounded-2xl shadow-soft border border-muted-lavender/60 text-xs flex items-center gap-1.5 backdrop-blur-xs rotate-[-4deg]"
      >
        <span className="text-base">🎀</span>
        <span className="font-handwriting text-sm text-dark-plum/80 font-bold">sweet memories</span>
      </motion.div>

      <motion.div
        animate={{ y: [5, -5, 5], rotate: [5, 1, 5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-44 right-8 sm:right-24 p-2 bg-white/80 rounded-2xl shadow-soft border border-soft-peach/60 text-xs flex items-center gap-1.5 backdrop-blur-xs rotate-[4deg]"
      >
        <span className="text-base">🎈</span>
        <span className="font-handwriting text-sm text-dark-plum/80 font-bold">birthday girl!</span>
      </motion.div>
    </div>
  );
}
