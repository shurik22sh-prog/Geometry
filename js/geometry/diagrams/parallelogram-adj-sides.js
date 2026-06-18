// q16: Parallelogram with two equal adjacent sides is a rhombus
const DiagramParallelogramAdjSides = (() => {
  function render(cfg={}) {
    const width=500, height=340;
    const black='#1a1a1a', blue='#2D5FA6', orange='#FF8C00';
    // Rhombus: all sides ≈234px, slant=80, height=220
    const A=Geo.point(93,60), B=Geo.point(327,60), C=Geo.point(407,280), D=Geo.point(173,280);
    function chev(seg,n=1,shift=0){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=7,gap=11;
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
    parts.push(GeoRenderer.ticks(Geo.segment(A,B),{count:1,color:blue,tickLen:22,width:5}));
    // Custom horizontal tick on AD (perpendicular to ticks would be tilted; draw horizontal instead)
    const adMx=(A.x+D.x)/2, adMy=(A.y+D.y)/2;
    parts.push(`<line x1="${(adMx-11).toFixed(1)}" y1="${adMy.toFixed(1)}" x2="${(adMx+11).toFixed(1)}" y2="${adMy.toFixed(1)}" stroke="${blue}" stroke-width="5" stroke-linecap="round"/>`);
    // Parallel marks: 1 chevron on top/bottom (shifted right), 2 chevrons on left/right
    parts.push(chev(Geo.segment(A,B),1,80));
    parts.push(chev(Geo.segment(D,C),1,80));
    parts.push(chev(Geo.segment(A,D),2,70));
    parts.push(chev(Geo.segment(B,C),2,70));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
