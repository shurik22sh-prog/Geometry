// def: קשת – arc (portion of circle between two points)
const DiagramDefArc = (() => {
  function render(cfg={}) {
    const width=490, height=300;
    const black='#4f52d0', red='#cc2222';
    const cx=245, cy=155, r=115;
    // Arc endpoints at 200° and 340° – the highlighted arc goes through the top (270°)
    const a1=200*Math.PI/180, a2=340*Math.PI/180;
    const Ax=cx+r*Math.cos(a1), Ay=cy+r*Math.sin(a1);
    const Bx=cx+r*Math.cos(a2), By=cy+r*Math.sin(a2);
    // span = 340-200 = 140° ≤ 180 → sweep=1 (CW through 270°=top)
    const parts = [];
    // Full circle thin black
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${black}" stroke-width="1.5"/>`);
    // Highlighted arc: thick red, going CW from 200° to 340° through top
    parts.push(`<path d="M${Ax.toFixed(1)},${Ay.toFixed(1)} A${r},${r} 0 0 1 ${Bx.toFixed(1)},${By.toFixed(1)}" fill="none" stroke="${red}" stroke-width="5" stroke-linecap="round"/>`);

    return GeoRenderer.svg(width, height, parts.join('\n'), {background:'var(--surface,#f9f9f9)', rx:10});
  }
  return {render};
})();
