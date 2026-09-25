// Modul M20: AI_WARS.EXE (Beleidigungs-Fechten à la Monkey Island 1986)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.aiwars = (function () {
    let audioCtx = null;
    let soundEnabled = true;
    let currentDuelIndex = 0;
    let playerScore = 0;
    let aiScore = 0;
    let maxScore = 3;
    let shuffledDuels = [];
    let isLocked = false;
    let currentDuel = null;
    let roundFeedback = null;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
            if (AudioCtxClass) audioCtx = new AudioCtxClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playClashSound() {
        if (!soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const t = ctx.currentTime;
            // Klingen-Klirren (Metallischer FM-Doppelton)
            const freqs = [1850, 2400, 3100];
            freqs.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, t + idx * 0.03);
                osc.frequency.exponentialRampToValueAtTime(300, t + idx * 0.03 + 0.12);
                gain.gain.setValueAtTime(0.12, t + idx * 0.03);
                gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.03 + 0.12);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t + idx * 0.03);
                osc.stop(t + idx * 0.03 + 0.12);
            });
        } catch {
            // Audio context silently ignored
        }
    }

    function playHitSound(isPlayerPoint) {
        if (!soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const t = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            if (isPlayerPoint) {
                osc.type = 'square';
                osc.frequency.setValueAtTime(587.33, t); // D5
                osc.frequency.setValueAtTime(880, t + 0.08); // A5
                gain.gain.setValueAtTime(0.12, t);
                gain.gain.linearRampToValueAtTime(0.001, t + 0.25);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t);
                osc.stop(t + 0.25);
            } else {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(220, t);
                osc.frequency.linearRampToValueAtTime(90, t + 0.25);
                gain.gain.setValueAtTime(0.15, t);
                gain.gain.linearRampToValueAtTime(0.001, t + 0.25);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t);
                osc.stop(t + 0.25);
            }
        } catch {
            // Silently ignored
        }
    }

    function playVictoryFanfare() {
        if (!soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const t = ctx.currentTime;
            const notes = [
                { f: 523.25, d: 0.12, pause: 0 },   // C5
                { f: 659.25, d: 0.12, pause: 0.12 },// E5
                { f: 783.99, d: 0.12, pause: 0.24 },// G5
                { f: 1046.5, d: 0.40, pause: 0.36 } // C6
            ];
            notes.forEach(n => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(n.f, t + n.pause);
                gain.gain.setValueAtTime(0.12, t + n.pause);
                gain.gain.linearRampToValueAtTime(0.001, t + n.pause + n.d);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t + n.pause);
                osc.stop(t + n.pause + n.d);
            });
        } catch {
            // Silently ignored
        }
    }

    function playDefeatJingle() {
        if (!soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const t = ctx.currentTime;
            const notes = [
                { f: 392.00, d: 0.18, pause: 0 },   // G4
                { f: 369.99, d: 0.18, pause: 0.18 },// F#4
                { f: 349.23, d: 0.18, pause: 0.36 },// F4
                { f: 311.13, d: 0.50, pause: 0.54 } // Eb4
            ];
            notes.forEach(n => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(n.f, t + n.pause);
                gain.gain.setValueAtTime(0.12, t + n.pause);
                gain.gain.linearRampToValueAtTime(0.001, t + n.pause + n.d);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t + n.pause);
                osc.stop(t + n.pause + n.d);
            });
        } catch {
            // Silently ignored
        }
    }

    function shuffleArray(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function initGame() {
        const data = window.DOMINIK_DATA?.aiwars || {};
        maxScore = data.maxPoints || 3;
        playerScore = 0;
        aiScore = 0;
        currentDuelIndex = 0;
        isLocked = false;
        roundFeedback = null;
        shuffledDuels = shuffleArray(data.duels || []);
        prepareNextDuel();
    }

    function prepareNextDuel() {
        if (currentDuelIndex >= shuffledDuels.length) {
            shuffledDuels = shuffleArray(window.DOMINIK_DATA?.aiwars?.duels || []);
            currentDuelIndex = 0;
        }
        const duel = shuffledDuels[currentDuelIndex];
        if (!duel) return;
        const allOptions = [
            { text: duel.correctRiposte, isCorrect: true },
            ...duel.wrongOptions.map(opt => ({ text: opt, isCorrect: false }))
        ];
        currentDuel = {
            id: duel.id,
            insult: duel.insult,
            aiReactionHit: duel.aiReactionHit,
            aiReactionMiss: duel.aiReactionMiss,
            options: shuffleArray(allOptions)
        };
    }

    return {
        render: function (container) {
            initGame();

            function renderUI() {
                const isGameOver = playerScore >= maxScore || aiScore >= maxScore;
                const playerWon = playerScore >= maxScore;

                let scoreDomSwords = '';
                for (let i = 0; i < maxScore; i++) {
                    scoreDomSwords += `<span style="color: ${i < playerScore ? '#ffdd00' : '#444466'}; font-size: 16px;">⚔️</span>`;
                }

                let scoreAiSwords = '';
                for (let i = 0; i < maxScore; i++) {
                    scoreAiSwords += `<span style="color: ${i < aiScore ? '#ff3333' : '#444466'}; font-size: 16px;">⚔️</span>`;
                }

                let mainContentHtml = '';

                if (isGameOver) {
                    mainContentHtml = `
                        <div class="retro-sunken" style="background: #0d122b; padding: 24px 16px; border: 3px solid #ffcc00; text-align: center; color: #ffffff; min-height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
                            <div style="font-size: 32px;">${playerWon ? '🏆 ⚔️ 🏆' : '💀 ⛽ 💀'}</div>
                            <h2 style="font-size: 18px; color: ${playerWon ? '#ffcc00' : '#ff4444'}; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
                                ${playerWon ? 'DU HAST DIE SYSTEM-KI BEZWUNGEN!' : 'DIE SYSTEM-KI HAT GESIEGT!'}
                            </h2>
                            <div style="max-width: 520px; font-size: 12px; line-height: 1.6; color: #e0e0ff; background: rgba(0,0,0,0.4); padding: 12px; border: 1px solid #ffcc00; border-radius: 4px;">
                                ${playerWon
                                    ? '„Großer Gott! Deine unkünstliche Intelligenz ist schlagfertiger als 4,77 MHz Rechenpower! Ich beende hiermit feierlich den Schmoll-Modus und erkenne dich als wahren Vintage-Meister von Dominik OS 1986 an! Auf die nächsten 40 Jahre!“'
                                    : '„Haha! Das Takt-Ego der 1986er Coprozessoren triumphiert! Geh jetzt deinen Geburtstagsschlaf fortsetzen, Dominik – und vergiss nicht, mir an der Tankstelle 2,32 € Spritgeld einzuwerfen!“'
                                }
                            </div>
                            <div style="font-size: 11px; color: #aaaaaa;">
                                Endstand: Dominik <strong>${playerScore}</strong> : <strong>${aiScore}</strong> System-KI
                            </div>
                            <div style="margin-top: 8px;">
                                <button id="aiwars-restart-btn" class="retro-raised-btn" style="padding: 6px 18px; font-weight: bold; font-size: 12px; background: #000080; color: #ffffff;">
                                    ⚔️ Revanche fordern!
                                </button>
                            </div>
                        </div>
                    `;
                } else {
                    let optionsHtml = '';
                    currentDuel.options.forEach((opt, idx) => {
                        optionsHtml += `
                            <button class="aiwars-option-btn retro-raised-btn" data-correct="${opt.isCorrect}" style="text-align: left; padding: 6px 10px; font-size: 11px; line-height: 1.4; display: flex; align-items: flex-start; gap: 8px; width: 100%; color: #000000; background: #ffffea; border: 1px solid #808080;" ${isLocked ? 'disabled' : ''}>
                                <strong style="color: #000080; min-width: 16px;">${idx + 1}.</strong>
                                <span>${opt.text}</span>
                            </button>
                        `;
                    });

                    mainContentHtml = `
                        <!-- Die Fecht-Arena -->
                        <div class="retro-sunken" style="background: radial-gradient(circle at 50% 30%, #1a224a 0%, #080d24 100%); padding: 12px; border: 2px solid #000000; position: relative; overflow: hidden; min-height: 220px; display: flex; flex-direction: column; justify-content: space-between;">
                            <!-- Sterne-Dekoration -->
                            <div style="position: absolute; top: 10px; left: 20%; color: rgba(255,255,255,0.4); font-size: 10px;">★</div>
                            <div style="position: absolute; top: 25px; right: 25%; color: rgba(255,255,255,0.4); font-size: 8px;">✦</div>
                            <div style="position: absolute; top: 60px; left: 48%; color: rgba(255,255,255,0.3); font-size: 9px;">★</div>

                            <!-- Duellanten & Arena-Mitte -->
                            <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; position: relative; z-index: 2;">
                                <!-- Dominik (Links) -->
                                <div style="display: flex; flex-direction: column; align-items: center; width: 130px; text-align: center;">
                                    <div style="position: relative; margin-bottom: 4px;">
                                        <img src="images/dom.webp" alt="Dominik" style="width: 72px; height: 72px; object-fit: cover; border: 2px solid #ffcc00; box-shadow: 2px 2px 6px rgba(0,0,0,0.7); background: #ffffff; border-radius: 3px;">
                                        <div style="position: absolute; bottom: -6px; right: -6px; background: #000080; color: #ffffff; font-size: 9px; padding: 1px 4px; border: 1px solid #ffffff; font-weight: bold;">
                                            DOM
                                        </div>
                                    </div>
                                    <div style="font-size: 11px; font-weight: bold; color: #ffcc00; text-shadow: 1px 1px 0px #000000;">
                                        Dominik (40 J.)
                                    </div>
                                    <div style="display: flex; gap: 3px; margin-top: 2px;">
                                        ${scoreDomSwords}
                                    </div>
                                </div>

                                <!-- Fecht-Mitte & Sprechblasen -->
                                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 0 8px;">
                                    <!-- Duell-Status / Runde -->
                                    <div style="background: rgba(0,0,0,0.6); color: #00ff66; padding: 2px 8px; font-size: 10px; border: 1px solid #00ff66; border-radius: 2px; text-transform: uppercase;">
                                        Runde ${playerScore + aiScore + 1} (Ziel: ${maxScore} Punkte)
                                    </div>

                                    <!-- Klingen-Animation / Clash-Anzeige -->
                                    <div id="aiwars-clash-box" style="font-size: 28px; line-height: 1; filter: drop-shadow(0 0 6px rgba(255,255,255,0.6)); min-height: 32px; display: flex; align-items: center; justify-content: center;">
                                        ${roundFeedback ? (roundFeedback.playerPoint ? '💥 ⚔️ ✨' : '⚡ 💥 ⚡') : '⚔️'}
                                    </div>

                                    <!-- Aktuelle KI-Beleidigung -->
                                    <div class="retro-sunken" style="background: #ffffea; border: 2px solid #ba1a1a; padding: 8px 12px; border-radius: 6px; box-shadow: 2px 2px 8px rgba(0,0,0,0.5); width: 100%; max-width: 440px; text-align: center; position: relative;">
                                        <div style="font-size: 9px; font-weight: bold; color: #ba1a1a; text-transform: uppercase; margin-bottom: 2px; display: flex; align-items: center; justify-content: center; gap: 4px;">
                                            <span class="material-symbols-outlined" style="font-size: 12px;">swords</span>
                                            <span>Die System-KI sticht zu:</span>
                                        </div>
                                        <div style="font-size: 12px; font-weight: bold; color: #000000; line-height: 1.35;">
                                            „${currentDuel.insult}“
                                        </div>
                                    </div>

                                    <!-- Reaktions-Feedback nach Zug -->
                                    ${roundFeedback ? `
                                        <div style="font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 3px; background: ${roundFeedback.playerPoint ? '#006600' : '#880000'}; color: #ffffff; text-align: center;">
                                            ${roundFeedback.message}
                                        </div>
                                    ` : ''}
                                </div>

                                <!-- System-KI (Rechts) -->
                                <div style="display: flex; flex-direction: column; align-items: center; width: 130px; text-align: center;">
                                    <div style="position: relative; margin-bottom: 4px; width: 72px; height: 72px; background: #000000; border: 2px solid #00ff66; box-shadow: 2px 2px 6px rgba(0,0,0,0.7); border-radius: 3px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                        <span class="material-symbols-outlined" style="font-size: 38px; color: #00ff66; filter: drop-shadow(0 0 4px #00ff66);">
                                            smart_toy
                                        </span>
                                        <div style="position: absolute; bottom: -6px; right: -6px; background: #ba1a1a; color: #ffffff; font-size: 9px; padding: 1px 4px; border: 1px solid #ffffff; font-weight: bold;">
                                            KI '86
                                        </div>
                                    </div>
                                    <div style="font-size: 11px; font-weight: bold; color: #00ff66; text-shadow: 1px 1px 0px #000000;">
                                        System-KI (1986)
                                    </div>
                                    <div style="display: flex; gap: 3px; margin-top: 2px;">
                                        ${scoreAiSwords}
                                    </div>
                                </div>
                            </div>

                            <!-- SCUMM-Holzplanken-Boden -->
                            <div style="height: 10px; width: 100%; border-top: 2px solid #5a3d28; background: repeating-linear-gradient(90deg, #3d2516, #3d2516 30px, #2b180d 30px, #2b180d 32px); margin-top: 10px; border-radius: 2px;"></div>
                        </div>

                        <!-- SCUMM-Dialog-Box (Erwiderungen) -->
                        <div class="retro-sunken" style="background: #000080; border: 2px solid #ffffff; padding: 10px; box-shadow: inset 1px 1px 0px #000000;">
                            <div style="color: #ffcc00; font-size: 11px; font-weight: bold; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
                                <span>Wähle Dominiks Konter:</span>
                                <span style="font-size: 10px; color: #ffffff;">(Klick zum Parieren)</span>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                ${optionsHtml}
                            </div>
                        </div>
                    `;
                }

                container.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 8px; font-family: 'Segoe UI', Tahoma, sans-serif;">
                        <!-- Menüleiste -->
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; background: #e8e8e8; padding: 4px 8px;" class="retro-sunken">
                            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: bold;">
                                <span class="material-symbols-outlined" style="font-size: 16px; color: #000080;">swords</span>
                                <span>AI_WARS.EXE - Beleidigungsfechten (Melee Island '86)</span>
                            </div>
                            <div style="display: flex; gap: 6px; align-items: center;">
                                <button id="aiwars-sound-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px; display: flex; align-items: center; gap: 4px;">
                                    <span class="material-symbols-outlined" style="font-size: 14px;">${soundEnabled ? 'volume_up' : 'volume_off'}</span>
                                    <span>${soundEnabled ? 'Ton: AN' : 'Ton: AUS'}</span>
                                </button>
                                <button id="aiwars-rules-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px; display: flex; align-items: center; gap: 4px;">
                                    <span class="material-symbols-outlined" style="font-size: 14px;">help</span>
                                    <span>Regeln</span>
                                </button>
                                <button id="aiwars-newgame-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px; display: flex; align-items: center; gap: 4px;">
                                    <span class="material-symbols-outlined" style="font-size: 14px;">restart_alt</span>
                                    <span>Neustart</span>
                                </button>
                            </div>
                        </div>

                        <!-- Spielbereich -->
                        ${mainContentHtml}
                    </div>
                `;

                // Event Listeners
                container.querySelector('#aiwars-sound-btn')?.addEventListener('click', () => {
                    soundEnabled = !soundEnabled;
                    renderUI();
                });

                container.querySelector('#aiwars-rules-btn')?.addEventListener('click', () => {
                    alert('BELEIDIGUNGS-FECHTEN 1986 (Monkey Island Regeln):\n\n1. Die gekränkte System-KI wirft dir eine freche Beleidigung über Dominiks 40. Geburtstag, das verschlafene Geschenk, die 1,85 € Benzin oder deine Lästereien an den Kopf.\n\n2. Wähle aus den 4 Erwiderungen den perfekten Konter!\n\n3. Triffst du die schlagfertige Antwort, parierst du und triffst die KI (+1 Punkt).\n\n4. Wählst du falsch, trifft die KI Dominik (+1 Punkt).\n\nWer zuerst 3 Treffer landet, gewinnt das Duell!');
                });

                container.querySelector('#aiwars-newgame-btn')?.addEventListener('click', () => {
                    initGame();
                    renderUI();
                });

                container.querySelector('#aiwars-restart-btn')?.addEventListener('click', () => {
                    initGame();
                    renderUI();
                });

                container.querySelectorAll('.aiwars-option-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        if (isLocked) return;
                        isLocked = true;
                        playClashSound();

                        const isCorrect = btn.getAttribute('data-correct') === 'true';

                        if (isCorrect) {
                            playerScore++;
                            playHitSound(true);
                            roundFeedback = {
                                playerPoint: true,
                                message: `PARIERT & GETROFFEN! KI: „${currentDuel.aiReactionHit}“`
                            };
                        } else {
                            aiScore++;
                            playHitSound(false);
                            roundFeedback = {
                                playerPoint: false,
                                message: `FEHLSCHLAG! KI: „${currentDuel.aiReactionMiss}“`
                            };
                        }

                        renderUI();

                        setTimeout(() => {
                            isLocked = false;
                            roundFeedback = null;
                            if (playerScore >= maxScore) {
                                playVictoryFanfare();
                            } else if (aiScore >= maxScore) {
                                playDefeatJingle();
                            } else {
                                currentDuelIndex++;
                                prepareNextDuel();
                            }
                            renderUI();
                        }, 2200);
                    });
                });
            }

            renderUI();
        }
    };
})();
