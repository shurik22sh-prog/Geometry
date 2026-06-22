// def: חוצה – bisector (bisects segment into two equal halves)
const DiagramDefBisector = (() => {
  function render(cfg={}) {
    const width=490, height=190;
    const black='#1a1a1a', blue='#2D5FA6';
    const A = Geo.point(80, 100);
    const M = Geo.point(245, 100);
    const B = Geo.point(410, 100);
    const parts = [];
    parts.push(GeoRenderer.segment(Geo.segment(A, B), {color:black, width:2.5}));
    parts.push(GeoRenderer.point(A, {r:5, fill:black}));
    parts.push(GeoRenderer.point(B, {r:5, fill:black}));
    parts.push(GeoRenderer.ticks(Geo.segment(A, M), {count:1, color:blue, tickLen:20, width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(M, B), {count:1, color:blue, tickLen:20, width:2.5}));
    // Diagonal line through M representing the bisecting element
    parts.push(GeoRenderer.segment(Geo.segment(Geo.point(M.x-40, M.y-55), Geo.point(M.x+40, M.y+55)), {color:black, width:2.5}));
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
