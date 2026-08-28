import { useEffect, useState } from 'react';

/**
 * Tracks which `[data-sec]` section is in the reading band, for the
 * case-study figure index. `key` re-scans when the sections change.
 */
export function useScrollSpy(key: string, initial: string): string {
  const [active, setActive] = useState(initial);

  useEffect(() => setActive(initial), [key, initial]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-sec]');
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const sec = e.target.getAttribute('data-sec');
          if (sec) setActive(sec);
        });
      },
      { rootMargin: '-42% 0px -52% 0px' },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [key]);

  return active;
}
