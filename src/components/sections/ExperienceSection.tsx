"use client";

import React from "react";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { portfolioData, ExperienceItem } from "@/content/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SpotlightSurface } from "@/components/ui/SpotlightSurface";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { VinSystemDiagram } from "@/components/visuals/VinSystemDiagram";

export const ExperienceSection: React.FC = () => {
  const { experience } = portfolioData;
  const prefersReduced = useReducedMotionSafe();
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
                      {exp.brand && <><span className="w-1.5 h-1.5 rounded-full bg-[#176B87]" /><span className="text-xs font-mono font-normal text-[#526779]">{exp.brand}</span></>}
                    </p>
                  </CardHeader>

                  <CardContent>
                    {isVinSmartFuture && <VinSystemDiagram />}

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
