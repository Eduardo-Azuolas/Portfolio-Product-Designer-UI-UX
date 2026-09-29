import type { Lang } from '../types';

/**
 * The cover that fronts each case on the home sheet: one composed image per
 * language, drawn on the "Thumbnails" page of the case's Figma file from its
 * own Hi-Fi v3 screens and exported at 1600×1000 (16:10).
 *
 * Kept apart from media.ts on purpose: the home sheet needs only these paths,
 * and importing media.ts would pull every case's figure data into the first
 * download.
 */
export const COVER = { w: 1600, h: 1000 } as const;

export function coverSrc(caseId: string, lang: Lang): string {
  return `${import.meta.env.BASE_URL}assets/cases/${caseId}/${lang}/thumb.webp`;
}
