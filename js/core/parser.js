// js/core/parser.js – עיבוד טקסט: @הגדרה@ ו-*bold*

const Parser = (() => {
  // Map irregular Hebrew plurals to their definition IDs
  const IRREGULAR_PLURALS = {
    'גבהים':           'גובה',
    'חוצי_זווית':     'חוצה_זווית',
    'אנכים_אמצעיים':  'אנך_אמצעי',
    'זוויות_מרכזיות': 'זווית_מרכזית',
    'זוויות_היקפיות': 'זווית_היקפית',
  };

  // Hebrew final letters differ in Unicode from their mid-word form; normalize for comparison
  function normFinal(s) {
    return s.replace(/ן/g, 'נ').replace(/ם/g, 'מ').replace(/ף/g, 'פ').replace(/ך/g, 'כ').replace(/ץ/g, 'צ');
  }

  function findDefinitionId(word) {
    if (DEFINITIONS[word]) return word;
    if (IRREGULAR_PLURALS[word]) return IRREGULAR_PLURALS[word];
    for (const [id, def] of Object.entries(DEFINITIONS)) {
      if (def.title === word || def.title.includes(word) || word.includes(def.title.split(' ')[0])) return id;
    }
    // Hebrew morphology: strip common suffixes, normalize final letters, then fuzzy match
    const stem = normFinal(word.replace(/ים$|ות$|ה$|י$|ן$/, ''));
    for (const [id, def] of Object.entries(DEFINITIONS)) {
      const nId       = normFinal(id);
      const titleStem = normFinal(def.title.replace(/ים$|ות$|ה$|י$|ן$/, ''));
      if (nId.includes(stem) || titleStem.includes(stem) || stem.includes(titleStem)) return id;
    }
    return null;
  }

  function parseText(text) {
    text = text.replace(/\{([^/}]+)\/([^}]+)\}/g, (_, num, den) =>
      `<span class="frac"><span class="frac-num">${num}</span><span class="frac-den">${den}</span></span>`);
    text = text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
    text = text.replace(/~([^~]+)~/g, '<span class="frac-inline">$1</span>');
    // ה definite article immediately before a link — include it inside the link
    text = text.replace(/(^|[^א-ת])(ה)@([^@]+)@/g, (_, before, ha, word) => {
      const defId = findDefinitionId(word);
      const display = ha + word.replace(/_/g, ' ');
      return before + (defId
        ? `<span class="def-link" data-def="${defId}">${display}</span>`
        : display);
    });
    // remaining @word@ patterns (no preceding ה)
    text = text.replace(/@([^@]+)@/g, (_, word) => {
      const defId = findDefinitionId(word);
      const display = word.replace(/_/g, ' ');
      return defId
        ? `<span class="def-link" data-def="${defId}">${display}</span>`
        : display;
    });
    const lines = text.split('\n');
    if (lines.length === 1) return text;
    return lines[0] + lines.slice(1).map(l => {
      const cls = l.startsWith('וההפך') ? 'text-line text-line-converse' : 'text-line';
      return `<span class="${cls}">${l}</span>`;
    }).join('');
  }

  function stripLinks(text) {
    return text.replace(/@([^@]+)@/g, '$1').replace(/\*([^*]+)\*/g, '$1');
  }

  return { parseText, stripLinks, findDefinitionId };
})();
