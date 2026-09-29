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
- [x] 15. Revisao visual no browser (2026-09-22): desktop EN/PT no Forge com as imagens novas, mobile 375px em Aether e Reloop, home com as placas, visor de zoom e retorno de foco. Detalhe conhecido: documento de 1936px no mobile fica em 327px e so e legivel pelo visor.

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
- [x] `apple-touch-icon`: PNG 180x180 ja existe em public/assets/og/ e esta ligado no index.html.

## Aberto da auditoria (baixa severidade)
- [x] `alt` do Figure: resolvido antes desta rodada — Figure usa alt="" decorativo e so as tabelas do InvestIQ carregam alt de conteudo. Verificado: 0 imagens sem atributo alt em 10 paginas.
- [x] Medida de linha: as tres classes passaram de max-width em px para 70ch.
- [x] `role="list"` nas 5 listas (case-index, sheet, res-row bullets, res-certs, skill-cell). Verificado no DOM.
- [x] `srcset` no retrato: gerado portrait-320.webp (5,7KB); 1x agora baixa 320 em vez de 560 (17KB).
- [x] `overflow-x: clip`: medido com o clip desligado em 7 paginas a 360px — scrollWidth == clientWidth em todas. Nao mascara nada; os unicos elementos fora da viewport sao os dois .backdrop, que sao position:fixed. Fica como rede de seguranca.

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

---

# Auditoria de portfolio — correcoes 1 e 3 (2026-08-31)

## Correcao previa da auditoria (2 achados meus estavam errados)

- **Contraste NAO esta quebrado.** O `a11y` do axe devolveu `violations: 0` e
  11 nos em `incomplete` (contraste "precisa de revisao manual") — o axe nao
  consegue calcular atraves do `backdrop-filter` do header e do canvas de fundo,
  entao desiste e marca incomplete. Eu li isso como problema. Medido a mao
  contra `--bg #080d13`: `--ink` 17.56:1, `--ink-muted` (corpo dos cases)
  12.60:1, `--ink-dim` (nav) 7.79:1, `--accent` 10.84:1, `--label-6` (o mais
  escuro) 4.75:1. Tudo passa AA, quase tudo passa AAA. O comentario em
  `tokens.css` ja registrava isso. **Nada a fazer.**
- **A secao DESIGN SYSTEM ja mostra, nao so descreve.** `ds.webp` tem swatches
  com hex, a escala tipografica renderizada em tamanho real e a biblioteca de
  componentes (button states, input fields, asset tags). Nunca vi na auditoria
  porque a imagem nao tinha feito reveal no scroll. **Nada a fazer.**

Sobra do fix 3 apenas o item dos placeholders — e ele nao e codigo (ver F3).

## F1 — Trabalho na home (thumbnails nas plates)

Hoje `FIG. 02 — SELECTED WORK` sao 6 plates so de texto. Os assets ja existem
em `dist/assets/cases/<id>/<lang>/ui-*.webp`; e so usar.

- [x] F1.1 `types.ts`: novo tipo `Thumb = { src: MaybeLocalized; w: number; h: number }`
      e campo `thumb?: Thumb` em `CaseMedia`. Nao reusar `SlotImage` — ele exige
      `caption`, e a plate ja tem nome e kind.
- [x] F1.2 `media.ts`: `thumb` nos 6 cases, apontando para o frame mais
      reconhecivel de cada um (candidatos: investiq `ui-03` dashboard, pulse
      `ui-05`, aether `ui-01`, forge `ui-01` kanban, casado `cui-01`, reloop
      `ui-01`). Conferir cada um renderizado antes de fechar — se um frame nao
      ler bem em ~380px de largura, troco.
- [x] F1.3 `Home.tsx`: janela de imagem no topo da plate, antes de `plate__kind`.
      A metafora da prancha pede o desenho no campo e o title block embaixo —
      que e exatamente o que a plate ja faz com `plate__foot`.
- [x] F1.4 `app.css`: `.plate__thumb` sangrando ate a borda (a plate tem
      `padding: 22px 22px 0`, entao margem negativa), `aspect-ratio` fixo,
      `object-fit: cover` + `object-position: top`, hairline embaixo. Respeitar
      o `clip-path` do canto cortado. Hover discreto, alinhado com `--dur-press`.
- [x] F1.5 `width`/`height` intrinsecos + `loading="lazy"` fora da primeira
      dobra. Medir CLS depois — hoje esta em 0 e tem que continuar.
- [x] F1.6 Mobile (<=680px): conferir que a janela nao come a dobra inteira.
- [x] F1.7 Build + revisar as 6 plates em 1440px e 390px, EN e PT.

Risco conhecido: os fontes tem proporcoes muito diferentes (mobile retrato
780x1864 vs desktop 1936x897). Numa janela unica com `cover`, o retrato mostra
so a faixa de cima. Se ficar ruim, adiciono `focus?: string` no `Thumb` para
ajustar `object-position` caso a caso.

## F3 — Placeholders (NAO e tarefa de codigo)

Confirmado na resolucao original, nao e artefato de screenshot:
`investiq/en/ui-06.webp` tem, nas 4 linhas de sugestao, um quadrado de icone
vazio a esquerda e um retangulo vazio a direita. Achado novo: em
`investiq/en/ds.webp` os rotulos dos swatches ("Primary Emerald", "Raised
Surface", "Deep Canvas", "Soft Outline") sao texto quase branco sobre fundo
branco — ilegiveis.

Os dois defeitos estao *dentro* dos webp exportados do Figma. Codigo nao
resolve; precisa reexportar. Portanto:

- [x] F3.1 Varrer os webp dos 6 cases e listar exatamente arquivo + regiao com
      caixa placeholder ou texto ilegivel.
- [x] F3.2 Entregar a lista de reexport (arquivo, idioma, o que corrigir).
      Reexportar em si e no Figma — fora do meu alcance.

## F3 — Lista de reexport (Figma)

Revisei a fundo 18 frames EN cobrindo os 6 cases (todos os `ds*`, todos os
`ui-*` do InvestIQ, e amostra dos demais). Os defeitos caem em 5 padroes. Nada
disso e corrigivel em codigo — sao pixels dentro do webp.

### P1 — Caixas/circulos placeholder vazios dentro de telas acabadas
- `investiq/{en,pt}/ui-01` — faixa "FEATURED IN": 3 pilulas cinza vazias.
  Avatar do topo direito e o stack de 3 circulos verdes acima de "+12,000
  investors" tambem sem conteudo.
- `investiq/{en,pt}/ui-06` — nas 4 linhas de sugestao: quadrado de icone vazio
  a esquerda + retangulo vazio a direita. O mais visivel do site.
- `pulse/{en,pt}/ui-05` — card "Volume vs Target History" e uma caixa vazia.
- `pulse/{en,pt}/ui-06` — "Transaction Volume" e "Regional Distribution" sao
  duas caixas vazias. Produto de analytics com os graficos em branco.
- `aether/{en,pt}/ds` — "CORE ICONS": 8 circulos vazios (bubble_chart, wallet,
  guide, settings, nodes, assets, network, security).
- `forge/{en,pt}/ds` — "CORE ICONS": 8 circulos vazios (task, sprint, board,
  token, component, avatar, filter, tag).
- `aether/{en,pt}/ui-01` — o logo do app e um circulo lavanda chapado, sem
  marca dentro.
- `casado/{en,pt}/ds-components` e as telas `dui-*` — icones da tab bar sao
  quadrados arredondados solidos, sem glifo.
- `reloop/{en,pt}/ui-02` — avatar do vendedor (@marina.closet) e circulo vazio.

### P2 — Rotulos de swatch ilegiveis (texto quase branco sobre fundo branco)
- `investiq/{en,pt}/ds` — "Primary Emerald", "Raised Surface", "Deep Canvas",
  "Soft Outline".
- `pulse/{en,pt}/ds` — "Deep Canvas", "Surface", "Pulse Blue", "Success Green",
  "Alert Red", "Pending Amber".
Os hex abaixo deles estao legiveis; so o nome do token quebrou.
Referencia de como deveria ser: `casado/ds-colors` esta perfeito.

### P3 — Instrucao de autoria esquecida no export
- `pulse/{en,pt}/ds`, canto inferior direito: **"FIG. 00 — FOUNDATIONS (DROP
  IMAGE H"** — nota para si mesmo, e ainda cortada no meio da palavra.
  Remover antes de reexportar.

### P4 — Texto com artefato de renderizacao
- `aether/{en,pt}/ds` — todos os titulos de secao ("COLOR PALETTE",
  "TYPOGRAPHY", "CORE ICONS", "COMPONENT LIBRARY", "BRAND IDENTITY",
  "Accessibility"), os nomes/hex dos swatches, o label "Primary Action" e o
  badge "FAILED" saem com halo/duplicacao. Parece fonte nao embutida caindo em
  fallback com bold sintetico. Primeiro swatch ("Primary Surface #1E1E2E") nao
  tem chip visivel — escuro sobre escuro sem borda.
- `aether/{en,pt}/ui-06` — o numeral grande "1" sai com o glifo quebrado.

### P5 — Frame cortado / area morta
- `forge/{en,pt}/ds` — coluna "Input Fields" cortada na borda direita: o campo
  "Email / Invalid format" fica pela metade. Bounds do export apertados demais.
- `aether/{en,pt}/ds` — card do component library cortado embaixo, "Network
  Latency 24ms" pela metade.
- `casado/{en,pt}/dui-01` e `dui-03` — ~50% da tela e branco vazio abaixo do
  conteudo. Le como tela inacabada, nao como respiro.

### Observacao (nao e defeito, e inconsistencia)
`reloop/{en,pt}/ds` e so uma folha de componentes com rotulos genericos
("Button label", "Nav label", "Tab label", "Placeholder text") — sem paleta,
sem escala tipografica, sem titulos de secao. Muito mais raso que o ds dos
outros cases. `casado/ds-colors` e `forge/ds` sao o padrao a seguir.

## InvestIQ v2 — revisao do case para portfolio review (2026-09-21)

Contexto: entrevista pleno, empresa internacional nao-fintech, portfolio review aberto, 1-3 dias.
Projeto 100% conceitual, sem pesquisa nem testes -> enquadrar como hipoteses + plano de validacao.
Paginas EN `28:2`-`28:10` clonadas como `v2 · ...` no mesmo arquivo; originais intactas.

- [x] 1. Framing: Cover v2 (sem "reconstrucao") + pagina Overview
- [x] 4. Pagina Key Decisions (3 decisoes, alternativas, trade-offs) + wireframes anotados
- [x] 7. Outcomes -> Success Metrics & Validation Plan (sem numeros inventados)
- [x] 3. Logica de onboarding 4 passos coerente (journey, flow, tabela, hi-fi 1-2-3-4)
- [x] 5. Hi-fi: data viz real, placeholders, dominio, consistencia, estados empty/loading/error
- [x] 6. Design system reconciliado com UI + estados + tokens + contraste AA
- [x] 2. Problem & Assumptions + proto-personas
- [x] 8. Polish: nomes de layers, grid, alturas de wireframe
- [x] 9. `tasks/investiq-interview-notes.md` (talk track + perguntas provaveis)
- [x] Changelog v2 no Figma

Resultado: 12 paginas `v2 ·` no topo do arquivo, divisor, v1 (PT + EN) abaixo sem alteracao de conteudo.
Efeito colateral aceito: `color/text/muted` repontado para `stone/300` (#939b93, AA). Componentes PT v1
ligados a essa variable ficaram com cinza mais claro (so cor). Reverter: apontar de volta para `stone/400`.
Novas variables: `stone/300`, `violet/400`, `color/chart/1-4`, `color/status/warning-text`.
Pendente (fora do escopo): reexportar imagens do site (`portfolio/public/assets/cases/investiq/`) a partir do v2.

## Portfolio — auditoria UX/UI + acessibilidade e correcoes (2026-09-21)

Relatorio: `tasks/portfolio-audit.md`. Sem commit.
Decisoes: Pulse = freelance real, cliente nao citado, metricas medidas, papel "Product designer (freelance)",
time = Eduardo + engenharia do cliente. Forge = conceito solo. Aether = sem teste (+38% so projetado).
InvestIQ = alinhado ao Figma v2 (conceito, sem 4.7/5).

- [x] 1. Conteudo dos cases (cases.ts, media.ts)
- [x] 2. Navegacao: links reais, title por rota, foco no h1, Back restaura grid, WORK current, 404 de case, idioma persistente
- [x] 3. Acessibilidade: skip link, scroll-padding, figuras (alt + ampliar), contraste de bordas, motion, toggle idioma, contato, resume, aria-hidden FIG/*
- [x] 4. UI: cols mobile, labels de acao, microcopy >=12px, strings PT, CTA fim do case + footer, fonte 700
- [x] 5. SEO: meta/OG/canonical, robots, sitemap, og:image
- [x] 6. Relatorio `tasks/portfolio-audit.md`
- [x] 7. Verificacao: typecheck + build OK; browser coberto na rodada de acessibilidade (375px, zoom 200%, Back, foco)

Extra: 22 imagens InvestIQ reexportadas do Figma v2 para `public/assets/cases/investiq/v2/` (v1 ui/ds/etc removidas; wireframes mantidos).

## Figma — auditoria InvestIQ/Pulse/Forge + correcoes Fase A (2026-09-21)

Entrevista qua 23/09 (EN, pleno, walkthrough InvestIQ). Relatorio: `tasks/figma-audit.md`.
Fase A (antes de quarta, EN): InvestIQ completo; Pulse e Forge so criticos. Fase B depois.

- [x] A1. Relatorio `tasks/figma-audit.md` + padrao comum
- [x] A2.1 InvestIQ: swap instancias v1 -> v2; novos componentes (allocation row, next-step, suggestion, chip, account row)
- [x] A2.2 InvestIQ: bind fills/strokes a variables
- [x] A2.3 InvestIQ: text styles Inter + aplicar
- [x] A2.4 InvestIQ: a11y (alvos >=44, 11->12px, red/500, pressed, frame a11y notes)
- [x] A2.5 InvestIQ: core task (suggestion detail, confirm, success, portfolio) + disclosure
- [x] A2.6 InvestIQ: prototipo clicavel + link
- [x] A2.7 InvestIQ: secoes, ordem, nomes
- [x] A2.8 InvestIQ: metricas (act on next step, metodo) + JTBD/persona secundaria
- [x] A2.9 Site: reexportar imagens InvestIQ alteradas
- [x] A3. Pulse criticos (texto financeiro, metricas, contraste, placeholders, graficos)
- [x] A4. Forge criticos (claims conceituais, numeros, a11y claims, tokens)

## Figma Fase B — arquivos impecaveis (2026-09-22)

Ordem InvestIQ -> Forge -> Pulse. PT depois do EN de cada arquivo. Plano: ~/.claude/plans/cryptic-dazzling-newt.md

- [x] 1.1 InvestIQ: componente Allocation row + substituir
- [x] 1.2 InvestIQ: renomear space/* radius/*
- [x] 1.3 InvestIQ: pagina Components
- [x] 1.4 InvestIQ: desktop detail + review
- [x] 1.5 InvestIQ: competitive UX row
- [x] 1.6 InvestIQ: varredura final (fills, styles, layers) em todas paginas v2
- [x] 1.7 InvestIQ: paginas PT
- [x] 1.8 InvestIQ: archive v1 — copia mp7vTrq46fhbMcG0djAdWx so com v1 (EN, divisor, PT, aviso na capa com link); principal sem v1, paginas sem prefixo v2, 7 text styles v1/* removidos, Changelog EN/PT com link
- [x] 1.9 InvestIQ: reexport site — 25 imagens em EN + PT (en/v2, pt/v2), alturas iguais por par; media.ts com investiqBoth; miniaturas PT das Decisoes 02/03 refeitas a partir dos wireframes PT; R$ 000.000,00 no wireframe PT; build OK
- [x] 2.x Forge: tokens em camadas + dark, styles, componentes, telas, matriz, paginas, PT, site
- [x] 3.1 Pulse: tokens em camadas (Primitives + Semantic "Dark", space/radius) + 15 text styles, sweep nas paginas EN
- [x] 3.2 Pulse: pagina Components (17 sets em sections)
- [x] 3.3 Pulse: Hi-Fi EN refeito com instancias (onboarding 4 passos com papel, Home x3 papeis, dashboards, report builder, 5 estados, mobile + justificativa, a11y notes)
- [x] 3.4 Pulse: prototipo EN (33 links, 2 starting points)
- [x] 3.5 Pulse: DS doc novo (primitivos, semanticos, contraste, tipo, espacamento, componentes)
- [x] 3.6 Pulse: Personas, Overview, Metrics & validation, Changelog, resultados dos testes, copy finance
- [x] 3.7 Pulse: paginas PT (clones traduzidos, numeros BR, prototipo PT)
- [x] 3.8 Pulse: site (ui-01..07, uxflow, insights, validation, ds; media.ts; copy) — build OK
- [x] 3.9 Eduardo revisou os textos plausiveis do Pulse (ok, 2026-09-22)

## Figma Fase C — Casado, Reloop, Aether (2026-09-22)

Plano: ~/.claude/plans/cryptic-dazzling-newt.md. Auditoria: tasks/figma-audit.md > Fase C. Ordem Casado -> Reloop -> Aether. Denise real (conversa); Marina arquetipo; Aether so desk research.

- [x] 1.1 Casado: tokens AA (honey/coral/status), focus/border-strong/disabled, alias + scopes
- [x] 1.2 Casado: 15 text styles (Fraunces + Work Sans), Caption 12, aplicar em tudo
- [x] 1.3 Casado: pagina Components com estados + novos (Time slot, Product card, Order row, Top bar, State panel, Icon set)
- [x] 1.4 Casado: Hi-Fi refeito com instancias (24h/pt-BR no PT, calendario com legenda, estados)
- [x] 1.5 Casado: pesquisa (metodo Denise; Marina proto-persona), metricas mensuraveis
- [x] 1.6 Casado: paginas padrao (Overview, Key Decisions, Metrics, Changelog), prototipo
- [x] 1.7 Casado: PT + site (26 imagens EN/PT, media.ts, copy DS/pesquisa) — build OK
- [x] 2.1 Reloop: tokens AA (primitivos por matiz real, muted/brand/status/botao), focus/border-input/disabled, alias + scopes
- [x] 2.2 Reloop: 15 text styles (Fraunces + Work Sans), minimo 12px, aplicados em 100% dos textos
- [x] 2.3 Reloop: pagina Components (15 sets com estados, icones reais, Condition badge com medidor de 4 pontos)
- [x] 2.4 Reloop: Hi-Fi refeito com instancias, R$ + checkout BR (CEP/Pix), disputa, web mobile, estados
- [x] 2.5 Reloop: honestidade (proto-personas sem citacao, Assumptions, desk research, metas com definicao)
- [x] 2.6 Reloop: paginas padrao (Overview, Key Decisions, Metrics & Validation, Changelog), prototipos EN/PT
- [x] 2.7 Reloop: PT (14 paginas, 883 textos/props), nomes de frames, links do Overview, thumb da capa
- [x] 2.8 Reloop: site — 27 imagens EN/PT, media.ts (slots ds/outcome novos), cases.ts sem -32%/+18%/2,5x — build OK
- [x] 2.9 Casado: metricas do site alinhadas as metas do Figma (<1 em 20, metade dos DMs, guardrail semanal)
- [x] 3.1 Aether: honestidade (desk research, sem entrevistas/testes, sem -52%, metas com definicao)
- [x] 3.2 Aether: tokens em 2 camadas (primitivos + semanticos), AA no escuro (erro 1,3:1 -> 5,4:1; muted 3,6 -> 5,3), space/radius
- [x] 3.3 Aether: 15 text styles (Space Grotesk + Inter), minimo 12px, 100% aplicados
- [x] 3.4 Aether: pagina Components (10 sets + Icon vetorial no lugar da fonte de icones)
- [x] 3.5 Aether: Hi-Fi refeito com instancias — modo treino, envio real, frase adiada, 3 erros + vazio/carregando
- [x] 3.6 Aether: paginas padrao (Overview, Key Decisions, Metrics & Validation, Changelog), prototipo EN/PT
- [x] 3.7 Aether: PT espelhado (13 paginas, dicionario de 362 entradas)
- [x] 3.8 Aether: site — 22 imagens EN/PT, media.ts, cases.ts (metas no lugar de +61/+38/-52) — build OK

## Fase D — verificacao cruzada do site (2026-09-22)

- [x] D1 Script de verificacao: 172 referencias de midia x arquivos x dimensoes (0 faltando, 0 orfas apos limpeza)
- [x] D2 Corrigir caixas EN/PT divergentes: forge/research, forge/ds, investiq/wire-05 (+ media.ts atualizado)
- [x] D3 Remover imagens orfas (aether overview EN/PT)
- [x] D4 Checar contraste dos tokens de InvestIQ, Pulse e Forge; corrigir border/default do InvestIQ (2,93 -> 3,28)
- [x] D5 Varredura de cópia: pares EN/PT identicos, claims de AA, projecoes vs metas
- [x] D6 Slots de midia x secoes, assets de OG, typecheck + build

## Acessibilidade — rodada no browser (2026-09-22)

Medido no build servido por `vite preview`, com iframes de 375px e 600px (zoom 200%).

- [x] A1 Auditoria automatica em 10 paginas: 0 imagem sem alt, 0 controle sem nome acessivel, 0 pulo de heading, 1 h1 por pagina, <main> presente, 0 id duplicado, 0 alvo abaixo de 24x24.
- [x] A2 Contraste computado com composicao de alpha (11 paginas, EN e PT): 0 reprovacao. As duas falhas do primeiro passe eram erro do meu script, que ignorava o alpha do fundo.
- [x] A3 Transbordo horizontal: 0 em 7 paginas com o clip do shell desligado.
- [x] A4 Zoom 200% (viewport de 600px): 0 transbordo em 11 paginas.
- [x] A5 `lang`: passou a ser `pt-BR` no modo portugues (era `pt`), e `en` no ingles. aria-pressed correto nos dois botoes.
- [x] A6 `aria-current="false"` saiu do indice do case (15 ocorrencias por pagina); agora o atributo so e emitido quando ativo. Header mantem page/location.
- [x] A7 Skip link, foco no h1 apos troca de rota (preventScroll), 0 tabindex positivo, bloco de prefers-reduced-motion cobrindo animacoes, transicoes, hero e plates.
- [x] A8 Back reteste com a aba visivel: restaura 1793px exatos, forward volta ao topo do case, back de novo restaura. O problema anterior era rAF congelado em aba oculta.

## Fase E — Pulse e Forge no padrao da Fase C (2026-09-22)

Levantamento: Pulse ja esta no padrao (13 paginas EN + espelho PT, 100% dos textos com style, 0 abaixo de 12px, 17 componentes, Hi-Fi com 149 instancias, Metrics & Validation com definicao/metodo/janela). Forge tem as lacunas.

- [x] E1 Forge: Key Decisions reunindo Strategize + Explore + Iterate; apagar as tres paginas (EN e PT)
- [x] E2 Forge: quadro Metrics & Validation (metrica, definicao, meta, metodo, janela, rotulo) na pagina de resultados, como no Pulse
- [x] E3 Forge: aplicar text style nos 7 textos sem estilo da pagina Wireframes
- [x] E4 Forge: limpar fills crus (18 em Components, 4 no Hi-Fi) e nomes genericos
- [x] E5 Forge: espelho PT das paginas novas/alteradas
- [x] E6 Forge: site — metricas viram metas com definicao (basis target), copy de outcome/validation alinhada, reexportar imagens afetadas, build
- [x] E7 Pulse: renomear camadas genericas (Journey 16, Metrics 36, Components 8, Flows 3)

- [x] A9 Visor de zoom devolvia o foco ao body ao fechar; agora volta ao botao que o abriu (CaseStudy.tsx). Verificado no browser.

## InvestIQ — hi-fi v3 + mockups (2026-09-28)

Figma (aiZAr4JHmFuPzm25zIIC7m): páginas novas `Mockup Kit`, `Hi-Fi v3` e `Hi-Fi v3 · PT`. A v2 ficou intacta.
- v3: status bar + home indicator (componentes no Mockup Kit), telas com no mínimo 390x844, tab bar fixa e
  translúcida, CTA preso no rodapé nos passos, voltar nos passos 1–4, hero da landing = prévia do produto,
  welcome = consolidação das 3 contas (somam os R$ 128.450 da tabela), sparkline + iniciais das contas na Home,
  gráfico do D1 refeito para ocupar o card, segmento tracejado "depois da ordem" (46%) no D2, D2/D3 em 900pt.
- Inter continua sendo a única fonte (decisão do Changelog v2); a hierarquia dos valores vem do "R$" menor e
  dos centavos apagados.
- Export: clone escalado 2x no Figma -> screenshot -> WebP q84. `public/assets/cases/investiq/{en,pt}/v3/`,
  36 arquivos, ~1,7 MB no total. EN e PT com as mesmas alturas.

Site:
- `components/Device.tsx`: iPhone e navegador em CSS (container units), `ScreenImg`, `travel()`.
- `components/MockupScene.tsx`: devices em perspectiva sobre o chão do blueprint; entra com animação no hero
  (`eager`) e com scroll-driven animation nos demais; segue o ponteiro via --pbx/--pby.
- `components/ScreenSequence.tsx`: celular fixo + passos rolando (IntersectionObserver no meio da tela);
  abaixo de 900px vira um trilho horizontal com scroll-snap.
- `components/Spotlight.tsx`: uma tela com pinos numerados e notas com linha de chamada; empilha no mobile.
- `Figure.tsx`: `device` e `span` no SlotImage montam a figura dentro do device (zoom continua abrindo o frame todo).
- `CaseMedia` ganhou `hero`, `stages` e `slotLabels`. InvestIQ: hero (D1 + landing + home), seção UI com
  sequência do onboarding, spotlight da Home e galeria "todas as telas" em devices. Miniatura da home usa v3.
- Movimento reduzido: tudo cai na pose final, sem transição de troca de tela.
- Pendência: os `ui-*`/`state-*` da pasta v2 ficaram órfãos (nada mais aponta para eles).

### Polimento (2026-09-28, pedido do Eduardo)
- Fundos: os exports v2 voltaram com o canvas assado (#12131A) e o cinza do Figma (#F6F6F6) nos vãos e
  no preenchimento que iguala EN/PT. Knockout só das regiões ligadas à borda (wireframe claro dentro da
  folha fica), anti-aliasing desfeito por color-to-alpha, legenda sobre a faixa clara repintada como tinta
  clara. 8 figuras x 2 idiomas: problem-compare, journey, personas, competitive, decision-02, flow, ds, metrics.
- CTA cortado: passo 4, detalhe da sugestão e revisão ganharam barra de ação fixa no Figma (EN e PT) e
  agora saem em 390x844. A versão longa virou `*-full.webp` e só o modal usa (`SlotImage.full`).
- Modal: telas abrem dentro do device num tamanho de leitura (celular até 380px, navegador até 1200px);
  tela mais alta que o device rola por dentro, com a status bar fixa. Documentos continuam no zoom antigo.

### Wireframes (2026-09-28)
- Conteúdo da primeira rodada mantido (pedido: só polir). Figma: páginas novas `Wireframes · dark` e
  `Wireframes · dark · PT`, clones recoloridos (cinza claro -> cinza escuro por luminância); originais intactos.
- Export 390x844 @2x -> `public/assets/cases/investiq/{en,pt}/wire-v2/`. Os `wire-0X.webp` antigos ficaram órfãos.
- Site: `components/WireGrid.tsx` (stage `wires`): 8 tiles no mesmo tamanho, moldura simples de celular
  (`device--wire`), tile fantasma para o passo 3 que não existia, pinos 1–4 e legenda "o que a rodada seguinte
  mudou" (social proof cortado; decisões 01, 02 e 03). Clique abre o modal na moldura de wireframe.
- Texto da seção Exploração ajustado: dizia "cada tela" e "quatro passos", mas a rodada tinha três.

## Aether — hi-fi v3 + mockups + wireframes (2026-09-28)

Figma (iOvHgJ3n2dIPnn8PAswVBc): páginas novas `Mockup Kit`, `Hi-Fi v3`, `Hi-Fi v3 · PT` e `Wireframes · dark`. Hi-Fi e Hi-Fi · PT originais intactos.
- Correções no Components (valem para o arquivo todo): Button tinha o frame interno em hug (24px) dentro de um componente de 44 — o fundo encolhia até a altura do texto. Agora preenche; primary/ghost 52pt, link 44pt. Campo do Input ganhou 13px de padding vertical. Ícones: o frame interno não escalava (constraints MIN), então em 16/18px o glifo saía deslocado para baixo/direita; agora SCALE.
- v3: status bar + home indicator (componentes no Mockup Kit), 390x844 fixos. Boas-vindas ganhou prévia do ensaio (card de treino na frente, envio real atrás, stepper de 4 passos) no lugar do espaço vazio. Passos de processamento viraram um card; processamento de treino/real ganhou valor + taxa. Treino concluído lista os quatro passos vistos. PT: botões de painel que quebravam linha alargados (S3, S5 desanexados só no v3 · PT).
- Export 2x -> `public/assets/cases/aether/{en,pt}/v3/` (13 telas por idioma, mesmas alturas). Os `ui-*.webp` antigos na raiz de en/pt ficaram órfãos.
- Wireframes: clones recoloridos por luminância, 320x700 -> 390x844, `public/assets/cases/aether/wire-v2/` (sem texto, um arquivo para os dois idiomas). `wire-0X.webp` antigos órfãos.
- Documentos: o chão #1E1E2E foi removido (só a região ligada à borda) em research, competitive, journey, decisions, flows, metrics, outcomes; a linha clara de 1px no rodapé saiu. ds.webp mantém o chão (é um dos tokens).

Site (`media.ts` / `cases.ts`):
- Hero: treino · boas-vindas · envio real, glow lavanda. Miniatura: 01, 03, 06.
- Exploração: WireGrid com 5 wireframes + 3 fantasmas (treino concluído, frase de recuperação, estados de erro), pinos 1–5 ligados às decisões 02/03 e ao Changelog.
- UI: sequência "o ensaio" (01–05), spotlight do envio real (06) com 4 notas, galeria 07–10 + S1–S3.
- Copy: DS diz 52/44pt em vez de "44pt"; UI menciona a prévia do ensaio e a lista na conclusão; Exploração explica os pinos.

### Aether — ajustes (2026-09-28, pedido do Eduardo)
- Mockups do Aether diferentes dos do InvestIQ: hero em leque (celulares retos girando a partir de um pivô, anéis de órbita no chão, `Scene.layout: 'fan'`), ensaio numa tira com os 5 passos lado a lado e trilho numerado que se preenche com o scroll (`components/FlowStrip.tsx`, stage `strip`), treino x real lado a lado com as diferenças no meio e pinos nos dois celulares (`components/ComparePair.tsx`, stage `pair`), galeria com colunas pares deslocadas (`CaseMedia.stagger`).
- "The Problem & The Research": o parágrafo de Curiosity vs. Fear passava por baixo dos cards no Figma (EN e PT). Cards e o resto da página descidos 72px; reexportado (1936x2400) e fundo removido de novo.
- Wireframes: quadros fantasma removidos do Aether e do InvestIQ. Pinos renumerados; as notas das telas que não existiam viraram notas sem pino, marcadas com "+" (WireGrid aceita nota sem `n` e `cols`). Aether em 5 colunas.

## Pulse Analytics — hi-fi v3 + mockups + wireframes (2026-09-28)

Figma (ENI5lQV7km9zFiYvLi2lUI): páginas novas `Hi-Fi v3`, `Hi-Fi v3 · PT`, `Mockup Kit`, `Wireframes · dark`. Hi-Fi originais intactos.
- Components: Insight Card com valor em cima e comparação embaixo (antes a comparação quebrava linha ao lado do valor), contexto ocupa o espaço livre para os botões alinharem entre os cards.
- v3: telas desktop com altura mínima de 900 (1440x900, sem sobra no navegador), cards de insight com a mesma altura na linha, iniciais do avatar batendo com o nome (Rafael Costa, Helena Prado e Lucas Costa apareciam como MA), gráfico de barras da região preenchendo o card, rótulo "Jul" no eixo do gráfico de linha e valor final fora da linha, status bar + home indicator no mobile e uma versão 390x844 do mobile. PT: "Estável vs jul" cortado no ticket médio virou "Estável".
- Export 1936px (desktop) / 780px (mobile) -> `public/assets/cases/pulse/{en,pt}/v3/`, 18 arquivos por idioma, mesmas alturas.
- Documentos: problem, research-methods e strategy reexportados do Figma com uma margem em volta dos cards; ds reexportado só com a biblioteca de componentes (o export antigo tinha fundo #F6F6F6 e faixa escura); chão #080C14 removido de todos.
- Wireframes: 7 desktop recoloridos -> `pulse/wire-v2/` (1240x800). `wire-0X.webp` antigos órfãos, assim como `en|pt/ui-0X.webp`.

Site — linguagem própria, diferente de InvestIQ (perspectiva) e Aether (leque):
- Hero `layout: 'stack'`: três navegadores retos em cascata (Home de cada papel) com etiqueta em cima e o celular ao lado.
- `components/ViewSwitcher.tsx` (stage `tabs`): um navegador com abas; a barra da aba ativa é o timer do autoplay (pausa em hover/foco, para quando alguém clica, some com movimento reduzido). Usado em UX Flow (onboarding numerado 01–05) e UI (uma Home, três papéis).
- `components/LensView.tsx` (stage `lens`): dashboard da região com 3 recortes ampliados ao lado (variação com meta, Insight Card no dashboard, leitura em uma linha).
- Galeria em 2 colunas de navegadores (09 largura total + 11–16). Wireframes em grade de 4 com pinos 1–5 e duas notas "+" (estados, mobile).
- `Device` ganhou `fit` (mostra a tela inteira na proporção dela).

## Forge — hi-fi v3 + mockups + wireframes (2026-09-28)

Figma (Yg7hmLnYLxU3gRctk38M0J): páginas novas `Hi-Fi v3`, `Hi-Fi v3 · PT` e `Wireframes · dark` (logo depois de Wireframes). Hi-Fi originais intactos.
- v3: colunas do kanban com a mesma largura e iniciais variadas nos avatares; cards do detalhe da task abraçam o conteúdo; fundo do modal na vitrine de composição não invade mais a tabela; dashboard de saúde com KPIs em terços, 8 times (Payments 92%, Search 73%) e "3 de 8", barras mais largas, desvios descidos. PT: botão "Nova tarefa" realinhado à direita (claro e escuro).
- Documentos no Figma: caixas de número do Problem não se sobrepõem mais (EN/PT, mesma altura) e o resto da página desceu; Foundations com a escala azul certa (o 50 era azul-marinho), colunas alinhadas, título do card 03 sem sobrepor o texto e Primary #1D4ED8; Component Architecture com cards compostos alinhados; Design System com tudo numa coluna de 1240, galeria de componentes sem estourar a borda (inputs em 2x2), ícones distribuídos e textos PT traduzidos na galeria; tabela de métricas virou card branco; título PT do rollout sem quebrar em cima do texto.
- Export 1936px -> `forge/{en,pt}/v3/ui-01..05`. Documentos reexportados só com os cards (research, strategy, decisions, uxflow, ds, outcome, metrics) e o chão #F3F4F6 removido; rótulos que ficavam no chão repintados claros. Caixas do problema reexportadas inteiras (antes estavam cortadas).
- Wireframes: 5 recoloridos -> `forge/wire-v2/` (690x1170). `forge/wire-0X.webp` e `forge/{en,pt}/ui-0X.webp` antigos ficaram órfãos.

Site — linguagem própria, diferente de InvestIQ (perspectiva), Aether (leque) e Pulse (pilha):
- `components/ThemeSlider.tsx` (`CaseMedia.heroCompare`): hero com o mesmo board claro/escuro dividido por um controle arrastável (input range nativo, teclado e leitor de tela); varre uma vez ao aparecer, sem varrer com movimento reduzido.
- `components/Anatomy.tsx` (stage `anatomy`): detalhe da task com os componentes contornados (atômicos em ciano, composto em âmbar) e legenda numerada; passar o mouse/focar isola a peça, clique fixa. Tela fica fixa (sticky) enquanto a legenda rola.
- Wireframes em navegador, 5 colunas, pinos 1–5 e uma nota "+" (board escuro e dashboard de saúde).
- UI: galeria em 2 colunas (vitrine de composição e dashboard de saúde). Miniatura da home: dashboard de saúde v3.
- Copy: Exploração explica os pinos; UI menciona o controle claro/escuro e a anatomia; DS diz primary #1D4ED8 (o #3B82F6 reprova no AA para texto branco).

## Casado Doces — hi-fi v3 + mockups + wireframes (2026-09-29)

Figma (kDtapCsvRm0v6HsIiyNJoo): `Hi-Fi v3` / `Hi-Fi v3 · PT` e `Wireframes · dark` / `· PT` (sessão anterior). Nova página `Docs v3 · export` com `Component Library — EN/PT`, montadas de instâncias do Components (estados de dia já no padrão novo: só lotado riscado, fechado/passado esmaecido, Hoje só contorno).
- Wireframes escuros: fundo de todas as telas unificado em #141516 (as do cliente tinham faixas mais escuras atrás de calendário, carrinho e horários); cabeçalho da semana alinhado às colunas dos dias (gap 6); PT com D S T Q Q S S.
- Documentos corrigidos no Figma (EN e PT): parágrafo de método virou o card "Method/Método" no bloco de definição; cards da concorrência, da jornada (oportunidades alinhadas embaixo, mesma altura), do fluxo, do mapa do app e da reflexão com alturas iguais; setas do fluxo centralizadas; bolinha do cabeçalho do mapa alinhada; notas de acessibilidade estavam cortadas (cards com 42pt fixos) — agora abraçam o texto, e "Nunca só a cor" descreve os estados novos; persona PT "Para o que está fazendo…" → "Interrompe o que está fazendo…".
- Export 1936/1440: personas, definition, competitors, journey, flow, sitemap, metrics, reflection só com os cards, fundo creme fora (transparente). Setas do fluxo repintadas claras. Folhas de DS (primitives, semantic, contrast, type) exportadas sem fundo e montadas num painel creme arredondado; ds-components e ds-a11y já são painéis creme. EN e PT com o mesmo tamanho (sobra transparente embaixo).
- Wireframes: `casado/{en,pt}/wire-v2/cwire-01..07`, `dwire-01..05` (750x1624).

Site — linguagem própria (InvestIQ perspectiva, Aether leque, Pulse pilha, Forge slider):
- `components/PickupSync.tsx` (`CaseMedia.heroSync`): hero com o mesmo pedido nos dois celulares — confirmação da Ana (cui-06) e fila da Denise (dui-03) — e, no meio, o evento da agenda (Sáb 12 set, 15:00, pedido #1042) com uma linha tracejada saindo dos furos do ticket até a linha do pedido em cada tela. Fundo em grade de mês (7 colunas × 5 semanas). Abaixo de 900px os celulares ficam lado a lado e o evento embaixo.
- `components/Lanes.tsx` (stage `lanes`): UI em raias — app da cliente em cima, painel da Denise embaixo, cada tela na coluna do passo; 5 ligações numeradas onde um lado decide o outro (catálogo, pagamento/agenda, capacidade, pedido, status) com a lista explicando. Rola de lado no mobile (`contain: inline-size` para não alargar a página).
- Wireframes: 12 telas em 6 colunas, pinos 1–6 + nota "+" (estados de exceção). Sem fantasmas.
- Galeria UI: estados S1–S5 em celulares. Miniatura da home: cui-01, cui-05, cui-06 v3.
- Copy: Exploração explica os pinos; UI menciona as raias e o hero; DS diz que só lotado é riscado.
- Verificado: typecheck ok, build ok, casado EN 1440 e PT 390 sem imagem quebrada nem rolagem horizontal; home, forge, investiq, aether, pulse sem imagem quebrada.
- Órfãos (não apagados): `casado/{en,pt}/cui-01..07`, `dui-01..05`, `cwire-01..07`, `dwire-01..05` na raiz de en/pt. Pasta `_tmp/` na raiz do projeto (rascunho da verificação: dist.tgz, v3sheet.png) — pode apagar.

## Reloop — hi-fi v3 + mockups + wireframes (2026-09-29)

Figma (4cvW112sMf86LOrjFHgb6G): páginas novas `Hi-Fi v3`, `Hi-Fi v3 · PT` (clones das seções de compra, disputa, mobile, estados e venda), `Wireframes · dark`, `Wireframes · dark · PT` e `Docs v3 · export` (Component Library EN/PT montada de instâncias). Hi-Fi originais intactos.
- v3: telas desktop com altura mínima de 900 (sidebar da venda preenche a altura); status bar 9:41 + home indicator nas 3 telas mobile; datas da disputa coerentes (a resposta vencia "dom 20 set" e a linha do tempo dizia 21 — agora seg 21 set nos dois lugares e no repasse); vendedor da jaqueta era @marina.brecho, agora @rafa.brecho (a persona vendedora é o Rafael) e o PT passou "a vendedora" para "o vendedor"; painel do vendedor ganhou o KPI Disputas = 1 ("Responder até seg, 21 set") e a jaqueta em disputa em "Precisa da sua atenção"; foto da jaqueta recortada (tinha um reflexo de janela no canto) em todas as telas.
- Export: `reloop/{en,pt}/v3/ui-01..14`, `m-1..3` (780x1688), `st-1..4`. As telas maiores foram exportadas em fatias e remontadas (o screenshot inline corta imagens grandes).
- Wireframes: clones recoloridos (cinzas neutros → escuro), cortados em 1440x1024, sidebar da venda até o fim → `reloop/{en,pt}/wire-v2/bwire-01..07`, `swire-01..05` (1240x882).
- Documentos no Figma (EN e PT): personas com a mesma altura; parágrafo de método virou card "Method/Método"; cards da análise competitiva com a mesma altura e o posicionamento na largura toda; jornada com as oportunidades alinhadas embaixo; mapa do site com a mesma altura; decisões e métricas exportadas só com os cards; notas de acessibilidade com linhas de mesma altura; PT da escala tipográfica encurtado (o Display/Hero estourava a borda).
- Export 1936/1440, fundo creme fora: personas (novo, no lugar de `problem`), research-definition, research-scan, insights, strategy, uxflow (rótulos do canvas repintados claros), metrics. ds-primitives/semantic/contrast/type viraram painéis creme arredondados; ds-components (novo) e ds-a11y já são painéis.

Site — linguagem própria (InvestIQ perspectiva, Aether leque, Pulse pilha, Forge slider, Casado evento sincronizado):
- `components/HangTag.tsx` (`CaseMedia.heroTag`): hero com a página do produto num navegador e o nível pendurado como etiqueta de brechó, presa no canto do navegador por um barbante; a etiqueta traz a escala inteira com "Good/Bom estado" marcado e a nota do vendedor. Balança de leve; parada com movimento reduzido. No mobile a etiqueta fica embaixo do navegador.
- `components/BadgeTrail.tsx` (stage `trail`): o mesmo selo seguido por seis telas reais (busca, produto, carrinho, pedido, disputa, anúncio do vendedor), cada uma recortada no ponto do selo e com o selo circulado, num trilho numerado com a troca "Quem compra → Quem vende". `markPt` ajusta o anel no PT. Rola de lado no mobile.
- Wireframes: 12 em navegador, 4 colunas, pinos 1–7 e uma nota "+" (disputa, mobile e estados que a rodada não tinha).
- Galeria UI em 6 colunas: 8 navegadores (span 3), 3 celulares (span 2), 4 estados. No mobile os celulares ficam 2 por linha (CaseStudy: span não força largura total em celular).
- Copy: Exploração explica os pinos; UI menciona a trilha e a etiqueta; PT "prazo da vendedora" → "do vendedor".
- Verificado: typecheck ok, build ok; reloop EN 1440 e PT 390 sem imagem quebrada nem rolagem horizontal; home, casado, forge, investiq, aether, pulse sem imagem quebrada.
- Órfãos (não apagados): `reloop/{en,pt}/ui-01..09`, `wire-01..06`, `problem.webp`.

## Limpeza de assets não usados (2026-09-29)
- Removidos 188 webp órfãos de `public/assets/cases/` (ui-/wire-/cui-/dui-/cwire-/dwire- antigos na raiz, `investiq/*/v2/ui-*` e states, `investiq/*/v3/ui-welcome`, `reloop/*/problem`) e a pasta `_tmp/`.
- Mantidos: `*-full.webp` (zoom sob demanda), `dist/`, `uploads/`, `assets/`, `Portfolio.dc.html`, `support.js`.
- Build e typecheck ok após a limpeza.

## Thumbnails dos cards da home (2026-09-29)
- Figma: nova página `Thumbnails` em cada arquivo de case (InvestIQ, Pulse, Aether, Forge, Casado, Reloop), com `Thumb — EN` e `Thumb — PT` a 1600×1000 feitos das telas Hi-Fi v3 (clones, não imagens).
  - InvestIQ: browser do home desktop + phone da estratégia IA + card do total consolidado destacado (verde).
  - Pulse: home do gerente comercial + 3 Insight Cards em leque (risco/oportunidade/no rumo).
  - Aether: 2 phones (treino e real) em órbitas, banners "treino" (lilás) e "real" (âmbar) destacados.
  - Forge: kit (modal, alertas, badges, tags, escalas blue/gray ligadas às variáveis) + board claro e escuro.
  - Casado: catálogo, retirada e dia da Denise em leque + horários destacados.
  - Reloop: página do produto + passo de classificação no phone + badge de estado ampliado.
- Site: `public/assets/cases/<id>/{en,pt}/thumb.webp`; `Thumb` virou `{ src, w, h }`; `media.ts` usa `cover(id)`; card com thumb 16:10 em cor cheia e zoom leve no hover (respeita reduced motion).
- Verificado: tsc/build ok, 6 capas carregando EN/PT, sem scroll horizontal em 390px.

## Performance — revisão e otimização (2026-09-29)
Medido com Playwright + CDP (1440×900, 160 passos de scroll com mouse em movimento), antes → depois:
- Frames longos (>50ms) no scroll: home 24 → 0; InvestIQ 154 → 4; Reloop 151 → 1; Pulse 109 → 1.
- Recalc de estilo no scroll: ~1,7–2,3s → ~0,2–0,4s por página.
Causas e correções:
- Backdrop: o drift do grid animava `background-position` em duas camadas fixas de tela inteira → repaint a cada frame. Agora anima `translate` (compositor), com 240px extras de grid embaixo.
- Barra de progresso: animava `width` (layout por frame) → `scaleX`.
- Parallax: `--pbx/--pby` eram escritas no `<html>` a cada movimento do mouse → restyle do documento todo. Agora só nos elementos `[data-parallax]` (backdrops, hero art, cenas de mockup) e só quando o valor muda.
- `useDims`: listener de scroll com `getBoundingClientRect` em todos os réguas → IntersectionObserver.
- Scroll spy: saiu do estado do App (re-render da página inteira a cada seção) para um store com `useSyncExternalStore`; só o header e o índice do case re-renderizam.
- `useViewport`: não cria objeto novo em resize se nenhum breakpoint mudou.
- Code splitting: CaseStudy + componentes de mockup + `media.ts` num chunk próprio, pré-carregado no idle. JS inicial 143 → 113 KB gzip. Sem React.lazy (suspenderia no 1º render e os efeitos de reveal rodariam sobre o placeholder).
- Capas dos cards: caminho em `data/covers.ts` (home não importa mais `media.ts`), todas `loading="lazy"`.
Verificado: tsc/build ok; reveals, réguas, índice ativo, parallax, voltar com scroll, troca EN/PT, clique rápido antes do prefetch, mobile sem scroll horizontal.
