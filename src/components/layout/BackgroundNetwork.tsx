"use client";

import { useEffect, useRef } from "react";

// ── Tunables ───────────────────────────────────────────────────────────────────
const GRID_SIZE = 64; // px between grid lines
const MAX_PULSES = 5; // concurrent glowing grid intersections

export function BackgroundNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    const setSize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    setSize();

    let scrollProg = 0;
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - H);
      scrollProg = Math.min(1, Math.max(0, window.scrollY / max));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Circuit-board style pulse nodes at grid intersections ─────────────
    class Pulse {
      col: number;
      row: number;
      t: number; // 0 -> 1 lifecycle progress
      duration: number;

      constructor(cols: number, rows: number) {
        this.col = Math.floor(Math.random() * cols);
        this.row = Math.floor(Math.random() * rows);
        this.t = 0;
        this.duration = 2.5 + Math.random() * 2;
      }

      update(dt: number) {
        this.t += dt / this.duration;
      }

      get isDone() {
        return this.t >= 1;
      }

      draw() {
        const x = this.col * GRID_SIZE;
        const y = this.row * GRID_SIZE;
        const opacity = Math.sin(this.t * Math.PI) * (0.5 + scrollProg * 0.4);
        const r = 2 + Math.sin(this.t * Math.PI) * 3;

        ctx!.beginPath();
        ctx!.arc(x, y, r + 4, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(217, 70, 239, ${opacity * 0.12})`;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(x, y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(168, 85, 247, ${opacity})`;
        ctx!.fill();
      }
    }

    let pulses: Pulse[] = [];
    let cols = Math.ceil(W / GRID_SIZE) + 1;
    let rows = Math.ceil(H / GRID_SIZE) + 1;

    // ── Scanline sweep ──────────────────────────────────────────────────────
    let scanY = 0;
    const SCAN_SPEED = 0.35;

    let rafId: number;
    let lastTime = performance.now();
    let isPaused = false;

    const draw = (now: number) => {
      if (isPaused) return;
      rafId = requestAnimationFrame(draw);
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      ctx.fillStyle = "#0a0613";
      ctx.fillRect(0, 0, W, H);

      const lineOpacity = 0.05 + scrollProg * 0.05;
      ctx.strokeStyle = `rgba(168, 85, 247, ${lineOpacity})`;
      ctx.lineWidth = 1;
      for (let c = 0; c <= cols; c++) {
        const x = c * GRID_SIZE;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        const y = r * GRID_SIZE;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      scanY = (scanY + SCAN_SPEED) % (H + 200);
      const scanGradient = ctx.createLinearGradient(0, scanY - 100, 0, scanY + 100);
      scanGradient.addColorStop(0, "rgba(217, 70, 239, 0)");
      scanGradient.addColorStop(0.5, `rgba(217, 70, 239, ${0.04 + scrollProg * 0.05})`);
      scanGradient.addColorStop(1, "rgba(217, 70, 239, 0)");
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 100, W, 200);

      if (pulses.length < MAX_PULSES && Math.random() < 0.02) {
        pulses.push(new Pulse(cols, rows));
      }
      pulses.forEach((p) => p.update(dt));
      pulses = pulses.filter((p) => !p.isDone);
      pulses.forEach((p) => p.draw());
    };

    draw(lastTime);

    const onResize = () => {
      setSize();
      cols = Math.ceil(W / GRID_SIZE) + 1;
      rows = Math.ceil(H / GRID_SIZE) + 1;
    };
    window.addEventListener("resize", onResize);

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        isPaused = true;
      } else if (isPaused) {
        isPaused = false;
        lastTime = performance.now();
        draw(lastTime);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
