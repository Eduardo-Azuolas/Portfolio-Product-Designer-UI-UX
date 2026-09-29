import type { CSSProperties } from 'react';
import { pick } from '../i18n/pick';
import type { Lang, MaybeLocalized, SlotImage, TrailStop } from '../types';

type Props = {
  stops: TrailStop[];
  caption?: MaybeLocalized;
  lang: Lang;
  mob: boolean;
  enlargeLabel: string;
  onEnlarge: (img: SlotImage) => void;
};

/**
 * The same condition badge followed through the product: each stop is a crop
 * of a real screen, cut to the spot where the badge sits, with the badge
 * ringed. A rail under the crops carries the buyer's stops and then the
 * seller's, so the reader sees one grade surviving from search to dispute and
 * back to the listing it was set on. Each crop opens its full screen.
 */
export function BadgeTrail({ stops, caption, lang, mob, enlargeLabel, onEnlarge }: Props) {
  return (
    <figure className={`trail${mob ? ' trail--scroll' : ''}`} style={{ '--tcols': stops.length } as CSSProperties}>
      <div className="trail__ground">
        <ol role="list" className="trail__row">
          {stops.map((s, i) => {
            const ratio = s.screen.w / s.screen.h;
            const ch = s.crop.w * ratio * 0.75;
            const img: CSSProperties = {
              width: `${(100 / s.crop.w) * 100}%`,
              left: `${(-s.crop.x / s.crop.w) * 100}%`,
              top: `${(-s.crop.y / ch) * 100}%`,
            };
            const m = lang === 'pt' && s.markPt ? s.markPt : s.mark;
            const ring: CSSProperties = {
              left: `${((m.x - s.crop.x) / s.crop.w) * 100}%`,
              top: `${((m.y - s.crop.y) / ch) * 100}%`,
              width: `${(m.w / s.crop.w) * 100}%`,
              height: `${(m.h / ch) * 100}%`,
            };
            const cap = pick(s.caption, lang);
            const seller = i > 0 && stops[i - 1].side[lang] !== s.side[lang];
            return (
              <li key={i} className={`trail__stop${seller ? ' trail__stop--switch' : ''}`}>
                <p className="trail__side">{s.side[lang]}</p>
                <div className="trail__loupe">
                  <img
                    className="trail__img"
                    src={pick(s.screen.src, lang)}
                    alt=""
                    width={s.screen.w}
                    height={s.screen.h}
                    loading="lazy"
                    decoding="async"
                    style={img}
                  />
                  <span className="trail__ring" style={ring} aria-hidden="true" />
                  <button
                    type="button"
                    className="figure__zoom trail__zoom"
                    aria-label={`${enlargeLabel}: ${cap}`}
                    onClick={() => onEnlarge({ ...s.screen, caption: s.caption })}
                  />
                </div>
                <div className="trail__rail" aria-hidden="true">
                  <span className="trail__node">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="trail__title">{s.title[lang]}</p>
                <p className="figure__cap trail__cap">{cap}</p>
              </li>
            );
          })}
        </ol>
      </div>
      {caption && <figcaption className="figure__cap">{pick(caption, lang)}</figcaption>}
    </figure>
  );
}
