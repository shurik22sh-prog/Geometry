// Rectangle summary: sides, diagonals, equal-side ticks, diagonal half ticks, chevrons, right angle marks
const DiagramRectangleSummary = (() => {
  function render(cfg={}) {
    const width=525, height=340;
    const red=cfg.color??'#cc2222', blue='#2D5FA6', orange='#FF8C00', black='#1a1a1a';

    const A=Geo.point(80,75), B=Geo.point(420,75), C=Geo.point(420,245), D=Geo.point(80,245);
    const M=Geo.point((A.x+C.x)/2,(A.y+C.y)/2); // diagonals' intersection (250, 160)

    function rightAngle(V,t1,t2,sq=16){
      const d1=Geo.vecNormalize(Geo.vecFromPoints(V,t1));
      const d2=Geo.vecNormalize(Geo.vecFromPoints(V,t2));
      const p1={x:V.x+d1.x*sq,y:V.y+d1.y*sq};
      const p2={x:p1.x+d2.x*sq,y:p1.y+d2.y*sq};
      const p3={x:V.x+d2.x*sq,y:V.y+d2.y*sq};
      return `<polyline points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="none" stroke="${red}" stroke-width="2.5"/>`;
    }

    function chev(seg,n=1,shift=0){
      const dx=seg.p2.x-seg.p1.x,dy=seg.p2.y-seg.p1.y,l=Math.hypot(dx,dy);
      const ux=dx/l,uy=dy/l,nx=-uy,ny=ux,sz=8,gap=13;
      const res=[];
      for(let i=0;i<n;i++){
        const off=(i-(n-1)/2)*gap;
        const cx=(seg.p1.x+seg.p2.x)/2+ux*(shift+off),cy=(seg.p1.y+seg.p2.y)/2+uy*(shift+off);
        res.push(`<polyline points="${(cx-ux*sz+nx*sz).toFixed(1)},${(cy-uy*sz+ny*sz).toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)} ${(cx-ux*sz-nx*sz).toFixed(1)},${(cy-uy*sz-ny*sz).toFixed(1)}" fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`);
      }
      return res.join('\n');
    }

    const parts=[];

    // Sides
    [Geo.segment(A,B),Geo.segment(B,C),Geo.segment(C,D),Geo.segment(D,A)].forEach(s=>
      parts.push(GeoRenderer.segment(s,{color:black,width:2.5})));

    // Diagonals (equal, solid)
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:black,width:1.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,D),{color:black,width:1.5}));

    // Opposite equal sides: AB & DC → 1 tick; AD & BC → 2 ticks
    parts.push(GeoRenderer.ticks(Geo.segment(A,B),{count:1,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(D,C),{count:1,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(A,D),{count:2,color:blue,tickLen:14,width:2.5}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,C),{count:2,color:blue,tickLen:14,width:2.5}));

    // All 4 diagonal halves equal (AM = MC = BM = MD) → 3 ticks each
    parts.push(GeoRenderer.ticks(Geo.segment(A,M),{count:3,color:blue,tickLen:11,width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(M,C),{count:3,color:blue,tickLen:11,width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(B,M),{count:3,color:blue,tickLen:11,width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(M,D),{count:3,color:blue,tickLen:11,width:2}));

    // Parallel sides chevrons: AB||DC (1 chevron each), AD||BC (2 chevrons each)
    parts.push(chev(Geo.segment(A,B),1, 50));
    parts.push(chev(Geo.segment(D,C),1,-50));
    parts.push(chev(Geo.segment(A,D),2, 35));
    parts.push(chev(Geo.segment(B,C),2, 35));

    // Right angles at all 4 corners
    parts.push(rightAngle(A,B,D,16));
    parts.push(rightAngle(B,A,C,16));
    parts.push(rightAngle(C,B,D,16));
    parts.push(rightAngle(D,A,C,16));

    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
