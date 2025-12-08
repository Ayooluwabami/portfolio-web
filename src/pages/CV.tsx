import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Award, Heart, MapPin, Mail, Phone, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const CV = () => {
  const experiences = [
    {
      title: "Lead Backend Developer",
      company: "Ebidhaa Services (DriveWell)",
      period: "Feb. 2025 – Present",
      location: "Remote",
      tech: "Node.js, Restana, TypeScript, MySQL, Redis, Docker, GCP, GitHub Actions, Paystack, Piggyvest",
      highlights: [
        "Designed and built backend infrastructure for a car hire and vehicle documentation platform across web, admin dashboard, and mobile app",
        "Engineered multi-service architecture with secure JWT + RBAC, Redis caching, and encrypted sessions",
        "Built multi-environment configuration with validation for 40+ critical variables, reducing deployment errors",
        "Integrated third-party providers (Paystack, Piggyvest, Flutterwave, Termii, WhatsApp API, Metamap, Firebase) for payments, messaging, and CRM",
        "Implemented CI/CD using GitHub Actions → Docker Buildx → Google Cloud GCE, reducing deployment time by 90%"
      ]
    },
    {
      title: "Lead Backend Developer",
      company: "African Institute for Artificial Intelligence (AI4AI)",
      period: "April 2025 – August 2025",
      location: "Remote",
      tech: "NestJS, TypeScript, PostgreSQL, Prisma, Docker, Railway, JWT, Redis, Swagger, Jest",
      highlights: [
        "Architected backend for SchoolHub Nigeria, a multi-tenant SaaS platform serving 50+ schools",
        "Built secure authentication with JWT access/refresh tokens, RBAC, bcrypt/argon2 hashing, and audit logging",
        "Configured multi-environment deployments with DB pooling, SSL, and automated seeding",
        "Optimised performance through Redis caching, query optimisation, and API throttling—deployed via Docker + Railway"
      ]
    },
    {
      title: "Support Staff (Diagnostics & Training)",
      company: "Auto Clinic, Ibadan",
      period: "July 2021 – Aug. 2024",
      location: "Nigeria",
      highlights: [
        "Conducted computerized vehicle diagnostics and maintenance for 25+ vehicles weekly",
        "Led summer workshops training over 50 teenagers on automotive diagnostics and repair fundamentals",
        "Authored weekly educational automotive articles for 'Gist with the Mechanic' radio segment on Splash FM"
      ]
    },
    {
      title: "Fleet Supervisor",
      company: "Metro Africa Express (MAX)",
      period: "Mar. 2021 – June 2021",
      location: "Nigeria",
      highlights: [
        "Managed refurbishment and documentation for 100+ motorcycles, cutting spare parts costs by 5%",
        "Oversaw GPS tracker installations and asset monitoring, improving operational efficiency"
      ]
    }
  ];

  const volunteerExperience = [
    {
      role: "Acting Assistant Head & Unit Lead",
      organization: "Global Harvest Teens Church",
      period: "July 2021 – Sep. 2024",
      highlights: [
        "Supervised and mentored 50+ teenagers in leadership and creativity",
        "Coordinated meetings, maintained records, and designed digital media initiatives"
      ]
    },
    {
      role: "Researcher & Volunteer",
      organization: "REES Africa",
      period: "Jan. 2022 – Sep. 2023",
      highlights: ["Coordinated literacy drives, donation campaigns, and environmental sustainability initiatives"]
    }
  ];

  const education = [
    { degree: "Introduction to Cybersecurity", school: "Cisco Networking Academy", year: "2025" },
    { degree: "Diploma in Backend Engineering", school: "AltSchool Africa", year: "2024" },
    { degree: "JavaScript Essentials", school: "Cisco & JS Institute", year: "2024" },
    { degree: "Diploma in Automotive Technology (Distinction)", school: "Auto Clinic Academy", year: "2024" },
    { degree: "Technical Modular Trade Certificate (Distinction)", school: "NABTEB", year: "2022" },
    { degree: "B.A. Religious Studies (Upper Second Class)", school: "University of Ibadan", year: "2019" }
  ];

  const awards = [
    "Dedicated Teen Teacher Award - Global Harvest Church (2021, 2023)",
    "Astute Volunteer (SDG Literacy Drive) - REES Africa & TNCI Africa (2022)"
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-label mb-4">Resume</p>
            <h1 className="text-headline mb-6">
              Curriculum <span className="text-gradient">Vitae</span>
            </h1>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                <span>Dudley, UK</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-primary" />
                <span>+44 7867 027428</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={14} className="text-primary" />
                <span>ayobamieae@gmail.com</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 text-sm">
              <a href="https://github.com/Ayooluwabami" target="_blank" rel="noopener noreferrer" 
                 className="text-primary hover:underline">GitHub</a>
              <span className="text-muted-foreground">|</span>
              <a href="https://www.linkedin.com/in/ayobami-ekundayo" target="_blank" rel="noopener noreferrer"
                 className="text-primary hover:underline">LinkedIn</a>
            </div>
          </div>
        </AnimatedSection>

        {/* Professional Summary */}
        <AnimatedSection delay={50}>
          <div className="max-w-4xl mx-auto mb-10">
            <div className="p-6 bg-secondary/50 rounded-xl border border-border">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="text-primary" size={20} />
                Professional Summary
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Backend Engineer specialising in Node.js, TypeScript, NestJS, Restana, Express.js, and scalable microservice architectures. 
                Experienced in shipping production-ready APIs, optimising SQL and NoSQL databases, integrating secure payment systems 
                (Paystack, Piggyvest, Stripe, Flutterwave), and building multi-tenant SaaS platforms. Skilled in Redis caching, 
                cloud services (Google Cloud Storage), CI/CD automation, authentication systems, and RESTful API design.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Core Skills */}
        <AnimatedSection delay={75}>
          <div className="max-w-4xl mx-auto mb-10">
            <h2 className="text-lg font-semibold mb-4">Core Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: "Languages & Frameworks", value: "JavaScript, TypeScript, Node.js, NestJS, Express.js, Restana, React" },
                { label: "Databases", value: "MongoDB, MySQL, PostgreSQL, Redis, Prisma, Knex" },
                { label: "Security & Payments", value: "JWT, OAuth2, bcrypt, Paystack, Stripe, Piggyvest, Flutterwave" },
                { label: "DevOps", value: "Git, GitHub Actions, Docker, Google Cloud, Railway, Vercel" }
              ].map((skill, index) => (
                <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <p className="text-sm font-medium text-primary mb-1">{skill.label}</p>
                  <p className="text-xs text-muted-foreground">{skill.value}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Professional Experience */}
        <AnimatedSection delay={100}>
          <div className="max-w-4xl mx-auto mb-10">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="text-primary" size={20} />
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative pl-5 border-l-2 border-primary/30 hover:border-primary transition-colors"
                >
                  <div className="absolute -left-[7px] top-0 w-3 h-3 bg-primary rounded-full" />
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-primary text-sm">{exp.title}</h3>
                        <p className="font-medium text-sm">{exp.company}</p>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                        <p>{exp.period}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>
                    {exp.tech && (
                      <p className="text-xs text-muted-foreground mb-2 font-mono">{exp.tech}</p>
                    )}
                    <ul className="space-y-1">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Volunteer & Education */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Volunteer */}
          <AnimatedSection delay={125}>
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Heart className="text-primary" size={20} />
                Volunteer Work
              </h2>
              <div className="space-y-3">
                {volunteerExperience.map((exp, index) => (
                  <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <h3 className="font-medium text-primary text-sm">{exp.role}</h3>
                    <p className="text-sm">{exp.organization}</p>
                    <p className="text-xs text-muted-foreground mb-2">{exp.period}</p>
                    <ul className="space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Education */}
          <AnimatedSection delay={150}>
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="text-primary" size={20} />
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu, index) => (
                  <div key={index} className="p-3 bg-secondary/50 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <p className="font-medium text-sm">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground">{edu.school} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Awards */}
        <AnimatedSection delay={175}>
          <div className="max-w-4xl mx-auto mb-10">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="text-primary" size={20} />
              Awards & Recognition
            </h2>
            <div className="flex flex-wrap gap-2">
              {awards.map((award, index) => (
                <span key={index} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs border border-primary/20">
                  {award}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Additional Info */}
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto mb-10">
            <div className="p-5 bg-secondary/50 rounded-xl border border-border">
              <h2 className="font-semibold mb-3 text-sm">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                <div>
                  <p><strong className="text-foreground">Legal Name:</strong> Ayobami Esther Edun</p>
                  <p><strong className="text-foreground">Previous Name:</strong> Ayobami Esther Ekundayo</p>
                </div>
                <div>
                  <p><strong className="text-foreground">Visa Status:</strong> Skilled Worker Dependent Visa</p>
                  <p><strong className="text-foreground">Work Authorization:</strong> Eligible to Work in the UK</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={225}>
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/contact" 
              className="btn-primary inline-flex items-center gap-2"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CV;
