import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Always default to dark mode
    return true;
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/skills', label: 'Skills' },
    { to: '/cv', label: 'CV' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled 
            ? 'bg-background/90 backdrop-blur-md border-b border-border py-3' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md relative ${
                  isActive(link.to) 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle - Styled button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="relative flex items-center w-16 h-8 rounded-full border border-border bg-background overflow-hidden transition-all"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 flex">
                <div className="w-1/2 bg-background flex items-center justify-center">
                  <Sun size={14} className={`transition-opacity ${isDark ? 'opacity-40' : 'opacity-100'}`} />
                </div>
                <div className="w-1/2 bg-secondary flex items-center justify-center">
                  <Moon size={14} className={`transition-opacity ${isDark ? 'opacity-100' : 'opacity-40'}`} />
                </div>
              </div>
              <motion.div 
                className="absolute w-7 h-6 bg-primary rounded-full mx-0.5"
                animate={{ x: isDark ? 30 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <Link 
              to="/contact" 
              className="btn-primary text-sm py-2"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="relative flex items-center w-14 h-7 rounded-full border border-border bg-background overflow-hidden"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 flex">
                <div className="w-1/2 bg-background flex items-center justify-center">
                  <Sun size={12} className={`transition-opacity ${isDark ? 'opacity-40' : 'opacity-100'}`} />
                </div>
                <div className="w-1/2 bg-secondary flex items-center justify-center">
                  <Moon size={12} className={`transition-opacity ${isDark ? 'opacity-100' : 'opacity-40'}`} />
                </div>
              </div>
              <motion.div 
                className="absolute w-6 h-5 bg-primary rounded-full mx-0.5"
                animate={{ x: isDark ? 24 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
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
            <div className="relative h-full flex flex-col items-center justify-center gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className={`text-xl font-medium transition-colors ${
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
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link to="/contact" className="btn-primary mt-4">
                  Let's Talk
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
