// def: מעגל – circle (all points equidistant from center)
const DiagramDefCircle = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a';
    const cx=245, cy=165, R=130;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const P1=ptOn(-90), P2=ptOn(30), P3=ptOn(160);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    [P1,P2,P3].forEach(P=>{
      parts.push(`<line x1="${cx}" y1="${cy}" x2="${P.x.toFixed(1)}" y2="${P.y.toFixed(1)}" stroke="${black}" stroke-width="2.5" stroke-dasharray="7,5"/>`);
    });
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
