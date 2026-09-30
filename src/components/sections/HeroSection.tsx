"use client";

import React from "react";
import { ArrowDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { HeroComposition } from "@/components/visuals/HeroComposition";
import { TerminalCodeBackdrop } from "@/components/visuals/TerminalCodeBackdrop";
import { portfolioData } from "@/content/portfolio";

export const HeroSection: React.FC = () => {
  const { profile } = portfolioData;
  const [isExploreHovered, setIsExploreHovered] = React.useState(false);
  const [isContactHovered, setIsContactHovered] = React.useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-20 sm:pt-24 md:pt-28 pb-12 md:pb-16 px-4 overflow-hidden isolate">
      {/* 1. Terminal / Code Backdrop with Video & Cursor Reveal Lens */}
      <TerminalCodeBackdrop enableLens={true} />

      {/* 2. Soft sky ambient radial tint */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-b from-[#D7EAF0]/45 via-[#A9D8F2]/20 to-transparent pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        {/* Eyebrow badge with Live Video / Code Stream indicator */}
        <div className="anim-eyebrow flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[rgba(66,126,138,0.22)] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#176B87]" />
            <span className="text-xs md:text-sm font-medium text-[#183B4E]">
              {profile.eyebrow}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-[rgba(23,107,135,0.2)] shadow-2xs text-[11px] font-mono text-[#176B87]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>Video & Code Stream</span>
          </div>
        </div>

        {/* Frosted container ensuring crisp typography while revealing active video backdrop */}
        <div className="w-full backdrop-blur-[1.5px] bg-white/35 border border-white/50 rounded-3xl p-5 sm:p-7 shadow-2xs mb-6">
          {/* Masked Editorial Headline with Line-Level Stagger */}
          <h1 className="anim-headline font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#183B4E] tracking-tight leading-[1.12] mb-5 max-w-3xl mx-auto">
            <span className="block overflow-hidden">
              <span className="inline-block transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Từ ý tưởng đến
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                sản phẩm có thể trải nghiệm.
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="anim-desc text-base sm:text-lg md:text-xl text-[#526779] max-w-2xl mx-auto leading-relaxed mb-6">
            {profile.description}
          </p>

          {/* Specialization Pills */}
          <div className="anim-pills flex flex-wrap items-center justify-center gap-2.5">
            {profile.specializations.map((spec) => (
              <Chip key={spec} variant="sky" size="md">
                {spec}
              </Chip>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="anim-cta flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            href="#projects"
            onClick={(e: any) => handleScroll(e, "#projects")}
            onMouseEnter={() => setIsExploreHovered(true)}
            onMouseLeave={() => setIsExploreHovered(false)}
            onFocus={() => setIsExploreHovered(true)}
            onBlur={() => setIsExploreHovered(false)}
            className="gap-2 transition-transform duration-200"
          >
            <span>Khám phá dự án</span>
            <ArrowDown className={`w-4 h-4 transition-transform duration-200 ${isExploreHovered ? "translate-y-0.5" : ""}`} />
          </Button>

          <Button
            variant="secondary"
            size="lg"
            href={profile.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsContactHovered(true)}
            onMouseLeave={() => setIsContactHovered(false)}
            onFocus={() => setIsContactHovered(true)}
            onBlur={() => setIsContactHovered(false)}
            className="gap-2"
          >
            <FileText className="w-4 h-4 text-[#176B87]" />
            <span>Xem CV</span>
          </Button>
        </div>
      </div>

      {/* Hero Visual Composition with Living Desk Scene & Simulations */}
      <div className="anim-visual relative z-10">
        <HeroComposition
          isExploreHovered={isExploreHovered}
          isContactHovered={isContactHovered}
        />
      </div>
    </section>
  );
};
