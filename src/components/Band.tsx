import type { ReactNode } from 'react';

export type Tone = 'base' | 'white' | 'sky' | 'lavender' | 'mint' | 'ink' | 'brand';

/*
 * A full-width page section with its own background tone, so every page reads as clearly
 * separate bands (see the .tone-* rules in index.css). `first` adds room for the fixed nav.
 */
const Band = ({ tone, first = false, className = '', children }: { tone: Tone; first?: boolean; className?: string; children: ReactNode }) => {
  const toneClass =
    tone === 'base' ? '' : tone === 'ink' ? 'dark tone-ink ink-glow' : tone === 'brand' ? 'tone-brand brand-glow' : `tone-${tone}`;
  const pad = first ? 'pt-32 pb-16 md:pt-40 md:pb-20' : 'py-16 md:py-24';
  return (
    <section className={`${toneClass} ${pad} ${className}`}>
      <div className="container mx-auto px-6">{children}</div>
    </section>
  );
};

export default Band;
