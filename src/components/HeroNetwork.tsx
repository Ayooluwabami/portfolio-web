import { useEffect, useRef } from 'react';

/*
 * Hero backdrop: a slow-drifting mesh of nodes with data packets travelling between them.
 * Same role as bizlift's animated hero canvas, drawn as infrastructure instead of waves.
 * Pauses off-screen and in background tabs; draws a single still frame for reduced motion.
 */

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Packet = { a: number; b: number; t: number; speed: number };

const LINK = 190;

function primaryHsl() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
  return v || '213 80% 62%';
}

const HeroNetwork = ({ className = '' }: { className?: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let frame = 0;
    let visible = true;
    let color = primaryHsl();
    const mouse = { x: -9999, y: -9999 };

    // Deterministic layout so the composition is the same on every load
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed = 7;
      const count = Math.round(Math.min(46, Math.max(18, (w * h) / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: rand() * w,
        y: rand() * h,
        vx: (rand() - 0.5) * 0.12,
        vy: (rand() - 0.5) * 0.12,
        r: rand() < 0.18 ? 2.4 : 1.4,
      }));
      packets = [];
    };

    const neighbours = (i: number) => {
      const out: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy < LINK * LINK) out.push(j);
      }
      return out;
    };

    const spawn = () => {
      if (packets.length > 9) return;
      const a = Math.floor(rand() * nodes.length);
      const n = neighbours(a);
      if (!n.length) return;
      packets.push({ a, b: n[Math.floor(rand() * n.length)], t: 0, speed: 0.006 + rand() * 0.008 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Edges, brighter near the cursor
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const mx = (a.x + b.x) / 2 - mouse.x;
          const my = (a.y + b.y) / 2 - mouse.y;
          const near = Math.max(0, 1 - Math.sqrt(mx * mx + my * my) / 260);
          const alpha = (1 - Math.sqrt(d2) / LINK) * (0.16 + near * 0.35);
          ctx.strokeStyle = `hsl(${color} / ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `hsl(${color} / ${n.r > 2 ? 0.75 : 0.4})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.r > 2) {
          ctx.strokeStyle = `hsl(${color} / 0.18)`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 7, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Packets with a short glowing tail
      for (const p of packets) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.18);
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.18);
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `hsl(${color} / 0)`);
        grad.addColorStop(1, `hsl(${color} / 0.9)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `hsl(${color} / 1)`;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20 || n.x > w + 20) n.vx *= -1;
        if (n.y < -20 || n.y > h + 20) n.vy *= -1;
      }
      for (const p of packets) p.t += p.speed;
      // A packet that arrives hops onward, like a request moving between services
      packets = packets.flatMap((p) => {
        if (p.t < 1) return [p];
        const n = neighbours(p.b).filter((j) => j !== p.a);
        return rand() < 0.6 && n.length ? [{ a: p.b, b: n[Math.floor(rand() * n.length)], t: 0, speed: p.speed }] : [];
      });
      if (rand() < 0.035) spawn();
    };

    const loop = () => {
      if (visible && !document.hidden) {
        step();
        draw();
      }
      frame = requestAnimationFrame(loop);
    };

    build();
    if (reduce) {
      draw();
    } else {
      for (let i = 0; i < 4; i++) spawn();
      frame = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onTheme = new MutationObserver(() => (color = primaryHsl()));
    onTheme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      onTheme.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none block h-full w-full ${className}`} />;
};

export default HeroNetwork;
