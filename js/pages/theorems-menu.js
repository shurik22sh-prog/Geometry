// js/pages/theorems-menu.js – תפריט קטגוריות משפטים

const PageTheoremsMenu = (() => {
  function render(el) {
    const categoryCards = Object.keys(THEOREMS).map(key => {
      const { icon, label } = THEOREMS[key].meta ?? { icon: '📌', label: THEOREMS[key].title };
      return `
        <div class="category-card" data-nav="/theorems/${key}">
          <div class="cat-icon ${key}">${icon}</div>
          <div class="cat-info">
            <div class="cat-title">${label}</div>
            <div class="cat-count">${THEOREMS[key].items.length} משפטים</div>
          </div>
        </div>
      `;
    }).join('');

    el.innerHTML = `
      <div class="section-title">משפטים בגאומטריה</div>
      <div class="section-subtitle">בחר קטגוריה לעיון במשפטים</div>
      <div class="category-grid">
        <div class="category-card all" data-nav="/theorems/all">
          <div class="cat-icon all">📋</div>
          <div class="cat-info">
            <div class="cat-title">כל המשפטים</div>
            <div class="cat-count">${ALL_THEOREMS.length} משפטים</div>
          </div>
        </div>
        ${categoryCards}
        <div class="category-card definitions" data-nav="/definitions">
          <div class="cat-icon defs">📖</div>
          <div class="cat-info">
            <div class="cat-title">הגדרות</div>
            <div class="cat-count">${Object.keys(DEFINITIONS).length} הגדרות</div>
          </div>
        </div>
      </div>
    `;

    el.querySelectorAll('[data-nav]').forEach(card => {
      card.addEventListener('click', () => Router.navigate(card.dataset.nav));
    });
  }

  return { render };
})();
