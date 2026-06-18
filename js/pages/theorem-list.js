// js/pages/theorem-list.js – רשימת משפטים בקטגוריה

const PageTheoremList = (() => {
  function getItems(categoryKey) {
    return categoryKey === 'all' ? ALL_THEOREMS : (THEOREMS[categoryKey]?.items ?? []);
  }

  function getTitle(categoryKey, subcatKey) {
    if (subcatKey && subcatKey !== 'all') {
      return THEOREMS[categoryKey]?.subcats?.find(s => s.key === subcatKey)?.label ?? subcatKey;
    }
    if (categoryKey === 'all') return 'כל המשפטים';
    return THEOREMS[categoryKey]?.title ?? '';
  }

  // Extract a short display label from theorem text
  function cardLabel(text) {
    // Named theorems start with *title* → extract just the name
    const bold = text.match(/^\*([^*]+)\*/);
    if (bold) return bold[1].replace(/:$/, '').trim();
    // Unnamed: first line only, strip @links, remove underscores, limit length
    const firstLine = text.split('\n')[0];
    const stripped = Parser.stripLinks(firstLine).replace(/_/g, ' ').trim();
    return stripped.length > 55 ? stripped.substring(0, 54) + '…' : stripped;
  }

  // Render a thumbnail SVG for a theorem card
  function thumbFor(item) {
    try {
      let svg = null;
      if (item.template && TemplateRegistry.has(item.template)) {
        const scene = TemplateRegistry.get(item.template).build({ ...item.config });
        svg = SceneRenderer.render(scene, item.config || {});
      } else if (item.diagram && DIAGRAM_RENDERERS[item.diagram]) {
        svg = DIAGRAM_RENDERERS[item.diagram](item.config || {});
      }
      return svg ? `<div class="theorem-thumb">${svg}</div>` : '';
    } catch {
      return '';
    }
  }

  function renderItems(container, visibleItems, allItems, categoryKey) {
    if (visibleItems.length === 0) {
      container.innerHTML = '<div class="no-results">לא נמצאו תוצאות</div>';
      return;
    }

    container.innerHTML = visibleItems.map(item => {
      const originalIdx = allItems.indexOf(item);
      const itemCategory = item.categoryKey ?? categoryKey;
      const label = cardLabel(item.text);
      return `
        <div class="theorem-item" data-index="${originalIdx}" data-category="${itemCategory}">
          ${thumbFor(item)}
          <div class="theorem-item-body">
            <div class="theorem-num">#${originalIdx + 1}</div>
            <div class="theorem-preview">${label}</div>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.theorem-item').forEach(el => {
      el.addEventListener('click', () => {
        Router.navigate(`/theorems/${categoryKey}/${el.dataset.index}`);
      });
    });
  }

  function render(el, categoryKey, subcatKey) {
    const allItems = getItems(categoryKey);
    const baseItems = (subcatKey && subcatKey !== 'all')
      ? allItems.filter(item => item.subcat === subcatKey)
      : allItems;

    el.innerHTML = `
      <div class="list-header">
        <div class="section-title">${getTitle(categoryKey, subcatKey)}</div>
      </div>
      <div class="search-wrap">
        <input class="search-input" type="text" placeholder="חיפוש משפט…" id="search-theorems">
      </div>
      <div class="theorem-list" id="theorem-list-container" data-category="${categoryKey}"></div>
    `;

    const container = el.querySelector('#theorem-list-container');
    renderItems(container, baseItems, allItems, categoryKey);

    el.querySelector('#search-theorems').addEventListener('input', (e) => {
      const query = e.target.value.trim();
      const filtered = query
        ? baseItems.filter(item => Parser.stripLinks(item.text).includes(query))
        : baseItems;
      renderItems(container, filtered, allItems, categoryKey);
    });
  }

  return { render, renderItems };
})();
