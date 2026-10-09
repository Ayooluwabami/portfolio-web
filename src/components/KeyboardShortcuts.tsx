import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

/* GitHub-style chords: press g, then a letter. ? shows the sheet. */
const GOTO: Record<string, { to: string; label: string }> = {
  h: { to: '/', label: 'Home' },
  p: { to: '/projects', label: 'Projects' },
  a: { to: '/about', label: 'About' },
  s: { to: '/skills', label: 'Skills' },
  c: { to: '/cv', label: 'CV' },
  m: { to: '/contact', label: 'Contact (message me)' },
};

const OTHER: [string, string][] = [
  ['⌘ K', 'Command palette'],
  ['`', 'Open the terminal'],
  ['?', 'This sheet'],
  ['esc', 'Close anything'],
];

export const OPEN_SHORTCUTS = 'open-shortcuts';

const Key = ({ k }: { k: string }) => (
  <kbd className="inline-flex min-w-6 items-center justify-center rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
    {k}
  </kbd>
);

const KeyboardShortcuts = () => {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const timer = useRef<number>();
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === '?') {
        setOpen((v) => !v);
        return;
      }
      if (pending) {
        const dest = GOTO[e.key.toLowerCase()];
        setPending(false);
        window.clearTimeout(timer.current);
        if (dest) {
          navigate(dest.to);
          setOpen(false);
        }
        return;
      }
      if (e.key === 'g') {
        setPending(true);
        timer.current = window.setTimeout(() => setPending(false), 1200);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_SHORTCUTS, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_SHORTCUTS, onOpen);
    };
  }, [pending, navigate]);

  return (
    <>
      {/* Tiny hint while a chord is waiting for its second key */}
      <AnimatePresence>
        {pending && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-lg border border-border bg-secondary px-3 py-2 font-mono text-xs text-muted-foreground shadow-card"
          >
            g → <span className="text-foreground">h p a s c m</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              role="dialog"
              aria-label="Keyboard shortcuts"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-2xl"
            >
              <h2 className="font-display mb-5 text-lg font-bold">Keyboard shortcuts</h2>
              <p className="mb-3 text-xs font-medium text-muted-foreground">Go to</p>
              <ul className="mb-6 space-y-2.5">
                {Object.entries(GOTO).map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between text-sm">
                    <span>{v.label}</span>
                    <span className="flex items-center gap-1.5">
                      <Key k="g" /> <Key k={k} />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mb-3 text-xs font-medium text-muted-foreground">Anywhere</p>
              <ul className="space-y-2.5">
                {OTHER.map(([k, label]) => (
                  <li key={k} className="flex items-center justify-between text-sm">
                    <span>{label}</span>
                    <Key k={k} />
                  </li>
                ))}
              </ul>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardShortcuts;
