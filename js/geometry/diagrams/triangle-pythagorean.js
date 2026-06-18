// js/geometry/diagrams/triangle-pythagorean.js
// Theorem t22: in a right triangle a² + b² = c²

const DiagramTrianglePythagorean = (() => {

  function render(cfg = {}) {
    const width     = 420;
    const height    = 400;
    const lColor    = cfg.lColor ?? '#1a1a1a';
    const sideColor = '#2D5FA6';

    // Right angle at C (bottom-left)
    const C = Geo.point(80,  248);
    const A = Geo.point(80,  65);   // top-left (vertical leg = b)
    const B = Geo.point(340, 248);  // bottom-right (horizontal leg = a)

    // Sides: a = CB (horizontal leg), b = CA (vertical leg), c = AB (hypotenuse)
    const segA = Geo.segment(C, B);
    const segB = Geo.segment(C, A);
    const segC = Geo.segment(A, B);

    // Centroid for outward label offsets
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

    // Sides
    parts.push(GeoRenderer.segment(segA, { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(segB, { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(segC, { color: lColor, width: 2.5 }));

    // Right-angle mark at C
    const sq = 18;
    parts.push(GeoRenderer.segment(
      Geo.segment(Geo.point(C.x + sq, C.y), Geo.point(C.x + sq, C.y - sq)),
      { color: '#cc2222', width: 1.5 }
    ));
    parts.push(GeoRenderer.segment(
      Geo.segment(Geo.point(C.x + sq, C.y - sq), Geo.point(C.x, C.y - sq)),
      { color: '#cc2222', width: 1.5 }
    ));

    // Side labels — blue
    const lpA = outwardLabel(C, B, 24);
    const lpB = outwardLabel(C, A, 24);
    const lpC = outwardLabel(A, B, 26);
    parts.push(GeoRenderer.label(lpA, 'a', { size: 32, bold: true, color: sideColor, dx: -20 }));
    parts.push(GeoRenderer.label(lpB, 'b', { size: 32, bold: true, color: sideColor }));
    parts.push(GeoRenderer.label(lpC, 'c', { size: 32, bold: true, color: sideColor }));

    // Formula — blue
    parts.push(GeoRenderer.label(
      Geo.point(width / 2, height - 20),
      'a² + b² = c²',
      { color: sideColor, size: 45, bold: true }
    ));

    return GeoRenderer.svg(width, height, parts.join('\n'), {
      background: 'var(--surface, #f9f9f9)', rx: 10,
    });
  }

  return { render };
})();
