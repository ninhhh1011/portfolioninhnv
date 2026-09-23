import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const WIDTH = 1280;
const HEIGHT = 720;
const FPS = 30;
const DURATION = 8; // 8 seconds seamless loop
const TOTAL_FRAMES = FPS * DURATION;

const OUTPUT_MP4 = "E:/portfolio/public/visuals/hero-ambient-video.mp4";
const OUTPUT_WEBM = "E:/portfolio/public/visuals/hero-ambient-video.webm";

console.log(`Đang sinh video nền ambient (${WIDTH}x${HEIGHT}, ${FPS}fps, ${DURATION}s, ${TOTAL_FRAMES} frames)...`);

// Palette in Craft Soft Editorial
// Base: #FCF9F7 (252, 249, 247)
// Sky: #A9D8F2 (169, 216, 242)
// Teal: #427E8A (66, 126, 138)
// Lavender: #DDD6FE (221, 214, 254)
// Mint: #C6F6D5 (198, 246, 213)
// Peach: #FED7AA (254, 215, 170)

function generateVideo(outputPath, isWebm = false) {
  return new Promise((resolve, reject) => {
    const args = isWebm
      ? [
          "-y",
          "-f", "rawvideo",
          "-pix_fmt", "rgb24",
          "-s", `${WIDTH}x${HEIGHT}`,
          "-r", `${FPS}`,
          "-i", "-",
          "-c:v", "libvpx-vp9",
          "-b:v", "0",
          "-crf", "30",
          "-pix_fmt", "yuv420p",
          outputPath,
        ]
      : [
          "-y",
          "-f", "rawvideo",
          "-pix_fmt", "rgb24",
          "-s", `${WIDTH}x${HEIGHT}`,
          "-r", `${FPS}`,
          "-i", "-",
          "-c:v", "libx264",
          "-preset", "fast",
          "-crf", "22",
          "-pix_fmt", "yuv420p",
          "-movflags", "+faststart",
          outputPath,
        ];

    const ffmpeg = spawn("ffmpeg", args);

    ffmpeg.stderr.on("data", (d) => {
      // debug if error
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        console.log(`✓ Đã tạo thành công: ${outputPath}`);
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });

    ffmpeg.on("error", reject);

    const stdin = ffmpeg.stdin;
    const frameBuffer = Buffer.alloc(WIDTH * HEIGHT * 3);

    // Precalculate pixel coordinates scaled
    // To be fast in Node.js, we can render soft gradient blobs using distance fields
    for (let f = 0; f < TOTAL_FRAMES; f++) {
      const progress = f / TOTAL_FRAMES; // 0 to 1
      const theta = progress * Math.PI * 2;

      // Orbs moving in seamless periodic Lissajous orbits (vibrant, clearly visible motion)
      const orb1 = {
        x: WIDTH * (0.3 + 0.18 * Math.sin(theta)),
        y: HEIGHT * (0.35 + 0.18 * Math.cos(theta)),
        radius: 460,
        r: 135, g: 205, b: 245, // Sky blue
        intensity: 0.75,
      };

      const orb2 = {
        x: WIDTH * (0.7 - 0.2 * Math.cos(theta)),
        y: HEIGHT * (0.42 + 0.15 * Math.sin(theta)),
        radius: 480,
        r: 195, g: 175, b: 245, // Lavender
        intensity: 0.7,
      };

      const orb3 = {
        x: WIDTH * (0.5 + 0.15 * Math.sin(theta * 2)),
        y: HEIGHT * (0.68 + 0.12 * Math.cos(theta)),
        radius: 420,
        r: 155, g: 230, b: 195, // Mint
        intensity: 0.65,
      };

      const orb4 = {
        x: WIDTH * (0.8 + 0.12 * Math.sin(theta)),
        y: HEIGHT * (0.25 + 0.1 * Math.cos(theta)),
        radius: 380,
        r: 254, g: 195, b: 140, // Warm Peach
        intensity: 0.6,
      };

      let ptr = 0;
      for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
          // Base color #FCF9F7
          let r = 252;
          let g = 249;
          let b = 247;

          // Blend orb 1
          const dx1 = x - orb1.x;
          const dy1 = y - orb1.y;
          const d1Sq = dx1 * dx1 + dy1 * dy1;
          const r1Sq = orb1.radius * orb1.radius;
          if (d1Sq < r1Sq) {
            const factor = (1 - Math.sqrt(d1Sq) / orb1.radius) * orb1.intensity;
            r = r * (1 - factor) + orb1.r * factor;
            g = g * (1 - factor) + orb1.g * factor;
            b = b * (1 - factor) + orb1.b * factor;
          }

          // Blend orb 2
          const dx2 = x - orb2.x;
          const dy2 = y - orb2.y;
          const d2Sq = dx2 * dx2 + dy2 * dy2;
          const r2Sq = orb2.radius * orb2.radius;
          if (d2Sq < r2Sq) {
            const factor = (1 - Math.sqrt(d2Sq) / orb2.radius) * orb2.intensity;
            r = r * (1 - factor) + orb2.r * factor;
            g = g * (1 - factor) + orb2.g * factor;
            b = b * (1 - factor) + orb2.b * factor;
          }

          // Blend orb 3
          const dx3 = x - orb3.x;
          const dy3 = y - orb3.y;
          const d3Sq = dx3 * dx3 + dy3 * dy3;
          const r3Sq = orb3.radius * orb3.radius;
          if (d3Sq < r3Sq) {
            const factor = (1 - Math.sqrt(d3Sq) / orb3.radius) * orb3.intensity;
            r = r * (1 - factor) + orb3.r * factor;
            g = g * (1 - factor) + orb3.g * factor;
            b = b * (1 - factor) + orb3.b * factor;
          }

          // Blend orb 4
          const dx4 = x - orb4.x;
          const dy4 = y - orb4.y;
          const d4Sq = dx4 * dx4 + dy4 * dy4;
          const r4Sq = orb4.radius * orb4.radius;
          if (d4Sq < r4Sq) {
            const factor = (1 - Math.sqrt(d4Sq) / orb4.radius) * orb4.intensity;
            r = r * (1 - factor) + orb4.r * factor;
            g = g * (1 - factor) + orb4.g * factor;
            b = b * (1 - factor) + orb4.b * factor;
          }

          frameBuffer[ptr++] = Math.round(r);
          frameBuffer[ptr++] = Math.round(g);
          frameBuffer[ptr++] = Math.round(b);
        }
      }

      stdin.write(frameBuffer);
    }

    stdin.end();
  });
}

async function run() {
  try {
    await generateVideo(OUTPUT_MP4, false);
    await generateVideo(OUTPUT_WEBM, true);
    console.log("★ HOÀN TẤT SINH TẤT CẢ VIDEO NỀN!");
  } catch (err) {
    console.error("Lỗi khi sinh video:", err);
  }
}

run();
