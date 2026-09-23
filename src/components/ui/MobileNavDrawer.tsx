"use client";

import React, { useState } from "react";
import { Drawer } from "@heroui/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "./Button";

export interface MobileNavDrawerProps {
  navLinks: { label: string; href: string }[];
  contactHref: string;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ navLinks, contactHref }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const elem = document.querySelector(href);
      if (elem) elem.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <Drawer.Root isOpen={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger
        aria-label="Mở menu"
        className="md:hidden p-2 rounded-full text-[#183B4E] hover:bg-[#D7EAF0]/50 transition-colors cursor-pointer border border-[rgba(66,126,138,0.2)]"
      >
        <Menu className="w-5 h-5" />
        <span className="sr-only">Mở menu</span>
      </Drawer.Trigger>

      <Drawer.Backdrop
        className="fixed inset-0 z-50 bg-[rgba(24,59,78,0.35)] backdrop-blur-md transition-all md:hidden"
        isDismissable
      >
        <Drawer.Content
          placement="right"
          className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#FCF9F7] shadow-2xl border-l border-[rgba(66,126,138,0.2)] p-6 flex flex-col z-50 overflow-y-auto"
        >
          <Drawer.Dialog className="flex flex-col h-full justify-between focus:outline-none relative">
            <div>
              <Drawer.Header className="flex flex-row items-center justify-between pb-6 border-b border-[rgba(66,126,138,0.14)] relative">
                <Drawer.Heading className="font-serif text-2xl font-normal text-[#183B4E]">
                  Ninh<span className="text-[#176B87]">.</span>
                </Drawer.Heading>
                <Drawer.CloseTrigger
                  aria-label="Đóng menu"
                  className="static p-2 rounded-full text-[#526779] hover:text-[#183B4E] hover:bg-[#D7EAF0]/40 transition-colors cursor-pointer border border-[rgba(66,126,138,0.15)]"
                >
                  <X className="w-5 h-5" />
                  <span className="sr-only">Đóng menu</span>
                </Drawer.CloseTrigger>
              </Drawer.Header>

              <Drawer.Body className="py-6">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      type="button"
                      className="w-full flex items-center justify-between p-3.5 rounded-2xl text-base font-medium text-[#183B4E] hover:bg-white hover:text-[#176B87] hover:shadow-sm transition-all text-left cursor-pointer"
                      onClick={() => handleNavigate(link.href)}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50" />
                    </button>
                  ))}
                </nav>
              </Drawer.Body>
            </div>

            <Drawer.Footer className="pt-6 border-t border-[rgba(66,126,138,0.14)] flex flex-col gap-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full shadow-[0_4px_16px_rgba(23,107,135,0.2)]"
                onClick={() => handleNavigate(contactHref)}
              >
                Liên hệ
              </Button>
              <p className="text-center text-xs text-[#526779]">
                Nguyễn Văn Ninh · Hà Nội, Việt Nam
              </p>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer.Root>
  );
};
