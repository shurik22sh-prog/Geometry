// js/pages/subcat-with-diagram.js – sub-category with a summary diagram (left split or top stack)

const PageSubcatWithDiagram = (() => {
  function render(el, categoryKey, subcatKey, diagramKey, layout='left') {
    const allItems = THEOREMS[categoryKey]?.items ?? [];
    const subcatLabel = THEOREMS[categoryKey]?.subcats?.find(s => s.key === subcatKey)?.label ?? subcatKey;
    const baseItems = allItems.filter(item => item.subcat === subcatKey);

    let diagramSvg = '';
    if (DIAGRAM_RENDERERS[diagramKey]) {
      try { diagramSvg = DIAGRAM_RENDERERS[diagramKey]({color:'#cc2222'}); } catch(e) {}
    }

    if (layout === 'top-left') {
      el.innerHTML = `
        <div class="section-title" style="margin-bottom:1.4rem">${subcatLabel}</div>
        <div class="subcat-top-diagram subcat-top-diagram--small">${diagramSvg}</div>
        <div class="theorem-list theorem-list--3col theorem-list--shifted" id="theorem-list-container"></div>
      `;
    } else if (layout === 'top') {
      el.innerHTML = `
        <div class="section-title" style="margin-bottom:1.4rem">${subcatLabel}</div>
        <div class="subcat-top-diagram" data-subcat="${subcatKey}">${diagramSvg}</div>
        <div class="theorem-list theorem-list--3col" id="theorem-list-container"></div>
      `;
    } else {
      el.classList.add('layout-wide-left');
      el.innerHTML = `
        <div class="section-title" style="margin-bottom:1.2rem">${subcatLabel}</div>
        <div class="subcat-split">
          <div class="subcat-split-diagram" data-subcat="${subcatKey}">
            ${diagramSvg}
          </div>
          <div class="subcat-split-list">
            <div class="search-wrap">
              <input class="search-input" type="text" placeholder="חיפוש משפט…" id="search-theorems">
            </div>
            <div class="theorem-list" id="theorem-list-container"></div>
          </div>
        </div>
      `;
      const searchEl = el.querySelector('#search-theorems');
      const container = el.querySelector('#theorem-list-container');
      PageTheoremList.renderItems(container, baseItems, allItems, categoryKey);
      searchEl.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        const filtered = query
          ? baseItems.filter(item => Parser.stripLinks(item.text).includes(query))
          : baseItems;
        PageTheoremList.renderItems(container, filtered, allItems, categoryKey);
      });
      return;
    }

    const container = el.querySelector('#theorem-list-container');
    PageTheoremList.renderItems(container, baseItems, allItems, categoryKey);
  }

  return { render };
})();
