// def: מרחק נקודה מישר – distance from point to line
const DiagramDefPointLineDist = (() => {
  function render(cfg={}) {
    const width=490, height=250;
    const black='#1a1a1a', red='#cc2222', blue='#2D5FA6';
    const Px=245, Py=60, Fx=245, Fy=195;
    const sq = 16;
    const parts = [];
    // Line ℓ
    parts.push(GeoRenderer.segment(Geo.segment(Geo.point(60, Fy), Geo.point(430, Fy)), {color:black, width:2.5}));
    // Dashed perpendicular from P to F (blue)
    parts.push(`<line x1="${Px}" y1="${Py}" x2="${Fx}" y2="${Fy}" stroke="${blue}" stroke-width="2" stroke-dasharray="6,4"/>`);
    // Right angle at F
    parts.push(`<polyline points="${Fx+sq},${Fy} ${Fx+sq},${Fy-sq} ${Fx},${Fy-sq}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`);
    // Dots
    parts.push(GeoRenderer.point(Geo.point(Px, Py), {r:5, fill:black}));
    parts.push(GeoRenderer.point(Geo.point(Fx, Fy), {r:4, fill:black}));
    // Only 'd' label remains
    parts.push(GeoRenderer.label(Geo.point(258, 127), 'd', {size:22, bold:true, color:blue}));
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
