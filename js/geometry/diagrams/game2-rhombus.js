// game2-rhombus.js — minimal rhombus: ticks on all 4 equal sides only
const DiagramGame2Rhombus = (() => {
  function render(cfg={}) {
    const w=400, h=290, black='#1a1a1a', blue='#2D5FA6';
    const A=Geo.point(200,40), B=Geo.point(360,160), C=Geo.point(200,280), D=Geo.point(40,160);
    const parts = [
      GeoRenderer.segment(Geo.segment(A,B), {color:black, width:2.5}),
      GeoRenderer.segment(Geo.segment(B,C), {color:black, width:2.5}),
      GeoRenderer.segment(Geo.segment(C,D), {color:black, width:2.5}),
      GeoRenderer.segment(Geo.segment(D,A), {color:black, width:2.5}),
      GeoRenderer.ticks(Geo.segment(A,B), {count:1, color:blue, tickLen:18, width:2.5}),
      GeoRenderer.ticks(Geo.segment(B,C), {count:1, color:blue, tickLen:18, width:2.5}),
      GeoRenderer.ticks(Geo.segment(C,D), {count:1, color:blue, tickLen:18, width:2.5}),
      GeoRenderer.ticks(Geo.segment(D,A), {count:1, color:blue, tickLen:18, width:2.5}),
    ];
    return GeoRenderer.svg(w, h, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
