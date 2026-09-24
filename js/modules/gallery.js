// Modul: GALLERY.EXE (Dominik Foto-Galerie mit 25 WebP-Motiven)
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
            desc: 'Mit dem DeLorean und 1,21 Gigawatt durch die Zeitlinie, um Dominik 1986 rechtzeitig abzuholen. Echte 80er-Trivia: Michael J. Fox ersetzte damals Eric Stoltz nach fünf Wochen Drehzeit.',
            icon: 'electric_bolt',
            color: '#000080'
        },
        {
            filename: 'cheesy.webp',
            src: 'gallery/cheesy.webp',
            year: '1986',
            title: 'Pastell-Poeten & Preppy-Look',
            category: '80s Preppy-Style',
            desc: 'Poloshirts mit aufgestelltem Kragen und Feinstrickpullover über die Schultern geknotet: Mette, Thomas und Dominik verkörpern den perfekten 80er-Yachtclub-Chic.',
            icon: 'dry_cleaning',
            color: '#ff9ff3'
        },
        {
            filename: 'christmas.webp',
            src: 'gallery/christmas.webp',
            year: '2026',
            title: 'Weihnachtsmarkt - Glühwein & Good Times',
            category: 'Winter & Festtage',
            desc: 'Dampfender Glühwein zwischen glitzernden Festbuden. Ein herzerwärmender Toast auf 40 Jahre!',
            icon: 'celebration',
            color: '#c0392b'
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
            filename: 'desert.webp',
            src: 'gallery/desert.webp',
            year: '2026',
            title: 'Dune: Die Wüsten-Saga',
            category: 'Sci-Fi Epos',
            desc: 'Mette im wehenden Terrakotta-Gewand, Thomas im Trenchcoat und Dominik in dunkler Robe: Wer das Gewürz kontrolliert, beherrscht das Universum – und den 40. Geburtstag!',
            icon: 'landslide',
            color: '#e67e22'
        },
        {
            filename: 'gta_iv.webp',
            src: 'gallery/gta_iv.webp',
            year: '2026',
            title: 'GTA VI',
            category: 'Rockstar Ladescreen',
            desc: 'Fahndungslevel: 5 Sterne! Mette, Thomas und Dominik im unverwechselbaren Cel-Shading-Artwork zurück in Vice City im fiktiven Bundesstaar Leonida.',
            icon: 'sports_esports',
            color: '#8b0000'
        },
        {
            filename: 'gta_online.webp',
            src: 'gallery/gta_online.webp',
            year: '2013',
            title: 'GTA Online - The Virtual Gang',
            category: 'Rockstar Ladescreen',
            desc: '"Dominik\'s Birthday Bash - Level 40 Unlocked!" Kein Heist war jemals lukrativer als 40 Jahre voller bester Erinnerungen.',
            icon: 'sports_esports',
            color: '#006699'
        },
        {
            filename: 'high_fashion.webp',
            src: 'gallery/high_fashion.webp',
            year: '2026',
            title: 'Vogue Editorial: Haute Couture 40',
            category: 'High Fashion',
            desc: 'Dramatisches Studiolicht und kühler Runway-Blick: Dominik im schwarzen Designermantel, Thomas im anthrazitfarbenen Anzug und Mette in skulpturaler Seidentoga.',
            icon: 'diamond',
            color: '#2c3e50'
        },
        {
            filename: 'hip_hop.webp',
            src: 'gallery/hip_hop.webp',
            year: '1986',
            title: 'The Gang - Oldschool Hip Hop Band',
            category: 'Rap & Streetstyle',
            desc: 'Die oldschool Hip Hopper vor nächtlicher Skyline:. Fette Goldketten, dicke Beats und Reime direkt aus der Bronx!',
            icon: 'headphones',
            color: '#9b59b6'
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
            desc: 'Pastell-Sakkos, Jan-Hammer-Synthesizer und Gischt in Biscayne Bay. 1986 prägte diese Serie weltweit Männermode und weiße Testarossas.',
            icon: 'directions_boat',
            color: '#008080'
        },
        {
            filename: 'motorcycle.webp',
            src: 'gallery/motorcycle.webp',
            year: '1986',
            title: 'The Gang - Chapter Cologne',
            category: 'Biker-Kult',
            desc: 'The Gang - Chapter Cologne auf ihren dicken Harleys unterwegs im Wüstenstaub: Mit brüllenden Motoren, Lederkutten und Sonnenuntergang im Rückspiegel cruisen Dominik, Thomas und Mette dem 40. Horizont entgegen.',
            icon: 'two_wheeler',
            color: '#d35400'
        },
        {
            filename: 'mugshot.webp',
            src: 'gallery/mugshot.webp',
            year: '2026',
            title: 'Polizeifoto: Die Gang hinter Gittern',
            category: 'Fahndungsakte',
            desc: 'Aufnahme der Gang nach ihrer Festnahme. Jetzt hat es sie doch erwischt! Tatvorwurf: 40 Jahre unverschämt gute Laune.',
            icon: 'local_police',
            color: '#34495e'
        },
        {
            filename: 'poker_night.webp',
            src: 'gallery/poker_night.webp',
            year: '2026',
            title: 'Las Vegas Poker Nacht',
            category: 'Casino & High Roller',
            desc: 'Im edlen Zwirn bei einer Las Vegas Poker Nacht. Das ungeschriebene Casino-Gesetz: "The Gang - House Always Loses"!',
            icon: 'casino',
            color: '#b8860b'
        },
        {
            filename: 'punks.webp',
            src: 'gallery/punks.webp',
            year: '1986',
            title: 'Punk\'s Not Dead - Est. 1986',
            category: 'Punkrock & Anarchie',
            desc: 'Dominik mit Irokesenschnitt und Nietenhalsband, Thomas in Lederkutte und Mette mit toupierten Haaren und Schottenrock: Drei Rebellen gegen das bürgerliche Altern!',
            icon: 'bolt',
            color: '#e74c3c'
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
            filename: 'spießer.webp',
            src: 'gallery/spießer.webp',
            year: '1986',
            title: 'Die Biedermänner: Spießer-Idyll',
            category: 'Satire & Vintage',
            desc: 'Beige Strickjacken, Schluppenbluse, Krawatte und Hornbrillen: Dominik, Thomas und Mette als Inbegriff des deutschen Spießertums. Samstags Kehrwoche, sonntags Braten!',
            icon: 'chair',
            color: '#795548'
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
            filename: 'starwars.webp',
            src: 'gallery/starwars.webp',
            year: '1986',
            title: 'Star Wars: Die Rückkehr der Geburtstags-Ritter',
            category: 'Sci-Fi Kult',
            desc: 'Im Rasenden Falken: Jedi Dominik mit gezücktem Lichtschwert, Thomas als Han Solo mit Blaster und Mette als Leia an der Schiffskonsole. Möge die 40 mit dir sein!',
            icon: 'rocket_launch',
            color: '#2980b9'
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
        },
        {
            filename: 'wrestling.webp',
            src: 'gallery/wrestling.webp',
            year: '1986',
            title: 'The Gang - Undisputed Champions',
            category: 'WWF Wrestling',
            desc: 'Ein unschlagbares Wrestling Tag-Team: Dominik stemmt stolz den massiven Weltmeister-Gürtel vor funkelndem Hallenfeuerwerk. 40 Jahre und im Ring des Lebens absolut unbesiegt!',
            icon: 'sports_mma',
            color: '#f39c12'
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
                    <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; min-width: 0; gap: 6px;">
                        <!-- Toolbar -->
                        <div class="retro-sunken" style="flex-shrink: 0; display: flex; justify-content: space-between; align-items: center; gap: 4px; background: #e8e8e8; padding: 4px 8px; min-width: 0;">
                            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: bold; min-width: 0;">
                                <span class="material-symbols-outlined" style="font-size: 16px; color: #000080; flex-shrink: 0;">photo_library</span>
                                <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">C:\\GALLERY\\*.WEBP (${items.length} Motive)</span>
                            </div>
                            <div style="font-size: 11px; color: #464653; flex-shrink: 0;">
                                Klick auf ein Bild öffnet Großansicht
                            </div>
                        </div>

                        <!-- Rechteckiges Galerie-Raster (Große Vorschau) -->
                        <div class="retro-sunken" style="flex: 1 1 0; min-height: 0; background: #ffffff; padding: 10px; overflow-y: auto; overflow-x: hidden;">
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr)); gap: 10px;">
                                ${cardsHtml}
                            </div>
                        </div>

                        <!-- Statuszeile -->
                        <div style="flex-shrink: 0; display: flex; justify-content: space-between; gap: 4px; font-size: 11px; padding: 2px 6px; color: #464653;">
                            <span>${items.length} Bildmotive geladen</span>
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

                const stageStyle = isZoomed
                    ? 'flex: 1 1 0; min-height: 0; min-width: 0; background: #111111; padding: 10px; overflow: auto; text-align: center;'
                    : 'flex: 1 1 0; min-height: 0; min-width: 0; background: #111111; padding: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;';

                const imgStyle = isZoomed
                    ? 'max-height: none; max-width: none; width: auto; height: auto; box-shadow: 0 0 15px rgba(0,0,0,0.9); border: 1px solid #767684; cursor: pointer; display: inline-block;'
                    : 'max-height: 100%; max-width: 100%; width: auto; height: auto; object-fit: contain; box-shadow: 0 0 15px rgba(0,0,0,0.9); border: 1px solid #767684; cursor: pointer; display: block;';

                container.innerHTML = `
                    <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; min-width: 0; gap: 6px;">
                        <!-- Navigations-Leiste -->
                        <div class="retro-sunken" style="flex-shrink: 0; display: flex; justify-content: space-between; align-items: center; gap: 6px; background: #e8e8e8; padding: 4px 8px; min-width: 0;">
                            <button id="gallery-back-btn" class="retro-raised-btn" style="padding: 3px 10px; font-size: 11px; font-weight: bold; display: flex; align-items: center; gap: 4px; flex-shrink: 0; white-space: nowrap;">
                                <span class="material-symbols-outlined" style="font-size: 16px;">arrow_back</span>
                                <span>Zurück<span class="gallery-back-rest"> zur Galerie</span></span>
                            </button>

                            <div style="font-size: 12px; font-weight: bold; color: #000080; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: center; flex: 1 1 auto; min-width: 0; padding: 0 4px;">
                                ${selectedIndex + 1} von ${items.length}: ${item.title}
                            </div>

                            <div style="display: flex; gap: 4px; align-items: center; flex-shrink: 0;">
                                <button id="gallery-zoom-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px; display: flex; align-items: center; gap: 2px; white-space: nowrap;" title="Zwischen Fensteranpassung und 100% Originalgröße wechseln">
                                    <span class="material-symbols-outlined" style="font-size: 14px;">${isZoomed ? 'fit_screen' : 'zoom_in'}</span>
                                    <span>${isZoomed ? 'Einpassen' : '1:1 Zoom'}</span>
                                </button>
                                <button id="gallery-prev-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;" title="Vorheriges Motiv">◀</button>
                                <button id="gallery-next-btn" class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;" title="Nächstes Motiv">▶</button>
                            </div>
                        </div>

                        <!-- Große Bildansicht -->
                        <div id="gallery-stage" class="retro-sunken" style="${stageStyle}">
                            <img id="gallery-main-img" src="${item.src}" alt="${item.title}" style="${imgStyle}" title="${isZoomed ? 'Klick zum Einpassen' : 'Klick für 1:1 Zoom'}">
                        </div>

                        <!-- Informations- & Trivia-Box -->
                        <div class="retro-sunken" style="flex-shrink: 0; background: #ffffff; padding: 8px 12px; min-width: 0;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px; gap: 8px; min-width: 0;">
                                <div style="display: flex; align-items: center; gap: 6px; min-width: 0; overflow: hidden; flex: 1 1 auto;">
                                    <span class="material-symbols-outlined" style="font-size: 18px; color: ${item.color}; flex-shrink: 0;">${item.icon}</span>
                                    <span style="font-size: 13px; font-weight: bold; color: #000080; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.title}</span>
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center; flex-shrink: 0;">
                                    <span style="background: #e8e8e8; font-size: 10px; font-weight: bold; padding: 2px 6px; border: 1px solid #767684; white-space: nowrap;">
                                        ${item.category}
                                    </span>
                                    <span style="background: #000080; color: #ffffff; font-size: 10px; font-weight: bold; padding: 2px 6px; white-space: nowrap;">
                                        Jahr: ${item.year}
                                    </span>
                                </div>
                            </div>
                            <p style="font-size: 11px; line-height: 1.4; color: #1a1c1c; margin: 0; max-height: 52px; overflow-y: auto;">
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
