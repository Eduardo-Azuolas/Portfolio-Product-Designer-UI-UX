import { useCallback, useEffect } from 'react';
import { Backdrop } from './components/Backdrop';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { config } from './config';
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
import { CaseStudy } from './pages/CaseStudy';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { Resume } from './pages/Resume';

export default function App() {
  const [{ page, caseIndex }, go] = useRoute();
  const [lang, setLang] = useLang();

  const vp = useViewport();
  const reduced = useReducedMotion();
  const t = strings[lang];

  // Re-run the sheet effects whenever the rendered content changes.
  const contentKey = `${page}:${caseIndex}:${lang}`;
  useParallax(!reduced);
  useReveal(contentKey, reduced);
  useDims(contentKey, reduced);
  const active = useScrollSpy(contentKey, 'hero');

  // index.html ships lang="en"; without this the toggle swaps every string to
  // Portuguese and screen readers keep reading it with English phonemes.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const openCase = useCallback((index: number) => go('cs', index), [go]);

  /* The work plates live on the home sheet. From another page, route home
     first and scroll once the new sheet has painted. */
  const goWork = useCallback(() => {
    const scroll = () =>
      document
        .getElementById('work')
        ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });

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
        <CaseStudy
          index={caseIndex}
          t={t}
          lang={lang}
          vp={vp}
         
          active={active}
          reduced={reduced}
          onOpenCase={openCase}
        />
      )}
      {page === 'resume' && <Resume t={t} lang={lang} vp={vp} />}
      {page === 'contact' && <Contact t={t} vp={vp} />}

      <Footer t={t} />
    </div>
  );
}
