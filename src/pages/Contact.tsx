import { Mail, MapPin, Github, Linkedin, BookOpen, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const MediumIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const contactMethods = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "ayobamieae@gmail.com",
    href: "mailto:ayobamieae@gmail.com",
  },
  {
    icon: <MapPin size={20} />,
    label: "Location",
    value: "England, United Kingdom",
    href: null,
  },
];

const socialLinks = [
  {
    icon: <Github size={20} />,
    label: "GitHub",
    href: "https://github.com/Ayooluwabami",
    username: "@Ayooluwabami",
  },
  {
    icon: <Linkedin size={20} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayobami-edun",
    username: "linkedin.com/in/ayobami-edun",
  },
  {
    icon: <MediumIcon size={20} />,
    label: "Medium",
    href: "https://medium.com/@ayobamieae",
    username: "@ayobamieae",
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-label mb-4">Contact</p>
            <h1 className="text-headline mb-5">
              Let's <span className="text-gradient">connect</span>
            </h1>
            <p className="text-subheadline mx-auto">
              Open to backend, cloud, DevOps, DevSecOps, and SRE roles — and happy to discuss
              projects, collaborations, or a quick technical chat.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {/* Contact info card */}
          <AnimatedSection delay={50}>
            <div className="bg-secondary/50 rounded-xl border border-border overflow-hidden mb-6">
              <div className="p-6 lg:p-8 space-y-5">
                <div>
                  <h2 className="font-display text-xl font-bold mb-1">Ayobami Edun</h2>
                  <p className="text-muted-foreground text-sm">
                    Backend · Cloud · DevOps · DevSecOps · SRE&nbsp;&nbsp;|&nbsp;&nbsp;AWS · Azure · GCP
                  </p>
                </div>

                <div className="space-y-2">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={method.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {method.href ? (
                        <a
                          href={method.href}
                          className="flex items-center gap-4 p-3 bg-background/50 rounded-lg border border-border
                                     hover:border-primary/40 transition-all group"
                        >
                          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary
                                          group-hover:text-primary-foreground transition-colors">
                            {method.icon}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">{method.label}</p>
                            <p className="font-medium text-sm">{method.value}</p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-3 bg-background/50 rounded-lg border border-border">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            {method.icon}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">{method.label}</p>
                            <p className="font-medium text-sm">{method.value}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <div>
                      <p className="font-medium text-sm">Available now</p>
                      <p className="text-xs text-muted-foreground">
                        Open to full-time roles and project collaborations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Social links — icons prominent */}
          <AnimatedSection delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex flex-col items-center gap-3 p-5 bg-secondary/50 rounded-xl border border-border
                             hover:border-primary/40 transition-all group text-center"
                >
                  <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary
                                  group-hover:text-primary-foreground transition-colors">
                    {social.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{social.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{social.username}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={150}>
            <div className="text-center p-8 bg-secondary/50 rounded-xl border border-border">
              <h2 className="font-display text-lg font-bold mb-3">
                Got a role or project in mind?
              </h2>
              <p className="text-muted-foreground mb-6 text-sm max-w-md mx-auto">
                Send an email or connect on LinkedIn — I typically respond within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:ayobamieae@gmail.com"
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  <Mail size={15} />
                  Send an email
                </a>
                <a
                  href="https://www.linkedin.com/in/ayobami-edun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <Linkedin size={15} />
                  LinkedIn
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Contact;
