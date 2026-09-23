// Haupt-Einstiegspunkt für Dominik OS 1986
document.addEventListener('DOMContentLoaded', () => {
    // Initialisierung von Desktop und Modal Framework
    window.DOMINIK_DESKTOP?.init();
    window.DOMINIK_MODAL?.init();

    // SETUP_40.EXE beim ersten Laden automatisch öffnen
    const hasLaunched = sessionStorage.getItem('dominik_os_launched');
    if (!hasLaunched) {
        sessionStorage.setItem('dominik_os_launched', 'true');
        setTimeout(() => {
            window.DOMINIK_STATE.openProgram('setup');
        }, 200);
    }

    // Zeitgesteuertes System-Popup nach 40 Sekunden (Easter Egg)
    setTimeout(() => {
        showSystemAlert(
            'SYSTEM MESSAGE (0x40):\\n\\n40 Jahre Dominik erfolgreich im RAM geladen.\\nJugend.dll wurde planmäßig durch Weisheit.exe ersetzt.\\n\\nAlles Gute zum 40. Geburtstag!'
        );
    }, 40000);
});

function showSystemAlert(message) {
    // Falls ein modales Fenster offen ist, nicht überlagern
    if (window.DOMINIK_STATE.getActiveProgramId()) return;

    const alertOverlay = document.createElement('div');
    alertOverlay.className = 'modal-overlay open';
    alertOverlay.style.zIndex = '2000';

    alertOverlay.innerHTML = `
        <div class="retro-window retro-window-frame" style="max-width: min(420px, calc(100vw - 16px)); box-shadow: 3px 3px 0px #000000;">
            <div class="window-titlebar" style="background: #ba1a1a;">
                <div class="window-title-left">
                    <span class="material-symbols-outlined" style="color: #ffff00;">warning</span>
                    <span>Systemhinweis: Dominik OS 40.0</span>
                </div>
            </div>
            <div class="window-body" style="padding: 16px; background: #c0c0c0;">
                <div style="display: flex; gap: 14px; align-items: flex-start; margin-bottom: 16px;">
                    <span class="material-symbols-outlined" style="font-size: 38px; color: #ba1a1a;">warning</span>
                    <div style="font-size: 12px; line-height: 1.5; white-space: pre-line; color: #000000;">
                        ${message.replace(/\\n/g, '\n')}
                    </div>
                </div>
                <div style="text-align: center;">
                    <button class="retro-raised-btn alert-ok-btn" style="padding: 4px 24px; font-weight: bold;">
                        OK
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(alertOverlay);
    alertOverlay.querySelector('.alert-ok-btn')?.addEventListener('click', () => {
        alertOverlay.remove();
    });
}
