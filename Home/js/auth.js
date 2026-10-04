/* ============= AUTH LOCAL (sem API) ============= */
(function () {
    const STORAGE_KEY = 'wade_session';
    const USERS = {
        admin: { password: 'wade123', role: 'admin', name: 'admin' }
    };

    const els = {
        userBtn: document.getElementById('user-btn'),
        dropdown: document.getElementById('user-dropdown'),
        menuLogin: document.getElementById('menu-login'),
        menuAssociado: document.getElementById('menu-associado'),
        menuLogout: document.getElementById('menu-logout'),
        form: document.getElementById('login-form'),
        userInput: document.getElementById('login-user'),
        passInput: document.getElementById('login-pass'),
        error: document.getElementById('login-error'),
        hint: document.getElementById('login-hint'),
        ok: document.getElementById('login-ok'),
        okMsg: document.getElementById('login-ok-msg'),
        loginOverlay: document.getElementById('login-overlay'),
        loginModal: document.getElementById('login-modal'),
        loginClose: document.getElementById('login-close')
    };

    function getSession() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            const data = JSON.parse(raw);
            if (!data || !data.user) return null;
            return data;
        } catch (e) {
            return null;
        }
    }

    function setSession(session) {
        try {
            if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
            else localStorage.removeItem(STORAGE_KEY);
        } catch (e) { /* private mode etc. */ }
    }

    function login(username, password) {
        const key = String(username || '').trim().toLowerCase();
        const user = USERS[key];
        if (!user || user.password !== password) return null;
        const session = {
            user: key,
            name: user.name,
            role: user.role,
            at: Date.now()
        };
        setSession(session);
        return session;
    }

    function logout() {
        setSession(null);
    }

    function closeDropdown() {
        if (!els.dropdown || !els.userBtn) return;
        els.dropdown.hidden = true;
        els.userBtn.setAttribute('aria-expanded', 'false');
    }

    function openDropdown() {
        if (!els.dropdown || !els.userBtn) return;
        els.dropdown.hidden = false;
        els.userBtn.setAttribute('aria-expanded', 'true');
    }

    function toggleDropdown() {
        if (!els.dropdown) return;
        if (els.dropdown.hidden) openDropdown();
        else closeDropdown();
    }

    function applySessionUI(session) {
        const logged = !!session;
        if (els.menuLogin) els.menuLogin.hidden = logged;
        if (els.menuLogout) els.menuLogout.hidden = !logged;
        if (els.hint) els.hint.hidden = logged;
        if (els.form) els.form.hidden = logged;
        if (els.ok) els.ok.hidden = !logged;
        if (logged && els.okMsg) {
            els.okMsg.textContent = 'Sessão ativa: ' + (session.name || session.user) + '.';
        }
        if (els.userBtn) {
            els.userBtn.classList.toggle('is-logged', logged);
            els.userBtn.setAttribute('aria-label', logged ? 'Conta: ' + session.user : 'Conta');
        }
    }

    function showError(show) {
        if (els.error) els.error.hidden = !show;
    }

    /* ----- Bolhas: usando background-image no CSS ----- */
    function initBubbles() {
        // Bolhas agora são background-image em .login-section (CSS)
    }

    /* ----- Modal Login ----- */
    function openLogin() {
        if (!els.loginOverlay || !els.loginModal) return;
        els.loginOverlay.hidden = false;
        els.loginModal.hidden = false;
        requestAnimationFrame(() => {
            els.loginOverlay.classList.add('open');
        });
        document.body.style.overflow = 'hidden';
        setTimeout(() => { if (els.userInput) els.userInput.focus(); }, 350);
    }

    function closeLogin() {
        if (!els.loginOverlay || !els.loginModal) return;
        els.loginOverlay.classList.remove('open');
        setTimeout(() => {
            els.loginOverlay.hidden = true;
            els.loginModal.hidden = true;
        }, 300);
        document.body.style.overflow = '';
    }

    /* ----- Events ----- */
    if (els.userBtn) {
        els.userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });
    }
    document.addEventListener('click', (e) => {
        if (!els.dropdown || els.dropdown.hidden) return;
        if (els.userBtn && els.userBtn.contains(e.target)) return;
        if (els.dropdown.contains(e.target)) return;
        closeDropdown();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDropdown();
            if (els.loginOverlay && !els.loginOverlay.hidden) closeLogin();
        }
    });

    if (els.menuLogin) {
        els.menuLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeDropdown();
            openLogin();
        });
    }
    if (els.menuAssociado) {
        els.menuAssociado.addEventListener('click', () => {
            closeDropdown();
            if (!getSession()) {
                alert('Você não tem acesso a esta página');
                return;
            }
            window.location.href = 'associados/index.html';
        });
    }
    if (els.loginClose) {
        els.loginClose.addEventListener('click', closeLogin);
    }
    if (els.loginOverlay) {
        els.loginOverlay.addEventListener('click', (e) => {
            if (e.target === els.loginOverlay) closeLogin();
        });
    }
    if (els.menuLogout) {
        els.menuLogout.addEventListener('click', () => {
            logout();
            applySessionUI(null);
            closeDropdown();
        });
    }

    if (els.form) {
        els.form.addEventListener('submit', (e) => {
            e.preventDefault();
            showError(false);
            const u = els.userInput ? els.userInput.value : '';
            const p = els.passInput ? els.passInput.value : '';
            const session = login(u, p);
            if (!session) {
                showError(true);
                if (els.passInput) els.passInput.value = '';
                return;
            }
            applySessionUI(session);
            if (els.userInput) els.userInput.value = '';
            if (els.passInput) els.passInput.value = '';
            setTimeout(closeLogin, 600);
        });
    }

    /* init */
    applySessionUI(getSession());
    initBubbles();

    /* expõe para testes/debug */
    window.WadeAuth = { login, logout, getSession, USERS };
})();
