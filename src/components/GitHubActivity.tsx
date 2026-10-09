import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { WordReveal, AnimatedHeadline } from './AnimatedHeadline';

/*
 * Live public data from the GitHub API: repo count, language mix and what was pushed most recently.
 * Cached for 30 minutes per visitor to stay well inside the unauthenticated rate limit.
 */

const USER = 'Ayooluwabami';
const CACHE_KEY = 'gh-activity-v1';
const TTL = 30 * 60 * 1000;

type Repo = { name: string; html_url: string; language: string | null; pushed_at: string; fork: boolean; description: string | null };
type Data = { repos: number; since: string; languages: [string, number][]; recent: Repo[]; fetchedAt: number };

const LANG_COLOR: Record<string, string> = {
  TypeScript: 'bg-[#3178c6]',
  JavaScript: 'bg-[#e8c547]',
  HCL: 'bg-[#844fba]',
  Python: 'bg-[#3a75a8]',
  HTML: 'bg-[#e34c26]',
  CSS: 'bg-[#663399]',
  Shell: 'bg-[#89e051]',
  Dockerfile: 'bg-[#384d54]',
};

const ago = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? '1 month ago' : `${months} months ago`;
};

async function load(): Promise<Data> {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null') as Data | null;
    if (cached && Date.now() - cached.fetchedAt < TTL) return cached;
  } catch {
    /* storage unavailable: fetch fresh */
  }
  const [userRes, repoRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USER}`),
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`),
  ]);
  if (!userRes.ok || !repoRes.ok) throw new Error('GitHub unavailable');
  const user = await userRes.json();
  const repos: Repo[] = await repoRes.json();
  const counts = new Map<string, number>();
  repos.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));
  const data: Data = {
    repos: user.public_repos,
    since: user.created_at,
    languages: [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6),
    recent: repos.filter((r) => !r.fork && r.name !== USER).slice(0, 5),
    fetchedAt: Date.now(),
  };
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
  return data;
}

const Skeleton = ({ className = '' }: { className?: string }) => <div className={`animate-pulse rounded-md bg-muted ${className}`} />;

const GitHubActivity = () => {
  const [data, setData] = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    load()
      .then((d) => alive && setData(d))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  const total = data?.languages.reduce((n, [, c]) => n + c, 0) ?? 1;

  return (
    <section className="tone-white section-padding">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <AnimatedSection>
              <WordReveal text="Live from GitHub" className="text-label mb-5" />
              <AnimatedHeadline as="h2" className="text-section-title mb-5">
                Still shipping
              </AnimatedHeadline>
              <p className="mb-8 text-muted-foreground">
                Pulled live from the GitHub API each visit, not typed in. What I write in, and what I pushed most recently.
              </p>
              <a
                href={`https://github.com/${USER}`}
                target="_blank"
                rel="me noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                <span className="link-underline pb-0.5">github.com/{USER}</span>
                <ArrowUpRight size={15} />
              </a>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={100} className="lg:col-span-7 lg:col-start-6">
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-card dark:bg-background">
              {failed ? (
                <div className="p-8 text-sm text-muted-foreground">
                  GitHub didn’t answer just now. The repositories are all at{' '}
                  <a href={`https://github.com/${USER}`} className="text-primary underline" target="_blank" rel="noopener noreferrer">
                    github.com/{USER}
                  </a>
                  .
                </div>
              ) : (
                <>
                  {/* Counters */}
                  <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
                    <div className="p-6">
                      {data ? <p className="font-display tabular-nums text-4xl font-bold tracking-[-0.03em]">{data.repos}</p> : <Skeleton className="h-10 w-16" />}
                      <p className="mt-1 text-sm text-muted-foreground">public repositories</p>
                    </div>
                    <div className="p-6">
                      {data ? (
                        <p className="font-display tabular-nums text-4xl font-bold tracking-[-0.03em]">{new Date(data.since).getFullYear()}</p>
                      ) : (
                        <Skeleton className="h-10 w-20" />
                      )}
                      <p className="mt-1 text-sm text-muted-foreground">on GitHub since</p>
                    </div>
                  </div>

                  {/* Language mix */}
                  <div className="border-b border-border p-6">
                    <p className="mb-3 text-xs font-medium text-muted-foreground">Languages across repositories</p>
                    <div className="mb-4 flex h-2.5 overflow-hidden rounded-full bg-muted">
                      {data?.languages.map(([lang, n], i) => (
                        <motion.span
                          key={lang}
                          className={`h-full ${LANG_COLOR[lang] ?? 'bg-muted-foreground'}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(n / total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        />
                      ))}
                    </div>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
                      {data
                        ? data.languages.map(([lang, n]) => (
                            <li key={lang} className="flex items-center gap-1.5">
                              <span className={`h-2 w-2 rounded-full ${LANG_COLOR[lang] ?? 'bg-muted-foreground'}`} />
                              <span className="text-foreground">{lang}</span>
                              <span className="text-muted-foreground">{Math.round((n / total) * 100)}%</span>
                            </li>
                          ))
                        : [0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-3 w-20" />)}
                    </ul>
                  </div>

                  {/* Recent pushes */}
                  <ul>
                    {data
                      ? data.recent.map((r) => (
                          <li key={r.name} className="border-b border-border last:border-0">
                            <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-secondary/50">
                              <span className={`h-2 w-2 shrink-0 rounded-full ${r.language ? LANG_COLOR[r.language] ?? 'bg-muted-foreground' : 'bg-muted-foreground/40'}`} />
                              <span className="flex-1 truncate font-mono text-sm text-foreground group-hover:text-primary">{r.name}</span>
                              <span className="shrink-0 text-xs text-muted-foreground">pushed {ago(r.pushed_at)}</span>
                            </a>
                          </li>
                        ))
                      : [0, 1, 2, 3, 4].map((i) => (
                          <li key={i} className="flex items-center gap-4 border-b border-border px-6 py-4 last:border-0">
                            <Skeleton className="h-3 flex-1" />
                            <Skeleton className="h-3 w-20" />
                          </li>
                        ))}
                  </ul>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
