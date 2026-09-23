// Modul M02: CHARTS.EXE (Musik-Hitparade 1986-2026)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.charts = {
    render: function (container) {
        let activeFilter = 'all';

        function renderRows() {
            const allCharts = window.DOMINIK_DATA?.charts || [];
            const filtered = activeFilter === 'all'
                ? allCharts
                : allCharts.filter(c => c.decade === activeFilter);

            let rows = '';
            filtered.forEach(item => {
                const isSpecial = item.year === 1986 || item.year === 2026;
                const rowBg = isSpecial ? 'background: #fffcd6;' : '';
                rows += `
                    <tr style="${rowBg}">
                        <td style="font-weight:bold; color:#000080; text-align:center;">${item.year}</td>
                        <td style="font-weight:bold;">${item.artist}</td>
                        <td style="color:#1a1c1c;">"${item.title}"</td>
                        <td style="font-size:11px; color:#464653;">${item.note}</td>
                    </tr>
                `;
            });
            return rows;
        }

        function updateTable() {
            const tbody = container.querySelector('#charts-table-body');
            if (tbody) {
                tbody.innerHTML = renderRows();
            }
            container.querySelectorAll('.tab-btn').forEach(btn => {
                if (btn.getAttribute('data-filter') === activeFilter) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:8px;">
                <div style="font-size:12px; color:#1a1c1c; padding:2px 4px;">
                    Offizielle Nr. 1 Hits der deutschen Single-Charts am Stichtag <strong>25. September</strong>:
                </div>

                <!-- Dekaden-Filter-Tabs -->
                <div class="tab-bar">
                    <button class="retro-raised-btn tab-btn active" data-filter="all">Alle (40 Jahre)</button>
                    <button class="retro-raised-btn tab-btn" data-filter="80s">80er</button>
                    <button class="retro-raised-btn tab-btn" data-filter="90s">90er</button>
                    <button class="retro-raised-btn tab-btn" data-filter="00s">2000er</button>
                    <button class="retro-raised-btn tab-btn" data-filter="10s">2010er</button>
                    <button class="retro-raised-btn tab-btn" data-filter="20s">2020er</button>
                </div>

                <div class="retro-sunken" style="max-height: 420px; overflow-y: auto; background: #ffffff;">
                    <table class="spreadsheet-table">
                        <thead>
                            <tr>
                                <th style="width:60px; text-align:center;">Jahr</th>
                                <th style="width:180px;">Interpret</th>
                                <th>Titel</th>
                                <th>Trivia / Notiz</th>
                            </tr>
                        </thead>
                        <tbody id="charts-table-body">
                            ${renderRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                activeFilter = btn.getAttribute('data-filter');
                updateTable();
            });
        });
    }
};
