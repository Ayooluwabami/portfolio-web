/*
 * Single source for everything about Ayobami that appears on the site.
 * Kept in step with the current Cloud, DevSecOps, SRE and Platform CVs (Jul 2026).
 * Only facts from the CVs or verified sources belong here.
 */

export const SITE = {
  name: 'Ayobami Edun',
  role: 'Cloud, DevOps & platform engineer',
  location: 'West Midlands, UK',
  availability: 'Available now',
  rightToWork: 'Eligible to work in the UK immediately',
  url: 'https://portfolio-seven-blond-q0bowdvnvj.vercel.app',
} as const;

export const SOCIALS = [
  { label: 'GitHub', handle: '@Ayooluwabami', href: 'https://github.com/Ayooluwabami' },
  { label: 'LinkedIn', handle: 'in/ayobami-edun', href: 'https://www.linkedin.com/in/ayobami-edun' },
  { label: 'Medium', handle: '@ayobamieae', href: 'https://medium.com/@ayobamieae' },
] as const;

export const SHIPPED_FOR = ['DriveWell', 'Thina', 'AI4AI', 'Cloudboosta', 'InnovaSwift', 'Jotem Agro'] as const;

export const ROLES: { title: string; org: string; period: string; place: string; stack?: string; points: string[] }[] = [
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

export const CV_SKILLS: { label: string; value: string }[] = [
  { label: 'CI/CD & Automation', value: 'GitHub Actions (OIDC keyless auth, matrix builds, PR plan comments, environment approval gates), AWS CodePipeline/CodeBuild/CodeDeploy (blocking gates mirrored as pre-commit hooks), Azure DevOps (multi-stage YAML, self-hosted ARM64 agents, AzureKeyVault@2), Jenkins (Pipeline, Jenkinsfile, RBAC, ECR/ECS, Helm), Bitbucket Pipelines, Docker, Docker Compose, Docker Buildx' },
  { label: 'Infrastructure as Code', value: 'Terraform (modular, S3 backend + DynamoDB locking, multi-environment), AWS CloudFormation (nested stacks, 25+ resource single templates, cross-stack exports), Ansible and Puppet (fleet provisioning), ARM/Bicep and AWS CDK (familiar)' },
  { label: 'Kubernetes & Containers', value: 'EKS, AKS, Helm (--atomic), ArgoCD (GitOps, App-of-Apps), RollingUpdate, HPA, PDB, NetworkPolicies, pod security hardening, Seccomp, IRSA, FluentBit DaemonSet, ECR, ACR, ECS Fargate' },
  { label: 'DevSecOps & Supply Chain', value: 'STRIDE threat modelling, Gitleaks, Checkov, tfsec, Semgrep (SAST), Trivy, OWASP Dependency-Check (SCA), OWASP ZAP (DAST), Syft (SBOM), npm audit, SHA-pinned actions, OIDC keyless CI/CD, least-privilege IAM, IMDSv2, encrypted storage, TLS-only buckets, Key Vault' },
  { label: 'Observability & SRE', value: 'Prometheus, Grafana, Alertmanager (kube-prometheus-stack), CloudWatch (alarms, Logs Insights, metric-filter alarms), CloudTrail, X-Ray, correlation ID tracing, SLO/SLI definition, error-budget policies, runbooks, blameless postmortems, incident response' },
  { label: 'AWS', value: 'EC2, VPC, S3, IAM, RDS (Aurora MySQL and Oracle Multi-AZ), ALB, ASG, Lambda, API Gateway, SQS, SES, SNS, CloudFront, Route 53, ACM, SSM, ECS Fargate, ECR, EFS, DynamoDB, ElastiCache, CloudWatch, CloudTrail, CodePipeline, CodeBuild, CodeDeploy, X-Ray, Lightsail' },
  { label: 'Azure & GCP', value: 'AKS, ACR, VMs, App Service, Blob Storage, VNet, NSG, Entra ID, RBAC, Key Vault, Azure SQL, Functions | GCP Compute Engine, Cloud Storage, Vertex AI' },
  { label: 'Networking & Linux', value: 'VPC design, subnets, route tables, NAT and internet gateways, security groups, NACLs, VPC peering, DNS (Route 53), SSL/TLS, ACM, SPF/DKIM/DMARC; Ubuntu/Debian daily, Bash, Nginx, SSH, log analysis' },
  { label: 'Backend & Languages', value: 'TypeScript, JavaScript, Node.js, NestJS, Express, Restana, Python, Bash, HCL, YAML; PostgreSQL, MySQL, MongoDB, Redis (sorted sets, pub/sub, queues), BullMQ, Prisma, Knex' },
  { label: 'Security, APIs & Payments', value: 'JWT (RS256 + HS256), OAuth2, OIDC PKCE, TOTP 2FA, RBAC, bcrypt/argon2, rate limiting, OpenAPI/Swagger; Paystack, Flutterwave, KoraPay, Piggyvest, Stripe' },
];

export const EDUCATION: { title: string; org: string; year: string }[] = [
  { title: 'AWS SimuLearn: Cloud Practitioner', org: 'Amazon Web Services (AWS)', year: '2026' },
  { title: 'Cloud & Advanced DevOps Engineering (AWS & Azure)', org: 'Cloudboosta Academy', year: '2026' },
  { title: 'Introduction to Cybersecurity Certification', org: 'Cisco Networking Academy', year: '2025' },
  { title: 'Diploma in Backend Engineering', org: 'AltSchool Africa, School of Engineering', year: '2024' },
  { title: 'JavaScript Essentials', org: 'Cisco & JS Institute', year: '2024' },
  { title: 'Diploma in Automotive Technology (Distinction)', org: 'Auto Clinic Academy', year: '2024' },
  { title: 'Technical Modular Trade Certification (Distinction)', org: 'National Business & Technical Examination Board', year: '2022' },
  { title: 'Bachelor of Arts, Religious Studies (Upper Second Class Honours)', org: 'University of Ibadan, Nigeria', year: '2019' },
];

export const VOLUNTEER = [
  { title: 'Worship team musician', org: 'Champions Church, Netherton, West Midlands' },
  { title: 'Acting assistant head & technical unit lead', org: 'Global Harvest International' },
  { title: 'Researcher & volunteer', org: 'REES Africa' },
  { title: 'Assistant general secretary', org: 'NCCF' },
  { title: 'Vice president', org: 'NIFES' },
] as const;

export const AWARDS = [
  'Dedicated Teen Teacher Award, Global Harvest Church (2021, 2023)',
  'Astute Volunteer, SDG Literacy Drive, REES Africa & TNCI Africa (2022)',
] as const;

/** Headline numbers. Every one is stated on the CVs. */
export const MILESTONES = [
  { title: 'Cloud & DevOps Engineer, Cloudboosta', note: 'Zero-trust EKS, CodePipeline with rollback, SLO framework' },
  { title: 'Backend & Cloud Engineer, DriveWell', note: 'Made deployments 90% faster on GCP' },
  { title: 'SchoolHub at AI4AI', note: 'Multi-tenant SaaS for 50+ schools' },
  { title: 'Mentor to 50+ teenagers', note: 'Automotive diagnostics and leadership' },
] as const;

export const PROMISES = [
  { icon: 'code', title: 'Everything as code', body: 'Infrastructure, pipelines and policy live in Git and change through review.' },
  { icon: 'shield', title: 'Scanned before it ships', body: 'Secrets, code, IaC and images are checked on every pull request.' },
  { icon: 'key', title: 'No long-lived keys', body: 'OIDC for pipelines, IRSA for pods. Nothing to leak or rotate.' },
  { icon: 'gauge', title: 'Reliability you can measure', body: 'SLOs, error budgets and alerts that only fire when someone should act.' },
  { icon: 'book', title: 'Written down', body: 'Runbooks, threat models and decision notes, so it runs without me.' },
  { icon: 'chat', title: 'Plain language', body: 'Trade-offs explained so the team can make the call with me.' },
] as const;

export const PROCESS = [
  { title: 'Plan in code', body: 'Terraform and CloudFormation, reviewed in a pull request.' },
  { title: 'Scan', body: 'Secrets, SAST, dependencies, IaC and images. Any failure blocks the merge.' },
  { title: 'Build & test', body: 'Immutable images with build-ID tags, never latest.' },
  { title: 'Deploy', body: 'GitOps with ArgoCD or CodeDeploy, health-gated with automatic rollback.' },
  { title: 'Observe', body: 'Prometheus, CloudWatch and X-Ray against SLOs, with runbooks ready.' },
] as const;

/** Who the site is for, and what each of them can ask me to do. */
export const AUDIENCES = [
  {
    who: 'Hiring teams',
    kind: 'Full-time roles',
    body: 'Cloud, DevOps, DevSecOps, SRE and platform engineering roles, remote or in the West Midlands.',
    points: ['Available now, UK right to work', 'CV and a copy-ready summary', 'References on request'],
    cta: { label: 'Recruiter summary', to: '/#recruiters' },
  },
  {
    who: 'Engineering teams',
    kind: 'Contract or project work',
    body: 'Hands-on help with the platform you already run, or the one you are about to build.',
    points: ['CI/CD with blocking security gates', 'Terraform and CloudFormation', 'Kubernetes, GitOps and SLOs'],
    cta: { label: 'See the cloud work', to: '/projects' },
  },
  {
    who: 'Businesses',
    kind: 'Websites built and hosted',
    body: 'A site built to your design, deployed, and kept running, like the one I shipped for Jotem Agro.',
    points: ['Design-matched build', 'Domain, hosting and email DNS', 'Contact forms that reach your inbox'],
    cta: { label: 'Start a conversation', to: '/contact' },
  },
] as const;

/** What a project with me looks like, start to finish. */
export const JOURNEY = [
  { title: 'Discover', body: 'A short call about the goal, the constraints and who owns what.' },
  { title: 'Assess', body: 'I review what exists today, then write down what I would change first and why.' },
  { title: 'Build', body: 'Changes land as code, through pull requests, in steps small enough to review.' },
  { title: 'Stabilise', body: 'Monitoring, alerts and runbooks go in, and we fix what production teaches us.' },
  { title: 'Hand over', body: 'Docs and a walkthrough, so your team can run it without me.' },
] as const;

/** Answers come only from the CVs. */
export const FAQ = [
  { q: 'Do you have the right to work in the UK?', a: 'Yes. I’m on a Skilled Worker Dependant visa and eligible to work in the UK immediately.' },
  { q: 'When can you start?', a: 'I’m available immediately.' },
  { q: 'Do you work remotely?', a: 'Yes. I’ve worked remotely with teams across the world, owning delivery from requirements and design through to deployment and monitoring. I’m based in the West Midlands, UK.' },
  { q: 'What roles are you looking for?', a: 'Cloud, DevOps, DevSecOps, site reliability and platform engineering roles, where the infrastructure and the delivery pipeline are the product.' },
  { q: 'Can I see the code for private projects?', a: 'Several projects are client or academy work with private repositories. I’m happy to walk through the architecture and code on a call. Public repositories are linked on each project.' },
  { q: 'What kinds of work do you take on?', a: 'Full-time roles, plus contract and project work: CI/CD pipelines, infrastructure as code, Kubernetes platforms, and websites built and hosted for businesses.' },
  { q: 'What happens after I get in touch?', a: 'I reply myself, usually within a day. For a role, I send my CV and availability. For a project, we book a short call to scope it, and I send a written outline before any work starts.' },
  { q: 'Are references available?', a: 'Yes, references are available on request.' },
] as const;

// Real posts from medium.com/@ayobamieae
export const ARTICLES = [
  {
    title: 'Building a Production-Grade CI/CD Pipeline on AWS: CodePipeline, CodeBuild, and CodeDeploy',
    tag: 'AWS · DevSecOps',
    date: 'Jul 2026',
    read: '8 min',
    href: 'https://medium.com/@ayobamieae/building-a-production-grade-ci-cd-pipeline-on-aws-codepipeline-codebuild-and-codedeploy-2bde222adc24',
  },
  {
    title: 'Automating Kubernetes Deployments with Azure DevOps, GitOps, and AKS: A Security-First CI/CD',
    tag: 'Azure · Kubernetes',
    date: 'Jun 2026',
    read: '11 min',
    href: 'https://medium.com/@ayobamieae/automating-kubernetes-deployments-with-azure-devops-gitops-and-aks-a-security-first-ci-cd-f554e189b985',
  },
  {
    title: 'Building a Highly Available Multi-Tier WordPress Platform on AWS with CloudFormation',
    tag: 'AWS · CloudFormation',
    date: 'Jun 2026',
    read: '15 min',
    href: 'https://medium.com/@ayobamieae/building-a-highly-available-multi-tier-wordpress-platform-on-aws-with-cloudformation-2a35cad00af7',
  },
] as const;

/** Paste-ready summary for recruiters. */
export const RECRUITER_SUMMARY = `Ayobami Edun · Cloud, DevOps & Platform Engineer
West Midlands, UK · eligible to work in the UK immediately · available now
3+ years across AWS, Azure and GCP on a backend foundation (Node.js, TypeScript, NestJS).
Highlights: AWS CodePipeline from git push to EC2 with blocking security gates and automatic rollback; zero-trust EKS platform with ArgoCD GitOps and seven PR security gates; Azure DevOps + AKS pipeline under 15 minutes; SLO framework with a 7.2-hour error budget; CI/CD rebuild that made deployments 90% faster.
Stack: Terraform, CloudFormation, Kubernetes (EKS, AKS), Helm, ArgoCD, GitHub Actions, Azure DevOps, Jenkins, Prometheus, Grafana, X-Ray, NestJS, PostgreSQL, Redis.
LinkedIn: linkedin.com/in/ayobami-edun · GitHub: github.com/Ayooluwabami`;

export const RECRUITER_FACTS: [string, string][] = [
  ['Roles', 'Cloud · DevOps · DevSecOps · SRE · Platform'],
  ['Experience', '3+ years in production, 20+ cloud builds'],
  ['Location', 'West Midlands, UK · works remotely with teams worldwide'],
  ['Right to work', 'Eligible to work in the UK immediately'],
  ['Availability', 'Available now'],
  ['Clouds', 'AWS · Azure · GCP'],
  ['Core stack', 'Terraform · EKS / AKS · ArgoCD · GitHub Actions · Prometheus'],
  ['Studying', 'AWS Solutions Architect Associate (SAA-C03)'],
];
