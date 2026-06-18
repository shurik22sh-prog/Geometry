// t21: 30-60-90 triangle
const DiagramTriangle306090 = (() => {
  function render(cfg={}) {
    const width=420, height=320;
    const red=cfg.color??'#cc2222', blue='#2D5FA6', lColor=cfg.lColor??'#1a1a1a';
    // right angle at C, 30° at B, 60° at A
    const C=Geo.point(80,250), A=Geo.point(80,72), B=Geo.point(370,250);
    const arcRC=34, arcRA=42, arcRB=72;
    const sq=22;
    function va(V,P1,P2,r){
      const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
      const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
      return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
    }
    const parts=[];
    // right angle mark at C
    parts.push(GeoRenderer.segment(Geo.segment(Geo.point(C.x+sq,C.y),Geo.point(C.x+sq,C.y-sq)),{color:red,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(Geo.point(C.x+sq,C.y-sq),Geo.point(C.x,C.y-sq)),{color:red,width:1.5}));
    // triangle
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // arcs for 60° and 30°
    const arcA=va(A,B,C,arcRA), arcB=va(B,A,C,arcRB);
    parts.push(GeoRenderer.angleArc(arcA,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcB,{color:red,strokeOnly:true,strokeWidth:2}));
    // angle labels
    parts.push(GeoRenderer.label(GeoRenderer.arcLabelPoint(arcA,-arcRA*0.5),'60°',{color:red,bold:true,size:19,dx:6,dy:6}));
    parts.push(GeoRenderer.label(GeoRenderer.arcLabelPoint(arcB,-arcRB*0.5),'30°',{color:red,bold:true,size:19,dx:-18,dy:-5}));
    // side labels: AC (shorter leg, opposite 30°) = a; AB (hypotenuse) = 2a
    const gcx=(A.x+B.x+C.x)/3, gcy=(A.y+B.y+C.y)/3;
    function sideLabel(p1,p2,text,size=26,offset=26){
      const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
      const dx=mx-gcx, dy=my-gcy, len=Math.hypot(dx,dy);
      return GeoRenderer.label(Geo.point(mx+(dx/len)*offset, my+(dy/len)*offset), text, {color:blue,size,bold:true});
    }
    parts.push(sideLabel(A,C,'a',26,16));
    parts.push(sideLabel(A,B,'2a'));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
