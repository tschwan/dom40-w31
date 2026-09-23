// Modul M03: CULTURE86.DOC (Popkultur 1986)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.culture = {
    render: function (container) {
        let currentTab = 'movies';

        function renderItems() {
            const data = window.DOMINIK_DATA?.culture || {};
            const items = data[currentTab] || [];
            let html = '';

            items.forEach(item => {
                html += `
                    <div style="border-bottom: 1px dotted #808080; padding: 6px 0; display: flex; gap: 10px; align-items: baseline;">
                        <span style="font-weight: 700; width: 25px; color: #000080; text-align: right;">#${item.rank}</span>
                        <div style="flex: 1;">
                            <span style="font-weight: 700; font-size: 13px;">${item.title}</span>
                            <span style="font-size: 11px; color: #006e6e; margin-left: 6px;">[${item.genre}]</span>
                            <p style="font-size: 11px; color: #464653; margin-top: 2px;">${item.note}</p>
                        </div>
                    </div>
                `;
            });
            return html;
        }

        function updateView() {
            const contentEl = container.querySelector('#culture-doc-content');
            if (contentEl) {
                contentEl.innerHTML = renderItems();
            }
            container.querySelectorAll('.tab-btn').forEach(btn => {
                if (btn.getAttribute('data-tab') === currentTab) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <!-- Tab-Leiste -->
                <div class="tab-bar">
                    <button class="retro-raised-btn tab-btn active" data-tab="movies">Kino-Blockbuster</button>
                    <button class="retro-raised-btn tab-btn" data-tab="series">Kult-TV-Serien</button>
                    <button class="retro-raised-btn tab-btn" data-tab="albums">Meilenstein-Alben</button>
                </div>

                <!-- WordPad / Write Dokument-Fläche -->
                <div class="retro-sunken" style="background: #ffffff; padding: 16px; max-height: 400px; overflow-y: auto;">
                    <div style="border-bottom: 2px solid #000080; padding-bottom: 6px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 4px;">
                        <span style="font-weight: 700; font-size: 13px; color: #000080;">DOKUMENT: POPKULTUR_1986.DOC</span>
                        <span style="font-size: 10px; color: #464653;">Schriftart: Courier 10cpi</span>
                    </div>

                    <div id="culture-doc-content">
                        ${renderItems()}
                    </div>
                </div>
            </div>
        `;

        container.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentTab = btn.getAttribute('data-tab');
                updateView();
            });
        });
    }
};
