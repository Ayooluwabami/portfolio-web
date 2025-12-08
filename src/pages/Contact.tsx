import { Mail, MapPin, Phone, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const Contact = () => {
  const contactMethods = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "ayobamieae@gmail.com",
      href: "mailto:ayobamieae@gmail.com"
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "+44 7867 027428",
      href: "tel:+447867027428"
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Dudley, West Midlands, UK",
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={20} />,
      label: "GitHub",
      href: "https://github.com/Ayooluwabami",
      username: "@Ayooluwabami"
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ayobami-ekundayo",
      username: "ayobami-ekundayo"
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-label mb-4">Contact</p>
            <h1 className="text-headline mb-6">
              Let's <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-subheadline">
              I'm always open to discussing new projects, creative ideas, or opportunities 
              to be part of your vision.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {/* Main Contact Card */}
          <AnimatedSection delay={50}>
            <div className="bg-secondary/50 rounded-xl border border-border overflow-hidden mb-6">
              {/* Contact Info Section */}
              <div className="p-6 lg:p-8 space-y-5">
                <div>
                  <h2 className="text-xl font-bold mb-1">Ayobami Edun</h2>
                  <p className="text-muted-foreground text-sm">Backend Engineer • API Architect</p>
                </div>

                  {/* Contact Methods */}
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

                  {/* Availability */}
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      <div>
                        <p className="font-medium text-sm">Currently Available</p>
                        <p className="text-xs text-muted-foreground">
                          Open to full-time roles and project collaborations
                        </p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Social Links */}
          <AnimatedSection delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border 
                           hover:border-primary/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary 
                                  group-hover:text-primary-foreground transition-colors">
                      {social.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{social.label}</p>
                      <p className="text-xs text-muted-foreground">{social.username}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={150}>
            <div className="text-center p-8 bg-secondary/50 rounded-xl border border-border">
              <h2 className="text-xl font-semibold mb-3">
                Ready to Build Something Great?
              </h2>
              <p className="text-muted-foreground mb-6 text-sm max-w-md mx-auto">
                Whether you have a project in mind or just want to chat about technology, 
                I'd love to hear from you.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:ayobamieae@gmail.com"
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  <Mail size={16} />
                  Send an Email
                </a>
                <a
                  href="https://www.linkedin.com/in/ayobami-ekundayo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <Linkedin size={16} />
                  Connect on LinkedIn
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
