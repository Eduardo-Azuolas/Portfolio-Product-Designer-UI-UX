import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { pick } from '../i18n/pick';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Lang, ThemeCompare } from '../types';
import { Device, ScreenImg } from './Device';

type Props = ThemeCompare & { lang: Lang; eager?: boolean };

const ARIA = {
  en: 'Compare the light and dark themes: move the handle',
  pt: 'Compare os temas claro e escuro: mova o controle',
};

/** Where the handle travels on the one-time sweep, as [position, ms] stops. */
const SWEEP: [number, number][] = [
  [50, 0],
  [22, 900],
  [78, 2100],
  [50, 2900],
];

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/**
 * One screen in two themes, split by a handle. The light export sits
 * underneath; the dark one is clipped to the right of the handle, so the
 * seam runs through identical layout and the only thing that changes is what
 * the tokens resolve to. A native range input drives it, which gives keyboard
 * and screen-reader support for free; the drawn handle is decoration. On first
 * view the handle sweeps once to show that it moves, unless motion is reduced
 * or the reader has already touched it.
 */
export function ThemeSlider({ before, after, labels, url, caption, lang, eager }: Props) {
  const [pos, setPos] = useState(50);
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const touched = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (reduced || !el || typeof IntersectionObserver === 'undefined') return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || touched.current) return;
        io.disconnect();
        const start = performance.now();
        const end = SWEEP[SWEEP.length - 1][1];
        const tick = (now: number) => {
          if (touched.current) return;
          const t = Math.min(now - start, end);
          let i = 1;
          while (i < SWEEP.length - 1 && t > SWEEP[i][1]) i++;
          const [p0, t0] = SWEEP[i - 1];
          const [p1, t1] = SWEEP[i];
          setPos(p0 + (p1 - p0) * ease((t - t0) / (t1 - t0)));
          if (t < end) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const take = (v: number) => {
    touched.current = true;
    setPos(v);
  };

  return (
    <figure ref={root} className="theme" style={{ '--pos': `${pos}%` } as CSSProperties}>
      <div className="theme__stage">
        <Device kind="browser" url={url}>
          <ScreenImg screen={before} lang={lang} eager={eager} />
          <div className="theme__after">
            <ScreenImg screen={after} lang={lang} eager={eager} />
          </div>
          <span className="theme__line" aria-hidden="true">
            <i className="theme__knob" />
          </span>
          <span className={`theme__tag theme__tag--l${pos < 14 ? ' is-hidden' : ''}`} aria-hidden="true">
            {labels[0][lang]}
          </span>
          <span className={`theme__tag theme__tag--r${pos > 86 ? ' is-hidden' : ''}`} aria-hidden="true">
            {labels[1][lang]}
          </span>
          <input
            className="theme__range"
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(pos)}
            aria-label={ARIA[lang]}
            aria-valuetext={`${labels[0][lang]} ${Math.round(pos)}% · ${labels[1][lang]} ${100 - Math.round(pos)}%`}
            onPointerDown={() => (touched.current = true)}
            onChange={(e) => take(Number(e.currentTarget.value))}
          />
        </Device>
      </div>
      {caption && <figcaption className="figure__cap">{pick(caption, lang)}</figcaption>}
    </figure>
  );
}
