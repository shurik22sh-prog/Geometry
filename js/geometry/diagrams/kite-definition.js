// q20: Two pairs of equal adjacent sides → kite (deltoid)
const DiagramKiteDefinition = (() => {
  function render(cfg={}) {
    const width=490, height=420;
    const black='#1a1a1a', blue='#2D5FA6';
    const T=Geo.point(245,40), R=Geo.point(355,135), B=Geo.point(245,385), L=Geo.point(135,135);
    const parts=[];
    [Geo.segment(T,R),Geo.segment(R,B),Geo.segment(B,L),Geo.segment(L,T)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    parts.push(GeoRenderer.ticks(Geo.segment(T,R),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(T,L),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,R),{count:2,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,L),{count:2,color:blue,tickLen:20,width:3}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
