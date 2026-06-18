// Template: ParallelTransversal
//
// Geometry: two horizontal parallel lines cut by a transversal.
// All points are derived from constraints — no hardcoded coordinates.
//
// Config:
//   width         {number}  SVG viewport width                              (default 500)
//   height        {number}  SVG viewport height                             (default 320)
//   parallelAngle {number}  angle of the parallel lines, degrees            (default 0)
//   angleDeg      {number}  angle of the transversal, degrees               (default 55)
//   spacing       {number}  perpendicular distance between parallel lines   (default 110)
//   highlight     {string}  which angle pair to mark — see HIGHLIGHT_MAP below
//   showLineLabels{boolean} show ℓ₁ / ℓ₂ labels                            (default true)
//
// Returns: Scene { viewport, elements[] }

const ParallelTransversalTemplate = (() => {

  // ─────────────────────────────────────────────────────────────
  // Public API
  // ─────────────────────────────────────────────────────────────

  function build(config) {
    const {
      width            = 500,
      height           = 320,
      parallelAngle    = 0,
      angleDeg         = 55,
      spacing          = 110,
      highlight        = 'alternate',
      showLineLabels   = true,
      showL1Label      = true,
      showParallelMarks = false,
    } = config;

    // ── CONSTRAINTS → POINTS ──────────────────────────────────
    const geometry = computeGeometry({ width, height, parallelAngle, angleDeg, spacing });
    const { P1, P2, line1, L1_start, L1_end, L2_start, L2_end, T_start, T_end } = geometry;

    // ── ELEMENTS ──────────────────────────────────────────────
    const elements = [];

    // Parallel lines + transversal (always present)
    elements.push(seg(L1_start, L1_end));
    elements.push(seg(L2_start, L2_end));
    elements.push(seg(T_start,  T_end));

    // Angle arcs (theorem-specific, from config)
    for (const arc of buildArcs(P1, P2, line1, highlight)) {
      elements.push(arc);
    }

    // Parallel marks (orange chevrons on both lines)
    if (showParallelMarks) {
      const d = line1.dir;
      const chev = (mid) => {
        const ux=d.x, uy=d.y, nx=-uy, ny=ux, sz=8;
        const pts = [
          `${(mid.x-ux*sz+nx*sz).toFixed(1)},${(mid.y-uy*sz+ny*sz).toFixed(1)}`,
          `${mid.x.toFixed(1)},${mid.y.toFixed(1)}`,
          `${(mid.x-ux*sz-nx*sz).toFixed(1)},${(mid.y-uy*sz-ny*sz).toFixed(1)}`
        ].join(' ');
        return { type: 'raw', svg: `<polyline points="${pts}" fill="none" stroke="#FF8C00" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>` };
      };
      elements.push(chev(Geo.point((P1.x+L1_end.x)/2, (P1.y+L1_end.y)/2)));
      elements.push(chev(Geo.point((P2.x+L2_end.x)/2, (P2.y+L2_end.y)/2)));
    }

    // Line labels — placed past the far end of each parallel line
    if (showLineLabels && showL1Label) {
      elements.push(lbl(Geo.point(L1_end.x + 14, L1_end.y + 5), 'ℓ₁', { size: 18 }));
    }
    if (showLineLabels) {
      elements.push(lbl(Geo.point(L2_end.x + 14, L2_end.y + 5), 'ℓ₂', { size: 18 }));
    }

    return {
      viewport: { width, height },
      elements,
    };
  }

  // ─────────────────────────────────────────────────────────────
  // Constraint solver: config → concrete points
  // ─────────────────────────────────────────────────────────────

  function computeGeometry({ width, height, parallelAngle, angleDeg, spacing }) {
    const center = Geo.point(width / 2, height / 2);

    // ── CONSTRAINT 1: parallel lines ─────────────────────────
    // Both lines share the same direction vector — parallelism is structural.
    // Geo.parallelLine shifts line1 perpendicularly by `spacing` pixels,
    // keeping line2.dir === line1.dir exactly.
    const perp = Geo.vecPerp(Geo.lineFromAngle(center, parallelAngle).dir);
    const anchor1 = Geo.point(center.x - perp.x * spacing / 2,
                               center.y - perp.y * spacing / 2);
    const anchor2 = Geo.point(center.x + perp.x * spacing / 2,
                               center.y + perp.y * spacing / 2);
    const line1 = Geo.lineFromAngle(anchor1, parallelAngle);
    const line2 = Geo.lineFromAngle(anchor2, parallelAngle); // dir === line1.dir

    // ── CONSTRAINT 2: transversal ─────────────────────────────
    const transversal = Geo.lineFromAngle(center, angleDeg);

    // ── INTERSECTION: works for any line orientation ──────────
    // Geo.intersect solves the general parametric line-line system.
    // Throws if transversal is parallel to the lines.
    const P1 = Geo.intersect(transversal, line1);
    const P2 = Geo.intersect(transversal, line2);
    if (!P1 || !P2) throw new Error('Transversal is parallel to the lines.');

    // ── VISUAL EXTENTS: parameterised along each line ─────────
    // halfSpan pixels along line1.dir on each side of P1 — works for any angle.
    const halfSpan = Math.max(width, height) * 0.42;
    const ext      = spacing * 0.55;

    const tL1 = Geo.lineParam(line1, P1);
    const tL2 = Geo.lineParam(line2, P2);
    const L1_start = Geo.pointOnLine(line1, tL1 - halfSpan);
    const L1_end   = Geo.pointOnLine(line1, tL1 + halfSpan);
    const L2_start = Geo.pointOnLine(line2, tL2 - halfSpan);
    const L2_end   = Geo.pointOnLine(line2, tL2 + halfSpan);

    const tT1 = Geo.lineParam(transversal, P1);
    const tT2 = Geo.lineParam(transversal, P2);
    const T_start = Geo.pointOnLine(transversal, Math.min(tT1, tT2) - ext);
    const T_end   = Geo.pointOnLine(transversal, Math.max(tT1, tT2) + ext);

    return { P1, P2, line1, line2, transversal, L1_start, L1_end, L2_start, L2_end, T_start, T_end };
  }

  // ─────────────────────────────────────────────────────────────
  // Arc builder: computes angle arcs from named highlight
  // ─────────────────────────────────────────────────────────────

  function buildArcs(P1, P2, line1, highlight) {
    // Four direction unit vectors at each intersection.
    // Derived from actual line directions — not hardcoded to horizontal.

    // Transversal direction: from P1 toward P2 (whichever is "down")
    const raw = Geo.vecNormalize(Geo.vecFromPoints(P1, P2));
    const dn  = raw;
    const up  = Geo.vec(-raw.x, -raw.y);

    // Parallel line directions: taken directly from line1.dir
    // This works for any parallelAngle — 0°, 45°, 90°, or anything else.
    const rt = line1.dir;
    const lt = Geo.vec(-line1.dir.x, -line1.dir.y);

    // At each intersection 4 angle arcs can be drawn, named by quadrant:
    //   UR = upper-right  (between up and rt)
    //   LR = lower-right  (between rt and dn)
    //   LL = lower-left   (between dn and lt)
    //   UL = upper-left   (between lt and up)
    const R = 36; // arc radius
    const Q = makeQuadrants(P1, P2, { up, dn, rt, lt }, R);

    // Semantic highlight → arc pairs with roles
    // 'equal-angle'        → noLegs fill (signals equality)
    // 'supplementary-angle'→ strokeOnly  (signals supplementary)
    const HIGHLIGHT_MAP = {
      // ── Equal pairs (corresponding / alternate) ──
      alternate:           [ [Q.P1.LR, 'equal-angle'], [Q.P2.UL, 'equal-angle'] ],
      alternate_left:      [ [Q.P1.LL, 'equal-angle'], [Q.P2.UR, 'equal-angle'] ],
      corresponding_UR:    [ [Q.P1.UR, 'equal-angle'], [Q.P2.UR, 'equal-angle'] ],
      corresponding_LR:    [ [Q.P1.LR, 'equal-angle'], [Q.P2.LR, 'equal-angle'] ],
      corresponding_LL:    [ [Q.P1.LL, 'equal-angle'], [Q.P2.LL, 'equal-angle'] ],
      corresponding_UL:    [ [Q.P1.UL, 'equal-angle'], [Q.P2.UL, 'equal-angle'] ],
      vertical_P1:         [ [Q.P1.UR, 'equal-angle'], [Q.P1.LL, 'equal-angle'] ],
      vertical_P2:         [ [Q.P2.UR, 'equal-angle'], [Q.P2.LL, 'equal-angle'] ],
      // ── Supplementary pairs ──
      co_interior:         [ [Q.P1.LR, 'supplementary-angle'], [Q.P2.UR, 'supplementary-angle'] ],
      co_interior_left:    [ [Q.P1.LL, 'supplementary-angle'], [Q.P2.UL, 'supplementary-angle'] ],
      supplementary_P1:    [ [Q.P1.UR, 'supplementary-angle'], [Q.P1.LR, 'supplementary-angle'] ],
    };

    const pairs = HIGHLIGHT_MAP[highlight] ?? [];
    return pairs.map(([geo, role]) => ({ type: 'arc', geo, role }));
  }

  // Precompute all 8 arc objects (4 per intersection)
  function makeQuadrants(P1, P2, { up, dn, rt, lt }, R) {
    function arc(V, d1, d2) {
      return Geo.angleArc(
        V,
        Geo.point(V.x + d1.x * R, V.y + d1.y * R),
        Geo.point(V.x + d2.x * R, V.y + d2.y * R),
        R
      );
    }
    return {
      P1: {
        UR: arc(P1, up, rt),
        LR: arc(P1, rt, dn),
        LL: arc(P1, dn, lt),
        UL: arc(P1, lt, up),
      },
      P2: {
        UR: arc(P2, up, rt),
        LR: arc(P2, rt, dn),
        LL: arc(P2, dn, lt),
        UL: arc(P2, lt, up),
      },
    };
  }

  // ─────────────────────────────────────────────────────────────
  // Element constructors (thin wrappers for readability)
  // ─────────────────────────────────────────────────────────────

  function seg(from, to, style = {}) {
    return { type: 'segment', geo: Geo.segment(from, to), style };
  }

  function lbl(point, text, style = {}) {
    return { type: 'label', geo: point, text, style };
  }

  // ─────────────────────────────────────────────────────────────

  return { build };
})();

// Self-register
TemplateRegistry.register('parallel-transversal', ParallelTransversalTemplate);
