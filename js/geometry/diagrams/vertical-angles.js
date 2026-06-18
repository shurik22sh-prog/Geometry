// js/geometry/diagrams/vertical-angles.js
// Theorem a2: vertical (opposite) angles are equal

const DiagramVerticalAngles = (() => {

  function build(cfg = {}) {
    const {
      width  = 400,
      height = 320,
      angle1 = 30,
      angle2 = -55,
      arcR   = 38,
    } = cfg;

    const V   = Geo.point(width / 2, height / 2);
    const ext = 160;

    const LA = Geo.lineFromAngle(V, angle1);
    const LB = Geo.lineFromAngle(V, angle2);

    const dA1 = LA.dir;
    const dA2 = Geo.vec(-LA.dir.x, -LA.dir.y);
    const dB1 = LB.dir;
    const dB2 = Geo.vec(-LB.dir.x, -LB.dir.y);

    const LAseg = Geo.segment(
      Geo.point(V.x - dA1.x * ext, V.y - dA1.y * ext),
      Geo.point(V.x + dA1.x * ext, V.y + dA1.y * ext)
    );
    const LBseg = Geo.segment(
      Geo.point(V.x - dB1.x * ext, V.y - dB1.y * ext),
      Geo.point(V.x + dB1.x * ext, V.y + dB1.y * ext)
    );

    // α — right region (between dA1 going lower-right and dB1 going upper-right)
    const arc1 = Geo.angleArc(
      V,
      Geo.point(V.x + dA1.x * arcR, V.y + dA1.y * arcR),
      Geo.point(V.x + dB1.x * arcR, V.y + dB1.y * arcR),
      arcR
    );
    // β — left region (vertical opposite of arc1)
    const arc3 = Geo.angleArc(
      V,
      Geo.point(V.x + dA2.x * arcR, V.y + dA2.y * arcR),
      Geo.point(V.x + dB2.x * arcR, V.y + dB2.y * arcR),
      arcR
    );

    return { width, height, V, LAseg, LBseg, arc1, arc3 };
  }

  function render(cfg = {}) {
    const d        = build(cfg);
    const lColor = cfg.lColor ?? '#1a1a1a';
    const red    = cfg.color  ?? '#cc2222';
    const parts  = [];

    parts.push(GeoRenderer.segment(d.LAseg, { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(d.LBseg, { color: lColor, width: 2.5 }));

    // Red arc outlines
    parts.push(GeoRenderer.angleArc(d.arc1, { color: red, strokeOnly: true, strokeWidth: 1.8 }));
    parts.push(GeoRenderer.angleArc(d.arc3, { color: red, strokeOnly: true, strokeWidth: 1.8 }));

    // Greek letter labels in red — placed inside the arc
    const lp1 = GeoRenderer.arcLabelPoint(d.arc1, -18);
    const lp3 = GeoRenderer.arcLabelPoint(d.arc3, -18);
    parts.push(GeoRenderer.label(lp1, 'α', { color: red, bold: true, size: 17 }));
    parts.push(GeoRenderer.label(lp3, 'α', { color: red, bold: true, size: 17 }));

    return GeoRenderer.svg(d.width, d.height, parts.join('\n'), {
      background: 'var(--surface, #f9f9f9)', rx: 10,
    });
  }

  return { build, render };
})();
