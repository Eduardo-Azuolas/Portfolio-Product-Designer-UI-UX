import type { Lang } from '../types';

export type AboutBlock = { fig: string; title: string; body: string };

export const ABOUT: Record<Lang, AboutBlock[]> = {
  en: [
    {
      fig: 'FIG. 01 — WHAT I DO',
      title: 'Product design, discovery to handoff',
      body: 'I design responsive web and app experiences end to end: discovery and user interviews, flows and wireframes, high-fidelity UI in Figma, then style guides and documentation that engineers can actually build from. I work in components, variants and reusable patterns because a screen that cannot scale is not a solution.',
    },
    {
      fig: 'FIG. 02 — HOW I WORK',
      title: 'Reasoning first, rendering second',
      body: 'I start from the decision the user is trying to make and work backwards to the interface. Research is short and pointed. Exploration is divergent and disposable. I test before development rather than after — usability validation is where I find the expensive mistakes while they are still cheap.',
    },
    {
      fig: 'FIG. 03 — WHAT I BRING FROM BEFORE',
      title: 'A decade of designing under real constraints',
      body: 'Ten years designing physical and spatial products left me with one habit that matters here: you cannot repaint a mould after tooling, so you define the mechanism before the surface and validate early. Applied to process, that thinking cut revision cycles by 22% and improved project efficiency by 30%.',
    },
    {
      fig: 'FIG. 04 — WHAT I AM LOOKING FOR',
      title: 'Teams that argue about the problem',
      body: 'I am equally comfortable in a startup where I own everything and in a mid-size product org or agency where I own one surface well. What I need is a team that treats the problem statement as the real deliverable. Based in São Paulo, working remotely across time zones.',
    },
  ],
  pt: [
    {
      fig: 'FIG. 01 — O QUE EU FAÇO',
      title: 'Design de produto, da descoberta ao handoff',
      body: 'Desenho experiências web e app responsivas de ponta a ponta: descoberta e entrevistas, fluxos e wireframes, UI de alta fidelidade no Figma e depois style guides e documentação que o time de engenharia consegue executar. Trabalho com componentes, variants e padrões reutilizáveis, porque uma tela que não escala não é solução.',
    },
    {
      fig: 'FIG. 02 — COMO EU TRABALHO',
      title: 'Primeiro o raciocínio, depois o render',
      body: 'Começo pela decisão que o usuário está tentando tomar e volto até a interface. A pesquisa é curta e direta. A exploração é divergente e descartável. Testo antes do desenvolvimento, não depois — a validação de usabilidade é onde encontro os erros caros enquanto ainda são baratos.',
    },
    {
      fig: 'FIG. 03 — O QUE EU TRAGO DE ANTES',
      title: 'Uma década projetando sob restrições reais',
      body: 'Dez anos desenhando produtos físicos e espaciais me deixaram um hábito que importa aqui: não se repinta um molde depois da ferramentaria, então você define o mecanismo antes da superfície e valida cedo. Aplicado ao processo, esse raciocínio reduziu ciclos de revisão em 22% e melhorou a eficiência dos projetos em 30%.',
    },
    {
      fig: 'FIG. 04 — O QUE EU PROCURO',
      title: 'Times que discutem o problema',
      body: 'Fico igualmente à vontade numa startup onde faço tudo e numa empresa média ou agência onde cuido bem de uma superfície. O que preciso é de um time que trate a definição do problema como a entrega real. Baseado em São Paulo, trabalhando remotamente entre fusos.',
    },
  ],
};
