// q8: Rectangle diagonals are equal and bisect each other
const DiagramRectangleDiagonals = (() => {
  function render(cfg={}) {
    const width=480, height=315;
    const black='#1a1a1a', blue='#2D5FA6';
    const A=Geo.point(75,75), B=Geo.point(405,75), C=Geo.point(405,245), D=Geo.point(75,245);
    const O=Geo.point(240,160);
    const parts=[];
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,D),{color:black,width:1.5}));
    // All 4 half-diagonals equal → 1 tick each
    [Geo.segment(A,O),Geo.segment(O,C),Geo.segment(B,O),Geo.segment(O,D)].forEach(s=>
      parts.push(GeoRenderer.ticks(s,{count:1,color:blue,tickLen:20,width:3})));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
