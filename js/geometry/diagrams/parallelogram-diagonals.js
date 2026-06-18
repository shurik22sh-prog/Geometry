// q5: Diagonals of a parallelogram bisect each other
const DiagramParallelogramDiagonals = (() => {
  function render(cfg={}) {
    const width=500, height=320;
    const black='#1a1a1a', blue='#2D5FA6';
    const A=Geo.point(100,70), B=Geo.point(380,70), C=Geo.point(460,250), D=Geo.point(180,250);
    const O=Geo.point(280,160);
    const parts=[];
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,D),{color:black,width:1.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(A,O),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(O,C),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,O),{count:2,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(O,D),{count:2,color:blue,tickLen:20,width:3}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
