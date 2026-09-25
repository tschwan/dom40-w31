// Daten für GOTCHI.EXE (Dominik-Gotchi 1986 Nerd-Edition)
window.DOMINIK_DATA = window.DOMINIK_DATA || {};

window.DOMINIK_DATA.gotchi = {
    title: 'Dominik-Gotchi v1.0 - 80er/90er Nerd-Simulator',
    defaultStats: {
        energy: 75,
        hunger: 60,
        skill: 40,
        happiness: 80
    },
    actions: [
        {
            id: 'pizza',
            label: '🍕 Kalte Pizza & Dosen-Cola',
            desc: 'Kohlenhydrate und Koffein für ausgedehnte Programmiernächte.',
            effects: { hunger: 25, energy: 20, happiness: 15 },
            messages: [
                'Schmatz! Drei Tage alte Salami-Pizza schmeckt noch 1A!',
                'Zisch! Die eiskalte Dosen-Cola setzt 8-Bit-Endorphine frei.',
                'Kalte Pizza ist der Treibstoff wahrer Homecomputer-Pioniere!'
            ]
        },
        {
            id: 'diskette',
            label: '💾 5,25"-Diskette lochen',
            desc: 'Mit dem Locher die Schreibkerbe stanzen: 360 KB extra gratis!',
            effects: { skill: 25, energy: -10, happiness: 15 },
            messages: [
                'Knick-Knack! Aus Single-Sided wird Double-Sided gemacht. Reines Genie!',
                'Mit Schere und Tesafilm den Schreibschutz ausgehebelt. Hacker-Skill +20!',
                'Wieder 360 Kilobyte Speicherplatz für neue Assembler-Demos gerettet!'
            ]
        },
        {
            id: 'game',
            label: '🕹️ C64 & Gameboy zocken',
            desc: 'Giana Sisters, Bubble Bobble und Tetris daddeln bis der Daumen glüht.',
            effects: { happiness: 30, skill: 10, energy: -15 },
            messages: [
                'Competition-Pro-Joystick bis zum Anschlag durchgerüttelt! Highscore!',
                'Tetris-Melodie läuft ab jetzt 48 Stunden auf Dauerschleife im Kopf.',
                'Der Endgegner ist besiegt! Dominik springt jubelnd vom Sitzsack auf!'
            ]
        },
        {
            id: 'modem',
            label: '📞 Akustikkoppler / BBS Mailbox',
            desc: 'Hörer in die Schaumstoffmuscheln drücken und in die lokale Box einwählen.',
            effects: { skill: 20, happiness: 20, energy: -15 },
            special: 'momYell',
            messages: [
                'Pfeeeeeeee-Kschhhhh! 1200 Baud Verbindung steht! Neue ASCII-Grafik heruntergeladen!',
                'MAMA BRÜLLT AUS DEM FLUR: "Geh sofort aus dem Internet, ich muss telefonieren!"',
                'Telefonrechnung der Bundespost für nächsten Monat wird legendär...'
            ]
        },
        {
            id: 'nap',
            label: '⌨️ Power-Nap auf Tastatur',
            desc: '5 Minuten Stirn auf die Leertaste legen und von Vektorgrafik träumen.',
            effects: { energy: 35, hunger: -15, happiness: 10 },
            messages: [
                'zZz... Dominik hat jetzt das Tastatur-Layout QWERTZ auf der Stirn abgedrückt.',
                'Erfrischt aufgewacht! Im Traum den Fehler in Zeile 520 entdeckt!',
                '5 Minuten Schlaf reichen einem 80er-Jahre-Systemadministrator für 6 Stunden.'
            ]
        }
    ],
    idleQuotes: [
        '„Syntax Error in Zeile 420... Wo zum Henker fehlt das Semikolon?!“',
        '„LOAD \'*\' ,8,1 ... Searching for Dominik ... LOADING ... READY.“',
        '„Morgen früh um 06:05 Uhr HR3 Hitparade auf Kassette mitschneiden!“',
        '„Wer hat mein Yps-Heft mit den Urzeitkrebsen geklaut?!“',
        '„Mein SoundBlaster 16 klingt tausendmal fetter als dein PC-Speaker!“',
        '„Wenn man die Mauskugel herausschraubt, kann man damit auf Dosen schießen.“',
        '„Pssssst! Das Spiel habe ich ganz legal auf dem Schulhof getauscht!“',
        '„Mein Kumpel behauptet, sein Vater hat einen 386er mit Turbo-Taste!“'
    ]
};
