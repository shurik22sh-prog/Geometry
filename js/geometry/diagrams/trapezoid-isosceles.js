// q25: Isosceles trapezoid – base angles are equal
const DiagramTrapezoidIsosceles = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const red='#cc2222', black='#1a1a1a', blue='#2D5FA6', orange='#FF8C00';
    const TL=Geo.point(150,80), TR=Geo.point(330,80), BR=Geo.point(400,255), BL=Geo.point(80,255);
    function vn(v){const l=Math.hypot(v.x,v.y);return{x:v.x/l,y:v.y/l};}
    function mkArc(V,p1,p2,r){
      const d1=vn({x:p1.x-V.x,y:p1.y-V.y}),d2=vn({x:p2.x-V.x,y:p2.y-V.y});
      return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
    }
    function chev(seg){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=11;
      const cx=(seg.p1.x+seg.p2.x)/2,cy=(seg.p1.y+seg.p2.y)/2;
      return `<polyline points="${(cx-ux*sz+nx*sz).toFixed(1)},${(cy-uy*sz+ny*sz).toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)} ${(cx-ux*sz-nx*sz).toFixed(1)},${(cy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    const R=28, parts=[];
    [Geo.segment(TL,TR),Geo.segment(TR,BR),Geo.segment(BR,BL),Geo.segment(BL,TL)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    // Parallel marks on both bases
    parts.push(chev(Geo.segment(TL,TR)));
    parts.push(chev(Geo.segment(BL,BR)));
    // Equal bottom base angles (1 arc each)
    parts.push(GeoRenderer.angleArc(mkArc(BL,BR,TL,R),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(mkArc(BR,BL,TR,R),{color:red,strokeOnly:true,strokeWidth:2}));
    // Equal top base angles (2 concentric arcs each)
    parts.push(GeoRenderer.angleArc(mkArc(TL,BL,TR,20),  {color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(mkArc(TL,BL,TR,27),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(mkArc(TR,TL,BR,20),  {color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(mkArc(TR,TL,BR,27),{color:red,strokeOnly:true,strokeWidth:2}));
    // Equal legs
    parts.push(GeoRenderer.ticks(Geo.segment(BL,TL),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(BR,TR),{count:1,color:blue,tickLen:20,width:3}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
