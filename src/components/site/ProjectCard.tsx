import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, Github, Lock } from 'lucide-react';
import ProjectVisual from './ProjectVisual';
import type { Project } from '@/data/projects';

/*
 * One project card for the whole site: visual, outcome (in mono), title, summary, stack, links.
 * `compact` drops the longer description and links for the home page grid.
 */
const ProjectCard = ({ project, index = 0, compact = false }: { project: Project; index?: number; compact?: boolean }) => {
  const outcome = project.impact?.split('•')[0]?.trim();
  return (
    <article className="group flex h-full flex-col">
      <ProjectVisual project={project} index={index} />
      {outcome && <p className="mono-tag mt-5">Outcome · {outcome.toLowerCase()}</p>}
      <h3 className="h-card mt-2">
        {project.caseStudy ? (
          <Link to={project.caseStudy} className="transition-colors hover:text-accent-ink">
            {project.title}
          </Link>
        ) : (
          project.title
        )}
      </h3>
      {project.role && <p className="mt-1 text-[13px] text-muted-foreground">{project.role}</p>}
      <p className="body mt-3 line-clamp-3">{project.description}</p>

      {!compact && <p className="mt-4 font-mono text-[12px] text-muted-foreground">{project.tech.slice(0, 6).join(' · ')}</p>}

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-[14px]">
        {project.caseStudy && (
          <Link to={project.caseStudy} className="link-arrow">
            Case study <ArrowRight size={15} />
          </Link>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="link-arrow">
            Live site <ArrowUpRight size={15} />
          </a>
        )}
        {!compact && project.article && (
          <a href={project.article} target="_blank" rel="noopener noreferrer" className="link-arrow">
            <BookOpen size={14} /> Write-up
          </a>
        )}
        {!compact && project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-arrow">
            <Github size={14} /> Code
          </a>
        )}
        {!compact && project.private && (
          <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground" title="The code isn’t public. Happy to walk through it on a call.">
            <Lock size={12} /> Private repo · walkthrough on request
          </span>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
