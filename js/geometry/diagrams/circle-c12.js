// c12: Longer chord is closer to center
const DiagramCircleC12 = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=162, R=130;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    function vn(v){const l=Math.hypot(v.x,v.y);return{x:v.x/l,y:v.y/l};}
    function rightAngle(V,t1,t2,sq=13){
      const d1=vn({x:t1.x-V.x,y:t1.y-V.y}),d2=vn({x:t2.x-V.x,y:t2.y-V.y});
      const p1={x:V.x+d1.x*sq,y:V.y+d1.y*sq};
      const p2={x:p1.x+d2.x*sq,y:p1.y+d2.y*sq};
      const p3={x:V.x+d2.x*sq,y:V.y+d2.y*sq};
      return `<polyline points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="none" stroke="${red}" stroke-width="1.8"/>`;
    }
    // Longer chord: 100° span (closer to center)
    const A=ptOn(100), B=ptOn(200);
    // Shorter chord: 55° span (further from center)
    const C=ptOn(5), D=ptOn(60);
    const M1=Geo.point((A.x+B.x)/2,(A.y+B.y)/2);
    const M2=Geo.point((C.x+D.x)/2,(C.y+D.y)/2);
    // label pushed outward from center (negative offset = toward center)
    function chordLabel(p1,p2,text,offset=6,nx=0,ny=0){
      const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
      const dx=mx-cx, dy=my-cy, len=Math.hypot(dx,dy);
      return GeoRenderer.label(Geo.point(mx+(dx/len)*offset+nx, my+(dy/len)*offset+ny), text, {color:blue,size:22,bold:true});
    }
    // label pushed perpendicular to segment (negative offset = other side)
    function perpLabel(p1,p2,text,offset=6,nx=0,ny=0){
      const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
      const dx=p2.x-p1.x, dy=p2.y-p1.y, len=Math.hypot(dx,dy);
      return GeoRenderer.label(Geo.point(mx-dy/len*offset+nx, my+dx/len*offset+ny), text, {color:blue,size:22,bold:true});
    }
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(C,D),{color:black,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(O,M1),{color:black,width:1.8}));
    parts.push(GeoRenderer.segment(Geo.segment(O,M2),{color:black,width:1.8}));
    parts.push(rightAngle(M1,O,A,13));
    parts.push(rightAngle(M2,O,C,13));
    parts.push(chordLabel(A,B,'a',18));
    parts.push(chordLabel(C,D,'b',-26,-12,34));
    parts.push(perpLabel(O,M1,'c',18));
    parts.push(perpLabel(O,M2,'d',-16));
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    // formula text — each line laid out L→R in Hebrew reading order (RTL)
    const f=`font-family="Assistant,sans-serif" font-size="28" font-weight="bold"`;
    const fy1=360, fy2=405;
    const ts=`text-anchor="middle" direction="rtl" font-family="Assistant,sans-serif" font-size="28" font-weight="bold"`;
    parts.push(`<text x="245" y="${fy1}" ${ts}><tspan fill="${black}">אם&#160;&#160;&#160;</tspan><tspan fill="${blue}">a &gt; b&#160;&#160;&#160;</tspan><tspan fill="${black}">אז&#160;&#160;&#160;</tspan><tspan fill="${blue}">c &lt; d</tspan></text>`);
    parts.push(`<text x="245" y="${fy2}" ${ts}><tspan fill="${black}">אם&#160;&#160;&#160;</tspan><tspan fill="${blue}">c &lt; d&#160;&#160;&#160;</tspan><tspan fill="${black}">אז&#160;&#160;&#160;</tspan><tspan fill="${blue}">a &gt; b</tspan></text>`);
    return GeoRenderer.svg(width,430,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
