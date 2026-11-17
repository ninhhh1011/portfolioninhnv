"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, ArrowUp, FileText, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { portfolioData } from "@/content/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SpotlightSurface } from "@/components/ui/SpotlightSurface";
import { StarlightCanvas } from "@/components/visuals/StarlightCanvas";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export const ContactSection: React.FC = () => {
  const { profile } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const prefersReduced = useReducedMotionSafe();

  const triggerConfettiBurst = (event?: React.MouseEvent) => {
    if (prefersReduced) return;

    // Get origin coordinates from click or default to center
    let originX = 0.5;
    let originY = 0.6;
    if (event) {
      originX = event.clientX / window.innerWidth;
      originY = event.clientY / window.innerHeight;
    }

    // Launch multi-burst cyber confetti
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { x: originX, y: originY },
      colors: ["#176B87", "#10B981", "#64B5F6", "#A9D8F2", "#B388FF", "#FFE6D6"],
      disableForReducedMotion: true,
      zIndex: 99999,
    });

    // Secondary delayed burst for fireworks effect
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: Math.max(0.1, originX - 0.08), y: originY },
        colors: ["#10B981", "#A9D8F2", "#176B87"],
        disableForReducedMotion: true,
        zIndex: 99999,
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: Math.min(0.9, originX + 0.08), y: originY },
        colors: ["#64B5F6", "#B388FF", "#176B87"],
        disableForReducedMotion: true,
        zIndex: 99999,
      });
    }, 160);
  };

  const handleCopyEmail = async (e: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      triggerConfettiBurst(e);
      setTimeout(() => setCopied(false), 3500);
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative pt-24 md:pt-32 pb-14 px-4 bg-gradient-to-b from-[#FCF9F7] via-[#D7EAF0]/40 to-[#D7EAF0]/75 border-t border-[rgba(66,126,138,0.18)] select-none overflow-hidden"
    >
      {/* Interactive Starlight Canvas Finale */}
      <StarlightCanvas />

      {/* Open-sky ambient finale glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full bg-gradient-to-t from-[#A9D8F2]/30 via-[#D7EAF0]/20 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <SectionReveal direction="up" delayMs={50}>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#176B87] bg-white px-3.5 py-1 rounded-full border border-[rgba(23,107,135,0.2)] shadow-xs">
            Kết nối & Hợp tác
          </span>
        </SectionReveal>

        {/* Serif Headline */}
        <SectionReveal direction="up" delayMs={120}>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#183B4E] mt-4 mb-4 tracking-tight">
            Trao đổi về dự án tiếp theo.
          </h2>
        </SectionReveal>

        {/* Supporting Copy */}
        <SectionReveal direction="up" delayMs={180}>
          <p className="text-sm md:text-base text-[#526779] max-w-xl mx-auto mb-10 leading-relaxed">
            Tôi luôn cởi mở trao đổi về các cơ hội phát triển backend, ứng dụng AI thực tế và các dự án kỹ thuật phần mềm.
          </p>
        </SectionReveal>

        {/* Email action pill with SpotlightSurface */}
        <SectionReveal direction="up" delayMs={240}>
          <div className="flex justify-center mb-10">
            <SpotlightSurface
              variant="sky"
              className="inline-flex rounded-full max-w-lg w-full"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2.5 sm:p-2 bg-white rounded-3xl sm:rounded-full border border-[rgba(66,126,138,0.22)] shadow-[0_8px_30px_rgba(24,59,78,0.08)] w-full transition-transform duration-200 hover:-translate-y-0.5">
                <div className="flex items-center gap-2 px-4 py-2 text-sm md:text-base font-mono text-[#183B4E] truncate w-full sm:w-auto">
                  <Mail className="w-4 h-4 text-[#176B87] shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Button
                    variant="primary"
                    size="sm"
                    href={`mailto:${profile.email}`}
                    className="gap-1.5 w-full sm:w-auto text-xs px-4"
                    data-magnetic="true"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Gửi Mail</span>
                  </Button>

                  <button
                    onClick={handleCopyEmail}
                    aria-label="Sao chép địa chỉ email"
                    className="inline-flex items-center justify-center p-2.5 rounded-full text-[#526779] hover:text-[#183B4E] hover:bg-[#F3F1EE] border border-transparent hover:border-[rgba(66,126,138,0.2)] transition-colors cursor-pointer"
                    data-magnetic="true"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[#10B981] animate-bounce" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </SpotlightSurface>
          </div>
        </SectionReveal>

        {/* Copy feedback notification */}
        {copied && (
          <div className="inline-flex items-center gap-2 text-xs text-[#22543D] bg-[#DDF3E8] py-1.5 px-4 rounded-full mb-8 border border-[#9AE6B4] shadow-xs animate-[heroFadeUp_0.3s_ease-out]">
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Đã sao chép địa chỉ email vào clipboard!</span>
          </div>
        )}
        {copyError && (
          <p className="text-xs text-[#9C4221] bg-[#FFE6D6] py-1 px-3.5 rounded-full inline-block mb-8 border border-[#FBD38D]">
            Không thể sao chép tự động. Vui lòng copy thủ công: {profile.email}
          </p>
        )}

        {/* External Social / Professional links */}
        <SectionReveal direction="up" delayMs={300}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Button
              variant="secondary"
              size="md"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2 group/social hover:-translate-y-1 transition-all"
              data-magnetic="true"
            >
              <GithubIcon className="w-4 h-4 transition-transform group-hover/social:scale-110" />
              <span>GitHub</span>
            </Button>

            <Button
              variant="secondary"
              size="md"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2 group/social hover:-translate-y-1 transition-all"
              data-magnetic="true"
            >
              <LinkedInIcon className="w-4 h-4 transition-transform group-hover/social:scale-110" />
              <span>LinkedIn</span>
            </Button>

            <Button
              variant="secondary"
              size="md"
              href={profile.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2 group/social hover:-translate-y-1 transition-all"
              data-magnetic="true"
            >
              <FileText className="w-4 h-4 text-[#176B87] transition-transform group-hover/social:scale-110" />
              <span>Hồ sơ CV (PDF)</span>
            </Button>
          </div>
        </SectionReveal>

        {/* Bottom bar with Magnetic Back-to-Top Rocket */}
        <div className="pt-8 border-t border-[rgba(66,126,138,0.18)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#526779]">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#183B4E]">Ninh.</span>
            <span>© 2026 Nguyễn Văn Ninh. All rights reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#183B4E] hover:text-[#176B87] hover:bg-white/95 border border-[rgba(66,126,138,0.22)] shadow-2xs hover:shadow-xs transition-all hover:-translate-y-1 cursor-pointer font-medium"
            data-magnetic="true"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#176B87] animate-pulse" />
          </button>
        </div>
      </div>
    </footer>
  );
};
