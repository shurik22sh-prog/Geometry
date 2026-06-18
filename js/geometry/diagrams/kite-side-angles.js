// q22: Side angles of a kite are equal
const DiagramKiteSideAngles = (() => {
  function render(cfg={}) {
    const width=490, height=420;
    const red='#cc2222', black='#1a1a1a';
    const T=Geo.point(245,40), R=Geo.point(355,135), B=Geo.point(245,385), L=Geo.point(135,135);
    function vn(v){const l=Math.hypot(v.x,v.y);return{x:v.x/l,y:v.y/l};}
    function mkArc(V,p1,p2,r){
      const d1=vn({x:p1.x-V.x,y:p1.y-V.y}),d2=vn({x:p2.x-V.x,y:p2.y-V.y});
      return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
    }
    const parts=[];
    [Geo.segment(T,R),Geo.segment(R,B),Geo.segment(B,L),Geo.segment(L,T)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));
    const R_=40;
    const arcR=mkArc(R,T,B,R_), arcL=mkArc(L,B,T,R_);
    parts.push(GeoRenderer.angleArc(arcR,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcL,{color:red,strokeOnly:true,strokeWidth:2}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
