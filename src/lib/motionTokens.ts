/**
 * Centralized Motion Tokens
 * Design System: Craft Soft Editorial × Cinematic Motion
 */
export const motionTokens = {
  duration: {
    instant: "120ms",
    fast: "200ms",
    ui: "280ms",
    section: "600ms",
    reveal: "700ms",
    ambient: "16s",
    float: "7s",
    cloud: "32s",
  },
  easing: {
    editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
    soft: "cubic-bezier(0.25, 0.8, 0.25, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    float: "ease-in-out",
  },
  distance: {
    hoverLift: "-4px",
    hoverLiftLarge: "-6px",
    revealY: "24px",
    floatY: "6px",
  },
  scale: {
    hoverCard: 1.015,
    hoverMedia: 1.02,
    buttonActive: 0.98,
  },
  tilt: {
    maxRotateX: 1.5, // degrees
    maxRotateY: 2.0, // degrees
  },
  spotlight: {
    radius: "380px",
    color: "rgba(169, 216, 242, 0.16)",
    colorTeal: "rgba(66, 126, 138, 0.12)",
    colorLavender: "rgba(238, 231, 250, 0.18)",
  },
  simulation: {
    smartParkingCycle: 6500, // ms
    chessCycle: 8500, // ms
    greenSmCycle: 5500, // ms
  },
} as const;
