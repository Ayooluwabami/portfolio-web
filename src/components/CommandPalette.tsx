import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Keyboard, Home, User, FolderOpen, Code2, FileText, Mail, Github, Linkedin, BookOpen, ArrowRight, X } from 'lucide-react';

const COMMANDS = [
  { id: 'home',     label: 'Home',           desc: 'Go to home page',          icon: Home,      to: '/' },
  { id: 'about',    label: 'About',          desc: 'About Ayobami',            icon: User,      to: '/about' },
  { id: 'projects', label: 'Projects',       desc: 'View all projects',        icon: FolderOpen,to: '/projects' },
  { id: 'skills',   label: 'Skills',         desc: 'Technical skills',         icon: Code2,     to: '/skills' },
  { id: 'cv',       label: 'CV / Resume',    desc: 'Curriculum vitae',         icon: FileText,  to: '/cv' },
  { id: 'contact',  label: 'Contact',        desc: 'Get in touch',             icon: Mail,      to: '/contact' },
  { id: 'terminal', label: 'Open terminal',  desc: 'Press ` anytime',          icon: Terminal,  event: 'open-terminal' },
  { id: 'shortcuts', label: 'Keyboard shortcuts', desc: 'Press ? anytime',      icon: Keyboard,  event: 'open-shortcuts' },
  { id: 'github',   label: 'GitHub',         desc: 'github.com/Ayooluwabami',  icon: Github,    href: 'https://github.com/Ayooluwabami' },
  { id: 'linkedin', label: 'LinkedIn',       desc: 'linkedin.com/in/ayobami-edun', icon: Linkedin, href: 'https://www.linkedin.com/in/ayobami-edun' },
  { id: 'medium',   label: 'Medium',         desc: 'Technical writing',        icon: BookOpen,  href: 'https://medium.com/@ayobamieae' },
] as const;

interface CommandPaletteProps {
  onOpen?: () => void;
}

const CommandPalette = ({ onOpen }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform);

  const filtered = query
    ? COMMANDS.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.desc.toLowerCase().includes(query.toLowerCase())
      )
    : [...COMMANDS];

  const openPalette = () => {
    setOpen(true);
    setQuery('');
    setSelected(0);
    onOpen?.();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open ? setOpen(false) : openPalette();
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const execute = (cmd: typeof COMMANDS[number]) => {
    setOpen(false);
    if ('event' in cmd) window.setTimeout(() => window.dispatchEvent(new Event(cmd.event)), 80);
    else if ('to' in cmd) navigate(cmd.to);
    else if ('href' in cmd) window.open(cmd.href, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(p => Math.min(p + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(p => Math.max(p - 1, 0)); }
    else if (e.key === 'Enter' && filtered[selected]) execute(filtered[selected]);
  };

  return (
    <>
      {/* Subtle hint button in nav — rendered separately via Navigation */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="fixed inset-x-0 top-[18%] mx-auto w-full max-w-lg z-[101] px-4"
            >
              <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
                {/* Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  <Terminal size={15} className="text-primary shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type a command or search…"
                    value={query}
                    onChange={e => { setQuery(e.target.value); setSelected(0); }}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted-foreground hover:text-foreground transition-colors">
                    <X size={15} />
                  </button>
                </div>

                {/* Commands */}
                <ul className="max-h-72 overflow-y-auto py-1.5" role="listbox">
                  {filtered.length === 0
                    ? <li className="text-sm text-muted-foreground text-center py-8">No commands found.</li>
                    : filtered.map((cmd, i) => {
                        const Icon = cmd.icon;
                        return (
                          <li key={cmd.id} role="option" aria-selected={i === selected}>
                            <button
                              onClick={() => execute(cmd)}
                              onMouseEnter={() => setSelected(i)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                i === selected ? 'bg-secondary' : 'hover:bg-secondary/50'
                              }`}
                            >
                              <Icon size={15} className="text-primary shrink-0" />
                              <span className="flex-1 min-w-0">
                                <span className="text-sm font-medium block">{cmd.label}</span>
                                <span className="text-xs text-muted-foreground truncate block">{cmd.desc}</span>
                              </span>
                              {i === selected && <ArrowRight size={13} className="text-muted-foreground shrink-0" />}
                            </button>
                          </li>
                        );
                      })}
                </ul>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span><kbd className="font-mono bg-muted px-1 rounded">↑↓</kbd> navigate</span>
                    <span><kbd className="font-mono bg-muted px-1 rounded">↵</kbd> select</span>
                    <span><kbd className="font-mono bg-muted px-1 rounded">esc</kbd> close</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {isMac ? '⌘' : 'ctrl'}K
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
