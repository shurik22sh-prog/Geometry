// c6: Larger central angle → longer chord (central angles + chords, no arc highlights)
const DiagramCircleC6 = (() => {
  function render(cfg={}) {
    const width=490, height=385;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=165, R=130;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    const A1=ptOn(150), A2=ptOn(250);
    const B1=ptOn(295), B2=ptOn(345);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    // Chords – both blue
    parts.push(GeoRenderer.segment(Geo.segment(A1,A2),{color:blue,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B1,B2),{color:blue,width:2.5}));
    // Radii
    [A1,A2,B1,B2].forEach(P=>parts.push(GeoRenderer.segment(Geo.segment(O,P),{color:black,width:1.2})));
    // Central angle arcs – both red
    const arcα=Geo.angleArc(O,A1,A2,34);
    const arcβ=Geo.angleArc(O,B1,B2,34);
    parts.push(GeoRenderer.angleArc(arcα,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcβ,{color:red,strokeOnly:true,strokeWidth:2}));
    const lα=GeoRenderer.arcLabelPoint(arcα,14);
    const lβ=GeoRenderer.arcLabelPoint(arcβ,14);
    parts.push(GeoRenderer.label(lα,'α',{size:22,bold:true,color:red}));
    parts.push(GeoRenderer.label(lβ,'β',{size:22,bold:true,color:red}));
    // Chord label 'a': pushed toward chord (small outward dist)
    const mA={x:(A1.x+A2.x)/2, y:(A1.y+A2.y)/2};
    function outward(m,dist){
      const dx=m.x-cx, dy=m.y-cy, len=Math.hypot(dx,dy);
      return Geo.point(m.x+(dx/len)*dist, m.y+(dy/len)*dist);
    }
    parts.push(GeoRenderer.label(outward(mA,14),'a',{size:22,bold:true,color:blue}));
    // Chord label 'b': to the left of chord B1→B2
    const mB={x:(B1.x+B2.x)/2, y:(B1.y+B2.y)/2};
    const dxB=B2.x-B1.x, dyB=B2.y-B1.y, lenB=Math.hypot(dxB,dyB);
    const bPos=Geo.point(mB.x-(dyB/lenB)*10, mB.y+(dxB/lenB)*10);
    parts.push(GeoRenderer.label(bPos,'b',{size:22,bold:true,color:blue}));
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    // Formula: RTL reading → visual LTR: a>b | אז | α>β | אם
    const fy=354;
    parts.push(`<text x="162" y="${fy}" text-anchor="middle" font-family="Assistant,sans-serif" font-size="26" font-weight="bold" fill="${blue}" direction="ltr">a &gt; b</text>`);
    parts.push(`<text x="223" y="${fy}" text-anchor="middle" font-family="Assistant,sans-serif" font-size="24" font-weight="bold" fill="${black}">אז</text>`);
    parts.push(`<text x="278" y="${fy}" text-anchor="middle" font-family="Assistant,sans-serif" font-size="24" font-weight="bold" fill="${red}" direction="ltr">α &gt; β</text>`);
    parts.push(`<text x="337" y="${fy}" text-anchor="middle" font-family="Assistant,sans-serif" font-size="24" font-weight="bold" fill="${black}">אם</text>`);
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
