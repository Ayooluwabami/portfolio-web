import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/*
 * Glowing silk ribbons for the home hero, in the spirit of Bizlift's About hero but drawn live
 * in the brand blues. Each ribbon is ~70 faint strands that twist around a centre curve;
 * additive blending turns the overlaps into light. On load the ribbons sweep in from the left,
 * then keep drifting. It pauses off-screen and draws a single still frame for reduced motion.
 */

type Ribbon = {
  hue: number;
  light: number;
  /** centre line: y as a fraction of height, at x = 0 and x = 1 */
  y0: number;
  y1: number;
  bow: number;
  width: number;
  speed: number;
  twist: number;
  phase: number;
};

const RIBBONS: Ribbon[] = [
  { hue: 223, light: 60, y0: 1.05, y1: 0.0, bow: 0.1, width: 0.36, speed: 0.22, twist: 1.8, phase: 0 },
  { hue: 205, light: 64, y0: 0.72, y1: 0.06, bow: 0.12, width: 0.24, speed: 0.17, twist: 2.4, phase: 1.7 },
  { hue: 238, light: 68, y0: 1.2, y1: 0.3, bow: 0.05, width: 0.2, speed: 0.27, twist: 1.4, phase: 3.1 },
];

const STRANDS = 72;
const SEGMENTS = 48;
const INTRO_MS = 2200;

const SilkRibbons = ({ className = '' }: { className?: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = still ? 2 : (now - start) / 1000;
      const intro = still ? 1 : Math.min(1, (now - start) / INTRO_MS);
      const reveal = 1 - Math.pow(1 - intro, 3);

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      // Sweep in: the visible area grows from the left edge with a soft leading edge.
      ctx.beginPath();
      ctx.rect(0, 0, w * reveal * 1.15, h);
      ctx.clip();
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = 1.15;

      for (const rb of RIBBONS) {
        for (let k = 0; k < STRANDS; k++) {
          const s = k / (STRANDS - 1);
          // Strands at the ribbon's edges are fainter, the core brightest.
          const alpha = (0.05 + 0.16 * Math.sin(Math.PI * s)) * (0.6 + 0.4 * reveal);
          ctx.strokeStyle = `hsla(${rb.hue} 100% ${rb.light}% / ${alpha.toFixed(3)})`;
          ctx.beginPath();
          for (let i = 0; i <= SEGMENTS; i++) {
            const u = i / SEGMENTS;
            const x = (u * 1.2 - 0.1) * w;
            const centre = (rb.y0 + (rb.y1 - rb.y0) * u + rb.bow * Math.sin(Math.PI * u)) * h;
            const wave = 0.05 * h * Math.sin(u * 3.2 + t * rb.speed * 1.6 + rb.phase);
            // The twist: each strand's offset rotates along the ribbon, so it folds like silk.
            const angle = u * rb.twist * Math.PI + t * rb.speed + rb.phase + s * Math.PI;
            const spread = rb.width * h * (0.55 + 0.45 * Math.sin(u * Math.PI));
            const y = centre + wave + Math.cos(angle) * spread * (s - 0.5) * 2 * 0.5 + Math.sin(angle) * spread * 0.18;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      ctx.restore();

      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      resize();
      if (still) draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting && !document.hidden;
      if (!was && visible && !still) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    const onVis = () => {
      const was = visible;
      visible = !document.hidden;
      if (!was && visible && !still) raf = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
};

export default SilkRibbons;
