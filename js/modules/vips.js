// Modul M04: VIP_LIST.DBF (Geburtstags-Zwillinge)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.vips = {
    render: function (container) {
        const vips = window.DOMINIK_DATA?.vips || [];
        let cardsHtml = '';

        vips.forEach(vip => {
            const isSpecial = vip.isJubilar;
            const borderStyle = isSpecial ? 'border: 2px solid #000080; background: #fffde0;' : 'background: #ffffff;';
            const badgeBg = isSpecial ? '#000080' : '#464653';

            cardsHtml += `
                <div class="retro-sunken" style="padding: 10px; ${borderStyle} display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                            <span style="font-weight: 700; font-size: 13px; color: ${isSpecial ? '#000080' : '#000000'};">
                                ${vip.name}
                            </span>
                            <span style="background: ${badgeBg}; color: #ffffff; font-size: 10px; padding: 1px 5px; font-weight: 700;">
                                *${vip.birthYear}
                            </span>
                        </div>
                        <div style="font-size: 11px; font-weight: 700; color: #006e6e; margin-bottom: 6px;">
                            ${vip.profession}
                        </div>
                        <p style="font-size: 11px; line-height: 1.4; color: #1a1c1c;">
                            ${vip.achievement}
                        </p>
                    </div>
                    ${isSpecial ? '<div style="margin-top: 8px; font-size: 10px; font-weight: 700; color: #ba1a1a; text-align: right;">★ JUBILAR DES TAGES ★</div>' : ''}
                </div>
            `;
        });

        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; background: #e8e8e8; padding: 4px 8px; font-size: 11px;" class="retro-sunken">
                    <span>DATEI: VIP_1986.DBF | DATENSÄTZE: ${vips.length}</span>
                    <span>INDEX: GEBURTSDATUM = 25. SEPTEMBER</span>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; max-height: 420px; overflow-y: auto; padding: 2px;">
                    ${cardsHtml}
                </div>
            </div>
        `;
    }
};
