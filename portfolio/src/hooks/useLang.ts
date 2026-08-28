import { useCallback, useState } from 'react';
import type { Lang } from '../types';

/**
 * Language preference. Every page load starts in English by design — the
 * choice lives for the session only and is deliberately not persisted.
 */
export function useLang(): [Lang, (next: Lang) => void] {
  const [lang, setLang] = useState<Lang>('en');
  return [lang, useCallback((next: Lang) => setLang(next), [])];
}
