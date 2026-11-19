"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from "lucide-react";
import { ProjectItem } from "@/content/portfolio";
import { ProjectCard } from "./ProjectCard";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface ArcCarousel3DProps {
  projects: ProjectItem[];
}

export const ArcCarousel3D: React.FC<ArcCarousel3DProps> = ({ projects }) => {
  // If only 2 projects, duplicate to 4 to form a lush 3D arc
  const displayItems = projects.length === 2 ? [...projects, ...projects] : projects;
  const count = displayItems.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReduced = useReducedMotionSafe();

  const dragStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Autoplay loop
  useEffect(() => {
    if (!isPlaying || prefersReduced) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, next, prefersReduced]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prev();
    } else if (e.key === "ArrowRight") {
      next();
    }
  };

  // Pointer drag gestures
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
      className="relative w-full py-8 md:py-12 select-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="3D Curved Arc Carousel"
    >
      {/* 3D Arc Stage */}
      <div
        className="relative mx-auto h-[560px] sm:h-[520px] md:h-[500px] w-full max-w-5xl cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1400px",
          transformStyle: "preserve-3d",
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {displayItems.map((project, idx) => {
          // Calculate relative circular distance from activeIndex
          let diff = (idx - activeIndex) % count;
          if (diff > count / 2) diff -= count;
          if (diff < -count / 2) diff += count;

          const isCenter = diff === 0;
          const isImmediate = Math.abs(diff) === 1;

          // 3D Arc Coordinates
          // diff === 0: center (x: 0, z: 0, rotY: 0)
          // diff === 1: right (x: +340px, z: -180px, rotY: -32deg)
          // diff === -1: left (x: -340px, z: -180px, rotY: +32deg)
          const translateX = diff * 320;
          const translateZ = Math.abs(diff) === 0 ? 0 : -Math.abs(diff) * 160;
          const rotateY = diff * -30;
          const scale = isCenter ? 1 : isImmediate ? 0.86 : 0.72;
          const opacity = isCenter ? 1 : isImmediate ? 0.65 : 0;
          const pointerEvents = isCenter ? "auto" : isImmediate ? "auto" : "none";
          const zIndex = 30 - Math.abs(diff) * 10;

          return (
            <div
              key={`${project.id}-${idx}`}
              onClick={() => {
                if (!isCenter) setActiveIndex(idx);
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[88vw] sm:max-w-[700px] md:max-w-[820px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: pointerEvents as any,
                transformStyle: "preserve-3d",
                filter: isCenter ? "drop-shadow(0 20px 40px rgba(24,59,78,0.14))" : "blur(1px) brightness(0.9)",
              }}
            >
              <ProjectCard project={project} index={idx} isActive={isCenter} />
            </div>
          );
        })}
      </div>

      {/* Floating Arc Controls & Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-2xl mx-auto mt-6 px-4">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Dự án trước"
            className="p-2.5 rounded-full bg-white/85 hover:bg-white border border-[rgba(23,107,135,0.2)] text-[#176B87] hover:text-[#183B4E] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Dự án tiếp theo"
            className="p-2.5 rounded-full bg-white/85 hover:bg-white border border-[rgba(23,107,135,0.2)] text-[#176B87] hover:text-[#183B4E] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Arc Dot Indicators */}
        <div className="flex items-center gap-2">
          {displayItems.map((_, i) => (
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

        {/* Autoplay toggle */}
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[rgba(23,107,135,0.2)] text-xs font-medium text-[#183B4E] transition-all cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#176B87]" />
              <span>Tự xoay</span>
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
