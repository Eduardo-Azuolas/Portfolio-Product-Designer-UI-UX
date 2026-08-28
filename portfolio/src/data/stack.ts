import type { Lang, StackGroup } from '../types';

type Group = Record<Lang, [label: string, items: string[]]>;

export const STACK: Group[] = [
  {
    en: ['DESIGN', ['Figma + FigJam', 'Auto Layout', 'Components & variants', 'Figma Make']],
    pt: ['DESIGN', ['Figma + FigJam', 'Auto Layout', 'Componentes & variants', 'Figma Make']],
  },
  {
    en: ['RESEARCH & TESTING', ['UX research', 'User interviews', 'Usability testing', 'Interaction design']],
    pt: ['PESQUISA & TESTES', ['Pesquisa de UX', 'Entrevistas com usuários', 'Testes de usabilidade', 'Design de interação']],
  },
  {
    en: ['SYSTEMS', ['Design systems', 'Style guides', 'Design documentation', 'Dev handoff']],
    pt: ['SISTEMAS', ['Design systems', 'Style guides', 'Documentação de design', 'Handoff para dev']],
  },
  {
    en: ['STRUCTURE', ['User flows', 'Wireframing', 'Prototyping', 'Information architecture']],
    pt: ['ESTRUTURA', ['Fluxos de usuário', 'Wireframes', 'Prototipagem', 'Arquitetura de informação']],
  },
  {
    en: ['BUILD', ['HTML', 'CSS', 'JavaScript', 'React (specialization)']],
    pt: ['CÓDIGO', ['HTML', 'CSS', 'JavaScript', 'React (especialização)']],
  },
  {
    en: ['FROM 10 YRS PHYSICAL', ['Materials & manufacturing', 'Production-ready specs', 'Spatial & retail projects', 'Technical feasibility']],
    pt: ['DE 10 ANOS EM FÍSICO', ['Materiais & manufatura', 'Especificações para produção', 'Projetos espaciais & varejo', 'Viabilidade técnica']],
  },
  {
    en: ['WORKFLOW', ['Notion', 'Miro', 'Agile', 'Claude']],
    pt: ['WORKFLOW', ['Notion', 'Miro', 'Agile', 'Claude']],
  },
  {
    en: ['LANGUAGES', ['Portuguese (native)', 'English (C1)', 'French (basic)']],
    pt: ['IDIOMAS', ['Português (nativo)', 'Inglês (C1)', 'Francês (básico)']],
  },
];

export function stackFor(lang: Lang, groups: Group[]): StackGroup[] {
  return groups.map((g) => {
    const [label, items] = g[lang] ?? g.en;
    return { label, items };
  });
}

/** The About sidebar drops the physical-products and languages groups — they are covered in the prose. */
export const ABOUT_STACK: Group[] = [STACK[0], STACK[1], STACK[2], STACK[3], STACK[4], STACK[6]];
