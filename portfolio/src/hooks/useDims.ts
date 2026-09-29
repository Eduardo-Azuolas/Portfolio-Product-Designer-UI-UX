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

    // Rulers draw themselves once they come into view. An observer instead of
    // a scroll listener: the listener measured every ruler on every scroll
    // event, forcing a layout each time.
    const io = reduced
      ? null
      : new IntersectionObserver(
          (entries) =>
            entries.forEach((e) => {
              if (!e.isIntersecting) return;
              io?.unobserve(e.target);
              if (e.target.querySelector('[data-dimline]')) e.target.setAttribute('data-dim-ready', '1');
            }),
          { rootMargin: '0px 0px 50px 0px' },
        );
    const watched = new WeakSet<Element>();
    const watch = () =>
      document.querySelectorAll('[data-dim]:not([data-dim-ready])').forEach((group) => {
        if (!io || watched.has(group)) return;
        watched.add(group);
        io.observe(group);
      });

    // Layout settles in stages (fonts, images, scroll-driven reveals).
    const timers = [0, 120, 400, 900, 1600].map((ms) =>
      window.setTimeout(() => {
        measureAll();
        watch();
      }, ms),
    );

    return () => {
      timers.forEach(window.clearTimeout);
      ro?.disconnect();
      io?.disconnect();
    };
  }, [key, reduced]);
}
