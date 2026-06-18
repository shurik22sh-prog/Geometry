// t37: similar triangles – corresponding medians ratio = similarity ratio
const DiagramTriangleSimilarityMedian = (() => {
  function drawTri(A,B,C,lColor,parts){
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
  }
  function label(p1,p2,text,gcx,gcy,offset=24,size=22){
    const mx=(p1.x+p2.x)/2,my=(p1.y+p2.y)/2;
    const dx=mx-gcx,dy=my-gcy,len=Math.hypot(dx,dy);
    return GeoRenderer.label(Geo.point(mx+(dx/len)*offset,my+(dy/len)*offset),text,{color:'#2D5FA6',size,bold:true});
  }
  function leftLabel(p1,p2,text,offset=20,size=22,nx=0,ny=0){
    const mx=(p1.x+p2.x)/2,my=(p1.y+p2.y)/2;
    const dx=p2.x-p1.x,dy=p2.y-p1.y,len=Math.hypot(dx,dy);
    return GeoRenderer.label(Geo.point(mx-(dy/len)*offset+nx,my+(dx/len)*offset+ny),text,{color:'#2D5FA6',size,bold:true});
  }
  function fracFormula(l1,L1,l2,L2,fy){
    const c='#2D5FA6',f=34;
    return `<text x="210" y="${fy}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">${l1}</text>
<line x1="193" y1="${fy+14}" x2="227" y2="${fy+14}" stroke="${c}" stroke-width="2"/>
<text x="210" y="${fy+47}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">${L1}</text>
<text x="255" y="${fy+20}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">=</text>
<text x="300" y="${fy}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">${l2}</text>
<line x1="283" y1="${fy+14}" x2="317" y2="${fy+14}" stroke="${c}" stroke-width="2"/>
<text x="300" y="${fy+47}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">${L2}</text>`;
  }
  function render(cfg={}){
    const width=530,height=375;
    const red=cfg.color??'#cc2222',blue='#2D5FA6',lColor=cfg.lColor??'#1a1a1a';
    const A1=Geo.point(30,265),B1=Geo.point(225,265),C1=Geo.point(75,58);
    const A2=Geo.point(335,265),B2=Geo.point(481,265),C2=Geo.point(370,111);
    const cx1=(A1.x+B1.x+C1.x)/3,cy1=(A1.y+B1.y+C1.y)/3;
    const cx2=(A2.x+B2.x+C2.x)/3,cy2=(A2.y+B2.y+C2.y)/3;
    const M1=Geo.point((A1.x+B1.x)/2,(A1.y+B1.y)/2);
    const M2=Geo.point((A2.x+B2.x)/2,(A2.y+B2.y)/2);
    const parts=[];
    drawTri(A1,B1,C1,lColor,parts);
    drawTri(A2,B2,C2,lColor,parts);
    parts.push(GeoRenderer.segment(Geo.segment(C1,M1),{color:lColor,width:2}));
    parts.push(GeoRenderer.segment(Geo.segment(C2,M2),{color:lColor,width:2}));
    parts.push(GeoRenderer.ticks(Geo.segment(A1,M1),{count:1,color:blue,tickLen:22,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(M1,B1),{count:1,color:blue,tickLen:22,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(A2,M2),{count:2,color:blue,tickLen:18,width:3}));
    parts.push(GeoRenderer.ticks(Geo.segment(M2,B2),{count:2,color:blue,tickLen:18,width:3}));
    // side labels
    parts.push(label(B1,C1,'a',cx1,cy1,24,28));
    parts.push(label(B2,C2,'A',cx2,cy2));
    // median labels: m to the left of segment (large), M to the left of segment (small)
    parts.push(leftLabel(C1,M1,'m',22,28,5,0));
    parts.push(leftLabel(C2,M2,'M',16,22,6,6));
    // similarity symbol
    parts.push(GeoRenderer.label(Geo.point(265,182),'∼',{color:red,bold:true,size:68}));
    // formula: a/A = m/M
    parts.push(fracFormula('a','A','m','M',320));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
