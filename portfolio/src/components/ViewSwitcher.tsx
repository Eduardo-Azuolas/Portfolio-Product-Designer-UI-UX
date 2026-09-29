import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { pick } from '../i18n/pick';
import type { DeviceKind, Lang, MaybeLocalized, SwitchTab } from '../types';
import { Device, ScreenImg } from './Device';

type Props = {
  tabs: SwitchTab[];
  device: DeviceKind;
  url?: string;
  numbered?: boolean;
  caption?: MaybeLocalized;
  lang: Lang;
  mob: boolean;
};

/**
 * One device, several views of it behind a tab list. Each tab carries the
 * question its view answers. It advances on its own while on screen — the
 * progress bar under the active tab is the timer, so hovering or focusing the
 * component pauses it — and stops for good once someone picks a tab. Reduced
 * motion removes the bar's animation, which removes the autoplay with it.
 */
export function ViewSwitcher({ tabs, device, url, numbered, caption, lang, mob }: Props) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pickTab = (i: number, focus = false) => {
    setAuto(false);
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = mob ? ['ArrowRight'] : ['ArrowDown', 'ArrowRight'];
    const prev = mob ? ['ArrowLeft'] : ['ArrowUp', 'ArrowLeft'];
    if (next.includes(e.key)) pickTab((i + 1) % tabs.length, true);
    else if (prev.includes(e.key)) pickTab((i - 1 + tabs.length) % tabs.length, true);
    else if (e.key === 'Home') pickTab(0, true);
    else if (e.key === 'End') pickTab(tabs.length - 1, true);
    else return;
    e.preventDefault();
  };

  return (
    <figure
      ref={root}
      className={`switch${mob ? ' switch--mob' : ''}${auto && inView ? ' is-running' : ''}`}
    >
      <div className="switch__body">
        <div className="switch__tabs" role="tablist" aria-orientation={mob ? 'horizontal' : 'vertical'}>
          {tabs.map((t, i) => {
            const on = i === active;
            return (
              <button
                key={i}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={on}
                aria-controls={`${id}-panel`}
                tabIndex={on ? 0 : -1}
                className={`switch__tab${on ? ' is-on' : ''}`}
                onClick={() => pickTab(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className="switch__label">
                  {numbered && <span className="switch__n">{String(i + 1).padStart(2, '0')}</span>}
                  {t.label[lang]}
                </span>
                {!mob && <span className="switch__note">{t.note[lang]}</span>}
                <span className="switch__bar" aria-hidden="true">
                  {on && auto && (
                    <i
                      className="switch__fill"
                      onAnimationEnd={() => setActive((a) => (a + 1) % tabs.length)}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="switch__stage"
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
        >
          <Device kind={device} url={url}>
            {tabs.map((t, i) => (
              <ScreenImg
                key={i}
                screen={t.screen}
                lang={lang}
                className={`switch__img${i === active ? ' is-active' : ''}`}
                hidden={i !== active}
                style={{ '--i': i } as CSSProperties}
              />
            ))}
          </Device>
          {mob && <p className="switch__note switch__note--mob">{tabs[active].note[lang]}</p>}
        </div>
      </div>
      {caption && <figcaption className="figure__cap">{pick(caption, lang)}</figcaption>}
    </figure>
  );
}
