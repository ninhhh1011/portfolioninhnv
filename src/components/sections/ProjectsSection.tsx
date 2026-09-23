"use client";

import React from "react";
import { ExternalLink, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { GithubIcon } from "@/components/ui/Icons";
import { SmartParkingIllustration } from "@/components/visuals/SmartParkingIllustration";
import { ChessIllustration } from "@/components/visuals/ChessIllustration";
import { portfolioData, ProjectItem } from "@/content/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SpotlightSurface } from "@/components/ui/SpotlightSurface";
import { usePortfolioInteraction, ProjectContextType } from "@/context/PortfolioInteractionContext";

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;
  const { setActiveProject } = usePortfolioInteraction();

  return (
    <section id="projects" className="py-20 md:py-28 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <SectionReveal direction="up" delayMs={50}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#176B87] bg-[#D7EAF0]/60 px-3.5 py-1 rounded-full border border-[rgba(23,107,135,0.15)] shadow-xs">
            Sản phẩm tiêu biểu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B4E] mt-4 mb-3 tracking-tight">
            Dự án hoàn chỉnh
          </h2>
          <p className="text-sm md:text-base text-[#526779] leading-relaxed">
            Tập trung vào luồng sử dụng hoàn chỉnh, tối ưu trải nghiệm người dùng và tích hợp công nghệ thực tế.
          </p>
        </div>
      </SectionReveal>

      {/* Projects List - Alternating Layout with Spotlight and Cinematic Depth */}
      <div className="space-y-16 md:space-y-24">
        {projects.map((project: ProjectItem, index: number) => {
          const isEven = index % 2 === 0;

          return (
            <SectionReveal key={project.id} direction="up" delayMs={index * 120}>
              <SpotlightSurface
                variant={isEven ? "sky" : "lavender"}
                className="rounded-3xl"
                onMouseEnter={() => setActiveProject(project.id as ProjectContextType)}
                onMouseLeave={() => setActiveProject("none")}
                onFocus={() => setActiveProject(project.id as ProjectContextType)}
                onBlur={() => setActiveProject("none")}
              >
                <Card
                  hoverable
                  className="overflow-hidden border border-[rgba(66,126,138,0.18)] p-6 md:p-10 shadow-[0_12px_40px_rgba(24,59,78,0.06)] hover:shadow-[0_20px_50px_rgba(24,59,78,0.1)] transition-all duration-300 hover:-translate-y-1.5"
                >
                  <CardContent className="space-y-0">
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${
                        !isEven ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Visual Preview (7 cols on lg) with subtle scale on hover */}
                      <div
                        className={`lg:col-span-7 ${
                          !isEven ? "lg:order-2" : "lg:order-1"
                        } w-full transition-transform duration-500 ease-out group-hover:scale-[1.018]`}
                      >
                        {project.previewType === "smart-parking" ? (
                          <SmartParkingIllustration />
                        ) : (
                          <ChessIllustration />
                        )}
                      </div>

                      {/* Project Info (5 cols on lg) */}
                      <div
                        className={`lg:col-span-5 ${
                          !isEven ? "lg:order-1" : "lg:order-2"
                        } flex flex-col justify-center`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Chip variant="sky" size="sm">
                            {project.type}
                          </Chip>
                          <span className="text-xs text-[#526779] font-medium">{project.year}</span>
                        </div>

                        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#183B4E] mb-2 tracking-tight group-hover:text-[#176B87] transition-colors duration-200">
                          {project.title}
                        </h3>

                        <p className="text-xs md:text-sm font-medium text-[#176B87] mb-3">
                          {project.subtitle}
                        </p>

                        <p className="text-sm md:text-base text-[#526779] leading-relaxed mb-5">
                          {project.description}
                        </p>

                        {/* Tech chips with subtle cascade */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech) => (
                            <Chip
                              key={tech}
                              variant="neutral"
                              size="sm"
                              className="hover:-translate-y-0.5 transition-transform"
                            >
                              {tech}
                            </Chip>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <Button
                            variant="primary"
                            size="md"
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-2 group/btn"
                          >
                            <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            <span>Mở Demo</span>
                          </Button>

                          <Button
                            variant="secondary"
                            size="md"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-2"
                          >
                            <GithubIcon className="w-4 h-4" />
                            <span>Mã nguồn</span>
                          </Button>

                          <ProjectModal
                            project={project}
                            trigger={
                              <Button variant="outline" size="md" className="gap-1.5">
                                <Info className="w-4 h-4 text-[#176B87]" />
                                <span>Chi tiết</span>
                              </Button>
                            }
                          />
                        </div>
                      </div>
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
