// Modul M12: CERTIF.PRN (Club der alten Säcke Urkunde)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.certificate = {
    render: function (container) {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div class="no-print" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; background: #e0e0ff; padding: 8px 12px; border: 1px solid #767684;">
                    <span style="font-size: 11px;">9-NADEL-MATRIX-DRUCKER-VORSCHAU: A4-Dokument bereit.</span>
                    <button class="retro-raised-btn" style="padding: 4px 14px; font-weight: bold; display: flex; align-items: center; gap: 4px;" onclick="window.print()">
                        <span class="material-symbols-outlined" style="font-size: 16px;">print</span>
                        <span>Urkunde drucken / PDF</span>
                    </button>
                </div>

                <div class="certificate-printable retro-sunken" style="background: #ffffff; padding: 24px; text-align: center; border: 4px double #000000; box-shadow: inset 0 0 0 2px #c0c0c0;">
                    <div style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #464653; margin-bottom: 6px;">
                        ★ BUNDESVERBAND DER REIFEN JAHRGÄNGE ★
                    </div>
                    <h1 style="font-size: 24px; font-weight: 700; color: #000080; margin-bottom: 4px; text-transform: uppercase;">
                        Urkunde der Aufnahme
                    </h1>
                    <div style="font-size: 13px; font-style: italic; margin-bottom: 16px; color: #000000;">
                        in den ehrenwerten „Club der alten Säcke“
                    </div>

                    <div style="margin: 16px auto; width: 80%; border-top: 2px solid #000000; border-bottom: 2px solid #000000; padding: 12px 0;">
                        <span style="font-size: 12px; display: block; margin-bottom: 4px;">Hiermit wird feierlich beurkundet:</span>
                        <span style="font-size: 22px; font-weight: 700; color: #000080; display: block; letter-spacing: 1px;">DOMINIK</span>
                        <span style="font-size: 11px; color: #464653; display: block; margin-top: 4px;">Geboren am 25. September 1986</span>
                    </div>

                    <p style="font-size: 12px; line-height: 1.6; max-width: 500px; margin: 0 auto 16px auto; text-align: justify;">
                        hat am 25. September 2026 nach 40 Jahren ehrenhafter Wanderschaft auf Erden das biblische Alter erreicht.
                        Mit Wirkung zum heutigen Tage erhält der Jubilar alle damit verbundenen Sonderrechte:
                        ungefragtes Erteilen von Lebensratschlägen, lautes Stöhnen beim Aufstehen sowie das Recht,
                        die Jugendmusik von heute als „reinen Krach“ zu bezeichnen.
                    </p>

                    <div style="display: flex; justify-content: space-around; align-items: flex-end; flex-wrap: wrap; gap: 12px; margin-top: 24px;">
                        <div style="text-align: center;">
                            <div style="border-bottom: 1px solid #000000; width: 140px; margin-bottom: 4px; font-family: cursive; font-size: 14px;">Die Gang</div>
                            <span style="font-size: 10px;">Datum: 25.09.2026</span>
                        </div>
                        <div style="border: 2px dashed #ba1a1a; color: #ba1a1a; padding: 6px 12px; font-size: 11px; font-weight: 700; transform: rotate(-4deg); text-transform: uppercase;">
                            ★ 40 JAHRE LEVEL 40 ★<br>OFFIZIELL BESIEGELT
                        </div>
                        <div style="text-align: center;">
                            <div style="border-bottom: 1px solid #000000; width: 140px; margin-bottom: 4px; font-family: cursive; font-size: 14px;">Deine Gangstas</div>
                            <span style="font-size: 10px;">Siegel &amp; Unterschrift</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
