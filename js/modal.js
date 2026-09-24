// Single-Active-Window Modal Framework
window.DOMINIK_MODAL = (function () {
    let overlayEl = null;
    let windowEl = null;
    let titleLeftEl = null;
    let bodyEl = null;
    let closeBtnEl = null;
    let statusLeftEl = null;
    let statusRightEl = null;

    window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

    function renderActiveProgram(programId) {
        if (!overlayEl || !windowEl) return;
        if (!programId) {
            overlayEl.classList.remove('open');
            bodyEl.innerHTML = '';
            windowEl.removeAttribute('data-program');
            return;
        }

        const mod = (window.DOMINIK_DATA?.modules || []).find(m => m.id === programId);
        if (!mod) {
            console.warn('Module not found:', programId);
            return;
        }

        windowEl.setAttribute('data-program', programId);
        // Set dimensions & title
        const targetMaxWidth = mod.maxWidth || '800px';
        windowEl.style.setProperty('--window-max-width', targetMaxWidth);
        windowEl.style.maxWidth = window.innerWidth <= 768 ? '100%' : targetMaxWidth;
        if (titleLeftEl) {
            titleLeftEl.innerHTML = `
                <span class="material-symbols-outlined">${mod.icon}</span>
                <span>${mod.title}</span>
            `;
        }
        if (statusLeftEl) {
            statusLeftEl.textContent = `${mod.filename} | Bereit`;
        }
        if (statusRightEl) {
            statusRightEl.textContent = 'DOMINIK-OS 40.0';
        }

        // Render module content
        bodyEl.innerHTML = '';
        const moduleHandler = window.DOMINIK_MODULES[programId];
        if (moduleHandler && typeof moduleHandler.render === 'function') {
            try {
                moduleHandler.render(bodyEl);
            } catch (err) {
                console.error(`Error rendering module ${programId}:`, err);
                bodyEl.innerHTML = `
                    <div style="padding: 20px; color: #ba1a1a;">
                        <strong>FEHLER BEIM LADEN DES MODULS:</strong><br>
                        ${err.message}
                    </div>
                `;
            }
        } else {
            bodyEl.innerHTML = `
                <div style="padding: 24px; text-align: center;">
                    <span class="material-symbols-outlined" style="font-size: 48px; color: #000080; margin-bottom: 8px;">construction</span>
                    <h3 style="margin-bottom: 8px;">${mod.title}</h3>
                    <p style="color: #464653; font-size: 12px; margin-bottom: 16px;">
                        Modul ${mod.filename} wird geladen oder befindet sich in Vorbereitung.
                    </p>
                    <button class="retro-raised-btn" style="padding: 6px 16px; font-weight: bold;" onclick="window.DOMINIK_STATE.closeProgram()">Schließen</button>
                </div>
            `;
        }

        overlayEl.classList.add('open');
    }

    function init() {
        overlayEl = document.getElementById('window-modal-overlay');
        windowEl = document.getElementById('active-retro-window');
        titleLeftEl = document.getElementById('window-title-left');
        bodyEl = document.getElementById('window-body-container');
        closeBtnEl = document.getElementById('window-close-btn');
        statusLeftEl = document.getElementById('window-status-left');
        statusRightEl = document.getElementById('window-status-right');

        closeBtnEl?.addEventListener('click', () => {
            window.DOMINIK_STATE.closeProgram();
        });

        // Klick auf "Hilfe" in der Menüleiste öffnet HELP.HLP
        document.getElementById('window-menu-help')?.addEventListener('click', () => {
            window.DOMINIK_STATE.openProgram('systemhelp');
        });

        // Click outside window to close
        overlayEl?.addEventListener('click', (e) => {
            if (e.target === overlayEl) {
                window.DOMINIK_STATE.closeProgram();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (window.DOMINIK_STATE.getActiveProgramId()) {
                    window.DOMINIK_STATE.closeProgram();
                } else if (window.DOMINIK_STATE.isStartMenuOpen()) {
                    window.DOMINIK_STATE.closeStartMenu();
                }
            }
        });

        window.DOMINIK_STATE.subscribe((eventType, state) => {
            if (eventType === 'program:open' || eventType === 'program:close') {
                renderActiveProgram(state.activeProgramId);
            }
        });

        window.addEventListener('resize', () => {
            const activeId = window.DOMINIK_STATE?.getActiveProgramId();
            if (activeId && windowEl) {
                const mod = (window.DOMINIK_DATA?.modules || []).find(m => m.id === activeId);
                const targetMaxWidth = mod?.maxWidth || '800px';
                windowEl.style.maxWidth = window.innerWidth <= 768 ? '100%' : targetMaxWidth;
            }
        });
    }

    return {
        init: init
    };
})();
