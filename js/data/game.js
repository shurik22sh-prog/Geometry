// js/data/game.js – שאלות למשחק "אני יודע?"
// כל שאלה: diagramKey = המפתח לשרטוט ולתשובה הנכונה, optionKeys = 4 אפשרויות (כולל הנכונה)

const GAME_QUESTIONS = [
  {
    id: 'g1',
    diagramKey: 'parallel-transversal',
    optionKeys: ['parallel-transversal', 'co-interior-angles', 'vertical-angles', 'supplementary-angles']
  },
  {
    id: 'g2',
    diagramKey: 'co-interior-angles',
    optionKeys: ['co-interior-angles', 'parallel-transversal', 'supplementary-angles', 'vertical-angles']
  },
  {
    id: 'g3',
    diagramKey: 'triangle-angle-sum',
    optionKeys: ['triangle-angle-sum', 'triangle-exterior-angle', 'triangle-isosceles', 'quad-angle-sum']
  },
  {
    id: 'g4',
    diagramKey: 'triangle-pythagorean',
    optionKeys: ['triangle-pythagorean', 'triangle-angle-sum', 'triangle-30-60-90', 'triangle-right-median']
  },
  {
    id: 'g5',
    diagramKey: 'triangle-isosceles',
    optionKeys: ['triangle-isosceles', 'triangle-equal-angles-sides', 'triangle-angle-sum', 'triangle-exterior-angle']
  },
  {
    id: 'g6',
    diagramKey: 'triangle-midpoint-segment',
    optionKeys: ['triangle-midpoint-segment', 'triangle-thales', 'triangle-medians', 'triangle-midpoint-half']
  },
  {
    id: 'g7',
    diagramKey: 'parallelogram-diagonals',
    optionKeys: ['parallelogram-diagonals', 'rectangle-diagonals', 'parallelogram-opp-sides', 'rhombus-perp-diagonals']
  },
  {
    id: 'g8',
    diagramKey: 'rhombus-perp-diagonals',
    optionKeys: ['rhombus-perp-diagonals', 'rhombus-diag-bisects', 'parallelogram-diagonals', 'rectangle-diagonals']
  },
  {
    id: 'g9',
    diagramKey: 'circle-central-inscribed',
    optionKeys: ['circle-central-inscribed', 'circle-equal-inscribed', 'circle-thales', 'circle-inscribed-angles']
  },
  {
    id: 'g10',
    diagramKey: 'circle-thales',
    optionKeys: ['circle-thales', 'circle-central-inscribed', 'circle-equal-inscribed', 'circle-tangent-radius']
  },
];
