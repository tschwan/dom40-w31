// Modul M05: PRICES.XLS (Konsumpreise: 1986 vs. Heute)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.prices = {
    render: function (container) {
        const prices = window.DOMINIK_DATA?.prices || [];
        let rowsHtml = '';

        prices.forEach((item, idx) => {
            rowsHtml += `
                <tr>
                    <td style="background:#e8e8e8; font-weight:bold; text-align:center; width:30px;">${idx + 1}</td>
                    <td style="font-weight:bold;">${item.product}</td>
                    <td>${item.dm1986}</td>
                    <td style="color:#464653;">${item.eur1986}</td>
                    <td style="font-weight:bold;">${item.eurToday}</td>
                    <td style="color:#ba1a1a; font-weight:bold;">${item.factor}</td>
                </tr>
            `;
        });

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:8px;">
                <!-- Formel-Leiste -->
                <div class="retro-sunken" style="display:flex; align-items:center; background:#ffffff; padding:4px 8px; font-size:12px; min-width:0; overflow:hidden;">
                    <span style="font-weight:bold; color:#000080; margin-right:8px; border-right:1px solid #c0c0c0; padding-right:8px; flex-shrink:0;">fx</span>
                    <span style="font-family:monospace; color:#3239a3; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; min-width:0; flex:1;">=INFLATION_VERGLEICH(DOMINIK_1986..HEUTE; "SCHOCKFAKTOR")</span>
                </div>

                <!-- Tabellen-Raster -->
                <div class="retro-sunken table-responsive-container" style="overflow-x:auto; background:#ffffff;">
                    <table class="spreadsheet-table">
                        <thead>
                            <tr>
                                <th style="width:30px; text-align:center;">#</th>
                                <th>A: Produkt / Dienstleistung</th>
                                <th>B: Preis 1986 (DM)</th>
                                <th>C: 1986 in Euro (÷ 1,95583)</th>
                                <th>D: Preis heute (EUR)</th>
                                <th>E: Teuerung</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHtml}
                        </tbody>
                    </table>
                </div>

                <div style="font-size:11px; color:#464653; padding:4px;">
                    Hinweis: Amtliche Werte basierend auf Statistischem Bundesamt &amp; historischer Zeitungsanzeigen von 1986.
                </div>
            </div>
        `;
    }
};
