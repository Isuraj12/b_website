"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { UniversePhoto } from "@/types/birthday";

interface UniversePhotoViewerProps {
  photos: UniversePhoto[];
  selectedPhoto: UniversePhoto | null;
  onClose: () => void;
  onSelectPhoto: (photo: UniversePhoto) => void;
}

export default function UniversePhotoViewer({
  photos,
  selectedPhoto,
  onClose,
  onSelectPhoto,
}: UniversePhotoViewerProps) {
  const currentIndex = selectedPhoto
    ? photos.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex === -1) return;
    const prev = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    onSelectPhoto(photos[prev]);
  }, [currentIndex, photos, onSelectPhoto]);

  const handleNext = useCallback(() => {
    if (currentIndex === -1) return;
    const next = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    onSelectPhoto(photos[next]);
  }, [currentIndex, photos, onSelectPhoto]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, onClose, handlePrev, handleNext]);

  // Lock body scroll while viewing selected memory
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  if (!selectedPhoto) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-midnight-navy/90 backdrop-blur-lg select-none"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close memory viewer"
          className="absolute top-5 right-5 z-60 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200 border border-white/20 focus:outline-hidden focus:ring-2 focus:ring-soft-violet"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous memory"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-60 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 border border-white/20 transition-all duration-200 focus:outline-hidden"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next memory"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-60 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 border border-white/20 transition-all duration-200 focus:outline-hidden"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl max-h-[92vh] w-full flex flex-col items-center bg-[#11132B] rounded-3xl overflow-hidden shadow-2xl border border-soft-violet/30"
        >
          {/* Photograph Container */}
          <div className="relative w-full max-h-[66vh] flex items-center justify-center bg-black/40 overflow-hidden p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.caption}
              className="max-h-[64vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
            />
          </div>

          {/* Details Bar */}
          <div className="w-full p-5 sm:p-6 bg-[#161836] border-t border-soft-violet/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-warm-ivory">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-butter-yellow" />
                <h4 className="font-serif text-lg sm:text-2xl text-white">
                  “{selectedPhoto.caption}”
                </h4>
              </div>

              {selectedPhoto.description && (
                <p className="text-xs sm:text-sm text-warm-ivory/70 max-w-xl leading-relaxed mb-2">
                  {selectedPhoto.description}
                </p>
              )}

              {selectedPhoto.date && (
                <div className="flex items-center gap-1.5 text-xs text-soft-violet/90 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedPhoto.date}</span>
                </div>
              )}
            </div>

            {/* Pagination count */}
            <div className="text-xs font-mono text-soft-violet bg-soft-violet/10 px-3 py-1.5 rounded-full border border-soft-violet/20 self-end sm:self-center">
              {currentIndex + 1} of {photos.length}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
