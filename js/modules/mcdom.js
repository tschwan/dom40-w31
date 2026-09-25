// Modul: MC_DOM.EXE (McDominik Anti-Sin Professional 1986)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.mcdom = (function () {
    let scanState = 'ready'; // ready, scanning, done
    let scanProgress = 0;
    let foundSins = [];
    let quarantined = {};
    let denied = {};
    let scanTimer = null;
    let currentScanningFile = 'Bereit zum Durchsuchen der 80er-Jahre...';
    let audioCtx = null;

    function getMcDomData() {
        return window.DOMINIK_DATA?.mcdom || { sins: [] };
    }

    function playDiskRattle() {
        try {
            if (!audioCtx) {
                const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
                if (AudioCtxClass) audioCtx = new AudioCtxClass();
            }
            if (!audioCtx) return;
            if (audioCtx.state === 'suspended') audioCtx.resume();

            const t = audioCtx.currentTime;
            // Floppy-Kopfbewegung Klick-Klack
            for (let i = 0; i < 2; i++) {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(80 + Math.random() * 40, t + i * 0.04);
                gain.gain.setValueAtTime(0.08, t + i * 0.04);
                gain.gain.linearRampToValueAtTime(0.01, t + i * 0.04 + 0.02);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(t + i * 0.04);
                osc.stop(t + i * 0.04 + 0.02);
            }
        } catch {
            // Audio context silently ignored
        }
    }

    function playAlarm() {
        try {
            if (!audioCtx) return;
            const t = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(880, t);
            osc.frequency.setValueAtTime(440, t + 0.1);
            gain.gain.setValueAtTime(0.1, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.2);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(t);
            osc.stop(t + 0.2);
        } catch {
            // Silently ignore
        }
    }

    function addSinToRecycleBin(sin) {
        if (!sin) return;
        window.DOMINIK_DATA = window.DOMINIK_DATA || {};
        window.DOMINIK_DATA.recycleItems = window.DOMINIK_DATA.recycleItems || [];
        const exists = window.DOMINIK_DATA.recycleItems.some(item => item.id === sin.id);
        if (!exists) {
            window.DOMINIK_DATA.recycleItems.unshift({
                id: sin.id,
                filename: sin.filename,
                type: 'infected_sin',
                sinData: sin,
                size: '666 KB',
                icon: 'coronavirus',
                date: new Date().toLocaleDateString('de-DE') + ' ' + new Date().toLocaleTimeString('de-DE').slice(0, 5)
            });
        }
    }

    function startScan(container) {
        scanState = 'scanning';
        scanProgress = 0;
        foundSins = [];
        quarantined = {};
        denied = {};
        const data = getMcDomData();
        const allSins = data.sins || [];
        if (allSins.length === 0) return;

        // Wählt genau EINE zufällige Jugendsünde für diesen Scanlauf
        const targetSin = allSins[Math.floor(Math.random() * allSins.length)];

        const dummyFiles = [
            'C:\\SCHULE\\HAUSAUFGABEN_HEFT_1997.DAT',
            'C:\\LANPARTY\\CS15_DE_DUST2.DEM',
            'C:\\HANDY_NOKIA_3310\\SNAKE_HIGHSCORE.SAV',
            'C:\\SCHULRANZEN\\DIDDL_SAMMELBLOCK.DOC',
            'C:\\WOW\\MOLTEN_CORE_SCREENSHOTS_2004.JPG',
            'C:\\ICQ_MESSENGER\\CONTACT_LIST_2001.UIN',
            'C:\\TEAMSPEAK\\SERVER_RAID_LOGIN.CFG'
        ];

        if (scanTimer) clearInterval(scanTimer);
        let step = 0;

        scanTimer = setInterval(() => {
            if (!container.isConnected) {
                clearInterval(scanTimer);
                return;
            }

            step++;
            scanProgress = Math.min(100, Math.round((step / 16) * 100));

            // Rattergeräusch simulieren
            if (step % 2 === 0) playDiskRattle();

            // Gegen Ende des Scans die eine ausgewählte Sünde aufspüren
            if (step === 12) {
                foundSins = [targetSin];
                addSinToRecycleBin(targetSin);
                currentScanningFile = `⚠️ ALARM: ${targetSin.filename} entdeckt!`;
                playAlarm();
            } else if (step < 12) {
                currentScanningFile = dummyFiles[step % dummyFiles.length];
            }

            renderUI(container);

            if (step >= 16) {
                clearInterval(scanTimer);
                scanState = 'done';
                foundSins = [targetSin];
                addSinToRecycleBin(targetSin);
                currentScanningFile = `Suchlauf beendet: "${targetSin.filename}" aufgespürt & in den Papierkorb verschoben!`;
                renderUI(container);
            }
        }, 160);
    }

    function renderUI(container) {
        const data = getMcDomData();
        const sins = data.sins || [];
        const totalFound = foundSins.length;

        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 10px; padding: 6px;">
                <!-- Antivirus Banner -->
                <div class="retro-window-frame" style="background: linear-gradient(to right, #000080, #0040c0); color: #ffffff; padding: 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="material-symbols-outlined" style="font-size: 34px; color: #ffff00;">security</span>
                        <div>
                            <strong style="font-size: 14px; letter-spacing: 0.5px;">McDominik Anti-Sin Professional 1986</strong><br>
                            <span style="font-size: 11px; color: #c0d0ff;">Systemintegritäts-Scanner für die Jugendjahre // ${data.version}</span>
                        </div>
                    </div>
                    <div class="retro-sunken" style="background: #ffffff; color: #000080; font-size: 11px; font-weight: 700; padding: 3px 8px;">
                        ZIEL: ${data.targetPath}
                    </div>
                </div>

                <!-- Status & Fortschritt -->
                <div class="retro-sunken" style="background: #f0f0f0; padding: 8px; display: flex; flex-direction: column; gap: 6px;">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700;">
                        <span>SCAN-STATUS: ${scanState === 'scanning' ? '⏳ DURCHSUCHUNG LÄUFT...' : scanState === 'done' ? '⚠️ JUGENDSÜNDEN ERKANNT!' : 'BEREIT'}</span>
                        <span style="color: ${totalFound > 0 ? '#b00000' : '#008000'};">GEFUNDENE SÜNDEN: ${totalFound}</span>
                    </div>

                    <!-- Progress Bar -->
                    <div class="retro-sunken" style="height: 18px; background: #ffffff; overflow: hidden; position: relative;">
                        <div id="mcdom-progress-fill" style="height: 100%; width: ${scanProgress}%; background: ${scanState === 'done' ? '#b00000' : '#000080'}; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 10px; font-weight: 700; transition: width 0.15s ease;">
                            ${scanProgress}%
                        </div>
                    </div>

                    <!-- Current File Scan Ticker -->
                    <div style="font-family: monospace; font-size: 11px; color: #333333; background: #ffffff; padding: 4px 6px; border: 1px solid #767684; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${currentScanningFile}
                    </div>
                </div>

                <!-- Steuerungs-Leiste -->
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button id="mcdom-start-scan-btn" class="retro-raised-btn" style="padding: 5px 14px; font-size: 11px; font-weight: 700; color: #000080; display: inline-flex; align-items: center; gap: 6px;" ${scanState === 'scanning' ? 'disabled' : ''}>
                        <span class="material-symbols-outlined" style="font-size: 16px;">radar</span>
                        <span>${scanState === 'done' ? '🔍 Weitere zufällige Jugendsünde aufspüren' : '🚀 Jugendsünden-Scan starten'}</span>
                    </button>
                    ${scanState === 'done' ? `
                        <button id="mcdom-confess-all-btn" class="retro-raised-btn" style="padding: 5px 14px; font-size: 11px; font-weight: 700; color: #804000; display: inline-flex; align-items: center; gap: 6px;">
                            <span class="material-symbols-outlined" style="font-size: 16px;">receipt_long</span>
                            <span>Offizielle Absolutions-Urkunde</span>
                        </button>
                    ` : ''}
                </div>

                <!-- Scan-Ergebnisse Liste -->
                ${foundSins.length > 0 ? `
                    <div class="retro-window-frame" style="background: #ffffff; padding: 8px; max-height: 290px; overflow-y: auto;">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000080; padding-bottom: 4px; margin-bottom: 8px;">
                            <strong style="font-size: 12px; color: #000080;">IDENTIFIZIERTE JUGENDSÜNDEN (80er/90er):</strong>
                            <span style="font-size: 10px; color: #666666;">Peinlichkeits-Level: MAXIMUM</span>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            ${foundSins.map(sin => {
                                const isQuarantined = !!quarantined[sin.id];
                                const isDenied = !!denied[sin.id];
                                return `
                                    <div class="retro-sunken" style="background: ${isQuarantined ? '#f0fff0' : isDenied ? '#fff8f0' : '#ffffff'}; border-color: ${isQuarantined ? '#00aa00' : '#767684'}; padding: 8px; display: flex; flex-direction: column; gap: 4px;">
                                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 4px;">
                                            <div>
                                                <strong style="font-size: 12px; color: #b00000;">${sin.name}</strong>
                                                <div style="font-family: monospace; font-size: 10px; color: #555555;">${sin.path}</div>
                                            </div>
                                            <span class="retro-raised" style="background: #ffe0e0; border: 1px solid #b00000; font-size: 9px; font-weight: 700; color: #b00000; padding: 1px 6px;">
                                                ${sin.severity}
                                            </span>
                                        </div>
                                        <div style="font-size: 11px; line-height: 1.4; color: #222222;">
                                            <strong>Symptom:</strong> ${sin.symptom}
                                        </div>
                                        <div style="font-size: 11px; line-height: 1.4; color: #555555; font-style: italic;">
                                            ${sin.details}
                                        </div>
                                        ${isQuarantined ? `
                                            <div style="font-size: 10px; font-weight: 700; color: #008000; margin-top: 4px;">
                                                ✅ ${sin.quarantineNote}
                                            </div>
                                        ` : isDenied ? `
                                            <div style="font-size: 10px; font-weight: 700; color: #b04000; margin-top: 4px;">
                                                🙈 Leugnen fehlgeschlagen: Die Klassenfreunde von 1986 haben bereits die Fotos auf den Tisch gelegt!
                                            </div>
                                        ` : `
                                            <div style="display: flex; gap: 6px; margin-top: 4px; flex-wrap: wrap;">
                                                <button class="mcdom-quarantine-btn retro-raised-btn" data-id="${sin.id}" style="padding: 2px 8px; font-size: 10px; font-weight: 700; color: #006000;">
                                                    📦 In Kult-Quarantäne
                                                </button>
                                                <button class="mcdom-deny-btn retro-raised-btn" data-id="${sin.id}" style="padding: 2px 8px; font-size: 10px; font-weight: 700; color: #800000;">
                                                    🙈 Sünde leugnen
                                                </button>
                                            </div>
                                        `}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : `
                    <div class="retro-window-frame" style="background: #ffffff; padding: 24px; text-align: center; color: #666666;">
                        <span class="material-symbols-outlined" style="font-size: 40px; color: #000080; margin-bottom: 6px;">troubleshoot</span>
                        <div style="font-size: 12px; font-weight: 700;">Keine aktiven Scan-Ergebnisse</div>
                        <div style="font-size: 11px; margin-top: 4px;">
                            Klicken Sie auf <strong>"Jugendsünden-Scan starten"</strong>, um Festplatte C:\\ nach Blümchen, Tamagotchis, Baggy Pants, Counter-Strike und World of Warcraft zu durchleuchten.
                        </div>
                    </div>
                `}
            </div>
        `;

        // Event Listeners
        container.querySelector('#mcdom-start-scan-btn')?.addEventListener('click', () => {
            startScan(container);
        });

        container.querySelectorAll('.mcdom-quarantine-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                quarantined[id] = true;
                playDiskRattle();
                renderUI(container);
            });
        });

        container.querySelectorAll('.mcdom-deny-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                denied[id] = true;
                playAlarm();
                renderUI(container);
            });
        });

        container.querySelector('#mcdom-confess-all-btn')?.addEventListener('click', () => {
            showAbsolutionModal(container);
        });
    }

    function showAbsolutionModal(container) {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0, 0, 0, 0.6)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.style.padding = '12px';

        modal.innerHTML = `
            <div class="retro-window" style="max-width: 520px; width: 100%; background: #ffffea; border: 3px solid #000080; padding: 14px; box-shadow: 4px 4px 12px rgba(0,0,0,0.5);">
                <div style="border-bottom: 2px solid #000080; padding-bottom: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #000080; font-size: 13px;">📜 AMTLICHE ABSOLUTIONS-URKUNDE (1994–2004)</strong>
                    <button id="absolution-close-btn" class="retro-raised-btn" style="padding: 1px 6px; font-weight: 700;">X</button>
                </div>
                <div style="font-size: 11px; line-height: 1.6; color: #2a2000;">
                    <p style="margin: 0 0 8px 0;"><strong>Hiermit wird amtlich beglaubigt:</strong></p>
                    <p style="margin: 0 0 8px 0;">
                        Dem Systembenutzer <strong>Dominik</strong> werden hiermit sämtliche Vergehen der Jugendjahre <strong>1994 bis 2004 (im Alter von 8 bis 18 Jahren)</strong> – inklusive Blümchen-Rave, Tamagotchi-Drama, Zahnspangen-Recherchen in der BRAVO, Baggy Pants in den Kniekehlen, gelb gebleichten Strähnchen, fehlgeleiteten Counter-Strike-Team-Flashbangs auf de_dust2 und durchgezockten World-of-Warcraft-Nächten vor Ragnaros – in vollem Umfang vergeben.
                    </p>
                    <p style="margin: 0 0 8px 0;">
                        Die Taten gelten ab sofort nicht mehr als <em>"peinliche Fehltritte"</em>, sondern als <strong>hochwertiges, unantastbares 90er- & 2000er-Kulturgut</strong>.
                    </p>
                    <div style="border-top: 1px dashed #b08000; padding-top: 6px; display: flex; justify-content: space-between; font-size: 10px; color: #555555;">
                        <span>Ausgestellt durch: McDominik Anti-Sin 2.0</span>
                        <span>Stempel: GÜLTIG BIS ZUM 80. GEBURTSTAG</span>
                    </div>
                </div>
                <div style="margin-top: 12px; text-align: right;">
                    <button id="absolution-ok-btn" class="retro-raised-btn" style="padding: 4px 16px; font-weight: 700; color: #000080;">Amen (Schließen)</button>
                </div>
            </div>
        `;

        const close = () => modal.remove();
        modal.querySelector('#absolution-close-btn')?.addEventListener('click', close);
        modal.querySelector('#absolution-ok-btn')?.addEventListener('click', close);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });

        document.body.appendChild(modal);
    }

    return {
        render: function (container) {
            renderUI(container);
        }
    };
})();
