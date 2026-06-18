// js/core/router.js – ניהול ניווט מבוסס hash-URL

const Router = (() => {
  function navigate(path) {
    window.location.hash = '#' + path;
  }

  // Returns URL segments, decoded (supports Hebrew IDs in URLs)
  function current() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return [];
    return hash.split('/').map(part => {
      try { return decodeURIComponent(part); } catch { return part; }
    });
  }

  function init(onChange) {
    window.addEventListener('hashchange', onChange);
    onChange();
  }

  return { navigate, current, init };
})();
