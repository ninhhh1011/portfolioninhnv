import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { AmbientAtmosphere } from "@/components/visuals/AmbientAtmosphere";
import { CloudVeilTransition } from "@/components/visuals/CloudVeilTransition";
import { PortfolioInteractionProvider } from "@/context/PortfolioInteractionContext";

export default function Home() {
  return (
    <PortfolioInteractionProvider>
      <div className="relative min-h-screen flex flex-col bg-[#FCF9F7] text-[#183B4E]">
        {/* Global Layered Cinematic Atmosphere */}
        <AmbientAtmosphere />

        {/* Floating Navigation */}
        <Navbar />

        {/* Main Landing Content */}
        <main className="flex-1">
          {/* Section B: Hero with Terminal Backdrop, Cursor Reveal Lens & Living Workspace */}
          <HeroSection />

          {/* Cloud Veil Transition 1 */}
          <CloudVeilTransition variant="sky-to-cream" />

          {/* Section C: Selected Projects with Interactive Storytelling */}
          <ProjectsSection />

          {/* Cloud Veil Transition 2 */}
          <CloudVeilTransition variant="cream-to-lavender" />

          {/* Section D: Experience with Traced Technical Timeline */}
          <ExperienceSection />

          {/* Section E: Skills & Applied AI Practice with Capability Field */}
          <SkillsSection />

          {/* Cloud Veil Transition 3 */}
          <CloudVeilTransition variant="lavender-to-sky" />

          {/* Section F: About, Education, Training with Editorial Storytelling */}
          <AboutSection />
        </main>

        {/* Cloud Veil Transition 4 */}
        <CloudVeilTransition variant="open-sky" />

        {/* Section G: Contact & Footer with Open-Sky Finale */}
        <ContactSection />
      </div>
    </PortfolioInteractionProvider>
  );
}
