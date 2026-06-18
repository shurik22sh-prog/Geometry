// q23: quadrilateral with one pair of parallel sides is a trapezoid
const DiagramTrapezoidQ23 = (() => {
  function render(cfg={}) {
    const width=490, height=295;
    const black='#1a1a1a', orange='#FF8C00';

    function chev(seg, sz=13) {
      const dx=seg.p2.x-seg.p1.x, dy=seg.p2.y-seg.p1.y, l=Math.hypot(dx,dy);
      const ux=dx/l, uy=dy/l, nx=-uy, ny=ux;
      const cx=(seg.p1.x+seg.p2.x)/2, cy=(seg.p1.y+seg.p2.y)/2;
      return `<polyline points="${(cx-ux*sz+nx*sz).toFixed(1)},${(cy-uy*sz+ny*sz).toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)} ${(cx-ux*sz-nx*sz).toFixed(1)},${(cy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }

    const parts=[];
    const TL=Geo.point(150,80), TR=Geo.point(280,80);
    const BR=Geo.point(465,255), BL=Geo.point(70,255);
    [Geo.segment(TL,TR),Geo.segment(TR,BR),Geo.segment(BR,BL),Geo.segment(BL,TL)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    parts.push(chev(Geo.segment(Geo.point(148,80), Geo.point(202,80))));
    parts.push(chev(Geo.segment(Geo.point(170,255), Geo.point(202,255))));

    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
