import type { CaseMedia } from '../types';

/** Asset path helpers, scoped to one case's folder. */
function paths(caseId: string) {
  // Anchored to the deploy base, never relative: a case is served from /aether,
  // so a relative path would resolve against that segment instead of the site
  // root. BASE_URL always carries its trailing slash.
  const base = `${import.meta.env.BASE_URL}assets/cases/${caseId}`;
  return {
    /** A frame that carries text, exported once per language. */
    both: (name: string) => ({ en: `${base}/en/${name}.webp`, pt: `${base}/pt/${name}.webp` }),
    /** A frame with no text in it — one file serves both languages. */
    shared: (name: string) => `${base}/${name}.webp`,
  };
}


const { both: investiqBoth } = paths('investiq');
/** v2 frames, exported once per language; EN and PT share one height. */
const v2 = (name: string) => investiqBoth(`v2/${name}`);

/**
 * Frames exported from the InvestIQ case study Figma file, v2 pages.
 * Sizes are the exported asset's own pixels, not the display size.
 */
/** v3 screens (Hi-Fi v3 pages): phones at 780px wide, desktops at 1936px. */
const v3 = (name: string) => investiqBoth(`v3/${name}`);
const PHONE = { w: 780, h: 1688 };
/** First-round wireframes, recoloured for the dark sheet, one per language. */
const wire = (name: string) => ({ src: investiqBoth(`wire-v2/${name}`), ...PHONE });
const DESK_W = 1936;

/** InvestIQ's own emerald, for the glow behind its devices. */
const INVESTIQ_GLOW = 'rgba(47, 191, 143, 0.22)';

const investiq: CaseMedia = {
  // The desktop home behind, the phone home and the landing in front: the
  // same numbers on both sizes, which is the point of the product.
  hero: {
    ratio: 1.75,
    glow: INVESTIQ_GLOW,
    url: 'app.investiq.com.br',
    shots: [
      { device: 'browser', src: v3('ui-desktop'), w: DESK_W, h: 1701, x: 3, y: 7, width: 72, depth: 0 },
      { device: 'phone', src: v3('ui-landing'), ...PHONE, x: 61, y: 21, width: 16.5, depth: 1 },
      { device: 'phone', src: v3('ui-home'), ...PHONE, x: 78, y: 9, width: 18.5, depth: 2 },
    ],
    caption: {
      en: 'D1 DESKTOP HOME · 01 LANDING · 07 HOME',
      pt: 'D1 INÍCIO DESKTOP · 01 LANDING · 07 INÍCIO',
    },
  },
  stages: {
    exploration: [
      {
        kind: 'wires',
        label: { en: 'FIRST ROUND — BEFORE THE KEY DECISIONS', pt: 'PRIMEIRA RODADA — ANTES DAS DECISÕES-CHAVE' },
        tiles: [
          { screen: wire('wire-01'), caption: '01 — LANDING', pins: [{ n: 1, x: 82, y: 84 }] },
          { screen: wire('wire-02'), caption: { en: '02 — WELCOME', pt: '02 — BOAS-VINDAS' } },
          { screen: wire('wire-03'), caption: { en: '03 — STEP 1 · CREATE ACCOUNT', pt: '03 — PASSO 1 · CRIAR CONTA' } },
          { screen: wire('wire-04'), caption: { en: '04 — STEP 2 · RISK PROFILE', pt: '04 — PASSO 2 · PERFIL DE RISCO' } },
          { screen: wire('wire-06'), caption: { en: '06 — STEP 4 · AI STRATEGY', pt: '06 — PASSO 4 · ESTRATÉGIA IA' }, pins: [{ n: 2, x: 86, y: 64 }] },
          { screen: wire('wire-07'), caption: { en: '07 — HOME', pt: '07 — INÍCIO' }, pins: [{ n: 3, x: 60, y: 40.5 }] },
          { screen: wire('wire-08'), caption: { en: '08 — SUGGESTIONS', pt: '08 — SUGESTÕES' } },
        ],
        notesLabel: { en: 'WHAT THE NEXT ROUND CHANGED', pt: 'O QUE A RODADA SEGUINTE MUDOU' },
        notes: [
          {
            n: 1,
            text: {
              en: 'Social proof and “featured in” logos. Cut before hi-fi: there were no users or press to show, and nothing goes on screen that would not ship.',
              pt: 'Prova social e logos de “destaque em”. Cortados antes da hi-fi: não havia usuários nem imprensa para mostrar, e nada entra na tela se não fosse para produção.',
            },
          },
          {
            n: 2,
            text: {
              en: '“Start investing” came right after the list. Decision 02 moved the action below the reasons and a projected range.',
              pt: '“Começar a investir” vinha logo depois da lista. A decisão 02 levou a ação para baixo dos motivos e de uma faixa de projeção.',
            },
          },
          {
            n: 3,
            text: {
              en: 'Allocation with no target and no next step. Decision 03 turned it into allocation against the target, plus one suggested move.',
              pt: 'Alocação sem meta e sem próximo passo. A decisão 03 transformou isso em alocação contra a meta, com um próximo passo sugerido.',
            },
          },
          {
            text: {
              en: 'There was no step for connecting accounts. Decision 01 added it as step 3, after the profile explains why the data is needed, and made it skippable.',
              pt: 'Não havia passo para conectar contas. A decisão 01 incluiu o passo 3, depois que o perfil explica por que os dados são necessários, com opção de pular.',
            },
          },
        ],
      },
    ],
    ui: [
      {
        kind: 'sequence',
        label: { en: 'ONBOARDING — FOUR STEPS', pt: 'ONBOARDING — QUATRO PASSOS' },
        steps: [
          {
            screen: { src: v3('ui-landing'), ...PHONE },
            title: { en: 'LANDING', pt: 'LANDING' },
            body: {
              en: 'Show the product before asking for anything. The hero is a preview of the dashboard, not an illustration.',
              pt: 'Mostrar o produto antes de pedir qualquer coisa. O destaque é uma prévia do dashboard, não uma ilustração.',
            },
          },
          {
            screen: { src: v3('ui-step1'), ...PHONE },
            title: { en: 'STEP 1 · CREATE ACCOUNT', pt: 'PASSO 1 · CRIAR CONTA' },
            body: {
              en: 'Three fields and a way back. It takes under two minutes, and the screen says so.',
              pt: 'Três campos e um caminho de volta. Leva menos de dois minutos, e a tela diz isso.',
            },
          },
          {
            screen: { src: v3('ui-step2'), ...PHONE },
            title: { en: 'STEP 2 · RISK PROFILE', pt: 'PASSO 2 · PERFIL DE RISCO' },
            body: {
              en: 'One decision per screen. Four profiles, each with one line of plain language.',
              pt: 'Uma decisão por tela. Quatro perfis, cada um com uma linha em linguagem simples.',
            },
          },
          {
            screen: { src: v3('ui-step3'), ...PHONE },
            title: { en: 'STEP 3 · CONNECT ACCOUNTS', pt: 'PASSO 3 · CONECTAR CONTAS' },
            body: {
              en: 'The ask for data comes third, after the profile explains why it is needed. What InvestIQ can and cannot do sits right above the button.',
              pt: 'O pedido de dados vem em terceiro, depois que o perfil explica por que ele é necessário. O que a InvestIQ pode e não pode fazer fica logo acima do botão.',
            },
          },
          {
            screen: { src: v3('ui-step4'), ...PHONE },
            title: { en: 'STEP 4 · AI STRATEGY', pt: 'PASSO 4 · ESTRATÉGIA IA' },
            body: {
              en: 'The target, the reasons behind it and a projected range with its caveat, all before the first call to action.',
              pt: 'A meta, os motivos por trás dela e uma faixa de projeção com a ressalva, tudo antes do primeiro CTA.',
            },
          },
        ],
      },
      {
        kind: 'spotlight',
        label: { en: 'HOME — WHAT IT ANSWERS', pt: 'INÍCIO — O QUE ELA RESPONDE' },
        device: 'phone',
        screen: { src: v3('ui-home'), ...PHONE },
        notes: [
          {
            y: 25,
            side: 'l',
            text: {
              en: 'How much, across all three accounts, and where it has been heading for twelve months.',
              pt: 'Quanto, somando as três contas, e para onde isso foi nos últimos doze meses.',
            },
          },
          {
            y: 50,
            side: 'r',
            text: {
              en: 'One next step, tied to the gap between 38% in fixed income and the 60% target.',
              pt: 'Um próximo passo, ligado à diferença entre os 38% em renda fixa e a meta de 60%.',
            },
          },
          {
            y: 77,
            side: 'l',
            text: {
              en: 'Allocation against target. Amber marks any class more than 5 points away.',
              pt: 'Alocação contra a meta. Âmbar marca qualquer classe a mais de 5 pontos.',
            },
          },
        ],
        caption: { en: '07 — HOME', pt: '07 — INÍCIO' },
      },
    ],
  },
  slotLabels: {
    ui: { en: 'EVERY SCREEN', pt: 'TODAS AS TELAS' },
  },
  // Tables, personas and decision sheets are 1240pt documents; at half column
  // width their text is unreadable, so they run full width.
  cols: { problem: '1fr', research: '1fr', insights: '1fr', strategy: '1fr', outcome: '1fr', ui: 'repeat(4,1fr)' },
  slots: {
    problem: [
      {
        src: v2('problem-compare'),
        w: 1936,
        h: 325,
        caption: { en: 'FRAGMENTED VS. SIMPLIFIED', pt: 'FRAGMENTADO VS. SIMPLIFICADO' },
      },
    ],
    research: [
      {
        src: v2('assumptions'),
        w: 1936,
        h: 553,
        caption: { en: 'ASSUMPTIONS TO TEST, RANKED BY RISK', pt: 'HIPÓTESES A TESTAR, POR RISCO' },
        alt: {
          en: 'Table of five assumptions with risk and validation method. High risk: people will connect their accounts if told exactly what is read and that money cannot move; people will act on an AI suggestion when they can see the reasoning. Medium risk: a self-declared risk profile is enough to start with; people who invest on two or more platforms lack one view. Low risk: on first use, one next step is more useful than a full analysis.',
          pt: 'Tabela com cinco hipóteses, risco e forma de validar. Risco alto: as pessoas conectam as contas se souberem exatamente o que é lido e que o dinheiro não pode ser movido; as pessoas agem sobre uma sugestão da IA quando veem o raciocínio. Risco médio: um perfil de risco autodeclarado basta para começar; quem investe em duas ou mais plataformas não tem uma visão única. Risco baixo: no primeiro uso, um próximo passo é mais útil que uma análise completa.',
        },
      },
      {
        src: v2('personas'),
        w: 1936,
        h: 464,
        caption: { en: 'PROTO-PERSONAS', pt: 'PROTO-PERSONAS' },
        alt: {
          en: 'Two proto-personas. Primary, Modern Investor: wants to know in under a minute whether the portfolio is on track; frustrated by four apps and an out-of-date spreadsheet. Secondary, Institutional Access: wants advisor-level analysis without advisor fees.',
          pt: 'Duas proto-personas. Primária, Investidor Moderno: quer saber em menos de um minuto se a carteira está no rumo; frustrado com quatro apps e uma planilha desatualizada. Secundária, Acesso Institucional: quer análise de assessor sem pagar assessor.',
        },
      },
      {
        src: v2('competitive'),
        w: 1936,
        h: 536,
        caption: { en: 'COMPETITIVE LANDSCAPE', pt: 'CENÁRIO COMPETITIVO' },
        alt: {
          en: 'Competitor table. XP Investimentos: broad range, little personalization. Warren and Vitreo: profile-based, long onboarding, no consolidated view. Private banks: trusted advice, high cost. Global robo-advisors: automation, little adaptation to Brazil. InvestIQ aims for automated, consolidated, explained advice.',
          pt: 'Tabela de concorrentes. XP Investimentos: portfólio amplo, pouca personalização. Warren e Vitreo: por perfil, onboarding longo, sem visão consolidada. Private banks: assessoria confiável, custo alto. Robo-advisors globais: automação, pouca adaptação ao Brasil. A InvestIQ mira recomendação automática, consolidada e explicada.',
        },
      },
    ],
    insights: [
      {
        src: v2('journey'),
        w: 1936,
        h: 408,
        caption: { en: 'ONBOARDING JOURNEY — DISCOVERY + FOUR STEPS', pt: 'JORNADA DE ONBOARDING — DESCOBERTA + QUATRO PASSOS' },
        alt: {
          en: 'Journey: before the product, discovery; step 1, sign-up; step 2, risk profile; step 3, connect accounts; step 4, AI strategy. Each stage lists the goal, the assumed feeling and the design opportunity.',
          pt: 'Jornada: antes do produto, descoberta; passo 1, cadastro; passo 2, perfil de risco; passo 3, conectar contas; passo 4, estratégia IA. Cada etapa traz o objetivo, o sentimento presumido e a oportunidade de design.',
        },
      },
    ],
    strategy: [
      {
        src: v2('decision-01'),
        w: 1936,
        h: 886,
        caption: { en: 'DECISION 01 — ASK FOR ACCOUNT ACCESS IN STEP 3', pt: 'DECISÃO 01 — PEDIR ACESSO ÀS CONTAS NO PASSO 3' },
        alt: {
          en: 'Three options for when to ask for account access: up front, after the dashboard, or in step 3 and skippable. Step 3 was chosen, with the trade-off and what would change the decision.',
          pt: 'Três opções de quando pedir acesso às contas: no início, depois do dashboard, ou no passo 3 com opção de pular. O passo 3 foi escolhido, com o trade-off e o que mudaria a decisão.',
        },
      },
      {
        src: v2('decision-02'),
        w: 1936,
        h: 958,
        caption: { en: 'DECISION 02 — EXPLAIN BEFORE ASKING TO ACT', pt: 'DECISÃO 02 — EXPLICAR ANTES DE PEDIR AÇÃO' },
      },
      {
        src: v2('decision-03'),
        w: 1936,
        h: 942,
        caption: { en: 'DECISION 03 — WHOLE PORTFOLIO AND ONE NEXT STEP', pt: 'DECISÃO 03 — CARTEIRA INTEIRA E UM PRÓXIMO PASSO' },
      },
    ],
    uxflow: [
      {
        src: v2('flow'),
        w: 1936,
        h: 1270,
        caption: { en: 'PRIMARY FLOW, OTHER PATHS & INFORMATION ARCHITECTURE', pt: 'FLUXO PRINCIPAL, OUTROS CAMINHOS & ARQUITETURA DE INFORMAÇÃO' },
        alt: {
          en: 'Primary flow: landing, welcome, sign-up, risk profile, connect accounts, AI strategy, dashboard. Other paths: skipped connection, failed connection, rejected strategy, returning user. Information architecture in three zones: authentication, onboarding, authenticated app.',
          pt: 'Fluxo principal: landing, boas-vindas, cadastro, perfil de risco, conectar contas, estratégia IA, dashboard. Outros caminhos: conexão pulada, conexão com erro, estratégia recusada, usuário recorrente. Arquitetura em três zonas: autenticação, onboarding, app autenticado.',
        },
      },
    ],
    // The onboarding and home already run above as a sequence and a spotlight;
    // this grid is the rest of the product, each screen in its device.
    ui: [
      { device: 'phone', src: v3('ui-suggestions'), ...PHONE, caption: { en: '08 — SUGGESTIONS', pt: '08 — SUGESTÕES' } },
      { device: 'phone', src: v3('ui-portfolio'), ...PHONE, caption: { en: '09 — PORTFOLIO', pt: '09 — CARTEIRA' } },
      { device: 'phone', src: v3('ui-detail'), ...PHONE, full: { src: v3('ui-detail-full'), w: 780, h: 1926 }, caption: { en: '10 — SUGGESTION DETAIL', pt: '10 — DETALHE DA SUGESTÃO' } },
      { device: 'phone', src: v3('ui-review'), ...PHONE, full: { src: v3('ui-review-full'), w: 780, h: 1752 }, caption: { en: '11 — REVIEW AND HAND-OFF', pt: '11 — REVISÃO E ENCAMINHAMENTO' } },
      { device: 'phone', src: v3('ui-sent'), ...PHONE, caption: { en: '12 — ORDER SENT', pt: '12 — ORDEM ENVIADA' } },
      { device: 'phone', src: v3('state-empty'), ...PHONE, caption: { en: 'STATE — EMPTY', pt: 'ESTADO — VAZIO' } },
      { device: 'phone', src: v3('state-loading'), ...PHONE, caption: { en: 'STATE — LOADING', pt: 'ESTADO — CARREGANDO' } },
      { device: 'phone', src: v3('state-error'), ...PHONE, caption: { en: 'STATE — CONNECTION FAILED', pt: 'ESTADO — ERRO DE CONEXÃO' } },
      { device: 'browser', span: 4, src: v3('ui-desktop'), w: DESK_W, h: 1701, caption: { en: 'D1 — DESKTOP HOME', pt: 'D1 — INÍCIO DESKTOP' } },
      { device: 'browser', span: 2, src: v3('ui-desktop-detail'), w: DESK_W, h: 1210, caption: { en: 'D2 — SUGGESTION DETAIL', pt: 'D2 — DETALHE DA SUGESTÃO' } },
      { device: 'browser', span: 2, src: v3('ui-desktop-review'), w: DESK_W, h: 1210, caption: { en: 'D3 — REVIEW AND HAND-OFF', pt: 'D3 — REVISÃO E ENCAMINHAMENTO' } },
    ],
    ds: [
      {
        src: v2('ds'),
        ground: INVESTIQ_GLOW,
        w: 1936,
        h: 3933,
        caption: { en: 'DESIGN SYSTEM — TOKENS, CONTRAST, COMPONENTS', pt: 'DESIGN SYSTEM — TOKENS, CONTRASTE, COMPONENTES' },
        alt: {
          en: 'Design system page: colour tokens for surfaces, text, brand and status; a contrast table where every text token passes WCAG AA and the old muted grey is marked as retired at 3.8:1; the Inter type scale; spacing and radius tokens; and Button, Input and Tab bar components with their states.',
          pt: 'Página do design system: tokens de cor para superfícies, texto, marca e status; tabela de contraste em que todo token de texto passa no WCAG AA e o cinza antigo aparece como aposentado com 3,8:1; a escala tipográfica em Inter; tokens de espaçamento e raio; e os componentes Button, Input e Tab bar com seus estados.',
        },
      },
    ],
    outcome: [
      {
        src: v2('metrics'),
        w: 1936,
        h: 2498,
        caption: { en: 'SUCCESS METRICS & VALIDATION PLAN', pt: 'MÉTRICAS DE SUCESSO & PLANO DE VALIDAÇÃO' },
        alt: {
          en: 'Success metrics with starting targets: onboarding completion at least 60%, account connection at least 40%, 4 of 5 test participants able to explain the suggestion, and a guardrail of under 10% changing their profile within 30 days. Below, a five-person moderated usability test with three tasks, and a reflection.',
          pt: 'Métricas de sucesso com metas iniciais: conclusão do onboarding de pelo menos 60%, conexão de conta de pelo menos 40%, 4 de 5 participantes explicando a sugestão, e um guardrail de menos de 10% mudando o perfil em 30 dias. Abaixo, um teste de usabilidade moderado com cinco pessoas e três tarefas, e uma reflexão.',
        },
      },
    ],
  },
};


const pulsePaths = paths('pulse');

/**
 * Frames exported from the Pulse Analytics case study Figma file (v2 pages).
 * Screens are 1440pt desktop frames rendered at 1936px; EN and PT are padded
 * to the same height so one aspect ratio serves both languages.
 */
/** Hi-Fi v3 screens: desktop at 1936px wide (1440pt at 1.344x), phone at 2x. */
const pv3 = (name: string, h = 1210) => ({ src: pulsePaths.both(`v3/${name}`), w: 1936, h });
/** First-round wireframes, recoloured for the dark sheet. No copy, so one file. */
const pwire = (name: string) => ({ src: pulsePaths.shared(`wire-v2/${name}`), w: 1240, h: 800 });

/** Pulse Blue, for the glow behind its devices. */
const PULSE_GLOW = 'rgba(59, 130, 246, 0.2)';

const pulse: CaseMedia = {
  // Flat windows cascading back rather than InvestIQ's tilted desk or Aether's
  // fan: the same Home three times, one per role, with the phone beside them.
  hero: {
    ratio: 1.75,
    glow: PULSE_GLOW,
    layout: 'stack',
    shots: [
      { device: 'browser', ...pv3('ui-home-leadership'), x: 4, y: 10, width: 58, depth: 0, tag: { en: 'LEADERSHIP', pt: 'LIDERANÇA' } },
      { device: 'browser', ...pv3('ui-home-finance'), x: 13, y: 19, width: 58, depth: 1, tag: { en: 'FINANCIAL ANALYST', pt: 'ANALISTA FINANCEIRO' } },
      { device: 'browser', ...pv3('ui-home-commercial'), x: 22, y: 28, width: 58, depth: 2, tag: { en: 'COMMERCIAL MANAGER', pt: 'GERENTE COMERCIAL' } },
      { device: 'phone', src: pulsePaths.both('v3/mob-home'), w: 780, h: 1688, x: 83, y: 20, width: 13, depth: 3, tag: { en: 'MOBILE', pt: 'MOBILE' } },
    ],
    caption: {
      en: '06–08 HOME BY ROLE · 17 MOBILE COMPANION',
      pt: '06–08 HOME POR PAPEL · 17 COMPANION MOBILE',
    },
  },
  stages: {
    exploration: [
      {
        kind: 'wires',
        label: { en: 'FIRST ROUND — BEFORE THE ROLE STEP', pt: 'PRIMEIRA RODADA — ANTES DO PASSO DE PAPEL' },
        device: 'browser',
        cols: 4,
        tiles: [
          { screen: pwire('wire-01'), caption: { en: '01 — CONNECT DATA', pt: '01 — CONECTAR DADOS' }, pins: [{ n: 1, x: 38, y: 17 }] },
          { screen: pwire('wire-02'), caption: { en: '02 — AUTHENTICATE SOURCE', pt: '02 — AUTENTICAR FONTE' }, pins: [{ n: 2, x: 73, y: 24 }] },
          { screen: pwire('wire-03'), caption: { en: '03 — MAP DATA', pt: '03 — MAPEAR DADOS' }, pins: [{ n: 3, x: 92, y: 39 }] },
          { screen: pwire('wire-04'), caption: { en: '04 — DATA CONNECTED', pt: '04 — DADOS CONECTADOS' } },
          { screen: pwire('wire-05'), caption: '05 — DASHBOARD', pins: [{ n: 4, x: 62, y: 55 }] },
          { screen: pwire('wire-06'), caption: '06 — ANALYTICS', pins: [{ n: 5, x: 96, y: 18 }] },
          { screen: pwire('wire-07'), caption: { en: '07 — REPORT BUILDER', pt: '07 — REPORT BUILDER' } },
        ],
        notesLabel: { en: 'WHAT THE NEXT ROUND CHANGED', pt: 'O QUE A RODADA SEGUINTE MUDOU' },
        notes: [
          {
            n: 1,
            text: {
              en: 'Onboarding opened on the list of sources. A role step went in front of it, because the Home orders its cards by role.',
              pt: 'O onboarding abria na lista de fontes. Um passo de papel entrou antes dela, porque a Home ordena os cards pelo papel.',
            },
          },
          {
            n: 2,
            text: {
              en: 'A generic login card. It became a read-only SAP Service Layer form that says how credentials are stored, with its own error state.',
              pt: 'Um card de login genérico. Virou um formulário do SAP Service Layer somente leitura, dizendo como a credencial é guardada, com estado de erro próprio.',
            },
          },
          {
            n: 3,
            text: {
              en: 'Mapping showed matches with no confidence. Each field now carries its match score, and only the uncertain one asks for review.',
              pt: 'O mapeamento mostrava as correspondências sem confiança. Cada campo agora traz a sua pontuação, e só o campo incerto pede revisão.',
            },
          },
          {
            n: 4,
            text: {
              en: 'The first screen after onboarding was a dashboard of charts. It became a Home with three Insight Cards per role; the charts moved to Dashboards.',
              pt: 'A primeira tela depois do onboarding era um dashboard de gráficos. Virou uma Home com três Insight Cards por papel; os gráficos foram para Dashboards.',
            },
          },
          {
            n: 5,
            text: {
              en: 'Analytics was a chart with a list beside it. It became the regional drill-down, with the Insight Card that explains the number next to the chart.',
              pt: 'Analytics era um gráfico com uma lista ao lado. Virou o detalhamento regional, com o Insight Card que explica o número ao lado do gráfico.',
            },
          },
          {
            text: {
              en: 'No states. Loading, an empty period, a failed authentication, an incomplete mapping and no permission were added.',
              pt: 'Nenhum estado. Carregando, período vazio, falha de autenticação, mapeamento incompleto e sem permissão entraram depois.',
            },
          },
          {
            text: {
              en: 'Desktop only. A mobile companion was added for the cards that need action today, and nothing else.',
              pt: 'Só desktop. Um companion mobile entrou para os cards que pedem ação hoje, e mais nada.',
            },
          },
        ],
      },
    ],
    uxflow: [
      {
        kind: 'tabs',
        label: { en: 'ONBOARDING — FOUR STEPS AND DONE', pt: 'ONBOARDING — QUATRO PASSOS E PRONTO' },
        device: 'browser',
        numbered: true,
        tabs: [
          {
            label: { en: 'Role', pt: 'Papel' },
            screen: pv3('ui-onb-role'),
            note: {
              en: 'One question first: what you need to see. The answer decides which Insight Cards come first.',
              pt: 'Uma pergunta primeiro: o que você precisa ver. A resposta decide quais Insight Cards vêm primeiro.',
            },
          },
          {
            label: { en: 'Source', pt: 'Fonte' },
            screen: pv3('ui-onb-source'),
            note: {
              en: 'Sources grouped by the system the team already trusts. Access is read-only, and the screen says so.',
              pt: 'Fontes agrupadas pelo sistema em que o time já confia. O acesso é somente leitura, e a tela diz isso.',
            },
          },
          {
            label: { en: 'Authenticate', pt: 'Autenticar' },
            screen: pv3('ui-onb-auth'),
            note: {
              en: 'A read-only API user, with how the credentials are stored written under the form.',
              pt: 'Um usuário de API somente leitura, com a forma de guardar a credencial escrita embaixo do formulário.',
            },
          },
          {
            label: { en: 'Map data', pt: 'Mapear dados' },
            screen: pv3('ui-onb-map'),
            note: {
              en: 'Fields matched automatically with a confidence score. Only the uncertain one asks for a decision.',
              pt: 'Campos ligados automaticamente com pontuação de confiança. Só o incerto pede uma decisão.',
            },
          },
          {
            label: { en: 'Done', pt: 'Pronto' },
            screen: pv3('ui-onb-done'),
            note: {
              en: 'What was synced, what was mapped and when the next sync runs — then the Home opens for the chosen role.',
              pt: 'O que sincronizou, o que foi mapeado e quando roda a próxima sincronização — e a Home abre no papel escolhido.',
            },
          },
        ],
      },
    ],
    ui: [
      {
        kind: 'tabs',
        label: { en: 'ONE HOME, THREE ROLES', pt: 'UMA HOME, TRÊS PAPÉIS' },
        device: 'browser',
        tabs: [
          {
            label: { en: 'Commercial manager', pt: 'Gerente comercial' },
            screen: pv3('ui-home-commercial'),
            note: {
              en: 'Margin by region and the accounts behind a gap. The risk card opens on the discounts that explain it.',
              pt: 'Margem por região e as contas por trás de uma diferença. O card de risco abre nos descontos que a explicam.',
            },
          },
          {
            label: { en: 'Financial analyst', pt: 'Analista financeiro' },
            screen: pv3('ui-home-finance'),
            note: {
              en: 'Receivables, early-payment discounts and forecast accuracy. The same card, asked different questions.',
              pt: 'Recebíveis, desconto por antecipação e acurácia da previsão. O mesmo card, com outras perguntas.',
            },
          },
          {
            label: { en: 'Leadership', pt: 'Liderança' },
            screen: pv3('ui-home-leadership'),
            note: {
              en: 'Plan against actual for the quarter, and only the exceptions that need a decision.',
              pt: 'Planejado contra realizado no trimestre, e só as exceções que pedem decisão.',
            },
          },
        ],
        caption: { en: '06–08 — HOME BY ROLE', pt: '06–08 — HOME POR PAPEL' },
      },
      {
        kind: 'lens',
        label: { en: 'DRILL-DOWN — READ UP CLOSE', pt: 'DETALHAMENTO — DE PERTO' },
        screen: pv3('ui-dash-region', 1522),
        lenses: [
          {
            x: 40.2, y: 17.7, w: 18.2, h: 10.9,
            text: {
              en: 'The delta carries its direction and unit, and the target sits right under the value, so red never has to explain itself.',
              pt: 'A variação traz a direção e a unidade, e a meta fica logo abaixo do valor, então o vermelho não precisa se explicar.',
            },
          },
          {
            x: 70.9, y: 31.1, w: 26.3, h: 30.6,
            text: {
              en: 'The Insight Card from the Home follows into the dashboard, next to the chart it summarises.',
              pt: 'O Insight Card da Home acompanha no dashboard, ao lado do gráfico que ele resume.',
            },
          },
          {
            x: 21.7, y: 87.4, w: 35.5, h: 3.6,
            text: {
              en: 'Every chart ends on a one-line takeaway, which doubles as its text alternative.',
              pt: 'Todo gráfico termina numa leitura de uma linha, que também é o seu texto alternativo.',
            },
          },
        ],
        caption: { en: '10 — DASHBOARDS · SOUTHEAST REGION', pt: '10 — DASHBOARDS · REGIÃO SUDESTE' },
      },
    ],
  },
  slotLabels: {
    ui: { en: 'THE REST OF THE PRODUCT AND ITS STATES', pt: 'O RESTO DO PRODUTO E OS ESTADOS' },
  },
  // Every artefact here is a 1280pt-wide document or a 1440pt desktop screen.
  // At half column width documents stop being readable, so they run full
  // width; screens sit two to a row in their browser.
  cols: {
    problem: '1fr',
    research: '1fr',
    insights: '1fr',
    strategy: '1fr',
    validation: '1fr',
    ui: 'repeat(2,1fr)',
  },
  slots: {
    problem: [
      {
        src: pulsePaths.both('problem'),
        w: 1936,
        h: 558,
        caption: { en: 'DIAGNOSIS — THE COST OF NO HIERARCHY', pt: 'DIAGNÓSTICO — O CUSTO DE NÃO TER HIERARQUIA' },
      },
    ],
    research: [
      {
        src: pulsePaths.both('research-methods'),
        w: 1936,
        h: 663,
        caption: { en: 'METHODS & KEY FINDINGS', pt: 'MÉTODOS & PRINCIPAIS DESCOBERTAS' },
      },
      {
        src: pulsePaths.both('research-table'),
        w: 1936,
        h: 514,
        caption: { en: 'BENCHMARKING — MARKET REFERENCES', pt: 'BENCHMARKING — REFERÊNCIAS DE MERCADO' },
      },
    ],
    insights: [
      {
        src: pulsePaths.both('insights'),
        w: 1936,
        h: 820,
        caption: { en: 'JOURNEY — BEFORE AND AFTER', pt: 'JORNADA — ANTES E DEPOIS' },
      },
    ],
    strategy: [
      {
        src: pulsePaths.both('strategy'),
        w: 1936,
        h: 348,
        caption: { en: 'PROBLEM FRAMING & HOW MIGHT WE', pt: 'ENQUADRAMENTO DO PROBLEMA & HOW MIGHT WE' },
      },
    ],
    uxflow: [
      {
        src: pulsePaths.both('uxflow'),
        w: 1936,
        h: 1382,
        caption: { en: 'ONBOARDING FLOW & NAVIGATION ARCHITECTURE', pt: 'FLUXO DE ONBOARDING & ARQUITETURA DE NAVEGAÇÃO' },
      },
    ],
    ui: [
      { device: 'browser', span: 2, ...pv3('ui-dash', 1611), caption: { en: '09 — DASHBOARDS · COMMERCIAL DISTRIBUTION', pt: '09 — DASHBOARDS · DISTRIBUIÇÃO COMERCIAL' } },
      { device: 'browser', ...pv3('ui-report'), caption: { en: '11 — REPORT BUILDER', pt: '11 — REPORT BUILDER' } },
      { device: 'browser', ...pv3('st-loading'), caption: { en: '12 — STATE · HOME LOADING', pt: '12 — ESTADO · HOME CARREGANDO' } },
      { device: 'browser', ...pv3('st-empty'), caption: { en: '13 — STATE · EMPTY PERIOD', pt: '13 — ESTADO · PERÍODO VAZIO' } },
      { device: 'browser', ...pv3('st-auth-error'), caption: { en: '14 — STATE · AUTHENTICATION ERROR', pt: '14 — ESTADO · ERRO DE AUTENTICAÇÃO' } },
      { device: 'browser', ...pv3('st-mapping', 1228), caption: { en: '15 — STATE · MAPPING INCOMPLETE', pt: '15 — ESTADO · MAPEAMENTO INCOMPLETO' } },
      { device: 'browser', ...pv3('st-permission'), caption: { en: '16 — STATE · NO PERMISSION', pt: '16 — ESTADO · SEM PERMISSÃO' } },
    ],
    ds: [
      {
        src: pulsePaths.both('ds'),
        w: 1936,
        h: 917,
        caption: { en: 'DESIGN SYSTEM — COMPONENT LIBRARY', pt: 'DESIGN SYSTEM — BIBLIOTECA DE COMPONENTES' },
      },
    ],
    validation: [
      {
        src: pulsePaths.both('validation'),
        w: 1936,
        h: 1467,
        caption: { en: 'THREE APPROACHES, TESTED — AND WHAT THE TESTS SHOWED', pt: 'TRÊS ABORDAGENS TESTADAS — E O QUE OS TESTES MOSTRARAM' },
      },
    ],
  },
};

const reloopPaths = paths('reloop');
/** Hi-Fi v3 desktop screens: 1440pt frames at 1936px, at least 900pt tall. */
const rv3 = (name: string, h = 1210) => ({ src: reloopPaths.both(`v3/${name}`), w: 1936, h });
/** Hi-Fi v3 mobile web screens: 390pt frames at 2x. */
const rm3 = (name: string) => ({ src: reloopPaths.both(`v3/${name}`), w: 780, h: 1688 });
/** First-round wireframes, recoloured for the dark sheet, cut to 1440×1024. */
const rwire = (name: string) => ({ src: reloopPaths.both(`wire-v2/${name}`), w: 1240, h: 882 });

/**
 * Frames exported from the Reloop case study Figma file. The document crops
 * keep only their cards, with the cream canvas knocked out; the design-system
 * sheets, whose swatches and type only read on cream, are cream panels.
 */
const reloop: CaseMedia = {
  // Not a desk, a fan, a stack, a slider or two phones: the product page with
  // its grade tied on as a thrift-shop hang tag — the thing the grade replaces.
  heroTag: {
    screen: rv3('ui-03', 1253),
    url: 'reloop.com.br/item/levis-denim-jacket',
    eyebrow: { en: 'Graded by the seller', pt: 'Classificado por quem vende' },
    grade: { en: 'Good', pt: 'Bom estado' },
    level: 2,
    scale: [
      { en: 'New with tags', pt: 'Nova com etiqueta' },
      { en: 'Excellent', pt: 'Excelente' },
      { en: 'Good', pt: 'Bom estado' },
      { en: 'Fair', pt: 'Com marcas de uso' },
    ],
    note: {
      en: '@rafa.brecho noted light fading on the cuffs — photo 3.',
      pt: '@rafa.brecho anotou leve desbotado nos punhos — foto 3.',
    },
    caption: {
      en: '03 — ONE GRADE ON A FIXED LADDER, NOT AN ADJECTIVE',
      pt: '03 — UM NÍVEL NUMA ESCALA FIXA, NÃO UM ADJETIVO',
    },
  },
  cols: {
    problem: '1fr',
    research: '1fr',
    insights: '1fr',
    strategy: '1fr',
    uxflow: '1fr',
    ui: 'repeat(6,1fr)',
    ds: '1fr',
    outcome: '1fr',
  },
  stages: {
    exploration: [
      {
        kind: 'wires',
        label: { en: 'FIRST ROUND — CONDITION AS A LINE OF TEXT', pt: 'PRIMEIRA RODADA — O ESTADO COMO UMA LINHA DE TEXTO' },
        device: 'browser',
        cols: 4,
        tiles: [
          { screen: rwire('bwire-01'), caption: { en: '01 — BROWSE', pt: '01 — VITRINE' }, pins: [{ n: 1, x: 25, y: 48 }] },
          { screen: rwire('bwire-02'), caption: { en: '02 — SEARCH RESULTS', pt: '02 — RESULTADOS DA BUSCA' }, pins: [{ n: 2, x: 8, y: 20 }] },
          { screen: rwire('bwire-03'), caption: { en: '03 — PRODUCT', pt: '03 — PRODUTO' }, pins: [{ n: 3, x: 60, y: 28 }] },
          { screen: rwire('bwire-04'), caption: { en: '04 — CART', pt: '04 — CARRINHO' } },
          { screen: rwire('bwire-05'), caption: { en: '05 — CHECKOUT', pt: '05 — CHECKOUT' } },
          { screen: rwire('bwire-06'), caption: { en: '06 — ORDER CONFIRMED', pt: '06 — PEDIDO CONFIRMADO' } },
          { screen: rwire('bwire-07'), caption: { en: '07 — MY ORDERS', pt: '07 — MEUS PEDIDOS' }, pins: [{ n: 4, x: 92, y: 20 }] },
          { screen: rwire('swire-01'), caption: { en: '10 — SELLER · DASHBOARD', pt: '10 — VENDA · PAINEL' }, pins: [{ n: 5, x: 84, y: 14 }] },
          { screen: rwire('swire-02'), caption: { en: '11 — SELLER · GRADING', pt: '11 — VENDA · CLASSIFICAÇÃO' }, pins: [{ n: 6, x: 22, y: 42 }] },
          { screen: rwire('swire-03'), caption: { en: '12 — SELLER · MY LISTINGS', pt: '12 — VENDA · MEUS ANÚNCIOS' }, pins: [{ n: 7, x: 27, y: 25 }] },
          { screen: rwire('swire-04'), caption: { en: '13 — SELLER · OFFERS', pt: '13 — VENDA · OFERTAS' } },
          { screen: rwire('swire-05'), caption: { en: '14 — SELLER · PAYOUTS', pt: '14 — VENDA · REPASSES' } },
        ],
        notesLabel: { en: 'WHAT THE HI-FI CHANGED', pt: 'O QUE O HI-FI MUDOU' },
        notes: [
          { n: 1, text: { en: '“Good condition” was grey text under the price. It became a badge with a four-dot meter on every card, and the page opens on the four-grade scale.', pt: '“Bom estado” era um texto cinza embaixo do preço. Virou um selo com medidor de quatro pontos em todo card, e a página abre com a escala de quatro níveis.' } },
          { n: 2, text: { en: 'The condition filter was a free choice. It became a floor on the scale — “Good & up” — so every result it leaves can be checked against its badge.', pt: 'O filtro de estado era uma escolha solta. Virou um piso na escala — “Bom ou melhor” — e cada resultado que sobra pode ser conferido pelo selo.' } },
          { n: 3, text: { en: 'A grey chip with a vague line. It became a card: the badge, what the grade means, the seller’s own flaw note pointing at a photo, and the dispute window.', pt: 'Um chip cinza com uma frase vaga. Virou um card: o selo, o que o nível significa, a nota de defeito do vendedor apontando para uma foto e o prazo de disputa.' } },
          { n: 4, text: { en: 'A delivered order was the end of the road. It now carries the grade it was sold under and an Open a dispute action for the first seven days.', pt: 'Pedido entregue era o fim da linha. Agora ele traz o nível com que foi vendido e a ação Abrir disputa nos primeiros sete dias.' } },
          { n: 5, text: { en: 'An average rating in the fourth tile. It became open disputes, with the answer deadline, and the item needing attention sits right under it.', pt: 'Uma nota média no quarto card. Virou disputas abertas, com o prazo de resposta, e a peça que precisa de atenção logo abaixo.' } },
          { n: 6, text: { en: 'Good came preselected. The hi-fi starts with nothing chosen and shows the badge each option will produce, so the seller picks a grade instead of accepting one.', pt: 'Bom estado vinha pré-selecionado. O hi-fi começa sem nada escolhido e mostra o selo que cada opção vai gerar, para quem vende escolher um nível em vez de aceitar um.' } },
          { n: 7, text: { en: 'The grade was a word before the size. It is now the same badge buyers see, next to a status chip that flags a listing under dispute.', pt: 'O nível era uma palavra antes do tamanho. Agora é o mesmo selo que quem compra vê, ao lado de um chip de status que marca o anúncio em disputa.' } },
          { text: { en: 'No dispute screens, no mobile web and no edge states. The hi-fi added opening a dispute and following it, three mobile screens, and no-results, payment-failed, loading and empty-listings states.', pt: 'Sem telas de disputa, sem web mobile e sem estados de exceção. O hi-fi somou abrir e acompanhar uma disputa, três telas mobile e os estados sem resultados, pagamento recusado, carregando e sem anúncios.' } },
        ],
      },
    ],
    ui: [
      {
        kind: 'trail',
        label: { en: 'ONE GRADE, SIX SCREENS — FROM SEARCH TO DISPUTE AND BACK TO THE SELLER', pt: 'UM NÍVEL, SEIS TELAS — DA BUSCA À DISPUTA E DE VOLTA A QUEM VENDE' },
        stops: [
          { screen: rv3('ui-02'), crop: { x: 0.3, y: 57.4, w: 12 }, mark: { x: 3.3, y: 66, w: 5.9, h: 2.7 }, markPt: { x: 3.3, y: 66, w: 8.7, h: 2.7 }, side: { en: 'Buyer', pt: 'Quem compra' }, title: { en: 'In the search card', pt: 'No card da busca' }, caption: { en: '02 — SEARCH RESULTS', pt: '02 — RESULTADOS DA BUSCA' } },
          { screen: rv3('ui-03', 1253), crop: { x: 49.3, y: 19.4, w: 12 }, mark: { x: 52.3, y: 27.7, w: 6.8, h: 3 }, markPt: { x: 52.3, y: 27.7, w: 9.8, h: 3 }, side: { en: 'Buyer', pt: 'Quem compra' }, title: { en: 'Explained on the product', pt: 'Explicado no produto' }, caption: { en: '03 — PRODUCT', pt: '03 — PRODUTO' } },
          { screen: rv3('ui-04'), crop: { x: 7.6, y: 15.3, w: 12 }, mark: { x: 10.6, y: 23.9, w: 5.9, h: 2.7 }, markPt: { x: 10.6, y: 23.9, w: 8.7, h: 2.7 }, side: { en: 'Buyer', pt: 'Quem compra' }, title: { en: 'Carried into the cart', pt: 'Levado ao carrinho' }, caption: { en: '04 — CART', pt: '04 — CARRINHO' } },
          { screen: rv3('ui-07'), crop: { x: 8.2, y: 29.2, w: 12 }, mark: { x: 11.2, y: 37.8, w: 5.9, h: 2.7 }, markPt: { x: 11.2, y: 37.8, w: 8.7, h: 2.7 }, side: { en: 'Buyer', pt: 'Quem compra' }, title: { en: 'Kept on the order', pt: 'Guardado no pedido' }, caption: { en: '07 — MY ORDERS', pt: '07 — MEUS PEDIDOS' } },
          { screen: rv3('ui-09'), crop: { x: 26, y: 23.7, w: 12 }, mark: { x: 35.6, y: 32.3, w: 4.4, h: 2.7 }, markPt: { x: 29, y: 32.3, w: 7, h: 2.7 }, side: { en: 'Buyer', pt: 'Quem compra' }, title: { en: 'Tested in the dispute', pt: 'Testado na disputa' }, caption: { en: '09 — DISPUTE STATUS', pt: '09 — STATUS DA DISPUTA' } },
          { screen: rv3('ui-12'), crop: { x: 48.7, y: 17, w: 12 }, mark: { x: 51.7, y: 25.6, w: 5.9, h: 2.7 }, markPt: { x: 51.7, y: 25.6, w: 8.7, h: 2.7 }, side: { en: 'Seller', pt: 'Quem vende' }, title: { en: 'Locked on the listing', pt: 'Travado no anúncio' }, caption: { en: '12 — MY LISTINGS', pt: '12 — MEUS ANÚNCIOS' } },
        ],
      },
    ],
  },
  slotLabels: {
    ui: { en: 'THE REST OF THE FLOW — BOTH SIDES, MOBILE WEB AND EDGE STATES', pt: 'O RESTO DO FLUXO — OS DOIS LADOS, WEB MOBILE E ESTADOS DE EXCEÇÃO' },
  },
  slots: {
    problem: [
      { src: reloopPaths.both('personas'), w: 1184, h: 743, caption: { en: 'PROTO-PERSONAS — ASSUMPTIONS, NOT INTERVIEWS', pt: 'PROTO-PERSONAS — PRESSUPOSTOS, NÃO ENTREVISTAS' } },
    ],
    research: [
      { src: reloopPaths.both('research-definition'), w: 1614, h: 864, caption: { en: 'METHOD, ASSUMPTIONS, OPPORTUNITIES, HYPOTHESES', pt: 'MÉTODO, PRESSUPOSTOS, OPORTUNIDADES, HIPÓTESES' } },
      { src: reloopPaths.both('research-scan'), w: 1646, h: 716, caption: { en: 'COMPETITIVE SCAN', pt: 'ANÁLISE COMPETITIVA' } },
    ],
    insights: [
      { src: reloopPaths.both('insights'), w: 1936, h: 698, caption: { en: 'BUYING JOURNEY — SIX STAGES', pt: 'JORNADA DE COMPRA — SEIS ETAPAS' } },
    ],
    strategy: [
      { src: reloopPaths.both('strategy'), w: 1721, h: 1364, caption: { en: 'KEY DECISIONS, SCOPE AND MVP', pt: 'DECISÕES-CHAVE, ESCOPO E MVP' } },
    ],
    uxflow: [
      { src: reloopPaths.both('uxflow'), w: 1592, h: 815, caption: { en: 'TASK FLOWS & SITEMAP', pt: 'FLUXOS DE TAREFA & MAPA DO SITE' } },
    ],
    ui: [
      { ...rv3('ui-01'), caption: { en: '01 — BUYER · BROWSE', pt: '01 — COMPRA · VITRINE' }, device: 'browser', span: 3 },
      { ...rv3('ui-05'), caption: { en: '05 — BUYER · CHECKOUT', pt: '05 — COMPRA · CHECKOUT' }, device: 'browser', span: 3 },
      { ...rv3('ui-06'), caption: { en: '06 — BUYER · ORDER PLACED', pt: '06 — COMPRA · PEDIDO FEITO' }, device: 'browser', span: 3 },
      { ...rv3('ui-08'), caption: { en: '08 — BUYER · OPEN A DISPUTE', pt: '08 — COMPRA · ABRIR DISPUTA' }, device: 'browser', span: 3 },
      { ...rv3('ui-10'), caption: { en: '10 — SELLER · DASHBOARD', pt: '10 — VENDA · PAINEL' }, device: 'browser', span: 3 },
      { ...rv3('ui-11'), caption: { en: '11 — SELLER · GRADE AN ITEM', pt: '11 — VENDA · CLASSIFICAR PEÇA' }, device: 'browser', span: 3 },
      { ...rv3('ui-13'), caption: { en: '13 — SELLER · OFFERS', pt: '13 — VENDA · OFERTAS' }, device: 'browser', span: 3 },
      { ...rv3('ui-14'), caption: { en: '14 — SELLER · PAYOUTS', pt: '14 — VENDA · REPASSES' }, device: 'browser', span: 3 },
      { ...rm3('m-1'), caption: { en: 'M1 — MOBILE · SEARCH', pt: 'M1 — MOBILE · BUSCA' }, device: 'phone', span: 2 },
      { ...rm3('m-2'), caption: { en: 'M2 — MOBILE · PRODUCT', pt: 'M2 — MOBILE · PRODUTO' }, device: 'phone', span: 2 },
      { ...rm3('m-3'), caption: { en: 'M3 — MOBILE · GRADING', pt: 'M3 — MOBILE · CLASSIFICAÇÃO' }, device: 'phone', span: 2 },
      { ...rv3('st-1'), caption: { en: 'S1 — NO RESULTS', pt: 'S1 — SEM RESULTADOS' }, device: 'browser', span: 3 },
      { ...rv3('st-2'), caption: { en: 'S2 — NO LISTINGS YET', pt: 'S2 — SEM ANÚNCIOS' }, device: 'browser', span: 3 },
      { ...rv3('st-3'), caption: { en: 'S3 — PAYMENT FAILED', pt: 'S3 — PAGAMENTO RECUSADO' }, device: 'browser', span: 3 },
      { ...rv3('st-4'), caption: { en: 'S4 — LOADING RESULTS', pt: 'S4 — CARREGANDO RESULTADOS' }, device: 'browser', span: 3 },
    ],
    ds: [
      { src: reloopPaths.both('ds-primitives'), w: 1871, h: 789, caption: { en: 'PRIMITIVES — RAW VALUES', pt: 'PRIMITIVOS — VALORES BRUTOS' } },
      { src: reloopPaths.both('ds-semantic'), w: 1871, h: 1992, caption: { en: 'SEMANTIC TOKENS', pt: 'TOKENS SEMÂNTICOS' } },
      { src: reloopPaths.both('ds-contrast'), w: 1871, h: 902, caption: { en: 'CONTRAST TABLE (WCAG 2.2 AA)', pt: 'TABELA DE CONTRASTE (WCAG 2.2 AA)' } },
      { src: reloopPaths.both('ds-type'), w: 1871, h: 1050, caption: { en: 'TYPE SCALE — 15 STYLES', pt: 'ESCALA TIPOGRÁFICA — 15 ESTILOS' } },
      { src: reloopPaths.both('ds-components'), w: 1721, h: 1077, caption: { en: 'COMPONENT LIBRARY', pt: 'BIBLIOTECA DE COMPONENTES' } },
      { src: reloopPaths.both('ds-a11y'), w: 1936, h: 807, caption: { en: 'ACCESSIBILITY NOTES', pt: 'NOTAS DE ACESSIBILIDADE' } },
    ],
    outcome: [
      {
        src: reloopPaths.both('metrics'),
        w: 1721,
        h: 663,
        caption: {
          en: 'Targets with definitions and how each would be measured: condition disputes under 1 in 30 delivered orders, listing completion at 70% or more, and a guardrail of under 72 hours to resolve a dispute. Below, the first usability test — five buyers and five sellers — planned before any of it is built.',
          pt: 'Metas com definições e como cada uma seria medida: disputas por estado abaixo de 1 em 30 pedidos entregues, conclusão de anúncios em 70% ou mais, e um guardrail de menos de 72 horas para resolver uma disputa. Abaixo, o primeiro teste de usabilidade — cinco compradoras e cinco vendedores — planejado antes de construir.',
        },
      },
    ],
  },
};


const forgePaths = paths('forge');

/**
 * Frames exported from the Forge case study Figma file. The product is light
 * mode on a #F3F4F6 canvas; the document crops have that canvas knocked out so
 * their white cards sit straight on the sheet, and the labels drawn on the
 * canvas were repainted light.
 */
/** Hi-Fi v3 screens: 1440pt desktop frames at 1936px. */
const fv3 = (name: string) => ({ src: forgePaths.both(`v3/${name}`), w: 1936, h: 1210 });
/** First-round wireframes, recoloured for the dark sheet. No copy, so one file. */
const fwire = (name: string) => ({ src: forgePaths.shared(`wire-v2/${name}`), w: 690, h: 1170 });

const forge: CaseMedia = {
  // Neither InvestIQ's desk, Aether's fan nor Pulse's stack: one window, split
  // by a handle, the light board on one side and the dark one on the other.
  // The seam runs through identical layout, which is the point of the tokens.
  heroCompare: {
    before: fv3('ui-01'),
    after: fv3('ui-05'),
    labels: [
      { en: 'LIGHT', pt: 'CLARO' },
      { en: 'DARK', pt: 'ESCURO' },
    ],
    caption: {
      en: '01 · 05 — THE SAME BOARD IN BOTH THEMES: ONLY THE SEMANTIC TOKENS CHANGE',
      pt: '01 · 05 — O MESMO BOARD NOS DOIS TEMAS: SÓ OS TOKENS SEMÂNTICOS MUDAM',
    },
  },
  cols: {
    problem: 'repeat(2,1fr)',
    research: '1fr',
    strategy: '1fr',
    uxflow: '1fr',
    ui: 'repeat(2,1fr)',
    ds: '1fr',
    outcome: '1fr',
  },
  stages: {
    exploration: [
      {
        kind: 'wires',
        label: { en: 'FIRST ROUND — GREY BOXES, BEFORE THE TOKENS', pt: 'PRIMEIRA RODADA — CAIXAS CINZA, ANTES DOS TOKENS' },
        device: 'browser',
        cols: 5,
        tiles: [
          { screen: fwire('wire-01'), caption: { en: '01 — KANBAN BOARD', pt: '01 — BOARD KANBAN' }, pins: [{ n: 1, x: 30, y: 17 }] },
          { screen: fwire('wire-02'), caption: { en: '02 — COMPONENT GALLERY', pt: '02 — GALERIA DE COMPONENTES' }, pins: [{ n: 2, x: 26, y: 10 }] },
          { screen: fwire('wire-03'), caption: { en: '03 — TASK DETAIL PANEL', pt: '03 — PAINEL DE DETALHE DA TASK' }, pins: [{ n: 3, x: 83, y: 22 }] },
          { screen: fwire('wire-04'), caption: { en: '04 — MODAL CONFIRMATION', pt: '04 — CONFIRMAÇÃO EM MODAL' }, pins: [{ n: 4, x: 75, y: 57 }] },
          { screen: fwire('wire-05'), caption: { en: '05 — DATA TABLE', pt: '05 — TABELA DE DADOS' }, pins: [{ n: 5, x: 50, y: 12 }] },
        ],
        notesLabel: { en: 'WHAT THE HI-FI CHANGED', pt: 'O QUE O HI-FI MUDOU' },
        notes: [
          {
            n: 1,
            text: {
              en: 'Cards were empty blocks. Each one now carries a Status badge and a separate Priority tag — two components, not one combined variant.',
              pt: 'Os cards eram blocos vazios. Cada um agora leva um Status badge e uma tag de Prioridade separada — dois componentes, não uma variante combinada.',
            },
          },
          {
            n: 2,
            text: {
              en: 'A page with one component per tile. It became a composition screen, because nothing ships to the library without an in-context use.',
              pt: 'Uma página com um componente por tile. Virou uma tela de composição, porque nada entra na biblioteca sem um uso em contexto.',
            },
          },
          {
            n: 3,
            text: {
              en: 'The metadata column held from the first sketch. It became where the badge, the tag and the avatar are tested side by side.',
              pt: 'A coluna de metadados ficou desde o primeiro rascunho. Virou o lugar onde badge, tag e avatar são testados lado a lado.',
            },
          },
          {
            n: 4,
            text: {
              en: 'Two equal buttons. The destructive action now takes the Danger button and names what it deletes.',
              pt: 'Dois botões iguais. A ação destrutiva agora usa o botão Danger e diz o que vai excluir.',
            },
          },
          {
            n: 5,
            text: {
              en: 'Plain rows. The table reuses Status badge and Avatar, so a row can never drift from the card showing the same task.',
              pt: 'Linhas simples. A tabela reaproveita Status badge e Avatar, então uma linha nunca se desvia do card da mesma task.',
            },
          },
          {
            text: {
              en: 'No dark board and no health dashboard. Both came once the token layer made a second theme and adoption tracking cheap to add.',
              pt: 'Sem board escuro e sem dashboard de saúde. Os dois vieram quando a camada de tokens deixou barato somar um segundo tema e acompanhar a adoção.',
            },
          },
        ],
      },
    ],
    ui: [
      {
        kind: 'anatomy',
        label: { en: 'TASK DETAIL — WHAT THE SCREEN IS MADE OF', pt: 'DETALHE DA TASK — DO QUE A TELA É FEITA' },
        screen: fv3('ui-02'),
        parts: [
          {
            x: 4.6, y: 25.5, w: 61.9, h: 8.4,
            name: 'Alert · info',
            layer: 'composite',
            text: {
              en: 'Icon, title and body on the info tokens — the same layout the other three severities use.',
              pt: 'Ícone, título e texto nos tokens de info — o mesmo layout das outras três severidades.',
            },
          },
          {
            x: 4.5, y: 38.2, w: 18.2, h: 14.7,
            name: 'Checkbox',
            layer: 'atomic',
            text: {
              en: 'Checked and empty from the same border and fill tokens, with the shared focus ring.',
              pt: 'Marcado e vazio com os mesmos tokens de borda e preenchimento, e o anel de foco compartilhado.',
            },
          },
          {
            x: 4.6, y: 56.7, w: 18.5, h: 6.1,
            name: 'Button',
            layer: 'atomic',
            text: {
              en: 'Primary and secondary share height, radius and focus; only the fill token differs.',
              pt: 'Primário e secundário dividem altura, raio e foco; só o token de preenchimento muda.',
            },
          },
          {
            x: 84.6, y: 16.4, w: 8.2, h: 3.9,
            name: 'Status badge',
            layer: 'atomic',
            text: {
              en: 'status/*-text on status/*-bg, AA in both themes, and always a word, never colour alone.',
              pt: 'status/*-text sobre status/*-bg, AA nos dois temas, e sempre uma palavra, nunca só cor.',
            },
          },
          {
            x: 84.6, y: 21.8, w: 3.8, h: 3.6,
            name: { en: 'Priority tag', pt: 'Tag de prioridade' },
            layer: 'atomic',
            text: {
              en: 'Its own component rather than a badge variant, so status and priority never merge.',
              pt: 'Um componente próprio, não uma variante do badge, para status e prioridade nunca se fundirem.',
            },
          },
          {
            x: 84.6, y: 26.9, w: 2.4, h: 4.0,
            name: 'Avatar',
            layer: 'atomic',
            text: {
              en: 'Initials on the accent tint — the same avatar the board cards and the table rows use.',
              pt: 'Iniciais sobre o tom de destaque — o mesmo avatar dos cards do board e das linhas da tabela.',
            },
          },
          {
            x: 72.9, y: 47.4, w: 17.6, h: 3.6,
            name: 'Tag',
            layer: 'atomic',
            text: {
              en: 'A neutral chip for categories. No colour, so it never competes with status.',
              pt: 'Um chip neutro para categorias. Sem cor, para nunca competir com o status.',
            },
          },
        ],
      },
    ],
  },
  slotLabels: {
    ui: { en: 'IN CONTEXT — COMPOSITES AND ADOPTION', pt: 'EM CONTEXTO — COMPOSTOS E ADOÇÃO' },
  },
  slots: {
    problem: [
      { src: forgePaths.both('problem-numbers'), w: 760, h: 490, caption: { en: 'THE PROBLEM, IN NUMBERS', pt: 'O PROBLEMA, EM NÚMEROS' } },
      { src: forgePaths.both('problem-impact'), w: 760, h: 344, caption: { en: 'DOWNSTREAM IMPACT', pt: 'IMPACTO NA PRÁTICA' } },
    ],
    research: [
      {
        src: forgePaths.both('research'),
        w: 1936,
        h: 757,
        caption: { en: 'INSIGHTS, OPPORTUNITIES, HYPOTHESES', pt: 'INSIGHTS, OPORTUNIDADES, HIPÓTESES' },
      },
    ],
    strategy: [
      {
        src: forgePaths.both('strategy'),
        w: 1936,
        h: 1082,
        caption: { en: 'TOKEN FOUNDATIONS', pt: 'FUNDAÇÕES DE TOKENS' },
      },
      {
        src: forgePaths.both('decisions'),
        w: 1936,
        h: 1936,
        caption: { en: 'KEY DECISIONS, SCOPE AND MVP', pt: 'DECISÕES-CHAVE, ESCOPO E MVP' },
      },
    ],
    uxflow: [
      {
        src: forgePaths.both('uxflow'),
        w: 1936,
        h: 1311,
        caption: { en: 'ATOMIC TO COMPOSITE', pt: 'DO ATÔMICO AO COMPOSTO' },
      },
    ],
    ui: [
      { ...fv3('ui-03'), device: 'browser', caption: { en: '03 — COMPOSITION SHOWCASE', pt: '03 — VITRINE DE COMPOSIÇÃO' } },
      { ...fv3('ui-04'), device: 'browser', caption: { en: '04 — COMPONENT HEALTH DASHBOARD', pt: '04 — PAINEL DE SAÚDE DOS COMPONENTES' } },
    ],
    ds: [
      {
        src: forgePaths.both('ds'),
        w: 1936,
        h: 2491,
        caption: { en: 'DESIGN SYSTEM — FORGE', pt: 'SISTEMA DE DESIGN — FORGE' },
      },
    ],
    outcome: [
      {
        src: forgePaths.both('outcome'),
        w: 1936,
        h: 952,
        caption: { en: 'ROLLOUT IN FIVE STAGES', pt: 'ROLLOUT EM CINCO ETAPAS' },
      },
      {
        src: forgePaths.both('metrics'),
        w: 1936,
        h: 831,
        caption: {
          en: 'Targets with definitions, method and window: component handoff at 1.2h from the 3h in the brief, 70% fewer visual-inconsistency tickets, new-team ramp-up under a third of today, and all 8 teams with a production screen built from the library — plus a guardrail on detached instances, because handoff time falling while detachments rise means the system is being worked around.',
          pt: 'Metas com definição, método e janela: handoff de componente em 1,2h vindo das 3h do brief, 70% menos tickets de inconsistência visual, entrada de time novo em menos de um terço de hoje e os 8 times com uma tela em produção feita com a biblioteca — mais um guardrail de instâncias soltas, porque tempo de handoff caindo enquanto os desanexos sobem significa que estão contornando o sistema.',
        },
      },
    ],
  },
};

const aetherPaths = paths('aether');

/**
 * Frames exported from the Aether case study Figma file. The document pages
 * sit on #1E1E2E; that ground is knocked out to transparency so they sit
 * directly on the sheet. The token page keeps it, because the canvas colour is
 * one of the tokens it shows.
 */
/** Hi-Fi v3 screens, 390x844 at 2x; EN and PT share one height. */
const av3 = (name: string) => ({ src: aetherPaths.both(`v3/${name}`), w: 780, h: 1688 });
/** First-round wireframes, recoloured for the dark sheet. No copy, so one file. */
const awire = (name: string) => ({ src: aetherPaths.shared(`wire-v2/${name}`), w: 780, h: 1688 });

/** Aether's own lavender, for the glow behind its devices. */
const AETHER_GLOW = 'rgba(222, 183, 255, 0.2)';

const aether: CaseMedia = {
  // Flat and fanned rather than tilted like InvestIQ's desk: the practice send
  // and the real send turn out from behind the welcome screen, over orbit rings.
  hero: {
    ratio: 1.75,
    glow: AETHER_GLOW,
    layout: 'fan',
    shots: [
      { device: 'phone', ...av3('ui-03'), x: 22, y: 13, width: 18.5, depth: 0, rotate: -11 },
      { device: 'phone', ...av3('ui-06'), x: 59.5, y: 13, width: 18.5, depth: 0, rotate: 11 },
      { device: 'phone', ...av3('ui-01'), x: 39.5, y: 7, width: 21, depth: 1 },
    ],
    caption: {
      en: '03 PRACTICE SEND · 01 WELCOME · 06 REAL SEND',
      pt: '03 ENVIO DE TREINO · 01 BOAS-VINDAS · 06 ENVIO REAL',
    },
  },
  stages: {
    exploration: [
      {
        kind: 'wires',
        label: { en: 'FIRST ROUND — FIVE SCREENS, ONE PASS', pt: 'PRIMEIRA RODADA — CINCO TELAS, UMA PASSADA' },
        cols: 5,
        tiles: [
          { screen: awire('wire-01'), caption: { en: '01 — WELCOME', pt: '01 — BOAS-VINDAS' } },
          { screen: awire('wire-02'), caption: { en: '02 — WALLET EDUCATION', pt: '02 — ENTENDENDO A CARTEIRA' } },
          {
            screen: awire('wire-03'),
            caption: { en: '03 — GUIDED TRANSACTION', pt: '03 — TRANSAÇÃO GUIADA' },
            pins: [{ n: 1, x: 84, y: 16 }],
          },
          {
            screen: awire('wire-04'),
            caption: { en: '04 — PROCESSING', pt: '04 — PROCESSANDO' },
            pins: [{ n: 2, x: 80, y: 20 }],
          },
          { screen: awire('wire-05'), caption: { en: '05 — SUCCESS', pt: '05 — SUCESSO' } },
        ],
        notesLabel: { en: 'WHAT THE NEXT ROUND CHANGED', pt: 'O QUE A RODADA SEGUINTE MUDOU' },
        notes: [
          {
            n: 1,
            text: {
              en: 'The send said it could not be undone, with no sign of a safe mode. Decision 02 put the mode in words: a practice banner on every rehearsal screen, a different one for the real send.',
              pt: 'O envio dizia que não tinha volta, sem nenhum sinal de modo seguro. A decisão 02 colocou o modo em palavras: um aviso de treino em toda tela do ensaio e outro, diferente, no envio real.',
            },
          },
          {
            n: 2,
            text: {
              en: 'Processing ran once, for real. It now runs twice: all four steps in the rehearsal, then the same four with real funds.',
              pt: 'O processamento rodava uma vez, já valendo. Agora roda duas: os quatro passos no ensaio e depois os mesmos quatro com dinheiro de verdade.',
            },
          },
          {
            text: {
              en: 'Nothing closed the rehearsal. A completion screen now lists the four steps just seen and hands over to the real send, or to one more practice.',
              pt: 'Nada fechava o ensaio. Uma tela de conclusão agora lista os quatro passos que a pessoa acabou de ver e leva ao envio real, ou a mais um treino.',
            },
          },
          {
            text: {
              en: 'The recovery phrase had no screen of its own. Decision 03 placed it after the first send, with a guardrail metric on whether people still save it.',
              pt: 'A frase de recuperação não tinha tela própria. A decisão 03 a colocou depois do primeiro envio, com uma métrica de guardrail sobre as pessoas continuarem salvando.',
            },
          },
          {
            text: {
              en: 'No failure states. Invalid address, insufficient balance and network failure were added, each saying what did not happen and what is still possible.',
              pt: 'Nenhum estado de falha. Endereço inválido, saldo insuficiente e falha de rede entraram, cada um dizendo o que não aconteceu e o que ainda dá para fazer.',
            },
          },
        ],
      },
    ],
    ui: [
      {
        kind: 'strip',
        label: { en: 'THE REHEARSAL — FIVE SCREENS, IN ORDER', pt: 'O ENSAIO — CINCO TELAS, EM ORDEM' },
        steps: [
          {
            screen: av3('ui-01'),
            title: { en: 'WELCOME', pt: 'BOAS-VINDAS' },
            body: {
              en: 'The first thing on screen is the rehearsal itself: a practice run in front, the real send waiting behind it, and a badge that says the flow starts in practice mode.',
              pt: 'A primeira coisa na tela é o próprio ensaio: um treino na frente, o envio real esperando atrás, e um selo dizendo que o fluxo começa no modo treino.',
            },
          },
          {
            screen: av3('ui-02'),
            title: { en: 'WALLET EDUCATION', pt: 'ENTENDENDO A CARTEIRA' },
            body: {
              en: 'One analogy, the wallet already created, and the recovery phrase openly postponed — with the reason written under it.',
              pt: 'Uma analogia, a carteira já criada e a frase de recuperação adiada às claras — com o motivo escrito logo abaixo.',
            },
          },
          {
            screen: av3('ui-03'),
            title: { en: 'PRACTICE SEND', pt: 'ENVIO DE TREINO' },
            body: {
              en: 'The same fields as the real send, each confirmed inline, under a banner that says nothing is sent and no real funds move.',
              pt: 'Os mesmos campos do envio real, cada um confirmado ali mesmo, sob um aviso dizendo que nada é enviado e nenhum valor real se move.',
            },
          },
          {
            screen: av3('ui-04'),
            title: { en: 'PRACTICE PROCESSING', pt: 'TREINO PROCESSANDO' },
            body: {
              en: 'All four steps the real send will take, in order, with the amount and the fee that practice does not charge.',
              pt: 'Os quatro passos que o envio real vai dar, em ordem, com o valor e a taxa que o treino não cobra.',
            },
          },
          {
            screen: av3('ui-05'),
            title: { en: 'PRACTICE DONE', pt: 'TREINO CONCLUÍDO' },
            body: {
              en: 'The rehearsal closes by listing what was just seen. Doing it for real is the main action; practising once more stays available.',
              pt: 'O ensaio fecha listando o que a pessoa acabou de ver. Fazer de verdade é a ação principal; treinar mais uma vez continua disponível.',
            },
          },
        ],
      },
      {
        kind: 'pair',
        label: { en: 'PRACTICE AGAINST REAL — WHAT CHANGES', pt: 'TREINO CONTRA REAL — O QUE MUDA' },
        left: {
          screen: av3('ui-03'),
          tag: { en: 'PRACTICE · NOTHING IS SENT', pt: 'TREINO · NADA É ENVIADO' },
          tone: 'calm',
        },
        right: {
          screen: av3('ui-06'),
          tag: { en: 'REAL · MOVES YOUR FUNDS', pt: 'REAL · MOVE O SEU DINHEIRO' },
          tone: 'alert',
        },
        notes: [
          {
            y: 18.5,
            text: {
              en: 'The banner changes colour and words: lavender says nothing is sent, amber says this one moves your funds.',
              pt: 'O aviso muda de cor e de texto: lavanda diz que nada é enviado, âmbar diz que este move o seu dinheiro.',
            },
          },
          {
            y: 43.5,
            text: {
              en: 'The amount is checked against a practice balance, then against the real one.',
              pt: 'O valor é conferido contra um saldo de treino, depois contra o saldo real.',
            },
          },
          {
            y: 54,
            text: {
              en: 'The fee is shown both times; only the real send charges it.',
              pt: 'A taxa aparece nas duas vezes; só o envio real cobra.',
            },
          },
          {
            y: 66,
            text: {
              en: 'The AI promises nothing leaves the wallet, then says plainly that this send cannot be undone.',
              pt: 'A IA garante que nada sai da carteira e depois diz sem rodeio que este envio não tem volta.',
            },
          },
          {
            y: 88,
            text: {
              en: 'The real send keeps a way back to practice, one tap from the confirm button.',
              pt: 'O envio real mantém um caminho de volta ao treino, a um toque do botão de confirmar.',
            },
          },
        ],
        caption: { en: '03 — PRACTICE SEND · 06 — REAL SEND', pt: '03 — ENVIO DE TREINO · 06 — ENVIO REAL' },
      },
    ],
  },
  stagger: { ui: true },
  slotLabels: {
    ui: { en: 'THE REST OF THE FLOW AND ITS STATES', pt: 'O RESTO DO FLUXO E OS ESTADOS' },
  },
  // The documents are 1200pt wide — half a column would make their body copy
  // unreadable, so every document slot runs full width.
  cols: {
    research: '1fr',
    insights: '1fr',
    strategy: '1fr',
    uxflow: '1fr',
    ui: 'repeat(4,1fr)',
    ds: '1fr',
    outcome: '1fr',
    learnings: '1fr',
  },
  slots: {
    research: [
      {
        src: aetherPaths.both('research'),
        w: 1936,
        h: 2400,
        caption: {
          en: 'DESK RESEARCH, THE TWO PULLS, ASSUMPTIONS',
          pt: 'PESQUISA SECUNDÁRIA, AS DUAS FORÇAS, PRESSUPOSTOS',
        },
      },
      {
        src: aetherPaths.both('competitive'),
        w: 1936,
        h: 1910,
        caption: { en: 'COMPETITIVE SCAN', pt: 'ANÁLISE COMPETITIVA' },
      },
    ],
    insights: [
      {
        src: aetherPaths.both('journey'),
        w: 1936,
        h: 1210,
        caption: {
          en: 'THE JOURNEY IN FIVE MOMENTS',
          pt: 'A JORNADA EM CINCO MOMENTOS',
        },
      },
    ],
    strategy: [
      {
        src: aetherPaths.both('decisions'),
        w: 1936,
        h: 1989,
        caption: { en: 'KEY DECISIONS, SCOPE AND MVP', pt: 'DECISÕES-CHAVE, ESCOPO E MVP' },
      },
    ],
    uxflow: [
      {
        src: aetherPaths.both('flows'),
        w: 1936,
        h: 1883,
        caption: {
          en: 'THE FIVE-SCREEN FLOW, WHAT WE REMOVED, HOW WE GUIDE',
          pt: 'O FLUXO DE CINCO TELAS, O QUE TIRAMOS, COMO GUIAMOS',
        },
      },
    ],
    // The rehearsal and the real send run above as a sequence and a spotlight;
    // this grid is the rest of the product, each screen in its device.
    ui: [
      { device: 'phone', ...av3('ui-07'), caption: { en: '07 — REAL · PROCESSING', pt: '07 — REAL · PROCESSANDO' } },
      { device: 'phone', ...av3('ui-08'), caption: { en: '08 — SUCCESS', pt: '08 — SUCESSO' } },
      { device: 'phone', ...av3('ui-09'), caption: { en: '09 — RECOVERY PHRASE (DEFERRED)', pt: '09 — FRASE DE RECUPERAÇÃO (ADIADA)' } },
      { device: 'phone', ...av3('ui-10'), caption: { en: '10 — ACTIVITY PANEL (EXTENSION)', pt: '10 — PAINEL DE ATIVIDADE (EXTENSÃO)' } },
      { device: 'phone', ...av3('ui-s1'), caption: { en: 'ERROR — INVALID ADDRESS', pt: 'ERRO — ENDEREÇO INVÁLIDO' } },
      { device: 'phone', ...av3('ui-s2'), caption: { en: 'ERROR — INSUFFICIENT BALANCE', pt: 'ERRO — SALDO INSUFICIENTE' } },
      { device: 'phone', ...av3('ui-s3'), caption: { en: 'ERROR — NETWORK FAILURE', pt: 'ERRO — FALHA DE REDE' } },
    ],
    ds: [
      {
        src: aetherPaths.both('ds'),
        w: 1936,
        h: 3996,
        caption: {
          en: 'TOKENS, CONTRAST TABLE AND TYPE SCALE',
          pt: 'TOKENS, TABELA DE CONTRASTE E ESCALA TIPOGRÁFICA',
        },
      },
    ],
    outcome: [
      {
        src: aetherPaths.both('metrics'),
        w: 1936,
        h: 1243,
        caption: {
          en: 'Targets with definitions and methods: 60% or more finishing onboarding, under 5 minutes to the first confirmed send, 4 of 5 test participants able to explain what they sent, and a guardrail on whether the deferred recovery phrase still gets saved. Below, the first usability test, planned and not yet run.',
          pt: 'Metas com definição e método: 60% ou mais concluindo o onboarding, menos de 5 minutos até o primeiro envio confirmado, 4 de 5 participantes explicando o que enviaram, e um guardrail sobre a frase de recuperação adiada continuar sendo salva. Abaixo, o primeiro teste de usabilidade, planejado e ainda não feito.',
        },
      },
    ],
    learnings: [
      {
        src: aetherPaths.both('outcomes'),
        w: 1936,
        h: 1775,
        caption: { en: 'WHAT I LEARNED', pt: 'O QUE EU APRENDI' },
      },
    ],
  },
};

const casadoPaths = paths('casado');
/** Hi-Fi v3 screens: 375pt phone frames at 750px, one per language, same heights. */
const cv3 = (name: string) => ({ src: casadoPaths.both(`v3/${name}`), w: 750, h: 1624 });
/** First-round wireframes, recoloured for the dark sheet. They carry copy, so one per language. */
const cwire = (name: string) => ({ src: casadoPaths.both(`wire-v2/${name}`), w: 750, h: 1624 });

/**
 * Frames exported from the Casado Doces case study Figma file. The research
 * and outcome crops keep only their cards, with the cream canvas knocked out,
 * so the white cards sit straight on the sheet. The design-system sheets carry
 * type and swatches that only read on cream, so they are exported as cream
 * panels with rounded corners instead of bare crops. EN and PT share a size.
 */
const casado: CaseMedia = {
  // Neither InvestIQ's desk, Aether's fan, Pulse's stack nor Forge's slider:
  // one order seen from both ends. The customer's confirmation and Denise's
  // queue stand apart, and the calendar event both of them received sits
  // between, threaded into the row on each screen that holds the same order.
  heroSync: {
    left: {
      screen: cv3('cui-06'),
      tag: { en: 'Customer · Ana', pt: 'Cliente · Ana' },
      mark: { y: 40, h: 21 },
    },
    right: {
      screen: cv3('dui-03'),
      tag: { en: 'Denise · orders', pt: 'Denise · pedidos' },
      mark: { y: 45, h: 14 },
    },
    event: {
      source: { en: 'Google Calendar · both sides', pt: 'Google Agenda · dos dois lados' },
      weekday: { en: 'SAT', pt: 'SÁB' },
      day: '12',
      month: { en: 'SEP', pt: 'SET' },
      time: { en: '3:00 PM', pt: '15:00' },
      title: { en: 'Pickup · Casado Doces', pt: 'Retirada · Casado Doces' },
      lines: [
        { en: 'Order #1042 · chocolate cake, brigadeiros', pt: 'Pedido #1042 · bolo de chocolate, brigadeiros' },
        { en: 'Denise’s kitchen · paid with Pix', pt: 'Cozinha da Denise · pago no Pix' },
      ],
      guests: [
        { en: 'Ana', pt: 'Ana' },
        { en: 'Denise', pt: 'Denise' },
      ],
    },
    caption: {
      en: '06 · 10 — ONE ORDER, ONE EVENT, THE SAME ROW ON BOTH PHONES',
      pt: '06 · 10 — UM PEDIDO, UM EVENTO, A MESMA LINHA NOS DOIS CELULARES',
    },
  },
  // The persona strip and the journey map are 1200pt-wide documents; at half a
  // column their body copy stops being readable.
  cols: { research: '1fr', uxflow: '1fr', ds: '1fr', ui: 'repeat(5,1fr)' },
  stages: {
    exploration: [
      {
        kind: 'wires',
        label: { en: 'FIRST ROUND — BEFORE THE CALENDAR BECAME THE PRODUCT', pt: 'PRIMEIRA RODADA — ANTES DE A AGENDA VIRAR O PRODUTO' },
        cols: 6,
        tiles: [
          { screen: cwire('cwire-01'), caption: { en: '01 — CATALOG', pt: '01 — CATÁLOGO' }, pins: [{ n: 1, x: 36, y: 28 }] },
          { screen: cwire('cwire-02'), caption: { en: '02 — PRODUCT', pt: '02 — PRODUTO' } },
          { screen: cwire('cwire-03'), caption: { en: '03 — CART', pt: '03 — CARRINHO' } },
          { screen: cwire('cwire-04'), caption: { en: '04 — PAYMENT', pt: '04 — PAGAMENTO' }, pins: [{ n: 2, x: 30, y: 35 }] },
          { screen: cwire('cwire-05'), caption: { en: '05 — PICKUP', pt: '05 — RETIRADA' }, pins: [{ n: 3, x: 60, y: 26 }] },
          { screen: cwire('cwire-06'), caption: { en: '06 — CONFIRMATION', pt: '06 — CONFIRMAÇÃO' }, pins: [{ n: 4, x: 50, y: 53 }] },
          { screen: cwire('cwire-07'), caption: { en: '07 — MY ORDERS', pt: '07 — MEUS PEDIDOS' } },
          { screen: cwire('dwire-01'), caption: { en: '08 — DENISE · TODAY', pt: '08 — DENISE · HOJE' } },
          { screen: cwire('dwire-02'), caption: { en: '09 — DENISE · CATALOG', pt: '09 — DENISE · CATÁLOGO' } },
          { screen: cwire('dwire-03'), caption: { en: '10 — DENISE · ORDERS', pt: '10 — DENISE · PEDIDOS' }, pins: [{ n: 5, x: 44, y: 12 }] },
          { screen: cwire('dwire-04'), caption: { en: '11 — DENISE · CALENDAR', pt: '11 — DENISE · AGENDA' }, pins: [{ n: 6, x: 50, y: 59 }] },
          { screen: cwire('dwire-05'), caption: { en: '12 — DENISE · SETTINGS', pt: '12 — DENISE · CONFIGURAÇÕES' } },
        ],
        notesLabel: { en: 'WHAT THE HI-FI CHANGED', pt: 'O QUE O HI-FI MUDOU' },
        notes: [
          {
            n: 1,
            text: {
              en: '“Ready now” read like a delivery app. The hi-fi says pickup only, order today and collect from tomorrow, and a card at the bottom says where.',
              pt: '“Pronto agora” lia como app de entrega. O hi-fi diz só retirada, peça hoje e retire a partir de amanhã, e um card no fim diz onde.',
            },
          },
          {
            n: 2,
            text: {
              en: 'Two bare options. Each one now says what it does to the slot: paying now holds it at once; paying at pickup waits for Denise to confirm.',
              pt: 'Duas opções secas. Cada uma agora diz o que faz com o horário: pagar agora segura na hora; pagar na retirada espera a Denise confirmar.',
            },
          },
          {
            n: 3,
            text: {
              en: 'Only one kind of unavailable day. The hi-fi strikes through full days and labels them, fades closed and past ones, and names all four states in a legend.',
              pt: 'Um só tipo de dia indisponível. O hi-fi risca os dias lotados e escreve “lotado”, esmaece os fechados e passados, e nomeia os quatro estados numa legenda.',
            },
          },
          {
            n: 4,
            text: {
              en: 'A line of text about the calendar. It became the order number, the address and a chip, and a fallback button when the sync fails.',
              pt: 'Uma linha de texto sobre a agenda. Virou número do pedido, endereço e um chip, e um botão de reserva para quando a sincronização falha.',
            },
          },
          {
            n: 5,
            text: {
              en: 'A four-stage pipeline with Accept on every card. Denise thinks in pickup times, so the queue became one list grouped by day, with status as a chip.',
              pt: 'Um funil de quatro etapas com Aceitar em todo card. A Denise pensa em horário de retirada, então a fila virou uma lista só, agrupada por dia, com o status num chip.',
            },
          },
          {
            n: 6,
            text: {
              en: 'A fixed daily limit. It became a stepper that shows how full the chosen day already is, next to a button that blocks it.',
              pt: 'Um limite diário fixo. Virou um stepper que mostra quanto o dia escolhido já está cheio, ao lado de um botão que bloqueia o dia.',
            },
          },
          {
            text: {
              en: 'No edge states. The hi-fi added five: an empty category, a fully booked day, a declined card, a failed calendar sync and an empty queue.',
              pt: 'Sem estados de exceção. O hi-fi somou cinco: categoria vazia, dia lotado, cartão recusado, falha na sincronização da agenda e fila vazia.',
            },
          },
        ],
      },
    ],
    ui: [
      {
        kind: 'lanes',
        label: { en: 'TWO APPS, ONE ORDER — WHERE ONE SIDE DECIDES THE OTHER', pt: 'DOIS APPS, UM PEDIDO — ONDE UM LADO DECIDE O OUTRO' },
        cols: 7,
        lanes: [
          {
            tag: { en: 'Customer app', pt: 'App da cliente' },
            shots: [
              { screen: cv3('cui-01'), caption: { en: '01 — CATALOG', pt: '01 — CATÁLOGO' }, col: 1 },
              { screen: cv3('cui-02'), caption: { en: '02 — PRODUCT', pt: '02 — PRODUTO' }, col: 2 },
              { screen: cv3('cui-03'), caption: { en: '03 — CART', pt: '03 — CARRINHO' }, col: 3 },
              { screen: cv3('cui-04'), caption: { en: '04 — PAYMENT', pt: '04 — PAGAMENTO' }, col: 4 },
              { screen: cv3('cui-05'), caption: { en: '05 — PICKUP', pt: '05 — RETIRADA' }, col: 5 },
              { screen: cv3('cui-06'), caption: { en: '06 — CONFIRMED', pt: '06 — CONFIRMADO' }, col: 6 },
              { screen: cv3('cui-07'), caption: { en: '07 — MY ORDERS', pt: '07 — MEUS PEDIDOS' }, col: 7 },
            ],
          },
          {
            tag: { en: 'Denise’s dashboard', pt: 'Painel da Denise' },
            shots: [
              { screen: cv3('dui-02'), caption: { en: '09 — CATALOG', pt: '09 — CATÁLOGO' }, col: 1 },
              { screen: cv3('dui-05'), caption: { en: '12 — SETTINGS', pt: '12 — CONFIGURAÇÕES' }, col: 4 },
              { screen: cv3('dui-04'), caption: { en: '11 — CALENDAR', pt: '11 — AGENDA' }, col: 5 },
              { screen: cv3('dui-03'), caption: { en: '10 — ORDERS', pt: '10 — PEDIDOS' }, col: 6 },
              { screen: cv3('dui-01'), caption: { en: '08 — TODAY', pt: '08 — HOJE' }, col: 7 },
            ],
          },
        ],
        links: [
          {
            col: 1,
            text: {
              en: 'A toggle in her catalog is what the customer sees listed — carrot cake is hidden on one side, so it never shows on the other.',
              pt: 'Um toggle no catálogo dela é o que a cliente vê listado — o bolo de cenoura está oculto de um lado, então nunca aparece do outro.',
            },
          },
          {
            col: 4,
            text: {
              en: 'The payment methods she switches on in settings decide what checkout offers, and the calendar she connects there is where every confirmed order lands.',
              pt: 'As formas de pagamento que ela liga nas configurações decidem o que o checkout oferece, e a agenda que ela conecta ali é onde cai todo pedido confirmado.',
            },
          },
          {
            col: 5,
            text: {
              en: 'Her orders-per-day limit and blocked days draw the customer’s calendar: the 17th and 24th hit the cap, so they are struck through as full.',
              pt: 'O limite de pedidos por dia e os dias bloqueados desenham a agenda da cliente: os dias 17 e 24 bateram o limite, então aparecem riscados como lotados.',
            },
          },
          {
            col: 6,
            text: {
              en: 'Confirming creates one event on both calendars and one row in her queue — the same order, time and payment on each side.',
              pt: 'Confirmar cria um evento nas duas agendas e uma linha na fila dela — o mesmo pedido, horário e pagamento dos dois lados.',
            },
          },
          {
            col: 7,
            text: {
              en: 'The status she sets from today’s pickups is the chip the customer sees in her orders: in prep, ready, picked up.',
              pt: 'O status que ela marca nas retiradas de hoje é o chip que a cliente vê nos pedidos: em preparo, pronto, retirado.',
            },
          },
        ],
        notesLabel: { en: 'WHAT CROSSES BETWEEN THE LANES', pt: 'O QUE PASSA DE UM LADO PARA O OUTRO' },
      },
    ],
  },
  slotLabels: {
    ui: { en: 'EDGE STATES — WHEN SOMETHING DOESN’T GO TO PLAN', pt: 'ESTADOS DE EXCEÇÃO — QUANDO ALGO SAI DO PLANO' },
  },
  slots: {
    research: [
      {
        src: casadoPaths.both('personas'),
        w: 1189,
        h: 667,
        caption: { en: 'MARINA AND DENISE', pt: 'MARINA E DENISE' },
      },
      {
        src: casadoPaths.both('journey'),
        w: 1608,
        h: 811,
        caption: { en: 'THE JOURNEY IN SIX STAGES', pt: 'A JORNADA EM SEIS ETAPAS' },
      },
    ],
    insights: [
      {
        src: casadoPaths.both('definition'),
        w: 1614,
        h: 892,
        caption: { en: 'METHOD, INSIGHTS, HYPOTHESES', pt: 'MÉTODO, INSIGHTS, HIPÓTESES' },
      },
    ],
    strategy: [
      {
        src: casadoPaths.both('competitors'),
        w: 1614,
        h: 622,
        caption: { en: 'COMPETITIVE SCAN', pt: 'CENÁRIO COMPETITIVO' },
      },
    ],
    uxflow: [
      {
        src: casadoPaths.both('flow'),
        w: 1466,
        h: 139,
        caption: { en: 'FROM CATALOG TO PICKUP', pt: 'DO CATÁLOGO ATÉ A RETIRADA' },
      },
      {
        src: casadoPaths.both('sitemap'),
        w: 1399,
        h: 486,
        caption: { en: 'APP MAP — BOTH SIDES', pt: 'MAPA DO APP — OS DOIS LADOS' },
      },
    ],
    ui: [
      { ...cv3('st-1'), caption: { en: 'S1 — EMPTY CATEGORY', pt: 'S1 — CATEGORIA VAZIA' }, device: 'phone' },
      { ...cv3('st-2'), caption: { en: 'S2 — DAY FULLY BOOKED', pt: 'S2 — DIA LOTADO' }, device: 'phone' },
      { ...cv3('st-3'), caption: { en: 'S3 — CARD DECLINED', pt: 'S3 — CARTÃO RECUSADO' }, device: 'phone' },
      { ...cv3('st-4'), caption: { en: 'S4 — CALENDAR SYNC FAILED', pt: 'S4 — FALHA NA AGENDA' }, device: 'phone' },
      { ...cv3('st-5'), caption: { en: 'S5 — NO ORDERS YET', pt: 'S5 — NENHUM PEDIDO AINDA' }, device: 'phone' },
    ],
    // Every sheet carries translated copy (usage notes, table headers), so each
    // exists per language.
    ds: [
      { src: casadoPaths.both('ds-primitives'), w: 1871, h: 757, caption: { en: 'COLOUR — PRIMITIVES', pt: 'COR — PRIMITIVOS' } },
      { src: casadoPaths.both('ds-semantic'), w: 1871, h: 1936, caption: { en: 'COLOUR — SEMANTIC TOKENS', pt: 'COR — TOKENS SEMÂNTICOS' } },
      { src: casadoPaths.both('ds-contrast'), w: 1871, h: 847, caption: { en: 'CONTRAST — EVERY TEXT TOKEN PASSES AA', pt: 'CONTRASTE — TODO TOKEN DE TEXTO PASSA EM AA' } },
      { src: casadoPaths.both('ds-type'), w: 1871, h: 1012, caption: { en: 'TYPE — FRAUNCES + WORK SANS', pt: 'TIPOGRAFIA — FRAUNCES + WORK SANS' } },
      { src: casadoPaths.both('ds-components'), w: 1614, h: 865, caption: { en: 'COMPONENT LIBRARY', pt: 'BIBLIOTECA DE COMPONENTES' } },
      { src: casadoPaths.both('ds-a11y'), w: 1614, h: 971, caption: { en: 'ACCESSIBILITY NOTES', pt: 'NOTAS DE ACESSIBILIDADE' } },
    ],
    outcome: [
      {
        src: casadoPaths.both('metrics'),
        w: 1721,
        h: 720,
        caption: { en: 'METRICS & VALIDATION PLAN — TARGETS, NOT RESULTS', pt: 'MÉTRICAS E PLANO DE VALIDAÇÃO — METAS, NÃO RESULTADOS' },
      },
    ],
    learnings: [
      {
        src: casadoPaths.both('reflection'),
        w: 1678,
        h: 234,
        caption: { en: 'WHAT I LEARNED', pt: 'O QUE APRENDI' },
      },
    ],
  },
};

/** Keyed by case id. A case with no entry simply shows no figures. */
export const MEDIA: Record<string, CaseMedia> = { investiq, pulse, reloop, forge, aether, casado };
