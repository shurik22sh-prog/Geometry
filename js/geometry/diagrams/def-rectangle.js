// def: מלבן – rectangle (all right angles)
const DiagramDefRectangle = (() => {
  function render(cfg={}) {
    const width=490, height=280;
    const black='#4f52d0', red='#cc2222';
    const A = Geo.point(80,  80);  // TL
    const B = Geo.point(410, 80);  // TR
    const C = Geo.point(410, 220); // BR
    const D = Geo.point(80,  220); // BL
    const sq = 24;
    const parts = [];
    parts.push(GeoRenderer.segment(Geo.segment(A, B), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B, C), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C, D), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(D, A), {color:black, width:2.5}));
    // Right angle marks at each corner
    // A (TL): rays→right and→down, square lower-right
    parts.push(`<polyline points="${A.x+sq},${A.y} ${A.x+sq},${A.y+sq} ${A.x},${A.y+sq}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`);
    // B (TR): rays→left and→down, square lower-left
    parts.push(`<polyline points="${B.x-sq},${B.y} ${B.x-sq},${B.y+sq} ${B.x},${B.y+sq}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`);
    // C (BR): rays→left and→up, square upper-left
    parts.push(`<polyline points="${C.x-sq},${C.y} ${C.x-sq},${C.y-sq} ${C.x},${C.y-sq}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`);
    // D (BL): rays→right and→up, square upper-right
    parts.push(`<polyline points="${D.x+sq},${D.y} ${D.x+sq},${D.y-sq} ${D.x},${D.y-sq}" fill="none" stroke="${red}" stroke-width="2" stroke-linejoin="miter"/>`);
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
