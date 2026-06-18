// c11,c12: Equal chords are equidistant from center / longer chord is closer
const DiagramCircleChordDistance = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=162, R=130;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    function vn(v){const l=Math.hypot(v.x,v.y);return{x:v.x/l,y:v.y/l};}
    function rightAngle(V,t1,t2,sq=24){
      const d1=vn({x:t1.x-V.x,y:t1.y-V.y}),d2=vn({x:t2.x-V.x,y:t2.y-V.y});
      const p1={x:V.x+d1.x*sq,y:V.y+d1.y*sq};
      const p2={x:p1.x+d2.x*sq,y:p1.y+d2.y*sq};
      const p3={x:V.x+d2.x*sq,y:V.y+d2.y*sq};
      return `<polyline points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="none" stroke="${red}" stroke-width="1.8"/>`;
    }
    const A=ptOn(100), B=ptOn(200);
    const C=ptOn(-20), D=ptOn(80);
    const M1=Geo.point((A.x+B.x)/2,(A.y+B.y)/2);
    const M2=Geo.point((C.x+D.x)/2,(C.y+D.y)/2);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:blue,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C,D),{color:blue,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(O,M1),{color:black,width:1.8}));
    parts.push(GeoRenderer.segment(Geo.segment(O,M2),{color:black,width:1.8}));
    parts.push(rightAngle(M1,O,A,13));
    parts.push(rightAngle(M2,O,C,13));
    parts.push(GeoRenderer.ticks(Geo.segment(O,M1),{count:1,color:black,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(O,M2),{count:1,color:black,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
