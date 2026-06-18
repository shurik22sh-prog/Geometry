// js/geometry/diagrams/supplementary-angles.js
// Theorem a1: adjacent angles on a straight line sum to 180°

const DiagramSupplementaryAngles = (() => {

  function build(cfg = {}) {
    const {
      width    = 480,
      height   = 320,
      rayAngle = 55,
      arcR     = 44,
    } = cfg;

    const V   = Geo.point(width / 2, height / 2 - 20);
    const pad = 56;

    const Lseg = Geo.segment(Geo.point(pad, V.y), Geo.point(width - pad, V.y));

    // Ray going upward-right: negate angle so it goes above the line in SVG
    const rayRad = (-rayAngle * Math.PI) / 180;
    const rayDir = Geo.vec(Math.cos(rayRad), Math.sin(rayRad));
    const Rayseg = Geo.segment(V, Geo.point(V.x + rayDir.x * 130, V.y + rayDir.y * 130));

    // α — acute angle between rightward and the ray
    const arc1 = Geo.angleArc(
      V,
      Geo.point(V.x + arcR, V.y),
      Geo.point(V.x + rayDir.x * arcR, V.y + rayDir.y * arcR),
      arcR
    );

    // β — obtuse angle between the ray and leftward (slightly smaller radius to avoid overlap)
    const r2 = arcR - 10;
    const arc2 = Geo.angleArc(
      V,
      Geo.point(V.x + rayDir.x * r2, V.y + rayDir.y * r2),
      Geo.point(V.x - r2, V.y),
      r2
    );

    return { width, height, V, Lseg, Rayseg, arc1, arc2 };
  }

  function render(cfg = {}) {
    const d      = build(cfg);
    const lColor   = cfg.lColor ?? '#1a1a1a';
    const red      = cfg.color  ?? '#cc2222';
    const parts    = [];

    parts.push(GeoRenderer.segment(d.Lseg,   { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(d.Rayseg, { color: '#555', width: 2 }));

    // Red arc outlines
    parts.push(GeoRenderer.angleArc(d.arc1, { color: red, strokeOnly: true, strokeWidth: 1.8 }));
    parts.push(GeoRenderer.angleArc(d.arc2, { color: red, strokeOnly: true, strokeWidth: 1.8 }));

    // Greek letter labels in red — placed inside the arc
    const lp1 = GeoRenderer.arcLabelPoint(d.arc1, -20);
    const lp2 = GeoRenderer.arcLabelPoint(d.arc2, -15);
    parts.push(GeoRenderer.label(lp1, 'α', { color: red, bold: true, size: 17 }));
    parts.push(GeoRenderer.label(lp2, 'β', { color: red, bold: true, size: 17 }));

    // Formula below — large, bold, red
    parts.push(GeoRenderer.label(
      Geo.point(d.width / 2, d.height - 20),
      'α + β = 180°',
      { color: red, size: 51, bold: true }
    ));

    return GeoRenderer.svg(d.width, d.height, parts.join('\n'), {
      background: 'var(--surface, #f9f9f9)', rx: 10,
    });
  }

  return { build, render };
})();
