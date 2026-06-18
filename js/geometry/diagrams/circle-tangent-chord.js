// c22: Tangent-chord angle equals inscribed angle on same arc
const DiagramCircleTangentChord = (() => {
  function render(cfg={}) {
    const width=490, height=340;
    const black='#1a1a1a', red='#cc2222';
    const cx=245, cy=175, R=125;
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const A=ptOn(90), B=ptOn(-40);
    const TL=Geo.point(A.x-130, A.y), TR=Geo.point(A.x+90, A.y);
    const C=ptOn(200);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(TL,TR),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:2}));
    parts.push(GeoRenderer.segment(Geo.segment(C,A),{color:black,width:1.8}));
    parts.push(GeoRenderer.segment(Geo.segment(C,B),{color:black,width:1.8}));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(A,B,TR,30),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(C,A,B,30),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.point(A,{r:5,fill:black}));
    parts.push(GeoRenderer.point(B,{r:5,fill:black}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
