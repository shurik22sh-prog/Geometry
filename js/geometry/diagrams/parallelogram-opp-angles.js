// q3: Opposite angles in a parallelogram are equal
const DiagramParallelogramOppAngles = (() => {
  function render(cfg={}) {
    const width=500, height=320;
    const red='#cc2222', black='#1a1a1a';
    const A=Geo.point(100,70), B=Geo.point(380,70), C=Geo.point(460,250), D=Geo.point(180,250);
    function vn(v){const l=Math.hypot(v.x,v.y);return{x:v.x/l,y:v.y/l};}
    function mkArc(V,p1,p2,r){
      const d1=vn({x:p1.x-V.x,y:p1.y-V.y}),d2=vn({x:p2.x-V.x,y:p2.y-V.y});
      return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
    }
    const R1=36, R2a=28, R2b=40, parts=[];
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    // Pair 1 (A and C): single arc
    parts.push(GeoRenderer.angleArc(mkArc(A,D,B,R1),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(mkArc(C,B,D,R1),{color:red,strokeOnly:true,strokeWidth:2}));
    // Pair 2 (B and D): double arc (two concentric arcs, smaller)
    [R2a,R2b].forEach(r=>{
      parts.push(GeoRenderer.angleArc(mkArc(B,A,C,r),{color:red,strokeOnly:true,strokeWidth:2}));
      parts.push(GeoRenderer.angleArc(mkArc(D,C,A,r),{color:red,strokeOnly:true,strokeWidth:2}));
    });
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
