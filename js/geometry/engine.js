// js/geometry/engine.js – pure geometry math, no DOM, no SVG

const Geo = (() => {

  // ── Primitives ──────────────────────────────────────────────────────────────

  const point = (x, y) => ({ x, y });
  const vec   = (x, y) => ({ x, y });

  const vecFromPoints = (p, q) => vec(q.x - p.x, q.y - p.y);
  const vecLength     = v => Math.sqrt(v.x * v.x + v.y * v.y);
  const vecNormalize  = v => { const l = vecLength(v); return vec(v.x / l, v.y / l); };
  const vecScale      = (v, s) => vec(v.x * s, v.y * s);
  const vecAdd        = (a, b) => vec(a.x + b.x, a.y + b.y);
  const vecDot        = (a, b) => a.x * b.x + a.y * b.y;
  // Signed cross product in SVG coords (Y-down).
  // Positive  → b is CW from a on screen  → use sweep=1 for the short arc.
  const vecCross      = (a, b) => a.x * b.y - a.y * b.x;
  const vecPerp       = v => vec(-v.y, v.x);   // 90° CCW rotation

  // ── Lines ───────────────────────────────────────────────────────────────────
  // Representation: { anchor: Point, dir: unit Vec }

  const line = (anchor, dir) => ({ anchor, dir: vecNormalize(dir) });

  const lineFromPoints = (p, q) => line(p, vecFromPoints(p, q));

  const lineFromAngle = (anchor, deg) => {
    const r = (deg * Math.PI) / 180;
    return line(anchor, vec(Math.cos(r), Math.sin(r)));
  };

  // Shift a line perpendicularly by `offset` units.
  const parallelLine = (l, offset) => {
    const perp = vecPerp(l.dir);
    return line(
      point(l.anchor.x + perp.x * offset, l.anchor.y + perp.y * offset),
      l.dir
    );
  };

  // ── Intersections ────────────────────────────────────────────────────────────

  // Returns the intersection point of two infinite lines, or null if parallel.
  const intersect = (l1, l2) => {
    const d   = vecFromPoints(l1.anchor, l2.anchor);
    const det = vecCross(l1.dir, l2.dir);
    if (Math.abs(det) < 1e-10) return null;
    const t = vecCross(d, l2.dir) / det;
    return point(l1.anchor.x + t * l1.dir.x, l1.anchor.y + t * l1.dir.y);
  };

  // ── Segments & parameterisation ─────────────────────────────────────────────

  const segment = (p1, p2) => ({ p1, p2 });

  // Point at parameter t along line l: anchor + t · dir.
  const pointOnLine = (l, t) =>
    point(l.anchor.x + t * l.dir.x, l.anchor.y + t * l.dir.y);

  // Recover the parameter t for a point that lies on line l.
  const lineParam = (l, p) =>
    Math.abs(l.dir.x) >= Math.abs(l.dir.y)
      ? (p.x - l.anchor.x) / l.dir.x
      : (p.y - l.anchor.y) / l.dir.y;

  // ── Angles ──────────────────────────────────────────────────────────────────

  const angleBetween = (v1, v2) =>
    (Math.acos(Math.max(-1, Math.min(1, vecDot(vecNormalize(v1), vecNormalize(v2))))) *
      180) /
    Math.PI;

  /**
   * Describes an angle arc centred at `vertex`, opening toward `fromPt` and
   * `toPt`, drawn at `radius`.  The `sweep` field encodes whether the short arc
   * from startPt → endPt is clockwise (1) or counter-clockwise (0) in SVG
   * screen coordinates, derived from the signed cross product so callers never
   * have to compute it themselves.
   */
  const angleArc = (vertex, fromPt, toPt, radius) => {
    const v1  = vecNormalize(vecFromPoints(vertex, fromPt));
    const v2  = vecNormalize(vecFromPoints(vertex, toPt));
    const deg = angleBetween(v1, v2);
    // vecCross > 0  ↔  v2 is CW from v1 in SVG coords  ↔  short CW arc uses sweep=1
    const sweep    = vecCross(v1, v2) > 0 ? 1 : 0;
    const startPt  = point(vertex.x + v1.x * radius, vertex.y + v1.y * radius);
    const endPt    = point(vertex.x + v2.x * radius, vertex.y + v2.y * radius);
    return { vertex, startPt, endPt, deg, radius, sweep };
  };

  // ── Exports ──────────────────────────────────────────────────────────────────

  return {
    point, vec,
    vecFromPoints, vecLength, vecNormalize, vecScale, vecAdd,
    vecDot, vecCross, vecPerp,
    line, lineFromPoints, lineFromAngle, parallelLine,
    intersect,
    segment, pointOnLine, lineParam,
    angleBetween, angleArc,
  };
})();
