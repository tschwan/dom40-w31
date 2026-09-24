// Modul: COMMAND.COM (MS-DOS 3.30 Prompt)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.command = (function () {
    let history = [];
    let historyIndex = -1;
    let formatStep = 0;

    function executeCommand(cmdRaw, termOutputEl, inputEl) {
        const cmd = cmdRaw.trim();
        if (cmd) {
            history.push(cmd);
            historyIndex = history.length;
        }

        const logLine = (text, isHtml = false) => {
            const div = document.createElement('div');
            div.className = 'dos-line';
            if (isHtml) div.innerHTML = text;
            else div.textContent = text;
            termOutputEl.appendChild(div);
        };

        logLine(`C:\\DOMINIK> ${cmdRaw}`);

        if (formatStep === 1) {
            if (cmd.toUpperCase() === 'J' || cmd.toUpperCase() === 'Y') {
                formatStep = 2;
                logLine('Formatierung von Laufwerk C: wird durchgefuehrt...');
                logLine('[████████████████████] 100%');
                logLine('FEHLER (0x40): Formatierung abgebrochen! Festplatte C: enthaelt unersetzbare Dominik-Erinnerungen.');
                logLine('SYSTEM-STATUS: Daten geschuetzt. Herzlichen Glueckwunsch zum 40. Geburtstag!');
            } else {
                logLine('Formatierung abgebrochen. Alles in Sicherheit.');
            }
            formatStep = 0;
            termOutputEl.scrollTop = termOutputEl.scrollHeight;
            return;
        }

        const parts = cmd.split(' ');
        const mainCmd = (parts[0] || '').toUpperCase();
        const arg = parts.slice(1).join(' ');
        const data = window.DOMINIK_DATA?.command || {};

        switch (mainCmd) {
            case '':
                break;
            case 'HELP':
                logLine('VERFUEGBARE DOS-BEFEHLE:');
                logLine('  DIR       - Zeigt das Dateiverzeichnis von C:\\DOMINIK');
                logLine('  TYPE <f>  - Gibt den Inhalt einer Datei aus (z.B. TYPE GEBURT.TXT)');
                logLine('  VER       - Zeigt die Betriebssystem-Version an');
                logLine('  DATE      - Gibt das Systemdatum aus');
                logLine('  TIME      - Gibt die Systemzeit aus');
                logLine('  MEM       - Zeigt den verfuegbaren Arbeitsspeicher an');
                logLine('  DOMINIK   - Ruft das Geburtstags-Profil ab');
                logLine('  FORMAT C: - Vorsicht! Formatiert das Festplattenlaufwerk');
                logLine('  CLS       - Loescht den Bildschirminhalt');
                logLine('  EXIT      - Schliesst die DOS-Eingabeaufforderung');
                break;
            case 'DIR':
                logLine(' Datentraeger in Laufwerk C: ist DOMINIK_40');
                logLine(' Seriennummer des Datentraegers: 1986-2026');
                logLine(' Verzeichnis von C:\\DOMINIK\\*.*');
                logLine('');
                (data.dirList || []).forEach(f => {
                    logLine(`${f.name} ${f.ext}   ${f.size.padStart(7, ' ')} ${f.date}  ${f.time}`);
                });
                logLine('         6 Datei(en)        159 780 Bytes');
                logLine('                         40 960 000 Bytes frei');
                break;
            case 'TYPE':
                if (!arg) {
                    logLine('Syntaxfehler: Dateiname erforderlich (z.B. TYPE GEBURT.TXT)');
                } else {
                    const upArg = arg.toUpperCase().trim();
                    const content = data.files ? data.files[upArg] : null;
                    if (content) {
                        content.split('\n').forEach(l => logLine(l));
                    } else {
                        logLine(`Datei nicht gefunden - ${arg}`);
                    }
                }
                break;
            case 'VER':
                logLine('MS-DOS Version 3.30 (Dominik OS 40.0 Kernel Release)');
                break;
            case 'DATE':
                logLine(`Aktuelles Systemdatum: ${new Date().toLocaleDateString('de-DE')} (Stichtag: 25.09.1986)`);
                break;
            case 'TIME':
                logLine(`Aktuelle Systemzeit: ${new Date().toLocaleTimeString('de-DE')}`);
                break;
            case 'MEM':
                logLine('655.360 Bytes konventioneller Gesamtspeicher');
                logLine('654.336 Bytes von MS-DOS und Dominik OS belegt');
                logLine('  1.024 Bytes frei fuer Partylaune und Feierstimmung');
                logLine('40.960.000 Bytes EMS (Erweiterte Lebenserfahrung) verfuegbar');
                break;
            case 'CLS':
                termOutputEl.innerHTML = '';
                break;
            case 'DOMINIK':
                logLine('  ____   ___  __  __ ___ _   _ ___ _  __');
                logLine(' |  _ \\ / _ \\|  \\/  |_ _| \\ | |_ _| |/ /');
                logLine(' | | | | | | | |\\/| || ||  \\| || || \' / ');
                logLine(' | |_| | |_| | |  | || || |\\  || || . \\ ');
                logLine(' |____/ \\___/|_|  |_|___|_| \\_|___|_|\\_\\');
                logLine(' >> JUBILAR DES JAHRES: 40 JAHRE TOP-FORM! <<');
                break;
            case 'FORMAT':
                if (arg.toUpperCase() === 'C:' || arg.toUpperCase() === 'C') {
                    logLine('WARNUNG: Alle Daten auf Festplatte C: gehen verloren!');
                    logLine('Moechten Sie Dominik wirklich formatieren (J/N)?');
                    formatStep = 1;
                } else {
                    logLine('Syntaxfehler: FORMAT [Laufwerk:] (z.B. FORMAT C:)');
                }
                break;
            case 'EXIT':
                window.DOMINIK_STATE?.closeProgram();
                break;
            default:
                logLine(`Befehl oder Dateiname nicht gefunden: "${cmd}" (Tippen Sie HELP fuer Hilfe)`);
                break;
        }

        termOutputEl.scrollTop = termOutputEl.scrollHeight;
    }

    return {
        render: function (container) {
            formatStep = 0;
            const data = window.DOMINIK_DATA?.command || {};

            container.innerHTML = `
                <div class="dos-terminal-box retro-sunken-dark" id="dos-terminal">
                    <div id="dos-output" class="dos-output-area">
                        <div class="dos-line">${(data.version || '').replace(/\n/g, '<br>')}</div>
                        <div class="dos-line">Tippen Sie <strong>HELP</strong> fuer eine Liste aller Befehle.<br>&nbsp;</div>
                    </div>
                    <div class="dos-prompt-line">
                        <span class="dos-prompt-text">C:\\DOMINIK&gt;</span>
                        <input type="text" id="dos-input" class="dos-input" autocomplete="off" spellcheck="false" autofocus />
                    </div>
                </div>
            `;

            const terminalBox = container.querySelector('#dos-terminal');
            const termOutput = container.querySelector('#dos-output');
            const inputEl = container.querySelector('#dos-input');

            terminalBox?.addEventListener('click', () => {
                inputEl?.focus();
            });

            inputEl?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = inputEl.value;
                    inputEl.value = '';
                    executeCommand(val, termOutput, inputEl);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (historyIndex > 0) {
                        historyIndex--;
                        inputEl.value = history[historyIndex] || '';
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (historyIndex < history.length - 1) {
                        historyIndex++;
                        inputEl.value = history[historyIndex] || '';
                    } else {
                        historyIndex = history.length;
                        inputEl.value = '';
                    }
                }
            });

            // Fokus setzen
            setTimeout(() => inputEl?.focus(), 50);
        }
    };
})();
