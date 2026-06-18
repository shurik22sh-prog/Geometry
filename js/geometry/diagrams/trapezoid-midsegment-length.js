// q28: Length of mid-segment = (a + b) / 2
const DiagramTrapezoidMidsegmentLength = (() => {
  function render(cfg={}) {
    const width=490, height=295;
    const black='#1a1a1a', blue='#2D5FA6', orange='#FF8C00';
    const TL=Geo.point(150,80), TR=Geo.point(280,80), BR=Geo.point(465,255), BL=Geo.point(70,255);
    const ML=Geo.point((TL.x+BL.x)/2,(TL.y+BL.y)/2);
    const MR=Geo.point((TR.x+BR.x)/2,(TR.y+BR.y)/2);
    function sideLabel(p1,p2,text,offset=22,size=24){
      const mx=(p1.x+p2.x)/2,my=(p1.y+p2.y)/2;
      const dx=-(p2.y-p1.y),dy=p2.x-p1.x,l=Math.hypot(dx,dy);
      return GeoRenderer.label(Geo.point(mx+(dx/l)*offset,my+(dy/l)*offset),text,{color:blue,size,bold:true});
    }
    function chev(seg,shift=0){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=10;
      const cx=(seg.p1.x+seg.p2.x)/2+ux*shift,cy=(seg.p1.y+seg.p2.y)/2+uy*shift;
      return `<polyline points="${(cx-ux*sz+nx*sz).toFixed(1)},${(cy-uy*sz+ny*sz).toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)} ${(cx-ux*sz-nx*sz).toFixed(1)},${(cy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    const parts=[];
    [Geo.segment(TL,TR),Geo.segment(TR,BR),Geo.segment(BR,BL),Geo.segment(BL,TL)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    parts.push(GeoRenderer.segment(Geo.segment(ML,MR),{color:black,width:2}));
    // Equal halves tick marks on legs
    parts.push(GeoRenderer.ticks(Geo.segment(TL,ML),{count:1,color:blue,tickLen:18,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(ML,BL),{count:1,color:blue,tickLen:18,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(TR,MR),{count:2,color:blue,tickLen:18,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(MR,BR),{count:2,color:blue,tickLen:18,width:3}));
    // Parallel marks on all 3 parallel lines
    parts.push(chev(Geo.segment(TL,TR),50));
    parts.push(chev(Geo.segment(ML,MR),50));
    parts.push(chev(Geo.segment(BL,BR),50));
    // Side labels: top base = a, bottom base = b (larger)
    parts.push(sideLabel(TL,TR,'a',-28,32));
    parts.push(sideLabel(BL,BR,'b',28,32));
    // Inline fraction (a+b)/2 shifted left
    const fx=205, font=`font-family="Assistant,Arial,sans-serif" font-weight="bold" font-size="20" fill="${blue}"`;
    parts.push(`<text x="${fx}" y="134" text-anchor="middle" ${font}>a+b</text>`);
    parts.push(`<line x1="${fx-22}" y1="141" x2="${fx+22}" y2="141" stroke="${blue}" stroke-width="1.8"/>`);
    parts.push(`<text x="${fx}" y="161" text-anchor="middle" ${font}>2</text>`);
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
