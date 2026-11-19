"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, BookOpen, ExternalLink, Info, Lock, Bookmark } from "lucide-react";
import { ProjectItem } from "@/content/portfolio";
import { SmartParkingIllustration } from "@/components/visuals/SmartParkingIllustration";
import { ChessIllustration } from "@/components/visuals/ChessIllustration";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { GithubIcon } from "@/components/ui/Icons";

interface PageCurlBook3DProps {
  projects: ProjectItem[];
}

export const PageCurlBook3D: React.FC<PageCurlBook3DProps> = ({ projects }) => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [isFlipping, setIsFlipping] = useState<"next" | "prev" | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const currentProject = projects[activeProjectIdx] ?? projects[0];
  const total = projects.length;

  // Realistic gentle paper rustle sound via Web Audio API
  const playPageSound = () => {
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = (audioCtxRef.current ||= new AC());
      const now = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(2, now);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start(now);
    } catch {}
  };

  const handleNext = () => {
    if (isFlipping) return;
    playPageSound();
    setIsFlipping("next");
    setTimeout(() => {
      setActiveProjectIdx((prev) => (prev + 1) % total);
      setIsFlipping(null);
    }, 550);
  };

  const handlePrev = () => {
    if (isFlipping) return;
    playPageSound();
    setIsFlipping("prev");
    setTimeout(() => {
      setActiveProjectIdx((prev) => (prev - 1 + total) % total);
      setIsFlipping(null);
    }, 550);
  };

  return (
    <div className="relative w-full py-6 select-none" role="region" aria-label="3D Page Curl Book">
      {/* 3D Book Stage Container */}
      <div
        className="relative mx-auto w-full max-w-5xl py-4"
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Book Outer Hardcover & Shadow */}
        <div className="relative rounded-3xl bg-[#ECE7E1] p-3 sm:p-5 md:p-6 shadow-[0_25px_60px_-15px_rgba(24,59,78,0.22),0_10px_20px_rgba(24,59,78,0.06)] border border-[#D5CFC7]">
          {/* Top Spine Bookmark Ribbon */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none">
            <div className="w-5 h-8 bg-[#176B87] rounded-b-md shadow-md flex items-center justify-center">
              <Bookmark className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          {/* Open Two-Page Spread */}
          <div
            className="relative grid grid-cols-1 md:grid-cols-2 bg-[#FCFAF7] rounded-2xl overflow-hidden border border-[#E5E0D8] shadow-inner min-h-[540px] md:min-h-[500px]"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Center Book Spine Shadow & Fold Line */}
            <div
              className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 pointer-events-none z-30"
              style={{
                background:
                  "linear-gradient(to right, rgba(24,59,78,0.08) 0%, rgba(24,59,78,0.18) 46%, rgba(24,59,78,0.24) 50%, rgba(24,59,78,0.18) 54%, rgba(24,59,78,0.08) 100%)",
              }}
            />

            {/* Left Page (Editorial Project Story & Actions) */}
            <div className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EAE5DE] bg-gradient-to-r from-[#FAF7F2] to-[#FCFAF7]">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Chip variant="sky" size="sm">
                      {currentProject.type}
                    </Chip>
                    <span className="text-xs text-[#526779] font-mono">{currentProject.year}</span>
                  </div>
                  <span className="text-xs font-mono text-[#526779]">
                    Trang {activeProjectIdx * 2 + 1}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#183B4E] mb-2 tracking-tight">
                  {currentProject.title}
                </h3>

                <p className="text-xs sm:text-sm font-medium text-[#176B87] mb-4">
                  {currentProject.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#526779] leading-relaxed mb-5 font-serif italic border-l-2 border-[#176B87]/30 pl-3.5">
                  &ldquo;{currentProject.description}&rdquo;
                </p>

                {/* Bullets */}
                <ul className="space-y-2 mb-6">
                  {currentProject.bullets.map((b, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[#526779] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#176B87] mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {currentProject.technologies.map((t) => (
                    <Chip key={t} variant="neutral" size="sm">
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Actions footer */}
              <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-[#EAE5DE]">
                {currentProject.isProprietary ? (
                  <>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#F3F1EE] text-[#526779] border border-[rgba(66,126,138,0.2)]">
                      <Lock className="w-3.5 h-3.5 text-[#176B87]" />
                      <span>Dự án nội bộ</span>
                    </div>
                    <ProjectModal
                      project={currentProject}
                      trigger={
                        <Button variant="primary" size="sm" className="gap-1.5">
                          <Info className="w-3.5 h-3.5" />
                          <span>Chi tiết luồng</span>
                        </Button>
                      }
                    />
                  </>
                ) : (
                  <>
                    {currentProject.demoUrl && (
                      <Button
                        variant="primary"
                        size="sm"
                        href={currentProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Mở Demo</span>
                      </Button>
                    )}
                    {currentProject.githubUrl && (
                      <Button
                        variant="secondary"
                        size="sm"
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-1.5"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Mã nguồn</span>
                      </Button>
                    )}
                    <ProjectModal
                      project={currentProject}
                      trigger={
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Info className="w-3.5 h-3.5 text-[#176B87]" />
                          <span>Chi tiết</span>
                        </Button>
                      }
                    />
                  </>
                )}
              </div>
            </div>

            {/* Right Page (Interactive Visual Spread & Page Dog-Ear) */}
            <div className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-gradient-to-l from-[#FAF7F2] to-[#FCFAF7] overflow-hidden">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#176B87] bg-[#D7EAF0]/60 px-2.5 py-0.5 rounded-full">
                    Minh họa kiến trúc
                  </span>
                  <span className="text-xs font-mono text-[#526779]">
                    Trang {activeProjectIdx * 2 + 2}
                  </span>
                </div>

                {/* Living Diagram Illustration */}
                <div className="my-2 rounded-2xl bg-white/70 p-3 sm:p-4 border border-[rgba(66,126,138,0.18)] shadow-2xs">
                  {currentProject.previewType === "smart-parking" ? (
                    <SmartParkingIllustration />
                  ) : (
                    <ChessIllustration />
                  )}
                </div>
              </div>

              {/* Bottom Right Page Curl "Dog-ear" Trigger */}
              <div className="flex items-center justify-between pt-4 border-t border-[#EAE5DE]">
                <span className="text-xs text-[#526779] italic font-serif">
                  Dự án {activeProjectIdx + 1} trên {total}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  className="group/curl flex items-center gap-1.5 text-xs font-semibold text-[#176B87] hover:text-[#13556c] transition-all cursor-pointer"
                >
                  <span>Lật trang tiếp</span>
                  <div className="w-5 h-5 rounded-bl-lg bg-gradient-to-tr from-[#D7EAF0] to-white border-l border-b border-[#176B87]/30 shadow-xs group-hover/curl:scale-110 group-hover/curl:-rotate-6 transition-transform" />
                </button>
              </div>
            </div>

            {/* Dynamic 3D Turning Page Flip Overlay */}
            {isFlipping && (
              <div
                className={`absolute top-0 bottom-0 w-1/2 right-0 origin-left z-50 pointer-events-none transition-transform duration-550 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isFlipping === "next"
                    ? "animate-[flipPageNext_0.55s_cubic-bezier(0.25,1,0.5,1)_forwards]"
                    : "animate-[flipPagePrev_0.55s_cubic-bezier(0.25,1,0.5,1)_forwards]"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  background:
                    "linear-gradient(to right, rgba(24,59,78,0.2) 0%, rgba(255,255,255,0.98) 25%, #FAF7F2 100%)",
                  boxShadow: "-15px 0 35px rgba(24,59,78,0.25)",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Book Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-xl mx-auto mt-6 px-4">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Lật trang trước"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white border border-[rgba(23,107,135,0.2)] text-xs sm:text-sm font-medium text-[#183B4E] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#176B87]" />
          <span>Trang trước</span>
        </button>

        {/* Page Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                playPageSound();
                setActiveProjectIdx(i);
              }}
              aria-label={`Đi tới dự án ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeProjectIdx === i
                  ? "w-8 bg-[#176B87] shadow-xs"
                  : "w-2.5 bg-[#176B87]/30 hover:bg-[#176B87]/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Lật trang tiếp"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white border border-[rgba(23,107,135,0.2)] text-xs sm:text-sm font-medium text-[#183B4E] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Trang tiếp</span>
          <ChevronRight className="w-4 h-4 text-[#176B87]" />
        </button>
      </div>

      {/* Page Flip Keyframe Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flipPageNext {
          0% { transform: rotateY(0deg); opacity: 1; }
          50% { transform: rotateY(-90deg); opacity: 0.9; }
          100% { transform: rotateY(-180deg); opacity: 0; }
        }
        @keyframes flipPagePrev {
          0% { transform: rotateY(-180deg); opacity: 0; }
          50% { transform: rotateY(-90deg); opacity: 0.9; }
          100% { transform: rotateY(0deg); opacity: 1; }
        }
      `}} />
    </div>
  );
};
