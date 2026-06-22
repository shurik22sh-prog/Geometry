// def #32: משיק למעגל – tangent line touches circle at one point
const DiagramDefTangent = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#4f52d0';
    const cx=230, cy=165, R=120;
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const P=ptOn(0);
    const T1=Geo.point(P.x, cy-110), T2=Geo.point(P.x, cy+110);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(T1,T2),{color:black,width:2.5}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
