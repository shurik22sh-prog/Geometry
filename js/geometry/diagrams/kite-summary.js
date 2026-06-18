// Kite summary: sides, diagonals, equal-side ticks, bisection ticks, right angle, equal base-angle arcs
const DiagramKiteSummary = (() => {
  function render(cfg={}) {
    const width=525, height=460;
    const red=cfg.color??'#cc2222', blue='#2D5FA6', black='#1a1a1a';

    const T=Geo.point(245,50), R=Geo.point(380,155), B=Geo.point(245,415), L=Geo.point(110,155);
    const M=Geo.point((L.x+R.x)/2,(L.y+R.y)/2); // M=(245,155) — diagonals' intersection

    function va(V,P1,P2,r){
      const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
      const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
      return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
    }

    function rightAngle(V,t1,t2,sq=16){
      const d1=Geo.vecNormalize(Geo.vecFromPoints(V,t1));
      const d2=Geo.vecNormalize(Geo.vecFromPoints(V,t2));
      const p1={x:V.x+d1.x*sq,y:V.y+d1.y*sq};
      const p2={x:p1.x+d2.x*sq,y:p1.y+d2.y*sq};
      const p3={x:V.x+d2.x*sq,y:V.y+d2.y*sq};
      return `<polyline points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="none" stroke="${red}" stroke-width="2.5"/>`;
    }

    const parts=[];

    // Sides
    [Geo.segment(T,L),Geo.segment(T,R),Geo.segment(B,L),Geo.segment(B,R)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));

    // Diagonals
    parts.push(GeoRenderer.segment(Geo.segment(T,B),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(L,R),{color:black,width:1.5}));

    // Equal-side tick marks: TL & TR → 1 tick; BL & BR → 2 ticks
    parts.push(GeoRenderer.ticks(Geo.segment(T,L),{count:1,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(T,R),{count:1,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,L),{count:2,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,R),{count:2,color:blue,tickLen:14,width:2.5}));

    // Bisection marks on secondary diagonal halves LM & MR → 3 ticks
    parts.push(GeoRenderer.ticks(Geo.segment(L,M),{count:3,color:blue,tickLen:11,width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(M,R),{count:3,color:blue,tickLen:11,width:2}));

    // Right angle at M (main diagonal ⊥ secondary diagonal)
    parts.push(rightAngle(M,T,R,14));

    // Base angles of top isosceles triangle TLR: ∠TLR = ∠TRL (1 arc)
    parts.push(GeoRenderer.angleArc(va(L,T,R,30),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(R,T,L,30),{color:red,strokeOnly:true,strokeWidth:2}));

    // Base angles of bottom isosceles triangle BLR: ∠BLR = ∠BRL (2 arcs)
    [26,40].forEach(r=>{
      parts.push(GeoRenderer.angleArc(va(L,R,B,r),{color:red,strokeOnly:true,strokeWidth:2}));
      parts.push(GeoRenderer.angleArc(va(R,L,B,r),{color:red,strokeOnly:true,strokeWidth:2}));
    });

    // Main diagonal bisects apex angles: ∠LTM = ∠MTR (3 arcs each)
    [22,30,38].forEach(r=>{
      parts.push(GeoRenderer.angleArc(va(T,L,B,r),{color:red,strokeOnly:true,strokeWidth:2}));
      parts.push(GeoRenderer.angleArc(va(T,B,R,r),{color:red,strokeOnly:true,strokeWidth:2}));
    });

    // Main diagonal bisects bottom apex angle: ∠LBM = ∠MBR (4 arcs each)
    [18,24,30,36].forEach(r=>{
      parts.push(GeoRenderer.angleArc(va(B,L,T,r),{color:red,strokeOnly:true,strokeWidth:2}));
      parts.push(GeoRenderer.angleArc(va(B,T,R,r),{color:red,strokeOnly:true,strokeWidth:2}));
    });

    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
