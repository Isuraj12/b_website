"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/90 text-dark-plum shadow-soft border border-dark-plum/10 backdrop-blur-md hover:bg-soft-blush hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-soft-violet"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
