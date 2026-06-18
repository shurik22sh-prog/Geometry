// c2: Diameter = 2 × radius
const DiagramCircleDiameter = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=168, R=130;
    const O=Geo.point(cx,cy);
    const A=Geo.point(cx-R,cy), B=Geo.point(cx+R,cy);
    // Second diameter at ~35° from horizontal
    const ang=-60*Math.PI/180;
    const C=Geo.point(cx+R*Math.cos(ang),cy+R*Math.sin(ang));
    const D=Geo.point(cx-R*Math.cos(ang),cy-R*Math.sin(ang));
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C,D),{color:black,width:2.5}));
    // Tick marks on all 4 radii to show they are equal
    parts.push(GeoRenderer.ticks(Geo.segment(O,A),{count:1,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(O,B),{count:1,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(O,C),{count:1,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(O,D),{count:1,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
