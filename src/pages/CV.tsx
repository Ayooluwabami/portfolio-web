import { Link } from 'react-router-dom';
import { Printer } from 'lucide-react';
import Section from '../components/site/Section';
import SectionHeading from '../components/site/SectionHeading';
import AnimatedSection from '../components/AnimatedSection';
import { AWARDS, CV_SKILLS, EDUCATION, ROLES, SITE, SOCIALS, VOLUNTEER } from '@/data/profile';

const SUMMARY =
  'Cloud, DevOps and platform engineer with 3+ years of experience designing, deploying and operating infrastructure across AWS, Azure and GCP, on a backend engineering foundation in Node.js, TypeScript and NestJS. Builds CI/CD with blocking security gates as standard (GitHub Actions, Azure DevOps, Jenkins, AWS CodePipeline), provisions infrastructure as code with Terraform and CloudFormation, and runs production-grade Kubernetes on EKS and AKS with GitOps via ArgoCD, zero-trust NetworkPolicies and full observability. Defines SLOs and error-budget policies, and works documentation-first: threat models, runbooks and blameless postmortems included. Cut deployment time by 90% through CI/CD automation and completed 20+ cloud projects. Currently pursuing AWS Solutions Architect Associate (SAA-C03). UK-based on a Skilled Worker Dependant visa; eligible to work immediately.';

/** Small heading used inside the CV sheet */
const H = ({ children }: { children: string }) => (
  <h2 className="mb-5 border-b border-border pb-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent-ink">{children}</h2>
);

/*
 * The CV reads like a document on screen and prints cleanly on A4 (print styles drop the site chrome).
 */
const CV = () => (
  <>
    <Section tone="dark" grid first className="no-print">
      <SectionHeading
        as="h1"
        size="page"
        eyebrow="Curriculum vitae"
        title={
          <>
            The <em>long</em> version
          </>
        }
        lede="Everything on one page, kept in step with my current CVs. Save it as a PDF from the print dialog."
        action={
          <div className="flex flex-wrap gap-3">
            <button onClick={() => window.print()} className="btn-primary">
              <Printer size={16} /> Save as PDF
            </button>
            <Link to="/contact" className="btn border border-white/25 text-white hover:border-white/60">
              Get in touch
            </Link>
          </div>
        }
      />
    </Section>

    <Section tone="alt" className="print:bg-white" innerClassName="print:p-0">
      <AnimatedSection>
        <article className="card mx-auto max-w-[1040px] p-6 shadow-card sm:p-10 md:p-14 print:max-w-none print:border-0 print:p-0 print:shadow-none">
          <header className="mb-10 grid gap-6 border-b border-border pb-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="display text-[40px] leading-none">{SITE.name}</p>
              <p className="mt-3 text-[17px] text-muted-foreground">Cloud, DevOps & Platform Engineer</p>
            </div>
            <ul className="space-y-1 font-mono text-[12.5px] text-muted-foreground md:col-span-5 md:text-right">
              <li>{SITE.location}</li>
              <li>
                <a href="mailto:ayobamieae@gmail.com" className="hover:text-accent-ink">
                  ayobamieae@gmail.com
                </a>
              </li>
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="hover:text-accent-ink">
                    {s.href.replace('https://', '').replace('www.', '')}
                  </a>
                </li>
              ))}
            </ul>
          </header>

          <div className="grid gap-12 md:grid-cols-12 print:block">
            <div className="space-y-12 md:col-span-8">
              <section>
                <H>Summary</H>
                <p className="body">{SUMMARY}</p>
              </section>

              <section>
                <H>Experience</H>
                <ol className="space-y-10">
                  {ROLES.map((r) => (
                    <li key={r.org + r.title} className="break-inside-avoid">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h3 className="h-card">
                          {r.title} <span className="font-normal text-muted-foreground">· {r.org}</span>
                        </h3>
                        <p className="font-mono text-[12px] text-muted-foreground">
                          {r.period} · {r.place}
                        </p>
                      </div>
                      {r.stack && <p className="mono-tag mt-2">{r.stack}</p>}
                      <ul className="mt-3 space-y-2">
                        {r.points.map((pt) => (
                          <li key={pt} className="flex gap-3 text-[14px] leading-relaxed text-muted-foreground">
                            <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-primary" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <aside className="space-y-12 md:col-span-4 print:mt-8">
              <section>
                <H>Skills</H>
                <dl className="space-y-4">
                  {CV_SKILLS.map((s) => (
                    <div key={s.label}>
                      <dt className="text-[14px] font-medium">{s.label}</dt>
                      <dd className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section>
                <H>Education & certification</H>
                <ul className="space-y-3">
                  {EDUCATION.map((e) => (
                    <li key={e.title} className="text-[14px]">
                      <p className="font-medium">{e.title}</p>
                      <p className="text-[13px] text-muted-foreground">
                        {e.org} · <span className="font-mono">{e.year}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <H>Leadership & volunteering</H>
                <ul className="space-y-3">
                  {VOLUNTEER.map((v) => (
                    <li key={v.title} className="text-[14px]">
                      <p className="font-medium">{v.title}</p>
                      <p className="text-[13px] text-muted-foreground">{v.org}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <H>Awards</H>
                <ul className="space-y-2 text-[14px] text-muted-foreground">
                  {AWARDS.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </article>
      </AnimatedSection>
    </Section>
  </>
);

export default CV;
