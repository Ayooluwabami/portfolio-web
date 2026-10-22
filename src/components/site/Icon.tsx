import { BookOpen, Braces, Gauge, KeyRound, MessageSquareText, ShieldCheck, type LucideIcon } from 'lucide-react';

/* Small icon tile used on promise and feature cards. One size, one treatment. */
const ICONS: Record<string, LucideIcon> = {
  code: Braces,
  shield: ShieldCheck,
  key: KeyRound,
  gauge: Gauge,
  book: BookOpen,
  chat: MessageSquareText,
};

const IconTile = ({ name }: { name: string }) => {
  const Icon = ICONS[name] ?? Braces;
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-accent-ink">
      <Icon size={20} strokeWidth={1.75} />
    </span>
  );
};

export default IconTile;
