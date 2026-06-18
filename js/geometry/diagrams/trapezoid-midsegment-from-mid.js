// q29: Segment from midpoint of one leg, parallel to bases, is the mid-segment
const DiagramTrapezoidMidsegmentFromMid = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', blue='#2D5FA6', orange='#FF8C00';
    const TL=Geo.point(150,80), TR=Geo.point(280,80), BR=Geo.point(465,255), BL=Geo.point(70,255);
    const ML=Geo.point((TL.x+BL.x)/2,(TL.y+BL.y)/2);
    const MR=Geo.point((TR.x+BR.x)/2,(TR.y+BR.y)/2);
    function chev(seg){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=10;
      const cx=(seg.p1.x+seg.p2.x)/2,cy=(seg.p1.y+seg.p2.y)/2;
      return `<polyline points="${(cx-ux*sz+nx*sz).toFixed(1)},${(cy-uy*sz+ny*sz).toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)} ${(cx-ux*sz-nx*sz).toFixed(1)},${(cy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    const parts=[];
    [Geo.segment(TL,TR),Geo.segment(TR,BR),Geo.segment(BR,BL),Geo.segment(BL,TL)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    parts.push(GeoRenderer.segment(Geo.segment(ML,MR),{color:black,width:2}));
    // Horizontal tick marks on left leg halves (parallel to bases)
    function hTick(p1,p2){
      const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
      return `<line x1="${(mx-14).toFixed(1)}" y1="${my.toFixed(1)}" x2="${(mx+14).toFixed(1)}" y2="${my.toFixed(1)}" stroke="${blue}" stroke-width="3.5" stroke-linecap="round"/>`;
    }
    parts.push(hTick(BL,ML));
    parts.push(hTick(ML,TL));
    // Chevrons on all three parallel lines
    parts.push(chev(Geo.segment(TL,TR)));
    parts.push(chev(Geo.segment(ML,MR)));
    parts.push(chev(Geo.segment(BL,BR)));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
