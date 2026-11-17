"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from "lucide-react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface Master3DSliderProps {
  children: React.ReactNode[];
  initialIndex?: number;
  className?: string;
  autoPlayIntervalMs?: number;
  onIndexChange?: (index: number) => void;
}

export const Master3DSlider: React.FC<Master3DSliderProps> = ({
  children,
  initialIndex = 0,
  className = "",
  autoPlayIntervalMs = 4200,
  onIndexChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dragStartXRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();

  const total = children.length;

  const goToIndex = useCallback(
    (index: number) => {
      // Modulo looping
      const normalized = ((index % total) + total) % total;
      setCurrentIndex(normalized);
      if (onIndexChange) onIndexChange(normalized);
    },
    [total, onIndexChange]
  );

  const prev = () => goToIndex(currentIndex - 1);
  const next = () => goToIndex(currentIndex + 1);

  // Auto-play timer: advances every autoPlayIntervalMs, pauses when hovered or dragging
  useEffect(() => {
    if (isHovered || isDragging || prefersReduced || total <= 1) return;

    const timer = setInterval(() => {
      goToIndex(currentIndex + 1);
    }, autoPlayIntervalMs);

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

  // Pointer drag handling for 3D Carousel
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

    const threshold = 60;
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
      {/* Top Header Bar: Counter & Auto-play Status indicator */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-sm font-semibold text-[#176B87] bg-white/95 px-3.5 py-1 rounded-full border border-[rgba(23,107,135,0.2)] shadow-2xs">
            0{currentIndex + 1} / 0{total}
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-[#526779] hidden sm:inline">
            3D Master Perspective
          </span>
        </div>

        {/* Dynamic Auto-play / Paused status pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[rgba(66,126,138,0.22)] shadow-2xs text-xs font-mono">
          {isHovered ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span className="text-[#B45309] font-medium flex items-center gap-1">
                <Pause className="w-3 h-3 inline" /> Tạm dừng khi rê chuột
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-[#176B87] font-medium flex items-center gap-1">
                <Play className="w-3 h-3 inline" /> Tự động chuyển 3D
              </span>
            </>
          )}
        </div>
      </div>

      {/* 3D MASTER COVERFLOW STAGE */}
      <div className="relative">
        {/* 3D Stage Container */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          data-cursor="drag"
          className="master-slider-drag-target relative w-full min-h-[580px] sm:min-h-[540px] md:min-h-[500px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y select-none py-6"
          style={{ perspective: "1200px" }}
        >
          {children.map((child, idx) => {
            const offset = idx - currentIndex;
            const isCenter = offset === 0;
            const isAdjacent = Math.abs(offset) === 1 || Math.abs(offset) === total - 1;

            // Compute 3D Coverflow transforms with wrapping awareness
            let effectiveOffset = offset;
            if (offset > 1) effectiveOffset = offset - total;
            if (offset < -1) effectiveOffset = offset + total;

            const isCurrentlyActive = effectiveOffset === 0;
            let translateX = effectiveOffset * 75 + (isDragging ? dragOffset * 0.15 : 0);
            let translateZ = isCurrentlyActive ? 0 : -180;
            let rotateY = isCurrentlyActive ? 0 : effectiveOffset < 0 ? 25 : -25;
            let scale = isCurrentlyActive ? 1 : 0.88;
            let opacity = isCurrentlyActive ? 1 : isAdjacent ? 0.45 : 0;
            let pointerEvents = isCurrentlyActive ? "auto" : "none";
            let zIndex = isCurrentlyActive ? 30 : 20 - Math.abs(effectiveOffset);

            const cardTransform = prefersReduced
              ? undefined
              : `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

            return (
              <div
                key={idx}
                className="absolute top-0 w-full max-w-4xl transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: cardTransform,
                  opacity,
                  zIndex,
                  pointerEvents: pointerEvents as any,
                  transformStyle: "preserve-3d",
                }}
                aria-hidden={!isCurrentlyActive}
              >
                {child}
              </div>
            );
          })}
        </div>

        {/* Navigation Bottom Dock with Infinite Looping */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            type="button"
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white border border-[rgba(23,107,135,0.25)] flex items-center justify-center text-[#176B87] hover:bg-[#176B87] hover:text-white transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous project"
            data-magnetic="true"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Paginator Dots with Liquid glow */}
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
                aria-label={`Go to project ${idx + 1}`}
                data-magnetic="true"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="w-10 h-10 rounded-full bg-white border border-[rgba(23,107,135,0.25)] flex items-center justify-center text-[#176B87] hover:bg-[#176B87] hover:text-white transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next project"
            data-magnetic="true"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
