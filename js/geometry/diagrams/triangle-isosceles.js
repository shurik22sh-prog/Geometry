// t15: isosceles triangle – base angles are equal
const DiagramTriangleIsosceles = (() => {
  function render(cfg={}) {
    const width=420, height=300;
    const red=cfg.color??'#cc2222', blue='#2D5FA6', lColor=cfg.lColor??'#1a1a1a';
    const green='#16a34a';
    const A=Geo.point(80,245), B=Geo.point(340,245), C=Geo.point(210,62);
    const arcR=40;
    function va(V,P1,P2){
      const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
      const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
      return Geo.angleArc(V,Geo.point(V.x+d1.x*arcR,V.y+d1.y*arcR),Geo.point(V.x+d2.x*arcR,V.y+d2.y*arcR),arcR);
    }
    const parts=[];
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // equal base angle arcs
    parts.push(GeoRenderer.angleArc(va(A,B,C),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(B,A,C),{color:red,strokeOnly:true,strokeWidth:2}));
    // equal legs
    parts.push(GeoRenderer.ticks(Geo.segment(A,C),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,C),{count:1,color:blue,tickLen:20,width:3}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
