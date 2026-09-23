// Modul M06: ARCADE86.EXE (Gaming-Highlights 1986)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.games = {
    render: function (container) {
        const games = window.DOMINIK_DATA?.games || [];
        let gamesHtml = '';

        games.forEach((game, idx) => {
            gamesHtml += `
                <div class="retro-sunken" style="background: #ffffff; padding: 10px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-weight: 700; font-size: 13px; color: #000080;">${game.title}</span>
                            <span style="background: #e8e8e8; font-size: 10px; padding: 1px 4px; font-weight: bold; border: 1px solid #767684;">1986</span>
                        </div>
                        <div style="font-size: 10px; color: #006e6e; margin-bottom: 6px; font-weight: bold;">
                            ${game.platform} | ${game.developer}
                        </div>
                        <p style="font-size: 11px; line-height: 1.4; color: #1a1c1c;">
                            ${game.trivia}
                        </p>
                    </div>
                    <div style="margin-top: 8px; font-size: 10px; color: #464653; border-top: 1px dotted #c0c0c0; padding-top: 4px;">
                        Genre: <strong>${game.genre}</strong>
                    </div>
                </div>
            `;
        });

        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <!-- Highscore Banner -->
                <div class="retro-sunken-dark" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; font-family: monospace;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span class="material-symbols-outlined" style="font-size: 18px; color: #ffff00;">sports_esports</span>
                        <span style="color: #ffff00; font-weight: bold;">HALL OF FAME:</span>
                    </div>
                    <div style="color: #00ff66; font-size: 12px; font-weight: bold;">
                        1ST: DOMINIK | LEVEL 40 | SCORE: 999.999 PTS
                    </div>
                </div>

                <!-- Games Grid -->
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 8px; max-height: 400px; overflow-y: auto;">
                    ${gamesHtml}
                </div>
            </div>
        `;
    }
};
