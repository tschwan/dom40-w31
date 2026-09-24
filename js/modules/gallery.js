// Modul: GALLERY.EXE (Dominik Foto-Galerie mit 13 WebP-Motiven)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.gallery = (function () {
    let currentView = 'list'; // 'list' oder 'viewer'
    let selectedIndex = 0;

    const items = [
        {
            filename: 'back_to_the_future.webp',
            src: 'gallery/back_to_the_future.webp',
            year: '1985',
            title: 'Zurück in Dominiks Zukunft',
            category: 'Kultfilm-Parodie',
            desc: 'Mette & Thomas heizen mit dem DeLorean und 1,21 Gigawatt durch die Zeitlinie, um Dominik 1986 rechtzeitig abzuholen. Echte 80er-Trivia: Michael J. Fox ersetzte damals Eric Stoltz nach fünf Wochen Drehzeit.',
            icon: 'electric_bolt',
            color: '#000080'
        },
        {
            filename: 'crocodile_dundee.webp',
            src: 'gallery/crocodile_dundee.webp',
            year: '1986',
            title: 'Crocodile Dundee - Ein Krokodil zum Geburtstag',
            category: 'Kino-Blockbuster',
            desc: '"Das ist doch kein Messer... DAS ist ein Messer!" Thomas und Mette im australischen Outback, um für Dominiks 40. BBQ die dicksten Krokodile und schärfsten Klingen zu besorgen. Trivia: 1986 war dies der zweiterfolgreichste Kinofilm weltweit - direkt hinter Top Gun!',
            icon: 'cruelty_free',
            color: '#b35900'
        },
        {
            filename: 'der_pate.webp',
            src: 'gallery/der_pate.webp',
            year: '1972',
            title: 'Der Pate - Chapter 40: Dominik',
            category: 'Kino-Klassiker',
            desc: '"Ich mache ihm ein Geburtstagsangebot, das er nicht ablehnen kann." Don Thomas und Consigliere Mette leiten die Familiengeschäfte im Schummerlicht - mit Nadelstreifen, Zigarre und standesgemäßer Geburtstagstorte. Marlon Brando steckte sich damals Taschentücher in die Wangen; Dominik lächelt mit 40 einfach so vollkommen majestätisch.',
            icon: 'theater_comedy',
            color: '#4a154b'
        },
        {
            filename: 'gta_iv.webp',
            src: 'gallery/gta_iv.webp',
            year: '2026',
            title: 'GTA VI',
            category: 'Rockstar Ladescreen',
            desc: 'Fahndungslevel: 5 Sterne für 40 Jahre legendäre Partys! Mette, Thomas und Dominik im unverwechselbaren Cel-Shading-Artwork zurück in Vice City im fiktiven Bundesstaar Leonida. Niko Bellic wollte eigentlich Bowling spielen, aber gegen Dominiks Geburtstagsparty hatte selbst er keine Einwände.',
            icon: 'sports_esports',
            color: '#8b0000'
        },
        {
            filename: 'gta_online.webp',
            src: 'gallery/gta_online.webp',
            year: '2013',
            title: 'GTA Online - The Virtual Gang',
            category: 'Rockstar Ladescreen',
            desc: '"Dominik\'s Birthday Bash - Level 40 Unlocked!" Thomas mit High-End-Laptop und Mette mit High-Tech-Drohne vor der glühenden Skyline von Los Santos. Kein Heist war jemals lukrativer als 40 Jahre voller bester Erinnerungen.',
            icon: 'sports_esports',
            color: '#006699'
        },
        {
            filename: 'karate_kid.webp',
            src: 'gallery/karate_kid.webp',
            year: '1986',
            title: 'Karate Kid II - Entscheidung in Okinawa',
            category: 'Kultfilm-Parodie',
            desc: '"Auftragen, polieren!" Sensei Thomas lehrt Schülerin Mette den legendären Kranich-Kick gegen das Älterwerden, während Dominik feiert. Trivia: Der Filmsong "Glory of Love" von Peter Cetera stand 1986 wochenlang auf Platz 1 der weltweiten Hitparaden.',
            icon: 'sports_martial_arts',
            color: '#006666'
        },
        {
            filename: 'miami_vice.webp',
            src: 'gallery/miami_vice.webp',
            year: '1986',
            title: 'Miami Vice - Biscayne Bay Speedboat',
            category: 'TV-Kultserie',
            desc: 'Pastell-Sakkos, Jan-Hammer-Synthesizer und Gischt in Biscayne Bay: Thomas am Steuer des Offshore-Speedboats und Mette mit Aviator-Brille auf heißer Geburtstags-Verfolgungsjagd. 1986 prägte diese Serie weltweit Männermode und weiße Testarossas.',
            icon: 'directions_boat',
            color: '#008080'
        },
        {
            filename: 'schwarzwaldklinik.webp',
            src: 'gallery/schwarzwaldklinik.webp',
            year: '1986',
            title: 'Die Schwarzwaldklinik - Jubiläumsedition',
            category: 'TV-Klassiker',
            desc: 'Chefarzt Professor Thomas, Oberschwester Mette und Dr. Dominik im Glottertal. Diagnose zum 40. Geburtstag: Knacken im Getriebe, aber Geist und Durst absolut kerngesund! Bis zu 28 Millionen Deutsche schalteten 1986 jeden Sonntag ein.',
            icon: 'medical_services',
            color: '#800020'
        },
        {
            filename: 'stand_by_me.webp',
            src: 'gallery/stand_by_me.webp',
            year: '1986',
            title: 'Stand by Me - Das Geheimnis eines Sommers',
            category: 'Kino-Meilenstein',
            desc: '"Freunde fürs Leben." Dominik, Mette und Thomas auf den Bahngleisen nach Castle Rock. Die schönste Hommage an echte Jugend und unerschütterliche Freundschaft aus Dominiks Geburtsjahr 1986.',
            icon: 'diversity_3',
            color: '#805500'
        },
        {
            filename: 'the_fall_guy.webp',
            src: 'gallery/the_fall_guy.webp',
            year: '1986',
            title: 'Ein Colt für alle Fälle - The Fall Guy',
            category: 'TV-Actionserie',
            desc: 'Wenn der GMC-Truck durchs Feuer fliegt, sind Colt Dominik, Jody Mette und Howie Thomas zur Stelle. Keine Explosion ist zu gewaltig und kein Stunt zu gewagt, um 40 Jahre Dominik gebührend zu zelebrieren!',
            icon: 'local_fire_department',
            color: '#cc3300'
        },
        {
            filename: 'the_gang.webp',
            src: 'gallery/the_gang.webp',
            year: '1986',
            title: 'The Gang - Est. 1986 Bronx Edition',
            category: 'Foto-Meilenstein',
            desc: '2 Uhr nachts in der Bronx: Cold Blood Mäddie, Silent Tommy und The Wrecking Ball Dom mit dicken Goldketten am brennenden Ölfass. Am Boden liegt die frische Tageszeitung: "BREAKING NEWS: DOMINIK TURNS 40!" Ein unvergessliches Gruppenfoto der Legenden.',
            icon: 'groups',
            color: '#2f3542'
        },
        {
            filename: 'top_gun.webp',
            src: 'gallery/top_gun.webp',
            year: '1986',
            title: 'Top Gun - Mission 40 (Top Dom)',
            category: 'Kino-Blockbuster',
            desc: '"I feel the need... the need for SPEED (and beer)!" Maverick Thomas und Goose Mette im F-14-Cockpit mit Lederbomberjacken vor den Stars & Stripes. Der erfolgreichste Film aus Dominiks Geburtsjahr 1986!',
            icon: 'flight',
            color: '#002266'
        },
        {
            filename: 'vice_city.webp',
            src: 'gallery/vice_city.webp',
            year: '1986',
            title: 'GTA Vice City - Ocean Beach Vibe',
            category: 'Rockstar Ladescreen',
            desc: 'Türkiser Himmel, Palmen und pinke Neonlichter am Ocean Drive: Tommy und Mette im 80s-Miami-Look. "Video Killed the Radio Star" läuft im Autoradio auf Endlosschleife!. Kleine Randnotiz, die Story spielt im Jahr 1986.',
            icon: 'sports_esports',
            color: '#e056fd'
        }
    ];

    let isZoomed = false;

    return {
        render: function (container) {
            function showList() {
                currentView = 'list';
                isZoomed = false;
                renderComponent();
            }

            function showViewer(idx) {
                if (idx < 0) idx = items.length - 1;
                if (idx >= items.length) idx = 0;
                selectedIndex = idx;
                currentView = 'viewer';
                isZoomed = false;
                renderComponent();
            }

            function renderComponent() {
                if (currentView === 'list') {
                    renderListView();
                } else {
                    renderViewer();
                }
            }

            function renderListView() {
                let cardsHtml = '';
                items.forEach((item, idx) => {
                    cardsHtml += `
                        <div class="gallery-card retro-raised-btn" data-idx="${idx}" style="display: flex; flex-direction: column; padding: 6px; cursor: pointer; text-align: left; background: #c0c0c0;">
                            <!-- Rechteckiges 16:10 CSS-Thumbnail -->
                            <div class="retro-sunken" style="position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden; background: #000000;">
                                <img src="${item.src}" alt="${item.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.15s ease;">
                                <span style="position: absolute; top: 4px; right: 4px; background: rgba(0, 0, 128, 0.85); color: #ffffff; font-size: 10px; font-weight: bold; padding: 1px 5px; border: 1px solid #ffffff;">
                                    ${item.year}
                                </span>
                            </div>
                            <div style="margin-top: 6px; font-size: 12px; font-weight: 700; color: #000000; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                ${item.title}
                            </div>
                            <div style="font-size: 11px; color: #006e6e; margin-top: 2px;">
                                ${item.category}
                            </div>
                        </div>
                    `;
                });

                container.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <!-- Toolbar -->
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 4px; background: #e8e8e8; padding: 4px 8px;" class="retro-sunken">
                            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: bold;">
                                <span class="material-symbols-outlined" style="font-size: 16px; color: #000080;">photo_library</span>
                                <span>C:\\GALLERY\\*.WEBP (13 Motive)</span>
                            </div>
                            <div style="font-size: 11px; color: #464653;">
                                Klick auf ein Bild öffnet die Großansicht
                            </div>
                        </div>

                        <!-- Rechteckiges Galerie-Raster (Große Vorschau) -->
                        <div class="retro-sunken" style="background: #ffffff; padding: 14px; max-height: calc(100vh - 210px); min-height: 200px; overflow-y: auto;">
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr)); gap: 14px;">
                                ${cardsHtml}
                            </div>
                        </div>

                        <!-- Statuszeile -->
                        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px; font-size: 11px; padding: 2px 6px; color: #464653;">
                            <span>13 Bildmotive geladen</span>
                            <span>Format: WebP HD | Dominik 40.0</span>
                        </div>
                    </div>
                `;

                container.querySelectorAll('.gallery-card').forEach(card => {
                    card.addEventListener('click', () => {
                        const idx = parseInt(card.getAttribute('data-idx'), 10);
                        showViewer(idx);
                    });
                });
            }

            function renderViewer() {
                const item = items[selectedIndex];
                if (!item) {
                    showList();
                    return;
                }

                const imgStyle = isZoomed
                    ? 'max-height: none; max-width: none; width: auto; height: auto; box-shadow: 0 0 15px rgba(0,0,0,0.9); border: 1px solid #767684;'
                    : 'max-height: calc(100vh - 240px); max-height: calc(100dvh - 240px); min-height: 180px; max-width: 100%; width: auto; object-fit: contain; box-shadow: 0 0 15px rgba(0,0,0,0.9); border: 1px solid #767684;';

                container.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <!-- Navigations-Leiste -->
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; background: #e8e8e8; padding: 4px 8px;" class="retro-sunken">
                            <button id="gallery-back-btn" class="retro-raised-btn" style="padding: 3px 12px; font-size: 11px; font-weight: bold; display: flex; align-items: center; gap: 4px;">
                                <span class="material-symbols-outlined" style="font-size: 16px;">arrow_back</span>
                                <span>Zurück zur Galerie</span>
                            </button>

                            <div style="font-size: 12px; font-weight: bold; color: #000080; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; min-width: 0;">
                                ${selectedIndex + 1} von ${items.length}: ${item.title}
                            </div>

                            <div style="display: flex; gap: 4px; align-items: center;">
                                <button id="gallery-zoom-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px; display: flex; align-items: center; gap: 2px;" title="Zwischen Fensteranpassung und 100% Originalgröße wechseln">
                                    <span class="material-symbols-outlined" style="font-size: 14px;">${isZoomed ? 'fit_screen' : 'zoom_in'}</span>
                                    <span>${isZoomed ? 'Einpassen' : '1:1 Zoom'}</span>
                                </button>
                                <button id="gallery-prev-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;" title="Vorheriges Motiv">◀</button>
                                <button id="gallery-next-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;" title="Nächstes Motiv">▶</button>
                            </div>
                        </div>

                        <!-- Große Bildansicht -->
                        <div class="retro-sunken" style="background: #111111; padding: 12px; display: flex; align-items: center; justify-content: center; min-height: 440px; max-height: calc(100vh - 250px); overflow: auto;">
                            <img id="gallery-main-img" src="${item.src}" alt="${item.title}" style="${imgStyle} cursor: pointer;" title="Klick zum Umschalten zwischen Fenstergröße und 100% Zoom">
                        </div>

                        <!-- Informations- & Trivia-Box -->
                        <div class="retro-sunken" style="background: #ffffff; padding: 12px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px;">
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <span class="material-symbols-outlined" style="font-size: 20px; color: ${item.color};">${item.icon}</span>
                                    <span style="font-size: 14px; font-weight: bold; color: #000080;">${item.title}</span>
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center;">
                                    <span style="background: #e8e8e8; font-size: 11px; font-weight: bold; padding: 2px 8px; border: 1px solid #767684;">
                                        ${item.category}
                                    </span>
                                    <span style="background: #000080; color: #ffffff; font-size: 11px; font-weight: bold; padding: 2px 8px;">
                                        Jahr: ${item.year}
                                    </span>
                                </div>
                            </div>
                            <p style="font-size: 12px; line-height: 1.5; color: #1a1c1c; margin: 0;">
                                ${item.desc}
                            </p>
                        </div>
                    </div>
                `;

                container.querySelector('#gallery-back-btn')?.addEventListener('click', showList);
                container.querySelector('#gallery-prev-btn')?.addEventListener('click', () => {
                    showViewer(selectedIndex - 1);
                });
                container.querySelector('#gallery-next-btn')?.addEventListener('click', () => {
                    showViewer(selectedIndex + 1);
                });

                function toggleZoom() {
                    isZoomed = !isZoomed;
                    renderViewer();
                }

                container.querySelector('#gallery-zoom-btn')?.addEventListener('click', toggleZoom);
                container.querySelector('#gallery-main-img')?.addEventListener('click', toggleZoom);
            }

            renderComponent();
        }
    };
})();
