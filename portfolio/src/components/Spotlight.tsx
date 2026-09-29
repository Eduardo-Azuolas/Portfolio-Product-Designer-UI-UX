import type { CSSProperties } from 'react';
import { pick } from '../i18n/pick';
import type { DeviceKind, Lang, MaybeLocalized, Screen, SpotNote } from '../types';
import { Device, ScreenImg } from './Device';

type Props = {
  device: DeviceKind;
  screen: Screen;
  notes: SpotNote[];
  caption?: MaybeLocalized;
  lang: Lang;
  /** Below 900px the callouts move under the device as a numbered list. */
  mob: boolean;
};

/**
 * One screen with drafting-style callouts: a numbered pin on the device and a
 * leader line out to the note. On desktop the notes sit in the margins beside
 * the device; on mobile they stack underneath, keyed to the same numbers.
 * The notes are real text, so the screen itself stays decorative.
 */
export function Spotlight({ device, screen, notes, caption, lang, mob }: Props) {
  return (
    <figure className={`spot spot--${device}${mob ? ' spot--stacked' : ''}`}>
      <div className="spot__stage">
        <div className="spot__device">
          <Device kind={device}>
            <ScreenImg screen={screen} lang={lang} />
          </Device>
          {notes.map((n, i) => (
            <span
              key={i}
              className={`spot__pin spot__pin--${n.side}`}
              style={{ top: `${n.y}%` } as CSSProperties}
              aria-hidden="true"
            >
              {i + 1}
            </span>
          ))}
        </div>

        <ol role="list" className="spot__notes">
          {notes.map((n, i) => (
            <li
              key={i}
              className={`spot__note spot__note--${n.side}`}
              style={{ top: `${n.y}%`, '--i': i } as CSSProperties}
            >
              <span className="spot__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="spot__text">{n.text[lang]}</span>
            </li>
          ))}
        </ol>
      </div>
      {caption && <figcaption className="figure__cap">{pick(caption, lang)}</figcaption>}
    </figure>
  );
}
