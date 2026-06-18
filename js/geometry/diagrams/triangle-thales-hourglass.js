// t30: Thales extension 2 – hourglass (two parallel lines, crossing diagonals)
const DiagramTriangleThalesHourglass = (() => {
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
    const width=480, height=350;
    const lColor=cfg.lColor??'#1a1a1a', blue='#2D5FA6', orange='#FF8C00';
    // top and bottom parallel lines
    const TL=Geo.point(145,80), TR=Geo.point(315,80);
    const BL=Geo.point(60,270), BR=Geo.point(400,270);
    // intersection of TL-BR and TR-BL: t=(TR.x-TL.x)/(TR.x-TL.x+BR.x-BL.x-... computed analytically
    const O=Geo.point(230,143);
    // label on segment midpoint, pushed perpendicular away from a reference point
    function segLabelPerp(p1,p2,text,awayFrom){
      const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
      const dx=p2.x-p1.x, dy=p2.y-p1.y, slen=Math.hypot(dx,dy);
      const ux=dx/slen, uy=dy/slen;
      // two perpendicular directions
      const n1x=-uy, n1y=ux, n2x=uy, n2y=-ux;
      // pick the one further from awayFrom
      const d1=(mx+n1x*24-awayFrom.x)**2+(my+n1y*24-awayFrom.y)**2;
      const d2=(mx+n2x*24-awayFrom.x)**2+(my+n2y*24-awayFrom.y)**2;
      const nx=d1>d2?n1x:n2x, ny=d1>d2?n1y:n2y;
      return GeoRenderer.label(Geo.point(mx+nx*14, my+ny*14),text,{color:blue,size:27,bold:true});
    }
    // label on segment midpoint pushed away from hourglass visual center
    const hcx=230, hcy=175;
    function segLabel(p1,p2,text,{extraDy=0}={}){
      const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
      const dx=mx-hcx, dy=my-hcy, len=Math.hypot(dx,dy);
      return GeoRenderer.label(Geo.point(mx+(dx/len)*36, my+(dy/len)*36+extraDy),text,{color:blue,size:27,bold:true});
    }
    const parts=[];
    // diagonal segments
    parts.push(GeoRenderer.segment(Geo.segment(TL,O), {color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(O,BR), {color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(TR,O), {color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(O,BL), {color:lColor,width:2.5}));
    // parallel lines
    parts.push(GeoRenderer.segment(Geo.segment(TL,TR), {color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(BL,BR), {color:lColor,width:2.5}));
    // segment labels: a/c use perpendicular outward (upper triangle); b/d use radial
    parts.push(segLabelPerp(TL,O,'a',TR));
    parts.push(segLabel(O,BR,'b',{extraDy:-10}));
    parts.push(segLabelPerp(TR,O,'c',TL));
    parts.push(segLabel(O,BL,'d',{extraDy:-10}));
    parts.push(GeoRenderer.label(Geo.point(230,60),'e',{color:blue,size:27,bold:true}));
    parts.push(GeoRenderer.label(Geo.point(230,294),'f',{color:blue,size:27,bold:true}));
    // parallel marks
    parts.push(chevron(Geo.segment(TL,TR),{color:orange,size:10,width:2.5}));
    parts.push(chevron(Geo.segment(BL,BR),{color:orange,size:10,width:2.5}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
