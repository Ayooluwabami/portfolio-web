import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Section from '../components/site/Section';
import SectionHeading from '../components/site/SectionHeading';
import ProjectCard from '../components/site/ProjectCard';
import AnimatedSection from '../components/AnimatedSection';
import { EASE } from '@/lib/motion';
import { PROJECTS, type Category } from '@/data/projects';

type Filter = 'featured' | 'all' | Category;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'cloud', label: 'Cloud & DevOps' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full-stack' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'all', label: 'Everything' },
];

const Projects = () => {
  const [filter, setFilter] = useState<Filter>('featured');

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: PROJECTS.length, featured: PROJECTS.filter((p) => p.featured).length };
    PROJECTS.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, []);

  const list = PROJECTS.filter((p) => (filter === 'all' ? true : filter === 'featured' ? p.featured : p.category === filter));

  return (
    <>
      <Section tone="dark" grid first>
        <SectionHeading
          as="h1"
          size="page"
          eyebrow="Work"
          title={
            <>
              Things I’ve built <em>and shipped</em>
            </>
          }
          lede="Platforms, pipelines and production backends. Each card leads with what changed because of the work, then the stack and where to read more."
        />
      </Section>

      <Section tone="base">
        <AnimatedSection>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => {
              const active = f.value === filter;
              return (
                <button
                  key={f.value}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.value)}
                  className={`relative rounded-xl px-4 py-2.5 text-[14px] font-medium transition-colors ${
                    active ? 'text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {active && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-xl bg-primary" transition={{ duration: 0.4, ease: EASE }} />}
                  <span className="relative">
                    {f.label} <span className="font-mono text-[12px] opacity-70">{counts[f.value] ?? 0}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        <div className="mt-14 grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <AnimatedSection key={`${filter}-${p.slug}`} delay={(i % 3) * 80} className="h-full">
              <ProjectCard project={p} index={i % 3} />
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section tone="alt">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="h-section">
              Smaller builds live <em>on GitHub</em>
            </h2>
            <p className="lede mt-3">Experiments, assignments and open-source work, updated as I go.</p>
          </div>
          <a href="https://github.com/Ayooluwabami" target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
            View GitHub profile <ArrowUpRight size={16} />
          </a>
        </div>
      </Section>
    </>
  );
};

export default Projects;
