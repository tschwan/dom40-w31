// Modul: TELETEXT.EXE (Videotext Tafel 1986)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.teletext = (function () {
    let currentPage = '100';
    let inputBuffer = '';
    let isCycling = false;
    let cycleTimer = null;
    let clockInterval = null;

    function getTeletextData() {
        return window.DOMINIK_DATA?.teletext || { pages: {} };
    }

    function switchPage(pageKey, container) {
        const data = getTeletextData();
        const targetPage = data.pages[pageKey] ? pageKey : '100';

        // Kurze Lade-Simulation ("Seitensuche") wie beim Original-Decoder
        if (cycleTimer) clearInterval(cycleTimer);
        isCycling = true;
        inputBuffer = '';

        const headerPageEl = container.querySelector('#tt-header-page');
        let counter = 100;
        cycleTimer = setInterval(() => {
            counter = (counter + 1) % 900;
            if (headerPageEl) {
                headerPageEl.textContent = `P${counter.toString().padStart(3, '0')}`;
            }
        }, 30);

        setTimeout(() => {
            if (cycleTimer) clearInterval(cycleTimer);
            isCycling = false;
            currentPage = targetPage;
            renderScreen(container);
        }, 150);
    }

    function renderScreen(container) {
        const data = getTeletextData();
        const page = data.pages[currentPage] || data.pages['100'];
        const screenEl = container.querySelector('#tt-screen');
        const headerPageEl = container.querySelector('#tt-header-page');
        const inputDisplayEl = container.querySelector('#tt-input-display');

        if (headerPageEl) {
            headerPageEl.textContent = `P${currentPage}`;
        }
        if (inputDisplayEl) {
            inputDisplayEl.textContent = inputBuffer ? inputBuffer.padEnd(3, '-') : currentPage;
        }
        if (!screenEl || !page) return;

        let contentHtml = '';
        page.content.forEach(row => {
            contentHtml += renderRow(row);
        });

        screenEl.innerHTML = contentHtml;

        // Klick-Events auf verlinkte Seitenzahlen im Fließtext
        screenEl.querySelectorAll('.tt-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('data-page');
                if (target) switchPage(target, container);
            });
        });
    }

    function renderRow(row) {
        if (row.type === 'blank') {
            return '<div class="tt-row">&nbsp;</div>';
        }
        if (row.type === 'banner') {
            return `<div class="tt-row tt-banner tt-blue">${row.text}</div>`;
        }
        if (row.type === 'header') {
            return `<div class="tt-row tt-header-bar">${row.text}</div>`;
        }
        if (row.type === 'testcard') {
            return `
                <div class="tt-testcard">
                    <div style="background: #ffffff;"></div>
                    <div style="background: #ffff00;"></div>
                    <div style="background: #00ffff;"></div>
                    <div style="background: #00ff00;"></div>
                    <div style="background: #ff00ff;"></div>
                    <div style="background: #ff0000;"></div>
                    <div style="background: #0000ff;"></div>
                    <div style="background: #000000;"></div>
                </div>
            `;
        }
        if (row.type === 'menu-item') {
            return `
                <div class="tt-row">
                    <a href="#" class="tt-link tt-${row.color || 'yellow'}" data-page="${row.page}">
                        <span class="tt-badge">&gt;&gt; ${row.label}</span>
                        <span class="tt-white">${row.desc}</span>
                    </a>
                </div>
            `;
        }
        if (row.type === 'footer-nav') {
            return `
                <div class="tt-row tt-footer-links">
                    <span class="tt-fast-red">ROT 100</span>
                    <span class="tt-fast-green">GRUEN ${row.next || '>>'}</span>
                    <span class="tt-fast-yellow">GELB 200</span>
                    <span class="tt-fast-blue">BLAU 300</span>
                </div>
            `;
        }

        const colorClass = `tt-${row.color || 'white'}`;
        const weightClass = row.type === 'title' ? 'tt-bold' : '';
        return `<div class="tt-row ${colorClass} ${weightClass}">${row.text}</div>`;
    }

    function handleDigit(digit, container) {
        if (isCycling) return;
        inputBuffer += digit;
        const inputDisplayEl = container.querySelector('#tt-input-display');
        if (inputDisplayEl) {
            inputDisplayEl.textContent = inputBuffer.padEnd(3, '-');
        }

        if (inputBuffer.length >= 3) {
            const requested = inputBuffer;
            inputBuffer = '';
            switchPage(requested, container);
        }
    }

    function initKeyboardHandler(container) {
        const keyHandler = (e) => {
            if (window.DOMINIK_STATE.getActiveProgramId() !== 'teletext') return;
            if (e.key >= '0' && e.key <= '9') {
                e.preventDefault();
                handleDigit(e.key, container);
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                inputBuffer = inputBuffer.slice(0, -1);
                const inputDisplayEl = container.querySelector('#tt-input-display');
                if (inputDisplayEl) {
                    inputDisplayEl.textContent = inputBuffer ? inputBuffer.padEnd(3, '-') : currentPage;
                }
            } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
                e.preventDefault();
                const data = getTeletextData();
                const next = data.pages[currentPage]?.next;
                if (next) switchPage(next, container);
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                const data = getTeletextData();
                const prev = data.pages[currentPage]?.prev;
                if (prev) switchPage(prev, container);
            }
        };

        window.addEventListener('keydown', keyHandler);
        // Aufräumen, falls das Modul neu initialisiert wird
        return () => window.removeEventListener('keydown', keyHandler);
    }

    return {
        render: function (container) {
            const data = getTeletextData();
            currentPage = '100';
            inputBuffer = '';

            container.innerHTML = `
                <div class="teletext-wrapper">
                    <!-- Videotext Bildschirm -->
                    <div class="teletext-screen retro-sunken-dark" id="tt-screen-box">
                        <div class="tt-topbar">
                            <span id="tt-header-page" class="tt-yellow">P100</span>
                            <span class="tt-white">${data.header?.station || 'DOMINIK-TEXT'}</span>
                            <span class="tt-cyan">${data.header?.date || '25.09.86'}</span>
                            <span id="tt-live-time" class="tt-yellow">${data.header?.time || '18:40:25'}</span>
                        </div>
                        <div id="tt-screen" class="tt-content-area"></div>
                    </div>

                    <!-- Fernbedienung / Steuerung -->
                    <div class="teletext-remote retro-window-frame">
                        <div class="remote-header">
                            <span class="remote-title">TELETEXT DECODER 1986</span>
                            <div class="remote-display retro-sunken-dark">
                                <span class="remote-display-label">SEITE:</span>
                                <span id="tt-input-display" class="remote-display-digits">100</span>
                            </div>
                        </div>

                        <!-- Schnelltasten (Fastext / Farbtasten) -->
                        <div class="remote-color-bar">
                            <button class="tt-color-btn btn-red" data-page="100" title="Seite 100 (Index)">100 Index</button>
                            <button class="tt-color-btn btn-green" data-page="next" title="Nächste Seite">Vor &gt;</button>
                            <button class="tt-color-btn btn-yellow" data-page="200" title="Seite 200 (Sport)">200 Sport</button>
                            <button class="tt-color-btn btn-blue" data-page="300" title="Seite 300 (TV)">300 TV</button>
                        </div>

                        <!-- Zifferntastatur -->
                        <div class="remote-keypad">
                            <button class="retro-raised-btn remote-num" data-num="1">1</button>
                            <button class="retro-raised-btn remote-num" data-num="2">2</button>
                            <button class="retro-raised-btn remote-num" data-num="3">3</button>
                            <button class="retro-raised-btn remote-num" data-num="4">4</button>
                            <button class="retro-raised-btn remote-num" data-num="5">5</button>
                            <button class="retro-raised-btn remote-num" data-num="6">6</button>
                            <button class="retro-raised-btn remote-num" data-num="7">7</button>
                            <button class="retro-raised-btn remote-num" data-num="8">8</button>
                            <button class="retro-raised-btn remote-num" data-num="9">9</button>
                            <button class="retro-raised-btn remote-ctrl" data-act="prev">&lt; Zurück</button>
                            <button class="retro-raised-btn remote-num" data-num="0">0</button>
                            <button class="retro-raised-btn remote-ctrl" data-act="next">Vor &gt;</button>
                        </div>

                        <div class="remote-footer-info">
                            Tastatur-Tipp: Ziffern 0-9 direkt auf der Tastatur tippen.
                        </div>
                    </div>
                </div>
            `;

            // Event-Binding für Zifferntasten
            container.querySelectorAll('.remote-num').forEach(btn => {
                btn.addEventListener('click', () => {
                    const num = btn.getAttribute('data-num');
                    if (num) handleDigit(num, container);
                });
            });

            // Vor/Zurück Tasten
            container.querySelectorAll('[data-act="next"]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const next = getTeletextData().pages[currentPage]?.next || '101';
                    switchPage(next, container);
                });
            });
            container.querySelectorAll('[data-act="prev"]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const prev = getTeletextData().pages[currentPage]?.prev || '100';
                    switchPage(prev, container);
                });
            });

            // Farbtasten
            container.querySelector('.btn-red')?.addEventListener('click', () => switchPage('100', container));
            container.querySelector('.btn-green')?.addEventListener('click', () => {
                const next = getTeletextData().pages[currentPage]?.next || '101';
                switchPage(next, container);
            });
            container.querySelector('.btn-yellow')?.addEventListener('click', () => switchPage('200', container));
            container.querySelector('.btn-blue')?.addEventListener('click', () => switchPage('300', container));

            // Initialen Bildschirm rendern
            renderScreen(container);
            initKeyboardHandler(container);

            // Live-Uhr im Teletext-Header
            if (clockInterval) clearInterval(clockInterval);
            clockInterval = setInterval(() => {
                const clockEl = container.querySelector('#tt-live-time');
                if (!clockEl) {
                    clearInterval(clockInterval);
                    return;
                }
                const now = new Date();
                const hh = String(now.getHours()).padStart(2, '0');
                const mm = String(now.getMinutes()).padStart(2, '0');
                const ss = String(now.getSeconds()).padStart(2, '0');
                clockEl.textContent = `${hh}:${mm}:${ss}`;
            }, 1000);
        }
    };
})();
