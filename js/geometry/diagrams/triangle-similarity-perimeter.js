// t39: similar triangles – ratio of perimeters = similarity ratio
const DiagramTriangleSimilarityPerimeter = (() => {
  function drawTri(A,B,C,lColor,parts){
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
  }
  function sideLabel(p1,p2,text,gcx,gcy,size=22){
    const mx=(p1.x+p2.x)/2,my=(p1.y+p2.y)/2;
    const dx=mx-gcx,dy=my-gcy,len=Math.hypot(dx,dy);
    return GeoRenderer.label(Geo.point(mx+(dx/len)*24,my+(dy/len)*24),text,{color:'#2D5FA6',size,bold:true});
  }
  function perimFormula(fy){
    const c='#2D5FA6',f=34;
    return [
      // (a+b+c) / (A+B+C)  — center x=194
      `<text x="194" y="${fy}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">(a+b+c)</text>`,
      `<line x1="124" y1="${fy+14}" x2="264" y2="${fy+14}" stroke="${c}" stroke-width="2"/>`,
      `<text x="194" y="${fy+47}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">(A+B+C)</text>`,
      // =
      `<text x="281" y="${fy+20}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">=</text>`,
      // a/A  — center x=312
      `<text x="312" y="${fy}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">a</text>`,
      `<line x1="295" y1="${fy+14}" x2="329" y2="${fy+14}" stroke="${c}" stroke-width="2"/>`,
      `<text x="312" y="${fy+47}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">A</text>`,
      // =
      `<text x="349" y="${fy+20}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">=</text>`,
      // b/B  — center x=380
      `<text x="380" y="${fy}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">b</text>`,
      `<line x1="363" y1="${fy+14}" x2="397" y2="${fy+14}" stroke="${c}" stroke-width="2"/>`,
      `<text x="380" y="${fy+47}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">B</text>`,
      // =
      `<text x="417" y="${fy+20}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">=</text>`,
      // c/C  — center x=448
      `<text x="448" y="${fy}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">c</text>`,
      `<line x1="431" y1="${fy+14}" x2="465" y2="${fy+14}" stroke="${c}" stroke-width="2"/>`,
      `<text x="448" y="${fy+47}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">C</text>`,
    ].join('\n');
  }
  function render(cfg={}){
    const width=530,height=430;
    const red=cfg.color??'#cc2222',lColor=cfg.lColor??'#1a1a1a';
    const A1=Geo.point(30,265),B1=Geo.point(225,265),C1=Geo.point(75,58);
    const A2=Geo.point(335,265),B2=Geo.point(462,265),C2=Geo.point(365,131);
    const cx1=(A1.x+B1.x+C1.x)/3,cy1=(A1.y+B1.y+C1.y)/3;
    const cx2=(A2.x+B2.x+C2.x)/3,cy2=(A2.y+B2.y+C2.y)/3;
    const parts=[];
    drawTri(A1,B1,C1,lColor,parts);
    drawTri(A2,B2,C2,lColor,parts);
    parts.push(sideLabel(A1,B1,'a',cx1,cy1,28));
    parts.push(sideLabel(A1,C1,'b',cx1,cy1,28));
    parts.push(sideLabel(B1,C1,'c',cx1,cy1,28));
    parts.push(sideLabel(A2,B2,'A',cx2,cy2,26));
    parts.push(sideLabel(A2,C2,'B',cx2,cy2,26));
    parts.push(sideLabel(B2,C2,'C',cx2,cy2,26));
    parts.push(GeoRenderer.label(Geo.point(265,182),'∼',{color:red,bold:true,size:68}));
    parts.push(perimFormula(370));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
