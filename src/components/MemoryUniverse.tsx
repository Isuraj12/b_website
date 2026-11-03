"use client";

import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, Minimize2, Eye, ArrowRight, RotateCcw } from "lucide-react";
import { UniversePhoto } from "@/types/birthday";
import UniversePhotoViewer from "./UniversePhotoViewer";
import { playCardFlipSound, playSparkleSound } from "@/lib/audio";

interface MemoryUniverseProps {
  photos: UniversePhoto[];
  onNext?: () => void;
  id?: string;
}

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Floating Photo Card in 3D Space
function FloatingPhotoCard({
  photo,
  index,
  onSelect,
}: {
  photo: UniversePhoto;
  index: number;
  onSelect: (photo: UniversePhoto) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(photo.src);
  const phase = useRef(index * 1.4);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.position.y =
      photo.position[1] + Math.sin(t * 0.7 + phase.current) * 0.16;
    meshRef.current.position.x =
      photo.position[0] + Math.cos(t * 0.5 + phase.current) * 0.1;

    meshRef.current.rotation.z =
      (photo.rotation?.[2] || 0) + Math.sin(t * 0.4 + phase.current) * 0.05;
  });

  const cardScale = (photo.scale || 1) * (hovered ? 1.2 : 1.0);

  return (
    <group
      ref={meshRef}
      position={[photo.position[0], photo.position[1], photo.position[2]]}
      rotation={[
        photo.rotation?.[0] || 0,
        photo.rotation?.[1] || 0,
        photo.rotation?.[2] || 0,
      ]}
      scale={[cardScale, cardScale, cardScale]}
    >
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          playCardFlipSound();
          onSelect(photo);
        }}
      >
        <boxGeometry args={[1.5, 1.9, 0.04]} />
        <meshStandardMaterial
          color={hovered ? "#FFFFFF" : "#F8F3ED"}
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>

      <mesh
        position={[0, 0.15, 0.025]}
        onClick={(e) => {
          e.stopPropagation();
          playCardFlipSound();
          onSelect(photo);
        }}
      >
        <planeGeometry args={[1.3, 1.4]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Luminous Edge Aura on Hover */}
      {hovered && (
        <mesh position={[0, 0, -0.015]}>
          <planeGeometry args={[1.7, 2.1]} />
          <meshBasicMaterial
            color="#FFE9A8"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {hovered && (
        <Html distanceFactor={8} position={[0, -1.2, 0.05]} center pointerEvents="none">
          <div className="bg-[#0B0E2A]/90 text-warm-ivory text-xs px-3.5 py-1.5 rounded-full border border-soft-violet/50 whitespace-nowrap shadow-2xl backdrop-blur-md flex items-center gap-1.5 font-serif">
            <Sparkles className="w-3.5 h-3.5 text-butter-yellow" />
            <span>{photo.caption}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

// Expansive Multi-color Nebula Stardust
function ExpansiveNebula() {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesCount = 1800;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  const colorA = new THREE.Color("#8B78D6"); // soft violet
  const colorB = new THREE.Color("#FFE9A8"); // butter yellow
  const colorC = new THREE.Color("#FFD8C2"); // peach
  const colorD = new THREE.Color("#F8DDE3"); // blush

  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 60;
    positions[i3 + 1] = (Math.random() - 0.5) * 50;
    positions[i3 + 2] = (Math.random() - 0.5) * 50;

    const chosenColor =
      i % 4 === 0 ? colorA : i % 4 === 1 ? colorB : i % 4 === 2 ? colorC : colorD;
    colors[i3] = chosenColor.r;
    colors[i3 + 1] = chosenColor.g;
    colors[i3 + 2] = chosenColor.b;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

// Distant Glowing Celestial Planet
function DistantPlanet() {
  return (
    <group position={[12, -8, -25]}>
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshStandardMaterial
          color="#1D1947"
          emissive="#2A1E5C"
          emissiveIntensity={0.6}
          roughness={0.7}
        />
      </mesh>
      {/* Planetary Ring */}
      <mesh rotation={[1.4, 0.4, 0]}>
        <ringGeometry args={[6, 9.5, 64]} />
        <meshBasicMaterial
          color="#8B78D6"
          side={THREE.DoubleSide}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

// 3D Scene Root
function Scene({
  photos,
  onSelectPhoto,
}: {
  photos: UniversePhoto[];
  onSelectPhoto: (photo: UniversePhoto) => void;
}) {
  return (
    <>
      <ambientLight intensity={1.0} />
      <directionalLight position={[6, 10, 6]} intensity={1.4} color="#FFFDF7" />
      <pointLight position={[-8, -5, -4]} intensity={1.2} color="#8B78D6" />
      <pointLight position={[6, 6, 4]} intensity={0.9} color="#FFE9A8" />
      <pointLight position={[0, -8, -10]} intensity={0.8} color="#FFD8C2" />

      {/* Layer 1: Foreground Twinkling Stars */}
      <Stars
        radius={80}
        depth={60}
        count={3500}
        factor={5}
        saturation={0}
        fade
        speed={1.2}
      />

      {/* Layer 2: Deep Vast Cosmic Horizon */}
      <Stars
        radius={220}
        depth={80}
        count={4500}
        factor={3}
        saturation={1}
        fade
        speed={0.6}
      />

      {/* Multi-color Nebula Cloud */}
      <ExpansiveNebula />

      {/* Distant Planet */}
      <DistantPlanet />

      {/* Floating Photo Planes */}
      <Suspense fallback={null}>
        {photos.map((photo, index) => (
          <FloatingPhotoCard
            key={photo.id}
            photo={photo}
            index={index}
            onSelect={onSelectPhoto}
          />
        ))}
      </Suspense>

      {/* Orbit Controls with generous exploration limits */}
      <OrbitControls
        enableZoom={true}
        minDistance={2.5}
        maxDistance={25}
        enablePan={true}
        autoRotate={true}
        autoRotateSpeed={0.3}
        dampingFactor={0.05}
      />
    </>
  );
}

function UniverseFallback({
  photos,
  onSelectPhoto,
}: {
  photos: UniversePhoto[];
  onSelectPhoto: (photo: UniversePhoto) => void;
}) {
  return (
    <div className="w-full py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => {
              playCardFlipSound();
              onSelectPhoto(photo);
            }}
            className="group cursor-pointer bg-[#141738] border border-soft-violet/30 rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:border-butter-yellow"
          >
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-black/40 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-serif text-warm-ivory text-base mb-1">
              “{photo.caption}”
            </h4>
            {photo.date && (
              <span className="text-xs text-soft-violet font-mono">{photo.date}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MemoryUniverse({ photos, onNext, id = "section-universe" }: MemoryUniverseProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<UniversePhoto | null>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setWebGLSupported(isWebGLAvailable());
  }, []);

  const toggleFullscreen = () => {
    playSparkleSound();
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      id={id}
      className={`relative transition-all duration-700 ${isFullscreen
          ? "fixed inset-0 z-50 w-screen h-screen bg-[#060818] p-0"
          : "min-h-[85vh] py-16 px-4 sm:px-6"
        } text-warm-ivory flex flex-col items-center justify-center select-none`}
    >
      {/* Section Header (Hidden or compact in Fullscreen mode) */}
      {!isFullscreen ? (
        <div className="text-center max-w-2xl mx-auto mb-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-soft-violet/20 border border-soft-violet/40 text-xs uppercase tracking-wider text-butter-yellow font-mono mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-butter-yellow" />
            <span>Memories in this universe: {photos.length}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight mb-2">
            A Little Universe of Memories ✨
          </h2>

          <p className="font-sans text-sm sm:text-base text-warm-ivory/80 max-w-lg mx-auto mb-2 leading-relaxed">
            Some moments deserve their own miniature galaxy. Explore the floating photo field.
          </p>

          <p className="font-sans text-xs text-soft-violet/90 tracking-wide">
            Drag to orbit • Scroll to zoom • Tap any floating photo to inspect
          </p>
        </div>
      ) : (
        /* Floating Close Fullscreen button */
        <button
          onClick={toggleFullscreen}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 shadow-xl transition-all"
          title="Exit Fullscreen Universe"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      )}

      {/* 3D Universe Canvas Container */}
      <div
        id="universe-canvas-container"
        className={`relative transition-all duration-700 overflow-hidden ${isFullscreen
            ? "w-full h-full rounded-none border-none"
            : "w-full max-w-6xl h-[640px] sm:h-[750px] rounded-3xl border border-soft-violet/30 shadow-[0_0_60px_rgba(139,120,214,0.35)]"
          } bg-[#060818]`}
        style={{ touchAction: "pan-y" }}
      >
        {/* Top Control Bar inside Canvas */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-warm-ivory text-xs font-mono backdrop-blur-md border border-white/15 transition-all shadow-md"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-butter-yellow" />}
            <span>{isFullscreen ? "Exit Fullscreen" : "Expand Universe ⤢"}</span>
          </button>
        </div>

        {/* Bottom Helper Instruction Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-warm-ivory/80 flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-butter-yellow" />
          <span>Interactive Cosmic View • Drag & Zoom freely</span>
        </div>

        {isClient && webGLSupported ? (
          <Canvas
            camera={{ position: [0, 0, 8.5], fov: 50 }}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            dpr={[1, 2]}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <color attach="background" args={["#060818"]} />
            <Scene photos={photos} onSelectPhoto={setSelectedPhoto} />
          </Canvas>
        ) : (
          <UniverseFallback photos={photos} onSelectPhoto={setSelectedPhoto} />
        )}
      </div>

      {/* Next Chapter Progression (when not fullscreen) */}
      {!isFullscreen && onNext && (
        <div className="mt-8 z-10 flex justify-center">
          <button
            onClick={() => {
              playCardFlipSound();
              onNext();
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-soft-violet text-white text-xs sm:text-sm font-medium hover:bg-soft-violet/90 transition-all duration-300 shadow-[0_0_25px_rgba(139,120,214,0.5)]"
          >
            <span>Proceed to Grand Finale</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Fullscreen Selected Memory Viewer Modal */}
      <UniversePhotoViewer
        photos={photos}
        selectedPhoto={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={setSelectedPhoto}
      />
    </div>
  );
}
