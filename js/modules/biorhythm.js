// Modul: BIORHYTHM.EXE (Biorhythmus & Astrologie 1986)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.biorhythm = (function () {
    let targetDate = new Date(2026, 8, 25); // 25. September 2026 (40. Geburtstag)
    const birthDate = new Date(1986, 8, 25);

    function calculateValues(evalDate) {
        const diffTime = evalDate.getTime() - birthDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const cycles = window.DOMINIK_DATA?.biorhythm?.cycles || [];

        return cycles.map(c => {
            const val = Math.sin((2 * Math.PI * diffDays) / c.days);
            const percent = Math.round(val * 100);
            return { ...c, val, percent };
        });
    }

    function generateChartSvg(evalDate) {
        const width = 640;
        const height = 180;
        const midY = height / 2;
        const daysRange = 14; // -14 bis +14 Tage
        const totalDays = daysRange * 2;
        const stepX = width / totalDays;
        const cycles = window.DOMINIK_DATA?.biorhythm?.cycles || [];
        const baseDays = Math.floor((evalDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

        let curvesHtml = '';
        cycles.forEach(c => {
            let points = [];
            for (let i = -daysRange; i <= daysRange; i++) {
                const currentDay = baseDays + i;
                const val = Math.sin((2 * Math.PI * currentDay) / c.days);
                const x = (i + daysRange) * stepX;
                const y = midY - val * (height * 0.42);
                points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
            }
            curvesHtml += `
                <polyline fill="none" stroke="${c.color}" stroke-width="2.5" points="${points.join(' ')}" />
            `;
        });

        // Horizontale Achsen und Gitterlinien
        let gridHtml = `
            <line x1="0" y1="${midY}" x2="${width}" y2="${midY}" stroke="#808080" stroke-width="1.5" stroke-dasharray="3,3" />
            <line x1="${width / 2}" y1="0" x2="${width / 2}" y2="${height}" stroke="#ffff00" stroke-width="2" />
        `;

        return `
            <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" style="width: 100%; height: 180px; background: #000000; display: block;">
                ${gridHtml}
                ${curvesHtml}
                <text x="${width / 2 + 6}" y="20" fill="#ffff00" font-size="11" font-family="monospace" font-weight="bold">HEUTE (ZIELTAG)</text>
                <text x="10" y="20" fill="#ffffff" font-size="10" font-family="monospace">+100%</text>
                <text x="10" y="${height - 8}" fill="#ffffff" font-size="10" font-family="monospace">-100%</text>
            </svg>
        `;
    }

    function getDiagnosis(values) {
        const phys = values.find(v => v.id === 'physical')?.percent ?? 0;
        const emot = values.find(v => v.id === 'emotional')?.percent ?? 0;
        const intl = values.find(v => v.id === 'intellectual')?.percent ?? 0;

        let tips = [];
        if (phys >= 50) tips.push('Hervorragende Vitalität – optimal für eine durchtanzte Partynacht.');
        else if (phys <= -30) tips.push('Körperliches Schontempo empfohlen – bequemen Fernsehsessel reservieren.');
        else tips.push('Solide Grundfitness – die Bandscheibe hält stand.');

        if (emot >= 50) tips.push('Ausgelassene Feierlaune und maximale Geduld mit Freunden.');
        else if (emot <= -30) tips.push('Leichte Melancholie bei alten 80er-Hits – Taschentücher bereitlegen.');
        else tips.push('Emotionale Ausgeglichenheit auf solidem Niveau.');

        if (intl >= 50) tips.push('Geistige Spitzenform – unschlagbar beim 80er-Trivia-Quiz.');
        else tips.push('Entspannte Denkweise – logische Probleme werden auf morgen vertagt.');

        return tips.join(' ');
    }

    return {
        render: function (container) {
            const data = window.DOMINIK_DATA?.biorhythm;
            const values = calculateValues(targetDate);
            const dateStr = targetDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const svgChart = generateChartSvg(targetDate);
            const diagnosis = getDiagnosis(values);

            container.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 12px; padding: 4px;">
                    <!-- Kontroll-Leiste Datum -->
                    <div class="retro-window-frame" style="padding: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; background: #c0c0c0;">
                        <div style="font-weight: 700; font-size: 12px;">BERECHNUNGS-STICHTAG: <span style="color: #000080; font-size: 14px;">${dateStr}</span></div>
                        <div style="display: flex; gap: 4px;">
                            <button id="bio-prev-btn" class="retro-raised-btn" style="padding: 3px 8px; font-size: 11px;">&lt; -7 Tage</button>
                            <button id="bio-reset-btn" class="retro-raised-btn" style="padding: 3px 8px; font-size: 11px; font-weight: 700;">40. Geburtstag</button>
                            <button id="bio-next-btn" class="retro-raised-btn" style="padding: 3px 8px; font-size: 11px;">+7 Tage &gt;</button>
                        </div>
                    </div>

                    <!-- Diagramm-Fenster -->
                    <div class="retro-sunken-dark" style="border: 2px solid #808080; padding: 2px;">
                        ${svgChart}
                    </div>

                    <!-- Legende & Werte -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px;">
                        ${values.map(v => `
                            <div class="retro-sunken" style="background: #ffffff; padding: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <strong style="color: ${v.color}; font-size: 12px;">${v.name} (${v.days} T.)</strong>
                                    <span style="font-weight: 700; font-size: 13px; color: ${v.percent >= 0 ? '#008000' : '#b00000'};">
                                        ${v.percent > 0 ? '+' : ''}${v.percent}%
                                    </span>
                                </div>
                                <div style="font-size: 10px; color: #555555; line-height: 1.3;">
                                    ${v.desc}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Tagesform-Diagnose -->
                    <div class="retro-sunken" style="background: #ffffe0; border: 1px solid #c0c000; padding: 10px; font-size: 11px; line-height: 1.4;">
                        <strong style="color: #665500;">SYSTEM-DIAGNOSE ZUM 40. GEBURTSTAG:</strong><br>
                        ${diagnosis}
                    </div>

                    <!-- Astrologie & 1986er Kosmologie -->
                    <div class="retro-window-frame" style="background: #e8e8e8; padding: 10px;">
                        <div style="font-weight: 700; font-size: 12px; margin-bottom: 8px; color: #000080;">
                            KOSMISCHE ANALYSE DES GEBURTSJAHRGANGS 1986
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px;">
                            <div class="retro-sunken" style="background: #ffffff; padding: 8px; font-size: 11px;">
                                <div style="font-weight: 700; margin-bottom: 4px; color: #800080;">
                                    ${data.zodiac.symbol} WESTLICHES STERNZEICHEN: ${data.zodiac.sign}
                                </div>
                                <ul style="margin: 0; padding-left: 16px; line-height: 1.4;">
                                    ${data.zodiac.characteristics.map(c => `<li>${c}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="retro-sunken" style="background: #ffffff; padding: 8px; font-size: 11px;">
                                <div style="font-weight: 700; margin-bottom: 4px; color: #cc6600;">
                                    ${data.chineseZodiac.symbol} CHINESISCHES ZEICHEN: ${data.chineseZodiac.sign}
                                </div>
                                <ul style="margin: 0; padding-left: 16px; line-height: 1.4;">
                                    ${data.chineseZodiac.traits.map(t => `<li>${t}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            container.querySelector('#bio-prev-btn')?.addEventListener('click', () => {
                targetDate.setDate(targetDate.getDate() - 7);
                window.DOMINIK_MODULES.biorhythm.render(container);
            });
            container.querySelector('#bio-next-btn')?.addEventListener('click', () => {
                targetDate.setDate(targetDate.getDate() + 7);
                window.DOMINIK_MODULES.biorhythm.render(container);
            });
            container.querySelector('#bio-reset-btn')?.addEventListener('click', () => {
                targetDate = new Date(2026, 8, 25);
                window.DOMINIK_MODULES.biorhythm.render(container);
            });
        }
    };
})();
