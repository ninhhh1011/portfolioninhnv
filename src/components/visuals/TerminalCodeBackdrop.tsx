"use client";

import React, { useRef, useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useDocumentVisibility } from "@/hooks/useDocumentVisibility";
import { usePortfolioInteraction } from "@/context/PortfolioInteractionContext";

const CODE_LINES = [
  "// Nguyễn Văn Ninh · Engineering Workspace",
  "uvicorn main:app --host 0.0.0.0 --port 8000 --reload",
  "INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)",
  "GET /api/v1/stations/recommend?lat=21.0285&lon=105.8542 HTTP/1.1 200 OK",
  "candidate_search(lat=21.0285, lon=105.8542, radius_m=3500) -> 14 stations found",
  "OSRM.calculate_route(origin=driver, waypoint=station_062, destination=target)",
  "detour_distance: +2.4km | arrival_eta: 6 min | battery_required: 18%",
  "git status --short",
  "M  src/routing/map_matcher.py",
  "M  src/services/recommendation.py",
  "pytest tests/test_spatial_routing.py -v",
  "tests/test_spatial_routing.py::test_osrm_fallback PASSED [100%]",
  "docker compose up -d redis postgis-db osrm-backend",
  "[+] Running 3/3 Container postgis-db Started",
  "[+] Running 3/3 Container redis Started",
  "Stockfish.postMessage('position fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')",
  "Stockfish.eval() -> depth: 18 ply | eval: +1.40 (white initiative)",
  "rag_assistant.retrieve(query='Nf3 development', top_k=3, min_similarity=0.82)",
  "cache.setex('driver:gps:live', 60, json_payload)",
  "Next.js App Router: compiled / in 340ms (Turbopack static prerender)",
  "circuit_breaker.state == CircuitState.CLOSED (error_rate: 0.00%)",
  "ready for incoming requests · system healthy",
];

export const TerminalCodeBackdrop: React.FC<{
  className?: string;
  enableLens?: boolean;
}> = ({ className = "", enableLens = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();
  const isDocVisible = useDocumentVisibility();
  const { focusMode } = usePortfolioInteraction();

  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000, isHovering: false });

  useEffect(() => {
    if (prefersReduced || !enableLens) return;

    const el = containerRef.current;
    if (!el) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isHovering: true,
      });
    };

    const handlePointerLeave = () => {
      setMousePos((prev) => ({ ...prev, isHovering: false }));
    };

    el.addEventListener("pointermove", handlePointerMove, { passive: true });
    el.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [prefersReduced, enableLens]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. ACTUAL CINEMATIC AMBIENT VIDEO BACKDROP */}
      {!prefersReduced && (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/visuals/hero-ambient-poster.jpg"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${
            focusMode ? "opacity-90" : "opacity-75"
          }`}
        >
          <source src="/visuals/hero-ambient-video.webm" type="video/webm" />
          <source src="/visuals/hero-ambient-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* 2. BASE STREAMING CODE TERMINAL WATERFALL (Clearly visible in light palette) */}
      <div
        className={`w-full h-[200%] font-mono text-[11px] md:text-xs leading-relaxed transition-opacity duration-500 relative z-10 ${
          focusMode ? "opacity-60" : "opacity-40"
        } text-[#176B87]`}
      >
        <div
          className={`flex flex-col gap-2 ${
            prefersReduced || !isDocVisible ? "" : "anim-code-stream"
          }`}
        >
          {/* Duplicated code lines for seamless infinite waterfall */}
          {[...CODE_LINES, ...CODE_LINES, ...CODE_LINES, ...CODE_LINES].map((line, idx) => (
            <div
              key={idx}
              className="whitespace-nowrap overflow-hidden text-ellipsis pl-4 md:pl-10 font-mono tracking-tight"
              style={{
                transform: `translateX(${(idx % 6) * 14}px)`,
              }}
            >
              <span className="text-[#176B87]/50 mr-3 select-none font-semibold">
                {String((idx % CODE_LINES.length) + 1).padStart(3, "0")}
              </span>
              <span className={line.startsWith("//") ? "text-[#427E8A] font-semibold italic" : ""}>
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CURSOR REVEAL LENS LAYER (Spotlights code to ~0.70 within 240px radius) */}
      {!prefersReduced && enableLens && mousePos.isHovering && (
        <div
          className="absolute inset-0 font-mono text-[11px] md:text-xs leading-relaxed text-[#183B4E] transition-opacity duration-150"
          style={{
            maskImage: `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, black 35%, transparent 80%)`,
            WebkitMaskImage: `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, black 35%, transparent 80%)`,
            opacity: focusMode ? 0.8 : 0.65,
          }}
        >
          <div
            className={`flex flex-col gap-2 ${
              prefersReduced || !isDocVisible ? "" : "anim-code-stream"
            }`}
          >
            {[...CODE_LINES, ...CODE_LINES, ...CODE_LINES, ...CODE_LINES].map((line, idx) => (
              <div
                key={idx}
                className="whitespace-nowrap overflow-hidden text-ellipsis pl-4 md:pl-10"
                style={{
                  transform: `translateX(${(idx % 6) * 14}px)`,
                }}
              >
                <span className="text-[#176B87] font-bold mr-3 select-none">
                  {String((idx % CODE_LINES.length) + 1).padStart(3, "0")}
                </span>
                <span className="font-semibold text-[#183B4E] bg-white/30 px-1 rounded-sm">
                  {line}
                </span>
              </div>
            ))}
          </div>

          {/* Focal rim indicator */}
          <div
            className="absolute rounded-full border border-[rgba(23,107,135,0.3)] bg-[#A9D8F2]/10 pointer-events-none transition-transform duration-75"
            style={{
              width: "480px",
              height: "480px",
              left: `${mousePos.x - 240}px`,
              top: `${mousePos.y - 240}px`,
            }}
          />
        </div>
      )}

      {/* 4. Soft atmospheric fade at top and bottom to keep navigation and layout seamless */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#FCF9F7] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#FCF9F7] to-transparent pointer-events-none" />
    </div>
  );
};
