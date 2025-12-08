import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-9 h-9 text-lg',
    md: 'w-11 h-11 text-xl',
    lg: 'w-14 h-14 text-2xl'
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-xl flex items-center justify-center font-bold 
                  bg-primary text-primary-foreground 
                  shadow-elegant transition-all duration-300 
                  hover:shadow-hover hover:scale-105 ${className}`}
      aria-label="Ayobami Edun Logo"
    >
      A
    </div>
  );
};

export default Logo;