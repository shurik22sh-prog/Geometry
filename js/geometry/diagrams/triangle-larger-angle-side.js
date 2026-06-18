// t5: larger side → larger opposite angle (obtuse triangle)
const DiagramTriangleLargerAngleSide = (() => {
  function render(cfg = {}) {
    const width=460, height=495;
    const red=cfg.color??'#cc2222', blue='#2D5FA6', lColor=cfg.lColor??'#1a1a1a';
    // obtuse triangle: β at B (right base) is obtuse (~100°), C is right of B
    // α at A (~24°, smallest), γ at C (~56°, medium)
    const A=Geo.point(50,250), B=Geo.point(390,250), C=Geo.point(420,80);
    const arcRA=62, arcRB=44, arcRC=38;
    function va(V,P1,P2,r){
      const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
      const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
      return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
    }
    const cx=(A.x+B.x+C.x)/3, cy=(A.y+B.y+C.y)/3;
    function ol(p1,p2,d){
      const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
      const dx=mx-cx, dy=my-cy, len=Math.hypot(dx,dy);
      return Geo.point(mx+dx/len*d, my+dy/len*d);
    }
    const parts=[];
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    const arcA=va(A,B,C,arcRA), arcB=va(B,A,C,arcRB), arcC=va(C,A,B,arcRC);
    parts.push(GeoRenderer.angleArc(arcA,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcB,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcC,{color:red,strokeOnly:true,strokeWidth:2}));
    // angle labels: α small at A (left base), β obtuse at B (right base), γ medium at C (top-right)
    parts.push(GeoRenderer.label(GeoRenderer.arcLabelPoint(arcA,-arcRA*0.5),'α',{color:red,bold:true,size:23,dx:12,dy:-6}));
    parts.push(GeoRenderer.label(GeoRenderer.arcLabelPoint(arcB,-arcRB*0.5),'β',{color:red,bold:true,size:23,dx:-4,dy:-6}));
    parts.push(GeoRenderer.label(GeoRenderer.arcLabelPoint(arcC,-arcRC*0.5),'γ',{color:red,bold:true,size:23,dx:-4}));
    // side labels: a=BC (shortest, opp α), b=AC (longest, opp β), c=AB (medium, opp γ)
    parts.push(GeoRenderer.label(ol(B,C,24),'a',{color:blue,bold:true,size:30}));
    parts.push(GeoRenderer.label(ol(A,C,26),'b',{color:blue,bold:true,size:30}));
    parts.push(GeoRenderer.label(ol(A,B,18),'c',{color:blue,bold:true,size:30,dx:14}));
    const fa=`font-family="Assistant,sans-serif" font-weight="bold" text-anchor="middle" direction="rtl"`;
    const x=width/2;
    parts.push(`<text x="${x}" y="385" font-size="32" ${fa}>` +
      `<tspan fill="${lColor}" font-size="27">אם&#160;&#160;</tspan>` +
      `<tspan fill="${blue}">a&lt;b וגם c&lt;b</tspan>` +
      `<tspan fill="${lColor}" font-size="27">&#160;&#160;אז&#160;&#160;</tspan>` +
      `<tspan fill="${red}">α&lt;β וגם γ&lt;β</tspan>` +
      `</text>`);
    parts.push(`<text x="${x}" y="458" font-size="32" ${fa}>` +
      `<tspan fill="${lColor}" font-size="27">אם&#160;&#160;</tspan>` +
      `<tspan fill="${red}">α&lt;β וגם γ&lt;β</tspan>` +
      `<tspan fill="${lColor}" font-size="27">&#160;&#160;אז&#160;&#160;</tspan>` +
      `<tspan fill="${blue}">a&lt;b וגם c&lt;b</tspan>` +
      `</text>`);
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
