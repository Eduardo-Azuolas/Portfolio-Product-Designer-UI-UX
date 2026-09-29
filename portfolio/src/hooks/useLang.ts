import { useCallback, useState } from 'react';
import type { Lang } from '../types';

const KEY = 'lang';

function stored(): Lang {
  try {
    return localStorage.getItem(KEY) === 'pt' ? 'pt' : 'en';
  } catch {
    // Private windows and blocked storage throw; English is the default.
    return 'en';
  }
}

/**
 * Language preference. A first visit starts in English; a choice the visitor
 * makes is remembered, so a Portuguese reader does not switch on every page
 * load.
 */
export function useLang(): [Lang, (next: Lang) => void] {
  const [lang, setLang] = useState<Lang>(stored);
  const choose = useCallback((next: Lang) => {
    setLang(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Not remembered; the choice still applies for this visit.
    }
  }, []);
  return [lang, choose];
}
