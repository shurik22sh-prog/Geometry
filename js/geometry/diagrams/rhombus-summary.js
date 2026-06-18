const DiagramRhombusSummary = (() => {
  function render(cfg = {}) {
    const width = 500, height = 340;
    const red = cfg.color ?? '#cc2222', blue = '#2D5FA6', black = '#1a1a1a';

    const A = Geo.point(93,  60);
    const B = Geo.point(327, 60);
    const C = Geo.point(407, 280);
    const D = Geo.point(173, 280);
    const E = Geo.point(250, 170); // intersection of diagonals

    function vn(v) { const l = Math.hypot(v.x, v.y); return { x: v.x / l, y: v.y / l }; }
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

    // All 4 sides equal → 1 tick each (blue)
    [Geo.segment(A, B), Geo.segment(B, C), Geo.segment(C, D), Geo.segment(D, A)].forEach(s =>
      parts.push(GeoRenderer.ticks(s, { count: 1, color: blue, tickLen: 16, width: 2.5 }))
    );

    // Diagonal halves equal: AE=EC → 2 ticks; BE=ED → 3 ticks
    parts.push(GeoRenderer.ticks(Geo.segment(A, E), { count: 2, color: blue, tickLen: 14, width: 2.5 }));
    parts.push(GeoRenderer.ticks(Geo.segment(E, C), { count: 2, color: blue, tickLen: 14, width: 2.5 }));
    parts.push(GeoRenderer.ticks(Geo.segment(B, E), { count: 3, color: blue, tickLen: 14, width: 2.5 }));
    parts.push(GeoRenderer.ticks(Geo.segment(E, D), { count: 3, color: blue, tickLen: 14, width: 2.5 }));

    // Right angle at E (diagonals perpendicular)
    parts.push(rightAngle(E, A, B, 22));

    // Angle bisection arcs:
    // A=C (acute, 1 arc per half-angle) and B=D (obtuse, 2 arcs per half-angle)
    const ao = { color: red, strokeOnly: true, strokeWidth: 2 };

    // A: 1 arc each side
    parts.push(GeoRenderer.angleArc(Geo.angleArc(A, D, E, 30), ao));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(A, E, B, 30), ao));

    // C: 1 arc each side (same as A)
    parts.push(GeoRenderer.angleArc(Geo.angleArc(C, B, E, 30), ao));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(C, E, D, 30), ao));

    // B: 2 concentric arcs each side
    parts.push(GeoRenderer.angleArc(Geo.angleArc(B, A, E, 24), ao));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(B, E, C, 24), ao));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(B, A, E, 32), ao));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(B, E, C, 32), ao));

    // D: 2 concentric arcs each side (same as B)
    parts.push(GeoRenderer.angleArc(Geo.angleArc(D, C, E, 24), ao));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(D, E, A, 24), ao));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(D, C, E, 32), ao));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(D, E, A, 32), ao));

    return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${parts.join('')}</svg>`;
  }
  return { render };
})();
