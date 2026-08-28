import { useEffect } from 'react';

/**
 * Publishes normalised pointer position as --pbx / --pby on the root element.
 * The backdrop grids and hero drawing read those to drift a few pixels.
 * Pointer-only: touch devices get a static sheet.
 */
export function useParallax(enabled: boolean): void {
  useEffect(() => {
    const root = document.documentElement.style;
    const clear = () => {
      root.removeProperty('--pbx');
      root.removeProperty('--pby');
    };

    if (!enabled || !window.matchMedia?.('(hover:hover)').matches) {
      clear();
      return;
    }

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      const { clientX, clientY } = e;
      raf = requestAnimationFrame(() => {
        raf = 0;
        root.setProperty('--pbx', ((clientX / window.innerWidth - 0.5) * 2).toFixed(3));
        root.setProperty('--pby', ((clientY / window.innerHeight - 0.5) * 2).toFixed(3));
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
      clear();
    };
  }, [enabled]);
}
