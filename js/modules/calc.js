// Modul M09: CALC40.EXE (40-Jahre-Lebenszeit-Rechner)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.calc = (function () {
    let timerId = null;
    const BIRTH_DATE = new Date(1986, 8, 25, 0, 0, 0); // 25. September 1986

    function formatNumber(num) {
        return Math.floor(num).toLocaleString('de-DE');
    }

    function updateMetrics(container) {
        const now = new Date();
        const diffMs = now.getTime() - BIRTH_DATE.getTime();
        if (diffMs <= 0) return;

        const diffSeconds = diffMs / 1000;
        const diffMinutes = diffSeconds / 60;
        const diffHours = diffMinutes / 60;
        const diffDays = diffHours / 24;
        const diffYears = diffDays / 365.25;

        // Metriken
        const heartbeats = diffMinutes * 75; // ca. 75 bpm
        const sleptHours = diffHours * 0.33; // ca. ein Drittel
        const coffees = diffDays * 2.2;      // ca. 2.2 Tassen / Tag
        const beers = diffDays * 0.8;        // geschätzte Feierabendbiere
        const kmOrbit = diffSeconds * 29.78; // Erdorbit um die Sonne (~29.78 km/s)

        const secEl = container.querySelector('#calc-sec');
        const daysEl = container.querySelector('#calc-days');
        const hoursEl = container.querySelector('#calc-hours');
        const heartEl = container.querySelector('#calc-heart');
        const sleepEl = container.querySelector('#calc-sleep');
        const coffeeEl = container.querySelector('#calc-coffee');
        const beerEl = container.querySelector('#calc-beer');
        const kmEl = container.querySelector('#calc-km');

        if (secEl) secEl.textContent = formatNumber(diffSeconds) + ' s';
        if (daysEl) daysEl.textContent = formatNumber(diffDays) + ' Tage (' + diffYears.toFixed(2) + ' Jahre)';
        if (hoursEl) hoursEl.textContent = formatNumber(diffHours) + ' Std.';
        if (heartEl) heartEl.textContent = formatNumber(heartbeats);
        if (sleepEl) sleepEl.textContent = formatNumber(sleptHours) + ' Std. (~' + formatNumber(sleptHours / 24) + ' Tage)';
        if (coffeeEl) coffeeEl.textContent = formatNumber(coffees) + ' Tassen';
        if (beerEl) beerEl.textContent = formatNumber(beers) + ' Flaschen';
        if (kmEl) kmEl.textContent = formatNumber(kmOrbit) + ' km';
    }

    return {
        render: function (container) {
            if (timerId) clearInterval(timerId);

            container.innerHTML = `
                <div>
                    <div class="calc-display retro-sunken-dark">
                        <span style="font-size: 11px; float: left; opacity: 0.7;">LEBENSZEIT:</span>
                        <span id="calc-sec">Berechne...</span>
                    </div>

                    <div class="calc-stats-grid">
                        <div class="calc-stat-row retro-sunken">
                            <span>Bisherige Tage auf Erden:</span>
                            <span id="calc-days" class="calc-stat-val">-</span>
                        </div>
                        <div class="calc-stat-row retro-sunken">
                            <span>Gelebte Stunden:</span>
                            <span id="calc-hours" class="calc-stat-val">-</span>
                        </div>
                        <div class="calc-stat-row retro-sunken">
                            <span>Geschätzte Herzschläge (75 bpm):</span>
                            <span id="calc-heart" class="calc-stat-val">-</span>
                        </div>
                        <div class="calc-stat-row retro-sunken">
                            <span>Verschlafene Lebenszeit (33%):</span>
                            <span id="calc-sleep" class="calc-stat-val">-</span>
                        </div>
                        <div class="calc-stat-row retro-sunken">
                            <span>Geschätzte Tassen Kaffee:</span>
                            <span id="calc-coffee" class="calc-stat-val">-</span>
                        </div>
                        <div class="calc-stat-row retro-sunken">
                            <span>Genossene Feierabend-Biere:</span>
                            <span id="calc-beer" class="calc-stat-val">-</span>
                        </div>
                        <div class="calc-stat-row retro-sunken">
                            <span>Reise im Weltall (Erd-Orbit):</span>
                            <span id="calc-km" class="calc-stat-val">-</span>
                        </div>
                    </div>

                    <div style="margin-top: 12px; text-align: center; font-size: 11px; color: #464653;">
                        Basis: 25. September 1986, 00:00:00 Uhr | Live-Synchronisation läuft
                    </div>
                </div>
            `;

            updateMetrics(container);
            timerId = setInterval(() => updateMetrics(container), 1000);
        }
    };
})();
