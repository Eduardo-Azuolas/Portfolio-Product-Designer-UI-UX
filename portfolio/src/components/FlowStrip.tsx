import type { CSSProperties } from 'react';
import type { Lang, SequenceStep, SlotImage } from '../types';
import { Device, ScreenImg } from './Device';

type Props = {
  steps: SequenceStep[];
  lang: Lang;
  mob: boolean;
  enlargeLabel: string;
  onEnlarge: (img: SlotImage) => void;
};

/**
 * A flow laid out as a filmstrip: every screen at once, left to right, on a
 * numbered rail that fills as the strip scrolls into view. Where the sequence
 * shows one screen at a time, this shows the whole run and its order, which is
 * the point when the flow itself is the argument. Below 900px it becomes a
 * snapping rail.
 */
export function FlowStrip({ steps, lang, mob, enlargeLabel, onEnlarge }: Props) {
  return (
    <div className={`strip${mob ? ' strip--rail' : ''}`} style={{ '--n': steps.length } as CSSProperties}>
      {!mob && (
        <div className="strip__track" aria-hidden="true">
          <i className="strip__fill" />
        </div>
      )}
      <ol role="list" className="strip__list" tabIndex={mob ? 0 : undefined}>
        {steps.map((step, i) => (
          <li key={i} className="strip__step" style={{ '--i': i } as CSSProperties}>
            <span className="strip__node" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="strip__frame">
              <Device kind="phone">
                <ScreenImg screen={step.screen} lang={lang} />
              </Device>
              <button
                type="button"
                className="figure__zoom strip__zoom"
                aria-label={`${enlargeLabel}: ${step.title[lang]}`}
                onClick={() => onEnlarge({ ...step.screen, caption: step.title, device: 'phone' })}
              />
            </div>
            <h4 className="strip__title">{step.title[lang]}</h4>
            <p className="strip__body">{step.body[lang]}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
