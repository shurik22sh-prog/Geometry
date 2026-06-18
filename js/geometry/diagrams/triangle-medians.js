// t7: three medians meet at one point (centroid), 2:1 ratio
const DiagramTriangleMedians = (() => {
  function render(cfg={}) {
    const width=520, height=340;
    const lColor=cfg.lColor??'#1a1a1a', blue='#2D5FA6', gc='#888';
    const A=Geo.point(55,295), B=Geo.point(465,295), C=Geo.point(260,45);
    const mBC=Geo.point((B.x+C.x)/2,(B.y+C.y)/2);
    const mAC=Geo.point((A.x+C.x)/2,(A.y+C.y)/2);
    const mAB=Geo.point((A.x+B.x)/2,(A.y+B.y)/2);
    const G=Geo.point((A.x+B.x+C.x)/3,(A.y+B.y+C.y)/3);
    const parts=[];
    // medians
    parts.push(GeoRenderer.segment(Geo.segment(A,mBC),{color:gc,width:1.5,dashed:false}));
    parts.push(GeoRenderer.segment(Geo.segment(B,mAC),{color:gc,width:1.5,dashed:false}));
    parts.push(GeoRenderer.segment(Geo.segment(C,mAB),{color:gc,width:1.5,dashed:false}));
    // triangle
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // equal-half tick marks on each bisected side (different counts per side)
    parts.push(GeoRenderer.ticks(Geo.segment(B,mBC),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(mBC,C),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(A,mAC),{count:2,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(mAC,C),{count:2,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(A,mAB),{count:3,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(mAB,B),{count:3,color:blue,tickLen:20,width:3}));
    // centroid dot
    parts.push(`<circle cx="${G.x.toFixed(1)}" cy="${G.y.toFixed(1)}" r="5" fill="${lColor}"/>`);
    // label each median with its letter, off = right-perpendicular offset
    const off=12;
    function medLabel(V, M, letter, flip=1) {
      const dx=M.x-V.x, dy=M.y-V.y, len=Math.hypot(dx,dy);
      const rx=flip*dy/len, ry=flip*(-dx/len);
      parts.push(GeoRenderer.label(Geo.point((V.x+G.x)/2+rx*off,(V.y+G.y)/2+ry*off),'2'+letter,{color:blue,bold:true,size:22}));
      parts.push(GeoRenderer.label(Geo.point((G.x+M.x)/2+rx*off,(G.y+M.y)/2+ry*off),letter,{color:blue,bold:true,size:22}));
    }
    medLabel(A, mBC, 'a');
    medLabel(B, mAC, 'b', -1);
    medLabel(C, mAB, 'c');
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
