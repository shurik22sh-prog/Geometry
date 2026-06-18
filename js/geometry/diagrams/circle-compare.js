// c6,c7,c8: Larger central angle → longer chord and longer arc
const DiagramCircleCompare = (() => {
  function render(cfg={}) {
    const width=490, height=320;
    const black='#1a1a1a', blue='#2D5FA6', red='#cc2222';
    const cx=245, cy=165, R=130;
    const O=Geo.point(cx,cy);
    function ptOn(deg){const a=deg*Math.PI/180;return Geo.point(cx+R*Math.cos(a),cy+R*Math.sin(a));}
    function circArc(a1,a2,color,w=3.5){
      const p1=ptOn(a1),p2=ptOn(a2);
      const span=((a2-a1)+360)%360, sweep=span<=180?1:0;
      return `<path d="M ${p1.x.toFixed(1)},${p1.y.toFixed(1)} A ${R} ${R} 0 0 ${sweep} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
    }
    // Angle α (larger, ~100°): arc 150°→250°
    const A1=ptOn(150), A2=ptOn(250);
    // Angle β (smaller, ~50°): arc 295°→345°
    const B1=ptOn(295), B2=ptOn(345);
    const parts=[];
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${black}" stroke-width="2"/>`);
    // Highlighted arcs
    parts.push(circArc(150,250,red));
    parts.push(circArc(295,345,blue));
    // Chords
    parts.push(GeoRenderer.segment(Geo.segment(A1,A2),{color:red,width:2.5}));
    parts.push(GeoRenderer.segment(Geo.segment(B1,B2),{color:blue,width:2.5}));
    // Radii
    [A1,A2,B1,B2].forEach(P=>parts.push(GeoRenderer.segment(Geo.segment(O,P),{color:black,width:1.2})));
    // Central angle arcs at O
    const arcα=Geo.angleArc(O,A1,A2,34);
    const arcβ=Geo.angleArc(O,B1,B2,34);
    parts.push(GeoRenderer.angleArc(arcα,{color:red,strokeOnly:true,strokeWidth:2}));
    parts.push(GeoRenderer.angleArc(arcβ,{color:blue,strokeOnly:true,strokeWidth:2}));
    const lα=GeoRenderer.arcLabelPoint(arcα,14);
    const lβ=GeoRenderer.arcLabelPoint(arcβ,14);
    parts.push(GeoRenderer.label(lα,'α',{size:22,bold:true,color:red}));
    parts.push(GeoRenderer.label(lβ,'β',{size:22,bold:true,color:blue}));
    parts.push(GeoRenderer.point(O,{r:4,fill:black}));
    // α > β label
    parts.push(`<text x="430" y="48" text-anchor="middle" font-family="Assistant,sans-serif" font-size="22" font-weight="bold" fill="${red}" direction="ltr">α &gt; β</text>`);
    return GeoRenderer.svg(width,height,parts.join('\n'),{background:'var(--surface,#f9f9f9)',rx:10});
  }
  return {render};
})();
