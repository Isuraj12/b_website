"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthday";
import BirthdayIntro from "@/components/BirthdayIntro";
import ScrollProgress from "@/components/ScrollProgress";
import MusicControl from "@/components/MusicControl";
import BirthdayHero from "@/components/BirthdayHero";
import WishCake from "@/components/WishCake";
import AppreciationWall from "@/components/AppreciationWall";
import AestheticScrapbook from "@/components/AestheticScrapbook";
import WishGenerator from "@/components/WishGenerator";
import BirthdayLetter from "@/components/BirthdayLetter";
import FinalCelebration from "@/components/FinalCelebration";
import BirthdayFooter from "@/components/BirthdayFooter";
import LivingBackground from "@/components/LivingBackground";
import FestiveDecorations from "@/components/FestiveDecorations";
import ChapterOverview from "@/components/ChapterOverview";
import BackToTop from "@/components/BackToTop";
import SectionDivider from "@/components/SectionDivider";
import { playSparkleSound, playCardFlipSound } from "@/lib/audio";
import { Grid, ChevronDown } from "lucide-react";

// Dynamically load the 3D universe with SSR disabled
const DynamicMemoryUniverse = dynamic(
  () => import("@/components/MemoryUniverse"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[650px] flex flex-col items-center justify-center text-warm-ivory bg-[#060818]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-soft-violet mb-4" />
        <p className="font-serif text-sm text-soft-violet">
          Entering the universe of memories...
        </p>
      </div>
    ),
  }
);

const chapterNames: Record<number, string> = {
  0: "Prologue",
  1: "Spotlight",
  2: "Make a Wish",
  3: "Honors",
  4: "Botanical Scrapbook",
  5: "Wish Oracle",
  6: "Sealed Letter",
  7: "3D Universe",
  8: "Celebration",
};

export default function BirthdayPage() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [hasOpenedIntro, setHasOpenedIntro] = useState(false);

  // Smooth scroll helper to navigate between story chapters
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectChapter = (id: number) => {
    const sectionMap: Record<number, string> = {
      0: "section-hero",
      1: "section-hero",
      2: "section-cake",
      3: "section-honors",
      4: "section-scrapbook",
      5: "section-wishes",
      6: "section-letter",
      7: "section-universe",
      8: "section-celebration",
    };
    const targetId = sectionMap[id];
    if (targetId) {
      scrollToSection(targetId);
    }
  };

  // ScrollSpy: observe sections to seamlessly sync active chapter & dynamic living background
  useEffect(() => {
    const sectionIds = [
      { id: "section-hero", chapter: 1 },
      { id: "section-cake", chapter: 2 },
      { id: "section-honors", chapter: 3 },
      { id: "section-scrapbook", chapter: 4 },
      { id: "section-wishes", chapter: 5 },
      { id: "section-letter", chapter: 6 },
      { id: "section-universe", chapter: 7 },
      { id: "section-celebration", chapter: 8 },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = sectionIds.find((s) => s.id === entry.target.id);
            if (found) {
              setCurrentChapter(found.chapter);
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isDarkChapter = currentChapter >= 7;

  return (
    <main
      className={`relative min-h-screen transition-colors duration-700 ${
        isDarkChapter
          ? "text-warm-ivory selection:bg-soft-violet selection:text-white"
          : "text-dark-plum selection:bg-soft-blush selection:text-dark-plum"
      }`}
    >
      {/* 1. Dynamic Living Multi-Layer Ambient Background */}
      <LivingBackground currentChapter={currentChapter} />

      {/* 2. Floating Celebratory Balloons, Flying Flower Petals, Stickers & Corner Flourishes */}
      <FestiveDecorations />

      {/* 3. Reading Progress Indicator Bar at Top */}
      <ScrollProgress />

      {/* 4. Background Music Player Control */}
      <MusicControl config={birthdayConfig.music} />

      {/* 5. Minimal Sleek Floating Chapter Indicator & Index Launcher */}
      <div className="fixed top-5 left-5 z-40 flex items-center gap-2 pointer-events-auto select-none">
        <button
          onClick={() => {
            playSparkleSound();
            setIsOverviewOpen(true);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif backdrop-blur-md border shadow-soft transition-all duration-300 ${
            isDarkChapter
              ? "bg-[#111432]/85 border-soft-violet/30 text-warm-ivory hover:text-butter-yellow hover:border-butter-yellow/50"
              : "bg-white/85 border-dark-plum/10 text-dark-plum hover:bg-white hover:shadow-md"
          }`}
          title="Open Story Chapters Index"
        >
          <Grid className="w-3.5 h-3.5 text-soft-violet" />
          <span className="font-mono text-[11px] text-soft-violet font-semibold">
            CH {currentChapter}/8
          </span>
          <span className="hidden sm:inline border-l border-dark-plum/10 pl-2">
            {chapterNames[currentChapter]}
          </span>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </button>
      </div>

      {/* 6. Welcoming Unboxing Entrance (Dismissible on click, or instantly enter directly) */}
      <AnimatePresence>
        {!hasOpenedIntro && (
          <BirthdayIntro
            friendName={birthdayConfig.friendName}
            onOpenComplete={() => {
              setHasOpenedIntro(true);
              scrollToSection("section-hero");
            }}
          />
        )}
      </AnimatePresence>

      {/* 7. CONTINUOUS EDITORIAL STORYTELLING FLOW */}
      <div className="relative w-full overflow-x-hidden">
        {/* CHAPTER 01: BIRTHDAY SPOTLIGHT HERO */}
        <section id="section-hero" className="w-full">
          <BirthdayHero
            config={birthdayConfig}
            onNext={() => scrollToSection("section-cake")}
          />
        </section>

        <SectionDivider variant="floral" />

        {/* CHAPTER 02: WISH CAKE & CANDLE CEREMONY */}
        <section id="section-cake" className="w-full">
          <WishCake
            onNext={() => scrollToSection("section-honors")}
          />
        </section>

        <SectionDivider variant="sparkle" />

        {/* CHAPTER 03: FRIENDSHIP HONORS & RECOGNITION */}
        <section id="section-honors" className="w-full">
          <AppreciationWall
            cards={birthdayConfig.appreciationCards}
            onNext={() => scrollToSection("section-scrapbook")}
          />
        </section>

        <SectionDivider variant="botanical" />

        {/* CHAPTER 04: BOTANICAL MEMORY SCRAPBOOK (3D TURNING PAGES & AUDIO) */}
        <section id="section-scrapbook" className="w-full">
          <AestheticScrapbook
            photos={birthdayConfig.gallery}
            friendName={birthdayConfig.friendName}
            senderName={birthdayConfig.senderName}
          />
        </section>

        <SectionDivider variant="stars" />

        {/* CHAPTER 05: CELESTIAL WISH ORACLE */}
        <section id="section-wishes" className="w-full">
          <WishGenerator
            wishes={birthdayConfig.wishes}
            onNext={() => scrollToSection("section-letter")}
          />
        </section>

        <SectionDivider variant="floral" />

        {/* CHAPTER 06: THE SEALED BIRTHDAY LETTER */}
        <section id="section-letter" className="w-full">
          <BirthdayLetter
            letter={birthdayConfig.letter}
            friendName={birthdayConfig.friendName}
            senderName={birthdayConfig.senderName}
            onNext={() => scrollToSection("section-universe")}
          />
        </section>

        <SectionDivider variant="cosmic" />

        {/* CHAPTER 07: 3D MEMORY UNIVERSE */}
        <section id="section-universe" className="w-full bg-[#060818]">
          <DynamicMemoryUniverse
            photos={birthdayConfig.universe}
            onNext={() => scrollToSection("section-celebration")}
          />
        </section>

        {/* CHAPTER 08: GRAND FINALE CELEBRATION */}
        <section id="section-celebration" className="w-full bg-gradient-to-b from-[#060818] via-[#1A1528] to-[#251A2E]">
          <FinalCelebration
            friendName={birthdayConfig.friendName}
            onRestart={() => {
              playCardFlipSound();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
          <BirthdayFooter
            friendName={birthdayConfig.friendName}
            senderName={birthdayConfig.senderName}
          />
        </section>
      </div>

      {/* Chapter Overview Modal */}
      <ChapterOverview
        isOpen={isOverviewOpen}
        currentChapter={currentChapter}
        onClose={() => setIsOverviewOpen(false)}
        onSelectChapter={handleSelectChapter}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </main>
  );
}
