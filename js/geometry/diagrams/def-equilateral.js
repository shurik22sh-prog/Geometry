// def: משולש שווה צלעות – equilateral triangle
const DiagramDefEquilateral = (() => {
  function render(cfg={}) {
    const width=490, height=310;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const A = Geo.point(245, 55);
    const B = Geo.point(125, 265);
    const C = Geo.point(365, 265);
    const arcR = 34;
    function va(V, P1, P2) {
      const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
      const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
      return Geo.angleArc(V, Geo.point(V.x+d1.x*arcR,V.y+d1.y*arcR), Geo.point(V.x+d2.x*arcR,V.y+d2.y*arcR), arcR);
    }
    const parts = [];
    parts.push(GeoRenderer.segment(Geo.segment(A, B), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B, C), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C, A), {color:black, width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(A, B), {count:1, color:blue, tickLen:16, width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(B, C), {count:1, color:blue, tickLen:16, width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(C, A), {count:1, color:blue, tickLen:16, width:2.5}));
    // 60° labels at each vertex (no arc contours)
    const arcA=va(A,B,C), arcB=va(B,A,C), arcC=va(C,A,B);
    const lpA=GeoRenderer.arcLabelPoint(arcA, 16);
    const lpB=GeoRenderer.arcLabelPoint(arcB, 16);
    const lpC=GeoRenderer.arcLabelPoint(arcC, 16);
    parts.push(GeoRenderer.label(Geo.point(lpA.x, lpA.y - 9),'60°',{color:red,bold:true,size:20}));
    parts.push(GeoRenderer.label(lpB,'60°',{color:red,bold:true,size:20}));
    parts.push(GeoRenderer.label(lpC,'60°',{color:red,bold:true,size:20}));
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
