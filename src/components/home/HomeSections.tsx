import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Copy, Minus, Plus } from 'lucide-react';
import Section from '../site/Section';
import SectionHeading from '../site/SectionHeading';
import IconTile from '../site/Icon';
import ProjectCard from '../site/ProjectCard';
import AnimatedSection from '../AnimatedSection';
import { AnimatedHeadline } from '../AnimatedHeadline';
import ContactForm from '../ContactForm';
import { DepthGrid, EASE, useViewportProgress } from '@/lib/motion';
import { PROJECTS } from '@/data/projects';
import {
  ARTICLES,
  AUDIENCES,
  JOURNEY,
  FAQ,
  MILESTONES,
  PROCESS,
  PROMISES,
  RECRUITER_FACTS,
  RECRUITER_SUMMARY,
  SHIPPED_FOR,
} from '@/data/profile';
import working from '@/assets/working.jpg';

/* ── Shipped for ───────────────────────────────────────────────────────────── */
export const ShippedFor = () => (
  <section className="border-b border-border bg-background">
    <div className="container-x flex flex-col gap-4 py-7 md:flex-row md:items-center md:gap-12">
      <span className="shrink-0 text-[13px] text-muted-foreground">Shipped for</span>
      <ul className="flex flex-1 flex-wrap items-center justify-between gap-x-8 gap-y-2">
        {SHIPPED_FOR.map((n) => (
          <li key={n} className="text-[17px] font-semibold tracking-[-0.01em] text-muted-foreground/90">
            {n}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ── What I believe (Bizlift's "What we believe") ─────────────────────────── */
export const Believe = () => (
  <Section tone="alt">
    <div className="grid gap-8 lg:grid-cols-12">
      <AnimatedSection className="lg:col-span-4">
        <p className="eyebrow">What I believe</p>
      </AnimatedSection>
      <div className="lg:col-span-8">
        <AnimatedHeadline as="h2" className="h-statement">
          Reliable software isn’t about bigger budgets. It’s about <em>doing the boring work first</em>: infrastructure as
          code, pipelines that scan before they ship, and alerts that mean something.
        </AnimatedHeadline>
        <AnimatedSection delay={150}>
          <p className="lede mt-6 max-w-2xl">
            Most teams lose weeks to manual deploys, flaky pipelines and security added at the end. I build the platform so
            that work is already done, then write it down so your team can run it without me.
          </p>
        </AnimatedSection>
      </div>
    </div>
  </Section>
);

/* ── Selected work ─────────────────────────────────────────────────────────── */
const FEATURED = ['jotem', 'aws-devsecops-pipeline', 'azure-gitops-aks'];

export const SelectedWork = () => {
  const projects = FEATURED.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean) as typeof PROJECTS;
  return (
    <Section tone="base">
      <SectionHeading
        eyebrow="Selected work"
        title={
          <>
            Built, shipped, <em>and kept running</em>
          </>
        }
        action={
          <Link to="/projects" className="btn-outline btn-sm">
            All projects <ArrowRight size={15} />
          </Link>
        }
      />
      <DepthGrid className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <AnimatedSection key={p.slug} delay={(i % 3) * 90}>
            <ProjectCard project={p} index={i} compact />
          </AnimatedSection>
        ))}
      </DepthGrid>
    </Section>
  );
};

/* ── Ways I can help: one door for each kind of visitor ───────────────────── */
export const WaysToHelp = () => (
  <Section tone="alt">
    <SectionHeading
      eyebrow="Ways I can help"
      title={
        <>
          Hiring, scaling, <em>or just starting</em>
        </>
      }
      lede="Most people arrive here for one of three reasons. Pick yours."
    />
    <DepthGrid className="mt-14 grid gap-5 lg:grid-cols-3">
      {AUDIENCES.map((a, i) => (
        <AnimatedSection key={a.who} delay={i * 80} className="h-full">
          <div className="card flex h-full flex-col p-7 shadow-card">
            <p className="mono-tag">{a.kind}</p>
            <h3 className="h-card mt-3">{a.who}</h3>
            <p className="body mt-3">{a.body}</p>
            <ul className="mt-6 space-y-2.5 border-t border-border pt-6 text-[14px]">
              {a.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <Check size={15} className="mt-0.5 shrink-0 text-accent-ink" />
                  {pt}
                </li>
              ))}
            </ul>
            <Link to={a.cta.to} className="link-arrow mt-auto pt-7 text-[14px]">
              {a.cta.label} <ArrowRight size={15} />
            </Link>
          </div>
        </AnimatedSection>
      ))}
    </DepthGrid>
  </Section>
);

/* ── Working with me: the engagement journey, heading pinned beside the steps ── */
export const Journey = () => (
  <Section tone="alt">
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            eyebrow="Working with me"
            title={
              <>
                No surprises, <em>start to finish</em>
              </>
            }
            lede="The same five steps whether it is a pipeline, a cluster or a website. You see the plan before the work, and you keep everything after it."
          />
        </div>
      </div>
      <ol className="lg:col-span-6 lg:col-start-7">
        {JOURNEY.map((s, i) => (
          <li key={s.title} className="border-t border-border py-7 last:border-b">
            <AnimatedSection delay={i * 60} className="grid grid-cols-[3.5rem_1fr] gap-4">
              <span className="font-mono text-[13px] text-accent-ink">0{i + 1}</span>
              <div>
                <h3 className="display text-[26px] leading-tight">{s.title}</h3>
                <p className="body mt-2">{s.body}</p>
              </div>
            </AnimatedSection>
          </li>
        ))}
      </ol>
    </div>
  </Section>
);

/* ── About preview (Bizlift's "You work directly with the founder") ──────── */
export const AboutPreview = () => (
  <Section tone="alt">
    <div className="grid items-start gap-12 lg:grid-cols-12">
      <AnimatedSection className="lg:col-span-4">
        <figure className="card p-4 shadow-card">
          <img src={working} alt="Ayobami at work" loading="lazy" className="aspect-square w-full rounded-xl object-cover object-[50%_30%]" />
          <figcaption className="pb-1 pt-4 text-center">
            <span className="block text-[16px] font-semibold">Ayobami Edun</span>
            <span className="text-[13px] text-muted-foreground">Cloud, DevOps & platform engineer</span>
          </figcaption>
        </figure>
      </AnimatedSection>
      <div className="lg:col-span-7 lg:col-start-6">
        <SectionHeading
          eyebrow="About me"
          title={
            <>
              From a mechanic’s bay <em>to the cloud</em>
            </>
          }
          lede="Diagnosing a car and diagnosing a distributed system are the same job: isolate the fault, test one assumption at a time, fix the cause. A few milestones on the way:"
        />
        <AnimatedSection delay={150}>
          <ul className="mt-8 space-y-4">
            {MILESTONES.map((m) => (
              <li key={m.title} className="flex gap-3.5 text-[15px] leading-relaxed">
                <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  <span className="font-semibold">{m.title}</span>
                  <span className="text-muted-foreground"> · {m.note}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link to="/about" className="btn-outline btn-sm mt-9">
            My story <ArrowRight size={15} />
          </Link>
        </AnimatedSection>
      </div>
    </div>
  </Section>
);

/* ── Promises (Bizlift's promise cards, on the deep-blue band) ────────────── */
export const Promises = () => (
  <Section tone="dark">
    <SectionHeading
      align="center"
      eyebrow="How I work"
      title={
        <>
          A few promises <em>I keep</em>
        </>
      }
      lede="The principles behind every platform I build. They stay with it after I hand it over."
    />
    <DepthGrid className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PROMISES.map((p, i) => (
        <AnimatedSection key={p.title} delay={(i % 3) * 80} className="h-full">
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors duration-300 hover:border-white/25">
            <IconTile name={p.icon} />
            <h3 className="h-card mt-6 text-white">{p.title}</h3>
            <p className="body mt-2">{p.body}</p>
          </div>
        </AnimatedSection>
      ))}
    </DepthGrid>
  </Section>
);

/* ── From commit to production (Jotem's numbered process, filled by scroll) ── */
export const Process = () => {
  const ref = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);
  useViewportProgress(ref, (p) => setFill(Math.max(0, Math.min(1, (p + 0.35) / 0.6))));
  const reached = Math.round(fill * (PROCESS.length - 1));
  return (
    <Section tone="base">
      <SectionHeading
        eyebrow="Process"
        title={
          <>
            From commit <em>to production</em>
          </>
        }
        lede="Every change takes the same path. Nothing ships by hand, and no pipeline holds a long-lived cloud key."
        action={
          <Link to="/projects/carepulse" className="btn-outline btn-sm">
            See it in a case study <ArrowRight size={15} />
          </Link>
        }
      />
      <ol ref={ref} className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
        <span className="absolute left-6 right-6 top-6 hidden h-px bg-border md:block" aria-hidden="true" />
        <span
          className="absolute left-6 top-6 hidden h-px origin-left bg-primary transition-transform duration-300 md:block"
          style={{ right: '1.5rem', transform: `scaleX(${fill})` }}
          aria-hidden="true"
        />
        {PROCESS.map((s, i) => {
          const on = i <= reached;
          return (
            <li key={s.title} className="relative">
              <span
                className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border font-mono text-[14px] transition-colors duration-500 ${
                  on ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={`h-card mt-6 transition-colors duration-500 ${on ? '' : 'text-muted-foreground'}`}>{s.title}</h3>
              <p className="body mt-2 text-[14px]">{s.body}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
};

/* ── For recruiters ────────────────────────────────────────────────────────── */
export const Recruiters = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(RECRUITER_SUMMARY);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <Section tone="alt" id="recruiters">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="For recruiters"
            title={
              <>
                The <em>20-second</em> version
              </>
            }
            lede="Everything a shortlist needs on one card, with a summary you can paste straight into your notes."
          />
          <AnimatedSection delay={150} className="mt-8 flex flex-wrap gap-3">
            <button onClick={copy} className="btn-primary" aria-live="polite">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Summary copied' : 'Copy summary'}
            </button>
            <Link to="/cv" className="btn-secondary">
              Full CV
            </Link>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={120} className="lg:col-span-7 lg:col-start-6">
          <dl className="card overflow-hidden shadow-card">
            {RECRUITER_FACTS.map(([k, v], i) => (
              <div key={k} className={`grid gap-1 px-6 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6 ${i ? 'border-t border-border' : ''}`}>
                <dt className="text-[14px] text-muted-foreground">{k}</dt>
                <dd className={`text-[14px] font-medium ${k === 'Core stack' ? 'font-mono text-[13px] font-normal' : ''}`}>
                  {k === 'Availability' || k === 'Right to work' ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {v}
                    </span>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </AnimatedSection>
      </div>
    </Section>
  );
};

/* ── Writing ───────────────────────────────────────────────────────────────── */
export const Writing = () => (
  <Section tone="alt">
    <SectionHeading
      eyebrow="Writing"
      title={
        <>
          Notes from <em>the build</em>
        </>
      }
      action={
        <a href="https://medium.com/@ayobamieae" target="_blank" rel="me noopener noreferrer" className="btn-outline btn-sm">
          All articles <ArrowUpRight size={15} />
        </a>
      }
    />
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {ARTICLES.map((a, i) => (
        <AnimatedSection key={a.href} delay={i * 80} className="h-full">
          <a href={a.href} target="_blank" rel="noopener noreferrer" className="card card-hover group flex h-full flex-col p-7">
            <p className="mono-tag">
              {a.tag} · {a.date}
            </p>
            <h3 className="h-card mt-4 transition-colors group-hover:text-accent-ink">{a.title}</h3>
            <p className="mt-auto flex items-center justify-between pt-8 text-[13px] text-muted-foreground">
              {a.read} read
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </p>
          </a>
        </AnimatedSection>
      ))}
    </div>
  </Section>
);

/* ── FAQ (Bizlift's "questions people actually ask") ─────────────────────── */
export const Faq = () => {
  const [open, setOpen] = useState(0);
  return (
    <Section tone="base">
      <SectionHeading
        align="center"
        eyebrow="FAQ"
        title={
          <>
            Questions recruiters <em>actually ask</em>
          </>
        }
      />
      <AnimatedSection delay={120} className="mx-auto mt-12 max-w-3xl space-y-3">
        {FAQ.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={`card transition-colors ${isOpen ? 'border-primary/40' : ''}`}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[16px] font-medium"
              >
                {f.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-accent-ink">
                  {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="body px-6 pb-6">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </AnimatedSection>
    </Section>
  );
};

/* ── Contact band with the working form (Bizlift's closing form) ──────────── */
export const ContactBand = () => (
  <Section tone="base" id="contact">
    <div className="grid items-center gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <AnimatedHeadline as="h2" className="h-section">
          Have a platform that needs to <em>stay up?</em>
        </AnimatedHeadline>
        <AnimatedSection delay={120}>
          <p className="lede mt-5">Tell me about the role or project. You’ll hear back from me directly, in plain language.</p>
          <ul className="mt-8 space-y-3 text-[15px]">
            {['Replies usually within a day', 'Straight to my inbox, no agency', 'Happy to walk through private code on a call'].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-accent-ink">
                  <Check size={13} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
      <AnimatedSection delay={150} className="lg:col-span-6 lg:col-start-7">
        <ContactForm />
      </AnimatedSection>
    </div>
  </Section>
);
