import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/cv', label: 'CV' },
  { to: '/contact', label: 'Contact' },
];

const ELSEWHERE = [
  { href: 'https://github.com/Ayooluwabami', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ayobami-edun', label: 'LinkedIn' },
  { href: 'https://medium.com/@ayobamieae', label: 'Medium' },
];

const Footer = () => (
  <footer className="border-t border-border">
    <div className="container mx-auto px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-display text-lg font-bold tracking-[-0.02em]">Ayobami Edun</p>
          <p className="mt-1 text-sm text-muted-foreground">Cloud, DevOps & platform engineer · West Midlands, UK</p>
          <Link to="/contact" className="link-underline mt-5 inline-block pb-0.5 text-sm text-foreground">
            Send me a message →
          </Link>
        </div>
        <nav className="text-sm md:col-span-3" aria-label="Footer">
          <ul className="space-y-2">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="space-y-2 text-sm md:col-span-3">
          {ELSEWHERE.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="me noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Status line: real commit and build time, injected by Vite at build */}
      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-2 text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            All systems operational
          </span>
          <span>
            deployed from{' '}
            <a
              href={`https://github.com/Ayooluwabami`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {__BUILD__.branch}@{__BUILD__.sha}
            </a>
          </span>
          <span>
            built{' '}
            {new Date(__BUILD__.builtAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </p>
        <p className="flex items-center gap-3">
          <button onClick={() => window.dispatchEvent(new Event('open-shortcuts'))} className="hover:text-foreground">
            press <kbd className="rounded border border-border bg-muted px-1 text-foreground">?</kbd> for shortcuts
          </button>
          <span>© {new Date().getFullYear()} Ayobami Edun</span>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
