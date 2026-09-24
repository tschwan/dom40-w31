// Modul: MINESWEEP.EXE (Minesweeper 40.0 - Das Lebens-Minenfeld)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.minesweep = (function () {
    let levelKey = 'beginner';
    let rows = 9;
    let cols = 9;
    let totalMines = 10;
    let board = [];
    let gameState = 'ready'; // ready, playing, won, lost
    let flagsCount = 0;
    let timerInterval = null;
    let seconds = 0;
    let tapMode = 'reveal'; // 'reveal' | 'flag' (für Touch-Geräte)
    let triggeredHazard = null;

    function getMinesweepData() {
        return window.DOMINIK_DATA?.minesweep || { hazards: [], levels: {} };
    }

    function initBoard() {
        const lvl = getMinesweepData().levels[levelKey] || { rows: 9, cols: 9, mines: 10 };
        rows = lvl.rows;
        cols = lvl.cols;
        totalMines = lvl.mines;
        flagsCount = 0;
        seconds = 0;
        gameState = 'ready';
        triggeredHazard = null;
        if (timerInterval) clearInterval(timerInterval);

        board = [];
        for (let r = 0; r < rows; r++) {
            board[r] = [];
            for (let c = 0; c < cols; c++) {
                board[r][c] = {
                    r, c,
                    isMine: false,
                    hazard: null,
                    neighborMines: 0,
                    state: 'hidden' // hidden, revealed, flagged, exploded
                };
            }
        }
    }

    function plantMines(firstR, firstC) {
        const hazards = getMinesweepData().hazards || [];
        let planted = 0;
        while (planted < totalMines) {
            const r = Math.floor(Math.random() * rows);
            const c = Math.floor(Math.random() * cols);
            // Erster Klick und dessen Nachbarn sind minenfrei
            const isNearFirst = Math.abs(r - firstR) <= 1 && Math.abs(c - firstC) <= 1;
            if (!board[r][c].isMine && !isNearFirst) {
                board[r][c].isMine = true;
                board[r][c].hazard = hazards[planted % hazards.length];
                planted++;
            }
        }

        // Nachbarminen zählen
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (board[r][c].isMine) continue;
                let count = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
                            count++;
                        }
                    }
                }
                board[r][c].neighborMines = count;
            }
        }
    }

    function startTimer(container) {
        if (timerInterval) clearInterval(timerInterval);
        seconds = 0;
        timerInterval = setInterval(() => {
            if (gameState !== 'playing') {
                clearInterval(timerInterval);
                return;
            }
            seconds = Math.min(999, seconds + 1);
            updateDisplays(container);
        }, 1000);
    }

    function updateDisplays(container) {
        const minesEl = container.querySelector('#ms-mines-display');
        const timerEl = container.querySelector('#ms-timer-display');
        const faceEl = container.querySelector('#ms-face-btn');

        if (minesEl) {
            const remain = Math.max(0, totalMines - flagsCount);
            minesEl.textContent = String(remain).padStart(3, '0');
        }
        if (timerEl) {
            timerEl.textContent = String(seconds).padStart(3, '0');
        }
        if (faceEl) {
            if (gameState === 'won') faceEl.textContent = '😎';
            else if (gameState === 'lost') faceEl.textContent = '😵';
            else faceEl.textContent = '🙂';
        }
    }

    function revealCell(r, c, container) {
        if (gameState === 'won' || gameState === 'lost') return;
        const cell = board[r]?.[c];
        if (!cell || cell.state === 'revealed' || cell.state === 'flagged') return;

        if (gameState === 'ready') {
            gameState = 'playing';
            plantMines(r, c);
            startTimer(container);
        }

        if (cell.isMine) {
            // Mine ausgelöst -> Game Over
            cell.state = 'exploded';
            triggeredHazard = cell.hazard;
            endGame(false, container);
            return;
        }

        cell.state = 'revealed';

        // Flut-Aufdeckung bei 0 Nachbarminen
        if (cell.neighborMines === 0) {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                        revealCell(nr, nc, container);
                    }
                }
            }
        }

        checkWinCondition(container);
        renderGrid(container);
    }

    function toggleFlag(r, c, container) {
        if (gameState !== 'ready' && gameState !== 'playing') return;
        const cell = board[r]?.[c];
        if (!cell || cell.state === 'revealed') return;

        if (cell.state === 'flagged') {
            cell.state = 'hidden';
            flagsCount--;
        } else if (cell.state === 'hidden') {
            cell.state = 'flagged';
            flagsCount++;
        }

        updateDisplays(container);
        renderGrid(container);
    }

    function checkWinCondition(container) {
        let unrevealedSafeCells = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (!board[r][c].isMine && board[r][c].state !== 'revealed') {
                    unrevealedSafeCells++;
                }
            }
        }
        if (unrevealedSafeCells === 0) {
            endGame(true, container);
        }
    }

    function endGame(isWon, container) {
        gameState = isWon ? 'won' : 'lost';
        if (timerInterval) clearInterval(timerInterval);

        // Deckt alle Minen auf
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (board[r][c].isMine && board[r][c].state !== 'exploded') {
                    board[r][c].state = isWon ? 'flagged' : 'revealed';
                }
            }
        }

        updateDisplays(container);
        renderGrid(container);
        renderStatusBanner(container);
    }

    function renderStatusBanner(container) {
        const bannerEl = container.querySelector('#ms-status-banner');
        if (!bannerEl) return;

        if (gameState === 'won') {
            bannerEl.innerHTML = `
                <div class="retro-sunken" style="background: #e0ffe0; border: 1px solid #008000; padding: 8px; text-align: center;">
                    <strong style="color: #008000; font-size: 13px;">🏆 LEVEL 40 SOUVERÄN GEMEISTERT!</strong><br>
                    <span style="font-size: 11px;">Du hast alle ${totalMines} Altersfallen erfolgreich umschifft. Dominik bleibt ewig jung!</span>
                </div>
            `;
        } else if (gameState === 'lost') {
            const h = triggeredHazard || { name: 'Altersfalle', desc: 'Eine tückische Hürde des 40. Lebensjahres.' };
            bannerEl.innerHTML = `
                <div class="retro-sunken" style="background: #ffe0e0; border: 1px solid #ba1a1a; padding: 8px;">
                    <div style="font-weight: 700; color: #ba1a1a; font-size: 12px; margin-bottom: 2px;">
                        ⚠️ IN DIE ALTERS-FALLE GETAPPT: ${h.name.toUpperCase()}
                    </div>
                    <div style="font-size: 11px; color: #400000; line-height: 1.3;">
                        ${h.desc}
                    </div>
                </div>
            `;
        } else {
            bannerEl.innerHTML = '';
        }
    }

    function renderGrid(container) {
        const gridEl = container.querySelector('#ms-grid');
        if (!gridEl) return;

        gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridEl.innerHTML = '';

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = board[r][c];
                const btn = document.createElement('div');
                btn.className = 'ms-cell';
                btn.setAttribute('data-r', r);
                btn.setAttribute('data-c', c);

                if (cell.state === 'hidden') {
                    btn.classList.add('retro-raised-btn', 'ms-hidden');
                } else if (cell.state === 'flagged') {
                    btn.classList.add('retro-raised-btn', 'ms-flagged');
                    btn.innerHTML = '🚩';
                } else if (cell.state === 'exploded') {
                    btn.classList.add('ms-revealed', 'ms-exploded');
                    btn.innerHTML = '💥';
                } else if (cell.state === 'revealed') {
                    btn.classList.add('ms-revealed');
                    if (cell.isMine) {
                        btn.innerHTML = '💣';
                    } else if (cell.neighborMines > 0) {
                        btn.classList.add(`ms-num-${cell.neighborMines}`);
                        btn.textContent = cell.neighborMines;
                    }
                }

                // Klick-Events
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (tapMode === 'flag') {
                        toggleFlag(r, c, container);
                    } else {
                        revealCell(r, c, container);
                    }
                });

                // Rechtsklick zum Markieren
                btn.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    toggleFlag(r, c, container);
                });

                // Spannungs-Smiley bei gedrückter Maustaste
                btn.addEventListener('mousedown', () => {
                    if (gameState === 'ready' || gameState === 'playing') {
                        const faceEl = container.querySelector('#ms-face-btn');
                        if (faceEl && cell.state === 'hidden') faceEl.textContent = '😮';
                    }
                });

                gridEl.appendChild(btn);
            }
        }

        // Smiley nach Mausklick zurücksetzen
        window.addEventListener('mouseup', () => {
            if (gameState === 'ready' || gameState === 'playing') {
                const faceEl = container.querySelector('#ms-face-btn');
                if (faceEl) faceEl.textContent = '🙂';
            }
        }, { once: true });
    }

    return {
        render: function (container) {
            initBoard();

            container.innerHTML = `
                <div class="ms-window-body">
                    <!-- Menü- und Schwierigkeitsleiste -->
                    <div class="ms-toolbar retro-window-frame">
                        <div style="display: flex; gap: 4px; align-items: center;">
                            <span style="font-size: 11px; font-weight: 700;">STUFE:</span>
                            <button id="ms-lvl-easy" class="retro-raised-btn ms-lvl-btn ${levelKey === 'beginner' ? 'active' : ''}">9x9 (10 Fallen)</button>
                            <button id="ms-lvl-med" class="retro-raised-btn ms-lvl-btn ${levelKey === 'medium' ? 'active' : ''}">12x12 (20 Fallen)</button>
                        </div>
                        <div style="display: flex; gap: 4px; align-items: center;">
                            <span style="font-size: 11px; font-weight: 700;">TOUCH-MODUS:</span>
                            <button id="ms-mode-toggle" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px; font-weight: 700;">
                                ${tapMode === 'reveal' ? '⛏️ Aufdecken' : '🚩 Flagge'}
                            </button>
                        </div>
                    </div>

                    <!-- Minesweeper Header Board -->
                    <div class="ms-dashboard retro-sunken-trough">
                        <!-- Minenzähler -->
                        <div class="ms-digital-display retro-sunken-dark" id="ms-mines-display">010</div>

                        <!-- Smiley Restart Button -->
                        <button id="ms-face-btn" class="retro-raised-btn ms-face-button" title="Neues Spiel">🙂</button>

                        <!-- Zeitzähler -->
                        <div class="ms-digital-display retro-sunken-dark" id="ms-timer-display">000</div>
                    </div>

                    <!-- Spielfeld -->
                    <div class="ms-grid-frame retro-sunken">
                        <div id="ms-grid" class="ms-grid"></div>
                    </div>

                    <!-- Altersfallen Status-Banner -->
                    <div id="ms-status-banner" style="margin-top: 8px;"></div>
                </div>
            `;

            // Schwierigkeits-Buttons
            container.querySelector('#ms-lvl-easy')?.addEventListener('click', () => {
                levelKey = 'beginner';
                window.DOMINIK_MODULES.minesweep.render(container);
            });
            container.querySelector('#ms-lvl-med')?.addEventListener('click', () => {
                levelKey = 'medium';
                window.DOMINIK_MODULES.minesweep.render(container);
            });

            // Touch-Modus-Toggle
            const modeBtn = container.querySelector('#ms-mode-toggle');
            modeBtn?.addEventListener('click', () => {
                tapMode = tapMode === 'reveal' ? 'flag' : 'reveal';
                modeBtn.textContent = tapMode === 'reveal' ? '⛏️ Aufdecken' : '🚩 Flagge';
                if (tapMode === 'flag') modeBtn.style.color = '#b00000';
                else modeBtn.style.color = '#000000';
            });

            // Smiley Restart
            container.querySelector('#ms-face-btn')?.addEventListener('click', () => {
                initBoard();
                updateDisplays(container);
                renderGrid(container);
                renderStatusBanner(container);
            });

            updateDisplays(container);
            renderGrid(container);
        }
    };
})();
