import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroNetwork from './HeroNetwork';
import CodeSnippet from './CodeSnippet';
import DeployRoute, { type DeployRouteHandle } from './DeployRoute';
import { EASE, WordMask, prefersReducedMotion } from '@/lib/motion';
import photoshoot from '@/assets/photoshoot.jpg';

/*
 * Pinned, scroll-driven hero in the spirit of bizlift's: the hero holds still for a
 * stretch of scrolling while a deploy packet travels the pipeline route around it.
 * "cloud" lifts off as the rest of the headline recedes, and the photo column drifts up.
 * Pinning only switches on where the hero fits the viewport (desktop, 800px+ tall)
 * and never for reduced-motion visitors; everywhere else it is a normal hero.
 */

const SOCIALS = [
  { href: 'https://github.com/Ayooluwabami', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ayobami-edun', label: 'LinkedIn' },
  { href: 'https://medium.com/@ayobamieae', label: 'Medium' },
  { href: '/contact', label: 'Message me' },
];

const PIN_QUERY = '(min-width: 1024px) and (min-height: 800px)';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

const HeroSection = () => {
  const pinRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<DeployRouteHandle>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mq = window.matchMedia(PIN_QUERY);
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const pin = pinRef.current;
    const h1 = h1Ref.current;
    const side = sideRef.current;
    if (!pin || !h1) return;
    if (!pinned) {
      routeRef.current?.setProgress(0);
      return;
    }
    const lift = h1.querySelector<HTMLElement>('[data-lift]');
    const others = Array.from(h1.querySelectorAll<HTMLElement>('.wm-w')).filter((w) => !lift?.contains(w));
    let queued = false;
    let last = -1;
    const render = () => {
      queued = false;
      const r = pin.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.max(0, Math.min(1, -r.top / span));
      if (p === last) return;
      last = p;
      routeRef.current?.setProgress(p);
      // "cloud" literally lifts off; the other words recede so it reads on its own
      const fade = Math.min(1, p / 0.85);
      if (lift) lift.style.transform = `translateY(${(-fade * 20).toFixed(1)}px) scale(${(1 + fade * 0.06).toFixed(4)})`;
      const dim = (1 - fade * 0.62).toFixed(3);
      others.forEach((w) => (w.style.opacity = dim));
      if (side) side.style.translate = `0 ${(-p * 56).toFixed(1)}px`;
    };
    const queue = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(render);
      }
    };
    // Let the entrance word-mask finish before scroll takes over the headline
    const t = window.setTimeout(queue, 50);
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      if (lift) lift.style.transform = '';
      others.forEach((w) => (w.style.opacity = ''));
      if (side) side.style.translate = '';
    };
  }, [pinned]);

  return (
    <section ref={pinRef} className={`relative ${pinned ? 'h-[175vh]' : ''}`}>
      <div className={`hero-grain relative overflow-hidden ${pinned ? 'sticky top-0 flex h-[100svh] items-center' : ''}`}>
        {/* Atmosphere: drifting light, the infrastructure mesh, and the deploy route */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="aurora aurora-1 -right-[8%] -top-[18%] h-[640px] w-[640px] opacity-[0.16]"
            style={{ background: 'radial-gradient(circle, hsl(var(--primary)), transparent 65%)' }}
          />
          <div
            className="aurora aurora-2 -bottom-[24%] -left-[12%] h-[520px] w-[520px] opacity-[0.10]"
            style={{ background: 'radial-gradient(circle, hsl(168 70% 45%), transparent 65%)' }}
          />
          <HeroNetwork className="absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_70%_45%,black_30%,transparent_80%)]" />
          {pinned && <DeployRoute ref={routeRef} className="absolute inset-0 h-full w-full" />}
        </div>

        <div className={`container relative z-10 mx-auto px-6 ${pinned ? 'pt-20' : 'pb-20 pt-32 md:pb-28 md:pt-40'}`}>
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <motion.p
                {...fadeUp(0.05)}
                className="mb-8 inline-flex items-center gap-2.5 rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Open to cloud, DevOps and SRE roles · eligible to work in the UK
              </motion.p>

              <motion.p {...fadeUp(0.12)} className="mb-4 text-base font-medium text-foreground">
                Ayobami Edun <span className="text-muted-foreground">· Cloud, DevOps & platform engineer</span>
              </motion.p>

              {/* Words rise from their masks on load; on scroll, "cloud" lifts off */}
              <div ref={h1Ref}>
                <WordMask as="h1" immediate delay={0.2} className="text-headline mb-7 max-w-[13ch]">
                  I build the backend{' '}
                  <span className="text-muted-foreground">
                    and run the{' '}
                    <span data-lift className="relative inline-block origin-bottom text-foreground will-change-transform">
                      cloud
                      <svg
                        data-nosplit
                        className="absolute -bottom-[0.12em] left-0 h-[0.32em] w-full overflow-visible"
                        viewBox="0 0 200 20"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <motion.path
                          d="M3 14 C 50 4, 110 3, 197 9"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="5"
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 1.1, ease: EASE }}
                        />
                      </svg>
                    </span>{' '}
                    it lives on.
                  </span>
                </WordMask>
              </div>

              <motion.p {...fadeUp(0.55)} className="text-subheadline mb-9">
                Cloud, DevOps and platform engineering on AWS, Azure and GCP: Terraform, Kubernetes and security-gated
                CI/CD that <span className="font-medium text-foreground">cut deployment time by 90%</span>, on a NestJS
                backend foundation.
              </motion.p>

              <motion.div {...fadeUp(0.68)} className="mb-10 flex flex-wrap items-center gap-3">
                <Link to="/projects" className="btn-primary group flex items-center gap-2">
                  See projects
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link to="/cv" className="btn-secondary">
                  Read the CV
                </Link>
              </motion.div>

              <motion.ul {...fadeUp(0.8)} className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    {s.href.startsWith('/') ? (
                      <Link to={s.href} className="link-underline pb-0.5 transition-colors hover:text-foreground">
                        {s.label}
                      </Link>
                    ) : (
                      <a href={s.href} target="_blank" rel="me noopener noreferrer" className="link-underline pb-0.5 transition-colors hover:text-foreground">
                        {s.label}
                      </a>
                    )}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Photo with the Terraform window overlapping it; drifts up as the hero is scrolled */}
            <div ref={sideRef} className="relative mx-auto w-full max-w-[420px] will-change-transform lg:col-span-5 lg:mr-0">
              <motion.div
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 1.15, delay: 0.25, ease: EASE }}
                className="ml-auto w-[78%] overflow-hidden rounded-2xl border border-border shadow-card"
              >
                <motion.img
                  src={photoshoot}
                  alt="Ayobami Edun"
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, delay: 0.25, ease: EASE }}
                  className={`w-full object-cover object-top ${pinned ? 'aspect-[4/4.6]' : 'aspect-[4/5]'}`}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.75, ease: EASE }}
                className="relative -mt-24 w-[88%] sm:-mt-28"
              >
                <CodeSnippet />
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
