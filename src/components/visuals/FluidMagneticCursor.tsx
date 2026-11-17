"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

export const FluidMagneticCursor: React.FC = () => {
  const prefersReduced = useReducedMotionSafe();
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default true until verified desktop
  const [cursorState, setCursorState] = useState<"default" | "hover" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if device supports fine hover pointer
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer || prefersReduced) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;

    const particles: SparkParticle[] = [];
    const colors = ["#176B87", "#427E8A", "#64B5F6", "#A9D8F2", "#B388FF"];

    let animId: number;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check hovered element type for contextual morphing
      const target = e.target as HTMLElement | null;
      if (target) {
        if (target.closest("[data-cursor='drag']") || target.closest(".master-slider-drag-target")) {
          setCursorState("drag");
        } else if (
          target.closest("button") ||
          target.closest("a") ||
          target.closest("[role='button']") ||
          target.closest("[data-magnetic]")
        ) {
          setCursorState("hover");
        } else {
          setCursorState("default");
        }
      }

      // Add spark particle when pointer moves with notable velocity
      const dist = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
      if (dist > 8) {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        for (let i = 0; i < 2; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.5 + 0.5;
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 6,
            y: mouseY + (Math.random() - 0.5) * 6,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 2.5 + 1.2,
            life: 0,
            maxLife: Math.floor(Math.random() * 20 + 25),
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    const handlePointerEnter = () => {
      setIsVisible(true);
    };

    // Canvas resize handling
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render loop
    const render = () => {
      // Lerp ring
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      // Canvas particles
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.life++;
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.96;
            p.vy *= 0.96;

            const progress = p.life / p.maxLife;
            const alpha = Math.max(0, 1 - progress);

            ctx.save();
            ctx.globalAlpha = alpha * 0.8;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            if (p.life >= p.maxLife) {
              particles.splice(i, 1);
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseenter", handlePointerEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseenter", handlePointerEnter);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [prefersReduced, isVisible]);

  if (isTouchDevice || prefersReduced) {
    return null;
  }

  return (
    <>
      {/* Particle Canvas Trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        aria-hidden="true"
      />

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div
          className={`w-2.5 h-2.5 rounded-full bg-[#176B87] shadow-[0_0_8px_rgba(23,107,135,0.7)] transition-transform duration-200 ${
            cursorState === "hover" ? "scale-0" : cursorState === "drag" ? "scale-50" : "scale-100"
          }`}
        />
      </div>

      {/* Outer Fluid Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out flex items-center justify-center font-mono text-[10px] tracking-wider uppercase font-bold ${
            cursorState === "hover"
              ? "w-12 h-12 border-2 border-[#176B87] bg-[#D7EAF0]/25 backdrop-blur-[1px] shadow-[0_0_16px_rgba(23,107,135,0.35)] scale-110"
              : cursorState === "drag"
              ? "w-20 h-20 border border-[#176B87] bg-white/90 text-[#176B87] shadow-[0_0_20px_rgba(23,107,135,0.25)] scale-100"
              : "w-9 h-9 border border-[#176B87]/50 bg-white/10 shadow-[0_0_10px_rgba(23,107,135,0.15)] scale-100"
          }`}
        >
          {cursorState === "drag" && (
            <span className="select-none animate-pulse text-[9px] font-sans">
              ◀ KÉO ▶
            </span>
          )}
        </div>
      </div>
    </>
  );
};
