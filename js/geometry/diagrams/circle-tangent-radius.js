// c19: Tangent is perpendicular to radius at point of tangency
const DiagramCircleTangentRadius = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', red=cfg.color??'#cc2222';
    const cx=230, cy=165, R=120;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    // Right tangent – vertical at rightmost point
    const P=ptOn(0); // P=(cx+R, cy)
    const T1=Geo.point(P.x, cy-110), T2=Geo.point(P.x, cy+110);
    const sq=16;
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    // tangent line
    parts.push(GeoRenderer.segment(Geo.segment(T1,T2),{color:black,width:2.5}));
    // radius O → P
    parts.push(GeoRenderer.segment(Geo.segment(O,P),{color:black,width:2.5}));
    // right angle mark at P (radius goes left toward O, tangent goes upward)
    parts.push(`<polyline points="${(P.x-sq)},${P.y} ${(P.x-sq)},${(P.y-sq)} ${P.x},${(P.y-sq)}" fill="none" stroke="${red}" stroke-width="2.5" stroke-linejoin="miter"/>`);
    // center dot
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
