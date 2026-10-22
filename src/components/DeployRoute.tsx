import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react';

/*
 * The hero's scroll-driven story (bizlift flies a paper plane; this ships a release):
 * a glowing deploy packet travels a pipeline route that frames the hero — git push,
 * scan, build, deploy, live — drawing its trail and lighting each stage as it passes.
 * The parent drives it with setProgress(0..1) from the pinned scroll position.
 */

export type DeployRouteHandle = { setProgress: (p: number) => void };

// Drawn in a 1440×900 frame and scaled with `slice`, so it hugs the hero edges at any width.
const PATH = 'M 40 842 C 400 884, 900 884, 1170 808 S 1398 580, 1388 330 S 1336 96, 1440 36';
const STAGES = [
  { at: 0.12, label: 'git push · scroll ↓', dx: 0, dy: -18, anchor: 'middle' },
  { at: 0.36, label: 'scan · 7 gates', dx: 0, dy: -18, anchor: 'middle' },
  { at: 0.58, label: 'build · test', dx: 0, dy: -18, anchor: 'middle' },
  { at: 0.79, label: 'deploy', dx: -16, dy: 4, anchor: 'end' },
  { at: 0.95, label: 'live', dx: -16, dy: 4, anchor: 'end' },
] as const;

const DeployRoute = forwardRef<DeployRouteHandle, { className?: string }>(({ className = '' }, ref) => {
  const path = useRef<SVGPathElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const packet = useRef<SVGGElement>(null);
  const bob = useRef<SVGGElement>(null);
  const stageRefs = useRef<(SVGGElement | null)[]>([]);
  const total = useRef(1);
  const points = useRef<{ x: number; y: number }[]>([]);

  useLayoutEffect(() => {
    const p = path.current;
    if (!p) return;
    total.current = p.getTotalLength();
    points.current = STAGES.map((s) => p.getPointAtLength(total.current * s.at));
    stageRefs.current.forEach((g, i) => {
      const pt = points.current[i];
      if (g && pt) g.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
    });
  }, []);

  useImperativeHandle(ref, () => ({
    setProgress(raw: number) {
      const p = path.current;
      if (!p) return;
      const t = Math.max(0, Math.min(1, raw));
      const L = total.current * (0.04 + t * 0.94);
      const a = p.getPointAtLength(L);
      const b = p.getPointAtLength(Math.min(total.current, L + 2));
      const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      packet.current?.setAttribute('transform', `translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${ang.toFixed(1)})`);
      bob.current?.classList.toggle('packet-idle', t < 0.02);
      if (trail.current) trail.current.style.strokeDasharray = `${L.toFixed(1)} ${total.current + 40}`;
      const reached = 0.04 + t * 0.94;
      stageRefs.current.forEach((g, i) => g?.classList.toggle('stage-on', reached >= STAGES[i].at));
    },
  }));

  return (
    <svg className={className} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="pkt-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id="trail-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
          <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* The route, faint and dashed, then the trail drawn over it as the packet travels */}
      <path ref={path} d={PATH} fill="none" stroke="hsl(var(--muted-foreground) / 0.28)" strokeWidth="1.5" strokeDasharray="3 7" />
      <path ref={trail} d={PATH} fill="none" stroke="url(#trail-grad)" strokeWidth="2.25" strokeLinecap="round" style={{ strokeDasharray: '0 99999' }} />

      {STAGES.map((s, i) => (
        <g key={s.label} ref={(el) => (stageRefs.current[i] = el)} className={`route-stage ${i === STAGES.length - 1 ? 'stage-live' : ''}`}>
          <circle r="5" className="stage-dot" />
          <text x={s.dx} y={s.dy} textAnchor={s.anchor} className="stage-label">
            {s.label}
          </text>
        </g>
      ))}

      <g ref={packet} transform="translate(40 842)">
        <g ref={bob} className="packet-idle">
          <circle r="16" fill="hsl(var(--primary))" opacity="0.45" filter="url(#pkt-glow)" />
          <circle r="6.5" fill="hsl(var(--primary))" />
          <circle r="2.5" fill="hsl(var(--background))" />
        </g>
      </g>
    </svg>
  );
});

DeployRoute.displayName = 'DeployRoute';
export default DeployRoute;
