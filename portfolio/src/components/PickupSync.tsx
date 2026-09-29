import type { CSSProperties } from 'react';
import { pick } from '../i18n/pick';
import type { Lang, SyncScene, SyncSide } from '../types';
import { Device, ScreenImg } from './Device';

type Props = SyncScene & { lang: Lang; mob: boolean; eager?: boolean };

/*
 * Geometry of the desktop stage, in percentages of its box. The box is RATIO
 * wide per unit of height; a phone PHONE_W wide is 2.092 times as tall as it
 * is wide (a 390×844 screen inside a bezel of 3.1% of the phone's width).
 */
const RATIO = 1.55;
const PHONE_W = 25;
const PHONE_TOP = 12;
const LEFT_X = 5;
const RIGHT_X = 70;
const BEZEL = 0.031 * PHONE_W;
const SCREEN_H = 0.938 * PHONE_W * (844 / 390) * RATIO;
const TICKET_L = 36;
const TICKET_R = 64;
const TICKET_Y = 52;

/** Where the middle of a side's mark sits, as a percentage of the stage height. */
const markY = (s: SyncSide) => PHONE_TOP + BEZEL * RATIO + ((s.mark.y + s.mark.h / 2) / 100) * SCREEN_H;

/**
 * One order seen from both ends. The customer's phone and the baker's phone
 * stand apart; between them sits the calendar event the order became, and a
 * thread runs from the event into the row on each screen where that same
 * order shows up. Nothing is interactive — the point is that the two sides
 * read the same record — so the thread only drifts, and stands still when
 * motion is reduced. On a phone the event sits under the pair instead.
 */
export function PickupSync({ left, right, event, caption, lang, mob, eager }: Props) {
  const side = (s: SyncSide, edge: 'l' | 'r') => (
    <div
      className={`sync__side sync__side--${edge}`}
      style={mob ? undefined : ({ left: `${edge === 'l' ? LEFT_X : RIGHT_X}%`, width: `${PHONE_W}%` } as CSSProperties)}
    >
      <p className="sync__tag">{s.tag[lang]}</p>
      <Device kind="phone">
        <ScreenImg screen={s.screen} lang={lang} eager={eager} />
        <span className="sync__mark" style={{ top: `${s.mark.y}%`, height: `${s.mark.h}%` }} aria-hidden="true" />
      </Device>
    </div>
  );

  const yl = markY(left);
  const yr = markY(right);
  const lx = LEFT_X + PHONE_W - BEZEL;
  const rx = RIGHT_X + BEZEL;

  return (
    <figure className={`sync${mob ? ' sync--stacked' : ''}`}>
      <div className="sync__stage" style={mob ? undefined : ({ aspectRatio: `${RATIO}` } as CSSProperties)}>
        {!mob && (
          <svg className="sync__thread" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={`M ${lx} ${yl} C ${lx + 4} ${yl}, ${TICKET_L - 4} ${TICKET_Y}, ${TICKET_L} ${TICKET_Y}`} />
            <path d={`M ${TICKET_R} ${TICKET_Y} C ${TICKET_R + 4} ${TICKET_Y}, ${rx - 4} ${yr}, ${rx} ${yr}`} />
          </svg>
        )}
        {side(left, 'l')}
        <div
          className="sync__event"
          style={mob ? undefined : ({ left: `${TICKET_L}%`, width: `${TICKET_R - TICKET_L}%`, top: `${TICKET_Y}%` } as CSSProperties)}
        >
          <p className="sync__source">
            <i aria-hidden="true" />
            {event.source[lang]}
          </p>
          <div className="sync__when">
            <span className="sync__date" aria-hidden="true">
              <b>{event.weekday[lang]}</b>
              <strong>{event.day}</strong>
              <b>{event.month[lang]}</b>
            </span>
            <span className="sync__head">
              <span className="sync__time">{event.time[lang]}</span>
              <span className="sync__title">{event.title[lang]}</span>
            </span>
          </div>
          <ul role="list" className="sync__lines">
            {event.lines.map((l, i) => (
              <li key={i}>{l[lang]}</li>
            ))}
          </ul>
          <ul role="list" className="sync__guests">
            {event.guests.map((g, i) => (
              <li key={i}>{g[lang]}</li>
            ))}
          </ul>
        </div>
        {side(right, 'r')}
      </div>
      {caption && <figcaption className="figure__cap">{pick(caption, lang)}</figcaption>}
    </figure>
  );
}
