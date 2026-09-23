# Implementierungsplan: Dominik OS 1986 (Windows 3.1 Retro Web Experience)

## 1. Übersicht & Zielsetzung

Realisierung einer humorvollen, interaktiven und nostalgischen Retro-Webseite anlässlich des 40. Geburtstags von Dominik (25. September 1986). Die Seite simuliert eine klassische Windows-3.1-Desktop-Oberfläche mit 13 thematischen Programmen und Dokumenten.

---

## 2. Vereinbarter Technologie-Stack & Architektur-Entscheidungen

| Bereich | Entscheidung | Begründung |
| :--- | :--- | :--- |
| **Technologie-Basis** | Pure Vanilla HTML5, CSS3, JavaScript | Keine Frameworks (React, Vue), kein Tailwind, keine externen Dependencies. Schlank, langlebig, unverwüstlich. |
| **Build- & Laufzeit-Setup** | Zero-Build / Reine statische Dateien | Kein npm, kein Bundler. Direkt im Browser per Doppelklick auf `index.html` (`file://`) oder über jeden statischen Webserver startbar. |
| **Daten-Architektur** | Globale Data-Namespaces (`window.DOMINIK_DATA`) | Daten liegen in separaten JS-Dateien im Verzeichnis `js/data/`. Verhindert lokale CORS-Blockaden des Browsers bei `file://`-Aufruf. |
| **Fenster-Architektur** | Single-Active-Window-Paradigma | Es ist stets maximal ein modales Fenster geöffnet (`activeProgramId`). Schließbar via `[X]`-Button, `Escape`-Taste oder Klick auf den Desktop. Maximale Stabilität und Touch-Tauglichkeit. |
| **Typografie & Icons** | Hybrid | Einbindung von `Courier Prime` und Google Material Symbols per CDN; vollständige visuelle Absicherung durch System-Monospace-Fonts (`Courier New`, `MS Sans Serif`, `monospace`). |
| **Audio / Sound** | Vorerst deaktiviert | Kompletter Verzicht auf Soundeffekte (YAGNI/KISS). Kann bei Bedarf später als Erweiterung ergänzt werden. |
| **Mobile Anpassung** | Vollbild-Modal unter 768px | Modalfenster nehmen auf Mobilgeräten 100vw/100vh ein mit nativer Scrollfähigkeit; Touch-Ziele mind. 44x44px. |

---

## 3. Ziel-Projektstruktur

```text
dom40-w31/
|-- index.html                  # Zentrales HTML-Gerüst (Desktop, Taskbar, Modal-Bühne)
|-- css/
|   |-- retro-theme.css         # Farbvariablen (Teal #008080, Navy #000080, Grau #C0C0C0), Typografie, Layout
|   |-- bevels.css              # 3D-Licht-/Schatten-Kanten (.bevel-up, .bevel-down, .window-frame)
|   |-- modules.css             # Modulspezifische Styles (Tabellenkalkulation, Editor, Urkunde, Netscape)
|   `-- print.css               # Drucklayout für die Urkunde (M12)
|-- js/
|   |-- app.js                  # Haupt-Controller & Lifecycle (Init, Event-Delegation)
|   |-- state.js                # Globaler Status (activeProgramId, Event-Bus)
|   |-- desktop.js              # Desktop-Icon-Grid & Taskbar (Uhr, Start-Menü)
|   |-- modal.js                # Zentrales Fenster-Management (Öffnen, Schließen, Escape-Handling)
|   |-- data/
|   |   |-- modules.config.js   # Modul-Registry (ID, Name, Icon, Fenstertitel, max-width)
|   |   |-- charts.data.js      # M02: #1-Hits 1986–2026
|   |   |-- culture.data.js     # M03: Filme, Serien, Alben 1986
|   |   |-- vips.data.js        # M04: Geburtstagszwillinge 25.09.
|   |   |-- prices.data.js      # M05: Preisvergleich DM vs. EUR
|   |   |-- games.data.js       # M06: Games 1986
|   |   |-- help.data.js        # M07: Überleben 1986 Ratgeber
|   |   |-- news.data.js        # M08: Schlagzeilen 25.09.1986
|   |   |-- guestbook.data.js   # M11: Posteingang Glückwünsche
|   |   `-- recycle.data.js     # M14: Papierkorb-Inhalt & Prompts
|   `-- modules/
|       |-- setup.js            # M01: SETUP_40.EXE
|       |-- charts.js           # M02: CHARTS.EXE
|       |-- culture.js          # M03: CULTURE86.DOC
|       |-- vips.js             # M04: VIP_LIST.DBF
|       |-- prices.js           # M05: PRICES.XLS
|       |-- games.js            # M06: ARCADE86.EXE
|       |-- help.js             # M07: HELP1986.HLP
|       |-- news.js             # M08: NEWSWIRE.TXT
|       |-- calc.js             # M09: CALC40.EXE
|       |-- gallery.js          # M10: GALLERY.EXE (Dominik Foto-Galerie)
|       |-- mail.js             # M11: OUTLOOK86.MSG
|       |-- certificate.js      # M12: CERTIF.PRN
|       |-- netscape.js         # M13: NETSCAPE.EXE
|       `-- recycle.js          # M14: RECYCLE.BIN (Papierkorb)
|-- docs/
|   |-- concept_dom40_windows.md
|   `-- implementation_plan.md
`-- design/
    |-- DESIGN.md
    |-- code.html
    `-- screen.png
```

---

## 4. Phasen & Aufgaben-Breakdown

### Phase 1: Core Foundation & Shell (Priorität: Höchste)
*Ziel: Ein lauffähiger Retro-Desktop mit Klick-Interaktion, Taskbar und zentralem Fenstermanager.*

- [x] **Task 1.1: Grundgerüst & Styling**
  - Anlegen von `index.html` mit korrekter `<head>`-Konfiguration, Viewport und Skript-Einbindungen.
  - Implementierung von `css/retro-theme.css` mit 16-Bit-Farbpalette (`#008080`, `#C0C0C0`, `#000080`, etc.).
  - Implementierung von `css/bevels.css` für authentische 3D-Kanten (Raised / Sunken).
- [x] **Task 1.2: State Management & Modul-Registry**
  - Implementierung von `js/state.js` (State für `activeProgramId`).
  - Anlegen von `js/data/modules.config.js` zur Registrierung aller 13 Icons und Fenstertitel.
- [x] **Task 1.3: Desktop-Grid & Taskbar**
  - Implementierung von `js/desktop.js`: Rendern des Icon-Rasters auf dem Teal-Desktop.
  - Bau der Taskbar am unteren Rand mit Start-Button, Startmenü-Popup, Titel des aktiven Fensters und laufender Echtzeituhr (HH:MM:SS).
- [x] **Task 1.4: Single-Active-Window Modal Framework**
  - Implementierung von `js/modal.js`: Zentrales modales Fenster mit Titelleiste (Icon, Titel, `[X]`-Schließen-Knopf).
  - Schließen über Klick auf `[X]`, Drücken von `Escape` oder Klick auf den Hintergrund.
  - Mobile Responsiveness: Automatische Vollbilddarstellung (`100vw`, `100vh`) bei Viewports < 768px.

---

### Phase 2: Interaktive Kern-Tools (Priorität: Hoch)
*Ziel: Die fünf wichtigsten interaktiven Feature-Programme umsetzen.*

- [x] **Task 2.1: M01 - `SETUP_40.EXE` (Installationsassistent)**
  - Retro-Setup-Wizard mit Fortschrittsanzeige, Begrüßungstext („Dominik OS 40.0 wird installiert...“) und „Starten“-Button.
  - Automatisches Aufpoppen beim ersten Seitenaufruf (gespeichert in `sessionStorage` oder per Default).
- [x] **Task 2.2: M09 - `CALC40.EXE` (40-Jahre-Lebenszeit-Rechner)**
  - Digitales Display mit Live-Differenzberechnung ab 25.09.1986.
  - Metriken: Gelebte Sekunden, Herzschläge, geschlafene Stunden, Kaffeetassen/Bier, Erdorbit-Kilometer.
- [x] **Task 2.3: M12 - `CERTIF.PRN` (Aufnahme-Urkunde „Club der alten Säcke“)**
  - Visuelle Ausgestaltung der feierlichen Urkunde mit Ornamentrahmen und Siegel.
  - Druck-Stylesheet `css/print.css`: Bei Klick auf „Drucken / Als PDF speichern“ wird ausschließlich die DIN-A4-Urkunde gedruckt.
- [x] **Task 2.4: M05 - `PRICES.XLS` (Preisvergleich 1986 vs. Heute)**
  - Tabellenkalkulations-UI mit Spalten A–E, Formelzeile (`=SUM(...)`) und Tabellengitter.
  - Datentabelle in `js/data/prices.data.js` (Benzin, Kugel Eis, Bier, Döner, Golf).
- [x] **Task 2.5: M02 - `CHARTS.EXE` (Musik-Hitparade 1986–2026)**
  - Tabellarische Liste der #1-Hits am 25. September der jeweiligen Jahre.
  - Datenbestand in `js/data/charts.data.js` mit Filter-Reitern nach Dekaden (80er, 90er, 00er, 10er, 20er).

---

### Phase 3: Content- & Archiv-Module (Priorität: Mittel)
*Ziel: Befüllung der dokumentenbasierten Wissens- und Nostalgie-Module.*

- [x] **Task 3.1: M04 - `VIP_LIST.DBF` (Geburtstagszwillinge)**
  - Karteikarten- / Datenbankansicht prominenter Persönlichkeiten mit Geburtstag am 25. September.
  - Datensatz in `js/data/vips.data.js` mit Kurzbiografie und Beruf.
- [x] **Task 3.2: M03 - `CULTURE86.DOC` (Popkultur-Archiv)**
  - Textverarbeitungs-Look mit Reitern für Top-Kinofilme, TV-Serien und Musikalben von 1986.
  - Datenbestand in `js/data/culture.data.js`.
- [x] **Task 3.3: M08 - `NEWSWIRE.TXT` (Tages-Ticker 25.09.1986)**
  - Terminal- / Endlospapier-Optik mit grünem Phosphor- oder Monospace-Text.
  - Echte und humorvolle Schlagzeilen des Geburtstages aus `js/data/news.data.js`.
- [x] **Task 3.4: M07 - `HELP1986.HLP` (Überlebens-Handbuch 1986)**
  - Windows-Hilfedatei-Layout mit Navigation/Indexbaum und grün unterstrichenen Hyperlinks.
  - Humorvolle Artikel („Telefonieren mit Wählscheibe“, „Kassettensalat reparieren mit Bleistift“).

---

### Phase 4: Fun, Media & Nostalgie (Priorität: Normal)
*Ziel: Besondere Gimmicks und humorvolle Höhepunkte fertigstellen.*

- [x] **Task 4.1: M13 - `NETSCAPE.EXE` (Web 1.0 Trash-Browser)**
  - Simulierter Netscape Navigator mit Navigationsleiste und URL-Eingabezeile.
  - Trash-Homepage: `<marquee>`-Laufschrift, blinkender Text, animierte Baustellen-GIFs, Besucherzähler, Comic Sans.
  - Isolierte Styles (`.netscape-viewport`), um Nebeneffekte auf den Desktop auszuschließen.
- [x] **Task 4.2: M11 - `OUTLOOK86.MSG` (Posteingang & Fake-Gästebuch)**
  - Mail-Client-Layout (Nachrichtenliste oben, Vorschaufenster unten).
  - Vordefinierte Glückwünsche aus `js/data/guestbook.data.js`.
- [x] **Task 4.3: M10 - `GALLERY.EXE` (Dominik Foto-Galerie)**
  - Überarbeitete Galerie mit 13 Motiven im WebP-Format aus dem Ordner `gallery/`.
  - Rechteckige CSS-Thumbnails, Metadaten (Jahr, Titel, Icon, Farbe) und humorvolle Beschreibungen.
  - Vollbildansicht mit Vorherig-/Nächstes-Navigation analog zum Recycle-Modul.
- [x] **Task 4.4: M06 - `ARCADE86.EXE` (Retro-Games 1986)**
  - Showcase bahnbrechender Spiele des Geburtsjahres (*Zelda*, *Metroid*, *Out Run*).
  - Pixel-Art-Screenshots, Plattformen, Entwickler und Trivia aus `js/data/games.data.js`.
- [x] **Task 4.5: M14 - `Recycle Bin` (Papierkorb Windows 3.1)**
  - Dateiliste der Elemente aus `recycle/` mit Desktop-Icon inkl. Elementanzahl `(5)`.
  - Integrierter Bild- und Textviewer für Grafiken (`.png`) und Prompts-Dokumentation (`.txt`).

---

### Phase 5: Polish & Abnahme
- [x] **Task 5.1: System-Alerts & Easter Eggs**
  - Zeitgesteuertes System-Popup nach 40 Sekunden („Weisheit.exe wurde geladen“).
- [x] **Task 5.2: Cross-Browser & Mobile Verification**
  - Prüfung auf Smartphones (iOS / Android), Tablets und Desktop.
  - Prüfung des Drucklayouts (DIN A4 PDF-Export von `CERTIF.PRN`).
  - Verifikation des fehlerfreien Aufrufs direkt über das Dateisystem (`file://index.html`).

---

## 5. Verifikationsplan

1. **Lokal-Test ohne Server:**
   - Doppelklick auf `index.html` direkt im Windows-Explorer.
   - Überprüfung in Chrome, Firefox und Edge: Keine Konsolen-Fehler, keine CORS-Sperren, alle Module öffnen und schließen sich reibungslos.
2. **Responsive-Test:**
   - Desktop-Auflösung (1920x1080): Zentrierte, formschöne Fenster mit 3D-Rahmen.
   - Mobile-Auflösung (375x667, 390x844): Full-Screen-Modale, flüssiges Scrollen, touch-freundliche Icons.
3. **Druck-Test:**
   - Öffnen von `CERTIF.PRN` -> Klick auf „Drucken“ -> Browser-Druckvorschau zeigt saubere DIN A4 Urkunde ohne Desktop/Taskbar.
