import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Award, Heart, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const CV = () => {
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
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground mb-5">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                <span>England, United Kingdom</span>
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

            <div className="flex justify-center gap-5 text-sm">
              <a
                href="https://github.com/Ayooluwabami"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
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
                Software Engineer with 3+ years of experience building production-ready applications, specialising in backend 
                engineering with Node.js, TypeScript, NestJS, and Express, while also delivering front-end interfaces using 
                React, Vite, and Tailwind. Proven ability to design scalable microservices, integrate complex payment systems, 
                optimise SQL/NoSQL databases, and deploy cloud-based infrastructure. Delivered multi-tenant SaaS platforms 
                serving 50+ organisations and reduced deployment time by 90% through CI/CD automation. Collaborative team 
                contributor experienced in agile delivery, cloud deployments, and full SDLC ownership.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Core Technical Skills */}
        <AnimatedSection delay={75}>
          <div className="max-w-4xl mx-auto mb-10">
            <h2 className="text-lg font-semibold mb-4">Core Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "Languages & Frameworks",
                  value: "JavaScript, TypeScript, Node.js, NestJS, Express.js, Restana, React, Vite, Tailwind CSS",
                },
                {
                  label: "Backend & Systems",
                  value: "Microservices, MVC architecture, Event-driven workflows, Queue processing, Scheduled jobs, Webhooks",
                },
                {
                  label: "Databases",
                  value: "MongoDB, MySQL, PostgreSQL, Prisma ORM, Knex.js, Redis (caching, session management)",
                },
                {
                  label: "API Development",
                  value: "REST APIs, OpenAPI/Swagger, Postman, JWT, OAuth2, RBAC, API versioning, pagination, error handling",
                },
                {
                  label: "DevOps & Tools",
                  value: "Git, GitHub Actions, Docker, Bash/CLI, Render, Vercel, Heroku, Google Cloud Storage",
                },
                {
                  label: "Security & Payments",
                  value:
                    "JWT, OAuth2, bcrypt/argon2 hashing, rate limiting, API key management, Stripe, Flutterwave, Paystack, Piggyvest Business",
                },
                {
                  label: "Testing & Logging",
                  value: "Jest, Supertest (Unit & Integration), Pino, Papertrail",
                },
                {
                  label: "Methodologies",
                  value: "Agile/Scrum, CI/CD pipelines, Code reviews, SDLC, Documentation-first development",
                },
              ].map((skill, index) => (
                <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <p className="text-sm font-medium text-primary mb-1.5">{skill.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{skill.value}</p>
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
            <div className="space-y-6">
              {/* DriveWell */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative pl-5 border-l-2 border-primary/30"
              >
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-primary rounded-full" />
                <div className="p-5 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-primary">Backend Engineer</h3>
                      <p className="font-medium">Ebidhaa Services (DriveWell Platform)</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                      <p>Feb 2025 – Present</p>
                      <p>Remote</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">
                    Node.js, Restana, TypeScript, MySQL, Knex.js, Redis, Paystack, Flutterwave, Piggyvest, Google Cloud Storage, Docker, GitHub Actions
                  </p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-none">
                    <li>Engineered backend for multi-service platform (vehicle hire, towing, documentation, licensing)</li>
                    <li>Integrated 10+ third-party services: payments, messaging (Termii, WhatsApp, Mailchimp), verification (Metamap), maps</li>
                    <li>Designed JWT + bcrypt authentication, API key management, Redis sessions</li>
                    <li>Built multi-env config (40+ validated variables) → improved stability</li>
                    <li>Implemented CI/CD (GitHub Actions + Docker Buildx + GCE) → 90% faster deployments</li>
                    <li>Added centralised logging (Papertrail) and SQL query optimisation</li>
                  </ul>
                </div>
              </motion.div>

              {/* Freelance Software Engineer */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="relative pl-5 border-l-2 border-primary/30"
              >
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-primary rounded-full" />
                <div className="p-5 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-primary">Software Engineer – Freelance</h3>
                      <p className="font-medium">Remote</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                      <p>Jan 2023 – Present</p>
                      <p>Remote</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">
                    Node.js, NestJS, Express.js, Restana, React, Vite, Tailwind, MongoDB, MySQL, Redis, Paystack
                  </p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-none">
                    <li>Delivered backend and frontend solutions for startups and SMEs, specialising in payment systems, REST APIs, and production-ready web applications.</li>
                    <li>Built and maintained RESTful APIs for car hire, marketplace, and service-booking platforms using Node.js, NestJS, ExpressJS, Restana, MongoDB, MySQL, and Redis.</li>
                    <li>Implemented secure digital wallet and escrow systems with double-entry ledger logic, webhook verification, dispute handling, and multi-gateway payment integrations (Paystack).</li>
                    <li>Developed frontend applications with React, Vite, and Tailwind, improving performance, usability, and deployment speed.</li>
                    <li>Configured Google Workspace and DNS security (SPF, DKIM, DMARC, MTA-STS), significantly improving email deliverability and reliability.</li>
                    <li>Delivered end-to-end features independently, from requirements and system design to deployment and documentation.</li>
                    <li>Contributed to Owiwi, a multi-category service marketplace and business automation platform, building backend APIs and platform features enabling service discovery, bookings, and provider workflow automation.</li>
                  </ul>
                </div>
              </motion.div>

              {/* AI4AI Internship */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative pl-5 border-l-2 border-primary/30"
              >
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-primary rounded-full" />
                <div className="p-5 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-primary">Backend Engineer (Internship)</h3>
                      <p className="font-medium">African Institute for Artificial Intelligence (AI4AI)</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                      <p>April 2025 – August 2025</p>
                      <p>Remote</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">
                    NestJS, PostgreSQL, Prisma, Redis, JWT, RBAC
                  </p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-none">
                    <li>Contributed to multi-tenant SaaS backend (SchoolHub) serving 50+ schools</li>
                    <li>Designed modular services, tenant-aware RBAC, data validation</li>
                    <li>Implemented JWT auth (access/refresh), bcrypt/argon2, audit logging</li>
                    <li>Configured env-specific deployments, DB pooling, SSL, auto-migrations, health checks</li>
                    <li>Improved performance with Redis caching, throttling & query optimisation</li>
                  </ul>
                </div>
              </motion.div>

              {/* Auto Clinic */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative pl-5 border-l-2 border-primary/30"
              >
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-primary rounded-full" />
                <div className="p-5 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-primary">Support Staff (Diagnostics & Training)</h3>
                      <p className="font-medium">Auto Clinic</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                      <p>July 2021 – Aug 2024</p>
                      <p>Nigeria</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-none">
                    <li>Performed diagnostics and maintenance for 25+ vehicles weekly</li>
                    <li>Trained 50+ teenagers on automotive diagnostics</li>
                    <li>Produced weekly automotive educational content for Splash FM radio</li>
                  </ul>
                </div>
              </motion.div>

              {/* MAX */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative pl-5 border-l-2 border-primary/30"
              >
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-primary rounded-full" />
                <div className="p-5 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-primary">Fleet Supervisor</h3>
                      <p className="font-medium">Metro Africa Express (MAX)</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right">
                      <p>Mar 2021 – June 2021</p>
                      <p>Nigeria</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-none">
                    <li>Managed refurbishment & documentation for 100+ motorcycles</li>
                    <li>Oversaw GPS installation and asset monitoring</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Education & Volunteer – side by side on large screens */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Education */}
          <AnimatedSection delay={125}>
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="text-primary" size={20} />
                Education & Certifications
              </h2>
              <div className="space-y-3">
                {[
                  { degree: "Introduction to Cybersecurity Certification", inst: "Cisco Networking Academy", year: "2025" },
                  { degree: "Diploma in Backend Engineering", inst: "AltSchool Africa, School of Engineering", year: "2024" },
                  { degree: "JavaScript Essentials", inst: "Cisco & JS Institute", year: "2024" },
                  { degree: "Diploma in Automotive Technology (Distinction)", inst: "Auto Clinic Academy", year: "2024" },
                  { degree: "Technical Modular Trade Certification (Distinction)", inst: "National Business & Technical Examination Board", year: "2022" },
                  { degree: "Bachelor of Arts, Religious Studies (Upper Second Class Honours)", inst: "University of Ibadan, Nigeria", year: "2019" },
                ].map((edu, i) => (
                  <div key={i} className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <p className="font-medium text-sm">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground">{edu.inst} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Volunteer / Leadership */}
          <AnimatedSection delay={150}>
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Heart className="text-primary" size={20} />
                Leadership & Volunteer
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium text-sm text-primary">Acting Assistant Head & Technical Unit Lead</h3>
                  <p className="text-sm">Global Harvest Teens Church</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium text-sm text-primary">Researcher & Volunteer</h3>
                  <p className="text-sm">REES Africa</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium text-sm text-primary">Assistant General Secretary</h3>
                  <p className="text-sm">NCCF</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium text-sm text-primary">Vice President</h3>
                  <p className="text-sm">NIFES</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Awards */}
        <AnimatedSection delay={175}>
          <div className="max-w-4xl mx-auto mb-10">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="text-primary" size={20} />
              Awards
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Dedicated Teen Teacher Award - Global Harvest Church (2021, 2023)",
                "Astute Volunteer (SDG Literacy Drive) - REES Africa & TNCI Africa (2022)",
              ].map((award, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-primary/10 text-primary text-xs rounded-lg border border-primary/20"
                >
                  {award}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3"
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