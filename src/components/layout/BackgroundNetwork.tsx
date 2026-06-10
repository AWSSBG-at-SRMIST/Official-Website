"use client";

import { useEffect, useRef } from "react";

// ── Tunables ───────────────────────────────────────────────────────────────────
// Increase these to make the network denser / more visible.
const MIN_NODES = 100;
const NODE_AREA_PX2 = 7000; // one node per this many px² — lower = denser
const IDLE_CONNECT_LEFT = 110;   // left-side base connection radius (px)
const IDLE_CONNECT_RIGHT = 160;  // right-side base connection radius (px)
const SCROLL_BOOST = 1.6;        // multiplier added at full scroll

export function BackgroundNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Sizing ─────────────────────────────────────────────────────────────
    let W = window.innerWidth;
    let H = window.innerHeight;

    const setSize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    setSize();

    // ── Scroll Progress ────────────────────────────────────────────────────
    let scrollProg = 0;
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - H);
      scrollProg = Math.min(1, Math.max(0, window.scrollY / max));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Node Class ─────────────────────────────────────────────────────────
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseR: number;
      phase: number;       // per-node phase offset for ambient sine wave
      isRight: boolean;
      // Horizontal zone weight: 0 = left edge, 1 = right edge
      xFrac: number;

      constructor(forceLeft = false) {
        // Distribute nodes more evenly: give left side a guaranteed portion
        if (forceLeft) {
          this.x = Math.random() * W * 0.45;
        } else {
          this.x = Math.random() * W;
        }
        this.y = Math.random() * H;
        this.xFrac = this.x / W;
        this.isRight = this.xFrac > 0.5;

        // Ambient drift speed — right side slightly more energetic
        const speed = this.isRight
          ? 0.12 + Math.random() * 0.18
          : 0.06 + Math.random() * 0.12;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.baseR = 0.8 + Math.random() * 1.4;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(time: number) {
        // Gentle sinusoidal float — barely visible but makes it "alive"
        const sineX = Math.sin(time * 0.4 + this.phase) * 0.012;
        const sineY = Math.cos(time * 0.3 + this.phase * 1.3) * 0.012;

        this.x += this.vx + sineX;
        this.y += this.vy + sineY;

        // Wrap around edges smoothly instead of bouncing
        if (this.x < -4) this.x = W + 4;
        if (this.x > W + 4) this.x = -4;
        if (this.y < -4) this.y = H + 4;
        if (this.y > H + 4) this.y = -4;

        // Update zone fraction as node drifts
        this.xFrac = this.x / W;
        this.isRight = this.xFrac > 0.5;
      }

      draw(time: number) {
        // Ambient pulse on top of scroll boost
        const pulse = (Math.sin(time * 0.8 + this.phase) + 1) * 0.5; // 0→1
        const scrollBoost = scrollProg * 0.4;

        // Opacity ramps strongly from idle → full scroll
        const baseOpacity = this.isRight
          ? 0.55 + scrollProg * 0.55   // right: 0.55 → 1.1 (capped at 1)
          : 0.38 + scrollProg * 0.45;  // left:  0.38 → 0.83
        const opacity = baseOpacity + pulse * 0.08;

        const r = this.baseR + scrollProg * 0.6 + pulse * 0.3;

        ctx!.beginPath();
        ctx!.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(37, 99, 235, ${Math.min(1, opacity)})`;
        ctx!.fill();
      }
    }

    // ── Build Node Pool ────────────────────────────────────────────────────
    // Ensure left side has at least 40% of nodes
    const totalNodes = Math.max(MIN_NODES, Math.floor((W * H) / NODE_AREA_PX2));
    const leftGuarantee = Math.floor(totalNodes * 0.42);
    const nodes: Node[] = [
      ...Array.from({ length: leftGuarantee }, () => new Node(true)),
      ...Array.from({ length: totalNodes - leftGuarantee }, () => new Node(false)),
    ];

    // ── Animation Loop ─────────────────────────────────────────────────────
    let rafId: number;
    let time = 0;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      time += 0.016; // roughly 60fps clock

      // White background — same as the site's surface colour
      ctx.fillStyle = "#f8f9ff";
      ctx.fillRect(0, 0, W, H);

      // Update and draw nodes, then draw connections
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update(time);
        nodes[i].draw(time);

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connection threshold: balanced between left & right with scroll boost
          const bothRight = nodes[i].isRight && nodes[j].isRight;
          const base = bothRight ? IDLE_CONNECT_RIGHT : IDLE_CONNECT_LEFT;
          const threshold = base * (1 + scrollProg * SCROLL_BOOST);

          if (dist < threshold) {
            // Fade by distance + pulse, darkens strongly with scroll
            const pulse =
              (Math.sin(time * 0.6 + nodes[i].phase) + 1) * 0.5;
            const proximity = 1 - dist / threshold;
            const baseLineOp = bothRight ? 0.28 : 0.18;
            // Scroll multiplier goes from 0.75 → 2.1 at full scroll
            const lineOp =
              proximity * (baseLineOp + pulse * 0.18) *
              (0.75 + scrollProg * 1.35);

            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${Math.min(0.7, lineOp)})`;
            ctx.lineWidth = bothRight ? 1.0 : 0.55;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
    };

    draw();

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
