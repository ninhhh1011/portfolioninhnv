# 3D Chibi Character Upgrade Plan

## Context
Nâng cấp nhân vật chibi từ ảnh 2D sang 3D thực sự. Hiện tại dùng 2 PNG images với CSS transforms, muốn thay bằng React Three Fiber để có depth, lighting, và animations chân thực hơn.

## Approach: Procedural 3D Chibi

**Tại sao procedural geometry thay vì model file:**
- Không cần tạo/animation file 3D từ Blender
- Build từ Three.js primitives (sphere, capsule, cylinder)
- Nhẹ, load nhanh, dễ customize colors/animation
- Style anime/chibi phù hợp với approach này

## Implementation Steps

### 1. Install Packages
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```
Update `next.config.ts` thêm `transpilePackages: ['three']`

### 2. Create Component Structure
```
src/components/visuals/CharacterScene/
├── ChibiCharacter3D.tsx      # Procedural body parts (head, hair, body, arms, legs)
├── ChibiAnimations.tsx        # useFrame animations (breathing, wave, typing)
├── Character3DCanvas.tsx      # R3F Canvas wrapper với camera/lighting
└── index.ts
```

### 3. Procedural Geometry Breakdown

| Part | Geometry | Style |
|------|----------|-------|
| Head | `SphereGeometry(0.35)` | Toon material |
| Hair | Clustered spheres | Fluffy anime style |
| Body | `CapsuleGeometry` | Oversized sweater |
| Arms | `CylinderGeometry` + joints |posable |
| Desk | `BoxGeometry` | Simple wood texture |
| Laptop | Box + screen plane | Glowing screen |

### 4. Animation System

| Animation | Implementation |
|-----------|---------------|
| Breathing | `useFrame` + `sin(time * 1.65)` scale Y |
| Wave (greeting) | Arm rotation `sin(time * 4) * 0.25` |
| Typing (coding) | Head nod + finger movement |
| Focus mode | Dynamic `<pointLight>` color/intensity |

### 5. State Integration
Giữ nguyên `usePortfolioInteraction` context. Map existing state:
- `focusMode` → lighting color (amber vs cool blue)
- `isGreeting` → wave animation flag
- `activeProject` → screen content

### 6. Keep Existing 2D Overlays
Giữ lại (không đổi):
- Speech bubble
- Terminal overlay  
- Tech badges
- Cloud parallax

### 7. Performance
- Dynamic import với `ssr: false`
- Respects `prefersReducedMotion`
- Detect WebGL support → fallback 2D nếu cần

## Files to Modify

| File | Change |
|------|--------|
| `package.json` | Add three, @react-three/fiber, @react-three/drei |
| `next.config.ts` | Add transpilePackages |
| `src/components/visuals/NinhDeskScene.tsx` | Replace Image với R3F Canvas |
| `src/components/visuals/CharacterScene/*.tsx` | New 3D components |

## Verification
1. `npm run dev` → http://localhost:3002
2. Check chibi renders in 3D
3. Hover → focus mode lighting changes
4. Click → wave animation plays
5. Scroll → greeting auto-triggers
6. Check console for WebGL errors
7. `npm run typecheck` passes
