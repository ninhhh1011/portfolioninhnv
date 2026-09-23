"use client";

import React from "react";
import { Server, Layout, ShieldCheck, Cpu } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { AccordionWrapper } from "@/components/ui/AccordionWrapper";
import { portfolioData, SkillCategory } from "@/content/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SpotlightSurface } from "@/components/ui/SpotlightSurface";

export const SkillsSection: React.FC = () => {
  const { skillCategories, aiPractices } = portfolioData;

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Server className="w-5 h-5 text-[#176B87]" />;
      case 1:
        return <Layout className="w-5 h-5 text-[#176B87]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#176B87]" />;
    }
  };

  const getSpotlightVariant = (index: number) => {
    switch (index) {
      case 0:
        return "sky" as const;
      case 1:
        return "teal" as const;
      default:
        return "lavender" as const;
    }
  };

  return (
    <section id="skills" className="relative py-20 md:py-28 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Decorative Technical Ambience Grid (Subtle low-opacity geometry) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] -z-10"
        style={{
          backgroundImage:
            "radial-gradient(#183B4E 1px, transparent 1px), radial-gradient(#176B87 1px, #FCF9F7 1px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 14px 14px",
        }}
        aria-hidden="true"
      />

      {/* Section Header */}
      <SectionReveal direction="up" delayMs={50}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#176B87] bg-[#D7EAF0]/60 px-3.5 py-1 rounded-full border border-[rgba(23,107,135,0.15)] shadow-xs">
            Kỹ năng chuyên môn
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B4E] mt-4 mb-3 tracking-tight">
            Năng lực kỹ thuật
          </h2>
          <p className="text-sm md:text-base text-[#526779] leading-relaxed">
            Tập hợp các công nghệ và quy chuẩn chất lượng mã nguồn được ứng dụng xuyên suốt các dự án.
          </p>
        </div>
      </SectionReveal>

      {/* 3 Interactive Capability Field Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {skillCategories.map((cat: SkillCategory, index: number) => (
          <SectionReveal key={cat.title} direction="up" delayMs={index * 120}>
            <SpotlightSurface
              variant={getSpotlightVariant(index)}
              className="rounded-3xl h-full"
            >
              <Card
                hoverable
                className="p-6 md:p-8 flex flex-col justify-between h-full border-[rgba(66,126,138,0.18)] shadow-[0_8px_30px_rgba(24,59,78,0.05)] hover:shadow-[0_16px_40px_rgba(24,59,78,0.09)] transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <CardHeader>
                    <div className="w-11 h-11 rounded-2xl bg-[#D7EAF0] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-2xs">
                      {getCategoryIcon(index)}
                    </div>
                    <CardTitle className="text-xl md:text-2xl group-hover:text-[#176B87] transition-colors">
                      {cat.title}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm mt-1.5 leading-relaxed">
                      {cat.description}
                    </CardDescription>
                  </CardHeader>
                </div>

                <CardContent className="mt-5 pt-4 border-t border-[rgba(66,126,138,0.1)]">
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <Chip
                        key={skill}
                        variant="neutral"
                        size="sm"
                        className="hover:-translate-y-0.5 hover:bg-white hover:border-[#176B87]/30 transition-all cursor-default"
                      >
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SpotlightSurface>
          </SectionReveal>
        ))}
      </div>

      {/* Applied AI Practice Sub-section with Orchestration Atmosphere */}
      <div className="relative max-w-4xl mx-auto mt-20">
        {/* Subtle Lavender + Teal atmospheric glow behind AI section */}
        <div
          className="absolute -inset-4 bg-gradient-to-r from-[#EEE7FA]/30 via-[#D7EAF0]/20 to-[#EEE7FA]/30 rounded-3xl blur-2xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        <SectionReveal direction="up" delayMs={100}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEE7FA] text-[#553C9A] text-xs font-semibold mb-3 border border-[#D6BCFA]/60 shadow-xs">
              <Cpu className="w-3.5 h-3.5" />
              <span>Thực hành kỹ thuật nâng cao</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#183B4E] tracking-tight">
              Thực hành AI ứng dụng
            </h3>
            <p className="text-sm text-[#526779] max-w-xl mx-auto mt-2 leading-relaxed">
              Thực hành kiểm soát agent, mô hình ngôn ngữ và hệ thống truy xuất thông tin có kiểm thử độ tin cậy.
            </p>
          </div>
        </SectionReveal>

        {/* HeroUI Accordion with System-level motion */}
        <SectionReveal direction="up" delayMs={200}>
          <AccordionWrapper items={aiPractices} />
        </SectionReveal>
      </div>
    </section>
  );
};
