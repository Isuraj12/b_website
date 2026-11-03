"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, Cake, ArrowRight, Heart, Calendar } from "lucide-react";
import { BirthdayConfig } from "@/types/birthday";
import { playCardFlipSound } from "@/lib/audio";
import HangingPhoto from "./HangingPhoto";
import AgeTransition from "./AgeTransition";

interface BirthdayHeroProps {
  config: BirthdayConfig;
  onNext?: () => void;
  id?: string;
}

export default function BirthdayHero({ config, onNext, id = "section-hero" }: BirthdayHeroProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isToday: boolean;
    isPast: boolean;
  } | null>(null);

  // Mouse tilt physics for hero card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [7, -7]);
  const rotateY = useTransform(mouseX, [-300, 300], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (!config.birthdayDate) return;

    const calculateTime = () => {
      const now = new Date();
      const target = new Date(config.birthdayDate!);

      const isSameDay =
        now.getFullYear() === target.getFullYear() &&
        now.getMonth() === target.getMonth() &&
        now.getDate() === target.getDate();

      const diff = target.getTime() - now.getTime();

      if (isSameDay) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false });
        return;
      }

      if (diff < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.birthdayDate]);

  return (
    <div
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[88vh] flex flex-col justify-center items-center text-center px-6 py-16 select-none"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="max-w-3xl mx-auto flex flex-col items-center z-10"
      >
        {/* Shimmer Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-soft-blush/60 text-xs uppercase tracking-widest text-dark-plum/70 shadow-xs mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-butter-yellow fill-butter-yellow" />
          <span>Chapter 01 • The Birthday Spotlight</span>
          <span className="w-1 h-1 rounded-full bg-dark-plum/30" />
          <span>Edition 2026</span>
        </motion.div>

        {/* Large Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-dark-plum tracking-tight leading-[1.12] mb-6"
        >
          Happy Birthday,{" "}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-dark-plum via-soft-violet to-[#96557F]">
            {config.friendName}
            <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-soft-blush to-butter-yellow rounded-full -z-10" />
          </span>
          !
        </motion.h1>

        {/* Supporting Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-base sm:text-lg md:text-xl text-dark-plum/80 max-w-2xl leading-relaxed mb-8"
        >
          {config.birthdayMessage}
        </motion.p>

        {/* Countdown / Celebration Status Banner */}
        {timeLeft && config.birthdayDate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 w-full max-w-md p-4 rounded-3xl bg-white/80 border border-white/70 backdrop-blur-md shadow-soft"
          >
            {timeLeft.isToday ? (
              <div className="flex items-center justify-center gap-2 text-dark-plum font-serif text-lg py-1">
                <Cake className="w-5 h-5 text-soft-blush" />
                <span>Today is the big day! Wishing you the happiest year yet! 🎂</span>
              </div>
            ) : timeLeft.isPast ? (
              <div className="flex items-center justify-center gap-2 text-dark-plum/70 text-sm py-1">
                <Sparkles className="w-4 h-4 text-butter-yellow" />
                <span>Celebration in full swing — everyday magic ahead!</span>
              </div>
            ) : (
              <div>
                <p className="text-[11px] uppercase tracking-wider text-dark-plum/60 mb-2 font-mono font-medium">
                  Countdown to the Big Day
                </p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Mins", value: timeLeft.minutes },
                    { label: "Secs", value: timeLeft.seconds },
                  ].map((unit, idx) => (
                    <div key={idx} className="bg-warm-ivory/80 rounded-2xl p-2.5 border border-dark-plum/5 shadow-xs">
                      <span className="block font-serif text-xl sm:text-2xl font-bold text-dark-plum">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                      <span className="block text-[10px] uppercase tracking-wider text-dark-plum/50">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Milestone Age Burn & Stylish Ignition (22 -> 23) */}
        {(config.previousAge || config.currentAge) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="w-full"
          >
            <AgeTransition
              friendName={config.friendName}
              previousAge={config.previousAge || 22}
              currentAge={config.currentAge || 23}
            />
          </motion.div>
        )}

        {/* Aesthetic Hanging Photo with Twine Thread & Clothespin */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-8"
        >
          <HangingPhoto
            src={config.gallery[0]?.src || "/images/memories/memory-01.jpg"}
            caption={config.gallery[0]?.caption || "One for the memories."}
            date={config.gallery[0]?.date || "Golden Hour Glow"}
          />
        </motion.div>

        {/* Action Button & Flow Indicators */}
        <div className="flex flex-col items-center gap-4">
          {onNext && (
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                playCardFlipSound();
                onNext();
              }}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-dark-plum text-warm-ivory text-sm font-medium tracking-wide shadow-soft hover:bg-dark-plum/90 hover:shadow-glow transition-all duration-300"
            >
              <span>Begin The Celebration</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}

          {/* Natural scroll down cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col items-center gap-1.5 text-dark-plum/50 text-xs font-mono tracking-wider pt-2"
          >
            <span>SCROLL TO EXPLORE THE JOURNEY</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 border-dark-plum/25 flex items-start justify-center p-1"
            >
              <div className="w-1.5 h-2 rounded-full bg-dark-plum/50" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
