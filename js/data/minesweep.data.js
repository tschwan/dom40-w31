// Minesweeper 40.0 Daten und Fallen für Dominik OS 1986
window.DOMINIK_DATA = window.DOMINIK_DATA || {};

window.DOMINIK_DATA.minesweep = {
    title: 'Minesweeper 40.0 - Das Lebens-Minenfeld',
    hazards: [
        { name: 'Hexenschuss', desc: 'Plötzlicher Schmerz beim Versuch, die Schnürsenkel zu binden.' },
        { name: 'Rotwein-Kater', desc: 'Zwei Gläser Merlot verursachen 48 Stunden Bettruhe.' },
        { name: 'Graues Barthaar', desc: 'Beim Rasieren entdeckt – markiert den Beginn der Silberrücken-Ära.' },
        { name: 'Couch-Koma um 21:15', desc: 'Noch vor der Tagesschau-Wetterkarte tief und fest eingeschlafen.' },
        { name: 'Speisekarten-Distanz', desc: 'Die Arme sind plötzlich zu kurz, um die kleine Schrift im Restaurant zu lesen.' },
        { name: 'Bausparvertrag', desc: 'Plötzliches Interesse an Zinsbindungen und Wohn-Riester.' },
        { name: 'Kombi-Sehnsucht', desc: 'Du ertappst dich dabei, wie du das Ladevolumen eines Skoda Octavia bewunderst.' },
        { name: 'Orthopädie-Sohlen', desc: 'Style ist egal – Hauptsache Fußbett und gute Dämpfung.' },
        { name: '"Früher war alles besser"', desc: 'Der Satz rutschte unkontrolliert im Gespräch mit Zwanzigjährigen heraus.' },
        { name: 'Zugluft-Allergie', desc: 'Ein gekipptes Fenster im Nebenraum führt sofort zu Nackensteifigkeit.' },
        { name: 'Pflanzen-Fachgespräch', desc: 'Du diskutierst 45 Minuten über die richtige Erde für Monstera-Pflanzen.' },
        { name: 'Kaffee-Suchtstufe 4', desc: 'Ohne den dritten Espresso ist der Tag technisch nicht funktionsfähig.' }
    ],
    levels: {
        beginner: { rows: 9, cols: 9, mines: 10, label: 'Anfänger (9x9)' },
        medium: { rows: 12, cols: 12, mines: 20, label: 'Fortgeschritten (12x12)' }
    }
};
