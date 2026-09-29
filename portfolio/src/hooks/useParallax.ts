import { useEffect } from 'react';

const TARGETS = '[data-parallax]';

/**
 * Publishes normalised pointer position as --pbx / --pby on every
 * `[data-parallax]` element: the backdrop grids, the hero drawing and the
 * device scenes, which drift a few pixels with it. Pointer-only: touch devices
 * get a static sheet.
 *
 * Scoped to those elements rather than written on <html>: a custom property on
 * the root is inherited by every node, so each pointer frame used to restyle
 * the whole document — on a case sheet, most of the cost of moving the mouse.
 */
export function useParallax(enabled: boolean, key: string): void {
  useEffect(() => {
    const targets = () => document.querySelectorAll<HTMLElement>(TARGETS);
    const clear = () =>
      targets().forEach((el) => {
        el.style.removeProperty('--pbx');
        el.style.removeProperty('--pby');
      });

    if (!enabled || !window.matchMedia?.('(hover:hover)').matches) {
      clear();
      return;
    }

    let raf = 0;
    let x = '0';
    let y = '0';
    const onMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const nx = ((clientX / window.innerWidth - 0.5) * 2).toFixed(2);
        const ny = ((clientY / window.innerHeight - 0.5) * 2).toFixed(2);
        // Two decimals is under a tenth of a pixel of drift; skipping repeats
        // saves a style pass on every frame the pointer barely moved.
        if (nx === x && ny === y) return;
        x = nx;
        y = ny;
        targets().forEach((el) => {
          el.style.setProperty('--pbx', x);
          el.style.setProperty('--pby', y);
        });
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
      clear();
    };
  }, [enabled, key]);
}
