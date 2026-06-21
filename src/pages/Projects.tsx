import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, ArrowUpRight, Folder, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { AnimatedHeadline, WordReveal } from '../components/AnimatedHeadline';
import TiltCard from '../components/TiltCard';
import SpotlightCard from '../components/SpotlightCard';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  featured?: boolean;
  category: string;
  role?: string;
  impact?: string;
  caseStudy?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <article
      className={`group relative bg-secondary/50 rounded-xl p-6 md:p-8
                 border border-border hover:border-primary/40 transition-all duration-200
                 hover:shadow-elegant h-full`}
    >
      {project.featured && (
        <div className="absolute top-4 right-4">
          <span className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Featured
          </span>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Folder size={20} />
        </div>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <Github size={18} />
            </a>
          )}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} project`}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>

      {project.role && (
        <p className="text-sm text-primary font-medium mb-2">{project.role}</p>
      )}
      
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
        {project.description}
      </p>

      {project.impact && (
        <div className="mb-4 p-3 bg-background/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Impact</p>
          <p className="text-sm text-foreground font-medium">{project.impact}</p>
        </div>
      )}
      
      {project.caseStudy && (
        <Link
          to={project.caseStudy}
          className="inline-flex items-center gap-1.5 text-xs text-primary font-medium mb-3 hover:gap-2 transition-all"
        >
          <BookOpen size={12} />
          Read case study
        </Link>
      )}

      <div className="flex flex-wrap gap-2">
        {project.tech.slice(0, 5).map((item, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md"
          >
            {item}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="px-2.5 py-1 text-xs font-medium text-muted-foreground">
            +{project.tech.length - 5} more
          </span>
        )}
      </div>
    </article>
  );
};

const ALL_PROJECTS: Project[] = [
    {
      title: "Thina — Recovery & Mental Wellness Platform",
      description: "Full-stack mental health and recovery ecosystem: NestJS monolith API, dedicated AI microservice, reusable notifications microservice (TCP transport), React web app, and public landing page. Features daily check-ins, recovery journals, streak tracking, peer communities, buddy system, AI-powered journaling assistance via Gemini, multilingual content via Google Translate, and moderated resource library.",
      tech: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "AWS S3", "Google Gemini API", "Google Translate API", "BullMQ", "OneSignal", "Sentry", "JWT", "React", "Vite", "TanStack Query", "Zustand", "Tailwind CSS"],
      link: "https://thina.app/",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "fullstack",
      role: "Lead Fullstack Engineer",
      impact: "5 repositories • Gemini-powered journaling • Multilingual via Google Translate • Real-time push notifications • Streak & check-in gamification"
    },
    {
      title: "NaijaSafe — Civic Security Intelligence Platform",
      description: "Full-stack civic safety platform enabling citizens to anonymously report security incidents with geo-tagging. NestJS API with PostGIS for location-aware queries, AWS SNS/SQS event pipeline, S3 media storage, React/Leaflet web frontend with interactive map, and full Terraform + EKS infrastructure with Kubernetes NetworkPolicies and Helm charts.",
      tech: ["NestJS", "TypeScript", "PostgreSQL", "PostGIS", "Redis", "AWS S3", "SNS", "SQS", "Terraform", "EKS", "Kubernetes", "Helm", "React", "Leaflet", "Zustand", "TanStack Query", "Sentry"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "fullstack",
      role: "Fullstack & Cloud Engineer",
      impact: "Geo-aware incident reporting • PostGIS radius queries • Anonymous reporting • EKS + Terraform IaC • AWS event-driven pipeline"
    },
    {
      title: "EKS 3-Tier App — DevSecOps on AWS",
      description: "Production-grade three-tier application on Amazon EKS with a shift-left DevSecOps pipeline. Provisioned with Terraform (remote state S3+DynamoDB, modular), GitOps via ArgoCD App-of-Apps, monitored with Prometheus + Grafana. GitHub Actions uses OIDC (no static keys); pods use IRSA. NetworkPolicies enforce default-deny between tiers. Every PR blocked by Semgrep, Checkov, Trivy, and Gitleaks before merge.",
      tech: ["EKS", "Terraform", "ArgoCD", "GitHub Actions", "OIDC", "IRSA", "Prometheus", "Grafana", "Semgrep", "Checkov", "Trivy", "Gitleaks", "ECR", "AWS VPC", "ALB", "NetworkPolicies", "React", "TypeScript", "PostgreSQL"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "cloud",
      role: "Cloud & DevSecOps Engineer",
      impact: "Zero static credentials • OIDC + IRSA • Default-deny NetworkPolicies • SBOM + signed provenance on every image • Shift-left security across 4 gate types"
    },
    {
      title: "CI/CD Azure GitOps Pipeline on AKS",
      description: "Security-gated CI/CD pipeline using Azure DevOps, GitOps (ArgoCD), and AKS. Five mandatory security gates — Gitleaks (secret scan), Checkov (IaC misconfig), Semgrep (SAST), Trivy (container CVE), OWASP ZAP DAST — block any promotion that fails. ArgoCD self-heals from GitHub as the single source of truth. Deploys three polyglot services (Flask, Express, ASP.NET Core) behind NGINX Ingress.",
      tech: ["Azure DevOps", "AKS", "ArgoCD", "Docker", "Gitleaks", "Checkov", "Semgrep", "Trivy", "OWASP ZAP", "ACR", "Azure Key Vault", "NGINX Ingress", "Helm", "Flask", "Express", "ASP.NET Core"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "cloud",
      role: "DevSecOps Engineer",
      impact: "5 security gates before any deployment • GitOps self-healing via ArgoCD • Secrets from Azure Key Vault, never in code • Polyglot multi-service deployment"
    },
    {
      title: "Fulcrum — Secure Infrastructure Blueprint CLI",
      description: "CLI tool that turns plain-English intent into validated, signed, secure-by-default infrastructure code. Retrieves from a curated blueprint catalogue rather than free-handing AI-generated code. Runs a fail-closed gate (lint, security scan, policy check, cost estimate, signature) before emitting any artifact. AI layer (Anthropic/OpenAI) is optional — without a key it's a deterministic, safe blueprint catalogue.",
      tech: ["Python", "Anthropic Claude API", "OpenAI API", "Cosign", "Checkov", "Terraform", "CLI", "IaC", "PyPI"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "cloud",
      role: "Creator & Engineer",
      impact: "Fail-closed security gate • Signed artifact with Cosign • Zero vendor lock-in • AI optional — deterministic by default"
    },
    {
      title: "InnovaSwift — Software Consultancy Website",
      description: "Marketing and conversion site for InnovaSwift, a registered Nigerian software consultancy (Est. 2018) building bespoke web apps, e-learning platforms, and business automation. Designed for earned confidence: proof over promise, terse copy, restraint over decoration. Smooth scroll powered by Lenis. Live in production.",
      tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "Lenis", "React Router", "Vercel"],
      link: "https://innovaswift.com.ng/",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "frontend",
      role: "Frontend Developer",
      impact: "Live at innovaswift.com.ng • Smooth-scroll with Lenis • Conversion-optimised for project inquiries"
    },
    {
      title: "Thina Landing Page",
      description: "Public marketing and onboarding landing page for the Thina recovery platform. Lightweight React/Vite single-page site built for fast load times and clear conversion paths. Designed to communicate the platform's purpose to users entering recovery journeys.",
      tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "React Router"],
      link: "https://thina.app/",
      github: "https://github.com/Ayooluwabami",
      featured: false,
      category: "frontend",
      role: "Frontend Developer",
      impact: "Live at thina.app"
    },
    {
      title: "CarePulse — NHS-Aligned Health Platform",
      description: "Distributed microservices health platform with 8 NestJS services, Redis TCP transport, Next.js BFF web frontend, and React Native mobile app. Features AI-assisted triage (Claude API), real-time queue management via Redis sorted sets, and post-consultation clinical summaries. NHS Login OIDC PKCE, TOTP 2FA, RS256 JWT, immutable audit log for DSP Toolkit compliance.",
      tech: ["NestJS", "Next.js", "React Native", "EKS", "Kubernetes", "Helm", "Jenkins", "AWS RDS", "ElastiCache", "CloudWatch", "Terraform", "CloudFormation", "Claude API"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "cloud",
      role: "Backend & Cloud Engineer",
      impact: "Zero-downtime RollingUpdate on EKS • IRSA (no static credentials) • Full Jenkins CI/CD with Helm staging → smoke test → production",
      caseStudy: "/projects/carepulse"
    },
    {
      title: "Serverless E-Commerce Order Pipeline",
      description: "Event-driven order processing pipeline across 9 AWS CloudFormation nested stacks. API Gateway → Python Lambda → SQS with DLQ → ECS Fargate invoice generator → S3 → Lambda → SES email delivery. DynamoDB tracks 8 progressive order statuses with correlation ID tracing end-to-end via CloudWatch Logs Insights.",
      tech: ["AWS CloudFormation", "ECS Fargate", "SQS", "Lambda (Python)", "SES", "DynamoDB", "S3", "API Gateway", "ECR", "CloudWatch", "SNS", "IAM"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "cloud",
      role: "Cloud Engineer",
      impact: "9 nested stacks • 5 least-privilege IAM roles • DLQ + CloudWatch alarm + SNS alert • Full correlation ID tracing",
      caseStudy: "/projects/serverless-pipeline"
    },
    {
      title: "Three-Tier AWS Architecture",
      description: "Production-style three-tier architecture on AWS eu-west-2: EC2 + ALB + ASG across 2 AZs, Aurora MySQL RDS in private subnets, HTTPS via ACM, Route 53 custom domain. Full subnet segmentation with least-privilege security groups. Also built a full CloudFormation stack version (VPC, ALB, ASG, EFS, Multi-AZ RDS) validated with a live WordPress deployment.",
      tech: ["AWS EC2", "ALB", "ASG", "Aurora MySQL", "RDS Multi-AZ", "VPC", "ACM", "Route 53", "EFS", "CloudFormation", "IAM"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "cloud",
      role: "Cloud Engineer",
      impact: "Live at the3tierapp.com • HA across 2 AZs • Zero-trust network segmentation"
    },
    {
      title: "Owiwi — Service Marketplace Platform",
      description: "Multi-category service marketplace and business automation platform. Built full backend with geo-based service discovery, appointment booking, provider workflow automation, AI-powered features via Vertex AI, push notifications, and cloud file storage.",
      tech: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "AWS S3", "Firebase", "Google Vertex AI", "Gemini API", "OneSignal", "Twilio", "Docker"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "backend",
      role: "Backend Engineer (Freelance)",
      impact: "AI-enhanced search • Multi-provider booking • Real-time push notifications • Cloud-hosted media"
    },
    {
      title: "DriveWell Backend",
      description: "Full backend ecosystem for a nationwide vehicle hire, towing, and documentation platform. Designed multi-service architecture with secure JWT + RBAC, Redis caching, and encrypted sessions.",
      tech: ["Node.js", "Restana", "TypeScript", "MySQL", "Redis", "Docker", "GCE", "Google Cloud Storage", "Terraform", "Paystack", "Piggyvest", "GitHub Actions"],
      link: "https://www.drivewellapp.com/",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "backend",
      role: "Lead Backend Developer",
      impact: "99.9% transaction accuracy • 90% faster deployments via CI/CD • 20% reduced load times",
      caseStudy: "/projects/drivewell"
    },
    {
      title: "SchoolHub Nigeria",
      description: "Multi-tenant EdTech SaaS platform backend serving 50+ schools. Built tenant isolation, RBAC, audit trails, refresh token rotation, and Redis-powered caching with NestJS microservices.",
      tech: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Docker", "Railway", "JWT", "Jest"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "backend",
      role: "Lead Backend Developer at AI4AI",
      impact: "30% performance improvement • 40% fewer security incidents • 25% faster API responses"
    },
    {
      title: "Digital Wallet & Escrow API",
      description: "Production-grade wallet system with double-entry ledger, webhook verification, dispute resolution, and multi-gateway support for secure financial transactions.",
      tech: ["Node.js", "Restana", "Knex", "MySQL", "Paystack", "Flutterwave"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "backend",
      role: "Backend Engineer",
      impact: "Handled 10k+ transactions • Zero double-spending incidents"
    },
    {
      title: "JOTEM Agro Allied",
      description: "Company frontend with React + Vite + Tailwind and complete Google Workspace setup including DNS security (SPF, DKIM, DMARC, MTA-STS) for enterprise email deliverability.",
      tech: ["React", "Vite", "Tailwind", "Google Workspace", "DNS Management"],
      link: "https://www.jotemagro.com/",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "fullstack",
      role: "Frontend Developer & IT Admin",
      impact: "Improved email deliverability by 95%"
    },
    {
      title: "CarCare Auto Services API",
      description: "RESTful API for vehicle hire price comparison across vendors. Features vendor onboarding, availability logic, commission tracking, and service booking.",
      tech: ["Express.js", "MongoDB", "Redis", "Paystack", "JWT"],
      link: "https://github.com/Ayooluwabami/carcare",
      github: "https://github.com/Ayooluwabami/carcare",
      category: "backend",
      role: "Backend Developer"
    },
    {
      title: "AnythingCar Platform",
      description: "GPS-based car hire platform with armed security escort options and marketplace for cars and spare parts. Mobile app integration with real-time tracking.",
      tech: ["Express.js", "TypeScript", "MongoDB", "GPS API"],
      link: "https://github.com/Ayooluwabami/anythingcar",
      github: "https://github.com/Ayooluwabami/anythingcar",
      category: "backend"
    },
    {
      title: "Scissor URL Shortener",
      description: "URL shortening service with custom URLs, QR code generation, click tracking, and geographic analytics dashboard.",
      tech: ["Node.js", "Express.js", "MongoDB", "QR Generation"],
      link: "https://github.com/Ayooluwabami/scissor-backend",
      github: "https://github.com/Ayooluwabami/scissor-backend",
      category: "backend"
    },
    {
      title: "Restaurant Chatbot",
      description: "Intelligent chatbot for discovering nearby restaurants with NLP-powered search, ratings, and location-based recommendations.",
      tech: ["React", "Node.js", "MySQL", "NLP"],
      link: "https://github.com/Ayooluwabami/restaurant_chatbot",
      github: "https://github.com/Ayooluwabami/restaurant_chatbot",
      category: "fullstack"
    },
    {
      title: "Blogging API",
      description: "RESTful blog management service with user authentication, CRUD operations, and comprehensive Swagger documentation.",
      tech: ["Node.js", "Express.js", "MongoDB", "Swagger"],
      link: "https://github.com/Ayooluwabami/Blogging-API",
      github: "https://github.com/Ayooluwabami/Blogging-API",
      category: "backend"
    },
    {
      title: "Library Management System",
      description: "Comprehensive library system with book borrowing, return tracking, fine calculation, and session management.",
      tech: ["Express.js", "MongoDB", "Mongoose", "JWT"],
      link: "https://github.com/Ayooluwabami/library-management-system",
      github: "https://github.com/Ayooluwabami/library-management-system",
      category: "backend"
    },
    {
      title: "Facial Recognition App — AWS Serverless",
      description: "Event-driven facial recognition pipeline: S3 upload triggers Lambda → Amazon Rekognition facial analysis → results written to DynamoDB → returned to React frontend via API Gateway.",
      tech: ["AWS Lambda", "Amazon Rekognition", "S3", "DynamoDB", "API Gateway", "React", "IAM"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      category: "cloud",
      role: "Cloud Engineer"
    },
    {
      title: "Personal Portfolio v1",
      description: "My previous portfolio website showcasing projects and skills with a clean, modern design and smooth animations.",
      tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Vercel"],
      link: "https://my-portfolio-iota-hazel.vercel.app",
      github: "https://github.com/Ayooluwabami/my-portfolio",
      category: "frontend"
    }
];

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'featured', label: 'Featured' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'backend', label: 'Backend' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'fullstack', label: 'Full Stack' },
] as const;

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = ALL_PROJECTS.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    return project.category === filter;
  });

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-label mb-4">Portfolio</p>
            <AnimatedHeadline as="h1" className="text-headline mb-6">
              Featured <span className="text-gradient">Projects</span>
            </AnimatedHeadline>
            <p className="text-subheadline">
              Real-world projects showcasing expertise in backend development, API architecture, 
              and scalable system design. Each project includes context, my role, technologies used, and measurable impact.
            </p>
          </div>
        </AnimatedSection>

        {/* Filter */}
        <AnimatedSection delay={50}>
          <div className="max-w-5xl mx-auto mb-10">
            <div className="flex flex-wrap justify-center gap-1 p-1 bg-secondary/50 rounded-xl border border-border w-fit mx-auto">
              {CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setFilter(category.value)}
                  className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    filter === category.value
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {filter === category.value && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-primary rounded-lg"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.title} delay={index * 30}>
                <TiltCard intensity={6}>
                  <SpotlightCard>
                    <ProjectCard project={project} />
                  </SpotlightCard>
                </TiltCard>
              </AnimatedSection>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>

        {/* GitHub CTA */}
        <AnimatedSection delay={200}>
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <div className="p-8 bg-secondary/50 rounded-xl border border-border">
              <h2 className="text-xl font-semibold mb-3">Want to See More?</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Check out my GitHub profile for more projects, contributions, and open-source work.
              </p>
              <a
                href="https://github.com/Ayooluwabami"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Github size={18} />
                View GitHub Profile
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Projects;
