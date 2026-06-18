// js/pages/theorem-detail.js – תצוגת משפט בודד עם ניווט

// Global diagram registry: used by both PageTheoremDetail and PageDefinitionDetail.
// Adding a new diagram: create its builder file and add one entry here.
const DIAGRAM_RENDERERS = {
    'parallel-transversal':            cfg => DiagramParallelTransversal.render(cfg),
    'supplementary-angles':            cfg => DiagramSupplementaryAngles.render(cfg),
    'vertical-angles':                 cfg => DiagramVerticalAngles.render(cfg),
    'corresponding-angles':            cfg => DiagramCorrespondingAngles.render(cfg),
    'co-interior-angles':              cfg => DiagramCoInteriorAngles.render(cfg),
    'triangle-inequality':             cfg => DiagramTriangleInequality.render(cfg),
    'triangle-angle-sum':              cfg => DiagramTriangleAngleSum.render(cfg),
    'triangle-exterior-angle':         cfg => DiagramTriangleExteriorAngle.render(cfg),
    'triangle-pythagorean':            cfg => DiagramTrianglePythagorean.render(cfg),
    'triangle-equal-angles-sides':     cfg => DiagramTriangleEqualAnglesSides.render(cfg),
    'triangle-larger-angle-side':      cfg => DiagramTriangleLargerAngleSide.render(cfg),
    'triangle-altitudes':              cfg => DiagramTriangleAltitudes.render(cfg),
    'triangle-medians':                cfg => DiagramTriangleMedians.render(cfg),
    'triangle-median-area':            cfg => DiagramTriangleMedianArea.render(cfg),
    'triangle-angle-bisectors':        cfg => DiagramTriangleAngleBisectors.render(cfg),
    'triangle-perp-bisectors':         cfg => DiagramTrianglePerpBisectors.render(cfg),
    'triangle-midpoint-segment':       cfg => DiagramTriangleMidpointSegment.render(cfg),
    'triangle-midpoint-half':          cfg => DiagramTriangleMidpointHalf.render(cfg),
    'triangle-midpoint-from-mid':      cfg => DiagramTriangleMidpointFromMid.render(cfg),
    'triangle-midpoint-from-half':     cfg => DiagramTriangleMidpointFromHalf.render(cfg),
    'triangle-isosceles':              cfg => DiagramTriangleIsosceles.render(cfg),
    'triangle-isosceles-apex':         cfg => DiagramTriangleIsoscelesApex.render(cfg),
    'triangle-isosceles-apex-17':      cfg => DiagramTriangleIsoscelesApex17.render(cfg),
    'triangle-isosceles-apex-18':      cfg => DiagramTriangleIsoscelesApex18.render(cfg),
    'triangle-isosceles-apex-19':      cfg => DiagramTriangleIsoscelesApex19.render(cfg),
    'triangle-right-median':           cfg => DiagramTriangleRightMedian.render(cfg),
    'triangle-30-60-90':               cfg => DiagramTriangle306090.render(cfg),
    'triangle-congruence-sas':         cfg => DiagramTriangleCongruenceSas.render(cfg),
    'triangle-congruence-asa':         cfg => DiagramTriangleCongruenceAsa.render(cfg),
    'triangle-congruence-sss':         cfg => DiagramTriangleCongruenceSss.render(cfg),
    'triangle-thales':                 cfg => DiagramTriangleThales.render(cfg),
    'triangle-thales-formula':         cfg => DiagramTriangleThalesFormula.render(cfg),
    'triangle-thales-extension':       cfg => DiagramTriangleThalesExtension.render(cfg),
    'triangle-thales-hourglass':       cfg => DiagramTriangleThalesHourglass.render(cfg),
    'triangle-angle-bisector-theorem': cfg => DiagramTriangleAngleBisectorTheorem.render(cfg),
    'triangle-similarity':             cfg => DiagramTriangleSimilarity.render(cfg),
    'triangle-similarity-aa':          cfg => DiagramTriangleSimilarityAa.render(cfg),
    'triangle-similarity-sas':         cfg => DiagramTriangleSimilaritySas.render(cfg),
    'triangle-similarity-sss':         cfg => DiagramTriangleSimilaritySss.render(cfg),
    'triangle-similarity-altitude':    cfg => DiagramTriangleSimilarityAltitude.render(cfg),
    'triangle-similarity-median':      cfg => DiagramTriangleSimilarityMedian.render(cfg),
    'triangle-similarity-bisector':    cfg => DiagramTriangleSimilarityBisector.render(cfg),
    'triangle-similarity-perimeter':   cfg => DiagramTriangleSimilarityPerimeter.render(cfg),
    'triangle-similarity-area':        cfg => DiagramTriangleSimilarityArea.render(cfg),
    'quad-angle-sum':                  cfg => DiagramQuadAngleSum.render(cfg),
    'parallelogram-parallel':          cfg => DiagramParallelogramParallel.render(cfg),
    'parallelogram-opp-angles':        cfg => DiagramParallelogramOppAngles.render(cfg),
    'parallelogram-opp-sides':         cfg => DiagramParallelogramOppSides.render(cfg),
    'parallelogram-diagonals':         cfg => DiagramParallelogramDiagonals.render(cfg),
    'parallelogram-one-pair':          cfg => DiagramParallelogramOnePair.render(cfg),
    'parallelogram-adj-angles':        cfg => DiagramParallelogramAdjAngles.render(cfg),
    'rectangle-diagonals':             cfg => DiagramRectangleDiagonals.render(cfg),
    'rectangle-summary':               cfg => DiagramRectangleSummary.render(cfg),
    'parallelogram-eq-diagonals':      cfg => DiagramParallelogramEqDiagonals.render(cfg),
    'parallelogram-right-angle':       cfg => DiagramParallelogramRightAngle.render(cfg),
    'quad-three-right-angles':         cfg => DiagramQuadThreeRightAngles.render(cfg),
    'rhombus-summary':                 cfg => DiagramRhombusSummary.render(cfg),
    'rhombus-four-sides':              cfg => DiagramRhombusFourSides.render(cfg),
    'rhombus-perp-diagonals':          cfg => DiagramRhombusPerpDiagonals.render(cfg),
    'rhombus-diag-bisects':            cfg => DiagramRhombusDiagBisects.render(cfg),
    'parallelogram-perp-diag':         cfg => DiagramParallelogramPerpDiag.render(cfg),
    'parallelogram-adj-sides':         cfg => DiagramParallelogramAdjSides.render(cfg),
    'rhombus-eq-diagonals':            cfg => DiagramRhombusEqDiagonals.render(cfg),
    'rectangle-adj-sides':             cfg => DiagramRectangleAdjSides.render(cfg),
    'square-summary':                  cfg => DiagramSquareSummary.render(cfg),
    'square-definition':               cfg => DiagramSquareDefinition.render(cfg),
    'kite-definition':                 cfg => DiagramKiteDefinition.render(cfg),
    'kite-summary':                    cfg => DiagramKiteSummary.render(cfg),
    'kite-main-diagonal':              cfg => DiagramKiteMainDiagonal.render(cfg),
    'kite-side-angles':                cfg => DiagramKiteSideAngles.render(cfg),
    'trapezoid-summary':               cfg => DiagramTrapezoidSummary.render(cfg),
    'trapezoid-definition':            cfg => DiagramTrapezoidDefinition.render(cfg),
    'parallelogram-summary':            cfg => DiagramParallelogramSummary.render(cfg),
    'trapezoid-q23':                   cfg => DiagramTrapezoidQ23.render(cfg),
    'trapezoid-adj-angles':            cfg => DiagramTrapezoidAdjAngles.render(cfg),
    'trapezoid-isosceles':             cfg => DiagramTrapezoidIsosceles.render(cfg),
    'trapezoid-eq-diagonals':          cfg => DiagramTrapezoidEqDiagonals.render(cfg),
    'trapezoid-midsegment':            cfg => DiagramTrapezoidMidsegment.render(cfg),
    'trapezoid-midsegment-length':     cfg => DiagramTrapezoidMidsegmentLength.render(cfg),
    'trapezoid-midsegment-from-mid':   cfg => DiagramTrapezoidMidsegmentFromMid.render(cfg),
    'circle-radii':                    cfg => DiagramCircleRadii.render(cfg),
    'def-circle':                      cfg => DiagramDefCircle.render(cfg),
    'circle-diameter':                 cfg => DiagramCircleDiameter.render(cfg),
    'circle-equal-chords':             cfg => DiagramCircleEqualChords.render(cfg),
    'circle-c4':                       cfg => DiagramCircleC4.render(cfg),
    'circle-c5':                       cfg => DiagramCircleC5.render(cfg),
    'circle-compare':                  cfg => DiagramCircleCompare.render(cfg),
    'circle-c6':                       cfg => DiagramCircleC6.render(cfg),
    'circle-c7':                       cfg => DiagramCircleC7.render(cfg),
    'circle-c8':                       cfg => DiagramCircleC8.render(cfg),
    'circle-perp-chord':               cfg => DiagramCirclePerpChord.render(cfg),
    'circle-c10':                      cfg => DiagramCircleC10.render(cfg),
    'circle-chord-distance':           cfg => DiagramCircleChordDistance.render(cfg),
    'circle-c12':                      cfg => DiagramCircleC12.render(cfg),
    'circle-central-inscribed':        cfg => DiagramCircleCentralInscribed.render(cfg),
    'circle-inscribed-angles':         cfg => DiagramCircleInscribedAngles.render(cfg),
    'circle-c15':                      cfg => DiagramCircleC15.render(cfg),
    'circle-equal-inscribed':          cfg => DiagramCircleEqualInscribed.render(cfg),
    'circle-c17':                      cfg => DiagramCircleC17.render(cfg),
    'circle-thales':                   cfg => DiagramCircleThales.render(cfg),
    'circle-tangent-radius':           cfg => DiagramCircleTangentRadius.render(cfg),
    'circle-two-tangents':             cfg => DiagramCircleTwoTangents.render(cfg),
    'circle-two-tangents-c21':         cfg => DiagramCircleTwoTangents.render({...cfg, bisector:true}),
    'circle-tangent-chord':            cfg => DiagramCircleTangentChord.render(cfg),
    'circle-circumscribed':            cfg => DiagramCircleCircumscribed.render(cfg),
    'circle-inscribed-tri':            cfg => DiagramCircleInscribedTri.render(cfg),
    'circle-cyclic-quad':              cfg => DiagramCircleCyclicQuad.render(cfg),
    'circle-cyclic-trap':              cfg => DiagramCircleCyclicTrap.render(cfg),
    'circle-tangent-quad':             cfg => DiagramCircleTangentQuad.render(cfg),
    // Definition diagrams
    'def-right-angle':                 cfg => DiagramDefRightAngle.render(cfg),
    'def-bisector':                    cfg => DiagramDefBisector.render(cfg),
    'def-perpendicular':               cfg => DiagramDefPerpendicular.render(cfg),
    'def-point-line-dist':             cfg => DiagramDefPointLineDist.render(cfg),
    'def-parallel-lines':              cfg => DiagramDefParallelLines.render(cfg),
    'def-altitude':                    cfg => DiagramDefAltitude.render(cfg),
    'def-median':                      cfg => DiagramDefMedian.render(cfg),
    'def-angle-bisector-def':          cfg => DiagramDefAngleBisectorDef.render(cfg),
    'def-perp-bisector':               cfg => DiagramDefPerpBisector.render(cfg),
    'def-equilateral':                 cfg => DiagramDefEquilateral.render(cfg),
    'def-right-triangle':              cfg => DiagramDefRightTriangle.render(cfg),
    'def-rectangle':                   cfg => DiagramDefRectangle.render(cfg),
    'def-rhombus':                     cfg => DiagramDefRhombus.render(cfg),
    'def-chord':                       cfg => DiagramDefChord.render(cfg),
    'def-arc':                         cfg => DiagramDefArc.render(cfg),
    'def-sector':                      cfg => DiagramDefSector.render(cfg),
    'def-central-angle':               cfg => DiagramDefCentralAngle.render(cfg),
    'def-congruent-triangles':         cfg => DiagramDefCongruentTriangles.render(cfg),
    'def-tangent':                     cfg => DiagramDefTangent.render(cfg),
    'def-circumscribed-tri':           cfg => DiagramDefCircumscribedTri.render(cfg),
    'def-inscribed-tri':               cfg => DiagramDefInscribedTri.render(cfg),
    'def-cyclic-quad':                 cfg => DiagramDefCyclicQuad.render(cfg),
    'def-tangent-quad':                cfg => DiagramDefTangentQuad.render(cfg),
  };

const PageTheoremDetail = (() => {

  function getCategoryLabel(key) {
    if (key === 'all') return 'כל המשפטים';
    return THEOREMS[key]?.meta?.detailLabel ?? key;
  }

  function getItems(categoryKey) {
    return categoryKey === 'all' ? ALL_THEOREMS : (THEOREMS[categoryKey]?.items ?? []);
  }

  function render(el, categoryKey, index) {
    const items = getItems(categoryKey);
    const item = items[index];
    if (!item) { Router.navigate('/theorems'); return; }

    const total = items.length;
    const isFirst = index === 0;
    const isLast = index === total - 1;

    // Template path (new): theorem carries { template, config }
    // Legacy path (old):   theorem carries { diagram }
    let diagramSvg = null;
    if (item.template && TemplateRegistry.has(item.template)) {
      const scene = TemplateRegistry.get(item.template).build({ ...item.config, color: '#cc2222' });
      diagramSvg = SceneRenderer.render(scene, { color: '#cc2222' });
    } else if (item.diagram && DIAGRAM_RENDERERS[item.diagram]) {
      diagramSvg = DIAGRAM_RENDERERS[item.diagram]({ lineLabels: false, angleLabels: false, angleValue: false, color: '#cc2222' });
    }

    el.innerHTML = `
      <div class="theorem-nav">
        <button class="nav-btn" id="btn-prev" ${isFirst ? 'disabled' : ''}>‹ הקודם</button>
        <div class="nav-counter">${index + 1} / ${total}</div>
        <button class="nav-btn" id="btn-next" ${isLast ? 'disabled' : ''}>הבא ›</button>
      </div>
      <div class="theorem-card ${diagramSvg ? 'has-diagram' : ''}">
        <div class="theorem-main">
          <span class="category-badge ${categoryKey}">${getCategoryLabel(categoryKey)}</span>
          <div class="theorem-text">${Parser.parseText(item.text)}</div>
        </div>
        ${diagramSvg ? `<div class="theorem-diagram">${diagramSvg}</div>` : ''}
      </div>
    `;

    if (!isFirst) {
      el.querySelector('#btn-prev').addEventListener('click', () => {
        Router.navigate(`/theorems/${categoryKey}/${index - 1}`);
      });
    }
    if (!isLast) {
      el.querySelector('#btn-next').addEventListener('click', () => {
        Router.navigate(`/theorems/${categoryKey}/${index + 1}`);
      });
    }
  }

  return { render };
})();
