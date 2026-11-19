"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Calendar, CheckCircle2, Activity, Radio, Compass, Gauge, Trophy, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { portfolioData, ExperienceItem } from "@/content/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SpotlightSurface } from "@/components/ui/SpotlightSurface";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useDocumentVisibility } from "@/hooks/useDocumentVisibility";

const PIPELINE_STEPS = [
  {
    step: 1,
    id: "gps",
    title: "GPS Ping",
    desc: "Nhận tọa độ xe realtime",
    detail: "lat/lon · 60s ping",
    metric: "100% sync",
    icon: Radio,
  },
  {
    step: 2,
    id: "match",
    title: "Map Matching",
    desc: "Khớp lưới đường PostGIS",
    detail: "OSRM nearest line",
    metric: "99.4% match",
    icon: Compass,
  },
  {
    step: 3,
    id: "detour",
    title: "Detour & ETA",
    desc: "Tính lộ trình phụ trội",
    detail: "+2.4km · 6 phút ETA",
    metric: "< 80ms query",
    icon: Gauge,
  },
  {
    step: 4,
    id: "ranking",
    title: "Station Ranking",
    desc: "Lọc & xếp hạng tối ưu",
    detail: "Pin & khoảng cách",
    metric: "Rank #1 top pick",
    icon: Trophy,
  },
];

export const ExperienceSection: React.FC = () => {
  const { experience } = portfolioData;
  const prefersReduced = useReducedMotionSafe();
  const isDocVisible = useDocumentVisibility();

  // 4-step sequential lighting pipeline: cycles 0 -> 1 -> 2 -> 3 every 2 seconds
  const [pipelineStep, setPipelineStep] = useState(0);

  useEffect(() => {
    if (prefersReduced || !isDocVisible) return;

    const interval = setInterval(() => {
      setPipelineStep((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, [prefersReduced, isDocVisible]);

  return (
    <section id="experience" className="py-20 md:py-28 px-4 max-w-5xl mx-auto relative overflow-hidden">
      {/* Anchor alias */}
      <div id="kinh-nghiem" className="absolute -top-24 pointer-events-none" />

      {/* Section Header */}
      <SectionReveal direction="up" delayMs={50}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#176B87] bg-[#D7EAF0]/60 px-3.5 py-1 rounded-full border border-[rgba(23,107,135,0.15)] shadow-xs">
            Kinh nghiệm & Thực tập
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B4E] mt-4 mb-3 tracking-tight">
            Hành trình chuyên môn
          </h2>
          <p className="text-sm md:text-base text-[#526779] leading-relaxed">
            Kinh nghiệm thực tập chuyên sâu tại các môi trường công nghệ thực tế, tập trung vào backend, hạ tầng định tuyến và tích hợp AI.
          </p>
        </div>
      </SectionReveal>

      {/* Cybernetic Animated Timeline Spine */}
      <div className="relative pl-7 md:pl-9 space-y-12">
        {/* Animated vertical spine with glowing pulse */}
        <div className="absolute left-2.5 md:left-3 top-4 bottom-4 w-[3px] bg-gradient-to-b from-[#176B87] via-[#427E8A] to-[#D7EAF0] rounded-full overflow-hidden">
          {/* Traveling Photon Pulse along the timeline wire */}
          {!prefersReduced && (
            <div
              className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-white to-[#64B5F6] blur-[2px] animate-[gentleDrift_4s_linear_infinite]"
              style={{ filter: "drop-shadow(0 0 6px #10B981)" }}
            />
          )}
        </div>

        {experience.map((exp: ExperienceItem, expIndex: number) => {
          const isVinSmartFuture = exp.id === "vinsmartfuture";

          return (
            <SectionReveal
              key={exp.id}
              direction="up"
              delayMs={expIndex * 150}
              className="relative group"
            >
              {/* Timeline node with soft glowing pulse and radar shockwave */}
              <div className="absolute -left-[31px] md:-left-[39px] top-6 w-5 h-5 rounded-full bg-white border-4 border-[#176B87] shadow-[0_0_14px_rgba(23,107,135,0.45)] group-hover:scale-125 group-hover:border-[#427E8A] transition-all duration-300 z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              </div>

              {/* Horizontal connector line */}
              <div className="absolute -left-[14px] top-[32px] w-3 h-[2px] bg-[#176B87]/50 pointer-events-none" />

              <SpotlightSurface variant="teal" className="rounded-3xl">
                <Card
                  hoverable
                  className="p-6 md:p-8 border-[rgba(66,126,138,0.22)] shadow-[0_10px_35px_rgba(24,59,78,0.06)] hover:shadow-[0_14px_35px_rgba(24,59,78,0.08)] transition-all duration-300 hover:-translate-y-0.5 bg-white/95 backdrop-blur-xs"
                >
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="p-2 rounded-xl bg-[#D7EAF0]/80 text-[#176B87] shadow-2xs border border-[#176B87]/15 transition-transform duration-300 group-hover:scale-105"
                        >
                          <Briefcase className="w-4 h-4" />
                        </span>
                        <CardTitle className="text-xl md:text-2xl text-[#183B4E] transition-colors">
                          {exp.company}
                        </CardTitle>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#526779] bg-[#FCF9F7] px-3 py-1 rounded-full border border-[rgba(66,126,138,0.14)] font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#176B87]" />
                          {exp.period}
                        </span>
                        {exp.isInternship && (
                          <Chip variant="mint" size="sm">
                            Thực tập
                          </Chip>
                        )}
                      </div>
                    </div>

                    <p className="text-sm md:text-base font-semibold text-[#176B87] mt-1 flex items-center gap-2">
                      <span>{exp.role}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#176B87]" />
                      <span className="text-xs font-mono font-normal text-[#526779]">VinUni AI Research</span>
                    </p>
                  </CardHeader>

                  <CardContent>
                    {/* SƠ ĐỒ PIPELINE 4 BƯỚC CÓ ĐÈN TÍN HIỆU TUẦN TỰ & CYBER CIRCUIT (VinSmartFuture) */}
                    {isVinSmartFuture && (
                      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#F3F8FA] via-white to-[#F0F7F9] border border-[rgba(23,107,135,0.25)] shadow-xs relative overflow-hidden">
                        {/* Background subtle circuit grid lines */}
                        <div
                          className="absolute inset-0 opacity-[0.04] pointer-events-none"
                          style={{
                            backgroundImage: "linear-gradient(#176B87 1px, transparent 1px), linear-gradient(90deg, #176B87 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                          }}
                        />

                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[rgba(23,107,135,0.12)] relative z-10">
                          <div className="flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-[#176B87] animate-pulse" />
                            <h4 className="text-xs md:text-sm font-bold font-serif text-[#183B4E]">
                              Kiến trúc Data Pipeline định tuyến trạm sạc
                            </h4>
                          </div>
                          <span className="font-mono text-[10px] text-[#176B87] bg-white/90 px-2.5 py-0.5 rounded-full border border-[rgba(23,107,135,0.2)] flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                            <span>Vòng quét realtime · 2.0s</span>
                          </span>
                        </div>

                        {/* 4 sequential steps with interactive cyber glow */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 relative z-10">
                          {PIPELINE_STEPS.map((pipe, idx) => {
                            const isActive = pipelineStep === idx;
                            const IconComponent = pipe.icon;

                            return (
                              <div
                                key={pipe.id}
                                className={`relative p-3 rounded-xl border text-left transition-all duration-400 flex flex-col justify-between ${
                                  isActive
                                    ? "bg-white border-[#176B87] shadow-[0_6px_22px_rgba(23,107,135,0.22)] scale-[1.03] ring-2 ring-[#176B87]/30 z-10"
                                    : "bg-white/70 border-gray-200/90 opacity-75 hover:opacity-100"
                                }`}
                              >
                                <div>
                                  {/* Step header with signal light indicator */}
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span
                                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                                        isActive
                                          ? "bg-[#176B87] text-white shadow-2xs"
                                          : "bg-gray-100 text-[#526779]"
                                      }`}
                                    >
                                      0{pipe.step}
                                    </span>

                                    {/* Sequential Signal Pulse Light */}
                                    <div className="flex items-center gap-1">
                                      {isActive && (
                                        <span className="relative flex h-2.5 w-2.5">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]" />
                                        </span>
                                      )}
                                      {!isActive && (
                                        <span className="w-2 h-2 rounded-full bg-gray-300" />
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5 mt-1">
                                    <IconComponent
                                      className={`w-3.5 h-3.5 transition-colors ${
                                        isActive ? "text-[#176B87]" : "text-[#526779]"
                                      }`}
                                    />
                                    <span
                                      className={`text-xs font-bold transition-colors ${
                                        isActive ? "text-[#183B4E]" : "text-[#526779]"
                                      }`}
                                    >
                                      {pipe.title}
                                    </span>
                                  </div>

                                  <p className="text-[11px] text-[#526779] mt-1 leading-snug">
                                    {pipe.desc}
                                  </p>
                                </div>

                                <div className="mt-2.5 pt-1.5 border-t border-gray-100/90 flex items-center justify-between font-mono text-[9.5px]">
                                  <span className="text-[#526779]">{pipe.detail}</span>
                                  <span className={`font-bold ${isActive ? "text-[#10B981]" : "text-[#176B87]"}`}>
                                    {pipe.metric}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Bullet points */}
                    <ul className="space-y-3 mb-6">
                      {exp.bullets.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm md:text-base text-[#183B4E] group/item"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#176B87] mt-1 shrink-0 transition-transform group-hover/item:scale-125 group-hover/item:text-[#10B981]" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-[rgba(66,126,138,0.12)]">
                      {exp.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          variant="neutral"
                          size="sm"
                          className="hover:-translate-y-0.5 hover:shadow-2xs transition-all"
                        >
                          {tech}
                        </Chip>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SpotlightSurface>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
};
