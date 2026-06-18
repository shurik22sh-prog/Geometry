// t20: in a right triangle, median to hypotenuse = half the hypotenuse
const DiagramTriangleRightMedian = (() => {
  function render(cfg={}) {
    const width=420, height=300;
    const lColor=cfg.lColor??'#1a1a1a', blue='#2D5FA6', gc='#555';
    // right angle at C (bottom-left corner)
    const C=Geo.point(80,245), A=Geo.point(80,65), B=Geo.point(370,245);
    const M=Geo.point((A.x+B.x)/2,(A.y+B.y)/2); // midpoint of hypotenuse AB
    const sq=16;
    const parts=[];
    // right angle mark at C
    const red=cfg.color??'#cc2222';
    parts.push(GeoRenderer.segment(Geo.segment(Geo.point(C.x+sq,C.y),Geo.point(C.x+sq,C.y-sq)),{color:red,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(Geo.point(C.x+sq,C.y-sq),Geo.point(C.x,C.y-sq)),{color:red,width:1.5}));
    // triangle
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // median from C to M
    parts.push(GeoRenderer.segment(Geo.segment(C,M),{color:gc,width:2,dashed:false}));
    // equal tick marks: CM = AM = BM
    parts.push(GeoRenderer.ticks(Geo.segment(C,M),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(A,M),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,M),{count:1,color:blue,tickLen:20,width:3}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
