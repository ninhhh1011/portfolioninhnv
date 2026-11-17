"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Layers } from "lucide-react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface Master3DSliderProps {
  children: React.ReactNode[];
  className?: string;
  speed?: number; // pixels per frame, default ~0.75
}

export const Master3DSlider: React.FC<Master3DSliderProps> = ({
  children,
  className = "",
  speed = 0.85,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);

  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const prefersReduced = useReducedMotionSafe();

  // Keep ref synchronized with state for 60fps RAF loop
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Continuous auto-sliding horizontal loop on requestAnimationFrame
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      const track = trackRef.current;
      if (track && !isHoveredRef.current && !isDraggingRef.current && !prefersReduced) {
        posRef.current -= speed;

        // Half width is the exact length of one set of duplicated cards
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0 && Math.abs(posRef.current) >= halfWidth) {
          posRef.current += halfWidth;
        }

        track.style.transform = `translate3d(${posRef.current.toFixed(2)}px, 0, 0)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [speed, prefersReduced]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    posRef.current = dragStartPosRef.current + delta;

    const track = trackRef.current;
    if (track) {
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        if (posRef.current > 0) {
          posRef.current -= halfWidth;
        } else if (Math.abs(posRef.current) >= halfWidth) {
          posRef.current += halfWidth;
        }
      }
      track.style.transform = `translate3d(${posRef.current.toFixed(2)}px, 0, 0)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Nudge buttons (Prev / Next)
  const nudge = (distance: number) => {
    posRef.current += distance;
    const track = trackRef.current;
    if (track) {
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        if (posRef.current > 0) {
          posRef.current -= halfWidth;
        } else if (Math.abs(posRef.current) >= halfWidth) {
          posRef.current += halfWidth;
        }
      }
      track.style.transform = `translate3d(${posRef.current.toFixed(2)}px, 0, 0)`;
    }
  };

  // Duplicate items to form a seamless infinite reel: [Set 1, Set 2]
  const duplicatedItems = [...children, ...children];

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      {/* 1. Top Header Control Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 px-2">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#176B87] bg-white/95 px-3 py-1 rounded-full border border-[rgba(23,107,135,0.2)] shadow-2xs flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#176B87]" />
            <span>Master 3D Horizontal Slide</span>
          </span>
        </div>

        {/* Dynamic Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[rgba(66,126,138,0.22)] shadow-2xs text-xs font-mono">
          {isHovered ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span className="text-[#B45309] font-medium flex items-center gap-1.5">
                <Pause className="w-3.5 h-3.5" />
                <span>Đang dừng (Rê chuột)</span>
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-[#176B87] font-medium flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5" />
                <span>Tự động chạy ngang · 3D</span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* 2. 3D Perspective Horizontal Viewport */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-cursor="drag"
        className="relative w-full cursor-grab active:cursor-grabbing touch-pan-y py-4 group/stage"
        style={{ perspective: "1400px" }}
      >
        {/* Soft edge fade masks on left and right for cinematic depth */}
        <div
          className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#FCF9F7] via-[#FCF9F7]/60 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#FCF9F7] via-[#FCF9F7]/60 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* Moving Continuous Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-8 will-change-transform"
          style={{
            transformStyle: "preserve-3d",
            width: "max-content",
          }}
        >
          {duplicatedItems.map((child, idx) => (
            <div
              key={idx}
              className="w-[88vw] sm:w-[580px] md:w-[680px] lg:w-[740px] shrink-0 transition-transform duration-300 hover:scale-[1.01]"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Floating Side Bezel Chevrons */}
        <button
          type="button"
          onClick={() => nudge(400)}
          aria-label="Nudge left"
          data-magnetic="true"
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-[rgba(23,107,135,0.25)] flex items-center justify-center text-[#176B87] hover:bg-[#176B87] hover:text-white transition-all duration-200 shadow-md hover:scale-110 active:scale-95 cursor-pointer opacity-80 group-hover/stage:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => nudge(-400)}
          aria-label="Nudge right"
          data-magnetic="true"
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-[rgba(23,107,135,0.25)] flex items-center justify-center text-[#176B87] hover:bg-[#176B87] hover:text-white transition-all duration-200 shadow-md hover:scale-110 active:scale-95 cursor-pointer opacity-80 group-hover/stage:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 3. Bottom Guide Hint */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono text-[#526779]">
        <span>← Kéo hoặc rê chuột vào để dừng lại và tương tác →</span>
      </div>
    </div>
  );
};
