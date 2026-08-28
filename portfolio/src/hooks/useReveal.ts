import { useEffect } from 'react';

function show(node: HTMLElement, reduced: boolean) {
  node.style.opacity = '1';
  node.style.transform = 'none';
  if (reduced) return;
  node.querySelectorAll<HTMLElement>('[data-line]').forEach((line) => {
    line.style.animation = 'pbDraw 1.125s cubic-bezier(.2,.8,.2,1) forwards';
  });
}

/**
 * Fades in every `[data-reveal]` element as it enters the viewport and draws
 * the hairlines inside it. `key` should change whenever the page content does,
 * so freshly mounted sections get observed.
 */
export function useReveal(key: string, reduced: boolean): void {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduced) {
      nodes.forEach((n) => show(n, true));
      return;
    }

    // An IntersectionObserver reports on every target it is given, in view or
    // not, so a single callback proves the API works.
    let observing = false;

    const io = new IntersectionObserver(
      (entries) => {
        observing = true;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          show(e.target as HTMLElement, false);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.08 },
    );
    nodes.forEach((n) => io.observe(n));

    // Safety net for a browser where the observer never reports at all. It used
    // to fire unconditionally, which revealed every section off-screen at 1.4s
    // and left nothing for the scroll to do.
    const fallback = window.setTimeout(() => {
      if (observing) return;
      nodes.forEach((n) => show(n, false));
    }, 1400);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [key, reduced]);
}
