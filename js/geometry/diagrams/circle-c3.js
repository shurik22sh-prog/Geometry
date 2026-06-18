// c3: Equal chords ↔ equal central angles (chords only, no arc highlights)
const DiagramCircleC3 = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=162, R=130;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const A=ptOn(200), B=ptOn(260), C=ptOn(20), D=ptOn(80);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:blue,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C,D),{color:blue,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(A,B),{count:1,color:blue,tickLen:18,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(C,D),{count:1,color:blue,tickLen:18,width:3}));
    [A,B,C,D].forEach(P=>parts.push(GeoRenderer.segment(Geo.segment(O,P),{color:black,width:1.2})));
    const arcAOB=Geo.angleArc(O,A,B,30);
    const arcCOD=Geo.angleArc(O,C,D,30);
    parts.push(GeoRenderer.angleArc(arcAOB,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcCOD,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
