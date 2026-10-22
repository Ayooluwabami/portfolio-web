import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { EASE } from '@/lib/motion';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/cv', label: 'CV' },
] as const;

/** Initial theme: the visitor's saved choice, otherwise their system setting. */
const initialDark = () => {
  try {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const Wordmark = ({ onDark = false }: { onDark?: boolean }) => (
  <span className="flex items-center gap-3">
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-mono text-[13px] font-medium text-white">AE</span>
    <span className={`text-[15px] font-semibold tracking-[-0.01em] ${onDark ? 'text-white' : 'text-foreground'}`}>Ayobami Edun</span>
  </span>
);

const iconBtn =
  'flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground';

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(initialDark);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  }, [dark]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled ? 'border-border bg-background/90 shadow-card backdrop-blur-md' : 'border-border/60 bg-background/95 backdrop-blur-md'
        }`}
      >
        <nav className="container-x flex h-[76px] items-center justify-between" aria-label="Main">
          <Link to="/" aria-label="Ayobami Edun, home" className="transition-opacity hover:opacity-85">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={`relative rounded-lg px-3.5 py-2 text-[14px] transition-colors ${
                    isActive(l.to) ? 'font-medium text-accent-ink' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {l.label}
                  {isActive(l.to) && (
                    <motion.span layoutId="nav-active" className="absolute inset-x-3.5 -bottom-[19px] h-[2px] rounded-full bg-primary" transition={{ duration: 0.4, ease: EASE }} />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <button onClick={() => setDark((d) => !d)} className={iconBtn} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => window.dispatchEvent(new Event('open-terminal'))}
              className={`${iconBtn} hidden font-mono text-[12px] lg:flex`}
              aria-label="Open terminal"
              title="Terminal (press `)"
            >
              &gt;_
            </button>
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, metaKey: true, bubbles: true }))}
              className={`${iconBtn} hidden w-auto px-2.5 font-mono text-[12px] lg:flex`}
              aria-label="Open command palette"
            >
              {isMac ? '⌘K' : 'Ctrl K'}
            </button>
            <Link to="/#recruiters" className="ml-1 hidden rounded-lg px-3 py-2 text-[14px] font-medium text-accent-ink transition-colors hover:text-foreground xl:block">
              Recruiter view
            </Link>
            <Link to="/contact" className="btn-primary btn-sm ml-1">
              Get in touch
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button onClick={() => setDark((d) => !d)} className={iconBtn} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button onClick={() => setOpen((o) => !o)} className={iconBtn} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-x-0 top-[76px] z-40 border-b border-border bg-background shadow-card md:hidden"
          >
            <ul className="container-x space-y-1 py-5">
              {[...NAV_LINKS, { to: '/#recruiters', label: 'Recruiter view' }, { to: '/contact', label: 'Contact' }].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`block rounded-xl px-4 py-3 text-[16px] ${isActive(l.to) ? 'bg-alt font-medium text-accent-ink' : 'text-foreground'}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
