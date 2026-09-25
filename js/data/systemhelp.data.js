// Systemhilfe & Moduldokumentation (HELP.HLP) für Dominik OS 1986
window.DOMINIK_DATA = window.DOMINIK_DATA || {};

window.DOMINIK_DATA.systemhelp = {
    title: 'Dominik OS 40.0 - Windows Hilfe (HELP.HLP)',
    githubUrl: 'https://github.com/tschwan/dom40-w31',
    overview: {
        heading: 'Willkommen bei Dominik OS 1986 (Jubiläums-Edition 40.0)',
        text: 'Dominik OS 1986 ist ein interaktives, nostalgisches Web-Erlebnis im Stil von Windows 3.1 anlässlich des 40. Geburtstags von Dominik (25. September 1986). Alle Module sind als vollwertige Retro-Programme konzipiert und laufen ohne jegliches Backend direkt im Browser.',
        techStack: [
            'Zero-Backend: 100% statischer Client-Build (HTML5, modernes CSS, Vanilla ES6 JavaScript).',
            'Data-Driven: Sämtliche Inhalte liegen isoliert in flachen Datenmodulen unter /js/data/.',
            'Single-Active-Window: Stabiles Fenster-Paradigma ohne fehleranfälligen Z-Index-Salat.',
            'Responsive Retro-Design: Gestochen scharfe CSS-3D-Bevels auf 4K/Retina sowie Touch-Optimierung für Mobilgeräte.'
        ],
        aiDisclaimer: {
            title: 'AMTLICHER DISCLAIMER ZUM EINSATZ VON KÜNSTLICHER INTELLIGENZ',
            badge: '100% REINE HANDARBEIT (*ZWINKER ZWINKER*)',
            paragraphs: [
                'Hiermit wird an Eides statt feierlich und mit absolut unbewegter Miene versichert: Dominik OS 40.0 wurde zu 100 % in reiner, schweißtreibender Handarbeit auf einem originalen IBM PC-XT (Baujahr 1986) mit edlin.exe und einer verstaubten 2-Tasten-Kugelmaus gemeißelt.',
                'Es wurden zu KEINEM Zeitpunkt hypermoderne, kaffeetrinkende KI-Coding-Agenten konsultiert, die in Sekundenschnelle vollständige Web-Audio-Synthesizer, 3D-Sternenfelder, Retro-Spiele oder pixelgenaue CSS-Bevels aus dem Äther gestampft haben. Niemals! Sowas gab es 1986 schließlich gar nicht!',
                'Auch sämtliche hochauflösenden Porträts in der Gang-Galerie sowie die fliegenden Dominiks im Bildschirmschoner entstanden selbstverständlich durch wochenlanges, mühevolles Auftupfen jedes einzelnen Farbpixels bei Kerzenschein in Microsoft Paintbrush – und KEINESFALLS durch modernste KI-Bildgenerierungstools nach dem Motto "Generiere Dominik als Miami-Vice-Cop".',
                'Jegliche Ähnlichkeit mit modernstem Prompt-Engineering, Deep Learning oder autonomen Entwickler-Agenten ist technisch völlig ausgeschlossen, reine Science-Fiction und wird von der Systemleitung unter heftigem, beidseitigem Augenzwinkern 😉 vehement dementiert.'
            ]
        }
    },
    modules: [
        {
            id: 'setup',
            filename: 'SETUP_40.EXE',
            title: 'Dominik OS 40.0 Setup Wizard',
            category: 'System',
            icon: 'install_desktop',
            summary: 'Der Begrüßungs- und Installations-Assistent, der beim ersten Laden automatisch startet.',
            details: 'Führt den Besucher durch die simulierte Betriebssystem-Installation, gratuliert Dominik feierlich zum 40. Geburtstag und initialisiert die Arbeitsumgebung.',
            features: ['Fortschrittsbalken-Simulation', 'Jubiläums-Begrüßung', 'Session-basierte Start-Erkennung']
        },
        {
            id: 'systemhelp',
            filename: 'HELP.HLP',
            title: 'System-Handbuch & Dokumentation',
            category: 'System',
            icon: 'help_center',
            summary: 'Das offizielle Referenz-Handbuch zu allen Programmen und Funktionen von Dominik OS.',
            details: 'Dokumentiert sämtliche Module, erläutert die Zero-Backend-Architektur und verlinkt direkt zum Quellcode auf GitHub.',
            features: ['Volltext-Filter aller Module', 'Direktstart von Programmen', 'GitHub-Repository-Integration']
        },
        {
            id: 'control',
            filename: 'CONTROL.EXE',
            title: 'Systemsteuerung (Audio & Bildschirmschoner)',
            category: 'System',
            icon: 'settings',
            summary: 'Systemsteuerung mit After-Dark-Bildschirmschoner und personalisiertem Audiomixer.',
            details: 'Enthält den After-Dark-Bildschirmschoner mit fliegenden Dominiks (images/dom.webp) inklusive CRT-Vorschau und Vollbild-Test sowie den Lautstärkeregler für "Hä? Was hast du gesagt?" mit lautstärke-gekoppeltem Testton.',
            features: ['CRT-Monitor-Schonervorschau & Vollbild-Test', 'Fliegende Dominiks (images/dom.webp)', 'Lautstärkeregler für "Hä? Was hast du gesagt?"', 'Lautstärke-gekoppelter Windows-3.1-Testton (Tada!)']
        },
        {
            id: 'soundrec',
            filename: 'SOUNDREC.EXE',
            title: 'Audiorekorder - Dominik Soundboard',
            category: 'Kultur & Musik',
            icon: 'graphic_eq',
            summary: 'Klassischer Windows 3.1 Audiorekorder mit Oszilloskop-Welle und 80s-Soundboard.',
            details: 'Spielt ikonische Sounds wie 56k-Modem-Einwahl, Kassetten-Spulen, PC-Speaker-Beeps sowie Kult-Zitate aus Top Gun ("Need for Speed") und Crocodile Dundee ("Das ist ein Messer!") mit lebendiger grüner Oszilloskop-Animation ab.',
            features: ['Echte grüne Oszilloskop-Wellenform (AnalyserNode)', 'Web Audio API Synthesizer (Modem, Kassetten, Speaker)', 'Kult-Zitate aus dem Jahrgang 1986', 'Tempo-Steuerung (0.75x, 1.0x, 1.5x)']
        },
        {
            id: 'charts',
            filename: 'CHARTS.EXE',
            title: 'Media Control Hitparade 1986-2026',
            category: 'Kultur & Musik',
            icon: 'album',
            summary: 'Chronologische Zeitreise durch 40 Jahre offizielle deutsche #1-Hits am Stichtag 25. September.',
            details: 'Von Europe und Falco (1986) über 90er-Eurodance bis hin zu aktuellen Chartstürmern. Filterbar nach Jahrzehnten (80er, 90er, 00er, 10er, 20er).',
            features: ['Jahrzehnte-Tabs', 'Offizielle Stichtags-Recherche', 'Interaktive Filter']
        },
        {
            id: 'culture',
            filename: 'CULTURE86.DOC',
            title: 'Popkultur des Jahres 1986',
            category: 'Kultur & Musik',
            icon: 'movie',
            summary: 'Die prägendsten Medien-Highlights aus Dominiks Geburtsjahr im Texteditor-Look.',
            details: 'Unterteilt in die Top 10 Kino-Blockbuster (Top Gun, Zurück in die Zukunft), Kult-Serien (Miami Vice, Schwarzwaldklinik) und Meilenstein-Alben des Jahres 1986.',
            features: ['Rich-Text-Darstellung', 'Kategorien-Tabs', 'Kompakte Rankings']
        },
        {
            id: 'vips',
            filename: 'VIP_LIST.DBF',
            title: 'Prominente vom 25. September',
            category: 'Wissen & Daten',
            icon: 'badge',
            summary: 'Karteikarten-Datenbank berühmter Persönlichkeiten mit demselben Geburtstag.',
            details: 'Von Will Smith und Michael Douglas über Catherine Zeta-Jones bis zu Karl-Heinz Rummenigge – Dominiks prominente Geburtstags-Zwillinge im DBF-Katalog.',
            features: ['Sortierbare Steckbriefe', 'Berufsfelder & Meilensteine', 'Pixel-Cardfile-Optik']
        },
        {
            id: 'prices',
            filename: 'PRICES.XLS',
            title: 'Konsumpreise: 1986 vs. Heute',
            category: 'Wissen & Daten',
            icon: 'table_view',
            summary: 'Tabellenkalkulation: Was kostete das Leben 1986 im Vergleich zu heute?',
            details: 'Gegenüberstellung von Benzin, Bier, Kugel Eis, Kinokarte, Miete und VW Golf inklusive Umrechnung von D-Mark in Euro und Teuerungsfaktor.',
            features: ['Excel-Tabellenraster mit Formelzeile', 'Währungsumrechnung DM/EUR', 'Statistische Inflationsanalyse']
        },
        {
            id: 'calc',
            filename: 'CALC40.EXE',
            title: '40-Jahre-Lebenszeit-Rechner',
            category: 'Wissen & Daten',
            icon: 'calculate',
            summary: 'Live-Rechner der absoluten Lebensmetriken seit dem 25.09.1986.',
            details: 'Ermittelt auf die Sekunde genau: Tage, geschätzte Herzschläge (~1,5 Mrd.), verschlafene Lebenszeit, getrunkene Kaffees und Flugdistanz um die Sonne.',
            features: ['Echtzeit-Sekundentakt', 'LCD-Ziffernanzeige', 'Biometrische Schätzwerte']
        },
        {
            id: 'biorhythm',
            filename: 'BIORHYTHM.EXE',
            title: 'Biorhythmus & Astrologie 1986',
            category: 'Wissen & Daten',
            icon: 'insights',
            summary: 'Klassische Biorhythmus-Kurven und kosmische Analyse für den Jahrgang 1986.',
            details: 'Berechnet die drei Zyklen (Physisch 23T, Emotional 28T, Intellektuell 33T) mit interaktiver SVG-Sinuskurve sowie Horoskop für Waage (♎) und Feuer-Tiger (🐅).',
            features: ['SVG-Kurvendiagramm', 'Datums-Stepping (+/- 7 Tage)', 'Tagesform-Diagnose mit 40']
        },
        {
            id: 'games',
            filename: 'ARCADE86.EXE',
            title: 'Gaming-Highlights 1986',
            category: 'Spiele & Fun',
            icon: 'sports_esports',
            summary: 'Showcase revolutionärer Videospiele des Geburtsjahrgangs 1986.',
            details: 'The Legend of Zelda, Metroid, Out Run, Castlevania, Dragon Quest und Bubble Bobble mit Entwickler-Infos, Plattformen und Fun Facts.',
            features: ['Spiele-Steckbriefe', 'Plattform-Klassifizierung', 'Retro-Arcade-Artwork']
        },
        {
            id: 'minesweep',
            filename: 'MINESWEEP.EXE',
            title: 'Minesweeper 40.0 - Das Lebens-Minenfeld',
            category: 'Spiele & Fun',
            icon: 'flag',
            summary: 'Vollständig spielbarer Windows-Klassiker mit humorvollem 40er-Jubiläums-Twist.',
            details: 'Statt Standard-Minen lauern Altersfallen wie Hexenschuss, 48h-Kater, Bausparverträge oder Couch-Koma. Inklusive 7-Segment-LEDs und interaktivem Smiley.',
            features: ['First-Click-Sicherheitsgarantie', 'Flut-Aufdeckung', 'Touch-Modus für Smartphones', '2 Schwierigkeitsgrade']
        },
        {
            id: 'help',
            filename: 'HELP1986.HLP',
            title: 'Alltag & Technik 1986: Ein Handbuch',
            category: 'Kultur & Musik',
            icon: 'help',
            summary: 'Klassische Windows-Hilfe: Wie überlebte man 1986 ohne Smartphone und Internet?',
            details: '10 humorvolle Ratgeber-Artikel über Kassettensalat, Wählscheibentelefone, Brockhaus-Recherche, Falk-Faltpläne und lineares 3-Kanal-Fernsehen.',
            features: ['WinHelp-Look mit Navigationsbaum', 'Grün unterstrichene Hyperlinks', 'Druckfunktion']
        },
        {
            id: 'news',
            filename: 'NEWSWIRE.TXT',
            title: 'Nachrichten vom 25.09.1986',
            category: 'Kultur & Musik',
            icon: 'newspaper',
            summary: 'Fernschreiber-Ticker mit den realen Meldungen von Dominiks Geburtstag.',
            details: 'Grün-Monochromer Teletype-Feed mit Schlagzeilen zu Weltpolitik (Reagan/Gorbatschow), Bundesrepublik (Kohl, Bundespost), Sport (Steffi Graf) und Dominiks Geburt.',
            features: ['Matrix-Drucker-Terminal-Optik', 'Zeitstempel MEZ', 'Rubriken-Gliederung']
        },
        {
            id: 'teletext',
            filename: 'TELETEXT.EXE',
            title: 'Videotext Tafel 1986',
            category: 'Kultur & Musik',
            icon: 'live_tv',
            summary: 'Authentischer ARD/ZDF-Videotext mit Bildschirm, Farbtasten und Fernbedienung.',
            details: 'Tafeln 100 (Index), 101 (Geburtstag), 200 (Sport 1986), 300 (TV-Programm 1986), 400 (Wetter), 404 (Testbild) und 500 (Kleinanzeigen).',
            features: ['Decoder-Suchsimulation', 'Ziffernblock 0-9 & Tastatursteuerung', 'Fastext-Farbtasten (Rot/Grün/Gelb/Blau)']
        },
        {
            id: 'command',
            filename: 'COMMAND.COM',
            title: 'MS-DOS Eingabeaufforderung 3.30',
            category: 'Nerd & DOS',
            icon: 'terminal',
            summary: 'Interaktives MS-DOS 3.30 Terminal mit virtuellem Dateisystem und Easter Eggs.',
            details: 'Unterstützt Befehle wie DIR, TYPE, MEM, VER, DATE, TIME, CLS, DOMINIK und ein schockierendes FORMAT C: mit Geburtstags-Entwarnung.',
            features: ['Befehlshistorie mit Pfeiltasten', 'Authentischer DOS-Parser', 'Virtuelle 80er-Dateien']
        },
        {
            id: 'defrag',
            filename: 'DEFRAG.EXE',
            title: 'MS-DOS Defragmentierer v40.0',
            category: 'Nerd & DOS',
            icon: 'memory',
            summary: 'Norton Speed Disk / DOS Defrag-Simulation zur Ordnung von 40 Lebensjahren.',
            details: '240 Cluster-Sektoren ordnen Erinnerungen, Partynächte und Lebenserfahrung neu an. Untermalt mit PC-Speaker-Klicks über die Web Audio API.',
            features: ['Live-Cluster-Animation', 'Synthetisierter Retro-Sound', 'Sektor-Farblegende']
        },
        {
            id: 'greeting',
            filename: 'GREETING.CRD',
            title: 'Geburtstagskarte: Alles Gute Dominik!',
            category: 'Persönliches',
            icon: 'celebration',
            summary: 'Nostalgische Klappkarte mit originalem 80er-Polaroid und 50 Geburtstagsgrüßen.',
            details: 'Interaktive 80s-Geburtstagskarte mit originalem Polaroid von Mette & Thomas (25.09.1986). Enthält einen Würfel-Button für zufällige Glückwünsche, Navigation durch alle 50 Sprüche, 80er-Memphis-Neon-Konfetti und einen synthetisierten 8-Bit-Piezo-Soundchip mit „Happy Birthday“.',
            features: ['Original 1986 Polaroid-Foto (Mette & Thomas)', '50 kuratierte Geburtstagsgrüße mit Würfel & Vor-/Zurück-Navigation', '80s Piezo-Soundchip („Happy Birthday“ Chiptune)', 'Buntes 80er-Memphis-Neon-Konfetti (Canvas-Animation)']
        },
        {
            id: 'gallery',
            filename: 'GALLERY.EXE',
            title: 'Gang Foto-Galerie',
            category: 'Persönliches',
            icon: 'photo_library',
            summary: 'Bildergalerie mit 25 hochauflösenden Porträts und Szenen von Dominik und Freunden.',
            details: 'Vollbild-Viewer mit Thumbnail-Leiste, Vor-/Zurück-Navigation, Zoom-Effekt und Bildunterschriften.',
            features: ['WebP-optimierte Bildformate', 'Vollbild-Vorschau', 'Keyboard-Steuerung']
        },
        {
            id: 'guestbook',
            filename: 'OUTLOOK86.MSG',
            title: 'Posteingang - Glückwünsche',
            category: 'Persönliches',
            icon: 'mark_email_unread',
            summary: 'Frühes Mail-Client-Interface mit humorvollen Botschaften von Freunden & Weggefährten.',
            details: '2-Spalten-Ansicht mit Nachrichtenliste oben und Lesefenster unten. Neue Einträge können via guestbook.data.js ergänzt werden.',
            features: ['Gelesen-/Ungelesen-Status', 'Detaillierter Mail-Header', 'Antworten-Simulation']
        },
        {
            id: 'certificate',
            filename: 'CERTIF.PRN',
            title: 'Club der alten Säcke - Urkunde',
            category: 'Persönliches',
            icon: 'verified',
            summary: 'Feierliche Aufnahmeurkunde in den „Club der alten Säcke“ zum 40. Geburtstag.',
            details: 'Druckreife Urkunde mit Wappen, Urkundentext und offiziellem Siegel. Per Klick kann das Dokument direkt als PDF gedruckt werden.',
            features: ['Druck-optimiertes CSS (print.css)', 'Wappen- und Rahmengrafik', 'Ein-Klick-Druckfunktion']
        },
        {
            id: 'netscape',
            filename: 'NETSCAPE.EXE',
            title: 'Netscape Navigator 1.0 - Dominik Special',
            category: 'Persönliches',
            icon: 'public',
            summary: 'Gewollt überdrehte Web-1.0-Trash-Homepage im Netscape-Browserfenster.',
            details: 'Blinkende Banner, Baustellen-GIFs, Comic Sans, Lauftexte (marquee), Retro-Besucherzähler und MIDI-Nostalgie.',
            features: ['Browser-Adressleiste mit Ladeanimation', 'Animierte 90er-GIFs', 'Besucherzähler #000042']
        },
        {
            id: 'recycle',
            filename: 'Recycle Bin (14)',
            title: 'Papierkorb - C:\\RECYCLE\\',
            category: 'System',
            icon: 'delete',
            summary: 'Der virtuelle Papierkorb mit gelöschten Jugendsünden und Entwürfen.',
            details: 'Enthält archivierte Fotos, veraltete Bildgenerierungs-Prompts und nostalgische Textfragmente, die per Klick inspiziert werden können.',
            features: ['Dynamische Dateizählung', 'Dateivorschau im Explorer-Stil', 'Wiederherstellen-Gag']
        },
        {
            id: 'gotchi',
            filename: 'GOTCHI.EXE',
            title: 'Dominik-Gotchi v1.0 (80er/90er Nerd-Edition)',
            category: 'Nerd & DOS',
            icon: 'smart_toy',
            summary: 'Kultiges 90er-Tamagotchi im bunten Plastikei mit animiertem 8-Bit-Dominik.',
            details: 'Halte den jungen 80er-Jahre-Computer-Nerd am Leben: Kalte Pizza & Dosen-Cola füttern, 5,25"-Disketten lochen, C64 zocken, per Akustikkoppler in BBS-Mailboxen einwählen und Tastatur-Schläfchen verordnen.',
            features: ['Animiertes Pixel-Art-Canvas mit 80er-Sprite', 'Synthetisierte 8-Bit-Beeps & Audio-Effekte', 'Vitalwert-Balken & interaktive Nerd-Aktionen']
        },
        {
            id: 'mcdom',
            filename: 'MC_DOM.EXE',
            title: 'McDominik Anti-Sin Professional 1986',
            category: 'System',
            icon: 'security',
            summary: 'Retro-Virenscanner im Norton-/McAfee-Stil zum Aufspüren von 80er-Jahre-Jugendsünden.',
            details: 'Durchforstet Festplatte C:\\ nach Vokuhila-Würmern, Modern-Talking-Trojanern, illegalem Mofa-Tuning und BRAVO Dr.-Sommer-Dateien. Bietet Quarantäne im Kult-Ordner sowie eine offizielle Absolutions-Urkunde.',
            features: ['Live-Scan-Animation mit Diskettenratter-Sound', '7 kuratierte Jugendsünden mit Peinlichkeits-Rating', 'Absolutions-Urkunden-Modal zum Vergeben aller Sünden']
        }
    ]
};
