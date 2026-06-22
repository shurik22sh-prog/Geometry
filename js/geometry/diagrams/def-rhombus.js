// def: מעוין – rhombus (all sides equal)
const DiagramDefRhombus = (() => {
  function render(cfg={}) {
    const width=490, height=300;
    const black='#4f52d0', blue='#2D5FA6';
    const T = Geo.point(245, 55);   // top
    const R = Geo.point(400, 165);  // right
    const Bot = Geo.point(245, 275); // bottom
    const L = Geo.point(90, 165);   // left
    const parts = [];
    parts.push(GeoRenderer.segment(Geo.segment(T, R),   {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(R, Bot), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(Bot, L), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(L, T),   {color:black, width:2.5}));
    // Tick marks on all 4 sides (count:1 = same group)
    parts.push(GeoRenderer.ticks(Geo.segment(T, R),   {count:1, color:blue, tickLen:26, width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(R, Bot), {count:1, color:blue, tickLen:26, width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(Bot, L), {count:1, color:blue, tickLen:26, width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(L, T),   {count:1, color:blue, tickLen:26, width:3}));
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
