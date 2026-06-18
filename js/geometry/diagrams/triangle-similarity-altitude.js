// t36: similar triangles – corresponding altitudes ratio = similarity ratio
const DiagramTriangleSimilarityAltitude = (() => {
  function drawTri(A,B,C,lColor,parts){
    parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
  }
  function foot(P,A,B){
    const dx=B.x-A.x,dy=B.y-A.y,len2=dx*dx+dy*dy;
    const t=((P.x-A.x)*dx+(P.y-A.y)*dy)/len2;
    return Geo.point(A.x+t*dx,A.y+t*dy);
  }
  function ra(F,A,B,P,sq,red){
    const dx=B.x-A.x,dy=B.y-A.y,len=Math.hypot(dx,dy);
    const u={x:dx/len,y:dy/len};
    let nx=-dy/len,ny=dx/len;
    if((P.x-F.x)*nx+(P.y-F.y)*ny<0){nx=-nx;ny=-ny;}
    const p1=Geo.point(F.x+u.x*sq,F.y+u.y*sq);
    const p2=Geo.point(F.x+u.x*sq+nx*sq,F.y+u.y*sq+ny*sq);
    const p3=Geo.point(F.x+nx*sq,F.y+ny*sq);
    return GeoRenderer.segment(Geo.segment(p1,p2),{color:red,width:1.5})+
           GeoRenderer.segment(Geo.segment(p3,p2),{color:red,width:1.5});
  }
  function label(p1,p2,text,gcx,gcy,offset=24,size=22){
    const mx=(p1.x+p2.x)/2,my=(p1.y+p2.y)/2;
    const dx=mx-gcx,dy=my-gcy,len=Math.hypot(dx,dy);
    return GeoRenderer.label(Geo.point(mx+(dx/len)*offset,my+(dy/len)*offset),text,{color:'#2D5FA6',size,bold:true});
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
    const red=cfg.color??'#cc2222',lColor=cfg.lColor??'#1a1a1a';
    const A1=Geo.point(30,265),B1=Geo.point(225,265),C1=Geo.point(75,58);
    const A2=Geo.point(335,265),B2=Geo.point(462,265),C2=Geo.point(365,131);
    const cx1=(A1.x+B1.x+C1.x)/3,cy1=(A1.y+B1.y+C1.y)/3;
    const cx2=(A2.x+B2.x+C2.x)/3,cy2=(A2.y+B2.y+C2.y)/3;
    const H1=foot(C1,A1,B1);
    const H2=foot(C2,A2,B2);
    const parts=[];
    drawTri(A1,B1,C1,lColor,parts);
    drawTri(A2,B2,C2,lColor,parts);
    parts.push(GeoRenderer.segment(Geo.segment(C1,H1),{color:lColor,width:2}));
    parts.push(GeoRenderer.segment(Geo.segment(C2,H2),{color:lColor,width:2}));
    parts.push(ra(H1,A1,B1,C1,18,red));
    parts.push(ra(H2,A2,B2,C2,14,red));
    // side labels: right side BC
    parts.push(label(B1,C1,'a',cx1,cy1,24,28));
    parts.push(label(B2,C2,'A',cx2,cy2));
    // altitude labels: h left of large, H right of small
    parts.push(GeoRenderer.label(Geo.point(C1.x+13,(C1.y+H1.y)/2),'h',{color:'#2D5FA6',size:28,bold:true}));
    parts.push(GeoRenderer.label(Geo.point(C2.x+14,(C2.y+H2.y)/2),'H',{color:'#2D5FA6',size:22,bold:true}));
    // similarity symbol
    parts.push(GeoRenderer.label(Geo.point(265,182),'∼',{color:red,bold:true,size:68}));
    // formula below
    parts.push(fracFormula('a','A','h','H',320));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
