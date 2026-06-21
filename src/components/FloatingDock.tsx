import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface DockItem {
  icon: ReactNode;
  label: string;
  href: string;
  external?: boolean;
}

interface Props {
  items: DockItem[];
  className?: string;
}

const ICON_SIZE = 40;
const ICON_MAX = 58;
const REACH = 100; // px radius of magnification

function DockIcon({ item, mouseX }: { item: DockItem; mouseX: ReturnType<typeof useMotionValue> }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current) return REACH + 1;
    const rect = ref.current.getBoundingClientRect();
    return Math.abs(val - (rect.left + rect.width / 2));
  });

  const rawSize = useTransform(distance, [0, REACH], [ICON_MAX, ICON_SIZE]);
  const size = useSpring(rawSize, { stiffness: 350, damping: 26, mass: 0.5 });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'me noopener noreferrer' : undefined}
      aria-label={item.label}
      title={item.label}
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-xl
                 bg-secondary border border-border text-muted-foreground
                 hover:text-primary hover:border-primary/50 transition-colors duration-150"
    >
      {item.icon}
    </motion.a>
  );
}

/**
 * macOS-style dock with magnification — icons scale up when the cursor
 * is nearby, neighbours scale proportionally.
 */
const FloatingDock = ({ items, className = '' }: Props) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`flex items-end gap-2 ${className}`}
    >
      {items.map((item) => (
        <DockIcon key={item.label} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  );
};

export default FloatingDock;
