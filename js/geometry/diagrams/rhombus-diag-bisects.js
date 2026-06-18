// q14: Parallelogram where a diagonal bisects an angle is a rhombus
const DiagramRhombusDiagBisects = (() => {
  function render(cfg={}) {
    const width=490, height=350;
    const red='#cc2222', black='#1a1a1a', orange='#FF8C00';
    const A=Geo.point(245,55), B=Geo.point(405,175), C=Geo.point(245,295), D=Geo.point(85,175);
    function vn(v){const l=Math.hypot(v.x,v.y);return{x:v.x/l,y:v.y/l};}
    function mkArc(V,p1,p2,r){
      const d1=vn({x:p1.x-V.x,y:p1.y-V.y}),d2=vn({x:p2.x-V.x,y:p2.y-V.y});
      return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
    }
    function chev(seg,n=1){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=6,gap=11;
      const results=[];
      for(let i=0;i<n;i++){
        const off=(i-(n-1)/2)*gap;
        const cx=(seg.p1.x+seg.p2.x)/2+ux*off,cy=(seg.p1.y+seg.p2.y)/2+uy*off;
        results.push(`<polyline points="${(cx-ux*sz+nx*sz).toFixed(1)},${(cy-uy*sz+ny*sz).toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)} ${(cx-ux*sz-nx*sz).toFixed(1)},${(cy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`);
      }
      return results.join('\n');
    }
    const parts=[];
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    // Diagonal BD (horizontal)
    parts.push(GeoRenderer.segment(Geo.segment(B,D),{color:black,width:1.5}));
    // Equal arcs at B: BD bisects angle ABC
    const arc1=mkArc(B,A,D,38), arc2=mkArc(B,D,C,38);
    parts.push(GeoRenderer.angleArc(arc1,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arc2,{color:red,strokeOnly:true,strokeWidth:2}));
    // Equal arcs at D: DB bisects angle ADC
    const arc3=mkArc(D,A,B,38), arc4=mkArc(D,B,C,38);
    parts.push(GeoRenderer.angleArc(arc3,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arc4,{color:red,strokeOnly:true,strokeWidth:2}));
    // Parallel marks on sides (rhombus: all 4 sides parallel in pairs)
    parts.push(chev(Geo.segment(A,B),1));
    parts.push(chev(Geo.segment(D,C),1));
    parts.push(chev(Geo.segment(A,D),2));
    parts.push(chev(Geo.segment(B,C),2));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
