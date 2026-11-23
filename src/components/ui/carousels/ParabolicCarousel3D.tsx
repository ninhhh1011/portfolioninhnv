"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ProjectItem } from "@/content/portfolio";
import { ProjectCard } from "./ProjectCard";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useDocumentVisibility } from "@/hooks/useDocumentVisibility";

interface ParabolicCarousel3DProps {
  projects: ProjectItem[];
}

export const ParabolicCarousel3D: React.FC<ParabolicCarousel3DProps> = ({ projects }) => {
  // 4 items circular loop (e.g., 2 projects duplicated to create smooth 3D carousel depth)
  const items = projects.length === 2 ? [...projects, ...projects] : projects;
  const count = items.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const prefersReduced = useReducedMotionSafe();
  const visible = useDocumentVisibility();
  const { ref, isInView } = useSectionInView<HTMLDivElement>({ triggerOnce: false, rootMargin: "0px" });

  const dragStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const draggedRef = useRef(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (!isInView) setInteracted(false);
  }, [isInView]);

  useEffect(() => {
    if (!isInView || !visible || isHovered || hasFocus || interacted || prefersReduced || count < 2) return;
    const timer = setInterval(() => {
      if (!document.querySelector('[role="dialog"]')) next();
    }, 5000);
    return () => clearInterval(timer);
  }, [isInView, visible, isHovered, hasFocus, interacted, next, prefersReduced, count]);

  // Pointer drag gestures
  const onPointerDown = (e: React.PointerEvent) => {
    setInteracted(true);
    if ((e.target as HTMLElement).closest("button, a")) return;
    dragStartXRef.current = e.clientX;
    isDraggingRef.current = true;
    draggedRef.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || dragStartXRef.current === null) return;
    const diff = e.clientX - dragStartXRef.current;
    if (Math.abs(diff) > 40) {
      draggedRef.current = true;
      if (diff > 0) prev();
      else next();
    }
    dragStartXRef.current = null;
    isDraggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      setInteracted(true);
      if (e.key === "ArrowLeft") prev();
      else next();
    }
  };

  return (
    <div
      ref={ref}
      className="relative w-full py-4 select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setInteracted(false); }}
      onFocus={() => setHasFocus(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHasFocus(false); }}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Dự án tiêu biểu"
    >
      {/* 3D Scene Viewport */}
      <div
        data-carousel-scene
        className="relative mx-auto h-[720px] sm:h-[640px] md:h-[530px] w-full max-w-6xl flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1400px",
          transformStyle: "preserve-3d",
          touchAction: "pan-y",
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { isDraggingRef.current = false; dragStartXRef.current = null; }}
        onClickCapture={(e) => {
          if (draggedRef.current) { e.preventDefault(); e.stopPropagation(); draggedRef.current = false; }
        }}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button, a")) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          if (x < rect.width * 0.15) prev();
          else if (x > rect.width * 0.85) next();
        }}
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
              onClick={(e) => {
                if (!isCenter) { e.stopPropagation(); setActiveIndex(idx); }
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

      <div className="flex items-center justify-center mt-6 px-4">
        <div className="flex items-center gap-2">
          {items.map((project, i) => (
            <button
              key={i}
              type="button"
              id={`project-choice-${project.id}`}
              aria-current={activeIndex === i ? "true" : undefined}
              onClick={() => { setInteracted(true); setActiveIndex(i); }}
              aria-label={`Xem dự án ${project.title}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i
                  ? "w-8 bg-[#176B87] shadow-xs"
                  : "w-2 bg-[#176B87]/30 hover:bg-[#176B87]/60"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
