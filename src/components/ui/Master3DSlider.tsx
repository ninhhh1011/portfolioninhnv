"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Layers } from "lucide-react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface MasterSlideTab {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
}

export interface Master3DSliderProps {
  children: React.ReactNode[];
  tabs?: MasterSlideTab[];
  initialIndex?: number;
  className?: string;
  autoPlayIntervalMs?: number;
  onIndexChange?: (index: number) => void;
}

export const Master3DSlider: React.FC<Master3DSliderProps> = ({
  children,
  tabs = [],
  initialIndex = 0,
  className = "",
  autoPlayIntervalMs = 4500,
  onIndexChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const dragStartXRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();

  const total = children.length;

  const goToIndex = useCallback(
    (index: number) => {
      const normalized = ((index % total) + total) % total;
      setCurrentIndex(normalized);
      setProgress(0);
      if (onIndexChange) onIndexChange(normalized);
    },
    [total, onIndexChange]
  );

  const prev = () => goToIndex(currentIndex - 1);
  const next = () => goToIndex(currentIndex + 1);

  // Smooth auto-play progress bar loop
  useEffect(() => {
    if (isHovered || isDragging || prefersReduced || total <= 1) return;

    const intervalStepMs = 40;
    const progressIncrement = (intervalStepMs / autoPlayIntervalMs) * 100;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          goToIndex(currentIndex + 1);
          return 0;
        }
        return prevProgress + progressIncrement;
      });
    }, intervalStepMs);

    return () => clearInterval(timer);
  }, [currentIndex, isHovered, isDragging, prefersReduced, total, autoPlayIntervalMs, goToIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, total]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragDeltaRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartXRef.current;
    dragDeltaRef.current = delta;
    setDragOffset(delta);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const threshold = 65;
    if (dragDeltaRef.current < -threshold) {
      goToIndex(currentIndex + 1);
    } else if (dragDeltaRef.current > threshold) {
      goToIndex(currentIndex - 1);
    }
    setDragOffset(0);
  };

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. MASTER SLIDE TOP CONTROLS & TIMELINE TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        {/* Interactive Master Slide Tabs */}
        {tabs.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2.5">
            {tabs.map((tab, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={tab.id || idx}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  className={`relative px-4 py-2 rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden border ${
                    isActive
                      ? "bg-white border-[#176B87]/40 shadow-[0_4px_20px_rgba(23,107,135,0.12)] scale-[1.02]"
                      : "bg-white/60 border-gray-200/70 hover:bg-white hover:border-[#176B87]/25 opacity-70 hover:opacity-100"
                  }`}
                  data-magnetic="true"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#176B87]">
                      0{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-[#183B4E]">
                      {tab.title}
                    </span>
                  </div>

                  {/* Master Slide Auto-play Live Progress Bar under active tab */}
                  {isActive && !prefersReduced && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D7EAF0]"
                      aria-hidden="true"
                    >
                      <div
                        className="h-full bg-gradient-to-r from-[#176B87] via-[#64B5F6] to-[#10B981] transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(23,107,135,0.8)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-sm font-semibold text-[#176B87] bg-white/95 px-3.5 py-1 rounded-full border border-[rgba(23,107,135,0.2)] shadow-2xs">
              0{currentIndex + 1} / 0{total}
            </span>
          </div>
        )}

        {/* Live Auto-play / Paused status pill */}
        <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[rgba(66,126,138,0.22)] shadow-2xs text-xs font-mono">
          {isHovered ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span className="text-[#B45309] font-medium flex items-center gap-1.5">
                <Pause className="w-3.5 h-3.5" />
                <span>Tạm dừng (Rê chuột)</span>
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-[#176B87] font-medium flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5" />
                <span>Tự động chạy 3D</span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* 2. MASTER 3D SLIDE THEATER STAGE */}
      <div className="relative group/master">
        {/* Ambient Backlight Glow under Master Stage (Emerald for project 1, Violet for project 2) */}
        <div
          className="absolute -inset-4 rounded-3xl opacity-35 blur-3xl transition-colors duration-700 pointer-events-none -z-10"
          style={{
            background:
              currentIndex === 0
                ? "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.25), rgba(23, 107, 135, 0.2), transparent 70%)"
                : "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.25), rgba(99, 102, 241, 0.2), transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* 3D Slide Presentation Viewport */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          data-cursor="drag"
          className="master-slider-drag-target relative w-full min-h-[580px] sm:min-h-[530px] md:min-h-[490px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y select-none py-2"
          style={{ perspective: "1400px" }}
        >
          {children.map((child, idx) => {
            const isCenter = idx === currentIndex;
            const diff = idx - currentIndex;

            // 3D Master Flip & Depth transform
            let rotateY = 0;
            let translateZ = 0;
            let translateX = isDragging ? dragOffset * 0.25 : 0;
            let scale = 1;
            let opacity = 0;
            let pointerEvents = "none";

            if (isCenter) {
              rotateY = 0;
              translateZ = 0;
              scale = 1;
              opacity = 1;
              pointerEvents = "auto";
            } else if (diff > 0 || (diff < 0 && idx === 0 && currentIndex === total - 1)) {
              // Next slide (waiting in right 3D space)
              rotateY = 32;
              translateZ = -180;
              scale = 0.92;
              opacity = 0;
            } else {
              // Prev slide (waiting in left 3D space)
              rotateY = -32;
              translateZ = -180;
              scale = 0.92;
              opacity = 0;
            }

            const stageTransform = prefersReduced
              ? undefined
              : `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

            return (
              <div
                key={idx}
                className="w-full max-w-4xl transition-all duration-650 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  position: isCenter ? "relative" : "absolute",
                  top: isCenter ? "auto" : 0,
                  transform: stageTransform,
                  opacity,
                  zIndex: isCenter ? 20 : 10,
                  pointerEvents: pointerEvents as any,
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                }}
                aria-hidden={!isCenter}
              >
                {child}
              </div>
            );
          })}
        </div>

        {/* Floating Side Bezel Controls (Glass Chevrons) */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          data-magnetic="true"
          className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-[rgba(23,107,135,0.25)] flex items-center justify-center text-[#176B87] hover:bg-[#176B87] hover:text-white transition-all duration-200 shadow-md hover:scale-110 active:scale-95 cursor-pointer opacity-80 group-hover/master:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          data-magnetic="true"
          className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-[rgba(23,107,135,0.25)] flex items-center justify-center text-[#176B87] hover:bg-[#176B87] hover:text-white transition-all duration-200 shadow-md hover:scale-110 active:scale-95 cursor-pointer opacity-80 group-hover/master:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 3. BOTTOM MASTER TIMELINE DOCK */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {/* Paginator Dots */}
        <div className="flex items-center gap-2.5">
          {children.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-8 bg-[#176B87] shadow-[0_0_10px_rgba(23,107,135,0.6)]"
                  : "w-2.5 bg-[#427E8A]/25 hover:bg-[#427E8A]/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              data-magnetic="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
