import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md';
}

const ThemeToggle = ({ isDark, onToggle, size = 'md' }: ThemeToggleProps) => {
  const isSmall = size === 'sm';

  return (
    <button
      onClick={onToggle}
      className={`relative flex items-center rounded-full border border-border bg-background overflow-hidden transition-all ${
        isSmall ? 'w-14 h-7' : 'w-16 h-8'
      }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-background flex items-center justify-center">
          <Sun size={isSmall ? 12 : 14} className={`transition-opacity ${isDark ? 'opacity-40' : 'opacity-100'}`} />
        </div>
        <div className="w-1/2 bg-secondary flex items-center justify-center">
          <Moon size={isSmall ? 12 : 14} className={`transition-opacity ${isDark ? 'opacity-100' : 'opacity-40'}`} />
        </div>
      </div>
      <motion.div
        className={`absolute bg-primary rounded-full mx-0.5 ${isSmall ? 'w-6 h-5' : 'w-7 h-6'}`}
        animate={{ x: isDark ? (isSmall ? 24 : 30) : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
};

export default ThemeToggle;
