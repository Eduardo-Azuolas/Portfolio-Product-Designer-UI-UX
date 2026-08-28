import type { SectionKey } from '../types';

/**
 * Default grid tracks for a section's figures, used when a case does not
 * override them in its own media entry. Sections not listed here fall back to
 * a single column.
 */
export const SECTION_COLS: Partial<Record<SectionKey, string>> = {
  research: '1fr 1fr',
  exploration: 'repeat(3,1fr)',
  uxflow: '1fr',
  ui: 'repeat(3,1fr)',
  ds: '1fr',
  validation: '1fr 1fr',
};
