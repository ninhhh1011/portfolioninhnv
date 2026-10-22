# Implementation Plan: 3D Character Upgrade for Portfolio

## Context Summary

**Current State:**
- Character rendered as 2D PNG images (`ninh-desk.png`, `ninh-desk-wave.png`)
- CSS animations drive all motion (breathing, wave, typing flicker, sparkles)
- `Character3DAdapter.ts` documents the target capabilities
- No existing 3D assets

**Target State:**
- React Three Fiber 3D character with procedural geometry
- Preserves all existing interactions (focus mode, greeting, speech bubbles)
- Seamlessly replaces the Image components while keeping layout logic intact

---

## Phase 1: Package Installation

```bash
npm install three @react-three/fiber @react-three/drei @types/three
```

**Rationale:**
- `three`: Core 3D library
- `@react-three/fiber`: React renderer for Three.js (declarative)
- `@react-three/drei`: Useful helpers (OrbitControls, Environment, useGLTF, etc.)
- `@types/three`: TypeScript definitions

**next.config.ts update required:**

```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  transpilePackages: ['three'],
};
```

---

## Phase 2: Component Architecture

```
src/components/visuals/CharacterScene/
├── ChibiCharacter3D.tsx      # Main 3D character with procedural geometry
├── ChibiPoseController.tsx    # Handles pose transitions (greeting ↔ coding)
├── ChibiAnimations.tsx       # Animation logic (breathing, wave, typing)
├── DeskEnvironment3D.tsx     # 3D desk, laptop, coffee cup (optional enhancement)
├── Character3DCanvas.tsx      # Canvas wrapper with R3F setup
├── useCharacter3DState.ts    # Hook bridging React state ↔ R3F animations
└── index.ts                  # Re-exports
```

---

## Phase 3: Procedural Chibi Character

### Geometry Breakdown (Chibi proportions: large head, small body)

```
Head:     SphereGeometry (radius 0.35) - fluffy hair via multiple spheres
Face:     Flat planes with emissive materials for blush/eyes
Body:     CapsuleGeometry or CylinderGeometry (torso)
Arms:     CylinderGeometry with ball joints
Hands:    Small spheres
Legs:     Short cylinders
Desk:     BoxGeometry (laptop base), plane (screen)
Coffee:   CylinderGeometry + TorusGeometry (cup + handle)
```

### Material Approach

```typescript
// Soft, toon-shaded materials matching the existing palette
const characterMaterial = new MeshToonMaterial({
  color: '#FFE4C4', // skin tone
  emissive: '#FFB6A3', // subtle warmth
});

// Hair - slightly darker, fluffy spheres clustered
const hairMaterial = new MeshToonMaterial({
  color: '#2D1B0E', // dark brown
});
```

---

## Phase 4: Animation System

### 4.1 Breathing Animation (existing `anim-chibi-breathe`)

```typescript
// Replace CSS with R3F useFrame
useFrame(({ clock }) => {
  const t = clock.getElapsedTime();
  const breathe = Math.sin(t * 1.65) * 0.008 + 1; // 3.8s cycle
  characterRef.current.scale.set(breathe, breathe * 1.006, breathe);
});
```

### 4.2 Greeting Wave Animation (existing `anim-wave-hand`)

```typescript
// Triggered by isGreeting state
const waveAngle = Math.sin(time * 4) * 0.25; // ~1.5s cycle
rightArmRef.current.rotation.z = waveAngle - 0.5;
```

### 4.3 Typing Animation (existing typing sparks)

```typescript
// Finger movement on keyboard
// Head slight nod (0.05 rad forward/back)
useFrame(({ clock }) => {
  const t = clock.getElapsedTime();
  headRef.current.rotation.x = Math.sin(t * 8) * 0.02; // subtle typing nod
});
```

### 4.4 Focus Mode Lighting

```typescript
// Dynamic light color based on focusMode
<pointLight
  position={[0, 2, 2]}
  color={focusMode ? '#FEF08A' : '#A9D8F2'}
  intensity={focusMode ? 2 : 0.8}
/>
```

---

## Phase 5: State Integration

### Bridge Existing React State → R3F

```typescript
// In Character3DCanvas.tsx
const { focusMode, isGreeting, activeProject } = usePortfolioInteraction();

// Pass to ChibiCharacter3D as props
<ChibiCharacter3D
  focusMode={focusMode}
  isGreeting={isGreeting}
  activeProject={activeProject}
/>
```

### Preserve Speech Bubble & Terminal Overlay

The 2D overlays (speech bubble, terminal display, badges) remain in `NinhDeskScene.tsx`. The 3D character sits in a positioned div, and the overlays float above via absolute positioning - same pattern as current implementation.

---

## Phase 6: Performance Considerations

### 6.1 SSR Handling

React Three Fiber requires client-side rendering:

```typescript
// Character3DCanvas.tsx
"use client";

import dynamic from 'next/dynamic';

export const Character3DCanvas = dynamic(
  () => import('./ChibiCharacter3D'),
  { ssr: false }
);
```

### 6.2 Reduced Motion Respect

```typescript
// In animation hooks
if (prefersReducedMotion) {
  // Static pose, no useFrame updates
  return;
}
```

### 6.3 Performance Optimizations

| Technique | Implementation |
|-----------|---------------|
| Instanced meshes | Coffee steam particles |
| useMemo | Geometry/material creation |
| Frame limiting | `useFrame` with delta time checks |
| Suspense boundaries | Loading fallback |
| Dispose on unmount | `useEffect` cleanup |

### 6.4 Mobile Considerations

```typescript
// Detect low-power devices and reduce quality
const [dpr, setDpr] = useState(1.5);

useEffect(() => {
  if (navigator.hardwareConcurrency < 4) {
    setDpr(1);
  }
}, []);
```

---

## Phase 7: Fallback Strategy

### Layered Fallback (progressive enhancement)

```typescript
// 1. Try WebGL first
const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('webgl2'));
  } catch { return false; }
};

// 2. If no WebGL → static 2D image
// 3. If no 3D loaded → current 2D implementation
```

### Loading Sequence

```
1. Initial: Show 2D static image (existing assets)
2. Canvas mounts, Suspense shows skeleton
3. 3D character loads, fades in
4. 2D image fades out
```

---

## Phase 8: Implementation Order

### Step 1: Setup (Day 1)
- [ ] Install packages
- [ ] Configure next.config.ts
- [ ] Create directory structure
- [ ] Set up basic Canvas with orbit controls (dev)

### Step 2: Character Base (Day 1-2)
- [ ] Create ChibiCharacter3D with procedural head/body
- [ ] Add materials matching color palette
- [ ] Test in isolation

### Step 3: Animations (Day 2)
- [ ] Implement breathing animation
- [ ] Implement greeting wave
- [ ] Implement typing pose

### Step 4: Integration (Day 2-3)
- [ ] Create Character3DCanvas wrapper
- [ ] Wire up focusMode state
- [ ] Add dynamic lighting
- [ ] Handle reduced motion

### Step 5: Polish (Day 3)
- [ ] Add coffee steam particles
- [ ] Polish lighting
- [ ] Performance optimization pass
- [ ] Test across browsers/devices

### Step 6: Deployment (Day 3)
- [ ] Test in production build
- [ ] Monitor performance metrics
- [ ] Gather feedback

---

## File Changes Summary

| File | Action |
|------|--------|
| `package.json` | Add three, @react-three/fiber, @react-three/drei |
| `next.config.ts` | Add transpilePackages |
| `src/components/visuals/CharacterScene/` | Create new directory with components |
| `src/components/visuals/NinhDeskScene.tsx` | Replace Image with Character3DCanvas |
| `src/components/visuals/CharacterScene/Character3DAdapter.ts` | Update capabilities after implementation |

---

## Verification Checklist

- [ ] Greeting wave triggers on scroll-into-view
- [ ] Greeting wave triggers on character click
- [ ] Coding pose shows when greeting timer ends
- [ ] Focus mode changes lighting color
- [ ] Breathing animation runs continuously
- [ ] Speech bubble overlay still works
- [ ] Terminal overlay still works
- [ ] Tech badges still visible
- [ ] Reduced motion disables 3D animations
- [ ] Graceful fallback if WebGL unavailable
- [ ] No layout shift on 3D load
- [ ] 60fps on desktop, 30fps acceptable on mobile
