// c7: Larger central angle → longer arc (central angles + arc highlights, no chords)
const DiagramCircleC7 = (() => {
  function render(cfg={}) {
    const width=490, height=385;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=165, R=130;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    function circArc(a1,a2,color,w=3.5){
      const p1=ptOn(a1),p2=ptOn(a2);
      const span=((a2-a1)+360)%360, sweep=span<=180?1:0;
      return `<path d="M ${p1.x.toFixed(1)},${p1.y.toFixed(1)} A ${R} ${R} 0 0 ${sweep} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
    }
    // Arc notation label in diagram: arc drawn above the letter, topOffset controls distance
    function arcLabel(px, py, letter, color, sz=22, topOffset=0.76) {
      const r=sz*0.40, ry=sz*0.20, top=py-sz*topOffset;
      const arc=`<path d="M ${(px-r).toFixed(1)},${top.toFixed(1)} A ${r.toFixed(1)} ${ry.toFixed(1)} 0 0 1 ${(px+r).toFixed(1)},${top.toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>`;
      const txt=`<text x="${px.toFixed(1)}" y="${py.toFixed(1)}" text-anchor="middle" font-family="Assistant,sans-serif" font-size="${sz}" font-weight="bold" fill="${color}">${letter}</text>`;
      return arc + '\n' + txt;
    }
    // Formula arc label: fixed arc size, independent of letter size
    function formulaArcLabel(px, py, letter, color, letterSz, arcR, arcRy) {
      const top=py-letterSz*0.80-arcRy*0.5;
      const arc=`<path d="M ${(px-arcR).toFixed(1)},${top.toFixed(1)} A ${arcR} ${arcRy} 0 0 1 ${(px+arcR).toFixed(1)},${top.toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>`;
      const txt=`<text x="${px}" y="${py}" text-anchor="middle" font-family="Assistant,sans-serif" font-size="${letterSz}" font-weight="bold" fill="${color}">${letter}</text>`;
      return arc + '\n' + txt;
    }
    const A1=ptOn(150), A2=ptOn(250);
    const B1=ptOn(295), B2=ptOn(345);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    parts.push(circArc(150,250,red));
    parts.push(circArc(295,345,red));
    [A1,A2,B1,B2].forEach(P=>parts.push(GeoRenderer.segment(Geo.segment(O,P),{color:black,width:1.2})));
    const arcα=Geo.angleArc(O,A1,A2,34);
    const arcβ=Geo.angleArc(O,B1,B2,34);
    parts.push(GeoRenderer.angleArc(arcα,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcβ,{color:red,strokeOnly:true,strokeWidth:2}));
    const lα=GeoRenderer.arcLabelPoint(arcα,14);
    const lβ=GeoRenderer.arcLabelPoint(arcβ,14);
    parts.push(GeoRenderer.label(lα,'α',{size:22,bold:true,color:red}));
    parts.push(GeoRenderer.label(lβ,'β',{size:22,bold:true,color:red}));
    const mid1=ptOn(200), mid2=ptOn(320);
    function pushOut(p, dist) {
      const dx=p.x-cx, dy=p.y-cy, len=Math.hypot(dx,dy);
      return {x: p.x+(dx/len)*dist, y: p.y+(dy/len)*dist};
    }
    const pos1=pushOut(mid1, 16), pos2=pushOut(mid2, 16);
    // 'a': arc sign closer to letter (topOffset=0.65); 'b': default (0.76)
    parts.push(arcLabel(pos1.x, pos1.y, 'a', red, 22, 0.65));
    parts.push(arcLabel(pos2.x, pos2.y, 'b', red, 22, 0.76));
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    // Formula – visual LTR: â>b̂ | אז | α>β | אם
    // Letters at sz=22, arc paths fixed at r=12,ry=6 (independent of letter size)
    const fy=354, arcR=12, arcRy=6, lsz=28;
    parts.push(formulaArcLabel(140, fy, 'a', red, lsz, arcR, arcRy));
    parts.push(`<text x="165" y="${fy}" text-anchor="middle" font-family="Assistant,sans-serif" font-size="${lsz}" font-weight="bold" fill="${red}" direction="ltr">&gt;</text>`);
    parts.push(formulaArcLabel(193, fy, 'b', red, lsz, arcR, arcRy));
    parts.push(`<text x="226" y="${fy}" text-anchor="middle" font-family="Assistant,sans-serif" font-size="24" font-weight="bold" fill="${black}">אז</text>`);
    parts.push(`<text x="281" y="${fy}" text-anchor="middle" font-family="Assistant,sans-serif" font-size="24" font-weight="bold" fill="${red}" direction="ltr">α &gt; β</text>`);
    parts.push(`<text x="340" y="${fy}" text-anchor="middle" font-family="Assistant,sans-serif" font-size="24" font-weight="bold" fill="${black}">אם</text>`);
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
