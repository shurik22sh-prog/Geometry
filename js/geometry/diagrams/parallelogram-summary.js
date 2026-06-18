// Parallelogram summary: sides, diagonals, tick marks, chevrons, alternate angle arcs, bisection marks
const DiagramParallelogramSummary = (() => {
  function render(cfg={}) {
    const width=525, height=340;
    const red=cfg.color??'#cc2222', blue='#2D5FA6', orange='#FF8C00', black='#1a1a1a';

    // Shifted left by 60px to align diagram visually to the left side of the panel
    const A=Geo.point(70,65), B=Geo.point(360,65), C=Geo.point(435,275), D=Geo.point(145,275);
    const E=Geo.point((A.x+C.x)/2,(A.y+C.y)/2); // intersection of diagonals

    function va(V,P1,P2,r){
      const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
      const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
      return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
    }

    function chev(seg, n=1, shift=0){
      const dx=seg.p2.x-seg.p1.x, dy=seg.p2.y-seg.p1.y, l=Math.hypot(dx,dy);
      const ux=dx/l, uy=dy/l, nx=-uy, ny=ux, sz=8, gap=13;
      const res=[];
      for(let i=0;i<n;i++){
        const off=(i-(n-1)/2)*gap;
        const cx=(seg.p1.x+seg.p2.x)/2+ux*(shift+off), cy=(seg.p1.y+seg.p2.y)/2+uy*(shift+off);
        res.push(`<polyline points="${(cx-ux*sz+nx*sz).toFixed(1)},${(cy-uy*sz+ny*sz).toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)} ${(cx-ux*sz-nx*sz).toFixed(1)},${(cy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`);
      }
      return res.join('\n');
    }

    const parts=[];

    // Sides
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));

    // Diagonals (solid)
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,D),{color:black,width:1.5}));

    // Tick marks on sides: AB & DC → 1 tick; AD & BC → 2 ticks
    parts.push(GeoRenderer.ticks(Geo.segment(A,B),{count:1,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(D,C),{count:1,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(A,D),{count:2,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,C),{count:2,color:blue,tickLen:14,width:2.5}));

    // Bisection marks on diagonal halves: AC halves → 3 ticks; BD halves → 4 ticks
    parts.push(GeoRenderer.ticks(Geo.segment(A,E),{count:3,color:blue,tickLen:11,width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(E,C),{count:3,color:blue,tickLen:11,width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,E),{count:4,color:blue,tickLen:11,width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(E,D),{count:4,color:blue,tickLen:11,width:2}));

    // Chevrons shifted away from midpoints to avoid overlap with tick marks
    parts.push(chev(Geo.segment(A,B),1, 55));
    parts.push(chev(Geo.segment(D,C),1,-55));
    parts.push(chev(Geo.segment(A,D),2, 35));
    parts.push(chev(Geo.segment(B,C),2, 35));

    // 4 pairs of alternate angles — each pair gets a distinct arc count (1, 2, 3, 4)
    // because all 4 angle sizes are different in a general parallelogram

    // Pair 1 (1 arc): ∠BAC = ∠DCA  (~30°, smallest)
    parts.push(GeoRenderer.angleArc(va(A,B,C,28),{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(C,D,A,28),{color:red,strokeOnly:true,strokeWidth:2}));

    // Pair 2 (2 arcs): ∠DAC = ∠BCA  (~40°)
    [24,38].forEach(r=>{
      parts.push(GeoRenderer.angleArc(va(A,D,C,r),{color:red,strokeOnly:true,strokeWidth:2}));
      parts.push(GeoRenderer.angleArc(va(C,B,A,r),{color:red,strokeOnly:true,strokeWidth:2}));
    });

    // Pair 3 (3 arcs): ∠ABD = ∠CDB  (~44°)
    [22,28,34].forEach(r=>{
      parts.push(GeoRenderer.angleArc(va(B,A,D,r),{color:red,strokeOnly:true,strokeWidth:2}));
      parts.push(GeoRenderer.angleArc(va(D,C,B,r),{color:red,strokeOnly:true,strokeWidth:2}));
    });

    // Pair 4 (4 arcs): ∠CBD = ∠ADB  (~65°, largest)
    [20,25,30,35].forEach(r=>{
      parts.push(GeoRenderer.angleArc(va(B,C,D,r),{color:red,strokeOnly:true,strokeWidth:2}));
      parts.push(GeoRenderer.angleArc(va(D,A,B,r),{color:red,strokeOnly:true,strokeWidth:2}));
    });

    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
