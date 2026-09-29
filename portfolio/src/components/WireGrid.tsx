import type { CSSProperties } from 'react';
import { pick } from '../i18n/pick';
import type { DeviceKind, Lang, Localized, SlotImage, WireTile } from '../types';
import { Device, ScreenImg } from './Device';

type Props = {
  tiles: WireTile[];
  notes: { n?: number; text: Localized }[];
  cols?: number;
  device?: DeviceKind;
  notesLabel?: Localized;
  lang: Lang;
  mob: boolean;
  enlargeLabel: string;
  onEnlarge: (img: SlotImage) => void;
};

/**
 * A round of wireframes at one size, in a plain outline rather than a device,
 * with numbered pins on what the next round changed. The pins are decorative;
 * the list under the grid carries the same numbers as text.
 */
export function WireGrid({ tiles, notes, cols, device = 'phone', notesLabel, lang, mob, enlargeLabel, onEnlarge }: Props) {
  return (
    <div className="wires">
      <div className="wires__ground">
        <ol
          role="list"
          className={`wires__grid${mob ? ' wires__grid--mob' : ''}${device === 'browser' ? ' wires__grid--browser' : ''}`}
          style={cols && !mob ? ({ '--wcols': cols } as CSSProperties) : undefined}
        >
          {tiles.map((tile, i) => {
            const caption = pick(tile.caption, lang);
            return (
              <li key={i} className={`wires__tile${tile.screen ? '' : ' wires__tile--ghost'}`}>
                <div className="wires__frame">
                  {device === 'browser' && tile.screen ? (
                    <div className="wires__sheet" style={{ aspectRatio: `${tile.screen.w} / ${tile.screen.h}` }}>
                      <ScreenImg screen={tile.screen} lang={lang} />
                    </div>
                  ) : (
                    <Device kind="phone" className="device--wire">
                      {tile.screen ? (
                        <ScreenImg screen={tile.screen} lang={lang} />
                      ) : (
                        <p className="wires__ghost">{tile.ghost?.[lang]}</p>
                      )}
                    </Device>
                  )}
                  {tile.screen && (
                    <button
                      type="button"
                      className="figure__zoom wires__zoom"
                      aria-label={`${enlargeLabel}: ${caption}`}
                      onClick={() =>
                        onEnlarge(
                          device === 'browser'
                            ? { ...tile.screen!, caption: tile.caption }
                            : { ...tile.screen!, caption: tile.caption, device: 'phone', wire: true },
                        )
                      }
                    />
                  )}
                  {tile.pins?.map((p) => (
                    <span
                      key={p.n}
                      className="wires__pin"
                      style={{ left: `${p.x}%`, top: `${p.y}%` } as CSSProperties}
                      aria-hidden="true"
                    >
                      {p.n}
                    </span>
                  ))}
                </div>
                <p className="figure__cap wires__cap">{caption}</p>
              </li>
            );
          })}
        </ol>
      </div>

      {notes.length > 0 && (
        <div className="wires__notes">
          {notesLabel && <h4 className="wires__notes-label">{notesLabel[lang]}</h4>}
          <ol role="list" className="wires__list">
            {notes.map((n, i) => (
              <li key={i} className={`wires__note${n.n ? '' : ' wires__note--added'}`}>
                <span className="wires__n" aria-hidden="true">
                  {n.n ?? '+'}
                </span>
                <span>{n.text[lang]}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
