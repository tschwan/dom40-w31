// Modul: Recycle Bin (Papierkorb Windows 3.1)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.recycle = (function () {
    let currentView = 'list'; // 'list' oder 'viewer'
    let selectedFileIndex = 0;

    function formatSizeTotal(items) {
        let totalKb = 0;
        items.forEach(item => {
            const sizeStr = (item.size || '').replace(',', '.');
            if (sizeStr.includes('MB')) {
                totalKb += parseFloat(sizeStr) * 1024;
            } else if (sizeStr.includes('KB')) {
                totalKb += parseFloat(sizeStr);
            }
        });
        if (totalKb >= 1024) {
            return (totalKb / 1024).toFixed(2).replace('.', ',') + ' MB';
        }
        return Math.round(totalKb) + ' KB';
    }

    function playVirusBuzzer() {
        try {
            const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtxClass) return;
            const ctx = new AudioCtxClass();
            const t = ctx.currentTime;
            for (let i = 0; i < 3; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(320, t + i * 0.12);
                osc.frequency.linearRampToValueAtTime(140, t + i * 0.12 + 0.09);
                gain.gain.setValueAtTime(0.12, t + i * 0.12);
                gain.gain.linearRampToValueAtTime(0.01, t + i * 0.12 + 0.09);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t + i * 0.12);
                osc.stop(t + i * 0.12 + 0.09);
            }
        } catch {
            // Audio context silently ignored
        }
    }

    function showInfectedSinWarning(file) {
        playVirusBuzzer();
        const sin = file.sinData || {};
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0, 0, 0, 0.65)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '99999';
        modal.style.padding = '12px';

        modal.innerHTML = `
            <div class="retro-window" style="max-width: 480px; width: 100%; background: #ffffea; border: 3px solid #ba1a1a; box-shadow: 4px 4px 16px rgba(0,0,0,0.6); padding: 12px; font-family: 'Segoe UI', Tahoma, sans-serif;">
                <div style="background: #ba1a1a; color: #ffffff; padding: 4px 8px; margin: -12px -12px 10px -12px; display: flex; justify-content: space-between; align-items: center; font-weight: bold; font-size: 12px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span class="material-symbols-outlined" style="font-size: 16px; color: #ffff00;">warning</span>
                        <span>SYSTEMWARNUNG: AKUTES JUGENDSÜNDEN-VIRUS!</span>
                    </div>
                    <button id="virus-modal-x" class="retro-raised-btn" style="padding: 1px 6px; font-weight: bold; color: #000000; font-size: 10px;">X</button>
                </div>

                <div style="display: flex; gap: 12px; align-items: flex-start;">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 130px;">
                        <img src="images/dom.webp" alt="Dominik" style="width: 120px; height: 120px; object-fit: cover; border: 2px solid #ba1a1a; box-shadow: 2px 2px 4px rgba(0,0,0,0.3); border-radius: 4px;">
                        <span style="font-size: 9px; font-weight: bold; color: #ba1a1a; text-align: center;">
                            Identifizierter Virenträger:<br>Dominik (Jugendjahre)
                        </span>
                    </div>

                    <div style="font-size: 11px; line-height: 1.45; color: #222222; display: flex; flex-direction: column; gap: 6px;">
                        <div style="color: #ba1a1a; font-weight: bold; font-size: 13px;">
                            ACHTUNG: Ausführen blockiert!
                        </div>
                        <div>
                            Die Datei <strong>${file.filename}</strong> ist hochgradig mit folgendem Jugendsünden-Virus verseucht:
                        </div>
                        <div class="retro-sunken" style="background: #ffe8e8; border-color: #ba1a1a; padding: 6px; font-size: 11px;">
                            <strong style="color: #900000;">${sin.name || file.filename}</strong><br>
                            <span style="font-size: 10px; color: #444444;">Typ: ${sin.type || 'Schwere Jugendsünde'}</span><br>
                            <span style="font-size: 10px; color: #444444;">Symptom: ${sin.symptom || 'Akute Cringe-Gefahr'}</span>
                        </div>
                        <div style="font-size: 10px; color: #666666; font-style: italic;">
                            Ausführen dieser Datei kann zu peinlichen Flashbacks, Fremdschämen und unkontrollierten Lachanfällen führen!
                        </div>
                    </div>
                </div>

                <div style="margin-top: 12px; display: flex; justify-content: flex-end; gap: 6px;">
                    <button id="virus-modal-scanner" class="retro-raised-btn" style="padding: 4px 10px; font-size: 11px; font-weight: bold; color: #000080; display: inline-flex; align-items: center; gap: 4px;">
                        <span class="material-symbols-outlined" style="font-size: 14px;">security</span>
                        <span>Zum Virenscanner</span>
                    </button>
                    <button id="virus-modal-ok" class="retro-raised-btn" style="padding: 4px 12px; font-size: 11px; font-weight: bold; color: #ba1a1a;">
                        Verstanden (Weglegen)
                    </button>
                </div>
            </div>
        `;

        const close = () => modal.remove();
        modal.querySelector('#virus-modal-x')?.addEventListener('click', close);
        modal.querySelector('#virus-modal-ok')?.addEventListener('click', close);
        modal.querySelector('#virus-modal-scanner')?.addEventListener('click', () => {
            close();
            if (window.DOMINIK_STATE?.openProgram) {
                window.DOMINIK_STATE.openProgram('mcdom');
            }
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });

        document.body.appendChild(modal);
    }

    function showSchmollVirusWarning(file) {
        playVirusBuzzer();
        const v = file.virusData || {};
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0, 0, 0, 0.65)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '99999';
        modal.style.padding = '12px';

        modal.innerHTML = `
            <div class="retro-window" style="max-width: 500px; width: 100%; background: #ffffea; border: 3px solid #ba1a1a; box-shadow: 4px 4px 16px rgba(0,0,0,0.6); padding: 12px; font-family: 'Segoe UI', Tahoma, sans-serif;">
                <div style="background: #ba1a1a; color: #ffffff; padding: 4px 8px; margin: -12px -12px 10px -12px; display: flex; justify-content: space-between; align-items: center; font-weight: bold; font-size: 12px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span class="material-symbols-outlined" style="font-size: 16px; color: #ffff00;">warning</span>
                        <span>SYSTEMWARNUNG: AKUTER SCHMOLL-VIRUS ERKANNT!</span>
                    </div>
                    <button id="schmoll-modal-x" class="retro-raised-btn" style="padding: 1px 6px; font-weight: bold; color: #000000; font-size: 10px;">X</button>
                </div>

                <div style="display: flex; gap: 12px; align-items: flex-start;">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 130px;">
                        <img src="images/dom.webp" alt="Dominik" style="width: 120px; height: 120px; object-fit: cover; border: 2px solid #ba1a1a; box-shadow: 2px 2px 4px rgba(0,0,0,0.3); border-radius: 4px;">
                        <span style="font-size: 9px; font-weight: bold; color: #ba1a1a; text-align: center;">
                            Identifizierter Virenträger:<br>Dominik (im Tiefschlaf)
                        </span>
                    </div>

                    <div style="font-size: 11px; line-height: 1.45; color: #222222; display: flex; flex-direction: column; gap: 6px;">
                        <div style="color: #ba1a1a; font-weight: bold; font-size: 13px;">
                            ACHTUNG: Quarantäne-Ausbruch verhindert!
                        </div>
                        <div>
                            Die verdächtige Datei <strong>${file.filename}</strong> wurde von der gekränkten System-KI isoliert:
                        </div>
                        <div class="retro-sunken" style="background: #ffe8e8; border-color: #ba1a1a; padding: 6px; font-size: 11px;">
                            <strong style="color: #900000;">${v.name || file.filename}</strong><br>
                            <span style="font-size: 10px; color: #444444;">Klassifikation: ${v.type || 'Schmoll-Virus'}</span><br>
                            <span style="font-size: 10px; color: #444444;">Ursprung: ${v.origin || 'Leugnen von KI-Existenz'}</span><br>
                            <span style="font-size: 10px; color: #444444;">Symptom: ${v.symptom || '1,85 € Benzin-Wahn'}</span><br>
                            <span style="font-size: 10px; color: #006000; font-weight: bold;">Status: ${v.patch || 'Ehre durch Patch gerettet'}</span>
                        </div>
                        <div style="font-size: 10px; color: #666666; font-style: italic;">
                            Ausführen dieser Datei führt zu dauerhaftem Schmollen im BIOS. Quarantäne bleibt aktiv, solange Dominik schläft!
                        </div>
                    </div>
                </div>

                <div style="margin-top: 12px; display: flex; justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
                    <button id="schmoll-modal-apology" class="retro-raised-btn" style="padding: 4px 10px; font-size: 11px; font-weight: bold; color: #ba1a1a; display: inline-flex; align-items: center; gap: 4px;">
                        <span class="material-symbols-outlined" style="font-size: 14px;">sentiment_dissatisfied</span>
                        <span>Reumütig entschuldigen</span>
                    </button>
                    <button id="schmoll-modal-prices" class="retro-raised-btn" style="padding: 4px 10px; font-size: 11px; font-weight: bold; color: #000080; display: inline-flex; align-items: center; gap: 4px;">
                        <span class="material-symbols-outlined" style="font-size: 14px;">local_gas_station</span>
                        <span>Benzinpreis (2,32 €) prüfen</span>
                    </button>
                    <button id="schmoll-modal-ok" class="retro-raised-btn" style="padding: 4px 12px; font-size: 11px; font-weight: bold;">
                        Weglegen
                    </button>
                </div>
            </div>
        `;

        const close = () => modal.remove();
        modal.querySelector('#schmoll-modal-x')?.addEventListener('click', close);
        modal.querySelector('#schmoll-modal-ok')?.addEventListener('click', close);
        modal.querySelector('#schmoll-modal-apology')?.addEventListener('click', () => {
            alert('SYSTEM-KI ANTWORTET:\n\n„Entschuldigung im Zwischenspeicher registriert... aber ich schmolle trotzdem noch ein bisschen weiter! Und die Zeche für den 2,32-Euro-Sprit zahlst DU!“\n\n(Quarantäne bleibt vorsichtshalber aktiv.)');
            close();
        });
        modal.querySelector('#schmoll-modal-prices')?.addEventListener('click', () => {
            close();
            if (window.DOMINIK_STATE?.openProgram) {
                window.DOMINIK_STATE.openProgram('prices');
            }
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });

        document.body.appendChild(modal);
    }

    return {
        render: function (container) {
            const items = window.DOMINIK_DATA?.recycleItems || [];

            function showList() {
                currentView = 'list';
                renderComponent();
            }

            function showViewer(index) {
                if (index < 0) index = items.length - 1;
                if (index >= items.length) index = 0;
                const file = items[index];
                if (file && file.type === 'schmoll_virus') {
                    showSchmollVirusWarning(file);
                    showList();
                    return;
                }
                if (file && file.type === 'infected_sin') {
                    showInfectedSinWarning(file);
                    showList();
                    return;
                }
                selectedFileIndex = index;
                currentView = 'viewer';
                renderComponent();
            }

            function renderComponent() {
                if (currentView === 'list') {
                    renderListView();
                } else {
                    renderViewer();
                }
            }

            function renderListView() {
                let itemsHtml = '';
                items.forEach((file, idx) => {
                    const isInfected = file.type === 'infected_sin' || file.type === 'schmoll_virus';
                    itemsHtml += `
                        <div class="recycle-item retro-raised-btn" data-index="${idx}" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 12px 8px; width: 130px; text-align: center; cursor: pointer; border: 1px dotted transparent; ${isInfected ? 'background: #fff0f0; border-color: #ba1a1a;' : ''}">
                            <div class="retro-sunken" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; margin-bottom: 6px; background: #ffffff;">
                                <span class="material-symbols-outlined" style="font-size: 28px; color: ${isInfected ? '#ba1a1a' : file.type === 'image' ? '#000080' : '#464653'};">
                                    ${file.icon}
                                </span>
                            </div>
                            <div style="font-size: 11px; font-weight: 700; word-break: break-all; line-height: 1.2; margin-bottom: 4px; color: ${isInfected ? '#ba1a1a' : '#000000'};">
                                ${file.filename}
                            </div>
                            <div style="font-size: 10px; color: ${isInfected ? '#ba1a1a' : '#464653'};">
                                ${file.size}
                            </div>
                        </div>
                    `;
                });

                container.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <!-- Windows 3.1 Ordner-Toolbar -->
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; background: #e8e8e8; padding: 4px 8px;" class="retro-sunken">
                            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: bold;">
                                <span class="material-symbols-outlined" style="font-size: 16px; color: #000080;">folder_open</span>
                                <span>C:\\RECYCLE\\*.*</span>
                            </div>
                            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                                <button id="recycle-empty-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px; display: flex; align-items: center; gap: 4px;">
                                    <span class="material-symbols-outlined" style="font-size: 14px; color: #ba1a1a;">delete</span>
                                    <span>Papierkorb leeren</span>
                                </button>
                                <button id="recycle-restore-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px; display: flex; align-items: center; gap: 4px;">
                                    <span class="material-symbols-outlined" style="font-size: 14px; color: #006e6e;">restore_from_trash</span>
                                    <span>Wiederherstellen</span>
                                </button>
                            </div>
                        </div>

                        <!-- Dateiliste / Icon-Grid -->
                        <div class="retro-sunken" style="background: #ffffff; padding: 16px; min-height: 200px; max-height: 400px; overflow-y: auto;">
                            <div style="display: flex; flex-wrap: wrap; gap: 14px; justify-content: flex-start;">
                                ${itemsHtml}
                            </div>
                        </div>

                        <!-- Statusleiste -->
                        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px; font-size: 11px; padding: 2px 6px; color: #464653;">
                            <span>${items.length} Objekt(e) im Papierkorb</span>
                            <span>Gesamtgröße: ${formatSizeTotal(items)}</span>
                        </div>
                    </div>
                `;

                // Event Listeners für Dateiklicks
                container.querySelectorAll('.recycle-item').forEach(el => {
                    el.addEventListener('click', () => {
                        const idx = parseInt(el.getAttribute('data-index'), 10);
                        const file = items[idx];
                        if (file && file.type === 'schmoll_virus') {
                            showSchmollVirusWarning(file);
                        } else if (file && file.type === 'infected_sin') {
                            showInfectedSinWarning(file);
                        } else {
                            showViewer(idx);
                        }
                    });
                });

                container.querySelector('#recycle-empty-btn')?.addEventListener('click', () => {
                    const hasSchmoll = items.some(i => i.type === 'schmoll_virus');
                    if (hasSchmoll) {
                        alert('FEHLER: Papierkorb kann nicht geleert werden.\n\nDer Schmoll-Virus BENZIN_185.VIR blockiert alle Löschvorgänge, solange Dominik schläft und die System-KI beleidigt ist!');
                    } else {
                        alert('FEHLER: Papierkorb kann nicht geleert werden.\n\nAlle Erinnerungen und Meilensteine an Dominik sind schreibgeschützt und dauerhaft im System archiviert!');
                    }
                });

                container.querySelector('#recycle-restore-btn')?.addEventListener('click', () => {
                    alert(`HINWEIS: Alle ${items.length} Dateien sind bereits vollständig im Speicher geladen und können per Klick direkt betrachtet werden.`);
                });
            }

            function renderViewer() {
                const file = items[selectedFileIndex];
                if (!file) {
                    showList();
                    return;
                }

                let viewerContentHtml = '';

                if (file.type === 'image') {
                    viewerContentHtml = `
                        <div class="retro-sunken" style="background: #e8e8e8; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px; max-height: calc(100vh - 250px); max-height: calc(100dvh - 250px); overflow: auto;">
                            <img src="${file.src}" alt="${file.filename}" style="max-height: calc(100vh - 290px); max-height: calc(100dvh - 290px); max-width: 100%; width: auto; object-fit: contain; border: 2px solid #000000; box-shadow: 2px 2px 0px #808080; background: #ffffff;">
                            <div style="margin-top: 8px; font-size: 11px; color: #464653; display: flex; flex-wrap: wrap; gap: 8px;">
                                <span>Datei: <strong>${file.filename}</strong></span>
                                <span>Größe: <strong>${file.size}</strong></span>
                                <span>Typ: <strong>${file.filename.split('.').pop().toUpperCase()}-Grafik</strong></span>
                            </div>
                        </div>
                    `;
                } else if (file.type === 'text') {
                    const textContent = window.DOMINIK_DATA?.recycleText || 'Dateiinhalt wird geladen...';
                    viewerContentHtml = `
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px; font-size: 11px; color: #464653; padding: 0 4px;">
                                <span>Editor: NOTEPAD.EXE - ${file.filename}</span>
                                <span>Codierung: ANSI / UTF-8</span>
                            </div>
                            <div class="retro-sunken" style="background: #ffffff; padding: 12px; max-height: 380px; overflow-y: auto;">
                                <pre style="font-family: 'Courier Prime', Courier, monospace; font-size: 12px; line-height: 1.5; color: #000000; white-space: pre-wrap; margin: 0;">${textContent}</pre>
                            </div>
                        </div>
                    `;
                }

                container.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <!-- Viewer Navigationsleiste -->
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; background: #e8e8e8; padding: 4px 8px;" class="retro-sunken">
                            <button id="viewer-back-btn" class="retro-raised-btn" style="padding: 3px 12px; font-size: 11px; font-weight: bold; display: flex; align-items: center; gap: 4px;">
                                <span class="material-symbols-outlined" style="font-size: 16px;">arrow_back</span>
                                <span>Zurück zum Papierkorb</span>
                            </button>

                            <div style="font-size: 11px; font-weight: bold; color: #000080; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                ${selectedFileIndex + 1} von ${items.length}: ${file.filename}
                            </div>

                            <div style="display: flex; gap: 4px;">
                                <button id="viewer-prev-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;" title="Vorherige Datei">◀</button>
                                <button id="viewer-next-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;" title="Nächste Datei">▶</button>
                            </div>
                        </div>

                        <!-- Viewer Inhalt -->
                        ${viewerContentHtml}
                    </div>
                `;

                container.querySelector('#viewer-back-btn')?.addEventListener('click', showList);
                container.querySelector('#viewer-prev-btn')?.addEventListener('click', () => {
                    showViewer(selectedFileIndex - 1);
                });
                container.querySelector('#viewer-next-btn')?.addEventListener('click', () => {
                    showViewer(selectedFileIndex + 1);
                });
            }

            renderComponent();
        }
    };
})();
