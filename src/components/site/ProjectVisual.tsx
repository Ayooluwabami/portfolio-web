import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Expand } from 'lucide-react';
import { Curtain } from '@/lib/motion';
import DiagramViewer from './DiagramViewer';
import type { Project } from '@/data/projects';

/*
 * The visual slot on every project card.
 *  - Live products show their real homepage, cropped to fill.
 *  - Infrastructure work shows its architecture diagram whole, on white, so the labels stay legible.
 *  - Either way, if the project has diagrams, the visual opens them full-screen.
 *  - Projects with neither show a quiet outcome panel built from their real results.
 */
const ProjectVisual = ({ project, index = 0, className = 'aspect-[4/3]' }: { project: Project; index?: number; className?: string }) => {
  const [open, setOpen] = useState<number | null>(null);
  const diagrams = project.diagrams ?? [];
  const gallery = project.image ? [{ src: project.image, caption: `${project.title}: live homepage` }, ...diagrams] : diagrams;
  const canOpen = gallery.length > 0;

  let visual;
  if (project.image) {
    visual = (
      <Curtain
        src={project.image}
        alt={`${project.title} homepage`}
        index={index}
        parallax={18}
        className={`${className} overflow-hidden rounded-2xl border border-border bg-alt`}
        imgClassName="h-full w-full object-cover object-left-top"
      />
    );
  } else if (diagrams.length) {
    visual = (
      <div className={`${className} flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-3`}>
        <img src={diagrams[0].src} alt={diagrams[0].caption} loading="lazy" className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover/visual:scale-[1.03]" />
      </div>
    );
  } else {
    const lines = (project.impact ?? project.tech.join(' • ')).split('•').map((s) => s.trim()).filter(Boolean).slice(0, 4);
    visual = (
      <div className={`${className} band-dark relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 font-mono text-[12px]`}>
        <p className="relative text-accent-ink">{project.slug}</p>
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
  }

  if (!canOpen) return visual;

  // One label system: screenshots for live products, architecture for infrastructure.
  const label = project.image
    ? `View ${gallery.length} screenshot${gallery.length > 1 ? 's' : ''}`
    : diagrams.length > 1
      ? `View ${diagrams.length} diagrams`
      : 'View architecture';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(0)}
        className="group/visual relative block w-full text-left"
        aria-label={`${label}: ${project.title}`}
      >
        {visual}
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-[hsl(221_64%_9%/0.85)] px-2.5 py-1.5 text-[12px] font-medium text-white backdrop-blur transition-colors duration-300 group-hover/visual:bg-primary">
          <Expand size={13} /> {label}
        </span>
      </button>
      <AnimatePresence>{open !== null && <DiagramViewer title={project.title} items={gallery} start={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  );
};

export default ProjectVisual;
