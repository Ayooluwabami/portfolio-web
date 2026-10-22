import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section from '../components/site/Section';
import SectionHeading from '../components/site/SectionHeading';
import AnimatedSection from '../components/AnimatedSection';

// Kept in step with the current Cloud, DevSecOps, SRE and Platform CVs (Jul 2026)
const SKILL_CATEGORIES = [
  {
    title: "CI/CD & automation",
    skills: ["GitHub Actions", "AWS CodePipeline", "CodeBuild", "CodeDeploy", "Azure DevOps", "Jenkins", "Bitbucket Pipelines", "OIDC keyless auth", "Matrix builds", "Environment approval gates", "Pre-commit hooks", "Docker", "Docker Compose", "Docker Buildx"],
  },
  {
    title: "Infrastructure as code",
    skills: ["Terraform (modules, S3 + DynamoDB state)", "AWS CloudFormation (nested stacks)", "Ansible", "Puppet", "ARM / Bicep (familiar)", "AWS CDK (familiar)"],
  },
  {
    title: "Kubernetes & GitOps",
    skills: ["EKS", "AKS", "Helm (--atomic)", "ArgoCD (App-of-Apps)", "RollingUpdate", "HPA", "PDB", "NetworkPolicies", "Pod security hardening", "Seccomp", "IRSA", "FluentBit DaemonSet", "ECR", "ACR", "ECS Fargate"],
  },
  {
    title: "DevSecOps & supply chain",
    skills: ["STRIDE threat modelling", "Gitleaks", "Checkov", "tfsec", "Semgrep (SAST)", "Trivy", "OWASP Dependency-Check (SCA)", "OWASP ZAP (DAST)", "Syft (SBOM)", "npm audit", "Cosign", "SHA-pinned actions", "Least-privilege IAM", "IMDSv2", "Azure Key Vault"],
  },
  {
    title: "Observability & SRE",
    skills: ["Prometheus", "Grafana", "Alertmanager", "kube-prometheus-stack", "CloudWatch (Logs Insights, metric filters)", "CloudTrail", "AWS X-Ray", "Correlation ID tracing", "SLOs / SLIs", "Error-budget policies", "Runbooks", "Blameless postmortems", "Incident response", "OpenTelemetry (familiar)"],
  },
  {
    title: "AWS",
    skills: ["EC2", "VPC", "S3", "IAM", "RDS (Aurora MySQL · Oracle Multi-AZ)", "ALB", "ASG", "Lambda", "API Gateway", "SQS", "SES", "SNS", "CloudFront", "Route 53", "ACM", "SSM", "ECS Fargate", "ECR", "EFS", "DynamoDB", "ElastiCache", "CodePipeline", "CodeBuild", "CodeDeploy", "X-Ray", "Lightsail"],
  },
  {
    title: "Azure & GCP",
    skills: ["AKS", "ACR", "Azure VMs", "App Service", "Azure Functions", "Blob Storage", "VNet / NSG", "Entra ID", "RBAC", "Key Vault", "Azure SQL", "GCP Compute Engine", "Google Cloud Storage", "Vertex AI"],
  },
  {
    title: "Networking & Linux",
    skills: ["VPC design", "Subnets & route tables", "NAT & internet gateways", "Security groups & NACLs", "VPC peering", "DNS (Route 53)", "SSL/TLS", "SPF · DKIM · DMARC · MTA-STS", "Ubuntu / Debian", "Nginx", "SSH", "Log analysis"],
  },
  {
    title: "Languages & scripting",
    skills: ["TypeScript", "JavaScript", "Node.js", "Python", "Bash", "HCL", "YAML", "Makefile"],
  },
  {
    title: "Backend & data",
    skills: ["NestJS", "Express", "Restana", "PostgreSQL", "PostGIS", "MySQL", "MongoDB", "Redis (sorted sets, pub/sub, queues)", "BullMQ", "Prisma", "Knex", "Microservices (TCP)", "Socket.io", "Webhooks"],
  },
  {
    title: "Security, APIs & payments",
    skills: ["JWT (RS256 + HS256)", "OAuth2", "OIDC PKCE", "TOTP 2FA", "RBAC", "bcrypt / argon2", "Rate limiting", "OpenAPI / Swagger", "Paystack", "Flutterwave", "KoraPay", "Stripe", "Piggyvest"],
  },
  {
    title: "AI & integrations",
    skills: ["Claude API (Anthropic)", "Gemini API", "Vertex AI", "Amazon Rekognition", "OneSignal", "Firebase FCM", "Twilio", "Termii", "WhatsApp API", "Metamap", "Mailchimp"],
  },
];

const SOFT_SKILLS = [
  "Leadership", "Team collaboration", "Problem-solving", "Critical thinking",
  "Communication", "Time management", "Agile delivery", "Mentoring", "Stakeholder communication",
] as const;

const PRINCIPLES = [
  { title: 'Shift left', body: 'Security gates run before merge and locally as pre-commit hooks, so problems are caught where they are cheapest to fix.' },
  { title: 'Everything as code', body: 'Infrastructure, pipelines and policies live in Git and change through reviewed pull requests.' },
  { title: 'Measure reliability', body: 'SLOs, error budgets and alerts that page only when a person should act, backed by runbooks.' },
];

const Skills = () => (
  <>
    <Section tone="dark" first>
      <SectionHeading
        as="h1"
        size="page"
        eyebrow="Skills"
        title={
          <>
            The tools, <em>in context</em>
          </>
        }
        lede="Every tool I’ve used in production or a real build, grouped by where it sits in the stack."
      />
    </Section>

    <Section tone="base">
      <ul>
        {SKILL_CATEGORIES.map((c, i) => (
          <li key={c.title} className="border-t border-border last:border-b">
            <AnimatedSection delay={Math.min(i, 4) * 40} className="grid gap-4 py-7 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <h2 className="h-card">{c.title}</h2>
                <p className="mt-1 font-mono text-[12px] text-muted-foreground">{c.skills.length} tools</p>
              </div>
              <div className="flex flex-wrap gap-2 md:col-span-9">
                {c.skills.map((s) => (
                  <span key={s} className="rounded-lg border border-border bg-alt px-3 py-1.5 text-[13px] text-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </li>
        ))}
      </ul>
    </Section>

    <Section tone="alt">
      <SectionHeading
        eyebrow="Approach"
        title={
          <>
            How the tools <em>get used</em>
          </>
        }
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <AnimatedSection key={p.title} delay={i * 80} className="h-full">
            <div className="card h-full p-7 shadow-card">
              <span className="font-mono text-[13px] text-accent-ink">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display mt-5 text-[26px] leading-tight">{p.title}</h3>
              <p className="body mt-3">{p.body}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>

    <Section tone="base">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Beyond technical"
            title={
              <>
                How I work <em>with people</em>
              </>
            }
          />
        </div>
        <AnimatedSection delay={120} className="lg:col-span-7 lg:col-start-6">
          <div className="flex flex-wrap gap-2.5">
            {SOFT_SKILLS.map((s) => (
              <span key={s} className="rounded-xl border border-border px-4 py-2.5 text-[14px]">
                {s}
              </span>
            ))}
          </div>
          <Link to="/cv" className="btn-outline btn-sm mt-10">
            See where I used them <ArrowRight size={15} />
          </Link>
        </AnimatedSection>
      </div>
    </Section>
  </>
);

export default Skills;
