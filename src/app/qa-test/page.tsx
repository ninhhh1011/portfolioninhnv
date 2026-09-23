"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { AccordionWrapper } from "@/components/ui/AccordionWrapper";
import { MobileNavDrawer } from "@/components/ui/MobileNavDrawer";
import { portfolioData } from "@/content/portfolio";

export default function QATestPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12 bg-[#FCF9F7]">
      <div>
        <h1 className="font-serif text-3xl text-[#183B4E]">QA Test Suite — Soft Sky Portfolio Components</h1>
        <p className="text-sm text-[#526779]">Kiểm tra toàn bộ states, contrast và styles của component.</p>
      </div>

      {/* Button states */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl text-[#183B4E]">1. Button Variants & States</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" size="lg">Primary Large</Button>
          <Button variant="primary" size="md">Primary Medium</Button>
          <Button variant="primary" size="sm">Primary Small</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      {/* Chip variants */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl text-[#183B4E]">2. Chip Pastel Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Chip variant="sky">Sky Blue</Chip>
          <Chip variant="teal">Teal Primary</Chip>
          <Chip variant="lavender">Lavender</Chip>
          <Chip variant="mint">Mint Green</Chip>
          <Chip variant="peach">Warm Peach</Chip>
          <Chip variant="neutral">Neutral Warm</Chip>
        </div>
      </section>

      {/* Card & Modal */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl text-[#183B4E]">3. Card & Project Modal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card hoverable>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <CardTitle>Card Hoverable</CardTitle>
                <Chip variant="sky">Active</Chip>
              </div>
              <CardDescription>Kiểm tra shadow và border nổi</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#526779]">Nội dung card kiểm tra font Sans và độ tương phản.</p>
            </CardContent>
            <CardFooter>
              <ProjectModal
                project={portfolioData.projects[0]}
                trigger={
                  <Button variant="outline" size="sm">
                    Mở Modal Chi tiết
                  </Button>
                }
              />
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Accordion */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl text-[#183B4E]">4. Accordion AI Practice</h2>
        <AccordionWrapper items={portfolioData.aiPractices} />
      </section>

      {/* Mobile Drawer */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl text-[#183B4E]">5. Mobile Navigation Drawer</h2>
        <div className="flex items-center gap-4">
          <MobileNavDrawer
            navLinks={[
              { label: "Dự án", href: "#projects" },
              { label: "Kinh nghiệm", href: "#experience" },
              { label: "Năng lực", href: "#skills" },
              { label: "Giới thiệu", href: "#about" },
            ]}
            contactHref="#contact"
          />
          <span className="text-sm text-[#526779]">Nhấn icon menu để mở Drawer</span>
        </div>
      </section>
    </div>
  );
}
