"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { GalleryPhoto } from "@/types/birthday";

interface PhotoLightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function PhotoLightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: PhotoLightboxProps) {
  const currentPhoto = currentIndex !== null ? photos[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const prev = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    onNavigate(prev);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const next = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    onNavigate(next);
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onClose, handlePrev, handleNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [currentIndex]);

  if (currentIndex === null || !currentPhoto) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark-plum/85 backdrop-blur-md select-none"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close photo viewer"
          className="absolute top-5 right-5 z-60 p-3 rounded-full bg-white/10 text-warm-ivory hover:bg-white/20 transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous photo"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-60 p-3 rounded-full bg-white/10 text-warm-ivory hover:bg-white/25 transition-all duration-200 focus:outline-hidden"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next photo"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-60 p-3 rounded-full bg-white/10 text-warm-ivory hover:bg-white/25 transition-all duration-200 focus:outline-hidden"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Modal Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20"
        >
          {/* Image Container */}
          <div className="relative w-full max-h-[68vh] flex items-center justify-center bg-warm-ivory/50 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentPhoto.src}
              alt={currentPhoto.caption}
              className="max-h-[68vh] w-auto max-w-full object-contain mx-auto"
            />
          </div>

          {/* Photo Details / Caption Card */}
          <div className="w-full p-5 sm:p-6 bg-white border-t border-dark-plum/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg sm:text-xl text-dark-plum mb-1">
                “{currentPhoto.caption}”
              </h4>
              <div className="flex flex-wrap items-center gap-3 text-xs text-dark-plum/60 font-sans">
                {currentPhoto.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{currentPhoto.date}</span>
                  </span>
                )}
                {currentPhoto.category && (
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{currentPhoto.category}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Pagination count indicator */}
            <div className="text-xs font-mono text-dark-plum/50 self-end sm:self-center">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
