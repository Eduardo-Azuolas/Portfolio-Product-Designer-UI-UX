import type { Lang } from '../types';

export type CvExperience = { when: string; title: string; org: string; bullets: string[] };
export type CvEducation = { when: string; title: string; org: string };
export type CvSkillGroup = { label: string; items: string[] };

export type Cv = {
  title: string;
  summaryLabel: string;
  summary: string;
  expLabel: string;
  exp: CvExperience[];
  eduLabel: string;
  edu: CvEducation[];
  certLabel: string;
  certs: string[];
  skills: CvSkillGroup[];
};

export const CV: Record<Lang, Cv> = {
  en: {
    title: 'Product Designer UX/UI',
    summaryLabel: 'SUMMARY',
    summary:
      'Product Designer for digital products, building on ten years of physical and spatial product design. Recent freelance work includes a B2B finance dashboard redesign that cut time to first action by 35% and lifted 30-day retention by 18%, and an ordering app now in use by a small food business. I work end to end — research, interaction design, prototyping, usability testing, visual design and design systems — close to stakeholders and engineers.',
    expLabel: 'PROFESSIONAL EXPERIENCE',
    exp: [
      {
        when: '08/2025 — PRESENT',
        title: 'Product Designer UX/UI',
        org: 'Freelance — São Paulo, Brazil · Remote',
        bullets: [
          'Redesigned a B2B finance analytics dashboard for a client under NDA around role-based insight cards: −35% time to first action, +22% feature adoption and +18% 30-day retention in the 60 days after launch.',
          'Design responsive web and app experiences from discovery to high-fidelity UI, including a pickup-first ordering app now in use by a home bakery.',
          'Run discovery before development: 10 user interviews, an 80-user survey and prototype tests of three directions on the dashboard project.',
          'Create user flows, wireframes, prototypes, and scalable UI in Figma using Auto Layout, components, variants, and reusable patterns.',
          'Build style guides and design documentation while collaborating with stakeholders and developers to deliver consistent, feasible solutions.',
        ],
      },
      {
        when: '06/2024 — 07/2025',
        title: 'Senior Designer, Physical Product & Spatial · Visual Communication Coordinator',
        org: 'Live Arq. Promocional — São Paulo, Brazil',
        bullets: [
          'Led 30+ end-to-end projects, from discovery and requirements through prototyping, validation, and delivery, working across design, production, and technical constraints.',
          'Introduced iterative prototyping and usability validation, creating 2+ prototypes per project and catching issues earlier in the process.',
          'Redesigned the validation workflow, reducing revision cycles by 22% and improving overall project efficiency by 30%.',
          'Coordinated stakeholders and cross-functional teams, managing priorities and design decisions across multiple concurrent projects.',
        ],
      },
      {
        when: '01/2019 — 06/2024',
        title: 'Senior Designer, Physical Product & Spatial',
        org: '057 Comunicação Visual — São Paulo, Brazil',
        bullets: [
          'Delivered approximately 20 projects per year, translating client requirements and business objectives into functional, user-centered solutions from concept through production.',
          'Led discovery, requirements gathering, prototyping, usability testing, and design validation on selected projects, collaborating closely with clients and technical teams.',
          'Planned and moderated 5+ usability tests per project using data to identify friction and validate design changes before implementation.',
          'Improved project delivery efficiency by approximately 25% through earlier validation, iterative feedback, and clearer requirements.',
        ],
      },
      {
        when: '03/2016 — 12/2018',
        title: 'Product Designer',
        org: 'SP Laser — São Paulo, Brazil',
        bullets: [
          'Designed physical and visual product solutions for laser engraving and machining, translating client needs into practical, production-ready concepts.',
          'Applied User-Centered Design while balancing functionality, aesthetics, materials, manufacturing processes, and technical feasibility.',
        ],
      },
      {
        when: '01/2014 — 12/2014',
        title: 'Research Project & Scientific Initiation',
        org: 'Centro Universitário Senac — São Paulo, Brazil',
        bullets: [
          'Conducted qualitative research on urban accessibility, exploring the experiences and needs of people with disabilities.',
          'Translated research findings into actionable design requirements using User-Centered Design and accessibility principles to inform more inclusive solutions.',
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
      'AI Festival Workshop — Tera',
      'UX and Design with AI — Tera',
      'AI UX Lab Workshop — UX Unicórnio',
      'Figma Certification — Kodree',
      'React Specialization — Rocketseat',
      'Fullstack WebDev Bootcamp — Digital House',
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
          'Prototyping',
          'Interaction Design',
          'Design Systems',
          'User Flow',
          'Wireframing',
          'Dev Handoff',
          'Claude',
        ],
      },
      { label: 'TOOLS', items: ['Figma + FigJam', 'Figma Make', 'Notion', 'Miro', 'HTML', 'CSS', 'JavaScript'] },
      { label: 'LANGUAGES', items: ['Portuguese (Native)', 'English (C1)', 'French (Basic)'] },
    ],
  },

  pt: {
    title: 'Product Designer UX/UI',
    summaryLabel: 'RESUMO',
    summary:
      'Product Designer de produtos digitais, com dez anos anteriores de design de produto físico e espacial. Trabalhos freelance recentes incluem o redesign de um dashboard financeiro B2B que reduziu em 35% o tempo até a primeira ação e aumentou em 18% a retenção em 30 dias, e um app de pedidos em uso por um pequeno negócio de confeitaria. Trabalho de ponta a ponta — pesquisa, design de interação, prototipagem, testes de usabilidade, design visual e design systems — perto de stakeholders e engenharia.',
    expLabel: 'EXPERIÊNCIA PROFISSIONAL',
    exp: [
      {
        when: '08/2025 — ATUAL',
        title: 'Product Designer UX/UI',
        org: 'Freelance — São Paulo, Brasil · Remoto',
        bullets: [
          'Redesenhei um dashboard de analytics financeiro B2B para um cliente sob NDA, com cards de insight por papel: −35% no tempo até a primeira ação, +22% de adoção de features e +18% de retenção em 30 dias nos 60 dias após o lançamento.',
          'Desenho experiências web e app responsivas, da descoberta à UI de alta fidelidade, incluindo um app de pedidos com retirada em uso por uma confeitaria caseira.',
          'Faço descoberta antes do desenvolvimento: 10 entrevistas com usuários, uma pesquisa com 80 usuários e testes de protótipo de três direções no projeto do dashboard.',
          'Crio fluxos, wireframes, protótipos e UI escalável no Figma usando Auto Layout, componentes, variants e padrões reutilizáveis.',
          'Construo style guides e documentação de design, colaborando com stakeholders e desenvolvedores para entregar soluções consistentes e viáveis.',
        ],
      },
      {
        when: '06/2024 — 07/2025',
        title: 'Designer Sênior, Produto Físico & Espacial · Coordenador de Comunicação Visual',
        org: 'Live Arq. Promocional — São Paulo, Brasil',
        bullets: [
          'Liderei mais de 30 projetos ponta a ponta, da descoberta e requisitos à prototipagem, validação e entrega, atuando entre design, produção e restrições técnicas.',
          'Introduzi prototipagem iterativa e validação de usabilidade, criando 2+ protótipos por projeto e antecipando a identificação de problemas.',
          'Redesenhei o fluxo de validação, reduzindo ciclos de revisão em 22% e melhorando a eficiência geral dos projetos em 30%.',
          'Coordenei stakeholders e times multifuncionais, gerenciando prioridades e decisões de design em vários projetos simultâneos.',
        ],
      },
      {
        when: '01/2019 — 06/2024',
        title: 'Designer Sênior, Produto Físico & Espacial',
        org: '057 Comunicação Visual — São Paulo, Brasil',
        bullets: [
          'Entreguei cerca de 20 projetos por ano, traduzindo requisitos de clientes e objetivos de negócio em soluções funcionais e centradas no usuário, do conceito à produção.',
          'Conduzi descoberta, levantamento de requisitos, prototipagem, testes de usabilidade e validação de design em projetos selecionados, junto a clientes e times técnicos.',
          'Planejei e moderei 5+ testes de usabilidade por projeto, usando dados para identificar atritos e validar mudanças antes da implementação.',
          'Melhorei a eficiência de entrega em cerca de 25% com validação antecipada, feedback iterativo e requisitos mais claros.',
        ],
      },
      {
        when: '03/2016 — 12/2018',
        title: 'Product Designer',
        org: 'SP Laser — São Paulo, Brasil',
        bullets: [
          'Desenhei soluções de produto físico e visual para gravação e usinagem a laser, traduzindo necessidades dos clientes em conceitos práticos e prontos para produção.',
          'Apliquei Design Centrado no Usuário equilibrando função, estética, materiais, processos de fabricação e viabilidade técnica.',
        ],
      },
      {
        when: '01/2014 — 12/2014',
        title: 'Projeto de Pesquisa & Iniciação Científica',
        org: 'Centro Universitário Senac — São Paulo, Brasil',
        bullets: [
          'Conduzi pesquisa qualitativa sobre acessibilidade urbana, explorando as experiências e necessidades de pessoas com deficiência.',
          'Traduzi os achados em requisitos de design acionáveis usando Design Centrado no Usuário e princípios de acessibilidade para soluções mais inclusivas.',
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
      'AI Festival Workshop — Tera',
      'UX and Design with AI — Tera',
      'AI UX Lab Workshop — UX Unicórnio',
      'Certificação Figma — Kodree',
      'Especialização React — Rocketseat',
      'Bootcamp Fullstack WebDev — Digital House',
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
          'Prototipagem',
          'Design de interação',
          'Design Systems',
          'Fluxo de usuário',
          'Wireframes',
          'Handoff para dev',
          'Claude',
        ],
      },
      { label: 'FERRAMENTAS', items: ['Figma + FigJam', 'Figma Make', 'Notion', 'Miro', 'HTML', 'CSS', 'JavaScript'] },
      { label: 'IDIOMAS', items: ['Português (nativo)', 'Inglês (C1)', 'Francês (básico)'] },
    ],
  },
};
