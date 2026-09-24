// Modul: SOUNDREC.EXE (Audiorekorder / Dominik Soundboard)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.soundrec = (function () {
    let audioCtx = null;
    let analyserNode = null;
    let animFrameId = null;
    let activeTrackId = 'modem';
    let isPlaying = false;
    let playbackSpeed = 1.0;
    let stopFn = null;
    let progressTimer = null;
    let currentSeconds = 0;
    let totalSeconds = 8.5;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioClass();
            analyserNode = audioCtx.createAnalyser();
            analyserNode.fftSize = 512;
            analyserNode.connect(audioCtx.destination);
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return { ctx: audioCtx, analyser: analyserNode };
    }

    function drawOscilloscope(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const w = canvas.width;
        const h = canvas.height;
        const midY = h / 2;
        const dataArray = new Uint8Array(256);

        function renderWave() {
            ctx.fillStyle = '#001800';
            ctx.fillRect(0, 0, w, h);

            // Horizontale Nulllinie und Gitter
            ctx.strokeStyle = '#003300';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, midY);
            ctx.lineTo(w, midY);
            ctx.stroke();

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#00ff44';
            ctx.shadowColor = '#00ff44';
            ctx.shadowBlur = isPlaying ? 6 : 2;
            ctx.beginPath();

            if (analyserNode && isPlaying) {
                analyserNode.getByteTimeDomainData(dataArray);
                const sliceWidth = w / dataArray.length;
                let x = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    const v = dataArray[i] / 128.0;
                    const y = (v * midY);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                    x += sliceWidth;
                }
            } else {
                ctx.moveTo(0, midY);
                ctx.lineTo(w, midY);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

            animFrameId = requestAnimationFrame(renderWave);
        }

        renderWave();
    }

    function stopCurrentSound() {
        if (stopFn) {
            try { stopFn(); } catch (_) {}
            stopFn = null;
        }
        if (progressTimer) {
            clearInterval(progressTimer);
            progressTimer = null;
        }
        try { window.speechSynthesis?.cancel(); } catch (_) {}
        isPlaying = false;
    }

    function speakQuote(text, lang = 'de-DE', rate = 1.0, pitch = 1.0, onEndCallback = null) {
        try {
            if (!('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = lang;
            utter.rate = rate * playbackSpeed;
            utter.pitch = pitch;
            if (onEndCallback) {
                utter.onend = onEndCallback;
                utter.onerror = onEndCallback;
            }
            window.speechSynthesis.speak(utter);
        } catch (_) {}
    }

    function playTrack(trackId, container) {
        stopCurrentSound();
        const { ctx, analyser } = getAudioContext();
        activeTrackId = trackId;
        isPlaying = true;

        const tracks = window.DOMINIK_DATA?.soundrec?.tracks || [];
        const track = tracks.find(t => t.id === trackId) || tracks[0];
        totalSeconds = parseFloat(track?.duration || '4.0');
        currentSeconds = 0;

        updatePlayerUI(container, track);

        const onSoundComplete = () => {
            stopCurrentSound();
            currentSeconds = totalSeconds;
            updateProgressUI(container);
        };

        const isSpeech = trackId === 'topgun' || trackId === 'croc' || trackId === 'ferris';

        progressTimer = setInterval(() => {
            currentSeconds += 0.1 * playbackSpeed;
            if (currentSeconds >= totalSeconds) {
                if (!isSpeech) {
                    onSoundComplete();
                } else {
                    currentSeconds = totalSeconds;
                    updateProgressUI(container);
                }
            } else {
                updateProgressUI(container);
            }
        }, 100);

        if (trackId === 'modem') {
            stopFn = synthesizeModem(ctx, analyser, playbackSpeed);
        } else if (trackId === 'tada') {
            stopFn = synthesizeTada(ctx, analyser, playbackSpeed);
        } else if (trackId === 'cassette') {
            stopFn = synthesizeCassette(ctx, analyser, playbackSpeed);
        } else if (trackId === 'pcspeaker') {
            stopFn = synthesizePcSpeaker(ctx, analyser, playbackSpeed);
        } else if (trackId === 'topgun') {
            synthesizeJet(ctx, analyser, playbackSpeed);
            speakQuote('I feel the need... the need for speed! Happy 40th Birthday Dominik!', 'en-US', 1.0, 1.05, onSoundComplete);
        } else if (trackId === 'croc') {
            synthesizeKnifeShing(ctx, analyser, playbackSpeed);
            speakQuote('Das ist doch kein Messer... DAS ist ein Messer!', 'de-DE', 0.95, 0.9, onSoundComplete);
        } else if (trackId === 'ferris') {
            synthesizeChime(ctx, analyser, playbackSpeed);
            speakQuote('Das Leben zieht ziemlich schnell an einem vorbei. Wenn man nicht ab und zu anhält, verpasst man es.', 'de-DE', 0.95, 1.0, onSoundComplete);
        } else if (trackId === 'birthday8bit') {
            stopFn = synthesizeBirthday(ctx, analyser, playbackSpeed);
        }
    }

    // Ausführliche 56k-Einwahl: Wählton, DTMF-Tasten, Freizeichenton, CED-Antwort & volles Baud-Rauschen (8.5s)
    function synthesizeModem(ctx, dest, speed) {
        const now = ctx.currentTime;
        const activeNodes = [];
        const reg = (n) => { activeNodes.push(n); return n; };

        // 1. Wählton (0.0s - 0.7s)
        const d1 = reg(ctx.createOscillator());
        const d2 = reg(ctx.createOscillator());
        const dg = reg(ctx.createGain());
        d1.type = 'sine'; d1.frequency.setValueAtTime(350, now);
        d2.type = 'sine'; d2.frequency.setValueAtTime(440, now);
        dg.gain.setValueAtTime(0.09, now);
        dg.gain.setValueAtTime(0, now + 0.7 / speed);
        d1.connect(dg); d2.connect(dg); dg.connect(dest);
        d1.start(now); d2.start(now);
        d1.stop(now + 0.71 / speed); d2.stop(now + 0.71 / speed);

        // 2. DTMF Töne (0.7s - 1.8s)
        const dtmfPairs = [
            [697, 1209], [770, 1336], [852, 1477], [697, 1336],
            [770, 1209], [852, 1336], [941, 1477]
        ];
        dtmfPairs.forEach((pair, idx) => {
            const tStart = now + (0.75 + idx * 0.14) / speed;
            const tEnd = tStart + 0.08 / speed;
            const o1 = reg(ctx.createOscillator());
            const o2 = reg(ctx.createOscillator());
            const g = reg(ctx.createGain());
            o1.type = 'sine'; o1.frequency.setValueAtTime(pair[0], tStart);
            o2.type = 'sine'; o2.frequency.setValueAtTime(pair[1], tStart);
            g.gain.setValueAtTime(0.1, tStart);
            g.gain.setValueAtTime(0, tEnd);
            o1.connect(g); o2.connect(g); g.connect(dest);
            o1.start(tStart); o2.start(tStart);
            o1.stop(tEnd + 0.01 / speed); o2.stop(tEnd + 0.01 / speed);
        });

        // 3. Freizeichen / Klingeln (1.8s - 2.8s)
        const r1 = reg(ctx.createOscillator());
        const r2 = reg(ctx.createOscillator());
        const rg = reg(ctx.createGain());
        const tRingStart = now + 1.9 / speed;
        const tRingEnd = now + 2.7 / speed;
        r1.type = 'sine'; r1.frequency.setValueAtTime(440, tRingStart);
        r2.type = 'sine'; r2.frequency.setValueAtTime(480, tRingStart);
        rg.gain.setValueAtTime(0.08, tRingStart);
        rg.gain.setValueAtTime(0, tRingEnd);
        r1.connect(rg); r2.connect(rg); rg.connect(dest);
        r1.start(tRingStart); r2.start(tRingStart);
        r1.stop(tRingEnd + 0.01 / speed); r2.stop(tRingEnd + 0.01 / speed);

        // 4. Remote CED 2100Hz Antwortton (2.85s - 3.8s)
        const ced = reg(ctx.createOscillator());
        const cedG = reg(ctx.createGain());
        const tCedStart = now + 2.85 / speed;
        const tCedEnd = now + 3.8 / speed;
        ced.type = 'sine'; ced.frequency.setValueAtTime(2100, tCedStart);
        cedG.gain.setValueAtTime(0.12, tCedStart);
        cedG.gain.exponentialRampToValueAtTime(0.01, tCedEnd);
        ced.connect(cedG); cedG.connect(dest);
        ced.start(tCedStart); ced.stop(tCedEnd + 0.01 / speed);

        // 5. V.8 Chirp & Squeal (3.85s - 4.6s)
        const ch = reg(ctx.createOscillator());
        const chG = reg(ctx.createGain());
        const tChStart = now + 3.85 / speed;
        const tChEnd = now + 4.6 / speed;
        ch.type = 'sawtooth';
        ch.frequency.setValueAtTime(1200, tChStart);
        ch.frequency.linearRampToValueAtTime(2400, tChStart + 0.3 / speed);
        ch.frequency.setValueAtTime(1800, tChStart + 0.4 / speed);
        chG.gain.setValueAtTime(0.1, tChStart);
        chG.gain.setValueAtTime(0, tChEnd);
        ch.connect(chG); chG.connect(dest);
        ch.start(tChStart); ch.stop(tChEnd + 0.01 / speed);

        // 6. Ausführliches Baud-Rauschen & Kreischen (4.6s - 8.2s)
        const tNStart = now + 4.6 / speed;
        const tNEnd = now + 8.2 / speed;
        const nDuration = 4.0;
        const bSize = Math.floor(ctx.sampleRate * nDuration);
        const nBuffer = ctx.createBuffer(1, bSize, ctx.sampleRate);
        const nData = nBuffer.getChannelData(0);
        for (let i = 0; i < bSize; i++) {
            nData[i] = (Math.random() * 2 - 1) * 0.95;
        }

        const nSrc = reg(ctx.createBufferSource());
        nSrc.buffer = nBuffer;
        nSrc.playbackRate.value = speed;

        const nFilter = reg(ctx.createBiquadFilter());
        nFilter.type = 'bandpass';
        nFilter.frequency.setValueAtTime(1400, tNStart);
        nFilter.frequency.linearRampToValueAtTime(3400, tNStart + 1.5 / speed);
        nFilter.frequency.linearRampToValueAtTime(1800, tNStart + 3.0 / speed);
        nFilter.Q.value = 3.5;

        const nGain = reg(ctx.createGain());
        nGain.gain.setValueAtTime(0.14, tNStart);
        nGain.gain.setValueAtTime(0.16, tNStart + 1.0 / speed);
        nGain.gain.setValueAtTime(0.12, tNStart + 2.5 / speed);
        nGain.gain.exponentialRampToValueAtTime(0.0001, tNEnd);

        nSrc.connect(nFilter);
        nFilter.connect(nGain);
        nGain.connect(dest);
        nSrc.start(tNStart);
        nSrc.stop(tNEnd + 0.05 / speed);

        // Trägerfrequenz-Wobbeln im Rauschen
        const carrier = reg(ctx.createOscillator());
        const carrierG = reg(ctx.createGain());
        carrier.type = 'sawtooth';
        carrier.frequency.setValueAtTime(980, tNStart);
        carrier.frequency.linearRampToValueAtTime(1650, tNStart + 2.0 / speed);
        carrierG.gain.setValueAtTime(0.06, tNStart);
        carrierG.gain.exponentialRampToValueAtTime(0.0001, tNEnd);
        carrier.connect(carrierG);
        carrierG.connect(dest);
        carrier.start(tNStart);
        carrier.stop(tNEnd + 0.05 / speed);

        return () => {
            activeNodes.forEach(node => {
                try { node.stop(); } catch (_) {}
                try { node.disconnect(); } catch (_) {}
            });
        };
    }

    function synthesizeTada(ctx, dest, speed) {
        const now = ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        const nodes = [];
        notes.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            const t = now + (idx * 0.09) / speed;
            osc.frequency.setValueAtTime(f, t);
            gain.gain.setValueAtTime(0.12, t);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45 / speed);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(t);
            osc.stop(t + 0.46 / speed);
            nodes.push(osc);
        });
        return () => nodes.forEach(n => { try { n.stop(); } catch (_) {} });
    }

    function synthesizeCassette(ctx, dest, speed) {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 1.8 / speed);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.setValueAtTime(0.08, now + 1.8 / speed);

        const clackOsc = ctx.createOscillator();
        const clackGain = ctx.createGain();
        clackOsc.type = 'square';
        clackOsc.frequency.setValueAtTime(120, now + 1.85 / speed);
        clackGain.gain.setValueAtTime(0.2, now + 1.85 / speed);
        clackGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.1 / speed);

        osc.connect(gain);
        gain.connect(dest);
        clackOsc.connect(clackGain);
        clackGain.connect(dest);

        osc.start(now);
        osc.stop(now + 1.84 / speed);
        clackOsc.start(now + 1.85 / speed);
        clackOsc.stop(now + 2.15 / speed);

        return () => {
            try { osc.stop(); clackOsc.stop(); } catch (_) {}
        };
    }

    function synthesizePcSpeaker(ctx, dest, speed) {
        const now = ctx.currentTime;
        const beeps = [895, 895, 1200];
        const nodes = [];
        beeps.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            const t = now + (idx * 0.22) / speed;
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.12, t);
            gain.gain.setValueAtTime(0, t + 0.12 / speed);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(t);
            osc.stop(t + 0.13 / speed);
            nodes.push(osc);
        });
        return () => nodes.forEach(n => { try { n.stop(); } catch (_) {} });
    }

    function synthesizeKnifeShing(ctx, dest, speed) {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(2400, now);
        osc.frequency.exponentialRampToValueAtTime(6000, now + 0.3 / speed);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5 / speed);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.55 / speed);
    }

    function synthesizeJet(ctx, dest, speed) {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(480, now + 1.2 / speed);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5 / speed);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 1.55 / speed);
    }

    function synthesizeChime(ctx, dest, speed) {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8 / speed);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.85 / speed);
    }

    function synthesizeBirthday(ctx, dest, speed) {
        const now = ctx.currentTime;
        const notes = [
            { f: 392.00, d: 0.25 },
            { f: 392.00, d: 0.25 },
            { f: 440.00, d: 0.4 },
            { f: 392.00, d: 0.4 },
            { f: 523.25, d: 0.4 },
            { f: 493.88, d: 0.8 }
        ];
        let offset = 0;
        const nodes = [];
        notes.forEach(n => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            const t = now + offset / speed;
            osc.frequency.setValueAtTime(n.f, t);
            gain.gain.setValueAtTime(0.1, t);
            gain.gain.setValueAtTime(0.1, t + (n.d - 0.05) / speed);
            gain.gain.linearRampToValueAtTime(0.0001, t + n.d / speed);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(t);
            osc.stop(t + n.d / speed);
            nodes.push(osc);
            offset += n.d;
        });
        return () => nodes.forEach(node => { try { node.stop(); } catch (_) {} });
    }

    function updatePlayerUI(container, track) {
        const nameEl = container.querySelector('#snd-active-name');
        const descEl = container.querySelector('#snd-active-desc');
        const lenEl = container.querySelector('#snd-len-display');
        if (nameEl) nameEl.textContent = track.name;
        if (descEl) descEl.textContent = track.desc;
        if (lenEl) lenEl.textContent = `${totalSeconds.toFixed(2)} Sek.`;
        updateProgressUI(container);
    }

    function updateProgressUI(container) {
        const posEl = container.querySelector('#snd-pos-display');
        const fillEl = container.querySelector('#snd-progress-fill');
        if (posEl) posEl.textContent = `${currentSeconds.toFixed(2)} Sek.`;
        if (fillEl && totalSeconds > 0) {
            const pct = Math.min(100, (currentSeconds / totalSeconds) * 100);
            fillEl.style.width = `${pct}%`;
        }
    }

    return {
        render: function (container) {
            stopCurrentSound();
            const data = window.DOMINIK_DATA?.soundrec || { tracks: [] };
            const initialTrack = data.tracks.find(t => t.id === activeTrackId) || data.tracks[0];
            totalSeconds = parseFloat(initialTrack?.duration || '8.5');
            currentSeconds = 0;

            container.innerHTML = `
                <div class="soundrec-container">
                    <!-- Obere Windows 3.1 Wave-Anzeige -->
                    <div class="soundrec-screen-frame retro-window-frame">
                        <div class="soundrec-meters">
                            <div>
                                <span style="font-size: 10px; color: #555555; display: block;">Position:</span>
                                <strong id="snd-pos-display" style="font-family: monospace; font-size: 13px;">0.00 Sek.</strong>
                            </div>

                            <!-- Grünes Oszilloskop -->
                            <div class="soundrec-oscilloscope retro-sunken-dark">
                                <canvas id="snd-wave-canvas" width="240" height="52" style="display: block; width: 100%; height: 52px;"></canvas>
                            </div>

                            <div style="text-align: right;">
                                <span style="font-size: 10px; color: #555555; display: block;">Länge:</span>
                                <strong id="snd-len-display" style="font-family: monospace; font-size: 13px;">${totalSeconds.toFixed(2)} Sek.</strong>
                            </div>
                        </div>

                        <!-- Spul- und Fortschrittsbalken -->
                        <div class="soundrec-trackbar retro-sunken-trough">
                            <div id="snd-progress-fill" class="soundrec-fill"></div>
                        </div>

                        <!-- Aktueller Soundclip -->
                        <div style="background: #ffffff; padding: 6px 10px; border: 1px solid #808080; margin-top: 6px;">
                            <div style="font-size: 10px; color: #000080; font-weight: 700;">AKTUELLER SOUND-CLIP:</div>
                            <div id="snd-active-name" style="font-weight: 700; font-size: 13px; color: #000000;">
                                ${initialTrack.name}
                            </div>
                            <div id="snd-active-desc" style="font-size: 11px; color: #555555; margin-top: 2px;">
                                ${initialTrack.desc}
                            </div>
                        </div>

                        <!-- Player-Tastenleiste -->
                        <div class="soundrec-controls">
                            <button id="snd-btn-rewind" class="retro-raised-btn snd-ctrl-btn" title="Zum Anfang">⏪</button>
                            <button id="snd-btn-play" class="retro-raised-btn snd-ctrl-btn" style="color: #008000; font-weight: 700;" title="Wiedergabe">▶ Play</button>
                            <button id="snd-btn-stop" class="retro-raised-btn snd-ctrl-btn" style="color: #ba1a1a;" title="Stopp">⏹ Stopp</button>
                            <button id="snd-btn-rec" class="retro-raised-btn snd-ctrl-btn" style="color: #ba1a1a;" title="Aufnahme">⏺ Rec</button>
                        </div>
                    </div>

                    <!-- Tempo-Auswahlleiste -->
                    <div style="display: flex; justify-content: space-between; align-items: center; background: #e8e8e8; padding: 4px 8px; border: 1px solid #808080; font-size: 11px; flex-wrap: wrap; gap: 4px;">
                        <span style="font-weight: 700;">Tempo:</span>
                        <div style="display: flex; gap: 4px;">
                            <button class="retro-raised-btn snd-speed-btn" data-speed="0.75" style="padding: 2px 6px;">0.75x (Slow)</button>
                            <button class="retro-raised-btn snd-speed-btn active" data-speed="1.0" style="padding: 2px 6px; font-weight: 700;">1.0x (Normal)</button>
                            <button class="retro-raised-btn snd-speed-btn" data-speed="1.5" style="padding: 2px 6px;">1.5x (Fast)</button>
                        </div>
                    </div>

                    <!-- Soundboard Preset-Kacheln -->
                    <div class="retro-window-frame" style="padding: 8px; background: #c0c0c0;">
                        <div style="font-weight: 700; font-size: 11px; color: #000080; margin-bottom: 6px;">
                            KLANG-KATALOG / PRESETS (KLICK ZUM ABSPIELEN):
                        </div>
                        <div class="soundrec-grid">
                            ${data.tracks.map(t => `
                                <button class="retro-raised-btn snd-preset-btn ${t.id === activeTrackId ? 'selected' : ''}" data-id="${t.id}">
                                    <div style="font-size: 9px; color: #555555; text-transform: uppercase;">${t.category}</div>
                                    <div style="font-size: 11px; font-weight: 700; color: #000080; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                        ${t.name}
                                    </div>
                                    <div style="font-size: 10px; color: #888888;">Dauer: ${t.duration}</div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            const canvas = container.querySelector('#snd-wave-canvas');
            if (canvas) drawOscilloscope(canvas);

            // Preset-Buttons
            container.querySelectorAll('.snd-preset-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    container.querySelectorAll('.snd-preset-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    playTrack(id, container);
                });
            });

            // Play / Stop / Rewind
            container.querySelector('#snd-btn-play')?.addEventListener('click', () => {
                playTrack(activeTrackId, container);
            });
            container.querySelector('#snd-btn-stop')?.addEventListener('click', () => {
                stopCurrentSound();
                currentSeconds = 0;
                updateProgressUI(container);
            });
            container.querySelector('#snd-btn-rewind')?.addEventListener('click', () => {
                currentSeconds = 0;
                updateProgressUI(container);
            });
            container.querySelector('#snd-btn-rec')?.addEventListener('click', () => {
                alert('AUFNAHME-MELDUNG:\n\nKein Tonbandkassettendeck oder Mikrophon von 1986 an Port COM1 erkannt.\nBitte Kassette umdrehen (Seite B) und mit Bleistift zurückspulen.');
            });

            // Tempo-Buttons
            container.querySelectorAll('.snd-speed-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    container.querySelectorAll('.snd-speed-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    playbackSpeed = parseFloat(btn.getAttribute('data-speed') || '1.0');
                });
            });
        }
    };
})();
