import { useEffect, useState } from 'react';

export type Viewport = {
  w: number;
  /** Below the two-column threshold. */
  mob: boolean;
  /** Phone-width: single column, abbreviated nav. */
  narrow: boolean;
  /** Wide enough to show the drafting rulers in the left gutter. */
  rulers: boolean;
  /** Wide enough for the technical hero drawing. */
  heroArt: boolean;
};

function read(w: number): Viewport {
  return {
    w,
    mob: w < 900,
    narrow: w < 680,
    rulers: w >= 1360,
    heroArt: w >= 1280,
  };
}

export function useViewport(): Viewport {
  // Measured during the first render, not after it: a hardcoded default made
  // every phone paint the desktop layout and reflow once the effect ran.
  const [vp, setVp] = useState<Viewport>(() => read(window.innerWidth));

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      // Resize fires far faster than we can usefully re-render; coalesce to one
      // update per frame.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setVp(read(window.innerWidth));
      });
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return vp;
}
