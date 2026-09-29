import { useEffect, useSyncExternalStore } from 'react';

/*
 * The section in the reading band, kept outside React state. Only the few
 * components that mark it (the header's WORK link, the case index) subscribe,
 * so crossing a section boundary re-renders a list of links instead of the
 * whole page with every figure on it.
 */
let current = 'hero';
const listeners = new Set<() => void>();

function set(next: string) {
  if (next === current) return;
  current = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The `[data-sec]` key currently in the reading band. */
export function useActiveSection(): string {
  return useSyncExternalStore(subscribe, () => current, () => current);
}

/**
 * Watches every `[data-sec]` section and publishes the one in the reading
 * band. `key` re-scans when the sections change.
 */
export function useScrollSpy(key: string, initial: string): void {
  useEffect(() => {
    set(initial);
    const nodes = document.querySelectorAll<HTMLElement>('[data-sec]');
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const sec = e.target.getAttribute('data-sec');
          if (sec) set(sec);
        });
      },
      { rootMargin: '-42% 0px -52% 0px' },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [key, initial]);
}
