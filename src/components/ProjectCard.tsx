import React from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  featured?: boolean;
  role?: string;
  impact?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  tech, 
  link, 
  github,
  featured = false,
  role,
  impact
}) => {
  return (
    <motion.article 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-muted/30 rounded-2xl p-6 md:p-8
                 border border-border hover:border-primary/30 transition-all duration-500
                 hover:shadow-elegant overflow-hidden`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {featured && (
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
            Featured
          </span>
        </div>
      )}
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors pr-4">
            {title}
          </h3>
          <div className="flex gap-2 shrink-0">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repository for ${title}`}
                className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Github size={18} />
              </a>
            )}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} project`}
              className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        {role && (
          <p className="text-sm text-primary font-medium mb-2">{role}</p>
        )}
        
        <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
          {description}
        </p>

        {impact && (
          <p className="text-sm text-accent font-medium mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
            {impact}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2">
          {tech.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-medium rounded-lg
                       border border-border group-hover:border-primary/20 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;