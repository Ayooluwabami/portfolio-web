import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../../components/AnimatedSection';
import Band from '../../components/Band';

const STACK = [
  { cat: 'Backend', items: ['NestJS 11', 'TypeScript', 'Redis (TCP transport, sorted sets)', 'Socket.io', 'BullMQ'] },
  { cat: 'Frontend', items: ['Next.js 14 (BFF pattern)', 'React Native (Expo)', 'Tailwind CSS'] },
  { cat: 'AI', items: ['Anthropic Claude API', 'AI-assisted triage', 'Post-consultation summaries'] },
  { cat: 'AWS', items: ['EKS (Kubernetes)', 'ECR', 'RDS PostgreSQL', 'ElastiCache', 'CloudWatch', 'CloudTrail'] },
  { cat: 'IaC & CI/CD', items: ['Terraform', 'CloudFormation', 'Jenkins (Helm staging → smoke test → production)'] },
  { cat: 'Security', items: ['NHS Login OIDC PKCE', 'TOTP 2FA', 'RS256 JWT', 'Token refresh mutex', 'Immutable audit log (DSP Toolkit)'] },
];

const METRICS = [
  { value: '8', label: 'NestJS microservices' },
  { value: 'IRSA', label: 'No static credentials in pods' },
  { value: '0', label: 'Downtime deployments (RollingUpdate)' },
  { value: 'DSP', label: 'NHS Toolkit–aligned audit log' },
];

const FLOW = [
  { label: 'Mobile App', sub: 'React Native' },
  { label: 'Web App', sub: 'Next.js BFF' },
  { label: 'API Gateway', sub: 'NestJS' },
  { label: 'Microservices', sub: 'Redis TCP' },
  { label: 'AWS EKS', sub: 'Kubernetes' },
  { label: 'RDS / Cache', sub: 'PostgreSQL + Redis' },
];

const CarePulse = () => (
  <div className="min-h-screen">
    <Band tone="sky" first>
      <div className="mx-auto max-w-4xl">
      {/* Back */}
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
          <h1 className="text-headline mb-4">CarePulse</h1>
          <p className="text-subheadline max-w-2xl mb-6">
            NHS-aligned community health platform — distributed microservices architecture deployed on AWS EKS,
            with AI-assisted triage, real-time queue management, and NHS Login OIDC compliance.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">Backend & Cloud Engineer</span>
            <span className="px-3 py-1.5 bg-secondary text-muted-foreground text-xs font-medium rounded-full border border-border">Jan 2026 – Present</span>
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
      <AnimatedSection delay={60}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {METRICS.map((m) => (
            <div key={m.label} className="p-4 bg-secondary/50 rounded-xl border border-border text-center">
              <p className="text-xl font-bold text-primary mb-1">{m.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{m.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Architecture diagram */}
      <AnimatedSection delay={80}>
        <div className="">
          <h2 className="text-lg font-semibold mb-6">Architecture</h2>
          <div className="p-6 bg-secondary/50 rounded-xl border border-border overflow-x-auto">
            {/* Flow */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
              {FLOW.map((node, i) => (
                <div key={node.label} className="flex items-center gap-2">
                  <div className="px-3 py-2 bg-background rounded-lg border border-border text-center min-w-[90px]">
                    <p className="text-xs font-semibold">{node.label}</p>
                    <p className="text-[10px] text-muted-foreground">{node.sub}</p>
                  </div>
                  {i < FLOW.length - 1 && <span className="text-muted-foreground text-sm">→</span>}
                </div>
              ))}
            </div>

            {/* Detail layers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="font-semibold text-primary mb-2">8 NestJS Services (Redis TCP)</p>
                <ul className="space-y-0.5 text-muted-foreground">
                  {['Auth', 'Patient', 'Queue (Redis sorted sets)', 'AI Triage (Claude API)', 'Appointments', 'Notifications', 'Records', 'Summaries'].map(s => (
                    <li key={s}>• {s}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-background border border-border rounded-lg">
                <p className="font-semibold mb-2">AWS EKS Deployment</p>
                <ul className="space-y-0.5 text-muted-foreground">
                  {['IRSA (no static credentials)', 'RollingUpdate — zero downtime', 'Pod security hardening', 'readOnlyRootFilesystem', 'runAsNonRoot', 'FluentBit DaemonSet → CloudWatch'].map(s => (
                    <li key={s}>• {s}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-background border border-border rounded-lg">
                <p className="font-semibold mb-2">Jenkins CI/CD</p>
                <ul className="space-y-0.5 text-muted-foreground">
                  {['CFN template validation', 'Lint / tests / audit', 'ECR image build & push', 'Helm staging deploy', 'Smoke test gate', 'Helm production deploy'].map(s => (
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
      <AnimatedSection delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-secondary/50 rounded-xl border border-border">
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Problem</h3>
            <p className="text-sm leading-relaxed">
              NHS community health clinics needed a digital platform that could handle patient triage, real-time
              queue management, and clinical summaries — while meeting strict NHS security and compliance requirements
              (DSP Toolkit, NHS Login, GDPR audit trails).
            </p>
          </div>
          <div className="p-6 bg-secondary/50 rounded-xl border border-border">
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Solution</h3>
            <p className="text-sm leading-relaxed">
              Distributed microservices on AWS EKS — Redis sorted sets for O(log N) queue operations,
              Claude API for AI-assisted triage returning urgency level and confidence score,
              and an immutable audit log aligned with DSP Toolkit requirements.
            </p>
          </div>
        </div>
      </AnimatedSection>

      </div>
    </Band>
    <Band tone="white">
      <div className="mx-auto max-w-4xl">
      {/* Key Decisions */}
      <AnimatedSection delay={120}>
        <div className="">
          <h2 className="text-lg font-semibold mb-5">Key Technical Decisions</h2>
          <div className="space-y-3">
            {[
              { decision: 'Redis TCP for inter-service communication', reason: 'Lower latency than HTTP for same-cluster service calls. Avoids REST overhead on the hot path.' },
              { decision: 'IRSA instead of static IAM credentials', reason: 'Pods assume IAM roles via service account annotations. No secrets to rotate, no credential leakage risk.' },
              { decision: 'Token refresh mutex', reason: 'Prevents concurrent 401s from racing to refresh — one refresh wins, others queue and reuse the new token.' },
              { decision: 'BFF pattern for Next.js', reason: 'Backend For Frontend keeps auth tokens server-side in httpOnly cookies. The client never touches a JWT.' },
              { decision: 'RollingUpdate strategy over Recreate', reason: 'Zero-downtime deploys. EKS brings up new pods before terminating old ones.' },
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
    <Band tone="mint">
      <div className="mx-auto max-w-4xl">
      {/* Tech Stack */}
      <AnimatedSection delay={140}>
        <div className="">
          <h2 className="text-lg font-semibold mb-5">Technology Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STACK.map(({ cat, items }) => (
              <div key={cat} className="p-4 bg-secondary/50 rounded-xl border border-border">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{cat}</p>
                <ul className="space-y-1">
                  {items.map(i => <li key={i} className="text-xs text-muted-foreground">• {i}</li>)}
                </ul>
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
      <AnimatedSection delay={160}>
        <div className="flex flex-wrap gap-4 justify-between items-center pt-6 border-t border-border">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            All Projects
          </Link>
          <Link to="/projects/serverless-pipeline" className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
            Next: Serverless Pipeline
            <ExternalLink size={14} />
          </Link>
        </div>
      </AnimatedSection>
      </div>
    </Band>
  </div>
);

export default CarePulse;
