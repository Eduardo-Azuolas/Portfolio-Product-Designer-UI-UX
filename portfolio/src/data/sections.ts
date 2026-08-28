import type { SectionKey } from '../types';

/** The 13 case-study sections, in the order they appear on the sheet. */
export const SECTIONS: ReadonlyArray<{ key: SectionKey; en: string; pt: string }> = [
  { key: 'context', en: 'Context', pt: 'Contexto' },
  { key: 'problem', en: 'Problem', pt: 'Problema' },
  { key: 'goals', en: 'Goals', pt: 'Objetivos' },
  { key: 'research', en: 'Research', pt: 'Pesquisa' },
  { key: 'insights', en: 'Insights', pt: 'Insights' },
  { key: 'strategy', en: 'Strategy', pt: 'Estratégia' },
  { key: 'exploration', en: 'Exploration', pt: 'Exploração' },
  { key: 'uxflow', en: 'UX Flow', pt: 'Fluxo UX' },
  { key: 'ui', en: 'UI Design', pt: 'Design de UI' },
  { key: 'ds', en: 'Design System', pt: 'Design System' },
  { key: 'validation', en: 'Validation', pt: 'Validação' },
  { key: 'outcome', en: 'Outcome', pt: 'Resultado' },
  { key: 'learnings', en: 'Learnings', pt: 'Aprendizados' },
];
