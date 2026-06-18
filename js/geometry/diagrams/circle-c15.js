// c15: Inscribed angles on same chord from same side are equal (chord highlighted, no arc)
const DiagramCircleC15 = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', red='#cc2222';
    const cx=245, cy=168, R=130;
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const B=ptOn(30), C=ptOn(150);
    const P=ptOn(260), Q=ptOn(290);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(P,B),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(P,C),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(Q,B),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(Q,C),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:'#2D5FA6',width:4}));
    const arcP=Geo.angleArc(P,B,C,32);
    const arcQ=Geo.angleArc(Q,B,C,32);
    parts.push(GeoRenderer.angleArc(arcP,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcQ,{color:red,strokeOnly:true,strokeWidth:2}));
    const lP=GeoRenderer.arcLabelPoint(arcP,-16);
    const lQ=GeoRenderer.arcLabelPoint(arcQ,-16);
    parts.push(GeoRenderer.label(lP,'α',{size:22,bold:true,color:red}));
    parts.push(GeoRenderer.label(lQ,'α',{size:22,bold:true,color:red}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
