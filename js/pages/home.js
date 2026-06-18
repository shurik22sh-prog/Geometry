// js/pages/home.js – מסך הבית

const PageHome = (() => {
  function render(el) {
    el.innerHTML = `
      <div class="home-hero">
        <h1>לומדים <em>גאומטריה</em><br>בצורה חכמה</h1>
        <p>כל המשפטים, ההגדרות והמשפטים לחטיבת הביניים והתיכון — במקום אחד</p>
      </div>
      <div class="home-grid">
        <div class="home-card primary" data-nav="/theorems">
          <div class="card-icon">📐</div>
          <div class="card-title">משפטים בגאומטריה</div>
          <div class="card-desc">כל המשפטים לפי קטגוריות + הגדרות</div>
        </div>
        <div class="home-card defs" data-nav="/definitions">
          <div class="card-icon">📖</div>
          <div class="card-title">הגדרות בגאומטריה</div>
          <div class="card-desc">כל ההגדרות ועקרי המושגים עם שרטוטים</div>
        </div>
        <div class="home-card learning" data-nav="/learning/1">
          <div class="card-icon">🧠</div>
          <div class="card-title">אני יודע?</div>
          <div class="card-desc">ענה על שאלות ובדוק את עצמך</div>
        </div>
        <div class="home-card learning" data-nav="/learning/2">
          <div class="card-icon">✏️</div>
          <div class="card-title">כל המשפטים נכונים?</div>
          <div class="card-desc">סמן את כל המשפטים הנכונים לכל שרטוט</div>
        </div>
        <div class="home-card coming-soon">
          <div class="card-icon">🎯</div>
          <div class="card-title">למידה 3</div>
          <div class="card-desc">בקרוב</div>
          <span class="badge-soon">בפיתוח</span>
        </div>
      </div>
    `;

    el.querySelectorAll('[data-nav]').forEach(card => {
      card.addEventListener('click', e => Router.navigate(e.currentTarget.dataset.nav));
    });
  }

  return { render };
})();
