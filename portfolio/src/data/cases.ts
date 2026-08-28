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
      team: { en: 'Solo project', pt: 'Projeto solo' },
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
        en: 'Projected 38% more onboarding completions and 45% less time to the first action.',
        pt: 'Projeção de 38% mais conclusões de onboarding e 45% menos tempo até a primeira ação.',
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
        en: 'Two investor profiles framed the work: the Modern Investor, an urban professional between 28 and 45 who invests across several platforms and has no time to consolidate their own portfolio; and Institutional Access, a higher-net-worth client used to bank or advisor-assisted management who wants the same analytical depth without depending on anyone. A competitive scan covered four blocks — large generalist brokerages, niche digital managers, private banks and global robo-advisors.',
        pt: 'Dois perfis de investidor guiaram o trabalho: o Investidor Moderno, profissional urbano entre 28 e 45 anos que investe em várias plataformas e não tem tempo de consolidar a própria carteira; e o Acesso Institucional, cliente de maior patrimônio acostumado à gestão assistida por banco ou assessor, que quer o mesmo nível de análise sem depender de alguém. O cenário competitivo cobriu quatro blocos — corretoras generalistas grandes, gestoras digitais de nicho, private banks e robo-advisors globais.',
      },
      insights: {
        en: 'Mapping the journey by emotion showed where it breaks: cautious curiosity at discovery, impatience at sign-up, vulnerability at the risk profile. People do not want to be classified, they want to be understood. And "how much is left" is the question that kills conversion most in long financial flows.',
        pt: 'Mapear a jornada por emoção mostrou onde ela quebra: curiosidade cautelosa na descoberta, impaciência no cadastro, vulnerabilidade no perfil de risco. As pessoas não querem ser classificadas, querem ser compreendidas. E "quanto falta ainda" é a pergunta que mais derruba conversão em fluxos financeiros longos.',
      },
      strategy: {
        en: 'Take the space nobody had claimed: the analysis you would get from an institutional manager, inside an app you use on your own. Three rules held the flow together — visible progress, one decision per screen, and an explanation before any call to action involving money. Trust comes before the ask, not after.',
        pt: 'Ocupar o espaço que ninguém tinha ocupado direito: a análise que você teria com um gestor institucional, dentro de um app que você usa sozinho. Três regras sustentaram o fluxo — progresso visível, uma decisão por tela e explicação antes de qualquer CTA que envolva dinheiro. Confiança vem antes do pedido, não depois.',
      },
      exploration: {
        en: 'Low-fidelity wireframes for every screen in the flow — landing, the four onboarding steps, dashboard and suggestions — with placeholder copy and no styling, so the structure could be argued about before any visual decision was locked in.',
        pt: 'Wireframes de baixa fidelidade para cada tela do fluxo — landing, os quatro passos de onboarding, dashboard e sugestões — com texto placeholder e nenhuma estilização, para discutir a estrutura antes de travar qualquer decisão visual.',
      },
      uxflow: {
        en: 'Landing, onboarding welcome, sign-up, risk profile, AI strategy, dashboard — four onboarding steps between account creation and the first recommendation. The information architecture splits into three zones: authentication, onboarding, and the authenticated app.',
        pt: 'Landing, boas-vindas, cadastro, perfil de risco, estratégia IA, dashboard — quatro passos de onboarding entre a criação da conta e a primeira recomendação. A arquitetura de informação se divide em três zonas: autenticação, onboarding e app autenticado.',
      },
      ui: {
        en: 'High-fidelity screens across mobile and desktop: a landing with social proof, the four-step onboarding with a live progress bar, a consolidated dashboard, and a suggestion list where every recommendation carries its reason. Risk is coded by colour and label — high yield, liquid, volatile, static — so the same signal reads identically wherever it appears.',
        pt: 'Telas de alta fidelidade em mobile e desktop: landing com prova social, o onboarding de quatro passos com barra de progresso, um dashboard consolidado e uma lista de sugestões em que cada recomendação carrega o seu motivo. O risco é codificado por cor e rótulo — alto rendimento, líquido, volátil, estático — para o mesmo sinal ser lido igual em qualquer lugar.',
      },
      ds: {
        en: 'The "Prestige" system: a dark, institutional palette built on deep canvas #120D0A, raised surface #3A332F, soft outline #88948A and a single emerald accent #7DD9A6; a four-step type scale from display to caption; and a component library of button states, input fields and asset tags. One accent, reserved for what actually matters.',
        pt: 'O sistema "Prestige": paleta escura e institucional sobre tela profunda #120D0A, superfície alta #3A332F, contorno suave #88948A e um único acento esmeralda #7DD9A6; escala tipográfica de quatro passos, de display a legenda; e biblioteca de componentes com estados de botão, campos de entrada e tags de ativo. Um acento só, reservado para o que de fato importa.',
      },
      validation: {
        en: 'Not tested with real investors. The flow was held against the original product’s own tokens and components, and nothing more.',
        pt: 'Não testado com investidores reais. O fluxo foi confrontado com os tokens e componentes do próprio produto original, e nada além disso.',
      },
      outcome: {
        en: 'The numbers below are conceptual projections for the purposes of this case study, not real product data. What the work actually produced is a flow where the recommendation is explained before it is asked for, and a system consistent enough that new screens hold up beside the original ones.',
        pt: 'Os números abaixo são projeções conceituais para fins deste case study, não dados reais de produto. O que o trabalho de fato produziu foi um fluxo em que a recomendação é explicada antes de ser pedida, e um sistema consistente o bastante para telas novas se sustentarem ao lado das originais.',
      },
      learnings: {
        en: 'Reconstructing InvestIQ from real screens forced me to work backwards: first understand the decisions already made — the dark institutional tone, the editorial typography, the colour-coded risk labels — and only then extend the product without breaking that consistency. The lesson was discipline: every new screen had to hold up against the same tokens and components as the real ones, with no visual shortcuts. With more time, the next step is testing the onboarding with real investors, to see whether splitting it into four steps actually reduces drop-off or just moves the friction somewhere else in the journey.',
        pt: 'Reconstruir a InvestIQ a partir de telas reais me obrigou a trabalhar de trás para frente. Primeiro entender as decisões que já tinham sido tomadas — o tom escuro e institucional, a tipografia editorial, os rótulos de risco por cor — para só depois estender o produto sem quebrar a consistência. O maior aprendizado foi disciplina: cada tela nova precisava se sustentar nos mesmos tokens e componentes das telas reais, sem atalho visual. Com mais tempo, o próximo passo seria testar o onboarding com investidores de verdade, para ver se dividir em quatro passos realmente reduz o abandono ou só desloca a fricção para outro ponto da jornada.',
      },
      thin: ['validation'],
      metrics: [
        { v: '+38%', k: { en: 'Onboarding completion', pt: 'Conclusão do onboarding' }, proj: true },
        { v: '-45%', k: { en: 'Time to first action', pt: 'Tempo até a primeira ação' }, proj: true },
        { v: '4.7/5', k: { en: 'Perceived clarity of recommendations', pt: 'Clareza percebida da recomendação' }, proj: true },
      ],
    },
  },

  {
    id: 'pulse',
    name: 'Pulse Analytics',
    code: 'B',
    year: '2026',
    kind: { en: 'B2B SaaS analytics dashboard', pt: 'Dashboard de analytics SaaS B2B' },
    line: {
      en: 'Users opened the dashboard, saw dozens of charts, and left without taking a single action.',
      pt: 'Usuários abriam o dashboard, viam dezenas de gráficos e saíam sem tomar nenhuma ação.',
    },
    spec: {
      role: { en: 'Lead product designer', pt: 'Product designer líder' },
      duration: { en: '10 weeks', pt: '10 semanas' },
      team: { en: '1 PM, 4 engineers, 1 data analyst', pt: '1 PM, 4 engenheiros, 1 analista de dados' },
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
        en: 'Time to decision fell 35% and feature adoption rose 22% in the first 60 days after launch.',
        pt: 'O tempo até a decisão caiu 35% e a adoção de features subiu 22% nos primeiros 60 dias após o lançamento.',
      },
    },
    s: {
      context: {
        en: 'Pulse Analytics centralizes product, marketing and sales data into a single source of truth for tech companies, integrating more than 40 sources for teams of 10 to 200 people. It grew fast — from 12 to over 40 available metrics in 18 months — and the interface never caught up with that fragmentation. Product managers, marketers and data analysts all worked from the same screen.',
        pt: 'O Pulse Analytics centraliza dados de produto, marketing e vendas numa única fonte de verdade para empresas de tecnologia, integrando mais de 40 fontes para times de 10 a 200 pessoas. Cresceu rápido — de 12 para mais de 40 métricas em 18 meses — e a interface nunca acompanhou essa fragmentação. Product managers, marketing e analistas de dados trabalhavam todos na mesma tela.',
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
        en: 'Five weeks of discovery: ten user interviews, session recording analysis, heatmaps and clickmaps, a survey with 80 active users, and benchmarking against Amplitude, Mixpanel and Looker — tools our own customers already had open in another tab.',
        pt: 'Cinco semanas de discovery: dez entrevistas com usuários, análise de gravações de sessão, heatmaps e clickmaps, survey com 80 usuários ativos e benchmarking com Amplitude, Mixpanel e Looker — ferramentas que os próprios clientes já mantinham abertas em outra aba.',
      },
      insights: {
        en: 'Four findings, and none of them was about missing data. Every metric carried the same visual weight, so nothing read as urgent. Numbers arrived with no goal and no historical comparison, so a value could not be judged good or bad. Seeing a metric never led to a next step. And a single layout served every profile, though PMs, marketers and analysts need different things from the same screen.',
        pt: 'Quatro achados, e nenhum era sobre falta de dados. Toda métrica tinha o mesmo peso visual, então nada lia como urgente. Os números chegavam sem meta e sem comparação histórica, então não dava para julgar se um valor era bom ou ruim. Ver uma métrica nunca levava a um próximo passo. E um único layout servia a todos os perfis, embora PMs, marketing e analistas precisem de coisas diferentes da mesma tela.',
      },
      strategy: {
        en: 'The problem was not a lack of data, it was a lack of meaning. Benchmarking showed the gap plainly: no reference tool combined automatic hierarchy with a low learning curve. That pointed at an insight-driven hybrid — smart visual hierarchy, personalization by role, and progressive alerts, with no manual setup asked of anyone.',
        pt: 'O problema não era falta de dados, era falta de significado. O benchmarking mostrou a lacuna com clareza: nenhuma referência combinava hierarquia automática com baixa curva de aprendizado. Isso apontou para um híbrido orientado a insights — hierarquia visual inteligente, personalização por papel e alertas progressivos, sem exigir configuração manual de ninguém.',
      },
      exploration: {
        en: 'Three directions were prototyped and tested. A static dashboard that only reorganized the existing layout was cheap to build and gained no real clarity. Customizable storytelling gave users full control and lost the new ones to setup effort. The insight-driven hybrid won because it personalizes without asking anyone to configure anything.',
        pt: 'Três direções foram prototipadas e testadas. Um dashboard estático, que apenas reorganizava o layout atual, era barato de construir e não trazia ganho real de clareza. O storytelling customizável dava controle total e perdia os usuários novos no esforço de configuração. O híbrido orientado a insights venceu porque personaliza sem pedir configuração a ninguém.',
      },
      uxflow: {
        en: 'Onboarding runs in four steps — connect the data, authenticate the source, map its fields to Pulse metrics, confirm. Navigation then splits four ways: Home for prioritized insight cards and the day’s executive summary, Dashboards for the commercial and regional views, Reports for the drag-and-drop builder, and Settings for integrations and permissions.',
        pt: 'O onboarding roda em quatro etapas — conectar os dados, autenticar a fonte, mapear os campos para as métricas do Pulse, confirmar. A navegação então se divide em quatro: Início, com os insight cards priorizados e o resumo executivo do dia; Dashboards, com as visões comercial e regional; Relatórios, com o builder drag-and-drop; e Configurações, com integrações e permissões.',
      },
      ui: {
        en: 'Four structural changes carry the interface. Each card holds a metric, its context and a next step in one actionable component, replacing loose tables and charts. Depth is layered, so people start at the executive summary and drill down without losing the thread. Metrics are ordered by role with no manual setup. And the small daily details do the rest — count-up animations, contextual skeletons, empty states that suggest an action, and WCAG 2.1 AA contrast.',
        pt: 'Quatro mudanças estruturais sustentam a interface. Cada card reúne métrica, contexto e próximo passo em um componente acionável, substituindo tabelas e gráficos soltos. A profundidade é em camadas, então a pessoa começa no resumo executivo e aprofunda sem perder o fio. As métricas são ordenadas por papel, sem configuração manual. E os detalhes pequenos do dia a dia fazem o resto — animações de contagem, skeletons contextualizados, estados vazios que sugerem ação e contraste WCAG 2.1 AA.',
      },
      ds: {
        en: 'A system built for operational clarity and data density: a deep canvas at #080B14 over a #101828 surface, Pulse Blue #3B82F6 as the single accent, and colour reserved for state — green for success, red for alert, amber for pending. Four type steps from display to caption, plus button states, status badges and input fields.',
        pt: 'Um sistema feito para clareza operacional e densidade de dados: canvas profundo #080B14 sobre superfície #101828, Azul Pulse #3B82F6 como acento único e cor reservada para estado — verde para sucesso, vermelho para alerta, âmbar para pendente. Quatro passos tipográficos, de display a legenda, mais estados de botão, badges de status e campos de entrada.',
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
      tools: { en: 'Figma, qualitative research, prototyping', pt: 'Figma, pesquisa qualitativa, prototipagem' },
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
        en: 'Projected 61% more onboarding completions and a first transaction inside five minutes.',
        pt: 'Projeção de 61% mais conclusões de onboarding e uma primeira transação em menos de cinco minutos.',
      },
    },
    s: {
      context: {
        en: 'Aether is an AI-guided Web3 wallet that teaches by doing. Most wallets treat onboarding like a form — generate a seed phrase, confirm you saved it, pick a network, done. That works for people who already know what those words mean, and loses everyone else on the way. The premise here is the opposite: teach a concept exactly when it becomes relevant, in language the person already uses, and let them practise before risking anything real.',
        pt: 'Aether é uma carteira Web3 guiada por IA que ensina fazendo. A maior parte das carteiras trata onboarding como formulário — gere uma seed phrase, confirme que guardou, escolha uma rede, pronto. Isso funciona para quem já entende o que essas palavras significam, e abandona todos os outros no meio do caminho. A premissa aqui é o oposto: ensinar um conceito exatamente quando ele se torna relevante, na linguagem que a pessoa já usa, e deixar que ela pratique antes de arriscar algo real.',
      },
      problem: {
        en: 'In almost every usability test with Web3 wallets the same moment happens: the user reaches the destination-address field and stops. The cursor blinks. They reread the field, check it again, hesitate. That one second — small, but loaded with the fear of getting something irreversible wrong — is the moment the whole product was designed around.',
        pt: 'Em quase todo teste de usabilidade com carteiras Web3 acontece o mesmo instante: o usuário chega ao campo de endereço de destino e para. O cursor pisca. Ele relê o campo, verifica de novo, hesita. Esse segundo — pequeno, mas carregado do medo de errar algo irreversível — é o momento em torno do qual o produto inteiro foi desenhado.',
      },
      goals: {
        en: 'Simulate the first transaction in a safe, reversible sandbox before any real one. Never gate progress behind an unexplained term — gas fee, seed phrase — without teaching it inline, in the moment. And complete the whole guided flow in under five minutes for a first-time user.',
        pt: 'Simular a primeira transação num sandbox seguro e reversível antes de qualquer transação real. Nunca travar o progresso atrás de um termo não explicado — taxa de gás, seed phrase — sem ensiná-lo inline, no momento. E concluir o fluxo guiado inteiro em menos de cinco minutos para quem chega pela primeira vez.',
      },
      research: {
        en: 'Qualitative interviews with people on their first contact with a Web3 wallet, moderated usability tests observing the exact moment of hesitation, and analysis of drop-off patterns across wallet onboarding flows already on the market.',
        pt: 'Entrevistas qualitativas com pessoas no primeiro contato com uma carteira Web3, testes de usabilidade moderados observando o momento exato da hesitação, e análise de padrões de abandono em fluxos de onboarding de carteiras já no mercado.',
      },
      insights: {
        en: 'Two emotional profiles coexist in the same person, often in the same session, and the design has to serve both rather than pick one. Curiosity wants to understand how this works: it reads the explanations to the end and gets frustrated by vague answers. Fear does not want to lose money over a silly mistake: it skips long explanations looking for confirmation, and wants to be stopped from making a mistake rather than merely warned. Underneath both, the same finding — people did not abandon because the product was hard, they abandoned because they were afraid of doing something irreversible with real assets. Explaining Web3 concepts upfront raised anxiety; showing the action happening lowered it.',
        pt: 'Dois perfis emocionais coexistem na mesma pessoa, muitas vezes na mesma sessão, e o design precisa servir aos dois em vez de escolher um. A curiosidade quer entender como aquilo funciona: lê as explicações até o fim e se frustra com respostas vagas. O medo não quer perder dinheiro por um erro bobo: pula explicações longas atrás de confirmação, e quer ser impedido de errar, não apenas avisado. Sob os dois, o mesmo achado — as pessoas não abandonavam porque o produto era difícil, abandonavam porque tinham medo de fazer algo irreversível com ativos reais. Explicar conceitos Web3 antecipadamente aumentava a ansiedade; mostrar a ação acontecendo a reduzia.',
      },
      strategy: {
        en: 'Three decisions set Aether apart from the market default. Teach before acting, so each concept arrives when it becomes necessary and not before. Rehearse before the real thing, so the user practises in a simulation identical to the real experience, at no cost and no risk. And speak human, so terms like hash, gas and signature are translated into what they actually mean for the person using them, without losing precision. Prioritization followed impact against the core fear: trimming screens and replacing jargon first, the full guided-simulation engine sequenced after.',
        pt: 'Três decisões separam a Aether do padrão de mercado. Ensinar antes de agir, para cada conceito chegar quando se torna necessário e não antes. Simular antes do real, para o usuário praticar numa simulação idêntica à experiência real, sem custo e sem risco. E falar humano, para termos como hash, gás e assinatura serem traduzidos no que de fato significam para quem está usando, sem perder precisão. A priorização seguiu o impacto sobre o medo central: cortar telas e substituir jargão primeiro, o motor completo de simulação guiada depois.',
      },
      exploration: {
        en: 'Three directions were weighed. Tutorial-first would explain every Web3 concept before letting the user touch anything. Sandbox-first would drop them into a full sandbox with no guidance at all. Guided simulation won: narrate a real first transaction step by step, with the user acting while the system explains only what is happening right now. A gamified XP-and-levels framing was tested conceptually and rejected for trivializing what is still, functionally, a real financial action. A chatbot-style question-and-answer onboarding was rejected for adding a decision — what to ask — at exactly the moment friction needed to go down.',
        pt: 'Três direções foram pesadas. Tutorial primeiro explicaria cada conceito Web3 antes de deixar o usuário tocar em qualquer coisa. Sandbox primeiro o jogaria num ambiente livre sem orientação nenhuma. A simulação guiada venceu: narrar uma primeira transação real passo a passo, com o usuário agindo enquanto o sistema explica só o que está acontecendo naquele momento. Um enquadramento gamificado, com XP e níveis, foi testado conceitualmente e rejeitado por banalizar o que ainda é, na prática, uma ação financeira real. Um onboarding em formato de chatbot foi rejeitado por adicionar uma decisão — o que perguntar — exatamente onde o atrito precisava diminuir.',
      },
      uxflow: {
        en: 'Five screens, one linear path, no branching: welcome, wallet education, guided transaction, processing, success. What was removed matters as much as what stayed — the seed phrase exposed on the first screen before any context, manual network selection in the first session, untranslated gas jargon presented as mandatory decision fields, and the pile of generic confirmation screens. Three mechanisms repeat across the whole flow so the pattern becomes predictable: a chat bubble where the AI speaks in first person at the top of every screen, progressive disclosure that shows only what the current step needs, and a double confirmation in plain language before anything irreversible.',
        pt: 'Cinco telas, um caminho linear, sem ramificação: boas-vindas, educação da carteira, transação guiada, processamento, sucesso. O que foi removido importa tanto quanto o que ficou — a seed phrase exposta na primeira tela antes de qualquer contexto, a escolha manual de rede na primeira sessão, o jargão de gás sem tradução apresentado como campo obrigatório de decisão, e a pilha de telas genéricas de confirmação. Três mecanismos se repetem em todo o fluxo para o padrão ficar previsível: uma bolha de conversa onde a IA fala em primeira pessoa no topo de cada tela, revelação progressiva que mostra só o que aquele passo exige, e uma confirmação dupla em linguagem simples antes de qualquer coisa irreversível.',
      },
      ui: {
        en: 'Each of the five screens carries a specific emotional moment and a specific job for the AI. Welcome introduces Aether as a guide rather than a form. Wallet education explains what a wallet is through an everyday analogy while the wallet is created in the background. The guided transaction pre-fills the fields and has the AI confirm each one in a human voice before sending — this is where the blinking cursor is answered. Processing shows signing, broadcasting and confirming step by step so the wait is not an uncertain void. Success closes with concrete numbers: time, amount, hash.',
        pt: 'Cada uma das cinco telas carrega um momento emocional específico e um trabalho específico para a IA. Boas-vindas apresenta a Aether como guia, não como formulário. A educação da carteira explica o que é uma carteira por analogia do cotidiano enquanto a carteira é criada em segundo plano. A transação guiada pré-preenche os campos e faz a IA confirmar cada um em voz humana antes do envio — é aqui que o cursor piscando é respondido. O processamento mostra assinatura, transmissão e confirmação passo a passo para a espera não ser um vazio incerto. O sucesso fecha com números concretos: tempo, valor, hash.',
      },
      ds: {
        en: 'A lavender-on-dark system built for what the case calls enigmatic professionalism and ethereal clarity: surface #1E1E2E, a neon lavender primary #DEB7FF, an elevated surface #343344, and a system error #93000A held deliberately apart from the lavender family so a failure can never be missed. Because the palette is near-monochrome, status never relies on hue alone — every badge pairs an icon with a label. Touch targets on the guided-transaction buttons stay at 44 by 44 points, since a mis-tap during a simulated money action costs more trust than it costs pixels.',
        pt: 'Um sistema lavanda sobre escuro, feito para o que o case chama de profissionalismo enigmático e clareza etérea: superfície #1E1E2E, um lavanda neon primário #DEB7FF, superfície elevada #343344 e um erro de sistema #93000A mantido deliberadamente afastado da família lavanda para uma falha nunca passar batida. Como a paleta é quase monocromática, o status nunca depende só de matiz — todo badge combina ícone e rótulo. Os alvos de toque nos botões de transação guiada ficam em 44 por 44 pontos, porque um toque errado durante uma ação de dinheiro simulada custa mais confiança do que custa pixel.',
      },
      validation: {
        en: 'Moderated usability tests and post-task interviews shaped the flow and produced the confidence figure. What has not happened is testing the core hypothesis — that guided simulation reduces fear — with first-time crypto users specifically, which is the first item on the next-steps list.',
        pt: 'Testes de usabilidade moderados e entrevistas pós-tarefa moldaram o fluxo e produziram o número de confiança. O que não aconteceu foi testar a hipótese central — que a simulação guiada reduz o medo — especificamente com quem usa cripto pela primeira vez, e esse é o primeiro item da lista de próximos passos.',
      },
      outcome: {
        en: 'Aether is a conceptual portfolio project with no production user base. The numbers below are projections from UX heuristics, market benchmarks and qualitative testing — not instrumented data. Everything downstream of design, from engineering handoff to phased release and analytics, is written as how it would be done rather than as work performed.',
        pt: 'Aether é um projeto conceitual de portfólio, sem base de usuários em produção. Os números abaixo são projeções a partir de heurísticas de UX, benchmarks de mercado e testes qualitativos — não dados instrumentados. Tudo o que vem depois do design, do handoff de engenharia ao lançamento faseado e à analytics, está escrito como seria feito, não como trabalho executado.',
      },
      learnings: {
        en: 'Fear does not get solved with more information. Early on I tried to resolve hesitation by explaining more; what worked was the opposite — less text, more active confirmation from the AI at each critical field. Trust is built through perceived control, not paragraphs. Rehearsal is also cheaper than it looks: letting the user practise on a simulated transaction seemed like one extra funnel step, and turned out to be the step that most reduced anxiety, because it turned "I don’t know what is about to happen" into "I already know exactly what is about to happen". And projections demand honesty about what we do not know — labelling clearly what is a projection, and why, matters as much as the interface itself.',
        pt: 'O medo não se resolve com mais informação. No começo eu tentava resolver a hesitação explicando mais; o que funcionou foi o oposto — menos texto, mais confirmação ativa da IA em cada campo crítico. Confiança se constrói com controle percebido, não com parágrafos. Ensaiar também é mais barato do que parece: deixar o usuário praticar numa transação simulada parecia uma etapa a mais no funil, e acabou sendo a etapa que mais reduziu ansiedade, porque transformou o "não sei o que vai acontecer" em "já sei exatamente o que vai acontecer". E projeção exige honestidade sobre o que não se sabe — rotular claramente o que é projeção, e por quê, importa tanto quanto a interface em si.',
      },
      metrics: [
        { v: '+61%', k: { en: 'Onboarding completion', pt: 'Conclusão do onboarding' }, proj: true },
        { v: '<5min', k: { en: 'To first transaction', pt: 'Até a primeira transação' }, proj: true },
        { v: '+38%', k: { en: 'Perceived confidence', pt: 'Confiança percebida' }, proj: true },
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
      en: 'Eight product teams, no shared visual language — a new inconsistency every sprint.',
      pt: 'Oito times de produto, nenhuma linguagem visual compartilhada — uma inconsistência nova a cada sprint.',
    },
    spec: {
      role: { en: 'Design systems lead', pt: 'Líder de sistemas de design' },
      duration: { en: '—', pt: '—' },
      team: { en: 'Solo project', pt: 'Projeto solo' },
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
        en: 'Projected 64% less component handoff time and 71% fewer visual inconsistencies reaching QA.',
        pt: 'Projeção de 64% menos tempo de handoff de componente e 71% menos inconsistências visuais chegando ao QA.',
      },
    },
    s: {
      context: {
        en: 'Forge is a project-management app built by eight product teams with no shared visual language. Scale without a system is chaos with a nice logo: the product looked like eight products wearing the same badge, and the gap showed up every single sprint.',
        pt: 'Forge é um app de gestão de projetos construído por oito times de produto sem nenhuma linguagem visual compartilhada. Escala sem sistema é caos com logo bonito: o produto parecia oito produtos usando o mesmo crachá, e a lacuna aparecia a cada sprint.',
      },
      problem: {
        en: 'Every team reinvented the wheel. A primary button had seven variants in production — seventeen counting every corner of the codebase. Inputs came in four heights, cards in three shadow styles. Nothing was built maliciously; the problem was systemic. Designers spent 40% of their time replicating components that already existed, handoff took three and a half times longer than it should, 68% of reported visual bugs were component inconsistencies, and every release carried three to five extra review rounds because of them.',
        pt: 'Cada time reinventava a roda. Um botão primário tinha sete variações em produção — dezessete contando cada canto do código. Inputs vinham em quatro alturas, cards em três estilos de sombra. Nada era feito por má vontade; o problema era sistêmico. Designers gastavam 40% do tempo replicando componentes que já existiam, o handoff levava três vezes e meia mais do que deveria, 68% dos bugs visuais reportados eram inconsistências de componente, e cada release carregava de três a cinco rodadas extras de revisão por causa disso.',
      },
      goals: {
        en: 'Create a single source of truth that any team could use, understand and trust without asking permission or guessing. Every token semantic rather than raw, every component documented in both its isolated states and one real in-context usage, and nothing published to the library until a live product screen already used it.',
        pt: 'Criar uma única fonte de verdade que qualquer time pudesse usar, entender e confiar sem pedir permissão ou adivinhar. Todo token semântico em vez de bruto, todo componente documentado tanto nos estados isolados quanto em um uso real em contexto, e nada publicado na biblioteca antes de uma tela real do produto já estar usando.',
      },
      research: {
        en: 'A production audit catalogued every button, input and card variant shipping across the eight teams — no judgement, just an honest inventory. Interviews with designers and engineers traced the real cost of the gap: not the visual drift, but the hours spent re-deciding things that should have already been decided.',
        pt: 'Uma auditoria de produção catalogou cada variação de botão, input e card em uso pelos oito times — sem julgamento, só um inventário honesto. Entrevistas com designers e engenheiros rastrearam o custo real da lacuna: não o desvio visual, mas as horas gastas redecidindo coisas que já deveriam estar decididas.',
      },
      insights: {
        en: 'The real cost was never visual, it was time. Forty per cent of design hours went into rebuilding components that already existed somewhere in the org, just slightly different. Teams did not distrust each other’s work — they simply had no shared vocabulary to reuse it. And every downstream inconsistency traced back to the same root: teams picking their own colours, spacing and radii from scratch.',
        pt: 'O custo real nunca foi visual, foi tempo. Quarenta por cento das horas de design iam para reconstruir componentes que já existiam em algum lugar da empresa, só que ligeiramente diferentes. Os times não desconfiavam do trabalho uns dos outros — simplesmente não tinham vocabulário compartilhado para reaproveitar. E toda inconsistência posterior remetia à mesma raiz: cada time escolhendo suas próprias cores, espaçamentos e raios do zero.',
      },
      strategy: {
        en: 'Fix the token layer first. Three decisions carried the rest: semantic before literal, so components reference "danger" and "success" and never a hex value, which lets the system be re-themed without touching a component; one ten-step scale from 50 to 900 covering every surface, border and contrast need, so no shade gets invented mid-sprint; and tokens shipping before components, locked in Figma variables before the first Button was built rather than adjusted retroactively.',
        pt: 'Corrigir primeiro a camada de tokens. Três decisões sustentaram o resto: semântico antes de literal, para os componentes referenciarem "danger" e "success" e nunca um valor hexadecimal, o que permite re-tematizar o sistema sem tocar em componente algum; uma única escala de dez passos, de 50 a 900, cobrindo toda necessidade de superfície, borda e contraste, para nenhum tom ser inventado no meio do sprint; e tokens entregues antes dos componentes, travados nas variáveis do Figma antes de o primeiro Button existir, em vez de ajustados depois.',
      },
      exploration: {
        en: 'Two directions were weighed. Adopting an external open-source design system was faster to start, and was rejected because its tokens and conventions did not map to the org’s existing surface — teams would have overridden most of it anyway. Building from scratch, tokens first, was slower to start and won, because every decision traces back to the org’s actual components instead of a borrowed convention. A "component amnesty" — letting teams keep what they had and only aligning new work — was rejected for freezing the 40% replication cost in place. Starting with the composites, the most visibly broken pieces, was rejected too: composites built on inconsistent atomics inherit the same sprawl one layer up.',
        pt: 'Duas direções foram pesadas. Adotar um design system open-source externo era mais rápido de começar, e foi rejeitado porque os tokens e convenções dele não mapeavam para a superfície existente da empresa — os times acabariam sobrescrevendo quase tudo. Construir do zero, tokens primeiro, era mais lento de começar e venceu, porque cada decisão remete aos componentes reais da empresa e não a uma convenção emprestada. Uma "anistia de componentes" — deixar cada time ficar com o que tinha e alinhar só o novo — foi rejeitada por congelar o custo de 40% de replicação. Começar pelos compostos, as peças mais visivelmente quebradas, também foi rejeitado: composto construído sobre atômico inconsistente herda a mesma bagunça uma camada acima.',
      },
      uxflow: {
        en: 'The system is layered the way it was built. Five atomic primitives sit at the bottom — Button, Status Badge, Input Field, Toggle and Checkbox, Avatar and Tag — each documenting every state it can be in. Three composites are assembled entirely from those atomics: Alert and Banner from colour and typography tokens, Modal composing Button inside a locked-width container, and Data Table composing Status Badge and Avatar into rows that never drift from the card versions of the same data. Consistency emerges from the layering rather than from any single decision.',
        pt: 'O sistema é estruturado em camadas, do jeito que foi construído. Cinco primitivos atômicos ficam na base — Button, Status Badge, Input Field, Toggle e Checkbox, Avatar e Tag — cada um documentando todo estado que pode assumir. Três compostos são montados inteiramente com esses atômicos: Alert e Banner a partir de tokens de cor e tipografia, Modal compondo Button dentro de um container de largura fixa, e Data Table compondo Status Badge e Avatar em linhas que nunca se desviam das versões em card dos mesmos dados. A consistência emerge das camadas, não de cada decisão individual.',
      },
      ui: {
        en: 'Every component is shown twice: once with all its states in isolation, and once wired into a real product screen, so a team can see how it behaves in context rather than only how it looks alone. The proof screens are the Kanban board, the task detail panel, a composition showcase and a component health dashboard — the same primitives carrying real product surfaces.',
        pt: 'Cada componente aparece duas vezes: uma com todos os seus estados isolados, outra conectado a uma tela real do produto, para o time ver como ele se comporta em contexto e não só como parece sozinho. As telas de prova são o board Kanban, o painel de detalhe da task, uma vitrine de composição e um dashboard de saúde dos componentes — os mesmos primitivos sustentando superfícies reais.',
      },
      ds: {
        en: 'Tokens are the contract between design and code. A ten-step primary scale, four semantic colours — primary #3B82F6, success #16A34A, danger #DC2626, warning #D97706 — a four-step type ramp from display to mono snippet, a core icon set, and the component gallery itself. Accessibility is defined at the token layer: focus states are a token rather than a per-component decision, so keyboard navigation stays consistent everywhere, and status colour is always paired with a text label.',
        pt: 'Tokens são o contrato entre design e código. Uma escala primária de dez passos, quatro cores semânticas — primary #3B82F6, success #16A34A, danger #DC2626, warning #D97706 — uma escala tipográfica de quatro passos, de display a snippet mono, um conjunto de ícones principais e a própria galeria de componentes. A acessibilidade é definida na camada de tokens: o estado de foco é um token, não uma decisão por componente, então a navegação por teclado se mantém consistente em todo lugar, e a cor de status vem sempre acompanhada de rótulo de texto.',
      },
      validation: {
        en: 'Never instrumented. Rollout numbers were self-reported by the teams, and putting real component-adoption tracking in place is the first item on the next-steps list.',
        pt: 'Nunca instrumentado. Os números de rollout foram auto-reportados pelos times, e colocar rastreamento real de adoção de componentes de pé é o primeiro item da lista de próximos passos.',
      },
      outcome: {
        en: 'Forge is a conceptual portfolio project with no production telemetry. The numbers below are projections based on the audit baseline, UX heuristics and comparable design-system rollouts — not instrumented data. Adoption was treated as its own design problem: five stages from audit to team onboarding, pairing with each team through their first real migration rather than publishing documentation and hoping.',
        pt: 'Forge é um projeto conceitual de portfólio, sem telemetria de produção. Os números abaixo são projeções baseadas na auditoria inicial, em heurísticas de UX e em rollouts comparáveis de design system — não dados instrumentados. A adoção foi tratada como problema de design próprio: cinco etapas, da auditoria ao onboarding dos times, acompanhando cada um na primeira migração real em vez de publicar documentação e torcer.',
      },
      learnings: {
        en: 'The biggest win was not visual, it was trust. Once a team knew it could reference the system instead of reinventing it, the conversation moved from "which version do I use?" to "what are we actually trying to solve?". Tokens before components is the whole trick — it is tempting to start with the components everyone can see, but locking the primitives first meant every component built afterwards inherited consistency automatically instead of having it enforced case by case. And adoption is a design problem, not a launch event: publishing documentation moved nothing, while pairing with each team through a real migration did, because the system had to prove itself under a real deadline rather than in a showcase.',
        pt: 'O maior ganho não foi visual, foi confiança. Quando o time sabia que podia referenciar o sistema em vez de reinventar, a conversa mudava de "qual versão eu uso?" para "o que estamos realmente tentando resolver?". Tokens antes de componentes é o truque todo — é tentador começar pelos componentes que todo mundo vê, mas travar os primitivos primeiro fez com que cada componente construído depois herdasse consistência automaticamente, em vez de precisar ser fiscalizado caso a caso. E adoção é problema de design, não evento de lançamento: publicar documentação não moveu nada, acompanhar cada time numa migração real moveu, porque o sistema precisava provar seu valor sob um prazo real e não numa demonstração.',
      },
      thin: ['validation'],
      metrics: [
        { v: '-64%', k: { en: 'Component handoff time', pt: 'Tempo de handoff de componente' }, proj: true },
        { v: '-71%', k: { en: 'Visual inconsistencies in QA', pt: 'Inconsistências visuais em QA' }, proj: true },
        { v: '12', k: { en: 'Teams aligned on the system', pt: 'Times alinhados ao sistema' }, proj: true },
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
      duration: { en: '—', pt: '—' },
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
        en: 'Two personas came out of the work, one on each side of the counter. Marina orders a few times a year and just wants to see what is available and pick a time without going back and forth over text — she has no idea what is in stock until she asks, has had a pickup time get lost in a DM thread, and once forgot to pick up an order entirely. Denise is the baker and the business: one person, who needs to stop answering the same question a hundred times a day.',
        pt: 'Duas personas saíram do trabalho, uma de cada lado do balcão. A Marina pede algumas vezes por ano e só quer ver o que tem disponível e marcar um horário sem ficar mandando mensagem — ela não sabe o que tem em estoque até perguntar, já combinou horário por DM e a mensagem sumiu na conversa, e uma vez esqueceu de ir buscar o pedido. A Denise é a confeiteira e o negócio: uma pessoa só, que precisa parar de responder a mesma pergunta cem vezes por dia.',
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
        en: 'Three directions were considered before converging. A delivery-style app with pickup as a checkbox was the fastest to build and the most familiar pattern, and was rejected for treating pickup as a fallback instead of the actual product. A scheduling tool bolted onto Instagram DMs had the lowest build cost, and was rejected because there is still no real catalog or cart — just a calendar link, which does not remove the manual coordination. The pickup-first ordering app won. Early sketches then tested where pickup selection should live: bundled into the cart step, or its own checkout step. Checkout won, since it cannot be skipped or missed the way a cart-step option can. Two alternatives were rejected outright: integrating a courier marketplace API, which would undo the very insight the product rests on, and a generic contact-form checkout that promises to confirm the time by message later — that only moves the WhatsApp problem one screen over.',
        pt: 'Três direções foram consideradas antes de convergir. Um app estilo entrega com retirada como checkbox era o mais rápido de construir e o padrão mais familiar, e foi rejeitado por tratar a retirada como opção alternativa em vez do produto real. Uma ferramenta de agendamento colada no Instagram DM tinha o menor custo de construção, e foi rejeitada porque continua sem catálogo ou carrinho de verdade — só um link de calendário, que não remove a coordenação manual. O app de pedidos focado em retirada venceu. Os primeiros esboços então testaram onde a escolha de retirada deveria viver: embutida na etapa do carrinho, ou como etapa própria de checkout. O checkout venceu, porque não pode ser pulado ou perdido do jeito que uma opção na etapa do carrinho pode. Duas alternativas foram rejeitadas de cara: integrar uma API de marketplace de entregadores, que desfaria justamente o insight em que o produto se apoia, e um checkout de formulário de contato genérico que promete confirmar o horário por mensagem depois — isso só move o problema do WhatsApp uma tela adiante.',
      },
      uxflow: {
        en: 'Six steps, catalog to pickup: catalog, product, cart, payment, schedule pickup, confirmation. Step five is why the product exists — it is the moment Denise stops negotiating every slot by message and starts trusting a schedule already synced with Google Calendar. The app splits in two. The customer side runs home and catalog, product detail, cart, checkout payment method, checkout pickup day and time, order confirmation, my orders with history and status, and profile. Denise’s dashboard runs today’s overview, catalog management, the orders queue with status, calendar with day blocking and a capacity limit, and settings.',
        pt: 'Seis etapas, do catálogo à retirada: catálogo, produto, carrinho, pagamento, agendar retirada, confirmação. O passo 5 é o que faz esse produto valer a pena — é o momento em que a Denise deixa de negociar cada horário por mensagem e passa a confiar numa agenda já sincronizada com o Google Calendar. O app se divide em dois. O lado do cliente tem home e catálogo, detalhes do produto, carrinho, checkout com forma de pagamento, checkout com dia e horário de retirada, confirmação do pedido, meus pedidos com histórico e status, e perfil. O painel da Denise tem o resumo do dia, gestão de catálogo, a fila de pedidos com status, agenda com bloqueio de dias e limite de capacidade, e configurações.',
      },
      ui: {
        en: 'Two apps, one visual language. On the customer side the catalog reads like a menu rather than a feed, the product detail carries portion size and lead time so nobody has to ask, and the pickup step is a calendar with real availability, not a free-text field. Payment offers both paths from the start, so the pay-now-or-at-pickup question never becomes a reason to stop. On Denise’s side the dashboard opens on the day rather than on a control panel: today’s overview, the orders queue with status, and a calendar where she blocks a day or caps capacity in one gesture instead of turning down customers one by one.',
        pt: 'Dois apps, uma linguagem visual. Do lado do cliente, o catálogo se lê como cardápio e não como feed, o detalhe do produto traz porção e prazo para ninguém precisar perguntar, e a etapa de retirada é um calendário com disponibilidade real, não um campo de texto livre. O pagamento oferece os dois caminhos desde o início, para a dúvida entre pagar agora ou na retirada nunca virar motivo de parada. Do lado da Denise, o painel abre no dia e não num centro de controle: resumo de hoje, fila de pedidos com status, e uma agenda onde ela bloqueia um dia ou limita a capacidade num gesto só, em vez de recusar cliente um por um.',
      },
      ds: {
        en: 'A warm system built around cream and ink: canvas #FBF6EC against ink #1C1815, verified for AA contrast at every text size in use, with honey, coral and sage accents reserved for interactive and brand moments and never used as the only signal of state. Type pairs Fraunces for display with Work Sans for UI, from a 28px headline down to an 11px caption. The component set is deliberately small — button, status chip, nav tab item, toggle, input field and calendar day cell — and every status chip pairs colour with a label rather than relying on colour alone. Calendar day cells hold a 44 by 44 point touch target, since a small calendar grid is exactly where mis-taps are most likely.',
        pt: 'Um sistema quente construído em torno de cream e ink: fundo #FBF6EC contra texto #1C1815, verificado para contraste AA em todos os tamanhos de texto usados, com acentos honey, coral e sage reservados para momentos interativos e de marca e nunca usados como único sinal de estado. A tipografia combina Fraunces no display com Work Sans na interface, do headline de 28px até a caption de 11px. O conjunto de componentes é deliberadamente pequeno — botão, chip de status, item de aba de navegação, toggle, campo de input e célula de dia do calendário — e todo chip de status combina cor com rótulo em vez de depender só de cor. As células de dia mantêm alvo de toque de 44 por 44 pontos, porque uma grade de calendário pequena é exatamente onde toques errados são mais prováveis.',
      },
      validation: {
        en: 'Not tested with real customers. Validating the missed-pickup hypothesis with a small-scale pilot alongside Denise’s actual orders is the first item on the next-steps list, followed by an A/B on the default payment option to see which one actually reduces no-shows.',
        pt: 'Não testado com clientes reais. Validar a hipótese de não comparecimento com um piloto em pequena escala junto aos pedidos reais da Denise é o primeiro item da lista de próximos passos, seguido de um A/B na opção de pagamento padrão para ver qual realmente reduz mais os não comparecimentos.',
      },
      outcome: {
        en: 'This is a conceptual case study. The figures below are estimates based on the problem identified, not real metrics from a product running in production. Confirming straight to the calendar should cut forgotten and duplicate orders; a real catalog should cut the time spent answering “do you have this?” and “what time can I pick up?” all day; and seeing the whole menu at once should bring customers back more often. Out of scope here: rescheduling or cancelling a confirmed order, support for more than one person running the dashboard, detailed action screens in the order queue, and product creation and editing in Denise’s dashboard.',
        pt: 'Este é um case conceitual. Os números abaixo são estimativas baseadas no problema identificado, não métricas reais de um produto rodando em produção. Confirmar direto na agenda deve reduzir esquecimento e pedido duplicado; um catálogo de verdade deve reduzir o tempo gasto respondendo "tem isso?" e "que horas posso pegar?" o dia inteiro; e ver o cardápio inteiro de uma vez deve trazer o cliente de volta mais vezes. Fora do escopo aqui: reagendar ou cancelar um pedido confirmado, suporte a mais de uma pessoa operando o painel, telas de ação detalhadas na fila de pedidos, e cadastro e edição de produto no painel da Denise.',
      },
      learnings: {
        en: 'A constraint becomes the differentiator. “No delivery” looked like a limitation of Denise’s business at first; that is exactly what pushed me to design scheduled pickup as a real feature instead of hiding the gap. Designing for a team of one changed every screen in her dashboard — she has two hands and an oven, not an operations team, so the goal was to get decisions out of her way rather than stack up another control panel. And integration turned out to be a trust feature: the Google Calendar sync does more than add convenience, it replaces manual back-and-forth over DM, where “confirmed” could mean almost anything, with a record both sides can actually check.',
        pt: 'Restrição vira diferencial. "Sem entrega" parecia só uma limitação do negócio da Denise; foi exatamente isso que me fez desenhar a retirada agendada como recurso de verdade, em vez de esconder a ausência. Desenhar para uma pessoa só mudou cada tela do painel dela — ela tem duas mãos e um forno, não uma equipe de operações, então o objetivo era tirar decisão da frente dela, não empilhar mais um painel de controle. E integração acabou sendo feature de confiança: a sincronização com o Google Calendar faz mais que dar conveniência, ela troca a combinação manual por DM, onde "confirmado" podia significar qualquer coisa, por um registro que os dois lados conseguem checar.',
      },
      thin: ['validation'],
      metrics: [
        { v: '↓', k: { en: 'Missed orders', pt: 'Pedidos perdidos' }, proj: true },
        { v: '↓', k: { en: 'Time spent on DMs', pt: 'Tempo em DM' }, proj: true },
        { v: '↑', k: { en: 'Repeat orders', pt: 'Pedidos recorrentes' }, proj: true },
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
        en: 'Projected 32% fewer condition-mismatch disputes and 18% more search-to-purchase conversion.',
        pt: 'Projeção de 32% menos disputas por incompatibilidade de condição e 18% mais conversão de busca para compra.',
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
        en: 'Two personas framed the work. Juliana, 29, a graphic designer in Belo Horizonte, who once returned an item because it arrived looking nothing like what she ordered. And Rafael, 34, who resells thrifted pieces in Recife and is afraid of describing something wrong by accident and having it come back as a complaint. A competitive scan covered the three ways people resell clothes today: Instagram and independent thrift sellers, Depop and Vinted, and physical thrift stores.',
        pt: 'Dois perfis guiaram o trabalho. Juliana, 29, designer gráfica em Belo Horizonte, que já devolveu uma peça porque chegou completamente diferente do que pediu. E Rafael, 34, que revende peças de brechó em Recife e tem medo de descrever algo errado sem querer e receber a peça de volta com reclamação. O panorama competitivo cobriu as três formas de revender roupa hoje: Instagram e brechós independentes, Depop e Vinted, e brechós físicos.',
      },
      insights: {
        en: 'Juliana did not distrust secondhand items themselves — she distrusted the gap between the photo and what actually arrived. Vague listing language like "like new" or "barely used" meant nothing without a shared standard. And Rafael was not a bad seller: he had good items sitting unlisted because he did not know how to describe condition without over-selling and disappointing a buyer, or under-selling and pricing himself out of a fair sale.',
        pt: 'Juliana não desconfiava dos itens de segunda mão em si — desconfiava da distância entre a foto e o que realmente chegava. Linguagem vaga no anúncio, do tipo "seminovo" ou "pouco usado", não significava nada sem um padrão compartilhado. E Rafael não era um vendedor ruim: tinha peças boas paradas sem anunciar porque não sabia descrever a condição sem supervalorizar e decepcionar quem compra, ou subvalorizar e cobrar menos do que era justo.',
      },
      strategy: {
        en: 'Make condition grading the core trust mechanism. Sellers grade every item against a fixed four-step scale — New with tags, Excellent, Good, Fair — with guided photos, and that badge then shows up everywhere: in search, on the product card, in the cart. No listing publishes without a grade, and optional flaw notes sit alongside the structured grade rather than replacing it. Physical thrift stores already solve this by letting you handle the item; the goal was to bring that same confidence online.',
        pt: 'Fazer da avaliação de condição o mecanismo central de confiança. Quem vende classifica cada peça contra uma escala fixa de quatro passos — New with tags, Excellent, Good, Fair — com fotos guiadas, e esse selo passa a aparecer em todo lugar: na busca, no card do produto, no carrinho. Nenhum anúncio é publicado sem nota, e notas opcionais de defeito ficam ao lado da nota estruturada em vez de substituí-la. O brechó físico já resolve isso deixando você pegar a peça na mão; o objetivo era levar essa mesma confiança para o online.',
      },
      exploration: {
        en: 'Three directions were weighed before converging. Free-text condition descriptions with required photos were cheapest to build and rejected, because they just move the problem from "no photos" to "inconsistent wording" — the original issue. A third-party authentication service had the highest trust ceiling and was rejected as too heavy an operational dependency for a peer-to-peer marketplace at this stage. The structured self-graded scale won. Early sketches also tested whether grading should come before or after photos; making it its own required step won, because an optional field is the first thing a seller in a hurry skips.',
        pt: 'Três direções foram pesadas antes de convergir. Descrições de condição em texto livre com fotos obrigatórias eram as mais baratas de construir e foram rejeitadas, porque só movem o problema de "sem fotos" para "texto inconsistente" — a questão original. Um serviço terceirizado de autenticação tinha o maior teto de confiança e foi rejeitado por ser uma dependência operacional pesada demais para um marketplace peer-to-peer nesta fase. A escala autodeclarada e estruturada venceu. Os primeiros esboços também testaram se o grading vinha antes ou depois das fotos; torná-lo uma etapa obrigatória própria venceu, porque campo opcional é a primeira coisa que quem vende com pressa pula.',
      },
      uxflow: {
        en: 'Two task flows that mirror each other. The buyer searches or browses, filters by condition, opens the product, adds to cart, checks out and tracks the order. The seller taps list an item, uploads guided photos, sets condition and price, publishes, receives and accepts an offer, and ships. The sitemap splits three ways: buyer, seller, and the shared surfaces — login, profile and help.',
        pt: 'Dois fluxos de tarefa que se espelham. Quem compra busca ou navega, filtra por condição, abre o produto, adiciona ao carrinho, finaliza e acompanha o pedido. Quem vende toca em anunciar, envia fotos guiadas, define condição e preço, publica, recebe e aceita uma oferta, e despacha. O mapa do site se divide em três: comprador, vendedor e as telas compartilhadas — login, perfil e ajuda.',
      },
      ui: {
        en: 'A warm, light interface built so the condition badge always reads as the most trustworthy thing on the screen. It appears in the browse grid, in search results, on the product detail page and in the cart, using the same colour and wording every time. The seller side mirrors it: the listing flow makes grading an explicit step, and My Listings shows each item with the grade it was published under.',
        pt: 'Uma interface clara e quente, construída para o selo de condição sempre ser a coisa mais confiável da tela. Ele aparece na vitrine, nos resultados de busca, na página de detalhe e no carrinho, sempre com a mesma cor e as mesmas palavras. O lado do vendedor espelha isso: o fluxo de anúncio faz do grading uma etapa explícita, e Meus Anúncios mostra cada peça com a nota sob a qual foi publicada.',
      },
      ds: {
        en: 'A sage, terracotta and stone palette on light surfaces, with tokens checked for AA contrast throughout. The condition chip is never colour alone — every grade carries its text label, so the signal survives colour blindness and greyscale. Sidebar navigation keeps a focus state distinct from the active state, and the grading step ships with no grade preselected, so a screen-reader user cannot fall silently into a condition they did not choose.',
        pt: 'Uma paleta sage, terracota e stone sobre superfícies claras, com tokens verificados para contraste AA em toda a escala. O chip de condição nunca é só cor — toda nota carrega o rótulo de texto, então o sinal sobrevive a daltonismo e a escala de cinza. A navegação lateral mantém o estado de foco distinto do estado ativo, e a etapa de grading não vem com nota pré-selecionada, para quem usa leitor de tela não cair silenciosamente numa condição que não escolheu.',
      },
      validation: {
        en: 'Not tested with real buyers and sellers. Usability testing was scoped out of this first phase and sits in the next-steps list alongside the dispute flow.',
        pt: 'Não testado com compradores e vendedores reais. Os testes de usabilidade ficaram fora desta primeira fase e estão na lista de próximos passos, ao lado do fluxo de disputa.',
      },
      outcome: {
        en: 'This is a conceptual portfolio project — the figures below are projected from industry benchmarks, not measured from a live product. What the work produced is a trust mechanism that survives contact with both sides of the marketplace: a grade a seller can apply without fear and a buyer can read without asking.',
        pt: 'Este é um projeto conceitual de portfólio — os números abaixo são projetados a partir de benchmarks do setor, não medidos em produto real. O que o trabalho produziu foi um mecanismo de confiança que sobrevive ao contato com os dois lados do marketplace: uma nota que quem vende consegue aplicar sem medo e quem compra consegue ler sem perguntar.',
      },
      learnings: {
        en: 'The hardest part was not drawing screens, it was deciding where the condition badge had to appear to work as proof rather than as information. I tried a version where it only lived on the product detail page, and that still left search full of items with uncertain condition. Moving it into the search card fixed the real problem: the decision to trust happens before the click, not after. If I kept going, the next step is the dispute flow — what happens when the item that arrives does not match its badge. That is the real test of the system, and it fell outside this first phase.',
        pt: 'O mais difícil não foi desenhar telas, foi decidir onde o selo de condição precisava aparecer para funcionar como prova, não como informação. Testei uma versão em que ele só existia na página de detalhe, e isso ainda deixava a busca cheia de peças com estado incerto. Movê-lo para o card de busca resolveu o problema raiz: a decisão de confiar acontece antes do clique, não depois. Se eu continuasse, o próximo passo é o fluxo de disputa — o que acontece quando a peça que chega não bate com o selo. Esse é o teste real do sistema, e ficou fora desta primeira fase.',
      },
      thin: ['validation'],
      metrics: [
        { v: '-32%', k: { en: 'Condition-mismatch disputes', pt: 'Disputas por condição divergente' }, proj: true },
        { v: '+18%', k: { en: 'Search-to-purchase conversion', pt: 'Conversão de busca para compra' }, proj: true },
        { v: '2.5×', k: { en: 'Offer response speed', pt: 'Velocidade de resposta a ofertas' }, proj: true },
      ],
    },
  },
];
