// def: גובה – altitude of a triangle
const DiagramDefAltitude = (() => {
  function render(cfg={}) {
    const width=490, height=290;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const A = Geo.point(195, 55);
    const B = Geo.point(80, 245);
    const C = Geo.point(410, 245);
    const H = Geo.point(195, 245);
    const sq = 16;
    const parts = [];
    parts.push(GeoRenderer.segment(Geo.segment(A, B), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B, C), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A, C), {color:black, width:2.5}));
    // Altitude (blue, bold)
    parts.push(GeoRenderer.segment(Geo.segment(A, H), {color:blue, width:4}));
    // Right angle at H
    parts.push(`<polyline points="${H.x+sq},${H.y} ${H.x+sq},${H.y-sq} ${H.x},${H.y-sq}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`);
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
