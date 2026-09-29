import type { CaseStudy } from '../types';

export const CASES: CaseStudy[] = [
  {
    id: 'investiq',
    name: 'InvestIQ',
    code: 'A',
    year: '2026',
    kind: {
      en: 'AI investing platform · mobile & desktop',
      pt: 'Plataforma de investimento com IA · mobile & desktop',
    },
    line: {
      en: 'Investing in Brazil means juggling separate apps and a spreadsheet to see one portfolio.',
      pt: 'Investir no Brasil significa lidar com apps separados e uma planilha para enxergar uma carteira só.',
    },
    spec: {
      role: { en: 'UX/UI design, design system, prototyping', pt: 'UX/UI design, design system, prototipagem' },
      duration: { en: '8 weeks', pt: '8 semanas' },
      team: { en: 'Solo, self-initiated concept', pt: 'Solo, conceito autoral' },
      tools: 'Figma, FigJam, Notion, Claude',
      platform: { en: 'Mobile + desktop web', pt: 'Mobile + web desktop' },
    },
    hi: {
      p: {
        en: 'The data existed but lived in four places at once, so nobody could see one portfolio — let alone act on it.',
        pt: 'Os dados existiam, mas em quatro lugares ao mesmo tempo — ninguém via uma carteira só, muito menos agia sobre ela.',
      },
      m: {
        en: 'Split onboarding into four steps and explained the reasoning before every money decision, so the recommendation reads as earned rather than generic.',
        pt: 'Dividi o onboarding em quatro passos e expliquei o raciocínio antes de cada decisão de dinheiro, para a recomendação parecer merecida, não genérica.',
      },
      o: {
        en: 'Untested concept. Success is defined up front — 60% onboarding completion, 40% of users connecting an account — with a five-person usability test to check it.',
        pt: 'Conceito ainda não testado. O sucesso está definido de antemão — 60% de conclusão do onboarding, 40% conectando uma conta — com um teste de usabilidade com cinco pessoas para verificar.',
      },
    },
    s: {
      context: {
        en: 'Investing in Brazil today means juggling several fronts at once: a brokerage for equities, a bank for fixed income, a separate app for funds, and a spreadsheet to make sense of it all. The information exists — it is just scattered across places that do not talk to each other. InvestIQ starts from that gap: not one more app for the pile, but the layer that already hands you a consolidated portfolio, translated into a decision.',
        pt: 'Investir no Brasil hoje significa lidar com várias frentes ao mesmo tempo: corretora para renda variável, banco para renda fixa, um app de fundos e, no fim, uma planilha para tentar juntar tudo. A informação existe, só não está em nenhum lugar útil. A InvestIQ parte daí: não é mais um app para a pilha, é a camada que já entrega a carteira consolidada e traduzida em decisão.',
      },
      problem: {
        en: 'Multiple apps and passwords to follow one portfolio, manual spreadsheets to consolidate it, and generic recommendations with no profile context. The result is a decision taken without ever seeing the whole picture.',
        pt: 'Múltiplos apps e senhas para acompanhar uma carteira, planilhas manuais para consolidar e recomendações genéricas, sem contexto do perfil. O resultado é uma decisão tomada sem visão do todo.',
      },
      goals: {
        en: 'Deliver a single consolidated view of the investor’s wealth, calibrate every suggestion to their real risk profile, and cut onboarding friction without oversimplifying — a financial decision needs a minimum of depth, even in a fast flow.',
        pt: 'Entregar uma única visão consolidada do patrimônio, calibrar cada sugestão pelo perfil de risco real e cortar fricção no onboarding sem simplificar demais — decisão financeira exige um mínimo de profundidade, mesmo num fluxo rápido.',
      },
      research: {
        en: 'No interviews: this is a self-initiated concept, so every claim about users is written down as an assumption and ranked by risk. Two proto-personas framed the work: the Modern Investor, an urban professional between 28 and 45 who invests across several platforms and has no time to consolidate their own portfolio; and Institutional Access, a higher-net-worth client used to bank or advisor-assisted management who wants the same analytical depth without depending on anyone. A competitive scan covered four blocks — large generalist brokerages, niche digital managers, private banks and global robo-advisors.',
        pt: 'Sem entrevistas: é um conceito autoral, então toda afirmação sobre usuários está escrita como hipótese e ordenada por risco. Duas proto-personas guiaram o trabalho: o Investidor Moderno, profissional urbano entre 28 e 45 anos que investe em várias plataformas e não tem tempo de consolidar a própria carteira; e o Acesso Institucional, cliente de maior patrimônio acostumado à gestão assistida por banco ou assessor, que quer o mesmo nível de análise sem depender de alguém. O cenário competitivo cobriu quatro blocos — corretoras generalistas grandes, gestoras digitais de nicho, private banks e robo-advisors globais.',
      },
      insights: {
        en: 'Mapping the journey by the feeling I expected at each step pointed to where it could break: impatience at sign-up, vulnerability at the risk profile, wariness when asked for account access. Two assumptions carry the most risk: that people will connect their accounts if told exactly what is read, and that they will act on an AI suggestion when they can see the reasoning. Both are hypotheses to test, not findings.',
        pt: 'Mapear a jornada pelo sentimento esperado em cada passo apontou onde ela pode quebrar: impaciência no cadastro, vulnerabilidade no perfil de risco, desconfiança ao pedir acesso às contas. Duas hipóteses carregam mais risco: que as pessoas conectam as contas se souberem exatamente o que é lido, e que agem sobre uma sugestão da IA quando veem o raciocínio. As duas são hipóteses a testar, não achados.',
      },
      strategy: {
        en: 'Aim for the space between brokerages, digital managers and private banks: the analysis you would get from an institutional manager, inside an app you use on your own. Three rules held the flow together — visible progress, one decision per screen, and an explanation before any call to action involving money. Trust comes before the ask, not after.',
        pt: 'Mirar o espaço entre corretoras, gestoras digitais e private banks: a análise que você teria com um gestor institucional, dentro de um app que você usa sozinho. Três regras sustentaram o fluxo — progresso visível, uma decisão por tela e explicação antes de qualquer CTA que envolva dinheiro. Confiança vem antes do pedido, não depois.',
      },
      exploration: {
        en: 'First-round wireframes, drawn before the key decisions: landing, welcome, three onboarding steps, home and suggestions. Placeholder copy and no styling, so the structure could be argued about before any visual decision was locked in. The numbered pins mark what the next round changed.',
        pt: 'Wireframes da primeira rodada, feitos antes das decisões-chave: landing, boas-vindas, três passos de onboarding, início e sugestões. Texto placeholder e nenhuma estilização, para discutir a estrutura antes de travar qualquer decisão visual. Os números marcam o que a rodada seguinte mudou.',
      },
      uxflow: {
        en: 'Landing and welcome, then four onboarding steps — create account, risk profile, connect accounts, AI strategy — and the home dashboard. Only the connection step can be skipped: asking for financial data before the user has seen any value is the biggest trust barrier in the flow, so it comes third, after the profile explains why it is needed. Alternative paths cover a skipped connection, a failed connection, a rejected strategy and a returning user. The information architecture splits into three zones: authentication, onboarding, and the authenticated app.',
        pt: 'Landing e boas-vindas, depois quatro passos de onboarding — criar conta, perfil de risco, conectar contas, estratégia IA — e o dashboard. Só a conexão pode ser pulada: pedir dados financeiros antes de o usuário ver algum valor é a maior barreira de confiança do fluxo, então ela vem em terceiro, depois que o perfil explica por que ela é necessária. Caminhos alternativos cobrem conexão pulada, conexão com erro, estratégia recusada e usuário recorrente. A arquitetura de informação se divide em três zonas: autenticação, onboarding e app autenticado.',
      },
      ui: {
        en: 'High-fidelity screens across mobile and desktop. The strategy screen shows the target allocation, the inputs the AI used and a projected range with a plain caveat before any call to action. Home leads with the total across accounts, allocation against the target and one suggested next step; desktop adds a performance chart with real axes and a holdings table that adds up to the total. Empty, loading and error states cover the moments most likely to fail: connecting accounts and the first dashboard.',
        pt: 'Telas de alta fidelidade em mobile e desktop. A tela de estratégia mostra a alocação alvo, os dados que a IA usou e uma faixa de projeção com ressalva clara antes de qualquer CTA. A home começa pelo total entre contas, a alocação contra a meta e um próximo passo sugerido; no desktop entram um gráfico de desempenho com eixos reais e uma tabela de ativos que soma o total. Estados vazio, de carregamento e de erro cobrem os momentos com mais chance de falhar: conectar contas e o primeiro dashboard.',
      },
      ds: {
        en: 'Tokens live in Figma variables: canvas #12141A, surface #1C1F27, one emerald accent #2FBF8F. The first version’s muted grey failed WCAG AA at 3.8:1, so it was replaced with #939B93 at 6.4:1, and the system page carries a contrast table for every text colour. One family, Inter, so hierarchy comes from size and weight and numbers stay consistent. Button, input and tab-bar components ship with every state, including focus and disabled.',
        pt: 'Os tokens vivem em variáveis do Figma: canvas #12141A, superfície #1C1F27, um único acento esmeralda #2FBF8F. O cinza secundário da primeira versão reprovava no WCAG AA com 3,8:1, então foi trocado por #939B93, com 6,4:1, e a página do sistema traz uma tabela de contraste para cada cor de texto. Uma família só, Inter, para a hierarquia vir de tamanho e peso e os números ficarem consistentes. Botão, input e tab bar vêm com todos os estados, incluindo foco e desabilitado.',
      },
      validation: {
        en: 'Not tested with real investors yet. The plan is a five-person moderated test aimed at the two riskiest assumptions: whether people connect their accounts, and whether they can explain why the strategy was suggested.',
        pt: 'Ainda não testado com investidores reais. O plano é um teste moderado com cinco pessoas, focado nas duas hipóteses de maior risco: se as pessoas conectam as contas e se conseguem explicar por que a estratégia foi sugerida.',
      },
      outcome: {
        en: 'There is no product data. The figures at the top of this sheet are starting targets, not results, and the first test would recalibrate them. What the work produced is a flow where the recommendation is explained before it is asked for, three key decisions documented with the evidence that would change them, and a system consistent enough to extend.',
        pt: 'Não há dados de produto. Os números no topo desta prancha são metas iniciais, não resultados, e o primeiro teste as recalibraria. O que o trabalho produziu foi um fluxo em que a recomendação é explicada antes de ser pedida, três decisões-chave documentadas com a evidência que as mudaria, e um sistema consistente o bastante para crescer.',
      },
      learnings: {
        en: 'Designing without users forced me to be explicit: every claim about people became an assumption with a way to test it. Reviewing my own first version the way a hiring panel would exposed what I had glossed over — a step counter that skipped a step, decorative images where data belonged, a projected rating for something nobody had used. Fixing those taught me more than drawing new screens. With more time, I would run five short interviews before any further UI work, then the usability test.',
        pt: 'Projetar sem usuários me obrigou a ser explícito: toda afirmação sobre pessoas virou uma hipótese com um jeito de testar. Revisar minha primeira versão como uma banca de contratação faria expôs o que eu tinha deixado passar — um contador de passos que pulava um passo, imagens decorativas onde deviam estar dados, uma nota projetada para algo que ninguém tinha usado. Corrigir isso ensinou mais do que desenhar telas novas. Com mais tempo, eu faria cinco entrevistas curtas antes de qualquer tela nova, e depois o teste de usabilidade.',
      },
      thin: ['validation'],
      metrics: [
        { v: '≥60%', k: { en: 'Onboarding completion', pt: 'Conclusão do onboarding' }, proj: true, basis: 'target' },
        { v: '≥40%', k: { en: 'Users who connect an account', pt: 'Usuários que conectam uma conta' }, proj: true, basis: 'target' },
        { v: { en: '4 of 5', pt: '4 de 5' }, k: { en: 'Test participants who can explain the suggestion', pt: 'Participantes que explicam a sugestão' }, proj: true, basis: 'target' },
      ],
    },
  },

  {
    id: 'pulse',
    name: 'Pulse Analytics',
    code: 'B',
    year: '2026',
    kind: { en: 'B2B analytics dashboard · finance', pt: 'Dashboard de analytics B2B · finanças' },
    line: {
      en: 'Users opened the dashboard, saw dozens of charts, and left without taking a single action.',
      pt: 'Usuários abriam o dashboard, viam dezenas de gráficos e saíam sem tomar nenhuma ação.',
    },
    spec: {
      role: { en: 'Product designer (freelance)', pt: 'Product designer (freelance)' },
      duration: { en: '10 weeks', pt: '10 semanas' },
      team: { en: 'Solo designer, working with the client’s engineering team', pt: 'Designer solo, junto com o time de engenharia do cliente' },
      tools: 'Figma, FigJam, Notion, Claude',
      platform: { en: 'Desktop web, mobile extension', pt: 'Web desktop, extensão mobile' },
    },
    hi: {
      p: {
        en: 'Users could reach the data but never a decision — too much information, with no hierarchy and no context.',
        pt: 'Usuários chegavam aos dados, mas nunca à decisão — informação demais, sem hierarquia e sem contexto.',
      },
      m: {
        en: 'Rebuilt the dashboard around narrative instead of inventory: visual hierarchy, personalization by role, and progressive alerts.',
        pt: 'Reconstruí o dashboard em torno de narrativa, não de inventário: hierarquia visual, personalização por papel e alertas progressivos.',
      },
      o: {
        en: 'Time to first action fell 35% and feature adoption rose 22% in the first 60 days after launch.',
        pt: 'O tempo até a primeira ação caiu 35% e a adoção de features subiu 22% nos primeiros 60 dias após o lançamento.',
      },
    },
    s: {
      context: {
        en: 'Pulse Analytics centralizes the commercial, financial and operational data of a financial-sector client into a single source of truth, integrating more than 40 sources — from ERPs such as SAP and TOTVS to CRMs and spreadsheets — for teams of 10 to 200 people. It grew fast, from 12 to over 40 available metrics in 18 months, and the interface never caught up with that fragmentation. Commercial managers, financial analysts and leadership all worked from the same screen.',
        pt: 'O Pulse Analytics centraliza os dados comerciais, financeiros e operacionais de um cliente do setor financeiro numa única fonte de verdade, integrando mais de 40 fontes — de ERPs como SAP e TOTVS a CRMs e planilhas — para times de 10 a 200 pessoas. Cresceu rápido, de 12 para mais de 40 métricas em 18 meses, e a interface nunca acompanhou essa fragmentação. Gestores comerciais, analistas financeiros e diretoria trabalhavam todos na mesma tela.',
      },
      problem: {
        en: 'Users opened the dashboard, saw dozens of charts and numbers, and left without acting. 48% did not know which metric to look at first, any single action took four to six clicks, and 62% never came back after the first week. The cost showed up in the business: 28% churn in the first 90 days and an NPS of 31, below the SaaS average of 35.',
        pt: 'Usuários abriam o dashboard, viam dezenas de gráficos e números e saíam sem agir. 48% não sabiam qual métrica olhar primeiro, qualquer ação exigia de quatro a seis cliques e 62% não voltavam depois da primeira semana. O custo aparecia no negócio: 28% de churn nos primeiros 90 dias e NPS de 31, abaixo da média SaaS de 35.',
      },
      goals: {
        en: 'Turn a dense dashboard into a decision-making tool that adapts to each user’s role and delivers the right context at the right moment — without hiding the depth that power users depend on.',
        pt: 'Transformar um dashboard denso em uma ferramenta de decisão que se adapta ao perfil de cada usuário e entrega o contexto certo no momento certo — sem esconder a profundidade de que o usuário avançado depende.',
      },
      research: {
        en: 'Five weeks of discovery: ten user interviews, session recording analysis, heatmaps and clickmaps, a survey with 80 active users, and benchmarking against Amplitude, Mixpanel and Looker — tools the client’s own customers already had open in another tab.',
        pt: 'Cinco semanas de discovery: dez entrevistas com usuários, análise de gravações de sessão, heatmaps e clickmaps, survey com 80 usuários ativos e benchmarking com Amplitude, Mixpanel e Looker — ferramentas que os próprios clientes já mantinham abertas em outra aba.',
      },
      insights: {
        en: 'Four findings, and none of them was about missing data. Every metric carried the same visual weight, so nothing read as urgent. Numbers arrived with no goal and no historical comparison, so a value could not be judged good or bad. Seeing a metric never led to a next step. And a single layout served every profile, though commercial managers, financial analysts and leadership need different things from the same screen.',
        pt: 'Quatro achados, e nenhum era sobre falta de dados. Toda métrica tinha o mesmo peso visual, então nada lia como urgente. Os números chegavam sem meta e sem comparação histórica, então não dava para julgar se um valor era bom ou ruim. Ver uma métrica nunca levava a um próximo passo. E um único layout servia a todos os perfis, embora gestores comerciais, analistas financeiros e diretoria precisem de coisas diferentes da mesma tela.',
      },
      strategy: {
        en: 'The problem was not a lack of data, it was a lack of meaning. Benchmarking showed the gap plainly: no reference tool combined automatic hierarchy with a low learning curve. That pointed at an insight-driven hybrid — smart visual hierarchy, personalization by role, and progressive alerts, with no manual setup asked of anyone.',
        pt: 'O problema não era falta de dados, era falta de significado. O benchmarking mostrou a lacuna com clareza: nenhuma referência combinava hierarquia automática com baixa curva de aprendizado. Isso apontou para um híbrido orientado a insights — hierarquia visual inteligente, personalização por papel e alertas progressivos, sem exigir configuração manual de ninguém.',
      },
      exploration: {
        en: 'Three directions were prototyped and tested. A static dashboard that only reorganized the existing layout was cheap to build and gained no real clarity. Customizable storytelling gave users full control and lost the new ones to setup effort. The insight-driven hybrid won because it personalizes without asking anyone to configure anything. The first round of wireframes came before that decision: onboarding started on data sources and the product opened on a dashboard of charts. The pins below mark what the next round changed.',
        pt: 'Três direções foram prototipadas e testadas. Um dashboard estático, que apenas reorganizava o layout atual, era barato de construir e não trazia ganho real de clareza. O storytelling customizável dava controle total e perdia os usuários novos no esforço de configuração. O híbrido orientado a insights venceu porque personaliza sem pedir configuração a ninguém. A primeira rodada de wireframes veio antes dessa decisão: o onboarding começava pelas fontes de dados e o produto abria num dashboard de gráficos. Os pinos abaixo marcam o que a rodada seguinte mudou.',
      },
      uxflow: {
        en: 'Onboarding runs in four steps — choose a role, connect and authenticate a source, map its fields to Pulse metrics, done. The role decides which Insight Cards come first. Navigation then splits four ways: Home for prioritized insight cards and the day’s executive summary, Dashboards for the commercial and regional views, Reports for the drag-and-drop builder, and Settings for integrations and permissions.',
        pt: 'O onboarding roda em quatro etapas — escolher o papel, conectar e autenticar a fonte, mapear os campos para as métricas do Pulse, pronto. O papel decide quais Insight Cards vêm primeiro. A navegação então se divide em quatro: Home, com os Insight Cards priorizados e o resumo executivo do dia; Dashboards, com as visões comercial e regional; Relatórios, com o builder drag-and-drop; e Configurações, com integrações e permissões.',
      },
      ui: {
        en: 'Four structural changes carry the interface. Each card holds a metric, its context and a next step in one actionable component, replacing loose tables and charts. Depth is layered, so people start at the executive summary and drill down without losing the thread. Metrics are ordered by role with no manual setup. And the small daily details do the rest — count-up animations, contextual skeletons, empty states that suggest an action, and WCAG 2.2 AA contrast.',
        pt: 'Quatro mudanças estruturais sustentam a interface. Cada card reúne métrica, contexto e próximo passo em um componente acionável, substituindo tabelas e gráficos soltos. A profundidade é em camadas, então a pessoa começa no resumo executivo e aprofunda sem perder o fio. As métricas são ordenadas por papel, sem configuração manual. E os detalhes pequenos do dia a dia fazem o resto — animações de contagem, skeletons contextualizados, estados vazios que sugerem ação e contraste WCAG 2.2 AA.',
      },
      ds: {
        en: 'A system built for operational clarity and data density: a deep canvas at #080B14 over a #10182B surface, Pulse Blue #3B82F6 as the single accent, and colour reserved for state — green for success, red for alert, amber for review. Colour runs in two tiers (primitives, then semantic tokens with every text pair at WCAG AA), one 15-style type scale, and 17 components — from buttons with every state to the Insight Card itself.',
        pt: 'Um sistema feito para clareza operacional e densidade de dados: canvas profundo #080B14 sobre superfície #10182B, Azul Pulse #3B82F6 como acento único e cor reservada para estado — verde para sucesso, vermelho para alerta, âmbar para revisão. A cor tem duas camadas (primitivos e tokens semânticos, com todo par de texto em WCAG AA), uma escala tipográfica de 15 estilos e 17 componentes — de botões com todos os estados ao próprio Insight Card.',
      },
      validation: {
        en: 'The three directions were prototyped and tested with users before anything was built, and the outcome was measured against the existing user base 60 days after launch rather than estimated from a prototype.',
        pt: 'As três direções foram prototipadas e testadas com usuários antes de qualquer desenvolvimento, e o resultado foi medido com a base de usuários existente 60 dias após o lançamento, não estimado a partir de protótipo.',
      },
      outcome: {
        en: 'Time to first action fell 35%, feature adoption rose 22%, and 30-day retention rose 18%. The gain came from ordering and context, not from new metrics — the product already had the data it needed.',
        pt: 'O tempo até a primeira ação caiu 35%, a adoção de features subiu 22% e a retenção em 30 dias subiu 18%. O ganho veio de ordenação e contexto, não de novas métricas — o produto já tinha os dados de que precisava.',
      },
      learnings: {
        en: 'More data is not more value. Adding metrics was never the hard part; curation — deciding what not to show — mattered as much as what stayed. The insight-prioritization system took as much design work as engineering, and it is where most of the time went. And layered complexity beat radical simplification: hiding data is not the answer, progressive disclosure is, because power users still need a path down to the raw number.',
        pt: 'Mais dados não é mais valor. Adicionar métricas nunca foi o difícil; a curadoria — decidir o que não mostrar — importou tanto quanto o que ficou. O sistema de priorização de insights exigiu tanto design quanto engenharia, e foi onde a maior parte do tempo foi. E complexidade em camadas venceu a simplificação radical: esconder dados não é a resposta, progressividade é, porque o usuário avançado ainda precisa de um caminho até o número bruto.',
      },
      metrics: [
        { v: '-35%', k: { en: 'Average time to first action', pt: 'Tempo médio até a primeira ação' }, proj: false },
        { v: '+22%', k: { en: 'Feature adoption rate', pt: 'Taxa de adoção de features' }, proj: false },
        { v: '+18%', k: { en: '30-day retention', pt: 'Retenção em 30 dias' }, proj: false },
      ],
    },
  },

  {
    id: 'aether',
    name: 'Aether',
    code: 'C',
    year: '2026',
    kind: {
      en: 'AI-guided Web3 wallet onboarding',
      pt: 'Onboarding de carteira Web3 guiado por IA',
    },
    line: {
      en: 'The cursor blinks at the destination-address field, and the user stops.',
      pt: 'O cursor pisca no campo de endereço de destino, e o usuário para.',
    },
    spec: {
      role: { en: 'End-to-end product design', pt: 'Design de produto ponta a ponta' },
      duration: { en: '6 weeks', pt: '6 semanas' },
      team: { en: 'Solo project', pt: 'Projeto solo' },
      tools: { en: 'Figma, Figma Variables, prototyping', pt: 'Figma, Figma Variables, prototipagem' },
      platform: { en: 'Mobile app', pt: 'App mobile' },
    },
    hi: {
      p: {
        en: 'Web3 wallets assume the user already understands private keys, gas and reversibility — so the first transaction is where people quit.',
        pt: 'Carteiras Web3 assumem que o usuário já entende chaves privadas, gás e reversibilidade — então a primeira transação é onde as pessoas desistem.',
      },
      m: {
        en: 'Let the user rehearse the transaction in a guided simulation before confirming a real one, and teach each concept only at the moment it matters.',
        pt: 'Deixar o usuário ensaiar a transação numa simulação guiada antes de confirmar a real, e ensinar cada conceito só no momento em que ele importa.',
      },
      o: {
        en: 'Targets for a first release: 60% or more finishing onboarding, and the first confirmed send inside five minutes.',
        pt: 'Metas para uma primeira versão: 60% ou mais concluindo o onboarding, e o primeiro envio confirmado em menos de cinco minutos.',
      },
    },
    s: {
      context: {
        en: 'Aether is an AI-guided Web3 wallet that teaches by doing. Most wallets treat onboarding like a form — generate a seed phrase, confirm you saved it, pick a network, done. That works for people who already know what those words mean, and loses everyone else on the way. The premise here is the opposite: teach a concept exactly when it becomes relevant, in language the person already uses, and let them practise before risking anything real.',
        pt: 'Aether é uma carteira Web3 guiada por IA que ensina fazendo. A maior parte das carteiras trata onboarding como formulário — gere uma seed phrase, confirme que guardou, escolha uma rede, pronto. Isso funciona para quem já entende o que essas palavras significam, e abandona todos os outros no meio do caminho. A premissa aqui é o oposto: ensinar um conceito exatamente quando ele se torna relevante, na linguagem que a pessoa já usa, e deixar que ela pratique antes de arriscar algo real.',
      },
      problem: {
        en: 'Published usability studies of Web3 wallets keep describing the same moment: the user reaches the destination-address field and stops. The cursor blinks. They reread the field, check it again, hesitate. That one second — small, but loaded with the fear of getting something irreversible wrong — is the moment the whole product was designed around.',
        pt: 'Estudos de usabilidade publicados sobre carteiras Web3 descrevem sempre o mesmo instante: o usuário chega ao campo de endereço de destino e para. O cursor pisca. Ele relê o campo, verifica de novo, hesita. Esse segundo — pequeno, mas carregado do medo de errar algo irreversível — é o momento em torno do qual o produto inteiro foi desenhado.',
      },
      goals: {
        en: 'Simulate the first transaction in a safe, reversible sandbox before any real one. Never gate progress behind an unexplained term — gas fee, seed phrase — without teaching it inline, in the moment. And complete the whole guided flow in under five minutes for a first-time user.',
        pt: 'Simular a primeira transação num sandbox seguro e reversível antes de qualquer transação real. Nunca travar o progresso atrás de um termo não explicado — taxa de gás, seed phrase — sem ensiná-lo inline, no momento. E concluir o fluxo guiado inteiro em menos de cinco minutos para quem chega pela primeira vez.',
      },
      research: {
        en: 'Desk research only — no interviews or tests of my own. I read published usability studies and app-store reviews of Web3 wallets, focusing on the moment of hesitation, and walked through the onboarding of wallets already on the market to map where they lose people.',
        pt: 'Só pesquisa desk — nenhuma entrevista ou teste meu. Li estudos de usabilidade publicados e avaliações de lojas de apps sobre carteiras Web3, com foco no momento da hesitação, e percorri o onboarding de carteiras já no mercado para mapear onde elas perdem as pessoas.',
      },
      insights: {
        en: 'Everything here is an assumption to test, not a finding. Desk research points to two pulls that coexist in the same person that coexist in the same person, often in the same session, and the design has to serve both rather than pick one. Curiosity wants to understand how this works: it reads the explanations to the end and gets frustrated by vague answers. Fear does not want to lose money over a silly mistake: it skips long explanations looking for confirmation, and wants to be stopped from making a mistake rather than merely warned. Underneath both, the same assumption: people probably do not abandon because the product is hard, but because they are afraid of doing something irreversible with real money. Explaining Web3 concepts upfront likely raises anxiety; showing the action happen once, safely, likely lowers it.',
        pt: 'Tudo aqui é pressuposto a testar, não achado. A pesquisa secundária aponta duas forças que convivem na mesma pessoa que coexistem na mesma pessoa, muitas vezes na mesma sessão, e o design precisa servir aos dois em vez de escolher um. A curiosidade quer entender como aquilo funciona: lê as explicações até o fim e se frustra com respostas vagas. O medo não quer perder dinheiro por um erro bobo: pula explicações longas atrás de confirmação, e quer ser impedido de errar, não apenas avisado. Sob as duas, o mesmo pressuposto: as pessoas provavelmente não desistem porque o produto é difícil, e sim porque têm medo de fazer algo irreversível com dinheiro de verdade. Explicar conceitos de Web3 logo de cara provavelmente aumenta a ansiedade; mostrar a ação acontecendo uma vez, com segurança, provavelmente reduz.',
      },
      strategy: {
        en: 'Three decisions set Aether apart from the market default. Teach before acting, so each concept arrives when it becomes necessary and not before. Rehearse before the real thing, so the user practises in a simulation identical to the real experience, at no cost and no risk. And speak human, so terms like hash, gas and signature are translated into what they actually mean for the person using them, without losing precision. Prioritization followed impact against the core fear: trimming screens and replacing jargon first, the full guided-simulation engine sequenced after.',
        pt: 'Três decisões separam a Aether do padrão de mercado. Ensinar antes de agir, para cada conceito chegar quando se torna necessário e não antes. Simular antes do real, para o usuário praticar numa simulação idêntica à experiência real, sem custo e sem risco. E falar humano, para termos como hash, gás e assinatura serem traduzidos no que de fato significam para quem está usando, sem perder precisão. A priorização seguiu o impacto sobre o medo central: cortar telas e substituir jargão primeiro, o motor completo de simulação guiada depois.',
      },
      exploration: {
        en: 'Three directions were weighed. Tutorial-first would explain every Web3 concept before letting the user touch anything. Sandbox-first would drop them into a full sandbox with no guidance at all. Guided simulation won: narrate a real first transaction step by step, with the user acting while the system explains only what is happening right now. A gamified XP-and-levels framing was considered and rejected for trivializing what is still, functionally, a real financial action. A chatbot-style question-and-answer onboarding was rejected for adding a decision — what to ask — at exactly the moment friction needed to go down. The first round of wireframes followed that path in five screens and one pass; the pins below mark what the rehearsal changed once it became the idea of the case.',
        pt: 'Três direções foram pesadas. Tutorial primeiro explicaria cada conceito Web3 antes de deixar o usuário tocar em qualquer coisa. Sandbox primeiro o jogaria num ambiente livre sem orientação nenhuma. A simulação guiada venceu: narrar uma primeira transação real passo a passo, com o usuário agindo enquanto o sistema explica só o que está acontecendo naquele momento. Um enquadramento gamificado, com XP e níveis, foi considerado e rejeitado por banalizar o que ainda é, na prática, uma ação financeira real. Um onboarding em formato de chatbot foi rejeitado por adicionar uma decisão — o que perguntar — exatamente onde o atrito precisava diminuir. A primeira rodada de wireframes seguiu esse caminho em cinco telas e uma única passada; os pinos abaixo marcam o que o ensaio mudou quando virou a ideia do case.',
      },
      uxflow: {
        en: 'Five screens, one linear path, no branching: welcome, wallet education, guided transaction, processing, success. What was removed matters as much as what stayed — the seed phrase exposed on the first screen before any context, manual network selection in the first session, untranslated gas jargon presented as mandatory decision fields, and the pile of generic confirmation screens. Three mechanisms repeat across the whole flow so the pattern becomes predictable: a chat bubble where the AI speaks in first person at the top of every screen, progressive disclosure that shows only what the current step needs, and a double confirmation in plain language before anything irreversible.',
        pt: 'Cinco telas, um caminho linear, sem ramificação: boas-vindas, educação da carteira, transação guiada, processamento, sucesso. O que foi removido importa tanto quanto o que ficou — a seed phrase exposta na primeira tela antes de qualquer contexto, a escolha manual de rede na primeira sessão, o jargão de gás sem tradução apresentado como campo obrigatório de decisão, e a pilha de telas genéricas de confirmação. Três mecanismos se repetem em todo o fluxo para o padrão ficar previsível: uma bolha de conversa onde a IA fala em primeira pessoa no topo de cada tela, revelação progressiva que mostra só o que aquele passo exige, e uma confirmação dupla em linguagem simples antes de qualquer coisa irreversível.',
      },
      ui: {
        en: 'Ten screens plus the failure states. Welcome introduces Aether as a guide rather than a form, and opens on a preview of the rehearsal itself: a practice run in front, the real send waiting behind it. Wallet education explains what a wallet is through an everyday analogy while the wallet is created in the background, and says outright that the recovery phrase comes later. Then the rehearsal: a practice send with its own banner — nothing is sent, no real funds move — running all four processing steps and ending on a completion screen that lists them. The real send repeats the same four steps under a different banner, with the AI restating what cannot be undone right before the confirm button. Success closes with time, amount and hash; the recovery phrase is shown after that, when the words finally mean something. Error states cover an invalid address, an insufficient balance and a network failure, each saying what happened and what is still possible.',
        pt: 'Dez telas mais os estados de falha. Boas-vindas apresenta o Aether como guia, não como formulário, e abre com uma prévia do próprio ensaio: um treino na frente, o envio real esperando atrás. Entendendo a carteira explica o que é uma carteira por analogia do cotidiano enquanto ela é criada em segundo plano, e diz na cara que a frase de recuperação vem depois. Aí vem o ensaio: um envio de treino com aviso próprio — nada é enviado, nenhum valor real se move — rodando os quatro passos de processamento e terminando numa tela de conclusão que lista cada um. O envio real repete os mesmos quatro passos sob um aviso diferente, com a IA repetindo o que não tem volta logo antes do botão de confirmar. O sucesso fecha com tempo, valor e hash; a frase de recuperação aparece depois disso, quando as palavras finalmente significam algo. Os estados de erro cobrem endereço inválido, saldo insuficiente e falha de rede, cada um dizendo o que aconteceu e o que ainda dá para fazer.',
      },
      ds: {
        en: 'A lavender-on-dark system in two token tiers: primitives named by hue and step, and semantic tokens that alias them. The first version claimed AA and failed where it mattered — muted text at 3.6:1 and, worse, a system error red (#93000A) at 1.3:1 on dark, invisible on the one state the system called impossible to miss. Every text token now clears 4.5:1 on all three surfaces (primary 11.1:1, secondary 7.3:1, muted 5.3:1), error text reads 5.4:1 and input edges 3.3:1. Fifteen text styles in Space Grotesk and Inter cover every text layer at 12px minimum, and the icons that used to render as the words bubble_chart and wallet are real vectors now. Because the palette is near-monochrome, state never relies on hue: badges, progress rows and the practice banner all pair an icon or a word with the colour. Primary and ghost buttons are 52pt tall, link buttons 44pt; the first build had them collapsing to their label height.',
        pt: 'Um sistema lavanda sobre escuro em duas camadas de tokens: primitivos nomeados por tom e passo, e tokens semânticos que apontam para eles. A primeira versão afirmava AA e falhava onde importava — texto muted em 3,6:1 e, pior, um vermelho de erro (#93000A) em 1,3:1 sobre o escuro, invisível justamente no estado que o sistema dizia ser impossível de não ver. Hoje todo token de texto passa de 4,5:1 nas três superfícies (primary 11,1:1, secondary 7,3:1, muted 5,3:1), o texto de erro marca 5,4:1 e as bordas de campo 3,3:1. Quinze text styles em Space Grotesk e Inter cobrem toda camada de texto com mínimo de 12px, e os ícones que apareciam como as palavras bubble_chart e wallet viraram vetores de verdade. Como a paleta é quase monocromática, estado nunca depende de matiz: selos, linhas de progresso e o aviso de treino sempre juntam ícone ou palavra à cor. Os botões principal e fantasma têm 52pt de altura e o de link, 44pt; na primeira versão eles encolhiam até a altura do texto.',
      },
      validation: {
        en: 'Not tested with users — nothing here is measured. The first test is written out instead: five people who have never used a Web3 wallet, asked to send 0.05 ETH. Do they run the practice first without being told? Can they explain afterwards what they sent and where it went? And what do they say when asked what would happen if they lost the phone — the question that tests whether deferring the recovery phrase cost them anything. Pass: four of five explain the send, and nobody sends from the practice screen believing it was real.',
        pt: 'Não testado com usuários — nada aqui é medido. Em vez disso, o primeiro teste está escrito: cinco pessoas que nunca usaram uma carteira Web3, com a tarefa de enviar 0,05 ETH. Elas rodam o treino sem ninguém mandar? Conseguem explicar depois o que enviaram e para onde foi? E o que respondem quando perguntam o que aconteceria se perdessem o celular — a pergunta que testa se adiar a frase de recuperação custou alguma coisa. Aprovado: quatro de cinco explicam o envio, e ninguém envia pela tela de treino achando que era real.',
      },
      outcome: {
        en: 'Aether is a conceptual portfolio project with no users and no instrumentation. The figures at the top of this sheet are targets for a first release, each with a definition and a way to measure it — not tested or instrumented data. Everything downstream of design, from engineering handoff to phased release and analytics, is written as how it would be done rather than as work performed.',
        pt: 'O Aether é um projeto conceitual de portfólio, sem usuários e sem instrumentação. Os números no topo desta prancha são metas para uma primeira versão, cada uma com definição e forma de medir — não dados testados nem instrumentados. Tudo o que vem depois do design, do handoff de engenharia ao lançamento faseado e à analytics, está escrito como seria feito, não como trabalho executado.',
      },
      learnings: {
        en: 'Fear does not get solved with more information. Early drafts tried to resolve hesitation by explaining more; held against the fear the research describes, the better answer was the opposite — less text, more active confirmation from the AI at each critical field. Trust is built through perceived control, not paragraphs. Rehearsal is also cheaper than it looks: letting the user practise on a simulated transaction looks like one extra funnel step, and is the step I expect to reduce anxiety most — the first thing a test should check — because it turns "I don’t know what is about to happen" into "I already know exactly what is about to happen". And projections demand honesty about what we do not know — labelling clearly what is a projection, and why, matters as much as the interface itself.',
        pt: 'O medo não se resolve com mais informação. Os primeiros rascunhos tentavam resolver a hesitação explicando mais; confrontados com o medo que a pesquisa descreve, a resposta melhor era o oposto — menos texto, mais confirmação ativa da IA em cada campo crítico. Confiança se constrói com controle percebido, não com parágrafos. Ensaiar também é mais barato do que parece: deixar o usuário praticar numa transação simulada parece uma etapa a mais no funil, e é a que eu espero que mais reduza a ansiedade — a primeira coisa que um teste deveria checar — porque transforma o "não sei o que vai acontecer" em "já sei exatamente o que vai acontecer". E projeção exige honestidade sobre o que não se sabe — rotular claramente o que é projeção, e por quê, importa tanto quanto a interface em si.',
      },
      metrics: [
        { v: '≥60%', k: { en: 'People who finish onboarding', pt: 'Pessoas que concluem o onboarding' }, proj: true, basis: 'target' },
        { v: '<5min', k: { en: 'To the first confirmed send', pt: 'Até o primeiro envio confirmado' }, proj: true, basis: 'target' },
        { v: { en: '4 of 5', pt: '4 de 5' }, k: { en: 'Test participants who can explain what they sent', pt: 'Participantes que explicam o que enviaram' }, proj: true, basis: 'target' },
      ],
    },
  },

  {
    id: 'forge',
    name: 'Forge',
    code: 'D',
    year: '2026',
    kind: {
      en: 'Design system for a project-management app',
      pt: 'Design system para um app de gestão de projetos',
    },
    line: {
      en: 'A concept brief: eight product teams, no shared visual language, a new inconsistency every sprint.',
      pt: 'Um brief conceitual: oito times de produto, nenhuma linguagem visual compartilhada, uma inconsistência nova a cada sprint.',
    },
    spec: {
      role: { en: 'Design systems (solo)', pt: 'Design systems (solo)' },
      team: { en: 'Solo, conceptual brief', pt: 'Solo, brief conceitual' },
      tools: { en: 'Figma, design tokens, component docs', pt: 'Figma, design tokens, documentação de componentes' },
      platform: { en: 'Desktop web', pt: 'Web desktop' },
    },
    hi: {
      p: {
        en: 'A primary button had seven variants in production, inputs came in four heights, and nobody could trace an inconsistency back to its source.',
        pt: 'Um botão primário tinha sete variações em produção, inputs vinham em quatro alturas, e ninguém conseguia rastrear uma inconsistência até a origem.',
      },
      m: {
        en: 'Started at the token layer instead of the component layer — the primitive values were locked and documented before the first Button existed.',
        pt: 'Comecei pela camada de tokens, não pela de componentes — os valores primitivos foram travados e documentados antes de o primeiro Button existir.',
      },
      o: {
        en: 'Targets for a first rollout: component handoff at 1.2h from the 3h in the brief, and 70% fewer visual-inconsistency tickets in QA.',
        pt: 'Metas para um primeiro rollout: handoff de componente em 1,2h vindo das 3h do brief, e 70% menos tickets de inconsistência visual em QA.',
      },
    },
    s: {
      context: {
        en: 'Forge is a conceptual brief, not a real company: a project-management app built by eight product teams with no shared visual language. Scale without a system is chaos with a nice logo: the product looked like eight products wearing the same badge, and the gap showed up every single sprint.',
        pt: 'Forge é um brief conceitual, não uma empresa real: um app de gestão de projetos construído por oito times de produto sem nenhuma linguagem visual compartilhada. Escala sem sistema é caos com logo bonito: o produto parecia oito produtos usando o mesmo crachá, e a lacuna aparecia a cada sprint.',
      },
      problem: {
        en: 'The brief sets the baseline. Every team reinvented the wheel. A primary button had seven variants in production — seventeen counting every corner of the codebase. Inputs came in four heights, cards in three shadow styles. Nothing was built maliciously; the problem was systemic. Designers spent 40% of their time replicating components that already existed, handoff took three and a half times longer than it should, 68% of reported visual bugs were component inconsistencies, and every release carried three to five extra review rounds because of them.',
        pt: 'O brief define o ponto de partida. Cada time reinventava a roda. Um botão primário tinha sete variações em produção — dezessete contando cada canto do código. Inputs vinham em quatro alturas, cards em três estilos de sombra. Nada era feito por má vontade; o problema era sistêmico. Designers gastavam 40% do tempo replicando componentes que já existiam, o handoff levava três vezes e meia mais do que deveria, 68% dos bugs visuais reportados eram inconsistências de componente, e cada release carregava de três a cinco rodadas extras de revisão por causa disso.',
      },
      goals: {
        en: 'Create a single source of truth that any team could use, understand and trust without asking permission or guessing. Every token semantic rather than raw, every component documented in both its isolated states and one real in-context usage, and nothing published to the library until a live product screen already used it.',
        pt: 'Criar uma única fonte de verdade que qualquer time pudesse usar, entender e confiar sem pedir permissão ou adivinhar. Todo token semântico em vez de bruto, todo componente documentado tanto nos estados isolados quanto em um uso real em contexto, e nada publicado na biblioteca antes de uma tela real do produto já estar usando.',
      },
      research: {
        en: 'No real audit or interviews — there is no real org behind the brief. I built the inventory the brief describes (every button, input and card variant) as the starting artefact, and used published write-ups of design-system rollouts to understand where the cost usually sits: not the visual drift, but the hours spent re-deciding things that should already be decided.',
        pt: 'Sem auditoria real nem entrevistas — não há empresa real por trás do brief. Montei o inventário que o brief descreve (cada variação de botão, input e card) como artefato de partida, e usei relatos publicados de implantação de design systems para entender onde o custo costuma estar: não no desvio visual, mas nas horas gastas redecidindo coisas que já deveriam estar decididas.',
      },
      insights: {
        en: 'Reading the brief as a cost problem changed the approach: the real cost was never visual, it was time. Forty per cent of design hours went into rebuilding components that already existed somewhere in the org, just slightly different. Teams did not distrust each other’s work — they simply had no shared vocabulary to reuse it. And every downstream inconsistency traced back to the same root: teams picking their own colours, spacing and radii from scratch.',
        pt: 'Ler o brief como problema de custo mudou a abordagem: o custo real nunca foi visual, foi tempo. Quarenta por cento das horas de design iam para reconstruir componentes que já existiam em algum lugar da empresa, só que ligeiramente diferentes. Os times não desconfiavam do trabalho uns dos outros — simplesmente não tinham vocabulário compartilhado para reaproveitar. E toda inconsistência posterior remetia à mesma raiz: cada time escolhendo suas próprias cores, espaçamentos e raios do zero.',
      },
      strategy: {
        en: 'Fix the token layer first. Three decisions carried the rest: semantic before literal, so components reference "danger" and "success" and never a hex value, which lets the system be re-themed without touching a component; one ten-step scale from 50 to 900 covering every surface, border and contrast need, so no shade gets invented mid-sprint; and tokens shipping before components, locked in Figma variables before the first Button was built rather than adjusted retroactively.',
        pt: 'Corrigir primeiro a camada de tokens. Três decisões sustentaram o resto: semântico antes de literal, para os componentes referenciarem "danger" e "success" e nunca um valor hexadecimal, o que permite re-tematizar o sistema sem tocar em componente algum; uma única escala de dez passos, de 50 a 900, cobrindo toda necessidade de superfície, borda e contraste, para nenhum tom ser inventado no meio do sprint; e tokens entregues antes dos componentes, travados nas variáveis do Figma antes de o primeiro Button existir, em vez de ajustados depois.',
      },
      exploration: {
        en: 'Two directions were weighed. Adopting an external open-source design system was faster to start, and was rejected because its tokens and conventions did not map to the org’s existing surface — teams would have overridden most of it anyway. Building from scratch, tokens first, was slower to start and won, because every decision traces back to the org’s actual components instead of a borrowed convention. A "component amnesty" — letting teams keep what they had and only aligning new work — was rejected for freezing the 40% replication cost in place. Starting with the composites, the most visibly broken pieces, was rejected too: composites built on inconsistent atomics inherit the same sprawl one layer up. The first round of wireframes was grey boxes drawn before the tokens existed; the pins mark what the hi-fi changed on each screen.',
        pt: 'Duas direções foram pesadas. Adotar um design system open-source externo era mais rápido de começar, e foi rejeitado porque os tokens e convenções dele não mapeavam para a superfície existente da empresa — os times acabariam sobrescrevendo quase tudo. Construir do zero, tokens primeiro, era mais lento de começar e venceu, porque cada decisão remete aos componentes reais da empresa e não a uma convenção emprestada. Uma "anistia de componentes" — deixar cada time ficar com o que tinha e alinhar só o novo — foi rejeitada por congelar o custo de 40% de replicação. Começar pelos compostos, as peças mais visivelmente quebradas, também foi rejeitado: composto construído sobre atômico inconsistente herda a mesma bagunça uma camada acima. A primeira rodada de wireframes era de caixas cinza, desenhadas antes de os tokens existirem; os pinos marcam o que o hi-fi mudou em cada tela.',
      },
      uxflow: {
        en: 'The system is layered the way it was built. Five atomic primitives sit at the bottom — Button, Status Badge, Input Field, Toggle and Checkbox, Avatar and Tag — each documenting every state it can be in. Three composites are assembled entirely from those atomics: Alert and Banner from colour and typography tokens, Modal composing Button inside a locked-width container, and Data Table composing Status Badge and Avatar into rows that never drift from the card versions of the same data. Consistency emerges from the layering rather than from any single decision.',
        pt: 'O sistema é estruturado em camadas, do jeito que foi construído. Cinco primitivos atômicos ficam na base — Button, Status Badge, Input Field, Toggle e Checkbox, Avatar e Tag — cada um documentando todo estado que pode assumir. Três compostos são montados inteiramente com esses atômicos: Alert e Banner a partir de tokens de cor e tipografia, Modal compondo Button dentro de um container de largura fixa, e Data Table compondo Status Badge e Avatar em linhas que nunca se desviam das versões em card dos mesmos dados. A consistência emerge das camadas, não de cada decisão individual.',
      },
      ui: {
        en: 'Every component is shown twice: once with all its states in isolation, and once wired into a real product screen, so a team can see how it behaves in context rather than only how it looks alone. The proof screens are the Kanban board, the task detail panel, a composition showcase and a component health dashboard — the same primitives carrying real product surfaces. The board at the top of this sheet is one screen in both themes: drag the handle and only what the semantic tokens resolve to changes. Below, the task detail panel is taken apart into the atomics and the composite it is built from.',
        pt: 'Cada componente aparece duas vezes: uma com todos os seus estados isolados, outra conectado a uma tela real do produto, para o time ver como ele se comporta em contexto e não só como parece sozinho. As telas de prova são o board Kanban, o painel de detalhe da task, uma vitrine de composição e um dashboard de saúde dos componentes — os mesmos primitivos sustentando superfícies reais. O board no topo desta prancha é uma tela só nos dois temas: arraste o controle e só muda o valor dos tokens semânticos. Abaixo, o painel de detalhe da task aparece desmontado nos atômicos e no composto de que é feito.',
      },
      ds: {
        en: 'Tokens are the contract between design and code. A ten-step primary scale, four semantic colours — primary #1D4ED8, success #16A34A, danger #DC2626, warning #D97706, with primary on the darker step because the #3B82F6 core fails AA for white text — a four-step type ramp from display to mono snippet, a core icon set, and the component gallery itself. Accessibility is defined at the token layer: focus states are a token rather than a per-component decision, so keyboard navigation stays consistent everywhere, and status colour is always paired with a text label.',
        pt: 'Tokens são o contrato entre design e código. Uma escala primária de dez passos, quatro cores semânticas — primary #1D4ED8, success #16A34A, danger #DC2626, warning #D97706, com o primary no passo mais escuro porque o núcleo #3B82F6 reprova no AA para texto branco — uma escala tipográfica de quatro passos, de display a snippet mono, um conjunto de ícones principais e a própria galeria de componentes. A acessibilidade é definida na camada de tokens: o estado de foco é um token, não uma decisão por componente, então a navegação por teclado se mantém consistente em todo lugar, e a cor de status vem sempre acompanhada de rótulo de texto.',
      },
      validation: {
        en: 'Not tested — no team has used the system, and nothing here is instrumented. What exists instead is the measurement plan: each target with its definition, the method that would read it and the window it would be read in, plus a guardrail on detached instances. The audit that sets the baselines is the first stage of the rollout, before any number is worth quoting.',
        pt: 'Não testado — nenhum time usou o sistema, e nada aqui é instrumentado. O que existe é o plano de medição: cada meta com sua definição, o método que a leria e a janela em que seria lida, mais um guardrail de instâncias soltas. A auditoria que define as linhas de base é a primeira etapa do rollout, antes de qualquer número valer citação.',
      },
      outcome: {
        en: 'Forge is a conceptual portfolio project with no production telemetry. The figures at the top of this sheet are targets for a first rollout, each with a definition and a way to measure it, moving against the baselines the brief states — not instrumented data. Adoption is planned as its own design problem: five stages from audit to team onboarding, pairing with each team through its first real migration rather than publishing documentation and hoping.',
        pt: 'Forge é um projeto conceitual de portfólio, sem telemetria de produção. Os números no topo desta prancha são metas para um primeiro rollout, cada uma com definição e forma de medir, movendo-se contra as linhas de base que o brief declara — não dados instrumentados. A adoção está planejada como problema de design próprio: cinco etapas, da auditoria ao onboarding dos times, acompanhando cada um na primeira migração real em vez de publicar documentação e torcer.',
      },
      learnings: {
        en: 'The goal is not visual, it is trust: once a team knows it can reference the system instead of reinventing it, the conversation can move from "which version do I use?" to "what are we actually trying to solve?". Tokens before components is the whole trick — it is tempting to start with the components everyone can see, but locking the primitives first meant every component built afterwards inherited consistency automatically instead of having it enforced case by case. And adoption is a design problem, not a launch event. Published rollouts say the same thing again and again: documentation alone moves little, and pairing with each team through a real migration is what makes a system stick. That is what I would test first.',
        pt: 'O objetivo não é visual, é confiança: quando o time sabe que pode referenciar o sistema em vez de reinventar, a conversa pode mudar de "qual versão eu uso?" para "o que estamos realmente tentando resolver?". Tokens antes de componentes é o truque todo — é tentador começar pelos componentes que todo mundo vê, mas travar os primitivos primeiro fez com que cada componente construído depois herdasse consistência automaticamente, em vez de precisar ser fiscalizado caso a caso. E adoção é problema de design, não evento de lançamento. Os rollouts publicados repetem a mesma coisa: documentação sozinha move pouco, e acompanhar cada time numa migração real é o que faz um sistema pegar. É isso que eu testaria primeiro.',
      },
      thin: ['validation'],
      metrics: [
        { v: { en: '1.2h', pt: '1,2h' }, k: { en: 'Component handoff time, from 3h', pt: 'Tempo de handoff de componente, vindo de 3h' }, proj: true, basis: 'target' },
        { v: { en: '70% fewer', pt: '70% menos' }, k: { en: 'Visual-inconsistency tickets in QA', pt: 'Tickets de inconsistência visual em QA' }, proj: true, basis: 'target' },
        { v: { en: '8 of 8', pt: '8 de 8' }, k: { en: 'Teams with a production screen built from the library', pt: 'Times com uma tela em produção feita com a biblioteca' }, proj: true, basis: 'target' },
      ],
    },
  },

  {
    id: 'casado',
    name: 'Casado Doces',
    code: 'E',
    year: '2026',
    kind: {
      en: 'Pickup-first ordering app · solo home baker',
      pt: 'App de pedidos com retirada agendada · confeiteira solo',
    },
    line: {
      en: 'An ordering app for a home baker who doesn’t deliver — the customer picks a time and grabs it in person.',
      pt: 'Um app de pedidos para uma confeiteira que não faz entrega — o cliente escolhe um horário e retira direto com ela.',
    },
    spec: {
      role: { en: 'Product Designer (0 to prototype)', pt: 'Product Designer (do zero ao protótipo)' },
      team: { en: 'Solo project', pt: 'Projeto solo' },
      tools: { en: 'Figma, Claude, Claude Code', pt: 'Figma, Claude, Claude Code' },
      platform: { en: 'Mobile app (iOS and Android)', pt: 'App mobile (iOS e Android)' },
    },
    hi: {
      p: {
        en: 'Denise sells cake through Instagram and WhatsApp with no catalog and no schedule, so every pickup has to be negotiated by message.',
        pt: 'A Denise vende bolo por Instagram e WhatsApp sem catálogo e sem agenda, então cada retirada precisa ser combinada por mensagem.',
      },
      m: {
        en: 'Make the pickup slot a first-class checkout step, and sync the confirmed time to both calendars so nobody has to remember to reply.',
        pt: 'Fazer do horário de retirada uma etapa de checkout de primeira classe, e sincronizar o horário confirmado nas duas agendas para ninguém depender de lembrar de responder.',
      },
      o: {
        en: 'Fewer missed orders, less time lost in DMs, and a catalog that answers the same question once instead of a hundred times a day.',
        pt: 'Menos pedidos perdidos, menos tempo perdido em DM, e um catálogo que responde a mesma pergunta uma vez em vez de cem vezes por dia.',
      },
    },
    s: {
      context: {
        en: 'Casado Doces is an ordering app for a home baker who does not deliver. Denise runs the whole business herself and does not trust a courier to carry a delicate cake, so delivery was never on the table. Instead of routing around that, the product is built on it: the customer browses a real catalog, orders, and books a pickup time — and the confirmed slot lands on both her Google Calendar and the customer’s.',
        pt: 'Casado Doces é um app de pedidos para uma confeiteira que não faz entrega. A Denise toca o negócio inteiro sozinha e não confia em motoboy para levar bolo delicado, então entrega nunca foi opção. Em vez de contornar isso, o produto é construído em cima disso: o cliente navega num catálogo de verdade, pede, e marca um horário de retirada — e o horário confirmado cai na agenda do Google dela e na do cliente.',
      },
      problem: {
        en: 'Selling cake over DM doesn’t scale. With no catalog and no real schedule, every order turns into a conversation: negotiating each pickup by message, hoping nobody forgets the time, and never knowing at a glance what is actually available that day. Denise stops what she is doing all day to answer the same questions, has no quick way to say she is already at capacity, and keeps track of who has paid entirely in her head.',
        pt: 'Vender bolo por DM não escala. Sem catálogo e sem agenda organizada, cada pedido vira uma conversa: combinar cada retirada por mensagem, torcer para ninguém esquecer o horário e nunca saber de cara o que está disponível naquele dia. A Denise para o que está fazendo o dia inteiro para responder as mesmas perguntas, não tem um jeito rápido de avisar que já está sem vaga, e fica de cabeça no controle de quem já pagou.',
      },
      goals: {
        en: 'For the customer: see what is available like an actual menu, book a time without a whole conversation, and not forget her own order. For Denise: a catalog she updates once instead of repeating herself, the day’s orders organized in one place, and a way to block off a day without turning down customers one by one. Three requirements framed the build — every confirmed order syncs to Google Calendar on both sides, not just one; Denise can block pickup windows she cannot cover before anyone books them; and checkout supports both payment paths, pay in-app and pay on pickup, without forking the flow.',
        pt: 'Para a cliente: ver o que está disponível como um cardápio de verdade, marcar um horário sem precisar de conversa nenhuma, e não esquecer o próprio pedido. Para a Denise: um catálogo que ela atualiza uma vez só em vez de ficar se repetindo, os pedidos do dia organizados num lugar só, e um jeito de bloquear um dia sem ter que recusar cliente um por um. Três requisitos guiaram a construção — todo pedido confirmado sincroniza no Google Calendar dos dois lados, não só de um; a Denise consegue bloquear horários que não consegue cobrir antes de alguém reservá-los; e o checkout suporta os dois caminhos de pagamento, pagar no app e pagar na retirada, sem bifurcar o fluxo.',
      },
      research: {
        en: 'Research was a series of conversations with Denise; there were no customer interviews yet. Two personas came out of it, one on each side of the counter. Marina is a proto-persona built from what Denise hears from her customers: she orders a few times a year and just wants to see what is available and pick a time without going back and forth over text — she has no idea what is in stock until she asks, has had a pickup time get lost in a DM thread, and once forgot to pick up an order entirely. Denise is the baker and the business: one person, who needs to stop answering the same question a hundred times a day.',
        pt: 'A pesquisa foi uma série de conversas com a Denise; ainda não houve entrevistas com clientes. Duas personas saíram daí, uma de cada lado do balcão. A Marina é uma proto-persona construída a partir do que a Denise ouve das clientes: pede algumas vezes por ano e só quer ver o que tem disponível e marcar um horário sem ficar mandando mensagem — ela não sabe o que tem em estoque até perguntar, já combinou horário por DM e a mensagem sumiu na conversa, e uma vez esqueceu de ir buscar o pedido. A Denise é a confeiteira e o negócio: uma pessoa só, que precisa parar de responder a mesma pergunta cem vezes por dia.',
      },
      insights: {
        en: 'Denise didn’t avoid delivery because of cost — she avoided it because she doesn’t trust couriers with delicate, easily damaged pastries. The absence of delivery isn’t a limitation to work around; it is the actual product decision. The second finding sits against it: customers are used to delivery-first ordering apps, so without a strong nudge, pickup scheduling reads as an afterthought field instead of the reservation it actually is.',
        pt: 'A Denise não evitava a entrega por causa do custo — evitava porque não confia em motoboy com doce delicado e fácil de danificar. A ausência de entrega não é uma limitação a se contornar; é a decisão de produto real. O segundo achado se opõe a ele: os clientes estão acostumados com apps de pedido focados em entrega, então sem um empurrão forte o agendamento de retirada parece um campo secundário em vez da reserva que realmente é.',
      },
      strategy: {
        en: 'Two moves followed from the insights: treat pickup time as a first-class checkout step, with the same weight as choosing a payment method, and use calendar sync as the trust mechanism for both sides — when client and baker see the same confirmed event, there is no “did this actually go through?” moment. Nothing on the market does that. Instagram and WhatsApp are already where her customers are and cost nothing, but turn every order into a manual conversation with no real control over the schedule. Delivery apps bring a catalog and payment but are built for delivery, and their fees eat the margin on a handmade product. Google Forms plus Calendly handles the time but lets a customer book a slot without ever seeing what they are buying. Prioritization followed the daily pain: checkout-to-pickup first, calendar and capacity second — an unconstrained calendar would just recreate the trust problem digitally — and catalog management and settings last.',
        pt: 'Duas decisões saíram dos insights: tratar o horário de retirada como etapa de checkout de primeira classe, com o mesmo peso de escolher a forma de pagamento, e usar a sincronização de calendário como mecanismo de confiança dos dois lados — quando cliente e confeiteira veem o mesmo evento confirmado, não existe aquele momento de "será que isso realmente foi registrado?". Nada no mercado faz isso. Instagram e WhatsApp já são onde os clientes estão e não custam nada, mas transformam cada pedido em conversa manual, sem controle real de agenda. Apps de entrega trazem catálogo e pagamento prontos, mas são pensados para entrega, e a taxa corta a margem de um produto artesanal. Google Forms mais Calendly resolve o horário, mas deixa o cliente marcar sem nunca ver o que está comprando. A priorização seguiu a dor do dia a dia: checkout até a retirada primeiro, agenda e capacidade em segundo — uma agenda sem restrição só recriaria o problema de confiança de forma digital — e gestão de catálogo e configurações por último.',
      },
      exploration: {
        en: 'Three directions were considered before converging. A delivery-style app with pickup as a checkbox was the fastest to build and the most familiar pattern, and was rejected for treating pickup as a fallback instead of the actual product. A scheduling tool bolted onto Instagram DMs had the lowest build cost, and was rejected because there is still no real catalog or cart — just a calendar link, which does not remove the manual coordination. The pickup-first ordering app won. Early sketches then tested where pickup selection should live: bundled into the cart step, or its own checkout step. Checkout won, since it cannot be skipped or missed the way a cart-step option can. Two alternatives were rejected outright: integrating a courier marketplace API, which would undo the very insight the product rests on, and a generic contact-form checkout that promises to confirm the time by message later — that only moves the WhatsApp problem one screen over. The first round of wireframes below already had all twelve screens; the numbered pins mark what the hi-fi changed on them, and the note with a plus covers the edge states that round never drew.',
        pt: 'Três direções foram consideradas antes de convergir. Um app estilo entrega com retirada como checkbox era o mais rápido de construir e o padrão mais familiar, e foi rejeitado por tratar a retirada como opção alternativa em vez do produto real. Uma ferramenta de agendamento colada no Instagram DM tinha o menor custo de construção, e foi rejeitada porque continua sem catálogo ou carrinho de verdade — só um link de calendário, que não remove a coordenação manual. O app de pedidos focado em retirada venceu. Os primeiros esboços então testaram onde a escolha de retirada deveria viver: embutida na etapa do carrinho, ou como etapa própria de checkout. O checkout venceu, porque não pode ser pulado ou perdido do jeito que uma opção na etapa do carrinho pode. Duas alternativas foram rejeitadas de cara: integrar uma API de marketplace de entregadores, que desfaria justamente o insight em que o produto se apoia, e um checkout de formulário de contato genérico que promete confirmar o horário por mensagem depois — isso só move o problema do WhatsApp uma tela adiante. A primeira rodada de wireframes abaixo já tinha as doze telas; os pinos numerados marcam o que o hi-fi mudou nelas, e a nota com um mais cobre os estados de exceção que essa rodada não desenhou.',
      },
      uxflow: {
        en: 'Six steps, catalog to pickup: catalog, product, cart, payment, schedule pickup, confirmation. Step five is why the product exists — it is the moment Denise stops negotiating every slot by message and starts trusting a schedule already synced with Google Calendar. The app splits in two. The customer side runs home and catalog, product detail, cart, checkout payment method, checkout pickup day and time, order confirmation, my orders with history and status, and profile. Denise’s dashboard runs today’s overview, catalog management, the orders queue with status, calendar with day blocking and a capacity limit, and settings.',
        pt: 'Seis etapas, do catálogo à retirada: catálogo, produto, carrinho, pagamento, agendar retirada, confirmação. O passo 5 é o que faz esse produto valer a pena — é o momento em que a Denise deixa de negociar cada horário por mensagem e passa a confiar numa agenda já sincronizada com o Google Calendar. O app se divide em dois. O lado do cliente tem home e catálogo, detalhes do produto, carrinho, checkout com forma de pagamento, checkout com dia e horário de retirada, confirmação do pedido, meus pedidos com histórico e status, e perfil. O painel da Denise tem o resumo do dia, gestão de catálogo, a fila de pedidos com status, agenda com bloqueio de dias e limite de capacidade, e configurações.',
      },
      ui: {
        en: 'Two apps, one visual language. On the customer side the catalog reads like a menu rather than a feed, the product detail carries portion size and lead time so nobody has to ask, and the pickup step is a calendar with real availability, not a free-text field. Payment offers both paths from the start, so the pay-now-or-at-pickup question never becomes a reason to stop. On Denise’s side the dashboard opens on the day rather than on a control panel: today’s overview, the orders queue with status, and a calendar where she blocks a day or caps capacity in one gesture instead of turning down customers one by one. The two apps are laid out below as swimlanes, because most of Denise’s screens exist to decide what the customer sees — the dashed links mark where one side sets the other. The figure at the top of the sheet shows the payoff: one order, one calendar event, the same row on both phones.',
        pt: 'Dois apps, uma linguagem visual. Do lado do cliente, o catálogo se lê como cardápio e não como feed, o detalhe do produto traz porção e prazo para ninguém precisar perguntar, e a etapa de retirada é um calendário com disponibilidade real, não um campo de texto livre. O pagamento oferece os dois caminhos desde o início, para a dúvida entre pagar agora ou na retirada nunca virar motivo de parada. Do lado da Denise, o painel abre no dia e não num centro de controle: resumo de hoje, fila de pedidos com status, e uma agenda onde ela bloqueia um dia ou limita a capacidade num gesto só, em vez de recusar cliente um por um. Os dois apps aparecem abaixo em raias, porque a maioria das telas da Denise existe para decidir o que a cliente vê — os links tracejados marcam onde um lado define o outro. A figura no topo da prancha mostra o resultado: um pedido, um evento na agenda, a mesma linha nos dois celulares.',
      },
      ds: {
        en: 'A warm system built around cream and ink: canvas #FBF6EC against ink #1C1815, with honey, coral and sage accents reserved for brand and state and never used as the only signal. The first version failed AA on its honey, coral and status text (2.6–4.1:1); darker steps now bring every text token to 5:1 or more on every surface. Type pairs Fraunces for display with Work Sans for UI in 15 styles, 12px minimum. Eighteen components carry their states, from buttons and time slots to calendar days where only full dates are struck through while closed and past ones fade, and every status chip pairs an icon and a word with its colour. Calendar day cells hold a 44 by 44 point touch target, since a small calendar grid is exactly where mis-taps are most likely.',
        pt: 'Um sistema quente construído em torno de cream e ink: fundo #FBF6EC contra texto #1C1815, com acentos honey, coral e sage reservados para marca e estado e nunca usados como único sinal. A primeira versão falhava em AA no texto honey, coral e de status (2,6–4,1:1); tons mais escuros agora levam todo token de texto a 5:1 ou mais em qualquer superfície. A tipografia combina Fraunces nos títulos e Work Sans na interface em 15 estilos, com mínimo de 12px. Dezoito componentes têm seus estados, de botões e horários a dias do calendário em que só os lotados aparecem riscados e os fechados ou passados ficam esmaecidos, e todo chip de status junta ícone e palavra à cor. As células de dia mantêm alvo de toque de 44 por 44 pontos, porque uma grade de calendário pequena é exatamente onde toques errados são mais prováveis.',
      },
      validation: {
        en: 'Not tested with real customers. Validating the missed-pickup hypothesis with a small-scale pilot alongside Denise’s actual orders is the first item on the next-steps list, followed by an A/B on the default payment option to see which one actually reduces no-shows.',
        pt: 'Não testado com clientes reais. Validar a hipótese de não comparecimento com um piloto em pequena escala junto aos pedidos reais da Denise é o primeiro item da lista de próximos passos, seguido de um A/B na opção de pagamento padrão para ver qual realmente reduz mais os não comparecimentos.',
      },
      outcome: {
        en: 'This is a conceptual case study. The figures at the top of this sheet are targets for a four-week pilot with Denise’s real orders, each with a definition and a way to measure it, not metrics from a product running in production. Confirming straight to the calendar should cut forgotten and duplicate orders; a real catalog should cut the time spent answering “do you have this?” and “what time can I pick up?” all day; and seeing the whole menu at once should bring customers back more often. Out of scope here: rescheduling or cancelling a confirmed order, support for more than one person running the dashboard, detailed action screens in the order queue, and product creation and editing in Denise’s dashboard.',
        pt: 'Este é um case conceitual. Os números no topo desta prancha são metas para um piloto de quatro semanas com os pedidos reais da Denise, cada uma com definição e forma de medir, não métricas de um produto rodando em produção. Confirmar direto na agenda deve reduzir esquecimento e pedido duplicado; um catálogo de verdade deve reduzir o tempo gasto respondendo "tem isso?" e "que horas posso pegar?" o dia inteiro; e ver o cardápio inteiro de uma vez deve trazer o cliente de volta mais vezes. Fora do escopo aqui: reagendar ou cancelar um pedido confirmado, suporte a mais de uma pessoa operando o painel, telas de ação detalhadas na fila de pedidos, e cadastro e edição de produto no painel da Denise.',
      },
      learnings: {
        en: 'A constraint becomes the differentiator. “No delivery” looked like a limitation of Denise’s business at first; that is exactly what pushed me to design scheduled pickup as a real feature instead of hiding the gap. Designing for a team of one changed every screen in her dashboard — she has two hands and an oven, not an operations team, so the goal was to get decisions out of her way rather than stack up another control panel. And integration turned out to be a trust feature: the Google Calendar sync does more than add convenience, it replaces manual back-and-forth over DM, where “confirmed” could mean almost anything, with a record both sides can actually check.',
        pt: 'Restrição vira diferencial. "Sem entrega" parecia só uma limitação do negócio da Denise; foi exatamente isso que me fez desenhar a retirada agendada como recurso de verdade, em vez de esconder a ausência. Desenhar para uma pessoa só mudou cada tela do painel dela — ela tem duas mãos e um forno, não uma equipe de operações, então o objetivo era tirar decisão da frente dela, não empilhar mais um painel de controle. E integração acabou sendo feature de confiança: a sincronização com o Google Calendar faz mais que dar conveniência, ela troca a combinação manual por DM, onde "confirmado" podia significar qualquer coisa, por um registro que os dois lados conseguem checar.',
      },
      metrics: [
        { v: { en: '< 1 in 20', pt: '< 1 em 20' }, k: { en: 'Confirmed orders not picked up', pt: 'Pedidos confirmados não retirados' }, proj: true, basis: 'target' },
        { v: { en: 'Half', pt: 'Metade' }, k: { en: 'Daily minutes answering DMs, vs baseline', pt: 'Minutos por dia respondendo DM, vs linha de base' }, proj: true, basis: 'target' },
        { v: { en: 'No drop', pt: 'Sem queda' }, k: { en: 'Guardrail: weekly orders vs baseline', pt: 'Guardrail: pedidos por semana vs linha de base' }, proj: true, basis: 'target' },
      ],
    },
  },

  {
    id: 'reloop',
    name: 'Reloop',
    code: 'F',
    year: '2026',
    kind: {
      en: 'Peer-to-peer secondhand fashion marketplace',
      pt: 'Marketplace peer-to-peer de moda em segunda mão',
    },
    line: {
      en: 'Buying secondhand clothes online is a gamble — photos hide wear and every listing describes condition differently.',
      pt: 'Comprar roupa usada online é uma aposta — fotos escondem o desgaste e cada anúncio descreve o estado de um jeito.',
    },
    spec: {
      role: { en: 'Product design (solo)', pt: 'Product design (solo)' },
      duration: { en: '6 weeks (conceptual)', pt: '6 semanas (conceitual)' },
      team: { en: 'Solo project', pt: 'Projeto solo' },
      tools: 'Figma, Figma Variables',
      platform: { en: 'Responsive web', pt: 'Web responsiva' },
    },
    hi: {
      p: {
        en: 'Both sides of the transaction were guessing — buyers about what would actually arrive, sellers about how to describe it without getting burned.',
        pt: 'Os dois lados da transação estavam apostando — quem compra sobre o que vai chegar, quem vende sobre como descrever sem se queimar.',
      },
      m: {
        en: 'Replaced free-text condition with a fixed four-grade scale, and put the badge in the search card — where the decision to trust actually happens.',
        pt: 'Troquei o texto livre de condição por uma escala fixa de quatro notas, e coloquei o selo no card de busca — onde a decisão de confiar realmente acontece.',
      },
      o: {
        en: 'Targets for a first release: condition disputes under 1 in 30 delivered orders, and 70% or more of started listings published.',
        pt: 'Metas para uma primeira versão: disputas por estado abaixo de 1 em 30 pedidos entregues, e 70% ou mais dos anúncios iniciados publicados.',
      },
    },
    s: {
      context: {
        en: 'Reloop is a peer-to-peer marketplace for buying and selling secondhand fashion, built around trust rather than around inventory. It has two sides that need each other: a buyer marketplace for browsing, searching and checking out, and a seller dashboard for listing, offers and payouts. A conceptual project, designed end to end in six weeks.',
        pt: 'Reloop é um marketplace peer-to-peer para comprar e vender moda em segunda mão, construído em torno de confiança e não de estoque. São dois lados que dependem um do outro: o marketplace do comprador, para navegar, buscar e finalizar a compra, e o dashboard do vendedor, para anunciar, receber ofertas e acompanhar repasses. Projeto conceitual, desenhado de ponta a ponta em seis semanas.',
      },
      problem: {
        en: 'Photos hide wear. Sizing runs different from brand to brand. And once an item ships, a buyer really only has three options: return it, argue about it, or eat the loss. Sellers face the mirror problem — underpricing out of fear of a dispute, or overpromising and getting burned by a return anyway. Both sides are guessing, and neither of them chose to be.',
        pt: 'Fotos escondem o desgaste. O tamanho varia de marca para marca. E depois que a peça é enviada, quem compra só tem três saídas: devolver, discutir ou aceitar o prejuízo. Quem vende enfrenta o problema espelhado — baixa o preço com medo de uma disputa, ou promete demais e se queima com uma devolução de qualquer jeito. Os dois lados estão apostando, e nenhum dos dois escolheu isso.',
      },
      goals: {
        en: 'Remove the guesswork from both sides of the same transaction: give sellers a way to describe condition that cannot be misread, and give buyers enough certainty to commit before the item ships. Keep the scale simple enough that nobody needs training to use it.',
        pt: 'Tirar a adivinhação dos dois lados da mesma transação: dar a quem vende um jeito de descrever a condição que não possa ser mal interpretado, e a quem compra certeza suficiente para decidir antes do envio. Manter a escala simples o bastante para ninguém precisar de treinamento.',
      },
      research: {
        en: 'Desk research only: a walkthrough of Depop, Vinted and Instagram thrift sellers, their public reviews and their help pages. No interviews and no tests, so the two people framing the work are proto-personas, not research findings. Juliana, 29, a graphic designer in Belo Horizonte who needs to know what will arrive before she pays. And Rafael, 34, who resells thrifted pieces in Recife and needs a way to describe condition that cannot be misread. A competitive scan covered the three ways people resell clothes today: Instagram and independent thrift sellers, Depop and Vinted, and physical thrift stores.',
        pt: 'Só pesquisa secundária: uso do Depop, do Vinted e de brechós no Instagram, das avaliações públicas e das páginas de ajuda. Sem entrevistas e sem testes, então as duas pessoas que guiam o trabalho são proto-personas, não achados de pesquisa. Juliana, 29, designer gráfica em Belo Horizonte, que precisa saber o que vai chegar antes de pagar. E Rafael, 34, que revende peças de brechó em Recife e precisa de um jeito de descrever o estado que não dê margem a erro. A análise competitiva cobriu as três formas de revender roupa hoje: Instagram e brechós independentes, Depop e Vinted, e brechós físicos.',
      },
      insights: {
        en: 'Everything below is an assumption to test, not a finding. Buyers like Juliana probably do not distrust secondhand items themselves — they distrust the gap between the photo and what arrives. Vague listing language like "like new" or "barely used" means little without a shared standard. Sellers like Rafael may leave good items unlisted because they cannot describe condition without over-selling and disappointing a buyer, or under-selling and losing a fair price.',
        pt: 'Tudo abaixo é pressuposto a testar, não achado. Compradoras como a Juliana provavelmente não desconfiam da peça usada em si — desconfiam da distância entre a foto e o que chega. Termos vagos no anúncio, do tipo "seminovo" ou "pouco usado", valem pouco sem um padrão comum. Vendedores como o Rafael podem deixar boas peças sem anunciar porque não sabem descrever o estado sem exagerar e decepcionar quem compra, ou subestimar e perder um preço justo.',
      },
      strategy: {
        en: 'Make condition grading the core trust mechanism. Sellers grade every item against a fixed four-step scale — New with tags, Excellent, Good, Fair — with guided photos, and that badge then shows up everywhere: in search, on the product card, in the cart. No listing publishes without a grade, and optional flaw notes sit alongside the structured grade rather than replacing it. Physical thrift stores already solve this by letting you handle the item; the goal was to bring that same confidence online.',
        pt: 'Fazer da avaliação de condição o mecanismo central de confiança. Quem vende classifica cada peça contra uma escala fixa de quatro passos — New with tags, Excellent, Good, Fair — com fotos guiadas, e esse selo passa a aparecer em todo lugar: na busca, no card do produto, no carrinho. Nenhum anúncio é publicado sem nota, e notas opcionais de defeito ficam ao lado da nota estruturada em vez de substituí-la. O brechó físico já resolve isso deixando você pegar a peça na mão; o objetivo era levar essa mesma confiança para o online.',
      },
      exploration: {
        en: 'Three directions were weighed before converging. Free-text condition descriptions with required photos were cheapest to build and rejected, because they just move the problem from "no photos" to "inconsistent wording" — the original issue. A third-party authentication service had the highest trust ceiling and was rejected as too heavy an operational dependency for a peer-to-peer marketplace at this stage. The structured self-graded scale won. Early sketches also tested whether grading should come before or after photos; making it its own required step won, because an optional field is the first thing a seller in a hurry skips. The first round of wireframes below already covered both sides; the numbered pins mark what the hi-fi changed on them, and the note with a plus covers the screens that round never drew.',
        pt: 'Três direções foram pesadas antes de convergir. Descrições de condição em texto livre com fotos obrigatórias eram as mais baratas de construir e foram rejeitadas, porque só movem o problema de "sem fotos" para "texto inconsistente" — a questão original. Um serviço terceirizado de autenticação tinha o maior teto de confiança e foi rejeitado por ser uma dependência operacional pesada demais para um marketplace peer-to-peer nesta fase. A escala autodeclarada e estruturada venceu. Os primeiros esboços também testaram se o grading vinha antes ou depois das fotos; torná-lo uma etapa obrigatória própria venceu, porque campo opcional é a primeira coisa que quem vende com pressa pula. A primeira rodada de wireframes abaixo já cobria os dois lados; os pinos numerados marcam o que o hi-fi mudou nelas, e a nota com um mais cobre as telas que essa rodada não desenhou.',
      },
      uxflow: {
        en: 'Two task flows that mirror each other. The buyer searches or browses, filters by condition, opens the product, adds to cart, checks out and tracks the order. The seller taps list an item, uploads guided photos, sets condition and price, publishes, receives and accepts an offer, and ships. The sitemap splits three ways: buyer, seller, and the shared surfaces — login, profile and help.',
        pt: 'Dois fluxos de tarefa que se espelham. Quem compra busca ou navega, filtra por condição, abre o produto, adiciona ao carrinho, finaliza e acompanha o pedido. Quem vende toca em anunciar, envia fotos guiadas, define condição e preço, publica, recebe e aceita uma oferta, e despacha. O mapa do site se divide em três: comprador, vendedor e as telas compartilhadas — login, perfil e ajuda.',
      },
      ui: {
        en: 'A warm, light interface built so the condition badge always reads as the most trustworthy thing on the screen. It appears in the browse grid, in search results, on the product page, in the cart and on the order, using the same word and meter every time. Checkout is Brazilian: prices in reais, address by CEP, Pix or card. The seller side mirrors it — grading is its own step with nothing preselected, and My Listings shows each item with the grade it was published under. Two screens carry the dispute: opening one against the grade, and its status with the seller deadline and the payment on hold. Three mobile web screens and the empty, error and loading states complete the set. The trail below follows one jacket’s badge through six of those screens, and the tag at the top of the sheet shows the product page with its grade tied on the way a thrift shop would.',
        pt: 'Uma interface clara e quente, construída para o selo de estado sempre ser a coisa mais confiável da tela. Ele aparece na vitrine, nos resultados de busca, na página do produto, no carrinho e no pedido, sempre com a mesma palavra e o mesmo medidor. O checkout é brasileiro: preços em reais, endereço por CEP, Pix ou cartão. O lado da venda espelha isso — classificar é uma etapa própria, sem nada pré-selecionado, e Meus anúncios mostra cada peça com o nível sob o qual foi publicada. Duas telas levam a disputa: abrir uma contra o nível e acompanhar o status, com o prazo do vendedor e o pagamento retido. Três telas de web mobile e os estados vazio, de erro e de carregamento fecham o conjunto. A trilha abaixo segue o selo de uma jaqueta por seis dessas telas, e a etiqueta no topo da prancha mostra a página do produto com o nível amarrado do jeito que um brechó faria.',
      },
      ds: {
        en: 'Two tiers: primitives named by their real hue, and semantic tokens that alias them. The first version failed AA in the places that mattered most — muted text at 2.5:1, the primary button at 3.2:1, the Fair, New and Alert badges between 2.7:1 and 4.1:1. Darker steps fixed all of them: every text token now clears 4.5:1 on canvas, surface and muted, white on the gold button reads 6.2:1, and input and option edges sit at 6.3:1. Fifteen text styles cover every text layer, with 12px as the floor. The condition badge is never colour alone — each grade carries its word plus a four-dot meter, so it survives colour blindness and greyscale — and the grading step ships with nothing preselected.',
        pt: 'Duas camadas: primitivos nomeados pelo tom real e tokens semânticos que apontam para eles. A primeira versão falhava em AA justamente onde importava — texto muted em 2,5:1, botão primário em 3,2:1, selos Com marcas, Nova e Alerta entre 2,7:1 e 4,1:1. Tons mais escuros corrigiram todos: hoje todo token de texto passa de 4,5:1 sobre canvas, surface e muted, o branco no botão dourado marca 6,2:1 e as bordas de input e opção ficam em 6,3:1. Quinze text styles cobrem toda camada de texto, com 12px de piso. O selo de estado nunca é só cor — cada nível traz a palavra e um medidor de quatro pontos, então sobrevive a daltonismo e escala de cinza — e a etapa de classificação não vem com nada pré-selecionado.',
      },
      validation: {
        en: 'Not tested with real buyers and sellers — nothing here is measured. The first test is written out instead: five buyers asked to find a jacket in good condition under R$ 200, and five sellers asked to list one, with a pass bar of four out of five buyers able to explain what "Good" means and four out of five seller grades matching an independent review.',
        pt: 'Não testado com compradoras e vendedores reais — nada aqui é medido. Em vez disso, o primeiro teste está escrito: cinco compradoras precisam achar uma jaqueta em bom estado por até R$ 200, e cinco vendedores precisam anunciar uma, com corte de aprovação em quatro de cinco compradoras explicando o que "Bom estado" significa e quatro de cinco níveis batendo com uma revisão independente.',
      },
      outcome: {
        en: 'This is a conceptual portfolio project — the figures at the top of this sheet are targets I set for a first release, each with a definition and a way to measure it, not results from a live product. What the work produced is a trust mechanism that survives contact with both sides of the marketplace: a grade a seller can apply without fear and a buyer can read without asking, plus a dispute flow that tests the grade when it fails.',
        pt: 'Este é um projeto conceitual de portfólio — os números no topo desta prancha são metas que defini para uma primeira versão, cada uma com definição e forma de medir, não resultados de produto real. O que o trabalho produziu foi um mecanismo de confiança que sobrevive ao contato com os dois lados do marketplace: um nível que quem vende aplica sem medo e quem compra lê sem perguntar, mais um fluxo de disputa que testa o nível quando ele falha.',
      },
      learnings: {
        en: 'The hardest part was not drawing screens, it was deciding where the condition badge had to appear to work as proof rather than as information. A version with the badge only on the product detail page still left search full of items with uncertain condition. Moving it into the search card fixed the real problem: the decision to trust happens before the click, not after. The dispute flow came in the second pass, because it is the real test of the mechanism — what happens when the item that arrives does not match its grade. What I still do not know is whether sellers grade honestly; that needs the usability test, not more screens.',
        pt: 'O mais difícil não foi desenhar telas, foi decidir onde o selo de estado precisava aparecer para funcionar como prova, não como informação. Uma versão com o selo só na página de detalhe ainda deixava a busca cheia de peças com estado incerto. Movê-lo para o card de busca resolveu o problema raiz: a decisão de confiar acontece antes do clique, não depois. O fluxo de disputa entrou na segunda rodada, porque é o teste real do mecanismo — o que acontece quando a peça que chega não bate com o nível. O que ainda não sei é se quem vende classifica com honestidade; isso pede o teste de usabilidade, não mais telas.',
      },
      metrics: [
        { v: { en: '< 1 in 30', pt: '< 1 em 30' }, k: { en: 'Orders disputed as worse than the grade', pt: 'Pedidos contestados como piores que o nível' }, proj: true, basis: 'target' },
        { v: { en: '70%+', pt: '70%+' }, k: { en: 'Listings published out of listings started', pt: 'Anúncios publicados sobre anúncios iniciados' }, proj: true, basis: 'target' },
        { v: { en: '< 72h', pt: '< 72h' }, k: { en: 'Guardrail: time to resolve a dispute', pt: 'Guardrail: tempo para resolver uma disputa' }, proj: true, basis: 'target' },
      ],
    },
  },
];
