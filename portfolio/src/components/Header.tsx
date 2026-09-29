import { useEffect, useRef, useState } from 'react';
import { config } from '../config';
import { routeHref } from '../hooks/useRoute';
import { useActiveSection } from '../hooks/useScrollSpy';
import { Logo } from './Logo';
import { RouteLink } from './RouteLink';
import type { Strings } from '../i18n/strings';
import type { Lang, Page } from '../types';

type Props = {
  page: Page;
  t: Strings;
  lang: Lang;
  /** Below 900px the links live in the dialog instead of the header row. */
  mob: boolean;
  onNavigate: (page: Page) => void;
  onWork: () => void;
  onLang: (lang: Lang) => void;
};

const NAV: ReadonlyArray<Exclude<Page, 'cs' | 'notfound'>> = ['home', 'about', 'resume', 'contact'];
const LANGS: ReadonlyArray<Lang> = ['en', 'pt'];

type Item = {
  key: string;
  label: string;
  href: string;
  /**
   * "page" for the page itself, "location" for the home section being read,
   * "true" for the section a case belongs to.
   */
  current?: 'page' | 'location' | 'true';
  onClick: () => void;
};

export function Header({ page, t, lang, mob, onNavigate, onWork, onLang }: Props) {
  const section = useActiveSection();
  // On the home sheet, HOME and WORK hand the mark back and forth as the work
  // section scrolls through the reading band.
  const onWorkSection = page === 'home' && section === 'work';
  const menuRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* WORK is a section of the home sheet, not a page, so it rides along with
     HOME rather than owning a route of its own. A case sheet lives under it,
     so that is where the "you are here" mark goes while reading one. */
  const items: Item[] = NAV.flatMap((key) => {
    const item: Item = {
      key,
      label: t.nav[key],
      href: routeHref(key),
      current: page === key && !(key === 'home' && onWorkSection) ? 'page' : undefined,
      onClick: () => onNavigate(key),
    };
    return key === 'home'
      ? [
          item,
          {
            key: 'work',
            label: t.nav.work,
            href: `${routeHref('home')}#work`,
            current: page === 'cs' ? 'true' : onWorkSection ? 'location' : undefined,
            onClick: onWork,
          },
        ]
      : [item];
  });

  // The trigger only exists below 900px; growing past it must not strand the
  // menu open over a header that already shows every link inline.
  useEffect(() => {
    if (!mob) menuRef.current?.close();
  }, [mob]);

  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  const choose = (onClick: () => void) => () => {
    menuRef.current?.close();
    onClick();
  };

  return (
    <>
      {/* First stop for keyboard users: past the eight header controls. */}
      <a className="skip-link" href="#content">
        {t.skip}
      </a>

      <header data-noprint className="header">
        <div className="header__inner">
          <RouteLink
            className="brand"
            href={routeHref('home')}
            aria-label={config.name}
            onNavigate={() => onNavigate('home')}
          >
            <Logo />
            <span className="brand__name">{config.name}</span>
          </RouteLink>

          <div className="header__spacer" />

          {/*
            Spelled out, these five need 690px of header in English and 770px
            in Portuguese, before the brand and the language pair. Below 900px
            they move into the dialog underneath, which has the room to write
            them out in full — no three-letter abbreviations to decipher.
          */}
          <nav className="nav" aria-label={t.menu}>
            {items.map(({ key, label, href, current, onClick }) => (
              <RouteLink
                key={key}
                className="nav__btn"
                href={href}
                aria-current={current}
                onNavigate={onClick}
              >
                {label}
              </RouteLink>
            ))}
          </nav>

          <div className="lang" role="group" aria-label={t.langGroup}>
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                lang={code}
                className="lang__btn"
                aria-pressed={lang === code}
                onClick={() => onLang(code)}
              >
                {code.toUpperCase()}
                {/* The visible code stays in the name, so voice control can
                    still say "click PT". */}
                <span className="sr-only"> — {t.langNames[code]}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn btn--ghost nav-toggle"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen(true);
              menuRef.current?.showModal();
            }}
          >
            {t.menu}
          </button>
        </div>
      </header>

      <dialog
        data-noprint
        ref={menuRef}
        className="menu"
        aria-label={t.menu}
        onClose={() => setMenuOpen(false)}
        onClick={(e) => {
          if (e.target === menuRef.current) menuRef.current?.close();
        }}
      >
        <div className="menu__head">
          <Logo />
          <button
            type="button"
            className="sheet__close"
            aria-label={t.close}
            onClick={() => menuRef.current?.close()}
          >
            ✕
          </button>
        </div>

        <nav className="menu__list" aria-label={t.menu}>
          {items.map(({ key, label, href, current, onClick }) => (
            <RouteLink
              key={key}
              className="menu__btn"
              href={href}
              aria-current={current}
              onNavigate={choose(onClick)}
            >
              {label}
            </RouteLink>
          ))}
        </nav>
      </dialog>
    </>
  );
}
