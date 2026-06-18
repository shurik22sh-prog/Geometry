// t31–t32: angle bisector theorem – bisector divides opposite side in ratio of adjacent sides
const DiagramTriangleAngleBisectorTheorem = (() => {
  function va(V,P1,P2,r){
    const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
    const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
    return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
  }
  function render(cfg={}) {
    const width=440, height=395;
    const red=cfg.color??'#cc2222', blue='#2D5FA6', lColor=cfg.lColor??'#1a1a1a', gc='#555';
    const A=Geo.point(200,52), B=Geo.point(55,255), C=Geo.point(400,255);
    // side lengths AB and AC
    const AB=Math.hypot(A.x-B.x,A.y-B.y), AC=Math.hypot(A.x-C.x,A.y-C.y);
    // D on BC: BD/DC = AB/AC
    const r=AB/(AB+AC);
    const D=Geo.point(B.x+r*(C.x-B.x), B.y+r*(C.y-B.y));
    // centroid for outward label offsets
    const cx=(A.x+B.x+C.x)/3, cy=(A.y+B.y+C.y)/3;
    function sideLabel(p1,p2,text,offset=22,extraDx=0){
      const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
      const dx=mx-cx, dy=my-cy, len=Math.hypot(dx,dy);
      return GeoRenderer.label(Geo.point(mx+(dx/len)*offset+extraDx, my+(dy/len)*offset),text,{color:blue,size:22,bold:true});
    }
    const parts=[];
    // triangle
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // bisector AD
    parts.push(GeoRenderer.segment(Geo.segment(A,D),{color:gc,width:2,dashed:false}));
    // equal angle arcs at A (bisector splits angle in two)
    const bisD={x:(D.x-A.x)/Math.hypot(D.x-A.x,D.y-A.y),y:(D.y-A.y)/Math.hypot(D.x-A.x,D.y-A.y)};
    const arcAB=va(A,B,D,38), arcAC=va(A,D,C,38);
    parts.push(GeoRenderer.angleArc(arcAB,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcAC,{color:red,strokeOnly:true,strokeWidth:2}));
    // segment labels a–d
    parts.push(sideLabel(A,B,'a'));
    parts.push(sideLabel(A,C,'b'));
    parts.push(sideLabel(B,D,'c',22,22));
    parts.push(sideLabel(D,C,'d',22,-22));
    // formula: a/b = c/d as fractions
    const font=`font-family="Assistant,Arial,sans-serif" font-weight="bold" font-size="30" fill="${blue}"`;
    const fy=height-58, fbar=height-44, fdenom=height-18;
    const f1x=175, f2x=265, eqx=220, bw=22;
    parts.push(`<text x="${f1x}" y="${fy}" text-anchor="middle" ${font}>a</text>`);
    parts.push(`<line x1="${f1x-bw}" y1="${fbar}" x2="${f1x+bw}" y2="${fbar}" stroke="${blue}" stroke-width="2.2"/>`);
    parts.push(`<text x="${f1x}" y="${fdenom}" text-anchor="middle" ${font}>b</text>`);
    parts.push(`<text x="${eqx}" y="${fbar+8}" text-anchor="middle" ${font}>=</text>`);
    parts.push(`<text x="${f2x}" y="${fy}" text-anchor="middle" ${font}>c</text>`);
    parts.push(`<line x1="${f2x-bw}" y1="${fbar}" x2="${f2x+bw}" y2="${fbar}" stroke="${blue}" stroke-width="2.2"/>`);
    parts.push(`<text x="${f2x}" y="${fdenom}" text-anchor="middle" ${font}>d</text>`);
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
