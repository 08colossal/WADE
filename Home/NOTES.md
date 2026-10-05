# WADE — Site (notas para continuar o trabalho)

> Última atualização: 04/10/2026  
> Lote executado: P0–P4 (GSAP + hero) · P8–P10 (login + auth) · Modal Fale Conosco · Footer · Fixes · **UX sections** · **Responsivo (§14)** · **Ajustes smartphone (§15)**  
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
- [ ] **Vídeo do hero**

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

