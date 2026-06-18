// c1: All radii in a circle are equal
const DiagramCircleRadii = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', blue='#2D5FA6';
    const cx=245, cy=165, R=130;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const P1=ptOn(-90), P2=ptOn(30), P3=ptOn(160);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    [P1,P2,P3].forEach(P=>{
      parts.push(GeoRenderer.segment(Geo.segment(O,P),{color:black,width:2.5}));
      parts.push(GeoRenderer.ticks(Geo.segment(O,P),{count:1,color:blue,tickLen:16,width:2.5}));
    });
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
