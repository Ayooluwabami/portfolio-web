import { MapPin, Github, Linkedin, ArrowUpRight, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { AnimatedHeadline, WordReveal } from '../components/AnimatedHeadline';
import Band from '../components/Band';
import ContactForm from '../components/ContactForm';

const MediumIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const SOCIALS = [
  { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayobami-edun', handle: 'in/ayobami-edun' },
  { icon: <Github size={18} />, label: 'GitHub', href: 'https://github.com/Ayooluwabami', handle: '@Ayooluwabami' },
  { icon: <MediumIcon />, label: 'Medium', href: 'https://medium.com/@ayobamieae', handle: '@ayobamieae' },
];

const Contact = () => (
  <div className="min-h-screen">
    <Band tone="sky" first>
      <AnimatedSection>
        <div className="mx-auto max-w-5xl">
          <WordReveal text="Contact" className="text-label mb-5" />
          <AnimatedHeadline as="h1" className="text-headline mb-5 max-w-[14ch]">
            Tell me what you’re building
          </AnimatedHeadline>
          <p className="text-subheadline">
            Open to cloud, DevOps, DevSecOps, SRE and platform roles, and happy to talk about projects, collaborations or a
            quick technical question.
          </p>
        </div>
      </AnimatedSection>
    </Band>

    <Band tone="white">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-12">
        <AnimatedSection className="lg:col-span-8">
          <ContactForm />
        </AnimatedSection>

        <AnimatedSection delay={120} className="space-y-6 lg:col-span-4">
          <div className="rounded-2xl border border-border bg-secondary/50 p-6">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Available now
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                West Midlands, UK · eligible to work in the UK immediately
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-primary" />
                Replies usually within a day
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-secondary/50 p-2">
            <p className="px-4 pb-1 pt-3 text-xs font-medium text-muted-foreground">Elsewhere</p>
            <ul>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-background/70"
                  >
                    <span className="text-primary">{s.icon}</span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{s.label}</span>
                      <span className="block text-xs text-muted-foreground">{s.handle}</span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </Band>
  </div>
);

export default Contact;
