"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Lightbulb, X, MessageSquare } from "lucide-react";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useSectionInView } from "@/hooks/useSectionInView";
import { usePortfolioInteraction } from "@/context/PortfolioInteractionContext";

export interface NinhDeskSceneProps {
  isExploreHovered?: boolean;
  isContactHovered?: boolean;
  className?: string;
}

export const NinhDeskScene: React.FC<NinhDeskSceneProps> = ({
  isExploreHovered = false,
  isContactHovered = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();

  const {
    activeProject,
    focusMode,
    setFocusMode,
    toggleFocusMode,
    speechBubble,
    triggerNextSpeechBubble,
    openFirstSpeechBubble,
    closeSpeechBubble,
  } = usePortfolioInteraction();

  // Pose state: Greeting (waving hand + smiling looking at user) vs Coding (typing on laptop)
  const [isGreeting, setIsGreeting] = useState(true);
  const greetingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startGreetingPose = useCallback((durationMs = 4200) => {
    setIsGreeting(true);
    if (greetingTimerRef.current) {
      clearTimeout(greetingTimerRef.current);
    }
    greetingTimerRef.current = setTimeout(() => {
      setIsGreeting(false);
    }, durationMs);
  }, []);

  // Scroll In-View detection to automatically show greeting pose + speech bubble on scroll down
  const { ref: inViewRef, isInView } = useSectionInView<HTMLDivElement>({ threshold: 0.15 });
  const hasAutoOpenedRef = useRef(false);

  useEffect(() => {
    if (isInView && !hasAutoOpenedRef.current) {
      hasAutoOpenedRef.current = true;
      startGreetingPose(4200);
      // Auto pop up the first speech bubble after smooth entrance
      const timer = setTimeout(() => {
        openFirstSpeechBubble();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, openFirstSpeechBubble, startGreetingPose]);

  useEffect(() => {
    return () => {
      if (greetingTimerRef.current) {
        clearTimeout(greetingTimerRef.current);
      }
    };
  }, []);

  // When user clicks the character: wave hello again for 3.5s & advance speech bubble
  const handleCharacterClick = () => {
    startGreetingPose(3500);
    triggerNextSpeechBubble();
  };

  // If user is actively previewing a project card, immediately switch to coding mode
  const showGreeting = isGreeting && activeProject === "none";

  // Fine-tuned 3D Parallax Tilt (max RotateX ±2°, RotateY ±3°)
  const { tiltX, tiltY, translateX, translateY } = usePointerParallax({
    maxRotateX: 2.0,
    maxRotateY: 3.0,
    maxTranslate: 9,
    containerRef,
  });

  // Project-specific badges for TechOrbit
  const getOrbitBadges = () => {
    switch (activeProject) {
      case "smart-parking":
        return ["React", "Next.js", "TypeScript"];
      case "chess":
        return ["React", "Stockfish", "Supabase"];
      case "green-sm":
        return ["FastAPI", "PostGIS", "OSRM", "Python"];
      default:
        return ["Backend & AI"];
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[500px] sm:max-w-[560px] md:max-w-[620px] mx-auto select-none transition-transform duration-500 ${className}`}
      style={{
        perspective: "1200px",
      }}
    >
      {/* Target for InView observer */}
      <div ref={inViewRef} className="absolute -top-16 inset-x-0 h-8 pointer-events-none" />

      {/* 1. Ambient Depth Layers Around Workspace (Perspective lines & clouds) */}
      <div
        className="absolute -inset-8 pointer-events-none -z-20 overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle technical perspective grid lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #176B87 1px, transparent 1px), linear-gradient(to bottom, #176B87 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Ambient cloud fragments drifting */}
        {!prefersReduced && (
          <>
            <div className="absolute top-1/4 -left-12 w-48 h-20 bg-[#D7EAF0]/40 rounded-full blur-2xl anim-drift-slow" />
            <div className="absolute bottom-1/4 -right-12 w-52 h-24 bg-[#EEE7FA]/40 rounded-full blur-2xl anim-drift-reverse" />
          </>
        )}
      </div>

      {/* 2. Dynamic 3D Parallax Island Container */}
      <div
        className={`relative w-full transition-all duration-300 ease-out ${
          prefersReduced ? "" : "float-card-1"
        } ${isExploreHovered ? "-translate-y-2.5 scale-[1.015]" : ""}`}
        style={{
          transform: prefersReduced
            ? undefined
            : `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${translateX * 0.5}px, ${
                translateY * 0.5
              }px, 0)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Soft atmospheric base drop shadow */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-[#183B4E]/12 rounded-full blur-2xl pointer-events-none transition-all duration-500"
          style={{
            transform: isExploreHovered || focusMode ? "scale(1.1) translateY(4px)" : "scale(1)",
            opacity: focusMode ? 0.26 : 0.14,
          }}
          aria-hidden="true"
        />

        {/* Outer ambient glow behind scene */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full pointer-events-none blur-3xl transition-all duration-700 -z-10 ${
            focusMode
              ? "bg-gradient-to-tr from-[#FFE6D6]/80 via-[#FED7AA]/70 to-[#FEF08A]/40 opacity-100 scale-110"
              : isContactHovered
              ? "bg-gradient-to-tr from-[#FFE6D6]/50 via-[#D7EAF0]/40 to-[#A9D8F2]/30 opacity-90"
              : activeProject === "smart-parking"
              ? "bg-gradient-to-tr from-[#A9D8F2]/60 via-[#D7EAF0]/50 to-[#FCF9F7] opacity-90"
              : activeProject === "chess"
              ? "bg-gradient-to-tr from-[#EEE7FA]/60 via-[#D6BCFA]/40 to-[#D7EAF0]/30 opacity-90"
              : activeProject === "green-sm"
              ? "bg-gradient-to-tr from-[#DDF3E8]/60 via-[#A9D8F2]/40 to-[#FCF9F7] opacity-90"
              : "bg-gradient-to-tr from-[#D7EAF0]/50 via-[#A9D8F2]/25 to-[#EEE7FA]/30 opacity-70"
          }`}
          aria-hidden="true"
        />

        {/* 3. VISUAL ASSET LAYER (With organic breathing animation) */}
        <div
          className={`relative aspect-[4/3] w-full overflow-visible rounded-2xl ${
            prefersReduced ? "" : "anim-chibi-breathe"
          }`}
        >
          {/* Clickable & Hoverable Chibi Character Target: Hover changes color (Focus Mode), Click triggers/advances speech bubble & waves hello */}
          <button
            onClick={handleCharacterClick}
            onMouseEnter={() => setFocusMode(true)}
            onMouseLeave={() => setFocusMode(false)}
            onFocus={() => setFocusMode(true)}
            onBlur={() => setFocusMode(false)}
            aria-label="Nhân vật Ninh: Rê chuột để đổi màu/bật Focus Mode, Bấm để vẫy tay chào và trò chuyện"
            className="absolute top-[14%] left-[28%] w-[38%] h-[60%] z-20 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B87] group/char"
          >
            <span className="sr-only">Rê chuột đổi màu đèn/Focus Mode, bấm để trò chuyện</span>
          </button>

          {/* 3.1 GREETING POSE: Waving hand, fluffy hair, warm bright smile looking at viewer */}
          <Image
            src="/visuals/ninh-desk-wave.png"
            alt="Nguyễn Văn Ninh vẫy tay chào và cười thân thiện với mái tóc bồng bềnh"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 560px, 620px"
            priority
            className={`object-contain pointer-events-none transition-opacity duration-700 ease-in-out ${
              showGreeting ? "opacity-100 z-1" : "opacity-0 pointer-events-none"
            } ${
              focusMode
                ? "drop-shadow-[0_16px_36px_rgba(245,158,11,0.35)] brightness-[1.04]"
                : "drop-shadow-[0_12px_28px_rgba(24,59,78,0.08)]"
            }`}
          />

          {/* 3.2 FOCUS CODING POSE: Hands on laptop keyboard, focusing on work */}
          <Image
            src="/visuals/ninh-desk.png"
            alt="Nguyễn Văn Ninh tập trung gõ code tại bàn làm việc"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 560px, 620px"
            priority
            className={`object-contain pointer-events-none transition-opacity duration-700 ease-in-out ${
              !showGreeting ? "opacity-100 z-1" : "opacity-0 pointer-events-none"
            } ${
              focusMode
                ? "drop-shadow-[0_16px_36px_rgba(245,158,11,0.35)] brightness-[1.04]"
                : "drop-shadow-[0_12px_28px_rgba(24,59,78,0.08)]"
            }`}
          />

          {/* SMILE SPARKLES ACCENT: Radiant warm smile when greeting */}
          {showGreeting && !prefersReduced && (
            <div className="absolute top-[17%] left-[45%] pointer-events-none z-20 select-none" aria-hidden="true">
              <span className="absolute -top-1 -right-4 text-[13px] anim-sparkle text-amber-400">✨</span>
              <span className="absolute top-5 -left-3 text-[11px] anim-sparkle text-sky-400" style={{ animationDelay: "0.6s" }}>✨</span>
            </div>
          )}

          {/* WAVING HAND MINI BADGE: Highlights the waving hand hello gesture */}
          {showGreeting && (
            <div className="absolute top-[11%] left-[22%] pointer-events-none z-20 animate-[heroFadeUp_0.4s_ease-out]">
              <span className="px-2 py-0.5 rounded-full text-[9.5px] font-medium bg-white/95 text-[#183B4E] border border-[rgba(23,107,135,0.22)] shadow-xs flex items-center gap-1">
                <span className="anim-wave-hand text-xs">👋</span>
                <span>Xin chào!</span>
              </span>
            </div>
          )}

          {/* DYNAMIC LIGHT REFLECTION ONTO CHARACTER: Bounces screen/ambient glow onto chest & face */}
          <div
            className="absolute top-[20%] left-[36%] w-28 h-28 rounded-full pointer-events-none transition-all duration-700 mix-blend-soft-light z-15"
            style={{
              background: focusMode
                ? "radial-gradient(circle, rgba(251, 191, 36, 0.65) 0%, transparent 70%)"
                : activeProject === "chess"
                ? "radial-gradient(circle, rgba(192, 132, 252, 0.55) 0%, transparent 70%)"
                : activeProject === "green-sm"
                ? "radial-gradient(circle, rgba(74, 222, 128, 0.55) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(165, 243, 252, 0.5) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* 4. INTERACTIVE DESK LAMP: Hover triggers color change / Focus Mode */}
          <button
            onClick={toggleFocusMode}
            onMouseEnter={() => setFocusMode(true)}
            onMouseLeave={() => setFocusMode(false)}
            onFocus={() => setFocusMode(true)}
            onBlur={() => setFocusMode(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleFocusMode();
              }
            }}
            aria-label={`Chiếc đèn bàn: Rê chuột đổi màu, Bật/Tắt Chế độ tập trung (Focus Mode)`}
            role="switch"
            aria-checked={focusMode}
            className="absolute top-[20%] right-[18%] w-16 h-20 z-20 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B87] group/lamp transition-transform hover:scale-110 active:scale-95"
          >
            <span className="sr-only">Rê chuột hoặc bấm để đổi màu đèn Focus Mode</span>
          </button>

          {/* LAMP GLOW EFFECT: Radiates rich warm amber on hover */}
          <div
            className={`absolute top-[17%] right-[18%] w-32 h-32 rounded-full pointer-events-none transition-all duration-500 -z-0 ${
              focusMode
                ? "opacity-100 scale-135"
                : prefersReduced
                ? "opacity-60"
                : "anim-lamp"
            }`}
            style={{
              background: focusMode
                ? "radial-gradient(circle, rgba(254, 240, 138, 0.98) 0%, rgba(254, 215, 170, 0.6) 40%, rgba(245, 158, 11, 0.25) 65%, transparent 85%)"
                : activeProject === "green-sm"
                ? "radial-gradient(circle, rgba(167, 243, 208, 0.85) 0%, rgba(167, 243, 208, 0.3) 50%, transparent 80%)"
                : "radial-gradient(circle, rgba(254, 215, 170, 0.7) 0%, rgba(254, 215, 170, 0.2) 50%, transparent 80%)",
            }}
            aria-hidden="true"
          />

          {/* DOWNWARD DESK LIGHT CONE (Appears brightly on hover to illuminate workspace) */}
          <div
            className={`absolute top-[30%] right-[14%] w-48 h-52 pointer-events-none transition-all duration-500 -z-0 ${
              focusMode ? "opacity-85 scale-100" : "opacity-0 scale-90"
            }`}
            style={{
              background:
                "conic-gradient(from 135deg at 55% 0%, rgba(254, 240, 138, 0.45) 0deg, rgba(254, 215, 170, 0.35) 45deg, transparent 80deg)",
              filter: "blur(6px)",
            }}
            aria-hidden="true"
          />

          {/* 5. LAPTOP SCREEN GLOW & SCREEN TYPING FLICKER (Reacts to projects & hover) */}
          <div
            className={`absolute top-[37%] left-[49%] w-28 h-24 rounded-full pointer-events-none transition-all duration-500 ${
              prefersReduced ? "opacity-50" : !showGreeting ? "anim-screen-typing" : "anim-laptop-glow"
            } ${isExploreHovered || focusMode ? "scale-125 opacity-100" : ""}`}
            style={{
              background: focusMode
                ? "radial-gradient(circle, rgba(254, 240, 138, 0.9) 0%, rgba(245, 158, 11, 0.35) 50%, transparent 75%)"
                : activeProject === "chess"
                ? "radial-gradient(circle, rgba(214, 188, 250, 0.9) 0%, rgba(85, 60, 154, 0.3) 50%, transparent 75%)"
                : activeProject === "green-sm"
                ? "radial-gradient(circle, rgba(154, 230, 180, 0.9) 0%, rgba(34, 84, 61, 0.3) 50%, transparent 75%)"
                : "radial-gradient(circle, rgba(169, 216, 242, 0.85) 0%, rgba(23, 107, 135, 0.25) 50%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* TYPING CODE SPARKS: Tiny photon sparks floating up from keyboard in coding mode */}
          {!showGreeting && !prefersReduced && (
            <div className="absolute top-[38%] left-[53%] w-10 h-8 pointer-events-none z-15 overflow-visible" aria-hidden="true">
              <span className="absolute top-2 left-1 w-1.5 h-1.5 rounded-full bg-[#A9D8F2] blur-[0.3px] anim-typing-spark-1" />
              <span className="absolute top-1 left-4 w-1 h-1 rounded-full bg-[#D7EAF0] blur-[0.2px] anim-typing-spark-2" />
              <span className="absolute top-3 left-7 w-1.5 h-1.5 rounded-full bg-[#FEF08A] blur-[0.3px] anim-typing-spark-3" />
            </div>
          )}

          {/* 6. CONTEXT-AWARE TERMINAL OVERLAY (Positioned over the 3D code screen, safely to the right of chibi's face) */}
          <div
            className={`absolute top-[18%] left-[56%] pointer-events-none px-2.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-[rgba(66,126,138,0.22)] shadow-md transition-all duration-300 max-w-[175px] sm:max-w-[195px] z-10 ${
              focusMode || activeProject !== "none" ? "scale-105 opacity-100" : "opacity-90"
            }`}
          >
            <div className="flex items-center justify-between gap-2 border-b border-[rgba(66,126,138,0.1)] pb-1 mb-1">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    focusMode
                      ? "bg-[#D97706]"
                      : activeProject === "chess"
                      ? "bg-[#553C9A]"
                      : activeProject === "green-sm"
                      ? "bg-[#22543D]"
                      : "bg-[#176B87]"
                  } animate-pulse`}
                />
                <span className="font-mono text-[9px] font-bold text-[#183B4E]">
                  {focusMode
                    ? "focus_mode.sh"
                    : activeProject === "smart-parking"
                    ? "parking_sync.ts"
                    : activeProject === "chess"
                    ? "stockfish_eval.ts"
                    : activeProject === "green-sm"
                    ? "routing_osrm.py"
                    : "ninh@workspace:~"}
                </span>
              </div>
              <span className="w-1 h-2.5 bg-[#176B87] anim-cursor inline-block" />
            </div>

            {/* Dynamic terminal log line based on active project / focus mode */}
            <div className="font-mono text-[8.5px] leading-tight text-[#526779]">
              {focusMode ? (
                <div className="text-[#B45309] font-semibold flex items-center gap-1">
                  <span>[Focus: Warm Amber Active]</span>
                </div>
              ) : activeProject === "smart-parking" ? (
                <div className="text-[#176B87] font-semibold flex items-center gap-1">
                  <span>[A-02: Đang vào]</span>
                  <span>[B-03: Đã giữ]</span>
                </div>
              ) : activeProject === "chess" ? (
                <div className="text-[#553C9A] font-semibold">
                  <span>Eval: +1.40 | 14. Nf3 → d4</span>
                </div>
              ) : activeProject === "green-sm" ? (
                <div className="text-[#22543D] font-semibold">
                  <span>+2.4km detour · ETA: 6m</span>
                </div>
              ) : (
                <span className="truncate block">ready · awaiting commands</span>
              )}
            </div>
          </div>

          {/* 7. COFFEE STEAM */}
          {!prefersReduced && (
            <div
              className="absolute top-[36%] left-[43.5%] w-4 h-8 pointer-events-none overflow-visible"
              aria-hidden="true"
            >
              <span className="absolute left-0 bottom-0 w-1.5 h-3 rounded-full bg-white/50 blur-[0.6px] anim-steam-1" />
              <span className="absolute left-1.5 bottom-1 w-1.5 h-3 rounded-full bg-white/40 blur-[0.6px] anim-steam-2" />
            </div>
          )}

          {/* 8. CONTEXT-AWARE TECH ORBIT BADGES (Floats cleanly above chibi hair) */}
          <div className="absolute top-[5%] left-[20%] flex items-center gap-1.5 z-20 pointer-events-none">
            {getOrbitBadges().map((badge, idx) => (
              <span
                key={badge}
                className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-white/95 text-[#183B4E] border border-[rgba(66,126,138,0.22)] shadow-xs transition-all duration-300 animate-[heroFadeUp_0.4s_ease-out]"
                style={{
                  animationDelay: `${idx * 80}ms`,
                  transform: `translateY(${Math.sin(idx * 1.2) * 4}px)`,
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* 9. SPEECH BUBBLE EASTER EGG (Slides up fresh on every click and auto-opens on scroll down) */}
          {speechBubble.isOpen && (
            <div
              key={speechBubble.step}
              role="alert"
              className="absolute -top-14 left-1/2 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[rgba(23,107,135,0.25)] shadow-[0_12px_28px_rgba(24,59,78,0.14)] max-w-[310px] w-max text-xs text-[#183B4E] flex items-center gap-2.5 anim-chat-slide-up"
            >
              <div className="w-5 h-5 rounded-full bg-[#D7EAF0] flex items-center justify-center shrink-0 text-[#176B87]">
                <MessageSquare className="w-3 h-3" />
              </div>
              <div className="flex-1">
                <span className="leading-snug block font-medium">{speechBubble.message}</span>
                <span className="text-[9px] text-[#526779] block mt-0.5">
                  Bấm nhân vật để vẫy chào & xem tiếp ({speechBubble.step + 1}/4)
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeSpeechBubble();
                }}
                aria-label="Đóng tin nhắn"
                className="p-1 hover:bg-[#F3F1EE] rounded-full text-[#526779] hover:text-[#183B4E] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Speech bubble pointer arrow */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 border-b border-r border-[rgba(23,107,135,0.25)] rotate-45 pointer-events-none" />
            </div>
          )}

          {/* 10. CLOUDS */}
          {!prefersReduced && (
            <>
              <div
                className="absolute -bottom-2 -left-4 w-28 h-12 rounded-full bg-white/60 blur-md pointer-events-none transition-transform duration-300"
                style={{
                  transform: `translate3d(${-translateX * 0.8}px, ${-translateY * 0.8}px, 0)`,
                }}
                aria-hidden="true"
              />
              <div
                className="absolute bottom-1 -right-3 w-28 h-12 rounded-full bg-white/65 blur-md pointer-events-none transition-transform duration-300"
                style={{
                  transform: `translate3d(${-translateX * 0.6}px, ${-translateY * 0.6}px, 0)`,
                }}
                aria-hidden="true"
              />
            </>
          )}
        </div>

        {/* Status Badge Below Island */}
        <div className="text-center mt-3 flex items-center justify-center gap-2">
          <span
            onMouseEnter={() => setFocusMode(true)}
            onMouseLeave={() => setFocusMode(false)}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#526779] bg-white/90 backdrop-blur-sm border border-[rgba(66,126,138,0.18)] px-3.5 py-1 rounded-full shadow-xs cursor-pointer hover:border-[#F59E0B]/50 transition-colors"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                focusMode ? "bg-[#D97706] animate-ping" : "bg-[#176B87]"
              }`}
            />
            {focusMode ? (
              <span className="text-[#B45309] font-semibold flex items-center gap-1">
                <Lightbulb className="w-3 h-3" /> Focus Mode · Đang chiếu sáng ấm
              </span>
            ) : (
              <span>Rê chuột vào nhân vật hoặc đèn để đổi màu · Bấm để trò chuyện</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
