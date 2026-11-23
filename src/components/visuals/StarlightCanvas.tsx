"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useDocumentVisibility } from "@/hooks/useDocumentVisibility";

interface Star {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
}

export const StarlightCanvas: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref: containerRef, isInView } = useSectionInView<HTMLDivElement>({ triggerOnce: false, rootMargin: "0px" });
  const prefersReduced = useReducedMotionSafe();
  const visible = useDocumentVisibility();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !isInView || !visible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const starCount = Math.floor((width * height) / 12000) + 25;
    const colors = ["#176B87", "#427E8A", "#A9D8F2", "#64B5F6", "#B388FF", "#FFFFFF"];

    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      stars.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        radius: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.45 + 0.25,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let pointerX = -999;
    let pointerY = -999;
    let isHovering = false;
    let animId: number;

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      if (prefersReduced) render();
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      isHovering = true;
    };

    const handlePointerLeave = () => {
      isHovering = false;
      pointerX = -999;
      pointerY = -999;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!prefersReduced) s.phase += s.twinkleSpeed;
        const currentAlpha = Math.max(
          0.1,
          s.baseAlpha + Math.sin(s.phase) * 0.25
        );

        if (!prefersReduced) {
          // Gravitational attraction towards cursor
          if (isHovering) {
            const dx = pointerX - s.x;
            const dy = pointerY - s.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 180 && dist > 1) {
              const pull = (1 - dist / 180) * 0.4;
              s.vx += (dx / dist) * pull;
              s.vy += (dy / dist) * pull;
            }
          }

          // Spring back to origin
          s.vx = (s.vx + (s.originX - s.x) * 0.03) * 0.92;
          s.vy = (s.vy + (s.originY - s.y) * 0.03) * 0.92;
          s.x += s.vx;
          s.y += s.vy;
        }

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (!prefersReduced) animId = requestAnimationFrame(render);
    };

    render();

    window.addEventListener("resize", handleResize);
    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(animId);
    };
  }, [prefersReduced, isInView, visible, containerRef]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-auto overflow-hidden -z-10 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
};
