import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';

/*
 * One motion vocabulary for the whole site, modelled on bizlift.com:
 * a single long ease-out, word masks on headings, a scroll-lit statement,
 * curtain wipes on images, parallax inside frames and staggered card depth.
 * Everything checks prefers-reduced-motion and falls back to static content.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_CSS = 'cubic-bezier(.22,1,.36,1)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True once the element has scrolled into view (fires once). */
export function useInViewOnce<T extends Element>(ref: RefObject<T>, rootMargin = '0px 0px -8% 0px', threshold = 0.14) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, threshold, inView]);
  return inView;
}

/**
 * Calls `fn` with the element's position relative to the viewport centre on every scroll frame
 * while it is near the screen: -1 well below centre … 0 centred … +1 well above.
 */
export function useViewportProgress<T extends HTMLElement>(ref: RefObject<T>, fn: (p: number, el: T) => void) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let queued = false;
    const run = () => {
      queued = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -200 || r.top > vh + 200) return;
      const p = (vh / 2 - (r.top + r.height / 2)) / vh;
      fnRef.current(Math.max(-1, Math.min(1, p)), el);
    };
    const queue = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(run);
      }
    };
    run();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, [ref]);
}

/* ── Word mask: each word rises out of its own clip box ─────────────────── */

type Counter = { n: number };

function splitWords(node: ReactNode, counter: Counter, keyBase: string): ReactNode {
  if (typeof node === 'string' || typeof node === 'number') {
    const parts = String(node).split(/(\s+)/);
    return parts.map((part, i) => {
      if (!part) return null;
      if (/^\s+$/.test(part)) return ' ';
      const idx = counter.n++;
      return (
        <span key={`${keyBase}-${i}`} className="wm-w" aria-hidden="true">
          <span className="wm-i" style={{ '--i': idx } as CSSProperties}>
            {part}
          </span>
        </span>
      );
    });
  }
  if (Array.isArray(node)) return node.map((n, i) => splitWords(n, counter, `${keyBase}.${i}`));
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode; 'data-nosplit'?: boolean }>;
    if (el.props['data-nosplit'] || el.type === 'svg') return el;
    return cloneElement(el, { key: el.key ?? keyBase }, splitWords(el.props.children, counter, `${keyBase}c`));
  }
  return node;
}

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement(node)) return textOf((node as ReactElement<{ children?: ReactNode }>).props.children);
  return '';
}

/**
 * Splits its children into words that rise from clip masks, staggered 46ms apart.
 * Inline markup (spans, links) survives. `immediate` plays on mount instead of on scroll.
 */
export function WordMask({
  children,
  as: Tag = 'span',
  className = '',
  delay = 0,
  immediate = false,
  style,
}: {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
  immediate?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInViewOnce(ref as RefObject<HTMLElement>);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!immediate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => cancelAnimationFrame(id);
  }, [immediate]);
  const on = immediate ? mounted : seen;
  const label = textOf(children).replace(/\s+/g, ' ').trim();
  const content = Children.toArray(children);
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`wm ${on ? 'wm-in' : ''} ${className}`}
      style={{ ...style, '--wm-delay': `${delay}s` } as CSSProperties}
      aria-label={label}
    >
      {splitWords(content, { n: 0 }, 'w')}
    </Tag>
  );
}

/* ── Scroll-lit statement: words light up as it climbs the viewport ───── */

export function ScrubText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.trim().split(/\s+/);
  const [lit, setLit] = useState(() => (prefersReducedMotion() ? words.length : 0));
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let queued = false;
    const run = () => {
      queued = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const p = (vh * 0.84 - r.top) / (vh * 0.42);
      setLit(Math.round(Math.max(0, Math.min(1, p)) * words.length));
    };
    const queue = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(run);
      }
    };
    run();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, [words.length]);
  return (
    <p ref={ref} className={`scrub ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className={`scrub-w ${i < lit ? 'on' : ''}`}>
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}

/* ── Curtain: image frame wipes open once it is in view and loaded ─────── */

export function Curtain({
  src,
  alt,
  className = '',
  imgClassName = '',
  index = 0,
  parallax = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  index?: number;
  /** Pixels the image drifts inside its frame while scrolling past */
  parallax?: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const seen = useInViewOnce(host, '0px 0px -12% 0px', 0);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth > 0) setLoaded(true);
  }, []);
  useViewportProgress(host, (p) => {
    if (parallax && img.current) img.current.style.translate = `0 ${(p * parallax).toFixed(1)}px`;
  });
  return (
    <div ref={host} className={className}>
      <div className={`curtain ${seen && loaded ? 'curtain-in' : ''}`} style={{ '--i': index } as CSSProperties}>
        <img
          ref={img}
          src={src}
          alt={alt}
          loading={seen ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={imgClassName}
          style={parallax ? { scale: '1.12' } : undefined}
        />
      </div>
    </div>
  );
}

/* ── Staggered depth: a row of cards sits at different depths, then settles ── */

const DEPTHS = [0, 34, 12, 46, 22, 40];

/** Attach to a grid; its direct children drift to staggered depths that settle as the row centres. */
export function useStaggeredDepth<T extends HTMLElement>(ref: RefObject<T>, minColumns = 2) {
  useViewportProgress(ref, (p, el) => {
    const cols = getComputedStyle(el).gridTemplateColumns.split(' ').length;
    const kids = Array.from(el.children) as HTMLElement[];
    if (cols < minColumns) {
      kids.forEach((k) => (k.style.translate = ''));
      return;
    }
    const t = Math.max(0, -p * 2); // 1 entering from below → 0 at centre
    kids.forEach((k, i) => {
      k.style.translate = `0 ${(Math.min(1, t) * DEPTHS[i % DEPTHS.length]).toFixed(1)}px`;
    });
  });
}

/** A grid whose direct children sit at staggered depths and settle into line as the row centres. */
export function DepthGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useStaggeredDepth(ref);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
