"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, RotateCw } from "lucide-react";
import { ProjectItem } from "@/content/portfolio";
import { ProjectCard } from "./ProjectCard";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface CylinderCarousel3DProps {
  projects: ProjectItem[];
}

export const CylinderCarousel3D: React.FC<CylinderCarousel3DProps> = ({ projects }) => {
  // 4 slots on the 360° cylinder
  const slots = projects.length === 2 ? [...projects, ...projects] : projects;
  const N = slots.length;
  const theta = 360 / N; // 90 degrees per slot for 4 items

  const [currentAngle, setCurrentAngle] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotionSafe();

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);

  // Radius of cylinder
  const radius = 520;

  // Next / Prev step (snap by theta)
  const next = useCallback(() => {
    setCurrentAngle((a) => Math.round((a - theta) / theta) * theta);
  }, [theta]);

  const prev = useCallback(() => {
    setCurrentAngle((a) => Math.round((a + theta) / theta) * theta);
  }, [theta]);

  // Gentle continuous auto-spin when not hovered or dragged
  useEffect(() => {
    if (!isAutoSpin || isHovered || isDraggingRef.current || prefersReduced) return;

    let animId: number;
    const loop = () => {
      setCurrentAngle((a) => a - 0.12);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpin, isHovered, prefersReduced]);

  // Pointer drag gestures
  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    startAngleRef.current = currentAngle;
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - startXRef.current;
    velocityRef.current = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    setCurrentAngle(startAngleRef.current + delta * 0.35);
  };

  const onPointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    // Snap to nearest slot
    setCurrentAngle((a) => Math.round(a / theta) * theta);
  };

  // Find which index is closest to the front
  // Normalized angle between 0 and 360
  const normalized = ((-currentAngle % 360) + 360) % 360;
  const activeSlotIndex = Math.round(normalized / theta) % N;

  return (
    <div
      className="relative w-full py-8 md:py-12 select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="3D Cylinder Merry-Go-Round Carousel"
    >
      {/* 3D Viewport Scene */}
      <div
        className="relative mx-auto h-[580px] sm:h-[540px] md:h-[520px] w-full max-w-6xl flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1600px",
          perspectiveOrigin: "50% 50%",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Rotating Cylinder Hub */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius}px) rotateY(${currentAngle}deg)`,
          }}
        >
          {slots.map((project, idx) => {
            const slotAngle = idx * theta;

            // Calculate angular difference to front (0 deg)
            const itemWorldAngle = ((slotAngle + currentAngle) % 360 + 360) % 360;
            const diffFromFront = Math.min(itemWorldAngle, 360 - itemWorldAngle);
            const isFront = diffFromFront < theta / 2;

            // Fade and blur cards that are facing away in back
            const isBack = diffFromFront > 90;
            const opacity = isBack ? 0.35 : 1 - (diffFromFront / 90) * 0.45;

            return (
              <div
                key={`${project.id}-${idx}`}
                onClick={(e) => {
                  // If clicked an adjacent card, rotate it to front
                  if (!isFront) {
                    e.stopPropagation();
                    const targetAngle = -slotAngle;
                    setCurrentAngle(targetAngle);
                  }
                }}
                className="absolute w-full max-w-[86vw] sm:max-w-[680px] md:max-w-[780px] transition-opacity duration-300"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${slotAngle}deg) translateZ(${radius}px)`,
                  opacity,
                  pointerEvents: isFront ? "auto" : "auto",
                  filter: isFront
                    ? "drop-shadow(0 25px 50px rgba(24,59,78,0.18))"
                    : "brightness(0.85) blur(1.5px)",
                }}
              >
                <ProjectCard project={project} index={idx} isActive={isFront} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cylinder Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-2xl mx-auto mt-6 px-4">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Xoay ngược chiều kim đồng hồ"
            className="p-2.5 rounded-full bg-white/85 hover:bg-white border border-[rgba(23,107,135,0.2)] text-[#176B87] hover:text-[#183B4E] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Xoay thuận chiều kim đồng hồ"
            className="p-2.5 rounded-full bg-white/85 hover:bg-white border border-[rgba(23,107,135,0.2)] text-[#176B87] hover:text-[#183B4E] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Cylinder Slot Indicators */}
        <div className="flex items-center gap-2">
          {slots.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentAngle(-i * theta)}
              aria-label={`Xoay đến dự án ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlotIndex === i
                  ? "w-8 bg-[#176B87] shadow-xs"
                  : "w-2 bg-[#176B87]/30 hover:bg-[#176B87]/60"
              }`}
            />
          ))}
        </div>

        {/* Continuous Spin Toggle */}
        <button
          type="button"
          onClick={() => setIsAutoSpin((s) => !s)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[rgba(23,107,135,0.2)] text-xs font-medium text-[#183B4E] transition-all cursor-pointer"
        >
          {isAutoSpin ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#176B87]" />
              <span>Đang quay tròn 360°</span>
            </>
          ) : (
            <>
              <RotateCw className="w-3.5 h-3.5 text-[#176B87]" />
              <span>Bật tự quay 360°</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
