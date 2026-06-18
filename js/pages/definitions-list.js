// js/pages/definitions-list.js – רשימת הגדרות עם חיפוש

const PageDefinitionsList = (() => {
  // ViewBox overrides: zoom into the content area for diagrams that have lots of empty space
  const THUMB_VIEWBOX = {
    'def-bisector':        '60 25 370 150',
    'def-point-line-dist': '40 35 420 185',
    'def-parallel-lines':  '40 47 420 130',
    'def-perp-bisector':   '70 35 350 155',
  };

  function thumbFor(def) {
    if (!def.diagram || !DIAGRAM_RENDERERS[def.diagram]) return '';
    try {
      let svg = DIAGRAM_RENDERERS[def.diagram]({});
      const vb = THUMB_VIEWBOX[def.diagram];
      if (vb) svg = svg.replace(/viewBox="[^"]*"/, `viewBox="${vb}"`);
      return `<div class="def-thumb">${svg}</div>`;
    } catch {
      return '';
    }
  }

  function renderItems(container, entries) {
    if (entries.length === 0) {
      container.innerHTML = '<div class="no-results">לא נמצאו תוצאות</div>';
      return;
    }

    container.innerHTML = entries.map(([id, def]) => `
      <div class="def-item" data-def-id="${id}">
        ${thumbFor(def)}
        <div class="def-item-title">${def.title}</div>
      </div>
    `).join('');

    container.querySelectorAll('.def-item').forEach(el => {
      el.addEventListener('click', () => {
        Router.navigate(`/definitions/${encodeURIComponent(el.dataset.defId)}`);
      });
    });
  }

  function render(el) {
    const allEntries = Object.entries(DEFINITIONS);
    let activeCat = null;

    const catCounts = {};
    DEFINITION_CATEGORIES.forEach(c => {
      catCounts[c.key] = allEntries.filter(([, d]) => [d.cat].flat().includes(c.key)).length;
    });

    el.innerHTML = `
      <div class="section-title">הגדרות</div>
      <div class="section-subtitle">כל ההגדרות בגאומטריה — לחץ על הגדרה לפירוט</div>
      <div class="def-cat-grid" id="def-cat-grid">
        <button class="def-cat-btn active" data-cat="">
          <span class="def-cat-icon">📚</span>
          <span class="def-cat-label">הכל</span>
          <span class="def-cat-count">${allEntries.length} הגדרות</span>
        </button>
        ${DEFINITION_CATEGORIES.map(c => `
          <button class="def-cat-btn" data-cat="${c.key}">
            <span class="def-cat-icon">${c.icon}</span>
            <span class="def-cat-label">${c.label}</span>
            <span class="def-cat-count">${catCounts[c.key]} הגדרות</span>
          </button>
        `).join('')}
      </div>
      <div class="search-wrap">
        <input class="search-input" type="text" placeholder="חיפוש הגדרה…" id="search-defs">
      </div>
      <div class="definitions-list" id="defs-container"></div>
    `;

    const container = el.querySelector('#defs-container');
    const searchEl = el.querySelector('#search-defs');

    function getVisible() {
      const query = searchEl.value.trim();
      let entries = activeCat
        ? allEntries.filter(([, d]) => [d.cat].flat().includes(activeCat))
        : allEntries;
      if (query) entries = entries.filter(([, d]) => d.title.includes(query) || d.text.includes(query));
      return entries;
    }

    function refresh() {
      renderItems(container, getVisible());
    }

    el.querySelector('#def-cat-grid').addEventListener('click', (e) => {
      const btn = e.target.closest('.def-cat-btn');
      if (!btn) return;
      el.querySelectorAll('.def-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat || null;
      searchEl.value = '';
      refresh();
    });

    searchEl.addEventListener('input', refresh);

    refresh();
  }

  return { render };
})();
