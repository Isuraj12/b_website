import { BirthdayConfig } from "@/types/birthday";

export const birthdayConfig: BirthdayConfig = {
  friendName: "Sarah", // Replace with your friend's name
  senderName: "Alex",  // Replace with your name
  birthdayDate: "2026-03-28", // Optional: YYYY-MM-DD. Set to "" if no countdown desired.
  previousAge: 22, // Previous age (will burn away in fire animation)
  currentAge: 23,  // New age (will ignite in stylish golden celebratory typography)
  siteTitle: "A Little Birthday Surprise",
  heroHeading: "Happy Birthday",
  heroSubtitle: "A thoughtful digital celebration made especially for an extraordinary friend.",
  birthdayMessage:
    "Another year of being wonderfully, unapologetically you. Hope this one brings you more laughter, good surprises, exciting opportunities, and countless reasons to smile.",

  // Appreciation Cards (Platonic, playful awards)
  appreciationCards: [
    {
      id: "award-1",
      awardTitle: "The Good Energy Award",
      description: "You have a way of making ordinary moments a little more fun and effortlessly brighter.",
      iconName: "SunMedium",
      accentColor: "butter",
      badge: "Pure Vibes",
    },
    {
      id: "award-2",
      awardTitle: "The Main Character Moment",
      description: "Your story is yours. Keep doing things your way, at your pace, and on your terms.",
      iconName: "Sparkles",
      accentColor: "blush",
      badge: "Iconic",
    },
    {
      id: "award-3",
      awardTitle: "The Certified Good Human Award",
      description: "A little kindness goes a long way, and your genuine heart always deserves to be celebrated.",
      iconName: "HeartHandshake",
      accentColor: "lavender",
      badge: "Golden Heart",
    },
    {
      id: "award-4",
      awardTitle: "The Laugh-Out-Loud Award",
      description: "May this upcoming year come with unlimited reasons to laugh until your stomach hurts.",
      iconName: "Smile",
      accentColor: "peach",
      badge: "Top Tier Humor",
    },
    {
      id: "award-5",
      awardTitle: "The Big Dreams Award",
      description: "Here's to new opportunities, exciting plans, and wonderful things you never even expected.",
      iconName: "Compass",
      accentColor: "sage",
      badge: "Boundless",
    },
    {
      id: "award-6",
      awardTitle: "The Happiness Collector Award",
      description: "More memorable days, spontaneous weekend plans, and small sweet things that make life better.",
      iconName: "Sparkle",
      accentColor: "plum",
      badge: "Life Enthusiast",
    },
  ],

  // Gallery Photos (Editorial photo grid & lightbox)
  gallery: [
    {
      id: "gal-1",
      src: "/images/memories/memory-01.jpg",
      caption: "One for the memories.",
      date: "Golden Hour Glow",
      category: "Adventures",
      aspectRatio: "portrait",
      placeholderGradient: "from-amber-200 via-rose-200 to-pink-200",
    },
    {
      id: "gal-2",
      src: "/images/memories/memory-02.jpg",
      caption: "An unexpectedly good day.",
      date: "Weekend Escapes",
      category: "Memories",
      aspectRatio: "square",
      placeholderGradient: "from-sky-200 via-indigo-200 to-purple-200",
    },
    {
      id: "gal-3",
      src: "/images/memories/memory-03.jpg",
      caption: "The kind of moment that deserves a replay.",
      date: "Spontaneous Roadtrip",
      category: "Celebrations",
      aspectRatio: "landscape",
      placeholderGradient: "from-teal-200 via-emerald-200 to-lime-200",
    },
    {
      id: "gal-4",
      src: "/images/memories/memory-04.jpg",
      caption: "Proof that the simplest plans can be the best.",
      date: "Coffee & Long Talks",
      category: "Everyday Magic",
      aspectRatio: "landscape",
      placeholderGradient: "from-orange-200 via-amber-200 to-yellow-200",
    },
    {
      id: "gal-5",
      src: "/images/memories/memory-05.jpg",
      caption: "A tiny moment, a good memory.",
      date: "Sunset Walk",
      category: "Golden Days",
      aspectRatio: "portrait",
      placeholderGradient: "from-violet-200 via-purple-200 to-fuchsia-200",
    },
    {
      id: "gal-6",
      src: "/images/memories/memory-06.jpg",
      caption: "More moments like these, please.",
      date: "Celebration Nights",
      category: "Fun & Smiles",
      aspectRatio: "square",
      placeholderGradient: "from-rose-200 via-pink-200 to-peach-200",
    },
  ],

  // Interactive Wish Generator Categories
  wishes: [
    {
      id: "adventures",
      label: "More Adventures",
      iconName: "Compass",
      tagline: "Wanderlust & New Horizons",
      wish: "May this year bring you new places to discover, stories worth telling, and experiences that make ordinary days extraordinary.",
      accentColor: "from-amber-400 to-orange-400",
    },
    {
      id: "laughter",
      label: "More Laughter",
      iconName: "Laugh",
      tagline: "Chuckles, Giggles & Inside Jokes",
      wish: "May you laugh more often, worry a little less about the small things, and collect moments that become your favorite stories.",
      accentColor: "from-pink-400 to-rose-400",
    },
    {
      id: "success",
      label: "More Success",
      iconName: "Trophy",
      tagline: "Wins, Milestones & Breakthroughs",
      wish: "May your hard work open new doors, your confidence keep growing, and your goals feel closer with every step you take.",
      accentColor: "from-indigo-400 to-violet-500",
    },
    {
      id: "unexpected",
      label: "More Unexpected Good Things",
      iconName: "Gift",
      tagline: "Serendipity & Pleasant Surprises",
      wish: "May life surprise you in the nicest ways, with happy coincidences, good news, and opportunities you didn't see coming.",
      accentColor: "from-emerald-400 to-teal-500",
    },
  ],

  // Personal Birthday Letter
  letter: {
    greeting: "Hey [FRIEND_NAME],",
    paragraphs: [
      "Wishing you a very happy birthday!",
      "I hope this new chapter brings you plenty of happiness, good health, exciting opportunities, and moments that make you genuinely proud of yourself.",
      "Keep smiling, keep exploring, and keep being the person you are. May the coming year be full of wonderful experiences, good people, and memories you'll look back on with a smile.",
      "Have an amazing birthday. You deserve a day full of happiness, good food, laughter, and all your favorite things.",
      "Stay awesome, and have a fantastic year ahead!",
      "Happy Birthday once again! 🎂",
    ],
    signoff: "Your friend,",
    sender: "[YOUR_NAME]",
  },

  // Final Celebration Section
  closingHeading: "And That's Your Little Birthday Surprise! 🎉",
  closingMessage:
    "Hope this brought a bright smile to your face. Here's to an unforgettable, joyous year ahead!",

  // Optional Background Audio
  music: {
    enabled: true,
    src: "/audio/birthday-ambient.mp3",
    title: "Gentle Birthday Acoustic",
  },

  // Design Theme Palette
  theme: {
    primaryPalette: {
      warmIvory: "#FFF9F2",
      softBlush: "#F8DDE3",
      mutedLavender: "#E8E2F7",
      butterYellow: "#FFE9A8",
      softPeach: "#FFD8C2",
      darkPlum: "#382C43",
      mutedSage: "#DDE9D7",
    },
    universePalette: {
      midnightNavy: "#080B20",
      deepIndigo: "#17163D",
      softViolet: "#8B78D6",
      coolWhite: "#F8FAFC",
    },
  },

  // 3D Universe of Floating Photographs
  universe: [
    {
      id: "univ-1",
      src: "/images/memories/memory-01.jpg",
      caption: "One for the memories.",
      date: "Spring Morning",
      description: "When the sky was clear and everything felt effortlessly peaceful.",
      position: [-3.8, 1.8, -2.5],
      rotation: [0.1, 0.25, -0.05],
      scale: 1.1,
      placeholderGradient: "from-amber-300 via-rose-300 to-pink-400",
    },
    {
      id: "univ-2",
      src: "/images/memories/memory-02.jpg",
      caption: "An unexpectedly good day.",
      date: "Golden Afternoon",
      description: "The best plans are always the ones that weren't even planned.",
      position: [3.4, 2.2, -1.8],
      rotation: [-0.15, -0.3, 0.08],
      scale: 1.15,
      placeholderGradient: "from-blue-300 via-indigo-300 to-purple-400",
    },
    {
      id: "univ-3",
      src: "/images/memories/memory-03.jpg",
      caption: "The kind of moment that deserves a replay.",
      date: "Sunset Horizon",
      description: "Stopping for a moment just to take it all in.",
      position: [-2.2, -2.1, 0.8],
      rotation: [0.2, 0.15, -0.1],
      scale: 1.05,
      placeholderGradient: "from-teal-300 via-emerald-300 to-cyan-400",
    },
    {
      id: "univ-4",
      src: "/images/memories/memory-04.jpg",
      caption: "Proof that the simplest plans can be the best.",
      date: "Cozy Café",
      description: "Warm drinks, cold weather, and laughs that lasted for hours.",
      position: [2.6, -1.8, 0.2],
      rotation: [-0.1, -0.2, 0.05],
      scale: 1.0,
      placeholderGradient: "from-orange-300 via-amber-300 to-yellow-400",
    },
    {
      id: "univ-5",
      src: "/images/memories/memory-05.jpg",
      caption: "A tiny moment, a good memory.",
      date: "Starlight City",
      description: "City lights dancing in the background on a cool breeze night.",
      position: [-0.2, 3.1, -3.2],
      rotation: [0.05, 0.1, 0.02],
      scale: 1.2,
      placeholderGradient: "from-violet-300 via-purple-300 to-fuchsia-400",
    },
    {
      id: "univ-6",
      src: "/images/memories/memory-06.jpg",
      caption: "More moments like these, please.",
      date: "Celebration Eve",
      description: "To many more adventures, shared triumphs, and spontaneous days.",
      position: [0.5, -2.8, -1.5],
      rotation: [-0.08, 0.12, -0.04],
      scale: 1.1,
      placeholderGradient: "from-rose-300 via-pink-300 to-peach-400",
    },
  ],
};
