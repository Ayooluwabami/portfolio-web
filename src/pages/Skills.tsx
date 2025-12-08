import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      skills: ["JavaScript", "TypeScript", "Node.js", "Express.js", "NestJS", "Restana", "React", "Vite", "Tailwind"]
    },
    {
      title: "Databases & Caching",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Prisma ORM", "Knex"]
    },
    {
      title: "Cloud & DevOps",
      skills: ["Google Cloud Platform", "GitHub Actions", "Docker", "Railway", "Render", "Vercel", "Heroku"]
    },
    {
      title: "Security & Payments",
      skills: ["JWT", "OAuth2", "bcrypt/argon2", "Rate Limiting", "Paystack", "Stripe", "Piggyvest", "Flutterwave"]
    },
    {
      title: "API & Testing",
      skills: ["REST API Design", "OpenAPI/Swagger", "Postman", "Insomnia", "Jest", "Supertest", "Webhooks"]
    },
    {
      title: "Tools & Methods",
      skills: ["Git", "GitHub", "Agile/Scrum", "CI/CD", "MVC Architecture", "Microservices", "Bash/CLI"]
    }
  ];

  const softSkills = [
    "Leadership", "Team Collaboration", "Problem-Solving", "Critical Thinking", 
    "Communication", "Time Management", "Agile Delivery", "Mentoring", "Stakeholder Communication"
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-label mb-4">Expertise</p>
            <h1 className="text-headline mb-6">
              Technical <span className="text-gradient">Skills</span>
            </h1>
            <p className="text-subheadline">
              A comprehensive toolkit for building robust, scalable backend systems 
              and delivering production-ready applications.
            </p>
          </div>
        </AnimatedSection>

        {/* Skills Grid */}
        <div className="max-w-5xl mx-auto space-y-6 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <AnimatedSection key={category.title} delay={categoryIndex * 50}>
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <h2 className="text-lg font-semibold mb-4">{category.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.03 }}
                      whileHover={{ scale: 1.02 }}
                      className="px-3 py-1.5 bg-background text-foreground rounded-md text-sm font-medium
                               border border-border hover:border-primary/40 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Development Approach */}
        <AnimatedSection delay={300}>
          <div className="max-w-4xl mx-auto mb-16">
            <div className="p-8 bg-secondary/50 rounded-xl border border-border">
              <h2 className="text-xl font-semibold mb-8 text-center">Development Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Agile", desc: "Iterative development with continuous feedback and adaptation" },
                  { title: "CI/CD", desc: "Automated testing and deployment pipelines for reliability" },
                  { title: "Clean Code", desc: "MVC architecture and separation of concerns for maintainability" }
                ].map((approach, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{approach.title}</div>
                    <p className="text-sm text-muted-foreground">{approach.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Soft Skills */}
        <AnimatedSection delay={350}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-label mb-3">Beyond Technical</p>
              <h2 className="text-xl font-semibold">
                Soft <span className="text-gradient">Skills</span>
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {softSkills.map((skill, index) => (
                <motion.span 
                  key={skill}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.02 }}
                  className="px-4 py-2 bg-secondary/50 rounded-lg border border-border hover:border-primary/40 
                           text-sm font-medium transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Skills;
