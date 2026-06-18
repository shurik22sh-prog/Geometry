// c17: Equal arcs → equal inscribed angles
const DiagramCircleC17 = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=162, R=130;
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    function circArc(a1,a2,color,w=4){
      const p1=ptOn(a1),p2=ptOn(a2);
      const span=((a2-a1)+360)%360, sweep=span<=180?1:0;
      return `<path d="M ${p1.x.toFixed(1)},${p1.y.toFixed(1)} A ${R} ${R} 0 0 ${sweep} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
    }

    // Two equal arcs in the lower half (each spanning 60°, symmetric)
    const A=ptOn(20),  B=ptOn(80);    // arc 1 endpoints
    const C=ptOn(100), D=ptOn(160);   // arc 2 endpoints (mirror)
    // Both inscribed angle vertices on the major arc — same side, different tilt
    const E=ptOn(240);  // upper-left
    const F=ptOn(310);  // upper-right — angle opens toward lower-left (tilted)

    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);

    // Highlighted equal arcs in red (no chords — theorem is about arcs)
    parts.push(circArc(20,80,red,4));
    parts.push(circArc(100,160,red,4));

    // Legs of the inscribed angles
    parts.push(GeoRenderer.segment(Geo.segment(E,A),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(E,B),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(F,C),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(F,D),{color:black,width:1.5}));

    // Equal angle arcs (no labels)
    parts.push(GeoRenderer.angleArc(Geo.angleArc(E,A,B,44),{color:red,strokeOnly:true,strokeWidth:2.5}));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(F,C,D,44),{color:red,strokeOnly:true,strokeWidth:2.5}));

    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
