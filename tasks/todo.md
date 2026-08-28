# Port: Portfolio.dc.html -> Vite + React + TypeScript

Fonte: `Portfolio.dc.html` (canvas Claude Design) + `support.js` (runtime dc).
Destino: `portfolio/` — projeto npm real, dev server e build de producao.

## Decisoes de arquitetura
- Vite 7 + React 19 + TypeScript. Sem framework de rotas: paginas sao estado (`page`), igual ao original.
- Estilos: `src/styles/` com design tokens em CSS custom properties + classes semanticas.
  Nada de style objects gigantes em JSX. Keyframes copiados verbatim do original.
- `sc-for` -> `.map()`, `sc-if` -> `&&`, `{{ x }}` -> `{x}`, `style-hover`/`style-focus` -> CSS `:hover`/`:focus`.
- Observers do dc viram hooks: useReveal, useScrollSpy, useDims, useParallax, useViewport, useLang.
- Dados tipados em `src/data/`. i18n en/pt em `src/i18n/`.
- Codigo morto do original NAO portado: const `RESUME` (nunca referenciada em renderVals)
  e o branch `s.list` no template (nunca populado). Registrado aqui de proposito.

## Passos
- [x] 1. Ler fonte completa (template 1-705, script 706-1233)
- [x] 2. Scaffold: package.json, vite.config.ts, tsconfig, index.html, .gitignore
- [x] 3. Tokens + global.css (keyframes, reset, print, reduced-motion)
- [x] 4. Tipos + dados: cases, stack, cv, about, slots, sections
- [x] 5. i18n (T) en/pt
- [x] 6. Hooks: useLang, useViewport, useParallax, useReveal, useScrollSpy, useDims
- [x] 7. Componentes compartilhados: Header, Footer, FigRule, Dim, Backdrop, ScrollPlot
- [x] 8. Pagina Home (hero SVG tecnico, plates/bound, philosophy, CTA)
- [x] 9. Pagina About
- [x] 10. Pagina CaseStudy (indice sticky, 13 secoes, slots, metricas, sheet mobile)
- [x] 11. Pagina Resume (+ download PDF)
- [x] 12. Pagina Contact (form -> mailto)
- [x] 13. Copiar assets/Resume-*.pdf para public/assets/
- [x] 14. Verificar: tsc --noEmit, vite build, dev server sobe
- [ ] 15. Revisao visual no browser lado a lado com o original (extensao Chrome indisponivel nesta sessao)

## Como validar
```
cd portfolio
npm install
npm run dev     # http://localhost:5173
npm run build   # dist/
npm run typecheck
```

## InvestIQ — conteudo real do Figma (2026-08-27)

Fonte: figma.com/design/aiZAr4JHmFuPzm25zIIC7m (InvestIQ — Case Study).
Arquivo tem os dois idiomas: paginas PT `1:2`–`1:9`, paginas EN `28:2`–`28:10`.

Entrada `investiq` em `src/data/cases.ts` reescrita com o conteudo real (o anterior era ficticio).
- `year` 2025 -> 2026 (design system diz "Ultima atualizacao: 19 de agosto de 2026")
- `thin: ['validation']` — a Reflexao diz que testar com investidores reais e o PROXIMO passo, nao algo feito
- 3 metricas todas `proj: true`; o disclaimer forte do Figma foi para o corpo de `outcome`,
  entao a string global `t.projected` nao precisou mudar (e compartilhada com os outros 5 cases)
- `metrics[].v` e string unica (nao localizada): "4.7/5", nao "4,7/5"
- Dados que NAO existem no Figma, definidos pelo Eduardo: duration 8 semanas, team solo,
  tools "Figma, FigJam, Notion, Claude"

## InvestIQ — imagens dos slots (2026-08-27)

17 slots preenchidos com frames exportados do Figma. `validation` fica sem imagem (e `thin`).

- Assets: `portfolio/public/assets/cases/investiq/{en,pt}/*.webp` + `wire-0X.webp` na raiz (compartilhados)
- Export PNG @2x -> resize -> WebP q82 via sharp (scratchpad, nao virou dependencia do projeto)
- 28 arquivos, 817 KB no total; ~430 KB carregados por idioma. O hero saiu de 2,45 MB PNG para 74 KB
- Larguras alvo: 1936px (full width), 952px (2 colunas), 780px (3 colunas) — 2x do display real
- Wireframes ERAM byte-identicos entre EN e PT porque a pagina `EN · Wireframes` do Figma
  nunca tinha sido traduzida. Traduzida em 2026-08-27 (ver abaixo); agora ha set por idioma

Codigo:
- `src/types.ts`: novos tipos `SlotImage` e `CaseMedia`
- `src/data/media.ts`: NOVO — imagens por case, indexado por `case.id`. `SLOTS` continua
  generico (compartilhado por todos os cases); so as imagens sao por case, senao as telas
  da InvestIQ apareceriam nos outros 5
- `src/components/Figure.tsx`: NOVO — imagem + legenda mono, ou o placeholder hachurado
  quando nao ha imagem. Slot com imagem usa `aspect-ratio` real em vez da altura fixa
- Legendas sao localizadas; `loading=lazy` em tudo menos o hero; `width`/`height` no `<img>`
  para nao ter layout shift


## InvestIQ — traducao dos wireframes EN + uniformizacao (2026-08-27)

Revisao pedida pelo Eduardo. As 6 telas hi-fi JA estavam corretas em ingles — o portugues
estava nos wireframes (secao Exploration), nao nas hi-fi.

Causa: a pagina `EN · Wireframes` do Figma foi duplicada da PT e traduzida pela metade
(cabecalhos em EN, corpo em PT). Por isso os exports saiam byte-identicos aos da PT.

Feito no Figma (autorizado pelo Eduardo), pagina 28:7:
- 25 strings traduzidas para ingles nos frames 05 (AI Insights), 06 (Dashboard) e
  07 (Suggestions). Verificado por regex: zero sobras em portugues
- Tickers e nomes proprios mantidos (PETR4, HGLG11, Tesouro Selic 2029), seguindo o que a
  pagina `EN · Hi-Fi` ja fazia. Numeros reformatados para o padrao EN (R$ 000,000.00)

Eduardo encurtou os frames de Risk Profile: wireframe EN 1250->716, PT 1250->721.
Hi-Fi Risk Profile seguiu em 603 nos dois idiomas. Todos reexportados.

Uniformizacao de altura (`normalize.mjs` no scratchpad):
- corta o fundo morto abaixo do ultimo conteudo real, depois preenche de volta ate a altura
  do grupo com a cor de fundo da propria tela. Nada e cortado e o preenchimento e invisivel
- Hi-Fi: 780x1864 nas 12 (6 EN + 6 PT). Wireframes: 780x1590 nas 12
- EN e PT normalizados no MESMO grupo, senao a grade mudaria de altura ao trocar de idioma

`media.ts`: `shared()` removido, todos os wireframes agora usam `both()`. 34 arquivos, 968 KB.

## InvestIQ — revisao dos tamanhos em Research (2026-08-27)

Dois problemas no par de imagens da secao Research:

1. ILEGIVEL. Slots em 2 colunas dao ~476px cada. Personas renderizava a 476x64 (uma tira)
   e a tabela competitiva a 476x230, ~33% da escala original — texto impossivel de ler.
2. ENQUADRAMENTO INCONSISTENTE. Personas era o sub-frame justo (so os 2 cards), mas
   competitive era a PAGINA INTEIRA (1440x696), com titulo "Competitive landscape" e
   paragrafo de introducao dentro da imagem, mais o padding escuro em volta.

Correcao:
- Competitive agora usa o sub-frame `Table` (EN 46:5, PT 40:5), 1240x341 — recorte justo,
  mesma largura do Personas (1240). Os dois viraram um par consistente
- Research passou a coluna unica; reexportados a 1936px (2x de ~968px de coluna)
- Personas 968x130 e tabela 968x266 no display. Legivel

`SLOTS` continua generico, entao a mudanca de coluna NAO podia ir la — afetaria os outros
5 cases. Novo campo opcional `cols` em `CaseMedia` faz override por case; a InvestIQ define
`cols: { research: '1fr' }`. O override vence em todos os breakpoints (o valor e '1fr',
que serve em qualquer largura).

Assets: 34 arquivos, 1.1 MB (research subiu de 952 para 1936px de largura).

Ainda sem uso: o frame `Before After` (45:15 EN / 39:15 PT, 1240x194), a comparacao
fragmentado-vs-simplificado. Encaixaria na secao `problem`, que nao tem slots configurados.

## InvestIQ — figura na secao Problem (2026-08-27)

Adicionado o frame `Before After` (EN 45:15, PT 39:15, 1240x194) — a comparacao
"Fragmentado e Caotico" vs "Inteligencia Simplificada" — na secao `problem`.
Exportado a 1936px, coluna unica, 968x152 no display.

`SLOTS` NAO ganhou um grupo `problem`. Se ganhasse, os outros 5 cases passariam a exibir
um placeholder hachurado vazio nessa secao. Em vez disso, `CaseStudy.tsx` agora aceita
slots vindos so do `MEDIA`:

    if (!thin && (group || shots))

O scaffold generico e o conteudo por case ficam independentes — uma secao mostra figuras
se o scaffold reserva espaco OU se aquele case traz imagem propria. Para os 5 cases sem
`MEDIA`, o comportamento e identico ao de antes (group existe, shots e undefined).

Assets: 36 arquivos, 1.1 MB.

## InvestIQ — figura na secao Insights (2026-08-27)

Adicionado o User Journey Map na secao `insights`, mesmo mecanismo do `problem`
(slot vindo so do MEDIA, sem tocar em SLOTS).

Usado o sub-frame `Stages` (EN 46:34, PT 40:34, 1240x188), nao o frame da pagina inteira
(1440x758) — pelo mesmo motivo da tabela competitiva: a pagina inclui titulo e paragrafo
de introducao, que ja estao no texto do case. Recorte justo, 1936px, 968x147 no display.

Sao as 5 etapas com Goal / Emotion / Opportunity, exatamente o que o corpo de `insights`
descreve (curiosidade cautelosa, impaciencia, vulnerabilidade).

AINDA SEM USO: o sub-frame `Rationale` (EN 46:66, PT 40:66, 1240x129) da mesma pagina —
os tres principios de UX (progresso visivel, uma decisao por tela, explicacao antes da
acao). Encaixaria em `strategy`, cujo corpo cita os tres textualmente.

Assets: 38 arquivos, 1.2 MB.

## InvestIQ — figura na secao Strategy (2026-08-27)

Adicionado o sub-frame `Rationale` (EN 46:66, PT 40:66, 1240x129) na secao `strategy`,
mesmo mecanismo do problem/insights. 1936px, 968x100 no display.

Os tres principios (progresso visivel, uma decisao por tela, explicacao antes da acao)
sao exatamente os que o corpo de `strategy` ja cita.

Todo o conteudo do Figma InvestIQ esta usado agora. 40 arquivos, 1.3 MB.

### Cobertura final das figuras (InvestIQ)
hero 1 · problem 1 · research 2 · insights 1 · strategy 1 · exploration 6 · uxflow 1 ·
ui 6 · ds 1 = 20 figuras, cada uma em EN e PT.
Sem figura: context, goals, validation (thin), outcome, learnings.

## InvestIQ — remocao do fundo em volta das imagens (2026-08-27)

Eduardo viu "um background em volta" de varias imagens. Medindo com deteccao de margem
uniforme, eram TRES causas distintas, nao uma:

1. MOLDURA DO SITE. `.figure__frame` desenhava `border: 1px solid var(--rule)` e
   `background: var(--surface-cell)` (#0C121A) atras de toda figura. Contra telas cujo
   fundo proprio e #12131C ou branco, isso lia como uma caixa em volta. REMOVIDOS os dois.
2. MARGEM DE PAGINA DO FIGMA. `flow` e `ds` usavam o frame da pagina inteira, entao
   carregavam ~134px L/R e ~117px T de margem morta (em 1936px). Recortados na bbox do
   conteudo. Mesmo problema que a tabela competitiva ja tinha tido.
3. MEU PRENCHIMENTO DE UNIFORMIZACAO. Para igualar as alturas eu tinha preenchido cada
   tela com a cor de fundo dela ate a altura do grupo — ui-04 chegava a 780px de
   preenchimento. Era fundo adicionado a imagem.

Correcao do (3) sem perder a uniformidade: as imagens voltaram a ser justas (so o corte do
rabo morto abaixo do conteudo) e a uniformidade passou para o CSS — o container mantem uma
proporcao unica por secao (`ratios` em `CaseMedia`) e a imagem usa
`object-fit: contain; object-position: top`. As linhas da grade continuam alinhadas, mas o
espaco que sobra e fundo da pagina, transparente, em vez de pixel dentro do arquivo.

Novo campo `ratios?: Partial<Record<SectionKey, string>>` em `CaseMedia`.
InvestIQ: `{ exploration: '780 / 1590', ui: '780 / 1864' }`.

MANTIDO de proposito: os 40-48px de inset lateral das telas de celular. Isso e o padding
interno do proprio design (frame de 390pt), nao moldura. Cortar deixaria a tela sem margem.

Verificado por medicao: todas as imagens de documento agora com margem 0 nos quatro lados.

PENDENTE: `flow` e `ds` ainda trazem o titulo da pagina e o paragrafo de introducao dentro
da imagem ("Flows and information architecture", "Design System"), que duplicam o texto do
case. A tabela competitiva nao traz, porque ali usei o sub-frame `Table`. Inconsistente.

## InvestIQ — fundo e alinhamento em Insights (2026-08-27)

Pedido: remover o fundo e alinhar os blocos do journey map.

### Fundo
O export do Figma trazia a cor do CANVAS assada, opaca, atras e entre os cards:
rgb(18,20,26) = #12141A. Contra o #080D13 do portfolio isso lia como um retangulo
quase-preto em volta. O frame `Stages` nao tem fill proprio — quem pintava era o Figma
ao exportar. O PNG vinha com canal alpha, mas todo opaco.

Correcao: knockout por cor. Recorta a margem de canvas na bbox e depois zera o alpha de
todo pixel dentro de tolerancia 6 de rgb(18,20,26). O fill dos cards e rgb(28,31,39),
distante o bastante para nao ser afetado. WebP com alpha.

Aplicado nas 7 figuras que ficam direto sobre o canvas (nao nas telas de celular, que tem
fundo proprio): journey, problem-compare, rationale, research-personas,
research-competitive, flow, ds. Transparencia resultante: journey 4%, flow e ds 63%.

### Alinhamento
O card 05 tinha 171px contra 188px dos outros quatro, porque "Goal: Act with confidence"
cabia em 1 linha (17px) e nos outros o Goal ocupa 2 (34px). Como os cards sao HUG na
vertical, o 05 encolhia e as linhas Emotion/Opportunity subiam 17px.

Correcao no Figma (EN 46:34, PT 40:34): o texto de Goal de cada card passou a ter altura
fixa igual a maior do grupo (34px). Uma mudanca em um no por idioma resolve as duas coisas
— os cinco cards passam a 188px e as linhas ficam nos mesmos y [20,41,67,109,134].

Nao mexi no fill nem no stroke dos cards: "remover o fundo" era o fundo EM VOLTA dos blocos,
os blocos em si continuam.

`research-competitive` voltou de 507 para 532px de altura — o crop agora referencia a cor
do canvas, e os 24px que eu tinha cortado antes eram do proprio topo da tabela.

Assets: 40 arquivos, 1.5 MB (subiu de 1.3 MB por causa do canal alpha em flow e ds).

## InvestIQ — traducao dos wireframes PT (2026-08-27)

Espelho exato do problema da pagina EN, que eu tinha corrigido antes sem olhar o outro lado.
A pagina `Wireframes` (PT, 1:6) tinha os frames 01 a 04 INTEIRAMENTE em ingles e o 05 com o
cabecalho em ingles. Eram os placeholders originais, nunca traduzidos.

12 strings traduzidas (nos 8:9, 8:10, 8:15, 8:18, 8:31, 8:32, 8:35, 8:39, 8:42, 8:45,
8:46, 10:4). Frames 06 e 07 ja estavam em portugues.

Escolhas: "WORDMARK" -> "LOGOTIPO", "Tagline" -> "Slogan", "STEP LABEL" -> "RÓTULO DA ETAPA",
"STEP 4 OF 4" -> "ETAPA 4 DE 4". A palavra "placeholder" foi mantida como emprestimo
("Título placeholder", "Texto placeholder"), que e como se fala em design no Brasil.

Os 6 wireframes agora diferem entre EN e PT (antes 01, 02 e 03 eram byte-identicos porque
ambas as paginas tinham o mesmo texto em ingles). `media.ts` ja usava `both()` para todos,
entao nao precisou mudar codigo.

LICAO: quando as duas versoes de idioma de um arquivo divergem, conferir OS DOIS LADOS.
Eu tinha verificado so a pagina EN e concluido que estava tudo certo.

# Pulse Analytics — case completo (2026-08-27)

Figma: figma.com/design/ENI5lQV7km9zFiYvLi2lUI (Pulse Analytics — Case Study).
Mesma estrutura do InvestIQ: 9 paginas PT (0:1, 1:2–1:9) + 9 paginas EN (26:48–26:56).

## 1. Auditoria de idioma (licao aplicada)
Conferi OS DOIS lados antes de qualquer coisa. EN limpo (6 alertas eram falsos positivos:
`id_primário_db` e nome de campo de banco, São Paulo e Vitória sao cidades).
PT Hi-Fi tinha ~30 strings em ingles: stepper do onboarding (Setup Phase, Sources, Auth,
Mapping, Validation, Complete), AUTHENTICATION PROTOCOL, KEY ID, SECRET TOKEN, Security,
Reports, Data Sources, Global Settings, Social Ads, TOP PERFORMER, e a coluna de metricas
da tela de mapeamento (Transaction ID, Net Revenue, Timestamp).
30 strings traduzidas (autorizado). Mantidos como emprestimo: Dashboard, Report Builder,
Layout, Onboarding — usados em PT no proprio arquivo.

## 2. Conteudo
Entrada `pulse` em cases.ts reescrita (a anterior era ficticia). year 2025 -> 2026.
A capa do Figma ja trazia papel, duracao e time, entao so `tools` precisou de decisao
do Eduardo: "Figma, FigJam, Notion, Claude".

DIFERENCA IMPORTANTE vs InvestIQ: as metricas do Pulse sao MEDIDAS, nao projetadas
("60 dias pos-lancamento com a base existente"). Entao `proj: false` nas tres, sem `thin`
em validation, e a nota de rodape usa `t.measured`.

## 3. Imagens
DIFERENCA ESTRUTURAL: as paginas do Pulse sao PLANAS — um frame unico por pagina com todos
os filhos soltos, sem sub-frames agrupados como o `Table`/`Stages` do InvestIQ. Entao a
maioria das figuras e RECORTE POR REGIAO do export da pagina inteira, usando as coordenadas
y lidas do metadata. As regioes estao em `CROPS` no script `pulse.mjs` do scratchpad.

Ajuste necessario: o bbox mordia o topo dos rotulos por antialiasing das bordas de glifo.
Adicionado `pad = 14` de folga; como o entorno vira transparente, nao custa nada.

Layout: TODAS as figuras full width (`cols` '1fr'), menos os wireframes em 2 colunas.
Motivo: aqui as telas sao desktop de 1440pt e os documentos tem 1280pt. Em 3 colunas
(~312px) nada seria legivel — diferente do InvestIQ, cujas telas eram mobile de 390pt.

Wireframes: set unico compartilhado. Desta vez com razao verificada — os sub-frames nao
contem texto nenhum, as legendas ficam no board, fora deles. Confirmado por sha1 e visual.

`media.ts`: helper `paths(caseId)` generalizado, com `both()` e `shared()` por case.

20 figuras. Assets do Pulse: 1.8 MB. Total do projeto: 76 arquivos, 3.3 MB.

## Pendencias herdadas
- InvestIQ: `flow` e `ds` ainda trazem titulo e paragrafo de introducao dentro da imagem
- Nenhum dos dois cases passou por revisao visual no browser (extensao Chrome indisponivel)

## Placeholders vazios — auditoria e correcao (2026-08-27)

Eduardo apontou placeholders vazios. Auditoria deu duas causas diferentes:

1. BUG MEU. `pulse` tinha 1 vazio: o scaffold `SLOTS.validation` reserva 2 slots e eu
   forneci 1 imagem. A contagem em CaseStudy.tsx era `Math.max(scaffold, imagens)`, entao
   fornecer MENOS que o gabarito deixava buraco.
   Corrigido na raiz: quando um case traz imagens para uma secao, o array dele passa a ser
   a verdade — o scaffold so define a contagem enquanto nada foi fornecido. Um case que
   queira deixar um slot aberto de proposito usa `null` explicito (o tipo ja permitia).

       const count = shots ? shots.length : group?.items.length ?? 0;

   InvestIQ: 0 vazios antes e depois. Pulse: 1 -> 0.

2. POR DESIGN. Os 4 cases ficticios seguem sem nenhuma imagem, porque nao tem fonte no
   Figma: aether 18, forge 18, reloop 18, pastry 16 (pastry tem validation thin).
   Nao e bug — nunca tiveram arte. Decisao do Eduardo sobre o que fazer com eles.

## Placeholders escondidos (2026-08-27)

Decisao do Eduardo: nao renderizar moldura vazia. Secao sem imagem fica so com o texto.

`Figure` retorna `null` sem imagem. `CaseStudy` filtra os nulls e so monta a grade se
sobrar alguma figura. Consequencia: o gabarito de placeholders virou codigo morto e foi
removido junto —

- `slots.ts`: era `SLOTS` com 6 grupos de items (rotulos, alturas, flag `dev`).
  Virou `SECTION_COLS`, so o mapa de colunas padrao por secao. ~55 linhas a menos
- `types.ts`: `SlotItem` e `SlotGroup` removidos — descreviam os placeholders
- `strings.ts`: `slotHero` ("DROP HERO IMAGE HERE") removido, sem superficie
- `app.css`: bloco `.placeholder*` removido

Bundle: css 28.42 -> 27.69 kB, js 289.85 -> 288.13 kB.

APROVEITANDO: a string global `t.measured` dizia "90 dias após o lançamento", hardcoded.
O Pulse mede em 60 dias, entao a nota de rodape contradizia o proprio texto do case.
Trocada por "Medido em analytics de produção após o lançamento." — sem periodo fixo.
Afeta pulse, forge, pastry e reloop (os que tem metricas medidas).

# Reloop — case completo (2026-08-27)

Figma: figma.com/design/4cvW112sMf86LOrjFHgb6G (Reloop — Case Study). 27 paginas.
Estrutura mais rica que os anteriores: produto de DOIS LADOS (Buyer Marketplace + Seller
Dashboard), com paginas separadas de wireframe e hi-fi pra cada lado, mais tres paginas de
processo (Strategize / Explore / Iterate).

## Auditoria de idioma
Os dois lados limpos. EN: 0 sobras em portugues. PT: 3 falsos positivos (as notas de
condicao New with tags/Excellent/Good/Fair sao vocabulario fixo do produto; "Checkout" e
emprestimo). ATENCAO: eu quase reportei um bug inexistente — a primeira varredura disse que
as telas PT do comprador nao traduziam as notas, mas era erro meu: fiz o loop sobre 4
paginas SEM chamar setCurrentPageAsync, entao o conteudo nao estava carregado. Refeito
por pagina, as telas PT estao corretas ("Novo com etiqueta", "Excelente", "Bom", "Regular").

## Conteudo
Zero lacunas: a capa traz PAPEL, PLATAFORMA, DURACAO e FERRAMENTAS.
Metricas todas `proj: true` — o proprio Figma diz "projecoes baseadas em benchmarks do
setor, nao metricas reais". `validation` marcado `thin`: testes de usabilidade estao
explicitamente em "Fora do escopo / Proximos passos".

## Design System — decisao importante
A pagina Design System so existe em PT, e os rotulos padrao dos component sets estao em
ingles enquanto as telas PT traduzem tudo. Eduardo aprovou "traduzir e duplicar".

NAO editei os component sets. Mudar o texto padrao de um componente cascatearia para toda
instancia e poderia quebrar as telas ja traduzidas (as instancias EN podem nao ter override
proprio). Em vez disso criei uma pagina nova `Component Sheet (export)` (78:6) com duas
frames — `Components — EN` (78:7) e `Components — PT` (78:48) — cada uma com 20 INSTANCIAS
e override de texto. Aditivo, sem risco. Confirmei apos a escrita que os sets originais
seguem intactos.

## Imagens
Reloop e LIGHT MODE (canvas creme rgb(245,239,227)). O knockout de fundo usado no InvestIQ
e no Pulse seria ERRADO aqui: deixaria os cards claros flutuando sobre o fundo escuro do
portfolio. Mantido opaco — a figura le como uma prancha de papel sobre a pagina escura.

Recortes por regiao com coordenadas POR IDIOMA: as paginas Problem e Strategize tem alturas
diferentes entre EN e PT (2016 vs 2072, 944 vs 962), entao usar as mesmas coordenadas nos
dois cortaria errado.

Bug no caminho: sharp recusa dois `extract()` encadeados no mesmo pipeline. A regiao agora
e materializada em buffer antes do recorte de margem.

Selecao 4 comprador + 2 vendedor em exploration e ui, como o Eduardo escolheu.
Layout: tudo full width menos os wireframes em 2 colunas.

20 figuras. Assets Reloop: 2.5 MB. Projeto: 116 arquivos, 5.7 MB.

## Estado dos cases
investiq 20 · pulse 21 · reloop 20 · aether/forge/pastry 0 (sem fonte no Figma, so texto)

## Revisao geral: imagens e espacos em branco (2026-08-27)

### Imagens — auditoria dos 116 assets por margem morta e peso
Tres defeitos reais, todos corrigidos:

1. TITULO DE PAGINA DUPLICADO. `investiq/flow`, `investiq/ds` e `pulse/ds` traziam o titulo
   e o paragrafo de introducao da pagina dentro da imagem, repetindo a regua FIG. e o corpo
   da secao logo acima. Era a pendencia que eu tinha reportado duas vezes sem corrigir.
   Recortados abaixo do cabecalho. O `reloop/ds` ja estava limpo porque montei a prancha.
   REGRA daqui em diante: figura de documento nao carrega titulo de pagina.
2. `reloop/wire-05` tinha 166px de vazio na borda direita (17% da imagem), `wire-06` 31px.
   Recorte horizontal aplicado.
3. Dimensoes declaradas atualizadas em media.ts para as 5 figuras recortadas.

NAO sao defeitos, mantidos: os 40-48px de inset lateral nas telas mobile do InvestIQ (e o
padding do proprio design) e os 26-32px de topo em Pulse/Reloop (barra de nav com fundo
igual ao da pagina).

### Espacos em branco
Medido comparando a proporcao declarada em media.ts com a real de cada arquivo, no tamanho
de coluna que cada secao recebe.

ANTES: 4.203px de vazio somados, 24 figuras. Praticamente tudo no InvestIQ, vindo do
`ratios` que eu tinha criado pra uniformizar altura. Quando as imagens tinham fundo
preenchido isso funcionava; depois que ficaram justas, o frame fixo virou so vazio — e
pior, descolava a legenda da imagem.

Eduardo optou por soltar. `ratios` removido do InvestIQ (o do Pulse era redundante, as
imagens ja batiam com a proporcao). Com isso o campo ficou sem uso e foi removido inteiro:
`CaseMedia.ratios`, `Figure.frameRatio` e a fiacao em CaseStudy.

DEPOIS: 125px em 6 figuras, todas entre 13 e 33px. Sao inerentes — `SlotImage` tem um unico
`w`/`h` para os dois idiomas, e quando EN e PT diferem em altura declaro o maior pra nao
encolher a imagem mais alta. Invisivel, ja que o frame nao pinta fundo.

Reducao de 97%. Secao UI do InvestIQ ficou 219px mais curta.

Ritmo vertical: Eduardo optou por deixar como esta (72px entre secoes). As paginas sao
longas porque tem 20 figuras, nao por espacamento mal distribuido.

## Hero trocado pelas paginas Cover (2026-08-27)

Eduardo: "use as paginas do figma com nome cover". Os heroes eram telas de produto
(InvestIQ desktop dashboard, Pulse commercial distribution, Reloop search results);
agora usam a pagina Cover de cada arquivo.

Nos: InvestIQ EN 45:2 / PT 39:2 · Pulse EN 26:57 / PT 20:2 · Reloop EN 30:16 / PT 24:2.
Tratamento por case como sempre: knockout do canvas nos dois escuros, opaco no Reloop
(light mode). Legenda passou a ser COVER / CAPA.

### Defeito encontrado no Figma e corrigido
A capa EN do InvestIQ tinha a tagline TRUNCADA NO MEIO DA PALAVRA — "A reconstruction and
extens". Nao era o meu recorte: o frame `Left` tem 520px e recorta conteudo, mas o no de
texto da tagline tinha 560px. Em PT as quebras cabiam por sorte (frame 510, texto 560);
em EN a primeira linha estourava.

Corrigido nos dois idiomas: `textAutoResize = HEIGHT` e resize do texto pra largura do
frame pai (520 EN, 510 PT). A tagline EN agora quebra em duas linhas completas.
Nenhuma outra propriedade tocada.

### Observacao registrada
A capa repete o titulo do case, a tagline e a tabela de papel/duracao/ferramentas, que o
portfolio ja renderiza logo acima (h1, kind, linha e a grade AT A GLANCE). Eduardo escolheu
a capa inteira sabendo disso — foi oferecida a alternativa de recortar so a arte.

Dimensoes declaradas usam sempre a variante de menor razao largura/altura entre EN e PT,
pra imagem encaixar pela largura e nunca ser reduzida pra caber na altura.

## Capa do Reloop: fundo mantido (2026-08-27)

Eduardo pediu pra remover o fundo. Medido antes de fazer: o texto mais escuro da capa e
rgb(43,31,22). Contra o creme #F5EFE3 da 14:1; contra a pagina #080D13 do portfolio,
1.22:1 — WCAG AA de corpo exige 4.5:1. O knockout deixaria 97% transparente e o wordmark
"Reloop" praticamente invisivel, alem de transformar as caixas de spec em retangulos
brancos soltos.

Mostrado o preview renderizado sobre o fundo real. Eduardo optou por manter o creme.

Razao de fundo: Reloop e um produto light, e as OUTRAS 19 figuras do case tambem sao
claras. Tirar o fundo so da capa faria dela a unica peca fora do padrao dentro do proprio
case. O tratamento atual — prancha clara sobre pagina escura — e o mesmo que os wireframes
brancos ja recebem nos outros dois cases.

Nenhum asset foi alterado; o teste de knockout ficou so no scratchpad.

## Hero: capas trocadas por bloco de metricas nativo (2026-08-27)

Eduardo pediu pra extrair as metricas e usar no lugar das imagens de capa.

Levantamento antes: as capas quase nao traziam dado novo. Titulo, tagline, specs e TL;DR
ja estavam no cases.ts e ja renderizavam em AT A GLANCE e no outcome. O unico conteudo
exclusivo era a arte (globo do InvestIQ, cubo do Pulse) e os chips do Reloop.

Decisao do Eduardo: metricas MOVIDAS (nao duplicadas) e arte descartada.

Mudancas:
- `FIG. 01` deixou de ser PROJECT HERO e virou HEADLINE RESULTS / RESULTADOS EM DESTAQUE
  (`secHero` renomeado pra `secResults` no strings.ts)
- Os tres numeros de `cs.s.metrics` abrem o case, com a nota projetado/medido junto
- REMOVIDOS da secao `outcome`, que ficou so com a prosa. Sem duplicacao
- Reaproveitadas as classes `.hairgrid` e `.metric` que ja existiam; so `.results` e nova

Codigo morto removido junto, pela mesma regra das rodadas anteriores:
`CaseMedia.hero`, os props `hero` e `ruler` do `Figure`, e a classe `.figure--hero`.

6 arquivos hero.webp apagados. Assets: 116 -> 110 arquivos, 5.7 MB -> 4.6 MB.

Ganho lateral: os tres cases sem Figma (aether, forge, pastry) tambem tem metricas, entao
passaram a abrir com o bloco em vez de so texto.

Isso tambem resolveu a duplicacao que eu tinha sinalizado quando as capas entraram: o case
mostrava o titulo e o papel duas vezes, na h1 e dentro da imagem.

# Forge — case completo (2026-08-27)

Figma: figma.com/design/Yg7hmLnYLxU3gRctk38M0J (Forge — Case Study). 24 paginas,
12 por idioma, ambos os lados completos.

## Auditoria de idioma — defeito simetrico encontrado
As DUAS paginas Design System estavam com idiomas cruzados: cada uma tinha os component
sets certos, mas as INSTANCIAS da galeria com override do idioma errado. A EN mostrava
"Salvar / Cancelar / Ver historico", a PT mostrava "Save / Cancel / View history".
Mais dois textos do specimen tipografico trocados em cada pagina.

Corrigido nos dois lados (autorizado): 13 strings na EN, 19 na PT. Na PT tambem traduzi
rotulos de secao que tinham ficado em ingles enquanto os vizinhos ja estavam em portugues
(COMPONENT GALLERY, CORE ICONS, BRAND IDENTITY, Primary/Reversed Lockup, Horizontal Layout).
Nao toquei nos component sets. Nomes de componente (Button, Status Badge, Input Field) e
valores de status (Todo, In Progress, Done, Blocked) ficam em ingles nos dois idiomas,
como o resto do arquivo ja fazia.

## Conteudo
Capa da papel, escopo e ferramentas. Faltavam duracao e time: Eduardo escolheu
"Projeto solo" e duracao "—". Metricas todas `proj: true` — o Figma diz explicitamente
"projeto conceitual sem telemetria de producao". `validation` marcado `thin`: os numeros
de rollout foram auto-reportados e instrumentar adocao real e o primeiro proximo passo.

O arquivo nao traz ano em lugar nenhum (diferente dos outros tres). Usei 2026 por
consistencia, sem evidencia no arquivo.

INCONSISTENCIA NA FONTE, nao corrigida: o case diz 8 times em The Problem e na auditoria,
mas 12 times no titulo de Adoption e nas metricas. Pode ser proposital.

## Imagens
Forge e LIGHT MODE (canvas #F3F4F6), mesmo tratamento do Reloop: recorte de margem, fundo
opaco, sem knockout. Cabecalho de pagina removido de todas as figuras de documento, seguindo
a regra que padronizei.

A figura de `problem` foi dividida em DUAS: o corte por faixa vertical pegava a coluna de
prosa a esquerda, que repete o corpo do case. Cortei so a coluna direita (x>=1900) e separei
os dois stat cards, que agora ficam lado a lado em vez de virar um quadrado de 760px
ocupando a coluna inteira.

Wireframes sao identicos entre EN e PT (grey-box sem texto) — set unico compartilhado.

16 figuras. Assets Forge: 1.4 MB. Projeto: 137 arquivos, 5.9 MB.

## Aether (iOvHgJ3n2dIPnn8PAswVBc)

26 paginas: PT 0:1 Cover, 1:2..1:9, 19:18, 22:2, 22:29, 22:118 · EN 23:2..23:14.

Auditoria de idioma: PT limpo (1 falso positivo, "mobile-first"). EN com dois
residuos em portugues, ambos corrigidos no Figma com aprovacao:
- 22:115 (EN Design System, acessibilidade) "(Ativo/Pendente/Falhou)" -> "(Active/Pending/Failed)"
- 22:146 (EN Build & Launch) "Acao Primaria/Botao Fantasma" -> "Primary Action/Ghost Button"

Nomes de layer em PT no doc EN de design system ("Vertical Primario", "Layout
Horizontal"): so nome de camada, o texto visivel ja estava em ingles. Nao mexido.

Conteudo: entrada aether reescrita em cases.ts a partir do arquivo real (EN+PT).
year 2026 (o arquivo nao traz data, mesmo caso do Forge). Metricas todas proj:
+61% conclusao de onboarding, <5min ate a primeira transacao, +38% confianca
percebida. validation NAO marcada como thin: houve teste de usabilidade moderado
e entrevista pos-tarefa; o que falta e testar com quem nunca usou cripto.

Spec: duration "6 weeks / 6 semanas" definida pelo Eduardo (o arquivo do Figma
nao traz prazo). team "Solo project" assumido pelo precedente Reloop/Forge, ainda
sem confirmacao explicita.

Imagens: canvas #1E1E2E -> tratamento dark (knockout do fundo para transparencia),
igual InvestIQ e Pulse. Telas hi-fi e wireframes mantem o proprio fundo, senao o
texto ficaria flutuando.

Recortes por pagina (coordenadas de frame x2, script scratchpad/imgtool/aether.mjs):
- research  definicao completa (1936x697)
- insights  curiosidade vs. medo (503) + jornada em cinco momentos (1057)
- strategy  tres decisoes (420) + comparacao de abordagens (535)
- uxflow    fluxo de cinco telas (175) + o que removemos (522) + como guiamos (373)
- ds        doc completo sem o titulo (EN 2428, PT 2454 -> caixa usa 2454)
- learnings o que aprendi (630)
- exploration 5 wireframes 640x1400, compartilhados
- ui        6 telas mobile 780x1688, 3 colunas

Primeiro corte de "o que removemos" comecava em y915 e pegava uma linha cortada
do paragrafo acima. Corrigido para y932 (topo real do primeiro card).

research recebe cols '1fr': o strip de definicao tem 1200pt de largura e em meia
coluna o corpo fica ilegivel.

21 figuras (16 por idioma + 5 compartilhadas), 37 arquivos, 1.4 MB.
tsc limpo, build ok, assets servidos com image/webp em vite preview.

### Sobreposicoes corrigidas no Figma (EN + PT)

Os cards usam posicionamento absoluto (layoutMode NONE), entao titulo que quebra
em duas linhas invade o corpo. Corrigido movendo so o corpo, com o gap lido do
proprio arquivo (card de titulo de uma linha) — idempotente, no-op onde ja estava
certo.
- Competitive Scan, decisionCard 03 "Human language, not technical jargon": gap 14, corpo 96 -> 122. PT ja estava ok (titulo de uma linha).
- Flows & IA, guideCard 03 "Double confirmation..." / "Confirmacao dupla...": gap 16, corpo 68 -> 92 nos dois idiomas.
- Hi-Fi 05 Success: dois problemas. Subtitulo 320 -> 322 (gap 0, mesmo padrao da tela 04) e successImage 200x240@y70 -> 200x200@y52, que terminava em y310 e ficava debaixo do titulo em y262.

### Cantos brancos nas telas

Figma achata a area fora do corner radius do frame no cinza do canvas (#F5F5F5),
entao todo export de tela vinha com cantos opacos claros. screen() agora aplica
mascara de retangulo arredondado (dest-in) antes do resize: 64px nas hi-fi
(radius 32pt) e 48px nos wireframes (radius 24pt). 17 telas verificadas, 0 com
canto opaco.

## Casado Doces (kDtapCsvRm0v6HsIiyNJoo) — case id `pastry`

27 paginas: PT default + espelho (EN). Dois apps no mesmo case: app do cliente
e painel da confeiteira.

Auditoria de idioma: nenhum residuo real nos dois lados. Os hits do heuristico
foram falsos positivos — `` do JS quebra em acento, entao "Cartão" casa como
"cart" e "crédito" vira "cr"+"dito"; "How do you want to pay?" casou por `do`
em ingles; "João Peres" e nome de cliente brasileiro, valido nos dois idiomas.
Nada foi alterado no Figma.

Conteudo: entrada `pastry` reescrita do zero — antes era ficticia ("Pastry App",
metricas inventadas: 0 agendamentos duplicados, 8 componentes). Agora `name` e
"Casado Doces", year 2026 (as telas mostram "Outubro 2026" / "Oct 12").

Metricas: o arquivo NAO traz numero nenhum, so tres cards direcionais. Usados
literalmente como vieram — v: "↓" / "↓" / "↑", todos proj: true. Nada inventado.

`thin: ['validation']` — nao houve teste com cliente real; o piloto e o primeiro
item de proximos passos, na pagina Iterate.

Spec: duration "—" (o arquivo nao traz prazo) e team "Solo project" assumido.
Confirmar os dois com o Eduardo.

Imagens: canvas cream #FBF6EC → caso claro, mantem o proprio fundo (mesmo
tratamento de Reloop e Forge). Knockout deixaria texto escuro sobre a folha
escura do portfolio.

67 arquivos, 2.1 MB (script scratchpad/imgtool/casado.mjs):
- research   personas (1808x928) + jornada em seis etapas (1936x828)
- insights   definicao completa (952)
- strategy   cenario competitivo (763)
- uxflow     fluxo do catalogo a retirada (198) + mapa do app (616)
- exploration 12 wireframes 750x1624 (7 cliente + 5 painel)
- ui         12 telas hi-fi 750x1624 (7 cliente + 5 painel)
- ds         3 figuras compartilhadas: cores, tipografia, biblioteca de componentes
- outcome    resultados projetados (296)
- learnings  o que aprendi (261)

As duas linguas reflowam com alturas diferentes, entao cada uma tem sua propria
faixa de corte. `w`/`h` declarados sempre pela variante mais alta, para as duas
caberem pela largura.

Design system existe em UMA lingua so — nao ha pagina EN. Cores e tipografia sao
neutras (nomes de token em ingles). A folha de componentes tem string em pt-BR
("Continuar", "Nome completo", "Recebido", "Em preparo"), entao aparece em
portugues no lado ingles. A folha de acessibilidade era 100% pt-BR e foi
descartada — o conteudo dela ja esta no corpo da secao `ds` nos dois idiomas.

### Calendario corrigido (8 frames)

A grade ia de 1 a 35. Antes de escolher o mes certo, conferi as datas que o
proprio arquivo ja usava:

  "Sat, Oct 12" · "Tue, Oct 15" · "Fri, Oct 25"

As tres batem com outubro de 2024 e nenhuma outra. Decisivo: o horario da Denise
e Ter–Sab (tela de Configuracoes). Em 2024 as tres caem dentro do horario; em
2026 o dia 12 cai numa segunda e o 25 num domingo, com a loja fechada. Ou seja,
o header "Outubro 2026" era o valor fora do lugar, nao as datas.

Outubro 2024 encaixa exato nas 35 celulas: dia 1 numa terca, entao 2 vazias +
1..31 + 2 vazias. Celulas fora do mes ficam com opacity 0 (mantem o espaco da
grade; `visible = false` colapsaria o auto-layout).

Estado das celulas remapeado por numero do dia, nao por posicao: 12 Selected,
3/10/17/24 Blocked. Adicionei o 31 ao conjunto bloqueado — em outubro de 2024
esses cinco dias sao todas as quintas, e deixar so a ultima livre leria como bug.
Nos wireframes as celulas sao FRAME e nao INSTANCE, entao o estilo (fills do
frame e do texto) e copiado das celulas-modelo em vez de trocar variante.

Frames corrigidos: Checkout/Retirada do cliente e Agenda do painel, hi-fi e
wireframe, EN e PT. Header "Outubro 2026" -> "Outubro 2024" e "October 2026" ->
"October 2024" nas duas telas de Agenda.

Node solto "Frame" 100x100 (`22:258`) removido da pagina Hi-Fi — Chef Dashboard.

### Design system localizado

Criada a pagina "Design System — Localized Sheets" (`99:2`) com tres frames:
- `Component Library — EN` (`99:3`) e `Component Library — PT` (`99:54`),
  800x359, layout identico, montados dos MESMOS seis component sets via
  `createInstance()` — instancia nao polui a biblioteca do jeito que clonar
  COMPONENT_SET poluiria. Texto do EN sobrescrito: Continuar->Continue,
  Nome completo->Full name, Campo obrigatorio->Required field,
  Recebido->Received, Em preparo->In prep, Pronto para retirada->Ready for
  pickup, Esgotado->Sold out.
- `Accessibility — EN` (`99:105`), clone do frame PT com os quatro bullets
  traduzidos.

Com isso `ds-components` e `ds-a11y` viraram per-idioma, e a folha de
acessibilidade voltou pro case (antes eu tinha descartado por ser so pt-BR).
Cores e tipografia continuam compartilhadas — so tem nome de token em ingles.
A composicao por sharp saiu do casado.mjs: agora sao frames de verdade no Figma.

36 figuras, 70 arquivos.

### Cenario movido para setembro de 2026

Eduardo pediu pra alinhar o cenario das telas com o `year: '2026'` do case.
Restricoes pra escolher o mes: a grade tem 35 celulas fixas, o horario da Denise
e Ter–Sab, e os tres dias ja escritos no arquivo sao 12 (Sab), 15 (Ter) e
25 (Sex). Em 2026 so dois meses satisfazem tudo:

  Setembro  dia 1 = terca, 30 dias, 32 celulas | 12=Sab 15=Ter 25=Sex
  Dezembro  dia 1 = terca, 31 dias, 33 celulas | 12=Sab 15=Ter 25=Sex

Dezembro poria uma retirada em 25/12, Natal. Escolhido setembro.

Ganho: os dias da semana ja escritos ("Sab", "Ter", "Sex") continuam corretos,
entao so o mes mudou no texto — Out->Set e Oct->Sep. Grade: LEAD segue 2, mas
DAYS passa de 31 pra 30 e o conjunto bloqueado volta a {3,10,17,24}, que sao
todas as quintas de setembro/2026 (o 31 que eu tinha adicionado deixa de existir).

Alterados: 8 grades de calendario, 4 headers de mes, 16 strings de data
(confirmacao e historico, EN e PT). 16 telas reexportadas.

Armadilha: nos hi-fi o script quebrou com "Cannot write to node with unloaded
font". Causa — `getStyledTextSegments(['fontName'])` devolve lista VAZIA num no
de texto vazio, entao nenhuma fonte era carregada. As celulas fora do mes tinham
ficado vazias na passada anterior. Corrigido lendo `fontName` direto e so caindo
pros segmentos quando a fonte e `figma.mixed`. Script do Figma e atomico, entao
as duas paginas que falharam nao aplicaram nada — bastou reexecutar.

## Bug: case sem figura nenhuma

O Eduardo perguntou se eu tinha puxado alguma coisa do Figma pro portfolio.
Tinha — mas nao aparecia. `CaseStudy.tsx` faz `MEDIA[cs.id]`, o id do case era
`pastry` e eu registrei a entrada como `casado`. `MEDIA['pastry']` e undefined,
entao as 36 figuras nao renderizavam. Os 70 arquivos existiam e eram servidos;
faltava o ponteiro.

Corrigido renomeando o id de `pastry` pra `casado` (o id nao era referenciado em
nenhum outro lugar do src).

LICAO: minha verificacao so checava que cada `src` da entrada existia em disco.
Isso nao prova nada se a entrada nunca e alcancada. Agora a auditoria percorre a
cadeia inteira — case id -> entrada em MEDIA -> src -> arquivo em dist — e
reclama de case sem media. Verificar o elo final nao substitui verificar o
primeiro.

## Estado dos cases

Auditado pela cadeia real (esbuild nos modulos de verdade, nao regex):

investiq 19 · pulse 20 · aether 21 · forge 16 · casado 36 · reloop 19
131 figuras, 244 arquivos, 0 faltando, 0 cases sem media.

Os numeros de investiq/pulse/reloop caem 1 em relacao ao que estava anotado
antes porque a imagem de capa saiu quando as metricas viraram o bloco de
abertura — nao e regressao.

Todos os seis cases agora saem de arquivo real do Figma. Nenhum conteudo ficticio
restante.


## Roteamento por caminho

Sintoma: reload voltava pra home. Causa: a pagina so existia em estado React
(`App.tsx`, `useState<Page>('home')`), e `go()` trocava o estado sem tocar a URL.
Nenhum ponto do src usava `history` ou `location` (so o `mailto:` do Contact).
Tres sintomas do mesmo buraco: reload perdia a pagina, voltar/avancar saia do
site, e nao existia link pra um case.

Eduardo escolheu caminho (`/aether`) em vez de hash.

Novo `src/hooks/useRoute.ts`: le `location.pathname` na montagem, escuta
`popstate`, e `go()` faz `pushState`. Case identificado pelo `id`, nao pelo
indice, pro link nao quebrar se a ordem de CASES mudar. Path desconhecido
renderiza home e reescreve a URL com `replaceState`, pra barra de enderecos nao
mentir. `history.scrollRestoration = 'manual'` porque cada rota troca a pagina
inteira e o offset restaurado apontaria pra conteudo que nao esta mais la.

ARMADILHA que quase passou: dois caminhos de asset eram RELATIVOS e so
funcionavam porque o site nunca saia de `/`.
- `config.ts` resumeHref: 'assets/Resume-...pdf'
- `media.ts` base: `assets/cases/${caseId}`
Em `/aether` resolveriam pra `/aether/assets/...` — 404 nas 244 imagens e no PDF.
Os dois viraram absolutos. Licao: trocar de rota flat pra rota profunda quebra
todo caminho relativo do projeto; conferir ANTES, nao depois.

Verificado em `vite preview`: `/`, `/aether`, `/casado`, `/about`, `/resume`,
`/contact` e uma rota inexistente devolvem o HTML do app; asset e PDF continuam
200. Auditoria: 244 arquivos, 0 relativos, 0 faltando, nenhum id de case
colidindo com nome de pagina.

### Deploy: GitHub Pages

Eduardo vai usar GitHub Pages. Duas pegadinhas, as duas resolvidas.

1. Pages nao faz rewrite — responde 404.html em path desconhecido. Adicionado
   `public/404.html` que guarda o path na query e rebate pra raiz, mais um script
   inline no `<head>` do index.html que desfaz antes do app montar (script
   classico roda antes do module, que e deferred). Round-trip testado em 7 casos,
   com query e hash, base raiz e base de projeto.
2. `base` muda conforme o tipo de site. Agora rotas E assets leem
   `import.meta.env.BASE_URL`, entao trocar de user page pra project page e
   mexer em DOIS lugares: `base` no vite.config.ts e `segmentsToKeep` no
   404.html. Verificado avaliando os modulos de verdade com esbuild sob as duas
   bases: 244 caminhos seguem a base nas duas, resumeHref tambem.

Tentei `process.env.VITE_BASE` no vite.config pra CI poder sobrescrever, mas
`process` nao e tipado sem @types/node. Nao vale uma dependencia — ficou
constante explicita.

Tambem adicionados `public/.nojekyll` e `.github/workflows/deploy.yml` (build de
portfolio/, publica portfolio/dist, dispara em main e master).

NAO commitado — CLAUDE.md proibe commit automatico.

ARMADILHA de verificacao: minha primeira checagem de "todos os caminhos sao
absolutos" usou regex no bundle e passou com 0 matches — vacuamente verdadeira,
porque os caminhos sao montados em runtime por template literal e nao existem
como literal no JS. Refeita avaliando o modulo. `every()` sobre lista vazia e
sempre true; conferir o tamanho da amostra antes de acreditar no verde.

Nao feito: os itens de navegacao continuam `<button>`. Viraria util transformar
em `<a href>` pra abrir em nova aba e pro buscador seguir os links — fora do
escopo do que foi pedido.


## Retrato no About

Eduardo pediu foto no portfolio. Analisei as quatro paginas: a coluna direita do
About NAO estava vazia (6 grupos de chips, ~600-750px contra ~800-900 da
esquerda), entao nao dava pra enfiar la. O espaco real era o cabecalho: `.page--about`
tem 1080 e `.about__lede` tem max-width 720 — sobravam ~360px sem uso a direita
do nome. Foi ali.

Recusei hero da home (o lado direito e o HeroArt, assinatura visual do site) e
Resume (foto em CV e desaconselhada fora do Brasil, e o alvo e remoto/global).

Primeira versao: retangulo 4:5, mono rebaixado, dissolve embaixo. Eduardo achou
"muito blockado". Correto — e o meu proprio mock em contexto ja tinha mostrado o
topo virando um bloco cinza pesado, mais chamativo que o nome.

Segunda versao: disco. Nao avatar generico — o `HeroArt` JA tem um "detail
circle" em ciano com linha de chamada e `Ø48`, mais `R24` e `A—A`. O retrato virou
o detail circle da SHEET 02: disco recortado no rosto, anel hairline, um arco de
acento ciano no quadrante superior direito, e a medida chamada num `FigRule`
(`Ø280` + `SÃO PAULO · REMOTE`) — reusando o componente que ja existe.

Decisoes tecnicas:
- Recorte quadrado centrado NO ROSTO (600px a partir de y=315), nao no frame
  original — o disco corta os ombros de qualquer jeito.
- Alpha circular com UM pixel antialiased na borda, pra o anel desenhado em
  r = D/2 cair exatamente no limite e nao ao lado. A primeira tentativa tinha
  feather de 16% e o anel parecia maior que a foto.
- Anel/arco sao SVG na pagina, nao assados no arquivo: ficam nitidos em qualquer
  DPR e leem os tokens (--rule-mid, --accent).
- Anotacao levada pra BAIXO em vez de linha de chamada saindo pra fora: puxada
  pra fora ela estourava a coluna de 280px.
- 560x560 WebP, 17 KB (o retangulo era 28 KB).

Novo track `aboutHead` em layout.ts, seguindo o padrao de manter as colunas
centralizadas la. String `portraitAlt` nos dois idiomas.

LICAO: comparar variantes em cartoes isolados esconde o problema. Foi so montar
no tamanho real, sobre o fundo real, ao lado do texto real, que apareceu o peso
do bloco. Preview em contexto, nao em galeria.

PENDENTE: og:image. O index.html nao tem NENHUMA meta Open Graph, entao link do
portfolio no LinkedIn/WhatsApp aparece sem imagem. Precisa do dominio final —
og:image pede URL absoluta.

---

# A11y: blocos 1 e 3 da auditoria (2026-08-28)

Auditoria completa de spacing/sizing/acessibilidade gerou 25 achados. Usuario aprovou
os blocos 1 e 3. Blocos 2, 4-7 ficam pendentes.

## Bloco 1 — Contraste + touch targets

Contraste medido contra `--bg #080d13` e as 4 superficies (`plate`, `cell` e seus hovers).
Piso AA para texto <18.66px = 4.5:1.

- [x] 1.1 `--label-5` #5e7386 (3.97) e `--label-6` #4e6274 (3.08) falham AA em 15 regras.
      Rampa nova, monotonica, todas >=4.5 nas superficies onde cada uma e usada:
      label-4 #74889b (5.33) / label-5 #6e8496 (5.02) / label-6 #6a8093 (4.75).
      Nota: a rampa nao comporta 6 niveis distintos acima de AA neste fundo — o degrau
      entre 4 e 6 encolheu de proposito.
- [x] 1.2 `.lang` 32px -> 44px de altura; `.lang__btn` ganha min-width 44px.
- [x] 1.3 `.brand` ~19px -> min-height 44px (nao altera altura do header: `.nav__btn`
      ja fixa 44px na mesma linha).
- [x] 1.4 `a.contact-aside__v` ~24px -> min-height 44px (email e LinkedIn no mobile).
- [x] 1.5 `.case-index__btn` 6px -> 8px de padding. CORRECAO da auditoria: 27x170px ja
      cumpre WCAG 2.2 AA (2.5.8, 24x24). Forcar 44px estouraria a sidebar sticky
      (17 itens x 44 = 748px vs `max-height: calc(100vh - 150px)`). So conforto.

## Bloco 3 — Foco, press feedback, transicoes

- [x] 3.1 Remover `.field__input { outline: none }` (app.css:882) — unica remocao
      explicita de outline no projeto. WCAG 2.4.7.
- [x] 3.2 Anel de foco unico via `:where(...):focus-visible` (especificidade 0) em
      global.css: `outline: 2px solid var(--accent); outline-offset: 2px`.
- [x] 3.3 Offset negativo onde o anel externo seria cortado ou invadiria vizinho:
      `.plate` (tem `clip-path`, que corta o outline), `.bound__card` e `.sheet__btn`
      (grids de gap 1px).
- [x] 3.4 Estados `:active` em todo elemento interativo. Só cor/background — sem
      transform, para nao deslocar layout nem virar problema de reduced-motion.
- [x] 3.5 Token `--dur-press: 150ms` + `transition` nos interativos (hoje 0ms).
- [x] 3.6 Token `--accent-active: #00b1eb` (texto `--on-accent` sobre ele = 8.12:1).
      Escada de 3 estados: hover #8fe4ff (mais claro) / base #3fd0ff / press #00b1eb.

## Validar
```
npm run typecheck && npm run build
# Tab por todas as paginas: anel visivel em todo controle
# DevTools > Rendering > Emulate prefers-reduced-motion
```

---

# A11y: blocos 2 e 4 (2026-08-28)

## Bloco 2 — Idioma e hierarquia de headings

- [x] 2.1 `document.documentElement.lang = lang` num effect do App. Hoje `index.html`
      fixa `lang="en"` e trocar para PT nao atualiza nada — leitor de tela pronuncia
      portugues com fonemas ingleses. WCAG 3.1.1 / 3.1.2.
- [x] 2.2 `FigRule` ganha prop `as`. Regua de secao vira `<h2>`; sobrancelha acima de
      um `<h1>` continua `<span>` (nao e titulo de nada).
- [x] 2.3 Aplicar: Home FIG.02/FIG.03 + cta-band (h3->h2). About blocos (h3->h2) +
      skills label. CaseStudy FIG.02 e FIG.03..15 + highlights (h3). Resume as 5
      reguas + titulos de cargo (div->h3). Contact so tem h1, ja correto.
      Antes: `h1 -> h3` na Home; case study, resume e about sem nenhum `h2`.

## Bloco 4 — Layout responsivo

- [x] 4.1 `useViewport` lia `DEFAULT_W = 1280` no primeiro render. Em qualquer celular
      o primeiro paint era o layout desktop de 3 colunas, refluindo depois do effect.
      Ler `window.innerWidth` no initializer (SPA client-only — `useRoute` ja faz o
      mesmo com `window.location`). Isso sozinho mata o CLS.
- [x] 4.2 `resize` sem throttle -> coalescer em `requestAnimationFrame`.
- [x] 4.3 Mover as 11 entradas de `layout.ts` para media queries. Mobile-first, mesmos
      dois limiares do hook (680 / 900). Deleta `layout.ts` e a prop `cols` das 5
      paginas — 13 `style={{ gridTemplateColumns }}` inline somem.
- [x] 4.4 `100vh` -> `100dvh` com fallback (`.shell`, `.hero`, `.hero__art`,
      `.case-index`). No mobile `vh` conta a barra de endereco.
- [x] 4.5 Paddings de topo fixos (150px hero, 140px about/resume/contact) viram
      `clamp()`. 150px num viewport de 667px sao 22% da tela.
- [x] 4.6 `--header-h` estava em 61px, nunca usado, e ja estava errado antes do bloco 1
      (14 + 44 + 14 + 1 = 73px). Corrigir para 73px e derivar `--scroll-offset` dele.
- [x] 4.7 Offset de ancora vira responsabilidade do CSS: `scroll-margin-top` nos alvos
      e `jump()` passa a usar `scrollIntoView`. Remove o `- 100` hardcoded do
      CaseStudy, que era o terceiro lugar codificando a altura do header.

---

# A11y: blocos 5, 6 e 7 (2026-08-28)

## Bloco 5 — Modal do indice (mobile)

- [x] 5.1 `.sheet` e uma `<div>` sem `role="dialog"`, sem `aria-modal`, sem Escape,
      sem focus trap, sem retorno de foco, sem trava de scroll e sem dismiss por
      backdrop. Trocar por `<dialog>` + `showModal()`: o elemento nativo entrega
      trap, Escape, retorno de foco e `inert` no resto do documento de graca.
- [x] 5.2 Top layer do `<dialog>` resolve tambem o z-index: `.fab` (50) ficava por
      cima de `.sheet` (49). Deixa de ser possivel.
- [x] 5.3 Trava de scroll do body enquanto aberto (o `<dialog>` nao faz isso).
- [x] 5.4 `aria-labelledby` apontando para o label do sheet; `aria-expanded` no FAB.

## Bloco 6 — Escala

CORRECAO DA AUDITORIA: eu disse "31 valores ad-hoc, sem ritmo 4/8". Errado.
43 dos 50 valores ja estao numa grade de 2px. Os `1px` (27 usos) sao as hairlines
— e a linguagem visual do projeto, nao defeito. Sobram 6 impares: 3,5,7,9,11,13.

- [x] 6.1 Documentar a grade de 2px em tokens.css como sistema existente.
- [x] 6.2 Encostar os 6 impares na grade (19 declaracoes). Todos sao elementos
      decorativos minusculos — deslocamento de 1px, imperceptivel.
- [x] 6.3 Escala tipografica: 14 tamanhos estaticos -> 10. Os defeitos reais sao
      9px e 9.5px (abaixo do piso de leitura); 14.5 e 16.5 sao so ruido.
      9/9.5 -> 10, 14.5 -> 15, 16.5 -> 16.
      Nota: 10 e 11px continuam abaixo do piso de 12px do checklist, mas sao
      micro-labels mono em caixa alta (SPEC-001, 2024) — e a convencao do desenho
      tecnico e agora passam AA de contraste. Subir tudo para 12 estouraria o
      rodape das plates.
- [x] 6.4 `.nav { gap: 4px }` -> 8px. Minimo entre alvos de toque (item 13 da
      auditoria, cabe aqui).

## Bloco 7 — Formulario de contato

- [x] 7.1 Sem `required` em nenhum campo, sem validacao, sem mensagem de erro.
- [x] 7.2 Erro abaixo do campo, com `role="alert"`, `aria-invalid` e
      `aria-describedby` ligando input -> erro.
- [x] 7.3 Validar no blur, nao a cada tecla (so depois que o usuario terminou).
- [x] 7.4 No submit invalido, focar o primeiro campo com erro.
- [x] 7.5 `sent` nunca resetava: apos o primeiro envio o botao ficava "Sent" para
      sempre. Resetar quando o usuario edita.
- [x] 7.6 Sucesso so trocava o texto do botao — leitor de tela nao era avisado.
      Regiao `aria-live="polite"` + o endereco de email como saida caso o
      cliente de `mailto:` nao abra.
- [x] 7.7 Token `--danger` com contraste AA no fundo escuro. Cor nao pode ser o
      unico sinal: erro leva icone/texto.
- [x] 7.8 Copy de erro em en/pt.

---

# Logo EA (2026-08-28)

- [x] Fonte `assets/Logo.jpg` nao era usavel: JPG da folha de especificacao, com o
      xadrez de transparencia chapado nos pixels (JPG nao tem alpha) e as cotas
      (W1, H1, 30deg, 60deg) brancas POR CIMA da marca. Nenhum threshold separa
      marca de apresentacao. Sem ImageMagick/Pillow na maquina — o `convert` do
      PATH e o do Windows. Usuario optou por reconstrucao vetorial.
- [x] `src/components/Logo.tsx` — monograma reconstruido, 7 paths, campo 64x42.
      E: haste + 3 bracos cortados paralelos a aresta do A, folga de 2.5.
      A: pernas partindo de apice compartilhado de 9.5; contraforma abre onde as
      arestas internas se separam; travessa fecha embaixo.
      `fill="currentColor"` -> herda hover/press de `.brand` sem regra extra.
- [x] Navbar: antes do wordmark, 20px de altura.
- [x] Favicon: `public/assets/logo.svg`, 64x64 com fundo #080d13 e raio 10.
      Fundo e deliberado — marca solta some em aba clara. Cores literais:
      favicon nao herda nada da pagina.
- [x] Pagina de conferencia removida apos aprovacao.
- [ ] `apple-touch-icon`: iOS exige PNG 180x180. Sem rasterizador nesta maquina.
      Exportar o SVG e ligar quando houver.

## Aberto da auditoria (baixa severidade)
- [ ] `alt` do Figure duplica o `figcaption` — leitor de tela le duas vezes
- [ ] Medida de linha 85-88 chars em `.case-section__body`, `.resume__summary`,
      `.philosophy__sub` (recomendado 65-75)
- [ ] `role="list"` nas 5 listas com `list-style: none` (Safari/VoiceOver perde
      a semantica de lista)
- [ ] `srcset` no retrato (560px servidos para slot de 320px)
- [ ] `overflow-x: clip` no `.shell` mascara overflow em vez de evita-lo

---

# Code review (2026-08-28)

Dois achados do agente foram descartados apos verificacao:
- Favicon com `base` nao-raiz: FALSO. Build com `base='/repo/'` reescreve para
  `/repo/assets/logo.svg` — o Vite processa `href` no index.html.
- `useRoute` query obsoleta: repro descrito nao acontece (mudar de case muda o
  pathname). Sobra so a query pendurada na barra no primeiro load. Cosmetico.

## Bugs
- [x] B1 `global.css:148` reverte o proprio `animation: none !important` do bloco
      reduced-motion para o live-dot. Halo infinito para quem pediu menos
      movimento.
- [x] B2 `useReveal.ts:39` fallback de 1400ms dispara incondicionalmente em TODOS
      os nos. Reveal-on-scroll morto abaixo da dobra. So cair no fallback se o
      IntersectionObserver nunca entregou callback.
- [x] B3 `CaseStudy.tsx` FAB e condicionado a `vp.mob`, o `<dialog>` nao. Abrir em
      880px e alargar alem de 900px prende o modal com scroll travado.
      (Introduzido por mim no bloco 5.)
- [x] B4 `Header.tsx:52` `label.slice(0,3)` e o nome acessivel — leitor anuncia
      "HOM", "WOR", "ABO". `aria-label` com o rotulo inteiro.
- [x] B5 `Figure.tsx:23` `alt` duplica o `figcaption`.
- [x] B6 `Home.tsx:113` contagem "06" fixa vs `CASES.length`.

## Perf
- [x] P1 `useDims.ts:51` MutationObserver em `document.body` subtree reexecuta
      `querySelectorAll` + leituras de offsetWidth (forced layout) 60ms apos
      QUALQUER mudanca de DOM. O ResizeObserver ja cobre o caso real.

## Codigo morto
- [x] D1 Ramo `workLayout: 'bound'` (config + ~17 linhas JSX + ~45 CSS)
- [x] D2 `errSummary` en/pt (adicionado por mim no bloco 7, nunca usado)
- [x] D3 `Cv.contact` — populado nos 2 idiomas, nunca renderizado
- [x] D4 default `groups = STACK` em `stackFor`
- [x] D5 `--bg-deep`

## Mantido de proposito
`Portfolio.dc.html`, `support.js`, `assets/Logo.jpg` sao fonte do port e origem
do monograma. Fora do build, mas apagar perde proveniencia.
