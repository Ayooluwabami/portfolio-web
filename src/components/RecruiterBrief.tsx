import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Copy } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { WordReveal, AnimatedHeadline } from './AnimatedHeadline';

/*
 * The 20-second version for recruiters and hiring managers: the facts a shortlist needs,
 * and a one-click summary they can paste straight into an ATS note or a message to the team.
 */

const FACTS: [string, string][] = [
  ['Roles', 'Backend · Cloud · DevOps · DevSecOps · SRE · Platform'],
  ['Experience', '3+ years in production, 20+ cloud builds'],
  ['Location', 'West Midlands, UK · works remotely with teams worldwide'],
  ['Right to work', 'Eligible to work in the UK immediately (Skilled Worker Dependant visa)'],
  ['Availability', 'Available now'],
  ['Clouds', 'AWS · Azure · GCP'],
  ['Core stack', 'Terraform · Kubernetes (EKS, AKS) · ArgoCD · GitHub Actions · Azure DevOps · Prometheus · NestJS'],
  ['Studying', 'AWS Solutions Architect Associate (SAA-C03)'],
];

const SUMMARY = `Ayobami Edun · Cloud, DevOps & Platform Engineer
West Midlands, UK · eligible to work in the UK immediately · available now
3+ years across AWS, Azure and GCP on a backend foundation (Node.js, TypeScript, NestJS).
Highlights: AWS CodePipeline from git push to EC2 with blocking security gates and automatic rollback; zero-trust EKS platform with ArgoCD GitOps and seven PR security gates; Azure DevOps + AKS pipeline under 15 minutes; SLO framework with a 7.2-hour error budget; CI/CD rebuild that made deployments 90% faster.
Stack: Terraform, CloudFormation, Kubernetes (EKS, AKS), Helm, ArgoCD, GitHub Actions, Azure DevOps, Jenkins, Prometheus, Grafana, X-Ray, NestJS, PostgreSQL, Redis.
Email: ayobamieae@gmail.com · LinkedIn: linkedin.com/in/ayobami-edun · GitHub: github.com/Ayooluwabami`;

const RecruiterBrief = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SUMMARY);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:ayobamieae@gmail.com`;
    }
  };

  return (
    <section className="tone-mint section-padding" id="recruiters">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <AnimatedSection>
              <WordReveal text="For recruiters" className="text-label mb-5" />
              <AnimatedHeadline as="h2" className="text-section-title mb-5">
                The 20-second version
              </AnimatedHeadline>
              <p className="mb-8 text-muted-foreground">
                Everything a shortlist needs on one card. Copy the summary straight into your notes or a message to the
                hiring manager.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={copy} className="btn-primary flex items-center gap-2" aria-live="polite">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Summary copied' : 'Copy summary'}
                </button>
                <Link to="/cv" className="btn-secondary group flex items-center gap-2 bg-background/60">
                  Full CV
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={100} className="lg:col-span-7 lg:col-start-6">
            <dl className="overflow-hidden rounded-xl border border-border bg-white shadow-card dark:bg-background">
              {FACTS.map(([k, v], i) => (
                <div key={k} className={`grid gap-1 px-6 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-6 ${i ? 'border-t border-border' : ''}`}>
                  <dt className="text-sm text-muted-foreground">{k}</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {k === 'Availability' || k === 'Right to work' ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {v}
                      </span>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default RecruiterBrief;
