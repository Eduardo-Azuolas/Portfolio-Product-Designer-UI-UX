import { useEffect } from 'react';

/** Write the measured pixel size into the ruler's label. */
function writeDim(group: Element) {
  const label = group.querySelector('[data-dim-val]');
  if (!label) return;
  const el = group as HTMLElement;
  const px = group.getAttribute('data-dim') === 'v' ? el.offsetHeight : el.offsetWidth;
  label.setAttribute('data-px', px > 0 ? `${Math.round(px)} PX` : '— PX');
}

/**
 * Drives the drafting rulers: measures every `[data-dim]` group, keeps the
 * label in sync on resize, and marks in-view rulers ready so they draw
 * themselves on browsers without scroll-driven animations.
 */
export function useDims(key: string, reduced: boolean): void {
  useEffect(() => {
    const ro = 'ResizeObserver' in window ? new ResizeObserver((es) => es.forEach((e) => writeDim(e.target))) : null;
    const observed = new WeakSet<Element>();

    const measureAll = () => {
      document.querySelectorAll('[data-dim]').forEach((group) => {
        if (ro && !observed.has(group)) {
          observed.add(group);
          ro.observe(group);
        }
        writeDim(group);
      });
    };

    const markReady = () => {
      if (reduced) return;
      document.querySelectorAll('[data-dim]:not([data-dim-ready])').forEach((group) => {
        const r = group.getBoundingClientRect();
        if (!(r.top < window.innerHeight && r.bottom > -50)) return;
        if (!group.querySelector('[data-dimline]')) return;
        group.setAttribute('data-dim-ready', '1');
      });
    };

    // Layout settles in stages (fonts, images, scroll-driven reveals).
    const timers = [0, 120, 400, 900, 1600].map((ms) =>
      window.setTimeout(() => {
        measureAll();
        markReady();
      }, ms),
    );

    const onScroll = () => markReady();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      timers.forEach(window.clearTimeout);
      ro?.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [key, reduced]);
}
