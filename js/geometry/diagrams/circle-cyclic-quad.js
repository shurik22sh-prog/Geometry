// c25: Cyclic quadrilateral – opposite angles sum to 180°
const DiagramCircleCyclicQuad = (() => {
  function render(cfg={}) {
    const width=490, height=430;
    const black='#1a1a1a', red=cfg.color??'#cc2222';
    const cx=245, cy=165, R=145;
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const A=ptOn(-70), B=ptOn(40), C=ptOn(155), D=ptOn(248);

    function vn(v){const l=Math.hypot(v.x,v.y);return {x:v.x/l,y:v.y/l};}
    function va(V,P1,P2,r){
      const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
      const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
      return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
    }
    // Label placed at midpoint-of-arc direction, 55% of arcR from vertex
    function arcLabel(V, P1, P2, r, text) {
      const u1=vn({x:P1.x-V.x,y:P1.y-V.y}), u2=vn({x:P2.x-V.x,y:P2.y-V.y});
      const mid=vn({x:u1.x+u2.x,y:u1.y+u2.y});
      const lx=(V.x+mid.x*r*0.58).toFixed(1), ly=(V.y+mid.y*r*0.58).toFixed(1);
      return `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-family="Assistant,sans-serif" font-size="22" font-weight="bold" fill="${red}" direction="ltr">${text}</text>`;
    }

    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C,D),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(D,A),{color:black,width:2.5}));

    // Angle arcs – smaller radius for upper vertices A and D
    const arcRtop=28, arcRbot=40;
    parts.push(GeoRenderer.angleArc(va(A,D,B,arcRtop),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(arcLabel(A,D,B,arcRtop,'α'));
    parts.push(GeoRenderer.angleArc(va(B,A,C,arcRbot),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(arcLabel(B,A,C,arcRbot,'β'));
    parts.push(GeoRenderer.angleArc(va(C,B,D,arcRbot),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(arcLabel(C,B,D,arcRbot,'γ'));
    parts.push(GeoRenderer.angleArc(va(D,C,A,arcRtop),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(arcLabel(D,C,A,arcRtop,'δ'));

    // Formula below: α + γ = β + δ = 180°
    const fn=`font-family="Assistant,sans-serif" font-size="34" font-weight="bold" fill="${red}" direction="ltr"`;
    parts.push(`<text x="${cx}" y="385" text-anchor="middle" ${fn}>α + γ = β + δ = 180°</text>`);

    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
