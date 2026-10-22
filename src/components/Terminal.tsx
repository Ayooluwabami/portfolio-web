import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

/*
 * A small working shell. `cd` and `open` really navigate; the rest answers from real portfolio data.
 * Opens with the backtick key, the ⌘K palette, or the >_ button in the nav.
 */

export const OPEN_TERMINAL = 'open-terminal';

const PAGES: Record<string, string> = {
  '~': '/', home: '/', about: '/about', projects: '/projects', skills: '/skills', cv: '/cv', contact: '/contact',
};

const PROJECTS: { slug: string; title: string; kind: string; to?: string; href?: string }[] = [
  { slug: 'aws-devsecops', title: 'AWS DevSecOps pipeline (CodePipeline)', kind: 'repo', href: 'https://github.com/Ayooluwabami/aws-cicd-pipeline' },
  { slug: 'azure-gitops', title: 'Azure DevOps + GitOps on AKS', kind: 'repo', href: 'https://github.com/Ayooluwabami/cicd-azure-gitops-aks' },
  { slug: 'eks-zero-trust', title: 'Zero-trust EKS platform', kind: 'private', to: '/projects' },
  { slug: 'carepulse', title: 'CarePulse', kind: 'case study', to: '/projects/carepulse' },
  { slug: 'serverless-pipeline', title: 'Serverless order pipeline', kind: 'case study', to: '/projects/serverless-pipeline' },
  { slug: 'drivewell', title: 'DriveWell backend', kind: 'case study', to: '/projects/drivewell' },
  { slug: 'thina', title: 'Thina', kind: 'live', href: 'https://thina.app/' },
  { slug: 'innovaswift', title: 'InnovaSwift', kind: 'live', href: 'https://innovaswift.com.ng/' },
  { slug: 'jotem', title: 'Jotem Agro Allied', kind: 'live', href: 'https://www.jotemagro.com/' },
];

const PODS = ['auth', 'patient', 'queue', 'ai-triage', 'appointments', 'notifications', 'records', 'summaries'];

type Line = { id: number; node: ReactNode };

const Dim = ({ children }: { children: ReactNode }) => <span className="text-muted-foreground">{children}</span>;
const Hi = ({ children }: { children: ReactNode }) => <span className="text-primary">{children}</span>;
const Ok = ({ children }: { children: ReactNode }) => <span className="text-green-400">{children}</span>;

const HELP: [string, string][] = [
  ['whoami', 'who built this'],
  ['ls projects', 'list projects'],
  ['open <project>', 'open a case study or live site'],
  ['cd <page>', 'about, projects, skills, cv, contact, ~'],
  ['cat about', 'the short version'],
  ['stack', 'tools I use most'],
  ['kubectl get pods', 'CarePulse services'],
  ['terraform plan', 'check for drift'],
  ['contact', 'email me'],
  ['clear', 'clear the screen'],
  ['exit', 'close (or Esc)'],
];

let uid = 0;
const line = (node: ReactNode): Line => ({ id: ++uid, node });

const WELCOME = [
  line(<Dim>Last login: {new Date().toDateString()} on ttys001</Dim>),
  line(<>Welcome to <Hi>ayobami.dev</Hi>. Type <Hi>help</Hi> to see what this shell can do.</>),
];

const Terminal = () => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if (e.key === '`' && !typing) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_TERMINAL, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_TERMINAL, onOpen);
    };
  }, []);

  // Focus the input on open; hand focus back to whatever opened it on close.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      window.clearTimeout(t);
      if (opener && document.contains(opener)) opener.focus();
    };
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const print = (...nodes: ReactNode[]) => setLines((l) => [...l, ...nodes.map(line)]);

  const go = (to: string, label: string) => {
    print(<Dim>→ navigating to {label}</Dim>);
    window.setTimeout(() => {
      navigate(to);
      setOpen(false);
    }, 350);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    print(
      <>
        <Ok>ayobami@cloud</Ok>
        <Dim>:</Dim>
        <Hi>~</Hi>
        <Dim>$</Dim> {cmd}
      </>,
    );
    if (!cmd) return;
    setHistory((h) => [cmd, ...h].slice(0, 50));
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(' ').toLowerCase();

    switch (name.toLowerCase()) {
      case 'help':
        print(
          ...HELP.map(([c, d]) => (
            <>
              <span className="inline-block w-44 text-primary">{c}</span>
              <Dim>{d}</Dim>
            </>
          )),
        );
        break;
      case 'whoami':
        print('Ayobami Edun', <Dim>Cloud, DevOps & platform engineer · West Midlands, UK · open to cloud, DevOps, DevSecOps, SRE and platform roles</Dim>);
        break;
      case 'ls':
        if (!arg || arg === 'projects' || arg === 'projects/') {
          print(
            ...PROJECTS.map((p) => (
              <>
                <span className="inline-block w-48 text-primary">{p.slug}</span>
                <span className="inline-block w-24 text-muted-foreground">{p.kind}</span>
                {p.title}
              </>
            )),
            <Dim>Try: open aws-devsecops · open carepulse</Dim>,
          );
        } else print(<Dim>ls: {arg}: No such directory. Try ls projects</Dim>);
        break;
      case 'open': {
        const p = PROJECTS.find((x) => x.slug === arg || x.title.toLowerCase() === arg);
        if (!p) {
          print(<Dim>open: {arg || '(nothing)'}: not found. Run ls projects for names.</Dim>);
        } else if (p.to) {
          go(p.to, p.title);
        } else if (p.href) {
          print(<Dim>→ opening {p.href}</Dim>);
          window.open(p.href, '_blank', 'noopener,noreferrer');
        }
        break;
      }
      case 'cd': {
        const to = PAGES[arg || '~'] ?? PAGES[arg.replace(/^\//, '')];
        if (to) go(to, arg || 'home');
        else print(<Dim>cd: {arg}: No such page. Pages: {Object.keys(PAGES).join(', ')}</Dim>);
        break;
      }
      case 'cat':
        if (arg === 'about' || arg === 'about.md') {
          print(
            'I build backend services and run the cloud infrastructure they live on.',
            'NestJS on AWS, Azure and GCP, provisioned with Terraform, deployed to Kubernetes,',
            'shipped through pipelines that scan secrets, code, IaC and images before merge.',
            <Dim>Before software: automotive diagnostics. Same job, different engine.</Dim>,
          );
        } else if (arg === 'cv' || arg === 'cv.pdf') {
          go('/cv', 'CV');
        } else print(<Dim>cat: {arg || '(nothing)'}: No such file. Try cat about</Dim>);
        break;
      case 'stack':
        print(
          <><Hi>backend </Hi> NestJS · Node.js · TypeScript · PostgreSQL · Redis · BullMQ</>,
          <><Hi>cloud   </Hi> AWS · Azure · GCP</>,
          <><Hi>iac     </Hi> Terraform · CloudFormation</>,
          <><Hi>delivery</Hi> GitHub Actions · Jenkins · ArgoCD · Helm · Kubernetes</>,
          <><Hi>security</Hi> Semgrep · Checkov · Trivy · Gitleaks · OIDC · IRSA</>,
        );
        break;
      case 'kubectl':
        if (arg.startsWith('get pod')) {
          print(
            <Dim>
              <span className="inline-block w-56">NAME</span>
              <span className="inline-block w-16">READY</span>
              <span className="inline-block w-24">STATUS</span>RESTARTS
            </Dim>,
            ...PODS.map((p) => (
              <>
                <span className="inline-block w-56">{p}-svc</span>
                <span className="inline-block w-16">1/1</span>
                <span className="inline-block w-24 text-green-400">Running</span>0
              </>
            )),
            <Dim>namespace: carepulse · strategy: RollingUpdate · identity: IRSA</Dim>,
          );
        } else print(<Dim>Try: kubectl get pods</Dim>);
        break;
      case 'terraform':
        if (arg === 'plan') {
          print(<Dim>Refreshing state…</Dim>, <Ok>No changes. Your infrastructure matches the configuration.</Ok>);
        } else print(<Dim>Try: terraform plan</Dim>);
        break;
      case 'contact':
      case 'email':
        print(<>Opening mail to <Hi>ayobamieae@gmail.com</Hi></>);
        window.location.href = 'mailto:ayobamieae@gmail.com';
        break;
      case 'sudo':
        if (arg.startsWith('hire')) {
          print(<Ok>[sudo] permission granted.</Ok>, <>Opening mail to <Hi>ayobamieae@gmail.com</Hi>. Looking forward to it.</>);
          window.location.href = 'mailto:ayobamieae@gmail.com?subject=Let%27s%20talk';
        } else print(<Dim>Nice try. Try: sudo hire-me</Dim>);
        break;
      case 'clear':
        setLines([]);
        break;
      case 'exit':
        setOpen(false);
        break;
      default:
        print(<Dim>command not found: {name}. Type help.</Dim>);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
      setCursor(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (history[next] !== undefined) {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setInput(next >= 0 ? history[next] : '');
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Terminal"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="dark fixed inset-x-0 bottom-0 z-[90] flex h-[min(46vh,420px)] flex-col border-t border-border bg-[hsl(222_22%_6%)] font-mono text-[13px] text-foreground shadow-[0_-24px_60px_-20px_hsl(222_40%_2%/0.8)]"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="text-foreground">zsh</span>
              <span>ayobami@cloud: ~</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline">
                <kbd className="rounded bg-muted px-1">`</kbd> toggle · <kbd className="rounded bg-muted px-1">esc</kbd> close
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close terminal" className="rounded p-1 hover:bg-muted hover:text-foreground">
                <X size={14} />
              </button>
            </div>
          </div>
          <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-3 leading-relaxed" data-lenis-prevent>
            {lines.map((l) => (
              <div key={l.id} className="whitespace-pre-wrap break-words">
                {l.node}
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-green-400">ayobami@cloud</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-primary">~</span>
              <span className="mr-2 text-muted-foreground">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label="Terminal input"
                className="flex-1 bg-transparent caret-primary outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
