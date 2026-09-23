/**
 * Character3DAdapter
 * Standardized abstraction for 3D/animated character layers.
 * Designed to seamlessly switch between Static Raster Fallback, Video/WebM, Rive, Spline, or GLB
 * without modifying Hero or workspace layout logic.
 */

export type CharacterVisualMode = "static" | "video" | "rive" | "spline" | "glb";

export interface Character3DCapabilities {
  hasReal3DAsset: boolean;
  hasVideoAsset: boolean;
  hasRiveAsset: boolean;
  headTracking: boolean;
  eyeTracking: boolean;
  typingAnimation: boolean;
  currentMode: CharacterVisualMode;
  fallbackMode: string;
  requiredAssetForFull3D: string;
}

export const CURRENT_CHARACTER_CAPABILITIES: Character3DCapabilities = {
  hasReal3DAsset: false,
  hasVideoAsset: false,
  hasRiveAsset: false,
  headTracking: false,
  eyeTracking: false,
  typingAnimation: false,
  currentMode: "static",
  fallbackMode: "STATIC_RASTER_FALLBACK (Multi-layered CSS/SVG Ambient & Interactive Overlay)",
  requiredAssetForFull3D: "ninh-desk.glb (Rigged character with actions: Idle, Typing, Blink, Wave)",
};
