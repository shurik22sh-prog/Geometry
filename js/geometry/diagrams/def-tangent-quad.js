// def #36: מעגל חסום במרובע – circle tangent to all four sides
const DiagramDefTangentQuad = (() => {
  function render(cfg={}) {
    const width=490, height=310;
    const black='#1a1a1a';
    const cx=245, cy=185, r=100;
    function ptOn(cx,cy,R,deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const T1=ptOn(cx,cy,r,10), T2=ptOn(cx,cy,r,100), T3=ptOn(cx,cy,r,195), T4=ptOn(cx,cy,r,305);
    function tangentLine(T){
      const dx=T.x-cx, dy=T.y-cy;
      return {nx:-dy, ny:dx};
    }
    function intersectTangents(Ta,Tb){
      const d1=tangentLine(Ta), d2=tangentLine(Tb);
      const l1=Geo.line(Ta,Geo.vec(d1.nx,d1.ny));
      const l2=Geo.line(Tb,Geo.vec(d2.nx,d2.ny));
      return Geo.intersect(l1,l2);
    }
    const A=intersectTangents(T4,T1);
    const B=intersectTangents(T1,T2);
    const C=intersectTangents(T2,T3);
    const D=intersectTangents(T3,T4);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${black}" stroke-width="2"/>`);
    if(A&&B&&C&&D){
      parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:2.5}));
      parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:black,width:2.5}));
      parts.push(GeoRenderer.segment(Geo.segment(C,D),{color:black,width:2.5}));
      parts.push(GeoRenderer.segment(Geo.segment(D,A),{color:black,width:2.5}));
    }
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
