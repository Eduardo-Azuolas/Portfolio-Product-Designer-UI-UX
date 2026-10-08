import type { Lang } from '../types';

export type CvExperience = { when: string; title: string; org: string; bullets: string[] };
export type CvEducation = { when: string; title: string; org: string };
export type CvSkillGroup = { label: string; items: string[] };

export type Cv = {
  title: string;
  summaryLabel: string;
  /** One entry per paragraph. Mirrors the LinkedIn About section. */
  summary: string[];
  expLabel: string;
  exp: CvExperience[];
  eduLabel: string;
  edu: CvEducation[];
  certLabel: string;
  certs: string[];
  skills: CvSkillGroup[];
};

/*
 * Summary and experience text is kept word-for-word in sync with the LinkedIn
 * profile (English = primary profile, Portuguese = secondary profile). If you
 * change one, change the other.
 */
export const CV: Record<Lang, Cv> = {
  en: {
    title: 'Product Designer UX/UI',
    summaryLabel: 'SUMMARY',
    summary: [
      'I design B2B and fintech products where a wrong step costs money or trust, and I measure the result: my last dashboard redesign cut time to first action by 35%.',
      'I’m a Product Designer (UX/UI) who helps B2B SaaS and fintech teams turn complex products into ones people actually use.',
      'The problems I’m usually brought in for: onboarding where users drop off before they see value, dashboards that bury the insight people came for, and design-to-dev handoffs that lose details along the way.',
      'On that project, a B2B analytics dashboard, I redesigned the experience around role-based insight cards after testing three directions with users. Measured in the client’s analytics, 60 days after launch vs. the 60 days before, feature adoption also rose 22% and 30-day retention 18%.',
      'Before digital, I spent 10+ years designing physical and interactive products, with a degree in Product Design. That background taught me to prototype early, test with real people and respect production constraints. I bring the same habits to software.',
      'I’m open to remote Product Designer and UX Designer roles with US and European teams, as a contractor or full-time via employer of record. Based in São Paulo (UTC−3), with a full workday of overlap with US Eastern time. English (C1), Portuguese (native).',
    ],
    expLabel: 'PROFESSIONAL EXPERIENCE',
    exp: [
      {
        when: '08/2025 — PRESENT',
        title: 'Product Designer (UX/UI)',
        org: 'Freelance — São Paulo, Brazil · Remote',
        bullets: [
          'Freelance product designer for B2B SaaS and mobile products, owning the work from discovery to developer handoff.',
          'Pulse Analytics (B2B analytics dashboard, client under NDA): led a 10-week solo redesign, working cross-functionally with the client’s engineering team. Shipped role-based Insight Cards that cut time to first action by 35%, raised feature adoption 22% and lifted 30-day retention 18% (client analytics, 60 days post-launch vs. 60 days prior).',
          'Ran 5 weeks of discovery: 10 user interviews, an 80-user survey, session recordings, heatmaps and a competitive benchmark (Amplitude, Mixpanel, Looker). Found that 48% of users didn’t know which metric to check first and 62% didn’t return after week one.',
          'Mapped user flows and information architecture, then prototyped and usability-tested 3 design directions before build. Delivered 17 screens (3 role-based homes, drill-downs, a mobile companion, 5 system states) and a 17-component library with WCAG AA text contrast.',
          'Casado Doces (home bakery, app in use): designed a two-sided ordering app for customer and baker, covering 12 screens and 5 edge states. Pickup scheduling syncs to both parties’ Google Calendars, with an 18-component tokenized design system.',
          'InvestIQ (fintech): onboarding redesign developed from a client brief, targeting ≥60% onboarding completion, with usability testing planned.',
        ],
      },
      {
        when: '06/2024 — 07/2025',
        title: 'Senior Designer, Physical Product & Spatial · Visual Communication Coordinator',
        org: 'Live Arq. Promocional — São Paulo, Brazil',
        bullets: [
          'Coordinated a 4-person team across the CNC and Visual Communication departments, delivering interactive event spaces from client brief to installation.',
          'Led 30+ projects end to end, running 3–5 per month, from discovery and requirements through prototyping, validation and delivery.',
          'Redesigned the validation workflow, cutting revision cycles by 22% and improving project efficiency by 30%.',
          'Brought the test-before-build process from 057 to a team with no UX practice: 2+ prototypes per project, catching issues before fabrication.',
          'Ran client alignment sessions using Design Thinking and managed stakeholders and priorities across multiple concurrent projects.',
        ],
      },
      {
        when: '01/2019 — 06/2024',
        title: 'Senior Designer, Physical Product & Spatial (Interactive Event Spaces)',
        org: '057 Comunicação Visual — São Paulo, Brazil',
        bullets: [
          'Led interactive event space projects end to end as the main client contact, delivering about 20 projects per year.',
          'Introduced prototyping and usability testing to the company’s workflow, improving delivery efficiency by about 25% through earlier validation and clearer requirements.',
          'Planned and moderated 5+ usability tests per project, using the findings to identify friction and validate design changes before production.',
          'Led discovery and requirements gathering with clients and technical teams, translating business goals into tested, user-centered solutions.',
        ],
      },
      {
        when: '03/2016 — 12/2018',
        title: 'Product Designer',
        org: 'SP Laser — São Paulo, Brazil',
        bullets: [
          'Designed physical and visual products for laser engraving and machining, from client needs to production-ready concepts.',
          'Partnered with technical and production teams to make designs manufacturable, balancing function, aesthetics, materials and feasibility.',
          'Applied user-centered design to product and material development.',
        ],
      },
      {
        when: '2015',
        title: 'Design Internship',
        org: 'Pax Arq. — São Paulo, Brazil',
        bullets: [
          'Supported furniture and architecture projects with research, concept prototyping and technical documentation.',
          'Participated in client presentations and feedback sessions on design proposals.',
        ],
      },
      {
        when: '01/2014 — 12/2014',
        title: 'Research Project & Scientific Initiation',
        org: 'Centro Universitário Senac — São Paulo, Brazil',
        bullets: [
          'Conducted qualitative research on urban accessibility with people with disabilities (PWD), translating findings into actionable, inclusive design requirements.',
        ],
      },
    ],
    eduLabel: 'EDUCATION',
    edu: [
      { when: '01/2026 — 05/2026', title: 'Digital Product Design Bootcamp', org: 'Tera' },
      { when: '09/2025 — 04/2026', title: 'User Experience & User Design Bootcamp', org: 'Santander Open Academy' },
      { when: '01/2012 — 12/2015', title: 'Bachelor’s Degree in Product Design', org: 'Centro Universitário Senac' },
    ],
    certLabel: 'CERTIFICATIONS',
    certs: [
      'UX and Design with AI — Tera',
      'AI Festival Workshop — Tera',
      'AI UX Lab Workshop — UX Unicórnio',
      'User Experience & User Design: Advanced Track — Santander Open Academy',
      'Figma Certification — Kodree',
      'React Specialization (Ignite) — Rocketseat',
      'Full Stack Web Development (Node.js) — Digital House',
    ],
    skills: [
      {
        label: 'SOFT SKILLS',
        items: [
          'Problem Solving',
          'Team Collaboration',
          'Design Communication',
          'User Empathy',
          'Ownership',
          'Analytical Thinking',
          'Stakeholder Management',
          'Design Thinking',
          'Agile',
        ],
      },
      {
        label: 'TECHNICAL SKILLS',
        items: [
          'UX Research',
          'Usability Testing',
          'Information Architecture',
          'Prototyping',
          'Interaction Design',
          'Design Systems',
          'Design Tokens',
          'Accessibility (WCAG AA)',
          'User Flow',
          'Wireframing',
          'Dev Handoff',
          'Claude',
        ],
      },
      {
        label: 'TOOLS',
        items: ['Figma + FigJam', 'Figma Make', 'Notion', 'Miro', 'HTML', 'CSS', 'JavaScript', 'React (basics)'],
      },
      { label: 'LANGUAGES', items: ['Portuguese (Native)', 'English (C1)', 'French (Basic)'] },
    ],
  },

  pt: {
    title: 'Product Designer UX/UI',
    summaryLabel: 'RESUMO',
    summary: [
      'Projeto produtos B2B e fintech em que um passo errado custa dinheiro ou confiança, e meço o resultado: meu último redesign de dashboard reduziu em 35% o tempo até a primeira ação.',
      'Sou Product Designer (UX/UI) e ajudo times de B2B SaaS e fintech a transformar produtos complexos em produtos que as pessoas realmente usam.',
      'Os problemas que costumo resolver: onboardings em que o usuário desiste antes de ver valor, dashboards que escondem a informação que a pessoa veio buscar e handoffs entre design e desenvolvimento que perdem detalhes pelo caminho.',
      'Nesse projeto, um dashboard de analytics B2B, redesenhei a experiência em torno de cards de insight por perfil de usuário, depois de testar três direções com usuários. Medido no analytics do cliente, 60 dias após o lançamento contra os 60 dias anteriores, a adoção de funcionalidades também subiu 22% e a retenção em 30 dias, 18%.',
      'Antes do digital, passei mais de 10 anos projetando produtos físicos e interativos, com formação em Design de Produto. Essa trajetória me ensinou a prototipar cedo, testar com pessoas reais e respeitar as restrições de produção. Levo os mesmos hábitos para o software.',
      'Estou aberto a vagas remotas de Product Designer e UX Designer com times dos EUA e da Europa, como PJ (contractor) ou em tempo integral via employer of record. Moro em São Paulo (UTC−3), com um dia inteiro de sobreposição com o horário da costa leste dos EUA. Inglês (C1), português (nativo).',
    ],
    expLabel: 'EXPERIÊNCIA PROFISSIONAL',
    exp: [
      {
        when: '08/2025 — ATUAL',
        title: 'Product Designer (UX/UI)',
        org: 'Freelance — São Paulo, Brasil · Remoto',
        bullets: [
          'Product designer freelancer para produtos B2B SaaS e mobile, responsável do discovery ao handoff para desenvolvimento.',
          'Pulse Analytics (dashboard de analytics B2B, cliente sob NDA): liderei sozinho um redesign de 10 semanas, em colaboração com o time de engenharia do cliente. Entreguei Insight Cards por perfil de usuário que reduziram em 35% o tempo até a primeira ação, aumentaram em 22% a adoção de funcionalidades e em 18% a retenção em 30 dias (analytics do cliente, 60 dias após o lançamento vs. 60 dias antes).',
          'Conduzi 5 semanas de discovery: 10 entrevistas com usuários, questionário com 80 usuários, gravações de sessão, mapas de calor e benchmark competitivo (Amplitude, Mixpanel, Looker). Descobri que 48% dos usuários não sabiam qual métrica olhar primeiro e 62% não voltavam depois da primeira semana.',
          'Mapeei fluxos de usuário e arquitetura de informação, depois prototipei e testei a usabilidade de 3 direções de design antes do desenvolvimento. Entreguei 17 telas (3 homes por perfil, drill-downs, um companion mobile e 5 estados de sistema) e uma biblioteca de 17 componentes com contraste de texto WCAG AA.',
          'Casado Doces (confeitaria caseira, app em uso): projetei um app de pedidos com dois lados, cliente e confeiteira, em 12 telas e 5 estados de exceção. O agendamento de retirada sincroniza com o Google Agenda dos dois lados, com um design system de 18 componentes baseado em tokens.',
          'InvestIQ (fintech): redesign de onboarding desenvolvido a partir de um briefing de cliente, com meta de ≥60% de conclusão do onboarding e testes de usabilidade planejados.',
        ],
      },
      {
        when: '06/2024 — 07/2025',
        title: 'Designer Sênior, Produto Físico e Espacial · Coordenador de Comunicação Visual',
        org: 'Live Arq. Promocional — São Paulo, Brasil',
        bullets: [
          'Coordenei uma equipe de 4 pessoas entre os departamentos de CNC e Comunicação Visual, entregando espaços interativos para eventos do briefing do cliente à instalação.',
          'Liderei mais de 30 projetos de ponta a ponta, tocando de 3 a 5 por mês, do discovery e levantamento de requisitos à prototipagem, validação e entrega.',
          'Redesenhei o fluxo de validação, reduzindo os ciclos de revisão em 22% e aumentando a eficiência dos projetos em 30%.',
          'Levei da 057 o processo de testar antes de construir para uma equipe sem prática de UX: 2+ protótipos por projeto, identificando problemas antes da fabricação.',
          'Conduzi alinhamentos com clientes usando Design Thinking e gerenciei stakeholders e prioridades em vários projetos simultâneos.',
        ],
      },
      {
        when: '01/2019 — 06/2024',
        title: 'Designer Sênior, Produto Físico e Espacial (Espaços Interativos para Eventos)',
        org: '057 Comunicação Visual — São Paulo, Brasil',
        bullets: [
          'Liderei projetos de espaços interativos para eventos de ponta a ponta como principal contato do cliente, entregando cerca de 20 projetos por ano.',
          'Introduzi prototipagem e testes de usabilidade no fluxo de trabalho da empresa, melhorando a eficiência das entregas em cerca de 25% com validação mais cedo e requisitos mais claros.',
          'Planejei e moderei 5+ testes de usabilidade por projeto, usando os resultados para identificar atritos e validar mudanças de design antes da produção.',
          'Conduzi discovery e levantamento de requisitos com clientes e equipes técnicas, traduzindo objetivos de negócio em soluções testadas e centradas no usuário.',
        ],
      },
      {
        when: '03/2016 — 12/2018',
        title: 'Designer de Produto',
        org: 'SP Laser — São Paulo, Brasil',
        bullets: [
          'Projetei produtos físicos e soluções visuais para gravação e usinagem a laser, da necessidade do cliente a conceitos prontos para produção.',
          'Trabalhei com as equipes técnicas e de produção para tornar os projetos fabricáveis, equilibrando função, estética, materiais e viabilidade.',
          'Apliquei design centrado no usuário ao desenvolvimento de produtos e materiais.',
        ],
      },
      {
        when: '2015',
        title: 'Estágio em Design',
        org: 'Pax Arq. — São Paulo, Brasil',
        bullets: [
          'Apoiei projetos de mobiliário e arquitetura com pesquisa, prototipagem de conceitos e documentação técnica.',
          'Participei de apresentações e sessões de feedback com clientes sobre propostas de design.',
        ],
      },
      {
        when: '01/2014 — 12/2014',
        title: 'Projeto de Pesquisa e Iniciação Científica',
        org: 'Centro Universitário Senac — São Paulo, Brasil',
        bullets: [
          'Conduzi pesquisa qualitativa sobre acessibilidade urbana com pessoas com deficiência (PcD), transformando os resultados em requisitos de design acionáveis e inclusivos.',
        ],
      },
    ],
    eduLabel: 'FORMAÇÃO',
    edu: [
      { when: '01/2026 — 05/2026', title: 'Bootcamp de Digital Product Design', org: 'Tera' },
      { when: '09/2025 — 04/2026', title: 'Bootcamp de User Experience & User Design', org: 'Santander Open Academy' },
      { when: '01/2012 — 12/2015', title: 'Bacharelado em Design de Produto', org: 'Centro Universitário Senac' },
    ],
    certLabel: 'CERTIFICAÇÕES',
    certs: [
      'UX and Design with AI — Tera',
      'AI Festival Workshop — Tera',
      'AI UX Lab Workshop — UX Unicórnio',
      'User Experience & User Design: Advanced Track — Santander Open Academy',
      'Certificação Figma — Kodree',
      'Especialização React (Ignite) — Rocketseat',
      'Desenvolvimento Web Full Stack (Node.js) — Digital House',
    ],
    skills: [
      {
        label: 'SOFT SKILLS',
        items: [
          'Resolução de problemas',
          'Colaboração em time',
          'Comunicação de design',
          'Empatia com o usuário',
          'Ownership',
          'Pensamento analítico',
          'Gestão de stakeholders',
          'Design Thinking',
          'Agile',
        ],
      },
      {
        label: 'HABILIDADES TÉCNICAS',
        items: [
          'Pesquisa de UX',
          'Testes de usabilidade',
          'Arquitetura de informação',
          'Prototipagem',
          'Design de interação',
          'Design Systems',
          'Design tokens',
          'Acessibilidade (WCAG AA)',
          'Fluxo de usuário',
          'Wireframes',
          'Handoff para dev',
          'Claude',
        ],
      },
      {
        label: 'FERRAMENTAS',
        items: ['Figma + FigJam', 'Figma Make', 'Notion', 'Miro', 'HTML', 'CSS', 'JavaScript', 'React (básico)'],
      },
      { label: 'IDIOMAS', items: ['Português (nativo)', 'Inglês (C1)', 'Francês (básico)'] },
    ],
  },
};
