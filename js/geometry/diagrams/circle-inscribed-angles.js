// def: זווית היקפית – inscribed angle (two chords meeting on circle)
const DiagramCircleInscribedAngles = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a';
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
    const red='#cc2222';
    const arcP=Geo.angleArc(P,B,C,34);
    const arcQ=Geo.angleArc(Q,B,C,34);
    parts.push(GeoRenderer.angleArc(arcP,{color:red,noLegs:true,strokeWidth:2,fillOpacity:0.20}));
    parts.push(GeoRenderer.angleArc(arcQ,{color:red,noLegs:true,strokeWidth:2,fillOpacity:0.20}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
