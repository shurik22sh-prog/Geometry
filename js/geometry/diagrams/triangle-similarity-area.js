// t40: similar triangles – ratio of areas = similarity ratio squared
const DiagramTriangleSimilarityArea = (() => {
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
  function areaLabel(x,y,sub,purple){
    return `<text x="${x}" y="${y}" text-anchor="middle" font-size="44" font-weight="bold" fill="${purple}" font-family="Assistant">S<tspan dy="13" font-size="26">${sub}</tspan></text>`;
  }
  function areaFormula(fy){
    const purple='#7C3AED',blue='#2D5FA6',dark='#1a1a1a';
    const fs=32,fsub=19,fexp=32,fpar=88;
    const py=fy+30;
    return [
      // S₁/S₂ (no parens, shifted right closer to =, raised slightly)
      `<text x="253" y="${fy}" text-anchor="middle" font-size="${fs}" font-weight="bold" fill="${purple}" font-family="Assistant">S<tspan dy="9" font-size="${fsub}">1</tspan></text>`,
      `<line x1="218" y1="${fy+14}" x2="288" y2="${fy+14}" stroke="${purple}" stroke-width="2"/>`,
      `<text x="253" y="${fy+47}" text-anchor="middle" font-size="${fs}" font-weight="bold" fill="${purple}" font-family="Assistant">S<tspan dy="9" font-size="${fsub}">2</tspan></text>`,
      // =
      `<text x="305" y="${fy+20}" text-anchor="middle" font-size="${fs}" font-weight="bold" fill="${dark}" font-family="Assistant">=</text>`,
      // ( a/A )²
      `<text x="332" y="${py}" text-anchor="middle" font-size="${fpar}" fill="${blue}" font-family="Assistant">)</text>`,
      `<text x="365" y="${fy}" text-anchor="middle" font-size="${fs}" font-weight="bold" fill="${blue}" font-family="Assistant">a</text>`,
      `<line x1="344" y1="${fy+14}" x2="386" y2="${fy+14}" stroke="${blue}" stroke-width="2"/>`,
      `<text x="365" y="${fy+47}" text-anchor="middle" font-size="${fs}" font-weight="bold" fill="${blue}" font-family="Assistant">A</text>`,
      `<text x="390" y="${py}" text-anchor="middle" font-size="${fpar}" fill="${blue}" font-family="Assistant">(</text>`,
      `<text x="403" y="${fy-12}" font-size="${fexp}" font-weight="bold" fill="${blue}" font-family="Assistant">²</text>`,
    ].join('\n');
  }
  function render(cfg={}){
    const width=530,height=450;
    const red=cfg.color??'#cc2222',lColor=cfg.lColor??'#1a1a1a';
    const purple='#7C3AED';
    const A1=Geo.point(30,265),B1=Geo.point(225,265),C1=Geo.point(75,58);
    const A2=Geo.point(335,265),B2=Geo.point(462,265),C2=Geo.point(365,131);
    const cx1=(A1.x+B1.x+C1.x)/3,cy1=(A1.y+B1.y+C1.y)/3;
    const cx2=(A2.x+B2.x+C2.x)/3,cy2=(A2.y+B2.y+C2.y)/3;
    const parts=[];
    drawTri(A1,B1,C1,lColor,parts);
    drawTri(A2,B2,C2,lColor,parts);
    parts.push(sideLabel(B1,C1,'a',cx1,cy1,34));
    parts.push(sideLabel(B2,C2,'A',cx2,cy2,28));
    parts.push(areaLabel(cx1,cy1+8,'1',purple));
    parts.push(areaLabel(cx2,cy2+8,'2',purple));
    parts.push(GeoRenderer.label(Geo.point(265,182),'∼',{color:red,bold:true,size:68}));
    parts.push(areaFormula(350));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
