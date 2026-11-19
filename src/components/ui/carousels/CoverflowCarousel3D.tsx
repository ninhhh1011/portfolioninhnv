"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { ProjectItem } from "@/content/portfolio";
import { ProjectCard } from "./ProjectCard";

interface CoverflowCarousel3DProps {
  projects: ProjectItem[];
}

export const CoverflowCarousel3D: React.FC<CoverflowCarousel3DProps> = ({ projects }) => {
  // If only 2 projects, duplicate to 4 for a complete coverflow stack
  const items = projects.length === 2 ? [...projects, ...projects] : projects;
  const count = items.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartXRef = useRef<number | null>(null);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartXRef.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartXRef.current === null) return;
    const diff = e.clientX - dragStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) prev();
      else next();
    }
    dragStartXRef.current = null;
  };

  return (
    <div
      className="relative w-full py-8 md:py-12 select-none overflow-hidden"
      role="region"
      aria-label="3D Coverflow Showcase"
    >
      {/* 3D Coverflow Stage */}
      <div
        className="relative mx-auto h-[580px] sm:h-[540px] md:h-[520px] w-full max-w-6xl flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {items.map((project, idx) => {
          let diff = idx - activeIndex;
          const isCenter = diff === 0;

          // Coverflow 3D Transform
          let translateX = 0;
          let translateZ = 0;
          let rotateY = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 30;

          if (isCenter) {
            translateX = 0;
            translateZ = 60;
            rotateY = 0;
            scale = 1;
            opacity = 1;
            zIndex = 40;
          } else if (diff < 0) {
            // Cards on the left
            translateX = diff * 190 - 100;
            translateZ = -Math.abs(diff) * 120;
            rotateY = 50;
            scale = Math.max(0.72, 1 - Math.abs(diff) * 0.12);
            opacity = Math.max(0.4, 1 - Math.abs(diff) * 0.25);
            zIndex = 30 - Math.abs(diff);
          } else {
            // Cards on the right
            translateX = diff * 190 + 100;
            translateZ = -Math.abs(diff) * 120;
            rotateY = -50;
            scale = Math.max(0.72, 1 - Math.abs(diff) * 0.12);
            opacity = Math.max(0.4, 1 - Math.abs(diff) * 0.25);
            zIndex = 30 - Math.abs(diff);
          }

          return (
            <div
              key={`${project.id}-${idx}`}
              onClick={() => {
                if (!isCenter) setActiveIndex(idx);
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[86vw] sm:max-w-[680px] md:max-w-[780px] transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                filter: isCenter
                  ? "drop-shadow(0 25px 50px rgba(24,59,78,0.16))"
                  : "brightness(0.88) contrast(0.95)",
              }}
            >
              <ProjectCard project={project} index={idx} isActive={isCenter} />

              {/* Coverflow Subtle Floor Mirror Reflection */}
              <div
                className="absolute top-full left-0 right-0 h-16 pointer-events-none opacity-20 -scale-y-100 blur-[2px] overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
                }}
              >
                <div className="h-full w-full bg-gradient-to-b from-[#176B87]/30 to-transparent" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Coverflow Controls & Scrubber */}
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

        {/* Scrubber Range Slider */}
        <div className="flex-1 max-w-xs flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={count - 1}
            value={activeIndex}
            onChange={(e) => setActiveIndex(Number(e.target.value))}
            aria-label="Coverflow Scrubber"
            className="w-full accent-[#176B87] cursor-pointer"
          />
        </div>

        {/* Index indicator */}
        <span className="text-xs font-mono text-[#526779] bg-white/80 px-3 py-1 rounded-full border border-[rgba(23,107,135,0.15)]">
          {activeIndex + 1} / {count}
        </span>
      </div>
    </div>
  );
};
