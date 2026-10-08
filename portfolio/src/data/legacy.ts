/**
 * Case-study paths from before the React redesign, when each case was a static
 * page at /cases/<slug>.html. Those links are still out there (applications,
 * posts, messages), so each slug resolves to the case it became. Read by the
 * build (redirect stubs, prerender.ts) and by the router, so the two cannot
 * drift apart.
 *
 * Only investiq is confirmed against the old site; the other variants are the
 * likely spellings and cost nothing if unused. Add a slug here when a dead
 * link turns up.
 */
export const LEGACY_CASE_SLUGS: Record<string, string> = {
  investiq: 'investiq',
  'invest-iq': 'investiq',
  pulse: 'pulse',
  'pulse-analytics': 'pulse',
  pulseanalytics: 'pulse',
  casado: 'casado',
  'casado-doces': 'casado',
  casadodoces: 'casado',
  forge: 'forge',
  aether: 'aether',
  reloop: 'reloop',
};

/** "investiq.html" or "investiq" -> the case id, or undefined for an unknown slug. */
export function legacyCaseId(file: string): string | undefined {
  return LEGACY_CASE_SLUGS[file.replace(/\.html$/i, '').toLowerCase()];
}
