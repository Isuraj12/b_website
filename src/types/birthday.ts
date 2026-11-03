export interface AppreciationCard {
  id: string;
  awardTitle: string;
  description: string;
  iconName: string;
  accentColor: string; // e.g. "blush", "lavender", "butter", "peach", "sage", "plum"
  badge: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  date?: string;
  category?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
  placeholderGradient?: string;
}

export interface WishCategory {
  id: string;
  label: string;
  iconName: string;
  tagline: string;
  wish: string;
  accentColor: string;
}

export interface BirthdayLetter {
  greeting: string;
  paragraphs: string[];
  signoff: string;
  sender: string;
}

export interface UniversePhoto {
  id: string;
  src: string;
  caption: string;
  date?: string;
  description?: string;
  position: [number, number, number]; // 3D coordinates [x, y, z]
  rotation?: [number, number, number];
  scale?: number;
  placeholderGradient?: string;
}

export interface MusicConfig {
  enabled: boolean;
  src: string;
  title: string;
}

export interface ThemeConfig {
  primaryPalette: {
    warmIvory: string;
    softBlush: string;
    mutedLavender: string;
    butterYellow: string;
    softPeach: string;
    darkPlum: string;
    mutedSage: string;
  };
  universePalette: {
    midnightNavy: string;
    deepIndigo: string;
    softViolet: string;
    coolWhite: string;
  };
}

export interface BirthdayConfig {
  friendName: string;
  senderName: string;
  birthdayDate?: string; // Format: "YYYY-MM-DD" e.g., "2026-03-15" or empty
  previousAge?: number; // e.g. 22
  currentAge?: number;  // e.g. 23
  siteTitle: string;
  heroHeading: string;
  heroSubtitle: string;
  birthdayMessage: string;
  appreciationCards: AppreciationCard[];
  gallery: GalleryPhoto[];
  wishes: WishCategory[];
  letter: BirthdayLetter;
  closingHeading: string;
  closingMessage: string;
  music: MusicConfig;
  theme: ThemeConfig;
  universe: UniversePhoto[];
}
