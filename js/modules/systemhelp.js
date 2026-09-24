// Modul: HELP.HLP (Dominik OS 40.0 System-Handbuch)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.systemhelp = (function () {
    let currentSelectedId = 'overview';
    let searchQuery = '';

    function getHelpData() {
        return window.DOMINIK_DATA?.systemhelp || { modules: [], overview: {} };
    }

    function renderDetailPane(container, data) {
        const paneEl = container.querySelector('#sh-detail-pane');
        if (!paneEl) return;

        if (currentSelectedId === 'overview') {
            const ov = data.overview || {};
            paneEl.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div style="border-bottom: 2px solid #000080; padding-bottom: 6px;">
                        <h2 style="font-size: 16px; color: #000080; margin: 0 0 4px 0;">${ov.heading || 'System-Übersicht'}</h2>
                        <span style="font-size: 11px; color: #555555;">Dominik OS 1986 // Version 40.0 // Windows 3.1 Edition</span>
                    </div>

                    <div style="font-size: 12px; line-height: 1.6; color: #000000;">
                        ${ov.text || ''}
                    </div>

                    <!-- GitHub Repository Box -->
                    <div class="retro-window-frame" style="background: #e8e8ff; border: 2px solid #000080; padding: 12px; margin: 4px 0;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                            <span class="material-symbols-outlined" style="font-size: 32px; color: #000080;">code</span>
                            <div>
                                <strong style="font-size: 13px; color: #000080;">Offizielles GitHub-Repository</strong><br>
                                <span style="font-size: 11px; color: #333333;">Open-Source-Quellcode, Konzept & Dokumentation</span>
                            </div>
                        </div>
                        <div style="font-size: 12px; line-height: 1.5; margin-bottom: 10px;">
                            Der gesamte Quellcode von Dominik OS 1986 steht auf GitHub zur Verfügung:
                        </div>
                        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                            <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="retro-raised-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; font-weight: 700; color: #000080; font-size: 12px;">
                                <span class="material-symbols-outlined" style="font-size: 16px;">open_in_new</span>
                                <span>github.com/tschwan/dom40-w31</span>
                            </a>
                            <span style="font-size: 10px; color: #666666;">(Öffnet in neuem Browser-Tab)</span>
                        </div>
                    </div>

                    <!-- Technische Leitplanken -->
                    <div class="retro-sunken" style="background: #ffffff; padding: 10px;">
                        <strong style="font-size: 12px; color: #000080; display: block; margin-bottom: 6px;">
                            TECHNISCHE ARCHITEKTUR & LEITPLANKEN:
                        </strong>
                        <ul style="margin: 0; padding-left: 18px; font-size: 11px; line-height: 1.6;">
                            ${(ov.techStack || []).map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            return;
        }

        const mod = (data.modules || []).find(m => m.id === currentSelectedId);
        if (!mod) {
            paneEl.innerHTML = '<div style="padding: 16px; color: #888888;">Bitte wählen Sie ein Modul aus.</div>';
            return;
        }

        const isSelf = mod.id === 'systemhelp';

        paneEl.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <!-- Modul-Header -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #000080; padding-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="material-symbols-outlined" style="font-size: 36px; color: #000080;">${mod.icon}</span>
                        <div>
                            <h2 style="font-size: 15px; color: #000080; margin: 0;">${mod.filename}</h2>
                            <span style="font-size: 12px; font-weight: 700; color: #333333;">${mod.title}</span>
                            <span class="retro-sunken" style="font-size: 10px; padding: 1px 6px; margin-left: 6px; background: #e8e8e8;">${mod.category}</span>
                        </div>
                    </div>

                    ${!isSelf ? `
                        <button id="sh-launch-btn" class="retro-raised-btn" style="padding: 4px 12px; font-weight: 700; font-size: 11px; color: #000080; display: inline-flex; align-items: center; gap: 4px;">
                            <span class="material-symbols-outlined" style="font-size: 16px;">play_arrow</span>
                            <span>Programm starten</span>
                        </button>
                    ` : ''}
                </div>

                <!-- Kurzbeschreibung -->
                <div class="retro-sunken" style="background: #ffffe0; border: 1px solid #c0c000; padding: 8px 10px; font-size: 12px; line-height: 1.4;">
                    <strong>Zweck:</strong> ${mod.summary}
                </div>

                <!-- Detailbeschreibung -->
                <div style="font-size: 12px; line-height: 1.6; color: #1a1a1a;">
                    ${mod.details}
                </div>

                <!-- Enthaltene Features -->
                ${mod.features && mod.features.length ? `
                    <div class="retro-sunken" style="background: #ffffff; padding: 10px;">
                        <strong style="font-size: 11px; color: #000080; display: block; margin-bottom: 6px;">
                            FUNKTIONS-HIGHLIGHTS:
                        </strong>
                        <ul style="margin: 0; padding-left: 18px; font-size: 11px; line-height: 1.6;">
                            ${mod.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;

        if (!isSelf) {
            paneEl.querySelector('#sh-launch-btn')?.addEventListener('click', () => {
                window.DOMINIK_STATE?.openProgram(mod.id);
            });
        }
    }

    function renderNavList(container, data) {
        const navEl = container.querySelector('#sh-nav-list');
        if (!navEl) return;

        const q = searchQuery.toLowerCase().trim();
        const modules = (data.modules || []).filter(m => {
            if (!q) return true;
            return m.filename.toLowerCase().includes(q) ||
                m.title.toLowerCase().includes(q) ||
                m.summary.toLowerCase().includes(q) ||
                m.category.toLowerCase().includes(q);
        });

        let navHtml = `
            <div class="sh-nav-item ${currentSelectedId === 'overview' ? 'selected' : ''}" data-id="overview" style="display: flex; align-items: center; gap: 6px; padding: 5px 8px; cursor: pointer; font-size: 11px; border-bottom: 1px solid #e0e0e0;">
                <span class="material-symbols-outlined" style="font-size: 16px; color: #000080;">home</span>
                <strong style="color: #000080;">Übersicht & GitHub</strong>
            </div>
        `;

        modules.forEach(m => {
            const isSel = m.id === currentSelectedId;
            navHtml += `
                <div class="sh-nav-item ${isSel ? 'selected' : ''}" data-id="${m.id}" style="display: flex; align-items: center; gap: 6px; padding: 4px 8px; cursor: pointer; font-size: 11px; border-bottom: 1px dashed #e8e8e8;">
                    <span class="material-symbols-outlined" style="font-size: 15px; color: ${isSel ? '#000080' : '#555555'};">${m.icon}</span>
                    <span style="font-weight: ${isSel ? '700' : '400'}; color: ${isSel ? '#000080' : '#000000'}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        ${m.filename}
                    </span>
                </div>
            `;
        });

        if (modules.length === 0) {
            navHtml += '<div style="padding: 12px; font-size: 11px; color: #777777;">Keine Treffer gefunden.</div>';
        }

        navEl.innerHTML = navHtml;

        navEl.querySelectorAll('.sh-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                currentSelectedId = item.getAttribute('data-id') || 'overview';
                renderNavList(container, data);
                renderDetailPane(container, data);
            });
        });
    }

    return {
        render: function (container) {
            const data = getHelpData();
            currentSelectedId = 'overview';
            searchQuery = '';

            container.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <!-- WinHelp Menü- und Werkzeugleiste -->
                    <div class="retro-window-frame" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; padding: 4px 8px; background: #e8e8e8;">
                        <div style="display: flex; gap: 4px; align-items: center;">
                            <button id="sh-btn-home" class="retro-raised-btn" style="padding: 3px 8px; font-size: 11px; font-weight: 700;">
                                📖 Übersicht
                            </button>
                            <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="retro-raised-btn" style="text-decoration: none; padding: 3px 8px; font-size: 11px; font-weight: 700; color: #000080; display: inline-flex; align-items: center; gap: 4px;">
                                🌐 GitHub
                            </a>
                            <button id="sh-btn-print" class="retro-raised-btn" style="padding: 3px 8px; font-size: 11px;">
                                🖨️ Drucken
                            </button>
                        </div>

                        <!-- Suchfeld -->
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-size: 11px; font-weight: 700;">Suchen:</span>
                            <input type="text" id="sh-search-input" class="retro-sunken" style="padding: 2px 6px; font-size: 11px; width: 140px; border: 1px solid #808080;" placeholder="z.B. Games, DOS..." />
                        </div>
                    </div>

                    <!-- 2-Spalten-Layout (Nav links, Details rechts) -->
                    <div class="help-layout-grid" style="display: grid; grid-template-columns: 240px 1fr; gap: 8px; min-height: 420px;">
                        <div class="retro-sunken" style="background: #ffffff; padding: 4px; max-height: 440px; overflow-y: auto;">
                            <div style="font-weight: 700; font-size: 11px; padding: 4px 6px; background: #f0f0f0; border-bottom: 1px solid #c0c0c0; color: #404040;">
                                ALLE MODULE (${(data.modules || []).length}):
                            </div>
                            <div id="sh-nav-list"></div>
                        </div>

                        <div id="sh-detail-pane" class="retro-sunken" style="background: #ffffff; padding: 14px; max-height: 440px; overflow-y: auto;"></div>
                    </div>
                </div>
            `;

            renderNavList(container, data);
            renderDetailPane(container, data);

            // Such-Eingabe
            const searchInput = container.querySelector('#sh-search-input');
            searchInput?.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                renderNavList(container, data);
            });

            // Toolbar-Buttons
            container.querySelector('#sh-btn-home')?.addEventListener('click', () => {
                currentSelectedId = 'overview';
                renderNavList(container, data);
                renderDetailPane(container, data);
            });
            container.querySelector('#sh-btn-print')?.addEventListener('click', () => {
                window.print();
            });
        }
    };
})();
