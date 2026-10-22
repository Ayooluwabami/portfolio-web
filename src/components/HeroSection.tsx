import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import DeployRoute, { type DeployRouteHandle } from './DeployRoute';
import { EASE, WordMask, prefersReducedMotion } from '@/lib/motion';
import { SITE, STATS } from '@/data/profile';
import photoshoot from '@/assets/photoshoot.jpg';

/*
 * Home hero: the deep-blue band with drifting light (Bizlift's dark hero, in the brand blue).
 * On tall desktop screens it pins while you scroll: a deploy packet travels the pipeline route
 * around the hero, the pipeline card on the photo ticks through its stages, "stay up" lifts off
 * and the rest of the headline recedes. Everywhere else it is a normal, static hero.
 */

const PIN_QUERY = '(min-width: 1024px) and (min-height: 800px)';

// Thresholds line up with the route stages in DeployRoute (scan 0.36, build 0.58, deploy 0.79).
const STAGES = [
  { label: 'secret scan', at: 0.36 },
  { label: 'terraform plan', at: 0.58 },
  { label: 'deploy · eks', at: 0.79 },
] as const;

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
  // How many pipeline stages have passed. The static hero shows two done and the deploy running.
  const [passed, setPassed] = useState(2);

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
    if (!pin || !h1 || !pinned) {
      setPassed(2);
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
      const reached = 0.04 + p * 0.94;
      setPassed(STAGES.filter((s) => reached >= s.at).length);
      const fade = Math.min(1, p / 0.85);
      if (lift) lift.style.transform = `translateY(${(-fade * 16).toFixed(1)}px) scale(${(1 + fade * 0.05).toFixed(4)})`;
      const dim = (1 - fade * 0.55).toFixed(3);
      others.forEach((w) => (w.style.opacity = dim));
      if (side) side.style.translate = `0 ${(-p * 48).toFixed(1)}px`;
    };
    const queue = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(render);
      }
    };
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

  const live = passed >= STAGES.length;

  return (
    <section ref={pinRef} className={`relative ${pinned ? 'h-[170vh]' : ''}`}>
      <div className={`band-dark hero-grain relative overflow-hidden ${pinned ? 'sticky top-0 flex h-[100svh] items-center pt-[76px]' : ''}`}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="band-grid absolute inset-0" />
          <div
            className="aurora aurora-1 -right-[10%] -top-[22%] h-[680px] w-[680px] opacity-30"
            style={{ background: 'radial-gradient(circle, hsl(223 100% 56%), transparent 62%)' }}
          />
          <div
            className="aurora aurora-2 -bottom-[28%] -left-[12%] h-[520px] w-[520px] opacity-20"
            style={{ background: 'radial-gradient(circle, hsl(222 100% 66%), transparent 62%)' }}
          />
          {pinned && <DeployRoute ref={routeRef} className="absolute inset-0 h-full w-full" />}
        </div>

        <div className={`container-x relative z-10 ${pinned ? '' : 'pb-20 pt-36 md:pb-24 md:pt-44'}`}>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <motion.p {...fadeUp(0.05)} className="eyebrow mb-6">
                {SITE.role.charAt(0).toUpperCase() + SITE.role.slice(1)}
              </motion.p>

              <div ref={h1Ref}>
                <WordMask as="h1" immediate delay={0.15} className="h-hero max-w-[15ch] text-white">
                  Cloud platforms that{' '}
                  <em data-lift className="inline-block origin-bottom-left will-change-transform">
                    stay up
                  </em>{' '}
                  and ship safely.
                </WordMask>
              </div>

              <motion.p {...fadeUp(0.5)} className="lede mt-6 max-w-[34rem] !text-white/75">
                I design, build and run infrastructure on AWS, Azure and GCP: Terraform, Kubernetes and security-gated
                CI/CD, on a NestJS backend foundation.
              </motion.p>

              <motion.div {...fadeUp(0.62)} className="mt-10 flex flex-wrap gap-3">
                <Link to="/projects" className="btn-primary group">
                  See the work
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link to="/cv" className="btn border border-white/25 text-white hover:border-white/60">
                  Read the CV
                </Link>
              </motion.div>

              <motion.dl {...fadeUp(0.74)} className="mt-12 grid max-w-[30rem] grid-cols-3 border-t border-white/10 pt-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="display text-[30px] leading-none text-white">{s.value}</dt>
                    <dd className="mt-2 text-[13px] text-white/60">{s.label}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            <div ref={sideRef} className="relative mx-auto w-full max-w-[400px] will-change-transform lg:col-span-5 lg:ml-auto lg:mr-0">
              <motion.div
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 1.15, delay: 0.25, ease: EASE }}
                className="overflow-hidden rounded-2xl ring-1 ring-white/10"
              >
                <motion.img
                  src={photoshoot}
                  alt="Ayobami Edun"
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, delay: 0.25, ease: EASE }}
                  className="aspect-[4/4.7] w-full object-cover object-top"
                />
              </motion.div>

              {/* Pipeline card: ticks through its stages as the packet travels the route */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: EASE }}
                className="code-window absolute -left-6 bottom-6 w-[min(290px,85%)] p-4 text-[12px] sm:-left-12"
                aria-hidden="true"
              >
                <p className="mb-3 flex justify-between text-white/60">
                  <span>pipeline · main</span>
                  <span className={live ? 'text-emerald-400' : 'text-[hsl(222_100%_80%)]'}>{live ? 'live' : 'running'}</span>
                </p>
                {STAGES.map((s, i) => {
                  const done = i < passed;
                  const running = i === passed;
                  return (
                    <p key={s.label} className="mt-1.5 flex justify-between">
                      <span className={done || running ? 'text-white' : 'text-white/40'}>{s.label}</span>
                      <span className={done ? 'text-emerald-400' : running ? 'text-[hsl(222_100%_80%)]' : 'text-white/30'}>
                        {done ? 'passed' : running ? 'running' : 'queued'}
                      </span>
                    </p>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
