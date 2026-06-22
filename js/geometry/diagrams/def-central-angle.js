// def: זווית מרכזית – central angle (angle between two radii pointing downward)
const DiagramDefCentralAngle = (() => {
  function render(cfg={}) {
    const width=490, height=300;
    const black='#1a1a1a', red='#cc2222';
    const cx=245, cy=130, r=115;
    // Two radii pointing downward: 30° and 150° (lower-left and lower-right in SVG)
    const a1=30*Math.PI/180, a2=150*Math.PI/180;
    const Ax=cx+r*Math.cos(a1), Ay=cy+r*Math.sin(a1);
    const Bx=cx+r*Math.cos(a2), By=cy+r*Math.sin(a2);
    const O=Geo.point(cx,cy), A=Geo.point(Ax,Ay), B=Geo.point(Bx,By);
    const parts = [];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(O, A), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(O, B), {color:black, width:2.5}));
    // Filled central angle arc
    const arc = Geo.angleArc(O, A, B, 42);
    parts.push(GeoRenderer.angleArc(arc, {color:red, noLegs:true, strokeWidth:2, fillOpacity:0.20}));
    parts.push(`<circle cx="${cx}" cy="${cy}" r="4" fill="${black}"/>`);
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
