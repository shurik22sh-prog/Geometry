// def: טרפז – trapezoid definition with two sub-examples
const DiagramTrapezoidDefinition = (() => {
  function render(cfg={}) {
    const width=490, height=530;
    const black='#1a1a1a', orange='#FF8C00', green='#16a34a', red='#cc2222', blue='#2D5FA6';

    // chevron shifted along the segment: shift<0 → toward left endpoint
    function chev(seg, sz=13, shift=0) {
      const dx=seg.p2.x-seg.p1.x, dy=seg.p2.y-seg.p1.y, l=Math.hypot(dx,dy);
      const ux=dx/l, uy=dy/l, nx=-uy, ny=ux;
      const cx=(seg.p1.x+seg.p2.x)/2 + ux*shift, cy=(seg.p1.y+seg.p2.y)/2 + uy*shift;
      return `<polyline points="${(cx-ux*sz+nx*sz).toFixed(1)},${(cy-uy*sz+ny*sz).toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)} ${(cx-ux*sz-nx*sz).toFixed(1)},${(cy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    function ra(Vx, Vy, d1x, d1y, d2x, d2y, sq=14) {
      const p1x=(Vx+d1x*sq).toFixed(1), p1y=(Vy+d1y*sq).toFixed(1);
      const p2x=(Vx+d1x*sq+d2x*sq).toFixed(1), p2y=(Vy+d1y*sq+d2y*sq).toFixed(1);
      const p3x=(Vx+d2x*sq).toFixed(1), p3y=(Vy+d2y*sq).toFixed(1);
      return `<polyline points="${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`;
    }
    function mkArc(V,P1,P2,r){
      const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
      const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
      return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
    }

    const parts=[];

    // ── MAIN TRAPEZOID ────────────────────────────────────────────────────────
    const TL=Geo.point(150,80), TR=Geo.point(280,80);
    const BR=Geo.point(465,255), BL=Geo.point(70,255);
    [Geo.segment(TL,TR),Geo.segment(TR,BR),Geo.segment(BR,BL),Geo.segment(BL,TL)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    // Chevrons shifted left along each base
    parts.push(chev(Geo.segment(TL,TR), 13, -28));
    parts.push(chev(Geo.segment(BL,BR), 13, -65));

    // "בסיס" on both bases (size 20)
    parts.push(GeoRenderer.label(Geo.point(215,62),'בסיס',{size:20,bold:true,color:green}));
    // bottom "בסיס" closer to the base line
    parts.push(GeoRenderer.label(Geo.point(268,268),'בסיס',{size:20,bold:true,color:green}));

    // "שוק" along both legs (size 20)
    const llMx=(TL.x+BL.x)/2, llMy=(TL.y+BL.y)/2;
    const angLL=(Math.atan2(TL.y-BL.y, TL.x-BL.x)*180/Math.PI).toFixed(1);
    parts.push(`<text transform="translate(${llMx.toFixed(1)},${llMy.toFixed(1)}) rotate(${angLL})" text-anchor="middle" dy="-12" font-size="20" font-weight="bold" fill="${green}" font-family="Assistant,sans-serif">שוק</text>`);

    const rlMx=(TR.x+BR.x)/2, rlMy=(TR.y+BR.y)/2;
    const angRL=(Math.atan2(BR.y-TR.y, BR.x-TR.x)*180/Math.PI).toFixed(1);
    parts.push(`<text transform="translate(${rlMx.toFixed(1)},${rlMy.toFixed(1)}) rotate(${angRL})" text-anchor="middle" dy="-12" font-size="20" font-weight="bold" fill="${green}" font-family="Assistant,sans-serif">שוק</text>`);

    // Divider line
    parts.push(`<line x1="30" y1="286" x2="460" y2="286" stroke="#ccc" stroke-width="1"/>`);

    // ── RIGHT-ANGLE TRAPEZOID (left, small) ──────────────────────────────────
    const rTL=Geo.point(30,310), rTR=Geo.point(195,310);
    const rBL=Geo.point(30,460), rBR=Geo.point(225,460);
    [Geo.segment(rTL,rTR),Geo.segment(rTR,rBR),Geo.segment(rBR,rBL),Geo.segment(rBL,rTL)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2})));
    // Chevrons centered
    parts.push(chev(Geo.segment(rTL,rTR), 10));
    parts.push(chev(Geo.segment(rBL,rBR), 10));
    // Right angles at TL and BL
    parts.push(ra(rTL.x,rTL.y, 1,0, 0,1, 13));
    parts.push(ra(rBL.x,rBL.y, 1,0, 0,-1, 13));
    // Label below
    parts.push(`<text x="127" y="497" text-anchor="middle" font-size="18" font-weight="bold" fill="${green}" font-family="Assistant,sans-serif">טרפז ישר זווית</text>`);

    // ── ISOSCELES TRAPEZOID (right, small) ───────────────────────────────────
    const iTL=Geo.point(280,310), iTR=Geo.point(440,310);
    const iBL=Geo.point(248,460), iBR=Geo.point(470,460);
    [Geo.segment(iTL,iTR),Geo.segment(iTR,iBR),Geo.segment(iBR,iBL),Geo.segment(iBL,iTL)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2})));
    // Chevrons centered
    parts.push(chev(Geo.segment(iTL,iTR), 10));
    parts.push(chev(Geo.segment(iBL,iBR), 10));
    // Equal legs tick marks
    parts.push(GeoRenderer.ticks(Geo.segment(iBL,iTL),{count:1,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(iBR,iTR),{count:1,color:blue,tickLen:14,width:2.5}));
    // Equal bottom base angles (1 arc each)
    parts.push(GeoRenderer.angleArc(mkArc(iBL,iBR,iTL,30),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(mkArc(iBR,iBL,iTR,30),{color:red,strokeOnly:true,strokeWidth:2}));
    // Equal top angles (2 concentric arcs each)
    parts.push(GeoRenderer.angleArc(mkArc(iTL,iBL,iTR,20),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(mkArc(iTL,iBL,iTR,28),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(mkArc(iTR,iBR,iTL,20),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(mkArc(iTR,iBR,iTL,28),{color:red,strokeOnly:true,strokeWidth:2}));
    // Label below
    parts.push(`<text x="359" y="497" text-anchor="middle" font-size="18" font-weight="bold" fill="${green}" font-family="Assistant,sans-serif">טרפז שווה שוקיים</text>`);

    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
