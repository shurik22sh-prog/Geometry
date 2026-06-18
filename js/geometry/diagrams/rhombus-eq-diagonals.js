// q17: Rhombus with equal diagonals is a square
const DiagramRhombusEqDiagonals = (() => {
  function render(cfg={}) {
    const width=500, height=390;
    const red='#cc2222', black='#1a1a1a', blue='#2D5FA6';
    // Square rotated 45°: equal diagonals (both 290px), center (250,195)
    const A=Geo.point(250,50), B=Geo.point(395,195), C=Geo.point(250,340), D=Geo.point(105,195);
    function vn(v){const l=Math.hypot(v.x,v.y);return{x:v.x/l,y:v.y/l};}
    function rightAngle(V,t1,t2,sq=16){
      const d1=vn({x:t1.x-V.x,y:t1.y-V.y}),d2=vn({x:t2.x-V.x,y:t2.y-V.y});
      const p1={x:V.x+d1.x*sq,y:V.y+d1.y*sq};
      const p2={x:p1.x+d2.x*sq,y:p1.y+d2.y*sq};
      const p3={x:V.x+d2.x*sq,y:V.y+d2.y*sq};
      return `<polyline points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="none" stroke="${red}" stroke-width="2"/>`;
    }
    const parts=[];
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:blue,width:2}));
    parts.push(GeoRenderer.segment(Geo.segment(B,D),{color:blue,width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(A,B),{count:1,color:blue,tickLen:14,width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,C),{count:1,color:blue,tickLen:14,width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(C,D),{count:1,color:blue,tickLen:14,width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(D,A),{count:1,color:blue,tickLen:14,width:2}));
    parts.push(rightAngle(A,B,D,16));
    parts.push(rightAngle(B,A,C,16));
    parts.push(rightAngle(C,D,B,16));
    parts.push(rightAngle(D,C,A,16));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
