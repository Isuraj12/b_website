"use client";

import React, { useEffect, useRef } from "react";

interface LivingBackgroundProps {
  currentChapter: number;
}

// Chapter color themes for the dynamic ambient background
const chapterGradients: Record<number, { bg1: string; bg2: string; orb1: string; orb2: string; orb3: string }> = {
  0: { // Prologue / Gift
    bg1: "#FFF8F2",
    bg2: "#FDF2EC",
    orb1: "rgba(248, 221, 227, 0.45)", // soft blush
    orb2: "rgba(232, 226, 247, 0.45)", // muted lavender
    orb3: "rgba(255, 233, 168, 0.35)", // butter yellow
  },
  1: { // Spotlight Hero
    bg1: "#FFFBF7",
    bg2: "#FAF3EB",
    orb1: "rgba(255, 216, 194, 0.5)", // soft peach
    orb2: "rgba(248, 221, 227, 0.5)", // blush
    orb3: "rgba(255, 233, 168, 0.4)", // butter
  },
  2: { // Wish Candle Cake
    bg1: "#FFF9F5",
    bg2: "#FBF0E8",
    orb1: "rgba(255, 233, 168, 0.55)", // warm candlelight
    orb2: "rgba(255, 216, 194, 0.45)", // peach glow
    orb3: "rgba(248, 221, 227, 0.4)", // blush
  },
  3: { // Honors & Awards
    bg1: "#FBF9FE",
    bg2: "#F5F0FC",
    orb1: "rgba(232, 226, 247, 0.6)", // lavender
    orb2: "rgba(221, 233, 215, 0.45)", // sage
    orb3: "rgba(248, 221, 227, 0.4)", // blush
  },
  4: { // Memory Scrapbook
    bg1: "#FFF9F4",
    bg2: "#F9F2EA",
    orb1: "rgba(255, 233, 168, 0.45)", // golden memories
    orb2: "rgba(248, 221, 227, 0.5)", // blush
    orb3: "rgba(221, 233, 215, 0.4)", // sage
  },
  5: { // Wish Oracle
    bg1: "#F7F5FD",
    bg2: "#EFEAFC",
    orb1: "rgba(139, 120, 214, 0.35)", // mystic violet
    orb2: "rgba(232, 226, 247, 0.5)", // lavender
    orb3: "rgba(255, 233, 168, 0.35)", // golden star
  },
  6: { // Sealed Letter
    bg1: "#FAF6F0",
    bg2: "#F3EDE3",
    orb1: "rgba(255, 216, 194, 0.45)", // parchment warmth
    orb2: "rgba(248, 221, 227, 0.4)", // blush
    orb3: "rgba(232, 226, 247, 0.35)", // lavender
  },
  7: { // 3D Universe
    bg1: "#080B20",
    bg2: "#0D112F",
    orb1: "rgba(139, 120, 214, 0.4)", // nebula violet
    orb2: "rgba(23, 22, 61, 0.8)", // deep indigo
    orb3: "rgba(255, 233, 168, 0.2)", // starlight
  },
  8: { // Grand Finale
    bg1: "#1A1528",
    bg2: "#2A1F36",
    orb1: "rgba(248, 221, 227, 0.35)", // celebratory blush
    orb2: "rgba(139, 120, 214, 0.4)", // violet
    orb3: "rgba(255, 233, 168, 0.35)", // golden confetti
  },
};

export default function LivingBackground({ currentChapter }: LivingBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  const theme = chapterGradients[currentChapter] || chapterGradients[0];
  const isDarkTheme = currentChapter >= 7;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = e.clientX / window.innerWidth;
      mousePos.current.targetY = e.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Stardust particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth mouse interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render floating stardust particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;

        // Wrap around edges
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity =
          p.opacity * (0.6 + Math.sin(p.pulse) * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDarkTheme
          ? `rgba(255, 245, 210, ${currentOpacity})`
          : `rgba(139, 120, 214, ${currentOpacity * 0.7})`;
        ctx.fill();
      });

      // Interactive mouse aura
      const auraX = mousePos.current.x * width;
      const auraY = mousePos.current.y * height;
      const auraGrad = ctx.createRadialGradient(
        auraX,
        auraY,
        0,
        auraX,
        auraY,
        width * 0.35
      );
      if (isDarkTheme) {
        auraGrad.addColorStop(0, "rgba(139, 120, 214, 0.12)");
        auraGrad.addColorStop(0.5, "rgba(255, 233, 168, 0.04)");
        auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        auraGrad.addColorStop(0, "rgba(248, 221, 227, 0.25)");
        auraGrad.addColorStop(0.5, "rgba(255, 233, 168, 0.15)");
        auraGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDarkTheme]);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 transition-colors duration-1000 ease-in-out overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 20%, ${theme.bg1} 0%, ${theme.bg2} 100%)`,
      }}
    >
      {/* Morphing ambient glowing orbs */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl transition-all duration-1000 animate-float"
        style={{ backgroundColor: theme.orb1 }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full blur-3xl transition-all duration-1000 animate-float-delayed"
        style={{ backgroundColor: theme.orb2 }}
      />
      <div
        className="absolute -bottom-32 left-1/4 w-[650px] h-[650px] rounded-full blur-3xl transition-all duration-1000 animate-float"
        style={{ backgroundColor: theme.orb3 }}
      />

      {/* Interactive Stardust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
