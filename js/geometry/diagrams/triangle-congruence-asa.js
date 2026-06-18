// t25: ASA congruence – two angles and included side
const DiagramTriangleCongruenceAsa = (() => {
  function eqArcs(V,P1,P2,r,count,red,parts){
    const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
    const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
    for(let i=0;i<count;i++){
      const ri=r+i*7;
      const arc=Geo.angleArc(V,Geo.point(V.x+d1.x*ri,V.y+d1.y*ri),Geo.point(V.x+d2.x*ri,V.y+d2.y*ri),ri);
      parts.push(GeoRenderer.angleArc(arc,{color:red,strokeOnly:true,strokeWidth:2}));
    }
  }
  function tri(A,B,C,blue,red,lColor,parts){
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    eqArcs(A,B,C,38,1,red,parts);
    eqArcs(B,A,C,38,2,red,parts);
    parts.push(GeoRenderer.ticks(Geo.segment(A,B),{count:1,color:blue,tickLen:20,width:3}));
  }
  function render(cfg={}){
    const width=460, height=280;
    const red=cfg.color??'#cc2222', blue='#2D5FA6', lColor=cfg.lColor??'#1a1a1a';
    const A1=Geo.point(30,245), B1=Geo.point(195,245), C1=Geo.point(100,62);
    const A2=Geo.point(255,245), B2=Geo.point(420,245), C2=Geo.point(325,62);
    const parts=[];
    tri(A1,B1,C1,blue,red,lColor,parts);
    tri(A2,B2,C2,blue,red,lColor,parts);
    parts.push(GeoRenderer.label(Geo.point(225,155),'≅',{color:red,bold:true,size:52}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
