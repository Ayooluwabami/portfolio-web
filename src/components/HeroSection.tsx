import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { EASE, WordMask } from '@/lib/motion';
import { SITE } from '@/data/profile';
import SilkRibbons from './SilkRibbons';

/*
 * Home hero, after Bizlift's About hero: one screen, live silk ribbons sweeping through the navy,
 * short copy and two actions. A soft scrim on the left keeps the text readable over the light.
 * The words arrive just after the ribbons start their sweep.
 */

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

const HeroSection = () => (
  <section className="band-dark relative overflow-hidden lg:h-[min(100svh,820px)] lg:min-h-[620px]">
    <SilkRibbons className="pointer-events-none absolute inset-0 h-full w-full" />
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,hsl(222_70%_6%/0.7)_0%,hsl(222_70%_6%/0.2)_40%,transparent_60%)]" aria-hidden="true" />

    <div className="container-x relative z-10 flex h-full items-center pb-20 pt-32 md:pt-40 lg:pb-0 lg:pt-[76px]">
      <div className="max-w-[40rem]">
        <motion.p {...fadeUp(0.05)} className="eyebrow mb-6">
          {SITE.role.charAt(0).toUpperCase() + SITE.role.slice(1)}
        </motion.p>

        <WordMask as="h1" immediate delay={0.15} className="h-hero max-w-[15ch] text-white">
          Cloud platforms that <em>stay up</em> and ship safely.
        </WordMask>

        <motion.p {...fadeUp(0.5)} className="lede mt-6 max-w-[32rem] !text-white/75">
          I design, build and run infrastructure on AWS, Azure and GCP: Terraform, Kubernetes and security-gated CI/CD.
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
      </div>
    </div>
  </section>
);

export default HeroSection;
