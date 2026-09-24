"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RotateCcw, Sparkles } from "lucide-react";
import { usePortfolioInteraction } from "@/context/PortfolioInteractionContext";

interface ThreeDeskCanvasProps {
  className?: string;
  isExploreHovered?: boolean;
}

export const ThreeDeskCanvas: React.FC<ThreeDeskCanvasProps> = ({
  className = "",
  isExploreHovered = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    activeProject,
    focusMode,
    toggleFocusMode,
    triggerNextSpeechBubble,
  } = usePortfolioInteraction();

  // References for animated meshes in the render loop
  const animRefs = useRef<{
    keys: THREE.Mesh[];
    leftFingers: THREE.Mesh[];
    rightFingers: THREE.Mesh[];
    lampLight: THREE.PointLight | null;
    lampBulb: THREE.Mesh | null;
    steamParticles: THREE.Points | null;
    codeCanvas: HTMLCanvasElement | null;
    codeCtx: CanvasRenderingContext2D | null;
    screenTexture: THREE.CanvasTexture | null;
    typingTime: number;
    codeScrollOffset: number;
  }>({
    keys: [],
    leftFingers: [],
    rightFingers: [],
    lampLight: null,
    lampBulb: null,
    steamParticles: null,
    codeCanvas: null,
    codeCtx: null,
    screenTexture: null,
    typingTime: 0,
    codeScrollOffset: 0,
  });

  // Reset camera position
  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 405;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(3.0, 2.3, 4.0);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0.72, 0);
    controls.minDistance = 3.5;
    controls.maxDistance = 8.5;
    controls.maxPolarAngle = Math.PI / 2.05; // Prevent flipping under
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.65;
    controls.saveState();
    controlsRef.current = controls;

    controls.addEventListener("start", () => setIsInteracting(true));
    controls.addEventListener("end", () => setIsInteracting(false));

    let pointerDownPos = { x: 0, y: 0 };
    const handlePointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };
    const handlePointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist < 8) {
        triggerNextSpeechBubble();
      }
    };
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);

    // 4. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 1.6);
    sunLight.position.set(5, 8, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 20;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const fillSkyLight = new THREE.DirectionalLight(0xdbeafe, 0.6);
    fillSkyLight.position.set(-5, 4, -3);
    scene.add(fillSkyLight);

    // Dynamic Lamp PointLight
    const lampLight = new THREE.PointLight(0xfef08a, 2.2, 6, 1.2);
    lampLight.position.set(1.15, 1.7, 0.1);
    lampLight.castShadow = true;
    lampLight.shadow.bias = -0.001;
    scene.add(lampLight);
    animRefs.current.lampLight = lampLight;

    // 5. SHARED MATERIALS
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0xedd6b8,
      roughness: 0.38,
      metalness: 0.05,
    });

    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.22,
      metalness: 0.85,
    });

    const darkKeyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.45,
      metalness: 0.2,
    });

    const activeKeyMaterial = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      roughness: 0.3,
    });

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbd38d,
      roughness: 0.5,
    });

    const hoodieMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.6,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.8,
    });

    const plantGreenMaterial = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.4,
    });

    const potMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
    });

    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      transparent: true,
      opacity: 0.85,
    });

    // 6. PROCEDURAL CODE CANVAS TEXTURE FOR LAPTOP SCREEN
    const codeCanvas = document.createElement("canvas");
    codeCanvas.width = 512;
    codeCanvas.height = 340;
    const codeCtx = codeCanvas.getContext("2d");
    if (codeCtx) {
      codeCtx.fillStyle = "#0f172a";
      codeCtx.fillRect(0, 0, 512, 340);
    }
    const screenTexture = new THREE.CanvasTexture(codeCanvas);
    screenTexture.generateMipmaps = true;
    animRefs.current.codeCanvas = codeCanvas;
    animRefs.current.codeCtx = codeCtx;
    animRefs.current.screenTexture = screenTexture;

    const screenMaterial = new THREE.MeshStandardMaterial({
      map: screenTexture,
      emissive: 0xffffff,
      emissiveMap: screenTexture,
      emissiveIntensity: 0.85,
      roughness: 0.2,
    });

    // 7. FLOATING ISLAND PLATFORM & DESK
    // Warm stone floating island
    const islandGeo = new THREE.CylinderGeometry(2.1, 1.6, 0.35, 32);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0xf5ebe0,
      roughness: 0.65,
      metalness: 0.05,
    });
    const islandMesh = new THREE.Mesh(islandGeo, islandMat);
    islandMesh.position.set(0, -0.175, 0.12);
    islandMesh.receiveShadow = true;
    scene.add(islandMesh);

    // Soft pastel mint moss top layer
    const mossGeo = new THREE.CylinderGeometry(2.08, 2.08, 0.04, 32);
    const mossMat = new THREE.MeshStandardMaterial({
      color: 0x86efac,
      roughness: 0.85,
    });
    const mossMesh = new THREE.Mesh(mossGeo, mossMat);
    mossMesh.position.set(0, 0.01, 0.12);
    mossMesh.receiveShadow = true;
    scene.add(mossMesh);

    // Desktop top
    const deskGeo = new THREE.BoxGeometry(2.8, 0.1, 1.6);
    const deskMesh = new THREE.Mesh(deskGeo, woodMaterial);
    deskMesh.position.set(0, 0.95, 0);
    deskMesh.receiveShadow = true;
    deskMesh.castShadow = true;
    scene.add(deskMesh);

    // Desk legs (4 legs)
    const legGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.95, 16);
    const legPositions = [
      [-1.25, 0.475, -0.65],
      [1.25, 0.475, -0.65],
      [-1.25, 0.475, 0.65],
      [1.25, 0.475, 0.65],
    ];
    legPositions.forEach(([lx, ly, lz]) => {
      const leg = new THREE.Mesh(legGeo, aluminumMaterial);
      leg.position.set(lx, ly, lz);
      leg.castShadow = true;
      scene.add(leg);
    });

    // Chair behind desk
    const chairGroup = new THREE.Group();
    chairGroup.position.set(0, 0, 0.95);

    // Chair seat
    const seatGeo = new THREE.BoxGeometry(0.8, 0.08, 0.75);
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.5 });
    const seatMesh = new THREE.Mesh(seatGeo, chairMat);
    seatMesh.position.set(0, 0.65, 0);
    seatMesh.castShadow = true;
    chairGroup.add(seatMesh);

    // Chair backrest
    const backGeo = new THREE.BoxGeometry(0.75, 0.8, 0.08);
    const backMesh = new THREE.Mesh(backGeo, chairMat);
    backMesh.position.set(0, 1.1, 0.35);
    backMesh.rotation.x = -0.1;
    backMesh.castShadow = true;
    chairGroup.add(backMesh);

    // Chair pole & wheel base
    const chairPoleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 12);
    const chairPole = new THREE.Mesh(chairPoleGeo, aluminumMaterial);
    chairPole.position.set(0, 0.3, 0);
    chairGroup.add(chairPole);
    scene.add(chairGroup);

    // 8. 3D LAPTOP
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-0.15, 1.0, 0.05);

    // Base body
    const lapBaseGeo = new THREE.BoxGeometry(1.0, 0.025, 0.7);
    const lapBase = new THREE.Mesh(lapBaseGeo, aluminumMaterial);
    lapBase.castShadow = true;
    lapBase.receiveShadow = true;
    laptopGroup.add(lapBase);

    // Trackpad
    const trackGeo = new THREE.BoxGeometry(0.35, 0.002, 0.22);
    const trackMesh = new THREE.Mesh(
      trackGeo,
      new THREE.MeshStandardMaterial({ color: 0xcfd8dc, roughness: 0.3, metalness: 0.6 })
    );
    trackMesh.position.set(0, 0.014, 0.18);
    laptopGroup.add(trackMesh);

    // Mechanical Keys (4 rows of 9 keys)
    const keyGeo = new THREE.BoxGeometry(0.065, 0.015, 0.055);
    const keysArray: THREE.Mesh[] = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 10; col++) {
        const key = new THREE.Mesh(keyGeo, darkKeyMaterial);
        const kx = -0.36 + col * 0.08;
        const kz = -0.22 + row * 0.075;
        key.position.set(kx, 0.02, kz);
        key.castShadow = true;
        laptopGroup.add(key);
        keysArray.push(key);
      }
    }
    animRefs.current.keys = keysArray;

    // Laptop Screen Lid (hinged at rear)
    const screenHinge = new THREE.Group();
    screenHinge.position.set(0, 0.015, -0.34);
    screenHinge.rotation.x = 0.22; // Open ~103 degrees

    // Screen back shell
    const screenLidGeo = new THREE.BoxGeometry(1.0, 0.65, 0.02);
    const screenLid = new THREE.Mesh(screenLidGeo, aluminumMaterial);
    screenLid.position.set(0, 0.32, 0);
    screenLid.castShadow = true;
    screenHinge.add(screenLid);

    // Screen display panel
    const screenDisplayGeo = new THREE.PlaneGeometry(0.94, 0.58);
    const screenDisplay = new THREE.Mesh(screenDisplayGeo, screenMaterial);
    screenDisplay.position.set(0, 0.32, 0.011);
    screenHinge.add(screenDisplay);

    laptopGroup.add(screenHinge);
    scene.add(laptopGroup);

    // 9. ANIMATED 3D DEVELOPER HANDS & ARMS
    const handsGroup = new THREE.Group();
    handsGroup.position.set(-0.15, 1.05, 0.22);

    // Left arm / cuff
    const cuffGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.3, 16);
    const leftCuff = new THREE.Mesh(cuffGeo, hoodieMaterial);
    leftCuff.position.set(-0.24, 0.06, 0.25);
    leftCuff.rotation.x = Math.PI / 2.3;
    leftCuff.rotation.z = -0.2;
    handsGroup.add(leftCuff);

    // Right arm / cuff
    const rightCuff = new THREE.Mesh(cuffGeo, hoodieMaterial);
    rightCuff.position.set(0.24, 0.06, 0.25);
    rightCuff.rotation.x = Math.PI / 2.3;
    rightCuff.rotation.z = 0.2;
    handsGroup.add(rightCuff);

    // Left hand & fingers
    const palmGeo = new THREE.BoxGeometry(0.16, 0.04, 0.12);
    const leftPalm = new THREE.Mesh(palmGeo, skinMaterial);
    leftPalm.position.set(-0.16, 0.04, 0.08);
    handsGroup.add(leftPalm);

    const rightPalm = new THREE.Mesh(palmGeo, skinMaterial);
    rightPalm.position.set(0.16, 0.04, 0.08);
    handsGroup.add(rightPalm);

    // Individual articulated typing fingers
    const fingerGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.08, 8);
    const leftFingers: THREE.Mesh[] = [];
    const rightFingers: THREE.Mesh[] = [];

    for (let f = 0; f < 4; f++) {
      // Left finger
      const lf = new THREE.Mesh(fingerGeo, skinMaterial);
      lf.position.set(-0.21 + f * 0.038, 0.03, -0.01);
      lf.rotation.x = Math.PI / 2.8;
      handsGroup.add(lf);
      leftFingers.push(lf);

      // Right finger
      const rf = new THREE.Mesh(fingerGeo, skinMaterial);
      rf.position.set(0.1 + f * 0.038, 0.03, -0.01);
      rf.rotation.x = Math.PI / 2.8;
      handsGroup.add(rf);
      rightFingers.push(rf);
    }

    animRefs.current.leftFingers = leftFingers;
    animRefs.current.rightFingers = rightFingers;
    scene.add(handsGroup);

    // 10. INTERACTIVE 3D DESK LAMP
    const lampGroup = new THREE.Group();
    lampGroup.position.set(1.1, 1.0, -0.15);

    // Base
    const lampBaseGeo = new THREE.CylinderGeometry(0.14, 0.15, 0.03, 24);
    const lampBase = new THREE.Mesh(lampBaseGeo, brassMaterial);
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    // Stem lower
    const stemLowerGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.55, 12);
    const stemLower = new THREE.Mesh(stemLowerGeo, brassMaterial);
    stemLower.position.set(0, 0.28, 0);
    stemLower.rotation.z = -0.2;
    lampGroup.add(stemLower);

    // Stem upper
    const stemUpper = new THREE.Mesh(stemLowerGeo, brassMaterial);
    stemUpper.position.set(-0.06, 0.65, 0.05);
    stemUpper.rotation.z = 0.35;
    lampGroup.add(stemUpper);

    // Lamp Shade Cone
    const shadeGeo = new THREE.ConeGeometry(0.16, 0.24, 24, 1, true);
    const shadeMesh = new THREE.Mesh(
      shadeGeo,
      new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        roughness: 0.3,
        side: THREE.DoubleSide,
      })
    );
    shadeMesh.position.set(-0.16, 0.78, 0.1);
    shadeMesh.rotation.z = 0.75;
    shadeMesh.rotation.x = -0.3;
    shadeMesh.castShadow = true;
    lampGroup.add(shadeMesh);

    // Glowing Bulb inside shade
    const bulbGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      emissive: 0xf59e0b,
      emissiveIntensity: 2.2,
      roughness: 0.1,
    });
    const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
    bulbMesh.position.set(-0.14, 0.76, 0.1);
    lampGroup.add(bulbMesh);
    animRefs.current.lampBulb = bulbMesh;

    scene.add(lampGroup);

    // 11. COFFEE MUG WITH PARTICLES
    const mugGroup = new THREE.Group();
    mugGroup.position.set(-1.0, 1.0, 0.3);

    const mugGeo = new THREE.CylinderGeometry(0.09, 0.075, 0.18, 24);
    const mugMesh = new THREE.Mesh(
      mugGeo,
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
    );
    mugMesh.position.set(0, 0.09, 0);
    mugMesh.castShadow = true;
    mugGroup.add(mugMesh);

    // Coffee surface
    const coffeeGeo = new THREE.CircleGeometry(0.078, 16);
    const coffeeMesh = new THREE.Mesh(
      coffeeGeo,
      new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.1 })
    );
    coffeeMesh.position.set(0, 0.165, 0);
    coffeeMesh.rotation.x = -Math.PI / 2;
    mugGroup.add(coffeeMesh);
    scene.add(mugGroup);

    // Rising Steam Particles (Point Cloud)
    const particleCount = 20;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = -1.0 + (Math.random() - 0.5) * 0.08;
      particlePositions[i * 3 + 1] = 1.25 + Math.random() * 0.45;
      particlePositions[i * 3 + 2] = 0.3 + (Math.random() - 0.5) * 0.08;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const steamPoints = new THREE.Points(particleGeo, particleMat);
    scene.add(steamPoints);
    animRefs.current.steamParticles = steamPoints;

    // 12. POTTED SUCCULENT PLANT & BOOKS
    const plantGroup = new THREE.Group();
    plantGroup.position.set(1.0, 1.0, 0.45);

    const potGeo = new THREE.CylinderGeometry(0.09, 0.07, 0.14, 16);
    const potMesh = new THREE.Mesh(potGeo, potMaterial);
    potMesh.position.set(0, 0.07, 0);
    potMesh.castShadow = true;
    plantGroup.add(potMesh);

    // Leaves
    for (let l = 0; l < 6; l++) {
      const leafGeo = new THREE.ConeGeometry(0.035, 0.12, 8);
      const leafMesh = new THREE.Mesh(leafGeo, plantGreenMaterial);
      const angle = (l / 6) * Math.PI * 2;
      leafMesh.position.set(Math.cos(angle) * 0.04, 0.15, Math.sin(angle) * 0.04);
      leafMesh.rotation.z = Math.cos(angle) * 0.4;
      leafMesh.rotation.x = Math.sin(angle) * 0.4;
      leafMesh.castShadow = true;
      plantGroup.add(leafMesh);
    }
    scene.add(plantGroup);

    // Books on corner
    const bookGeo = new THREE.BoxGeometry(0.35, 0.05, 0.25);
    const book1 = new THREE.Mesh(
      bookGeo,
      new THREE.MeshStandardMaterial({ color: 0x176b87, roughness: 0.4 })
    );
    book1.position.set(-1.0, 1.025, -0.45);
    book1.rotation.y = 0.15;
    book1.castShadow = true;
    scene.add(book1);

    const book2 = new THREE.Mesh(
      bookGeo,
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 })
    );
    book2.position.set(-1.0, 1.075, -0.44);
    book2.rotation.y = -0.08;
    book2.castShadow = true;
    scene.add(book2);

    // 13. FLOATING CLOUDS UNDER ISLE
    const cloudsGroup = new THREE.Group();
    const cloudSpheres = [
      [-1.2, -0.2, 0.4, 0.45],
      [-0.8, -0.3, -0.5, 0.5],
      [1.1, -0.25, 0.3, 0.42],
      [0.9, -0.35, -0.4, 0.48],
      [0.0, -0.4, 0.6, 0.55],
    ];
    cloudSpheres.forEach(([cx, cy, cz, cr]) => {
      const sGeo = new THREE.SphereGeometry(cr, 16, 16);
      const sMesh = new THREE.Mesh(sGeo, cloudMaterial);
      sMesh.position.set(cx, cy, cz);
      cloudsGroup.add(sMesh);
    });
    scene.add(cloudsGroup);

    // 14. CODE DRAWING FUNCTION (Live code typing on laptop screen)
    const codeLines = [
      "// Nguyễn Văn Ninh · Backend & AI",
      "import { FastAPI, Depends } from 'fastapi'",
      "from spatial.osrm import route_matcher",
      "from stockfish.eval import StockfishEngine",
      "",
      "app = FastAPI(title='Portfolio Core')",
      "",
      "@app.get('/api/v1/recommendation')",
      "async def get_optimum_route(driver: Point):",
      "    stations = await postgis.nearest(driver)",
      "    detour = route_matcher.calc(stations)",
      "    return {'eta': detour.eta, 'km': detour.km}",
      "",
      "@app.post('/api/ai/chess/eval')",
      "def evaluate_position(fen: str):",
      "    engine = StockfishEngine(depth=18)",
      "    return engine.get_best_move(fen)",
      "",
      "// System: Healthy · Latency: 12ms",
    ];

    const drawScreenCode = (offset: number) => {
      if (!codeCtx || !screenTexture) return;
      codeCtx.fillStyle = "#090d16";
      codeCtx.fillRect(0, 0, 512, 340);

      // Title bar
      codeCtx.fillStyle = "#1e293b";
      codeCtx.fillRect(0, 0, 512, 28);

      codeCtx.fillStyle = "#ef4444";
      codeCtx.beginPath();
      codeCtx.arc(16, 14, 5, 0, Math.PI * 2);
      codeCtx.fill();

      codeCtx.fillStyle = "#eab308";
      codeCtx.beginPath();
      codeCtx.arc(32, 14, 5, 0, Math.PI * 2);
      codeCtx.fill();

      codeCtx.fillStyle = "#22c55e";
      codeCtx.beginPath();
      codeCtx.arc(48, 14, 5, 0, Math.PI * 2);
      codeCtx.fill();

      codeCtx.fillStyle = "#94a3b8";
      codeCtx.font = "bold 11px monospace";
      codeCtx.fillText("ninh@workspace: ~/core_services.py", 70, 18);

      // Code body
      codeCtx.font = "12px monospace";
      const startY = 46 - (offset % 22);
      const lineIndexOffset = Math.floor(offset / 22);

      for (let i = 0; i < 15; i++) {
        const lineIdx = (lineIndexOffset + i) % codeLines.length;
        const line = codeLines[lineIdx];
        const y = startY + i * 20;

        if (y < 32 || y > 330) continue;

        // Line number
        codeCtx.fillStyle = "#475569";
        codeCtx.fillText(String(lineIdx + 1).padStart(2, "0"), 12, y);

        // Syntax highlighting
        if (line.startsWith("//")) {
          codeCtx.fillStyle = "#64748b";
        } else if (line.startsWith("import") || line.startsWith("from") || line.startsWith("async") || line.startsWith("def") || line.startsWith("return")) {
          codeCtx.fillStyle = "#c084fc";
        } else if (line.startsWith("@")) {
          codeCtx.fillStyle = "#38bdf8";
        } else if (line.includes("'")) {
          codeCtx.fillStyle = "#4ade80";
        } else {
          codeCtx.fillStyle = "#e2e8f0";
        }

        codeCtx.fillText(line, 40, y);
      }

      screenTexture.needsUpdate = true;
    };

    // 15. ANIMATION LOOP (60fps render loop)
    let animationFrameId: number;
    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsedTime = (now - startTime) / 1000;

      // Update OrbitControls
      controls.update();

      // 1. Rhythmic Mechanical Typing Movement
      animRefs.current.typingTime += delta * 12;
      const t = animRefs.current.typingTime;

      // Depress random keys in sequence
      const keys = animRefs.current.keys;
      keys.forEach((key, idx) => {
        const keyOffset = Math.sin(t + idx * 0.7);
        if (keyOffset > 0.6) {
          key.position.y = 0.008; // Pressed down
          (key.material as THREE.MeshStandardMaterial).color.setHex(0x0284c7);
        } else {
          key.position.y = 0.02; // Rest
          (key.material as THREE.MeshStandardMaterial).color.setHex(0x1e293b);
        }
      });

      // Rhythmic Fingers Tapping
      const leftFingers = animRefs.current.leftFingers;
      leftFingers.forEach((finger, idx) => {
        finger.position.y = 0.03 + Math.sin(t * 1.5 + idx * 1.2) * 0.012;
      });

      const rightFingers = animRefs.current.rightFingers;
      rightFingers.forEach((finger, idx) => {
        finger.position.y = 0.03 + Math.cos(t * 1.4 + idx * 1.3) * 0.012;
      });

      // 2. Rising Coffee Steam Particles
      if (animRefs.current.steamParticles) {
        const positions = animRefs.current.steamParticles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += delta * 0.22; // Rise
          positions[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.001; // Drift
          if (positions[i * 3 + 1] > 1.7) {
            positions[i * 3 + 1] = 1.25;
            positions[i * 3] = -1.0 + (Math.random() - 0.5) * 0.06;
          }
        }
        animRefs.current.steamParticles.geometry.attributes.position.needsUpdate = true;
      }

      // 3. Gentle Floating Clouds Drift
      cloudsGroup.children.forEach((cloud, i) => {
        cloud.position.y = cloudSpheres[i][1] + Math.sin(elapsedTime * 1.2 + i) * 0.02;
      });

      // 4. Live Code Scroll on Screen
      animRefs.current.codeScrollOffset += delta * 14;
      if (Math.floor(animRefs.current.codeScrollOffset) % 4 === 0) {
        drawScreenCode(animRefs.current.codeScrollOffset);
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());
    setIsLoaded(true);

    // 16. RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // CLEANUP ON UNMOUNT
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Sync FocusMode & ActiveProject with Three.js Lighting
  useEffect(() => {
    const lampLight = animRefs.current.lampLight;
    const lampBulb = animRefs.current.lampBulb;
    if (!lampLight || !lampBulb) return;

    if (focusMode) {
      lampLight.color.setHex(0xf59e0b); // Warm Amber
      lampLight.intensity = 3.4;
      (lampBulb.material as THREE.MeshStandardMaterial).emissive.setHex(0xf59e0b);
      (lampBulb.material as THREE.MeshStandardMaterial).emissiveIntensity = 3.0;
    } else if (activeProject === "chess") {
      lampLight.color.setHex(0x8b5cf6); // Purple
      lampLight.intensity = 2.4;
      (lampBulb.material as THREE.MeshStandardMaterial).emissive.setHex(0x8b5cf6);
      (lampBulb.material as THREE.MeshStandardMaterial).emissiveIntensity = 2.2;
    } else if (activeProject === "green-sm") {
      lampLight.color.setHex(0x22c55e); // Green
      lampLight.intensity = 2.4;
      (lampBulb.material as THREE.MeshStandardMaterial).emissive.setHex(0x22c55e);
      (lampBulb.material as THREE.MeshStandardMaterial).emissiveIntensity = 2.2;
    } else {
      lampLight.color.setHex(0xfef08a); // Soft Warm Yellow
      lampLight.intensity = 2.0;
      (lampBulb.material as THREE.MeshStandardMaterial).emissive.setHex(0xfef08a);
      (lampBulb.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.8;
    }
  }, [focusMode, activeProject]);

  return (
    <div className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden select-none ${className}`}>
      {/* 3D WebGL Mounting Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="Kéo chuột để xoay 360 độ góc nhìn 3D"
      />

      {/* Floating 3D Control Hints Overlay */}
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none z-20">
        <div className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[rgba(23,107,135,0.18)] shadow-xs flex items-center gap-1.5 text-[10.5px] font-mono font-medium text-[#183B4E]">
          <Sparkles className="w-3 h-3 text-[#176B87] animate-pulse" />
          <span>Kéo chuột xoay 360° · Tay gõ code thật</span>
        </div>

        <button
          onClick={handleResetCamera}
          className="pointer-events-auto px-2.5 py-1 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[rgba(23,107,135,0.18)] shadow-xs flex items-center gap-1 text-[10.5px] font-mono text-[#526779] hover:text-[#183B4E] transition-all cursor-pointer active:scale-95"
          title="Đặt lại góc nhìn ban đầu"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Góc nhìn chuẩn</span>
        </button>
      </div>
    </div>
  );
};
