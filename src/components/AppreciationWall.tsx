"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SunMedium,
  Sparkles,
  HeartHandshake,
  Smile,
  Compass,
  Sparkle,
  Award,
  ArrowRight,
} from "lucide-react";
import { AppreciationCard } from "@/types/birthday";
import { playCardFlipSound } from "@/lib/audio";

interface AppreciationWallProps {
  cards: AppreciationCard[];
  onNext?: () => void;
  id?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  SunMedium: <SunMedium className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  Smile: <Smile className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  Sparkle: <Sparkle className="w-6 h-6" />,
};

function HolographicAwardCard({ card, index }: { card: AppreciationCard; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const icon = iconMap[card.iconName] || <Sparkles className="w-6 h-6" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        playCardFlipSound();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-3xl p-7 bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_10px_30px_rgba(56,44,67,0.06)] hover:shadow-[0_20px_40px_rgba(139,120,214,0.18)] transition-all duration-300 flex flex-col justify-between group overflow-hidden select-none"
    >
      {/* Holographic light sheen that tracks cursor */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 233, 168, 0.45), rgba(248, 221, 227, 0.2), transparent 70%)`,
          }}
        />
      )}

      {/* Top Header */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-warm-ivory to-soft-blush/40 text-dark-plum shadow-xs group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <span className="px-3.5 py-1 rounded-full text-xs font-medium tracking-wide bg-soft-violet/15 text-dark-plum border border-soft-violet/20 shadow-2xs">
          {card.badge}
        </span>
      </div>

      {/* Title & Description */}
      <div className="relative z-10">
        <h3 className="font-serif text-xl sm:text-2xl text-dark-plum mb-3 group-hover:text-soft-violet transition-colors">
          {card.awardTitle}
        </h3>
        <p className="font-sans text-sm sm:text-base text-dark-plum/75 leading-relaxed">
          “{card.description}”
        </p>
      </div>

      {/* Bottom Metadata */}
      <div className="mt-6 pt-4 border-t border-dark-plum/5 flex items-center justify-between text-xs text-dark-plum/45 font-mono relative z-10">
        <span>Award #0{index + 1}</span>
        <span className="text-soft-violet">✦ 100% Genuine</span>
      </div>
    </motion.div>
  );
}

export default function AppreciationWall({ cards, onNext, id = "section-honors" }: AppreciationWallProps) {
  return (
    <div id={id} className="relative min-h-[85vh] flex flex-col justify-center items-center py-16 px-6">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted-lavender/60 text-dark-plum/70 text-xs uppercase tracking-wider font-mono font-medium mb-3 border border-muted-lavender/80">
            <Award className="w-3.5 h-3.5 text-soft-violet" />
            <span>Chapter 03 • Honors & Accolades</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-dark-plum tracking-tight mb-4">
            A Few Things Worth Celebrating About You
          </h2>

          <p className="font-sans text-dark-plum/75 text-sm sm:text-base leading-relaxed">
            Little reminders of the qualities that make you uniquely appreciated by everyone lucky enough to know you.
          </p>
        </div>

        {/* 6 Holographic Appreciation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-10">
          {cards.map((card, index) => (
            <HolographicAwardCard key={card.id} card={card} index={index} />
          ))}
        </div>

        {/* Next Chapter Progression */}
        {onNext && (
          <div className="flex justify-center">
            <button
              onClick={() => {
                playCardFlipSound();
                onNext();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-plum text-warm-ivory text-xs sm:text-sm font-medium hover:bg-dark-plum/90 transition-all duration-300 shadow-soft hover:shadow-glow"
            >
              <span>Explore Memory Scrapbook</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
