// game2-isosceles.js — minimal isosceles triangle: ticks on 2 equal legs only
const DiagramGame2Isosceles = (() => {
  function render(cfg={}) {
    const w=400, h=280, black='#1a1a1a', blue='#2D5FA6';
    const A=Geo.point(200,40), B=Geo.point(55,255), C=Geo.point(345,255);
    const parts = [
      GeoRenderer.segment(Geo.segment(A,B), {color:black, width:2.5}),
      GeoRenderer.segment(Geo.segment(B,C), {color:black, width:2.5}),
      GeoRenderer.segment(Geo.segment(C,A), {color:black, width:2.5}),
      GeoRenderer.ticks(Geo.segment(A,B), {count:1, color:blue, tickLen:18, width:2.5}),
      GeoRenderer.ticks(Geo.segment(A,C), {count:1, color:blue, tickLen:18, width:2.5}),
    ];
    return GeoRenderer.svg(w, h, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
