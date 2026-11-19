"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { ProjectItem } from "@/content/portfolio";
import { ProjectCard } from "./ProjectCard";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface ParabolicCarousel3DProps {
  projects: ProjectItem[];
}

export const ParabolicCarousel3D: React.FC<ParabolicCarousel3DProps> = ({ projects }) => {
  // 4 items circular loop (e.g., 2 projects duplicated to create smooth 3D carousel depth)
  const items = projects.length === 2 ? [...projects, ...projects] : projects;
  const count = items.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotionSafe();

  const dragStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (!isPlaying || isHovered || prefersReduced) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, next, prefersReduced]);

  // Pointer drag gestures
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartXRef.current = e.clientX;
    isDraggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
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

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <div
      className="relative w-full py-4 select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Vòng quay ngựa gỗ Parabol 3D"
    >
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
            <linearGradient id="parabolArchGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#176B87" stopOpacity="0" />
              <stop offset="25%" stopColor="#64B5F6" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#176B87" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#64B5F6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#176B87" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Upward Parabolic Arch (⌢) */}
          <path
            d="M 40,430 Q 500,70 960,430"
            fill="none"
            stroke="url(#parabolArchGlow)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
        </svg>

        {/* 3D Cards along Parabolic Arch */}
        {items.map((project, idx) => {
          let diff = (idx - activeIndex) % count;
          if (diff > count / 2) diff -= count;
          if (diff < -count / 2) diff += count;

          const isCenter = diff === 0;
          const isNeighbor = Math.abs(diff) === 1;

          // Parabolic Arch Math:
          // Center card: highest point (apex)
          // Side cards: lower down along y = k * diff^2 and tilt along tangent
          const translateX = diff * 320;
          const translateY = Math.abs(diff) * Math.abs(diff) * 58; // curves downwards away from apex
          const translateZ = isCenter ? 40 : -Math.abs(diff) * 160;

          // Tangent tilt angle (rotateZ) + facing angle (rotateY) + slight pitch (rotateX)
          const rotateZ = diff * -7;
          const rotateY = diff * -25;
          const rotateX = isCenter ? 0 : 6;
          const scale = isCenter ? 1 : isNeighbor ? 0.85 : 0.72;
          const opacity = isCenter ? 1 : isNeighbor ? 0.72 : 0;
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

      {/* Parabolic Carousel Controls & Indicator Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-2xl mx-auto mt-6 px-4">
        {/* Navigation Step Buttons */}
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

        {/* Parabolic Position Indicators */}
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
