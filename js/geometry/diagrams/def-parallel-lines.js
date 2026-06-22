// def: ישרים מקבילים – parallel lines
const DiagramDefParallelLines = (() => {
  function render(cfg={}) {
    const width=490, height=210;
    const black='#4f52d0', orange='#FF8C00';
    function chev(seg) {
      const dx=seg.p2.x-seg.p1.x, dy=seg.p2.y-seg.p1.y, l=Math.hypot(dx,dy);
      const ux=dx/l, uy=dy/l, nx=-uy, ny=ux, sz=8;
      const pcx=(seg.p1.x+seg.p2.x)/2, pcy=(seg.p1.y+seg.p2.y)/2;
      return `<polyline points="${(pcx-ux*sz+nx*sz).toFixed(1)},${(pcy-uy*sz+ny*sz).toFixed(1)} ${pcx.toFixed(1)},${pcy.toFixed(1)} ${(pcx-ux*sz-nx*sz).toFixed(1)},${(pcy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    const L1 = Geo.segment(Geo.point(60, 75), Geo.point(420, 75));
    const L2 = Geo.segment(Geo.point(60, 150), Geo.point(420, 150));
    const parts = [];
    parts.push(GeoRenderer.segment(L1, {color:black, width:2.5}));
    parts.push(GeoRenderer.segment(L2, {color:black, width:2.5}));
    parts.push(chev(L1));
    parts.push(chev(L2));
    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
