// def: זווית ישרה – right angle
const DiagramDefRightAngle = (() => {
  function render(cfg={}) {
    const width=320, height=260;
    const black='#1a1a1a', red='#cc2222';
    const V = Geo.point(110, 195);
    const R = Geo.point(280, 195);
    const U = Geo.point(110, 50);
    const sq = 22;
    const parts = [];
    parts.push(GeoRenderer.segment(Geo.segment(V, R), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(V, U), {color:black, width:2.5}));
    parts.push(`<polyline points="${V.x+sq},${V.y} ${V.x+sq},${V.y-sq} ${V.x},${V.y-sq}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`);
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
