"use client";

import React, { useState } from "react";
import { GraduationCap, Award, Compass, Sparkles, MapPin, Code2 } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { portfolioData, EducationItem } from "@/content/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SpotlightSurface } from "@/components/ui/SpotlightSurface";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export const AboutSection: React.FC = () => {
  const { education } = portfolioData;
  const prefersReduced = useReducedMotionSafe();
  const [isFlipped, setIsFlipped] = useState(false);

  const getEducationIcon = (index: number) => {
    switch (index) {
      case 0:
        return <GraduationCap className="w-5 h-5 text-[#176B87]" />;
      case 1:
        return <Compass className="w-5 h-5 text-[#176B87]" />;
      case 2:
        return <Sparkles className="w-5 h-5 text-[#176B87]" />;
      default:
        return <Award className="w-5 h-5 text-[#176B87]" />;
    }
  };

  return (
    <section id="about" className="py-20 md:py-28 px-4 max-w-5xl mx-auto overflow-hidden">
      {/* Editorial layout: 2 columns with generous whitespace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Narrative voice (5 cols) */}
        <SectionReveal direction="right" delayMs={60} className="lg:col-span-5 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#176B87] bg-[#D7EAF0]/60 px-3.5 py-1 rounded-full border border-[rgba(23,107,135,0.15)] shadow-xs">
            Giới thiệu & Định hướng
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B4E] tracking-tight leading-[1.15]">
            Học hỏi qua sản phẩm thực chiến.
          </h2>

          <div className="space-y-4 text-[#526779] text-base leading-relaxed">
            <p>
              Tôi tiếp cận việc lập trình không chỉ từ cú pháp hay công nghệ mới, mà bắt đầu từ trải nghiệm người dùng cuối và độ vững chắc của hệ thống bên dưới.
            </p>
            <p>
              Trong quá trình học tại HaUI và tham gia chương trình AI thực chiến tại VinUni, tôi rèn luyện tư duy kiểm thử tự động, tích hợp dịch vụ thực tế và tối ưu hóa luồng tương tác mượt mà.
            </p>
          </div>

          {/* Signature Identity Element with 3D Gyroscope / Coin-Flip Badge */}
          <div className="pt-4 border-t border-[rgba(66,126,138,0.14)] relative">
            <div className="flex items-center gap-4 group">
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                onClick={() => setIsFlipped((prev) => !prev)}
                data-magnetic="true"
                style={{ perspective: "600px" }}
              >
                {/* Soft ambient halo */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#D7EAF0] via-[#EEE7FA] to-[#A9D8F2] blur-xs group-hover:scale-125 transition-transform duration-500 opacity-70" />

                {/* 3D Coin-flip disc */}
                <div
                  className="relative w-12 h-12 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped && !prefersReduced ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front Side: "N" */}
                  <div
                    className="absolute inset-0 rounded-full bg-white border border-[rgba(66,126,138,0.25)] flex items-center justify-center font-serif text-[#176B87] font-bold text-xl shadow-xs"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    N
                  </div>

                  {/* Back Side: Cyber Code Icon */}
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[#176B87] to-[#10B981] text-white flex items-center justify-center shadow-xs"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <Code2 className="w-5 h-5 animate-pulse" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-[#183B4E] group-hover:text-[#176B87] transition-colors flex items-center gap-1.5">
                  <span>Nguyễn Văn Ninh</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                </h4>
                <p className="text-xs text-[#526779] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#176B87]" />
                  <span>Hà Nội, Việt Nam</span>
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Right Column: Education & Training milestones (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <SectionReveal direction="left" delayMs={60}>
            <h3 className="font-serif text-2xl text-[#183B4E] mb-6 flex items-center gap-2.5">
              <span>Học vấn & Đào tạo</span>
              <span className="text-xs font-sans text-[#176B87] bg-[#D7EAF0]/60 px-2.5 py-0.5 rounded-full font-medium border border-[rgba(23,107,135,0.14)] shadow-2xs">
                Chính thức
              </span>
            </h3>
          </SectionReveal>

          <div className="space-y-4">
            {education.map((item: EducationItem, idx: number) => (
              <SectionReveal key={item.institution} direction="left" delayMs={100 + idx * 100}>
                <SpotlightSurface variant="subtle" className="rounded-2xl">
                  <div className="relative bg-white/95 backdrop-blur-xs rounded-2xl p-5 md:p-6 border border-[rgba(66,126,138,0.18)] shadow-xs hover:border-[rgba(66,126,138,0.35)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-start gap-4 overflow-hidden group/edu">
                    {/* Subtle iridescent corner reflection */}
                    <div
                      className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-bl from-[#A9D8F2]/30 via-transparent to-transparent rounded-full opacity-0 group-hover/edu:opacity-100 transition-opacity duration-500 pointer-events-none"
                      aria-hidden="true"
                    />

                    <div
                      className="w-10 h-10 rounded-xl bg-[#D7EAF0]/70 flex items-center justify-center shrink-0 mt-0.5 text-[#176B87] shadow-2xs group-hover/edu:bg-[#176B87] group-hover/edu:text-white transition-colors duration-300"
                      data-magnetic="true"
                    >
                      {getEducationIcon(idx)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h4 className="font-serif text-base md:text-lg font-bold text-[#183B4E] group-hover/edu:text-[#176B87] transition-colors">
                          {item.institution}
                        </h4>
                        <span className="text-xs text-[#526779] font-medium bg-[#FCF9F7] px-2.5 py-0.5 rounded-full border border-[rgba(66,126,138,0.14)]">
                          {item.period}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-[#176B87] mb-1">
                        {item.roleOrDegree}
                      </p>

                      {item.description && (
                        <p className="text-xs md:text-sm text-[#526779] leading-relaxed mt-1">
                          {item.description}
                        </p>
                      )}

                      {item.badge && (
                        <div className="mt-2.5">
                          <Chip variant="neutral" size="sm" data-magnetic="true">
                            {item.badge}
                          </Chip>
                        </div>
                      )}
                    </div>
                  </div>
                </SpotlightSurface>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
