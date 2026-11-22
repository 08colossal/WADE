# WADE — Site (notas para continuar o trabalho)

> Última atualização: 21/11/2026  
> Lote executado: P0–P4 (GSAP + hero) · P8–P10 (login + auth) · Modal Fale Conosco · Footer · Fixes · **UX sections** · **Responsivo (§14)** · **Ajustes smartphone (§15)** · **Hero vídeo 31s (§19 atualizado)**  
> **Seção demo/bancada REMOVIDA** · **Pasta tutorial/ EXCLUÍDA** · **Link Tutorial no footer ainda no HTML (P5)**

## 1. Contexto

Réplica do protótipo do Figma como site estático funcional para o projeto WADE.
Site em **HTML + CSS + JS puro**, sem build.

- Idioma: **português (pt-br)**.
- Estilo: **fiel ao Figma**; mudanças visuais só sob pedido.
- Design de referência: `Desktop.svg` **working tree 1920×6099** (o commitado no git ainda é 4570 — desatualizado).

## 2. Estrutura (`Home/`)

| Arquivo/pasta | O quê |
|---------------|--------|
| `index.html` | Nav, hero, carrossel (**títulos + setas**), **benefícios**, história (+progresso), FAQ (+CTA), footer (badges+social), modal Fale Conosco, back-to-top, **sidebar com auth** |
| `style.css` | Visual + breakpoints (768/640/520/480) + modal + seções UX + responsivo §14 + **ajustes smartphone §15** |
| `script.js` | Sidebar, carrossel 3D (gate CAN_HOVER), **setas títulos**, accordion, hero, timeline, modal, back-to-top |
| `vendor/gsap/` | `gsap.min.js`, `ScrollTrigger.min.js`, `DrawSVGPlugin.min.js` (v3.15 local) |
| `img/` | Produtos, anos, `cafe/` (54 frames hero), `LOGIN.png` |
| `js/auth.js` | Auth local (`admin`/`wade123`) + **botões da sidebar** |
| `associados/` | stub destino "Associados" |
| `_baseline/` | Screenshots + `responsive/` (QA) |
| `Desktop.svg` | Protótipo Figma |
| `NOTES.md` | Este arquivo |

## 3. Design tokens

- `--ciano: #61C6C8`, `--roxo: #866CC4`, `--bg-dark: #1f1f1f`,
  `--bg-purple: #20153A`, `--bg-dark-purple: #322550`.
- Títulos/abas/botões: **'Special Gothic Expanded One'**; corpo: **'DM Sans'**.
- Hamburger só em ≤768px (CSS).

## 4. GSAP

- Vendor local; plugins `ScrollTrigger`, `DrawSVGPlugin`.
- `REDUCE` + `CAN_HOVER = matchMedia('(hover: hover) and (pointer: fine)')`.
- Carrossel 3D: tilt **só** se `CAN_HOVER`; touch = sem tilt.

## 5–6. Header / Login

- Header 50px + `env(safe-area-inset-top)`.
- **≤768:** `.user-menu` **oculto** — login só pela **sidebar** (botão único Entrar/Sair).
- **Desktop:** dropdown do header continua normal.
- Login = modal; `admin` / `wade123` (`window.WadeAuth`).

## 7. Modal "Fale Conosco"

- `window.WadeContact.open()` / `.close()`; abas WhatsApp · Email · Avaliação.
- `.modal` `max-height: 90dvh`; inputs `16px`.

## 8. Rodapé

- Fundo `#1a1a1a`.
- **≤768:** logo **centralizado** largura total · **Páginas | Contatos** lado a lado (2 col) · **Aplicativo** largura total embaixo com **badges lado a lado**.
- **Desktop:** 4 colunas (logo à esquerda) — inalterado.
- Contatos: WhatsApp, IG, YouTube, Gmail web; badges app SVG inline.
- Tutorial ainda no HTML (P5).

### Contatos

| Canal | Valor |
|-------|--------|
| WhatsApp | `wa.me/555436015330` |
| Instagram | `https://instagram.com/wade.brasil` |
| YouTube | `https://www.youtube.com/@wadebrasil` |
| Email | Gmail web → `grupo.wade@gmail.com` |
| App Store | `https://apps.apple.com/br/app/wade/id6751115079` |
| Google Play | `https://play.google.com/store/apps/details?id=com.wadebrasil.wade_mobile_android` |

## 9. Seções UX

| Bloco | Comportamento |
|-------|----------------|
| Benefícios | 3 cards MVV; fundo `#20153A` **travado** |
| Progresso história | trilho; some em ≤768 |
| CTA FAQ | botão abre modal + social-row |
| Social row / App badges | WA/IG/YT/Gmail; SVG offline-safe |
| Voltar ao topo | após `scrollY > 400`; safe-area |

## 10. Estado atual (feito)

- [x] GSAP local + hero autoplay + carrossel 3D (CAN_HOVER)
- [x] Login modal + auth + **sidebar auth**
- [x] Modal Fale Conosco
- [x] Rodapé + badges + social
- [x] Benefícios, progresso, back-to-top
- [x] Responsivo §14 (breakpoints, dvh, hover-gated, 80dvh/90dvh)
- [x] **Ajustes smartphone §15** (carrossel 1 linha, história, footer 2 col, login na sanduiche, hero 4/3, seções 80%)

## 11. Pendências

- [ ] **P5 Conteúdo real** — FAQ, grafia BeFarm/Befarm, links `#`, **remover Tutorial do footer HTML**
- [ ] **P6 GSAP base** — entradas de seção
- [ ] **P7 Destaque produto** (decidir)
- [ ] **P11 Polimento** — `cafe 2/`, `wade-fadeout/`, logo oficial
- [ ] **Páginas do rodapé** — `bluesafe/`, `befarm/`
- [x] **Vídeo do hero** — feito no §19 (`img/wade.mp4` → loop contínuo)

### Regras

| # | Regra |
|---|--------|
| 1 | Associados: deslogado → alerta; logado → `associados/index.html` |
| 2 | Rodapé "Páginas" → `<pasta>/index.html` |
| 3 | YouTube: `https://www.youtube.com/@wadebrasil` |
| 4 | Badges de app: SVG inline |
| 5 | Carousel slide: só fade opacidade |
| 6 | Ícone WhatsApp = handset (`M6.62...`) |
| 7 | Contatos rodapé: coluna vertical por item |
| 8 | Header desktop: nav-center absolute left 50% |
| 9 | Faixa MVV entre carrossel/história |
| 10 | **NÃO mexer** em `.benefits` |
| 11 | **NÃO mexer** em `.accordion-section` bg/inset |
| 12 | Breakpoints só: `768` · `640` · `520` · `480` |
| 13 | Carrossel 3D tilt = só `CAN_HOVER` |
| 14 | Accordion: `max-height: 80dvh` (+80vh) |
| 15 | Alvos de toque: não aumentar visual |
| 16 | Hover transform só em `(hover: hover) and (pointer: fine)` |
| 17 | Hero desktop = aspect-ratio 16/9; ≤768 = **4/3** (cover, corte topo/baixo ok); sem 100vh |
| 18 | Inputs form = 16px |
| 19 | safe-area header/back-to-top |
| 20 | **≤768:** títulos carrossel nowrap+scroll; user-menu oculto; footer **2 col** (logo centralizado topo, Páginas\|Contatos, Aplicativo full + badges lado a lado); sidebar com botão login único |
| 21 | **≤768:** história `justify-content: flex-start` + `min-height: 0`; estrelas 64px nowrap (56px ≤480) |
| 22 | **≤768:** hero = **4/3 cover**; outras seções **~80%**; sem min-height 100vh nas sections mobile |

### Textos MVV (Canva p.6)

| Card | Texto |
|------|--------|
| **Missão** | Desenvolver produtos de alta qualidade com tecnologia e responsabilidade, criando um ecossistema onde pessoas gerem renda e cresçam através de conexões reais. |
| **Visão** | Ser o maior ecossistema de comercialização inteligente do Brasil, referência em tecnologia, produtos e geração de renda para quem quer construir algo próprio. |
| **Valores** | Ser referência nacional na integração entre produtos, tecnologia e geração de renda, construindo uma rede sólida de pessoas e empresas. |

### Bugs corrigidos (histórico)

| Bug | Correção |
|-----|----------|
| Hero desktop 1600px | sem min-height que expande largura |
| Títulos carrossel 2 linhas | nowrap + scroll (sem setas) |
| História buraco texto×estrelas | margens menores + flex-start + min-height 0 |
| Estrelas 2 linhas mobile | 64px/56px + nowrap |
| Footer 1 coluna mobile | 2 col + logo centralizado + app badges lado a lado |
| Login inacessível no mobile | botão único na sidebar; user-menu oculto ≤768 |
| Hero mobile 100vh com barras pretas | hero 4/3 cover; conteúdo ok |
| Seções mobile grandes demais | paddings/fontes/cards ~80% ≤768/480 |
| História mobile com buraco/estrelas 2 linhas | flex-start + min-height 0 + estrelas 64px/56px nowrap |

## 12. Como testar

```bash
python3 -m http.server 8080 --directory Home
```

### Playwright (WSL)

- Chromium: `/home/giovana/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell`
- `playwright-core` em `/mnt/c/Users/Giovana/AppData/Local/Temp/opencode/pwcheck/node_modules/`
- `NODE_PATH=.../pwcheck/node_modules node script.js`
- Ports: 8776–8852; próximo ~8853
- Screenshots → `_baseline/responsive/`
- Checker: overflow + page errors + `node -c script.js` + `node -c js/auth.js`

### Viewports

| Perfil | Viewport |
|--------|----------|
| Celular | `360×740`, `390×844`, `414×896` |
| Tablet | `768×1024`, `820×1180`, `1024×768` |
| Desktop | `1440×900` |

## 13. Ambiente

- Repo: `C:\Users\Giovana\Documents\GITHUB\WADE\` (`Home/`).
- Windows + WSL; Chromium Playwright Linux headless.

## 14. Responsivo — EXECUTADO

> Plano §14 completo: breakpoints, `100dvh`, hover-gated, accordion `80dvh`, modal `90dvh`, safe-area, touch-action, inputs 16px.  
> QA: overflow 0, 0 erros, tilt só desktop. Screenshots em `_baseline/responsive/`.

## 15. Ajustes smartphone — EXECUTADO (04/10/2026)

### 15.1 Carrossel — títulos 1 linha

- `.carousel-titles-wrap` + `.carousel-titles` (`nowrap`, `overflow-x: auto`, scroll-snap, scrollbar oculta)
- Sem setas — títulos rolam por scroll horizontal natural
- Título escondido ("Condicionador") acessível pelo scroll

### 15.2 Nossa história

- ≤768: `.solutions { justify-content: flex-start; padding-top: 48px; min-height: 0 }`
- `.history-title` mb 28px; `.history-entry-text` mb 16px
- Estrelas: **64px** ≤768, **56px** ≤480; `flex-wrap: nowrap`; gap 10px/8px

### 15.3 Footer ≤768

```
[Logo Wade Brasil — centralizado, largura total]
[Páginas] [Contatos]
[App Store] [Google Play]   ← badges lado a lado
```

- `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)`
- `.footer-logo { text-align: center; grid-column: 1 / -1 }`
- `.footer-col:last-child { grid-column: 1 / -1 }`
- `.app-badges { flex-direction: row; flex-wrap: wrap }`
- `.footer-contact span { overflow-wrap: anywhere }` (email não transborda)
- Desktop 4 colunas **inalterado**

### 15.4 Login na sanduiche

- HTML: `.sidebar-login-btn` botão único (Entrar/Sair)
- CSS: `.sidebar-login-btn` no fim da sidebar (margin-top auto)
- JS (`auth.js`): bind alterna Entrar (abre modal) / Sair (logout); fecha sidebar ao agir
- Desktop mantém dropdown do header

### 15.5 QA — resultados

| VP | overflow | títulos | estrelas | footer cols | logo | user-menu | sidebar login | erros |
|----|----------|---------|----------|-------------|------|-----------|---------------|-------|
| 360 | 0 | 1 linha | 1 linha | 139=139 | center | oculto | Entrar | 0 |
| 390 | 0 | 1 linha | 1 linha | 152=152 | center | oculto | Entrar | 0 |
| 414 | 0 | 1 linha | 1 linha | 162=162 | center | oculto | Entrar | 0 |
| 768 | 0 | 1 linha | 1 linha | 307=307 | center | oculto | Entrar | 0 |
| 1440 | 0 | 1 linha | 1 linha | 4 col | left | visível | dropdown | 0 |

### 15.6 Arquivos alterados

| Arquivo | Mudança |
|---------|---------|
| `Home/index.html` | wrap carrossel (sem setas); `.sidebar-login-btn` |
| `Home/style.css` | hero 4/3 + conteúdo; seções ~80% ≤768/480; história flex-start + estrelas 64px; footer 2 col + app badges row |
| `Home/script.js` | `initCarouselTitlesNav` |
| `Home/js/auth.js` | bind sidebar-login-btn + applySessionUI |
| `Home/NOTES.md` | §15 |
| `_baseline/responsive/fix_*` | screenshots QA |

**Não tocado:** `.benefits`, accordion bg, contatos/badges, breakpoints novos, dots, autoplay, layout desktop.


## 16. Fundo do hero fixo — EXECUTADO (14/10/2026)

### 16.1 Comportamento

- `.hero-seq` passou de `position: absolute` (dentro do hero) para **`position: fixed`** com `z-index: -1`.
- A imagem do hero fica **parada na tela**; ao rolar, o conteúdo sobe por cima e as seções a cobrem.
- Efeito visível enquanto o hero rola; depois disso as seções opacas escondem o fundo (nenhuma seção transparente).

### 16.2 Mudanças (`Home/style.css`)

| Regra | Antes | Depois |
|-------|-------|--------|
| `.hero` | `background: var(--bg-dark)` | `background: transparent` (senão taparia a camada fixa) |
| `.hero-seq` | `position: absolute; inset: 0; z-index: 0` | `position: fixed; top/left/right: 0; z-index: -1` |
| `.hero-seq` | — | `aspect-ratio: 16/9` (igual ao `.hero`, composição idêntica no topo) |
| `@media ≤768` | — | `.hero-seq { aspect-ratio: 4/3 }` |
| `@media ≤480` | — | `.hero-seq { aspect-ratio: 4/3 }` |

### 16.3 Por que funciona (stacking)

- Todas as seções (`.carousel-section`, `.benefits`, `.solutions`, `.accordion-section`, `.footer`) são **não-posicionadas e opacas** → pintam acima de `z-index: -1`.
- Nenhuma regra usa `z-index` negativo → nada é escondido por engano.
- `.hero` é `position: relative` **sem transform/filter/will-change** → não vira containing block e não corta o filho `fixed` (o `overflow: hidden` não se aplica a fixed).
- Scrub de frames (`script.js`) intacto: o gatilho é a caixa `.hero`, que mantém `aspect-ratio`.

### 16.4 QA (14/10/2026)

| Perfil | seq×hero | seq.top (meio/pós-hero) | overflow | erros |
|--------|----------|-------------------------|----------|-------|
| 1440×900 | 1440×810 = 810 | 0 / 0 | 0 | 0 |
| 768×1024 | 768×576 = 576 | 0 / 0 | 0 | 0 |
| 390×844 | 390×293 = 293 | 0 / 0 | 0 | 0 |

Screenshots em `/tmp/opencode/qa-hero/` (top / mid-hero / after-hero / footer).

**Risco aceito:** se uma seção futura nascer transparente, o fundo do hero aparecerá atrás dela.

## 17. Fundo da seção carrossel REMOVIDO (guardado) — 14/10/2026

- `.carousel-section` ficou **transparente**: `background`/`background-image`/`size`/`position`/`repeat`
  (roxo `--bg-purple` + `img/Bolhas-fundo.png`) foram **comentados no próprio `style.css`**, logo acima de `display:flex`.
- **Para restaurar:** descomentar o bloco `FUNDO ORIGINAL` em `.carousel-section` (`Home/style.css:941`).
- A imagem `img/Bolhas-fundo.png` **não foi apagada**.
- Efeito colateral: a seção agora deixa passar o **fundo fixo do hero** (§16) nas ~810px superiores da viewport
  (16/9) e o `--bg-dark` do `body` abaixo — existe um corte horizontal visível nessa altura.
- QA 14/10: `background-color: rgba(0,0,0,0)`, `background-image: none`, overflow 0, 0 erros (1440 e 390).

**Não tocado:** `.carousel-card` (fundo translúcido + blur), bubbles (`display:none`), dots, autoplay, layout.

## 18. Vídeo do hero encaixa na página — 14/10/2026

- **Problema:** o layer fixo (§16) usava `aspect-ratio: 16/9` → em viewport mais alta que 16/9
  (ex.: 1440×900) ele só cobria 810px e o resto mostrava o `--bg-dark` do body → **faixa/corte horizontal**
  (pior em mobile: 4/3 = ~293px de 844).
- **Correção (`Home/style.css`):**
  - `.hero-seq` → `inset: 0` (viewport inteira), **sem** `aspect-ratio`.
  - `.hero-seq img` → `object-fit: cover; object-position: center` (era `contain` + `right center`).
  - Removidos os overrides `.hero-seq { aspect-ratio: 4/3 }` dos breakpoints ≤768 e ≤480
    (`.hero` continua 16/9 / 4/3 — só a caixa do hero; o fundo agora ignora isso).
- **QA (14/10):** 1440×900 · 1920×1080 · 768×1024 · 390×844 — em 4 pontos de scroll cada:
  `hero-seq` cobre a viewport inteira (`top=0, bottom=vh`) em **todos**, overflow 0, 0 erros.
  Screenshots em `/tmp/opencode/qa-fit/`.
- Efeito: o vídeo/fundo acompanha a página inteira; seções opacas continuam cobrindo (história/MVV/FAQ/footer).

## 19. Hero = vídeo real em loop (`img/wade.mp4`) — EXECUTADO (14/10/2026)

### 19.1 Motivo

Os 54 JPGs de `img/cafe/` tinham fim ao rolar (scrub de ~1 tela) e o fundo "acabava".
Substituídos por **vídeo MP4 em loop contínuo** — não depende da rolagem, não acaba.

### 19.2 Arquivos

| Arquivo | Origem / obs |
|---------|--------------|
| `img/wade.mp4` | original do usuário (1920×1080, 23,976fps, 39,8s, 13,3MB, **com áudio AAC**) — **mantido intacto** |
| `img/wade-silent.mp4` | **yt-dlp + ffmpeg** (YouTube btlWpBqeHs4, 0–31s, `-c:v libx264 -crf 23 -an -movflags +faststart`, H.264 3840×2160) → **~46MB** |
| `img/wade-poster.jpg` | frame em **t=3s** (pacote de café) — frame 0 era só gradiente, descartado |
| `img/cafe/` (54 JPGs, 7,3MB) | **guardado**, fora de uso |

### 19.3 Mudanças

- **`Home/index.html`**
  - preload → `img/wade-poster.jpg`
  - `<img id="hero-frame">` → `<video id="hero-video" autoplay muted loop playsinline preload="metadata" poster>` + `<source src="img/wade-silent.mp4" type="video/mp4">`
  - `muted`+`playsinline` obrigatórios p/ autoplay iOS.
- **`Home/style.css`**
  - `.hero-seq img` → `.hero-seq video` (base). Removida a regra duplicada do breakpoint ≤768 (base já faz `cover`/`center`).
- **`Home/script.js`** — bloco de frames **removido** (linhas 200–305 antigos: `HERO_FRAMES`, preload de 54 imgs, `applyHeroFrame`, ScrollTrigger de scrub, fallback de scroll, autoplay `80ms`). No lugar:
  ```js
  if (heroVideo && REDUCE) { pause(); currentTime = 3; }  // frame do poster
  ```
  `HAS_GSAP`/`HAS_ST`/`registerPlugin` mantidos (usados pelo resto).

### 19.4 QA (14/10/2026)

| Perfil | readyState | duração | loop | tocando ao rolar | cobre viewport | overflow | erros |
|--------|-----------|---------|------|------------------|----------------|----------|-------|
| 1440×900 | 4 | 31s | ✅ | ✅ | ✅ | 0 | 0 |
| 768×1024 | 4 | 31s | ✅ | ✅ | ✅ | 0 | 0 |
| 390×844 | 4 | 31s | ✅ | ✅ | ✅ | 0 | 0 |
| `reducedMotion` | — | — | — | **pausado em t=3** | — | 0 | 0 |

### 19.5 Atenção (servidor de QA)

- `python3 -m http.server` **não suporta Range** → `video.seekable=[0,0]` e o `currentTime=3`
  do REDUCE não aplica (o autoplay normal funciona). Para QA de vídeo use um servidor com Range:
  `python3 /tmp/opencode/range_server.py Home 8857` (feito nesta sessão).
- Em produção (GitHub Pages/Netlify/Vercel) Range funciona normalmente.

### 19.6 Pendências atualizadas

- [x] **Vídeo do hero** (era P/end) — feito no §19.
- [ ] **P11 Polimento** — `cafe 2/`, `wade-fadeout/`, logo oficial · **`img/cafe/` (7,3MB) pode ser apagado quando validar**

## 20. Layout mobile: cada combo ocupa uma tela (21/11/2026)

### 20.1 Objetivo
Em mobile (≤800px e ≤480px), cada combinação de conteúdo deve preencher exatamente 100% da altura do viewport (descontando o header fixo de 50px).

### 20.2 Combos e alturas

| Tela | Combo | Seções CSS | Altura mobile |
|------|-------|------------|---------------|
| 1 | Hero + Carrossel | `.hero` + `.carousel-section` | 45% / 55% (`calc((100vh - 50px) * 0.45)` / `* 0.55`) |
| 2 | Missão (MVV) | `.benefits` | 100% (`calc(100vh - 50px)`) |
| 3 | Nossa história | `.solutions` | 100% (`calc(100vh - 50px)`) |
| 4 | Dúvidas + FAQ CTA | `.accordion-section` | 100% (`calc(100vh - 50px)`) |

### 20.3 Header transparente em mobile
Em `@media (max-width: 800px)` e `@media (max-width: 480px)`:
- `.header { background: transparent; }` — remove a barra cinza-escura (`#1f1f1f`), deixando apenas o hambúrguer visível sobre o conteúdo.

### 20.4 Centralização do carrossel (Tela 1)
Em `@media (max-width: 800px)` e `@media (max-width: 480px)`:
- `.carousel-content`: `display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%` — centraliza imagem, título e texto vertical e horizontalmente na seção carrossel.

### 20.5 Nossa História — texto centralizado e estrelas no rodapé (Tela 3)
Em `@media (max-width: 800px)` e `@media (max-width: 480px)`:
- `.solutions`: `display: flex; flex-direction: column; justify-content: space-between; text-align: center`
- `.history-title`: `margin-top: 50px`
- `.stars-wrap`: `margin-bottom: 50px`

### 20.6 Alterações em `Home/style.css`
- `@media (max-width: 800px)` (era 768px):
  - `.hero`: `height: calc((100vh - 50px) * 0.45)`, removido `aspect-ratio: 4/3`
  - `.carousel-section`: `height: calc((100vh - 50px) * 0.55)`
  - `.carousel-content`: centralizado vertical/horizontal (`flex + align-items/justify-content center`)
  - `.solutions`: `min-height: calc(100vh - 50px); display: flex; flex-direction: column; justify-content: space-between; text-align: center`
  - `.history-title`: `margin-top: 50px`
  - `.stars-wrap`: `margin-bottom: 50px`
  - `.benefits`: `min-height: calc(100vh - 50px)`
  - `.accordion-section`: `min-height: calc(100vh - 50px)`
  - `.header`: `background: transparent`

- `@media (max-width: 480px)`:
  - Mesmas regras acima

### 20.7 O que NÃO foi alterado
- `index.html` — estrutura mantida
- Desktop (>800px) — layout inalterado
- Proporção Hero/Carrossel: 45%/55%

### 20.8 QA sugerido
Testar em viewports 360×740, 390×844, 414×896, 768×1024, 800×1280:
- Cada combo preenche a tela sem scroll interno excessivo
- Header mostra só hambúrguer, sem barra cinza
- Carrossel centralizado na sua metade da tela
- Nossa História: título e texto centralizados, estrelas no rodapé com 50px de margem
- Rola suavemente entre combos

## 21. Integração Sanity CMS (22/11/2026)

### 21.1 Objetivo
Substituir conteúdo hardcoded (carrossel e história) por dados gerenciáveis via Sanity CMS, permitindo adicionar/editar itens sem tocar no código.

### 21.2 Estrutura do Sanity

| Item | Detalhes |
|------|----------|
| Project ID | `ffzcsfow` |
| Dataset | `production` |
| Studio | `studio-wade/` (raiz do repo, irmão de `Home/`) |
| Deploy Studio | Sanity Cloud (URL: `https://ffzcsfow.sanity.studio`) |
| API Token | Configurado (permissão de leitura/escrita) |

### 21.3 Schemas criados

**`carouselItem`** (`studio-wade/schemaTypes/carouselItem.ts`):
- `title` (string) — Título do slide
- `subtitle` (string) — Subtítulo / nome do produto
- `description` (text) — Descrição completa
- `image` (image, aceita PNG) — Imagem do produto
- `order` (number) — Ordem de exibição

**`historyItem`** (`studio-wade/schemaTypes/historyItem.ts`):
- `date` (string) — Data / Ano (ex: "2018")
- `title` (string) — Título da estrela
- `text` (text) — Texto da história
- `image` (image, opcional) — Imagem da estrela
- `order` (number) — Ordem de exibição

### 21.4 Conteúdo populado via API

4 itens de carrossel + 4 itens de história criados via mutations API.

### 21.5 Alterações no Frontend (`Home/`)

**`index.html`** (linha 20):
```html
<script src="https://cdn.jsdelivr.net/npm/@sanity/client@6/dist/sanity-client.min.js"></script>
```

**`script.js`** — principais adições:
- Cliente Sanity inicializado no topo (`SANITY_PROJECT_ID`, `SANITY_DATASET`)
- `fetchCarouselItems()` / `fetchHistoryItems()` — buscam dados via GROQ
- `fallbackSlides` / `fallbackHistoryData` — fallback se Sanity indisponível
- `initCarousel()` / `initHistory()` — inicializam carrossel e história no `DOMContentLoaded`
- `renderCarousel()` / `renderHistoryStars()` — renderizam dinamicamente
- Fallback automático se Sanity falhar (conteúdo hardcoded mantido como backup)

### 21.6 Como adicionar nova estrela na História (fluxo)

1. Acessar `https://ffzcsfow.sanity.studio`
2. Criar novo documento `historyItem`
3. Preencher: `date` (ex: "2027"), `title`, `text`, `order` (inteiro)
4. Publicar
5. Recarregar site → nova estrela aparece automaticamente

### 21.7 Studio Sanity

**Local:** `studio-wade/` (raiz do repo)
**Deploy:** Sanity Cloud — rodar no Windows:
```cmd
cd C:\Users\Giovana\Documents\GITHUB\WADE\studio-wade
npx sanity deploy
```
**URL do Studio:** `https://ffzcsfow.sanity.studio`

### 21.8 Próximos passos (possíveis)

- Adicionar campo `image` no carrossel (upload PNG no Studio)
- Schema para contatos/footer (`contactInfo`)
- Preview em tempo real (Sanity Presentation)

### 21.9 FAQ Schema — `faqItem` (22/11/2026)

**Schema:** `studio-wade/schemaTypes/faqItem.ts`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `question` | string | Sim | Pergunta exibida no FAQ |
| `answer` | text | Sim | Resposta completa |
| `order` | number | Sim | Ordem de exibição |
| `isVisible` | boolean | Não | Controla se aparece no site (padrão: true) |

**Frontend (`script.js`):**
- `fetchFaqItems()` — busca itens visíveis ordenados por `order`
- `fallbackFaqItems` — fallback se Sanity indisponível
- `initFaq()` — inicializa no `DOMContentLoaded`
- `renderFaq()` — atualiza accordions existentes e cria novos dinamicamente se houver mais itens no Sanity

**Conteúdo inicial populado (5 itens):**
1. "Os produtos WADE são sustentáveis?"
2. "Os produtos são testados em animais?"
3. "Onde posso comprar produtos WADE?"
4. "Como me tornar um revendedor WADE?"
5. "Os produtos possuem orientação de uso?"

**Como editar/adicionar FAQ no Studio:**
1. Acessar `https://wade.sanity.studio`
2. Criar/editar documento `faqItem`
3. Preencher: `question`, `answer`, `order`, `isVisible`
5. Publicar → aparece no site automaticamente (sem deploy do site)

**Como adicionar nova pergunta:**
1. No Studio, criar novo `faqItem`
2. Definir `order` (inteiro crescente)
3. Publicar → novo accordion aparece automaticamente no site
