import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "warm-ivory": "#FFF9F2",
        "soft-blush": "#F8DDE3",
        "muted-lavender": "#E8E2F7",
        "butter-yellow": "#FFE9A8",
        "soft-peach": "#FFD8C2",
        "dark-plum": "#382C43",
        "muted-sage": "#DDE9D7",
        "midnight-navy": "#080B20",
        "deep-indigo": "#17163D",
        "soft-violet": "#8B78D6",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        handwriting: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(56, 44, 67, 0.08)",
        glow: "0 0 25px rgba(248, 221, 227, 0.6)",
        "cosmic-glow": "0 0 35px rgba(139, 120, 214, 0.4)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        flame: "flame 1.2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        flame: {
          "0%": { transform: "scale(1) rotate(-2deg)" },
          "100%": { transform: "scale(1.15) rotate(2deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
