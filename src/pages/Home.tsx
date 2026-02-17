import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import CodeSnippet from '../components/CodeSnippet';
import photoshoot from '@/assets/photoshoot.jpg';

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const roles = ['Backend Engineer', 'API Architect', 'System Designer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects - Subtle and Professional */}
        <div className="absolute inset-0">
          {/* Soft gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-float-delayed" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-dots opacity-30" />
        </div>

        <div className="container mx-auto px-6 z-10 pt-20">
          <div className="max-w-6xl mx-auto">
            {/* Main Hero Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Content - Main Focus */}
              <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full text-sm font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Available for opportunities
                  </span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-headline mb-4"
                >
                  Hi, I'm{' '}
                  <span className="text-gradient">Ayobami</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="mb-5"
                >
                  <p className="text-xl sm:text-2xl font-medium h-8">
                    <span className="text-primary">{displayText}</span>
                    <span className="animate-pulse-slow">|</span>
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-subheadline mb-8 max-w-lg mx-auto lg:mx-0"
                >
                  I build scalable, high-performance backend systems using{' '}
                  <span className="text-foreground font-medium">Node.js</span>,{' '}
                  <span className="text-foreground font-medium">TypeScript</span>,{' '}
                  <span className="text-foreground font-medium">NestJS</span>,{' '}
                  <span className="text-foreground font-medium">Restana</span>,{' '}
                  and cloud platforms. Based in the UK.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
                >
                  <Link to="/projects" className="btn-primary flex items-center gap-2">
                    View Projects
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/cv" className="btn-secondary flex items-center gap-2">
                    <Download size={18} />
                    Download CV
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex justify-center lg:justify-start gap-3"
                >
                  {[
                    { href: "https://github.com/Ayooluwabami", icon: <Github size={20} />, label: "GitHub" },
                    { href: "https://www.linkedin.com/in/ayobami-edun", icon: <Linkedin size={20} />, label: "LinkedIn" },
                    { href: "mailto:ayobamieae@gmail.com", icon: <Mail size={20} />, label: "Email" }
                  ].map((social) => (
                    <a 
                      key={social.label}
                      href={social.href} 
                      target={social.href.startsWith('http') ? "_blank" : undefined}
                      rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="p-3 rounded-lg bg-secondary border border-border hover:border-primary/50 
                               hover:text-primary transition-all duration-200"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Right - Profile Image & Code Snippet */}
              <div className="lg:col-span-5 relative flex flex-col items-center gap-6 order-1 lg:order-2">
                {/* Profile Image */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative">
                    {/* Subtle glow behind image */}
                    <div className="absolute -inset-3 bg-primary/10 rounded-2xl blur-xl" />
                    
                    {/* Main image - Adjusted size */}
                    <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-xl overflow-hidden border border-border shadow-card">
                      <img 
                        src={photoshoot} 
                        alt="Ayobami Edun - Backend Engineer" 
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                    </div>
                  </div>
                </motion.div>

                {/* Code Snippet - Desktop only */}
                <div className="hidden lg:block">
                  <CodeSnippet />
                </div>
              </div>
            </div>

            {/* Code Snippet - Mobile (below hero content) */}
            <div className="lg:hidden mt-10 flex justify-center order-3">
              <CodeSnippet />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <p className="text-label mb-4">About Me</p>
              <h2 className="text-section-title mb-6">
                Results-oriented Backend Engineer building{' '}
                <span className="text-gradient">systems that scale</span>
              </h2>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
              <p className="text-subheadline mb-10">
                With expertise in JavaScript, TypeScript, and modern frameworks like NestJS, Express.js, and Restana, 
                I specialize in designing scalable architectures, optimizing database performance, and integrating 
                secure payment and authentication systems. My work has achieved{' '}
                <span className="text-foreground font-semibold">99.9% transaction accuracy</span> and{' '}
                <span className="text-foreground font-semibold">25% faster response times</span>.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "99.9%", label: "API Uptime" },
                  { value: "30%", label: "Performance Gain" },
                  { value: "40%", label: "Security Improved" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-5 bg-background rounded-lg border border-border">
                    <p className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="mt-10 flex justify-center">
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all link-underline"
                >
                  Learn more about my journey
                  <ArrowRight size={18} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-section-title mb-6">
                Let's Build Something <span className="text-gradient">Amazing</span> Together
              </h2>
              <p className="text-subheadline mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary flex items-center gap-2">
                  Start a Conversation
                  <ArrowRight size={18} />
                </Link>
                <a 
                  href="https://www.linkedin.com/in/ayobami-edun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <Linkedin size={18} />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;