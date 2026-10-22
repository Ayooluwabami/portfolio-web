import type { ReactNode } from 'react';
import AnimatedSection from '../AnimatedSection';
import { AnimatedHeadline } from '../AnimatedHeadline';

/*
 * The one heading pattern used across the site: eyebrow label, Fraunces title with an
 * italic accent phrase (<em>), optional supporting line, optional action on the right.
 */
const SectionHeading = ({
  eyebrow,
  title,
  lede,
  action,
  align = 'left',
  as = 'h2',
  size = 'section',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  size?: 'section' | 'page' | 'hero';
  className?: string;
}) => {
  const titleClass = size === 'hero' ? 'h-hero' : size === 'page' ? 'h-page' : 'h-section';
  const centered = align === 'center';
  return (
    <div className={`${action ? 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between' : ''} ${className}`}>
      <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
        {eyebrow && (
          <AnimatedSection>
            <p className="eyebrow mb-5">{eyebrow}</p>
          </AnimatedSection>
        )}
        <AnimatedHeadline as={as} className={titleClass}>
          {title}
        </AnimatedHeadline>
        {lede && (
          <AnimatedSection delay={120}>
            <p className={`lede mt-5 ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{lede}</p>
          </AnimatedSection>
        )}
      </div>
      {action && (
        <AnimatedSection delay={160} className="shrink-0">
          {action}
        </AnimatedSection>
      )}
    </div>
  );
};

export default SectionHeading;
