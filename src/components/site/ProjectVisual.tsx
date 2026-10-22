import { Curtain } from '@/lib/motion';
import type { Project } from '@/data/projects';

/*
 * The image slot on every project card. Live products show their real homepage;
 * infrastructure work shows a small pipeline-style panel listing that project's real outcomes.
 */
const ProjectVisual = ({ project, index = 0, className = 'aspect-[4/3]' }: { project: Project; index?: number; className?: string }) => {
  if (project.image) {
    return (
      <Curtain
        src={project.image}
        alt={`${project.title} homepage`}
        index={index}
        parallax={18}
        className={`${className} overflow-hidden rounded-2xl border border-border bg-alt`}
        imgClassName="h-full w-full object-cover object-left-top"
      />
    );
  }
  const lines = (project.impact ?? project.tech.join(' • ')).split('•').map((s) => s.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className={`${className} band-dark relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 font-mono text-[12px]`}>
      <div className="band-grid absolute inset-0" aria-hidden="true" />
      <p className="relative text-accent-ink">{project.slug} · main</p>
      <ul className="relative space-y-2 text-white/85">
        {lines.map((l) => (
          <li key={l} className="flex items-start justify-between gap-4">
            <span className="line-clamp-1">{l.toLowerCase()}</span>
            <span className="shrink-0 text-emerald-400">✓</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectVisual;
