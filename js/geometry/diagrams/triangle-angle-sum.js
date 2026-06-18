// js/geometry/diagrams/triangle-angle-sum.js
// Theorem t2: sum of all angles in a triangle equals 180°

const DiagramTriangleAngleSum = (() => {

  function render(cfg = {}) {
    const width  = 480;
    const height = 360;
    const red    = cfg.color  ?? '#cc2222';
    const lColor = cfg.lColor ?? '#1a1a1a';
    const arcRAB = 54;  // larger arcs for α and β (bottom vertices)
    const arcRC  = 42;  // arc for γ (top vertex)

    const A = Geo.point(70,  240);
    const B = Geo.point(365, 240);
    const C = Geo.point(210, 60);

    const parts = [];

    // Sides
    parts.push(GeoRenderer.segment(Geo.segment(A, B), { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(Geo.segment(B, C), { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(Geo.segment(A, C), { color: lColor, width: 2.5 }));

    function vertexArc(V, P1, P2, r) {
      const d1 = Geo.vecNormalize(Geo.vecFromPoints(V, P1));
      const d2 = Geo.vecNormalize(Geo.vecFromPoints(V, P2));
      return Geo.angleArc(V,
        Geo.point(V.x + d1.x * r, V.y + d1.y * r),
        Geo.point(V.x + d2.x * r, V.y + d2.y * r),
        r);
    }

    const arcA = vertexArc(A, B, C, arcRAB);
    const arcB = vertexArc(B, A, C, arcRAB);
    const arcC = vertexArc(C, A, B, arcRC);

    parts.push(GeoRenderer.angleArc(arcA, { color: red, strokeOnly: true, strokeWidth: 2 }));
    parts.push(GeoRenderer.angleArc(arcB, { color: red, strokeOnly: true, strokeWidth: 2 }));
    parts.push(GeoRenderer.angleArc(arcC, { color: red, strokeOnly: true, strokeWidth: 2 }));

    parts.push(GeoRenderer.label(
      GeoRenderer.arcLabelPoint(arcA, -arcRAB * 0.5),
      'α', { color: red, bold: true, size: 23, dx: 5, dy: -6 }
    ));
    parts.push(GeoRenderer.label(
      GeoRenderer.arcLabelPoint(arcB, -arcRAB * 0.5),
      'β', { color: red, bold: true, size: 23, dx: -5, dy: -6 }
    ));
    parts.push(GeoRenderer.label(
      GeoRenderer.arcLabelPoint(arcC, -arcRC * 0.5),
      'γ', { color: red, bold: true, size: 23 }
    ));

    parts.push(GeoRenderer.label(
      Geo.point(width / 2, height - 20),
      'α + β + γ = 180°',
      { color: red, size: 40, bold: true }
    ));

    return GeoRenderer.svg(width, height, parts.join('\n'), {
      background: 'var(--surface, #f9f9f9)', rx: 10,
    });
  }

  return { render };
})();
