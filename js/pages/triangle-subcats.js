// js/pages/triangle-subcats.js – דף ראשי לקטגוריה עם תת-קטגוריות: כפתורים + רשימה מלאה

const PageTriangleSubcats = (() => {
  function render(el, categoryKey) {
    const cat = THEOREMS[categoryKey];
    const allItems = cat.items ?? [];
    // Show sub-category buttons (skip 'all' – all theorems already listed below)
    const subcats = (cat.subcats ?? []).filter(sc => sc.key !== 'all');

    const cards = subcats.map(sc => {
      const count = allItems.filter(item => item.subcat === sc.key).length;
      return `
        <div class="category-card" data-nav="/theorems/${categoryKey}/${sc.key}">
          <div class="cat-icon ${categoryKey}">${sc.icon}</div>
          <div class="cat-info">
            <div class="cat-title">${sc.label}</div>
            <div class="cat-count">${count} משפטים</div>
          </div>
        </div>
      `;
    }).join('');

    el.innerHTML = `
      <div class="section-title">${cat.title}</div>
      <div class="subcat-grid" style="margin-bottom:2rem">
        ${cards}
      </div>
      <div class="search-wrap">
        <input class="search-input" type="text" placeholder="חיפוש משפט…" id="search-theorems">
      </div>
      <div class="theorem-list" id="theorem-list-container"></div>
    `;

    el.querySelectorAll('[data-nav]').forEach(card => {
      card.addEventListener('click', () => Router.navigate(card.dataset.nav));
    });

    const container = el.querySelector('#theorem-list-container');
    PageTheoremList.renderItems(container, allItems, allItems, categoryKey);

    el.querySelector('#search-theorems').addEventListener('input', (e) => {
      const query = e.target.value.trim();
      const filtered = query
        ? allItems.filter(item => Parser.stripLinks(item.text).includes(query))
        : allItems;
      PageTheoremList.renderItems(container, filtered, allItems, categoryKey);
    });
  }

  return { render };
})();
