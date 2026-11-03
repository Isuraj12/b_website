import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { birthdayConfig } from "@/config/birthday";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: birthdayConfig.siteTitle,
  description: "A cheerful little birthday experience made with care.",
  openGraph: {
    title: `${birthdayConfig.siteTitle} — Happy Birthday, ${birthdayConfig.friendName}!`,
    description: "A thoughtful digital celebration made especially for a wonderful friend.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: birthdayConfig.siteTitle,
    description: "A cheerful little birthday experience made with care.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎂</text></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF9F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${caveat.variable} scroll-smooth`}>
      <body className="bg-warm-ivory text-dark-plum min-h-screen selection:bg-soft-blush selection:text-dark-plum antialiased">
        {children}
      </body>
    </html>
  );
}
