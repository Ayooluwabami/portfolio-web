import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, ArrowUpRight, ArrowRight, Lock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { AnimatedHeadline } from '../components/AnimatedHeadline';
import Band from '../components/Band';
import { PROJECTS as ALL_PROJECTS, type Project } from '../data/projects';

const iconLink = 'rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground';

const ProjectCard = ({ project }: { project: Project }) => {
  const impact = project.impact?.split('•').map((i) => i.trim()).filter(Boolean) ?? [];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-secondary/50 transition-colors duration-300 hover:border-primary/40">
      {project.image && project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the live ${project.title} site`}
          className="block overflow-hidden border-b border-border"
        >
          <img
            src={project.image}
            alt={`${project.title} homepage`}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </a>
      )}

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold leading-tight tracking-[-0.02em]">{project.title}</h2>
            {project.role && <p className="mt-1 text-sm font-medium text-primary">{project.role}</p>}
          </div>
          <div className="-mr-2 -mt-1 flex shrink-0 gap-1">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub repository for ${project.title}`} className={iconLink}>
                <Github size={17} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open the live ${project.title} site`} className={iconLink}>
                <ArrowUpRight size={17} />
              </a>
            )}
          </div>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        {impact.length > 0 && (
          <ul className="mb-5 space-y-1.5 border-t border-border pt-4">
            {impact.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-foreground/90">
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto space-y-4">
          <p className="font-mono text-xs leading-relaxed text-muted-foreground">{project.tech.slice(0, 8).join(' · ')}</p>
          {(project.caseStudy || project.article || project.private) && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {project.caseStudy && (
                <Link to={project.caseStudy} className="group/cs inline-flex items-center gap-2 font-medium text-primary">
                  <span className="link-underline pb-0.5">Read the case study</span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover/cs:translate-x-0.5" />
                </Link>
              )}
              {project.article && (
                <a href={project.article} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-primary">
                  <BookOpen size={14} />
                  <span className="link-underline pb-0.5">Read the write-up</span>
                </a>
              )}
              {project.private && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
                  title="The code isn't public. Happy to walk through it on a call."
                >
                  <Lock size={11} />
                  Private repo · walkthrough on request
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'featured', label: 'Featured' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'backend', label: 'Backend' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'fullstack', label: 'Full Stack' },
] as const;

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = ALL_PROJECTS.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    return project.category === filter;
  });

  return (
    <div className="min-h-screen">
      <Band tone="sky" first>
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-6xl mx-auto">
            <p className="text-label mb-5">Portfolio</p>
            <AnimatedHeadline as="h1" className="text-headline mb-6 max-w-[16ch]">
              Things I've built and shipped
            </AnimatedHeadline>
            <p className="text-subheadline">
              Backend services, cloud infrastructure and the pipelines that ship them. Each one lists my role, the stack
              and what changed because of it.
            </p>
          </div>
        </AnimatedSection>

        {/* Filter */}
        <AnimatedSection delay={50}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-1 p-1 bg-secondary/50 rounded-xl border border-border w-fit">
              {CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setFilter(category.value)}
                  className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    filter === category.value
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {filter === category.value && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-primary rounded-lg"
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </Band>
      <Band tone="white">
        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Mobile: one column in order */}
          <div className="flex flex-col gap-6 md:hidden">
            {filteredProjects.map((project) => (
              <AnimatedSection key={`${filter}-m-${project.title}`}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>

          {/* Desktop masonry: two independent columns, so cards of different heights stack without holes.
              Alternating assignment keeps the left-to-right reading order. */}
          <div className="hidden items-start gap-6 md:grid md:grid-cols-2">
            {[0, 1].map((col) => (
              <div key={`${filter}-${col}`} className="flex flex-col gap-6">
                {filteredProjects
                  .filter((_, i) => i % 2 === col)
                  .map((project, i) => (
                    <AnimatedSection key={project.title} delay={Math.min(i, 2) * 60 + col * 60}>
                      <ProjectCard project={project} />
                    </AnimatedSection>
                  ))}
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>

      </Band>
      <Band tone="brand">
        {/* GitHub CTA */}
        <AnimatedSection delay={200}>
          <div className="max-w-6xl mx-auto mt-20">
            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border pt-10">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-[-0.02em] mb-1">Want to see more?</h2>
                <p className="text-muted-foreground text-sm">Smaller builds, experiments and open-source work live on GitHub.</p>
              </div>
              <a
                href="https://github.com/Ayooluwabami"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Github size={18} />
                View GitHub profile
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </Band>
    </div>
  );
};

export default Projects;
