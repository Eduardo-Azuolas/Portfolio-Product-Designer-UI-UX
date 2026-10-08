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

/**
 * "/aether" -> the Aether sheet. An unknown segment is a "not found" page
 * rather than a silent trip home: a mistyped or renamed case link should say
 * so, not pretend it worked.
 */
function parse(pathname: string): Route {
  const withoutBase = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  const segment = withoutBase.replace(/^\/+|\/+$/g, '').split('/')[0] ?? '';
  if (!segment) return { page: 'home', caseIndex: 0 };

  const named = NAMED[segment];
  if (named) return { page: named, caseIndex: 0 };

  const index = CASES.findIndex((c) => c.id === segment);
  return index >= 0 ? { page: 'cs', caseIndex: index } : { page: 'notfound', caseIndex: 0 };
}

/** The URL of a page, so navigation can render as real links. */
export function routeHref(page: Page, caseIndex = 0): string {
  if (page === 'home' || page === 'notfound') return BASE;
  // Trailing slash: that is the URL the host settles on for a prerendered
  // <route>/index.html, so the address bar, canonical and sitemap all agree.
  return `${BASE}${page === 'cs' ? CASES[caseIndex].id : page}/`;
}

/** Scroll offset stored on each history entry, so Back returns to it. */
type EntryState = { y?: number } | null;

/**
 * The current page, read from and written to the address bar.
 *
 * Every navigation is a real history entry, so reload lands where you were,
 * back and forward work, and a case can be linked to directly. Each route is
 * prerendered to <route>/index.html at build time (prerender.ts); other unknown
 * paths fall back to 404.html.
 */
export function useRoute(): [Route, (page: Page, index?: number) => void] {
  const [route, setRoute] = useState<Route>(() => parse(window.location.pathname));

  // `go` stays referentially stable; it reads the current index through this.
  const current = useRef(route);
  current.current = route;

  useEffect(() => {
    // The browser would restore the offset before the new page renders, into
    // content that is not there yet. Each entry carries its own offset instead.
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';

    const onPop = (e: PopStateEvent) => {
      setRoute(parse(window.location.pathname));
      const y = (e.state as EntryState)?.y ?? 0;
      if (y === 0) {
        window.scrollTo(0, 0);
        return;
      }
      // Two frames are enough for React to commit and lay the page out, and
      // the figures reserve their boxes from w/h, so the offset is normally
      // reachable on the first try. The retry is for the case where it is
      // not: a scrollTo past the current bottom is clamped silently, and
      // without it the page would stay at the top once the content grows.
      let frames = 0;
      const restore = () => {
        window.scrollTo(0, y);
        if (Math.abs(window.scrollY - y) > 1 && frames++ < 20) requestAnimationFrame(restore);
      };
      requestAnimationFrame(() => requestAnimationFrame(restore));
    };
    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
      history.scrollRestoration = previous;
    };
  }, []);

  // A known page reached through a non-canonical path ("/about/") gets its
  // canonical URL. A not-found path is left as typed, so the user can see it.
  useEffect(() => {
    const parsed = parse(window.location.pathname);
    if (parsed.page === 'notfound') return;
    const canonical = routeHref(parsed.page, parsed.caseIndex);
    if (window.location.pathname !== canonical) history.replaceState(null, '', canonical);
  }, []);

  const go = useCallback((page: Page, index?: number) => {
    const next: Route = { page, caseIndex: index ?? current.current.caseIndex };
    const url = routeHref(next.page, next.caseIndex);
    if (url !== window.location.pathname) {
      history.replaceState({ y: window.scrollY } satisfies EntryState, '');
      history.pushState({ y: 0 } satisfies EntryState, '', url);
    }
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return [route, go];
}
