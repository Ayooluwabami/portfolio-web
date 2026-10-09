import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/*
 * New pages open at the top. Back/forward (POP) is left alone so the browser can
 * return the visitor to where they were. `instant` skips the smooth-scroll rule on <html>,
 * so the old page never visibly slides up.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === 'POP') return;
    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
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
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
