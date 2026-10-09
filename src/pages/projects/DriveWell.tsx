import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Lock } from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection';
import Band from '../../components/Band';

const METRICS = [
  { value: '90%', label: 'Faster deployments via CI/CD' },
  { value: '10+', label: 'Third-party integrations' },
  { value: '40+', label: 'Validated environment variables' },
  { value: '3', label: 'Platforms served (web, mobile, admin)' },
];

const INTEGRATIONS = [
  { cat: 'Payments', items: ['Paystack', 'Flutterwave', 'Piggyvest Business'] },
  { cat: 'Messaging', items: ['Termii (SMS)', 'WhatsApp Business API', 'Mailchimp'] },
  { cat: 'Identity', items: ['Metamap (KYC/verification)'] },
  { cat: 'Maps & Location', items: ['Google Maps Platform'] },
  { cat: 'Storage', items: ['Google Cloud Storage'] },
  { cat: 'Monitoring', items: ['Papertrail (syslog)', 'Centralised log aggregation'] },
];

const DriveWell = () => (
  <div className="min-h-screen">
    <Band tone="sky" first>
      <div className="mx-auto max-w-4xl">
      <AnimatedSection>
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </AnimatedSection>

      {/* Hero */}
      <AnimatedSection delay={30}>
        <div className="">
          <span className="text-label block mb-3">Case Study</span>
          <h1 className="text-headline mb-4">DriveWell Backend</h1>
          <p className="text-subheadline max-w-2xl mb-6">
            Full backend ecosystem for a nationwide vehicle hire, towing, and documentation platform.
            Single environment-aware codebase serving admin dashboard, mobile API, and public web —
            deployed on GCP with a fully automated CI/CD pipeline.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">Backend & Cloud Engineer</span>
            <span className="px-3 py-1.5 bg-secondary text-muted-foreground text-xs font-medium rounded-full border border-border">Feb 2025 – Dec 2025</span>
            <a href="https://www.drivewellapp.com/" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-muted-foreground text-xs font-medium rounded-full border border-border hover:border-primary/40 transition-colors">
              <ExternalLink size={12} /> Live Site
            </a>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-muted-foreground text-xs font-medium rounded-full border border-border" title="The code isn’t public. Happy to walk through it on a call.">
              <Lock size={12} /> Private repo · walkthrough on request
            </span>
          </div>
        </div>
      </AnimatedSection>

      </div>
    </Band>
    <Band tone="white">
      <div className="mx-auto max-w-4xl">
      {/* Metrics */}
      <AnimatedSection delay={50}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {METRICS.map((m) => (
            <div key={m.label} className="p-4 bg-secondary/50 rounded-xl border border-border text-center">
              <p className="text-xl font-bold text-primary mb-1">{m.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{m.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Architecture */}
      <AnimatedSection delay={70}>
        <div className="">
          <h2 className="text-lg font-semibold mb-6">Architecture</h2>
          <div className="p-6 bg-secondary/50 rounded-xl border border-border">
            {/* Top-level flow */}
            <div className="flex flex-wrap gap-2 items-center justify-center mb-6">
              {[
                { label: 'Web / Admin', sub: 'Public + Dashboard' },
                { label: 'Mobile API', sub: 'React Native clients' },
                { label: 'Restana Server', sub: 'Node.js, TypeScript' },
                { label: 'MySQL + Redis', sub: 'Data + Cache/Session' },
                { label: 'GCP Compute', sub: 'Docker, GitHub Actions' },
              ].map((node, i, arr) => (
                <div key={node.label} className="flex items-center gap-2">
                  <div className="px-3 py-2 bg-background rounded-lg border border-border text-center min-w-[90px]">
                    <p className="text-xs font-semibold">{node.label}</p>
                    <p className="text-[10px] text-muted-foreground">{node.sub}</p>
                  </div>
                  {i < arr.length - 1 && <span className="text-muted-foreground text-sm">→</span>}
                </div>
              ))}
            </div>

            {/* Services breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-background border border-border rounded-lg">
                <p className="font-semibold mb-2">Platform Services</p>
                <ul className="space-y-0.5 text-muted-foreground">
                  {['Vehicle hire & availability', 'Towing request & dispatch', 'Documentation & licensing', 'Pricing engine', 'User wallet with escrow', 'CRM-style customer management'].map(s => (
                    <li key={s}>• {s}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-background border border-border rounded-lg">
                <p className="font-semibold mb-2">CI/CD Pipeline</p>
                <ul className="space-y-0.5 text-muted-foreground">
                  {['GitHub Actions trigger on push', 'Docker Buildx multi-platform build', 'Image push to GCP Container Registry', 'SSH deploy to GCE VM', 'Zero-downtime container swap', 'Papertrail log streaming'].map(s => (
                    <li key={s}>• {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      </div>
    </Band>
    <Band tone="lavender">
      <div className="mx-auto max-w-4xl">
      {/* Problem & Solution */}
      <AnimatedSection delay={90}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-secondary/50 rounded-xl border border-border">
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Challenge</h3>
            <p className="text-sm leading-relaxed">
              Three different client surfaces (web, mobile, admin) needed to be served from a single backend
              without configuration drift — while integrating 10+ external services across payments,
              messaging, identity verification, and cloud storage.
            </p>
          </div>
          <div className="p-6 bg-secondary/50 rounded-xl border border-border">
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Approach</h3>
            <p className="text-sm leading-relaxed">
              Single environment-aware codebase with 40+ validated variables preventing configuration drift.
              Redis-backed session management and JWT per surface (web + mobile). Centralised
              Papertrail logging with structured log levels across every service boundary.
            </p>
          </div>
        </div>
      </AnimatedSection>

      </div>
    </Band>
    <Band tone="white">
      <div className="mx-auto max-w-4xl">
      {/* Third-party Integrations */}
      <AnimatedSection delay={110}>
        <div className="">
          <h2 className="text-lg font-semibold mb-5">10+ Third-Party Integrations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {INTEGRATIONS.map(({ cat, items }) => (
              <div key={cat} className="p-4 bg-secondary/50 rounded-xl border border-border">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{cat}</p>
                {items.map(i => <p key={i} className="text-xs text-muted-foreground">• {i}</p>)}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      </div>
    </Band>
    <Band tone="mint">
      <div className="mx-auto max-w-4xl">
      {/* Key Decisions */}
      <AnimatedSection delay={130}>
        <div className="">
          <h2 className="text-lg font-semibold mb-5">Key Technical Decisions</h2>
          <div className="space-y-3">
            {[
              { decision: 'Restana over Express', reason: 'Restana is a minimal, zero-overhead HTTP router. For a high-throughput vehicle-hire API, the lower per-request cost matters at scale.' },
              { decision: '40+ validated environment variables', reason: 'All env vars validated on startup via a schema. The server refuses to start with missing or malformed config — prevents silent misconfigurations reaching production.' },
              { decision: 'Redis sessions over stateless JWT for web', reason: 'Server-side sessions allow instant revocation (logout all devices, account suspension). Stateless JWT cannot be invalidated without a denylist.' },
              { decision: 'Docker Buildx + GitHub Actions', reason: 'Buildx enables multi-platform images. Actions automates the full build-push-deploy cycle, eliminating manual SSH deploys that were causing inconsistency.' },
            ].map(({ decision, reason }) => (
              <div key={decision} className="p-4 bg-secondary/50 rounded-lg border border-border">
                <p className="text-sm font-semibold mb-1">{decision}</p>
                <p className="text-xs text-muted-foreground">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      </div>
    </Band>
    <Band tone="white">
      <div className="mx-auto max-w-4xl">
      {/* Nav */}
      <AnimatedSection delay={150}>
        <div className="flex flex-wrap gap-4 justify-between items-center pt-6 border-t border-border">
          <Link to="/projects/serverless-pipeline" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Serverless Pipeline
          </Link>
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
            All Projects
            <ExternalLink size={14} />
          </Link>
        </div>
      </AnimatedSection>
      </div>
    </Band>
  </div>
);

export default DriveWell;
