// js/pages/learning.js

const PageLearning = (() => {

  // ── Sound ────────────────────────────────────────────────────────────────────
  const Sound = (() => {
    function tone(freq, dur, type = 'sine', vol = 0.18) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = type; osc.frequency.value = freq;
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.start(); osc.stop(ctx.currentTime + dur);
      } catch (e) {}
    }
    function success()  { tone(660, 0.12); setTimeout(() => tone(880, 0.22), 110); }
    function correct()  { tone(660, 0.10); }
    function failure()  { tone(210, 0.32, 'square', 0.12); }
    return { success, correct, failure };
  })();

  // ── Shared helpers ───────────────────────────────────────────────────────────
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function cleanText(text) {
    return Parser.stripLinks(text).replace(/_/g, ' ');
  }

  function truncate(text, max = 110) {
    const t = cleanText(text);
    return t.length > max ? t.substring(0, max) + '…' : t;
  }

  // ════════════════════════════════════════════════════════════════════════════
  // GAME 1 — "מה המשפט?" (identify theorem from diagram)
  // ════════════════════════════════════════════════════════════════════════════

  function buildQuestions() {
    const pool = ALL_THEOREMS.filter(t => t.diagram && DIAGRAM_RENDERERS[t.diagram]);
    return shuffle(pool).map(correct => {
      const sameCat = pool.filter(t => t.categoryKey === correct.categoryKey && t !== correct);
      const otherCat = pool.filter(t => t.categoryKey !== correct.categoryKey);
      const distractorPool = sameCat.length >= 3 ? sameCat : [...sameCat, ...otherCat];
      const distractors = shuffle(distractorPool).slice(0, 3);
      if (distractors.length < 3) return null;
      return { diagramKey: correct.diagram, correct, options: shuffle([correct, ...distractors]) };
    }).filter(Boolean);
  }

  function renderResult(el, score, total) {
    const pct = Math.round(score / total * 100);
    const msg = pct === 100 ? '!מושלם' : pct >= 70 ? 'כל הכבוד!' : 'כדאי לתרגל עוד';
    el.innerHTML = `
      <div class="game-result">
        <div class="game-result-emoji">${pct === 100 ? '🎉' : pct >= 70 ? '👍' : '💪'}</div>
        <div class="game-result-title">${msg}</div>
        <div class="game-result-score">${score} מתוך ${total} נכונות</div>
        <div class="game-result-bar">
          <div class="game-result-fill" style="width:0%"></div>
        </div>
        <button class="game-restart-btn" id="game-restart">שחק שוב</button>
      </div>
    `;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.querySelector('.game-result-fill').style.width = pct + '%';
    }));
    el.querySelector('#game-restart').addEventListener('click', () => startGame(el));
  }

  function renderQuestion(el, questions, idx, score) {
    const q = questions[idx];
    const total = questions.length;
    const diagramSvg = DIAGRAM_RENDERERS[q.diagramKey]
      ? DIAGRAM_RENDERERS[q.diagramKey]({ color: '#cc2222' })
      : '';

    el.innerHTML = `
      <div class="game-header">
        <div class="game-progress">שאלה ${idx + 1} מתוך ${total}</div>
        <div class="game-score">✓ ${score}</div>
      </div>
      <div class="game-diagram">${diagramSvg}</div>
      <div class="game-question-label">לאיזה משפט מתאים השרטוט?</div>
      <div class="game-options" id="game-options">
        ${q.options.map((opt, i) => `
          <button class="game-option" data-idx="${i}" data-correct="${opt === q.correct}">
            ${truncate(opt.text)}
          </button>
        `).join('')}
      </div>
      <button class="game-next-btn" id="game-next" style="visibility:hidden">
        ${idx + 1 < total ? 'הבא ›' : 'לתוצאות'}
      </button>
    `;

    let answered = false;
    el.querySelectorAll('.game-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const isCorrect = btn.dataset.correct === 'true';
        btn.classList.add(isCorrect ? 'correct' : 'wrong');
        if (isCorrect) { Sound.success(); score++; }
        else Sound.failure();
        el.querySelectorAll('.game-option').forEach(b => { b.disabled = true; });
        setTimeout(() => { el.querySelector('#game-next').style.visibility = 'visible'; }, 500);
      });
    });

    el.querySelector('#game-next').addEventListener('click', () => {
      if (idx + 1 < total) renderQuestion(el, questions, idx + 1, score);
      else renderResult(el, score, total);
    });
  }

  function startGame(el) {
    const questions = buildQuestions();
    if (!questions.length) {
      el.innerHTML = '<p style="text-align:center;color:var(--text-muted)">לא נמצאו שאלות</p>';
      return;
    }
    renderQuestion(el, questions, 0, 0);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // GAME 2 — "אילו משפטים נכונים?" (select all true statements for a shape)
  // ════════════════════════════════════════════════════════════════════════════

  const GAME2_RENDERERS = {
    'game2-parallelogram':  () => DiagramGame2Parallelogram.render({}),
    'game2-isosceles':      () => DiagramGame2Isosceles.render({}),
    'game2-rectangle':      () => DiagramGame2Rectangle.render({}),
    'game2-right-triangle': () => DiagramGame2RightTriangle.render({}),
    'game2-rhombus':        () => DiagramGame2Rhombus.render({}),
  };

  function buildGame2Questions() {
    return shuffle([...GAME2_SCENARIOS]).map(scenario => {
      const { categoryKey, subcat } = scenario.correctSource;
      const correctTheorems = THEOREMS[categoryKey].items
        .filter(t => t.subcat === subcat && t.diagram && DIAGRAM_RENDERERS[t.diagram]);

      if (!correctTheorems.length) return null;

      const totalCount = 8 + Math.floor(Math.random() * 8); // 8–15
      const numFalse = Math.max(0, totalCount - correctTheorems.length);
      const falseSubset = shuffle([...scenario.falseStatements]).slice(0, numFalse);

      const statements = shuffle([
        ...correctTheorems.map(t => ({ text: cleanText(t.text), isCorrect: true  })),
        ...falseSubset.map(text  => ({ text,                     isCorrect: false })),
      ]);

      return {
        diagramKey:   scenario.diagramKey,
        title:        scenario.title,
        statements,
        totalCorrect: correctTheorems.length,
      };
    }).filter(Boolean);
  }

  function renderGame2Result(el, found, total, startGame2Fn) {
    const pct = Math.round(found / total * 100);
    const msg = pct === 100 ? '!מושלם' : pct >= 70 ? 'כל הכבוד!' : 'כדאי לתרגל עוד';
    el.innerHTML = `
      <div class="game-result">
        <div class="game-result-emoji">${pct === 100 ? '🎉' : pct >= 70 ? '👍' : '💪'}</div>
        <div class="game-result-title">${msg}</div>
        <div class="game-result-score">מצאת ${found} נכונים מתוך ${total}</div>
        <div class="game-result-bar">
          <div class="game-result-fill" style="width:0%"></div>
        </div>
        <button class="game-restart-btn" id="g2-restart">שחק שוב</button>
      </div>
    `;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.querySelector('.game-result-fill').style.width = pct + '%';
    }));
    el.querySelector('#g2-restart').addEventListener('click', startGame2Fn);
  }

  function renderGame2Question(el, questions, idx, totalScore) {
    const q = questions[idx];
    const total = questions.length;
    const diagramSvg = GAME2_RENDERERS[q.diagramKey]
      ? GAME2_RENDERERS[q.diagramKey]()
      : '';

    let foundCorrect = 0;
    const needed = q.totalCorrect;

    el.innerHTML = `
      <div class="game-header">
        <div class="game-progress">שרטוט ${idx + 1} מתוך ${total}</div>
        <div class="game-score g2-counter" id="g2-counter">מצאת 0 מתוך ${needed}</div>
      </div>
      <div class="game-diagram">${diagramSvg}</div>
      <div class="game2-title">${q.title}</div>
      <div class="game2-label">סמן את כל המשפטים הנכונים:</div>
      <div class="game2-statements" id="g2-stmts">
        ${q.statements.map((s, i) => `
          <button class="game2-stmt" data-idx="${i}" data-correct="${s.isCorrect}">
            ${s.text}
          </button>
        `).join('')}
      </div>
      <div class="game2-actions">
        <button class="game2-reveal-btn" id="g2-reveal">גלה תשובות</button>
        <button class="game-next-btn g2-next" id="g2-next" style="visibility:hidden">
          ${idx + 1 < total ? 'הבא ›' : 'לתוצאות'}
        </button>
      </div>
    `;

    function updateCounter() {
      el.querySelector('#g2-counter').textContent = `מצאת ${foundCorrect} מתוך ${needed}`;
    }

    function showNext() {
      el.querySelector('#g2-next').style.visibility = 'visible';
    }

    el.querySelectorAll('.game2-stmt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
        const isCorrect = btn.dataset.correct === 'true';
        if (isCorrect) {
          btn.classList.add('correct');
          btn.disabled = true;
          foundCorrect++;
          totalScore.found++;
          Sound.correct();
          updateCounter();
          if (foundCorrect === needed) {
            Sound.success();
            setTimeout(showNext, 300);
          }
        } else {
          btn.classList.add('wrong');
          btn.disabled = true;
          Sound.failure();
        }
      });
    });

    el.querySelector('#g2-reveal').addEventListener('click', () => {
      el.querySelectorAll('.game2-stmt').forEach(btn => {
        if (btn.dataset.correct === 'true' && !btn.classList.contains('correct')) {
          btn.classList.add('revealed');
        }
        btn.disabled = true;
      });
      el.querySelector('#g2-reveal').disabled = true;
      showNext();
    });

    el.querySelector('#g2-next').addEventListener('click', () => {
      if (idx + 1 < total) renderGame2Question(el, questions, idx + 1, totalScore);
      else renderGame2Result(el, totalScore.found, totalScore.total, () => startGame2(el));
    });
  }

  function startGame2(el) {
    const questions = buildGame2Questions();
    if (!questions.length) {
      el.innerHTML = '<p style="text-align:center;color:var(--text-muted)">לא נמצאו שאלות</p>';
      return;
    }
    const totalScore = {
      found: 0,
      total: questions.reduce((s, q) => s + q.totalCorrect, 0),
    };
    renderGame2Question(el, questions, 0, totalScore);
  }

  // ── Public render ────────────────────────────────────────────────────────────
  function render(el, moduleId) {
    if (moduleId === '1') {
      startGame(el);
    } else if (moduleId === '2') {
      startGame2(el);
    } else {
      el.innerHTML = `
        <div class="placeholder-screen">
          <div class="icon">🚧</div>
          <h2>למידה ${moduleId ?? ''}</h2>
          <p>מודול זה נמצא בבנייה ויהיה זמין בקרוב.</p>
        </div>
      `;
    }
  }

  return { render };
})();
