import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { EASE } from '@/lib/motion';
import type { Visual } from '@/data/projects';

/*
 * Full-screen viewer for a project's diagrams. Arrow keys step through, Escape closes,
 * and focus returns to whatever opened it.
 */
const DiagramViewer = ({
  title,
  items,
  start,
  onClose,
}: {
  title: string;
  items: Visual[];
  start: number;
  onClose: () => void;
}) => {
  const [i, setI] = useState(start);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);

  const go = useCallback((d: number) => setI((x) => (x + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    opener.current = document.activeElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [go, onClose]);

  const item = items[i];

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} diagrams`}
      className="fixed inset-0 z-[120] flex flex-col bg-[hsl(221_64%_6%/0.94)] backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 text-white" onClick={(e) => e.stopPropagation()}>
        <p className="min-w-0 truncate text-[14px]">
          <span className="font-medium">{title}</span>
          {items.length > 1 && (
            <span className="ml-3 font-mono text-[12px] text-white/60">
              {i + 1} / {items.length}
            </span>
          )}
        </p>
        <button ref={closeRef} onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 hover:border-white/50" aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={item.src}
            src={item.src}
            alt={item.caption}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="max-h-full max-w-full rounded-xl bg-white object-contain shadow-2xl"
          />
        </AnimatePresence>
        {items.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4"
              aria-label="Previous diagram"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4"
              aria-label="Next diagram"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <p className="px-5 pb-6 text-center text-[14px] text-white/75" onClick={(e) => e.stopPropagation()}>
        {item.caption}
      </p>
    </motion.div>,
    document.body,
  );
};

export default DiagramViewer;
