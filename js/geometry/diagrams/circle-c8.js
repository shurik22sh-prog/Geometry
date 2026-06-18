// c8: Longer arc → longer chord (arc highlights + chords + arc/chord labels + formula)
const DiagramCircleC8 = (() => {
  function render(cfg={}) {
    const width=490, height=480;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=165, R=130;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    function circArc(a1,a2,color,w=3.5){
      const p1=ptOn(a1),p2=ptOn(a2);
      const span=((a2-a1)+360)%360, sweep=span<=180?1:0;
      return `<path d="M ${p1.x.toFixed(1)},${p1.y.toFixed(1)} A ${R} ${R} 0 0 ${sweep} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
    }
    // Arc notation label in diagram: SVG arc path above letter
    function arcLabel(px, py, letter, color, sz=22, topOffset=0.76) {
      const r=sz*0.40, ry=sz*0.20, top=py-sz*topOffset;
      const arc=`<path d="M ${(px-r).toFixed(1)},${top.toFixed(1)} A ${r.toFixed(1)} ${ry.toFixed(1)} 0 0 1 ${(px+r).toFixed(1)},${top.toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>`;
      const txt=`<text x="${px.toFixed(1)}" y="${py.toFixed(1)}" text-anchor="middle" font-family="Assistant,sans-serif" font-size="${sz}" font-weight="bold" fill="${color}">${letter}</text>`;
      return arc + '\n' + txt;
    }
    // Formula arc label: fixed arc size regardless of letter size
    function formulaArcLabel(px, py, letter, color, letterSz, arcR, arcRy) {
      const top=py-letterSz*0.80-arcRy*0.5;
      const arc=`<path d="M ${(px-arcR).toFixed(1)},${top.toFixed(1)} A ${arcR} ${arcRy} 0 0 1 ${(px+arcR).toFixed(1)},${top.toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>`;
      const txt=`<text x="${px}" y="${py}" text-anchor="middle" font-family="Assistant,sans-serif" font-size="${letterSz}" font-weight="bold" fill="${color}">${letter}</text>`;
      return arc + '\n' + txt;
    }
    function pushOut(p, dist) {
      const dx=p.x-cx, dy=p.y-cy, len=Math.hypot(dx,dy);
      return {x: p.x+(dx/len)*dist, y: p.y+(dy/len)*dist};
    }
    // Longer arc: 150°→250° (100° span); shorter arc: 295°→345° (50° span)
    const A1=ptOn(150), A2=ptOn(250);
    const B1=ptOn(295), B2=ptOn(345);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    // Arc highlights – red
    parts.push(circArc(150,250,red));
    parts.push(circArc(295,345,red));
    // Chords – blue
    parts.push(GeoRenderer.segment(Geo.segment(A1,A2),{color:blue,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B1,B2),{color:blue,width:2.5}));
    // Arc notation labels outside circle – red
    const mid1=ptOn(200), mid2=ptOn(320);
    const pos1=pushOut(mid1, 16), pos2=pushOut(mid2, 16);
    parts.push(arcLabel(pos1.x, pos1.y, 'a', red, 22, 0.65));
    parts.push(arcLabel(pos2.x, pos2.y, 'b', red, 22, 0.76));
    // Chord labels – blue
    const mA={x:(A1.x+A2.x)/2, y:(A1.y+A2.y)/2};
    function outward(m,dist){
      const dx=m.x-cx, dy=m.y-cy, len=Math.hypot(dx,dy);
      return Geo.point(m.x+(dx/len)*dist, m.y+(dy/len)*dist);
    }
    parts.push(GeoRenderer.label(outward(mA,16),'a',{size:22,bold:true,color:blue}));
    const mB={x:(B1.x+B2.x)/2, y:(B1.y+B2.y)/2};
    const dxB=B2.x-B1.x, dyB=B2.y-B1.y, lenB=Math.hypot(dxB,dyB);
    const bPos=Geo.point(mB.x-(dyB/lenB)*12, mB.y+(dxB/lenB)*12);
    parts.push(GeoRenderer.label(bPos,'b',{size:22,bold:true,color:blue}));
    // Formula – two lines
    const arcR=12, arcRy=6, lsz=28, hb=24;
    const fn = `font-family="Assistant,sans-serif"`;
    // Line 1 – visual LTR: a>b (blue) | אז | â>b̂ (red) | אם
    const fy1=358;
    parts.push(`<text x="123" y="${fy1}" text-anchor="middle" ${fn} font-size="${lsz}" font-weight="bold" fill="${blue}" direction="ltr">a &gt; b</text>`);
    parts.push(`<text x="191" y="${fy1}" text-anchor="middle" ${fn} font-size="${hb}" font-weight="bold" fill="${black}">אז</text>`);
    parts.push(formulaArcLabel(240, fy1, 'a', red, lsz, arcR, arcRy));
    parts.push(`<text x="265" y="${fy1}" text-anchor="middle" ${fn} font-size="${lsz}" font-weight="bold" fill="${red}" direction="ltr">&gt;</text>`);
    parts.push(formulaArcLabel(288, fy1, 'b', red, lsz, arcR, arcRy));
    parts.push(`<text x="338" y="${fy1}" text-anchor="middle" ${fn} font-size="${hb}" font-weight="bold" fill="${black}">אם</text>`);
    // Line 2 – visual LTR: â>b̂ (red) | אז | a>b (blue) | אם
    const fy2=432;
    parts.push(formulaArcLabel(103, fy2, 'a', red, lsz, arcR, arcRy));
    parts.push(`<text x="128" y="${fy2}" text-anchor="middle" ${fn} font-size="${lsz}" font-weight="bold" fill="${red}" direction="ltr">&gt;</text>`);
    parts.push(formulaArcLabel(153, fy2, 'b', red, lsz, arcR, arcRy));
    parts.push(`<text x="205" y="${fy2}" text-anchor="middle" ${fn} font-size="${hb}" font-weight="bold" fill="${black}">אז</text>`);
    parts.push(`<text x="272" y="${fy2}" text-anchor="middle" ${fn} font-size="${lsz}" font-weight="bold" fill="${blue}" direction="ltr">a &gt; b</text>`);
    parts.push(`<text x="338" y="${fy2}" text-anchor="middle" ${fn} font-size="${hb}" font-weight="bold" fill="${black}">אם</text>`);
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
