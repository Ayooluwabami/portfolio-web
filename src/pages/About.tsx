import { Link } from 'react-router-dom';
import { Code, Database, Cloud, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { AnimatedHeadline, WordReveal } from '../components/AnimatedHeadline';
import photoshoot from '@/assets/photoshoot.jpg';
import working from '@/assets/working.jpg';
import Band from '../components/Band';

const About = () => {
  const expertise = [
    {
      icon: <Cloud size={20} />,
      title: "Cloud & platform engineering",
      description: "AWS, Azure and GCP built as code with Terraform and CloudFormation. Internal developer platforms, golden paths and one-command service setup.",
    },
    {
      icon: <Zap size={20} />,
      title: "CI/CD & GitOps",
      description: "GitHub Actions, AWS CodePipeline, Azure DevOps and Jenkins. ArgoCD App-of-Apps on EKS and AKS, Helm, automatic rollback.",
    },
    {
      icon: <Shield size={20} />,
      title: "DevSecOps",
      description: "Blocking gates for secrets, SAST, SCA, IaC and images, SBOMs, OIDC keyless auth, IRSA, zero-trust NetworkPolicies and STRIDE threat models.",
    },
    {
      icon: <Database size={20} />,
      title: "Observability & reliability",
      description: "Prometheus, Grafana, Alertmanager, CloudWatch and X-Ray. SLOs, error-budget policies, runbooks and blameless postmortems.",
    },
    {
      icon: <Code size={20} />,
      title: "Backend development",
      description: "Node.js, TypeScript and NestJS microservices, PostgreSQL and Redis, queues with BullMQ, payments and secure auth.",
    },
    {
      icon: <Users size={20} />,
      title: "Documentation & mentoring",
      description: "Documentation-first delivery, technical writing on Medium, code reviews and mentoring 50+ young people.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Band tone="sky" first>
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <WordReveal text="About me" className="text-label mb-4" />
            <AnimatedHeadline as="h1" className="text-headline mb-5">
              The story behind the code
            </AnimatedHeadline>
            <p className="text-subheadline">
              From automotive diagnostics to distributed cloud systems — a non-linear path that built
              a first-principles approach to engineering.
            </p>
          </div>
        </AnimatedSection>

      </Band>
      <Band tone="white">
        {/* Profile — photo left, text right */}
        <AnimatedSection delay={50}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Photo — rectangular, not circular */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-full max-w-xs">
                  <div className="rounded-xl overflow-hidden border border-border shadow-card aspect-[3/4]">
                    <img
                      src={photoshoot}
                      alt="Ayobami Edun"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Location badge */}
                  <div className="absolute -bottom-3 -right-3 px-3 py-1.5 bg-background border border-border rounded-lg shadow-card text-xs font-medium text-muted-foreground">
                    📍 West Midlands, UK
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="space-y-5">
                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                  <p>
                    I'm a <span className="text-foreground font-medium">cloud, DevOps and platform engineer</span> with
                    3+ years of experience across AWS, Azure and GCP, built on a backend foundation in Node.js,
                    TypeScript and NestJS.
                  </p>
                  <p>
                    I've built a{' '}
                    <span className="text-foreground font-medium">zero-trust EKS platform</span> with GitOps and seven
                    blocking security gates, a CodePipeline that ships from git push to EC2 with automatic rollback, and
                    serverless pipelines across CloudFormation nested stacks. I define SLOs and error budgets, and write the
                    threat models and runbooks that keep systems understandable.
                  </p>
                  <p>
                    I work remotely with teams across the globe, owning delivery from requirements and system
                    design through to cloud deployment and monitoring.
                  </p>
                  <p>
                    Pursuing the{' '}
                    <span className="text-foreground font-medium">AWS Solutions Architect Associate (SAA-C03)</span> certification.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <p className="font-display tabular-nums text-xl font-bold text-primary">20+</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Cloud projects (AWS/Azure/GCP)</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <p className="font-display tabular-nums text-xl font-bold text-primary">90%</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Faster deployments via CI/CD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

      </Band>
      <Band tone="lavender">
        {/* Expertise — 2 columns instead of 3 equal */}
        <AnimatedSection delay={100}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="text-label mb-3">What I do</p>
              <AnimatedHeadline as="h2" className="text-section-title">
                Areas of expertise
              </AnimatedHeadline>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expertise.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="group p-5 bg-secondary/50 rounded-xl border border-border hover:border-primary/35
                             transition-all duration-200 flex gap-4"
                >
                  <div className="shrink-0 mt-0.5 p-2 bg-primary/10 rounded-lg text-primary h-fit
                                  group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1.5 text-sm">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </Band>
      <Band tone="mint">
        {/* Beyond the code */}
        <AnimatedSection delay={150}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5 order-2 lg:order-1">
                <p className="text-label">Beyond the code</p>
                <AnimatedHeadline as="h2" className="text-section-title" delay={0.08}>
                  A unique background
                </AnimatedHeadline>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    I've mentored over{' '}
                    <span className="text-foreground font-medium">50 teenagers</span> in technical and
                    leadership roles — because building people compounds faster than building software.
                  </p>
                  <p>
                    Before software, I worked in{' '}
                    <span className="text-foreground font-medium">automotive technology</span> — which taught
                    me precision, diagnostics, and systematic fault isolation. Those habits translate
                    directly to debugging distributed systems.
                  </p>
                  <p>
                    I wrote weekly educational articles for the "Gist with the Mechanic" segment on
                    Splash FM — combining a long-standing interest in teaching with technology.
                  </p>
                </div>
                <Link
                  to="/cv"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
                >
                  Full experience on CV
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Working photo — rectangular */}
              <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-xs">
                  <div className="rounded-xl overflow-hidden border border-border shadow-card aspect-[4/3]">
                    <img
                      src={working}
                      alt="Ayobami at work"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

      </Band>
      <Band tone="ink">
        {/* Education */}
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-secondary/40 rounded-xl p-8 border border-border">
              <div className="mb-8">
                <p className="text-label mb-3">Education</p>
                <AnimatedHeadline as="h2" className="text-section-title">
                  Credentials & certifications
                </AnimatedHeadline>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { title: "AWS SimuLearn: Cloud Practitioner",    org: "Amazon Web Services",   year: "2026", badge: "AWS" },
                  { title: "Cloud & Advanced DevOps Engineering",  org: "Cloudboosta Academy",   year: "2026" },
                  { title: "Introduction to Cybersecurity",        org: "Cisco Networking Academy", year: "2025" },
                  { title: "Diploma in Backend Engineering",       org: "AltSchool Africa",      year: "2024" },
                  { title: "JavaScript Essentials",                org: "Cisco & JS Institute",  year: "2024" },
                  { title: "B.A. Religious Studies (2:1)",         org: "University of Ibadan",  year: "2019" },
                ].map((edu, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-colors ${
                      edu.badge
                        ? 'bg-primary/5 border-primary/20 hover:border-primary/35'
                        : 'bg-background/40 border-border hover:border-primary/25'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-sm">{edu.title}</p>
                      {edu.badge && (
                        <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 bg-primary/10 text-primary rounded border border-primary/20 tracking-wide">
                          {edu.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{edu.org} · {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Band>
    </div>
  );
};

export default About;
