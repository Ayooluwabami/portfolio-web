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

const CV = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <WordReveal text="Resume" className="text-label mb-4" />
            <AnimatedHeadline as="h1" className="text-headline mb-6">
              Curriculum <span className="text-gradient">Vitae</span>
            </AnimatedHeadline>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground mb-5">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                <span>England, United Kingdom</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={14} className="text-primary" />
                <span>ayobamieae@gmail.com</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
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

        {/* Professional Summary */}
        <AnimatedSection delay={50}>
          <div className="max-w-4xl mx-auto mb-10">
            <div className="p-6 bg-secondary/50 rounded-xl border border-border">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="text-primary" size={20} />
                Professional Summary
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Cloud & Backend-focused Software Engineer with 3+ years of experience building production systems with
                Node.js, TypeScript, NestJS, and Express, combined with hands-on cloud and DevOps engineering across AWS, Azure, and GCP.
                Delivered production systems at scale — including an NHS-aligned health platform with 8 NestJS microservices
                on EKS, a Nigerian service marketplace with 27 modules and dual payment gateways, and a serverless e-commerce
                order pipeline across 9 CloudFormation nested stacks with ECS Fargate, SQS, Lambda, SES, and DynamoDB.
                Reduced deployment time by 90% through CI/CD automation and completed 20+ cloud projects covering GitHub Actions,
                Jenkins, Terraform, CloudFormation, three-tier AWS architectures, and Kubernetes. Currently pursuing
                AWS Solutions Architect Associate (SAA-C03). UK-based on Skilled Worker Dependent Visa; eligible to work immediately.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Core Technical Skills */}
        <AnimatedSection delay={75}>
          <div className="max-w-4xl mx-auto mb-10">
            <h2 className="text-lg font-semibold mb-4">Core Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "Languages & Frameworks",
                  value: "JavaScript, TypeScript, Python, Node.js, NestJS, Express.js, Restana, React, Next.js, React Native (Expo), Vite, Tailwind CSS",
                },
                {
                  label: "Backend & Architecture",
                  value: "Microservices, MVC, Event-driven (BullMQ, EventEmitter2, Redis pub/sub), Queue processing, WebSockets (Socket.io), Scheduled jobs, Webhooks",
                },
                {
                  label: "Databases",
                  value: "PostgreSQL, MongoDB, MySQL, Prisma ORM, Prisma Accelerate, Knex.js, Redis (caching, queues, sorted sets, sessions), GeoFirestore",
                },
                {
                  label: "AWS",
                  value: "EC2, VPC, S3, IAM, RDS (Aurora MySQL Multi-AZ, Oracle Multi-AZ), ALB, ASG, Lambda, SQS, SES, SNS, CloudFront, Route 53, ACM, CloudFormation, SSM, ECS Fargate, ECR, EFS, DynamoDB, ElastiCache, CloudWatch, CloudTrail, Lightsail",
                },
                {
                  label: "Azure & GCP",
                  value: "Azure VMs, App Service, Functions, Blob Storage, VNet/NSG, Entra ID, RBAC, Key Vault, Azure SQL | GCP Compute Engine, Cloud Storage, Vertex AI",
                },
                {
                  label: "DevOps & IaC",
                  value: "Terraform (S3 backend, DynamoDB locking, multi-env, GitHub Actions automation), AWS CloudFormation (nested stacks, cross-stack exports), GitHub Actions, Jenkins (Freestyle, Pipeline, Jenkinsfile, webhook, ECR/ECS/Helm), Bitbucket Pipelines, Docker, Docker Buildx, Kubernetes (EKS, Helm), Bash scripting",
                },
                {
                  label: "AI & Integrations",
                  value: "Claude API (Anthropic), Google Vertex AI / Gemini, Amazon Rekognition, Firebase, OneSignal, Expo Push, Twilio, Termii, WhatsApp API, Mailchimp, Metamap, Google Maps",
                },
                {
                  label: "API, Security & Payments",
                  value: "OpenAPI/Swagger, JWT (RS256 + HS256), OAuth2, OIDC PKCE, TOTP 2FA, RBAC, bcrypt/argon2, rate limiting, Paystack, Flutterwave, KoraPay, Piggyvest, Stripe",
                },
                {
                  label: "Monitoring & Testing",
                  value: "CloudWatch (alarms, Logs Insights, FluentBit DaemonSet), CloudTrail, SNS alerts, Papertrail, Pino, Winston, Jest, Supertest, correlation ID tracing",
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

        {/* Professional Experience */}
        <AnimatedSection delay={100}>
          <div className="max-w-4xl mx-auto mb-10">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="text-primary" size={20} />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {/* Cloudboosta */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative pl-5 border-l-2 border-primary/30"
              >
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-primary rounded-full" />
                <div className="p-5 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-primary">Cloud & DevOps Engineer</h3>
                      <p className="font-medium">Cloudboosta Academy</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                      <p>Jan 2026 – Present</p>
                      <p>Remote</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">
                    AWS (EC2, ECS, EKS, CloudFormation, RDS, Lambda, SQS, SES, DynamoDB, CloudWatch) · Terraform · Jenkins · GitHub Actions · Docker · Kubernetes · Helm · Azure · Python
                  </p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-none">
                    <li>Built end-to-end GitHub Actions CI/CD pipelines: matrix builds, Terraform automation, PR plan comments, staging/production approval gates</li>
                    <li>Provisioned Jenkins on EC2 with webhook integration, RBAC credentials vault, full Jenkinsfile pipeline, and ECR/ECS ecommerce deployment</li>
                    <li>Built CarePulse (NHS-aligned health platform) on EKS: IRSA, zero-downtime RollingUpdate, pod security hardening, FluentBit DaemonSet, Jenkins CI/CD: CFN validation → lint/tests → ECR build → Helm staging → smoke test → Helm production</li>
                    <li>Built serverless e-commerce order pipeline across 9 CloudFormation nested stacks: API Gateway → Lambda → SQS (DLQ) → ECS Fargate → S3 → Lambda → SES; DynamoDB order tracking; CloudWatch correlation ID tracing</li>
                    <li>Deployed three-tier AWS architecture (EC2/ALB/ASG/Aurora MySQL/ACM/Route 53) and full CloudFormation multi-tier stack validated with live WordPress deployment</li>
                    <li>Deployed RDS Oracle Multi-AZ; connected via SSM Session Manager; validated manual failover with zero data loss</li>
                    <li>Completed Azure projects: Blob Storage, VNet/NSG, Entra ID, App Service + Managed Identity + Key Vault, Azure SQL + serverless Functions</li>
                    <li>Independently resolved a Lightsail VPC peering limitation — architected a cost-optimised hybrid Lightsail + EC2 solution with Nginx reverse proxy</li>
                  </ul>
                </div>
              </motion.div>

              {/* DriveWell */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative pl-5 border-l-2 border-primary/30"
              >
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-primary rounded-full" />
                <div className="p-5 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-primary">Backend Engineer</h3>
                      <p className="font-medium">Ebidhaa Services (DriveWell Platform)</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                      <p>Feb 2025 – Dec 2025</p>
                      <p>Remote</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">
                    Node.js, Restana, TypeScript, MySQL, Knex.js, Redis, Paystack, Flutterwave, Piggyvest, Google Cloud Storage, Docker, GitHub Actions
                  </p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-none">
                    <li>Engineered backend for multi-service platform (vehicle hire, towing, documentation, licensing)</li>
                    <li>Integrated 10+ third-party services: payments, messaging (Termii, WhatsApp, Mailchimp), verification (Metamap), maps</li>
                    <li>Designed JWT + bcrypt authentication, API key management, Redis sessions</li>
                    <li>Built multi-env config (40+ validated variables) → improved stability</li>
                    <li>Implemented CI/CD (GitHub Actions + Docker Buildx + GCE) → 90% faster deployments</li>
                    <li>Added centralised logging (Papertrail) and SQL query optimisation</li>
                  </ul>
                </div>
              </motion.div>

              {/* Freelance Software Engineer */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="relative pl-5 border-l-2 border-primary/30"
              >
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-primary rounded-full" />
                <div className="p-5 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-primary">Software Engineer – Freelance</h3>
                      <p className="font-medium">Remote</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                      <p>Jan 2023 – Present</p>
                      <p>Remote</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">
                    Node.js, NestJS, Express.js, Restana, React, Vite, Tailwind, MongoDB, MySQL, Redis, Paystack
                  </p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-none">
                    <li>Delivered backend and frontend solutions for startups and SMEs, specialising in payment systems, REST APIs, and production-ready web applications.</li>
                    <li>Built and maintained RESTful APIs for car hire, marketplace, and service-booking platforms using Node.js, NestJS, ExpressJS, Restana, MongoDB, MySQL, and Redis.</li>
                    <li>Implemented secure digital wallet and escrow systems with double-entry ledger logic, webhook verification, dispute handling, and multi-gateway payment integrations (Paystack).</li>
                    <li>Developed frontend applications with React, Vite, and Tailwind, improving performance, usability, and deployment speed.</li>
                    <li>Configured Google Workspace and DNS security (SPF, DKIM, DMARC, MTA-STS), significantly improving email deliverability and reliability.</li>
                    <li>Delivered end-to-end features independently, from requirements and system design to deployment and documentation.</li>
                    <li>Contributed to Owiwi, a multi-category service marketplace and business automation platform, building backend APIs and platform features enabling service discovery, bookings, and provider workflow automation.</li>
                  </ul>
                </div>
              </motion.div>

              {/* AI4AI Internship */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative pl-5 border-l-2 border-primary/30"
              >
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-primary rounded-full" />
                <div className="p-5 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-primary">Backend Engineer (Internship)</h3>
                      <p className="font-medium">African Institute for Artificial Intelligence (AI4AI)</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                      <p>April 2025 – August 2025</p>
                      <p>Remote</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">
                    NestJS, PostgreSQL, Prisma, Redis, JWT, RBAC
                  </p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-none">
                    <li>Contributed to multi-tenant SaaS backend (SchoolHub) serving 50+ schools</li>
                    <li>Designed modular services, tenant-aware RBAC, data validation</li>
                    <li>Implemented JWT auth (access/refresh), bcrypt/argon2, audit logging</li>
                    <li>Configured env-specific deployments, DB pooling, SSL, auto-migrations, health checks</li>
                    <li>Improved performance with Redis caching, throttling & query optimisation</li>
                  </ul>
                </div>
              </motion.div>

              {/* Auto Clinic */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative pl-5 border-l-2 border-primary/30"
              >
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-primary rounded-full" />
                <div className="p-5 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-primary">Support Staff (Diagnostics & Training)</h3>
                      <p className="font-medium">Auto Clinic</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                      <p>July 2021 – Aug 2024</p>
                      <p>Nigeria</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-none">
                    <li>Performed diagnostics and maintenance for 25+ vehicles weekly</li>
                    <li>Trained 50+ teenagers on automotive diagnostics</li>
                    <li>Produced weekly automotive educational content for Splash FM radio</li>
                  </ul>
                </div>
              </motion.div>

              {/* MAX */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative pl-5 border-l-2 border-primary/30"
              >
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-primary rounded-full" />
                <div className="p-5 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-primary">Fleet Supervisor</h3>
                      <p className="font-medium">Metro Africa Express (MAX)</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                      <p>Mar 2021 – June 2021</p>
                      <p>Nigeria</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-none">
                    <li>Managed refurbishment & documentation for 100+ motorcycles</li>
                    <li>Oversaw GPS installation and asset monitoring</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Education & Volunteer – side by side on large screens */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Education */}
          <AnimatedSection delay={125}>
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="text-primary" size={20} />
                Education & Certifications
              </h2>
              <div className="space-y-3">
                {[
                  { degree: "AWS SimuLearn: Cloud Practitioner", inst: "Amazon Web Services (AWS)", year: "Issued Apr 2026", highlight: true },
                  { degree: "Cloud & Advanced DevOps Engineering (AWS & Azure)", inst: "Cloudboosta Academy", year: "Ongoing" },
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
                Leadership & Volunteer
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

        {/* Awards */}
        <AnimatedSection delay={175}>
          <div className="max-w-4xl mx-auto mb-10">
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

        {/* CTA */}
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Want a formatted copy? Download the PDF version of this CV.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {/* TODO: Host your CV PDF on Vercel/S3 and update this href */}
              <a
                href="/ayobami-edun-cv.pdf"
                download
                className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PDF
              </a>
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3"
              >
                Get in Touch
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CV;