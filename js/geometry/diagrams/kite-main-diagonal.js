// q21: Main diagonal of kite bisects apex angles, bisects other diagonal perpendicularly
const DiagramKiteMainDiagonal = (() => {
  function render(cfg={}) {
    const width=490, height=420;
    const red='#cc2222', black='#1a1a1a';
    const T=Geo.point(245,40), R=Geo.point(355,135), B=Geo.point(245,385), L=Geo.point(135,135);
    const O=Geo.point(245,135);
    function vn(v){const l=Math.hypot(v.x,v.y);return{x:v.x/l,y:v.y/l};}
    function mkArc(V,p1,p2,r){
      const d1=vn({x:p1.x-V.x,y:p1.y-V.y}),d2=vn({x:p2.x-V.x,y:p2.y-V.y});
      return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
    }
    function rightAngle(V,t1,t2,sq=14){
      const d1=vn({x:t1.x-V.x,y:t1.y-V.y}),d2=vn({x:t2.x-V.x,y:t2.y-V.y});
      const p1={x:V.x+d1.x*sq,y:V.y+d1.y*sq};
      const p2={x:p1.x+d2.x*sq,y:p1.y+d2.y*sq};
      const p3={x:V.x+d2.x*sq,y:V.y+d2.y*sq};
      return `<polyline points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="none" stroke="${red}" stroke-width="2.5"/>`;
    }
    const parts=[];
    [Geo.segment(T,R),Geo.segment(R,B),Geo.segment(B,L),Geo.segment(L,T)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    // Main diagonal TB
    parts.push(GeoRenderer.segment(Geo.segment(T,B),{color:black,width:1.5}));
    // Cross diagonal LR
    parts.push(GeoRenderer.segment(Geo.segment(L,R),{color:black,width:1.5}));
    // Equal arcs at T: 1 arc (group 1)
    const arcTL=mkArc(T,L,B,38), arcTR=mkArc(T,B,R,38);
    parts.push(GeoRenderer.angleArc(arcTL,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcTR,{color:red,strokeOnly:true,strokeWidth:2}));
    // Equal arcs at B: 2 concentric arcs (group 2 — different angle size)
    [34,46].forEach(r=>{
      parts.push(GeoRenderer.angleArc(mkArc(B,R,T,r),{color:red,strokeOnly:true,strokeWidth:2}));
      parts.push(GeoRenderer.angleArc(mkArc(B,T,L,r),{color:red,strokeOnly:true,strokeWidth:2}));
    });
    // Bisection ticks on LO and OR
    parts.push(GeoRenderer.ticks(Geo.segment(L,O),{count:1,color:'#2D5FA6',tickLen:18,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(O,R),{count:1,color:'#2D5FA6',tickLen:18,width:3}));
    // Perpendicular mark at O
    parts.push(rightAngle(O,T,R,16));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
