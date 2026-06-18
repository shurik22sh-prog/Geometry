// game2-rectangle.js — minimal rectangle: right-angle marks at all 4 corners only
const DiagramGame2Rectangle = (() => {
  const red = '#cc2222', black = '#1a1a1a', sq = 15;

  function ra(vx, vy, d1x, d1y, d2x, d2y) {
    const p1x=vx+d1x*sq, p1y=vy+d1y*sq;
    const p2x=p1x+d2x*sq, p2y=p1y+d2y*sq;
    const p3x=vx+d2x*sq, p3y=vy+d2y*sq;
    return `<polyline points="${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`;
  }

  function render(cfg={}) {
    const w=400, h=240;
    const A=Geo.point(60,60), B=Geo.point(340,60), C=Geo.point(340,190), D=Geo.point(60,190);
    const parts = [
      GeoRenderer.segment(Geo.segment(A,B), {color:black, width:2.5}),
      GeoRenderer.segment(Geo.segment(B,C), {color:black, width:2.5}),
      GeoRenderer.segment(Geo.segment(C,D), {color:black, width:2.5}),
      GeoRenderer.segment(Geo.segment(D,A), {color:black, width:2.5}),
      ra(60, 60,   1,0,  0,1),
      ra(340,60,  -1,0,  0,1),
      ra(340,190, -1,0,  0,-1),
      ra(60, 190,  1,0,  0,-1),
    ];
    return GeoRenderer.svg(w, h, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
