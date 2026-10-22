import thinaImg from '@/assets/work/thina.jpg';
import innovaswiftImg from '@/assets/work/innovaswift.jpg';
import jotemImg from '@/assets/work/jotem.jpg';
import drivewellImg from '@/assets/work/drivewell.jpg';
import jotemProductsImg from '@/assets/work/jotem-products.jpg';
import awsDevsecopsDiagram from '@/assets/diagrams/aws-devsecops-pipeline.webp';
import azureGitopsDiagram from '@/assets/diagrams/azure-gitops-pipeline.webp';
import azureArm64Diagram from '@/assets/diagrams/azure-gitops-arm64.webp';
import wordpressDiagram from '@/assets/diagrams/aws-wordpress-multi-tier.webp';
import lagos1 from '@/assets/diagrams/lagos-1-requirements.webp';
import lagos2 from '@/assets/diagrams/lagos-2-high-level-design.webp';
import lagos3 from '@/assets/diagrams/lagos-3-verification.webp';
import lagos4 from '@/assets/diagrams/lagos-4-geo-search.webp';
import lagos5 from '@/assets/diagrams/lagos-5-availability.webp';

/*
 * Single source for every project on the site, kept in step with the current CVs
 * (Cloud, DevSecOps, SRE, Platform Engineer). Links only point somewhere specific:
 * a public repo, a live site, a case study or a write-up. Code that isn't public is
 * marked `private` rather than linking to the GitHub profile.
 */

export type Category = 'cloud' | 'backend' | 'frontend' | 'fullstack';

/** Platform and discipline tags used by the Projects filters. */
export type Tag = 'aws' | 'azure' | 'gcp' | 'devops' | 'security' | 'backend' | 'frontend';

export const TAG_LABEL: Record<Tag, string> = {
  aws: 'AWS',
  azure: 'Azure',
  gcp: 'GCP',
  devops: 'DevOps',
  security: 'Security',
  backend: 'Backend',
  frontend: 'Frontend',
};

export interface Visual {
  src: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  category: Category;
  role?: string;
  impact?: string;
  featured?: boolean;
  /** Live product URL */
  live?: string;
  /** Public repository URL */
  github?: string;
  /** Source exists but isn't public */
  private?: boolean;
  /** Medium write-up */
  article?: string;
  caseStudy?: string;
  /** Live product screenshot (cropped to fill the card) */
  image?: string;
  /** Architecture diagrams (shown whole, openable in a viewer). The first one is the card visual. */
  diagrams?: Visual[];
  tags: Tag[];
}

const GH = 'https://github.com/Ayooluwabami';
const MEDIUM = 'https://medium.com/@ayobamieae';

export const PROJECTS: Project[] = [
  {
    slug: 'jotem',
    title: 'Jotem Agro Allied',
    description:
      'Company website for an agro-commodity supplier, built from the designer’s Figma file: React, Vite and Tailwind with scroll-driven process and product sections. Enquiries go through a mailer API I built on Cloudflare Workers and Resend, and every push to main deploys to Namecheap hosting through GitHub Actions over FTPS. I also run the company’s Google Workspace, with SPF, DKIM, DMARC and MTA-STS so trade email reliably lands.',
    tech: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub Actions', 'Cloudflare Workers', 'Google Workspace'],
    category: 'frontend',
    role: 'Frontend developer & IT admin',
    impact: 'Live at jotemagro.com • Figma-matched build • Enquiries through a self-hosted mailer • Push-to-deploy with GitHub Actions',
    featured: true,
    live: 'https://www.jotemagro.com/',
    private: true,
    image: jotemImg,
    diagrams: [{ src: jotemProductsImg, caption: 'Products section of the live site' }],
    tags: ['frontend', 'devops'],
  },
  {
    slug: 'aws-devsecops-pipeline',
    title: 'AWS DevSecOps Pipeline: CodePipeline, CodeBuild, CodeDeploy',
    description:
      'A four-stage CodePipeline (source, security, build, deploy) that takes a TypeScript service from git push to EC2 with zero manual steps. Gitleaks, npm audit, Semgrep and Checkov block the pipeline and run locally as pre-commit hooks. The whole stack is one 25+ resource CloudFormation template with least-privilege IAM, IMDSv2, encrypted EBS and a TLS-only artifact bucket, with Ansible and Puppet equivalents for existing fleets.',
    tech: ['CodePipeline', 'CodeBuild', 'CodeDeploy', 'CloudFormation', 'EC2', 'Gitleaks', 'Semgrep', 'Checkov', 'Prometheus', 'CloudWatch', 'X-Ray', 'Ansible', 'Puppet'],
    category: 'cloud',
    role: 'Cloud & DevSecOps Engineer',
    impact:
      'Git push to EC2 with zero manual steps • CodeDeploy health-check gate with automatic rollback • Live SLIs against SLO targets and the four golden signals • STRIDE threat model, runbooks and blameless postmortem template • Golden-path scaffolder: new service in one command',
    featured: true,
    github: `${GH}/aws-cicd-pipeline`,
    article: `${MEDIUM}/building-a-production-grade-ci-cd-pipeline-on-aws-codepipeline-codebuild-and-codedeploy-2bde222adc24`,
    tags: ['aws', 'devops', 'security'],
    diagrams: [{ src: awsDevsecopsDiagram, caption: 'Four-stage CodePipeline: source, security gates, build, CodeDeploy with rollback' }],
  },
  {
    slug: 'azure-gitops-aks',
    title: 'Security-First CI/CD on AKS: Azure DevOps and GitOps',
    description:
      'Multi-stage Azure DevOps pipeline with four blocking gates (Gitleaks, Checkov, Semgrep, Trivy) before any image ships. Python, Node.js and .NET images build in parallel and go to Azure Container Registry with immutable build-ID tags. CD pulls secrets from Key Vault at runtime, patches the manifests, triggers an ArgoCD sync and runs an OWASP ZAP scan after deploy.',
    tech: ['Azure DevOps', 'AKS', 'ArgoCD', 'ACR', 'Key Vault', 'Gitleaks', 'Checkov', 'Semgrep', 'Trivy', 'OWASP ZAP', 'Helm'],
    category: 'cloud',
    role: 'DevSecOps Engineer',
    impact:
      'Four blocking gates plus post-deploy DAST • Zero secrets in code or YAML • Self-hosted ARM64 agent (solved Trivy, ArgoCD CLI and QEMU issues) • End to end in under 15 minutes',
    featured: true,
    github: `${GH}/cicd-azure-gitops-aks`,
    article: `${MEDIUM}/automating-kubernetes-deployments-with-azure-devops-gitops-and-aks-a-security-first-ci-cd-f554e189b985`,
    tags: ['azure', 'devops', 'security'],
    diagrams: [
      { src: azureGitopsDiagram, caption: 'CI with four blocking gates, CD through ArgoCD, and the AKS namespaces' },
      { src: azureArm64Diagram, caption: 'ARM64 build agent, Key Vault secrets and the GitOps pull into AKS' },
    ],
  },
  {
    slug: 'innovaswift',
    title: 'InnovaSwift Technologies: Company Website',
    description:
      'Live website for InnovaSwift Technologies, a registered software company in Ibadan (est. 2018). Services, a four-phase delivery process, clients and an enquiry flow, with an editorial serif headline, a trust ticker and light and dark themes.',
    tech: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Lenis'],
    category: 'frontend',
    role: 'Frontend Developer',
    impact: 'Live at innovaswift.com.ng • Light and dark themes • Services, process and enquiry flow',
    live: 'https://innovaswift.com.ng/',
    private: true,
    featured: true,
    image: innovaswiftImg,
    tags: ['frontend'],
  },
  {
    slug: 'lagos-verified-listings',
    title: 'Verified Listings for Lagos: System Design',
    description:
      'System design for a verified property-listings platform built for Lagos on a low-data budget. One Fastify service with PostGIS geo search behind CloudFront, Cognito for identity, S3 for photos and ID documents, and BullMQ for background jobs. Verification runs as a strongly consistent state machine enforced in the database, and the design names the real bottleneck: human verifier capacity, not traffic.',
    tech: ['Fastify', 'PostgreSQL', 'PostGIS', 'CloudFront', 'Cognito', 'S3', 'BullMQ', 'ECS Fargate'],
    category: 'cloud',
    role: 'System design',
    impact:
      'Search usable under 3 seconds on 3G • Strongly consistent verification state machine • GIST geo index over premature OpenSearch • Single-AZ MVP with explicit multi-AZ triggers',
    featured: true,
    private: true,
    diagrams: [
      { src: lagos1, caption: 'Requirements: functional, non-functional and the MVP scale' },
      { src: lagos2, caption: 'High-level design: one Fastify service, PostGIS, S3, Cognito and background jobs' },
      { src: lagos3, caption: 'Verification state machines, workflow and database-level constraints' },
      { src: lagos4, caption: 'Geo search on a low-data budget: PostGIS, SSR, small bundles, edge caching' },
      { src: lagos5, caption: 'Availability and the human bottleneck: SLOs, triggers and runbooks' },
    ],
    tags: ['aws', 'devops', 'backend'],
  },
  {
    slug: 'eks-zero-trust',
    title: 'Zero-Trust EKS Platform with a Full DevSecOps Pipeline',
    description:
      'Three-tier app (TypeScript API, React frontend, PostgreSQL StatefulSet) on EKS across a multi-AZ private-subnet VPC, built with modular Terraform and S3 + DynamoDB remote state. GitOps through ArgoCD App-of-Apps with GitHub Actions OIDC keyless auth. Zero-trust NetworkPolicies and IRSA give every pod its own least-privilege role. Every PR is blocked by Semgrep, OWASP Dependency-Check, Checkov, tfsec, Trivy, Gitleaks and Syft SBOM generation.',
    tech: ['EKS', 'Terraform', 'ArgoCD', 'GitHub Actions', 'OIDC', 'IRSA', 'tfsec', 'Trivy', 'Syft', 'Prometheus', 'Grafana', 'Alertmanager'],
    category: 'cloud',
    role: 'Platform & DevSecOps Engineer',
    impact:
      'Zero static credentials (OIDC + IRSA) • Seven blocking security gates on every PR • kube-prometheus-stack with SLO-based alerting • STRIDE threat model: 20+ threats, 4 accepted risks with owners • On-call runbook',
    featured: true,
    private: true,
    tags: ['aws', 'devops', 'security'],
  },
  {
    slug: 'carepulse',
    title: 'CarePulse: NHS-Aligned Health Platform',
    description:
      'Eight NestJS microservices over Redis TCP, a Next.js BFF and a React Native app on EKS. AI triage through the Claude API, live queues on Redis sorted sets and Socket.io, NHS Login OIDC with PKCE, TOTP 2FA and an immutable audit log for the DSP Toolkit.',
    tech: ['NestJS', 'Next.js', 'React Native', 'EKS', 'Helm', 'Jenkins', 'Terraform', 'CloudFormation', 'Claude API'],
    category: 'cloud',
    role: 'Backend & Cloud Engineer',
    impact:
      'Zero-downtime RollingUpdate on EKS • IRSA, no static credentials • Jenkins: CFN validation, tests, ECR build, Helm staging, smoke test, production',
    featured: true,
    private: true,
    caseStudy: '/projects/carepulse',
    tags: ['aws', 'devops', 'backend'],
  },
  {
    slug: 'serverless-pipeline',
    title: 'Serverless E-Commerce Order Pipeline',
    description:
      'Event-driven order processing across 9 CloudFormation nested stacks in eu-west-2: API Gateway, Python Lambda, SQS with a DLQ, an ECS Fargate invoice generator, S3, Lambda and SES. DynamoDB tracks 8 order states and a correlation ID traces every order end to end in CloudWatch Logs Insights.',
    tech: ['CloudFormation', 'Lambda (Python)', 'SQS', 'ECS Fargate', 'DynamoDB', 'SES', 'S3', 'CloudWatch'],
    category: 'cloud',
    role: 'Cloud Engineer',
    impact: '9 nested stacks • 5 least-privilege IAM roles • DLQ alarm to SNS • Full teardown automation',
    featured: true,
    private: true,
    caseStudy: '/projects/serverless-pipeline',
    tags: ['aws', 'devops'],
  },
  {
    slug: 'thina',
    title: 'Thina: Recovery & Mental Wellness Platform',
    description:
      'Full-stack recovery platform: NestJS API, a dedicated AI microservice, a reusable notifications microservice over TCP, a React web app and the public landing page. Daily check-ins, journals, streaks, peer communities, a buddy system, Gemini-assisted journaling and multilingual content.',
    tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'AWS S3', 'Gemini API', 'React', 'TanStack Query'],
    category: 'fullstack',
    role: 'Lead Full-Stack Engineer',
    impact: '5 repositories • Gemini-powered journaling • Multilingual content • Real-time push notifications',
    featured: true,
    live: 'https://thina.app/',
    private: true,
    image: thinaImg,
    tags: ['aws', 'backend', 'frontend'],
  },
  {
    slug: 'drivewell',
    title: 'DriveWell Backend',
    description:
      'Backend for a nationwide vehicle hire, towing and documentation platform, serving the admin dashboard, mobile API and public web from one environment-aware codebase on GCP Compute Engine.',
    tech: ['Node.js', 'Restana', 'TypeScript', 'MySQL', 'Knex', 'Redis', 'Docker Buildx', 'GitHub Actions', 'GCP'],
    category: 'backend',
    role: 'Backend & Cloud Engineer',
    impact: '90% faster deployments • 40+ validated environment variables • 10+ third-party integrations',
    featured: true,
    live: 'https://www.drivewellapp.com/',
    private: true,
    image: drivewellImg,
    caseStudy: '/projects/drivewell',
    tags: ['gcp', 'devops', 'backend'],
  },
  {
    slug: 'three-tier',
    title: 'Three-Tier & Multi-Tier WordPress on AWS',
    description:
      'EC2, ALB and Auto Scaling across two availability zones in eu-west-2, Aurora MySQL in private subnets, HTTPS through ACM and Route 53. Rebuilt as a highly available CloudFormation stack (VPC, ALB, ASG, EFS, Multi-AZ RDS) and proven with a live WordPress deployment.',
    tech: ['EC2', 'ALB', 'ASG', 'Aurora MySQL', 'RDS Multi-AZ', 'EFS', 'VPC', 'Route 53', 'CloudFormation'],
    category: 'cloud',
    role: 'Cloud Engineer',
    impact: 'High availability across 2 AZs • Subnet segmentation with least-privilege security groups',
    private: true,
    article: `${MEDIUM}/building-a-highly-available-multi-tier-wordpress-platform-on-aws-with-cloudformation-2a35cad00af7`,
    tags: ['aws'],
    diagrams: [{ src: wordpressDiagram, caption: 'Two availability zones: ALB, Auto Scaling, EFS and Aurora MySQL Multi-AZ' }],
  },
  {
    slug: 'slo-framework',
    title: 'SLO & Error-Budget Framework (UpCommerce)',
    description:
      'Reliability policy for a platform facing doubled peak traffic. Defined four SLOs (availability, latency, pipeline freshness, storage reads), rejected a competitor latency benchmark that could not be defended, modelled the error budget in a live-formula spreadsheet and wrote a release-gating policy that ties feature velocity to the budget left.',
    tech: ['SLOs / SLIs', 'Error budgets', 'Release gating', 'Capacity planning'],
    category: 'cloud',
    role: 'Site Reliability Engineer',
    impact: '4 SLOs • 7.2-hour monthly error budget • Feature work pauses while the budget burns',
    featured: true,
    private: true,
    tags: ['devops'],
  },
  {
    slug: 'jenkins-ecs',
    title: 'Jenkins to ECS: E-Commerce CI/CD',
    description:
      'Jenkins on EC2 with an RBAC credentials vault and a Jenkinsfile pipeline: Docker build, push to ECR, then Terraform provisions the ECS cluster and ALB with S3 + DynamoDB state.',
    tech: ['Jenkins', 'Docker', 'Amazon ECR', 'Amazon ECS', 'Terraform', 'ALB', 'EC2'],
    category: 'cloud',
    role: 'Cloud & DevOps Engineer',
    github: `${GH}/project-deployment-ecs`,
    article: `${MEDIUM}/end-to-end-ci-cd-for-an-e-commerce-application-with-jenkins-docker-ecr-ecs-and-terraform-3048b241ece0`,
    tags: ['aws', 'devops'],
  },
  {
    slug: 'naijasafe',
    title: 'NaijaSafe: Civic Security Intelligence',
    description:
      'Anonymous, geo-tagged incident reporting. NestJS API with PostGIS radius queries, an SNS/SQS event pipeline, S3 media, a React and Leaflet map, and Terraform-built EKS with NetworkPolicies and Helm.',
    tech: ['NestJS', 'PostGIS', 'Redis', 'SNS', 'SQS', 'Terraform', 'EKS', 'Helm', 'React', 'Leaflet'],
    category: 'fullstack',
    role: 'Full-Stack & Cloud Engineer',
    impact: 'Geo-aware reporting • Anonymous by design • Event-driven AWS pipeline',
    private: true,
    tags: ['aws', 'devops', 'backend', 'frontend'],
  },
  {
    slug: 'fulcrum',
    title: 'Fulcrum: Secure Infrastructure Blueprint CLI',
    description:
      'Turns plain-English intent into signed, secure-by-default infrastructure code from a curated blueprint catalogue. A fail-closed gate (lint, security scan, policy check, cost estimate, signature) runs before anything is emitted. The AI layer is optional; without a key it is a deterministic catalogue.',
    tech: ['Python', 'Terraform', 'Checkov', 'Cosign', 'Claude API', 'OpenAI API'],
    category: 'cloud',
    role: 'Creator',
    impact: 'Fail-closed gate • Cosign-signed artifacts • Deterministic by default',
    private: true,
    tags: ['devops', 'security'],
  },
  {
    slug: 'owiwi',
    title: 'Owiwi: Service Marketplace',
    description:
      'Nigerian service marketplace with 27 modules: Paystack and KoraPay with runtime gateway switching, BullMQ consumers for bank transfers and multi-channel notifications, Vertex AI and Gemini features, and RS256 JWT. Shipped with Bitbucket Pipelines and Docker.',
    tech: ['NestJS', 'PostgreSQL', 'Redis', 'BullMQ', 'Vertex AI', 'Bitbucket Pipelines', 'Docker'],
    category: 'backend',
    role: 'Backend Engineer (Freelance)',
    impact: '27 modules • Dual payment gateways with runtime switching • Async job consumers',
    private: true,
    tags: ['gcp', 'backend', 'devops'],
  },
  {
    slug: 'schoolhub',
    title: 'SchoolHub Nigeria',
    description:
      'Multi-tenant EdTech SaaS backend for 50+ schools: tenant isolation, RBAC, audit trails, access and refresh token rotation, Redis caching and throttling. Deployed on Docker and Railway with connection pooling, SSL, automated migrations and health checks.',
    tech: ['NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Railway', 'Jest'],
    category: 'backend',
    role: 'Backend Engineer, AI4AI',
    impact: '50+ schools • Tenant-aware RBAC • Faster responses under concurrent load',
    private: true,
    tags: ['backend'],
  },
  {
    slug: 'wallet',
    title: 'Digital Wallet & Escrow API',
    description: 'Wallets with a double-entry ledger, verified webhooks, dispute resolution and multiple payment gateways.',
    tech: ['Node.js', 'Restana', 'Knex', 'MySQL', 'Paystack', 'Flutterwave'],
    category: 'backend',
    role: 'Backend Engineer',
    impact: '10k+ transactions handled • Zero double-spend incidents',
    private: true,
    tags: ['backend', 'security'],
  },
  {
    slug: 'rekognition',
    title: 'Facial Recognition on AWS, Serverless',
    description: 'S3 uploads trigger Lambda, Amazon Rekognition analyses the face, results land in DynamoDB and return to a React front end through API Gateway.',
    tech: ['Lambda', 'Rekognition', 'S3', 'DynamoDB', 'API Gateway', 'React'],
    category: 'cloud',
    role: 'Cloud Engineer',
    private: true,
    article: `${MEDIUM}/building-a-facial-recognition-application-on-aws-rekognition-lambda-api-gateway-and-dynamodb-0135781a146d`,
    tags: ['aws'],
  },
  {
    slug: 'carcare',
    title: 'CarCare Auto Services API',
    description: 'Vehicle hire price comparison: vendor onboarding, availability logic, commission tracking and booking.',
    tech: ['Express', 'MongoDB', 'Redis', 'Paystack', 'JWT'],
    category: 'backend',
    role: 'Backend Developer',
    github: `${GH}/carcare`,
    tags: ['backend'],
  },
  {
    slug: 'anythingcar',
    title: 'AnythingCar Platform',
    description: 'GPS-based car hire with optional security escort, plus a marketplace for cars and spare parts.',
    tech: ['Express', 'TypeScript', 'MongoDB'],
    category: 'backend',
    github: `${GH}/anythingcar`,
    tags: ['backend'],
  },
  {
    slug: 'scissor',
    title: 'Scissor URL Shortener',
    description: 'Custom short links, QR code generation, click tracking and geographic analytics.',
    tech: ['Node.js', 'Express', 'MongoDB'],
    category: 'backend',
    github: `${GH}/scissor-backend`,
    tags: ['backend'],
  },
  {
    slug: 'restaurant-chatbot',
    title: 'Restaurant Chatbot',
    description: 'Finds nearby restaurants with natural-language search, ratings and location-based recommendations.',
    tech: ['React', 'Node.js', 'MySQL'],
    category: 'fullstack',
    github: `${GH}/restaurant_chatbot`,
    tags: ['backend', 'frontend'],
  },
  {
    slug: 'blogging-api',
    title: 'Blogging API',
    description: 'Blog management with authentication, CRUD and full Swagger documentation.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Swagger'],
    category: 'backend',
    github: `${GH}/Blogging-API`,
    tags: ['backend'],
  },
  {
    slug: 'library',
    title: 'Library Management System',
    description: 'Borrowing, return tracking, fine calculation and session management.',
    tech: ['Express', 'MongoDB', 'Mongoose', 'JWT'],
    category: 'backend',
    github: `${GH}/library_management-system`,
    tags: ['backend'],
  },
];
