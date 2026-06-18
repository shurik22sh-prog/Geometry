// js/main.js – אתחול, ניתוב, header, מעברים, ניווט מקלדת

// ===== PAGE TRANSITION =====
function triggerTransition(el) {
  el.classList.remove('page-enter');
  void el.offsetWidth; // force reflow so the animation re-fires
  el.classList.add('page-enter');
}

// ===== KEYBOARD NAVIGATION (theorem detail only) =====
let _keyNavCleanup = null;

function attachKeyNav(categoryKey, index) {
  if (_keyNavCleanup) _keyNavCleanup();
  const items = categoryKey === 'all' ? ALL_THEOREMS : (THEOREMS[categoryKey]?.items ?? []);
  const handler = (e) => {
    // RTL: ArrowLeft = forward (next), ArrowRight = backward (prev)
    if (e.key === 'ArrowLeft' && index < items.length - 1) {
      Router.navigate(`/theorems/${categoryKey}/${index + 1}`);
    } else if (e.key === 'ArrowRight' && index > 0) {
      Router.navigate(`/theorems/${categoryKey}/${index - 1}`);
    }
  };
  document.addEventListener('keydown', handler);
  _keyNavCleanup = () => document.removeEventListener('keydown', handler);
}

function clearKeyNav() {
  if (_keyNavCleanup) { _keyNavCleanup(); _keyNavCleanup = null; }
}

// ===== BREADCRUMB =====
function getCategoryLabel(key) {
  if (key === 'all') return 'כל המשפטים';
  return THEOREMS[key]?.meta?.label ?? key;
}

function updateHeader(parts) {
  const btnBack = document.getElementById('btn-back');
  const breadcrumb = document.getElementById('breadcrumb');
  const [section, sub, idx] = parts;

  btnBack.style.display = parts.length > 0 ? 'flex' : 'none';

  if (parts.length === 0) { breadcrumb.innerHTML = ''; return; }

  const crumbs = [];

  if (section === 'theorems') {
    crumbs.push({ label: 'משפטים', path: '/theorems' });
    if (sub) {
      const hasSub = THEOREMS[sub]?.subcats;
      crumbs.push({ label: getCategoryLabel(sub), path: (idx !== undefined || hasSub) ? `/theorems/${sub}` : null });
      if (idx !== undefined) {
        const numIdx = parseInt(idx, 10);
        if (isNaN(numIdx)) {
          // idx is a sub-category key
          const subcatLabel = THEOREMS[sub]?.subcats?.find(s => s.key === idx)?.label ?? idx;
          crumbs.push({ label: subcatLabel, path: null });
        } else {
          crumbs.push({ label: `משפט ${numIdx + 1}`, path: null });
        }
      }
    }
  } else if (section === 'definitions') {
    crumbs.push({ label: 'הגדרות', path: sub ? '/definitions' : null });
    if (sub) {
      crumbs.push({ label: DEFINITIONS[sub]?.title ?? sub, path: null });
    }
  } else if (section === 'learning') {
    crumbs.push({ label: sub ? `למידה ${sub}` : 'למידה', path: null });
  }

  breadcrumb.innerHTML = crumbs.map(c =>
    c.path
      ? `<button class="breadcrumb-link" data-path="${c.path}">${c.label}</button>`
      : `<span>${c.label}</span>`
  ).join(' › ');

  breadcrumb.querySelectorAll('[data-path]').forEach(btn => {
    btn.addEventListener('click', () => Router.navigate(btn.dataset.path));
  });
}

// ===== ROUTER =====
function onRouteChange() {
  const parts = Router.current();
  const el = document.getElementById('main-content');
  const [section, sub, idx] = parts;

  el.className = 'content'; // reset per-page layout classes
  clearKeyNav();
  updateHeader(parts);

  if (!section) {
    PageHome.render(el);
  } else if (section === 'theorems') {
    if (!sub) {
      PageTheoremsMenu.render(el);
    } else if (idx === undefined) {
      if (THEOREMS[sub]?.subcats) PageTriangleSubcats.render(el, sub);
      else                        PageTheoremList.render(el, sub);
    } else {
      const i = parseInt(idx, 10);
      if (isNaN(i)) {
        const subcat = THEOREMS[sub]?.subcats?.find(s => s.key === idx);
        if (subcat?.summaryDiagram) PageSubcatWithDiagram.render(el, sub, idx, subcat.summaryDiagram, subcat.summaryLayout ?? 'left');
        else                        PageTheoremList.render(el, sub, idx);
      } else {
        PageTheoremDetail.render(el, sub, i);
        attachKeyNav(sub, i);
      }
    }
  } else if (section === 'definitions') {
    if (!sub) PageDefinitionsList.render(el);
    else      PageDefinitionDetail.render(el, sub);
  } else if (section === 'learning') {
    PageLearning.render(el, sub);
  } else {
    PageHome.render(el);
  }

  triggerTransition(el);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  Modal.init();
  document.querySelector('.logo').addEventListener('click', () => Router.navigate('/'));
  document.getElementById('btn-back').addEventListener('click', () => history.back());
  Router.init(onRouteChange);
});
