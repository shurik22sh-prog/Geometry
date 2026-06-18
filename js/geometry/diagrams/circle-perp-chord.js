// c9,c10: Perpendicular from center to chord bisects the chord
const DiagramCirclePerpChord = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=165, R=130;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    function vn(v){const l=Math.hypot(v.x,v.y);return{x:v.x/l,y:v.y/l};}
    function rightAngle(V,t1,t2,sq=14){
      const d1=vn({x:t1.x-V.x,y:t1.y-V.y}),d2=vn({x:t2.x-V.x,y:t2.y-V.y});
      const p1={x:V.x+d1.x*sq,y:V.y+d1.y*sq};
      const p2={x:p1.x+d2.x*sq,y:p1.y+d2.y*sq};
      const p3={x:V.x+d2.x*sq,y:V.y+d2.y*sq};
      return `<polyline points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="none" stroke="${red}" stroke-width="2"/>`;
    }
    // Chord A(10°)→B(150°): nicely angled chord
    const A=ptOn(25), B=ptOn(125);
    const M=Geo.point((A.x+B.x)/2,(A.y+B.y)/2); // midpoint
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:2.5}));
    // Perpendicular from O to M
    parts.push(GeoRenderer.segment(Geo.segment(O,M),{color:black,width:2}));
    parts.push(rightAngle(M,O,A,14));
    // Equal halves
    parts.push(GeoRenderer.ticks(Geo.segment(A,M),{count:1,color:blue,tickLen:16,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(M,B),{count:1,color:blue,tickLen:16,width:3}));
    // Radii OA and OB
    parts.push(GeoRenderer.segment(Geo.segment(O,A),{color:black,width:1.2}));
    parts.push(GeoRenderer.segment(Geo.segment(O,B),{color:black,width:1.2}));
    // OM bisects angle AOB – two equal arcs at O
    const arcOA=Geo.angleArc(O,A,M,18);
    const arcOB=Geo.angleArc(O,M,B,18);
    parts.push(GeoRenderer.angleArc(arcOA,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcOB,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    parts.push(GeoRenderer.point(M,{r:4,fill:black}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
