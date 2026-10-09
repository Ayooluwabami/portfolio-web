import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills',   label: 'Skills' },
  { to: '/cv',       label: 'CV' },
] as const;

const Navigation = () => {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-background/92 backdrop-blur-md border-b border-border py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo size="md" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-0.5 items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive(link.to) ? 'page' : undefined}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive(link.to)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {/* Active indicator — full-width underline, clearly visible */}
                {isActive(link.to) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark((p) => !p)} />
            <button
              onClick={() => window.dispatchEvent(new Event('open-terminal'))}
              className="hidden lg:flex items-center px-2 py-1 rounded border border-border text-xs
                         text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all font-mono"
              aria-label="Open terminal"
              title="Terminal (press `)"
            >
              &gt;_
            </button>
            <button
              onClick={() =>
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, metaKey: true, bubbles: true }))
              }
              className="hidden lg:flex items-center gap-1 px-2 py-1 rounded border border-border text-xs
                         text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all font-mono"
              aria-label="Open command palette"
            >
              <span>{typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform) ? '⌘' : 'Ctrl'}</span>
              <span>K</span>
            </button>
            <Link to="/contact" className="btn-primary text-sm">
              Let's talk
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark((p) => !p)} size="sm" />
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/98 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative h-full flex flex-col items-center justify-center gap-5">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.to}
                    aria-current={isActive(link.to) ? 'page' : undefined}
                    className={`text-xl font-display font-semibold transition-colors ${
                      isActive(link.to) ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
              >
                <Link to="/contact" className="btn-primary mt-4">
                  Let's talk
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
