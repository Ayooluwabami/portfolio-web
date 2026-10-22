import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import DeployRoute, { type DeployRouteHandle } from './DeployRoute';
import { EASE, WordMask, prefersReducedMotion } from '@/lib/motion';
import { SITE } from '@/data/profile';
import photoshoot from '@/assets/photoshoot.jpg';

/*
 * Home hero, sized like Jotem's: one screen on desktop (never taller than 860px), so the headline,
 * the actions and the portrait are all visible without scrolling. On wide screens a deploy packet
 * makes one trip round the pipeline route that frames it (git push, scan, build, deploy, live).
 * Proof numbers live in the strip directly below.
 */

const ROUTE_QUERY = '(min-width: 1024px)';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

const HeroSection = () => {
  const routeRef = useRef<DeployRouteHandle>(null);
  const [showRoute, setShowRoute] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(ROUTE_QUERY);
    const update = () => setShowRoute(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // The packet makes one trip round the route after the headline lands, then rests on "live".
  useEffect(() => {
    if (!showRoute) return;
    if (prefersReducedMotion()) {
      routeRef.current?.setProgress(1);
      return;
    }
    const DELAY = 900;
    const DURATION = 3600;
    let raf = 0;
    let t0 = 0;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const t = Math.min(1, Math.max(0, (now - t0 - DELAY) / DURATION));
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      routeRef.current?.setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showRoute]);

  return (
    <section className="relative">
      <div className="band-dark hero-grain relative overflow-hidden lg:flex lg:h-[min(100svh,860px)] lg:min-h-[640px] lg:items-center lg:pt-[76px]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="aurora aurora-1 -right-[10%] -top-[22%] h-[680px] w-[680px] opacity-30"
            style={{ background: 'radial-gradient(circle, hsl(223 100% 56%), transparent 62%)' }}
          />
          <div
            className="aurora aurora-2 -bottom-[28%] -left-[12%] h-[520px] w-[520px] opacity-20"
            style={{ background: 'radial-gradient(circle, hsl(222 100% 66%), transparent 62%)' }}
          />
          {showRoute && <DeployRoute ref={routeRef} className="absolute inset-0 h-full w-full" />}
        </div>

        <div className="container-x relative z-10 w-full pb-16 pt-28 md:pt-36 lg:py-0">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <motion.p {...fadeUp(0.05)} className="eyebrow mb-6">
                {SITE.role.charAt(0).toUpperCase() + SITE.role.slice(1)}
              </motion.p>

                              <WordMask as="h1" immediate delay={0.15} className="h-hero max-w-[15ch] text-white">
                  Cloud platforms that{' '}
                  <em>
                    stay up
                  </em>{' '}
                  and ship safely.
                </WordMask>

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

              <motion.p {...fadeUp(0.7)} className="mt-6 flex items-start gap-2.5 text-[14px] text-white/70">
                <span className="relative mt-[7px] flex h-2 w-2 shrink-0">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {SITE.availability} · {SITE.rightToWork}
              </motion.p>
            </div>

            <div className="relative mx-auto hidden w-full max-w-[380px] md:block lg:col-span-5 lg:ml-auto lg:mr-0">
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
                  className="aspect-[4/4.4] max-h-[min(62svh,520px)] w-full object-cover object-top"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
