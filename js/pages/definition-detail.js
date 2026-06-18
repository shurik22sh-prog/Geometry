// js/pages/definition-detail.js – תצוגת הגדרה בודדת

const PageDefinitionDetail = (() => {
  function render(el, defId) {
    const def = DEFINITIONS[defId];
    if (!def) { Router.navigate('/definitions'); return; }

    const allIds = Object.keys(DEFINITIONS);
    const index = allIds.indexOf(defId);
    const total = allIds.length;
    const isFirst = index === 0;
    const isLast = index === total - 1;

    const diagramSvg = def.diagram && DIAGRAM_RENDERERS[def.diagram]
      ? DIAGRAM_RENDERERS[def.diagram]({ color: '#cc2222' })
      : null;

    el.innerHTML = `
      <div class="theorem-nav">
        <button class="nav-btn" id="btn-prev" ${isFirst ? 'disabled' : ''}>‹ הקודם</button>
        <div class="nav-counter">${index + 1} / ${total}</div>
        <button class="nav-btn" id="btn-next" ${isLast ? 'disabled' : ''}>הבא ›</button>
      </div>
      <div class="definition-card ${diagramSvg ? 'has-diagram' : ''}">
        <div class="def-main">
          <div class="def-title">${def.title}</div>
          <div class="def-body">${Parser.parseText(def.text)}</div>
        </div>
        ${diagramSvg ? `<div class="def-diagram">${diagramSvg}</div>` : ''}
      </div>
    `;

    if (!isFirst) {
      el.querySelector('#btn-prev').addEventListener('click', () => {
        Router.navigate('/definitions/' + encodeURIComponent(allIds[index - 1]));
      });
    }
    if (!isLast) {
      el.querySelector('#btn-next').addEventListener('click', () => {
        Router.navigate('/definitions/' + encodeURIComponent(allIds[index + 1]));
      });
    }
  }

  return { render };
})();
