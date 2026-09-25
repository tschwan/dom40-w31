// Modul: GREETING.CRD (80er-Jahre-Geburtstagsgrußkarte für Dominik)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.greeting = (function () {
    let currentIndex = 0;
    let audioCtx = null;
    let isMusicPlaying = false;
    let soundTimeouts = [];
    let activeNodes = [];
    let confettiAnimId = null;

    const MELODY = [
        { note: 261.63, dur: 0.28, pause: 0.05 },
        { note: 261.63, dur: 0.28, pause: 0.05 },
        { note: 293.66, dur: 0.55, pause: 0.06 },
        { note: 261.63, dur: 0.55, pause: 0.06 },
        { note: 349.23, dur: 0.55, pause: 0.06 },
        { note: 329.63, dur: 1.10, pause: 0.15 },
        { note: 261.63, dur: 0.28, pause: 0.05 },
        { note: 261.63, dur: 0.28, pause: 0.05 },
        { note: 293.66, dur: 0.55, pause: 0.06 },
        { note: 261.63, dur: 0.55, pause: 0.06 },
        { note: 392.00, dur: 0.55, pause: 0.06 },
        { note: 349.23, dur: 1.10, pause: 0.15 },
        { note: 261.63, dur: 0.28, pause: 0.05 },
        { note: 261.63, dur: 0.28, pause: 0.05 },
        { note: 523.25, dur: 0.55, pause: 0.06 },
        { note: 440.00, dur: 0.55, pause: 0.06 },
        { note: 349.23, dur: 0.55, pause: 0.06 },
        { note: 329.63, dur: 0.55, pause: 0.06 },
        { note: 293.66, dur: 0.95, pause: 0.15 },
        { note: 466.16, dur: 0.28, pause: 0.05 },
        { note: 466.16, dur: 0.28, pause: 0.05 },
        { note: 440.00, dur: 0.55, pause: 0.06 },
        { note: 349.23, dur: 0.55, pause: 0.06 },
        { note: 392.00, dur: 0.55, pause: 0.06 },
        { note: 349.23, dur: 1.25, pause: 0.20 }
    ];

    function stopMusic() {
        soundTimeouts.forEach(t => clearTimeout(t));
        soundTimeouts = [];
        activeNodes.forEach(node => {
            try {
                node.stop();
                node.disconnect();
            } catch (_) {}
        });
        activeNodes = [];
        isMusicPlaying = false;
        updateMusicUi();
    }

    function playNote(freq, startTime, duration) {
        if (!audioCtx) return null;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, startTime);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1900, startTime);
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(0.13, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration + 0.01);
        activeNodes.push(osc);
        return osc;
    }

    function playHappyBirthday() {
        if (isMusicPlaying) {
            stopMusic();
            return;
        }
        try {
            const AudioClass = window.AudioContext || window.webkitAudioContext;
            if (!audioClassExists(AudioClass)) return;
            if (!audioCtx) {
                audioCtx = new AudioClass();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            isMusicPlaying = true;
            updateMusicUi();
            let currentTime = audioCtx.currentTime + 0.05;
            MELODY.forEach(item => {
                playNote(item.note, currentTime, item.dur);
                currentTime += item.dur + item.pause;
            });
            const totalDurationMs = (currentTime - audioCtx.currentTime) * 1000;
            const endTimeout = setTimeout(() => {
                stopMusic();
            }, totalDurationMs);
            soundTimeouts.push(endTimeout);
        } catch (err) {
            console.warn('Audio play error:', err);
            stopMusic();
        }
    }

    function audioClassExists(cls) {
        return typeof cls === 'function';
    }

    function playDiceSound() {
        try {
            const AudioClass = window.AudioContext || window.webkitAudioContext;
            if (!audioClassExists(AudioClass)) return;
            const ctx = audioCtx || new AudioClass();
            if (ctx.state === 'suspended') ctx.resume();
            const now = ctx.currentTime;
            [440, 554.37, 659.25, 880].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.04);
                gain.gain.setValueAtTime(0.12, now + idx * 0.04);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.08);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.04);
                osc.stop(now + idx * 0.04 + 0.09);
            });
        } catch (_) {}
    }

    function updateMusicUi() {
        const btn = document.getElementById('greeting-music-btn');
        const led = document.getElementById('greeting-sound-led');
        if (!btn || !led || !btn.classList || !led.classList) return;
        if (isMusicPlaying) {
            btn.innerHTML = '<span class="material-symbols-outlined">stop</span><span>Musik stoppen</span>';
            btn.classList.add('playing');
            led.classList.add('active');
        } else {
            btn.innerHTML = '<span class="material-symbols-outlined">play_arrow</span><span>Musik abspielen</span>';
            btn.classList.remove('playing');
            led.classList.remove('active');
        }
    }

    function triggerConfetti(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        if (confettiAnimId) {
            cancelAnimationFrame(confettiAnimId);
            confettiAnimId = null;
        }
        canvas.width = canvas.offsetWidth || 500;
        canvas.height = canvas.offsetHeight || 300;
        const colors = ['#ff007f', '#00f0ff', '#ffe600', '#39ff14', '#a855f7', '#ff6b00'];
        const particles = [];
        for (let i = 0; i < 55; i++) {
            particles.push({
                x: canvas.width * 0.5 + (Math.random() - 0.5) * 120,
                y: canvas.height * 0.4 + (Math.random() - 0.5) * 60,
                vx: (Math.random() - 0.5) * 11,
                vy: -Math.random() * 7 - 3,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                vRot: (Math.random() - 0.5) * 14,
                shape: Math.random() > 0.4 ? 'rect' : (Math.random() > 0.5 ? 'triangle' : 'circle'),
                alpha: 1
            });
        }
        function frame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = 0;
            particles.forEach(p => {
                if (p.alpha <= 0) return;
                alive++;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.24;
                p.vx *= 0.98;
                p.rotation += p.vRot;
                p.alpha -= 0.011;
                ctx.save();
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                if (p.shape === 'rect') {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                } else if (p.shape === 'triangle') {
                    ctx.beginPath();
                    ctx.moveTo(0, -p.size / 2);
                    ctx.lineTo(p.size / 2, p.size / 2);
                    ctx.lineTo(-p.size / 2, p.size / 2);
                    ctx.closePath();
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            });
            if (alive > 0) {
                confettiAnimId = requestAnimationFrame(frame);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                confettiAnimId = null;
            }
        }
        confettiAnimId = requestAnimationFrame(frame);
    }

    function displayQuote(index, playFx = true) {
        const greetings = window.DOMINIK_DATA?.greetings || [];
        if (!greetings.length) return;
        currentIndex = (index + greetings.length) % greetings.length;
        const textEl = document.getElementById('greeting-quote-text');
        const counterEl = document.getElementById('greeting-counter');
        const canvas = document.getElementById('greeting-confetti-canvas');
        if (textEl) {
            textEl.textContent = greetings[currentIndex];
        }
        if (counterEl) {
            counterEl.textContent = `#${currentIndex + 1} / ${greetings.length}`;
        }
        if (playFx) {
            playDiceSound();
            triggerConfetti(canvas);
        }
    }

    function pickRandomQuote() {
        const greetings = window.DOMINIK_DATA?.greetings || [];
        if (greetings.length <= 1) {
            displayQuote(0, true);
            return;
        }
        let nextIndex = currentIndex;
        while (nextIndex === currentIndex) {
            nextIndex = Math.floor(Math.random() * greetings.length);
        }
        displayQuote(nextIndex, true);
    }

    function initListeners() {
        if (window.DOMINIK_STATE && typeof window.DOMINIK_STATE.subscribe === 'function') {
            window.DOMINIK_STATE.subscribe((event, data) => {
                if (event === 'program:close' || (event === 'program:open' && data?.activeProgramId !== 'greeting')) {
                    stopMusic();
                }
            });
        }
    }

    initListeners();

    return {
        render: function (container) {
            stopMusic();
            const greetings = window.DOMINIK_DATA?.greetings || [];
            const initialText = greetings[currentIndex] || "Alles Gute zum 40. Geburtstag, Dominik!";
            container.innerHTML = `
                <div class="greeting-wrapper">
                    <canvas id="greeting-confetti-canvas" class="greeting-confetti-canvas"></canvas>
                    <div class="greeting-columns">
                        <div class="greeting-polaroid-side">
                            <div class="greeting-polaroid-card">
                                <img src="images/polaroid.webp" alt="Mette &amp; Thomas – 25.09.1986" class="greeting-polaroid-img" />
                            </div>
                        </div>
                        <div class="greeting-message-side retro-sunken">
                            <div class="greeting-card-banner">
                                <span class="material-symbols-outlined greeting-banner-icon">celebration</span>
                                <div>
                                    <div class="greeting-banner-title">DOMINIK 4.0 – JUBILÄUMSKARTE</div>
                                    <div class="greeting-banner-sub">Herzlichen Glückwunsch zum 40. Geburtstag!</div>
                                </div>
                            </div>
                            <div class="greeting-soundchip-bar retro-sunken">
                                <div class="greeting-soundchip-label">
                                    <span id="greeting-sound-led" class="greeting-led"></span>
                                    <span>80s Piezo-Soundchip („Happy Birthday“)</span>
                                </div>
                                <button id="greeting-music-btn" class="retro-raised-btn greeting-music-btn">
                                    <span class="material-symbols-outlined">play_arrow</span>
                                    <span>Musik abspielen</span>
                                </button>
                            </div>
                            <div class="greeting-quote-card">
                                <div class="greeting-quote-mark left">“</div>
                                <p id="greeting-quote-text" class="greeting-quote-text">${initialText}</p>
                                <div class="greeting-quote-mark right">”</div>
                            </div>
                            <div class="greeting-action-bar">
                                <button id="greeting-dice-btn" class="retro-raised-btn greeting-dice-btn">
                                    <span class="material-symbols-outlined">casino</span>
                                    <span>Zufälliger Gruß</span>
                                </button>
                                <div class="greeting-nav-bar">
                                    <button id="greeting-prev-btn" class="retro-raised-btn nav-btn" title="Vorheriger Gruß">◀</button>
                                    <span id="greeting-counter" class="greeting-counter">#${currentIndex + 1} / ${greetings.length || 50}</span>
                                    <button id="greeting-next-btn" class="retro-raised-btn nav-btn" title="Nächster Gruß">▶</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const diceBtn = container.querySelector('#greeting-dice-btn');
            const prevBtn = container.querySelector('#greeting-prev-btn');
            const nextBtn = container.querySelector('#greeting-next-btn');
            const musicBtn = container.querySelector('#greeting-music-btn');

            diceBtn?.addEventListener('click', () => pickRandomQuote());
            prevBtn?.addEventListener('click', () => displayQuote(currentIndex - 1, true));
            nextBtn?.addEventListener('click', () => displayQuote(currentIndex + 1, true));
            musicBtn?.addEventListener('click', () => playHappyBirthday());

            setTimeout(() => {
                const canvas = document.getElementById('greeting-confetti-canvas');
                triggerConfetti(canvas);
            }, 100);
        }
    };
})();
