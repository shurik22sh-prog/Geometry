// def: גזרה – sector (pie slice bounded by two radii and an arc)
const DiagramDefSector = (() => {
  function render(cfg={}) {
    const width=490, height=300;
    const black='#4f52d0', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=165, r=115;
    // Sector from 220° to 350° CW (through top=270°), span=130°
    const a1=220*Math.PI/180, a2=350*Math.PI/180;
    const P1x=cx+r*Math.cos(a1), P1y=cy+r*Math.sin(a1); // upper-left
    const P2x=cx+r*Math.cos(a2), P2y=cy+r*Math.sin(a2); // upper-right
    const parts = [];
    // Full circle
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${black}" stroke-width="2"/>`);
    // Filled sector path: M center L P1 A r,r 0 0 1 P2 Z
    parts.push(`<path d="M${cx},${cy} L${P1x.toFixed(1)},${P1y.toFixed(1)} A${r},${r} 0 0 1 ${P2x.toFixed(1)},${P2y.toFixed(1)} Z" fill="rgba(204,34,34,0.12)" stroke="${red}" stroke-width="2"/>`);
    // Radii (blue)
    parts.push(GeoRenderer.segment(Geo.segment(Geo.point(cx,cy), Geo.point(P1x,P1y)), {color:black, width:2}));
    parts.push(GeoRenderer.segment(Geo.segment(Geo.point(cx,cy), Geo.point(P2x,P2y)), {color:black, width:2}));
    // Center dot
    parts.push(`<circle cx="${cx}" cy="${cy}" r="4" fill="${black}"/>`);
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
