import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, Code2, Gauge, GitBranch, ShieldCheck, Users } from 'lucide-react';
import Section from '../components/site/Section';
import SectionHeading from '../components/site/SectionHeading';
import AnimatedSection from '../components/AnimatedSection';
import { Curtain, DepthGrid } from '@/lib/motion';
import { EDUCATION, SITE } from '@/data/profile';
import photoshoot from '@/assets/photoshoot.jpg';
import working from '@/assets/working.jpg';

const PATH = [
  { year: '2019', title: 'University of Ibadan', body: 'BA Religious Studies, 2:1. Learned to read closely and argue from evidence.' },
  { year: '2021', title: 'Auto Clinic', body: 'Diagnosed 25+ vehicles a week and trained 50+ teenagers in automotive diagnostics.' },
  { year: '2023', title: 'First backend work', body: 'Freelance APIs for startups and SMEs: payments, wallets with double-entry ledgers, booking platforms.' },
  { year: '2024', title: 'AltSchool Africa', body: 'Diploma in Backend Engineering: Node.js, TypeScript, databases and system design.' },
  { year: '2025', title: 'DriveWell and AI4AI', body: 'Made DriveWell’s deployments 90% faster on GCP. Built multi-tenant SaaS for 50+ schools.' },
  { year: '2026', title: 'Cloudboosta', body: 'Zero-trust EKS, a CodePipeline with automatic rollback, GitOps on AKS and an SLO framework.' },
];

const EXPERTISE = [
  { icon: Cloud, title: 'Cloud & platform engineering', body: 'AWS, Azure and GCP built as code with Terraform and CloudFormation. Golden paths and one-command service setup.' },
  { icon: GitBranch, title: 'CI/CD & GitOps', body: 'GitHub Actions, CodePipeline, Azure DevOps and Jenkins. ArgoCD on EKS and AKS, Helm and automatic rollback.' },
  { icon: ShieldCheck, title: 'DevSecOps', body: 'Blocking gates for secrets, SAST, SCA, IaC and images, SBOMs, OIDC, IRSA, NetworkPolicies and STRIDE.' },
  { icon: Gauge, title: 'Observability & reliability', body: 'Prometheus, Grafana, CloudWatch and X-Ray. SLOs, error budgets, runbooks and blameless postmortems.' },
  { icon: Code2, title: 'Backend development', body: 'Node.js, TypeScript and NestJS services, PostgreSQL and Redis, BullMQ queues, payments and secure auth.' },
  { icon: Users, title: 'Documentation & mentoring', body: 'Documentation-first delivery, technical writing on Medium, code reviews and mentoring young people.' },
];

const About = () => (
  <>
    <Section tone="dark" first>
      <SectionHeading
        as="h1"
        size="page"
        eyebrow="About me"
        title={
          <>
            From a mechanic’s bay <em>to the cloud</em>
          </>
        }
        lede="Diagnosing a car and diagnosing a distributed system are the same job: isolate the fault, test one assumption at a time, fix the cause rather than the symptom."
      />
    </Section>

    {/* Story */}
    <Section tone="base">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <AnimatedSection className="lg:col-span-5">
          <Curtain src={photoshoot} alt="Ayobami Edun" parallax={20} className="aspect-[4/5] overflow-hidden rounded-2xl" imgClassName="h-full w-full object-cover object-top" />
          <p className="mt-4 text-[13px] text-muted-foreground">
            {SITE.location} · eligible to work in the UK immediately
          </p>
        </AnimatedSection>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading
            eyebrow="Who I am"
            title={
              <>
                Infrastructure people <em>can rely on</em>
              </>
            }
          />
          <AnimatedSection delay={120} className="body mt-6 space-y-4 text-[16px]">
            <p>
              I’m a <span className="font-medium text-foreground">cloud, DevOps and platform engineer</span> with 3+ years of
              experience across AWS, Azure and GCP, built on a backend foundation in Node.js, TypeScript and NestJS.
            </p>
            <p>
              I’ve built a <span className="font-medium text-foreground">zero-trust EKS platform</span> with GitOps and seven
              blocking security gates, a CodePipeline that ships from git push to EC2 with automatic rollback, and serverless
              pipelines across CloudFormation nested stacks. I define SLOs and error budgets, and write the threat models and
              runbooks that keep systems understandable.
            </p>
            <p>
              I work remotely with teams across the world, owning delivery from requirements and system design through to
              cloud deployment and monitoring. I’m currently studying for the{' '}
              <span className="font-medium text-foreground">AWS Solutions Architect Associate (SAA-C03)</span>.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </Section>

    {/* Path */}
    <Section tone="alt">
      <SectionHeading
        eyebrow="The path"
        title={
          <>
            Not a straight line, <em>on purpose</em>
          </>
        }
      />
      <ol className="mt-12">
        {PATH.map((p, i) => (
          <li key={p.year} className="border-t border-border">
            <AnimatedSection delay={i * 40} className="grid gap-2 py-7 md:grid-cols-12 md:gap-6">
              <span className="display text-[34px] leading-none text-accent-ink md:col-span-2">{p.year}</span>
              <span className="h-card md:col-span-4">{p.title}</span>
              <span className="body md:col-span-6">{p.body}</span>
            </AnimatedSection>
          </li>
        ))}
      </ol>
    </Section>

    {/* What I do */}
    <Section tone="base">
      <SectionHeading
        eyebrow="What I do"
        title={
          <>
            Six things teams <em>hire me for</em>
          </>
        }
      />
      <DepthGrid className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {EXPERTISE.map(({ icon: Icon, title, body }, i) => (
          <AnimatedSection key={title} delay={(i % 3) * 80} className="h-full">
            <div className="card card-hover h-full p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-accent-ink">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className="h-card mt-6">{title}</h3>
              <p className="body mt-2">{body}</p>
            </div>
          </AnimatedSection>
        ))}
      </DepthGrid>
    </Section>

    {/* Beyond the code */}
    <Section tone="dark">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="Beyond the code"
            title={
              <>
                Building people <em>compounds</em>
              </>
            }
          />
          <AnimatedSection delay={120} className="body mt-6 space-y-4 text-[16px]">
            <p>
              I’ve mentored more than <span className="font-medium text-white">50 teenagers</span> in technical and leadership
              roles, because building people compounds faster than building software.
            </p>
            <p>
              Before software I worked in <span className="font-medium text-white">automotive technology</span>, which taught me
              precision, diagnostics and systematic fault isolation. Those habits translate directly to debugging distributed
              systems.
            </p>
            <p>
              I wrote weekly educational segments for “Gist with the Mechanic” on Splash FM, and I play in the worship team at
              Champions Church, Netherton.
            </p>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={150} className="lg:col-span-5 lg:col-start-8">
          <Curtain src={working} alt="Ayobami at work" parallax={20} className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10" imgClassName="h-full w-full object-cover object-[50%_35%]" />
        </AnimatedSection>
      </div>
    </Section>

    {/* Credentials */}
    <Section tone="alt">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Credentials"
            title={
              <>
                Study, <em>ongoing</em>
              </>
            }
          />
          <AnimatedSection delay={150}>
            <Link to="/cv" className="btn-outline btn-sm mt-8">
              Read the CV <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={100} className="lg:col-span-7 lg:col-start-6">
          <ul className="card overflow-hidden shadow-card">
            {EDUCATION.map((e, i) => (
              <li key={e.title} className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-6 py-4 ${i ? 'border-t border-border' : ''}`}>
                <span className="text-[15px] font-medium">{e.title}</span>
                <span className="text-[13px] text-muted-foreground">
                  {e.org} · <span className="font-mono">{e.year}</span>
                </span>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </Section>
  </>
);

export default About;
