// t27–t30: Thales theorem – line parallel to one side divides other two sides proportionally
const DiagramTriangleThales = (() => {
  function chevron(seg,{color='#FF8C00',size=10,width=2.5}={}){
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
    // A at top, B and C at base
    const A=Geo.point(220,52), B=Geo.point(60,255), C=Geo.point(380,255);
    // D on AB, E on AC – at 42% of the way from A (higher position)
    const t=0.42;
    const D=Geo.point(A.x+t*(B.x-A.x), A.y+t*(B.y-A.y));
    const E=Geo.point(A.x+t*(C.x-A.x), A.y+t*(C.y-A.y));
    // centroid for outward label offsets
    const cx=(A.x+B.x+C.x)/3, cy=(A.y+B.y+C.y)/3;
    function sideLabel(p1,p2,text,{offset=22,dy=0}={}){
      const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
      const odx=mx-cx, ody=my-cy, len=Math.hypot(odx,ody);
      return GeoRenderer.label(Geo.point(mx+(odx/len)*offset, my+(ody/len)*offset+dy),text,{color:blue,size:27,bold:true});
    }
    const parts=[];
    // triangle
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // parallel line DE (black)
    parts.push(GeoRenderer.segment(Geo.segment(D,E),{color:lColor,width:2.5}));
    // segment labels: AD=a, DB=b on left; AE=c, EC=d on right
    parts.push(sideLabel(A,D,'a',{offset:30,dy:12}));
    parts.push(sideLabel(D,B,'b'));
    parts.push(sideLabel(A,E,'c',{offset:30,dy:12}));
    parts.push(sideLabel(E,C,'d'));
    // parallel marks on BC and DE
    parts.push(chevron(Geo.segment(B,C),{color:orange,size:10,width:2.5}));
    parts.push(chevron(Geo.segment(D,E),{color:orange,size:10,width:2.5}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
