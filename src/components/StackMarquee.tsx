/* The tools strip under the hero, scrolling like bizlift's client-logo band. Pauses on hover. */
const STACK = [
  'AWS', 'Azure', 'Google Cloud', 'Terraform', 'Kubernetes', 'Helm', 'ArgoCD', 'Docker', 'GitHub Actions', 'Jenkins',
  'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'CloudFormation', 'Prometheus', 'Grafana', 'Trivy', 'Semgrep', 'Checkov',
];

const Row = ({ hidden = false }: { hidden?: boolean }) => (
  <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
    {STACK.map((s) => (
      <li key={s} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-muted-foreground">
        {s}
        <span className="h-1 w-1 rounded-full bg-primary/50" />
      </li>
    ))}
  </ul>
);

const StackMarquee = () => (
  <div className="dark tone-ink group relative overflow-hidden border-y border-border py-5">
    <p className="sr-only">Tools I work with: {STACK.join(', ')}</p>
    <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
      <Row />
      <Row hidden />
      </div>
    </div>
  </div>
);

export default StackMarquee;
