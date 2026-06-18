// q15: Parallelogram with perpendicular diagonals is a rhombus
const DiagramParallelogramPerpDiag = (() => {
  function render(cfg={}) {
    const width=500, height=340;
    const red='#cc2222', black='#1a1a1a', orange='#FF8C00';
    // Rhombus: all sides ≈234px, slant=80, height=220
    const A=Geo.point(93,60), B=Geo.point(327,60), C=Geo.point(407,280), D=Geo.point(173,280);
    const O=Geo.point(250,170);
    function vn(v){const l=Math.hypot(v.x,v.y);return{x:v.x/l,y:v.y/l};}
    function rightAngle(V,t1,t2,sq=15){
      const d1=vn({x:t1.x-V.x,y:t1.y-V.y}),d2=vn({x:t2.x-V.x,y:t2.y-V.y});
      const p1={x:V.x+d1.x*sq,y:V.y+d1.y*sq};
      const p2={x:p1.x+d2.x*sq,y:p1.y+d2.y*sq};
      const p3={x:V.x+d2.x*sq,y:V.y+d2.y*sq};
      return `<polyline points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="none" stroke="${red}" stroke-width="2.5"/>`;
    }
    function chev(seg,n=1){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=7,gap=11;
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
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,D),{color:black,width:1.5}));
    parts.push(rightAngle(O,A,B,22));
    // Parallel marks: 1 chevron on top/bottom, 2 chevrons on left/right
    parts.push(chev(Geo.segment(A,B),1));
    parts.push(chev(Geo.segment(D,C),1));
    parts.push(chev(Geo.segment(A,D),2));
    parts.push(chev(Geo.segment(B,C),2));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
