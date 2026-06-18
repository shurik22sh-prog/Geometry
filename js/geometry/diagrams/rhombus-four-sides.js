// q12: Quadrilateral with 4 equal sides is a rhombus
const DiagramRhombusFourSides = (() => {
  function render(cfg={}) {
    const width=490, height=350;
    const black='#1a1a1a', blue='#2D5FA6';
    const A=Geo.point(245,55), B=Geo.point(405,175), C=Geo.point(245,295), D=Geo.point(85,175);
    const parts=[];
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.ticks(s,{count:1,color:blue,tickLen:20,width:3})));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
