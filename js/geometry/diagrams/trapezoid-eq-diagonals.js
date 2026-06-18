// q26: Trapezoid with equal diagonals is isosceles
const DiagramTrapezoidEqDiagonals = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', blue='#2D5FA6', orange='#FF8C00';
    const TL=Geo.point(150,80), TR=Geo.point(330,80), BR=Geo.point(400,255), BL=Geo.point(80,255);
    function chev(seg){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=10;
      const cx=(seg.p1.x+seg.p2.x)/2,cy=(seg.p1.y+seg.p2.y)/2;
      return `<polyline points="${(cx-ux*sz+nx*sz).toFixed(1)},${(cy-uy*sz+ny*sz).toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)} ${(cx-ux*sz-nx*sz).toFixed(1)},${(cy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    const parts=[];
    [Geo.segment(TL,TR),Geo.segment(TR,BR),Geo.segment(BR,BL),Geo.segment(BL,TL)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    // Diagonals in blue
    parts.push(GeoRenderer.segment(Geo.segment(TL,BR),{color:blue,width:2}));
    parts.push(GeoRenderer.segment(Geo.segment(TR,BL),{color:blue,width:2}));
    // Parallel marks on top and bottom
    parts.push(chev(Geo.segment(TL,TR)));
    parts.push(chev(Geo.segment(BL,BR)));
    // Equal legs tick marks
    parts.push(GeoRenderer.ticks(Geo.segment(BL,TL),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(BR,TR),{count:1,color:blue,tickLen:20,width:3}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
