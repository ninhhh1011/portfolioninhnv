"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Orbit, Sparkles, MoveVertical } from "lucide-react";
import { ProjectItem } from "@/content/portfolio";
import { ProjectCard } from "./ProjectCard";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface ParabolicCarousel3DProps {
  projects: ProjectItem[];
}

export const ParabolicCarousel3D: React.FC<ParabolicCarousel3DProps> = ({ projects }) => {
  // Use 4 slots to allow smooth circular looping
  const items = projects.length === 2 ? [...projects, ...projects] : projects;
  const count = items.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [curveType, setCurveType] = useState<"arch" | "bowl">("arch"); // "arch" (⌢ hướng lên) vs "bowl" (⌣)
  const prefersReduced = useReducedMotionSafe();

  const dragStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (!isPlaying || prefersReduced) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, next, prefersReduced]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartXRef.current = e.clientX;
    isDraggingRef.current = true;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || dragStartXRef.current === null) return;
    const diff = e.clientX - dragStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) prev();
      else next();
    }
    dragStartXRef.current = null;
    isDraggingRef.current = false;
  };

  return (
    <div
      className="relative w-full py-6 select-none overflow-hidden"
      role="region"
      aria-label="3D Parabolic Arch Carousel"
    >
      {/* Top Parabolic Guide Subheader */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          type="button"
          onClick={() => setCurveType((t) => (t === "arch" ? "bowl" : "arch"))}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-white border border-[rgba(23,107,135,0.2)] text-xs font-mono text-[#176B87] shadow-2xs transition-all cursor-pointer"
        >
          <MoveVertical className="w-3.5 h-3.5" />
          <span>Đường cong: {curveType === "arch" ? "Vòm Parabol hướng lên (⌢)" : "Lõm Parabol (⌣)"}</span>
        </button>
      </div>

      {/* 3D Scene Viewport */}
      <div
        className="relative mx-auto h-[600px] sm:h-[560px] md:h-[530px] w-full max-w-6xl flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1400px",
          transformStyle: "preserve-3d",
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {/* Luminous Parabolic Guide Curve Path (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="parabolGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#176B87" stopOpacity="0" />
              <stop offset="25%" stopColor="#64B5F6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#176B87" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#64B5F6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#176B87" stopOpacity="0" />
            </linearGradient>
          </defs>
          {curveType === "arch" ? (
            // Upward Parabolic Arch (⌢)
            <path
              d="M 50,420 Q 500,80 950,420"
              fill="none"
              stroke="url(#parabolGlow)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
          ) : (
            // Downward Parabolic Bowl (⌣)
            <path
              d="M 50,100 Q 500,440 950,100"
              fill="none"
              stroke="url(#parabolGlow)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
          )}
        </svg>

        {/* Parabolic 3D Cards */}
        {items.map((project, idx) => {
          let diff = (idx - activeIndex) % count;
          if (diff > count / 2) diff -= count;
          if (diff < -count / 2) diff += count;

          const isCenter = diff === 0;
          const isNeighbor = Math.abs(diff) === 1;

          // Parabolic Math:
          // x is horizontal offset
          // y follows parabolic equation: y = factor * (diff^2)
          const translateX = diff * 320;
          const curveFactor = curveType === "arch" ? 1 : -1;
          const translateY = curveFactor * (Math.abs(diff) * Math.abs(diff) * 55); // cards drop down on arch, or rise up on bowl
          const translateZ = isCenter ? 40 : -Math.abs(diff) * 160;

          // Rotate Z along tangent of parabola + Rotate Y inward
          const rotateZ = curveFactor * (diff * -7); // tilts along parabolic curve
          const rotateY = diff * -25; // faces viewer
          const rotateX = curveType === "arch" ? (isCenter ? 0 : 6) : (isCenter ? 0 : -6);
          const scale = isCenter ? 1 : isNeighbor ? 0.85 : 0.72;
          const opacity = isCenter ? 1 : isNeighbor ? 0.7 : 0;
          const zIndex = 30 - Math.abs(diff) * 10;

          return (
            <div
              key={`${project.id}-${idx}`}
              onClick={() => {
                if (!isCenter) setActiveIndex(idx);
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[88vw] sm:max-w-[700px] md:max-w-[800px] transition-all duration-700 ease-[cubic-bezier(0.2,0.85,0.25,1)]"
              style={{
                transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) rotateX(${rotateX}deg) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: isCenter || isNeighbor ? "auto" : "none",
                transformStyle: "preserve-3d",
                filter: isCenter
                  ? "drop-shadow(0 25px 50px rgba(24,59,78,0.18))"
                  : "blur(1.2px) brightness(0.88)",
              }}
            >
              <ProjectCard project={project} index={idx} isActive={isCenter} />
            </div>
          );
        })}
      </div>

      {/* Controls & Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-2xl mx-auto mt-6 px-4">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Dự án trước"
            className="p-2.5 rounded-full bg-white/90 hover:bg-white border border-[rgba(23,107,135,0.2)] text-[#176B87] hover:text-[#183B4E] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Dự án tiếp theo"
            className="p-2.5 rounded-full bg-white/90 hover:bg-white border border-[rgba(23,107,135,0.2)] text-[#176B87] hover:text-[#183B4E] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Chuyển đến vị trí ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i
                  ? "w-8 bg-[#176B87] shadow-xs"
                  : "w-2 bg-[#176B87]/30 hover:bg-[#176B87]/60"
              }`}
            />
          ))}
        </div>

        {/* Autoplay Toggle */}
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white border border-[rgba(23,107,135,0.2)] text-xs font-medium text-[#183B4E] transition-all cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#176B87]" />
              <span>Tự trượt Parabol</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#176B87]" />
              <span>Dừng</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
