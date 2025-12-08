import { useState } from 'react';
import { Github, ArrowUpRight, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  featured?: boolean;
  category: string;
  role?: string;
  impact?: string;
  challenges?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.article 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group relative bg-secondary/50 rounded-xl p-6 md:p-8
                 border border-border hover:border-primary/40 transition-all duration-200
                 hover:shadow-elegant`}
    >
      {project.featured && (
        <div className="absolute top-4 right-4">
          <span className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Featured
          </span>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Folder size={20} />
        </div>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <Github size={18} />
            </a>
          )}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} project`}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>

      {project.role && (
        <p className="text-sm text-primary font-medium mb-2">{project.role}</p>
      )}
      
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
        {project.description}
      </p>

      {project.impact && (
        <div className="mb-4 p-3 bg-background/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Impact</p>
          <p className="text-sm text-foreground font-medium">{project.impact}</p>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {project.tech.slice(0, 5).map((item, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md"
          >
            {item}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="px-2.5 py-1 text-xs font-medium text-muted-foreground">
            +{project.tech.length - 5} more
          </span>
        )}
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects: Project[] = [
    {
      title: "DriveWell Backend",
      description: "Full backend ecosystem for a nationwide vehicle hire, towing, and documentation platform. Designed multi-service architecture with secure JWT + RBAC, Redis caching, and encrypted sessions.",
      tech: ["Node.js", "Restana", "TypeScript", "MySQL", "Redis", "Docker", "GCP", "Paystack", "Piggyvest"],
      link: "https://www.drivewellapp.com/",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "backend",
      role: "Lead Backend Developer",
      impact: "99.9% transaction accuracy • 90% faster deployments via CI/CD • 20% reduced load times"
    },
    {
      title: "SchoolHub Nigeria",
      description: "Multi-tenant EdTech SaaS platform backend serving 50+ schools. Built tenant isolation, RBAC, audit trails, refresh token rotation, and Redis-powered caching with NestJS microservices.",
      tech: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Docker", "Railway", "JWT", "Jest"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "backend",
      role: "Lead Backend Developer at AI4AI",
      impact: "30% performance improvement • 40% fewer security incidents • 25% faster API responses"
    },
    {
      title: "Digital Wallet & Escrow API",
      description: "Production-grade wallet system with double-entry ledger, webhook verification, dispute resolution, and multi-gateway support for secure financial transactions.",
      tech: ["Node.js", "Restana", "Knex", "MySQL", "Paystack", "Flutterwave"],
      link: "https://github.com/Ayooluwabami",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "backend",
      role: "Backend Engineer",
      impact: "Handled 10k+ transactions • Zero double-spending incidents"
    },
    {
      title: "JOTEM Agro Allied",
      description: "Company frontend with React + Vite + Tailwind and complete Google Workspace setup including DNS security (SPF, DKIM, DMARC, MTA-STS) for enterprise email deliverability.",
      tech: ["React", "Vite", "Tailwind", "Google Workspace", "DNS Management"],
      link: "https://www.jotemagro.com/",
      github: "https://github.com/Ayooluwabami",
      featured: true,
      category: "fullstack",
      role: "Frontend Developer & IT Admin",
      impact: "Improved email deliverability by 95%"
    },
    {
      title: "CarCare Auto Services API",
      description: "RESTful API for vehicle hire price comparison across vendors. Features vendor onboarding, availability logic, commission tracking, and service booking.",
      tech: ["Express.js", "MongoDB", "Redis", "Paystack", "JWT"],
      link: "https://github.com/Ayooluwabami/carcare",
      github: "https://github.com/Ayooluwabami/carcare",
      category: "backend",
      role: "Backend Developer"
    },
    {
      title: "AnythingCar Platform",
      description: "GPS-based car hire platform with armed security escort options and marketplace for cars and spare parts. Mobile app integration with real-time tracking.",
      tech: ["Express.js", "TypeScript", "MongoDB", "GPS API"],
      link: "https://github.com/Ayooluwabami/anythingcar",
      github: "https://github.com/Ayooluwabami/anythingcar",
      category: "backend"
    },
    {
      title: "Scissor URL Shortener",
      description: "URL shortening service with custom URLs, QR code generation, click tracking, and geographic analytics dashboard.",
      tech: ["Node.js", "Express.js", "MongoDB", "QR Generation"],
      link: "https://github.com/Ayooluwabami/scissor-backend",
      github: "https://github.com/Ayooluwabami/scissor-backend",
      category: "backend"
    },
    {
      title: "Restaurant Chatbot",
      description: "Intelligent chatbot for discovering nearby restaurants with NLP-powered search, ratings, and location-based recommendations.",
      tech: ["React", "Node.js", "MySQL", "NLP"],
      link: "https://github.com/Ayooluwabami/restaurant_chatbot",
      github: "https://github.com/Ayooluwabami/restaurant_chatbot",
      category: "fullstack"
    },
    {
      title: "Blogging API",
      description: "RESTful blog management service with user authentication, CRUD operations, and comprehensive Swagger documentation.",
      tech: ["Node.js", "Express.js", "MongoDB", "Swagger"],
      link: "https://github.com/Ayooluwabami/Blogging-API",
      github: "https://github.com/Ayooluwabami/Blogging-API",
      category: "backend"
    },
    {
      title: "Library Management System",
      description: "Comprehensive library system with book borrowing, return tracking, fine calculation, and session management.",
      tech: ["Express.js", "MongoDB", "Mongoose", "JWT"],
      link: "https://github.com/Ayooluwabami/library-management-system",
      github: "https://github.com/Ayooluwabami/library-management-system",
      category: "backend"
    }
  ];

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'featured', label: 'Featured' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' }
  ];

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    return project.category === filter;
  });

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-label mb-4">Portfolio</p>
            <h1 className="text-headline mb-6">
              Featured <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-subheadline">
              Real-world projects showcasing expertise in backend development, API architecture, 
              and scalable system design. Each project includes context, my role, technologies used, and measurable impact.
            </p>
          </div>
        </AnimatedSection>

        {/* Filter */}
        <AnimatedSection delay={50}>
          <div className="max-w-5xl mx-auto mb-10">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setFilter(category.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === category.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground border border-border'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.title} delay={index * 30}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>

        {/* GitHub CTA */}
        <AnimatedSection delay={200}>
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <div className="p-8 bg-secondary/50 rounded-xl border border-border">
              <h2 className="text-xl font-semibold mb-3">Want to See More?</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Check out my GitHub profile for more projects, contributions, and open-source work.
              </p>
              <a
                href="https://github.com/Ayooluwabami"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Github size={18} />
                View GitHub Profile
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Projects;
