// c24: Circle inscribed in triangle – angle bisectors meet at incenter
const DiagramCircleInscribedTri = (() => {
  function va(V,P1,P2,r){
    const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
    const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
    return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
  }
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', red=cfg.color??'#cc2222';
    const A=Geo.point(245,42), B=Geo.point(390,272), C=Geo.point(100,272);
    const a=Math.hypot(B.x-C.x,B.y-C.y);
    const b=Math.hypot(C.x-A.x,C.y-A.y);
    const c=Math.hypot(A.x-B.x,A.y-B.y);
    const Ix=(a*A.x+b*B.x+c*C.x)/(a+b+c);
    const Iy=(a*A.y+b*B.y+c*C.y)/(a+b+c);
    const r=272-Iy;
    const I=Geo.point(Ix,Iy);

    // Foot of bisector from V through I onto opposite side P1-P2
    function bisectorFoot(V, P1, P2) {
      const lVI=Geo.line(V, Geo.vec(I.x-V.x, I.y-V.y));
      const lSide=Geo.line(P1, Geo.vec(P2.x-P1.x, P2.y-P1.y));
      return Geo.intersect(lVI, lSide);
    }
    const FA=bisectorFoot(A,B,C);
    const FB=bisectorFoot(B,A,C);
    const FC=bisectorFoot(C,A,B);

    const parts=[];
    parts.push(`<circle cx="${Ix.toFixed(1)}" cy="${Iy.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C,A),{color:black,width:2.5}));

    // Angle bisectors from each vertex through incenter to opposite side
    if(FA) parts.push(GeoRenderer.segment(Geo.segment(A,FA),{color:black,width:1.5}));
    if(FB) parts.push(GeoRenderer.segment(Geo.segment(B,FB),{color:black,width:1.5}));
    if(FC) parts.push(GeoRenderer.segment(Geo.segment(C,FC),{color:black,width:1.5}));

    // Equal arc marks: 1 arc at A, 2 at B, 3 at C (concentric, gap ~8px)
    // Vertex A – 1 arc per half-angle
    const rA=36;
    parts.push(GeoRenderer.angleArc(va(A,B,I,rA),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(A,I,C,rA),{color:red,strokeOnly:true,strokeWidth:2}));
    // Vertex B – 2 concentric arcs per half-angle
    const rB1=26, rB2=34;
    parts.push(GeoRenderer.angleArc(va(B,A,I,rB1),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(B,A,I,rB2),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(B,I,C,rB1),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(B,I,C,rB2),{color:red,strokeOnly:true,strokeWidth:2}));
    // Vertex C – 3 concentric arcs per half-angle
    const rC1=24, rC2=32, rC3=40;
    parts.push(GeoRenderer.angleArc(va(C,A,I,rC1),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(C,A,I,rC2),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(C,A,I,rC3),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(C,I,B,rC1),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(C,I,B,rC2),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(C,I,B,rC3),{color:red,strokeOnly:true,strokeWidth:2}));

    parts.push(GeoRenderer.point(I,{r:4,fill:black}));
    return GeoRenderer.svg(490,320,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
