import type { ReactNode } from 'react';
import { WordMask } from '@/lib/motion';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3';
}

/**
 * Section heading whose words rise out of clip masks one after another as it scrolls into view
 * (bizlift's word-mask). Inline markup inside the heading survives the split.
 */
export const AnimatedHeadline = ({ children, className = '', delay = 0, as = 'h1' }: Props) => (
  <WordMask as={as} className={className} delay={delay}>
    {children}
  </WordMask>
);

/** Small label above a heading: rises as one line. */
export const WordReveal = ({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) => (
  <WordMask as="span" className={className} delay={delay}>
    {text}
  </WordMask>
);
