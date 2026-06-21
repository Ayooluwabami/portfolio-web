import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { AnimatedHeadline, WordReveal } from '../components/AnimatedHeadline';

const SKILL_CATEGORIES = [
  {
    title: "Languages & frameworks",
    skills: ["JavaScript", "TypeScript", "Python", "Node.js", "Express.js", "NestJS", "Flask", "Restana", "React", "Vite", "Tailwind CSS"],
  },
  {
    title: "Databases & caching",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "PostGIS", "Redis", "Prisma ORM", "Prisma Accelerate", "Knex", "GeoFirestore"],
  },
  {
    title: "AWS",
    skills: ["EC2", "VPC", "S3", "IAM", "RDS (Aurora MySQL · Oracle Multi-AZ)", "ALB", "ASG", "Lambda", "SQS", "SES", "SNS", "CloudFront", "Route 53", "ACM", "CloudFormation", "SSM", "ECS Fargate", "ECR", "EFS", "DynamoDB", "ElastiCache", "CloudWatch", "CloudTrail", "Lightsail"],
  },
  {
    title: "Azure & GCP",
    skills: ["Azure VMs", "App Service", "Azure Functions", "Blob Storage", "VNet/NSG", "Entra ID", "Key Vault", "Azure SQL", "GCP Compute Engine", "Google Cloud Storage", "Google Vertex AI"],
  },
  {
    title: "DevOps & IaC",
    skills: ["Terraform", "AWS CloudFormation", "GitHub Actions", "Jenkins", "Bitbucket Pipelines", "Docker", "Docker Buildx", "Docker Compose", "Kubernetes (EKS)", "Helm", "ArgoCD", "Azure DevOps", "Bash / Shell scripting"],
  },
  {
    title: "DevSecOps",
    skills: ["Semgrep (SAST)", "Checkov (IaC)", "Trivy (container CVE)", "Gitleaks (secret scan)", "OWASP ZAP (DAST)", "OIDC federation", "IRSA", "Cosign / SBOM attestation", "NetworkPolicies", "Least-privilege IAM"],
  },
  {
    title: "AI & generative services",
    skills: ["Claude API (Anthropic)", "Google Gemini API", "Google Vertex AI", "Google Translate API", "Amazon Rekognition", "Firebase Admin", "AI-assisted triage & summaries"],
  },
  {
    title: "Background & event systems",
    skills: ["BullMQ", "Redis Queues", "Redis Pub/Sub", "Redis Sorted Sets", "Event-driven architecture", "Cron jobs", "NestJS Microservices (TCP)", "AWS SNS/SQS pipeline", "Socket.io", "Webhooks"],
  },
  {
    title: "Notifications & integrations",
    skills: ["OneSignal", "Expo Push", "Firebase FCM", "Twilio", "Termii", "WhatsApp API", "Mailchimp", "Metamap"],
  },
  {
    title: "Security & payments",
    skills: ["JWT", "OAuth2", "PKCE", "bcrypt / argon2", "Rate limiting", "RBAC", "API key management", "Paystack", "Stripe", "Piggyvest", "Flutterwave"],
  },
  {
    title: "API & testing",
    skills: ["REST API design", "OpenAPI / Swagger", "Postman", "Insomnia", "Jest", "Supertest", "Pino", "Papertrail", "Sentry"],
  },
  {
    title: "Scripting & tooling",
    skills: ["Bash scripting", "Shell scripting", "Python scripting", "Makefile", "Git", "GitHub", "CI/CD", "MVC", "Microservices", "DNS management (SPF · DKIM · DMARC)", "Linux / Ubuntu server admin"],
  },
];

const SOFT_SKILLS = [
  "Leadership", "Team collaboration", "Problem-solving", "Critical thinking",
  "Communication", "Time management", "Agile delivery", "Mentoring", "Stakeholder communication",
] as const;

const Skills = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">

        {/* Header */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <WordReveal text="Expertise" className="text-label mb-4" />
            <AnimatedHeadline as="h1" className="text-headline mb-5">
              Technical <span className="text-gradient">skills</span>
            </AnimatedHeadline>
            <p className="text-subheadline mx-auto">
              A comprehensive toolkit for building robust, scalable backend systems
              and delivering production-ready cloud infrastructure.
            </p>
          </div>
        </AnimatedSection>

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

        {/* Approach */}
        <AnimatedSection delay={300}>
          <div className="max-w-4xl mx-auto mb-16">
            <div className="p-8 bg-secondary/40 rounded-xl border border-border">
              <h2 className="font-display text-xl font-bold mb-8 tracking-tight">Development approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Agile",      desc: "Iterative development with continuous feedback and adaptation." },
                  { title: "CI/CD",      desc: "Automated testing and deployment pipelines for reliability." },
                  { title: "Clean code", desc: "MVC architecture and separation of concerns for maintainability." },
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
      </div>
    </div>
  );
};

export default Skills;
