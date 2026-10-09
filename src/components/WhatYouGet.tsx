import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { WordReveal, AnimatedHeadline } from './AnimatedHeadline';

/*
 * What a team gets from hiring me, stated as outcomes. Every claim points at the project that proves it,
 * so a hiring manager can check rather than take it on trust.
 */

const OUTCOMES = [
  {
    n: '01',
    title: 'Deploys nobody is scared of',
    body: 'Automated pipelines with staging, smoke tests and rollbacks, so releasing is routine instead of an event.',
    proof: 'DriveWell: manual SSH deploys replaced, 90% faster',
    to: '/projects/drivewell',
  },
  {
    n: '02',
    title: 'Security from the first commit',
    body: 'Secrets, code, infrastructure and images scanned before merge. OIDC and IRSA instead of long-lived keys.',
    proof: 'EKS DevSecOps: four gate types on every PR',
    to: '/projects',
  },
  {
    n: '03',
    title: 'Infrastructure you can read and review',
    body: 'Terraform and CloudFormation in Git, split into small stacks so a change has a small blast radius.',
    proof: 'Order pipeline: 9 independently deployable stacks',
    to: '/projects/serverless-pipeline',
  },
  {
    n: '04',
    title: 'Systems you can debug at 2am',
    body: 'Correlation IDs, structured logs, dead-letter queues and alarms that only fire when someone should act.',
    proof: 'One Logs Insights query traces any order end to end',
    to: '/projects/serverless-pipeline',
  },
  {
    n: '05',
    title: 'Backends built to be extended',
    body: 'Clear module boundaries, queues for slow work, validated config and auth that can actually be revoked.',
    proof: 'CarePulse: 8 NestJS services over Redis TCP',
    to: '/projects/carepulse',
  },
  {
    n: '06',
    title: 'Decisions written down',
    body: 'Case studies, decision notes and runbooks, so the next engineer can keep it running without me in the room.',
    proof: 'Every case study lists the choices and why',
    to: '/projects/carepulse',
  },
];

const FIRST_90 = [
  { when: 'Weeks 1–2', what: 'Learn the system, get a local environment running, ship a first small fix, map how code reaches production.' },
  { when: 'Month 1', what: 'Own a service or pipeline. Close the quick wins: flaky steps, missing alarms, keys that should be roles.' },
  { when: 'Months 2–3', what: 'Deliver a planned improvement end to end, written up so the team can review, reuse and run it.' },
];

const WhatYouGet = () => (
  <section className="dark tone-ink ink-glow section-padding">
    <div className="container mx-auto px-6">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <WordReveal text="Working with me" className="text-label mb-5" />
              <AnimatedHeadline as="h2" className="text-section-title">
                What your team gets
              </AnimatedHeadline>
            </div>
            <p className="text-muted-foreground lg:col-span-5">
              Outcomes, not adjectives. Each one links to the work that shows it.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((o, i) => (
            <AnimatedSection key={o.n} delay={(i % 3) * 70} className="bg-[hsl(222_40%_9%)]">
              <Link to={o.to} className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-primary/[0.06]">
                <span className="mb-8 font-mono text-xs text-primary">{o.n}</span>
                <h3 className="font-display mb-3 text-xl font-bold leading-snug tracking-[-0.02em]">{o.title}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
                <p className="flex items-start justify-between gap-3 border-t border-border pt-4 font-mono text-xs text-foreground/80">
                  {o.proof}
                  <ArrowUpRight size={14} className="shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </p>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* First 90 days */}
        <AnimatedSection delay={100}>
          <div className="mt-16">
            <p className="mb-6 text-sm font-medium text-foreground">How my first 90 days usually go</p>
            <ol className="grid gap-8 md:grid-cols-3">
              {FIRST_90.map((s, i) => (
                <li key={s.when} className="relative border-t border-border pt-6">
                  <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full border-2 border-primary bg-[hsl(222_45%_11%)]" />
                  {i < FIRST_90.length - 1 && <span className="absolute -top-px left-0 hidden h-px w-full bg-gradient-to-r from-primary/70 to-transparent md:block" />}
                  <p className="mb-2 font-mono text-xs text-primary">{s.when}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.what}</p>
                </li>
              ))}
            </ol>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default WhatYouGet;
