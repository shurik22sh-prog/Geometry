// js/geometry/diagrams/triangle-inequality.js
// Theorem t1: the sum of any two sides of a triangle is greater than the third side

const DiagramTriangleInequality = (() => {

  function render(cfg = {}) {
    const width  = 380;
    const height = 500;
    const lColor   = cfg.lColor ?? '#1a1a1a';
    const sideColor = '#2D5FA6';

    // Scalene triangle vertices
    const A = Geo.point(60,  248);
    const B = Geo.point(320, 248);
    const C = Geo.point(210, 65);

    // Sides: a = BC (right), b = AC (left), c = AB (bottom)
    const segA = Geo.segment(B, C);
    const segB = Geo.segment(A, C);
    const segC = Geo.segment(A, B);

    // Centroid — used to push side labels outward
    const cx = (A.x + B.x + C.x) / 3;
    const cy = (A.y + B.y + C.y) / 3;

    function outwardLabel(p1, p2, offset) {
      const mx  = (p1.x + p2.x) / 2;
      const my  = (p1.y + p2.y) / 2;
      const dx  = mx - cx;
      const dy  = my - cy;
      const len = Math.hypot(dx, dy);
      return Geo.point(mx + (dx / len) * offset, my + (dy / len) * offset);
    }

    const parts = [];

    // Sides — all dark
    parts.push(GeoRenderer.segment(segA, { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(segB, { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(segC, { color: lColor, width: 2.5 }));

    // Side labels — blue, pushed outward from centroid
    const lpA = outwardLabel(B, C, 26);
    const lpB = outwardLabel(A, C, 26);
    const lpC = outwardLabel(A, B, 16);
    parts.push(GeoRenderer.label(lpA, 'a', { size: 36, bold: true, color: sideColor }));
    parts.push(GeoRenderer.label(lpB, 'b', { size: 36, bold: true, color: sideColor }));
    parts.push(GeoRenderer.label(lpC, 'c', { size: 36, bold: true, color: sideColor }));

    // Formulas below the triangle
    const mid = width / 2;
    parts.push(GeoRenderer.label(Geo.point(mid, 348), 'a + b > c', { size: 35, bold: true, color: sideColor }));
    parts.push(GeoRenderer.label(Geo.point(mid, 390), 'a + c > b', { size: 35, bold: true, color: sideColor }));
    parts.push(GeoRenderer.label(Geo.point(mid, 432), 'b + c > a', { size: 35, bold: true, color: sideColor }));

    return GeoRenderer.svg(width, height, parts.join('\n'), {
      background: 'var(--surface, #f9f9f9)', rx: 10,
    });
  }

  return { render };
})();
