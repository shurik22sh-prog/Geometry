// js/geometry/diagrams/parallel-transversal.js
// Template: two parallel lines cut by a transversal.
// All coordinates are derived mathematically — nothing is hardcoded.

const DiagramParallelTransversal = (() => {

  // ── Geometry phase ────────────────────────────────────────────────────────────
  // Returns a pure data object; no SVG, no DOM.

  function build(cfg = {}) {
    const {
      width    = 480,
      height   = 320,
      angleDeg = 55,   // transversal angle from horizontal (degrees)
      spacing  = 110,  // perpendicular distance between the two parallel lines
      arcR     = 38,   // radius used for angle-arc highlights
    } = cfg;

    // Two horizontal parallel lines symmetrically placed around the canvas centre.
    const cy = height / 2;
    const L1 = Geo.lineFromAngle(Geo.point(0, cy - spacing / 2), 0); // upper
    const L2 = Geo.lineFromAngle(Geo.point(0, cy + spacing / 2), 0); // lower

    // Transversal through the canvas centre at the requested angle.
    const T = Geo.lineFromAngle(Geo.point(width / 2, cy), angleDeg);

    // Intersection points — computed, not assumed.
    const P1 = Geo.intersect(T, L1);
    const P2 = Geo.intersect(T, L2);
    if (!P1 || !P2) throw new Error('Transversal is parallel to the lines.');

    // Clip all three lines to the visible canvas with a margin.
    const pad  = 48;
    const L1seg = Geo.segment(Geo.point(pad, L1.anchor.y), Geo.point(width - pad, L1.anchor.y));
    const L2seg = Geo.segment(Geo.point(pad, L2.anchor.y), Geo.point(width - pad, L2.anchor.y));

    const t1  = Geo.lineParam(T, P1);
    const t2  = Geo.lineParam(T, P2);
    const ext = pad * 1.6;
    const Tseg = Geo.segment(
      Geo.pointOnLine(T, Math.min(t1, t2) - ext),
      Geo.pointOnLine(T, Math.max(t1, t2) + ext)
    );

    // ── Alternate interior angles ─────────────────────────────────────────────
    // tDown: transversal direction that points from L1 toward L2 (downward in SVG).
    // Because SVG Y increases downward, "toward L2" means positive dy.
    const tDown = T.dir.y >= 0 ? T.dir : Geo.vec(-T.dir.x, -T.dir.y);
    const tUp   = Geo.vec(-tDown.x, -tDown.y);

    // At P1 (upper line): the interior angle is between
    //   · the rightward ray along L1, and
    //   · the transversal ray going down toward P2.
    // This is the region between the two lines on the right side of T.
    const arc1 = Geo.angleArc(
      P1,
      Geo.point(P1.x + arcR, P1.y),                          // rightward
      Geo.point(P1.x + tDown.x * arcR, P1.y + tDown.y * arcR), // down along T
      arcR
    );

    // At P2 (lower line): the interior angle is between
    //   · the leftward ray along L2, and
    //   · the transversal ray going up toward P1.
    // This is the region between the two lines on the left side of T.
    const arc2 = Geo.angleArc(
      P2,
      Geo.point(P2.x - arcR, P2.y),                        // leftward
      Geo.point(P2.x + tUp.x * arcR, P2.y + tUp.y * arcR), // up along T
      arcR
    );

    return { width, height, L1, L2, T, P1, P2, L1seg, L2seg, Tseg, arc1, arc2 };
  }

  // ── Rendering phase ───────────────────────────────────────────────────────────
  // Consumes a diagram object (from build()) and returns an SVG string.

  // Midpoint on the arc's angle bisector, offset outward by `extra` pixels.
  function _arcLabelPoint(arc, extra) {
    const v1  = Geo.vecNormalize(Geo.vecFromPoints(arc.vertex, arc.startPt));
    const v2  = Geo.vecNormalize(Geo.vecFromPoints(arc.vertex, arc.endPt));
    const mid = Geo.vecNormalize(Geo.vecAdd(v1, v2));
    return Geo.point(
      arc.vertex.x + mid.x * (arc.radius + extra),
      arc.vertex.y + mid.y * (arc.radius + extra)
    );
  }

  function render(cfg = {}) {
    const d           = build(cfg);
    const color       = cfg.color       ?? '#2D5FA6';
    const lColor      = cfg.lColor      ?? '#1a1a1a';
    const lineLabels  = cfg.lineLabels  ?? true;   // ℓ₁ / ℓ₂
    const angleLabels = cfg.angleLabels ?? true;   // α at each arc
    const angleValue  = cfg.angleValue  ?? true;   // "α = X°" footer
    const parts       = [];

    const pad = 48;
    function chev(mx, my) {
      const sz=8, c='#FF8C00', w=2.5;
      return `<polyline points="${(mx-sz).toFixed(1)},${(my-sz).toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)} ${(mx-sz).toFixed(1)},${(my+sz).toFixed(1)}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
    }

    // Parallel lines
    parts.push(GeoRenderer.segment(d.L1seg, { color: lColor, width: 2.5 }));
    parts.push(GeoRenderer.segment(d.L2seg, { color: lColor, width: 2.5 }));
    parts.push(chev((d.P1.x + d.width - pad) / 2, d.P1.y));
    parts.push(chev((d.P2.x + d.width - pad) / 2, d.P2.y));

    // Transversal
    parts.push(GeoRenderer.segment(d.Tseg, { color: '#555', width: 2 }));

    // Angle arcs — identical colour signals the angles are equal
    parts.push(GeoRenderer.angleArc(d.arc1, { color, noLegs: true, strokeWidth: 2, fillOpacity: 0.20 }));
    parts.push(GeoRenderer.angleArc(d.arc2, { color, noLegs: true, strokeWidth: 2, fillOpacity: 0.20 }));


    if (angleLabels) {
      const lp1 = _arcLabelPoint(d.arc1, 11);
      const lp2 = _arcLabelPoint(d.arc2, 11);
      parts.push(GeoRenderer.label(lp1, 'α', { color, bold: true, size: 15 }));
      parts.push(GeoRenderer.label(lp2, 'α', { color, bold: true, size: 15 }));
    }

    if (lineLabels) {
      parts.push(GeoRenderer.label(Geo.point(26, d.P1.y), 'ℓ₁',
        { color: lColor, bold: true, size: 14 }));
      parts.push(GeoRenderer.label(Geo.point(26, d.P2.y), 'ℓ₂',
        { color: lColor, bold: true, size: 14 }));
    }

    if (angleValue) {
      parts.push(GeoRenderer.label(
        Geo.point(d.width / 2, d.height - 10),
        `α = ${d.arc1.deg.toFixed(1)}°`,
        { color: '#666', size: 12 }
      ));
    }

    return GeoRenderer.svg(d.width, d.height, parts.join('\n'), {
      background: 'var(--surface, #f9f9f9)',
      rx: 10,
    });
  }

  return { build, render };
})();
