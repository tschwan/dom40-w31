// Desktop- und Taskbar-Controller für Dominik OS 1986
window.DOMINIK_DESKTOP = (function () {
    let gridEl = null;
    let taskbarWindowItemEl = null;
    let clockEl = null;
    let startMenuEl = null;
    let startBtnEl = null;

    function getModuleFilename(mod) {
        return mod.filename;
    }

    function renderIcons() {
        if (!gridEl) return;
        gridEl.innerHTML = '';
        const modules = window.DOMINIK_DATA?.modules || [];
        modules.forEach(mod => {
            if (!mod.enabled) return;
            const displayName = getModuleFilename(mod);
            const iconEl = document.createElement('div');
            iconEl.className = 'desktop-icon';
            iconEl.setAttribute('data-id', mod.id);
            iconEl.innerHTML = `
                <div class="icon-box retro-raised">
                    <span class="material-symbols-outlined">${mod.icon}</span>
                </div>
                <div class="icon-label">${displayName}</div>
            `;
            iconEl.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.desktop-icon').forEach(el => el.classList.remove('selected'));
                iconEl.classList.add('selected');
                window.DOMINIK_STATE.openProgram(mod.id);
            });
            gridEl.appendChild(iconEl);
        });
    }

    function renderStartMenu() {
        if (!startMenuEl) return;
        const listEl = startMenuEl.querySelector('.start-menu-list');
        if (!listEl) return;
        listEl.innerHTML = '';
        const modules = window.DOMINIK_DATA?.modules || [];
        modules.forEach(mod => {
            if (!mod.enabled) return;
            const li = document.createElement('li');
            li.className = 'start-menu-item';
            li.innerHTML = `
                <span class="material-symbols-outlined">${mod.icon}</span>
                <span>${mod.menuLabel || mod.title}</span>
            `;
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                window.DOMINIK_STATE.openProgram(mod.id);
            });
            listEl.appendChild(li);
        });
    }

    function updateClock() {
        if (!clockEl) return;
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${hh}:${mm}:${ss}`;
    }

    function syncState(eventType, state) {
        if (state.isStartMenuOpen) {
            startMenuEl?.classList.add('open');
            startBtnEl?.classList.add('is-active');
        } else {
            startMenuEl?.classList.remove('open');
            startBtnEl?.classList.remove('is-active');
        }

        if (state.activeProgramId) {
            const mod = (window.DOMINIK_DATA?.modules || []).find(m => m.id === state.activeProgramId);
            if (mod && taskbarWindowItemEl) {
                const displayName = getModuleFilename(mod);
                taskbarWindowItemEl.style.display = 'flex';
                taskbarWindowItemEl.innerHTML = `
                    <span class="material-symbols-outlined" style="font-size:16px;">${mod.icon}</span>
                    <span>${displayName}</span>
                `;
                taskbarWindowItemEl.classList.add('is-active');
            }
        } else {
            if (taskbarWindowItemEl) {
                taskbarWindowItemEl.style.display = 'none';
                taskbarWindowItemEl.innerHTML = '';
            }
            document.querySelectorAll('.desktop-icon').forEach(el => el.classList.remove('selected'));
        }
    }

    function init() {
        gridEl = document.getElementById('desktop-grid');
        taskbarWindowItemEl = document.getElementById('taskbar-window-item');
        clockEl = document.getElementById('taskbar-clock');
        startMenuEl = document.getElementById('start-menu');
        startBtnEl = document.getElementById('start-btn');

        renderIcons();
        renderStartMenu();

        updateClock();
        setInterval(updateClock, 1000);

        startBtnEl?.addEventListener('click', (e) => {
            e.stopPropagation();
            window.DOMINIK_STATE.toggleStartMenu();
        });

        document.addEventListener('click', (e) => {
            if (!startMenuEl?.contains(e.target) && e.target !== startBtnEl) {
                window.DOMINIK_STATE.closeStartMenu();
            }
            if (!e.target.closest('.desktop-icon')) {
                document.querySelectorAll('.desktop-icon').forEach(el => el.classList.remove('selected'));
            }
        });

        window.DOMINIK_STATE.subscribe(syncState);
    }

    return {
        init: init
    };
})();
