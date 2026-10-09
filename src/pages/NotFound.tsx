import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <section className="container mx-auto flex min-h-[80vh] items-center px-6 pt-28 pb-20">
      <div className="mx-auto w-full max-w-4xl">
        <p className="mb-6 font-mono text-sm text-muted-foreground">
          <span className="text-primary">GET</span> {pathname} → 404
        </p>
        <h1 className="text-headline mb-5 max-w-[14ch]">This page doesn’t exist.</h1>
        <p className="text-subheadline mb-9">The link may be old, or the address may have a typo.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
          <Link to="/projects" className="btn-secondary">
            See projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
