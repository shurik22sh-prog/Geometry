// js/geometry/diagrams/triangle-exterior-angle.js
// Theorem t3: exterior angle of a triangle equals sum of two non-adjacent interior angles

const DiagramTriangleExteriorAngle = (() => {

  function render(cfg = {}) {
    const width    = 480;
    const height   = 330;
    const red      = cfg.color  ?? '#cc2222';
    const lColor   = cfg.lColor ?? '#1a1a1a';
    const arcRbase = 54;  // α — bottom-left interior angle
    const arcRtop  = 42;  // β — top vertex
    const arcRext  = 38;  // γ — exterior angle at B

    // Triangle with extension of AB beyond B
    const A    = Geo.point(60,  240);
    const B    = Geo.point(290, 240);
    const C    = Geo.point(165, 65);
    const Bext = Geo.point(420, 240);

    const parts = [];

    // Triangle sides + extension
    parts.push(GeoRenderer.segment(Geo.segment(A, B),    { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(Geo.segment(B, C),    { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(Geo.segment(A, C),    { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(Geo.segment(B, Bext), { color: lColor, width: 2.5 }));

    function vertexArc(V, P1, P2, r) {
      const d1 = Geo.vecNormalize(Geo.vecFromPoints(V, P1));
      const d2 = Geo.vecNormalize(Geo.vecFromPoints(V, P2));
      return Geo.angleArc(V,
        Geo.point(V.x + d1.x * r, V.y + d1.y * r),
        Geo.point(V.x + d2.x * r, V.y + d2.y * r),
        r);
    }

    const arcA    = vertexArc(A, B, C, arcRbase);
    const arcC    = vertexArc(C, A, B, arcRtop);
    const arcBext = vertexArc(B, C, Bext, arcRext);

    parts.push(GeoRenderer.angleArc(arcA,    { color: red, strokeOnly: true, strokeWidth: 2 }));
    parts.push(GeoRenderer.angleArc(arcC,    { color: red, strokeOnly: true, strokeWidth: 2 }));
    parts.push(GeoRenderer.angleArc(arcBext, { color: red, strokeOnly: true, strokeWidth: 2 }));

    // α — bottom-left, horizontal base → lift up + push right
    parts.push(GeoRenderer.label(
      GeoRenderer.arcLabelPoint(arcA, -arcRbase * 0.5),
      'α', { color: red, bold: true, size: 23, dx: 5, dy: -6 }
    ));
    // β — top vertex, both sides diagonal → no correction needed
    parts.push(GeoRenderer.label(
      GeoRenderer.arcLabelPoint(arcC, -arcRtop * 0.5),
      'β', { color: red, bold: true, size: 23 }
    ));
    // γ — exterior at B, horizontal base → lift up
    parts.push(GeoRenderer.label(
      GeoRenderer.arcLabelPoint(arcBext, -arcRext * 0.5),
      'γ', { color: red, bold: true, size: 23, dy: -6 }
    ));

    parts.push(GeoRenderer.label(
      Geo.point(width / 2, height - 20),
      'α + β = γ',
      { color: red, size: 45, bold: true }
    ));

    return GeoRenderer.svg(width, height, parts.join('\n'), {
      background: 'var(--surface, #f9f9f9)', rx: 10,
    });
  }

  return { render };
})();
