import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { AnimatedHeadline, WordReveal } from '../components/AnimatedHeadline';
import Band from '../components/Band';

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

const Skills = () => {
  return (
    <div className="min-h-screen">
      <Band tone="sky" first>
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <WordReveal text="Expertise" className="text-label mb-4" />
            <AnimatedHeadline as="h1" className="text-headline mb-5">
              Technical <span className="text-gradient">skills</span>
            </AnimatedHeadline>
            <p className="text-subheadline">
              Every tool I have used in production or a real build, grouped by where it sits in the stack.
            </p>
          </div>
        </AnimatedSection>

      </Band>
      <Band tone="white">
        {/* Skills — full-width cards, badges inside */}
        <div className="max-w-5xl mx-auto space-y-5 mb-16">
          {SKILL_CATEGORIES.map((category, categoryIndex) => (
            <AnimatedSection key={category.title} delay={categoryIndex * 40}>
              <div className="p-6 rounded-xl bg-secondary/40 border border-border">
                <h2 className="text-sm font-semibold text-foreground mb-4 tracking-tight">
                  {category.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.02 }}
                      whileHover={{ scale: 1.03 }}
                      className="px-3 py-1.5 bg-background text-foreground rounded-md text-xs font-medium
                                 border border-border hover:border-primary/40 hover:text-primary
                                 transition-all duration-150 cursor-default select-none"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </Band>
      <Band tone="ink">
        {/* Approach */}
        <AnimatedSection delay={300}>
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-secondary/40 rounded-xl border border-border">
              <h2 className="font-display text-xl font-bold mb-8 tracking-tight">Development approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Shift left", desc: "Security gates run before merge and locally as pre-commit hooks, so problems are caught where they are cheapest to fix." },
                  { title: "Everything as code", desc: "Infrastructure, pipelines and policies live in Git and change through reviewed pull requests." },
                  { title: "Measure reliability", desc: "SLOs, error budgets and alerts that page only when a person should act, backed by runbooks." },
                ].map((approach) => (
                  <div key={approach.title}>
                    <div className="font-display tabular-nums text-2xl font-bold text-primary mb-2">{approach.title}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{approach.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

      </Band>
      <Band tone="mint">
        {/* Soft skills */}
        <AnimatedSection delay={350}>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-label mb-3">Beyond technical</p>
              <h2 className="font-display text-xl font-bold tracking-tight">
                Soft <span className="text-gradient">skills</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {SOFT_SKILLS.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.03 }}
                  className="px-4 py-2 bg-secondary/50 rounded-lg border border-border hover:border-primary/40
                             text-sm font-medium transition-all duration-150 cursor-default select-none"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </Band>
    </div>
  );
};

export default Skills;
