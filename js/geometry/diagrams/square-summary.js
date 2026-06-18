const DiagramSquareSummary = (() => {
  function render(cfg = {}) {
    const width = 480, height = 400;
    const red = cfg.color ?? '#cc2222', blue = '#2D5FA6', black = '#1a1a1a';

    const A = Geo.point(120, 65);
    const B = Geo.point(360, 65);
    const C = Geo.point(360, 305);
    const D = Geo.point(120, 305);
    const E = Geo.point(240, 185);

    function vn(v) { const l = Math.hypot(v.x, v.y); return { x: v.x / l, y: v.y / l }; }
    function arcTick(V, P1, P2, r, tLen) {
      const dx1 = P1.x - V.x, dy1 = P1.y - V.y;
      const dx2 = P2.x - V.x, dy2 = P2.y - V.y;
      const l1 = Math.hypot(dx1, dy1), l2 = Math.hypot(dx2, dy2);
      const mx = dx1/l1 + dx2/l2, my = dy1/l1 + dy2/l2;
      const ml = Math.hypot(mx, my);
      const ux = mx/ml, uy = my/ml;
      const ax = V.x + r * ux, ay = V.y + r * uy;
      const t = tLen / 2;
      return `<line x1="${(ax - ux*t).toFixed(1)}" y1="${(ay - uy*t).toFixed(1)}" x2="${(ax + ux*t).toFixed(1)}" y2="${(ay + uy*t).toFixed(1)}" stroke="${red}" stroke-width="2" stroke-linecap="round"/>`;
    }
    function rightAngle(V, t1, t2, sq) {
      const d1 = vn({ x: t1.x - V.x, y: t1.y - V.y });
      const d2 = vn({ x: t2.x - V.x, y: t2.y - V.y });
      const p1 = { x: V.x + d1.x * sq, y: V.y + d1.y * sq };
      const p2 = { x: p1.x + d2.x * sq, y: p1.y + d2.y * sq };
      const p3 = { x: V.x + d2.x * sq, y: V.y + d2.y * sq };
      return `<polyline points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="none" stroke="${red}" stroke-width="2.5"/>`;
    }

    const parts = [];

    // Sides
    [Geo.segment(A, B), Geo.segment(B, C), Geo.segment(C, D), Geo.segment(D, A)].forEach(s =>
      parts.push(GeoRenderer.segment(s, { color: black, width: 2.5 }))
    );

    // Diagonals
    parts.push(GeoRenderer.segment(Geo.segment(A, C), { color: black, width: 1.5 }));
    parts.push(GeoRenderer.segment(Geo.segment(B, D), { color: black, width: 1.5 }));

    // All 4 sides equal → 1 tick each
    [Geo.segment(A, B), Geo.segment(B, C), Geo.segment(C, D), Geo.segment(D, A)].forEach(s =>
      parts.push(GeoRenderer.ticks(s, { count: 1, color: blue, tickLen: 16, width: 2.5 }))
    );

    // All 4 diagonal halves equal (equal diagonals + bisect each other) → 2 ticks each
    [Geo.segment(A, E), Geo.segment(E, C), Geo.segment(B, E), Geo.segment(E, D)].forEach(s =>
      parts.push(GeoRenderer.ticks(s, { count: 2, color: blue, tickLen: 14, width: 2.5 }))
    );

    // Right angle at E (diagonals perpendicular)
    parts.push(rightAngle(E, A, B, 18));

    // Right angles at all 4 corners
    parts.push(rightAngle(A, B, D, 14));
    parts.push(rightAngle(B, A, C, 14));
    parts.push(rightAngle(C, B, D, 14));
    parts.push(rightAngle(D, A, C, 14));

    // Angle bisection arcs at all 4 vertices (all equal 90° → 1 arc each side)
    const ao = { color: red, strokeOnly: true, strokeWidth: 2 };
    const r = 30;

    const tLen = 9;
    parts.push(GeoRenderer.angleArc(Geo.angleArc(A, D, E, r), ao)); parts.push(arcTick(A, D, E, r, tLen));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(A, E, B, r), ao)); parts.push(arcTick(A, E, B, r, tLen));

    parts.push(GeoRenderer.angleArc(Geo.angleArc(B, A, E, r), ao)); parts.push(arcTick(B, A, E, r, tLen));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(B, E, C, r), ao)); parts.push(arcTick(B, E, C, r, tLen));

    parts.push(GeoRenderer.angleArc(Geo.angleArc(C, B, E, r), ao)); parts.push(arcTick(C, B, E, r, tLen));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(C, E, D, r), ao)); parts.push(arcTick(C, E, D, r, tLen));

    parts.push(GeoRenderer.angleArc(Geo.angleArc(D, C, E, r), ao)); parts.push(arcTick(D, C, E, r, tLen));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(D, E, A, r), ao)); parts.push(arcTick(D, E, A, r, tLen));

    return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${parts.join('')}</svg>`;
  }
  return { render };
})();
