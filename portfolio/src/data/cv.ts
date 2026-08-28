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
      'Product Designer with 10+ years of experience solving complex design problems across physical and digital products. I bring a user-centered approach to research, interaction design, prototyping, usability testing, visual design, and design systems, while working closely with stakeholders and technical teams. My work has contributed to measurable improvements including 12% lower user drop-off, 22% fewer revisions, and 25–30% faster project delivery.',
    expLabel: 'PROFESSIONAL EXPERIENCE',
    exp: [
      {
        when: '01/2026 — PRESENT',
        title: 'Product Designer UX/UI',
        org: 'Freelance — São Paulo, Brazil · Remote',
        bullets: [
          'Design responsive web and app experiences from discovery to high-fidelity UI, turning user needs and research insights into clear, intuitive product solutions.',
          'Conduct user interviews and usability testing to uncover friction points and improve digital journeys before development.',
          'Create user flows, wireframes, prototypes, and scalable UI in Figma using Auto Layout, components, variants, and reusable patterns.',
          'Build style guides and design documentation while collaborating with stakeholders and developers to deliver consistent, feasible solutions.',
        ],
      },
      {
        when: '06/2024 — 07/2025',
        title: 'Senior Product Designer & Visual Communication Coordinator',
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
        title: 'Senior Product Designer',
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
      'Product Designer com mais de 10 anos de experiência resolvendo problemas complexos de design em produtos físicos e digitais. Trago uma abordagem centrada no usuário para pesquisa, design de interação, prototipagem, testes de usabilidade, design visual e design systems, trabalhando de perto com stakeholders e times técnicos. Meu trabalho contribuiu para melhorias mensuráveis, incluindo 12% menos abandono, 22% menos revisões e entregas 25–30% mais rápidas.',
    expLabel: 'EXPERIÊNCIA PROFISSIONAL',
    exp: [
      {
        when: '01/2026 — ATUAL',
        title: 'Product Designer UX/UI',
        org: 'Freelance — São Paulo, Brasil · Remoto',
        bullets: [
          'Desenho experiências web e app responsivas, da descoberta à UI de alta fidelidade, transformando necessidades dos usuários e insights de pesquisa em soluções claras e intuitivas.',
          'Conduzo entrevistas e testes de usabilidade para revelar pontos de atrito e melhorar jornadas digitais antes do desenvolvimento.',
          'Crio fluxos, wireframes, protótipos e UI escalável no Figma usando Auto Layout, componentes, variants e padrões reutilizáveis.',
          'Construo style guides e documentação de design, colaborando com stakeholders e desenvolvedores para entregar soluções consistentes e viáveis.',
        ],
      },
      {
        when: '06/2024 — 07/2025',
        title: 'Product Designer Sênior & Coordenador de Comunicação Visual',
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
        title: 'Product Designer Sênior',
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
