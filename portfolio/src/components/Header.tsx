import { useEffect, useRef, useState } from 'react';
import { config } from '../config';
import { Logo } from './Logo';
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

const NAV: ReadonlyArray<Exclude<Page, 'cs'>> = ['home', 'about', 'resume', 'contact'];

export function Header({ page, t, lang, mob, onNavigate, onWork, onLang }: Props) {
  const menuRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* WORK is a section of the home sheet, not a page, so it rides along with
     HOME rather than owning a route of its own. */
  const items = NAV.flatMap((key) => {
    const item = { key, label: t.nav[key], current: page === key, onClick: () => onNavigate(key) };
    return key === 'home'
      ? [item, { key: 'work', label: t.nav.work, current: false, onClick: onWork }]
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
      <header data-noprint className="header">
        <div className="header__inner">
          <button
            type="button"
            className="brand"
            aria-label={config.name}
            onClick={() => onNavigate('home')}
          >
            <Logo />
            <span className="brand__name">{config.name}</span>
          </button>

          <div className="header__spacer" />

          {/*
            Spelled out, these five need 690px of header in English and 770px
            in Portuguese, before the brand and the language pair. Below 900px
            they move into the dialog underneath, which has the room to write
            them out in full — no three-letter abbreviations to decipher.
          */}
          <nav className="nav" aria-label={t.menu}>
            {items.map(({ key, label, current, onClick }) => (
              <button
                key={key}
                type="button"
                className="nav__btn"
                aria-current={current ? 'page' : undefined}
                onClick={onClick}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="lang">
            <button
              type="button"
              className="lang__btn"
              aria-pressed={lang === 'en'}
              onClick={() => onLang('en')}
            >
              EN
            </button>
            <button
              type="button"
              className="lang__btn"
              aria-pressed={lang === 'pt'}
              onClick={() => onLang('pt')}
            >
              PT
            </button>
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
          {items.map(({ key, label, current, onClick }) => (
            <button
              key={key}
              type="button"
              className="menu__btn"
              aria-current={current ? 'page' : undefined}
              onClick={choose(onClick)}
            >
              {label}
            </button>
          ))}
        </nav>
      </dialog>
    </>
  );
}
