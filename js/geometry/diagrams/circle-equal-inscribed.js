// c16: Equal chords → equal inscribed angles (same side)
const DiagramCircleEqualInscribed = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=162, R=130;
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}

    // Two equal chords in the lower half (each spanning 60°, symmetric)
    const A=ptOn(20),  B=ptOn(80);    // chord 1: right-center → bottom-center
    const C=ptOn(100), D=ptOn(160);   // chord 2: bottom-center → left-center (mirror)
    // Both inscribed angle vertices on the major arc — same side, different tilt
    const E=ptOn(240);  // upper-left
    const F=ptOn(310);  // upper-right — angle opens toward lower-left (tilted)

    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);

    // Equal chords in blue
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:blue,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C,D),{color:blue,width:2.5}));

    // Legs of the inscribed angles
    parts.push(GeoRenderer.segment(Geo.segment(E,A),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(E,B),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(F,C),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(F,D),{color:black,width:1.5}));

    // Equal angle arcs (no labels — equality shown by same arc style)
    parts.push(GeoRenderer.angleArc(Geo.angleArc(E,A,B,44),{color:red,strokeOnly:true,strokeWidth:2.5}));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(F,C,D,44),{color:red,strokeOnly:true,strokeWidth:2.5}));

    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
