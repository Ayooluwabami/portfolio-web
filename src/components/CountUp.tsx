import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion';

interface Props {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Animates a number from 0 → `to` when it scrolls into view.
 * Shows `suffix` immediately after the animated value (e.g. "+", "%").
 */
const CountUp = ({ to, suffix = '', duration = 1.6, className = '' }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => ctrl.stop();
  }, [inView, to, duration, count]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

export default CountUp;
