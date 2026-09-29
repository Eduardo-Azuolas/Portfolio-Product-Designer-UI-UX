import { useState, type CSSProperties } from 'react';
import { pick } from '../i18n/pick';
import type { AnatomyPart, Lang, MaybeLocalized, Screen } from '../types';
import { Device, ScreenImg } from './Device';

type Props = {
  screen: Screen;
  url?: string;
  parts: AnatomyPart[];
  caption?: MaybeLocalized;
  lang: Lang;
  mob: boolean;
};

const LAYER = {
  atomic: { en: 'Atomic', pt: 'Atômico' },
  composite: { en: 'Composite', pt: 'Composto' },
};

/**
 * A product screen taken apart into the library pieces it is built from.
 * Every component on it is outlined — atomics in one colour, composites in
 * another — and numbered against a legend. Pointing at a legend entry (or
 * tapping it on a phone) isolates that piece: its outline fills and the rest
 * step back. Where the lens enlarges regions of a dense screen, this one
 * explains what the screen is made of.
 */
export function Anatomy({ screen, url, parts, caption, lang, mob }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const on = pinned ?? active;

  return (
    <figure className={`anat${mob ? ' anat--stacked' : ''}${on !== null ? ' has-active' : ''}`}>
      <div className="anat__body">
        <div className="anat__screen">
          <Device kind="browser" url={url} fit={screen}>
            <ScreenImg screen={screen} lang={lang} />
            {parts.map((p, i) => (
              <span
                key={i}
                className={`anat__box anat__box--${p.layer}${p.x + p.w / 2 > 60 ? ' anat__box--flip' : ''}${on === i ? ' is-on' : ''}`}
                style={
                  { left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%`, height: `${p.h}%`, '--i': i } as CSSProperties
                }
                aria-hidden="true"
              >
                <b>{i + 1}</b>
                <em>{pick(p.name, lang)}</em>
              </span>
            ))}
          </Device>
        </div>

        <ol role="list" className="anat__list" onMouseLeave={() => setActive(null)}>
          {parts.map((p, i) => (
            <li key={i} className="anat__item" style={{ '--i': i } as CSSProperties}>
              <button
                type="button"
                className={`anat__btn anat__btn--${p.layer}${on === i ? ' is-on' : ''}`}
                aria-pressed={pinned === i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => setPinned((v) => (v === i ? null : i))}
              >
                <span className="anat__head">
                  <span className="anat__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="anat__name">{pick(p.name, lang)}</span>
                  <span className="anat__chip">{LAYER[p.layer][lang]}</span>
                </span>
                <span className="anat__text">{p.text[lang]}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      {caption && <figcaption className="figure__cap">{pick(caption, lang)}</figcaption>}
    </figure>
  );
}
