// Modul: Recycle Bin (Papierkorb Windows 3.1)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.recycle = (function () {
    let currentView = 'list'; // 'list' oder 'viewer'
    let selectedFileIndex = 0;

    function formatSizeTotal(items) {
        return '7,91 MB';
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
                    itemsHtml += `
                        <div class="recycle-item retro-raised-btn" data-index="${idx}" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 12px 8px; width: 130px; text-align: center; cursor: pointer; border: 1px dotted transparent;">
                            <div class="retro-sunken" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; margin-bottom: 6px; background: #ffffff;">
                                <span class="material-symbols-outlined" style="font-size: 28px; color: ${file.type === 'image' ? '#000080' : '#464653'};">
                                    ${file.icon}
                                </span>
                            </div>
                            <div style="font-size: 11px; font-weight: 700; word-break: break-all; line-height: 1.2; margin-bottom: 4px; color: #000000;">
                                ${file.filename}
                            </div>
                            <div style="font-size: 10px; color: #464653;">
                                ${file.size}
                            </div>
                        </div>
                    `;
                });

                container.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <!-- Windows 3.1 Ordner-Toolbar -->
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #e8e8e8; padding: 4px 8px;" class="retro-sunken">
                            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: bold;">
                                <span class="material-symbols-outlined" style="font-size: 16px; color: #000080;">folder_open</span>
                                <span>C:\\RECYCLE\\*.*</span>
                            </div>
                            <div style="display: flex; gap: 4px;">
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
                        <div class="retro-sunken" style="background: #ffffff; padding: 16px; min-height: 280px; max-height: 400px; overflow-y: auto;">
                            <div style="display: flex; flex-wrap: wrap; gap: 14px; justify-content: flex-start;">
                                ${itemsHtml}
                            </div>
                        </div>

                        <!-- Statusleiste -->
                        <div style="display: flex; justify-content: space-between; font-size: 11px; padding: 2px 6px; color: #464653;">
                            <span>${items.length} Objekt(e) im Papierkorb</span>
                            <span>Gesamtgröße: ${formatSizeTotal(items)}</span>
                        </div>
                    </div>
                `;

                // Event Listeners für Dateiklicks
                container.querySelectorAll('.recycle-item').forEach(el => {
                    el.addEventListener('click', () => {
                        const idx = parseInt(el.getAttribute('data-index'), 10);
                        showViewer(idx);
                    });
                });

                container.querySelector('#recycle-empty-btn')?.addEventListener('click', () => {
                    alert('FEHLER: Papierkorb kann nicht geleert werden.\n\nAlle Erinnerungen und Meilensteine an Dominik sind schreibgeschützt und dauerhaft im System archiviert!');
                });

                container.querySelector('#recycle-restore-btn')?.addEventListener('click', () => {
                    alert('HINWEIS: Alle 5 Dateien sind bereits vollständig im Speicher geladen und können per Klick direkt betrachtet werden.');
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
                        <div class="retro-sunken" style="background: #e8e8e8; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 440px; max-height: calc(100vh - 250px); overflow: auto;">
                            <img src="${file.src}" alt="${file.filename}" style="max-height: calc(100vh - 290px); max-width: 100%; width: auto; object-fit: contain; border: 2px solid #000000; box-shadow: 2px 2px 0px #808080; background: #ffffff;">
                            <div style="margin-top: 8px; font-size: 11px; color: #464653; display: flex; gap: 12px;">
                                <span>Datei: <strong>${file.filename}</strong></span>
                                <span>Größe: <strong>${file.size}</strong></span>
                                <span>Typ: <strong>PNG-Grafik</strong></span>
                            </div>
                        </div>
                    `;
                } else if (file.type === 'text') {
                    const textContent = window.DOMINIK_DATA?.recycleText || 'Dateiinhalt wird geladen...';
                    viewerContentHtml = `
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <div style="display: flex; justify-content: space-between; font-size: 11px; color: #464653; padding: 0 4px;">
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
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #e8e8e8; padding: 4px 8px;" class="retro-sunken">
                            <button id="viewer-back-btn" class="retro-raised-btn" style="padding: 3px 12px; font-size: 11px; font-weight: bold; display: flex; align-items: center; gap: 4px;">
                                <span class="material-symbols-outlined" style="font-size: 16px;">arrow_back</span>
                                <span>Zurück zum Papierkorb</span>
                            </button>

                            <div style="font-size: 11px; font-weight: bold; color: #000080;">
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
