import React from "react";
import { Sparkles, HeartHandshake } from "lucide-react";

interface BirthdayFooterProps {
  friendName: string;
  senderName: string;
}

export default function BirthdayFooter({
  friendName,
  senderName,
}: BirthdayFooterProps) {
  return (
    <footer className="w-full py-16 px-6 bg-warm-ivory text-dark-plum border-t border-dark-plum/10 text-center relative z-10 transition-colors duration-700">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Subtle decorative motif */}
        <div className="flex items-center gap-2 text-butter-yellow mb-4">
          <span>✦</span>
          <span className="w-8 h-[1px] bg-dark-plum/20" />
          <Sparkles className="w-4 h-4 text-soft-violet" />
          <span className="w-8 h-[1px] bg-dark-plum/20" />
          <span>✦</span>
        </div>

        <p className="font-serif text-lg sm:text-xl text-dark-plum mb-2">
          Made with care, a little creativity, and lots of birthday cheer.
        </p>

        <p className="font-sans text-xs sm:text-sm text-dark-plum/60">
          Happy Birthday, {friendName}! Here&apos;s to everything wonderful ahead.
        </p>

        <div className="mt-8 pt-6 border-t border-dark-plum/10 w-full text-center">
          <span className="text-[11px] font-mono tracking-wider text-dark-plum/40 uppercase">
            A Little Birthday Surprise • {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
