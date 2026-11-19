"use client";

import React from "react";
import { ExternalLink, Info, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { GithubIcon } from "@/components/ui/Icons";
import { SmartParkingIllustration } from "@/components/visuals/SmartParkingIllustration";
import { ChessIllustration } from "@/components/visuals/ChessIllustration";
import { ProjectItem } from "@/content/portfolio";
import { SpotlightSurface } from "@/components/ui/SpotlightSurface";
import { HolographicTiltCard } from "@/components/ui/HolographicTiltCard";
import { usePortfolioInteraction, ProjectContextType } from "@/context/PortfolioInteractionContext";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  isActive?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isActive = false,
}) => {
  const { setActiveProject } = usePortfolioInteraction();
  const isEven = index % 2 === 0;

  return (
    <HolographicTiltCard
      maxTilt={isActive ? 8 : 0}
      glareIntensity={isActive ? 0.35 : 0}
      className="w-full rounded-3xl"
    >
      <SpotlightSurface
        variant={isEven ? "sky" : "lavender"}
        className="rounded-3xl"
        onMouseEnter={() => {
          if (isActive) setActiveProject(project.id as ProjectContextType);
        }}
        onMouseLeave={() => setActiveProject("none")}
      >
        <Card
          hoverable={isActive}
          className={`overflow-hidden border border-[rgba(66,126,138,0.22)] p-5 sm:p-7 md:p-8 shadow-[0_16px_45px_rgba(24,59,78,0.08)] backdrop-blur-md bg-white/95 transition-all duration-300 ${
            isActive ? "ring-2 ring-[#176B87]/30" : ""
          }`}
        >
          <CardContent className="space-y-0 p-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
              {/* Visual Preview (7 cols on lg) */}
              <div
                className={`lg:col-span-7 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                } w-full transition-transform duration-500 ease-out`}
                style={{ transform: isActive ? "translateZ(20px)" : "none" }}
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
                  isEven ? "lg:order-1" : "lg:order-2"
                } flex flex-col justify-center`}
                style={{ transform: isActive ? "translateZ(30px)" : "none" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Chip variant="sky" size="sm">
                    {project.type}
                  </Chip>
                  <span className="text-xs text-[#526779] font-medium">{project.year}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#183B4E] mb-1.5 tracking-tight">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm font-medium text-[#176B87] mb-2.5">
                  {project.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#526779] leading-relaxed mb-4 line-clamp-3 md:line-clamp-none">
                  {project.description}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech) => (
                    <Chip key={tech} variant="neutral" size="sm">
                      {tech}
                    </Chip>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {project.isProprietary ? (
                    <>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#F3F1EE] text-[#526779] border border-[rgba(66,126,138,0.2)] shadow-2xs">
                        <Lock className="w-3.5 h-3.5 text-[#176B87]" />
                        <span>Dự án nội bộ</span>
                      </div>

                      <ProjectModal
                        project={project}
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
                      {project.demoUrl && (
                        <Button
                          variant="primary"
                          size="sm"
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Mở Demo</span>
                        </Button>
                      )}

                      {project.githubUrl && (
                        <Button
                          variant="secondary"
                          size="sm"
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-1.5"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Mã nguồn</span>
                        </Button>
                      )}

                      <ProjectModal
                        project={project}
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
            </div>
          </CardContent>
        </Card>
      </SpotlightSurface>
    </HolographicTiltCard>
  );
};
