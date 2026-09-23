// Modul M01: SETUP_40.EXE
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.setup = {
    render: function (container) {
        container.innerHTML = `
            <div class="setup-wizard-content">
                <div class="setup-banner retro-raised">
                    <span class="material-symbols-outlined" style="font-size: 42px;">install_desktop</span>
                    <div>
                        <h2 style="font-size: 16px; margin-bottom: 4px;">Dominik OS Version 40.0</h2>
                        <p style="font-size: 11px; opacity: 0.9;">Offizieller Jubiläums-Installations-Assistent</p>
                    </div>
                </div>

                <div class="retro-sunken" style="padding: 12px; font-size: 12px; line-height: 1.5; background: #ffffff;">
                    <p style="margin-bottom: 8px;"><strong>Willkommen zum großen Dominik 40.0 Update!</strong></p>
                    <p style="margin-bottom: 8px;">
                        Nach 40 Jahren kontinuierlicher Laufzeit (Release: 25. September 1986) wurde das System
                        erfolgreich auf den Meilenstein <strong>Version 40.0</strong> aktualisiert.
                    </p>
                    <ul style="margin-left: 20px; margin-bottom: 8px;">
                        <li><strong>Jugend.dll</strong> wurde planmäßig archiviert.</li>
                        <li><strong>Weisheit.exe</strong> und <strong>Gelassenheit.sys</strong> wurden im Kernel verankert.</li>
                        <li><strong>Körperliche Knackgeräusche</strong> wurden als Standard-Audioausgabe registriert.</li>
                    </ul>
                    <p>Status: Installation zu 100% abgeschlossen. Alle Systeme bereit!</p>
                </div>

                <div>
                    <label style="font-size: 11px; font-weight: bold; margin-bottom: 4px; display: block;">Installationsfortschritt:</label>
                    <div class="setup-progress-trough retro-sunken">
                        <div class="setup-progress-fill">100% VOLLSTÄNDIG GELADEN</div>
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                    <button class="retro-raised-btn" style="padding: 6px 18px; font-weight: bold; max-width: 100%;" onclick="window.DOMINIK_STATE.closeProgram()">
                        Starten &amp; Desktop freigeben
                    </button>
                </div>
            </div>
        `;
    }
};
