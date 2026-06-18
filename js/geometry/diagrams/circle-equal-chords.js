// c3,c4,c5: Equal chords ↔ equal central angles ↔ equal arcs
const DiagramCircleEqualChords = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=162, R=130;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    function circArc(a1,a2,color,w=3.5){
      const p1=ptOn(a1),p2=ptOn(a2);
      const span=((a2-a1)+360)%360, sweep=span<=180?1:0;
      return `<path d="M ${p1.x.toFixed(1)},${p1.y.toFixed(1)} A ${R} ${R} 0 0 ${sweep} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
    }
    // Chord 1: A(200°)→B(260°), arc span=60°
    const A=ptOn(200), B=ptOn(260);
    // Chord 2: C(20°)→D(80°), same span=60° → equal chord
    const C=ptOn(20), D=ptOn(80);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    // Chords (blue)
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:blue,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C,D),{color:blue,width:2.5}));
    // Tick marks on chords
    parts.push(GeoRenderer.ticks(Geo.segment(A,B),{count:1,color:blue,tickLen:18,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(C,D),{count:1,color:blue,tickLen:18,width:3}));
    // Radii to endpoints (thin black)
    [A,B,C,D].forEach(P=>parts.push(GeoRenderer.segment(Geo.segment(O,P),{color:black,width:1.2})));
    // Central angle arcs at O
    const arcAOB=Geo.angleArc(O,A,B,30);
    const arcCOD=Geo.angleArc(O,C,D,30);
    parts.push(GeoRenderer.angleArc(arcAOB,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcCOD,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
