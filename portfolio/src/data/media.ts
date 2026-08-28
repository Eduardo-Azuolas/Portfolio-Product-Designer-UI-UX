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

const { both } = paths('investiq');

/**
 * Frames exported from the InvestIQ case study Figma file.
 * Sizes are the exported asset's own pixels, not the display size.
 */
const investiq: CaseMedia = {
  // The persona strip and the competitor table are 1240pt-wide documents; at
  // half column width their text is unreadable, so research runs full width.
  cols: { problem: '1fr', research: '1fr', insights: '1fr', strategy: '1fr' },
  slots: {
    // `problem` has no slot in the generic scaffold — this image is case-specific.
    problem: [
      {
        src: both('problem-compare'),
        w: 1936,
        h: 303,
        caption: { en: 'FRAGMENTED VS. SIMPLIFIED', pt: 'FRAGMENTADO VS. SIMPLIFICADO' },
      },
    ],
    research: [
      {
        src: both('research-personas'),
        w: 1936,
        h: 261,
        caption: { en: 'INVESTOR PROFILES', pt: 'PERFIS DE INVESTIDOR' },
      },
      {
        src: both('research-competitive'),
        w: 1936,
        h: 532,
        caption: { en: 'COMPETITIVE LANDSCAPE', pt: 'CENÁRIO COMPETITIVO' },
      },
    ],
    // `insights` and `strategy` have no slot in the generic scaffold either.
    strategy: [
      {
        src: both('rationale'),
        w: 1936,
        h: 201,
        caption: { en: 'UX RATIONALE — THREE RULES', pt: 'RACIONAL DE UX — TRÊS REGRAS' },
      },
    ],
    insights: [
      {
        src: both('journey'),
        w: 1936,
        h: 294,
        caption: {
          en: 'ONBOARDING JOURNEY — FIVE STAGES',
          pt: 'JORNADA DE ONBOARDING — CINCO ETAPAS',
        },
      },
    ],
    exploration: [
      { src: both('wire-01'), w: 780, h: 1590, caption: '01 — LANDING' },
      { src: both('wire-02'), w: 780, h: 1278, caption: '02 — ONBOARDING WELCOME' },
      { src: both('wire-03'), w: 780, h: 627, caption: '03 — ACCOUNT SETUP' },
      { src: both('wire-04'), w: 780, h: 1426, caption: '04 — RISK PROFILE' },
      { src: both('wire-05'), w: 780, h: 1188, caption: '05 — AI INSIGHTS' },
      { src: both('wire-06'), w: 780, h: 1234, caption: '06 — DASHBOARD' },
    ],
    uxflow: [
      {
        src: both('flow'),
        w: 1936,
        h: 540,
        caption: { en: 'PRIMARY FLOW & INFORMATION ARCHITECTURE', pt: 'FLUXO PRINCIPAL & ARQUITETURA DE INFORMAÇÃO' },
      },
    ],
    ui: [
      { src: both('ui-01'), w: 780, h: 1864, caption: '01 — LANDING' },
      { src: both('ui-02'), w: 780, h: 1334, caption: { en: '05 — AI STRATEGY', pt: '05 — ESTRATÉGIA IA' } },
      { src: both('ui-03'), w: 780, h: 1466, caption: '06 — DASHBOARD' },
      { src: both('ui-04'), w: 780, h: 1132, caption: { en: '03 — ACCOUNT SETUP', pt: '03 — CRIAÇÃO DE CONTA' } },
      { src: both('ui-05'), w: 780, h: 1190, caption: { en: '04 — RISK PROFILE', pt: '04 — PERFIL DE RISCO' } },
      { src: both('ui-06'), w: 780, h: 1318, caption: { en: '07 — SUGGESTIONS', pt: '07 — SUGESTÕES' } },
    ],
    ds: [
      {
        src: both('ds'),
        w: 1936,
        h: 1492,
        caption: { en: 'DESIGN SYSTEM — PRESTIGE', pt: 'SISTEMA DE DESIGN — PRESTIGE' },
      },
    ],
  },
};


const pulsePaths = paths('pulse');

/**
 * Frames exported from the Pulse Analytics case study Figma file.
 * Its pages are flat — no grouped sub-frames — so most figures are region
 * crops taken from the full-page export at known coordinates.
 */
const pulse: CaseMedia = {
  // Every artefact here is a 1280pt-wide document or a 1440pt desktop screen.
  // At half column width their text stops being readable, so they run full
  // width; only the lo-fi wireframes tolerate two columns.
  cols: {
    problem: '1fr',
    research: '1fr',
    insights: '1fr',
    strategy: '1fr',
    validation: '1fr',
    ui: '1fr',
    exploration: 'repeat(2,1fr)',
  },
  slots: {
    problem: [
      {
        src: pulsePaths.both('problem'),
        w: 1936,
        h: 560,
        caption: { en: 'DIAGNOSIS — THE COST OF NO HIERARCHY', pt: 'DIAGNÓSTICO — O CUSTO DE NÃO TER HIERARQUIA' },
      },
    ],
    research: [
      {
        src: pulsePaths.both('research-methods'),
        w: 1936,
        h: 654,
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
        h: 570,
        caption: { en: 'JOURNEY — BEFORE AND AFTER', pt: 'JORNADA — ANTES E DEPOIS' },
      },
    ],
    strategy: [
      {
        src: pulsePaths.both('strategy'),
        w: 1936,
        h: 355,
        caption: { en: 'PROBLEM FRAMING & HOW MIGHT WE', pt: 'ENQUADRAMENTO DO PROBLEMA & HOW MIGHT WE' },
      },
    ],
    exploration: [
      { src: pulsePaths.shared('wire-01'), w: 952, h: 613, caption: { en: '01 — CONNECT DATA', pt: '01 — CONECTAR DADOS' } },
      { src: pulsePaths.shared('wire-02'), w: 952, h: 613, caption: { en: '02 — AUTHENTICATE SOURCE', pt: '02 — AUTENTICAR FONTE' } },
      { src: pulsePaths.shared('wire-03'), w: 952, h: 613, caption: { en: '03 — MAP DATA', pt: '03 — MAPEAR DADOS' } },
      { src: pulsePaths.shared('wire-04'), w: 952, h: 613, caption: { en: '04 — DATA CONNECTED', pt: '04 — DADOS CONECTADOS' } },
      { src: pulsePaths.shared('wire-05'), w: 952, h: 613, caption: '05 — DASHBOARD' },
      { src: pulsePaths.shared('wire-06'), w: 952, h: 613, caption: '06 — ANALYTICS' },
    ],
    uxflow: [
      {
        src: pulsePaths.both('uxflow'),
        w: 1936,
        h: 1109,
        caption: { en: 'ONBOARDING FLOW & NAVIGATION ARCHITECTURE', pt: 'FLUXO DE ONBOARDING & ARQUITETURA DE NAVEGAÇÃO' },
      },
    ],
    ui: [
      { src: pulsePaths.both('ui-01'), w: 1936, h: 897, caption: { en: '01 — CONNECT DATA', pt: '01 — CONECTAR DADOS' } },
      { src: pulsePaths.both('ui-02'), w: 1936, h: 1006, caption: { en: '02 — AUTHENTICATE SOURCE', pt: '02 — AUTENTICAR FONTE' } },
      { src: pulsePaths.both('ui-03'), w: 1936, h: 882, caption: { en: '03 — MAP DATA', pt: '03 — MAPEAR DADOS' } },
      { src: pulsePaths.both('ui-04'), w: 1936, h: 1172, caption: { en: '04 — DATA CONNECTED', pt: '04 — DADOS CONECTADOS' } },
      { src: pulsePaths.both('ui-05'), w: 1936, h: 1210, caption: { en: '06 — REGIONAL ANALYTICS', pt: '06 — ANALYTICS REGIONAL' } },
      { src: pulsePaths.both('ui-06'), w: 1936, h: 1034, caption: '07 — REPORT BUILDER' },
    ],
    ds: [
      {
        src: pulsePaths.both('ds'),
        w: 1936,
        h: 1099,
        caption: { en: 'DESIGN SYSTEM — PULSE', pt: 'SISTEMA DE DESIGN — PULSE' },
      },
    ],
    validation: [
      {
        src: pulsePaths.both('validation'),
        w: 1936,
        h: 395,
        caption: { en: 'THREE APPROACHES PROTOTYPED AND TESTED', pt: 'TRÊS ABORDAGENS PROTOTIPADAS E TESTADAS' },
      },
    ],
  },
};


const reloopPaths = paths('reloop');

/**
 * Frames exported from the Reloop case study Figma file.
 * Reloop is a light-mode design on a warm cream canvas, so unlike the dark
 * cases its background is kept opaque — the figure reads as a sheet of paper
 * against the portfolio's dark page.
 */
const reloop: CaseMedia = {
  // 1440pt desktop screens and 1280pt documents: at half column width their
  // text stops being readable. Only the lo-fi wireframes take two columns.
  cols: {
    problem: '1fr',
    research: '1fr',
    insights: '1fr',
    strategy: '1fr',
    uxflow: '1fr',
    ui: '1fr',
    exploration: 'repeat(2,1fr)',
  },
  slots: {
    problem: [
      {
        src: reloopPaths.both('problem'),
        w: 1800,
        h: 1120,
        caption: { en: 'PERSONAS — BUYER AND SELLER', pt: 'PERFIS — COMPRADORA E VENDEDOR' },
      },
    ],
    research: [
      {
        src: reloopPaths.both('research-definition'),
        w: 1936,
        h: 927,
        caption: {
          en: 'INSIGHTS, OPPORTUNITIES, HYPOTHESES',
          pt: 'INSIGHTS, OPORTUNIDADES, HIPÓTESES',
        },
      },
      {
        src: reloopPaths.both('research-scan'),
        w: 1936,
        h: 865,
        caption: { en: 'COMPETITIVE SCAN', pt: 'PANORAMA COMPETITIVO' },
      },
    ],
    insights: [
      {
        src: reloopPaths.both('insights'),
        w: 1936,
        h: 676,
        caption: { en: 'BUYING JOURNEY — SIX STAGES', pt: 'JORNADA DE COMPRA — SEIS ETAPAS' },
      },
    ],
    strategy: [
      {
        src: reloopPaths.both('strategy'),
        w: 1936,
        h: 1001,
        caption: { en: 'SCOPE, PRIORITIZATION, REQUIREMENTS, MVP', pt: 'ESCOPO, PRIORIZAÇÃO, REQUISITOS, MVP' },
      },
    ],
    exploration: [
      { src: reloopPaths.both('wire-01'), w: 952, h: 872, caption: { en: '01 — HOME / BROWSE', pt: '01 — INÍCIO / VITRINE' } },
      { src: reloopPaths.both('wire-02'), w: 952, h: 646, caption: { en: '02 — SEARCH RESULTS', pt: '02 — RESULTADOS DE BUSCA' } },
      { src: reloopPaths.both('wire-03'), w: 952, h: 603, caption: { en: '03 — PRODUCT DETAIL', pt: '03 — DETALHE DO PRODUTO' } },
      { src: reloopPaths.both('wire-04'), w: 952, h: 394, caption: { en: '04 — CART', pt: '04 — CARRINHO' } },
      { src: reloopPaths.both('wire-05'), w: 952, h: 593, caption: { en: 'SELLER 02 — LIST AN ITEM', pt: 'VENDEDOR 02 — ANUNCIAR PEÇA' } },
      { src: reloopPaths.both('wire-06'), w: 952, h: 470, caption: { en: 'SELLER 03 — MY LISTINGS', pt: 'VENDEDOR 03 — MEUS ANÚNCIOS' } },
    ],
    uxflow: [
      {
        src: reloopPaths.both('uxflow'),
        w: 1936,
        h: 966,
        caption: { en: 'TASK FLOWS & SITEMAP', pt: 'FLUXOS DE TAREFA & MAPA DO SITE' },
      },
    ],
    ui: [
      { src: reloopPaths.both('ui-01'), w: 1936, h: 1346, caption: { en: '01 — HOME / BROWSE', pt: '01 — INÍCIO / VITRINE' } },
      { src: reloopPaths.both('ui-02'), w: 1936, h: 1287, caption: { en: '03 — PRODUCT DETAIL', pt: '03 — DETALHE DO PRODUTO' } },
      { src: reloopPaths.both('ui-03'), w: 1936, h: 856, caption: { en: '04 — CART', pt: '04 — CARRINHO' } },
      { src: reloopPaths.both('ui-04'), w: 1936, h: 856, caption: { en: '05 — CHECKOUT', pt: '05 — CHECKOUT' } },
      { src: reloopPaths.both('ui-05'), w: 1936, h: 1086, caption: { en: 'SELLER 02 — LIST AN ITEM', pt: 'VENDEDOR 02 — ANUNCIAR PEÇA' } },
      { src: reloopPaths.both('ui-06'), w: 1936, h: 1008, caption: { en: 'SELLER 03 — MY LISTINGS', pt: 'VENDEDOR 03 — MEUS ANÚNCIOS' } },
    ],
    ds: [
      {
        src: reloopPaths.both('ds'),
        w: 1916,
        h: 850,
        caption: { en: 'COMPONENT LIBRARY', pt: 'BIBLIOTECA DE COMPONENTES' },
      },
    ],
  },
};


const forgePaths = paths('forge');

/**
 * Frames exported from the Forge case study Figma file.
 * Light mode on a #F3F4F6 canvas, so the background stays opaque like Reloop.
 * Its pages are single tall frames, so most figures are region crops.
 */
const forge: CaseMedia = {
  cols: {
    problem: 'repeat(2,1fr)',
    research: '1fr',
    strategy: '1fr',
    uxflow: '1fr',
    ui: '1fr',
    ds: '1fr',
    outcome: '1fr',
    exploration: 'repeat(2,1fr)',
  },
  slots: {
    problem: [
      { src: forgePaths.both('problem-numbers'), w: 760, h: 390, caption: { en: 'THE PROBLEM, IN NUMBERS', pt: 'O PROBLEMA, EM NÚMEROS' } },
      { src: forgePaths.both('problem-impact'), w: 760, h: 320, caption: { en: 'DOWNSTREAM IMPACT', pt: 'IMPACTO NA PRÁTICA' } },
    ],
    research: [
      {
        src: forgePaths.both('research'),
        w: 1936,
        h: 730,
        caption: { en: 'INSIGHTS, OPPORTUNITIES, HYPOTHESES', pt: 'INSIGHTS, OPORTUNIDADES, HIPÓTESES' },
      },
    ],
    strategy: [
      {
        src: forgePaths.both('strategy'),
        w: 1936,
        h: 1038,
        caption: { en: 'TOKEN FOUNDATIONS', pt: 'FUNDAÇÕES DE TOKENS' },
      },
    ],
    exploration: [
      { src: forgePaths.shared('wire-01'), w: 920, h: 1560, caption: { en: '01 — KANBAN BOARD', pt: '01 — BOARD KANBAN' } },
      { src: forgePaths.shared('wire-02'), w: 920, h: 1560, caption: { en: '02 — COMPONENT GALLERY', pt: '02 — GALERIA DE COMPONENTES' } },
      { src: forgePaths.shared('wire-03'), w: 920, h: 1560, caption: { en: '03 — TASK DETAIL PANEL', pt: '03 — PAINEL DE DETALHE DA TASK' } },
      { src: forgePaths.shared('wire-04'), w: 920, h: 1560, caption: { en: '04 — MODAL CONFIRMATION', pt: '04 — CONFIRMAÇÃO EM MODAL' } },
      { src: forgePaths.shared('wire-05'), w: 920, h: 1560, caption: { en: '05 — DATA TABLE', pt: '05 — TABELA DE DADOS' } },
    ],
    uxflow: [
      {
        src: forgePaths.both('uxflow'),
        w: 1936,
        h: 1291,
        caption: { en: 'ATOMIC TO COMPOSITE', pt: 'DO ATÔMICO AO COMPOSTO' },
      },
    ],
    ui: [
      { src: forgePaths.both('ui-01'), w: 1936, h: 1205, caption: { en: '01 — KANBAN BOARD', pt: '01 — BOARD KANBAN' } },
      { src: forgePaths.both('ui-02'), w: 1936, h: 1188, caption: { en: '02 — TASK DETAIL PANEL', pt: '02 — PAINEL DE DETALHE DA TASK' } },
      { src: forgePaths.both('ui-03'), w: 1936, h: 933, caption: { en: '03 — COMPOSITION SHOWCASE', pt: '03 — VITRINE DE COMPOSIÇÃO' } },
      { src: forgePaths.both('ui-04'), w: 1936, h: 1127, caption: { en: '04 — COMPONENT HEALTH DASHBOARD', pt: '04 — PAINEL DE SAÚDE DOS COMPONENTES' } },
    ],
    ds: [
      {
        src: forgePaths.both('ds'),
        w: 1936,
        h: 2346,
        caption: { en: 'DESIGN SYSTEM — FORGE', pt: 'SISTEMA DE DESIGN — FORGE' },
      },
    ],
    outcome: [
      {
        src: forgePaths.both('outcome'),
        w: 1936,
        h: 975,
        caption: { en: 'ROLLOUT IN FIVE STAGES', pt: 'ROLLOUT EM CINCO ETAPAS' },
      },
    ],
  },
};

const aetherPaths = paths('aether');

/**
 * Frames exported from the Aether case study Figma file. Its ground is
 * #1E1E2E, so the document crops are knocked out to transparency and sit
 * directly on the sheet; the screens keep their own ground.
 */
const aether: CaseMedia = {
  // The definition strip is a 1200pt-wide document — half a column would make
  // its body copy unreadable, so research runs full width.
  cols: { research: '1fr' },
  slots: {
    research: [
      {
        src: aetherPaths.both('research-definition'),
        w: 1936,
        h: 697,
        caption: { en: 'COMPLETE DEFINITION', pt: 'DEFINIÇÃO COMPLETA' },
      },
    ],
    insights: [
      {
        src: aetherPaths.both('insights-profiles'),
        w: 1936,
        h: 503,
        caption: { en: 'CURIOSITY VS. FEAR', pt: 'CURIOSIDADE VS. MEDO' },
      },
      {
        src: aetherPaths.both('journey'),
        w: 1936,
        h: 1057,
        caption: {
          en: 'THE JOURNEY IN FIVE MOMENTS',
          pt: 'A JORNADA EM CINCO MOMENTOS',
        },
      },
    ],
    strategy: [
      {
        src: aetherPaths.both('strategy-decisions'),
        w: 1936,
        h: 420,
        caption: { en: 'THREE DECISIONS', pt: 'TRÊS DECISÕES' },
      },
      {
        src: aetherPaths.both('strategy-compare'),
        w: 1936,
        h: 535,
        caption: { en: 'COMPARING APPROACHES', pt: 'COMPARAÇÃO DE ABORDAGENS' },
      },
    ],
    // The lo-fi board carries no copy at all, so one file serves both languages.
    exploration: [
      {
        src: aetherPaths.shared('wire-01'),
        w: 640,
        h: 1400,
        caption: { en: '01 — WELCOME', pt: '01 — BOAS-VINDAS' },
      },
      {
        src: aetherPaths.shared('wire-02'),
        w: 640,
        h: 1400,
        caption: { en: '02 — WALLET EDUCATION', pt: '02 — EDUCAÇÃO DA CARTEIRA' },
      },
      {
        src: aetherPaths.shared('wire-03'),
        w: 640,
        h: 1400,
        caption: { en: '03 — GUIDED TRANSACTION', pt: '03 — TRANSAÇÃO GUIADA' },
      },
      {
        src: aetherPaths.shared('wire-04'),
        w: 640,
        h: 1400,
        caption: { en: '04 — PROCESSING', pt: '04 — PROCESSANDO' },
      },
      {
        src: aetherPaths.shared('wire-05'),
        w: 640,
        h: 1400,
        caption: { en: '05 — SUCCESS', pt: '05 — SUCESSO' },
      },
    ],
    uxflow: [
      {
        src: aetherPaths.both('flow-five'),
        w: 1936,
        h: 175,
        caption: { en: 'THE FIVE-SCREEN FLOW', pt: 'O FLUXO DE CINCO TELAS' },
      },
      {
        src: aetherPaths.both('flow-removed'),
        w: 1936,
        h: 522,
        caption: { en: 'WHAT WE REMOVED', pt: 'O QUE REMOVEMOS' },
      },
      {
        src: aetherPaths.both('flow-guide'),
        w: 1936,
        h: 373,
        caption: { en: 'HOW WE GUIDE', pt: 'COMO GUIAMOS' },
      },
    ],
    ui: [
      {
        src: aetherPaths.both('ui-01'),
        w: 780,
        h: 1688,
        caption: { en: '01 — WELCOME', pt: '01 — BOAS-VINDAS' },
      },
      {
        src: aetherPaths.both('ui-02'),
        w: 780,
        h: 1688,
        caption: { en: '02 — WALLET EDUCATION', pt: '02 — EDUCAÇÃO DA CARTEIRA' },
      },
      {
        src: aetherPaths.both('ui-03'),
        w: 780,
        h: 1688,
        caption: { en: '03 — GUIDED TRANSACTION', pt: '03 — TRANSAÇÃO GUIADA' },
      },
      {
        src: aetherPaths.both('ui-04'),
        w: 780,
        h: 1688,
        caption: { en: '04 — PROCESSING', pt: '04 — PROCESSANDO' },
      },
      {
        src: aetherPaths.both('ui-05'),
        w: 780,
        h: 1688,
        caption: { en: '05 — SUCCESS', pt: '05 — SUCESSO' },
      },
      {
        src: aetherPaths.both('ui-06'),
        w: 780,
        h: 1688,
        caption: {
          en: '06 — ACTIVITY PANEL (EXTENSION)',
          pt: '06 — PAINEL DE ATIVIDADE (EXTENSÃO)',
        },
      },
    ],
    ds: [
      {
        // The Portuguese sheet runs 26px taller; the box takes the taller of
        // the pair so both fit by width.
        src: aetherPaths.both('ds'),
        w: 1936,
        h: 2454,
        caption: { en: 'DESIGN SYSTEM — AETHER', pt: 'DESIGN SYSTEM — AETHER' },
      },
    ],
    learnings: [
      {
        src: aetherPaths.both('learnings'),
        w: 1936,
        h: 630,
        caption: { en: 'WHAT I LEARNED', pt: 'O QUE APRENDI' },
      },
    ],
  },
};

const casadoPaths = paths('casado');

/**
 * Frames exported from the Casado Doces case study Figma file. The case runs on
 * cream #FBF6EC, so every crop keeps its own ground — knocking it out would
 * leave dark type floating on the dark sheet.
 */
const casado: CaseMedia = {
  // The persona strip and the journey map are 1200pt-wide documents; at half a
  // column their body copy stops being readable.
  cols: { research: '1fr' },
  slots: {
    research: [
      {
        src: casadoPaths.both('personas'),
        w: 1808,
        h: 928,
        caption: { en: 'MARINA AND DENISE', pt: 'MARINA E DENISE' },
      },
      {
        src: casadoPaths.both('journey'),
        w: 1936,
        h: 828,
        caption: { en: 'THE JOURNEY IN SIX STAGES', pt: 'A JORNADA EM SEIS ETAPAS' },
      },
    ],
    insights: [
      {
        src: casadoPaths.both('definition'),
        w: 1936,
        h: 952,
        caption: { en: 'COMPLETE DEFINITION', pt: 'DEFINIÇÃO COMPLETA' },
      },
    ],
    strategy: [
      {
        src: casadoPaths.both('competitors'),
        w: 1936,
        h: 763,
        caption: { en: 'COMPETITIVE SCAN', pt: 'CENÁRIO COMPETITIVO' },
      },
    ],
    exploration: [
      {
        src: casadoPaths.both('cwire-01'),
        w: 750,
        h: 1624,
        caption: { en: '01 — HOME / CATALOG', pt: '01 — HOME / CATÁLOGO' },
      },
      {
        src: casadoPaths.both('cwire-02'),
        w: 750,
        h: 1624,
        caption: { en: '02 — PRODUCT DETAIL', pt: '02 — DETALHES DO PRODUTO' },
      },
      {
        src: casadoPaths.both('cwire-03'),
        w: 750,
        h: 1624,
        caption: { en: '03 — CART', pt: '03 — CARRINHO' },
      },
      {
        src: casadoPaths.both('cwire-04'),
        w: 750,
        h: 1624,
        caption: { en: '04 — CHECKOUT / PAYMENT', pt: '04 — CHECKOUT / PAGAMENTO' },
      },
      {
        src: casadoPaths.both('cwire-05'),
        w: 750,
        h: 1624,
        caption: { en: '05 — CHECKOUT / PICKUP', pt: '05 — CHECKOUT / RETIRADA' },
      },
      {
        src: casadoPaths.both('cwire-06'),
        w: 750,
        h: 1624,
        caption: { en: '06 — ORDER CONFIRMATION', pt: '06 — CONFIRMAÇÃO DO PEDIDO' },
      },
      {
        src: casadoPaths.both('cwire-07'),
        w: 750,
        h: 1624,
        caption: { en: '07 — ORDER HISTORY', pt: '07 — MEUS PEDIDOS' },
      },
      {
        src: casadoPaths.both('dwire-01'),
        w: 750,
        h: 1624,
        caption: { en: '08 — CHEF HOME / OVERVIEW', pt: '08 — PAINEL / RESUMO DO DIA' },
      },
      {
        src: casadoPaths.both('dwire-02'),
        w: 750,
        h: 1624,
        caption: { en: '09 — CATALOG MANAGEMENT', pt: '09 — GESTÃO DE CATÁLOGO' },
      },
      {
        src: casadoPaths.both('dwire-03'),
        w: 750,
        h: 1624,
        caption: { en: '10 — ORDERS QUEUE', pt: '10 — FILA DE PEDIDOS' },
      },
      {
        src: casadoPaths.both('dwire-04'),
        w: 750,
        h: 1624,
        caption: { en: '11 — CALENDAR & CAPACITY', pt: '11 — AGENDA & CAPACIDADE' },
      },
      {
        src: casadoPaths.both('dwire-05'),
        w: 750,
        h: 1624,
        caption: { en: '12 — SETTINGS', pt: '12 — CONFIGURAÇÕES' },
      },
    ],
    uxflow: [
      {
        src: casadoPaths.both('flow'),
        w: 1936,
        h: 198,
        caption: { en: 'FROM CATALOG TO PICKUP', pt: 'DO CATÁLOGO ATÉ A RETIRADA' },
      },
      {
        src: casadoPaths.both('sitemap'),
        w: 1936,
        h: 616,
        caption: { en: 'APP MAP — BOTH SIDES', pt: 'MAPA DO APP — OS DOIS LADOS' },
      },
    ],
    ui: [
      {
        src: casadoPaths.both('cui-01'),
        w: 750,
        h: 1624,
        caption: { en: '01 — HOME / CATALOG', pt: '01 — HOME / CATÁLOGO' },
      },
      {
        src: casadoPaths.both('cui-02'),
        w: 750,
        h: 1624,
        caption: { en: '02 — PRODUCT DETAIL', pt: '02 — DETALHES DO PRODUTO' },
      },
      {
        src: casadoPaths.both('cui-03'),
        w: 750,
        h: 1624,
        caption: { en: '03 — CART', pt: '03 — CARRINHO' },
      },
      {
        src: casadoPaths.both('cui-04'),
        w: 750,
        h: 1624,
        caption: { en: '04 — CHECKOUT / PAYMENT', pt: '04 — CHECKOUT / PAGAMENTO' },
      },
      {
        src: casadoPaths.both('cui-05'),
        w: 750,
        h: 1624,
        caption: { en: '05 — CHECKOUT / PICKUP', pt: '05 — CHECKOUT / RETIRADA' },
      },
      {
        src: casadoPaths.both('cui-06'),
        w: 750,
        h: 1624,
        caption: { en: '06 — ORDER CONFIRMATION', pt: '06 — CONFIRMAÇÃO DO PEDIDO' },
      },
      {
        src: casadoPaths.both('cui-07'),
        w: 750,
        h: 1624,
        caption: { en: '07 — ORDER HISTORY', pt: '07 — MEUS PEDIDOS' },
      },
      {
        src: casadoPaths.both('dui-01'),
        w: 750,
        h: 1624,
        caption: { en: '08 — CHEF HOME / OVERVIEW', pt: '08 — PAINEL / RESUMO DO DIA' },
      },
      {
        src: casadoPaths.both('dui-02'),
        w: 750,
        h: 1624,
        caption: { en: '09 — CATALOG MANAGEMENT', pt: '09 — GESTÃO DE CATÁLOGO' },
      },
      {
        src: casadoPaths.both('dui-03'),
        w: 750,
        h: 1624,
        caption: { en: '10 — ORDERS QUEUE', pt: '10 — FILA DE PEDIDOS' },
      },
      {
        src: casadoPaths.both('dui-04'),
        w: 750,
        h: 1624,
        caption: { en: '11 — CALENDAR & CAPACITY', pt: '11 — AGENDA & CAPACIDADE' },
      },
      {
        src: casadoPaths.both('dui-05'),
        w: 750,
        h: 1624,
        caption: { en: '12 — SETTINGS', pt: '12 — CONFIGURAÇÕES' },
      },
    ],
    // Colour and type carry only English token names, so those two are shared.
    ds: [
      {
        src: casadoPaths.shared('ds-colors'),
        w: 1800,
        h: 1422,
        caption: { en: 'COR — PRIMITIVES AND SEMANTIC', pt: 'COR — PRIMITIVAS E SEMÂNTICAS' },
      },
      {
        src: casadoPaths.shared('ds-type'),
        w: 1800,
        h: 648,
        caption: { en: 'TYPE — FRAUNCES + WORK SANS', pt: 'TIPOGRAFIA — FRAUNCES + WORK SANS' },
      },
      {
        // The gallery and the notes carry copy, so each language has its own
        // sheet, built from the same six component sets.
        src: casadoPaths.both('ds-components'),
        w: 1800,
        h: 808,
        caption: { en: 'COMPONENT LIBRARY', pt: 'BIBLIOTECA DE COMPONENTES' },
      },
      {
        src: casadoPaths.both('ds-a11y'),
        w: 1800,
        h: 213,
        caption: { en: 'ACCESSIBILITY NOTES', pt: 'NOTAS DE ACESSIBILIDADE' },
      },
    ],
    outcome: [
      {
        src: casadoPaths.both('outcomes'),
        w: 1800,
        h: 296,
        caption: { en: 'PROJECTED OUTCOMES', pt: 'RESULTADOS PROJETADOS' },
      },
    ],
    learnings: [
      {
        src: casadoPaths.both('reflection'),
        w: 1936,
        h: 261,
        caption: { en: 'WHAT I LEARNED', pt: 'O QUE APRENDI' },
      },
    ],
  },
};

/** Keyed by case id. A case with no entry simply shows no figures. */
export const MEDIA: Record<string, CaseMedia> = { investiq, pulse, reloop, forge, aether, casado };
