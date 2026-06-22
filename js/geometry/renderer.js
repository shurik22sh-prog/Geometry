// js/geometry/renderer.js – SVG rendering, takes Geo objects, returns SVG strings

const GeoRenderer = (() => {

  // ── Helpers ──────────────────────────────────────────────────────────────────

  // Format a number to 3 decimal places; pass strings through unchanged.
  const fmt = x => (typeof x === 'number' ? +x.toFixed(3) : x);

  // Build an attribute string, skipping null/undefined values.
  const attrs = obj =>
    Object.entries(obj)
      .filter(([, v]) => v != null)
      .map(([k, v]) => `${k}="${fmt(v)}"`)
      .join(' ');

  const el = (tag, a, inner = '') =>
    inner ? `<${tag} ${attrs(a)}>${inner}</${tag}>` : `<${tag} ${attrs(a)}/>`;

  // ── Primitives ───────────────────────────────────────────────────────────────

  function segment(seg, opts = {}) {
    return el('line', {
      x1: seg.p1.x, y1: seg.p1.y,
      x2: seg.p2.x, y2: seg.p2.y,
      stroke:              opts.color ?? '#333',
      'stroke-width':      opts.width ?? 2,
      'stroke-linecap':    'round',
      'stroke-dasharray':  opts.dashed ? '6 4' : null,
    });
  }

  function point(pt, opts = {}) {
    return el('circle', {
      cx: pt.x, cy: pt.y,
      r:            opts.r      ?? 4,
      fill:         opts.fill   ?? '#333',
      stroke:       opts.stroke ?? '#fff',
      'stroke-width': 1.5,
    });
  }

  function label(pt, text, opts = {}) {
    return el(
      'text',
      {
        x:                   pt.x + (opts.dx ?? 0),
        y:                   pt.y + (opts.dy ?? 0),
        'text-anchor':       opts.anchor   ?? 'middle',
        'dominant-baseline': opts.baseline ?? 'central',
        'font-family':       'Assistant, system-ui, sans-serif',
        'font-size':         opts.size  ?? 14,
        'font-weight':       opts.bold  ? 700 : 400,
        fill:                opts.color ?? '#333',
      },
      text
    );
  }

  // ── Angle arc (pie-slice wedge) ───────────────────────────────────────────────
  // Accepts an arc object returned by Geo.angleArc().

  // Angle arc: three render modes via opts.
  //   default    – filled pie-slice with stroked outline (legs + arc)
  //   strokeOnly – arc curve only, no fill, no leg lines
  //   noLegs     – filled sector + stroked arc curve, but NO stroked leg lines
  function angleArc(arc, opts = {}) {
    const { vertex: v, startPt: s, endPt: e, radius, deg } = arc;
    const sweep    = opts.sweep ?? arc.sweep;
    const largeArc = deg > 180 ? 1 : 0;
    const color    = opts.color ?? '#2D5FA6';
    const arcPath  = `M ${fmt(s.x)} ${fmt(s.y)} A ${fmt(radius)} ${fmt(radius)} 0 ${largeArc} ${sweep} ${fmt(e.x)} ${fmt(e.y)}`;
    const piePath  = `M ${fmt(v.x)} ${fmt(v.y)} L ${fmt(s.x)} ${fmt(s.y)} A ${fmt(radius)} ${fmt(radius)} 0 ${largeArc} ${sweep} ${fmt(e.x)} ${fmt(e.y)} Z`;

    if (opts.strokeOnly) {
      // Arc curve only — no fill, no leg lines.
      return el('path', {
        d:                arcPath,
        fill:             'none',
        stroke:           color,
        'stroke-width':   opts.strokeWidth ?? 2,
        'stroke-linecap': 'round',
      });
    }

    if (opts.fillOnly) {
      // Filled sector only — no stroke on arc, no leg lines.
      return el('path', {
        d: piePath, fill: color, 'fill-opacity': opts.fillOpacity ?? 0.22, stroke: 'none',
      });
    }

    if (opts.noLegs) {
      // Filled sector + arc stroke, but leg lines are invisible.
      const fill = el('path', {
        d: piePath, fill: color, 'fill-opacity': opts.fillOpacity ?? 0.22, stroke: 'none',
      });
      const stroke = el('path', {
        d: arcPath, fill: 'none', stroke: color,
        'stroke-width': opts.strokeWidth ?? 2, 'stroke-linecap': 'round',
      });
      return fill + stroke;
    }

    // Default: filled pie-slice with full outline.
    return el('path', {
      d:                 piePath,
      fill:              color,
      'fill-opacity':    opts.fillOpacity  ?? 0.14,
      stroke:            color,
      'stroke-width':    opts.strokeWidth  ?? 1.5,
      'stroke-linejoin': 'round',
    });
  }

  // ── Arc label point ──────────────────────────────────────────────────────────
  // Returns the point at the arc's angular bisector, `offset` px beyond the radius.
  // Use this to position α/β labels next to angle arcs.
  function arcLabelPoint(arc, offset) {
    const v1  = Geo.vecNormalize(Geo.vecFromPoints(arc.vertex, arc.startPt));
    const v2  = Geo.vecNormalize(Geo.vecFromPoints(arc.vertex, arc.endPt));
    const mid = Geo.vecNormalize(Geo.vecAdd(v1, v2));
    return Geo.point(
      arc.vertex.x + mid.x * (arc.radius + offset),
      arc.vertex.y + mid.y * (arc.radius + offset)
    );
  }

  // ── Parallel-line tick marks ─────────────────────────────────────────────────
  // Draws `count` short perpendicular ticks at the midpoint of a segment.

  function ticks(seg, opts = {}) {
    const dx  = seg.p2.x - seg.p1.x;
    const dy  = seg.p2.y - seg.p1.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux  = dx / len;  const uy  = dy / len;   // unit along segment
    const px  = -uy;       const py  = ux;          // unit perpendicular
    const count   = opts.count   ?? 1;
    const tickLen = opts.tickLen ?? 8;
    const spacing = opts.spacing ?? 5;
    const cx = (seg.p1.x + seg.p2.x) / 2;
    const cy = (seg.p1.y + seg.p2.y) / 2;
    const lines = [];
    for (let i = 0; i < count; i++) {
      const off = (i - (count - 1) / 2) * spacing;
      const mx  = cx + ux * off;
      const my  = cy + uy * off;
      lines.push(el('line', {
        x1: mx + px * tickLen / 2, y1: my + py * tickLen / 2,
        x2: mx - px * tickLen / 2, y2: my - py * tickLen / 2,
        stroke:           opts.color ?? '#444',
        'stroke-width':   opts.width ?? 2,
        'stroke-linecap': 'round',
      }));
    }
    return lines.join('');
  }

  // ── SVG wrapper ───────────────────────────────────────────────────────────────

  function svg(width, height, content, opts = {}) {
    // Background is handled by CSS (.def-thumb, .game-diagram, etc.) — no rect injected.
    return [
      `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"`,
      `     width="${width}" height="${height}">`,
      content,
      '</svg>',
    ].join('\n');
  }

  // ── Exports ───────────────────────────────────────────────────────────────────

  return { segment, point, label, angleArc, ticks, svg, arcLabelPoint };
})();
