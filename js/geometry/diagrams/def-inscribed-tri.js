// def #34: מעגל חסום במשולש – circle tangent to all three sides
const DiagramDefInscribedTri = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a';
    const A=Geo.point(245,42), B=Geo.point(390,272), C=Geo.point(100,272);
    const a=Math.hypot(B.x-C.x,B.y-C.y);
    const b=Math.hypot(C.x-A.x,C.y-A.y);
    const c=Math.hypot(A.x-B.x,A.y-B.y);
    const Ix=(a*A.x+b*B.x+c*C.x)/(a+b+c);
    const Iy=(a*A.y+b*B.y+c*C.y)/(a+b+c);
    const r=272-Iy;
    const parts=[];
    parts.push(`<circle cx="${Ix.toFixed(1)}" cy="${Iy.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C,A),{color:black,width:2.5}));
    return GeoRenderer.svg(490,320,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
