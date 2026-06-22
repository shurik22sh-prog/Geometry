// def: מיתר – chord (segment connecting two points on circle)
const DiagramDefChord = (() => {
  function render(cfg={}) {
    const width=490, height=300;
    const black='#4f52d0';
    const cx=245, cy=155, r=115;
    function pt(deg){const a=deg*Math.PI/180;return Geo.point(cx+r*Math.cos(a),cy+r*Math.sin(a));}
    const parts = [];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${black}" stroke-width="2"/>`);
    // Main chord (black, ~horizontal upper)
    const A=pt(200), B=pt(340);
    parts.push(GeoRenderer.segment(Geo.segment(A, B), {color:black, width:2.5}));
    // Additional chord 2 (lower left to right)
    const C=pt(250), D=pt(20);
    parts.push(GeoRenderer.segment(Geo.segment(C, D), {color:black, width:2.5}));
    // Additional chord 3 (upper right to lower left area)
    const E=pt(310), F=pt(110);
    parts.push(GeoRenderer.segment(Geo.segment(E, F), {color:black, width:2.5}));
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
