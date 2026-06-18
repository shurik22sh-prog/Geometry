// t10: three perpendicular bisectors meet at one point (circumcenter)
const DiagramTrianglePerpBisectors = (() => {
  function li(P1,d1,P2,d2){
    const det=d1.x*(-d2.y)-d1.y*(-d2.x);
    if(Math.abs(det)<1e-9) return null;
    const dx=P2.x-P1.x,dy=P2.y-P1.y;
    const t=(-dx*d2.y+dy*d2.x)/det;
    return Geo.point(P1.x+t*d1.x,P1.y+t*d1.y);
  }
  function perp(A,B){ const dx=B.x-A.x,dy=B.y-A.y,l=Math.hypot(dx,dy); return {x:-dy/l,y:dx/l}; }
  // right-angle square at foot F on side A→B, with the square opening toward P
  function ra(F,A,B,P,sq){
    const dx=B.x-A.x,dy=B.y-A.y,l=Math.hypot(dx,dy);
    const u={x:dx/l,y:dy/l};
    let nx=-dy/l,ny=dx/l;
    if((P.x-F.x)*nx+(P.y-F.y)*ny<0){nx=-nx;ny=-ny;}
    const p1=Geo.point(F.x+u.x*sq,F.y+u.y*sq);
    const p2=Geo.point(F.x+u.x*sq+nx*sq,F.y+u.y*sq+ny*sq);
    const p3=Geo.point(F.x+nx*sq,F.y+ny*sq);
    const red='#cc2222';
    return GeoRenderer.segment(Geo.segment(p1,p2),{color:red,width:1.5})+
           GeoRenderer.segment(Geo.segment(p3,p2),{color:red,width:1.5});
  }
  function render(cfg={}){
    const width=440, height=300;
    const lColor=cfg.lColor??'#1a1a1a', blue='#2D5FA6', gc='#888';
    const A=Geo.point(80,250), B=Geo.point(380,250), C=Geo.point(220,55);
    const mAB=Geo.point((A.x+B.x)/2,(A.y+B.y)/2);
    const mBC=Geo.point((B.x+C.x)/2,(B.y+C.y)/2);
    const mAC=Geo.point((A.x+C.x)/2,(A.y+C.y)/2);
    const pAB=perp(A,B), pBC=perp(B,C), pAC=perp(A,C);
    const O=li(mAB,pAB,mBC,pBC);
    const parts=[];
    // perp bisectors: from circumcenter O to each side's midpoint
    if(O){
      parts.push(GeoRenderer.segment(Geo.segment(O,mAB),{color:gc,width:1.5}));
      parts.push(GeoRenderer.segment(Geo.segment(O,mBC),{color:gc,width:1.5}));
      parts.push(GeoRenderer.segment(Geo.segment(O,mAC),{color:gc,width:1.5}));
    }
    // triangle
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // right angle marks at each midpoint (perp bisector ⊥ side)
    if(O){
      parts.push(ra(mAB,A,B,O,15));
      parts.push(ra(mBC,B,C,O,15));
      parts.push(ra(mAC,A,C,O,15));
    }
    // equal-half tick marks on each bisected side
    parts.push(GeoRenderer.ticks(Geo.segment(A,mAB),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(mAB,B),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,mBC),{count:2,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(mBC,C),{count:2,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(A,mAC),{count:3,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(mAC,C),{count:3,color:blue,tickLen:20,width:3}));
    // circumcenter dot
    if(O) parts.push(`<circle cx="${O.x.toFixed(1)}" cy="${O.y.toFixed(1)}" r="5" fill="${lColor}"/>`);
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
