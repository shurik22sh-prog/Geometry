// q6: One pair of sides that is both parallel and equal → parallelogram
const DiagramParallelogramOnePair = (() => {
  function render(cfg={}) {
    const width=500, height=320;
    const black='#1a1a1a', blue='#2D5FA6', orange='#FF8C00';
    const A=Geo.point(100,70), B=Geo.point(380,70), C=Geo.point(460,250), D=Geo.point(180,250);
    function chev(seg,shift=0){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=10;
      const cx=(seg.p1.x+seg.p2.x)/2+ux*shift,cy=(seg.p1.y+seg.p2.y)/2+uy*shift;
      return `<polyline points="${(cx-ux*sz+nx*sz).toFixed(1)},${(cy-uy*sz+ny*sz).toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)} ${(cx-ux*sz-nx*sz).toFixed(1)},${(cy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    const parts=[];
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    // Only one pair (top AB and bottom DC) marked parallel and equal
    parts.push(chev(Geo.segment(A,B),50));
    parts.push(chev(Geo.segment(D,C),50));
    parts.push(GeoRenderer.ticks(Geo.segment(A,B),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(D,C),{count:1,color:blue,tickLen:20,width:3}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
