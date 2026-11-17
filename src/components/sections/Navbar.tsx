"use client";

import React, { useState, useEffect, useRef } from "react";
import { FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileNavDrawer } from "@/components/ui/MobileNavDrawer";
import { CvModal } from "@/components/ui/CvModal";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export const Navbar: React.FC = () => {
  const navLinks = [
    { label: "Dự án", href: "#projects" },
    { label: "Kinh nghiệm", href: "#experience" },
    { label: "Năng lực", href: "#skills" },
    { label: "Giới thiệu", href: "#about" },
  ];

  const scrollProgress = useScrollProgress();
  const activeSection = useActiveSection(["#projects", "#experience", "#skills", "#about"]);
  const prefersReduced = useReducedMotionSafe();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic CTA for desktop
  const ctaRef = useRef<HTMLDivElement>(null);
  const [ctaOffset, setCtaOffset] = useState({ x: 0, y: 0 });

  const handleCtaPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || !ctaRef.current) return;

    const rect = ctaRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.2;
    const deltaY = (e.clientY - centerY) * 0.2;

    setCtaOffset({
      x: Math.max(-4, Math.min(4, deltaX)),
      y: Math.max(-4, Math.min(4, deltaY)),
    });
  };

  const handleCtaPointerLeave = () => {
    setCtaOffset({ x: 0, y: 0 });
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-3 sm:top-4 md:top-5 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none transition-all duration-400">
        <nav
          className={`pointer-events-auto relative flex items-center justify-between gap-3 md:gap-6 px-4 md:px-6 rounded-full border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
            isScrolled
              ? "py-1.5 max-w-3xl w-full bg-white/94 backdrop-blur-xl shadow-[0_16px_40px_rgba(24,59,78,0.12)] border-[rgba(23,107,135,0.25)] scale-[0.99]"
              : "py-2.5 max-w-4xl w-full bg-white/85 backdrop-blur-md shadow-[0_8px_30px_rgba(24,59,78,0.06)] border-[rgba(66,126,138,0.2)] scale-100"
          }`}
        >
          {/* Brand wordmark */}
          <a
            href="#"
            data-magnetic="true"
            className="font-serif text-xl md:text-2xl font-bold tracking-tight text-[#183B4E] hover:text-[#176B87] transition-colors"
          >
            Ninh<span className="text-[#176B87] animate-pulse">.</span>
          </a>

          {/* Desktop Links with Sliding Magnetic Spotlight Indicator */}
          <ul
            className="hidden md:flex items-center gap-1 lg:gap-1.5 text-sm font-medium text-[#183B4E] relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              const isHovered = hoveredLink === link.href;

              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    data-magnetic="true"
                    className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "text-[#176B87] font-semibold"
                        : isHovered
                        ? "text-[#183B4E]"
                        : "text-[#526779]"
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#176B87] animate-ping" />}
                    <span>{link.label}</span>
                  </a>

                  {/* Active / Hover spotlight background pill */}
                  {(isActive || isHovered) && (
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none ${
                        isActive
                          ? "bg-[#D7EAF0] shadow-2xs border border-[rgba(23,107,135,0.2)]"
                          : "bg-[#F3F1EE]/90"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* CTA Buttons & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Quick-view CV Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCvOpen(true)}
              className="text-xs px-3 py-1.5 h-8 gap-1.5 border-[#176B87]/30 text-[#176B87] hover:bg-[#D7EAF0]/40 font-semibold"
              data-magnetic="true"
            >
              <FileText className="w-3.5 h-3.5 text-[#176B87]" />
              <span>Xem CV</span>
            </Button>

            {/* Magnetic Contact Button */}
            <div
              ref={ctaRef}
              onPointerMove={handleCtaPointerMove}
              onPointerLeave={handleCtaPointerLeave}
              data-magnetic="true"
              style={{
                transform: `translate3d(${ctaOffset.x}px, ${ctaOffset.y}px, 0)`,
                transition: ctaOffset.x === 0 ? "transform 300ms ease-out" : "none",
              }}
            >
              <Button
                variant="primary"
                size="sm"
                href="#contact"
                onClick={(e: any) => handleScrollTo(e, "#contact")}
                className="hidden sm:inline-flex text-xs px-3.5 py-1.5 h-8 gap-1.5"
              >
                <Send className="w-3 h-3" />
                <span>Liên hệ</span>
              </Button>
            </div>

            {/* Mobile Drawer */}
            <MobileNavDrawer navLinks={navLinks} contactHref="#contact" />
          </div>

          {/* Integrated Ultra-slim Scroll Progress Line at Lower Edge (2px, #176B87 with glow) */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgba(66,126,138,0.1)] pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="h-full bg-gradient-to-r from-[#176B87] via-[#64B5F6] to-[#10B981] shadow-[0_0_10px_rgba(23,107,135,0.8)] transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </nav>
      </header>

      {/* CV Modal */}
      <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </>
  );
};
