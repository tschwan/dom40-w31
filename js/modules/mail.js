// Modul M11: OUTLOOK86.MSG (Posteingang - Glückwünsche)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.guestbook = {
    render: function (container) {
        const messages = window.DOMINIK_DATA?.guestbook || [];
        let activeMsgId = messages[0]?.id || null;

        function renderRows() {
            let html = '';
            messages.forEach(msg => {
                const isSelected = msg.id === activeMsgId;
                const rowBg = isSelected ? 'background: #000080; color: #ffffff;' : 'background: #ffffff; color: #000000;';
                html += `
                    <tr class="mail-row" data-id="${msg.id}" style="${rowBg} cursor: pointer;">
                        <td style="font-weight: 700; width: 180px; padding: 4px 6px;">${msg.sender.split('<')[0]}</td>
                        <td style="padding: 4px 6px;">${msg.subject}</td>
                        <td style="width: 140px; text-align: right; padding: 4px 6px; font-size: 11px;">${msg.date}</td>
                    </tr>
                `;
            });
            return html;
        }

        function renderDetail() {
            const msg = messages.find(m => m.id === activeMsgId) || messages[0];
            const detailEl = container.querySelector('#mail-detail-pane');
            if (detailEl && msg) {
                detailEl.innerHTML = `
                    <div style="border-bottom: 1px solid #808080; padding-bottom: 6px; margin-bottom: 10px; font-size: 11px;">
                        <div><strong>Von:</strong> ${msg.sender}</div>
                        <div><strong>Datum:</strong> ${msg.date}</div>
                        <div><strong>Betreff:</strong> <span style="font-weight: bold; color: #000080;">${msg.subject}</span></div>
                    </div>
                    <div style="font-size: 12px; line-height: 1.6; white-space: pre-line;">
                        ${msg.body}
                    </div>
                `;
            }
        }

        function updateView() {
            const tbody = container.querySelector('#mail-table-body');
            if (tbody) tbody.innerHTML = renderRows();
            renderDetail();
            bindRowClicks();
        }

        function bindRowClicks() {
            container.querySelectorAll('.mail-row').forEach(row => {
                row.addEventListener('click', () => {
                    activeMsgId = row.getAttribute('data-id');
                    updateView();
                });
            });
        }

        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <!-- Toolbar -->
                <div style="display: flex; gap: 6px; background: #e8e8e8; padding: 4px;" class="retro-sunken">
                    <button id="mail-new-btn" class="retro-raised-btn" style="padding: 3px 10px; font-size: 11px; display: flex; align-items: center; gap: 4px;">
                        <span class="material-symbols-outlined" style="font-size: 14px;">edit</span>
                        <span>Eintrag schreiben</span>
                    </button>
                    <button class="retro-raised-btn" style="padding: 3px 10px; font-size: 11px;" onclick="window.print()">Drucken</button>
                </div>

                <!-- Posteingang Liste -->
                <div class="retro-sunken" style="max-height: 180px; overflow-y: auto; background: #ffffff;">
                    <table class="spreadsheet-table" style="width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 180px;">Von</th>
                                <th>Betreff</th>
                                <th style="width: 140px; text-align: right;">Datum</th>
                            </tr>
                        </thead>
                        <tbody id="mail-table-body">
                            ${renderRows()}
                        </tbody>
                    </table>
                </div>

                <!-- Lese-Vorschau -->
                <div id="mail-detail-pane" class="retro-sunken" style="background: #ffffff; padding: 12px; min-height: 160px; max-height: 220px; overflow-y: auto;">
                </div>
            </div>
        `;

        bindRowClicks();
        renderDetail();

        container.querySelector('#mail-new-btn')?.addEventListener('click', () => {
            const author = prompt('Dein Name / Absender:', 'Ein guter Freund');
            if (!author) return;
            const text = prompt('Deine Geburtstags-Nachricht an Dominik:');
            if (!text) return;

            const now = new Date();
            const dateStr = now.toLocaleDateString('de-DE') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
            const newMsg = {
                id: 'msg_' + Date.now(),
                sender: `${author} <gruesse@party.de>`,
                subject: `Herzlichen Glückwunsch, Dominik!`,
                date: dateStr,
                body: text
            };
            messages.unshift(newMsg);
            activeMsgId = newMsg.id;
            updateView();
        });
    }
};
