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
    moveLine(currentSlide);
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
    const apply = () => {
        if (imgEl) {
            imgEl.style.opacity = 0;
            imgEl.src = slides[index].img;
            imgEl.alt = slides[index].alt;
            imgEl.onload = () => { imgEl.style.opacity = 1; };
        }
        if (slideTitleEl) {
            slideTitleEl.style.opacity = 0;
            slideTitleEl.textContent = slides[index].title;
            slideTitleEl.style.opacity = 1;
        }
        if (textEl) {
            textEl.style.opacity = 0;
            textEl.textContent = slides[index].text;
            textEl.style.opacity = 1;
        }
    };
    apply();
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

function changeHistory(index) {
    if (!historyData[index]) return;
    starItems.forEach(s => s.classList.remove('active'));
    if (starItems[index]) starItems[index].classList.add('active');
    if (historyTitleEl) historyTitleEl.textContent = historyData[index].title;
    if (historyTextEl) historyTextEl.textContent = historyData[index].text;
}

starItems.forEach(star => {
    star.addEventListener('click', () => {
        changeHistory(parseInt(star.dataset.index, 10));
    });
});
