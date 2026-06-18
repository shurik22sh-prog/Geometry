// c20,c21: Two tangents from external point are equal / segment bisects angle between them
const DiagramCircleTwoTangents = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', red='#cc2222';
    const cx=195, cy=162, R=110;
    const O=Geo.point(cx,cy);
    const E=Geo.point(430, cy);
    const dEO=Math.hypot(E.x-cx, E.y-cy);
    const L=Math.sqrt(dEO*dEO-R*R);
    const ang=Math.asin(R/dEO);
    const eoAngle=Math.atan2(cy-E.y, cx-E.x);
    const P1=Geo.point(E.x+L*Math.cos(eoAngle+ang), E.y+L*Math.sin(eoAngle+ang));
    const P2=Geo.point(E.x+L*Math.cos(eoAngle-ang), E.y+L*Math.sin(eoAngle-ang));
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(E,P1),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(E,P2),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(E,O),{color:black,width:1.5}));
    if (cfg.bisector) {
      parts.push(GeoRenderer.ticks(Geo.segment(E,P1),{count:1,color:'#2D5FA6',tickLen:11,width:2}));
      parts.push(GeoRenderer.ticks(Geo.segment(E,P2),{count:1,color:'#2D5FA6',tickLen:11,width:2}));
      parts.push(GeoRenderer.angleArc(Geo.angleArc(E,P1,O,50),{color:red,strokeOnly:true,strokeWidth:2.5}));
      parts.push(GeoRenderer.angleArc(Geo.angleArc(E,O,P2,50),{color:red,strokeOnly:true,strokeWidth:2.5}));
    } else {
      parts.push(GeoRenderer.ticks(Geo.segment(E,P1),{count:1,color:'#2D5FA6',tickLen:16,width:3}));
      parts.push(GeoRenderer.ticks(Geo.segment(E,P2),{count:1,color:'#2D5FA6',tickLen:16,width:3}));
    }
    parts.push(GeoRenderer.point(P1,{r:4,fill:black}));
    parts.push(GeoRenderer.point(P2,{r:4,fill:black}));
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    parts.push(GeoRenderer.point(E,{r:5,fill:black}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
