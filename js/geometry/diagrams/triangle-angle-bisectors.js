// t9: three angle bisectors meet at one point (incenter)
const DiagramTriangleAngleBisectors = (() => {
  function li(P1,d1,P2,d2){
    const det=d1.x*(-d2.y)-d1.y*(-d2.x);
    if(Math.abs(det)<1e-9) return null;
    const dx=P2.x-P1.x,dy=P2.y-P1.y;
    const t=(-dx*d2.y+dy*d2.x)/det;
    return Geo.point(P1.x+t*d1.x,P1.y+t*d1.y);
  }
  function bisDir(V,P1,P2){
    const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
    const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
    return Geo.vecNormalize(Geo.vecAdd(d1,d2));
  }
  // foot of angle bisector from V on opposite side P1-P2
  function bisOnSide(V,P1,P2){
    const d=bisDir(V,P1,P2);
    const dp={x:P2.x-P1.x,y:P2.y-P1.y};
    return li(V,d,P1,dp);
  }
  function render(cfg={}){
    const width=440, height=300;
    const lColor=cfg.lColor??'#1a1a1a', gc='#888';
    const A=Geo.point(80,250), B=Geo.point(380,250), C=Geo.point(220,55);
    const a=Math.hypot(B.x-C.x,B.y-C.y), b=Math.hypot(A.x-C.x,A.y-C.y), c=Math.hypot(A.x-B.x,A.y-B.y);
    const s=a+b+c;
    const I=Geo.point((a*A.x+b*B.x+c*C.x)/s,(a*A.y+b*B.y+c*C.y)/s);
    const fA=bisOnSide(A,B,C), fB=bisOnSide(B,A,C), fC=bisOnSide(C,A,B);
    const red='#cc2222';
    // draws `count` concentric strokeOnly arc pairs to mark equal half-angles
    function eqArcs(V, P1, bis, P2, baseR, count) {
      const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
      const db=Geo.vecNormalize(bis);
      const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
      for(let i=0;i<count;i++){
        const r=baseR+i*7;
        const arc1=Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+db.x*r,V.y+db.y*r),r);
        const arc2=Geo.angleArc(V,Geo.point(V.x+db.x*r,V.y+db.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
        parts.push(GeoRenderer.angleArc(arc1,{color:red,strokeOnly:true,strokeWidth:2}));
        parts.push(GeoRenderer.angleArc(arc2,{color:red,strokeOnly:true,strokeWidth:2}));
      }
    }
    const parts=[];
    if(fA) parts.push(GeoRenderer.segment(Geo.segment(A,fA),{color:gc,width:1.5,dashed:false}));
    if(fB) parts.push(GeoRenderer.segment(Geo.segment(B,fB),{color:gc,width:1.5,dashed:false}));
    if(fC) parts.push(GeoRenderer.segment(Geo.segment(C,fC),{color:gc,width:1.5,dashed:false}));
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // each vertex gets a different arc count: different angles at A, B, C
    eqArcs(A, B, bisDir(A,B,C), C, 44, 1);
    eqArcs(B, A, bisDir(B,A,C), C, 44, 2);
    eqArcs(C, A, bisDir(C,A,B), B, 32, 3);
    parts.push(`<circle cx="${I.x.toFixed(1)}" cy="${I.y.toFixed(1)}" r="5" fill="${lColor}"/>`);
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
