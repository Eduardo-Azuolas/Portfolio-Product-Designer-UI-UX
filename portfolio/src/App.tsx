import { useCallback, useEffect, useRef, useState } from 'react';
import { Backdrop } from './components/Backdrop';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { config } from './config';
import { CASES } from './data/cases';
import { strings } from './i18n/strings';
import { useDims } from './hooks/useDims';
import { useLang } from './hooks/useLang';
import { useParallax } from './hooks/useParallax';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useReveal } from './hooks/useReveal';
import { useRoute } from './hooks/useRoute';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useViewport } from './hooks/useViewport';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Resume } from './pages/Resume';

/*
 * The case sheet, its mockup components and every case's figure data live in
 * their own chunk. The home sheet — where most visits start — no longer waits
 * for them; they are fetched as soon as the browser is idle, so opening a case
 * from the grid is still immediate.
 *
 * Held in state rather than wrapped in React.lazy: lazy suspends on its first
 * render even when the chunk is already in, and the sheet effects (reveals,
 * rulers, scroll spy) would run over the placeholder and miss the sections.
 */
const loadCaseStudy = () => import('./pages/CaseStudy');
type CaseStudyView = typeof import('./pages/CaseStudy').CaseStudy;

export default function App() {
  const [{ page, caseIndex }, go] = useRoute();
  const [lang, setLang] = useLang();

  const vp = useViewport();
  const reduced = useReducedMotion();
  const t = strings[lang];

  // Whether the case chunk has arrived. Part of the content key: on a direct
  // visit to a case, the sheet effects first run over the loading placeholder
  // and must run again once the real sections are in the page.
  const [CaseStudy, setCaseStudy] = useState<CaseStudyView | null>(null);
  const caseReady = CaseStudy !== null;
  useEffect(() => {
    let live = true;
    const load = () =>
      loadCaseStudy().then((m) => {
        if (live) setCaseStudy(() => m.CaseStudy);
      });
    if (page === 'cs') {
      load();
      return () => {
        live = false;
      };
    }
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 3000 })
      : window.setTimeout(load, 1500);
    return () => {
      live = false;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, [page]);

  // Re-run the sheet effects whenever the rendered content changes.
  const contentKey = `${page}:${caseIndex}:${lang}:${caseReady && page === 'cs' ? 'ready' : ''}`;
  useParallax(!reduced, contentKey);
  useReveal(contentKey, reduced);
  useDims(contentKey, reduced);
  useScrollSpy(contentKey, 'hero');

  // index.html ships lang="en"; without this the toggle swaps every string to
  // Portuguese and screen readers keep reading it with English phonemes.
  useEffect(() => {
    // pt-BR, not bare pt: the copy is Brazilian, and a screen reader picks the
    // voice from this tag.
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  // One title per route, so tabs, history and shared links say where they go.
  useEffect(() => {
    const label = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();
    const name =
      page === 'cs'
        ? CASES[caseIndex].name
        : page === 'notfound'
          ? t.notFound
          : page === 'home'
            ? ''
            : label(t.nav[page]);
    document.title = name ? `${name} — ${t.titleSuffix}` : t.titleSuffix;
    // index.html ships the home URL as canonical; each page claims its own,
    // or search engines would fold every case into the home page.
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', `${window.location.origin}${window.location.pathname}`);
  }, [page, caseIndex, t]);

  // A route swap removes whatever had focus. Move it to the new page's title,
  // so keyboard and screen-reader users land at the top of what just loaded.
  // Not on first load: the browser's own starting point is right there.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const title = document.querySelector<HTMLElement>('main h1');
    if (!title) return;
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
  }, [page, caseIndex]);

  const openCase = useCallback((index: number) => go('cs', index), [go]);

  /* The work plates live on the home sheet. From another page, route home
     first and scroll once the new sheet has painted. */
  const goWork = useCallback(() => {
    const scroll = () => {
      const work = document.getElementById('work');
      if (!work) return;
      work.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      const heading = work.querySelector<HTMLElement>('h2');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    };

    if (page === 'home') {
      scroll();
      return;
    }
    go('home');
    requestAnimationFrame(() => requestAnimationFrame(scroll));
  }, [go, page, reduced]);

  return (
    <div className="shell" data-motion={config.forceMotion ? 'full' : 'auto'}>
      <Backdrop />

      <Header
        page={page}
        t={t}
        lang={lang}
        mob={vp.mob}
        onNavigate={go}
        onWork={goWork}
        onLang={setLang}
      />

      {page === 'home' && (
        <Home t={t} lang={lang} vp={vp} onNavigate={go} onOpenCase={openCase} />
      )}
      {page === 'about' && <About t={t} lang={lang} vp={vp} />}
      {page === 'cs' && (
        CaseStudy ? (
          <CaseStudy
            index={caseIndex}
            t={t}
            lang={lang}
            vp={vp}
            reduced={reduced}
            onOpenCase={openCase}
            onNavigate={go}
          />
        ) : (
          <main id="content" tabIndex={-1} className="page page--case" style={{ minHeight: '100vh' }} />
        )
      )}
      {page === 'resume' && <Resume t={t} lang={lang} vp={vp} />}
      {page === 'contact' && <Contact t={t} vp={vp} />}
      {page === 'notfound' && <NotFound t={t} onWork={goWork} />}

      <Footer t={t} />
    </div>
  );
}
