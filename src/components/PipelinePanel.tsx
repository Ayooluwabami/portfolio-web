import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';

/*
 * The path every change takes, as a live run: stages tick through, a packet travels the rail,
 * production goes green, then it loops. Built from the gates used in the EKS and CarePulse pipelines.
 */

const STAGES = [
  { name: 'Lint & unit tests', tool: 'eslint · jest' },
  { name: 'Secret scan', tool: 'gitleaks' },
  { name: 'Static analysis', tool: 'semgrep' },
  { name: 'IaC policy', tool: 'checkov' },
  { name: 'Build & scan image', tool: 'docker · trivy' },
  { name: 'Plan infrastructure', tool: 'terraform plan' },
  { name: 'Deploy to staging', tool: 'helm' },
  { name: 'Smoke tests', tool: 'health checks' },
  { name: 'Promote to production', tool: 'argocd sync' },
];

const STEP_MS = 650;
const HOLD_MS = 3800;

const PipelinePanel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(1);

  useEffect(() => {
    if (reduce) {
      setStep(STAGES.length);
      return;
    }
    if (!inView) return;
    const done = step >= STAGES.length;
    const id = window.setTimeout(
      () => {
        if (done) {
          setStep(0);
          setRun((r) => r + 1);
        } else setStep((s) => s + 1);
      },
      done ? HOLD_MS : step === 0 ? 500 : STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [inView, step, reduce]);

  const done = step >= STAGES.length;
  const progress = Math.min(step, STAGES.length) / STAGES.length;

  return (
    <div ref={ref} className="code-window shadow-card">
      <div className="code-header justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-foreground">pipeline</span>
          <span className="font-mono text-xs text-muted-foreground">main · run #{String(run).padStart(3, '0')}</span>
        </div>
        <span
          className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-medium transition-colors duration-500 ${
            done ? 'bg-green-500/15 text-green-400' : 'bg-primary/15 text-primary'
          }`}
        >
          {done ? 'deployed' : 'running'}
        </span>
      </div>

      <div className="relative px-5 py-4">
        {/* Rail with a packet travelling down to the active stage */}
        <div className="absolute bottom-[4.25rem] left-[1.95rem] top-6 w-px bg-border" aria-hidden />
        <motion.div
          className="absolute left-[1.95rem] top-6 w-px origin-top bg-primary/70"
          style={{ height: 'calc(100% - 6.5rem)' }}
          animate={{ scaleY: progress }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />

        <ol className="relative space-y-0.5">
          {STAGES.map((s, i) => {
            const state = i < step ? 'pass' : i === step && !done ? 'run' : 'wait';
            return (
              <li key={s.name} className="flex items-center gap-4 rounded-md py-1.5">
                <span className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-secondary">
                  {state === 'pass' && (
                    <motion.span
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-green-500/90 text-background"
                    >
                      <Check size={11} strokeWidth={3.5} />
                    </motion.span>
                  )}
                  {state === 'run' && (
                    <span className="relative flex h-[18px] w-[18px] items-center justify-center">
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                  )}
                  {state === 'wait' && <span className="h-[14px] w-[14px] rounded-full border border-dashed border-muted-foreground/50" />}
                </span>
                <span className={`flex-1 font-sans text-sm transition-colors duration-300 ${state === 'wait' ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {s.name}
                </span>
                <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">{s.tool}</span>
              </li>
            );
          })}
        </ol>

        <div
          className={`mt-4 flex items-center justify-between rounded-lg border px-4 py-3 transition-colors duration-700 ${
            done ? 'border-green-500/30 bg-green-500/10' : 'border-border bg-background/40'
          }`}
        >
          <span className={`font-sans text-sm font-medium ${done ? 'text-green-400' : 'text-muted-foreground'}`}>
            {done ? 'Live in production' : `Stage ${Math.min(step + 1, STAGES.length)} of ${STAGES.length}`}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">RollingUpdate · zero downtime</span>
        </div>
      </div>
    </div>
  );
};

export default PipelinePanel;
