// q9: Parallelogram with equal diagonals is a rectangle
const DiagramParallelogramEqDiagonals = (() => {
  function render(cfg={}) {
    const width=500, height=320;
    const black='#1a1a1a', blue='#2D5FA6', orange='#FF8C00';
    const A=Geo.point(80,75), B=Geo.point(420,75), C=Geo.point(420,245), D=Geo.point(80,245);
    function chev(seg,n=1,shift=0){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=10,gap=14;
      const results=[];
      for(let i=0;i<n;i++){
        const off=(i-(n-1)/2)*gap;
        const cx=(seg.p1.x+seg.p2.x)/2+ux*(shift+off),cy=(seg.p1.y+seg.p2.y)/2+uy*(shift+off);
        results.push(`<polyline points="${(cx-ux*sz+nx*sz).toFixed(1)},${(cy-uy*sz+ny*sz).toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)} ${(cx-ux*sz-nx*sz).toFixed(1)},${(cy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`);
      }
      return results.join('\n');
    }
    const parts=[];
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:blue,width:2}));
    parts.push(GeoRenderer.segment(Geo.segment(B,D),{color:blue,width:2}));
    // parallel marks: 1 chevron on top/bottom, 2 chevrons on left/right
    parts.push(chev(Geo.segment(A,B),1));
    parts.push(chev(Geo.segment(D,C),1));
    parts.push(chev(Geo.segment(A,D),2));
    parts.push(chev(Geo.segment(B,C),2));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
