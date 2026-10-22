import type { ReactNode } from 'react';

export type SectionTone = 'base' | 'alt' | 'dark';

/*
 * Every page is a sequence of these bands. Three tones only, all from the one blue family:
 * base (page colour), alt (soft blue-grey) and dark (deep navy with drifting light).
 * `first` adds room for the fixed navigation.
 */
const Section = ({
  tone = 'base',
  first = false,
  id,
  className = '',
  innerClassName = '',
  children,
}: {
  tone?: SectionTone;
  first?: boolean;
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) => {
  const toneClass = tone === 'dark' ? 'band-dark' : tone === 'alt' ? 'bg-alt' : 'bg-background';
  const pad = first ? 'pb-20 pt-36 md:pb-24 md:pt-44' : 'section';
  return (
    <section id={id} className={`relative overflow-hidden ${toneClass} ${className}`}>
      <div className={`container-x relative ${pad} ${innerClassName}`}>{children}</div>
    </section>
  );
};

export default Section;
