"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Layers, LayoutGrid } from "lucide-react";
import { Button } from "./Button";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface Master3DSliderProps {
  children: React.ReactNode[];
  initialIndex?: number;
  className?: string;
  onIndexChange?: (index: number) => void;
}

export const Master3DSlider: React.FC<Master3DSliderProps> = ({
  children,
  initialIndex = 0,
  className = "",
  onIndexChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [viewMode, setViewMode] = useState<"coverflow" | "grid">("coverflow");
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartXRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();

  const total = children.length;

  const goToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      setCurrentIndex(clamped);
      if (onIndexChange) onIndexChange(clamped);
    },
    [total, onIndexChange]
  );

  const prev = () => goToIndex(currentIndex - 1);
  const next = () => goToIndex(currentIndex + 1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "coverflow") return;
      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, viewMode]);

  // Pointer drag handling for 3D Carousel
  const handlePointerDown = (e: React.PointerEvent) => {
    if (viewMode !== "coverflow") return;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragDeltaRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || viewMode !== "coverflow") return;
    const delta = e.clientX - dragStartXRef.current;
    dragDeltaRef.current = delta;
    setDragOffset(delta);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || viewMode !== "coverflow") return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const threshold = 70;
    if (dragDeltaRef.current < -threshold && currentIndex < total - 1) {
      goToIndex(currentIndex + 1);
    } else if (dragDeltaRef.current > threshold && currentIndex > 0) {
      goToIndex(currentIndex - 1);
    }
    setDragOffset(0);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Top Controls: Mode Switcher & Counter */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold text-[#176B87] bg-white/90 px-3 py-1 rounded-full border border-[rgba(23,107,135,0.2)] shadow-2xs">
            0{currentIndex + 1} / 0{total}
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-[#526779] hidden sm:inline">
            {viewMode === "coverflow" ? "3D Master Perspective" : "Expanded Grid"}
          </span>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="inline-flex p-1 bg-white/80 backdrop-blur-sm rounded-full border border-[rgba(66,126,138,0.2)] shadow-2xs">
          <button
            type="button"
            onClick={() => setViewMode("coverflow")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              viewMode === "coverflow"
                ? "bg-[#176B87] text-white shadow-xs"
                : "text-[#526779] hover:text-[#183B4E]"
            }`}
            data-magnetic="true"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3D Coverflow</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              viewMode === "grid"
                ? "bg-[#176B87] text-white shadow-xs"
                : "text-[#526779] hover:text-[#183B4E]"
            }`}
            data-magnetic="true"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Lưới mở rộng</span>
          </button>
        </div>
      </div>

      {/* Render Mode: GRID */}
      {viewMode === "grid" ? (
        <div className="space-y-16 md:space-y-24 transition-all duration-500">
          {children.map((child, idx) => (
            <div key={idx}>{child}</div>
          ))}
        </div>
      ) : (
        /* Render Mode: 3D MASTER COVERFLOW */
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
              const isAdjacent = Math.abs(offset) === 1;

              // Compute 3D Coverflow transforms
              let translateX = offset * 75 + (isDragging ? dragOffset * 0.15 : 0);
              let translateZ = isCenter ? 0 : -180;
              let rotateY = isCenter ? 0 : offset < 0 ? 25 : -25;
              let scale = isCenter ? 1 : 0.88;
              let opacity = isCenter ? 1 : isAdjacent ? 0.45 : 0;
              let pointerEvents = isCenter ? "auto" : "none";
              let zIndex = isCenter ? 30 : 20 - Math.abs(offset);

              const cardTransform = prefersReduced
                ? undefined
                : `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

              return (
                <div
                  key={idx}
                  className="absolute top-0 w-full max-w-4xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: cardTransform,
                    opacity,
                    zIndex,
                    pointerEvents: pointerEvents as any,
                    transformStyle: "preserve-3d",
                  }}
                  aria-hidden={!isCenter}
                >
                  {child}
                </div>
              );
            })}
          </div>

          {/* Navigation Bottom Dock */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              type="button"
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full bg-white border border-[rgba(23,107,135,0.25)] flex items-center justify-center text-[#176B87] hover:bg-[#176B87] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
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
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-[#176B87] shadow-[0_0_10px_rgba(23,107,135,0.5)]"
                      : "w-2.5 bg-[#427E8A]/25 hover:bg-[#427E8A]/50"
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                  data-magnetic="true"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              disabled={currentIndex === total - 1}
              className="w-10 h-10 rounded-full bg-white border border-[rgba(23,107,135,0.25)] flex items-center justify-center text-[#176B87] hover:bg-[#176B87] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Next project"
              data-magnetic="true"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
