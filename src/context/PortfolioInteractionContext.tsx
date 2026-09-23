"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type ProjectContextType = "none" | "smart-parking" | "chess" | "green-sm";

export interface SpeechBubbleState {
  isOpen: boolean;
  message: string;
  step: number;
}

const EASTER_EGG_MESSAGES = [
  "Chào bạn, mình là Ninh.",
  "Rê chuột vào bàn làm việc hoặc chiếc đèn để đổi màu Focus Mode nhé.",
  "Thử khám phá các dự án bên phải nhé.",
  "Green SM là phần backend mình đầu tư nhiều công sức nhất.",
];

interface PortfolioInteractionContextType {
  activeProject: ProjectContextType;
  setActiveProject: (project: ProjectContextType) => void;
  focusMode: boolean;
  toggleFocusMode: () => void;
  setFocusMode: (val: boolean) => void;
  speechBubble: SpeechBubbleState;
  triggerNextSpeechBubble: () => void;
  openFirstSpeechBubble: () => void;
  closeSpeechBubble: () => void;
}

const PortfolioInteractionContext = createContext<PortfolioInteractionContextType | null>(null);

export const PortfolioInteractionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeProject, setActiveProject] = useState<ProjectContextType>("none");
  const [focusMode, setFocusMode] = useState(false);
  const [speechBubble, setSpeechBubble] = useState<SpeechBubbleState>({
    isOpen: false,
    message: EASTER_EGG_MESSAGES[0],
    step: 0,
  });

  const toggleFocusMode = useCallback(() => {
    setFocusMode((prev) => !prev);
  }, []);

  const openFirstSpeechBubble = useCallback(() => {
    setSpeechBubble({
      isOpen: true,
      message: EASTER_EGG_MESSAGES[0],
      step: 0,
    });
  }, []);

  const triggerNextSpeechBubble = useCallback(() => {
    setSpeechBubble((prev) => {
      const nextStep = prev.isOpen ? (prev.step + 1) % EASTER_EGG_MESSAGES.length : prev.step;
      return {
        isOpen: true,
        message: EASTER_EGG_MESSAGES[nextStep],
        step: nextStep,
      };
    });
  }, []);

  const closeSpeechBubble = useCallback(() => {
    setSpeechBubble((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Auto-dismiss speech bubble after 8.5 seconds
  useEffect(() => {
    if (!speechBubble.isOpen) return;
    const timer = setTimeout(() => {
      closeSpeechBubble();
    }, 8500);
    return () => clearTimeout(timer);
  }, [speechBubble.isOpen, speechBubble.step, closeSpeechBubble]);

  return (
    <PortfolioInteractionContext.Provider
      value={{
        activeProject,
        setActiveProject,
        focusMode,
        toggleFocusMode,
        setFocusMode,
        speechBubble,
        triggerNextSpeechBubble,
        openFirstSpeechBubble,
        closeSpeechBubble,
      }}
    >
      {children}
    </PortfolioInteractionContext.Provider>
  );
};

export function usePortfolioInteraction() {
  const ctx = useContext(PortfolioInteractionContext);
  if (!ctx) {
    throw new Error(
      "usePortfolioInteraction must be used within a PortfolioInteractionProvider"
    );
  }
  return ctx;
}
