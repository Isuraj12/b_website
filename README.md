# A Little Birthday Surprise 🎂✨

An ultra-luxurious, cinematic digital birthday gift experience designed especially for a friend. Built as an **Interactive Multi-Chapter Storybook & Spatial Realm** rather than a plain scrolling document.

Featuring an ambient **Living Canvas Background** that morphs colors across chapters, tactile **Web Audio sound effects**, an interactive **Chapter Dock controller**, draggable **Polaroid Scrapbook Desk**, **3D Holographic Awards**, **Celestial Tarot Oracle**, **Interactive Wax-Sealed Parchment**, and the breathtaking **3D Universe of Memories** built with Three.js and React Three Fiber.

---

## 🌟 Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a curated pastel & cosmic palette
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), and [@react-three/drei](https://github.com/pmndrs/drei)
- **Motion & Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🎨 Color Palette & Design Identity

- **Warm Ivory**: `#FFF9F2` (Warm, inviting background)
- **Soft Blush**: `#F8DDE3` (Gentle celebratory accents)
- **Muted Lavender**: `#E8E2F7` (Delicate trims and badges)
- **Butter Yellow**: `#FFE9A8` (Warm candlelights & star accents)
- **Soft Peach**: `#FFD8C2` (Cozy highlights)
- **Dark Plum**: `#382C43` (High-contrast typography)
- **Muted Sage**: `#DDE9D7` (Fresh accents)
- **Midnight Navy**: `#080B20` (3D Universe cosmic space)
- **Deep Indigo**: `#17163D` (Nebula background)
- **Soft Violet**: `#8B78D6` (Atmospheric galactic glow)

---

## 📋 Prerequisites

- **Node.js**: `v18.17+` or `v20+` (Tested on Node `v24+`)
- **Package Manager**: `npm` (v9+) or `pnpm` / `yarn`

---

## 🚀 Getting Started

### 1. Installation

Install all project dependencies:

```bash
npm install
```

### 2. Running Locally

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### 3. Production Build & Test

To verify code compilation and build output:

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```text
Birthday/
├── public/
│   ├── audio/
│   │   └── birthday-ambient.mp3       # Optional ambient music
│   └── images/
│       └── memories/                  # Local memory photos
│           ├── memory-01.jpg
│           ├── memory-02.jpg
│           ├── memory-03.jpg
│           ├── memory-04.jpg
│           ├── memory-05.jpg
│           └── memory-06.jpg
├── src/
│   ├── app/
│   │   ├── globals.css                # Tailwind directives & aesthetic tokens
│   │   ├── layout.tsx                 # Root layout, Google Fonts & OpenGraph
│   │   └── page.tsx                   # Master interactive birthday experience
│   ├── components/
│   │   ├── AppreciationWall.tsx       # Section 4: 6 Friendship Award Cards
│   │   ├── BackToTop.tsx              # Floating scroll back to top button
│   │   ├── BirthdayFooter.tsx         # Section 10: Warm Ivory minimal footer
│   │   ├── BirthdayHero.tsx           # Section 2: Large editorial hero & countdown
│   │   ├── BirthdayIntro.tsx          # Section 1: Gift box opening & confetti
│   │   ├── BirthdayLetter.tsx         # Section 7: Stationery paper letter
│   │   ├── FinalCelebration.tsx       # Section 8: Midnight celebration & cheer
│   │   ├── MemoryGallery.tsx          # Section 5: Editorial photo gallery
│   │   ├── MemoryUniverse.tsx         # Section 9: 3D Universe of floating memories
│   │   ├── MusicControl.tsx           # Ambient background audio control
│   │   ├── PhotoLightbox.tsx          # Fullscreen accessible gallery modal
│   │   ├── ScrollProgress.tsx         # Delicate top reading indicator
│   │   ├── UniversePhotoViewer.tsx    # 3D photo focus inspection modal
│   │   └── WishCake.tsx               # Section 3: Interactive birthday cake & wish
│   ├── config/
│   │   └── birthday.ts                # ⭐️ CENTRAL PERSONALIZATION CONFIGURATION
│   ├── lib/
│   │   ├── animations.ts              # Framer motion variants
│   │   └── utils.ts                   # Utility class mergers & date formatters
│   └── types/
│       └── birthday.ts                # TypeScript interfaces
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ⚙️ Personalization Guide

All personalization is managed in one central file:
👉 `src/config/birthday.ts`

You do **not** need to touch individual components to customize the gift.

### 1. Changing Names

In `src/config/birthday.ts`:

```ts
export const birthdayConfig: BirthdayConfig = {
  friendName: "Sarah",   // Enter your friend's name
  senderName: "Alex",    // Enter your name
  previousAge: 22,       // Previous age (burns away in flame animation)
  currentAge: 23,        // New age (ignites in golden celebration)
  // ...
};
```

### 2. Setting Birthday Date & Live Countdown

Set the date in `YYYY-MM-DD` format:

```ts
birthdayDate: "2026-03-28", // Live countdown will appear automatically
```

*Note: If you leave `birthdayDate: ""` empty, the countdown banner cleanly hides.*

### 3. Adding and Replacing Photographs

1. Place your personal photos into:
   `public/images/memories/`
   (e.g., `memory-01.jpg`, `memory-02.jpg`, etc.)
2. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`.
3. In `src/config/birthday.ts`, adjust the `gallery` array:

```ts
gallery: [
  {
    id: "gal-1",
    src: "/images/memories/my-vacation.jpg",
    caption: "One for the memories.",
    date: "Summer 2025",
    category: "Adventures",
  },
  // ...
]
```

### 4. Adding Photographs to the 3D Universe

In `src/config/birthday.ts`, edit the `universe` array. You can adjust 3D coordinates `[x, y, z]` to float photographs at different spatial depths:

```ts
universe: [
  {
    id: "univ-1",
    src: "/images/memories/my-vacation.jpg",
    caption: "One for the memories.",
    date: "Golden Sunset",
    description: "The day we biked along the ridge and watched the clouds turn violet.",
    position: [-3.8, 1.8, -2.5], // [x, y, z] in 3D space
    rotation: [0.1, 0.25, -0.05],
    scale: 1.1,
  },
  // ...
]
```

### 5. Editing the Personal Letter

In `src/config/birthday.ts`:

```ts
letter: {
  greeting: "Hey [FRIEND_NAME],",
  paragraphs: [
    "Wishing you a very happy birthday!",
    "I hope this new chapter brings you plenty of happiness, good health...",
  ],
  signoff: "Your friend,",
  sender: "[YOUR_NAME]",
}
```

Tokens like `[FRIEND_NAME]` and `[YOUR_NAME]` are automatically substituted with your configured names.

### 6. Changing or Disabling Background Music

An ambient chime loop is pre-packaged in `public/audio/birthday-ambient.mp3`.
- To use your own soundtrack: place an audio file in `public/audio/` and update `music.src` in `src/config/birthday.ts`.
- To disable music entirely: set `music.enabled: false`.

---

## 🌌 3D Universe Interactions

- **Desktop**: Drag to orbit around the memory galaxy. Scroll with mouse wheel or trackpad to zoom in/out. Hover over any floating photo to reveal its glowing aura and caption. Click any photograph to smoothly pull it into focus.
- **Mobile**: Touch and drag within the 3D viewport to orbit. Tap any photo to open the inspector. Page scrolling remains normal outside the canvas.
- **Keyboard Navigation**: In the photo inspector, use `ArrowLeft`, `ArrowRight` to browse memories, and `Escape` to close.
- **WebGL Fallback**: If a browser or device lacks WebGL hardware acceleration, an elegant CSS 3D card gallery automatically displays so the recipient never sees a broken screen.

---

## 🔒 Privacy Considerations for Personal Content

1. When deploying to a public host (such as Vercel), everything inside the `public/` directory and client source code will be accessible to anyone with the URL.
2. If sharing sensitive personal photos, you may prefer sending the recipient a private deployment link with unlisted URL or hosting on a private server.

---

## 🚀 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset: **Next.js** (detected automatically).
5. Click **"Deploy"**.
6. Share the generated link with your friend!
