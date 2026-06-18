// q7: Adjacent angles in a parallelogram sum to 180°
const DiagramParallelogramAdjAngles = (() => {
  function render(cfg={}) {
    const width=500, height=350;
    const red='#cc2222', black='#1a1a1a';
    const A=Geo.point(100,70), B=Geo.point(380,70), C=Geo.point(460,250), D=Geo.point(180,250);
    function vn(v){const l=Math.hypot(v.x,v.y);return{x:v.x/l,y:v.y/l};}
    function mkArc(V,p1,p2,r){
      const d1=vn({x:p1.x-V.x,y:p1.y-V.y}),d2=vn({x:p2.x-V.x,y:p2.y-V.y});
      return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
    }
    const R=46, parts=[];
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    const arcA=mkArc(A,D,B,R), arcD=mkArc(D,C,A,R);
    parts.push(GeoRenderer.angleArc(arcA,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcD,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.label(GeoRenderer.arcLabelPoint(arcA,-R*0.5),'α',{color:red,size:23,bold:true}));
    parts.push(GeoRenderer.label(GeoRenderer.arcLabelPoint(arcD,-R*0.5),'β',{color:red,size:23,bold:true}));
    parts.push(`<text x="250" y="${height-28}" text-anchor="middle" font-family="Assistant,Arial,sans-serif" font-weight="bold" font-size="32" fill="${red}">α + β = 180°</text>`);
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
