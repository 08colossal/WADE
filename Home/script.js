/* ============= GSAP / REDUCE ============= */
const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const CAN_HOVER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const HAS_GSAP = typeof window.gsap !== 'undefined';
const HAS_ST = typeof window.ScrollTrigger !== 'undefined';
if (HAS_GSAP && HAS_ST) {
    gsap.registerPlugin(ScrollTrigger);
}
if (HAS_GSAP && typeof window.DrawSVGPlugin !== 'undefined') {
    gsap.registerPlugin(DrawSVGPlugin);
}

/* ============= SIDEBAR / HAMBURGER (visibilidade controlada por CSS: só mobile) ============= */
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const closeBtn = document.getElementById('sidebar-close');
const MOBILE_MAX = 768;

function openSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.add('open');
    overlay.classList.add('open');
}

function closeSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
}

if (hamburger) hamburger.addEventListener('click', openSidebar);
if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
if (overlay) overlay.addEventListener('click', closeSidebar);

/* Se a sidebar estiver aberta e a tela voltar ao desktop, fecha. */
window.addEventListener('resize', () => {
    if (window.innerWidth > MOBILE_MAX) closeSidebar();
    if (typeof currentSlide !== 'undefined' && typeof moveLine === 'function') {
        moveLine(currentSlide);
    }
});

/* ============= CAROUSEL ============= */
const slides = [
    {
        img: 'img/mascara.png',
        alt: 'Máscara capilar Rescue Wade Brasil',
        title: 'RESCUE MÁSCARA CAPILAR',
        text: 'A Máscara Capilar Rescue Wade Brasil foi desenvolvida com ativos de alta performance para promover uma hidratação ultra profunda. Penetra no córtex capilar, repondo massa, selando as cutículas e restaurando a elasticidade natural dos fios desde a primeira aplicação.'
    },
    {
        img: 'img/lava-roupa.png',
        alt: 'Lava roupas enzimático BlueSafe',
        title: 'LAVA ROUPAS ENZIMÁTICO',
        text: 'O Lava Roupas Enzimático BlueSafe foi desenvolvido com biotecnologia de alta performance. Preserva cores e tecidos com limpeza profunda e baixa espuma, aroma de alecrim e rendimento de até 25 lavagens.'
    },
    {
        img: 'img/shampoo.png',
        alt: 'Shampoo Rescue Wade Brasil',
        title: 'RESCUE SHAMPOO',
        text: 'O Shampoo Rescue Wade Brasil combina óleo de argan, proteína da seda e óleo de girassol para uma nutrição profunda. Limpa suavemente e deixa os fios com brilho, maciez e leveza.'
    },
    {
        img: 'img/condicionador.png',
        alt: 'Condicionador Rescue Wade Brasil',
        title: 'RESCUE CONDICIONADOR',
        text: 'O Condicionador Rescue Wade Brasil sela as cutículas e potencializa a nutrição profunda dos fios. Cabelos com brilho, maciez e leveza desde a primeira aplicação.'
    }
];

let currentSlide = 0;
let autoplay = null;
const dots = document.querySelectorAll('.dot');
const titles = document.querySelectorAll('.carousel-title');
const textEl = document.getElementById('carousel-text');
const slideTitleEl = document.getElementById('carousel-slide-title');
const lineEl = document.getElementById('carousel-line');
const imgEl = document.getElementById('carousel-img');
const imgWrap = document.getElementById('carousel-img-wrap');

/* ============= CARROSSEL 3D (GSAP hover na imagem) — só desktop com mouse ============= */
(function initCarousel3D() {
    if (!imgEl || typeof gsap === 'undefined') return;
    if (!CAN_HOVER) return;

    const MAX_TILT = 28;
    gsap.set(imgEl, { transformPerspective: 600, transformOrigin: '50% 50%' });

    function onMove(e) {
        const r = imgWrap.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        gsap.to(imgEl, {
            rotationY: (px - 0.5) * MAX_TILT * 2,
            rotationX: (0.5 - py) * MAX_TILT * 2,
            scale: 1.12,
            x: (px - 0.5) * 20,
            y: (py - 0.5) * 20,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    }

    function onLeave() {
        gsap.to(imgEl, {
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.5)',
            overwrite: 'auto'
        });
    }

    if (imgWrap) {
        imgWrap.addEventListener('mousemove', onMove);
        imgWrap.addEventListener('mouseleave', onLeave);
    }
    imgEl.addEventListener('mousemove', onMove);
    imgEl.addEventListener('mouseleave', onLeave);
})();

function moveLine(index) {
    if (!lineEl || !titles.length) return;
    const title = titles[index];
    const card = document.querySelector('.carousel-card');
    if (!title || !card) return;
    const cardRect = card.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    lineEl.style.left = (titleRect.left - cardRect.left) + 'px';
    lineEl.style.width = titleRect.width + 'px';
}

function changeSlide(index) {
    currentSlide = index;
    dots.forEach(d => d.classList.remove('active'));
    titles.forEach(t => t.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
    if (titles[index]) titles[index].classList.add('active');
    if (imgEl) {
        imgEl.style.opacity = 0;
        imgEl.src = slides[index].img;
        imgEl.alt = slides[index].alt;
        imgEl.onload = () => { imgEl.style.opacity = 1; };
    }
    if (slideTitleEl) {
        slideTitleEl.style.opacity = 0;
        slideTitleEl.textContent = slides[index].title;
        requestAnimationFrame(() => { slideTitleEl.style.opacity = 1; });
    }
    if (textEl) {
        textEl.style.opacity = 0;
        textEl.textContent = slides[index].text;
        requestAnimationFrame(() => { textEl.style.opacity = 1; });
    }
    moveLine(index);
}

function restartAutoplay() {
    if (autoplay) clearInterval(autoplay);
    autoplay = setInterval(() => {
        changeSlide((currentSlide + 1) % slides.length);
    }, 4000);
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        changeSlide(parseInt(dot.dataset.index, 10));
        restartAutoplay();
    });
});

titles.forEach(title => {
    title.addEventListener('click', () => {
        changeSlide(parseInt(title.dataset.index, 10));
        restartAutoplay();
    });
});

changeSlide(0);
restartAutoplay();
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => moveLine(currentSlide));
}

/* ============= ACCORDION ============= */
function toggleAccordion(header) {
    const item = header.closest('.accordion-item');
    if (!item) return;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

/* ============= HERO: SCRUB VIA GSAP SCROLLTRIGGER ============= */
const heroEl = document.querySelector('.hero');
const heroFrameEl = document.getElementById('hero-frame');
const HERO_FRAMES = 54;
const heroFrameUrls = [];
for (let i = 1; i <= HERO_FRAMES; i++) {
    heroFrameUrls.push('img/cafe/ezgif-frame-' + String(i).padStart(3, '0') + '.jpg');
}
let heroFrameIndex = 0;
let heroLastGoodSrc = heroFrameUrls[0];

/* 1) Pré-carrega os frames para a troca ser instantânea. */
if (heroEl && heroFrameEl) {
    heroFrameUrls.forEach(url => {
        const pre = new Image();
        pre.src = url;
    });
}

/* 2) Se um frame falhar ao carregar, mantém o último bom. */
if (heroFrameEl) {
    heroFrameEl.addEventListener('load', () => {
        heroLastGoodSrc = heroFrameEl.src;
    });
    heroFrameEl.addEventListener('error', () => {
        console.warn('Falha ao carregar frame do hero:', heroFrameEl.getAttribute('src'));
        if (heroFrameEl.src !== heroLastGoodSrc) heroFrameEl.src = heroLastGoodSrc;
    });
}

function applyHeroFrame(progress01) {
    if (!heroFrameEl) return;
    const index = Math.round(Math.min(Math.max(progress01, 0), 1) * (HERO_FRAMES - 1));
    if (index !== heroFrameIndex) {
        heroFrameIndex = index;
        heroFrameEl.src = heroFrameUrls[index];
    }
}

/* 3)+5) Scrub é movimento dirigido pelo usuário: funciona com prefers-reduced-motion.
   Janela espelha o JS puro: inicia em midHero − vh, termina em midHero. */
if (heroEl && heroFrameEl && HAS_GSAP && HAS_ST) {
    ScrollTrigger.create({
        trigger: heroEl,
        start: () => `${(heroEl.offsetHeight / 2) - window.innerHeight} top`,
        end: () => `${heroEl.offsetHeight / 2} top`,
        scrub: true,
        onUpdate(self) {
            applyHeroFrame(self.progress);
        }
    });

    /* 4) Resize recalcula a janela (start/end são funções) */
    let heroResizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(heroResizeTimer);
        heroResizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });

    applyHeroFrame(0);
    ScrollTrigger.refresh();
} else if (heroEl && heroFrameEl) {
    /* Fallback sem GSAP: mesma matemática antiga */
    function updateHeroFrameFallback() {
        const heroHeight = heroEl.offsetHeight || 1;
        const vh = window.innerHeight;
        const midHero = heroEl.offsetTop + heroHeight / 2;
        const progress = Math.min(Math.max((window.scrollY - (midHero - vh)) / vh, 0), 1);
        applyHeroFrame(progress);
    }
    window.addEventListener('scroll', updateHeroFrameFallback, { passive: true });
    window.addEventListener('resize', updateHeroFrameFallback);
    updateHeroFrameFallback();
}

/* Hero autoplay: no topo (hero tela cheia) a animação continua rodando.
   Quando o usuário rola, o scrub assume (reverse ok).
   REDUCE = sem autoplay, só scrub dirigido pelo scroll. */
const HERO_AUTOPLAY_MS = 80;
const HERO_TOP_THRESHOLD = 50;
let heroAutoTimer = null;
let heroAutoIdx = 0;

function heroAutoplayTick() {
    heroAutoIdx = (heroAutoIdx + 1) % HERO_FRAMES;
    if (!heroFrameEl) return;
    if (heroAutoIdx !== heroFrameIndex) {
        heroFrameIndex = heroAutoIdx;
        heroFrameEl.src = heroFrameUrls[heroAutoIdx];
    }
}

function syncHeroAutoplay() {
    if (!heroEl || !heroFrameEl || REDUCE) return;
    const atTop = window.scrollY <= HERO_TOP_THRESHOLD;
    if (atTop && !heroAutoTimer) {
        heroAutoIdx = heroFrameIndex;
        heroAutoTimer = setInterval(heroAutoplayTick, HERO_AUTOPLAY_MS);
    } else if (!atTop && heroAutoTimer) {
        clearInterval(heroAutoTimer);
        heroAutoTimer = null;
    }
}

window.addEventListener('scroll', syncHeroAutoplay, { passive: true });
syncHeroAutoplay();

/* ============= HISTÓRIA (TIMELINE) ============= */
const historyData = [
    {
        title: '2018 - Início da ideia',
        text: 'O fundador estuda mercados globais e observa o lento avanço da inovação e sustentabilidade no Brasil, gerando a inquietação que daria origem à empresa.'
    },
    {
        title: '2019 - Primeiros produtos',
        text: 'A visão ganha forma com o nascimento da Wade e o lançamento de seus primeiros produtos focados na área de nutrição e bem-estar.'
    },
    {
        title: '2025 - Expansão da marca',
        text: 'O grupo expande com a criação das marcas BeFarm e BlueSafe, além de conquistar a propriedade integral de seu aplicativo, garantindo independência tecnológica'
    },
    {
        title: '2026 - Início da parceria',
        text: 'Em 2026, inicia-se uma nova fase de desenvolvimento com a aproximação e parceria com o Biopark, um dos principais ecossistemas de inovação do Brasil. Essa união estabelece as bases estruturais para o futuro da empresa, focando em pesquisa, industrialização, desenvolvimento tecnológico, expansão sustentável e educação corporativa.'
    }
];

const historyTitleEl = document.getElementById('history-entry-title');
const historyTextEl = document.getElementById('history-entry-text');
const starItems = document.querySelectorAll('.star-item');
const historyProgressFill = document.getElementById('history-progress-fill');
const historyProgressEl = document.querySelector('.history-progress');
const starsContainer = document.querySelector('.stars-wrap .stars');

function layoutHistoryProgress() {
    if (!historyProgressEl || !starsContainer || starItems.length < 2) return;
    const first = starItems[0].getBoundingClientRect();
    const last = starItems[starItems.length - 1].getBoundingClientRect();
    const host = starsContainer.getBoundingClientRect();
    const left = first.left + first.width / 2 - host.left;
    const right = last.left + last.width / 2 - host.left;
    historyProgressEl.style.left = left + 'px';
    historyProgressEl.style.width = Math.max(0, right - left) + 'px';
}

function changeHistory(index) {
    if (!historyData[index]) return;
    starItems.forEach(s => s.classList.remove('active'));
    if (starItems[index]) starItems[index].classList.add('active');
    if (historyTitleEl) historyTitleEl.textContent = historyData[index].title;
    if (historyTextEl) historyTextEl.textContent = historyData[index].text;
    layoutHistoryProgress();
    if (historyProgressFill) {
        const n = historyData.length;
        const pct = n > 1 ? (index / (n - 1)) * 100 : 0;
        historyProgressFill.style.width = pct + '%';
    }
}

starItems.forEach(star => {
    star.addEventListener('click', () => {
        changeHistory(parseInt(star.dataset.index, 10));
    });
});

changeHistory(0);
window.addEventListener('resize', layoutHistoryProgress);

/* ============= MODAL FALE CONOSCO ============= */
(function () {
    const modalOverlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');
    const heroContactBtn = document.getElementById('hero-contact-btn');
    const tabs = document.querySelectorAll('.modal-tab');
    const panels = document.querySelectorAll('.modal-panel');

    const WHATSAPP_NUMBER = '555436015330';
    const EMAIL_TO = 'grupo.wade@gmail.com';
    const EMAIL_SUBJECT = 'WADE FEEDBACK';

    function openModal() {
        modalOverlay.hidden = false;
        modal.hidden = false;
        requestAnimationFrame(() => {
            modalOverlay.classList.add('open');
        });
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('open');
        setTimeout(() => {
            modalOverlay.hidden = true;
            modal.hidden = true;
        }, 300);
        document.body.style.overflow = '';
    }

    if (heroContactBtn) {
        heroContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    const faqContactBtn = document.getElementById('faq-contact-btn');
    if (faqContactBtn) {
        faqContactBtn.addEventListener('click', () => openModal());
    }

    window.WadeContact = { open: openModal, close: closeModal };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modalOverlay.hidden) closeModal(); });

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            panels.forEach(p => { p.hidden = true; });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const panel = document.querySelector('.modal-panel[data-tab="' + target + '"]');
            if (panel) panel.hidden = false;
        });
    });

    // WhatsApp form
    const waForm = document.getElementById('whatsapp-form');
    if (waForm) {
        waForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('wa-nome').value.trim();
            const assunto = document.getElementById('wa-assunto').value.trim();
            const text = encodeURIComponent(`"${assunto}" - ${nome}`);
            window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text, '_blank');
            closeModal();
        });
    }

    // Email form
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('email-nome').value.trim();
            const email = document.getElementById('email-email').value.trim();
            const assunto = document.getElementById('email-assunto').value.trim();
            const body = encodeURIComponent('Nome: ' + nome + '\nEmail: ' + email + '\nAssunto: ' + assunto);
            window.location.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + EMAIL_TO + '&su=' + encodeURIComponent(EMAIL_SUBJECT) + '&body=' + body;
            closeModal();
        });
    }

    // Avaliação - star rating
    const starRating = document.getElementById('star-rating');
    const estrelasInput = document.getElementById('aval-estrelas');
    const starBtns = starRating ? starRating.querySelectorAll('.star-btn') : [];

    starBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = parseInt(btn.dataset.value, 10);
            estrelasInput.value = value;
            starBtns.forEach(b => {
                const v = parseInt(b.dataset.value, 10);
                b.classList.toggle('active', v <= value);
                b.setAttribute('aria-pressed', v <= value ? 'true' : 'false');
            });
        });
    });

    // Avaliação - adicionar comentário
    const avalForm = document.getElementById('avaliacao-form');
    const lista = document.getElementById('avaliacao-lista');
    const btnAdd = document.getElementById('btn-add-comment');

    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            const nome = document.getElementById('aval-nome').value.trim() || 'Anônimo';
            const estrelas = parseInt(estrelasInput.value || '0', 10);
            const comentario = document.getElementById('aval-comentario').value.trim();

            if (!estrelas || !comentario) {
                alert('Selecione as estrelas e escreva um comentário.');
                return;
            }

            const item = document.createElement('div');
            item.className = 'avaliacao-item';
            const estrelasHtml = Array.from({ length: 5 }, (_, i) =>
                '<svg class="avaliacao-estrela" viewBox="0 0 24 24" aria-hidden="true"><path fill="' + (i < estrelas ? '#ffd700' : 'rgba(255,255,255,0.2)') + '" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
            ).join('');
            item.innerHTML =
                '<div class="avaliacao-header">' +
                '  <span class="avaliacao-nome">' + escapeHtml(nome) + '</span>' +
                '  <span class="avaliacao-estrelas">' + estrelasHtml + '</span>' +
                '</div>' +
                '<p class="avaliacao-comentario">' + escapeHtml(comentario) + '</p>';
            lista.appendChild(item);

            // Limpar campos do comentário (manter nome e estrelas)
            document.getElementById('aval-comentario').value = '';
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
})();

/* ============= VOLTAR AO TOPO ============= */
(function () {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    function sync() {
        const show = window.scrollY > 400;
        btn.classList.toggle('visible', show);
        btn.hidden = !show;
    }
    window.addEventListener('scroll', sync, { passive: true });
    sync();
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
