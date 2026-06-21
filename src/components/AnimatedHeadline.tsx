import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3';
}

/**
 * 3-D flip-up headline — rotates in from below on a perspective axis.
 * Wraps any JSX (including gradient <span>s) without breaking markup.
 */
export const AnimatedHeadline = ({ children, className = '', delay = 0, as: Tag = 'h1' }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} style={{ perspective: '900px' }} className="overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 48, rotateX: -22 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
};

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * Word-by-word reveal — each word slides up from behind a clip mask with stagger.
 * Use for plain-text labels and sub-headings.
 */
export const WordReveal = ({ text, className = '', delay = 0 }: WordRevealProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
};
