// t29: Thales extension – parallel line creates similar triangle; labels e/f on parallel sides
const DiagramTriangleThalesExtension = (() => {
  function chevron(seg,{color='#FF8C00',size=10,width=2.5,shift=0}={}){
    const dx=seg.p2.x-seg.p1.x, dy=seg.p2.y-seg.p1.y, l=Math.hypot(dx,dy);
    const ux=dx/l, uy=dy/l;
    const nx=-uy, ny=ux;
    const cx=(seg.p1.x+seg.p2.x)/2 + ux*shift, cy=(seg.p1.y+seg.p2.y)/2 + uy*shift;
    const x1=(cx-ux*size+nx*size).toFixed(1), y1=(cy-uy*size+ny*size).toFixed(1);
    const x2=cx.toFixed(1),                   y2=cy.toFixed(1);
    const x3=(cx-ux*size-nx*size).toFixed(1), y3=(cy-uy*size-ny*size).toFixed(1);
    return `<polyline points="${x1},${y1} ${x2},${y2} ${x3},${y3}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round"/>`;
  }
  function render(cfg={}) {
    const width=440, height=375;
    const lColor=cfg.lColor??'#1a1a1a', blue='#2D5FA6', orange='#FF8C00';
    const A=Geo.point(220,52), B=Geo.point(60,255), C=Geo.point(380,255);
    const t=0.42;
    const D=Geo.point(A.x+t*(B.x-A.x), A.y+t*(B.y-A.y));
    const E=Geo.point(A.x+t*(C.x-A.x), A.y+t*(C.y-A.y));
    const gcx=(A.x+B.x+C.x)/3, gcy=(A.y+B.y+C.y)/3;
    function sideLabel(p1,p2,text,{offset=22,dx=0,dy=0}={}){
      const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
      const odx=mx-gcx, ody=my-gcy, len=Math.hypot(odx,ody);
      return GeoRenderer.label(Geo.point(mx+(odx/len)*offset+dx, my+(ody/len)*offset+dy),text,{color:blue,size:27,bold:true});
    }
    const parts=[];
    // triangle
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // parallel line DE (black)
    parts.push(GeoRenderer.segment(Geo.segment(D,E),{color:lColor,width:2.5}));
    // segment labels on sides
    parts.push(sideLabel(A,D,'a',{dx:-8,dy:12}));
    parts.push(sideLabel(D,B,'b'));
    parts.push(sideLabel(A,E,'c',{dy:12}));
    parts.push(sideLabel(E,C,'d'));
    // labels e on DE, f on BC
    parts.push(sideLabel(D,E,'e',{dy:8}));
    parts.push(sideLabel(B,C,'f',{offset:-22,dy:2}));
    // parallel marks
    parts.push(chevron(Geo.segment(B,C),{color:orange,size:10,width:2.5,shift:45}));
    parts.push(chevron(Geo.segment(D,E),{color:orange,size:10,width:2.5,shift:45}));
    // formula: a/(a+b) = c/(c+d) = e/f
    const font=`font-family="Assistant,Arial,sans-serif" font-weight="bold" font-size="30" fill="${blue}"`;
    const fy=height-62, fbar=height-48, fdenom=height-15;
    const f1x=110, f2x=215, f3x=320, eq1x=162, eq2x=268;
    const bw1=32, bw2=32, bw3=20;
    parts.push(`<text x="${f1x}" y="${fy}" text-anchor="middle" ${font}>a</text>`);
    parts.push(`<line x1="${f1x-bw1}" y1="${fbar}" x2="${f1x+bw1}" y2="${fbar}" stroke="${blue}" stroke-width="2"/>`);
    parts.push(`<text x="${f1x}" y="${fdenom}" text-anchor="middle" ${font}>a+b</text>`);
    parts.push(`<text x="${eq1x}" y="${fbar+9}" text-anchor="middle" ${font}>=</text>`);
    parts.push(`<text x="${f2x}" y="${fy}" text-anchor="middle" ${font}>c</text>`);
    parts.push(`<line x1="${f2x-bw2}" y1="${fbar}" x2="${f2x+bw2}" y2="${fbar}" stroke="${blue}" stroke-width="2"/>`);
    parts.push(`<text x="${f2x}" y="${fdenom}" text-anchor="middle" ${font}>c+d</text>`);
    parts.push(`<text x="${eq2x}" y="${fbar+9}" text-anchor="middle" ${font}>=</text>`);
    parts.push(`<text x="${f3x}" y="${fy}" text-anchor="middle" ${font}>e</text>`);
    parts.push(`<line x1="${f3x-bw3}" y1="${fbar}" x2="${f3x+bw3}" y2="${fbar}" stroke="${blue}" stroke-width="2"/>`);
    parts.push(`<text x="${f3x}" y="${fdenom}" text-anchor="middle" ${font}>f</text>`);
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
