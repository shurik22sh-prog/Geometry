// def: משולשים דומים – similar triangles
const DiagramTriangleSimilarity = (() => {
  function va(V,P1,P2,r){
    const d1=Geo.vecNormalize(Geo.vecFromPoints(V,P1));
    const d2=Geo.vecNormalize(Geo.vecFromPoints(V,P2));
    return Geo.angleArc(V,Geo.point(V.x+d1.x*r,V.y+d1.y*r),Geo.point(V.x+d2.x*r,V.y+d2.y*r),r);
  }
  function sideLabel(p1,p2,text,gcx,gcy,size,color,push=22){
    const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
    const dx=mx-gcx, dy=my-gcy, len=Math.hypot(dx,dy);
    return GeoRenderer.label(Geo.point(mx+(dx/len)*push,my+(dy/len)*push),text,{color,size,bold:true});
  }
  function drawTri(A,B,C,r1,r2,r3,red,lColor,parts){
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    // Angle A: 1 arc
    parts.push(GeoRenderer.angleArc(va(A,B,C,r1),{color:red,strokeOnly:true,strokeWidth:2}));
    // Angle B: 2 concentric arcs
    parts.push(GeoRenderer.angleArc(va(B,A,C,r2),  {color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(B,A,C,r2+9),{color:red,strokeOnly:true,strokeWidth:2}));
    // Angle C (apex): 3 concentric arcs
    parts.push(GeoRenderer.angleArc(va(C,A,B,r3),    {color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(C,A,B,r3+8),  {color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(va(C,A,B,r3+16), {color:red,strokeOnly:true,strokeWidth:2}));
  }
  function render(cfg={}) {
    const width=530, height=430;
    const red=cfg.color??'#cc2222', blue='#2D5FA6', lColor=cfg.lColor??'#1a1a1a';
    const A1=Geo.point(30,265), B1=Geo.point(225,265), C1=Geo.point(75,58);
    const A2=Geo.point(335,265), B2=Geo.point(462,265), C2=Geo.point(365,131);
    const parts=[];
    drawTri(A1,B1,C1,28,24,18,red,lColor,parts);
    drawTri(A2,B2,C2,20,16,12,red,lColor,parts);
    parts.push(GeoRenderer.label(Geo.point(275,182),'∼',{color:red,bold:true,size:68}));

    // Side labels: large triangle = uppercase A,B,C; small = lowercase a,b,c
    const cx1=(A1.x+B1.x+C1.x)/3, cy1=(A1.y+B1.y+C1.y)/3;
    const cx2=(A2.x+B2.x+C2.x)/3, cy2=(A2.y+B2.y+C2.y)/3;
    // Large: side opposite A1 = B1C1 → A; opp B1 = A1C1 → B; opp C1 = A1B1 → C
    parts.push(sideLabel(B1,C1,'A',cx1,cy1,24,blue));
    parts.push(sideLabel(A1,C1,'B',cx1,cy1,24,blue));
    parts.push(sideLabel(A1,B1,'C',cx1,cy1,24,blue));
    // Small: same correspondence, lowercase
    parts.push(sideLabel(B2,C2,'a',cx2,cy2,20,blue));
    parts.push(sideLabel(A2,C2,'b',cx2,cy2,20,blue,12));
    parts.push(sideLabel(A2,B2,'c',cx2,cy2,20,blue,11));

    // Formula a/A = b/B = c/C below diagram
    const fy=348, c=blue, f=30;
    function frac(x,num,den){
      return [
        `<text x="${x}" y="${fy}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant,sans-serif" direction="ltr">${num}</text>`,
        `<line x1="${x-16}" y1="${fy+12}" x2="${x+16}" y2="${fy+12}" stroke="${c}" stroke-width="2"/>`,
        `<text x="${x}" y="${fy+43}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant,sans-serif" direction="ltr">${den}</text>`
      ].join('\n');
    }
    const eq=`font-size="32" font-weight="bold" fill="${c}" font-family="Assistant,sans-serif"`;
    parts.push(frac(165,'a','A'));
    parts.push(`<text x="218" y="${fy+18}" text-anchor="middle" ${eq}>=</text>`);
    parts.push(frac(265,'b','B'));
    parts.push(`<text x="318" y="${fy+18}" text-anchor="middle" ${eq}>=</text>`);
    parts.push(frac(365,'c','C'));

    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
