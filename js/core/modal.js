// js/core/modal.js – חלון הגדרה קופץ

const Modal = (() => {
  function open(defId) {
    const def = DEFINITIONS[defId];
    if (!def) return;
    document.getElementById('modal-title').textContent = def.title;
    document.getElementById('modal-body').innerHTML = Parser.parseText(def.text);
    document.getElementById('modal-full-def').dataset.defId = defId;
    document.getElementById('modal-overlay').classList.add('open');
  }

  function close() {
    document.getElementById('modal-overlay').classList.remove('open');
  }

  function init() {
    document.getElementById('modal-close').addEventListener('click', close);

    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) close();
    });

    document.getElementById('modal-full-def').addEventListener('click', () => {
      const defId = document.getElementById('modal-full-def').dataset.defId;
      close();
      Router.navigate(`/definitions/${encodeURIComponent(defId)}`);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Global delegation: def-link clicks anywhere in the document
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.def-link');
      if (link) open(link.dataset.def);
    });
  }

  return { open, close, init };
})();
