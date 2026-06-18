// t34: AA similarity – two equal angle pairs marked with 1 and 2 arcs
const DiagramTriangleSimilarityAa = (() => {
  function va(V,P1,P2,r){
    const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
    const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
    return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
  }
  function eqArcs(V,P1,P2,baseR,count,red,parts){
    const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
    const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
    for(let i=0;i<count;i++){
      const r=baseR+i*7;
      const arc=Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
      parts.push(GeoRenderer.angleArc(arc,{color:red,strokeOnly:true,strokeWidth:2}));
    }
  }
  function drawTri(A,B,C,baseR,red,lColor,parts){
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    eqArcs(A,B,C,baseR,  1,red,parts); // angle at A – group 1
    eqArcs(B,A,C,baseR,  2,red,parts); // angle at B – group 2
  }
  function render(cfg={}){
    const width=530, height=310;
    const red=cfg.color??'#cc2222', lColor=cfg.lColor??'#1a1a1a';
    const A1=Geo.point(30,265),  B1=Geo.point(225,265), C1=Geo.point(75,58);
    const A2=Geo.point(335,265), B2=Geo.point(462,265), C2=Geo.point(365,131);
    const parts=[];
    drawTri(A1,B1,C1,32,red,lColor,parts);
    drawTri(A2,B2,C2,24,red,lColor,parts);
    parts.push(GeoRenderer.label(Geo.point(265,182),'∼',{color:red,bold:true,size:68}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
