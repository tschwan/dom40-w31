// Modul: DEFRAG.EXE (Midlife-Defragmentierung)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.defrag = (function () {
    const TOTAL_CLUSTERS = 240; // 24 Spalten x 10 Zeilen
    let clusterStates = [];
    let isRunning = false;
    let timer = null;
    let progress = 0;

    const TYPES = ['wisdom', 'trivia', 'party', 'unresolved', 'free'];

    function playTickSound() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
            gain.gain.setValueAtTime(0.015, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.03);
        } catch (_) {
            // Audio context not allowed or failed, ignore silently
        }
    }

    function initClusters() {
        clusterStates = [];
        progress = 12;
        // Zu Beginn stark fragmentiert
        for (let i = 0; i < TOTAL_CLUSTERS; i++) {
            const rand = Math.random();
            let type = 'free';
            if (rand < 0.35) type = 'wisdom';
            else if (rand < 0.60) type = 'trivia';
            else if (rand < 0.80) type = 'party';
            else if (rand < 0.90) type = 'unresolved';
            clusterStates.push(type);
        }
    }

    function renderGrid(gridEl) {
        if (!gridEl) return;
        const colorMap = {
            wisdom: '#0000aa',
            trivia: '#aa0000',
            party: '#00aa00',
            unresolved: '#aaaa00',
            free: '#ffffff',
            moving: '#00ffff'
        };

        gridEl.innerHTML = clusterStates.map((type, idx) => {
            const bg = colorMap[type] || '#ffffff';
            const isBorder = type === 'free' ? 'border: 1px solid #555555;' : 'border: 1px solid rgba(0,0,0,0.2);';
            return `<div class="defrag-cluster" style="background-color: ${bg}; ${isBorder}" data-idx="${idx}"></div>`;
        }).join('');
    }

    function startDefrag(container) {
        if (isRunning) return;
        isRunning = true;

        const statusEl = container.querySelector('#defrag-status-msg');
        const percentEl = container.querySelector('#defrag-percent');
        const fillBarEl = container.querySelector('#defrag-progress-fill');
        const gridEl = container.querySelector('#defrag-cluster-grid');
        const messages = window.DOMINIK_DATA?.defrag?.messages || [];

        let step = 0;
        let sortedIndex = 0;

        timer = setInterval(() => {
            if (!isRunning) return;

            step++;
            progress = Math.min(100, Math.round((step / 65) * 100));

            // Statusnachricht aktualisieren
            const msgIdx = Math.min(messages.length - 1, Math.floor((progress / 100) * messages.length));
            if (statusEl) statusEl.textContent = messages[msgIdx];
            if (percentEl) percentEl.textContent = `${progress}%`;
            if (fillBarEl) fillBarEl.style.width = `${progress}%`;

            // Einzelne Cluster sortieren
            for (let k = 0; k < 4; k++) {
                if (sortedIndex < TOTAL_CLUSTERS) {
                    // Ordne die Cluster sukzessive nach Weisheit, Party, Trivia
                    if (sortedIndex < TOTAL_CLUSTERS * 0.45) {
                        clusterStates[sortedIndex] = 'wisdom';
                    } else if (sortedIndex < TOTAL_CLUSTERS * 0.70) {
                        clusterStates[sortedIndex] = 'party';
                    } else if (sortedIndex < TOTAL_CLUSTERS * 0.88) {
                        clusterStates[sortedIndex] = 'trivia';
                    } else {
                        clusterStates[sortedIndex] = 'free';
                    }
                    sortedIndex++;
                }
            }

            renderGrid(gridEl);
            if (step % 2 === 0) playTickSound();

            if (progress >= 100 || sortedIndex >= TOTAL_CLUSTERS) {
                clearInterval(timer);
                isRunning = false;
                if (statusEl) {
                    statusEl.innerHTML = '<strong style="color: #00ff00;">OPTIMIERUNG VOLLSTÄNDIG!</strong> 40 Jahre Dominik sind nun fehlerfrei defragmentiert.';
                }
            }
        }, 120);
    }

    function stopDefrag() {
        isRunning = false;
        if (timer) clearInterval(timer);
    }

    return {
        render: function (container) {
            stopDefrag();
            initClusters();
            const data = window.DOMINIK_DATA?.defrag || {};

            container.innerHTML = `
                <div class="defrag-container retro-window-frame" style="background: #0000aa; color: #ffffff; padding: 12px; font-family: 'Courier Prime', monospace;">
                    <!-- Header -->
                    <div style="background: #aaaaaa; color: #000000; padding: 4px 8px; font-weight: 700; font-size: 13px; display: flex; justify-content: space-between;" class="retro-raised">
                        <span>MS-DOS DEFRAGMENTIERUNGSPROGRAMM V40.0</span>
                        <span>LAUFWERK C: [DOMINIK-40]</span>
                    </div>

                    <!-- Cluster-Karte -->
                    <div style="background: #000055; border: 2px solid #ffffff; margin: 10px 0; padding: 8px;">
                        <div style="font-size: 11px; margin-bottom: 6px; color: #ffff00; font-weight: 700;">
                            CLUSTER-BELEGUNGSTABELLE (240 SEKTOR-BLÖCKE):
                        </div>
                        <div id="defrag-cluster-grid" class="defrag-grid"></div>
                    </div>

                    <!-- Legende -->
                    <div style="background: #000080; border: 1px solid #aaaaaa; padding: 6px 10px; font-size: 11px; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 6px; margin-bottom: 10px;">
                        ${(data.legend || []).map(l => `
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span style="display: inline-block; width: 12px; height: 12px; background-color: ${l.color}; border: 1px solid #ffffff;"></span>
                                <span>${l.label}</span>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Fortschritt -->
                    <div style="background: #000055; border: 1px solid #ffffff; padding: 8px; margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                            <span id="defrag-status-msg" style="color: #00ffff;">Bereit zur Defragmentierung von 40 Lebensjahren.</span>
                            <span id="defrag-percent" style="font-weight: 700; color: #ffff00;">12%</span>
                        </div>
                        <div style="height: 18px; background: #ffffff; border: 1px solid #000000; position: relative;">
                            <div id="defrag-progress-fill" style="height: 100%; width: 12%; background: #00aa00; transition: width 0.1s;"></div>
                        </div>
                    </div>

                    <!-- Steuerungs-Buttons -->
                    <div style="display: flex; justify-content: flex-end; gap: 8px;">
                        <button id="defrag-start-btn" class="retro-raised-btn" style="padding: 6px 16px; font-weight: 700; font-size: 12px;">
                            Optimieren
                        </button>
                        <button id="defrag-stop-btn" class="retro-raised-btn" style="padding: 6px 16px; font-size: 12px;">
                            Anhalten
                        </button>
                        <button id="defrag-reset-btn" class="retro-raised-btn" style="padding: 6px 16px; font-size: 12px;">
                            Neu mischen
                        </button>
                    </div>
                </div>
            `;

            const gridEl = container.querySelector('#defrag-cluster-grid');
            renderGrid(gridEl);

            container.querySelector('#defrag-start-btn')?.addEventListener('click', () => {
                startDefrag(container);
            });
            container.querySelector('#defrag-stop-btn')?.addEventListener('click', () => {
                stopDefrag();
            });
            container.querySelector('#defrag-reset-btn')?.addEventListener('click', () => {
                stopDefrag();
                initClusters();
                renderGrid(gridEl);
                const percentEl = container.querySelector('#defrag-percent');
                const fillBarEl = container.querySelector('#defrag-progress-fill');
                const statusEl = container.querySelector('#defrag-status-msg');
                if (percentEl) percentEl.textContent = '12%';
                if (fillBarEl) fillBarEl.style.width = '12%';
                if (statusEl) statusEl.textContent = 'Cluster neu fragmentiert. Bereit zum Start.';
            });
        }
    };
})();
