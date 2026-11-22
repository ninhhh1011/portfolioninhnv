# Character Comparison Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provide a locally runnable comparison of the three character approaches in an isolated worktree without changing the user's original checkout.

**Architecture:** Keep the current desk, navigation, and interaction context. Replace only the scene's character rendering with a comparison selector and individually loaded character views. The semi-realistic view uses the generated scene; the 2D view requires independent artwork layers; the 3D view uses a licensed rigged model. Show a truthful asset-unavailable message when a required rig or animation is missing.

**Tech Stack:** Next.js 16, React 19, TypeScript, existing Three.js and React Three Fiber, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-23-character-comparison-design.md`

## Global Constraints

- Work only in `E:/portfolio-character-comparison`; preserve copied uncommitted work.
- All three options occupy the existing desk/character region and retain project orbit and interactions.
- Respect reduced motion and stop active animation offscreen and when the document is hidden.
- Load the 3D renderer and model only when selected; expose error fallback on WebGL/model failure.
- Do not describe static images as rigged animation, and do not claim unsupported clips exist.
- Keep each asset's license and provenance alongside it. A CC0 sample model is a technical stand-in, not a likeness of Ninh.

## Review Focus

- Switching rapidly while a model is loading must not replace the current option after it loads.
- Missing WebGL or a failed asset must display an actionable fallback and leave the selector usable.
- Reduced motion must render a static pose without continuous animation.
- Narrow screens must retain usable selection controls and preserve vertical scrolling.
- Tab visibility and viewport changes must suspend and resume animation without duplicate loops.

## Task 1: Isolated setup and comparison tests

**Files:** Create `tests/character-comparison.test.mjs`; use `src/components/visuals/HeroComposition.tsx` and `src/components/visuals/NinhDeskScene.tsx`.

- [ ] Link the existing dependencies without modifying them: `New-Item -ItemType Junction -Path node_modules -Target E:/portfolio/node_modules` from the worktree. Start a separate dev server with `npm run dev -- --port 3001` and verify `http://localhost:3001` returns 200.
- [ ] Create a Playwright test which opens port 3001 at 1440px and 390px; selects buttons named `Bán hiện thực`, `2D rigged`, `3D rigged`; checks `aria-pressed`, verifies character interaction remains available, and asserts no horizontal overflow. Repeat with `reducedMotion: "reduce"`. Run `node tests/character-comparison.test.mjs`; it must fail before implementation.
- [ ] Ensure original workspace remains unchanged by comparing `git status --short` there before and after setup.

## Task 2: Comparison selector and semi-realistic view

**Files:** Modify `src/components/visuals/HeroComposition.tsx` and `src/components/visuals/NinhDeskScene.tsx`; use `public/visuals/character-concepts/semi-realistic.png`.

- [ ] Add three buttons as a single labelled group, each setting a React state value (`"semi"`, `"rig2d"`, `"rig3d"`) and reporting `aria-pressed`.
- [ ] Render the semi-realistic artwork in the existing scene, using Next Image with responsive `sizes`. Preserve the interaction button and speech-bubble context. Do not crossfade to the old chibi wave image.
- [ ] Use existing `useSectionInView`, `useDocumentVisibility`, and `useReducedMotionSafe` to stop visual motion when offscreen, hidden, or reduced. Run the selector test and `npm run typecheck`.

## Task 3: Actual 2D rig

**Files:** Create `src/components/visuals/CharacterScene/Character2D.tsx`; add verified independent artwork layers in `public/visuals/character-2d/`.

- [ ] Produce matching transparent torso, head, eye and arm layers with complete hidden edges; verify layers align at rest and do not tear during motion. Existing flattened concept PNG is not sufficient. If matching layers cannot be produced, render an explicit unavailable state and record the limitation; do not label an animated flat image as a rig.
- [ ] Compose layers with fixed transform origins and small CSS transforms. Blink eyes and breathe only when visible and motion is allowed; clicking the character triggers the existing speech interaction and a wave only if a separate arm permits it.
- [ ] Test that two different layer transforms change over time with normal motion and do not change with reduced motion. Check character controls by keyboard and on mobile.

## Task 4: Actual 3D rig

**Files:** Create `src/components/visuals/CharacterScene/Character3D.tsx`; add a model and license under `public/visuals/character-3d/`.

- [ ] Prefer a supplied rigged model of Ninh with relevant clips. If unavailable, use only a clearly labelled technical sample with verified license, such as the CC0 Quaternius demo model from `https://github.com/rana-jatin/avatar-stage` (`demo/public/models/demo-avatar.glb`); retain its license and do not represent it as Ninh. Verify model and animation names before using.
- [ ] Dynamically import the 3D view only when selected. Render the model with React Three Fiber, use an existing animation clip only when present, and stop rendering when offscreen or hidden. In reduced motion render a single static pose. Handle missing WebGL and load failures with an explanatory fallback.
- [ ] Test load, repeated switching during loading, WebGL failure, reduced motion and visibility. State explicitly which animations exist; never invent a typing, blink or wave clip.

## Task 5: End-to-end verification and handoff

**Files:** `tests/character-comparison.test.mjs` and the implementation files above.

- [ ] Run `npm run typecheck` and `node tests/character-comparison.test.mjs`; test existing navigation and carousel tests against port 3001 where practical.
- [ ] Inspect desktop and mobile screenshots, compare the three options, and measure asset sizes and browser rendering behavior. Fix verified defects.
- [ ] Report the branch, local URL, supported interactions, model identity/license and any missing rigs or animations. Do not merge or replace the original checkout until the user chooses.
