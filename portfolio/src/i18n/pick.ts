import type { Lang, MaybeLocalized } from '../types';

/** Resolve a value that may be a plain string or an { en, pt } pair. */
export function pick(value: MaybeLocalized, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang] || value.en;
}
