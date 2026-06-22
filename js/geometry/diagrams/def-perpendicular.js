// def: ישרים מאונכים – perpendicular lines
const DiagramDefPerpendicular = (() => {
  function render(cfg={}) {
    const width=320, height=260;
    const black='#4f52d0', red='#cc2222';
    const H = Geo.point(160, 140);
    const sq = 18;
    const parts = [];
    parts.push(GeoRenderer.segment(Geo.segment(Geo.point(30, 140), Geo.point(290, 140)), {color:black, width:2.5}));
    // Only the upper part of the vertical line
    parts.push(GeoRenderer.segment(Geo.segment(Geo.point(160, 30), Geo.point(160, 140)), {color:black, width:2.5}));
    // Right angle mark (upper-right of H)
    parts.push(`<polyline points="${H.x+sq},${H.y} ${H.x+sq},${H.y-sq} ${H.x},${H.y-sq}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`);
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
