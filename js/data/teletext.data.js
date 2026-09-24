// Teletext / Videotext Daten für Dominik OS 1986
window.DOMINIK_DATA = window.DOMINIK_DATA || {};

window.DOMINIK_DATA.teletext = {
    header: {
        station: 'DOMINIK-TEXT',
        date: '25.09.86',
        time: '18:40:25'
    },
    pages: {
        '100': {
            title: 'Hauptmenü / Inhaltsverzeichnis',
            next: '101',
            prev: '500',
            content: [
                { type: 'banner', text: '===================================================' },
                { type: 'header', text: '  DOMINIK-TEXT  P100   ARD / ZDF   25.09.1986  ' },
                { type: 'banner', text: '===================================================' },
                { type: 'blank' },
                { type: 'title', color: 'yellow', text: 'HERZLICH WILLKOMMEN BEIM DOMINIK-VIDEOTEXT!' },
                { type: 'text', color: 'white', text: 'Die schnellste elektronische Zeitung im Wohnzimmer.' },
                { type: 'blank' },
                { type: 'category', color: 'cyan', text: 'INHALTSVERZEICHNIS (SEITE WAEHLEN):' },
                { type: 'menu-item', page: '101', color: 'yellow', label: '101', desc: 'Jubilaeum: Dominik erreicht Level 40' },
                { type: 'menu-item', page: '200', color: 'green', label: '200', desc: 'Sport-Telegramm 1986 (Tennis, Fussball)' },
                { type: 'menu-item', page: '300', color: 'cyan', label: '300', desc: 'Fernsehprogramm heute Abend (25.09.1986)' },
                { type: 'menu-item', page: '400', color: 'yellow', label: '400', desc: 'Deutschland-Wetter & Vorhersage' },
                { type: 'menu-item', page: '404', color: 'magenta', label: '404', desc: 'Testbild & Technische Stoerung' },
                { type: 'menu-item', page: '500', color: 'green', label: '500', desc: 'Kleinanzeigen-Markt 1986 (C64, Mofa)' },
                { type: 'blank' },
                { type: 'tip', color: 'cyan', text: 'BEDIENUNG: Ziffern 0-9 tippen oder Farbtasten nutzen.' },
                { type: 'footer-nav', text: 'Rot=100  Gruen=101  Gelb=200  Blau=300' }
            ]
        },
        '101': {
            title: 'Jubiläum: Dominik wird 40',
            next: '200',
            prev: '100',
            content: [
                { type: 'header', text: '  DOMINIK-TEXT  P101   EILMELDUNG  25.09.1986  ' },
                { type: 'banner', text: '===================================================' },
                { type: 'blank' },
                { type: 'title', color: 'yellow', text: '+++ EILMELDUNG +++ GEBURTSTAGSKIND DES TAGES' },
                { type: 'blank' },
                { type: 'text', color: 'white', text: 'Ebersberg.' },
                { type: 'text', color: 'cyan', text: 'Am heutigen 25. September 1986 erblickte Dominik' },
                { type: 'text', color: 'cyan', text: 'das Licht der Welt. Experten und Familienkreise' },
                { type: 'text', color: 'cyan', text: 'feiern das Ereignis als historischen Meilenstein.' },
                { type: 'blank' },
                { type: 'text', color: 'yellow', text: 'AMTLICHE STATUSMELDUNG AUS DEM JAHR 2026:' },
                { type: 'text', color: 'white', text: '- 40 Jahre Systemlaufzeit ohne Kernel-Panic.' },
                { type: 'text', color: 'white', text: '- Upgrade auf Version 40.0 erfolgreich ausgefuehrt.' },
                { type: 'text', color: 'white', text: '- Ausdauer und Humor stabil auf Maximalwert.' },
                { type: 'text', color: 'white', text: '- Knarrende Gelenke werden als Feature verbucht.' },
                { type: 'blank' },
                { type: 'text', color: 'green', text: 'Die Redaktion gratuliert herzlich zum Geburtstag!' },
                { type: 'blank' },
                { type: 'footer-nav', text: 'Rot=100  Gruen=200  Gelb=300  Blau=400' }
            ]
        },
        '200': {
            title: 'Sport-Telegramm 1986',
            next: '300',
            prev: '101',
            content: [
                { type: 'header', text: '  DOMINIK-TEXT  P200   SPORT-FUNK  25.09.1986  ' },
                { type: 'banner', text: '===================================================' },
                { type: 'blank' },
                { type: 'title', color: 'yellow', text: 'SPORT-TELEGRAMM DES JAHRES 1986' },
                { type: 'blank' },
                { type: 'text', color: 'green', text: '>> TENNIS: BECKER & GRAF IM SIEGESRAUSCH' },
                { type: 'text', color: 'white', text: 'Boris Becker verteidigt seinen Wimbledon-Titel' },
                { type: 'text', color: 'white', text: 'souveraen. Steffi Graf gewinnt Turnier um Turnier' },
                { type: 'text', color: 'white', text: 'und rueckt in die Weltspitze auf.' },
                { type: 'blank' },
                { type: 'text', color: 'yellow', text: '>> FUSSBALL: WM IN MEXIKO & BUNDESLIGA' },
                { type: 'text', color: 'white', text: 'Diego Maradona fuehrt Argentinien mit der' },
                { type: 'text', color: 'white', text: '"Hand Gottes" und Traumtoren zum WM-Titel.' },
                { type: 'text', color: 'white', text: 'Deutschland wird Vizeweltmeister.' },
                { type: 'text', color: 'white', text: 'In der Liga liefern sich Bayern und Bremen' },
                { type: 'text', color: 'white', text: 'ein dramatisches Duell um die Meisterschale.' },
                { type: 'blank' },
                { type: 'footer-nav', text: 'Rot=100  Gruen=300  Gelb=400  Blau=500' }
            ]
        },
        '300': {
            title: 'TV-Programm 25.09.1986',
            next: '400',
            prev: '200',
            content: [
                { type: 'header', text: '  DOMINIK-TEXT  P300   FERNSEHEN   25.09.1986  ' },
                { type: 'banner', text: '===================================================' },
                { type: 'blank' },
                { type: 'title', color: 'yellow', text: 'DAS ABENDPROGRAMM AM DONNERSTAG, 25.09.1986' },
                { type: 'blank' },
                { type: 'text', color: 'cyan', text: 'ARD - ERSTES DEUTSCHES FERNSEHEN:' },
                { type: 'text', color: 'white', text: '17:10 Loewenzahn mit Peter Lustig' },
                { type: 'text', color: 'white', text: '18:00 Vorabend: Ein Heim fuer Tiere' },
                { type: 'text', color: 'white', text: '20:00 Tagesschau mit Jo Brauner' },
                { type: 'text', color: 'yellow', text: '20:15 Sonderfilm: Auf Achse (Manfred Krug)' },
                { type: 'text', color: 'white', text: '21:45 Tagesthemen & Wetterkarte' },
                { type: 'blank' },
                { type: 'text', color: 'cyan', text: 'ZDF - ZWEITES DEUTSCHES FERNSEHEN:' },
                { type: 'text', color: 'white', text: '17:30 Die Biene Maja (Zeichentrick)' },
                { type: 'text', color: 'white', text: '19:00 Heute-Nachrichten' },
                { type: 'text', color: 'yellow', text: '19:30 Die Schwarzwaldklinik (Prof. Brinkmann)' },
                { type: 'text', color: 'white', text: '21:00 Der Alte (Krimi)' },
                { type: 'text', color: 'green', text: '23:45 Sendeschluss & Testbild mit Ton' },
                { type: 'blank' },
                { type: 'footer-nav', text: 'Rot=100  Gruen=400  Gelb=101  Blau=500' }
            ]
        },
        '400': {
            title: 'Deutschland-Wetter 1986',
            next: '404',
            prev: '300',
            content: [
                { type: 'header', text: '  DOMINIK-TEXT  P400   WETTERDIENST 25.09.1986 ' },
                { type: 'banner', text: '===================================================' },
                { type: 'blank' },
                { type: 'title', color: 'yellow', text: 'WETTERBERICHT FUER DEN 25. SEPTEMBER 1986' },
                { type: 'blank' },
                { type: 'text', color: 'white', text: 'Hochdruckgebiet "Dominikus" sorgt ueber' },
                { type: 'text', color: 'white', text: 'Mitteleuropa fuer goldenes Fruehherbst-Wetter.' },
                { type: 'blank' },
                { type: 'text', color: 'cyan', text: 'TEMPERATUR-UEBERSICHT DER REGIONEN:' },
                { type: 'text', color: 'green', text: 'Nordsee / Kueste : 17 Grad C  Heiter bis wolkig' },
                { type: 'text', color: 'green', text: 'Berlin / Osten   : 19 Grad C  Sonnig, trocken' },
                { type: 'text', color: 'green', text: 'Rheinland / West : 20 Grad C  Spaetsommerlich' },
                { type: 'text', color: 'green', text: 'Bayern / Sueden  : 21 Grad C  Leichter Foehn' },
                { type: 'blank' },
                { type: 'text', color: 'yellow', text: 'AUSSICHTEN FUER DIE NAECHSTEN 40 JAHRE:' },
                { type: 'text', color: 'white', text: 'Dauerhaft heitere Stimmung bei steigender' },
                { type: 'text', color: 'white', text: 'Lebensfreude und stabiler Festtags-Laune.' },
                { type: 'blank' },
                { type: 'footer-nav', text: 'Rot=100  Gruen=404  Gelb=101  Blau=200' }
            ]
        },
        '404': {
            title: 'Testbild & Störung',
            next: '500',
            prev: '400',
            content: [
                { type: 'header', text: '  DOMINIK-TEXT  P404   STOERUNG    25.09.1986  ' },
                { type: 'banner', text: '===================================================' },
                { type: 'blank' },
                { type: 'title', color: 'red', text: '+++ BITTE HABEN SIE ETWAS GEDULD +++' },
                { type: 'text', color: 'yellow', text: 'WIR SCHALTEN GLEICH ZUR NAECHSTEN SENDUNG UM' },
                { type: 'blank' },
                { type: 'testcard' },
                { type: 'blank' },
                { type: 'text', color: 'white', text: 'SENDETURM-STATUS: Wartungsarbeiten an Zeile 40' },
                { type: 'text', color: 'cyan', text: 'Antennen-Ausrichtung auf 25.09.1986 korrigiert.' },
                { type: 'blank' },
                { type: 'footer-nav', text: 'Rot=100  Gruen=500  Gelb=101  Blau=300' }
            ]
        },
        '500': {
            title: 'Kleinanzeigen 1986',
            next: '100',
            prev: '404',
            content: [
                { type: 'header', text: '  DOMINIK-TEXT  P500   MARKTPLATZ  25.09.1986  ' },
                { type: 'banner', text: '===================================================' },
                { type: 'blank' },
                { type: 'title', color: 'yellow', text: 'KLEINANZEIGEN-MARKT IM TELETEXT (SEPT. 1986)' },
                { type: 'blank' },
                { type: 'text', color: 'green', text: '>> VERKAUFE: COMMODORE 64 BROTKASTEN' },
                { type: 'text', color: 'white', text: 'Inkl. Datasette 1530, QuickShot II Joystick' },
                { type: 'text', color: 'white', text: 'und 30 Kassetten. Festpreis: 380,- DM.' },
                { type: 'blank' },
                { type: 'text', color: 'cyan', text: '>> SUCHE: MOFA HERCULES PRIMA 5S' },
                { type: 'text', color: 'white', text: 'Guter Zustand, Originalpapiere. Bitte ab' },
                { type: 'text', color: 'white', text: '18 Uhr telefonieren unter Tel. 040 / 7234xx.' },
                { type: 'blank' },
                { type: 'text', color: 'magenta', text: '>> TAUSCHE: BRAVO-STAR-SCHNITTE 1986' },
                { type: 'text', color: 'white', text: 'Biete Samantha Fox & A-ha komplett gegen' },
                { type: 'text', color: 'white', text: 'Modern Talking Poster aus Heft 38.' },
                { type: 'blank' },
                { type: 'footer-nav', text: 'Rot=100  Gruen=100  Gelb=101  Blau=200' }
            ]
        }
    }
};
