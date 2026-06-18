// js/geometry/diagrams/co-interior-angles.js
// Theorem a5: co-interior (same-side) angles between parallel lines sum to 180°

const DiagramCoInteriorAngles = (() => {

  function render(cfg = {}) {
    const d      = DiagramParallelTransversal.build({ ...cfg, height: 380 });
    const color  = cfg.color  ?? '#cc2222';
    const lColor = cfg.lColor ?? '#1a1a1a';
    const arcR   = cfg.arcR   ?? 38;
    const { width, height, T, P1, P2, L1seg, L2seg, Tseg } = d;

    const tDown = T.dir.y >= 0 ? T.dir : Geo.vec(-T.dir.x, -T.dir.y);
    const tUp   = Geo.vec(-tDown.x, -tDown.y);

    // Co-interior angles: both between the parallel lines, on the SAME side of T.
    // At P1: below L1, right of T (acute, e.g. 55°)
    const arc1 = Geo.angleArc(
      P1,
      Geo.point(P1.x + arcR, P1.y),
      Geo.point(P1.x + tDown.x * arcR, P1.y + tDown.y * arcR),
      arcR
    );
    // At P2: above L2, right of T (obtuse, e.g. 125°) — note: tUp goes upper-LEFT here,
    // so "right of T" above L2 is between rightward and tUp.
    const arc2 = Geo.angleArc(
      P2,
      Geo.point(P2.x + arcR, P2.y),
      Geo.point(P2.x + tUp.x * arcR, P2.y + tUp.y * arcR),
      arcR
    );

    const pad = 48;
    function chev(mx, my) {
      const sz=8, c='#FF8C00', w=2.5;
      return `<polyline points="${(mx-sz).toFixed(1)},${(my-sz).toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)} ${(mx-sz).toFixed(1)},${(my+sz).toFixed(1)}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
    }

    const parts = [];
    parts.push(GeoRenderer.segment(L1seg, { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(L2seg, { color: lColor, width: 2.5 }));
    parts.push(chev((P1.x + width - pad) / 2, P1.y));
    parts.push(chev((P2.x + width - pad) / 2, P2.y));
    parts.push(GeoRenderer.segment(Tseg, { color: '#555', width: 2 }));
    parts.push(GeoRenderer.angleArc(arc1, { color, strokeOnly: true, strokeWidth: 2 }));
    parts.push(GeoRenderer.angleArc(arc2, { color, strokeOnly: true, strokeWidth: 2 }));

    // Labels inside the arcs
    const lp1 = GeoRenderer.arcLabelPoint(arc1, -18);
    const lp2 = GeoRenderer.arcLabelPoint(arc2, -18);
    parts.push(GeoRenderer.label(lp1, 'α', { color, bold: true, size: 17 }));
    parts.push(GeoRenderer.label(lp2, 'β', { color, bold: true, size: 17 }));

    // Formula
    parts.push(GeoRenderer.label(
      Geo.point(width / 2, height - 20),
      'α + β = 180°',
      { color, size: 51, bold: true }
    ));

    return GeoRenderer.svg(width, height, parts.join('\n'), {
      background: 'var(--surface, #f9f9f9)', rx: 10,
    });
  }

  return { render };
})();
