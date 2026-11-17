# High-Intensity Interactive FX System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio into an elite frontend engineering showcase with multi-layered 3D perspective, interactive cloud physics, master 3D slider, cybernetic circuits, zero-gravity physics, and gamified particle bursts, while preserving 100% of existing content and maintaining 60+ FPS.

**Architecture:** Layered rendering architecture separating WebGL 3D background (Three.js/R3F), interactive Canvas 2D particle/cloud physics (`requestAnimationFrame` & damped harmonic springs), CSS 3D matrix transforms (`perspective`, `rotateX/Y`), and DOM micro-interactions with magnetic lerp mechanics.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Three.js, `@react-three/fiber`, `canvas-confetti`, TypeScript.

**Spec:** `docs/superpowers/specs/2026-11-17-interactive-fx-system-design.md`

## Global Constraints

- Content Preservation: Do not delete, rewrite, or distort existing text, profile data, projects, experience items, or education entries in `src/content/portfolio.ts`.
- React 19 & Next.js 16 Compatibility: All interactive components using window events, canvas contexts, or pointer physics must declare `"use client"` and execute strictly after hydration.
- 60+ FPS Performance: Heavy math must run on `requestAnimationFrame` with cleanup handlers on unmount; no unthrottled global scroll/mousemove listeners without lerp or requestAnimationFrame buffering.
- Accessibility & Reduced Motion: Wrap intensive movement and physics calculations with `useReducedMotionSafe()` to gracefully downgrade to static/subtle fade when `prefers-reduced-motion: reduce` is active.
- Mobile Touch Safety: Custom cursor must be suppressed on touch devices `(hover: none) and (pointer: coarse)`; drag sliders must seamlessly accept both mouse pointer and touch events.

## Review Focus

1. Touch/Mobile Device Input: Custom cursor must not appear or cause ghost clicks on mobile/touch screens; touch dragging on the Master 3D Slider must prevent native page stutter.
2. React 19 Hydration: Canvas and pointer hooks must guard against `window is undefined` during SSR and avoid hydration mismatch errors.
3. Animation Loop Cleanup: All `requestAnimationFrame` loops and canvas animation frames must cancel on component unmount to prevent memory leaks and zombie CPU usage.
4. Viewport Boundary / Layout Overflow: 3D perspective transforms (`rotateY`, `translateZ`) in the Master Slider must not create horizontal document scrollbars (`overflow-x: hidden`).
5. Content Readability: Visual effects, particles, and glares must remain semi-transparent and layered with proper z-indexes so typography and CTA buttons remain 100% legible and clickable.

---

### Task 1: Global Fluid Magnetic Cursor & Particle Spark Trail

**Files:**
- Create: `src/hooks/useMagnetic.ts`
- Create: `src/components/visuals/FluidMagneticCursor.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/typecheck-and-e2e.mjs`

**Interfaces:**
- Consumes: `useReducedMotionSafe()` from `src/hooks/useReducedMotionSafe.ts`
- Produces: `<FluidMagneticCursor />` component mounted at the root layout/page level, exporting `useMagnetic()` hook for interactive components.

- [ ] **Step 1: Write type declaration & test definition for useMagnetic and FluidMagneticCursor**
Ensure type-safe hook signatures and cursor state definitions.
```typescript
// in src/hooks/useMagnetic.ts
export interface UseMagneticOptions {
  strength?: number; // 0 to 1
  radius?: number; // attraction radius in px
}
```

- [ ] **Step 2: Implement `src/hooks/useMagnetic.ts`**
Hook that tracks mouse proximity to a ref element and returns spring-interpolated `(tx, ty)` offsets to create magnetic pull on buttons and cards.

- [ ] **Step 3: Implement `src/components/visuals/FluidMagneticCursor.tsx`**
Two-tier fluid cursor with Canvas 2D particle trail:
- Inner dot follows pointer instantly.
- Outer ring follows with Lerp (`0.16`).
- Canvas draws small decaying spark particles on pointer velocity.
- Suppressed when `(pointer: coarse)` or reduced motion is enabled.

- [ ] **Step 4: Integrate in `src/app/page.tsx` and add cursor styling in `src/app/globals.css`**
Mount `<FluidMagneticCursor />` inside the root container. Add `[data-magnetic]` support.

- [ ] **Step 5: Verify build & typecheck**
Run `npm run typecheck` to confirm zero errors.

- [ ] **Step 6: Commit**
```bash
git add src/hooks/useMagnetic.ts src/components/visuals/FluidMagneticCursor.tsx src/app/page.tsx src/app/globals.css
git commit -m "feat(fx): implement fluid magnetic cursor and particle spark trail"
```

---

### Task 2: Interactive Cloud Physics & Hover Dispersion

**Files:**
- Create: `src/hooks/useMouseRepulsion.ts`
- Create: `src/components/visuals/InteractiveCloudCanvas.tsx`
- Modify: `src/components/visuals/CloudVeilTransition.tsx`

**Interfaces:**
- Consumes: `useReducedMotionSafe()` from `src/hooks/useReducedMotionSafe.ts`
- Produces: `<InteractiveCloudCanvas />` integrated into `<CloudVeilTransition variant={...} />`.

- [ ] **Step 1: Implement `src/hooks/useMouseRepulsion.ts`**
Physics hook that manages a collection of 2D particles with home positions `(originX, originY)`, velocity `(vx, vy)`, and computes radial repulsive force when pointer is within `repulsionRadius`.

- [ ] **Step 2: Implement `src/components/visuals/InteractiveCloudCanvas.tsx`**
Canvas 2D rendering fluffy, soft cloud puff clusters using radial gradients:
- Points disperse outward when cursor hovers near them.
- Damped spring return restores original layout when cursor leaves.
- Wind velocity drift modulated by window scroll speed.

- [ ] **Step 3: Upgrade `src/components/visuals/CloudVeilTransition.tsx`**
Replace static blur divs with the interactive physics canvas while keeping existing height, layout, and color theme variants (`sky-to-cream`, `cream-to-lavender`, `lavender-to-sky`, `open-sky`).

- [ ] **Step 4: Verify typecheck & responsiveness**
Run `npm run typecheck`.

- [ ] **Step 5: Commit**
```bash
git add src/hooks/useMouseRepulsion.ts src/components/visuals/InteractiveCloudCanvas.tsx src/components/visuals/CloudVeilTransition.tsx
git commit -m "feat(fx): add interactive cloud physics with hover repulsion and scroll wind"
```

---

### Task 3: Projects Section - Master 3D Coverflow Slider & Holographic Tilt Cards

**Files:**
- Create: `src/components/ui/HolographicTiltCard.tsx`
- Create: `src/components/ui/Master3DSlider.tsx`
- Modify: `src/components/sections/ProjectsSection.tsx`

**Interfaces:**
- Consumes: `ProjectItem` from `src/content/portfolio.ts`, `usePortfolioInteraction` from `src/context/PortfolioInteractionContext.tsx`.
- Produces: `<Master3DSlider />` with dual-mode toggle (3D Coverflow vs. Expanded Grid).

- [ ] **Step 1: Implement `src/components/ui/HolographicTiltCard.tsx`**
Container component with 3D perspective calculation:
- Tracks pointer over card bounds, sets `rotateX` (±14deg) and `rotateY` (±18deg).
- Dynamic holographic specular gloss layer following pointer angle.
- Multi-layer `translateZ` depth staging.

- [ ] **Step 2: Implement `src/components/ui/Master3DSlider.tsx`**
3D Perspective Coverflow Carousel:
- Active card at center (`rotateY(0)`, `translateZ(0)`, full brightness).
- Neighboring cards in 3D perspective (`rotateY(±28deg)`, `translateZ(-160px)`, opacity 0.65).
- Drag/touch gestures with momentum inertia and spring snap.
- Slide navigation dock with counter (`01 / 03`), navigation buttons, and View Mode toggle (3D Slider vs. Grid).

- [ ] **Step 3: Integrate into `src/components/sections/ProjectsSection.tsx`**
Wrap projects inside `<Master3DSlider />`, preserving all original project cards, mockups (`SmartParkingIllustration`, `ChessIllustration`), badges, and links.

- [ ] **Step 4: Verify typecheck & layout isolation**
Run `npm run typecheck`.

- [ ] **Step 5: Commit**
```bash
git add src/components/ui/HolographicTiltCard.tsx src/components/ui/Master3DSlider.tsx src/components/sections/ProjectsSection.tsx
git commit -m "feat(fx): implement master 3D coverflow slider and holographic tilt cards"
```

---

### Task 4: Hero Section Kinetic Shimmer & 3D Workspace Parallax

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/sections/HeroSection.tsx`
- Modify: `src/components/visuals/NinhDeskScene.tsx`

**Interfaces:**
- Consumes: pointer coordinates from `usePointerParallax`.
- Produces: Kinetic holographic headline shimmer, laser border beam pills, dynamic 3D camera parallax for the desk workspace.

- [ ] **Step 1: Add laser border-beam & kinetic text shimmer CSS in `src/app/globals.css`**
Define keyframe animations: `@keyframes borderBeam`, `@keyframes holographicShimmer`, and utilities.

- [ ] **Step 2: Upgrade `src/components/sections/HeroSection.tsx`**
- Apply kinetic text shimmer on main headline.
- Add glowing border beam animation to specialization pills with magnetic hover.
- Add cyber holographic reticle styling to terminal backdrop indicator.

- [ ] **Step 3: Enhance `src/components/visuals/NinhDeskScene.tsx`**
Connect pointer position to subtle 3D camera orbit tilt (`rotation.y` and `rotation.x`) for realistic room depth.

- [ ] **Step 4: Verify typecheck**
Run `npm run typecheck`.

- [ ] **Step 5: Commit**
```bash
git add src/app/globals.css src/components/sections/HeroSection.tsx src/components/visuals/NinhDeskScene.tsx
git commit -m "feat(fx): add kinetic shimmer headline and 3D desk camera parallax in hero"
```

---

### Task 5: Experience Section Cyber Circuit & Live Telemetry

**Files:**
- Modify: `src/components/sections/ExperienceSection.tsx`

**Interfaces:**
- Consumes: `pipelineStep` state and `PIPELINE_STEPS` data.
- Produces: Animated SVG glowing circuit path with travelling laser pulse, radar shockwaves at step nodes, and kinetic telemetry number counters.

- [ ] **Step 1: Add dynamic SVG glowing circuit trace**
Render an SVG connector line behind pipeline cards with an active laser pulse (`<circle>` with radial glow filter) travelling smoothly from station 1 to 4.

- [ ] **Step 2: Add radar shockwave pings and telemetry count-up animation**
When active node changes, trigger a radar expansion ring (`anim-radar-ping`). Add animated count-up display for metrics (`+2.4km`, `6 phút ETA`, `99.4%`).

- [ ] **Step 3: Verify typecheck & visual integrity**
Run `npm run typecheck`.

- [ ] **Step 4: Commit**
```bash
git add src/components/sections/ExperienceSection.tsx
git commit -m "feat(fx): add cyber circuit neon pipeline and telemetry pulse in experience section"
```

---

### Task 6: Skills Section Zero-Gravity Physics Field & Laser Scan

**Files:**
- Create: `src/components/ui/InteractiveSkillPill.tsx`
- Modify: `src/components/sections/SkillsSection.tsx`

**Interfaces:**
- Consumes: `skillCategories` from `src/content/portfolio.ts`.
- Produces: Physics-enabled floating skill pills that deflect away on cursor hover with spring return, plus periodic laser scanline sweep.

- [ ] **Step 1: Implement `src/components/ui/InteractiveSkillPill.tsx`**
Interactive skill badge with spring hover displacement, border glow, and 3D bounce.

- [ ] **Step 2: Upgrade `src/components/sections/SkillsSection.tsx`**
- Wrap skill tags with `<InteractiveSkillPill />`.
- Add moving cyber laser scan line sweeping across categories periodically.

- [ ] **Step 3: Verify typecheck**
Run `npm run typecheck`.

- [ ] **Step 4: Commit**
```bash
git add src/components/ui/InteractiveSkillPill.tsx src/components/sections/SkillsSection.tsx
git commit -m "feat(fx): implement zero-gravity physics skill field and laser scan"
```

---

### Task 7: About Section 3D Gyroscope Badge & Holographic Education Cards

**Files:**
- Modify: `src/components/sections/AboutSection.tsx`

**Interfaces:**
- Consumes: `education` from `src/content/portfolio.ts`.
- Produces: 3D coin-flip / gyroscope signature avatar badge and holographic iridescent sheen on education cards.

- [ ] **Step 1: Implement 3D flip coin avatar badge**
Transform the "N" avatar into a 3D dual-sided flip medal that rotates 360 degrees on hover with golden/sky iridescent sheen.

- [ ] **Step 2: Add holographic iridescent sheen to HaUI & VinUni education cards**
Add specular gradient overlay that shifts color hue based on pointer position.

- [ ] **Step 3: Verify typecheck**
Run `npm run typecheck`.

- [ ] **Step 4: Commit**
```bash
git add src/components/sections/AboutSection.tsx
git commit -m "feat(fx): add 3D gyroscope badge and holographic sheen in about section"
```

---

### Task 8: Contact Section Gamified Cyber Confetti & Starlight Finale

**Files:**
- Create: `src/components/visuals/StarlightCanvas.tsx`
- Modify: `src/components/sections/ContactSection.tsx`

**Interfaces:**
- Consumes: `canvas-confetti` library.
- Produces: `<StarlightCanvas />` background and explosive particle burst on "Sao chép Email" click.

- [ ] **Step 1: Implement `src/components/visuals/StarlightCanvas.tsx`**
Canvas 2D drawing twinkling stars and interactive constellation particles that gently drift towards the cursor at the page footer.

- [ ] **Step 2: Integrate `canvas-confetti` explosion on Email Copy**
When `handleCopyEmail` is invoked, launch a custom cyber-colored confetti burst (teal, sky, gold, emerald) radiating from the button coordinates.

- [ ] **Step 3: Add magnetic rocket hover effect on Scroll-to-Top button**
Upgrade the back-to-top button with magnetic suction and upward thrust animation.

- [ ] **Step 4: Verify typecheck**
Run `npm run typecheck`.

- [ ] **Step 5: Commit**
```bash
git add src/components/visuals/StarlightCanvas.tsx src/components/sections/ContactSection.tsx
git commit -m "feat(fx): add cyber confetti explosion and starlight canvas finale"
```

---

### Task 9: Dynamic Morphing Navbar & Magnetic Menu Spotlight

**Files:**
- Modify: `src/components/sections/Navbar.tsx`

**Interfaces:**
- Consumes: `useScrollProgress()` from `src/hooks/useScrollProgress.ts`.
- Produces: Dynamic Island morphing navbar with sliding spotlight indicator and neon scroll progress bar.

- [ ] **Step 1: Implement sliding magnetic indicator & scroll progress bar**
Add a floating liquid pill indicator that smoothly slides under active and hovered menu links. Add a 2px neon cyan progress bar at the bottom rim of the navbar.

- [ ] **Step 2: Add Dynamic Island contraction on scroll**
When page scrolls down (>80px), navbar contracts slightly into an ultra-clean floating capsule with glassmorphic border reflection.

- [ ] **Step 3: Verify typecheck**
Run `npm run typecheck`.

- [ ] **Step 4: Commit**
```bash
git add src/components/sections/Navbar.tsx
git commit -m "feat(fx): add dynamic island morphing and magnetic spotlight to navbar"
```

---

### Task 10: End-to-End Build & Visual Verification

**Files:**
- Test: `tests/interaction-cinematic-verification.mjs`
- Test: `tests/e2e-verification.mjs`

**Interfaces:**
- Consumes: Complete built application on `http://localhost:3000`.
- Produces: Full verification report and fresh screenshots validating 60 FPS, zero console errors, responsive layout, and flawless visual effects.

- [ ] **Step 1: Run complete TypeScript typecheck**
Run: `npm run typecheck`
Expected: 0 errors.

- [ ] **Step 2: Run production Next.js build**
Run: `npm run build`
Expected: Successful build with all routes generated.

- [ ] **Step 3: Run Playwright E2E and visual interaction verification**
Capture desktop & mobile screenshots, verify no console errors, check slider dragging, cloud hover, and confetti triggers.

- [ ] **Step 4: Final commit & summary**
```bash
git add -A
git commit -m "test(fx): verify end-to-end interactive fx system and visual quality"
```
