// q2: Opposite sides of a parallelogram are parallel
const DiagramParallelogramParallel = (() => {
  function render(cfg={}) {
    const width=500, height=320;
    const black='#1a1a1a', orange='#FF8C00';
    const A=Geo.point(100,70), B=Geo.point(380,70), C=Geo.point(460,250), D=Geo.point(180,250);
    function chev(seg,n=1){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=10,sp=8;
      const cx=(seg.p1.x+seg.p2.x)/2,cy=(seg.p1.y+seg.p2.y)/2;
      return Array.from({length:n},(_,i)=>{
        const off=(i-(n-1)/2)*sp,ccx=cx+ux*off,ccy=cy+uy*off;
        return `<polyline points="${(ccx-ux*sz+nx*sz).toFixed(1)},${(ccy-uy*sz+ny*sz).toFixed(1)} ${ccx.toFixed(1)},${ccy.toFixed(1)} ${(ccx-ux*sz-nx*sz).toFixed(1)},${(ccy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
      }).join('\n');
    }
    const parts=[];
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    parts.push(chev(Geo.segment(A,B),1));
    parts.push(chev(Geo.segment(D,C),1));
    parts.push(chev(Geo.segment(A,D),2));
    parts.push(chev(Geo.segment(B,C),2));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
