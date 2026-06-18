// c13: Central angle = 2 × inscribed angle on same arc
const DiagramCircleCentralInscribed = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', red='#cc2222';
    const cx=245, cy=172, R=130;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    function circArc(a1,a2,color,w=3.5){
      const p1=ptOn(a1),p2=ptOn(a2);
      const span=((a2-a1)+360)%360, sweep=span<=180?1:0;
      return `<path d="M ${p1.x.toFixed(1)},${p1.y.toFixed(1)} A ${R} ${R} 0 0 ${sweep} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
    }
    const B=ptOn(30), C=ptOn(150), A=ptOn(-90);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(circArc(30,150,black));
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:1.8}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:black,width:1.8}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:black,width:1.8}));
    parts.push(GeoRenderer.segment(Geo.segment(O,B),{color:black,width:1.8}));
    parts.push(GeoRenderer.segment(Geo.segment(O,C),{color:black,width:1.8}));
    const arcO=Geo.angleArc(O,B,C,36);
    parts.push(GeoRenderer.angleArc(arcO,{color:red,strokeOnly:true,strokeWidth:2}));
    const lO=GeoRenderer.arcLabelPoint(arcO,-18);
    parts.push(GeoRenderer.label(lO,'2α',{size:21,bold:true,color:red}));
    const arcA=Geo.angleArc(A,B,C,36);
    parts.push(GeoRenderer.angleArc(arcA,{color:red,strokeOnly:true,strokeWidth:2}));
    const lA=GeoRenderer.arcLabelPoint(arcA,-18);
    parts.push(GeoRenderer.label(lA,'α',{size:22,bold:true,color:red}));
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
