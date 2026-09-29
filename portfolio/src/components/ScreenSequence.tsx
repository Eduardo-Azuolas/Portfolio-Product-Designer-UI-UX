import { useEffect, useRef, useState } from 'react';
import type { Lang, SequenceStep } from '../types';
import { Device, ScreenImg } from './Device';

type Props = {
  steps: SequenceStep[];
  lang: Lang;
  /** Below 900px the sticky pairing has no room; the steps become a rail. */
  mob: boolean;
  /** Accessible name of the rail on mobile. */
  label: string;
};

const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * A flow told one screen at a time. On desktop the phone stays pinned while
 * the steps scroll past it, and the screen follows whichever step sits in the
 * middle of the viewport. On mobile each step carries its own phone in a
 * horizontal rail. The step text is the content; the screens are decorative.
 */
export function ScreenSequence({ steps, lang, mob, label }: Props) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (mob) return;
    const nodes = refs.current.filter((n): n is HTMLLIElement => Boolean(n));
    // A thin band across the middle of the viewport: whichever step crosses it
    // is the one being read.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = nodes.indexOf(e.target as HTMLLIElement);
          if (i >= 0) setActive(i);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [mob, steps.length]);

  if (mob) {
    return (
      <ol role="list" className="seq-rail" tabIndex={0} aria-label={label} data-thin-scroll>
        {steps.map((s, i) => (
          <li key={i} className="seq-rail__item">
            <Device kind="phone">
              <ScreenImg screen={s.screen} lang={lang} />
            </Device>
            <div className="seq__title">
              <span className="seq__n">{pad2(i + 1)}</span>
              {s.title[lang]}
            </div>
            <p className="seq__body">{s.body[lang]}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className="seq">
      <ol role="list" className="seq__steps">
        {steps.map((s, i) => (
          <li
            key={i}
            ref={(n) => {
              refs.current[i] = n;
            }}
            className="seq__step"
            aria-current={i === active ? 'step' : undefined}
          >
            <div className="seq__title">
              <span className="seq__n">{pad2(i + 1)}</span>
              {s.title[lang]}
            </div>
            <p className="seq__body">{s.body[lang]}</p>
          </li>
        ))}
      </ol>

      <div className="seq__stick" aria-hidden="true">
        <Device kind="phone" className="seq__device">
          {steps.map((s, i) => (
            <ScreenImg
              key={i}
              screen={s.screen}
              lang={lang}
              eager={i === 0}
              className={`seq__img${i === active ? ' is-active' : ''}`}
            />
          ))}
        </Device>
        <div className="seq__meter">
          <span className="seq__count">
            {pad2(active + 1)} / {pad2(steps.length)}
          </span>
          <span className="seq__ticks">
            {steps.map((_, i) => (
              <i key={i} className={i <= active ? 'is-on' : undefined} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
