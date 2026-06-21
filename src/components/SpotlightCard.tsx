import { useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * Cursor-following border glow.
 * A radial gradient tracks the mouse across the card surface;
 * the glow appears at the border closest to the cursor.
 * Zero JS-driven style repaints — uses CSS custom props only.
 */
const SpotlightCard = ({ children, className = '' }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.removeProperty('--mx');
    ref.current.style.removeProperty('--my');
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
