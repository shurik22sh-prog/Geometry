// def: אנך אמצעי – perpendicular bisector
const DiagramDefPerpBisector = (() => {
  function render(cfg={}) {
    const width=490, height=490;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const parts = [];

    // ── TOP: segment AB with perpendicular bisector ───────────────────────────
    const A = Geo.point(90, 155);
    const B = Geo.point(400, 155);
    const M = Geo.point(245, 155);
    const Pt = Geo.point(245, 55);
    const sq = 16;
    parts.push(GeoRenderer.segment(Geo.segment(A, B), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(Pt, M), {color:black, width:2.5}));
    parts.push(`<polyline points="${M.x+sq},${M.y} ${M.x+sq},${M.y-sq} ${M.x},${M.y-sq}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`);
    parts.push(GeoRenderer.ticks(Geo.segment(A, M), {count:1, color:blue, tickLen:16, width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(M, B), {count:1, color:blue, tickLen:16, width:2.5}));
    parts.push(GeoRenderer.point(A, {r:5, fill:black}));
    parts.push(GeoRenderer.point(B, {r:5, fill:black}));

    // ── SEPARATOR ─────────────────────────────────────────────────────────────
    parts.push(`<line x1="30" y1="215" x2="460" y2="215" stroke="#ccc" stroke-width="1"/>`);

    // ── BOTTOM: general triangle with perpendicular bisector on base BC ───────
    const Y = 235;
    const tA = Geo.point(165, Y + 35);
    const tB = Geo.point(65,  Y + 210);
    const tC = Geo.point(415, Y + 210);
    const tM = Geo.point((tB.x + tC.x) / 2, tB.y);
    const perpTop = Geo.point(tM.x, tM.y - 65);

    parts.push(GeoRenderer.segment(Geo.segment(tA, tB), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(tA, tC), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(tB, tC), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(perpTop, tM), {color:black, width:3}));

    const raSq = 14;
    parts.push(`<polyline points="${tM.x+raSq},${tM.y} ${tM.x+raSq},${tM.y-raSq} ${tM.x},${tM.y-raSq}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`);
    parts.push(GeoRenderer.ticks(Geo.segment(tB, tM), {count:1, color:blue, tickLen:22, width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(tM, tC), {count:1, color:blue, tickLen:22, width:2.5}));

    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
