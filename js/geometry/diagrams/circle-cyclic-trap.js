// c26: Cyclic trapezoid is isosceles
const DiagramCircleCyclicTrap = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', orange='#FF8C00', red='#cc2222';
    const cx=245, cy=162, R=130;
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const A=ptOn(170), B=ptOn(10);
    const D=ptOn(225), C=ptOn(315);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C,D),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(D,A),{color:black,width:2.5}));
    function chev(seg){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=8;
      const pcx=(seg.p1.x+seg.p2.x)/2,pcy=(seg.p1.y+seg.p2.y)/2;
      return `<polyline points="${(pcx-ux*sz+nx*sz).toFixed(1)},${(pcy-uy*sz+ny*sz).toFixed(1)} ${pcx.toFixed(1)},${pcy.toFixed(1)} ${(pcx-ux*sz-nx*sz).toFixed(1)},${(pcy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    parts.push(chev(Geo.segment(A,B)));
    parts.push(chev(Geo.segment(D,C)));
    parts.push(GeoRenderer.ticks(Geo.segment(A,D),{count:1,color:'#2D5FA6',tickLen:18,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,C),{count:1,color:'#2D5FA6',tickLen:18,width:3}));
    // Bottom base angles equal (1 arc each)
    const r1=18, rt1=13, rt2=20;
    parts.push(GeoRenderer.angleArc(Geo.angleArc(A,D,B,r1),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(B,A,C,r1),{color:red,strokeOnly:true,strokeWidth:2}));
    // Top base angles equal (2 concentric arcs each)
    parts.push(GeoRenderer.angleArc(Geo.angleArc(D,A,C,rt1),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(C,B,D,rt1),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(D,A,C,rt2),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(Geo.angleArc(C,B,D,rt2),{color:red,strokeOnly:true,strokeWidth:2}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
