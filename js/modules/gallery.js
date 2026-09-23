// Modul M10: PAINT_AI.BMP (AI-Fotogalerie: Dominik Edition)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.gallery = {
    render: function (container) {
        const portraits = [
            {
                year: '1986',
                title: 'Release 1.0: Der Neuzugang',
                desc: 'Erstauslieferung am 25.09.1986. Noch ohne Zähne, aber bereits mit maximalem Stimmvolumen.',
                icon: 'child_care',
                color: '#ff9999'
            },
            {
                year: '1996',
                title: 'Version 10.0: Die 90er-Jahre',
                desc: 'Kassettensalat, GameBoy-Daddeln und wilde Fahrradtouren durch die Nachbarschaft.',
                icon: 'sports_esports',
                color: '#99ccff'
            },
            {
                year: '2006',
                title: 'Version 20.0: Volljährig & Tatendrang',
                desc: 'Führerschein in der Tasche, die ersten eigenen vier Wände und legendäre Partynächte.',
                icon: 'local_bar',
                color: '#ffcc66'
            },
            {
                year: '2016',
                title: 'Version 30.0: Im besten Mannesalter',
                desc: 'Karriere, echte Freundschaften und der Beginn des "Ich trinke jetzt nur noch guten Wein"-Zeitalters.',
                icon: 'workspace_premium',
                color: '#99ff99'
            },
            {
                year: '2026',
                title: 'Version 40.0: Die Jubiläums-Legende',
                desc: '40 Jahre Perfektion. Weisheit, Gelassenheit und immer noch top in Form für jedes Abenteuer.',
                icon: 'military_tech',
                color: '#ff99ff'
            }
        ];

        let activeIdx = 4; // Standard: 2026

        function updateCanvas() {
            const p = portraits[activeIdx];
            const canvasEl = container.querySelector('#paint-main-canvas');
            if (canvasEl) {
                canvasEl.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <div style="display: inline-flex; align-items: center; justify-content: center; width: 100px; height: 100px; background: ${p.color}; border: 3px solid #000000; box-shadow: 3px 3px 0px #808080; margin-bottom: 14px;">
                            <span class="material-symbols-outlined" style="font-size: 54px; color: #000080;">${p.icon}</span>
                        </div>
                        <h2 style="font-size: 16px; color: #000080; margin-bottom: 6px;">[${p.year}] ${p.title}</h2>
                        <p style="font-size: 12px; color: #1a1c1c; max-width: 440px; margin: 0 auto; line-height: 1.5;">${p.desc}</p>
                    </div>
                `;
            }

            container.querySelectorAll('.paint-thumb').forEach((thumb, idx) => {
                if (idx === activeIdx) {
                    thumb.style.borderColor = '#000080';
                    thumb.style.backgroundColor = '#e0e0ff';
                } else {
                    thumb.style.borderColor = '#c0c0c0';
                    thumb.style.backgroundColor = '#ffffff';
                }
            });
        }

        let thumbsHtml = '';
        portraits.forEach((p, idx) => {
            thumbsHtml += `
                <div class="paint-thumb retro-sunken" data-idx="${idx}" style="cursor: pointer; padding: 4px; display: flex; align-items: center; gap: 8px; border: 2px solid #c0c0c0; margin-bottom: 4px;">
                    <div style="width: 24px; height: 24px; background: ${p.color}; display: flex; align-items: center; justify-content: center;">
                        <span class="material-symbols-outlined" style="font-size: 16px; color: #000080;">${p.icon}</span>
                    </div>
                    <div style="font-size: 11px; font-weight: bold;">${p.year} (${p.title.split(':')[0]})</div>
                </div>
            `;
        });

        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <!-- Werkzeugleiste & Farbpalette (Paintbrush Mock) -->
                <div style="display: flex; gap: 4px; align-items: center; background: #e8e8e8; padding: 4px;" class="retro-sunken">
                    <span style="font-size: 11px; font-weight: bold; margin-right: 6px;">WERKZEUGE:</span>
                    <button class="retro-raised-btn" style="padding: 2px 6px;" title="Pinsel"><span class="material-symbols-outlined" style="font-size: 14px;">brush</span></button>
                    <button class="retro-raised-btn" style="padding: 2px 6px;" title="Farbeimer"><span class="material-symbols-outlined" style="font-size: 14px;">format_color_fill</span></button>
                    <button class="retro-raised-btn" style="padding: 2px 6px;" title="Lupe"><span class="material-symbols-outlined" style="font-size: 14px;">zoom_in</span></button>
                    <button class="retro-raised-btn" style="padding: 2px 6px;" title="Text"><span class="material-symbols-outlined" style="font-size: 14px;">title</span></button>
                    <div style="margin-left: auto; font-size: 10px; color: #464653;">Farbtiefe: 16 Farben VGA</div>
                </div>

                <!-- Arbeitsfläche Paint -->
                <div style="display: grid; grid-template-columns: 180px 1fr; gap: 8px;">
                    <div class="retro-sunken" style="background: #ffffff; padding: 6px; max-height: 380px; overflow-y: auto;">
                        <div style="font-size: 10px; font-weight: bold; margin-bottom: 6px; border-bottom: 1px solid #808080; padding-bottom: 2px;">
                            PORTRAIT-ALBUM:
                        </div>
                        ${thumbsHtml}
                    </div>

                    <div id="paint-main-canvas" class="retro-sunken" style="background: #ffffff; min-height: 280px; display: flex; align-items: center; justify-content: center;">
                    </div>
                </div>
            </div>
        `;

        container.querySelectorAll('.paint-thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                activeIdx = parseInt(thumb.getAttribute('data-idx'), 10);
                updateCanvas();
            });
        });

        updateCanvas();
    }
};
