// Modul: CONTROL.EXE (Systemsteuerung: Bildschirmschoner & Audio)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.control = (function () {
    let currentTab = 'screensaver'; // 'screensaver' | 'audio'
    let currentModel = 'flying'; // 'flying' | 'stars'
    let animFrameId = null;
    let fullScreenAnimId = null;
    let haeVolume = 85;
    let flyingObjects = [];
    let starfieldStars = [];

    function playChimeSound() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const volFactor = Math.max(0, Math.min(1, haeVolume / 100));
            if (volFactor <= 0) return; // Stumm bei 0%

            const ctx = new AudioCtx();
            const now = ctx.currentTime;
            // Windows 3.1 "Tada"-Akkord, skaliert mit der eingestellten Lautstärke
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const startGain = 0.12 * volFactor;
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + i * 0.08);
                gain.gain.setValueAtTime(startGain, now + i * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.08);
                osc.stop(now + i * 0.08 + 0.36);
            });
        } catch (_) {
            // Audio-Context nicht verfügbar
        }
    }

    function initFlyingObjects(count, w, h) {
        flyingObjects = [];
        for (let i = 0; i < count; i++) {
            flyingObjects.push({
                x: Math.random() * (w - 40),
                y: Math.random() * (h - 40),
                vx: (Math.random() - 0.5) * 2.5 + (Math.random() > 0.5 ? 1 : -1),
                vy: (Math.random() - 0.5) * 2.5 + (Math.random() > 0.5 ? 1 : -1),
                angle: Math.random() * 360,
                va: (Math.random() - 0.5) * 3
            });
        }
    }

    function initStarfield(count, w, h) {
        starfieldStars = [];
        for (let i = 0; i < count; i++) {
            starfieldStars.push({
                x: (Math.random() - 0.5) * w * 2,
                y: (Math.random() - 0.5) * h * 2,
                z: Math.random() * 1000 + 1
            });
        }
    }

    function startPreviewAnimation(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (animFrameId) cancelAnimationFrame(animFrameId);
        const w = canvas.width;
        const h = canvas.height;

        if (currentModel === 'stars') {
            initStarfield(80, w, h);
        } else {
            initFlyingObjects(4, w, h);
        }

        const img = new Image();
        img.src = 'images/dom.webp';

        function step() {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);

            if (currentModel === 'stars') {
                const cx = w / 2;
                const cy = h / 2;
                const speed = 5;

                starfieldStars.forEach(s => {
                    s.z -= speed;
                    if (s.z <= 0) {
                        s.z = 1000;
                        s.x = (Math.random() - 0.5) * w * 2;
                        s.y = (Math.random() - 0.5) * h * 2;
                    }

                    const k = 140 / s.z;
                    const px = cx + s.x * k;
                    const py = cy + s.y * k;

                    if (px < 0 || px >= w || py < 0 || py >= h) {
                        s.z = 1000;
                        return;
                    }

                    const brightness = Math.min(1, Math.max(0.2, (1 - s.z / 1000)));
                    const size = Math.max(1, (1 - s.z / 1000) * 2.5);
                    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
                    ctx.fillRect(px, py, size, size);
                });
            } else {
                // Fliegende Dominiks
                ctx.fillStyle = '#ffffff';
                for (let i = 0; i < 20; i++) {
                    ctx.fillRect((i * 37) % w, (i * 29) % h, 1.5, 1.5);
                }

                flyingObjects.forEach(obj => {
                    obj.x += obj.vx;
                    obj.y += obj.vy;
                    obj.angle += obj.va;

                    if (obj.x <= 0 || obj.x >= w - 32) obj.vx *= -1;
                    if (obj.y <= 0 || obj.y >= h - 32) obj.vy *= -1;

                    ctx.save();
                    ctx.translate(obj.x + 16, obj.y + 16);
                    ctx.rotate((obj.angle * Math.PI) / 180);

                    if (img.complete && img.naturalWidth > 0) {
                        // Sauberes Zeichnen des Bildes ohne störende weiße Balken
                        ctx.drawImage(img, -16, -16, 32, 32);
                    } else {
                        ctx.fillStyle = '#ffff00';
                        ctx.beginPath();
                        ctx.arc(0, 0, 14, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                });
            }

            animFrameId = requestAnimationFrame(step);
        }

        step();
    }

    function openFullScreenScreensaver() {
        const overlay = document.createElement('div');
        overlay.id = 'full-screensaver-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = '#000000';
        overlay.style.zIndex = '99999';
        overlay.style.cursor = 'none';

        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.display = 'block';
        overlay.appendChild(canvas);

        const hint = document.createElement('div');
        hint.style.position = 'absolute';
        hint.style.bottom = '20px';
        hint.style.left = '50%';
        hint.style.transform = 'translateX(-50%)';
        hint.style.color = '#ffff00';
        hint.style.fontFamily = 'monospace';
        hint.style.fontSize = '12px';
        hint.style.backgroundColor = 'rgba(0,0,0,0.7)';
        hint.style.padding = '4px 12px';
        hint.style.border = '1px solid #ffffff';
        hint.textContent = 'Maus bewegen oder Taste drücken zum Beenden';
        overlay.appendChild(hint);

        document.body.appendChild(overlay);

        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;

        if (currentModel === 'stars') {
            initStarfield(350, w, h);
        } else {
            const count = Math.min(18, Math.max(8, Math.floor(w / 120)));
            initFlyingObjects(count, w, h);
        }

        const img = new Image();
        img.src = 'images/dom.webp';

        function stepFull() {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);

            if (currentModel === 'stars') {
                const cx = w / 2;
                const cy = h / 2;
                const speed = 9;

                starfieldStars.forEach(s => {
                    s.z -= speed;
                    if (s.z <= 0) {
                        s.z = 1000;
                        s.x = (Math.random() - 0.5) * w * 2;
                        s.y = (Math.random() - 0.5) * h * 2;
                    }

                    const k = 450 / s.z;
                    const px = cx + s.x * k;
                    const py = cy + s.y * k;

                    if (px < 0 || px >= w || py < 0 || py >= h) {
                        s.z = 1000;
                        return;
                    }

                    const brightness = Math.min(1, Math.max(0.2, (1 - s.z / 1000)));
                    const size = Math.max(1.5, (1 - s.z / 1000) * 4);
                    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
                    ctx.beginPath();
                    ctx.arc(px, py, size / 2, 0, Math.PI * 2);
                    ctx.fill();
                });
            } else {
                ctx.fillStyle = '#ffffff';
                for (let i = 0; i < 80; i++) {
                    ctx.fillRect((i * 97) % w, (i * 73) % h, 2, 2);
                }

                flyingObjects.forEach(obj => {
                    obj.x += obj.vx * 1.5;
                    obj.y += obj.vy * 1.5;
                    obj.angle += obj.va;

                    if (obj.x <= 0 || obj.x >= w - 50) obj.vx *= -1;
                    if (obj.y <= 0 || obj.y >= h - 50) obj.vy *= -1;

                    ctx.save();
                    ctx.translate(obj.x + 25, obj.y + 25);
                    ctx.rotate((obj.angle * Math.PI) / 180);

                    if (img.complete && img.naturalWidth > 0) {
                        // Sauberes Zeichnen ohne weiße Balken
                        ctx.drawImage(img, -25, -25, 50, 50);
                    } else {
                        ctx.fillStyle = '#ffff00';
                        ctx.beginPath();
                        ctx.arc(0, 0, 22, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                });
            }

            fullScreenAnimId = requestAnimationFrame(stepFull);
        }

        stepFull();

        function closeOverlay() {
            if (fullScreenAnimId) cancelAnimationFrame(fullScreenAnimId);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('keydown', closeOverlay);
            overlay.remove();
        }

        let moved = false;
        function onMove() {
            if (moved) closeOverlay();
            else moved = true;
        }

        setTimeout(() => {
            window.addEventListener('mousemove', onMove);
            window.addEventListener('keydown', closeOverlay);
            overlay.addEventListener('click', closeOverlay);
        }, 300);
    }

    function renderScreensaverTab() {
        return `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="font-weight: 700; font-size: 12px; color: #000080; border-bottom: 1px solid #808080; padding-bottom: 4px;">
                    BILDSCHIRMSCHONER-EINSTELLUNGEN
                </div>

                <div style="display: grid; grid-template-columns: 240px 1fr; gap: 14px; align-items: start;">
                    <!-- Monitor-Vorschau -->
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                        <div class="retro-sunken-dark" style="border: 6px solid #d4d0c8; padding: 4px; border-radius: 4px; background: #000000;">
                            <canvas id="ctrl-ss-canvas" width="200" height="130" style="display: block; width: 200px; height: 130px;"></canvas>
                        </div>
                        <span style="font-size: 10px; color: #555555;">VORSCHAU-BILDSCHIRM (CRT)</span>
                    </div>

                    <!-- Einstellungen -->
                    <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12px;">
                        <div>
                            <label style="font-weight: 700; display: block; margin-bottom: 4px;">Schoner-Modell:</label>
                            <select id="ctrl-ss-select" class="retro-sunken" style="width: 100%; padding: 4px; font-size: 11px;">
                                <option value="flying" ${currentModel === 'flying' ? 'selected' : ''}>Fliegende Dominiks (After Dark Edition)</option>
                                <option value="stars" ${currentModel === 'stars' ? 'selected' : ''}>Sternenfeld 1986 (Windows 3.1 Starfield)</option>
                            </select>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                            <span>Wartezeit bis Aktivierung:</span>
                            <span class="retro-sunken" style="background: #ffffff; padding: 2px 8px; font-weight: 700;">5 Min.</span>
                        </div>

                        <div id="ctrl-ss-model-desc" style="background: #ffffe0; border: 1px solid #c0c000; padding: 8px; font-size: 11px; line-height: 1.4;">
                            ${currentModel === 'flying'
                                ? '<strong>Fliegende Dominiks:</strong> Verwendet das Bild <code>images/dom.webp</code> und lässt es schwerelos durch den Raum schweben.'
                                : '<strong>Sternenfeld 1986:</strong> Die legendäre 3D-Sternenflug-Simulation der 90er Jahre im Hyperraum.'}
                        </div>

                        <div style="display: flex; gap: 8px; margin-top: 4px;">
                            <button id="ctrl-test-ss-btn" class="retro-raised-btn" style="padding: 6px 14px; font-weight: 700; font-size: 12px; color: #000080;">
                                Vollbild-Testen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderAudioTab() {
        const getHaeDesc = (val) => {
            if (val <= 0) return 'Stumm geschaltet – absolute Ruhe.';
            if (val <= 30) return 'Ungewöhnlich aufmerksam – vermutlich geht es um Essen oder Geschenke.';
            if (val <= 70) return 'Selektives Gehör im Regelbetrieb.';
            return 'Maximale Filterung: Bitten wie "Bring den Müll raus" werden komplett gedämpft.';
        };

        return `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #808080; padding-bottom: 4px;">
                    <span style="font-weight: 700; font-size: 12px; color: #000080;">AUDIO-EIGENSCHAFTEN & LAUTSTÄRKEMIXER</span>
                    <button id="ctrl-audio-test-btn" class="retro-raised-btn" style="padding: 3px 12px; font-size: 11px; font-weight: 700; color: #000080;">
                        🔔 Testton (Tada!)
                    </button>
                </div>

                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <!-- Hä?-Lautstärkeregler (Einziger aktiver Regler) -->
                    <div class="retro-sunken" style="background: #ffffff; padding: 12px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; font-weight: 700;">
                            <span>„Hä? Was hast du gesagt?“-Lautstärke:</span>
                            <span id="ctrl-hae-val" style="color: #000080; font-size: 14px;">${haeVolume}%</span>
                        </div>
                        <input type="range" id="ctrl-hae-slider" min="0" max="100" value="${haeVolume}" style="width: 100%; margin-bottom: 8px; cursor: pointer;" />
                        <div id="ctrl-hae-desc" style="font-size: 11px; color: #555555; font-style: italic;">
                            ${getHaeDesc(haeVolume)}
                        </div>
                    </div>

                    <div style="background: #e8e8e8; border: 1px solid #808080; padding: 8px 10px; font-size: 11px; line-height: 1.4;">
                        <strong>Hinweis zum Testton:</strong> Der Button <code>[ Testton (Tada!) ]</code> wird direkt mit dem oben eingestellten Pegel (${haeVolume}%) wiedergegeben.
                    </div>
                </div>
            </div>
        `;
    }

    function attachTabEvents(container) {
        if (currentTab === 'screensaver') {
            const canvas = container.querySelector('#ctrl-ss-canvas');
            if (canvas) startPreviewAnimation(canvas);

            const selectEl = container.querySelector('#ctrl-ss-select');
            selectEl?.addEventListener('change', (e) => {
                currentModel = e.target.value;
                const descEl = container.querySelector('#ctrl-ss-model-desc');
                if (descEl) {
                    descEl.innerHTML = currentModel === 'flying'
                        ? '<strong>Fliegende Dominiks:</strong> Verwendet das Bild <code>images/dom.webp</code> und lässt es schwerelos durch den Raum schweben.'
                        : '<strong>Sternenfeld 1986:</strong> Die legendäre 3D-Sternenflug-Simulation der 90er Jahre im Hyperraum.';
                }
                const c = container.querySelector('#ctrl-ss-canvas');
                if (c) startPreviewAnimation(c);
            });

            container.querySelector('#ctrl-test-ss-btn')?.addEventListener('click', () => {
                openFullScreenScreensaver();
            });
        } else if (currentTab === 'audio') {
            container.querySelector('#ctrl-audio-test-btn')?.addEventListener('click', () => {
                playChimeSound();
            });
            const haeSlider = container.querySelector('#ctrl-hae-slider');
            haeSlider?.addEventListener('input', (e) => {
                haeVolume = parseInt(e.target.value, 10);
                const valEl = container.querySelector('#ctrl-hae-val');
                const descEl = container.querySelector('#ctrl-hae-desc');
                if (valEl) valEl.textContent = `${haeVolume}%`;
                if (descEl) {
                    if (haeVolume <= 0) descEl.textContent = 'Stumm geschaltet – absolute Ruhe.';
                    else if (haeVolume <= 30) descEl.textContent = 'Ungewöhnlich aufmerksam – vermutlich geht es um Essen oder Geschenke.';
                    else if (haeVolume <= 70) descEl.textContent = 'Selektives Gehör im Regelbetrieb.';
                    else descEl.textContent = 'Maximale Filterung: Bitten wie "Bring den Müll raus" werden komplett gedämpft.';
                }
            });
        }
    }

    function renderAppletContent(container) {
        const bodyEl = container.querySelector('#ctrl-applet-body');
        if (!bodyEl) return;

        if (animFrameId) cancelAnimationFrame(animFrameId);

        if (currentTab === 'screensaver') bodyEl.innerHTML = renderScreensaverTab();
        else if (currentTab === 'audio') bodyEl.innerHTML = renderAudioTab();

        attachTabEvents(container);
    }

    return {
        render: function (container) {
            currentTab = 'screensaver';

            container.innerHTML = `
                <div class="ctrl-window-body">
                    <!-- Obere Applet-Icon-Auswahlleiste (Windows 3.1 Control Panel Style) -->
                    <div class="ctrl-applet-nav retro-window-frame">
                        <button class="ctrl-applet-btn retro-raised-btn ${currentTab === 'screensaver' ? 'active' : ''}" data-tab="screensaver">
                            <span class="material-symbols-outlined">desktop_windows</span>
                            <span>Bildschirmschoner</span>
                        </button>
                        <button class="ctrl-applet-btn retro-raised-btn ${currentTab === 'audio' ? 'active' : ''}" data-tab="audio">
                            <span class="material-symbols-outlined">volume_up</span>
                            <span>Audio & Sound</span>
                        </button>
                    </div>

                    <!-- Haupt-Applet-Fensterfläche -->
                    <div id="ctrl-applet-body" class="retro-window-frame" style="background: #c0c0c0; padding: 12px; min-height: 280px;"></div>
                </div>
            `;

            container.querySelectorAll('.ctrl-applet-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    container.querySelectorAll('.ctrl-applet-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentTab = btn.getAttribute('data-tab') || 'screensaver';
                    renderAppletContent(container);
                });
            });

            renderAppletContent(container);
        }
    };
})();
