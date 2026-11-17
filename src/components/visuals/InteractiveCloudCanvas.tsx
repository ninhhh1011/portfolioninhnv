"use client";

import React, { useEffect, useRef } from "react";
import {
  createCloudParticles,
  updateCloudPhysics,
  RepulsionParticle,
} from "@/hooks/useMouseRepulsion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface InteractiveCloudCanvasProps {
  variant?: "sky-to-cream" | "cream-to-lavender" | "lavender-to-sky" | "open-sky";
  particleCount?: number;
  className?: string;
}

export const InteractiveCloudCanvas: React.FC<InteractiveCloudCanvasProps> = ({
  variant = "sky-to-cream",
  particleCount = 10,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth || window.innerWidth);
    let height = (canvas.height = container.clientHeight || 96);

    let particles: RepulsionParticle[] = createCloudParticles(
      particleCount,
      width,
      height
    );

    let pointerX = -999;
    let pointerY = -999;
    let isPointerOver = false;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let animId: number;

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      particles = createCloudParticles(particleCount, width, height);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      isPointerOver = true;
    };

    const handlePointerLeave = () => {
      isPointerOver = false;
      pointerX = -999;
      pointerY = -999;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocity = Math.max(-20, Math.min(20, currentScroll - lastScrollY));
      lastScrollY = currentScroll;
    };

    // Color gradient setup depending on transition variant
    const getCloudColor = () => {
      switch (variant) {
        case "cream-to-lavender":
          return {
            core: "rgba(255, 255, 255, 0.85)",
            mid: "rgba(238, 231, 250, 0.5)",
            edge: "rgba(238, 231, 250, 0)",
          };
        case "lavender-to-sky":
          return {
            core: "rgba(255, 255, 255, 0.9)",
            mid: "rgba(215, 234, 240, 0.55)",
            edge: "rgba(215, 234, 240, 0)",
          };
        case "open-sky":
          return {
            core: "rgba(255, 255, 255, 0.95)",
            mid: "rgba(169, 216, 242, 0.6)",
            edge: "rgba(169, 216, 242, 0)",
          };
        case "sky-to-cream":
        default:
          return {
            core: "rgba(255, 255, 255, 0.9)",
            mid: "rgba(215, 234, 240, 0.45)",
            edge: "rgba(215, 234, 240, 0)",
          };
      }
    };

    const cloudColors = getCloudColor();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Decay scroll velocity gradually
      scrollVelocity *= 0.92;

      if (!prefersReduced) {
        updateCloudPhysics(
          particles,
          pointerX,
          pointerY,
          isPointerOver,
          scrollVelocity,
          {
            repulsionRadius: 140,
            repulsionStrength: 7.0,
            springDamping: 0.89,
            springStiffness: 0.04,
          }
        );
      }

      // Draw cloud puffs with soft radial glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Wrap around boundaries
        if (p.x < -p.radius * 2) p.x = p.originX = width + p.radius;
        if (p.x > width + p.radius * 2) p.x = p.originX = -p.radius;

        ctx.save();
        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          p.radius * 0.15,
          p.x,
          p.y,
          p.radius
        );
        grad.addColorStop(0, cloudColors.core);
        grad.addColorStop(0.55, cloudColors.mid);
        grad.addColorStop(1, cloudColors.edge);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(animId);
    };
  }, [variant, particleCount, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-auto cursor-crosshair overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
};
