import { ArrowUpRight, Clock, Lock, MapPin } from 'lucide-react';
import Section from '../components/site/Section';
import SectionHeading from '../components/site/SectionHeading';
import AnimatedSection from '../components/AnimatedSection';
import ContactForm from '../components/ContactForm';
import { SITE, SOCIALS } from '@/data/profile';

/*
 * Contact: the form does the work (it posts to the self-hosted mailer, so the address never
 * appears on the page). The side column sets expectations, as the reference sites do.
 */
const Contact = () => (
  <>
    <Section tone="dark" first>
      <SectionHeading
        as="h1"
        size="page"
        eyebrow="Contact"
        title={
          <>
            Tell me what <em>you’re building</em>
          </>
        }
        lede="Open to cloud, DevOps, DevSecOps, SRE and platform roles, and happy to talk about projects, collaborations or a quick technical question."
      />
    </Section>

    <Section tone="alt">
      <div className="grid gap-10 lg:grid-cols-12">
        <AnimatedSection className="lg:col-span-7">
          <ContactForm />
        </AnimatedSection>

        <AnimatedSection delay={120} className="space-y-5 lg:col-span-4 lg:col-start-9">
          <div className="card p-6 shadow-card">
            <p className="flex items-center gap-2 text-[15px] font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {SITE.availability}
            </p>
            <ul className="mt-5 space-y-4 text-[14px] text-muted-foreground">
              <li className="flex gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-accent-ink" />
                {SITE.location} · eligible to work in the UK immediately
              </li>
              <li className="flex gap-3">
                <Clock size={17} className="mt-0.5 shrink-0 text-accent-ink" />
                Replies usually within a day, straight from my inbox
              </li>
              <li className="flex gap-3">
                <Lock size={17} className="mt-0.5 shrink-0 text-accent-ink" />
                Happy to walk through private code on a call
              </li>
            </ul>
          </div>

          <div className="card p-2 shadow-card">
            <p className="px-4 pb-1 pt-3 text-[13px] text-muted-foreground">Elsewhere</p>
            <ul>
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-alt"
                  >
                    <span>
                      <span className="block text-[15px] font-medium">{s.label}</span>
                      <span className="font-mono text-[12px] text-muted-foreground">{s.handle}</span>
                    </span>
                    <ArrowUpRight size={16} className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  </>
);

export default Contact;
