"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── Interaction State Machine ────────────────────────────────────────────────
// IDLE       → globe rotates autonomously at a slow constant speed
// PROXIMITY  → cursor is within ~40% of the screen from the globe center;
//              globe starts gently tracking the cursor
// ACTIVE     → cursor is close and moving; globe rotates with cursor velocity
// MOMENTUM   → cursor left the area; globe coasts using the last velocity,
//              decaying back toward IDLE speed
type GlobeState = "idle" | "proximity" | "active" | "momentum";

export function GlobeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // ── Renderer & Scene ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const resize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Lights ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const lightsGroup = new THREE.Group();
    const violetLight = new THREE.PointLight(0xa855f7, 4, 12);
    violetLight.position.set(4, 4, 4);
    lightsGroup.add(violetLight);
    const accentLight = new THREE.PointLight(0xd946ef, 2, 8);
    accentLight.position.set(-3, -2, 3);
    lightsGroup.add(accentLight);
    scene.add(lightsGroup);

    // ── Globe Mesh ──────────────────────────────────────────────────────────
    const geo = new THREE.SphereGeometry(2.8, 64, 64);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xc4b5fd,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const globe = new THREE.Mesh(geo, mat);
    scene.add(globe);

    // Inner glow sphere
    const coreGeo = new THREE.SphereGeometry(2.72, 32, 32);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.1,
      shininess: 120,
    });
    scene.add(new THREE.Mesh(coreGeo, coreMat));

    // Orbiting dot nodes
    const nodesGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.025, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xd946ef });
    for (let i = 0; i < 55; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const phi = Math.acos(-1 + (2 * i) / 55);
      const theta = Math.sqrt(55 * Math.PI) * phi;
      node.position.setFromSphericalCoords(3.05, phi, theta);
      nodesGroup.add(node);
    }
    scene.add(nodesGroup);

    // ── Interaction State ───────────────────────────────────────────────────
    let state: GlobeState = "idle";

    // Velocity the globe is actually rotating at right now
    const vel = { x: 0, y: 0.0015 }; // start with a gentle idle spin

    // "Inertia" bucket – the last known cursor velocity
    const cursorVel = { x: 0, y: 0 };
    let lastMouseX = 0;
    let lastMouseY = 0;

    // When cursor left, we freeze vel here and decay from it
    const momentumStart = { x: 0, y: 0 };
    let momentumT = 0; // [0,1] decay progress

    // Idle target speed
    const IDLE_VY = 0.0015;
    const IDLE_VX = 0.0003;

    // Proximity radius: fraction of viewport width from globe screen centre
    const PROXIMITY_FRAC = 0.38;

    // Track whether the globe is visible (via IntersectionObserver)
    let isVisible = false;
    let isMouseTracking = false;

    // ── Mouse tracking ──────────────────────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;

      const rect = container.getBoundingClientRect();
      // Globe screen center (container is offset right on large screens)
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.5;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximityPx = window.innerWidth * PROXIMITY_FRAC;

      // Compute cursor velocity (normalized screen units)
      const rawDVX = (e.clientX - lastMouseX) / window.innerWidth;
      const rawDVY = (e.clientY - lastMouseY) / window.innerHeight;
      // Low-pass filter to smooth jitter
      cursorVel.x = cursorVel.x * 0.6 + rawDVX * 0.4;
      cursorVel.y = cursorVel.y * 0.6 + rawDVY * 0.4;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      if (dist < proximityPx) {
        // Within interaction radius
        const influence = 1 - dist / proximityPx; // 0..1, stronger toward centre
        if (influence > 0.1) {
          state = "active";
        } else {
          state = "proximity";
        }
      } else {
        // Cursor left – capture momentum and start decay
        if (state === "active" || state === "proximity") {
          momentumStart.x = vel.x;
          momentumStart.y = vel.y;
          momentumT = 0;
          state = "momentum";
        }
      }
    };

    const handleMouseLeave = () => {
      if (state === "active" || state === "proximity") {
        momentumStart.x = vel.x;
        momentumStart.y = vel.y;
        momentumT = 0;
        state = "momentum";
      }
    };

    // ── IntersectionObserver – pause when off-screen ────────────────────────
    let animationFrameId: number;
    let isPaused = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && isPaused) {
            isPaused = false;
            animate();
          } else if (!isVisible) {
            isPaused = true;
            cancelAnimationFrame(animationFrameId);
            // Return to idle so it starts cleanly next time
            state = "idle";
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Start mouse tracking only when mouse enters the document
    const startTracking = () => {
      if (!isMouseTracking) {
        isMouseTracking = true;
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
      }
    };
    const stopTracking = () => {
      isMouseTracking = false;
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };

    // Start tracking immediately
    startTracking();

    // ── Animation Loop ──────────────────────────────────────────────────────
    let time = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      if (isPaused) return;
      animationFrameId = requestAnimationFrame(animate);
      time += 0.005;

      // Slowly rotate lights for ambient depth
      lightsGroup.rotation.y = time * 0.6;
      lightsGroup.rotation.z = time * 0.3;

      // ── State machine: compute target velocity ──────────────────────────
      switch (state) {
        case "idle": {
          // Smoothly ease toward constant idle spin
          vel.x = lerp(vel.x, IDLE_VX, 0.04);
          vel.y = lerp(vel.y, IDLE_VY, 0.04);
          break;
        }

        case "proximity": {
          // Very gentle influence — barely nudges the idle rotation
          const targetVY = lerp(IDLE_VY, cursorVel.x * 0.15, 0.15);
          const targetVX = lerp(IDLE_VX, -cursorVel.y * 0.15, 0.15);
          vel.x = lerp(vel.x, targetVX, 0.025);
          vel.y = lerp(vel.y, targetVY, 0.025);
          break;
        }

        case "active": {
          // Soothing: low cap, slow lerp — feels like floating with the cursor
          const targetVY = Math.max(-0.018, Math.min(0.018, cursorVel.x * 0.6));
          const targetVX = Math.max(-0.014, Math.min(0.014, -cursorVel.y * 0.6));
          vel.x = lerp(vel.x, targetVX, 0.04);
          vel.y = lerp(vel.y, targetVY, 0.04);
          break;
        }

        case "momentum": {
          // Exponential decay from capture point back toward idle speed
          momentumT = Math.min(1, momentumT + 0.018);
          // Ease-out cubic
          const decay = 1 - Math.pow(1 - momentumT, 3);
          vel.x = lerp(momentumStart.x, IDLE_VX, decay);
          vel.y = lerp(momentumStart.y, IDLE_VY, decay);
          if (momentumT >= 1) state = "idle";
          break;
        }
      }

      // Apply velocity to meshes
      globe.rotation.y += vel.y;
      globe.rotation.x += vel.x;
      nodesGroup.rotation.y += vel.y * 1.08;
      nodesGroup.rotation.x += vel.x * 1.08;
      nodesGroup.rotation.z += 0.0004; // slow independent axis tilt

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      isPaused = true;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      stopTracking();
      window.removeEventListener("resize", resize);
      geo.dispose();
      mat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-[90%] pointer-events-none -z-10 overflow-hidden"
    >
      <div
        ref={containerRef}
        className="w-full h-full transform translate-x-0 lg:translate-x-1/4"
      />
    </div>
  );
}
