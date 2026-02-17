import { Link } from 'react-router-dom';
import { Code, Database, Cloud, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import photoshoot from '@/assets/photoshoot.jpg';
import working from '@/assets/working.jpg';

const About = () => {
  const expertise = [
    {
      icon: <Code size={22} />,
      title: "Backend Development",
      description: "Building robust, scalable systems with Node.js, TypeScript, NestJS, Express.js, and Restana."
    },
    {
      icon: <Database size={22} />,
      title: "Database Design",
      description: "Expert in MongoDB, MySQL, and PostgreSQL. Optimizing queries and designing efficient schemas."
    },
    {
      icon: <Cloud size={22} />,
      title: "Cloud & DevOps",
      description: "Deploying on GCP, Docker, Railway with CI/CD pipelines using GitHub Actions."
    },
    {
      icon: <Shield size={22} />,
      title: "Security & Payments",
      description: "JWT, OAuth2, bcrypt hashing. Paystack, Stripe, Piggyvest, Flutterwave integrations."
    },
    {
      icon: <Zap size={22} />,
      title: "API Architecture",
      description: "RESTful API design with OpenAPI/Swagger documentation and comprehensive testing."
    },
    {
      icon: <Users size={22} />,
      title: "Leadership",
      description: "Agile delivery, code reviews, mentoring developers, and stakeholder communication."
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-label mb-4">About Me</p>
            <h1 className="text-headline mb-6">
              The Story Behind <span className="text-gradient">the Code</span>
            </h1>
            <p className="text-subheadline">
              A passionate engineer with a unique journey from automotive diagnostics to backend development.
            </p>
          </div>
        </AnimatedSection>

        {/* Main Profile Section */}
        <AnimatedSection delay={50}>
          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Images - Circular positioning */}
              <div className="relative flex justify-center">
                <div className="relative">
                  {/* Main circular image */}
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-border shadow-card">
                    <img 
                      src={photoshoot} 
                      alt="Ayobami Edun" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I'm a <span className="text-foreground font-medium">results-oriented Backend Engineer</span> with 
                    a strong foundation in JavaScript, TypeScript, and modern backend frameworks including Node.js, 
                    Restana, NestJS, and Express.js.
                  </p>
                  <p>
                    My passion lies in building <span className="text-foreground font-medium">secure, scalable, and 
                    user-centric applications</span> with robust database management using MongoDB, MySQL, and PostgreSQL.
                  </p>
                  <p>
                    Currently based in <span className="text-foreground font-medium">Dudley, West Midlands, UK</span>, 
                    I work remotely with teams across the globe, bringing ideas to life through clean, efficient code 
                    and thoughtful architecture.
                  </p>
                  <p>
                    What drives me is the challenge of solving complex problems and seeing the direct impact of my work. 
                    Every API endpoint I build, every database I optimize, represents a real improvement in how people 
                    interact with technology.
                  </p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <p className="text-xl font-bold text-primary">99.9%</p>
                    <p className="text-xs text-muted-foreground">API Uptime</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <p className="text-xl font-bold text-primary">50+</p>
                    <p className="text-xs text-muted-foreground">Mentees Trained</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Expertise Grid */}
        <AnimatedSection delay={100}>
          <div className="max-w-5xl mx-auto mb-16">
            <div className="text-center mb-10">
              <p className="text-label mb-3">What I Do</p>
              <h2 className="text-section-title">
                Areas of <span className="text-gradient">Expertise</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {expertise.map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -2 }}
                  className="group p-5 bg-secondary/50 rounded-xl border border-border hover:border-primary/40 
                           transition-all duration-200"
                >
                  <div className="inline-flex p-2.5 bg-primary/10 rounded-lg mb-3 text-primary 
                                group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Beyond the Code */}
        <AnimatedSection delay={150}>
          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5 order-2 lg:order-1">
                <p className="text-label">Beyond the Code</p>
                <h2 className="text-section-title">A Unique Background</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I believe in continuous learning and giving back to the community. I've mentored over{' '}
                    <span className="text-foreground font-medium">50 teenagers</span> in various technical and 
                    leadership roles.
                  </p>
                  <p>
                    Beyond software development, I have a unique background in{' '}
                    <span className="text-foreground font-medium">automotive technology</span>, which taught me 
                    the importance of precision, diagnostics, and problem-solving—skills that translate perfectly 
                    into backend engineering.
                  </p>
                  <p>
                    I even authored weekly educational articles for the "Gist with the Mechanic" radio segment on 
                    Splash FM, combining my passion for teaching and technology.
                  </p>
                </div>
                <Link 
                  to="/cv" 
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  View my full experience
                  <ArrowRight size={18} />
                </Link>
              </div>
              
              <div className="relative order-1 lg:order-2 flex justify-center">
                {/* Circular working image */}
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-border shadow-card">
                  <img 
                    src={working} 
                    alt="Ayobami working" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-secondary/50 rounded-xl p-8 border border-border">
              <div className="text-center mb-8">
                <p className="text-label mb-3">Education</p>
                <h2 className="text-xl font-semibold">Credentials & Certifications</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { title: "Cybersecurity Certification", org: "Cisco Networking Academy", year: "2025" },
                  { title: "Diploma in Backend Engineering", org: "AltSchool Africa", year: "2024" },
                  { title: "JavaScript Essentials", org: "Cisco & JS Institute", year: "2024" },
                  { title: "B.A. Religious Studies (2:1)", org: "University of Ibadan", year: "2019" }
                ].map((edu, index) => (
                  <div key={index} className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <p className="font-medium mb-1">{edu.title}</p>
                    <p className="text-sm text-muted-foreground">{edu.org} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default About;