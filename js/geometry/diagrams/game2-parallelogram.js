// game2-parallelogram.js — minimal parallelogram: chevrons only
const DiagramGame2Parallelogram = (() => {
  const orange = '#FF8C00', black = '#1a1a1a';

  function chev(p1, p2, n) {
    const dx=p2.x-p1.x, dy=p2.y-p1.y, l=Math.hypot(dx,dy);
    const ux=dx/l, uy=dy/l, nx=-uy, ny=ux, sz=8, gap=13;
    return Array.from({length:n}, (_,i) => {
      const off=(i-(n-1)/2)*gap;
      const cx=(p1.x+p2.x)/2+ux*off, cy=(p1.y+p2.y)/2+uy*off;
      return `<polyline points="${(cx-ux*sz+nx*sz).toFixed(1)},${(cy-uy*sz+ny*sz).toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)} ${(cx-ux*sz-nx*sz).toFixed(1)},${(cy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }).join('\n');
  }

  function render(cfg={}) {
    const w=420, h=240;
    const A=Geo.point(70,55), B=Geo.point(290,55), C=Geo.point(350,185), D=Geo.point(130,185);
    const segs = [Geo.segment(A,B), Geo.segment(B,C), Geo.segment(C,D), Geo.segment(D,A)];
    const parts = segs.map(s => GeoRenderer.segment(s, {color:black, width:2.5}));
    parts.push(chev(A, B, 1), chev(D, C, 1));
    parts.push(chev(B, C, 2), chev(A, D, 2));
    return GeoRenderer.svg(w, h, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }

  return {render};
})();
