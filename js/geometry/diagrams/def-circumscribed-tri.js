// def #33: משולש חסום במעגל – triangle with all vertices on circle
const DiagramDefCircumscribedTri = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a';
    const cx=245, cy=162, R=125;
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const A=ptOn(-80), B=ptOn(40), C=ptOn(195);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C,A),{color:black,width:2.5}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
