// def #14: משולשים חופפים – all sides and angles equal
const DiagramDefCongruentTriangles = (() => {
  function va(V,P1,P2,r){
    const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
    const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
    return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
  }
  function tri(A,B,C,blue,red,lColor,parts){
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // All three pairs of sides – count 1 / 2 / 3
    parts.push(GeoRenderer.ticks(Geo.segment(A,B),{count:1,color:blue,tickLen:18,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,C),{count:2,color:blue,tickLen:18,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(A,C),{count:3,color:blue,tickLen:18,width:3}));
    // All three angles – 1 arc at A, 2 at B, 3 at C
    parts.push(GeoRenderer.angleArc(va(A,B,C,34),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(B,A,C,26),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(B,A,C,34),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(C,A,B,22),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(C,A,B,30),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(C,A,B,38),{color:red,strokeOnly:true,strokeWidth:2}));
  }
  function render(cfg={}){
    const width=480, height=290;
    const red=cfg.color??'#cc2222', blue='#2D5FA6', lColor=cfg.lColor??'#1a1a1a';
    const A1=Geo.point(30,255), B1=Geo.point(195,255), C1=Geo.point(100,65);
    const A2=Geo.point(270,255), B2=Geo.point(435,255), C2=Geo.point(345,65);
    const parts=[];
    tri(A1,B1,C1,blue,red,lColor,parts);
    tri(A2,B2,C2,blue,red,lColor,parts);
    parts.push(GeoRenderer.label(Geo.point(233,155),'≅',{color:red,bold:true,size:52}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
