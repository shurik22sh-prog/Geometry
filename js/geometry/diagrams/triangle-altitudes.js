// t6: three altitudes meet at one point (orthocenter)
const DiagramTriangleAltitudes = (() => {
  function foot(P, A, B) {
    const dx=B.x-A.x, dy=B.y-A.y, len2=dx*dx+dy*dy;
    const t=((P.x-A.x)*dx+(P.y-A.y)*dy)/len2;
    return Geo.point(A.x+t*dx, A.y+t*dy);
  }
  function li(P1,d1,P2,d2) {
    const det=d1.x*(-d2.y)-d1.y*(-d2.x);
    if(Math.abs(det)<1e-9) return null;
    const dx=P2.x-P1.x, dy=P2.y-P1.y;
    const t=(-dx*d2.y+dy*d2.x)/det;
    return Geo.point(P1.x+t*d1.x, P1.y+t*d1.y);
  }
  function ra(F,A,B,P,sq) {
    const dx=B.x-A.x,dy=B.y-A.y,len=Math.hypot(dx,dy);
    const u={x:dx/len,y:dy/len};
    let nx=-dy/len,ny=dx/len;
    if((P.x-F.x)*nx+(P.y-F.y)*ny<0){nx=-nx;ny=-ny;}
    const p1=Geo.point(F.x+u.x*sq,F.y+u.y*sq);
    const p2=Geo.point(F.x+u.x*sq+nx*sq,F.y+u.y*sq+ny*sq);
    const p3=Geo.point(F.x+nx*sq,F.y+ny*sq);
    const red='#cc2222';
    return GeoRenderer.segment(Geo.segment(p1,p2),{color:red,width:1.5})+
           GeoRenderer.segment(Geo.segment(p3,p2),{color:red,width:1.5});
  }
  function render(cfg={}) {
    const width=440, height=300;
    const lColor=cfg.lColor??'#1a1a1a', gc='#888';
    const A=Geo.point(80,250), B=Geo.point(380,250), C=Geo.point(220,55);
    const fA=foot(A,B,C), fB=foot(B,A,C), fC=foot(C,A,B);
    const dA={x:(fA.x-A.x)/Math.hypot(fA.x-A.x,fA.y-A.y),y:(fA.y-A.y)/Math.hypot(fA.x-A.x,fA.y-A.y)};
    const dB={x:(fB.x-B.x)/Math.hypot(fB.x-B.x,fB.y-B.y),y:(fB.y-B.y)/Math.hypot(fB.x-B.x,fB.y-B.y)};
    const H=li(A,dA,B,dB);
    const parts=[];
    // altitudes (dashed)
    parts.push(GeoRenderer.segment(Geo.segment(A,fA),{color:gc,width:1.5,dashed:false}));
    parts.push(GeoRenderer.segment(Geo.segment(B,fB),{color:gc,width:1.5,dashed:false}));
    parts.push(GeoRenderer.segment(Geo.segment(C,fC),{color:gc,width:1.5,dashed:false}));
    // right angle marks at feet
    parts.push(ra(fA,B,C,A,12));
    parts.push(ra(fB,A,C,B,12));
    parts.push(ra(fC,A,B,C,12));
    // triangle
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // orthocenter dot
    if(H) parts.push(`<circle cx="${H.x.toFixed(1)}" cy="${H.y.toFixed(1)}" r="5" fill="${lColor}"/>`);
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
