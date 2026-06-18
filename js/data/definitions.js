// js/data/definitions.js – כל ההגדרות

const DEFINITION_CATEGORIES = [
  { key: 'lines',     label: 'זוויות וישרים', icon: '∠' },
  { key: 'triangles', label: 'משולשים',        icon: '△' },
  { key: 'quads',     label: 'מרובעים',        icon: '▱' },
  { key: 'circles',   label: 'מעגלים',         icon: '○' },
];

const DEFINITIONS = {
  "זווית_ישרה": {
    title: "זווית ישרה",
    text: "זווית בעלת 90°.",
    diagram: 'def-right-angle',
    cat: 'lines'
  },
  "חוצה": {
    title: "חוצה",
    text: "מחלק לשני חלקים שווים (מהמילה \"חצי\").",
    diagram: 'def-bisector',
    cat: 'lines'
  },
  "ישרים_מאונכים": {
    title: "ישרים מאונכים / ניצבים",
    text: "ישרים שיש ביניהם זווית ישרה.",
    diagram: 'def-perpendicular',
    cat: 'lines'
  },
  "מרחק_נקודה_מישר": {
    title: "מרחק של נקודה מישר",
    text: "הניצב לישר מאותה נקודה.",
    diagram: 'def-point-line-dist',
    cat: 'lines'
  },
  "ישרים_מקבילים": {
    title: "ישרים מקבילים",
    text: "ישרים שאין ביניהם נקודת חיתוך.",
    diagram: 'def-parallel-lines',
    cat: 'lines'
  },
  "גובה": {
    title: "גובה",
    text: "קטע במשולש היוצא מקודקוד ומאונך לצלע שמולו.",
    diagram: 'def-altitude',
    cat: 'triangles'
  },
  "תיכון": {
    title: "תיכון",
    text: "קטע במשולש היוצא מקודקוד וחוצה את הצלע שמולו.",
    diagram: 'def-median',
    cat: 'triangles'
  },
  "חוצה_זווית": {
    title: "חוצה זווית",
    text: "קטע במשולש החוצה את הזווית של הקודקוד ממנו הוא יוצא.",
    diagram: 'def-angle-bisector-def',
    cat: 'triangles'
  },
  "אנך_אמצעי": {
    title: "אנך אמצעי",
    text: "קטע החוצה צלע במשולש וגם מאונך לה. *חשוב:* לא בהכרח שאנך אמצעי יצא מקודקוד המשולש.",
    diagram: 'def-perp-bisector',
    cat: ['triangles', 'lines']
  },
  "קטע_אמצעים_משולש": {
    title: "קטע אמצעים במשולש",
    text: "מחבר מרכזי שתיים מצלעות המשולש.",
    diagram: 'triangle-midpoint-segment',
    cat: 'triangles'
  },
  "משולש_שווה_שוקיים": {
    title: "משולש שווה שוקיים",
    text: "משולש שבו יש שתי צלעות שוות. הצלעות השוות נקראות *שוקיים* והצלע השלישית נקראת *בסיס*. הזוויות מול השוקיים נקראות *זוויות בסיס* והזווית שבין הצלעות השוות נקראת *זווית הראש*.",
    diagram: 'triangle-isosceles',
    cat: 'triangles'
  },
  "משולש_שווה_צלעות": {
    title: "משולש שווה צלעות",
    text: "משולש ששלושת צלעותיו שוות. כל הזוויות במשולש שווה צלעות הן בנות 60°.",
    diagram: 'def-equilateral',
    cat: 'triangles'
  },
  "משולש_ישר_זווית": {
    title: "משולש ישר זווית",
    text: "משולש שבו אחת הזוויות היא זווית ישרה.",
    diagram: 'def-right-triangle',
    cat: 'triangles'
  },
  "משולשים_חופפים": {
    title: "משולשים חופפים",
    text: "שני משולשים שכל צלעותיהם וזוויותיהם שוות אחת לשנייה בהתאמה הם משולשים חופפים.",
    diagram: 'def-congruent-triangles',
    cat: 'triangles'
  },
  "משולשים_דומים": {
    title: "משולשים דומים",
    text: "שני משולשים שכל זוויותיהם שוות בהתאמה וקיים יחס שווה בין שלושת הזוגות של הצלעות המתאימות נקראים משולשים דומים.",
    diagram: 'triangle-similarity',
    cat: 'triangles'
  },
  "מקבילית": {
    title: "מקבילית",
    text: "מרובע שבו יש שני זוגות של צלעות המקבילות זו לזו.",
    diagram: 'parallelogram-parallel',
    cat: 'quads'
  },
  "מלבן": {
    title: "מלבן",
    text: "מרובע שכל זוויותיו הן זוויות ישרות.",
    diagram: 'def-rectangle',
    cat: 'quads'
  },
  "מעוין": {
    title: "מעוין",
    text: "מרובע שבו כל הצלעות שוות.",
    diagram: 'def-rhombus',
    cat: 'quads'
  },
  "ריבוע": {
    title: "ריבוע",
    text: "מרובע שבו כל הצלעות שוות וכל הזוויות ישרות.",
    diagram: 'square-definition',
    cat: 'quads'
  },
  "דלתון": {
    title: "דלתון",
    text: "מרובע בעל שני זוגות של צלעות סמוכות שוות.",
    diagram: 'kite-definition',
    cat: 'quads'
  },
  "טרפז": {
    title: "טרפז",
    text: "מרובע בעל רק זוג אחד של צלעות מקבילות. הצלעות המקבילות נקראות *בסיסים* והצלעות הלא מקבילות נקראות *שוקיים*.",
    diagram: 'trapezoid-definition',
    cat: 'quads'
  },
  "טרפז_שווה_שוקיים": {
    title: "טרפז שווה שוקיים",
    text: "@טרפז@ שבו שתי השוקיים שוות זו לזו.",
    diagram: 'trapezoid-isosceles',
    cat: 'quads'
  },
  "קטע_אמצעים_טרפז": {
    title: "קטע אמצעים בטרפז",
    text: "מחבר את אמצעי שוקי הטרפז.",
    diagram: 'trapezoid-midsegment',
    cat: 'quads'
  },
  "מעגל": {
    title: "מעגל",
    text: "אוסף כל הנקודות הנמצאות במרחק שווה מנקודה מסוימת. נקודה זו נקראת מרכז המעגל.",
    diagram: 'def-circle',
    cat: 'circles'
  },
  "רדיוס": {
    title: "רדיוס מעגל",
    text: "קטע המחבר את מרכז המעגל עם נקודה כלשהי על המעגל.",
    diagram: 'circle-radii',
    cat: 'circles'
  },
  "מיתר": {
    title: "מיתר",
    text: "קטע המחבר בין שתי נקודות שונות על המעגל.",
    diagram: 'def-chord',
    cat: 'circles'
  },
  "קשת": {
    title: "קשת",
    text: "חלק מהמעגל הכלוא בין שתי נקודות.",
    diagram: 'def-arc',
    cat: 'circles'
  },
  "קוטר": {
    title: "קוטר",
    text: "מיתר העובר דרך מרכז המעגל.",
    diagram: 'circle-diameter',
    cat: 'circles'
  },
  "גזרה": {
    title: "גזרה",
    text: "חלק משטח העיגול הכלוא בין שני רדיוסים לבין קשת על המעגל.",
    diagram: 'def-sector',
    cat: 'circles'
  },
  "זווית_מרכזית": {
    title: "זווית מרכזית במעגל",
    text: "זווית הנוצרת בין שני רדיוסים של המעגל.",
    diagram: 'def-central-angle',
    cat: 'circles'
  },
  "זווית_היקפית": {
    title: "זווית היקפית",
    text: "זווית שנוצרת בין שני מיתרים שנקודת החיתוך שלהם נמצאת על המעגל.",
    diagram: 'circle-inscribed-angles',
    cat: 'circles'
  },
  "משיק": {
    title: "משיק למעגל",
    text: "ישר היוצא מנקודה הנמצאת מחוץ למעגל ונוגע במעגל בנקודה אחת בלבד, שהיא נקודת ההשקה.",
    diagram: 'def-tangent',
    cat: 'circles'
  },
  "משולש_חסום_במעגל": {
    title: "משולש חסום במעגל",
    text: "משולש שכל הקודקודים שלו נמצאים על המעגל.",
    diagram: 'def-circumscribed-tri',
    cat: 'circles'
  },
  "מעגל_חסום_במשולש": {
    title: "מעגל חסום במשולש",
    text: "מעגל ששלושת הצלעות של המשולש משיקות לו.",
    diagram: 'def-inscribed-tri',
    cat: 'circles'
  },
  "מרובע_חסום_במעגל": {
    title: "מרובע חסום במעגל",
    text: "מרובע שכל הקודקודים שלו נמצאים על המעגל.",
    diagram: 'def-cyclic-quad',
    cat: 'circles'
  },
  "מעגל_חסום_במרובע": {
    title: "מעגל חסום במרובע",
    text: "מעגל שכל צלעות המרובע משיקות לו.",
    diagram: 'def-tangent-quad',
    cat: 'circles'
  }
};
