import type { CSSProperties } from 'react';
import { pick } from '../i18n/pick';
import type { Lang, MaybeLocalized, PairNote, PairSide } from '../types';
import { Device, ScreenImg } from './Device';

type Props = {
  left: PairSide;
  right: PairSide;
  notes: PairNote[];
  caption?: MaybeLocalized;
  lang: Lang;
  mob: boolean;
};

/**
 * Two screens side by side with what differs between them written down the
 * middle, each difference pinned at the same height on both devices. Built for
 * a before/after or a mode switch, where the point is the delta rather than
 * either screen. On a phone the devices stay paired and the notes follow.
 */
export function ComparePair({ left, right, notes, caption, lang, mob }: Props) {
  const side = (s: PairSide, edge: 'l' | 'r') => (
    <div className={`pair__side pair__side--${edge}`}>
      <p className={`pair__tag pair__tag--${s.tone}`}>{s.tag[lang]}</p>
      <div className="pair__device">
        <Device kind="phone">
          <ScreenImg screen={s.screen} lang={lang} />
        </Device>
        {notes.map((n, i) => (
          <span
            key={i}
            className={`pair__pin pair__pin--${edge === 'l' ? 'r' : 'l'}`}
            style={{ top: `${n.y}%` } as CSSProperties}
            aria-hidden="true"
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <figure className={`pair${mob ? ' pair--stacked' : ''}`}>
      <div className="pair__stage">
        {side(left, 'l')}
        <ol role="list" className="pair__notes">
          {notes.map((n, i) => (
            <li key={i} className="pair__note" style={{ top: `${n.y}%` } as CSSProperties}>
              <span className="pair__body">
                <span className="pair__n">{String(i + 1).padStart(2, '0')}</span>
                {n.text[lang]}
              </span>
            </li>
          ))}
        </ol>
        {side(right, 'r')}
      </div>
      {caption && <figcaption className="figure__cap">{pick(caption, lang)}</figcaption>}
    </figure>
  );
}
