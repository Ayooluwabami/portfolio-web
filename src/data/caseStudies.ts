/*
 * Case studies rendered by one template (pages/CaseStudy.tsx). Content is ported from the
 * original CarePulse, DriveWell and Serverless Pipeline pages and the current CVs.
 */

export interface CaseStudy {
  slug: string;
  title: string;
  /** Second half of the heading, set in italic accent */
  accent: string;
  kicker: string;
  intro: string;
  role: string;
  period: string;
  links: { label: string; href: string }[];
  privateRepo?: boolean;
  metrics: { value: string; label: string }[];
  problem: string;
  approach: string;
  flowTitle: string;
  flow: { label: string; detail: string }[];
  groups: { title: string; items: string[] }[];
  decisions: { decision: string; reason: string }[];
  stack: { cat: string; items: string[] }[];
  next: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'carepulse',
    title: 'CarePulse,',
    accent: 'NHS-aligned care on EKS',
    kicker: 'Health platform · case study',
    intro:
      'Community clinics needed triage, live queues and clinical summaries in one place, under NHS security rules. I built the services and the platform they run on: eight NestJS services on Amazon EKS, shipped by Jenkins through staging and a smoke test before production.',
    role: 'Backend & cloud engineer',
    period: 'Jan 2026 – present',
    links: [],
    privateRepo: true,
    metrics: [
      { value: '8', label: 'NestJS services over Redis TCP' },
      { value: '0', label: 'static credentials in pods (IRSA)' },
      { value: '0', label: 'downtime per deploy (RollingUpdate)' },
      { value: 'DSP', label: 'Toolkit-aligned immutable audit log' },
    ],
    problem:
      'NHS community health clinics needed patient triage, real-time queue management and post-consultation summaries, while meeting the DSP Toolkit, NHS Login and GDPR audit-trail requirements.',
    approach:
      'Split the domain into services that talk over Redis TCP on the hot path. Queues sit on Redis sorted sets for O(log N) operations, the Claude API returns an urgency level with a confidence score, and every clinical action writes to an append-only audit log.',
    flowTitle: 'Request path',
    flow: [
      { label: 'Mobile & web', detail: 'React Native app and a Next.js BFF that keeps tokens server-side' },
      { label: 'API gateway', detail: 'NestJS edge: auth, rate limits, routing' },
      { label: 'Services', detail: 'Eight services over Redis TCP transport' },
      { label: 'Amazon EKS', detail: 'IRSA, hardened pods, FluentBit to CloudWatch' },
      { label: 'Data', detail: 'RDS PostgreSQL and ElastiCache Redis' },
    ],
    groups: [
      { title: 'Services', items: ['Auth', 'Patient', 'Queue (sorted sets)', 'AI triage (Claude API)', 'Appointments', 'Notifications', 'Records', 'Summaries'] },
      { title: 'Cluster hardening', items: ['IRSA, no static credentials', 'RollingUpdate deploys', 'readOnlyRootFilesystem', 'runAsNonRoot', 'FluentBit DaemonSet to CloudWatch'] },
      { title: 'Jenkins pipeline', items: ['CloudFormation validation', 'Lint, tests, audit', 'ECR image build and push', 'Helm deploy to staging', 'Smoke test gate', 'Helm deploy to production'] },
    ],
    decisions: [
      { decision: 'Redis TCP between services', reason: 'Lower latency than HTTP for calls inside the cluster, and no REST overhead on the hot path.' },
      { decision: 'IRSA instead of IAM keys', reason: 'Pods assume roles through service-account annotations. Nothing to rotate, nothing to leak.' },
      { decision: 'A mutex around token refresh', reason: 'Concurrent 401s no longer race to refresh. One request refreshes; the rest wait and reuse the new token.' },
      { decision: 'BFF for the web app', reason: 'Tokens live server-side in httpOnly cookies. The browser never holds a JWT.' },
      { decision: 'RollingUpdate over Recreate', reason: 'New pods come up and pass readiness before old ones terminate, so clinics never see a gap.' },
    ],
    stack: [
      { cat: 'Backend', items: ['NestJS', 'TypeScript', 'Redis TCP', 'Socket.io', 'BullMQ'] },
      { cat: 'Clients', items: ['Next.js BFF', 'React Native (Expo)', 'Tailwind CSS'] },
      { cat: 'AWS', items: ['EKS', 'ECR', 'RDS PostgreSQL', 'ElastiCache', 'CloudWatch', 'CloudTrail'] },
      { cat: 'Delivery', items: ['Terraform', 'CloudFormation', 'Jenkins', 'Helm'] },
      { cat: 'Security', items: ['NHS Login OIDC + PKCE', 'TOTP 2FA', 'RS256 JWT', 'Immutable audit log'] },
    ],
    next: 'serverless-pipeline',
  },
  {
    slug: 'serverless-pipeline',
    title: 'Serverless orders,',
    accent: 'traced end to end',
    kicker: 'Event-driven AWS · case study',
    intro:
      'An order arrives, gets validated, waits in a queue, has an invoice rendered, is stored and is emailed to the customer. Each step is a separate AWS service in its own CloudFormation stack, and one correlation ID ties the whole journey together.',
    role: 'Cloud engineer',
    period: 'AWS eu-west-2',
    links: [],
    privateRepo: true,
    metrics: [
      { value: '9', label: 'CloudFormation nested stacks' },
      { value: '5', label: 'least-privilege IAM roles' },
      { value: '8', label: 'order states tracked in DynamoDB' },
      { value: '1', label: 'query to trace any order end to end' },
    ],
    problem:
      'Invoice generation is slow and CPU-bound, emails must not be lost, and when something fails someone needs to know which order, at which step, without reading five log groups.',
    approach:
      'Decouple every step with events. SQS absorbs spikes and retries transient failures three times before a DLQ, Fargate handles the heavy PDF work, and a correlation ID injected at the edge travels through every Lambda and task.',
    flowTitle: 'Event flow',
    flow: [
      { label: 'API Gateway', detail: 'REST entry, correlation ID injected' },
      { label: 'Lambda (Python)', detail: 'Validation and routing' },
      { label: 'SQS + DLQ', detail: 'maxReceiveCount 3, DLQ alarm to SNS' },
      { label: 'ECS Fargate', detail: 'Invoice generator, image from ECR' },
      { label: 'S3 → Lambda → SES', detail: 'Store the invoice, then email the customer' },
    ],
    groups: [
      { title: 'Order states', items: ['RECEIVED', 'VALIDATED', 'QUEUED', 'PROCESSING', 'INVOICE_GENERATED', 'UPLOADED', 'EMAIL_SENT', 'COMPLETED'] },
      { title: 'Stacks', items: ['vpc', 'iam', 'apigw', 'sqs', 'ecs', 's3', 'dynamodb', 'ses', 'monitoring'] },
      { title: 'Observability', items: ['Correlation ID at the edge', 'Propagated through every task', 'Logs Insights trace in one query', 'Alarm on DLQ depth above 0', 'SNS email alert'] },
    ],
    decisions: [
      { decision: 'Fargate for invoices, not Lambda', reason: 'PDF rendering is CPU-bound and can outgrow Lambda memory and timeouts on large orders. Fargate has neither limit.' },
      { decision: 'Three receives before the DLQ', reason: 'Transient failures retry quietly. Only persistent ones reach the DLQ, so alerts mean something.' },
      { decision: 'Correlation ID at the entry point', reason: 'Injected once and threaded everywhere, so one Logs Insights query rebuilds an order’s whole journey.' },
      { decision: 'Nested stacks over one template', reason: 'Stacks deploy independently. Changing monitoring never redeploys the VPC, which keeps the blast radius small.' },
    ],
    stack: [
      { cat: 'Compute', items: ['Lambda (Python)', 'ECS Fargate', 'ECR'] },
      { cat: 'Messaging', items: ['API Gateway', 'SQS + DLQ', 'SNS', 'SES'] },
      { cat: 'Data', items: ['DynamoDB', 'S3'] },
      { cat: 'IaC & ops', items: ['CloudFormation nested stacks', 'IAM', 'CloudWatch Logs Insights'] },
    ],
    next: 'drivewell',
  },
  {
    slug: 'drivewell',
    title: 'DriveWell,',
    accent: 'deployments 90% faster',
    kicker: 'Vehicle platform backend · case study',
    intro:
      'Three client surfaces, ten-plus third-party services and deploys done by hand over SSH. I designed one environment-aware backend for all of it on GCP, then replaced the manual deploys with a pipeline.',
    role: 'Backend & cloud engineer',
    period: 'Feb 2025 – Dec 2025',
    links: [{ label: 'Live site', href: 'https://www.drivewellapp.com/' }],
    privateRepo: true,
    metrics: [
      { value: '90%', label: 'faster deployments' },
      { value: '10+', label: 'third-party integrations' },
      { value: '40+', label: 'environment variables validated at boot' },
      { value: '3', label: 'surfaces: web, mobile, admin' },
    ],
    problem:
      'Web, mobile and admin all needed one backend without configuration drift, while payments, messaging, identity verification and storage each came from a different provider.',
    approach:
      'A single codebase that refuses to boot with missing or malformed config, Redis-backed sessions per surface, structured logging to Papertrail at every service boundary, and a GitHub Actions pipeline that builds and ships containers to GCE.',
    flowTitle: 'System shape',
    flow: [
      { label: 'Clients', detail: 'Public web, admin dashboard, mobile apps' },
      { label: 'Restana API', detail: 'Node.js and TypeScript, JWT and RBAC' },
      { label: 'MySQL + Redis', detail: 'Data, cache and sessions' },
      { label: 'GCP', detail: 'Compute Engine and Cloud Storage' },
    ],
    groups: [
      { title: 'Platform services', items: ['Vehicle hire and availability', 'Towing request and dispatch', 'Documentation and licensing', 'Pricing engine', 'Wallet with escrow', 'Customer management'] },
      { title: 'Integrations', items: ['Paystack', 'Flutterwave', 'Piggyvest', 'Termii SMS', 'WhatsApp Business', 'Mailchimp', 'Metamap KYC', 'Google Maps', 'Papertrail'] },
      { title: 'Pipeline', items: ['GitHub Actions on push', 'Docker Buildx build', 'Push to registry', 'Deploy to GCE', 'Container swap', 'Logs to Papertrail'] },
    ],
    decisions: [
      { decision: 'Restana over Express', reason: 'A minimal router with lower per-request overhead, which matters for a high-throughput hire API.' },
      { decision: 'Validate every env var at boot', reason: 'The server will not start with missing or malformed config, so misconfiguration never reaches production quietly.' },
      { decision: 'Redis sessions for the web', reason: 'Server-side sessions can be revoked instantly: log out everywhere, suspend an account. Stateless JWTs cannot.' },
      { decision: 'Buildx and Actions over SSH deploys', reason: 'Every deploy is the same deploy. The inconsistency from manual releases went away, and so did 90% of the time.' },
    ],
    stack: [
      { cat: 'Backend', items: ['Node.js', 'Restana', 'TypeScript', 'Knex'] },
      { cat: 'Data', items: ['MySQL', 'Redis'] },
      { cat: 'Cloud', items: ['GCE', 'Google Cloud Storage'] },
      { cat: 'Delivery', items: ['Docker Buildx', 'GitHub Actions', 'Papertrail'] },
    ],
    next: 'carepulse',
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
