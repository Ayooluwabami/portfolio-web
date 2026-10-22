import { Link, useLocation } from 'react-router-dom';
import Section from '../components/site/Section';

const NotFound = () => {
  const { pathname } = useLocation();
  return (
    <Section tone="dark" first className="min-h-[80vh]">
      <p className="mb-6 font-mono text-[14px] text-muted-foreground">
        <span className="text-accent-ink">GET</span> {pathname} → 404
      </p>
      <h1 className="h-page max-w-[16ch] text-white">
        This page <em>doesn’t exist</em>
      </h1>
      <p className="lede mt-5">The link may be old, or the address may have a typo.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
        <Link to="/projects" className="btn border border-white/25 text-white hover:border-white/60">
          See the work
        </Link>
      </div>
    </Section>
  );
};

export default NotFound;
