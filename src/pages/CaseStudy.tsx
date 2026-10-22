import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react';
import Section from '../components/site/Section';
import SectionHeading from '../components/site/SectionHeading';
import AnimatedSection from '../components/AnimatedSection';
import { AnimatedHeadline } from '../components/AnimatedHeadline';
import { DepthGrid } from '@/lib/motion';
import { getCaseStudy } from '@/data/caseStudies';
import NotFound from './NotFound';

/*
 * One template for every case study, so they read as a set:
 * deep-blue opening with the numbers → problem and approach → the flow →
 * what's inside → decisions and why → stack → next case study.
 */
const CaseStudy = () => {
  const { slug = '' } = useParams();
  const cs = getCaseStudy(slug);
  if (!cs) return <NotFound />;
  const next = getCaseStudy(cs.next);

  return (
    <>
      {/* Opening */}
      <Section tone="dark" first>
        <AnimatedSection>
          <Link to="/projects" className="link-arrow mb-10 text-white/70 hover:text-white">
            <ArrowLeft size={15} /> All work
          </Link>
        </AnimatedSection>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <AnimatedSection>
              <p className="eyebrow mb-5">{cs.kicker}</p>
            </AnimatedSection>
            <AnimatedHeadline as="h1" className="h-page text-white">
              {cs.title} <em>{cs.accent}</em>
            </AnimatedHeadline>
            <AnimatedSection delay={150}>
              <p className="lede mt-6 max-w-2xl">{cs.intro}</p>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={200} className="lg:col-span-4">
            <dl className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-[14px]">
              <div>
                <dt className="text-muted-foreground">Role</dt>
                <dd className="mt-1 font-medium text-white">{cs.role}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">When</dt>
                <dd className="mt-1 font-medium text-white">{cs.period}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Links</dt>
                <dd className="mt-1 flex flex-col gap-1.5">
                  {cs.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
                      {l.label} <ArrowUpRight size={14} />
                    </a>
                  ))}
                  {cs.privateRepo && (
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground" title="Happy to walk through it on a call.">
                      <Lock size={13} /> Private repo · walkthrough on request
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </AnimatedSection>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {cs.metrics.map((m, i) => (
            <AnimatedSection key={m.label} delay={i * 70} className="bg-[hsl(221_64%_10%)] p-6">
              <dt className="display text-[38px] leading-none text-white">{m.value}</dt>
              <dd className="mt-3 text-[14px] text-muted-foreground">{m.label}</dd>
            </AnimatedSection>
          ))}
        </dl>
      </Section>

      {/* Problem and approach */}
      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-2">
          <AnimatedSection>
            <p className="eyebrow mb-5">The problem</p>
            <p className="h-statement">{cs.problem}</p>
          </AnimatedSection>
          <AnimatedSection delay={120}>
            <p className="eyebrow mb-5">The approach</p>
            <p className="lede">{cs.approach}</p>
          </AnimatedSection>
        </div>
      </Section>

      {/* Flow */}
      <Section tone="alt">
        <SectionHeading eyebrow="Architecture" title={<>The {cs.flowTitle.toLowerCase().split(' ')[0]} <em>{cs.flowTitle.toLowerCase().split(' ').slice(1).join(' ') || 'path'}</em></>} />
        <DepthGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cs.flow.map((f, i) => (
            <AnimatedSection key={f.label} delay={i * 70} className="h-full">
              <div className="card h-full p-6">
                <span className="font-mono text-[13px] text-accent-ink">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h-card mt-5">{f.label}</h3>
                <p className="body mt-2 text-[14px]">{f.detail}</p>
              </div>
            </AnimatedSection>
          ))}
        </DepthGrid>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {cs.groups.map((g, i) => (
            <AnimatedSection key={g.title} delay={i * 80}>
              <p className="mb-4 border-b border-border pb-3 text-[14px] font-medium">{g.title}</p>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li key={it} className={`text-[14px] text-muted-foreground ${/^[A-Z_]+$|^[a-z]+$/.test(it) ? 'font-mono text-[13px]' : ''}`}>
                    {it}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Decisions */}
      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading eyebrow="Decisions" title={<>Choices, <em>and why</em></>} />
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {cs.decisions.map((d, i) => (
              <li key={d.decision} className="border-t border-border">
                <AnimatedSection className="grid gap-3 py-8 sm:grid-cols-[3rem_1fr]">
                  <span className="pt-1 font-mono text-[13px] text-accent-ink">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="h-card">{d.decision}</h3>
                    <p className="body mt-2">{d.reason}</p>
                  </div>
                </AnimatedSection>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Stack */}
      <Section tone="alt">
        <SectionHeading eyebrow="Stack" title={<>What it’s <em>built with</em></>} />
        <div className="card mt-12 grid gap-8 p-8 shadow-card sm:grid-cols-2 md:p-10 lg:grid-cols-5">
          {cs.stack.map((s) => (
            <div key={s.cat}>
              <p className="mb-3 text-[14px] font-medium">{s.cat}</p>
              <ul className="space-y-1.5 font-mono text-[12.5px] text-muted-foreground">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Next */}
      {next && (
        <Section tone="dark">
          <Link to={`/projects/${next.slug}`} className="group block">
            <p className="eyebrow mb-5">Next case study</p>
            <div className="flex items-end justify-between gap-6">
              <p className="h-page text-white transition-opacity group-hover:opacity-90">
                {next.title} <em>{next.accent}</em>
              </p>
              <ArrowRight className="mb-3 h-9 w-9 shrink-0 text-accent-ink transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.5} />
            </div>
          </Link>
        </Section>
      )}
    </>
  );
};

export default CaseStudy;
