"use client";

export interface RepulsionParticle {
  id: number;
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  opacity: number;
  blur: number;
  driftSpeed: number;
}

export interface UseMouseRepulsionOptions {
  repulsionRadius?: number; // Distance within which repulsion acts
  repulsionStrength?: number; // Intensity of force
  springDamping?: number; // Damping ratio (0-1)
  springStiffness?: number; // Tension back to origin
}

export function createCloudParticles(
  count: number,
  width: number,
  height: number
): RepulsionParticle[] {
  const particles: RepulsionParticle[] = [];

  for (let i = 0; i < count; i++) {
    // Distribute clouds mainly across the horizontal middle band with soft jitter
    const originX = (width / (count + 1)) * (i + 1) + (Math.random() - 0.5) * (width / count);
    const originY = height * 0.45 + (Math.random() - 0.5) * (height * 0.4);
    const baseRadius = Math.random() * 32 + 38; // 38px to 70px cloud puffs

    particles.push({
      id: i,
      originX,
      originY,
      x: originX,
      y: originY,
      vx: 0,
      vy: 0,
      baseRadius,
      radius: baseRadius,
      opacity: Math.random() * 0.28 + 0.35, // 0.35 to 0.63 opacity
      blur: Math.random() * 12 + 10,
      driftSpeed: (Math.random() - 0.5) * 0.35,
    });
  }

  return particles;
}

export function updateCloudPhysics(
  particles: RepulsionParticle[],
  pointerX: number,
  pointerY: number,
  isPointerOver: boolean,
  scrollDeltaY: number,
  options: UseMouseRepulsionOptions = {}
) {
  const {
    repulsionRadius = 130,
    repulsionStrength = 6.5,
    springDamping = 0.88,
    springStiffness = 0.045,
  } = options;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    // Gentle ambient drift
    p.originX += p.driftSpeed;

    // Scroll wind effect: nudge clouds slightly in reaction to scroll velocity
    p.vx += scrollDeltaY * 0.035;

    // Repulsion from pointer
    if (isPointerOver) {
      const dx = p.x - pointerX;
      const dy = p.y - pointerY;
      const distance = Math.hypot(dx, dy);

      if (distance < repulsionRadius && distance > 0.1) {
        const force = (1 - distance / repulsionRadius) * repulsionStrength;
        const normalX = dx / distance;
        const normalY = dy / distance;
        p.vx += normalX * force;
        p.vy += normalY * force;
      }
    }

    // Restorative spring force returning to origin
    const springForceX = (p.originX - p.x) * springStiffness;
    const springForceY = (p.originY - p.y) * springStiffness;

    p.vx = (p.vx + springForceX) * springDamping;
    p.vy = (p.vy + springForceY) * springDamping;

    p.x += p.vx;
    p.y += p.vy;
  }
}
