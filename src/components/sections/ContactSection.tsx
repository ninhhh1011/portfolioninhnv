"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, ArrowUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { portfolioData } from "@/content/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SpotlightSurface } from "@/components/ui/SpotlightSurface";

export const ContactSection: React.FC = () => {
  const { profile } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
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
      {/* Open-sky ambient finale glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full bg-gradient-to-t from-[#A9D8F2]/30 via-[#D7EAF0]/20 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center">
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
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Gửi Mail</span>
                  </Button>

                  <button
                    onClick={handleCopyEmail}
                    aria-label="Sao chép địa chỉ email"
                    className="inline-flex items-center justify-center p-2.5 rounded-full text-[#526779] hover:text-[#183B4E] hover:bg-[#F3F1EE] border border-transparent hover:border-[rgba(66,126,138,0.2)] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[#38A169]" />
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
          <p className="text-xs text-[#22543D] bg-[#DDF3E8] py-1 px-3.5 rounded-full inline-block mb-8 border border-[#9AE6B4]/80 shadow-2xs animate-[heroFadeUp_0.3s_ease-out]">
            Đã sao chép địa chỉ email vào clipboard!
          </p>
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
            >
              <FileText className="w-4 h-4 text-[#176B87] transition-transform group-hover/social:scale-110" />
              <span>Hồ sơ CV (PDF)</span>
            </Button>
          </div>
        </SectionReveal>

        {/* Bottom bar with Back to top */}
        <div className="pt-8 border-t border-[rgba(66,126,138,0.18)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#526779]">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#183B4E]">Ninh.</span>
            <span>© 2026 Nguyễn Văn Ninh. Thiết kế theo tinh thần Craft Soft Editorial.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#183B4E] hover:text-[#176B87] hover:bg-white/90 border border-[rgba(66,126,138,0.2)] shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#176B87]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
