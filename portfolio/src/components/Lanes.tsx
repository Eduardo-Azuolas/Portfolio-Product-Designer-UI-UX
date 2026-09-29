import type { CSSProperties } from 'react';
import { pick } from '../i18n/pick';
import type { Lane, LaneLink, Lang, Localized, MaybeLocalized, SlotImage } from '../types';
import { Device, ScreenImg } from './Device';

type Props = {
  cols: number;
  lanes: [Lane, Lane];
  links: LaneLink[];
  notesLabel?: Localized;
  caption?: MaybeLocalized;
  lang: Lang;
  mob: boolean;
  enlargeLabel: string;
  onEnlarge: (img: SlotImage) => void;
};

/**
 * Two apps laid out as swimlanes, one above the other, with each screen in the
 * column of the step it belongs to. Where a choice on one side decides what the
 * other side sees, a numbered link crosses the gap between the lanes; the list
 * underneath says what each link carries. Columns one lane leaves empty stay
 * empty — the gap is the information. Below 900px the board scrolls sideways.
 */
export function Lanes({ cols, lanes, links, notesLabel, caption, lang, mob, enlargeLabel, onEnlarge }: Props) {
  const lane = (l: Lane, row: number, edge: 'a' | 'b') =>
    l.shots.map((s) => {
      const cap = s.caption[lang];
      return (
        <div
          key={`${edge}-${s.col}`}
          className={`lanes__shot lanes__shot--${edge}`}
          style={{ gridColumn: s.col, gridRow: row } as CSSProperties}
        >
          <div className="lanes__frame">
            <Device kind="phone">
              <ScreenImg screen={s.screen} lang={lang} />
            </Device>
            <button
              type="button"
              className="figure__zoom lanes__zoom"
              aria-label={`${enlargeLabel}: ${cap}`}
              onClick={() => onEnlarge({ ...s.screen, caption: s.caption, device: 'phone' })}
            />
          </div>
          <p className="figure__cap lanes__cap">{cap}</p>
        </div>
      );
    });

  return (
    <figure className={`lanes${mob ? ' lanes--scroll' : ''}`} style={{ '--lcols': cols } as CSSProperties}>
      <div className="lanes__ground">
        <div className="lanes__grid">
          <p className="lanes__tag lanes__tag--a" style={{ gridRow: 1 }}>
            {lanes[0].tag[lang]}
          </p>
          {lane(lanes[0], 2, 'a')}
          {links.map((k, i) => (
            <span key={k.col} className="lanes__link" style={{ gridColumn: k.col, gridRow: 3 } as CSSProperties} aria-hidden="true">
              <i>{String(i + 1).padStart(2, '0')}</i>
            </span>
          ))}
          {lane(lanes[1], 4, 'b')}
          <p className="lanes__tag lanes__tag--b" style={{ gridRow: 5 }}>
            {lanes[1].tag[lang]}
          </p>
        </div>
      </div>
      {links.length > 0 && (
        <div className="lanes__notes">
          {notesLabel && <h4 className="wires__notes-label">{notesLabel[lang]}</h4>}
          <ol role="list" className="wires__list">
            {links.map((k, i) => (
              <li key={k.col} className="wires__note">
                <span className="wires__n lanes__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{k.text[lang]}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
      {caption && <figcaption className="figure__cap">{pick(caption, lang)}</figcaption>}
    </figure>
  );
}
