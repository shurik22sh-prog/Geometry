// t35: SSS similarity – three pairs of corresponding sides (letter labels show correspondence)
const DiagramTriangleSimilaritySss = (() => {
  function render(cfg={}){
    const width=530, height=310;
    const red=cfg.color??'#cc2222', blue='#2D5FA6', lColor=cfg.lColor??'#1a1a1a';
    const A1=Geo.point(30,265),  B1=Geo.point(225,265), C1=Geo.point(75,58);
    const A2=Geo.point(335,265), B2=Geo.point(462,265), C2=Geo.point(365,131);
    function sideLabel(p1,p2,text,gcx,gcy,{offset=22,size=22}={}){
      const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
      const dx=mx-gcx, dy=my-gcy, len=Math.hypot(dx,dy);
      return GeoRenderer.label(Geo.point(mx+(dx/len)*offset, my+(dy/len)*offset),text,{color:blue,size,bold:true});
    }
    const cx1=(A1.x+B1.x+C1.x)/3, cy1=(A1.y+B1.y+C1.y)/3;
    const cx2=(A2.x+B2.x+C2.x)/3, cy2=(A2.y+B2.y+C2.y)/3;
    const parts=[];
    // triangles
    for(const [A,B,C] of [[A1,B1,C1],[A2,B2,C2]]){
      parts.push(GeoRenderer.segment(Geo.segment(A,B),{color:lColor,width:2.5}));
      parts.push(GeoRenderer.segment(Geo.segment(B,C),{color:lColor,width:2.5}));
      parts.push(GeoRenderer.segment(Geo.segment(A,C),{color:lColor,width:2.5}));
    }
    // letter labels: lowercase for large triangle, uppercase for small triangle
    parts.push(sideLabel(A1,B1,'a',cx1,cy1,{size:30})); // bottom
    parts.push(sideLabel(A1,C1,'b',cx1,cy1,{size:30})); // left
    parts.push(sideLabel(B1,C1,'c',cx1,cy1,{size:30})); // right
    parts.push(sideLabel(A2,B2,'A',cx2,cy2,{size:26})); // bottom
    parts.push(sideLabel(A2,C2,'B',cx2,cy2,{size:26})); // left
    parts.push(sideLabel(B2,C2,'C',cx2,cy2,{size:26})); // right
    // similarity symbol
    parts.push(GeoRenderer.label(Geo.point(265,182),'∼',{color:red,bold:true,size:68}));
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
