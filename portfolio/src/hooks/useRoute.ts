import { useCallback, useEffect, useRef, useState } from 'react';
import { CASES } from '../data/cases';
import type { Page } from '../types';

export type Route = { page: Page; caseIndex: number };

/**
 * Page names own the first path segment, so a case id must never be one of
 * these — the lookup below resolves them first and the case would be
 * unreachable.
 */
const NAMED: Record<string, Page> = { about: 'about', resume: 'resume', contact: 'contact' };

/** "/" for a user page or custom domain, "/repo-name/" for a project page. */
const BASE = import.meta.env.BASE_URL;

/** "/aether" -> the Aether sheet. Anything unrecognized falls back to home. */
function parse(pathname: string): Route {
  const withoutBase = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  const segment = withoutBase.replace(/^\/+|\/+$/g, '').split('/')[0] ?? '';
  if (!segment) return { page: 'home', caseIndex: 0 };

  const named = NAMED[segment];
  if (named) return { page: named, caseIndex: 0 };

  const index = CASES.findIndex((c) => c.id === segment);
  return index >= 0 ? { page: 'cs', caseIndex: index } : { page: 'home', caseIndex: 0 };
}

function href({ page, caseIndex }: Route): string {
  if (page === 'home') return BASE;
  return `${BASE}${page === 'cs' ? CASES[caseIndex].id : page}`;
}

/**
 * The current page, read from and written to the address bar.
 *
 * Every navigation is a real history entry, so reload lands where you were,
 * back and forward work, and a case can be linked to directly. Deploying this
 * needs the host to serve index.html for unknown paths.
 */
export function useRoute(): [Route, (page: Page, index?: number) => void] {
  const [route, setRoute] = useState<Route>(() => parse(window.location.pathname));

  // `go` stays referentially stable; it reads the current index through this.
  const current = useRef(route);
  current.current = route;

  useEffect(() => {
    // Each route swaps the whole page, so a restored scroll offset would point
    // into content that is no longer there.
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';

    const onPop = () => {
      setRoute(parse(window.location.pathname));
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
      history.scrollRestoration = previous;
    };
  }, []);

  // An unknown path renders home, so rewrite it rather than leave the address
  // bar claiming a page that isn't there.
  useEffect(() => {
    const canonical = href(parse(window.location.pathname));
    if (window.location.pathname !== canonical) history.replaceState(null, '', canonical);
  }, []);

  const go = useCallback((page: Page, index?: number) => {
    const next: Route = { page, caseIndex: index ?? current.current.caseIndex };
    const url = href(next);
    if (url !== window.location.pathname) history.pushState(null, '', url);
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return [route, go];
}
