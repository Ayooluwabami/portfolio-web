import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Lock } from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection';
import Band from '../../components/Band';

const METRICS = [
  { value: '9', label: 'CloudFormation nested stacks' },
  { value: '5', label: 'Least-privilege IAM roles' },
  { value: '8', label: 'DynamoDB order statuses tracked' },
  { value: '100%', label: 'End-to-end correlation ID tracing' },
];

const PIPELINE_STEPS = [
  { label: 'API Gateway', detail: 'REST entry point', color: 'border-blue-500/40 bg-blue-500/5' },
  { label: 'Lambda (Python)', detail: 'Order validation & routing', color: 'border-amber-500/40 bg-amber-500/5' },
  { label: 'SQS + DLQ', detail: 'maxReceiveCount=3, DLQ alarm → SNS', color: 'border-orange-500/40 bg-orange-500/5' },
  { label: 'ECS Fargate', detail: 'Invoice generator (fpdf, Docker/ECR)', color: 'border-purple-500/40 bg-purple-500/5' },
  { label: 'S3', detail: 'Invoice object storage', color: 'border-green-500/40 bg-green-500/5' },
  { label: 'Lambda', detail: 'S3 trigger → email dispatch', color: 'border-amber-500/40 bg-amber-500/5' },
  { label: 'SES', detail: 'Email delivery to customer', color: 'border-primary/40 bg-primary/5' },
];

const ServerlessPipeline = () => (
  <div className="min-h-screen">
    <Band tone="sky" first>
      <div className="mx-auto max-w-4xl">
      <AnimatedSection>
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </AnimatedSection>

      {/* Hero */}
      <AnimatedSection delay={30}>
        <div className="">
          <span className="text-label block mb-3">Case Study</span>
          <h1 className="text-headline mb-4">Serverless E-Commerce Order Pipeline</h1>
          <p className="text-subheadline max-w-2xl mb-6">
            Event-driven order processing built across 9 AWS CloudFormation nested stacks — from API Gateway through
            ECS Fargate invoice generation to SES email delivery, with full correlation ID tracing end-to-end.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">Cloud Engineer</span>
            <span className="px-3 py-1.5 bg-secondary text-muted-foreground text-xs font-medium rounded-full border border-border">AWS eu-west-2</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-muted-foreground text-xs font-medium rounded-full border border-border" title="The code isn’t public. Happy to walk through it on a call.">
              <Lock size={12} /> Private repo · walkthrough on request
            </span>
          </div>
        </div>
      </AnimatedSection>

      </div>
    </Band>
    <Band tone="white">
      <div className="mx-auto max-w-4xl">
      {/* Metrics */}
      <AnimatedSection delay={50}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {METRICS.map((m) => (
            <div key={m.label} className="p-4 bg-secondary/50 rounded-xl border border-border text-center">
              <p className="text-xl font-bold text-primary mb-1">{m.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{m.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Architecture flow */}
      <AnimatedSection delay={70}>
        <div className="">
          <h2 className="text-lg font-semibold mb-6">Architecture — Event Flow</h2>
          <div className="p-6 bg-secondary/50 rounded-xl border border-border">
            {/* Linear pipeline */}
            <div className="flex flex-wrap gap-2 items-center justify-center mb-8">
              {PIPELINE_STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className={`px-3 py-2 rounded-lg border text-center min-w-[100px] ${step.color}`}>
                    <p className="text-xs font-semibold">{step.label}</p>
                    <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{step.detail}</p>
                  </div>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <span className="text-muted-foreground font-mono text-sm">→</span>
                  )}
                </div>
              ))}
            </div>

            {/* DynamoDB + CloudWatch side details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-background border border-border rounded-lg">
                <p className="font-semibold mb-2">DynamoDB — Order State Machine</p>
                <p className="text-muted-foreground mb-2">8 progressive statuses tracked per order:</p>
                <div className="flex flex-wrap gap-1">
                  {['RECEIVED', 'VALIDATED', 'QUEUED', 'PROCESSING', 'INVOICE_GENERATED', 'UPLOADED', 'EMAIL_SENT', 'COMPLETED'].map(s => (
                    <span key={s} className="px-1.5 py-0.5 bg-secondary rounded text-[10px] font-mono">{s}</span>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-background border border-border rounded-lg">
                <p className="font-semibold mb-2">Observability</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Correlation ID injected at API Gateway</li>
                  <li>• Propagated through every Lambda & ECS task</li>
                  <li>• CloudWatch Logs Insights — end-to-end trace in one query</li>
                  <li>• DLQ depth alarm → SNS email alert</li>
                  <li>• CloudWatch alarm triggers on DLQ depth &gt; 0</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      </div>
    </Band>
    <Band tone="lavender">
      <div className="mx-auto max-w-4xl">
      {/* IaC Design */}
      <AnimatedSection delay={90}>
        <div className="">
          <h2 className="text-lg font-semibold mb-5">Infrastructure as Code — 9 Nested Stacks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { name: 'vpc-stack', desc: 'VPC, subnets, route tables, NAT gateway' },
              { name: 'iam-stack', desc: '5 least-privilege IAM roles (one per service boundary)' },
              { name: 'apigw-stack', desc: 'API Gateway + Lambda integration' },
              { name: 'sqs-stack', desc: 'Main queue + DLQ + VisibilityTimeout tuning' },
              { name: 'ecs-stack', desc: 'ECS Fargate cluster, task definition, ECR image' },
              { name: 's3-stack', desc: 'Invoice bucket + lifecycle policy' },
              { name: 'dynamodb-stack', desc: 'Orders table with GSIs for status queries' },
              { name: 'ses-stack', desc: 'SES identity + sending configuration' },
              { name: 'monitoring-stack', desc: 'CloudWatch alarms, SNS topics, log groups' },
            ].map(({ name, desc }) => (
              <div key={name} className="p-3 bg-secondary/50 rounded-lg border border-border">
                <p className="text-xs font-mono font-semibold text-primary mb-1">{name}.yaml</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      </div>
    </Band>
    <Band tone="mint">
      <div className="mx-auto max-w-4xl">
      {/* Key decisions */}
      <AnimatedSection delay={110}>
        <div className="">
          <h2 className="text-lg font-semibold mb-5">Key Technical Decisions</h2>
          <div className="space-y-3">
            {[
              { decision: 'ECS Fargate for invoice generation (not Lambda)', reason: 'PDF generation with fpdf is CPU-bound and can exceed Lambda\'s 512 MB memory and 15-minute timeout on large orders. Fargate gives flexible memory and no timeout.' },
              { decision: 'SQS maxReceiveCount=3 before DLQ', reason: 'Transient failures (downstream timeout, cold start) retry 3 times. Only persistent failures land in the DLQ, preventing alert fatigue.' },
              { decision: 'Correlation ID at the entry point', reason: 'Injected once at API Gateway and threaded through every downstream service. Enables a single Logs Insights query to reconstruct an entire order journey.' },
              { decision: 'Nested stacks over a single monolithic template', reason: 'Separate stacks deploy independently. A change to the monitoring stack doesn\'t redeploy the VPC. Reduces deployment risk and blast radius.' },
            ].map(({ decision, reason }) => (
              <div key={decision} className="p-4 bg-secondary/50 rounded-lg border border-border">
                <p className="text-sm font-semibold mb-1">{decision}</p>
                <p className="text-xs text-muted-foreground">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      </div>
    </Band>
    <Band tone="white">
      <div className="mx-auto max-w-4xl">
      {/* Nav */}
      <AnimatedSection delay={130}>
        <div className="flex flex-wrap gap-4 justify-between items-center pt-6 border-t border-border">
          <Link to="/projects/carepulse" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            CarePulse
          </Link>
          <Link to="/projects/drivewell" className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
            Next: DriveWell Backend
            <ExternalLink size={14} />
          </Link>
        </div>
      </AnimatedSection>
      </div>
    </Band>
  </div>
);

export default ServerlessPipeline;
