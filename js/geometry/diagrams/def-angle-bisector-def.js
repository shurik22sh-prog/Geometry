// def: חוצה זווית – angle bisector of a triangle
const DiagramDefAngleBisectorDef = (() => {
  function render(cfg={}) {
    const width=490, height=290;
    const black='#4f52d0', blue='#2D5FA6', red='#cc2222';
    const A = Geo.point(200, 55);
    const B = Geo.point(80, 245);
    const C = Geo.point(410, 245);
    const AB = Math.hypot(A.x-B.x, A.y-B.y);
    const AC = Math.hypot(A.x-C.x, A.y-C.y);
    const BC = Math.hypot(B.x-C.x, B.y-C.y);
    const BD = BC * AB / (AB + AC);
    const D = Geo.point(B.x + BD * (C.x-B.x)/BC, B.y + BD * (C.y-B.y)/BC);
    const arcR = 38;
    const parts = [];
    parts.push(GeoRenderer.segment(Geo.segment(A, B), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B, C), {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A, C), {color:black, width:2.5}));
    // Bisector (blue, bold)
    parts.push(GeoRenderer.segment(Geo.segment(A, D), {color:blue, width:4}));
    // Equal angle arcs at A
    const arcLeft  = Geo.angleArc(A, B, D, arcR);
    const arcRight = Geo.angleArc(A, D, C, arcR);
    parts.push(GeoRenderer.angleArc(arcLeft,  {color:red, strokeOnly:true, strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcRight, {color:red, strokeOnly:true, strokeWidth:2}));
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
