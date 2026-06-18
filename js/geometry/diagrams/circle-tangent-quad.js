// c27: Circle inscribed in quadrilateral – sum of opposite sides are equal
const DiagramCircleTangentQuad = (() => {
  function render(cfg={}) {
    const width=490, height=410;
    const black='#1a1a1a', blue='#2D5FA6';
    const cx=245, cy=185, r=100;
    function ptOn(cx,cy,R,deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const T1=ptOn(cx,cy,r,10), T2=ptOn(cx,cy,r,100), T3=ptOn(cx,cy,r,195), T4=ptOn(cx,cy,r,305);
    function tangentLine(T){
      const dx=T.x-cx, dy=T.y-cy;
      return {nx:-dy, ny:dx};
    }
    function intersectTangents(T1,T2){
      const d1=tangentLine(T1), d2=tangentLine(T2);
      const l1=Geo.line(T1,Geo.vec(d1.nx,d1.ny));
      const l2=Geo.line(T2,Geo.vec(d2.nx,d2.ny));
      return Geo.intersect(l1,l2);
    }
    const A=intersectTangents(T4,T1);
    const B=intersectTangents(T1,T2);
    const C=intersectTangents(T2,T3);
    const D=intersectTangents(T3,T4);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${black}" stroke-width="2"/>`);
    if(A&&B&&C&&D){
      parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:black,width:2.5}));
      parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:black,width:2.5}));
      parts.push(GeoRenderer.segment(Geo.segment(C,D),{color:black,width:2.5}));
      parts.push(GeoRenderer.segment(Geo.segment(D,A),{color:black,width:2.5}));

      // Side labels pushed outward from center
      function sideLabel(P1, P2, text) {
        const mx=(P1.x+P2.x)/2, my=(P1.y+P2.y)/2;
        const dx=mx-cx, dy=my-cy, len=Math.hypot(dx,dy);
        const lx=(mx+(dx/len)*22).toFixed(1), ly=(my+(dy/len)*22).toFixed(1);
        return GeoRenderer.label(Geo.point(parseFloat(lx),parseFloat(ly)), text, {color:blue,size:26,bold:true});
      }
      parts.push(sideLabel(A,B,'a'));
      parts.push(sideLabel(B,C,'b'));
      parts.push(sideLabel(C,D,'c'));
      parts.push(sideLabel(D,A,'d'));
    }

    // Formula below
    const fn=`font-family="Assistant,sans-serif" font-size="34" font-weight="bold" fill="${blue}" direction="ltr"`;
    parts.push(`<text x="${cx}" y="378" text-anchor="middle" ${fn}>a + b = c + d</text>`);

    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
