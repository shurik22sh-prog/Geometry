// t17: if angle bisector = altitude → isosceles (base halves equality not shown)
const DiagramTriangleIsoscelesApex17 = (() => {
  function render(cfg={}) {
    const width=420, height=300;
    const lColor=cfg.lColor??'#1a1a1a', blue='#2D5FA6', gc='#555';
    const A=Geo.point(80,255), B=Geo.point(340,255), C=Geo.point(210,60);
    const M=Geo.point((A.x+B.x)/2,(A.y+B.y)/2);
    const sq=14;
    const red=cfg.color??'#cc2222';
    const parts=[];
    // equal angle arcs at apex C (bisector — given)
    const dCA=Geo.vecNormalize(Geo.vecFromPoints(C,A));
    const dCB=Geo.vecNormalize(Geo.vecFromPoints(C,B));
    const dCM=Geo.vecNormalize(Geo.vecFromPoints(C,M));
    const arcR=38;
    const arc1=Geo.angleArc(C,Geo.point(C.x+dCA.x*arcR,C.y+dCA.y*arcR),Geo.point(C.x+dCM.x*arcR,C.y+dCM.y*arcR),arcR);
    const arc2=Geo.angleArc(C,Geo.point(C.x+dCM.x*arcR,C.y+dCM.y*arcR),Geo.point(C.x+dCB.x*arcR,C.y+dCB.y*arcR),arcR);
    parts.push(GeoRenderer.angleArc(arc1,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arc2,{color:red,strokeOnly:true,strokeWidth:2}));
    // equal legs ticks
    parts.push(GeoRenderer.ticks(Geo.segment(A,C),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,C),{count:1,color:blue,tickLen:20,width:3}));
    // triangle
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // apex line to base
    parts.push(GeoRenderer.segment(Geo.segment(C,M),{color:gc,width:2}));
    // right angle mark at M (altitude — given)
    parts.push(GeoRenderer.segment(Geo.segment(Geo.point(M.x-sq,M.y),Geo.point(M.x-sq,M.y-sq)),{color:red,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(Geo.point(M.x-sq,M.y-sq),Geo.point(M.x,M.y-sq)),{color:red,width:1.5}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
