// js/geometry/diagrams/corresponding-angles.js
// Theorem a3: corresponding angles between parallel lines are equal (F-shape)

const DiagramCorrespondingAngles = (() => {

  function render(cfg = {}) {
    const d        = DiagramParallelTransversal.build(cfg);
    const lColor = cfg.lColor ?? '#1a1a1a';
    const red    = cfg.color  ?? '#cc2222';
    const arcR   = cfg.arcR   ?? 38;
    const { width, height, T, P1, P2, L1seg, L2seg, Tseg } = d;

    const tDown = T.dir.y >= 0 ? T.dir : Geo.vec(-T.dir.x, -T.dir.y);

    // α — at P1, interior (below L1, right of T)
    const arc1 = Geo.angleArc(
      P1,
      Geo.point(P1.x + arcR, P1.y),
      Geo.point(P1.x + tDown.x * arcR, P1.y + tDown.y * arcR),
      arcR
    );
    // β — at P2, exterior (below L2, same relative position = corresponding)
    const arc2 = Geo.angleArc(
      P2,
      Geo.point(P2.x + arcR, P2.y),
      Geo.point(P2.x + tDown.x * arcR, P2.y + tDown.y * arcR),
      arcR
    );

    const parts = [];
    parts.push(GeoRenderer.segment(L1seg, { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(L2seg, { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(Tseg, { color: '#555', width: 2 }));

    parts.push(GeoRenderer.angleArc(arc1, { color: red, noLegs: true, strokeWidth: 2, fillOpacity: 0.20 }));
    parts.push(GeoRenderer.angleArc(arc2, { color: red, noLegs: true, strokeWidth: 2, fillOpacity: 0.20 }));

    return GeoRenderer.svg(width, height, parts.join('\n'), {
      background: 'var(--surface, #f9f9f9)', rx: 10,
    });
  }

  return { render };
})();
