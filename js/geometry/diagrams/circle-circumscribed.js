// c23: Triangle inscribed in circumscribed circle – perpendicular bisectors meet at center
const DiagramCircleCircumscribed = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', red=cfg.color??'#cc2222', blue='#2D5FA6';
    const cx=245, cy=162, R=125;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const A=ptOn(-80), B=ptOn(40), C=ptOn(195);

    function vn(v){const l=Math.hypot(v.x,v.y);return {x:v.x/l,y:v.y/l};}

    function rightAngleMark(M, sideDir, perpDir, sq=14) {
      const d1=vn(sideDir), d2=vn(perpDir);
      const p1x=(M.x+d1.x*sq).toFixed(1), p1y=(M.y+d1.y*sq).toFixed(1);
      const p2x=(M.x+d1.x*sq+d2.x*sq).toFixed(1), p2y=(M.y+d1.y*sq+d2.y*sq).toFixed(1);
      const p3x=(M.x+d2.x*sq).toFixed(1), p3y=(M.y+d2.y*sq).toFixed(1);
      return `<polyline points="${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}" fill="none" stroke="${red}" stroke-width="2.5" stroke-linejoin="miter"/>`;
    }

    function addPerpBisector(P1, P2, tickCount, parts) {
      const M=Geo.point((P1.x+P2.x)/2,(P1.y+P2.y)/2);
      const dToO={x:O.x-M.x, y:O.y-M.y};
      const sideDir={x:P2.x-P1.x, y:P2.y-P1.y};
      // Bisector: from O (circumcenter) to M (midpoint of side) — no overshoot
      parts.push(GeoRenderer.segment(Geo.segment(O,M),{color:black,width:1.5}));
      parts.push(rightAngleMark(M, sideDir, dToO, 14));
      parts.push(GeoRenderer.ticks(Geo.segment(P1,M),{count:tickCount,color:blue,tickLen:14,width:2.5}));
      parts.push(GeoRenderer.ticks(Geo.segment(M,P2),{count:tickCount,color:blue,tickLen:14,width:2.5}));
    }

    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C,A),{color:black,width:2.5}));
    addPerpBisector(A, B, 1, parts);
    addPerpBisector(B, C, 2, parts);
    addPerpBisector(C, A, 3, parts);
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
