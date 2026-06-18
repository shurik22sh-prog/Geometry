// t8: a median divides a triangle into two equal-area triangles
const DiagramTriangleMedianArea = (() => {
  function render(cfg={}) {
    const width=440, height=300;
    const blue='#2D5FA6', lColor=cfg.lColor??'#1a1a1a', purple='#8B2FC9';
    const A=Geo.point(80,250), B=Geo.point(380,250), C=Geo.point(200,60);
    const M=Geo.point((A.x+B.x)/2,(A.y+B.y)/2);
    const parts=[];
    // S labels at centroid of each sub-triangle
    const cent1=Geo.point((A.x+M.x+C.x)/3,(A.y+M.y+C.y)/3);
    const cent2=Geo.point((M.x+B.x+C.x)/3,(M.y+B.y+C.y)/3);
    parts.push(GeoRenderer.label(cent1,'S',{color:purple,size:52,bold:true}));
    parts.push(GeoRenderer.label(cent2,'S',{color:purple,size:52,bold:true}));
    // triangle
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // median
    parts.push(GeoRenderer.segment(Geo.segment(C,M),{color:'#555',width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(A,M),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(M,B),{count:1,color:blue,tickLen:20,width:3}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
