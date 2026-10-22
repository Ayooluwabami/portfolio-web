import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/*
 * New pages open at the top (or at the #section the link names). Back/forward (POP) is left alone so the browser can
 * return the visitor to where they were. `instant` skips the smooth-scroll rule on <html>,
 * so the old page never visibly slides up.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === 'POP') return;
    // Links like /#recruiters land on that section once the page has painted.
    const target = () => (hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null);
    const toTop = () => {
      const el = target();
      if (el) el.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
      else window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    };
    toTop();
    // Pages are lazy-loaded; once the new page paints, the browser's scroll anchoring can
    // nudge the position by a few pixels. Re-assert the top for the next couple of frames.
    let raf = requestAnimationFrame(() => {
      toTop();
      raf = requestAnimationFrame(toTop);
    });
    const late = window.setTimeout(toTop, 120);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(late);
    };
  }, [pathname, hash, navigationType]);

  return null;
};

export default ScrollToTop;
