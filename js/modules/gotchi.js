// Modul: GOTCHI.EXE (Dominik-Gotchi 1986 Nerd-Edition)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.gotchi = (function () {
    let stats = { energy: 75, hunger: 60, skill: 40, happiness: 80 };
    let currentMood = 'idle'; // idle, eating, coding, gaming, bbs, sleeping
    let moodTimer = null;
    let tickTimer = null;
    let currentThought = '„LOAD \'*\',8,1 ... Searching for Dominik ... READY.“';
    let logEntries = [];
    let audioCtx = null;
    let animFrame = 0;
    let canvasAnimId = null;

    function getGotchiData() {
        return window.DOMINIK_DATA?.gotchi || { actions: [], idleQuotes: [] };
    }

    function playBeep(type) {
        try {
            if (!audioCtx) {
                const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
                if (AudioCtxClass) audioCtx = new AudioCtxClass();
            }
            if (!audioCtx) return;
            if (audioCtx.state === 'suspended') audioCtx.resume();

            const t = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if (type === 'eat') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(520, t);
                osc.frequency.setValueAtTime(780, t + 0.08);
                gain.gain.setValueAtTime(0.08, t);
                gain.gain.linearRampToValueAtTime(0.01, t + 0.16);
                osc.start(t);
                osc.stop(t + 0.16);
            } else if (type === 'cheer') {
                const notes = [440, 554, 659, 880];
                notes.forEach((freq, idx) => {
                    const o = audioCtx.createOscillator();
                    const g = audioCtx.createGain();
                    o.type = 'square';
                    o.frequency.value = freq;
                    o.connect(g);
                    g.connect(audioCtx.destination);
                    g.gain.setValueAtTime(0.07, t + idx * 0.06);
                    g.gain.linearRampToValueAtTime(0.01, t + (idx + 1) * 0.06);
                    o.start(t + idx * 0.06);
                    o.stop(t + (idx + 1) * 0.06);
                });
            } else if (type === 'alarm') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(220, t);
                osc.frequency.linearRampToValueAtTime(110, t + 0.25);
                gain.gain.setValueAtTime(0.1, t);
                gain.gain.linearRampToValueAtTime(0.01, t + 0.25);
                osc.start(t);
                osc.stop(t + 0.25);
            } else {
                osc.type = 'square';
                osc.frequency.setValueAtTime(880, t);
                gain.gain.setValueAtTime(0.06, t);
                gain.gain.linearRampToValueAtTime(0.01, t + 0.06);
                osc.start(t);
                osc.stop(t + 0.06);
            }
        } catch {
            // Audio context silently ignored
        }
    }

    function addLog(msg) {
        logEntries.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`);
        if (logEntries.length > 5) logEntries.pop();
    }

    function clamp(val) {
        return Math.max(0, Math.min(100, Math.round(val)));
    }

    function triggerAction(actionId, container) {
        const data = getGotchiData();
        const act = (data.actions || []).find(a => a.id === actionId);
        if (!act) return;

        stats.energy = clamp(stats.energy + (act.effects.energy || 0));
        stats.hunger = clamp(stats.hunger + (act.effects.hunger || 0));
        stats.skill = clamp(stats.skill + (act.effects.skill || 0));
        stats.happiness = clamp(stats.happiness + (act.effects.happiness || 0));

        const msgList = act.messages || [];
        const msg = msgList[Math.floor(Math.random() * msgList.length)] || act.label;
        currentThought = msg;
        addLog(msg);

        if (actionId === 'pizza') {
            currentMood = 'eating';
            playBeep('eat');
        } else if (actionId === 'diskette') {
            currentMood = 'coding';
            playBeep('cheer');
        } else if (actionId === 'game') {
            currentMood = 'gaming';
            playBeep('cheer');
        } else if (actionId === 'modem') {
            currentMood = 'bbs';
            playBeep('alarm');
        } else if (actionId === 'nap') {
            currentMood = 'sleeping';
            playBeep('beep');
        }

        if (moodTimer) clearTimeout(moodTimer);
        moodTimer = setTimeout(() => {
            currentMood = 'idle';
            updateDisplay(container);
        }, 3500);

        updateDisplay(container);
    }

    function drawPixelArt(ctx, mood, step) {
        ctx.fillStyle = '#8f9f78';
        ctx.fillRect(0, 0, 160, 100);

        // CRT-Monitor im Hintergrund
        ctx.fillStyle = '#2b3818';
        ctx.fillRect(95, 25, 45, 35);
        ctx.fillStyle = '#6f8356';
        ctx.fillRect(99, 29, 37, 27);
        // Code auf Monitor flackert
        ctx.fillStyle = '#2b3818';
        const lineOffset = step % 4;
        ctx.fillRect(101, 33 + lineOffset, 22, 2);
        ctx.fillRect(101, 38 + lineOffset, 30, 2);
        ctx.fillRect(101, 44, 18, 2);
        // Tastatur & Rechner
        ctx.fillStyle = '#3c4d24';
        ctx.fillRect(92, 63, 50, 6);
        ctx.fillRect(90, 69, 54, 8);

        // Dominik Sprite Position
        const bob = (mood !== 'sleeping' && step % 2 === 0) ? -2 : 0;
        const x = 35;
        const y = 30 + bob;

        if (mood === 'sleeping') {
            // Schlafender Dominik auf Tastatur
            ctx.fillStyle = '#2b3818';
            ctx.fillRect(x + 20, y + 20, 36, 18); // Kopf auf Tisch
            ctx.fillStyle = '#3c4d24';
            ctx.fillRect(x + 10, y + 28, 24, 14); // Rücken
            // zZz
            ctx.fillStyle = '#1c2810';
            ctx.font = '12px monospace';
            ctx.fillText(step % 2 === 0 ? 'z' : 'Z', x + 58, y + 16);
            ctx.fillText(step % 2 === 0 ? 'Z' : 'z', x + 68, y + 8);
            return;
        }

        // Kopf & 80er-Haare (Vokuhila-Style)
        ctx.fillStyle = '#3c4d24';
        ctx.fillRect(x + 6, y, 20, 12); // Haupthaar
        ctx.fillRect(x + 2, y + 8, 8, 16); // Vokuhila Nackenmatte
        // Gesicht
        ctx.fillStyle = '#a8bb90';
        ctx.fillRect(x + 10, y + 10, 16, 14);
        // Große 80er Nerd-Hornbrille
        ctx.fillStyle = '#1c2810';
        ctx.fillRect(x + 14, y + 13, 5, 5);
        ctx.fillRect(x + 20, y + 13, 5, 5);
        ctx.fillRect(x + 18, y + 15, 3, 2); // Steg
        // Mund
        if (mood === 'eating') {
            ctx.fillRect(x + 16, y + 20, 4, step % 2 === 0 ? 3 : 1);
        } else {
            ctx.fillRect(x + 16, y + 21, 5, 2);
        }

        // Körper / T-Shirt
        ctx.fillStyle = '#2b3818';
        ctx.fillRect(x + 8, y + 24, 20, 18);

        // Hände / Aktionen
        if (mood === 'eating') {
            // Pizzastück in der Hand
            ctx.fillStyle = '#526935';
            ctx.fillRect(x + 26, y + 18, 8, 8);
            ctx.fillStyle = '#2b3818';
            ctx.fillRect(x + 28, y + 20, 4, 4);
        } else if (mood === 'coding' || mood === 'idle') {
            // Hände tippen
            ctx.fillStyle = '#3c4d24';
            ctx.fillRect(x + 24, y + 28 + (step % 2 === 0 ? -2 : 2), 12, 4);
        } else if (mood === 'gaming') {
            // Joystick in der Hand
            ctx.fillStyle = '#1c2810';
            ctx.fillRect(x + 24, y + 24, 6, 8);
            ctx.fillRect(x + 26, y + 16, 2, 8);
            ctx.fillRect(x + 25, y + 14, 4, 4); // Roter Knauf
        } else if (mood === 'bbs') {
            // Telefonhörer am Ohr
            ctx.fillStyle = '#1c2810';
            ctx.fillRect(x + 6, y + 12, 4, 10);
        }

        // Stuhl & Beine
        ctx.fillStyle = '#1c2810';
        ctx.fillRect(x + 10, y + 42, 6, 16);
        ctx.fillRect(x + 20, y + 42, 6, 16);
    }

    function startCanvasAnimation(container) {
        const canvas = container.querySelector('#gotchi-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (canvasAnimId) cancelAnimationFrame(canvasAnimId);

        let lastTime = 0;
        function loop(timestamp) {
            if (!container.isConnected) return;
            if (timestamp - lastTime > 400) {
                animFrame = (animFrame + 1) % 100;
                drawPixelArt(ctx, currentMood, animFrame);
                lastTime = timestamp;
            }
            canvasAnimId = requestAnimationFrame(loop);
        }
        canvasAnimId = requestAnimationFrame(loop);
    }

    function updateDisplay(container) {
        const energyEl = container.querySelector('#gotchi-bar-energy');
        const hungerEl = container.querySelector('#gotchi-bar-hunger');
        const skillEl = container.querySelector('#gotchi-bar-skill');
        const happyEl = container.querySelector('#gotchi-bar-happy');
        const thoughtEl = container.querySelector('#gotchi-thought-text');
        const logEl = container.querySelector('#gotchi-log-list');

        if (energyEl) {
            energyEl.style.width = `${stats.energy}%`;
            energyEl.textContent = `${stats.energy}%`;
        }
        if (hungerEl) {
            hungerEl.style.width = `${stats.hunger}%`;
            hungerEl.textContent = `${stats.hunger}%`;
        }
        if (skillEl) {
            skillEl.style.width = `${stats.skill}%`;
            skillEl.textContent = `${stats.skill}%`;
        }
        if (happyEl) {
            happyEl.style.width = `${stats.happiness}%`;
            happyEl.textContent = `${stats.happiness}%`;
        }
        if (thoughtEl) {
            thoughtEl.textContent = currentThought;
        }
        if (logEl) {
            logEl.innerHTML = logEntries.map(e => `<div>${e}</div>`).join('');
        }
    }

    function startDecayLoop(container) {
        if (tickTimer) clearInterval(tickTimer);
        tickTimer = setInterval(() => {
            if (!container.isConnected) {
                clearInterval(tickTimer);
                return;
            }
            stats.energy = clamp(stats.energy - 2);
            stats.hunger = clamp(stats.hunger - 3);
            stats.happiness = clamp(stats.happiness - 1);

            // Gelegentliche zufällige Gedanken
            if (Math.random() < 0.4 && currentMood === 'idle') {
                const quotes = getGotchiData().idleQuotes || [];
                if (quotes.length > 0) {
                    currentThought = quotes[Math.floor(Math.random() * quotes.length)];
                }
            }
            updateDisplay(container);
        }, 6000);
    }

    let selectedActionIdx = 0;

    function updateActionSelector(container) {
        const data = getGotchiData();
        const actions = data.actions || [];
        const act = actions[selectedActionIdx] || actions[0];
        const selectorEl = container.querySelector('#gotchi-action-selector');
        if (selectorEl && act) {
            selectorEl.textContent = `▶ ${act.label}`;
        }
        container.querySelectorAll('.gotchi-action-btn').forEach((btn, idx) => {
            if (idx === selectedActionIdx) {
                btn.style.outline = '2px solid #000080';
                btn.style.background = '#e0f0ff';
            } else {
                btn.style.outline = 'none';
                btn.style.background = '';
            }
        });
    }

    return {
        render: function (container) {
            const data = getGotchiData();
            const actions = data.actions || [];
            if (logEntries.length === 0) {
                addLog('Dominik-Gotchi 1986 initialisiert. C64 und Diskettenbox einsatzbereit!');
            }

            container.innerHTML = `
                <div style="padding: 10px; display: flex; flex-direction: column; gap: 10px; align-items: center;">
                    <!-- Retro Tamagotchi Plastik-Gehäuse -->
                    <div style="background: radial-gradient(circle at 35% 30%, #20b2aa, #008080); border-radius: 48% 48% 45% 45% / 55% 55% 42% 42%; padding: 22px 18px 24px 18px; box-shadow: inset -4px -6px 12px rgba(0,0,0,0.5), inset 4px 6px 10px rgba(255,255,255,0.4), 0 8px 16px rgba(0,0,0,0.4); border: 3px solid #005050; max-width: 380px; width: 100%; display: flex; flex-direction: column; align-items: center;">
                        
                        <!-- Schlüsselanhänger-Öse -->
                        <div style="width: 26px; height: 12px; border: 3px solid #004d4d; border-bottom: none; border-radius: 12px 12px 0 0; margin-top: -18px; margin-bottom: 6px; background: #e0e0e0;"></div>

                        <!-- Gehäuse-Titel -->
                        <div style="font-size: 11px; font-weight: 800; color: #ffffa0; letter-spacing: 2px; text-shadow: 1px 1px 2px #003333; margin-bottom: 8px;">
                            DOMINIK-GOTCHI 1986
                        </div>

                        <!-- LCD-Bildschirm Rahmen -->
                        <div class="retro-sunken" style="background: #2b3818; padding: 10px; border-radius: 8px; width: 100%; box-sizing: border-box;">
                            <!-- LCD Display -->
                            <div style="background: #8f9f78; border: 2px solid #5a6b47; padding: 6px; border-radius: 4px; box-shadow: inset 1px 1px 4px rgba(0,0,0,0.4); font-family: monospace;">
                                
                                <!-- LCD Obere Statusleiste -->
                                <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: #1c2810; border-bottom: 1px dashed #5a6b47; padding-bottom: 2px; margin-bottom: 4px;">
                                    <span>NERD: 80s</span>
                                    <span>RAM: 64KB</span>
                                    <span>STATUS: OK</span>
                                </div>

                                <!-- Pixel Art Canvas -->
                                <div style="display: flex; justify-content: center; background: #8f9f78;">
                                    <canvas id="gotchi-canvas" width="160" height="100" style="image-rendering: pixelated; width: 100%; max-width: 220px; height: 130px;"></canvas>
                                </div>

                                <!-- LCD Aktions-Auswahl (Taste A) -->
                                <div class="retro-sunken" style="background: #7a8c64; color: #1c2810; padding: 2px 6px; margin-top: 4px; font-size: 10px; font-weight: 700; text-align: center; border-color: #5a6b47; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                    <span id="gotchi-action-selector">▶ ${actions[selectedActionIdx]?.label || 'Aktion'}</span>
                                </div>

                                <!-- Sprechblase / Gedanke -->
                                <div class="retro-sunken" style="background: #a4b68e; border-color: #5a6b47; padding: 4px 6px; margin-top: 4px; min-height: 38px; display: flex; align-items: center;">
                                    <div id="gotchi-thought-text" style="font-size: 11px; line-height: 1.3; color: #1c2810; font-weight: 700;">
                                        ${currentThought}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 3 Klassische Tamagotchi Knöpfe (A, B, C) -->
                        <div style="display: flex; justify-content: space-around; width: 100%; margin-top: 12px; padding: 0 10px;">
                            <button id="gotchi-btn-a" class="retro-raised-btn" style="width: 40px; height: 40px; border-radius: 50%; font-size: 12px; font-weight: 800; background: #ffd700; color: #503000;" title="A: Nächste Aktion wählen (Select)">A</button>
                            <button id="gotchi-btn-b" class="retro-raised-btn" style="width: 40px; height: 40px; border-radius: 50%; font-size: 12px; font-weight: 800; background: #ffd700; color: #503000; margin-top: 10px;" title="B: Aktion ausführen (Execute)">B</button>
                            <button id="gotchi-btn-c" class="retro-raised-btn" style="width: 40px; height: 40px; border-radius: 50%; font-size: 12px; font-weight: 800; background: #ffd700; color: #503000;" title="C: Dominik loben & streicheln (Pet)">C</button>
                        </div>

                        <!-- Tasten-Erklärung -->
                        <div style="display: flex; justify-content: space-around; width: 100%; font-size: 10px; font-weight: 800; color: #ffffa0; margin-top: 6px; text-shadow: 1px 1px 1px #003333;">
                            <span>A: Wählen</span>
                            <span style="margin-top: 4px;">B: Ausführen</span>
                            <span>C: Loben</span>
                        </div>
                    </div>

                    <!-- Statuswerte Balken -->
                    <div class="retro-window-frame" style="width: 100%; max-width: 440px; padding: 8px; background: #ffffff;">
                        <strong style="font-size: 11px; color: #000080; display: block; margin-bottom: 6px;">DOMINIK-VITALWERTE:</strong>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px;">
                            <div>
                                <span style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                                    <span>⚡ Wachheit:</span>
                                </span>
                                <div class="retro-sunken" style="height: 14px; background: #e0e0e0; overflow: hidden;">
                                    <div id="gotchi-bar-energy" style="height: 100%; background: #000080; color: #ffffff; font-size: 9px; text-align: center; line-height: 14px; width: ${stats.energy}%;">
                                        ${stats.energy}%
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                                    <span>🍕 Pizza & Koffein:</span>
                                </span>
                                <div class="retro-sunken" style="height: 14px; background: #e0e0e0; overflow: hidden;">
                                    <div id="gotchi-bar-hunger" style="height: 100%; background: #b04000; color: #ffffff; font-size: 9px; text-align: center; line-height: 14px; width: ${stats.hunger}%;">
                                        ${stats.hunger}%
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                                    <span>💾 Nerd-Level:</span>
                                </span>
                                <div class="retro-sunken" style="height: 14px; background: #e0e0e0; overflow: hidden;">
                                    <div id="gotchi-bar-skill" style="height: 100%; background: #008000; color: #ffffff; font-size: 9px; text-align: center; line-height: 14px; width: ${stats.skill}%;">
                                        ${stats.skill}%
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                                    <span>🕹️ Gamer-Laune:</span>
                                </span>
                                <div class="retro-sunken" style="height: 14px; background: #e0e0e0; overflow: hidden;">
                                    <div id="gotchi-bar-happy" style="height: 100%; background: #800080; color: #ffffff; font-size: 9px; text-align: center; line-height: 14px; width: ${stats.happiness}%;">
                                        ${stats.happiness}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Nerd-Aktions-Menü -->
                    <div class="retro-window-frame" style="width: 100%; max-width: 440px; padding: 8px;">
                        <strong style="font-size: 11px; color: #000080; display: block; margin-bottom: 6px;">NERD-AKTIONEN (Klick oder Tasten A/B/C oben):</strong>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            ${actions.map((act, idx) => `
                                <button class="retro-raised-btn gotchi-action-btn" data-id="${act.id}" data-idx="${idx}" style="text-align: left; padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; ${idx === selectedActionIdx ? 'outline: 2px solid #000080; background: #e0f0ff;' : ''}">
                                    <strong>${act.label}</strong>
                                    <span style="font-size: 9px; color: #555555;">${act.desc}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Aktivitäts-Protokoll -->
                    <div class="retro-sunken" style="width: 100%; max-width: 440px; background: #ffffff; padding: 6px; font-family: monospace; font-size: 10px; color: #333333; max-height: 60px; overflow-y: auto;">
                        <div id="gotchi-log-list">
                            ${logEntries.map(e => `<div>${e}</div>`).join('')}
                        </div>
                    </div>
                </div>
            `;

            // Action Buttons Event Listeners (Direktklick)
            container.querySelectorAll('.gotchi-action-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    const idx = parseInt(btn.getAttribute('data-idx') || '0', 10);
                    selectedActionIdx = idx;
                    updateActionSelector(container);
                    triggerAction(id, container);
                });
            });

            // Tamagotchi Hardware Buttons: A = Wählen (Select), B = Ausführen (Execute), C = Loben (Pet)
            container.querySelector('#gotchi-btn-a')?.addEventListener('click', () => {
                selectedActionIdx = (selectedActionIdx + 1) % actions.length;
                playBeep('beep');
                updateActionSelector(container);
            });

            container.querySelector('#gotchi-btn-b')?.addEventListener('click', () => {
                const act = actions[selectedActionIdx];
                if (act) triggerAction(act.id, container);
            });

            container.querySelector('#gotchi-btn-c')?.addEventListener('click', () => {
                stats.happiness = clamp(stats.happiness + 10);
                currentThought = '❤️ Dominik freut sich über das Lob und hackt motiviert weiter!';
                addLog('Dominik gelobt! Laune +10%');
                playBeep('cheer');
                updateDisplay(container);
            });

            // Animation & Timers
            startCanvasAnimation(container);
            startDecayLoop(container);
        }
    };
})();
