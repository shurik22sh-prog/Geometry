// t13: segment from midpoint of side, parallel to opposite side → is midpoint segment
const DiagramTriangleMidpointFromMid = (() => {
  function chevron(seg, {color='#FF8C00', size=10, width=2.5}={}) {
    const dx=seg.p2.x-seg.p1.x, dy=seg.p2.y-seg.p1.y, l=Math.hypot(dx,dy);
    const ux=dx/l, uy=dy/l;
    const nx=-uy, ny=ux;
    const cx=(seg.p1.x+seg.p2.x)/2, cy=(seg.p1.y+seg.p2.y)/2;
    const x1=(cx-ux*size+nx*size).toFixed(1), y1=(cy-uy*size+ny*size).toFixed(1);
    const x2=cx.toFixed(1),                   y2=cy.toFixed(1);
    const x3=(cx-ux*size-nx*size).toFixed(1), y3=(cy-uy*size-ny*size).toFixed(1);
    return `<polyline points="${x1},${y1} ${x2},${y2} ${x3},${y3}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round"/>`;
  }
  function render(cfg={}) {
    const width=440, height=300;
    const lColor=cfg.lColor??'#1a1a1a', blue='#2D5FA6', orange='#FF8C00';
    const A=Geo.point(80,250), B=Geo.point(380,250), C=Geo.point(200,55);
    // M = midpoint of AC, N = midpoint of BC → MN || AB
    const M=Geo.point((A.x+C.x)/2,(A.y+C.y)/2);
    const N=Geo.point((B.x+C.x)/2,(B.y+C.y)/2);
    const parts=[];
    // triangle
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // midpoint segment MN
    parts.push(GeoRenderer.segment(Geo.segment(M,N),{color:lColor,width:2.5}));
    // parallel marks: orange chevron on AB and MN (given)
    parts.push(chevron(Geo.segment(A,B),{color:orange,size:10,width:2.5}));
    parts.push(chevron(Geo.segment(M,N),{color:orange,size:10,width:2.5}));
    // equal halves only on AC (left side — given that M is the midpoint)
    parts.push(GeoRenderer.ticks(Geo.segment(A,M),{count:1,color:blue,tickLen:20,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(M,C),{count:1,color:blue,tickLen:20,width:3}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
