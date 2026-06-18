// t14: segment from midpoint of side, equal to half opposite side → is midpoint segment
const DiagramTriangleMidpointFromHalf = (() => {
  function render(cfg={}) {
    const width=440, height=300;
    const lColor=cfg.lColor??'#1a1a1a', blue='#2D5FA6';
    const A=Geo.point(80,250), B=Geo.point(380,250), C=Geo.point(200,55);
    // M = midpoint of AC, N on BC such that MN = AB/2
    const M=Geo.point((A.x+C.x)/2,(A.y+C.y)/2);
    const N=Geo.point((B.x+C.x)/2,(B.y+C.y)/2);
    const mnMid=Geo.point((M.x+N.x)/2,(M.y+N.y)/2);
    const abMid=Geo.point((A.x+B.x)/2,(A.y+B.y)/2);
    const parts=[];
    // triangle
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // midpoint segment MN
    parts.push(GeoRenderer.segment(Geo.segment(M,N),{color:lColor,width:2.5}));
    // length labels: a on MN (below), 2a on AB (below, outside triangle)
    parts.push(GeoRenderer.label(Geo.point(mnMid.x,mnMid.y+13),'a',{color:blue,bold:true,size:26}));
    parts.push(GeoRenderer.label(Geo.point(abMid.x,abMid.y+20),'2a',{color:blue,bold:true,size:26}));
    // equal halves only on AC (left side — given that M is the midpoint)
    parts.push(GeoRenderer.ticks(Geo.segment(A,M),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(M,C),{count:1,color:blue,tickLen:20,width:3}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
