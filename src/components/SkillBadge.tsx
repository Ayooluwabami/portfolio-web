import React from 'react';

interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
  category?: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, icon, category }) => {
  return (
    <div
      className="group relative p-5 rounded-xl bg-background border border-border
               hover:border-primary/50 transition-all duration-300 hover:-translate-y-1
               hover:shadow-elegant"
      aria-label={`${name}${category ? `, ${category}` : ''}`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="text-2xl text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
        <div>
          <p className="font-semibold text-sm">{name}</p>
          {category && (
            <p className="text-xs text-muted-foreground">{category}</p>
          )}
        </div>
      </div>
      
      {/* Hover effect gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
    </div>
  );
};

export default SkillBadge;
