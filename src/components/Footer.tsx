import { Link } from 'react-router-dom';
import { Wordmark } from './Navigation';
import { SITE, SOCIALS } from '@/data/profile';

const PAGES = [
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/cv', label: 'CV' },
  { to: '/contact', label: 'Contact' },
];

/* Deepest navy in the system: the page always ends on the darkest shade of the brand blue. */
const Footer = () => (
  <footer className="band-dark border-t border-white/10">
    <div className="container-x py-16">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark onDark />
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-muted-foreground">
            {SITE.role.charAt(0).toUpperCase() + SITE.role.slice(1)} based in the {SITE.location}.
          </p>
          <Link to="/contact" className="link-arrow mt-6">
            Send me a message <span aria-hidden="true">→</span>
          </Link>
        </div>

        <nav className="md:col-span-2 md:col-start-8" aria-label="Footer">
          <p className="mb-4 text-[14px] font-medium">Pages</p>
          <ul className="space-y-2.5 text-[14px] text-muted-foreground">
            {PAGES.map((p) => (
              <li key={p.to}>
                <Link to={p.to} className="transition-colors hover:text-foreground">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2 md:col-start-11">
          <p className="mb-4 text-[14px] font-medium">Elsewhere</p>
          <ul className="space-y-2.5 text-[14px] text-muted-foreground">
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="me noopener noreferrer" className="transition-colors hover:text-foreground">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[12px] text-muted-foreground">
        <span>
          deployed from{' '}
          <a href="https://github.com/Ayooluwabami/portfolio-web" target="_blank" rel="noopener noreferrer" className="text-accent-ink hover:underline">
            {__BUILD__.branch}@{__BUILD__.sha}
          </a>{' '}
          · built {new Date(__BUILD__.builtAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
        <span className="flex items-center gap-4">
          <button onClick={() => window.dispatchEvent(new Event('open-shortcuts'))} className="transition-colors hover:text-foreground">
            press <kbd className="rounded border border-white/15 px-1 text-foreground">?</kbd> for shortcuts
          </button>
          <span>© {new Date().getFullYear()} {SITE.name}</span>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
