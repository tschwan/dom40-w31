# Technisches & Fachliches Gesamtkonzept: Web-Experience „Dominik OS 1986“

---

## 1. Einleitung & Projektziel

Ziel des Projekts ist die Konzeption und Realisierung einer humorvollen, interaktiven und nostalgischen Erlebnis-Webseite anlässlich des 40. Geburtstags von Dominik (Geburtsdatum: 25. September 1986).

Das Projekt wird als virtuelle Desktop-Umgebung im Stil klassischer Heimcomputer- und Betriebssystem-Oberflächen (Windows 3.1 / Retro-PC) inszeniert. Alle thematischen Unterseiten treten als ausführbare Programme (.EXE), Dokumente (.DOC / .TXT), Tabellenkalkulationen (.XLS) oder System-Tools in Erscheinung.

Zentraler Architektur-Fokus: Maximaler visueller Retro-Charme bei minimaler technischer Implementierungskomplexität. Statt einer fehleranfälligen, vollständigen Fenstermanager-Simulation (mit Drag & Drop, freiem Resizing und komplexem Z-Index-Stacking) setzt das Konzept auf ein vereinfachtes Single-Active-Window-Paradigma. Dies garantiert eine zügige Umsetzung, robuste Stabilität und perfekte Bedienbarkeit auf Mobilgeräten.

---

## 2. Technische Leitplanken & Architektur

### 2.1 Statische Auslieferung (Zero-Backend)
- Vollständig statischer Client-Build (HTML5, modernes CSS, clientseitiges JavaScript / TypeScript).
- Kein dynamisches Backend, kein serverseitiges Rendering (SSR), keine externe Datenbank.
- Lauffähig auf jedem Standard-Webspace oder Static-Hosting-Dienst (GitHub Pages, Netlify, Vercel, Apache, Nginx, AWS S3).

### 2.2 Data-Driven Architecture (Trennung von Code und Inhalt)
- Alle variablen Inhalte (Charts, Texte, Prominente, Preise, Gästebuch-Nachrichten) liegen isoliert in flachen JSON-Dateien oder TypeScript-Modulen im Verzeichnis /src/data/.
- UI-Komponenten rendern Daten rein deklarativ. Inhalte können ohne Eingriff in Komponenten-Code editiert, ergänzt oder geleert werden.

### 2.3 Modularität & Feature-Toggles
- Jedes Inhaltsmodul ist eine autarke Komponente.
- Eine zentrale Konfigurationsdatei (modules.config.ts) steuert:
  - Sichtbarkeit (enabled: true/false)
  - Dateiname / Label auf dem Desktop (z. B. CHARTS.EXE)
  - Icon-Zuweisung
  - Anzeigereihenfolge im Desktop-Grid und Startmenü.
- Deaktivierte Module werden vom Build automatisch ignoriert und erscheinen weder auf dem Desktop noch im Menü.

### 2.4 Vereinfachte State-Architektur: Single-Active-Window
Um die Entwicklung drastisch zu verschlanken, gelten folgende Systemregeln:
- Globaler Anwendungszustand: Es existiert lediglich ein einziger Status: activeProgramId (string oder null).
- Zustand null: Der Desktop mit allen Icons ist sichtbar.
- Zustand string: Das ausgewählte Programm öffnet sich als zentriertes modales Fenster.
- Es ist immer nur ein Fenster zur gleichen Zeit geöffnet.
- Das Schließen ([X]-Button oder Escape-Taste) setzt den Status zurück auf null.

---

## 3. UI/UX & Styleguide: „Windows 3.1 Light“

### 3.1 Grundphilosophie
- Optik: Konsequenter 90er-Jahre-Look mit klassischen 3D-Bevels, Titelleisten in Marineblau und Pixel-Icons.
- Technik: Umsetzung mit modernem CSS (CSS Grid, Flexbox, native Dialog- / Modal-Semantik). Keine verwaschenen Bitmaps, sondern gestochen scharfes Rendering auf hochauflösenden Retina-/4K-Displays.

### 3.2 Farbpalette

| Farbname | Hex-Code | Verwendung |
| :--- | :--- | :--- |
| Desktop Teal | #008080 | Hintergrund des gesamten virtuellen Desktops |
| Window Frame Gray | #C0C0C0 | Grundfläche von Fenstern, Buttons und Taskleiste |
| Active Title Blue | #000080 | Titelleiste des aktuell geöffneten Fensters |
| Title Text White | #FFFFFF | Text in der Titelleiste |
| Window Light Bevel | #FFFFFF | Lichtkante (oben / links) für 3D-Relief-Effekte |
| Window Dark Bevel | #808080 | Schattenkante (unten / rechts) für 3D-Relief-Effekte |
| Window Deep Shadow | #000000 | Äußerste Konturlinie, Textfarbe, Rahmen |
| Alert Yellow | #FFFF00 | Akzentfarbe für Systemwarnungen |

### 3.3 Vereinfachtes Interaktionsmodell
- 3D-Bevel-Rahmen (Reines CSS):
  - Buttons / Fenster-Außenkanten: border-top: 2px solid #FFFFFF, border-left: 2px solid #FFFFFF, border-right: 2px solid #808080, border-bottom: 2px solid #808080.
  - Eingedrückte Elemente (Eingabefelder, Statusleisten): Invertierte Rahmenfarben (inset-Effekt).
- Kein freies Drag & Drop, kein Resizing:
  - Auf Desktop-Monitoren öffnet sich jedes Fenster zentriert mit einer festen Maximalbreite (z. B. max-width: 800px; width: 90vw; max-height: 85vh; overflow-y: auto;).
  - Titelleiste enthält lediglich den Programmnamen, das Icon und den Schließen-Button [X]. Auf Minimieren- und Maximieren-Buttons wird verzichtet.
- Desktop als statisches CSS-Grid:
  - Icons sind in einem aufgeräumten CSS-Grid angeordnet (keine freien Koordinaten).
  - Einfacher Klick öffnet das Programm (kein fehleranfälliger Doppelklick, optimal für Touch-Geräte).
- Statische Taskleiste (Bottom Bar):
  - Feste Leiste am unteren Bildschirmrand.
  - Links: „Start“-Button (öffnet Schnellzugriffs-Dropdown auf alle Module).
  - Mitte: Anzeige des aktuell geöffneten Programms (oder leer im Desktop-Modus).
  - Rechts: Laufende Digitaluhr (HH:MM:SS) und Systemstatus-Badge (Dominik OS 40.0).
- Mobile Adaption (Viewport unter 768 px):
  - Das geöffnete Fenster nimmt automatisch 100vw und 100vh ein (Full-Screen-Modal).
  - Der Inhalt innerhalb des Fensters scrollt nativ.
  - Desktop-Icons werden in einem touch-optimierten 2- oder 3-Spalten-Raster dargestellt.

### 3.4 Typografie
- System- & Titelschriften: Retro-Monospace- oder Bitmap-Fonts (z. B. W95FA, MS Sans Serif via Webfont oder System-Monospace wie Courier New, Consolas).
- Fließtexte: Gut lesbare, moderne Monospace- oder Groteskschrift, um längere Inhalte ermüdungsfrei lesen zu können.

---

## 4. Modul-Spezifikationen (Die Programme)

### M00: Desktop-Shell & System-Alerts (DESKTOP / SHELL)
- Rendert das Icon-Grid, die Taskleiste und die zentrierte Modal-Bühne.
- System-Popups: Zeitgesteuerte Dialogboxen (z. B. nach 40 Sekunden Interaktion) mit klassischem Warn-Icon und [ OK ]-Button:
  „SYSTEM MESSAGE: 40 Jahre Dominik erfolgreich geladen. Jugend.dll wurde durch Weisheit.exe ersetzt.“

### M01: Setup-Assistent (SETUP_40.EXE)
- Öffnet sich standardmäßig automatisch beim ersten Laden der Website.
- Simuliert einen Windows-Installationsassistenten: „Willkommen beim Dominik 40.0 Update“.
- Zeigt die Begrüßung und schließt sich per Klick auf „Starten“, um den Desktop freizugeben.

### M02: Musik-Chart-Historie (CHARTS.EXE)
- Chronologische Liste aller #1-Hits der offiziellen deutschen Musikcharts am Stichtag 25. September (1986 bis 2025/2026).
- Kompakte Tabellenansicht mit Filter nach Jahrzehnten (80er, 90er, 00er, 10er, 20er).
- Datenfelder: Jahr, Titel, Interpret, optionale Trivia.

### M03: Popkultur-Archiv (CULTURE86.DOC)
- Die prägendsten Medien-Highlights aus Dominiks Geburtsjahr 1986 im Texteditor-Look.
- Umschaltbar über klassische Reiter/Tabs: Top 10 Filme, Top 10 TV-Serien, Top 10 Musikalben.
- Datenfelder: Platzierung, Titel, Genre/Studio, Kurzbeschreibung.

### M04: Geburtstags-Zwillinge (VIP_LIST.DBF)
- Karteikarten-Datenbank der Top 20 berühmten Persönlichkeiten, die ebenfalls an einem 25. September geboren wurden.
- Rasteransicht mit Bild-Platzhalter, Name, Geburtsjahr, Berufsbezeichnung und historischer Bedeutung.

### M05: Preisvergleich („Was kostete die Welt 1986?“) (PRICES.XLS)
- Tabellenkalkulation mit sichtbarem Tabellenraster (Spalten A, B, C...) und angedeuteter Formelzeile.
- Gegenüberstellung von Konsumgütern (Benzin, Kugel Eis, Maß Bier, Kino, Monatsmiete, VW Golf).
- Spalten: Produkt, Preis 1986 (D-Mark), Umgerechnet (Euro), Preis heute (Euro), Teuerungsfaktor.

### M06: Retro-Games 1986 (ARCADE86.EXE)
- Showcase bahnbrechender Videospiele des Jahrgangs 1986 (The Legend of Zelda, Metroid, Out Run, Dragon Quest).
- Pixel-Cover, Release-Plattform, Entwickler und Fun Facts.
- Integrierter Sound-Button zum optionalen Abspielen kurzer 8-Bit-Chiptune-Sounds.

### M07: Überleben 1986 – Handbuch (HELP1986.HLP)
- Nachbildung der klassischen Windows-Hilfe mit Inhaltsbaum und grün unterstrichenen Begriffen.
- Vergleichende Artikel: „Wie man 1986 ohne Google und Smartphone überlebte“ (Kassettensalat, Telefonzelle mit Münzen, Brockhaus-Enzyklopädie).

### M08: Tages-Ticker 25.09.1986 (NEWSWIRE.TXT)
- Ticker- oder Endlospapier-Terminal mit den Nachrichtenmeldungen des exakten Geburtstags.
- Gliederung nach Politik, Weltgeschehen, Sport und kuriosem Alltag vom 25.09.1986.

### M09: Der 40-Jahre-Rechner (CALC40.EXE)
- Taschenrechner-Interface mit LCD-Ziffernanzeige.
- Berechnet live auf Basis des Geburtszeitpunkts (25.09.1986, 00:00:00 Uhr) die Differenz zur aktuellen Zeit (Date.now()).
- Ausgegebene Metriken:
  - Exakte Lebenszeit in Sekunden und Stunden
  - Geschätzte Herzschläge (~75 bpm)
  - Verschlafene Zeit (~33 %)
  - Geschätzte verbrauchte Tassen Kaffee / Bier
  - Zurückgelegte Kilometer auf der Umlaufbahn um die Sonne

### M10: AI-Fotogalerie (PAINT_AI.BMP)
- Bildbetrachter im Paintbrush-Look mit statischer Werkzeugleiste am Rand.
- Galerie-Raster mit Vorschaubildern (Thumbnails) der KI-generierten Porträts von Dominik.
- Klick öffnet das Einzelbild groß mit Bildunterschrift.

### M11: Posteingang / Fake-Gästebuch (OUTLOOK86.MSG)
- Frühes Mail-Client-Layout (Nachrichtenliste oben, Lesefenster unten).
- Vordefinierte, humorvolle Glückwünsche von Freunden, Verwandten oder Prominenten.
- Datenfelder: Absender, Betreff, Datum, Nachricht. Neue Einträge erfolgen rein über guestbook.json.

### M12: Aufnahmezertifikat („Alte Säcke“) (CERTIF.PRN)
- Druckvorschau-Fenster mit feierlicher Urkunde zur offiziellen Aufnahme in den „Club der alten Säcke“.
- Enthält Dominiks Namen, Geburtsdatum, Verleihungsdatum (25.09.2026) und Begründung.
- Integrierter Button: „Urkunde drucken / Als PDF speichern“ (steuert window.print() an).

### M13: Der Web 1.0 Trash-Browser (NETSCAPE.EXE)
- Ein simuliertes Netscape Navigator 1.0 / IE 2.0 Browser-Fenster inklusive Adressleiste (http://www.dominik-wird-40-mega-party.de.vu).
- Kapselt die gewollt peinliche 90er-Jahre-Homepage:
  - Tabellen-Layouts mit dicken, bunten Rahmen
  - Animierte Baustellen-GIFs („Under Construction“)
  - Lauftexte (marquee) und blinkender Text
  - Retro-Besucherzähler („Besucher-Nr.: 000042“)
  - Comic-Sans-Schrift und knallige Kachel-Hintergründe

---

## 5. Modul-Konfiguration & Datenarchitektur

### 5.1 Projekt-Struktur

/
|-- public/
|   |-- assets/
|   |   |-- icons/          (32x32 Pixel-Icons: setup.png, charts.png, etc.)
|   |   |-- images/         (Galeriebilder, Promifotos)
|   |   |-- sounds/         (Retro-Klicks, Alert-Beeps optional)
|   |   `-- fonts/          (Retro-Webfonts: W95FA, Monospace)
|   `-- favicon.ico
|-- src/
|   |-- components/
|   |   |-- desktop/
|   |   |   |-- DesktopGrid.tsx     (Icon-Raster auf Teal-Hintergrund)
|   |   |   |-- Taskbar.tsx         (Leiste unten, Start-Button, Uhr)
|   |   |   |-- WindowModal.tsx     (Universeller zentrierter Fenster-Rahmen)
|   |   |   `-- SystemAlert.tsx     (Witzige Dialog-Popups)
|   |   `-- modules/                (Komponenten pro Modul)
|   |       |-- SetupWizard.tsx     (M01)
|   |       |-- ChartsWindow.tsx    (M02)
|   |       |-- CultureWindow.tsx   (M03)
|   |       |-- VipWindow.tsx       (M04)
|   |       |-- PricesWindow.tsx    (M05)
|   |       |-- ArcadeWindow.tsx    (M06)
|   |       |-- HelpWindow.tsx      (M07)
|   |       |-- NewsWindow.tsx      (M08)
|   |       |-- CalcWindow.tsx      (M09)
|   |       |-- PaintWindow.tsx     (M10)
|   |       |-- MailWindow.tsx      (M11)
|   |       |-- CertificateWindow.tsx (M12)
|   |       `-- NetscapeWindow.tsx  (M13)
|   |-- data/
|   |   |-- modules.config.ts       (Registry & Toggles)
|   |   |-- charts.json
|   |   |-- popculture.json
|   |   |-- vipBirthdays.json
|   |   |-- prices.json
|   |   |-- retroGames.json
|   |   |-- headlines.json
|   |   `-- guestbook.json
|   |-- styles/
|   |   |-- bevels.css              (3D-Rahmenklassen: .bevel-up, .bevel-down)
|   |   |-- retro-theme.css         (Farbvariablen, Windows-Look)
|   |   `-- print.css               (Drucklayout fuer M12)
|   |-- App.tsx                     (State: activeProgramId)
|   `-- main.tsx
|-- package.json
`-- README.md

### 5.2 Modul-Registry (src/data/modules.config.ts)

export interface DesktopModule {
  id: string;               // Eindeutige ID
  filename: string;         // Name unter dem Icon (z. B. 'CHARTS.EXE')
  title: string;            // Text in der blauen Fensterleiste
  icon: string;             // Dateiname des Icons
  enabled: boolean;         // Modul an/aus
  maxWidth?: string;        // Optionale Breitenbegrenzung (Standard: 800px)
}

export const MODULES_CONFIG: DesktopModule[] = [
  { id: 'setup', filename: 'SETUP_40.EXE', title: 'Dominik OS 40.0 Setup', icon: 'setup.png', enabled: true, maxWidth: '520px' },
  { id: 'charts', filename: 'CHARTS.EXE', title: 'Media Control Hitparade 1986-2025', icon: 'charts.png', enabled: true },
  { id: 'culture', filename: 'CULTURE86.DOC', title: 'Popkultur des Jahres 1986', icon: 'doc.png', enabled: true },
  { id: 'vips', filename: 'VIP_LIST.DBF', title: 'Prominente vom 25. September', icon: 'cardfile.png', enabled: true },
  { id: 'prices', filename: 'PRICES.XLS', title: 'Konsumpreise: 1986 vs. Heute', icon: 'calc.png', enabled: true },
  { id: 'calc', filename: 'CALC40.EXE', title: '40-Jahre-Lebenszeit-Rechner', icon: 'calculator.png', enabled: true, maxWidth: '440px' },
  { id: 'games', filename: 'ARCADE86.EXE', title: 'Gaming-Highlights 1986', icon: 'joystick.png', enabled: true },
  { id: 'help', filename: 'HELP1986.HLP', title: 'Alltag & Technik 1986: Ein Handbuch', icon: 'help.png', enabled: true },
  { id: 'news', filename: 'NEWSWIRE.TXT', title: 'Nachrichten vom 25.09.1986', icon: 'terminal.png', enabled: true },
  { id: 'gallery', filename: 'PAINT_AI.BMP', title: 'AI-Galerie: Dominik Edition', icon: 'paint.png', enabled: true },
  { id: 'guestbook', filename: 'OUTLOOK86.MSG', title: 'Posteingang - Glueckwuensche', icon: 'mail.png', enabled: true },
  { id: 'certificate', filename: 'CERTIF.PRN', title: 'Club der alten Saecke - Urkunde', icon: 'cert.png', enabled: true, maxWidth: '650px' },
  { id: 'retro_web', filename: 'NETSCAPE.EXE', title: 'Netscape Navigator 1.0 - Dominik Special', icon: 'netscape.png', enabled: true, maxWidth: '850px' }
];

---

## 6. Nicht-funktionale Anforderungen & Qualitätssicherung

### 6.1 Mobile Responsiveness & Fallback-Layout
- Modal-Anpassung: Auf Bildschirmen unter 768 px Breite füllt jedes geöffnete Programmfenster 100 % der Viewport-Fläche aus (inset: 0).
- Touch-Bedienung: Schaltflächen und Menüeinträge besitzen eine Mindest-Touch-Fläche von 44 x 44 Pixeln.
- Scrollverhalten: Der Desktop-Hintergrund wird bei geöffnetem Modal gegen Hintergrund-Scrollen gesperrt (overflow: hidden auf body).

### 6.2 Performance & Asset-Optimierung
- Bildformate: Alle Bilddateien (Promi-Porträts, AI-Fotogalerie) werden in modernen Formaten (WebP oder AVIF) bereitgestellt und mit nativem loading="lazy" eingebunden.
- Icon-Sprite / Vektoren: System-Icons liegen als leichtgewichtige SVGs oder PNG-Sprites vor; kein Nachladen einzelner Bilddateien beim Öffnen eines Fensters.
- Bundle-Größe: Die Anwendung darf ohne Mediendateien eine Gesamt-Bundle-Größe von 200 KB (gzipped) nicht überschreiten.

### 6.3 Audio- & Autoplay-Compliance
- Sound-Effekte (8-Bit-Chiptunes in ARCADE86.EXE oder System-Beeps) dürfen niemals automatisch beim Laden der Seite abgespielt werden (Einhaltung moderner Browser-Autoplay-Richtlinien).
- Sounds starten ausschließlich durch explizite Nutzerinteraktion (Klick auf einen Play-Button).
- In der Taskleiste befindet sich ein durchgängig erreichbarer Lautsprecher-Icon-Button für globale Stummschaltung (Mute-Toggle).

### 6.4 Druck-Optimierung für M12 (CERTIF.PRN)
- Das Druck-Stylesheet (@media print) muss für die Urkunde:
  - Den gesamten Desktop, die Taskleiste, Icons, Fensterrahmen und Schließen-Buttons vollständig ausblenden (display: none !important;).
  - Nur den Urkundeninhalt auf weißem Hintergrund zentriert darstellen.
  - Das DIN-A4-Format erzwingen: @page { size: A4 portrait; margin: 15mm; }.
  - Farbdruck explizit freigeben: -webkit-print-color-adjust: exact; print-color-adjust: exact;.

### 6.5 Isolation des Web-1.0-Trash-Moduls (NETSCAPE.EXE)
- Das Modul M13 nutzt bewusst fehlerhafte, veraltete und grelle Stilmittel (Blinken, grelle Farben, Marquee-Laufschriften, Tabellen-Layouts).
- CSS-Kapselung: Das Styling dieses Moduls muss zwingend über ein Sandboxed-iframe (z. B. via srcdoc) oder stark abgekapseltes CSS (z. B. Tailwind-Reset oder CSS-Modules mit strengem Präfix .netscape-scope) isoliert werden. Globale Layout-Regeln der Hauptanwendung dürfen unter keinen Umständen überschrieben werden.

### 6.6 Resilienz & Fehlerbehandlung
- Fehlt ein Datensatz in den JSON-Dateien oder ist eine Datei leer, darf die Anwendung keinen Whitescreen/Laufzeitfehler erzeugen.
- Stattdessen rendert das entsprechende Modul eine authentische Fehlermeldung im System-Stil:
  „FEHLER 404: Datei oder Datensatz nicht gefunden. Bitte Konfiguration prüfen.“
  
  