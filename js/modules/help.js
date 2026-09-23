// Modul M07: HELP1986.HLP (Alltag & Technik 1986: Ein Handbuch)
window.DOMINIK_MODULES = window.DOMINIK_MODULES || {};

window.DOMINIK_MODULES.help = {
    render: function (container) {
        const articles = window.DOMINIK_DATA?.helpArticles || [];
        let currentArticleId = articles[0]?.id || 'cassette';

        function renderArticle() {
            const article = articles.find(a => a.id === currentArticleId) || articles[0];
            const contentEl = container.querySelector('#help-article-pane');
            if (contentEl && article) {
                contentEl.innerHTML = `
                    <h2 style="font-size: 15px; color: #000080; border-bottom: 2px solid #000080; padding-bottom: 4px; margin-bottom: 12px;">
                        ${article.title}
                    </h2>
                    <div style="font-size: 12px; line-height: 1.6; color: #1a1c1c;">
                        ${article.content}
                    </div>
                `;
            }
            container.querySelectorAll('.help-nav-link').forEach(btn => {
                if (btn.getAttribute('data-id') === currentArticleId) {
                    btn.style.fontWeight = 'bold';
                    btn.style.color = '#000080';
                } else {
                    btn.style.fontWeight = 'normal';
                    btn.style.color = '#008000';
                }
            });
        }

        let navHtml = '';
        articles.forEach(art => {
            navHtml += `
                <div class="help-nav-link" data-id="${art.id}" style="cursor: pointer; color: #008000; text-decoration: underline; padding: 4px 6px; font-size: 11px;">
                    ▶ ${art.title}
                </div>
            `;
        });

        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <!-- WinHelp Symbolleiste -->
                <div style="display: flex; flex-wrap: wrap; gap: 4px; background: #e8e8e8; padding: 4px;" class="retro-sunken">
                    <button class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;">Inhalt</button>
                    <button class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;">Suchen</button>
                    <button class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;">Zurück</button>
                    <button class="retro-raised-btn" style="padding: 2px 8px; font-size: 11px;" onclick="window.print()">Drucken</button>
                </div>

                <!-- 2-Spalten-Layout (Navigation links, Inhalt rechts) -->
                <div class="help-layout-grid" style="display: grid; grid-template-columns: 200px 1fr; gap: 8px;">
                    <div class="retro-sunken" style="background: #ffffff; padding: 8px; max-height: 380px; overflow-y: auto;">
                        <div style="font-weight: 700; font-size: 11px; margin-bottom: 6px; border-bottom: 1px solid #c0c0c0; padding-bottom: 2px;">
                            THEMEN-INDEX:
                        </div>
                        ${navHtml}
                    </div>

                    <div id="help-article-pane" class="retro-sunken" style="background: #ffffff; padding: 14px; max-height: 380px; overflow-y: auto;">
                    </div>
                </div>
            </div>
        `;

        container.querySelectorAll('.help-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                currentArticleId = link.getAttribute('data-id');
                renderArticle();
            });
        });

        renderArticle();
    }
};
