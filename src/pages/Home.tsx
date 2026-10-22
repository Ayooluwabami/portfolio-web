import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { AnimatedHeadline, WordReveal } from '../components/AnimatedHeadline';
import CountUp from '../components/CountUp';
import HeroSection from '../components/HeroSection';
import StackMarquee from '../components/StackMarquee';
import PipelinePanel from '../components/PipelinePanel';
import { Curtain, DepthGrid, ScrubText } from '@/lib/motion';
import RecruiterBrief from '../components/RecruiterBrief';
import WhatYouGet from '../components/WhatYouGet';
import GitHubActivity from '../components/GitHubActivity';
import thina from '@/assets/work/thina.jpg';
import drivewell from '@/assets/work/drivewell.jpg';
import innovaswift from '@/assets/work/innovaswift.jpg';
import jotem from '@/assets/work/jotem.jpg';

const ease = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { to: 3, suffix: '+', label: 'Years building production backends' },
  { to: 20, suffix: '+', label: 'Cloud builds across AWS, Azure and GCP' },
  { to: 90, suffix: '%', label: 'Faster deployments after rebuilding CI/CD' },
];

const LIVE = [
  { title: 'Thina', role: 'Lead full-stack engineer', note: 'Recovery and mental wellness platform', href: 'https://thina.app/', img: thina },
  { title: 'DriveWell', role: 'Lead backend engineer', note: 'Vehicle hire, towing and documentation', href: 'https://www.drivewellapp.com/', img: drivewell },
  { title: 'InnovaSwift', role: 'Frontend developer', note: 'Software consultancy website', href: 'https://innovaswift.com.ng/', img: innovaswift },
  { title: 'Jotem Agro Allied', role: 'Frontend & IT admin', note: 'Commodity supplier site and email security', href: 'https://www.jotemagro.com/', img: jotem },
];

// Real posts from medium.com/@ayobamieae (most recent and most relevant first)
const ARTICLES = [
  {
    title: 'Building a Production-Grade CI/CD Pipeline on AWS: CodePipeline, CodeBuild, and CodeDeploy',
    readTime: '8 min read',
    tag: 'AWS · DevSecOps · Jul 2026',
    href: 'https://medium.com/@ayobamieae/building-a-production-grade-ci-cd-pipeline-on-aws-codepipeline-codebuild-and-codedeploy-2bde222adc24',
  },
  {
    title: 'Automating Kubernetes Deployments with Azure DevOps, GitOps, and AKS: A Security-First CI/CD',
    readTime: '11 min read',
    tag: 'Azure · Kubernetes · Jun 2026',
    href: 'https://medium.com/@ayobamieae/automating-kubernetes-deployments-with-azure-devops-gitops-and-aks-a-security-first-ci-cd-f554e189b985',
  },
  {
    title: 'Building a Highly Available Multi-Tier WordPress Platform on AWS with CloudFormation',
    readTime: '15 min read',
    tag: 'AWS · CloudFormation · Jun 2026',
    href: 'https://medium.com/@ayobamieae/building-a-highly-available-multi-tier-wordpress-platform-on-aws-with-cloudformation-2a35cad00af7',
  },
  {
    title: 'End-to-End CI/CD for an E-Commerce Application with Jenkins, Docker, ECR, ECS, and Terraform',
    readTime: '8 min read',
    tag: 'Jenkins · Terraform · Jun 2026',
    href: 'https://medium.com/@ayobamieae/end-to-end-ci-cd-for-an-e-commerce-application-with-jenkins-docker-ecr-ecs-and-terraform-3048b241ece0',
  },
];

const Home = () => (
  <div className="min-h-screen">
    <HeroSection />

    <StackMarquee />

    {/* ── About preview ── */}
    <section className="tone-white section-padding">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <AnimatedSection>
              <WordReveal text="About me" className="text-label mb-5" />
              <AnimatedHeadline as="h2" className="text-section-title mb-6 max-w-[18ch]">
                Systems where the hard work is already done
              </AnimatedHeadline>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <ScrubText
                className="font-display mb-8 text-2xl font-semibold leading-snug tracking-[-0.02em] md:text-[1.9rem]"
                text="Most teams lose weeks wiring deploys, chasing outages and bolting on security late. I build systems where that work is already done: Kubernetes with GitOps, infrastructure as code, and pipelines that scan secrets, code and containers before anything ships."
              />
              <Link to="/about" className="group inline-flex items-center gap-2 text-sm font-medium text-primary">
                <span className="link-underline pb-0.5">More about my journey</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={150} className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-border border-y border-border">
              {STATS.map((s) => (
                <div key={s.label} className="flex items-baseline gap-6 py-6">
                  <dt className="font-display tabular-nums w-28 shrink-0 text-5xl font-bold tracking-[-0.03em] text-foreground">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </dt>
                  <dd className="text-sm leading-snug text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <RecruiterBrief />

    {/* ── How I ship ── */}
    <section className="dark tone-ink ink-glow section-padding">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <AnimatedSection>
              <WordReveal text="How I ship" className="text-label mb-5" />
              <AnimatedHeadline as="h2" className="text-section-title mb-6">
                Every change takes the same path to production
              </AnimatedHeadline>
              <p className="mb-8 text-muted-foreground">
                Secrets, code, infrastructure and images are scanned before anything merges. Staging has to pass smoke
                tests before production sees it. Nothing ships by hand, and no pipeline holds a long-lived cloud key.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <ul className="divide-y divide-border border-y border-border text-sm">
                {[
                  ['OIDC, not access keys', 'CI assumes a short-lived role; pods use IRSA'],
                  ['Fails closed', 'any gate that fails stops the promotion'],
                  ['GitOps', 'ArgoCD keeps the cluster matching Git'],
                ].map(([title, body]) => (
                  <li key={title} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5">
                    <span className="font-medium text-foreground">{title}</span>
                    <span className="text-muted-foreground">{body}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={120} className="lg:col-span-6 lg:col-start-7">
            <PipelinePanel />
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* ── Currently building ── */}
    <section className="tone-lavender section-padding">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <WordReveal text="Currently" className="text-label mb-5" />
            <AnimatedHeadline as="h2" className="text-section-title mb-12">
              What I'm building now
            </AnimatedHeadline>
          </AnimatedSection>

          <AnimatedSection delay={80}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              <Link
                to="/projects/carepulse"
                className="group flex flex-col rounded-xl border border-border bg-secondary/50 p-7 transition-colors duration-300 hover:border-primary/40 md:col-span-3 md:p-9"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Active · case study
                  </span>
                  <ArrowUpRight size={18} className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <h3 className="font-display mb-1 text-3xl font-bold tracking-[-0.02em]">CarePulse</h3>
                <p className="mb-4 text-sm font-medium text-primary">NHS-aligned health platform</p>
                <p className="flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                  8 NestJS microservices on AWS EKS. Jenkins CI/CD with Helm-based deploys, IRSA (no static credentials),
                  pod security standards, and NHS DSPT-compliant audit logging.
                </p>
                <p className="mt-6 font-mono text-xs text-muted-foreground">NestJS · EKS · Jenkins · Terraform · Helm</p>
              </Link>

              <div className="flex flex-col gap-4 md:col-span-2">
                <div className="flex-1 rounded-xl border border-border bg-secondary/50 p-6">
                  <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Active
                  </span>
                  <h3 className="mb-0.5 font-semibold">Cloudboosta Academy</h3>
                  <p className="mb-2 text-xs text-primary">Cloud & advanced DevOps</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">AWS (EC2, ECS, EKS, Lambda, RDS) and Azure infrastructure labs.</p>
                </div>
                <a
                  href="https://medium.com/@ayobamieae"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="group block flex-1 rounded-xl border border-border bg-secondary/50 p-6 transition-colors duration-300 hover:border-primary/40"
                >
                  <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Writing
                  </span>
                  <h3 className="mb-0.5 font-semibold">Technical writing</h3>
                  <p className="mb-2 text-xs text-primary">medium.com/@ayobamieae</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">Backend systems, cloud architecture and DevOps engineering.</p>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* ── Live in production ── */}
    <section className="tone-sky section-padding">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <WordReveal text="Shipped" className="text-label mb-5" />
                <AnimatedHeadline as="h2" className="text-section-title">
                  Live in production
                </AnimatedHeadline>
              </div>
              <Link to="/projects" className="group inline-flex items-center gap-2 text-sm font-medium text-primary">
                <span className="link-underline pb-0.5">All projects</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </AnimatedSection>

          <DepthGrid className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
            {LIVE.map((p, i) => (
              <AnimatedSection key={p.title} delay={(i % 2) * 90}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <Curtain
                    src={p.img}
                    alt={`${p.title} website`}
                    index={i % 2}
                    parallax={26}
                    className="aspect-[16/10] overflow-hidden rounded-xl border border-border bg-secondary transition-shadow duration-500 group-hover:shadow-hover"
                    imgClassName="h-full w-full object-cover object-top"
                  />
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-[-0.02em] transition-colors group-hover:text-primary">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {p.note} · {p.role}
                      </p>
                    </div>
                    <ArrowUpRight size={18} className="mt-1 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </DepthGrid>
        </div>
      </div>
    </section>

    <WhatYouGet />

    <GitHubActivity />

    {/* ── Writing ── */}
    <section className="tone-lavender section-padding">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          <AnimatedSection className="lg:col-span-4">
            <WordReveal text="Technical writing" className="text-label mb-5" />
            <AnimatedHeadline as="h2" className="text-section-title mb-6">
              From the blog
            </AnimatedHeadline>
            <a
              href="https://medium.com/@ayobamieae"
              target="_blank"
              rel="me noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              <span className="link-underline pb-0.5">All articles on Medium</span>
              <ArrowUpRight size={15} />
            </a>
          </AnimatedSection>

          <AnimatedSection delay={80} className="lg:col-span-8">
            <ul className="border-t border-border">
              {ARTICLES.map((a) => (
                <li key={a.title} className="border-b border-border">
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-6 py-6"
                  >
                    <div className="flex-1">
                      <p className="mb-2 font-mono text-xs text-muted-foreground">
                        {a.tag} · {a.readTime}
                      </p>
                      <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] transition-colors group-hover:text-primary md:text-xl">
                        {a.title}
                      </h3>
                    </div>
                    <ArrowUpRight size={18} className="mt-6 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="tone-brand brand-glow section-padding">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <WordReveal text="Let's work together" className="text-label mb-5" />
              <AnimatedHeadline as="h2" className="text-section-title max-w-[16ch]">
                Looking for your next backend or cloud engineer?
              </AnimatedHeadline>
            </div>
            <div className="lg:col-span-5">
              <p className="mb-7 text-muted-foreground">
                Production experience across AWS, Azure and GCP, a 90% deployment-time reduction on record, and I usually
                reply within a day.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary group flex items-center gap-2">
                  Get in touch
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <a href="https://www.linkedin.com/in/ayobami-edun" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default Home;
