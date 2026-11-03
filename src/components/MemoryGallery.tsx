"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Maximize2, Calendar, LayoutGrid, Layers, ArrowRight } from "lucide-react";
import { GalleryPhoto } from "@/types/birthday";
import PhotoLightbox from "./PhotoLightbox";
import HangingPhoto from "./HangingPhoto";
import { playCardFlipSound } from "@/lib/audio";

interface MemoryGalleryProps {
  photos: GalleryPhoto[];
  onNext?: () => void;
}

export default function MemoryGallery({ photos, onNext }: MemoryGalleryProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"scrapbook" | "grid">("scrapbook");

  // Natural scattered rotations for scrapbook desk view
  const scrapbookRotations = [-3, 2.5, -2, 3.5, -1.5, 2];

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center py-12 px-6 select-none">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-peach/60 text-dark-plum/70 text-xs uppercase tracking-wider font-mono font-medium mb-3 border border-soft-peach/80">
            <Camera className="w-3.5 h-3.5 text-dark-plum/70" />
            <span>Chapter 04 • Memory Scrapbook</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-dark-plum tracking-tight mb-3">
            Little Moments, Good Memories
          </h2>

          <p className="font-sans text-dark-plum/75 text-sm sm:text-base leading-relaxed mb-4">
            Drag polaroids around your desk, rearrange memories, or click any card to inspect.
          </p>

          {/* Aesthetic Hanging Polaroid on Twine Thread */}
          <div className="my-2 flex justify-center">
            <HangingPhoto
              src={photos[1]?.src || photos[0]?.src || "/images/memories/memory-02.jpg"}
              caption={photos[1]?.caption || "An unexpectedly good day."}
              date={photos[1]?.date || "Weekend Escapes"}
              onClick={() => setSelectedPhotoIndex(1)}
            />
          </div>

          {/* Mode Switcher: Scrapbook vs Clean Grid */}
          <div className="inline-flex items-center p-1 rounded-full bg-white/70 border border-dark-plum/10 backdrop-blur-md shadow-2xs">
            <button
              onClick={() => {
                playCardFlipSound();
                setViewMode("scrapbook");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === "scrapbook"
                  ? "bg-dark-plum text-warm-ivory shadow-xs"
                  : "text-dark-plum/70 hover:text-dark-plum"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Scrapbook Desk</span>
            </button>

            <button
              onClick={() => {
                playCardFlipSound();
                setViewMode("grid");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-dark-plum text-warm-ivory shadow-xs"
                  : "text-dark-plum/70 hover:text-dark-plum"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Editorial Grid</span>
            </button>
          </div>
        </div>

        {/* Dynamic Gallery View */}
        {viewMode === "scrapbook" ? (
          /* Scattered Interactive Draggable Polaroid Desk */
          <div className="relative min-h-[520px] sm:min-h-[560px] w-full rounded-3xl bg-white/40 border border-white/60 p-4 sm:p-8 backdrop-blur-md shadow-soft flex flex-wrap items-center justify-center gap-6 sm:gap-8 overflow-hidden">
            {photos.map((photo, index) => {
              const rotation = scrapbookRotations[index % scrapbookRotations.length];

              return (
                <motion.div
                  key={photo.id}
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
                  whileHover={{ scale: 1.05, zIndex: 30, rotate: 0 }}
                  whileDrag={{ scale: 1.1, zIndex: 40, cursor: "grabbing" }}
                  initial={{ rotate: rotation, opacity: 0, scale: 0.9 }}
                  animate={{ rotate: rotation, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={() => {
                    playCardFlipSound();
                    setSelectedPhotoIndex(index);
                  }}
                  className="cursor-grab relative w-56 sm:w-64 bg-white p-3.5 pb-5 rounded-2xl shadow-[0_15px_35px_rgba(56,44,67,0.12)] border border-[#EDE5DA] group select-none"
                >
                  {/* Decorative Washi Tape on top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/70 border border-amber-200/50 -rotate-2 rounded-xs shadow-2xs backdrop-blur-xs" />

                  {/* Photo Image Frame */}
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-warm-ivory/60 mb-3 border border-dark-plum/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-dark-plum/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-2.5 rounded-full bg-white/90 text-dark-plum shadow-md backdrop-blur-xs">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Handwritten Polaroid Caption */}
                  <div className="text-center px-1">
                    <p className="font-serif text-sm text-dark-plum font-medium leading-tight mb-1">
                      “{photo.caption}”
                    </p>
                    {photo.date && (
                      <span className="text-[10px] text-dark-plum/50 font-mono">
                        {photo.date}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Clean Editorial Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                whileHover={{ y: -6 }}
                onClick={() => {
                  playCardFlipSound();
                  setSelectedPhotoIndex(index);
                }}
                className="cursor-pointer bg-white rounded-3xl p-4 shadow-soft border border-dark-plum/5 transition-all duration-300 hover:shadow-glow"
              >
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-warm-ivory/60 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-base text-dark-plum mb-1">
                  “{photo.caption}”
                </h3>
                <div className="flex items-center justify-between text-xs text-dark-plum/50">
                  <span>{photo.date || `Memory #${index + 1}`}</span>
                  <span className="uppercase font-mono text-[10px]">Expand</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Next Chapter Progression */}
        {onNext && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                playCardFlipSound();
                onNext();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-plum text-warm-ivory text-xs sm:text-sm font-medium hover:bg-dark-plum/90 transition-all duration-300 shadow-soft hover:shadow-glow"
            >
              <span>Consult The Wish Oracle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photos={photos}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(newIndex) => setSelectedPhotoIndex(newIndex)}
      />
    </div>
  );
}
