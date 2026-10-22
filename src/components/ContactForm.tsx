import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, RotateCcw } from 'lucide-react';

/*
 * Contact form backed by the self-hosted mailer (SE/backend/mailer, a Cloudflare Worker + Resend).
 * The recipient is fixed on the server under the `portfolio` project, so the address never appears
 * on the page. The visitor's email becomes Reply-To, so replying in Gmail answers them directly.
 */

const MAILER_URL = import.meta.env.VITE_MAILER_URL ?? 'https://mailer.quire-reminders.workers.dev/send';

const TOPICS = ['Job opportunity', 'Contract or freelance project', 'Collaboration', 'Something else'] as const;

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/;

const field =
  'w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 ' +
  'transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:opacity-60';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>(TOPICS[0]);
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [gotcha, setGotcha] = useState(''); // honeypot: real visitors never see or fill it
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');

  const validate = (): Errors => {
    const e: Errors = {};
    if (!name.trim()) e.name = 'Please add your name.';
    if (!EMAIL_RE.test(email.trim())) e.email = 'Please enter a valid email so I can reply.';
    if (message.trim().length < 10) e.message = 'A sentence or two helps me reply properly.';
    return e;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus('sending');
    setServerError('');
    try {
      const fields: [string, string][] = [['Topic', topic]];
      if (company.trim()) fields.push(['Company', company.trim()]);
      const res = await fetch(MAILER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: 'portfolio',
          name: name.trim(),
          email: email.trim(),
          subject: `${topic} from ${name.trim()}`,
          message: message.trim(),
          fields,
          _gotcha: gotcha,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Something went wrong. Please try again.');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setServerError(
        err instanceof TypeError
          ? 'Could not reach the server. Check your connection and try again.'
          : err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.',
      );
    }
  };

  const reset = () => {
    setName('');
    setEmail('');
    setTopic(TOPICS[0]);
    setCompany('');
    setMessage('');
    setErrors({});
    setStatus('idle');
  };

  const sending = status === 'sending';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary/50 p-6 shadow-card md:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[420px] flex-col items-start justify-center"
            role="status"
          >
            <CheckCircle2 className="mb-5 text-green-500" size={36} />
            <h2 className="font-display mb-3 text-2xl font-bold tracking-[-0.02em]">Message sent. Thank you, {name.split(' ')[0]}.</h2>
            <p className="mb-8 max-w-md text-muted-foreground">
              It’s in my inbox now. I usually reply within a day, from my own email, to <span className="text-foreground">{email}</span>.
            </p>
            <button onClick={reset} className="btn-secondary inline-flex items-center gap-2">
              <RotateCcw size={15} />
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={submit}
            noValidate
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="cf-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  maxLength={100}
                  disabled={sending}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'cf-name-err' : undefined}
                  className={field}
                  placeholder="Your name"
                />
                {errors.name && <p id="cf-name-err" className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="cf-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  maxLength={254}
                  disabled={sending}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'cf-email-err' : undefined}
                  className={field}
                  placeholder="you@company.com"
                />
                {errors.email && <p id="cf-email-err" className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-topic" className="mb-1.5 block text-sm font-medium">
                  What’s it about?
                </label>
                <select
                  id="cf-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as (typeof TOPICS)[number])}
                  disabled={sending}
                  className={`${field} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                  }}
                >
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cf-company" className="mb-1.5 block text-sm font-medium">
                  Company <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="cf-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="organization"
                  maxLength={120}
                  disabled={sending}
                  className={field}
                  placeholder="Company or agency"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="cf-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                maxLength={5000}
                disabled={sending}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'cf-message-err' : undefined}
                className={`${field} resize-y`}
                placeholder="The role or project, the stack, and the timeline if you have one."
              />
              <div className="mt-1.5 flex justify-between gap-4 text-xs">
                <span className="text-red-500">{errors.message ?? ''}</span>
                <span className="tabular-nums text-muted-foreground">{message.length}/5000</span>
              </div>
            </div>

            {/* Honeypot: hidden from people and screen readers, irresistible to bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor="cf-website">Website</label>
              <input id="cf-website" tabIndex={-1} autoComplete="off" value={gotcha} onChange={(e) => setGotcha(e.target.value)} />
            </div>

            {status === 'error' && (
              <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {serverError}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <p className="text-xs text-muted-foreground">I usually reply within a day.</p>
              <button type="submit" disabled={sending} className="btn-primary group inline-flex items-center gap-2 disabled:cursor-wait disabled:opacity-80">
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
