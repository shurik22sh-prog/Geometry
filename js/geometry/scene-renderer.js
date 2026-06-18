// SceneRenderer: converts a Scene (from any template) into an SVG string.
// Knows about GeoRenderer and Scene shape. Knows nothing about geometry internals.
const SceneRenderer = (() => {

  // Maps semantic arc roles to visual render options.
  // Templates emit roles; this layer decides how they look.
  const ARC_ROLE_STYLES = {
    'equal-angle': {
      noLegs:      true,
      fillOpacity: 0.20,
      strokeWidth: 2,
    },
    'supplementary-angle': {
      strokeOnly:  true,
      strokeWidth: 2,
    },
  };

  function render(scene, opts = {}) {
    const { width, height } = scene.viewport;
    const color = opts.color || '#cc2222';
    const parts = [];

    for (const el of scene.elements) {
      switch (el.type) {
        case 'segment':
          parts.push(GeoRenderer.segment(el.geo, {
            color: el.style?.color || '#1a1a1a',
            width: el.style?.width || 2,
          }));
          break;

        case 'arc': {
          const roleStyle = ARC_ROLE_STYLES[el.role] || {};
          parts.push(GeoRenderer.angleArc(el.geo, {
            color,
            ...roleStyle,
          }));
          break;
        }

        case 'label':
          parts.push(GeoRenderer.label(el.geo, el.text, {
            size:  el.style?.size  || 16,
            color: el.style?.color || '#1a1a1a',
            bold:  el.style?.bold  || false,
          }));
          break;

        case 'ticks':
          parts.push(GeoRenderer.ticks(el.geo, {
            count:   el.style?.count   || 1,
            color:   el.style?.color   || '#2D5FA6',
            tickLen: el.style?.tickLen || 16,
            width:   el.style?.width   || 2.5,
          }));
          break;

        case 'raw':
          parts.push(el.svg);
          break;
      }
    }

    return GeoRenderer.svg(width, height, parts.join('\n'), {
      background: 'var(--surface,#f9f9f9)',
      rx: 10,
    });
  }

  return { render };
})();
