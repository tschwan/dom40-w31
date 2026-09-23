// Modul M13: NETSCAPE.EXE (Web 1.0 Trash-Browser)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.netscape = {
    render: function (container) {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 6px;">
                <!-- Browser-Toolbar -->
                <div class="retro-sunken" style="background: #c0c0c0; padding: 4px; display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; gap: 4px; align-items: center;">
                        <button class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;">◀ Zurück</button>
                        <button class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;">Vor ▶</button>
                        <button class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;">Home</button>
                        <button class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;">Neu laden</button>
                        <button class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;" onclick="window.print()">Drucken</button>
                        <button class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px; color: #ba1a1a;">Stopp</button>
                        <div style="margin-left: auto; width: 26px; height: 26px; background: #000080; color: #00ff66; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 1px solid #000000;">
                            N
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
                        <span style="font-weight: bold;">Adresse:</span>
                        <div class="retro-sunken" style="flex: 1; background: #ffffff; padding: 2px 6px; font-family: monospace; font-size: 11px; overflow: hidden; white-space: nowrap;">
                            http://www.dominik-wird-40-mega-party.de.vu/~dominik86/index.html
                        </div>
                    </div>
                </div>

                <!-- Web 1.0 Trash-Homepage Viewport -->
                <div class="retro-sunken" style="background: #000033; color: #ffff00; padding: 16px; max-height: 420px; overflow-y: auto; font-family: 'Comic Sans MS', cursive, sans-serif;">
                    <!-- Marquee Ticker -->
                    <div style="background: #ff0000; color: #ffffff; padding: 4px; font-weight: bold; margin-bottom: 14px; border: 2px dashed #ffff00; text-align: center;">
                        <marquee scrollamount="5">+++ HERZLICH WILLKOMMEN AUF DER MEGA-HOMEPAGE VON DOMINIK +++ DIESE SEITE IST BEST VIEWED IN NETSCAPE NAVIGATOR BEI 800x600 PIXELN MIT 256 FARBEN +++ BITTE INS GÄSTEBUCH EINTRAGEN +++</marquee>
                    </div>

                    <div style="text-align: center; margin-bottom: 14px;">
                        <div style="display: inline-block; background: #ffff00; color: #000000; padding: 4px 12px; font-weight: 900; font-size: 18px; border: 3px solid #ff0000; transform: rotate(-2deg); margin-bottom: 8px;">
                            ⚠ UNDER CONSTRUCTION ⚠
                        </div>
                        <h2 style="font-size: 22px; color: #00ffff; text-shadow: 2px 2px #ff00ff; margin-bottom: 4px;">
                            ~*~ Dominiks 40. Geburtstag Cyber-Zone ~*~
                        </h2>
                        <p style="font-size: 12px; color: #00ff66;">
                            [ Erstellt mit Microsoft FrontPage Express '97 auf Windows 3.11 ]
                        </p>
                    </div>

                    <!-- Trash Table Layout -->
                    <table style="width: 100%; border: 3px ridge #ff00ff; background: #000066; margin-bottom: 16px; font-size: 12px;">
                        <tr>
                            <td style="border: 2px solid #00ffff; padding: 10px; width: 30%; vertical-align: top; background: #110033;">
                                <div style="color: #ff9900; font-weight: bold; border-bottom: 1px dotted #ffff00; margin-bottom: 6px;">
                                    ★ NAVIGATION ★
                                </div>
                                <ul style="list-style: square; padding-left: 16px; line-height: 1.8; color: #ffffff;">
                                    <li><a href="#" style="color: #00ffff;" onclick="window.DOMINIK_STATE.openProgram('charts')">Lieblings-Mucke</a></li>
                                    <li><a href="#" style="color: #00ffff;" onclick="window.DOMINIK_STATE.openProgram('games')">Games 1986</a></li>
                                    <li><a href="#" style="color: #00ffff;" onclick="window.DOMINIK_STATE.openProgram('prices')">Preise damals</a></li>
                                    <li><a href="#" style="color: #00ffff;" onclick="window.DOMINIK_STATE.openProgram('guestbook')">Mein Gästebuch</a></li>
                                </ul>
                            </td>
                            <td style="border: 2px solid #00ffff; padding: 10px; vertical-align: top; color: #ffffff;">
                                <h3 style="color: #ffff00; font-size: 14px; margin-bottom: 6px;">Über mich:</h3>
                                <p style="line-height: 1.5; margin-bottom: 8px;">
                                    Hey Leute! Ich bin Dominik, geboren am 25.09.1986 im Sternzeichen Waage.
                                    Ich liebe Rugby, CS und gute Laune! Jetzt bin ich 40 Jahre alt –
                                    aber fühle mich noch (fast) wie 39.
                                </p>
                                <p style="color: #00ff66;">
                                    Status: <em>"Biertrinken ist wichtig für die Elektrolyte!"</em>
                                </p>
                            </td>
                        </tr>
                    </table>

                    <!-- Besucherzähler -->
                    <div style="text-align: center; padding: 10px; border: 2px solid #ffffff; background: #000000; width: 260px; margin: 0 auto;">
                        <div style="font-size: 11px; color: #ffffff; margin-bottom: 4px;">DU BIST BESUCHER NUMMER:</div>
                        <div style="display: inline-flex; gap: 2px; font-family: monospace; font-size: 16px; font-weight: bold; color: #00ff00; background: #111111; padding: 2px 6px; border: 1px solid #333333;">
                            <span>0</span><span>0</span><span>0</span><span>0</span><span>4</span><span>0</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
