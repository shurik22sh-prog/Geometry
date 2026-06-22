// def: משולש ישר זווית – right triangle
const DiagramDefRightTriangle = (() => {
  function render(cfg={}) {
    const width=490, height=290;
    const black='#4f52d0', red='#cc2222';
    const C = Geo.point(100, 235); // right angle vertex
    const A = Geo.point(100, 60);  // top
    const B = Geo.point(390, 235); // right
    const sq = 28;
    const parts = [];
    parts.push(GeoRenderer.segment(Geo.segment(C, A), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C, B), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A, B), {color:black, width:2.5}));
    // Right angle at C (ray going UP and ray going RIGHT)
    parts.push(`<polyline points="${C.x+sq},${C.y} ${C.x+sq},${C.y-sq} ${C.x},${C.y-sq}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`);
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
