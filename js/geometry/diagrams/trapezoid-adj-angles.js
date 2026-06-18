// q24: Adjacent angles on the same leg in a trapezoid sum to 180°
const DiagramTrapezoidAdjAngles = (() => {
  function render(cfg={}) {
    const width=490, height=310;
    const red='#cc2222', black='#1a1a1a';
    const TL=Geo.point(90,80), TR=Geo.point(320,80), BR=Geo.point(465,255), BL=Geo.point(50,255);
    // centroid for inward label placement
    const cx=(TL.x+TR.x+BR.x+BL.x)/4, cy=(TL.y+TR.y+BR.y+BL.y)/4;
    function inwardLabel(V,text,offset=38,size=22,nudgeY=0){
      const dx=cx-V.x, dy=cy-V.y, len=Math.hypot(dx,dy);
      const x=(V.x+(dx/len)*offset).toFixed(1), y=(V.y+(dy/len)*offset+nudgeY).toFixed(1);
      return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="Assistant,Arial,sans-serif" font-weight="bold" font-size="${size}" fill="${red}" direction="ltr">${text}</text>`;
    }
    const orange='#FF8C00';
    function chev(seg){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=7;
      const pcx=(seg.p1.x+seg.p2.x)/2,pcy=(seg.p1.y+seg.p2.y)/2;
      return `<polyline points="${(pcx-ux*sz+nx*sz).toFixed(1)},${(pcy-uy*sz+ny*sz).toFixed(1)} ${pcx.toFixed(1)},${pcy.toFixed(1)} ${(pcx-ux*sz-nx*sz).toFixed(1)},${(pcy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    const parts=[];
    [Geo.segment(TL,TR),Geo.segment(TR,BR),Geo.segment(BR,BL),Geo.segment(BL,TL)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    parts.push(chev(Geo.segment(TL,TR)));
    parts.push(chev(Geo.segment(BL,BR)));
    parts.push(inwardLabel(TL,'180 - α',36,20,-3));
    parts.push(inwardLabel(BL,'α',38,24));
    parts.push(inwardLabel(BR,'β',38,24));
    parts.push(inwardLabel(TR,'180 - β',36,20,-10));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
