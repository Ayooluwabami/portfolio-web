import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Award, Heart, MapPin, Mail, Github, Linkedin, ArrowRight } from 'lucide-react';

const MediumIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { AnimatedHeadline, WordReveal } from '../components/AnimatedHeadline';
import Band from '../components/Band';

/* Experience, kept in step with the current Cloud, DevSecOps, SRE and Platform CVs (Jul 2026).
   The website is the long version, so earlier non-software roles stay. */
const ROLES: { title: string; org: string; period: string; place: string; stack?: string; points: string[] }[] = [
  {
    title: 'Cloud & DevOps Engineer',
    org: 'Cloudboosta Academy',
    period: 'Jan 2026 – Present',
    place: 'Remote',
    stack: 'AWS · Azure · Kubernetes (EKS, AKS) · Terraform · CloudFormation · ArgoCD · GitHub Actions · Azure DevOps · CodePipeline · Jenkins · Prometheus · Grafana · X-Ray',
    points: [
      'AWS DevSecOps pipeline: a four-stage CodePipeline (Source, Security, Build, Deploy) that ships a TypeScript service from git push to EC2 with zero manual steps, gated by Gitleaks, npm audit, Semgrep SAST and Checkov, all mirrored locally as pre-commit hooks. The stack is one 25+ resource CloudFormation template with least-privilege IAM, IMDSv2, encrypted EBS and a TLS-only artifact bucket, with Ansible and Puppet equivalents; CodeDeploy runs the app as an unprivileged user behind a health-check gate with automatic rollback.',
      'Wired observability across metrics, logs and traces (Prometheus, structured JSON logs to CloudWatch with a 5xx metric-filter alarm, X-Ray), with the service reporting live SLIs against SLO targets and the four golden signals. Documented an error-budget policy, a STRIDE threat model, incident runbooks and a blameless postmortem template, and cut new-service setup to one command with a golden-path scaffolder and Makefile.',
      'UpCommerce SLO framework: defined four SLOs (availability, latency, pipeline freshness, storage reads) for a platform facing doubled peak traffic, calculated a 7.2-hour monthly error budget in a live-formula model, and wrote a release-gating policy tying feature velocity to the budget left.',
      'Zero-trust EKS platform: a three-tier app (TypeScript API, React, PostgreSQL StatefulSet) across a multi-AZ private-subnet VPC with modular Terraform and S3 + DynamoDB state; GitOps via ArgoCD App-of-Apps with GitHub Actions OIDC keyless auth; zero-trust NetworkPolicies and per-pod IRSA. Every PR is blocked by Semgrep, OWASP Dependency-Check, Checkov, tfsec, Trivy, Gitleaks and Syft SBOM generation. kube-prometheus-stack with custom alerting, a STRIDE model (20+ threats, 4 accepted risks with owners) and an on-call runbook.',
      'Azure DevOps on AKS: multi-stage YAML pipeline with four blocking gates (Gitleaks, Checkov, Semgrep, Trivy); Python, Node.js and .NET images built in parallel and pushed to ACR with build-ID tags; secrets fetched at runtime from Key Vault (AzureKeyVault@2), manifests patched, ArgoCD synced and OWASP ZAP run after deploy. Configured a self-hosted ARM64 agent and solved Trivy, ArgoCD CLI and QEMU architecture issues; end to end in under 15 minutes.',
      'Serverless order pipeline across 9 CloudFormation nested stacks (eu-west-2): API Gateway, Python Lambda, SQS with a DLQ and CloudWatch alarm to SNS, ECS Fargate invoice generator, S3, Lambda and SES. DynamoDB tracks 8 order states; correlation IDs trace every order in Logs Insights; 5 least-privilege IAM roles.',
      'GitHub Actions with Terraform (matrix builds, caching, PR plan comments, staging and production approval gates); Jenkins on EC2 with an RBAC credentials vault running Docker build, ECR push and Terraform-provisioned ECS and ALB.',
      'CarePulse, an NHS-aligned platform on EKS: 8 NestJS microservices over Redis TCP, a Next.js BFF and React Native app, Claude API triage, NHS Login OIDC PKCE, TOTP 2FA and an immutable audit log; IRSA, zero-downtime RollingUpdate and pod hardening; Jenkins from CloudFormation validation through Helm staging and smoke tests to production.',
    ],
  },
  {
    title: 'Backend & Cloud Engineer',
    org: 'Ebidhaa Services (DriveWell Platform)',
    period: 'Feb 2025 – Dec 2025',
    place: 'Remote',
    stack: 'Node.js · Restana · TypeScript · MySQL · Knex.js · Redis · Docker Buildx · GitHub Actions · GCP Compute Engine',
    points: [
      'Deployed and ran production infrastructure on GCP Compute Engine and cut deployment time by 90% with a fully automated GitHub Actions and Docker Buildx pipeline across dev, staging and production.',
      'Engineered the backend for vehicle hire, towing and licensing, serving the admin dashboard, mobile API and public web from one environment-aware codebase with 40+ validated environment variables preventing configuration drift.',
      'Hardened security (JWT for web and mobile, API keys, bcrypt, Redis-backed sessions, rate limiting), added centralised logging (Papertrail + syslog) and tuned SQL for production load.',
      'Integrated 10+ third-party services: Paystack, Flutterwave, Piggyvest, Termii, WhatsApp API, Mailchimp, Metamap, Google Maps and GCP Storage.',
    ],
  },
  {
    title: 'Backend Engineer (Internship)',
    org: 'African Institute for Artificial Intelligence (AI4AI)',
    period: 'Apr 2025 – Aug 2025',
    place: 'Remote',
    stack: 'NestJS · PostgreSQL · Prisma · Redis · Docker · Railway',
    points: [
      'Deployed and ran SchoolHub, a multi-tenant SaaS platform for 50+ schools, with connection pooling, SSL enforcement, automated migrations and health-check endpoints.',
      'Built the auth system (JWT access and refresh rotation, RBAC, argon2, audit logging) and added Redis caching and throttling that measurably improved response times under concurrent load.',
    ],
  },
  {
    title: 'Backend, Cloud & DevOps Engineer (Freelance)',
    org: 'Self-employed',
    period: 'Jan 2023 – Present',
    place: 'Remote',
    stack: 'NestJS · PostgreSQL · Redis · BullMQ · Bitbucket Pipelines · Docker · React · Next.js',
    points: [
      'Built Owiwi, a Nigerian service marketplace (NestJS, PostgreSQL, Redis, BullMQ, 27 modules) with Paystack and KoraPay runtime gateway switching, BullMQ consumers for bank transfers and multi-channel notifications, Vertex AI and Gemini integration and RS256 JWT; shipped with Bitbucket Pipelines and Docker.',
      'Delivered backend and full-stack work for SME clients: REST APIs, payment systems, digital wallets with double-entry ledgers, and React and Next.js front ends; configured DNS (SPF, DKIM, DMARC, MTA-STS) and deployed to Vercel, GitHub Pages and GCP Storage.',
    ],
  },
  {
    title: 'Support Staff (Diagnostics & Training)',
    org: 'Auto Clinic',
    period: 'Jul 2021 – Aug 2024',
    place: 'Nigeria',
    points: [
      'Performed diagnostics and maintenance for 25+ vehicles weekly.',
      'Trained 50+ teenagers in automotive diagnostics.',
      'Produced weekly automotive educational content for Splash FM radio.',
    ],
  },
  {
    title: 'Fleet Supervisor',
    org: 'Metro Africa Express (MAX)',
    period: 'Mar 2021 – Jun 2021',
    place: 'Nigeria',
    points: ['Managed refurbishment and documentation for 100+ motorcycles.', 'Oversaw GPS installation and asset monitoring.'],
  },
];

const CV = () => {
  return (
    <div className="min-h-screen">
      <Band tone="sky" first>
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <WordReveal text="Resume" className="text-label mb-4" />
            <AnimatedHeadline as="h1" className="text-headline mb-6">
              Curriculum vitae
            </AnimatedHeadline>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground mb-5">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                <span>England, United Kingdom</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={14} className="text-primary" />
                <span>ayobamieae@gmail.com</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="https://github.com/Ayooluwabami" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                <Github size={14} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/ayobami-edun" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href="https://medium.com/@ayobamieae" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                <MediumIcon size={14} /> Medium
              </a>
            </div>
          </div>
        </AnimatedSection>

      </Band>
      <Band tone="white">
        {/* Professional Summary */}
        <AnimatedSection delay={50}>
          <div className="max-w-4xl mx-auto">
            <div className="p-6 bg-secondary/50 rounded-xl border border-border">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="text-primary" size={20} />
                Professional summary
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Cloud, DevOps and platform engineer with 3+ years of experience designing, deploying and operating infrastructure
                across AWS, Azure and GCP, on a backend engineering foundation in Node.js, TypeScript and NestJS. Builds CI/CD
                with blocking security gates as standard (GitHub Actions, Azure DevOps, Jenkins, AWS CodePipeline), provisions
                infrastructure as code with Terraform and CloudFormation, and runs production-grade Kubernetes on EKS and AKS with
                GitOps via ArgoCD, zero-trust NetworkPolicies and full observability. Defines SLOs and error-budget policies, and
                works documentation-first: threat models, runbooks and blameless postmortems included. Cut deployment time by 90%
                through CI/CD automation and completed 20+ cloud projects. Currently pursuing AWS Solutions Architect Associate
                (SAA-C03). UK-based on a Skilled Worker Dependant visa; eligible to work immediately.
              </p>
            </div>
          </div>
        </AnimatedSection>

      </Band>
      <Band tone="lavender">
        {/* Core Technical Skills */}
        <AnimatedSection delay={75}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Core technical skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "CI/CD & Automation",
                  value: "GitHub Actions (OIDC keyless auth, matrix builds, PR plan comments, environment approval gates), AWS CodePipeline/CodeBuild/CodeDeploy (blocking gates mirrored as pre-commit hooks), Azure DevOps (multi-stage YAML, self-hosted ARM64 agents, AzureKeyVault@2), Jenkins (Pipeline, Jenkinsfile, RBAC, ECR/ECS, Helm), Bitbucket Pipelines, Docker, Docker Compose, Docker Buildx",
                },
                {
                  label: "Infrastructure as Code",
                  value: "Terraform (modular, S3 backend + DynamoDB locking, multi-environment), AWS CloudFormation (nested stacks, 25+ resource single templates, cross-stack exports), Ansible and Puppet (fleet provisioning), ARM/Bicep and AWS CDK (familiar)",
                },
                {
                  label: "Kubernetes & Containers",
                  value: "EKS, AKS, Helm (--atomic), ArgoCD (GitOps, App-of-Apps), RollingUpdate, HPA, PDB, NetworkPolicies, pod security hardening, Seccomp, IRSA, FluentBit DaemonSet, ECR, ACR, ECS Fargate",
                },
                {
                  label: "DevSecOps & Supply Chain",
                  value: "STRIDE threat modelling, Gitleaks, Checkov, tfsec, Semgrep (SAST), Trivy, OWASP Dependency-Check (SCA), OWASP ZAP (DAST), Syft (SBOM), npm audit, SHA-pinned actions, OIDC keyless CI/CD, least-privilege IAM, IMDSv2, encrypted storage, TLS-only buckets, Key Vault",
                },
                {
                  label: "Observability & SRE",
                  value: "Prometheus, Grafana, Alertmanager (kube-prometheus-stack), CloudWatch (alarms, Logs Insights, metric-filter alarms), CloudTrail, X-Ray, correlation ID tracing, SLO/SLI definition, error-budget policies, runbooks, blameless postmortems, incident response",
                },
                {
                  label: "AWS",
                  value: "EC2, VPC, S3, IAM, RDS (Aurora MySQL and Oracle Multi-AZ), ALB, ASG, Lambda, API Gateway, SQS, SES, SNS, CloudFront, Route 53, ACM, SSM, ECS Fargate, ECR, EFS, DynamoDB, ElastiCache, CloudWatch, CloudTrail, CodePipeline, CodeBuild, CodeDeploy, X-Ray, Lightsail",
                },
                {
                  label: "Azure & GCP",
                  value: "AKS, ACR, VMs, App Service, Blob Storage, VNet, NSG, Entra ID, RBAC, Key Vault, Azure SQL, Functions | GCP Compute Engine, Cloud Storage, Vertex AI",
                },
                {
                  label: "Networking & Linux",
                  value: "VPC design, subnets, route tables, NAT and internet gateways, security groups, NACLs, VPC peering, DNS (Route 53), SSL/TLS, ACM, SPF/DKIM/DMARC; Ubuntu/Debian daily, Bash, Nginx, SSH, log analysis",
                },
                {
                  label: "Backend & Languages",
                  value: "TypeScript, JavaScript, Node.js, NestJS, Express, Restana, Python, Bash, HCL, YAML; PostgreSQL, MySQL, MongoDB, Redis (sorted sets, pub/sub, queues), BullMQ, Prisma, Knex",
                },
                {
                  label: "Security, APIs & Payments",
                  value: "JWT (RS256 + HS256), OAuth2, OIDC PKCE, TOTP 2FA, RBAC, bcrypt/argon2, rate limiting, OpenAPI/Swagger; Paystack, Flutterwave, KoraPay, Piggyvest, Stripe",
                },
              ].map((skill, index) => (
                <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <p className="text-sm font-medium text-primary mb-1.5">{skill.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{skill.value}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </Band>
      <Band tone="white">
        {/* Professional Experience */}
        <AnimatedSection delay={100}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="text-primary" size={20} />
              Professional experience
            </h2>
            <div className="space-y-6">
              {ROLES.map((role, i) => (
                <motion.div
                  key={role.org + role.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i, 3) * 0.05 }}
                  className="relative pl-5 border-l-2 border-primary/30"
                >
                  <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-primary rounded-full" />
                  <div className="p-5 bg-secondary/50 rounded-lg border border-border">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-primary">{role.title}</h3>
                        <p className="font-medium">{role.org}</p>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                        <p>{role.period}</p>
                        <p>{role.place}</p>
                      </div>
                    </div>
                    {role.stack && <p className="text-xs text-muted-foreground mb-3 font-mono">{role.stack}</p>}
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      {role.points.map((pt) => (
                        <li key={pt} className="flex gap-2.5 leading-relaxed">
                          <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </Band>
      <Band tone="mint">
        {/* Education & Volunteer – side by side on large screens */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Education */}
          <AnimatedSection delay={125}>
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="text-primary" size={20} />
                Education & certifications
              </h2>
              <div className="space-y-3">
                {[
                  { degree: "AWS SimuLearn: Cloud Practitioner", inst: "Amazon Web Services (AWS)", year: "2026", highlight: true },
                  { degree: "Cloud & Advanced DevOps Engineering (AWS & Azure)", inst: "Cloudboosta Academy", year: "2026" },
                  { degree: "Introduction to Cybersecurity Certification", inst: "Cisco Networking Academy", year: "2025" },
                  { degree: "Diploma in Backend Engineering", inst: "AltSchool Africa, School of Engineering", year: "2024" },
                  { degree: "JavaScript Essentials", inst: "Cisco & JS Institute", year: "2024" },
                  { degree: "Diploma in Automotive Technology (Distinction)", inst: "Auto Clinic Academy", year: "2024" },
                  { degree: "Technical Modular Trade Certification (Distinction)", inst: "National Business & Technical Examination Board", year: "2022" },
                  { degree: "Bachelor of Arts, Religious Studies (Upper Second Class Honours)", inst: "University of Ibadan, Nigeria", year: "2019" },
                ].map((edu, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border ${
                      edu.highlight
                        ? 'bg-primary/5 border-primary/25'
                        : 'bg-secondary/50 border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm">{edu.degree}</p>
                      {edu.highlight && (
                        <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">
                          AWS
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{edu.inst} · {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Volunteer / Leadership */}
          <AnimatedSection delay={150}>
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Heart className="text-primary" size={20} />
                Leadership & volunteering
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium text-sm text-primary">Worship Team Musician</h3>
                  <p className="text-sm">Champions Church, Netherton, West Midlands, UK</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium text-sm text-primary">Acting Assistant Head & Technical Unit Lead</h3>
                  <p className="text-sm">Global Harvest International</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium text-sm text-primary">Researcher & Volunteer</h3>
                  <p className="text-sm">REES Africa</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium text-sm text-primary">Assistant General Secretary</h3>
                  <p className="text-sm">NCCF</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium text-sm text-primary">Vice President</h3>
                  <p className="text-sm">NIFES</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

      </Band>
      <Band tone="white">
        {/* Awards */}
        <AnimatedSection delay={175}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="text-primary" size={20} />
              Awards
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Dedicated Teen Teacher Award - Global Harvest Church (2021, 2023)",
                "Astute Volunteer (SDG Literacy Drive) - REES Africa & TNCI Africa (2022)",
              ].map((award, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-primary/10 text-primary text-xs rounded-lg border border-primary/20"
                >
                  {award}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </Band>
      <Band tone="brand">
        {/* CTA */}
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto space-y-4 border-t border-border pt-10">
            <p className="text-sm text-muted-foreground">
              Need a copy? Save this page as a PDF from the print dialog.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Save as PDF
              </button>
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3"
              >
                Get in touch
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </Band>
    </div>
  );
};

export default CV;