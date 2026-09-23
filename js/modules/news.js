// Modul M08: NEWSWIRE.TXT (Tages-Ticker 25.09.1986)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.news = {
    render: function (container) {
        const news = window.DOMINIK_DATA?.news || [];
        let itemsHtml = '';

        news.forEach((item, index) => {
            const isFirst = index === 0;
            const itemStyle = isFirst
                ? 'border: 1px solid #ffff00; padding: 10px; margin-bottom: 12px; background: rgba(255, 255, 0, 0.08);'
                : 'border-bottom: 1px dashed #008040; padding: 8px 0; margin-bottom: 8px;';

            itemsHtml += `
                <div style="${itemStyle}">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: ${isFirst ? '#ffff00' : '#80ff80'}; margin-bottom: 4px;">
                        <span>[${item.time}]</span>
                        <span>// ${item.rubrik} //</span>
                    </div>
                    <div style="font-size: 13px; font-weight: 700; color: ${isFirst ? '#ffff00' : '#ffffff'}; margin-bottom: 4px;">
                        ${item.headline}
                    </div>
                    <div style="font-size: 12px; line-height: 1.4; color: #a0ffa0;">
                        ${item.text}
                    </div>
                </div>
            `;
        });

        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="font-size: 11px; background: #e8e8e8; padding: 4px 8px; word-break: break-word;" class="retro-sunken">
                    DPA / REUTERS TELEGRAPHEN-EMPFÄNGER | DATUM: 25.09.1986 | STATUS: LIVE-FEED
                </div>

                <div class="retro-sunken-dark" style="padding: 14px; max-height: 400px; overflow-y: auto; font-family: 'Courier Prime', Courier, monospace;">
                    <div style="color: #00ff66; margin-bottom: 12px; font-size: 11px; border-bottom: 1px solid #00ff66; padding-bottom: 4px; word-break: break-word;">
                        +++ EILMELDUNG-TELETYPE SYSTEM V40.0 +++ EMPFANG BESTÄTIGT +++
                    </div>
                    ${itemsHtml}
                    <div style="color: #00ff66; margin-top: 16px; font-size: 11px; text-align: center;">
                        *** ENDE DER TAGESDEPESCHE 25.09.1986 ***
                    </div>
                </div>
            </div>
        `;
    }
};
