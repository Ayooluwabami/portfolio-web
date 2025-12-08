import { Briefcase, GraduationCap, Award, Heart } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const CVSection = () => {
  const experiences = [
    {
      title: "Lead Backend Developer",
      company: "Ebidhaa Services",
      period: "Feb. 2025 – Present",
      location: "Remote",
      highlights: [
        "Building backend infrastructure for car hire and documentation service platform",
        "Integrated Paystack and Piggyvest APIs achieving 99.9% transaction accuracy",
        "Automated order tracking with Google Cloud Storage",
        "Enhanced user management cutting load time by 20%"
      ]
    },
    {
      title: "Lead Backend Developer",
      company: "African Institute for Artificial Intelligence (AI4AI)",
      period: "April 2025 – August 2025",
      location: "Remote",
      highlights: [
        "Architected SchoolHub Nigeria serving 50+ educational institutions",
        "Developed modular microservices improving scalability by 30%",
        "Implemented secure RBAC reducing unauthorized access by 40%",
        "Optimized database queries enhancing API response times by 25%"
      ]
    },
    {
      title: "Support Staff (Diagnostics & Training)",
      company: "Auto Clinic, Ibadan",
      period: "July 2021 – Aug. 2024",
      location: "Nigeria",
      highlights: [
        "Conducted diagnostics for 25+ vehicles weekly",
        "Led workshops training 50+ teenagers in automotive fundamentals"
      ]
    }
  ];

  const education = [
    {
      degree: "Diploma in Backend Engineering",
      school: "AltSchool Africa, School of Engineering",
      year: "2024"
    },
    {
      degree: "Bachelor of Arts, Religious Studies",
      school: "University of Ibadan",
      year: "2019",
      grade: "Upper Second Class Honours"
    },
    {
      degree: "Diploma in Automotive Technology",
      school: "Auto Clinic Academy",
      year: "2024",
      grade: "Distinction"
    }
  ];

  const certifications = [
    "Introduction to Cybersecurity - Cisco Networking Academy (2025)",
    "JavaScript Essentials - Cisco & JS Institute (2024)",
    "Technical Modular Trade Certification - NABTEB (2022, Distinction)"
  ];

  const awards = [
    "Dedicated Teen Teacher Award - Global Harvest Church (2021, 2023)",
    "Astute Volunteer (SDG Literacy Drive) - REES Africa & TNCI Africa (2022)"
  ];

  return (
    <section id="cv" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            A comprehensive overview of my career journey, education, and achievements
          </p>
        </AnimatedSection>

        {/* Professional Summary */}
        <AnimatedSection delay={100}>
          <div className="max-w-4xl mx-auto mb-16 p-8 bg-background rounded-2xl shadow-elegant">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Briefcase className="text-primary" />
              Professional Summary
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Results-oriented Backend Engineer with a strong foundation in JavaScript, TypeScript, Node.js, 
              Restana, NestJS, Express.js, and RESTful API development. Skilled in designing scalable architectures, 
              optimising database performance, and integrating secure payment and authentication systems. 
              Experienced in MongoDB, MySQL, and PostgreSQL, with a proven ability to deliver production-ready APIs.
            </p>
          </div>
        </AnimatedSection>

        {/* Experience Timeline */}
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Briefcase className="text-primary" />
              Work Experience
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className="relative pl-8 pb-8 border-l-2 border-primary/30 last:border-l-0 last:pb-0
                           hover:border-primary/60 transition-colors"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="bg-background p-6 rounded-xl shadow-sm hover:shadow-elegant transition-shadow">
                    <h4 className="text-xl font-bold mb-1">{exp.title}</h4>
                    <p className="text-primary font-semibold mb-1">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {exp.period} | {exp.location}
                    </p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection delay={300}>
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <GraduationCap className="text-accent" />
              Education
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="bg-background p-6 rounded-xl shadow-sm hover:shadow-elegant transition-all
                           hover:-translate-y-1"
                >
                  <h4 className="font-bold mb-2">{edu.degree}</h4>
                  <p className="text-primary text-sm font-semibold mb-1">{edu.school}</p>
                  <p className="text-muted-foreground text-sm">
                    {edu.year} {edu.grade && `• ${edu.grade}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Certifications & Awards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <AnimatedSection delay={400}>
            <div className="bg-background p-6 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="text-secondary" />
                Certifications
              </h3>
              <ul className="space-y-3">
                {certifications.map((cert, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={500}>
            <div className="bg-background p-6 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Heart className="text-accent" />
                Awards & Recognition
              </h3>
              <ul className="space-y-3">
                {awards.map((award, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-1">★</span>
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        {/* Download CV Button */}
        <AnimatedSection delay={600}>
          <div className="text-center mt-12">
            <a
              href="mailto:ayobamieae@gmail.com?subject=CV Request"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground 
                       rounded-full font-semibold hover:shadow-hover transition-all hover:scale-105"
            >
              Request Full CV
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CVSection;
