import type { CSSProperties } from 'react';
import { pick } from '../i18n/pick';
import type { Lang, Lens, MaybeLocalized, Screen } from '../types';
import { Device, ScreenImg } from './Device';

type Props = {
  screen: Screen;
  url?: string;
  lenses: Lens[];
  caption?: MaybeLocalized;
  lang: Lang;
  mob: boolean;
};

/**
 * A whole screen with its details pulled out: numbered frames mark the
 * regions on the screen, and each region is repeated beside it at reading size
 * with a line on what it does. For dense desktop screens, where the point sits
 * in a corner too small to read at column width.
 */
export function LensView({ screen, url, lenses, caption, lang, mob }: Props) {
  const src = pick(screen.src, lang);

  return (
    <figure className={`lens${mob ? ' lens--stacked' : ''}`}>
      <div className="lens__body">
        <div className="lens__screen">
          <Device kind="browser" url={url} fit={screen}>
            <ScreenImg screen={screen} lang={lang} />
            {lenses.map((l, i) => (
              <span
                key={i}
                className="lens__mark"
                style={{ left: `${l.x}%`, top: `${l.y}%`, width: `${l.w}%`, height: `${l.h}%` } as CSSProperties}
                aria-hidden="true"
              >
                <b>{i + 1}</b>
              </span>
            ))}
          </Device>
        </div>

        <ol role="list" className="lens__list">
          {lenses.map((l, i) => {
            // Background maths for a crop: scale the image so the crop's width
            // fills the box, then slide it so the crop's corner sits at 0,0.
            const crop = {
              aspectRatio: `${(l.w * screen.w) / 100} / ${(l.h * screen.h) / 100}`,
              backgroundImage: `url("${src}")`,
              backgroundSize: `${(100 / l.w) * 100}% auto`,
              backgroundPosition: `${l.w >= 100 ? 0 : (l.x / (100 - l.w)) * 100}% ${l.h >= 100 ? 0 : (l.y / (100 - l.h)) * 100}%`,
            } as CSSProperties;
            return (
              <li key={i} className="lens__item" style={{ '--i': i } as CSSProperties}>
                <div className="lens__crop" style={crop} aria-hidden="true">
                  <b>{i + 1}</b>
                </div>
                <p className="lens__text">
                  <span className="lens__n">{String(i + 1).padStart(2, '0')}</span>
                  {l.text[lang]}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
      {caption && <figcaption className="figure__cap">{pick(caption, lang)}</figcaption>}
    </figure>
  );
}
