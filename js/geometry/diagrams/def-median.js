// def: תיכון – median of a triangle
const DiagramDefMedian = (() => {
  function render(cfg={}) {
    const width=490, height=290;
    const black='#4f52d0', blue='#2D5FA6';
    const A = Geo.point(200, 55);
    const B = Geo.point(80, 245);
    const C = Geo.point(410, 245);
    const M = Geo.point(245, 245);
    const parts = [];
    parts.push(GeoRenderer.segment(Geo.segment(A, B), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B, C), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A, C), {color:black, width:2.5}));
    // Median (blue, bold)
    parts.push(GeoRenderer.segment(Geo.segment(A, M), {color:blue, width:4}));
    // Equal halves of BC
    parts.push(GeoRenderer.ticks(Geo.segment(B, M), {count:1, color:blue, tickLen:26, width:3.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(M, C), {count:1, color:blue, tickLen:26, width:3.5}));
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
