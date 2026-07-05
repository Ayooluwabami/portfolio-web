import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, BookOpen, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { AnimatedHeadline, WordReveal } from '../components/AnimatedHeadline';
import CountUp from '../components/CountUp';
import FloatingDock from '../components/FloatingDock';
import CodeSnippet from '../components/CodeSnippet';
import photoshoot from '@/assets/photoshoot.jpg';

const ROLES = ['Backend Engineer', 'Cloud & DevOps Engineer', 'DevSecOps Engineer', 'Site Reliability Engineer', 'Platform Engineer'] as const;

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Single contained radial glow — not the AI "floating orb" pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.07] dark:opacity-[0.06]"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary)), transparent 70%)' }}
          />
          <div className="absolute inset-0 bg-dots opacity-20" />
        </div>

        <div className="container mx-auto px-6 z-10 pt-24 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

              {/* Left — text */}
              <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6"
                >
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-secondary border border-border rounded-full text-xs font-medium text-muted-foreground">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                    </span>
                    Available now — Cloud · DevOps · SRE roles
                  </span>
                </motion.div>

                <div style={{ perspective: '900px' }}>
                  <motion.h1
                    initial={{ opacity: 0, y: 48, rotateX: -22 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'bottom center' }}
                    className="text-headline font-display mb-4"
                  >
                    Hi, I'm{' '}
                    <span className="text-gradient">Ayobami</span>
                  </motion.h1>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.14 }}
                  className="mb-6"
                >
                  <p className="text-xl sm:text-2xl font-display font-semibold min-h-8 tracking-tight">
                    <span style={{ color: 'hsl(var(--highlight-primary))' }}>{displayText}</span>
                    <span className="animate-pulse-slow ml-0.5">|</span>
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-subheadline mb-8 mx-auto lg:mx-0"
                >
                  I build the backend and run the infrastructure it lives on — NestJS microservices
                  deployed on <span className="text-foreground font-medium">AWS, Azure, and GCP</span>,
                  provisioned with Terraform and Kubernetes, shipped through security-gated CI/CD
                  that <span className="text-foreground font-medium">cut deployment time by 90%</span>.
                  UK-based, working with teams worldwide.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.26 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
                >
                  <Link to="/projects" className="btn-primary flex items-center gap-2">
                    View Projects
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/cv" className="btn-secondary flex items-center gap-2">
                    <Download size={16} />
                    View CV
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.32 }}
                  className="flex justify-center lg:justify-start"
                >
                  <FloatingDock
                    items={[
                      { href: "https://github.com/Ayooluwabami",          icon: <Github size={18} />,   label: "GitHub",   external: true },
                      { href: "https://www.linkedin.com/in/ayobami-edun", icon: <Linkedin size={18} />, label: "LinkedIn", external: true },
                      { href: "https://medium.com/@ayobamieae",           icon: <BookOpen size={18} />, label: "Medium",   external: true },
                      { href: "mailto:ayobamieae@gmail.com",              icon: <Mail size={18} />,     label: "Email" },
                    ]}
                  />
                </motion.div>
              </div>

              {/* Right — photo + code */}
              <div className="lg:col-span-5 flex flex-col items-center gap-6 order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.18 }}
                  className="relative"
                >
                  {/* Photo — rectangular with slight inner vignette, no floating glow ring */}
                  <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-xl overflow-hidden border border-border shadow-card">
                    <img
                      src={photoshoot}
                      alt="Ayobami Edun — Backend & Cloud Engineer"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                  </div>
                </motion.div>

                <div className="hidden lg:block w-full">
                  <CodeSnippet />
                </div>
              </div>
            </div>

            {/* Mobile code snippet */}
            <div className="lg:hidden mt-10 flex justify-center">
              <CodeSnippet />
            </div>
          </div>
        </div>
      </section>

      {/* ── About preview ── */}
      <section className="section-padding bg-secondary/25">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <WordReveal text="About me" className="text-label mb-4" />
              <AnimatedHeadline as="h2" className="text-section-title mb-6">
                Building{' '}
                <span className="text-gradient">systems that scale</span>
              </AnimatedHeadline>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <p className="text-subheadline mb-10">
                Most teams lose weeks wiring deploys, chasing outages, and bolting on security late.
                I build systems where that work is already done — NestJS services on EKS with
                Helm blue/green deploys, infrastructure as code in Terraform and CloudFormation,
                and pipelines that gate on SAST, secret, and container scans{' '}
                <span className="text-foreground font-semibold">before anything ships</span>.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { to: 3,  suffix: '+', label: 'Years experience' },
                  { to: 20, suffix: '+', label: 'Cloud projects' },
                  { to: 90, suffix: '%', label: 'Faster deployments' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-5 bg-background rounded-xl border border-border">
                    <p className="font-display tabular-nums text-2xl md:text-3xl font-bold text-primary mb-1">
                      <CountUp to={stat.to} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="mt-10">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all link-underline"
                >
                  More about my journey
                  <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Currently building ──
           Changed from 3 equal columns (most generic AI layout) to a
           featured-left + two stacked-right layout for visual variety.
      -->*/}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <WordReveal text="Currently" className="text-label mb-4" />
              <AnimatedHeadline as="h2" className="text-section-title mb-10">
                What I'm <span className="text-gradient">building now</span>
              </AnimatedHeadline>
            </AnimatedSection>

            <AnimatedSection delay={80}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Featured — spans 3 of 5 cols */}
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="md:col-span-3 p-6 bg-secondary/50 rounded-xl border border-border hover:border-primary/40 transition-all flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-muted-foreground">Active</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-1">CarePulse</h3>
                  <p className="text-xs text-primary font-medium mb-3">NHS-aligned health platform</p>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    8 NestJS microservices on AWS EKS. Jenkins CI/CD with Helm-based blue/green deploys,
                    IRSA (no static credentials), pod security standards, and NHS DSPT-compliant audit logging.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {["NestJS", "EKS", "Jenkins", "Terraform", "Helm"].map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[11px] font-medium bg-muted text-muted-foreground rounded-md">{t}</span>
                    ))}
                  </div>
                </motion.div>

                {/* Stack of 2 smaller cards — spans 2 of 5 */}
                <div className="md:col-span-2 flex flex-col gap-4">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 bg-secondary/50 rounded-xl border border-border hover:border-primary/40 transition-all flex-1"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs font-medium text-muted-foreground">Active</span>
                    </div>
                    <h3 className="font-semibold mb-0.5 text-sm">Cloudboosta Academy</h3>
                    <p className="text-xs text-primary mb-2">Cloud & Advanced DevOps</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      AWS (EC2, ECS, EKS, Lambda, RDS) and Azure infrastructure labs.
                    </p>
                  </motion.div>

                  <motion.a
                    href="https://medium.com/@ayobamieae"
                    target="_blank"
                    rel="me noopener noreferrer"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 bg-secondary/50 rounded-xl border border-border hover:border-primary/40 transition-all flex-1 block"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-xs font-medium text-muted-foreground">Writing</span>
                    </div>
                    <h3 className="font-semibold mb-0.5 text-sm">Technical Writing</h3>
                    <p className="text-xs text-primary mb-2 hover:underline">medium.com/@ayobamieae</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Backend systems, cloud architecture, and DevOps engineering.
                    </p>
                  </motion.a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <WordReveal text="Technical writing" className="text-label mb-4" />
                  <AnimatedHeadline as="h2" className="text-section-title">
                    From the <span className="text-gradient">blog</span>
                  </AnimatedHeadline>
                </div>
                <a
                  href="https://medium.com/@ayobamieae"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all link-underline"
                >
                  All articles
                  <ArrowRight size={15} />
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={80}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {[
                  {
                    title: 'Building a serverless order pipeline with 9 CloudFormation nested stacks',
                    readTime: '8 min read',
                    tag: 'AWS · CloudFormation',
                    href: 'https://medium.com/@ayobamieae',
                  },
                  {
                    title: 'Kubernetes on EKS: IRSA, pod security hardening, and zero-downtime deploys',
                    readTime: '10 min read',
                    tag: 'AWS · Kubernetes',
                    href: 'https://medium.com/@ayobamieae',
                  },
                  {
                    title: 'From monolith to microservices: cutting deployment time by 90%',
                    readTime: '6 min read',
                    tag: 'DevOps · NestJS',
                    href: 'https://medium.com/@ayobamieae',
                  },
                ].map((article) => (
                  <motion.a
                    key={article.title}
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="group p-5 bg-secondary/50 rounded-xl border border-border hover:border-primary/40 transition-all block"
                  >
                    <span className="text-[10px] font-semibold text-primary uppercase tracking-[0.08em]">{article.tag}</span>
                    <h3 className="text-sm font-medium mt-2 mb-4 group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </motion.a>
                ))}
              </div>

              <div className="sm:hidden text-center">
                <a
                  href="https://medium.com/@ayobamieae"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary font-medium"
                >
                  All articles <ArrowRight size={15} />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding relative">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <WordReveal text="Let's work together" className="text-label mb-4" />
              <AnimatedHeadline as="h2" className="text-section-title mb-5">
                Looking for your next <span className="text-gradient">engineer?</span>
              </AnimatedHeadline>
              <p className="text-subheadline mx-auto mb-8">
                Open to backend, cloud, and DevOps roles. Production experience across AWS, Azure,
                and GCP, a 90% deployment-time reduction on record, and I typically reply within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="btn-primary flex items-center gap-2">
                  Get in touch
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="https://www.linkedin.com/in/ayobami-edun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
