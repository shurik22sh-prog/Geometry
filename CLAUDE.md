# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## README.md maintenance

`README.md` is the user-facing project overview. Keep it in sync when any of these change:

- **Theorem/definition counts** — update the table whenever theorems or definitions are added or removed (counts come from `js/data/theorems.js` and `js/data/definitions.js`)
- **New category** — add a row to the table with its name and theorem count
- **New feature** — add a bullet to the "תכונות" section if it's user-visible

Do **not** add implementation details, file paths, or architecture to README.md — those belong in CLAUDE.md.

---

# Geometry Learning App – Claude Code Instructions

## Project Overview

A Hebrew RTL single-page application for learning geometry (middle/high school level).
Stack: **HTML + CSS + Vanilla JavaScript only** — no frameworks, no build tools, no bundler.
Routing: **hash-based** (`#/theorems/angles/2`) — browser back/forward works natively, every screen has a real URL.

---

## Running the App

Serve with the built-in PowerShell server (port 3333):

```powershell
powershell -ExecutionPolicy Bypass -File .claude/serve.ps1
```

Then open `http://localhost:3333` in a browser. The server is a minimal static file server — no hot-reload.

> **Cannot open as `file://`** — the browser blocks module loading from the filesystem.

---

## File Structure

```
index.html               ← static shell only; no logic, no inline scripts
css/
  base.css               ← CSS variables, reset, fonts, scrollbar
  layout.css             ← header, content area, breadcrumb, responsive
  components.css         ← modal, search, badges, def-link, section headers
  pages/
    home.css
    theorems.css         ← category grid, theorem list, theorem detail
    definitions.css
    learning.css
js/
  data/
    definitions.js       ← DEFINITIONS object (sole source of truth)
    theorems.js          ← THEOREMS + ALL_THEOREMS (sole source of truth)
  core/
    parser.js            ← Parser: parseText, stripLinks, findDefinitionId
    router.js            ← Router: navigate, current, init
    modal.js             ← Modal: open, close, init
  pages/
    home.js              ← PageHome
    theorems-menu.js     ← PageTheoremsMenu
    theorem-list.js      ← PageTheoremList
    theorem-detail.js    ← PageTheoremDetail + DIAGRAM_RENDERERS registry
    definitions-list.js  ← PageDefinitionsList
    definition-detail.js ← PageDefinitionDetail (also uses DIAGRAM_RENDERERS)
    learning.js          ← PageLearning
  main.js                ← init, route dispatcher, header updates
  geometry/
    engine.js            ← Geo IIFE – pure math (points, lines, intersections, arcs)
    renderer.js          ← GeoRenderer IIFE – SVG string generation
    template-registry.js ← TemplateRegistry – register/get named templates
    scene-renderer.js    ← SceneRenderer – converts a Scene → SVG string
    templates/           ← NEW approach: constraint-based geometry templates
      parallel-transversal.js ← ParallelTransversalTemplate; self-registers
    diagrams/            ← LEGACY: direct SVG builders (migrated one-by-one to templates)
      *.js               ← DiagramXxx IIFEs with build() + render()
```

Script load order in `index.html`:
**data → geometry engine → geometry renderer → template-registry → scene-renderer → templates → legacy diagrams → core → pages → main**

---

## Core Principles (strictly enforced)

- **No duplication** — one function per responsibility, one data source
- **No hardcoded content in HTML** — all text comes from `js/data/`
- **No quick fixes or hacks** — clean architecture only
- **No inline scripts in HTML** — all JS lives in `js/`
- **Scalability first** — adding a theorem/definition/category touches only `js/data/`
- **No inline onclick attributes** — all event listeners are attached in JS after render

---

## Module Pattern

Since there is no bundler, each JS file exposes a single `const` namespace via IIFE:

```js
const PageFoo = (() => {
  function render(el, ...params) { ... }
  return { render };
})();
```

This avoids global pollution while keeping the file:// compatible.

---

## Routing

Hash-based: `window.location.hash`. Format: `#/section/sub/index`

| URL                              | Screen              |
|----------------------------------|---------------------|
| `#/` (empty)                     | Home                |
| `#/theorems`                     | Theorems menu       |
| `#/theorems/all`                 | All theorems list   |
| `#/theorems/:category`           | Category list       |
| `#/theorems/:category/:index`    | Theorem detail      |
| `#/definitions`                  | Definitions list    |
| `#/definitions/:id`              | Definition detail   |
| `#/learning/:moduleId`           | Learning placeholder|

`Router.current()` returns decoded URL segments (handles Hebrew IDs via `decodeURIComponent`).

**URL index is 0-based**: `#/theorems/circles/22` renders item at index 22 in `THEOREMS.circles.items` — which is the 23rd theorem (c23). When debugging diagrams, verify with `THEOREMS[category].items[index]`.
`Router.navigate(path)` sets `window.location.hash`. Browser back = native `history.back()`.
Definition IDs in URLs must be encoded with `encodeURIComponent` on navigate.

---

## Data Architecture

All content in `js/data/`. Never duplicate data between files.

- `DEFINITIONS` — object keyed by Hebrew snake_case ID (e.g. `"זווית_ישרה"`). Entries may include `diagram: '<key>'` to show a diagram on the definition detail page (uses the same `DIAGRAM_RENDERERS` registry as theorems).
- `THEOREMS` — object keyed by category (`angles`, `triangles`, `quadrilaterals`, `circles`)
  - Each category: `{ title, items[] }` where each item is `{ id, text }`
- `ALL_THEOREMS` — flat array derived at bottom of `theorems.js`; each item gets a `categoryKey` field

**Category keys are consistent everywhere** — URL, THEOREMS object, CSS classes, and CATEGORY_META in `theorems-menu.js` all use the same key. The old `quads` alias is gone; use `quadrilaterals`.

---

## Text Format in `js/data/`

Two markers in theorem/definition text strings:
- `@id@` — renders as a clickable definition link (matched by `Parser.findDefinitionId`)
- `*text*` — renders as `<strong>`

The `@id@` value is matched with Hebrew morphology fuzzy matching — test new entries before shipping.
Do **not** use the unused `specialLinks` field pattern; use standard `@id@` syntax.

---

## Rendering Rules

- Each `PageXxx.render(el, ...params)` writes `el.innerHTML` once, then attaches listeners
- No DOM manipulation outside render functions (except `Modal.open/close`)
- Event delegation is used for `.def-link` clicks (wired globally in `Modal.init`)
- Never attach the same listener twice — listeners are set up fresh on each render call

---

## What NOT to Add

- A second state object or router
- `onclick="..."` attributes in HTML strings inside template literals
- Fallback/legacy logic
- The `specialLinks` field on theorem items
- Hardcoded category counts or theorem counts (always derive from data)
- Inline `<script>` tags in `index.html`

---

## Adding Content (only `js/data/` changes needed)

**New theorem:** add `{ id, text }` to `THEOREMS[category].items`.

**New definition:** add `"key": { title, text }` to `DEFINITIONS`.

**New category:**
1. Add to `THEOREMS` in `theorems.js` with a `meta: { icon, label, detailLabel }` field — this is the only JS change needed; `theorems-menu.js`, `theorem-detail.js`, and `main.js` all read from it automatically
2. Add CSS color variable in `base.css` (e.g. `--category-newkey`)
3. Add `.cat-icon.newkey` in `theorems.css` and `.category-badge.newkey` in `components.css`

Existing categories: `angles`, `triangles`, `quadrilaterals`, `circles`.

---

## Geometry Diagrams

### Two-tier diagram system

**New diagrams → Template approach** (`js/geometry/templates/`)
- A template is a constraint-based geometry builder: it computes points from configuration, emits a `Scene` (list of typed elements), and self-registers via `TemplateRegistry.register('key', Template)`.
- `SceneRenderer.render(scene, opts)` converts a Scene to SVG. It maps semantic arc roles (`'equal-angle'`, `'supplementary-angle'`) to visual styles — templates never hard-code visual style.
- Template `build(config)` returns `{ viewport: {width, height}, elements: [{type, geo, role?, style?, text?}] }`.
- Supported element types: `'segment'`, `'arc'`, `'label'`, `'ticks'`, `'raw'` — the `'raw'` type passes `el.svg` (an SVG string) through unchanged, useful for chevrons and other complex shapes.

**Existing diagrams → Legacy approach** (`js/geometry/diagrams/`)
- Each file exports a `DiagramXxx` IIFE with `build()` + `render(cfg)` that directly calls `GeoRenderer.*` and returns an SVG string. No `Scene` object.
- These are being migrated to templates one-by-one; **do not create new legacy diagrams**.

### Attaching a diagram to a theorem or definition

1. Add `diagram: '<key>'` to the item in `js/data/theorems.js` or `js/data/definitions.js`.
2. Add `'<key>': cfg => DiagramXxx.render(cfg)` (legacy) or `cfg => SceneRenderer.render(TemplateRegistry.get('key').build(cfg), cfg)` (template) to `DIAGRAM_RENDERERS` in `js/pages/theorem-detail.js`.
3. Add the `<script>` tag in `index.html` in the correct section (templates block or legacy diagrams block).

No other files need to change.

### Layout convention (user preference — do not change)

When a theorem has a diagram, the detail card uses a **side-by-side layout**:
- Theorem text on the **right** (natural RTL reading side)
- Diagram on the **left**, fixed width 340 px
- On mobile (≤ 600 px) the layout stacks vertically

This is set via `.theorem-card.has-diagram` in `css/pages/theorems.css`.

### Diagram render options (parallel-transversal template)

The template-based version (`js/geometry/templates/parallel-transversal.js`) uses:

| Option | Default | Effect |
|---|---|---|
| `angleDeg` | 55 | transversal angle in degrees |
| `spacing` | 110 | perpendicular distance between parallel lines |
| `parallelAngle` | 0 | angle of the parallel lines themselves |
| `highlight` | `'alternate'` | which angle pair to mark — see `HIGHLIGHT_MAP` in the file |
| `showLineLabels` | true | show ℓ₁ / ℓ₂ labels |
| `showL1Label` | true | show ℓ₁ label on upper line (requires `showLineLabels: true`) |
| `showParallelMarks` | false | add orange chevron marks on both parallel lines |
| `width` / `height` | 500 / 320 | SVG viewport size |

`highlight` values: `alternate`, `alternate_left`, `corresponding_UR/LR/LL/UL`, `vertical_P1`, `vertical_P2`, `co_interior`, `co_interior_left`, `supplementary_P1`.

Arc visual style is determined by `SceneRenderer` via role → `ARC_ROLE_STYLES` map — no style flags in the template itself.

The legacy diagram (`js/geometry/diagrams/parallel-transversal.js`) has separate options (`lineLabels`, `angleLabels`, `angleValue`, `noLegs`); prefer the template for new work.

### Visual language rules for angle diagrams (do not deviate)

These rules apply to **all** angle diagrams and must be followed when adding new ones:

| Theorem type | Arc style | Labels | Formula |
|---|---|---|---|
| Angles that are **equal** | `noLegs` (fill + contour) | none | none |
| Angles that **sum to 180°** | `strokeOnly` (contour only) | α / β inside arc | `α + β = 180°` large bold red |
| Equal angles with same letter | same letter (α = α, not α/β) | — | — |

**Rules:**
1. **Equal angles** (corresponding, alternating) → `noLegs: true, strokeWidth: 2, fillOpacity: 0.20` — the shared fill signals equality. No labels, no formula.
2. **Supplementary pairs** (adjacent on line, co-interior) → `strokeOnly: true, strokeWidth: 2` + labels α/β inside arc + formula `α + β = 180°` at `size: 51, bold: true`.
3. **Label placement** — always **inside** the arc: `arcLabelPoint(arc, -arcR * 0.5)` — places the label at exactly 50% of the radius from the vertex, equidistant between vertex and arc. Never outside.
   - **Top vertex** (both sides diagonal, angle opens downward): no correction needed.
   - **Bottom vertex on horizontal base** (one side is the baseline): add `dy: -6` to lift the label clear of the baseline, and `dx: ±5` toward the interior of the angle.
   - **Different arc radii per vertex**: vertices with a horizontal base or a narrow angle need a larger `arcR` (e.g. 54) than top vertices (e.g. 42) to give the label breathing room.
   - **Label font size inside diagrams**: `size: 23` for angle labels inside the SVG (separate from formula text below).
4. **Equal-angle pairs** use the **same Greek letter** for both arcs (both α), not α and β.
5. **No tick marks** on parallel lines — `GeoRenderer.ticks()` is never called in diagram renderers.
6. **Highlight color** — always `#cc2222` (red). Passed as `cfg.color` from `theorem-detail.js`.
7. **SVG height** — increase when a large formula (size 51) is present; add ~60 px headroom (e.g. default 320 → 380).

### Label and marking rules (user preference — strictly enforced)

Labels and marks are added only when the user explicitly asks.

#### Angle bisector — two equal arcs at vertex

When a theorem states that a line **bisects an angle**, mark the two equal half-angles with matching red arc contours at the vertex:
```js
parts.push(GeoRenderer.angleArc(Geo.angleArc(V, P1, bisector, r), {color:red, strokeOnly:true, strokeWidth:2}));
parts.push(GeoRenderer.angleArc(Geo.angleArc(V, bisector, P2, r), {color:red, strokeOnly:true, strokeWidth:2}));
```
When the **same figure has three bisectors** (incenter theorem, c24), use concentric arcs — 1 at first vertex, 2 at second, 3 at third — with gap ~8px between concentric arcs.

#### Perpendicular bisector — right angle + halves

Mark each perpendicular bisector at the midpoint M of side PQ with:
1. **Right angle** (red `#cc2222`) at M, between the side direction and bisector direction
2. **Tick marks** (blue) on both half-segments PM and MQ — different count per side (1, 2, 3 for three sides)
3. **No dot** at M — the right angle mark is sufficient

#### Angles — three ways to mark:
| Method | When to use | How |
|---|---|---|
| **Greek letter** (α, β, γ, …) | When the angle needs a name in a formula | Red `#cc2222`, `size: 23`, inside the arc |
| **Arc contour only** | When showing equality/relationship without naming | Red `#cc2222`, `strokeOnly` or `noLegs` |
| **Right-angle square** | When the angle is exactly 90° | Two segments forming a small square — always red `#cc2222`, `width: 1.5`, square size `sq=16` (use 18 for larger diagrams) |

#### Sides — two ways to mark:
| Method | When to use | How |
|---|---|---|
| **Lowercase letter** (a, b, c, …) | When the side needs a name in a formula | Blue `#2D5FA6`, `size: 22–36`, pushed outward from centroid |
| **Tick mark** (⊥ short perpendicular line) | When showing that sides are equal, without naming | Blue `#2D5FA6`, short perpendicular line at the side's midpoint |

**Tick mark rules:**
- Use `GeoRenderer.ticks(segment, { count: N, color: '#2D5FA6', tickLen: 16, width: 2.5 })`
- When a diagram has **multiple equality groups**, each group gets a different tick count:
  - 1st group of equal sides → `count: 1` (one tick per side)
  - 2nd group of equal sides → `count: 2` (two ticks per side)
  - 3rd group of equal sides → `count: 3` (three ticks per side)
- All sides within the same equality group get the **same** tick count
- Tick color is always blue `#2D5FA6`
- Never mix tick marks and letter labels on the same side

Never mix: Greek letters for angles, Latin lowercase for sides. Never use red for sides or blue for angles.

---

## Theorem-to-diagram correspondence rules

These rules govern **what to mark and how**, based on the theorem's wording. Apply them consistently when creating or editing diagrams.

### Core principle: diagram shows GIVEN information only

The diagram marks **only** what the theorem states as given — never what needs to be proved. When two theorems share the same geometric figure but differ in what is given vs. what is to be proved, they get **separate diagram files** (e.g., `triangle-isosceles-apex-17.js`, `triangle-isosceles-apex-18.js`).

### Tick marks vs. letter labels on segments

| Theorem says… | Marking in diagram |
|---|---|
| Two sides are **equal** | Tick marks — same count per equality group (blue `#2D5FA6`, `tickLen:16`, `width:2.5`) |
| Sides are in a **ratio** (a/b = c/d) | Letter labels (a, b, c, d…) pushed outward from centroid — **no tick marks** |
| **Sum** of sides equals sum of other sides (a+c = b+d) | Different letter per side (a, b, c, d) — **no tick marks** — add formula below |

When letter labels are used (ratio or sum), add a formula below the diagram. For sums: plain bold text, size 34, color blue `#2D5FA6`; for ratios: fraction format (see fracFormula helper below).

### Fraction formula below the diagram

Used whenever the theorem states a proportion or ratio. Built as raw SVG inside the `parts` array using a reusable helper:

```js
function fracFormula(l1, L1, l2, L2, fy) {
  const c = '#2D5FA6', f = 34;
  return `<text x="210" y="${fy}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">${l1}</text>
<line x1="193" y1="${fy+14}" x2="227" y2="${fy+14}" stroke="${c}" stroke-width="2"/>
<text x="210" y="${fy+47}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">${L1}</text>
<text x="255" y="${fy+20}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">=</text>
<text x="300" y="${fy}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">${l2}</text>
<line x1="283" y1="${fy+14}" x2="317" y2="${fy+14}" stroke="${c}" stroke-width="2"/>
<text x="300" y="${fy+47}" text-anchor="middle" font-size="${f}" font-weight="bold" fill="${c}" font-family="Assistant">${L2}</text>`;
}
```

Key values:
- **Font size**: `f=34` for all formula text
- **Numerator baseline**: `fy`; **bar**: `fy+14`; **denominator baseline**: `fy+47` — the `+47` (not `+40`) gives breathing room below the bar
- **`fy` placement**: at least 55 px below the lowest diagram element (typically fy=320 when diagram content ends at ~265)
- **SVG height**: `fy + 80` minimum (e.g. height=375 when fy=320)
- **Formula order**: "main" ratio first — for similarity theorems, the side fraction comes before the auxiliary element: `a/A = h/H`, not `h/H = a/A`

#### Tall parentheses around fractions

When a formula needs parentheses around a full fraction (numerator + bar + denominator):
- Use font-size ~88, **no bold** (bold makes parens too thick)
- Baseline at `py = fy + 30` to vertically center the paren around the fraction height
- **RTL preference**: use `)` on the LEFT and `(` on the RIGHT — the curved opening faces the content

```js
const py = fy + 30;
`<text x="${x_left}"  y="${py}" font-size="88" fill="${color}" font-family="Assistant">)</text>`
`<text x="${x_right}" y="${py}" font-size="88" fill="${color}" font-family="Assistant">(</text>`
```

#### Exponent superscripts (²)

Place at `y = fy - 12` (above numerator baseline), `font-size=32`, bold, same color as the fraction:
```js
`<text x="${x}" y="${fy-12}" font-size="32" font-weight="bold" fill="${color}" font-family="Assistant">²</text>`
```

### Parallel lines → orange chevrons

When the theorem involves parallel lines, mark them with **orange chevron polylines** (roof/arrowhead shape, `#FF8C00`). Use a `chevron(seg, {color, size, width})` helper that generates a `<polyline>` centered on the segment. Never use tick marks for parallelism.

### Multiple groups of equal angles → concentric arcs

When a diagram has multiple distinct equality groups of angles (e.g., three different vertex angles in the angle-bisectors theorem), use **concentric strokeOnly arcs** — same logic as tick marks for sides:
- 1st equality group → 1 arc
- 2nd equality group → 2 concentric arcs
- 3rd equality group → 3 concentric arcs

All arcs in triangle diagrams use `strokeOnly: true, strokeWidth: 2` (contour only, no fill). The `noLegs` fill style is used only in the angles/parallel-lines category.

### Similarity diagrams — standard layout

All similarity theorem diagrams (triangles category, t33–t40) use this fixed layout:

| Element | Value |
|---|---|
| SVG width | 530 |
| SVG height | 310 (no formula) / 375 (one ratio formula) / larger for complex formulas |
| Large triangle | A1=(30,265), B1=(225,265), C1=(75,58) |
| Small triangle | A2=(335,265), B2=(462,265), C2=(365,131) |
| ∼ symbol | `Geo.point(265,182)`, size:68, red `#cc2222`, bold |
| Large triangle side labels | lowercase a/b/c, blue, size:28 |
| Small triangle side labels | uppercase A/B/C, blue, size:22 |
| All line segments | black `#1a1a1a` (not category color) |
| Angle arcs in triangles | `strokeOnly: true, strokeWidth: 2` (no noLegs fill) |

**Color added in this session**: purple `#7C3AED` for area labels (S₁, S₂) — distinct from blue (sides) and red (angles).

### Congruence theorems → ≅ symbol between triangles

Place a red `#cc2222`, bold, size-52 `≅` label centered horizontally between the two triangles:
```js
parts.push(GeoRenderer.label(Geo.point(midX, midY), '≅', {color:red, bold:true, size:52}));
```

### Text format markers for theorem text (`js/data/theorems.js`)

| Marker | Output | Use for |
|---|---|---|
| `{a/b}` | HTML fraction with bar | Proportion in theorem text |
| `~text~` | Blue `#2D5FA6`, bold, nowrap span | Wrapping a proportion expression (e.g. `~{a/b} = {c/d}~`) |
| `\n` | New line (`.text-line` block) | Separating formula from prose |

A `.text-line` that contains a `.frac-inline` is automatically centered and enlarged (1.4em) via CSS — so placing a proportion on its own line with `\n` makes it stand out as the theorem's key formula.

### Label placement — outward from centroid

For letter labels on triangle sides, push the label away from the triangle centroid:
```js
const cx=(A.x+B.x+C.x)/3, cy=(A.y+B.y+C.y)/3;
function sideLabel(p1,p2,text,gcx,gcy,size=22){
  const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
  const dx=mx-gcx, dy=my-gcy, len=Math.hypot(dx,dy);
  return GeoRenderer.label(Geo.point(mx+(dx/len)*24, my+(dy/len)*24), text, {color:blue,size,bold:true});
}
```
For segments on the **baseline** (e.g., BD and DC on BC), add `dx` corrections so labels don't overlap with the bisector or each other.

#### `leftLabel` / `rightLabel` for diagonal inner segments

The centroid-outward approach **fails** for inner segments (altitude, median, bisector) that pass near the centroid — the label ends up inside the triangle. Use perpendicular placement instead:

```js
function leftLabel(p1,p2,text,offset=20,size=22,nx=0,ny=0){
  const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
  const dx=p2.x-p1.x, dy=p2.y-p1.y, len=Math.hypot(dx,dy);
  return GeoRenderer.label(Geo.point(mx-(dy/len)*offset+nx, my+(dx/len)*offset+ny), text, {color:blue,size,bold:true});
}
```
- `leftLabel` places the label to the **left** of the direction p1→p2 (counter-clockwise rotation)
- Optional `nx, ny` nudge params for fine-tuning without changing offset
- For a **vertical altitude**, hardcode label position to the right of the segment: `Geo.point(C.x + 13, (C.y + H.y)/2)`

#### Subscript labels (S₁, S₂) in SVG

For area notation, use `<tspan>` for subscripts. Color: purple `#7C3AED`:
```js
`<text x="${x}" y="${y}" text-anchor="middle" font-size="44" font-weight="bold" fill="#7C3AED" font-family="Assistant">S<tspan dy="13" font-size="26">${sub}</tspan></text>`
```

---

## Circle diagram conventions

These rules apply to all diagrams in the `circles` category (c1–c27).

### What to mark — theorem wording signals the marking

| Theorem mentions… | What to draw | How |
|---|---|---|
| **Equal chords** (מיתרים שווים) | Chord lines in blue | `color:'#2D5FA6', width:2.5` — no tick marks |
| **Equal arcs** (קשתות שוות) | Arc highlights on circle | Red `#cc2222`, `stroke-width:4`, `stroke-linecap:round` — no chords |
| **Tangent** (משיק) | Right angle at tangency point | Red `#cc2222`, `stroke-width:2.5` |
| **Parallel lines in circle** | Orange chevrons | Same chevron helper as other categories |
| **Angle bisector** (חוצה זווית) | Two equal red arcs at vertex | `strokeOnly:true`, one per half-angle |
| **Perpendicular bisectors** (אנכים אמצעיים) | Right angle mark + tick marks on halves | Right angle at midpoint (red); halves get different tick counts (1,2,3 per side) |
| **Angle bisectors** (חוצי זוויות) | Concentric red arcs per vertex | 1 arc at vertex A, 2 at B, 3 at C |

### No angle labels in circle diagrams (c16 onward)

**Remove Greek letter labels** (α, β, …) from all circle diagrams from c16 onward. The arc contour alone signals equality. **Exception**: c25 (cyclic quadrilateral) keeps all four angle labels and formula, because the theorem names specific angle relationships.

### Inscribed angles — direction rule

When two inscribed angles subtend the same chord or arc, **both vertices must be on the same arc** (both on the major arc side). This ensures both angles "open" in the same direction — toward the chord from the same side.

### Construction points — remove unless essential

Only show dot markers (`GeoRenderer.point`) at **main vertices and circle center**. Remove dots at:
- Tangent points (נקודות השקה) — unless the point itself is the theorem's subject
- Midpoints where perpendicular bisectors meet sides
- Any other intermediate construction point

### Separate diagram keys for same-figure theorems

When two theorems share the same geometric figure but mark **different aspects** (e.g., c20 marks equal tangent lengths; c21 marks the angle bisector), give them **separate diagram keys** in `DIAGRAM_RENDERERS` and pass a distinguishing flag:

```js
'circle-two-tangents':      cfg => DiagramFoo.render(cfg),
'circle-two-tangents-c21':  cfg => DiagramFoo.render({...cfg, bisector: true}),
```

Update `theorems.js` to give the second theorem its own `diagram:` key.

### Formula below circle diagram

When a circle theorem has a formula (e.g., α + β = γ + δ = 180°, or a + c = b + d), place it below the circle:
- Font: `font-family="Assistant,sans-serif"`, bold
- Size: **34** (standard for all such formulas)
- Gap: at least 40 px from the bottom of the circle
- Color: red `#cc2222` for angle formulas; blue `#2D5FA6` for side/length formulas
- Always `direction="ltr"` on the `<text>` element

---

## Quadrilateral diagram conventions

These rules apply to all diagrams in the `quadrilaterals` category (q1–q29).

### Standard shape coordinates

Each quadrilateral type has fixed canonical coordinates. Use these — do not invent new ones.

| Shape | Coordinates |
|---|---|
| **Parallelogram / rhombus** | `A=(93,60), B=(327,60), C=(407,280), D=(173,280)` — all sides ≈234px (slant=80, height=220) |
| **Rectangle** | `A=(80,75), B=(420,75), C=(420,245), D=(80,245)` |
| **Square** | `A=(120,65), B=(360,65), C=(360,305), D=(120,305)` |
| **Rhombus rotated 45°** (q17 — diagonals equal → square) | `A=(250,50), B=(395,195), C=(250,340), D=(105,195)` — both diagonals 290px |
| **Kite (deltoid)** | `T=(245,40), R=(355,135), B=(245,385), L=(135,135)` — top sides ≈128px, bottom sides ≈228px (elongated vertically) |
| **Trapezoid (general)** | `TL=(150,80), TR=(280,80), BR=(465,255), BL=(70,255)` — asymmetric, right leg longer |
| **Trapezoid (wide, for angle labels)** | `TL=(90,80), TR=(320,80), BR=(465,255), BL=(50,255)` |
| **Isosceles trapezoid** | Symmetric legs — different shape, do not use general trapezoid coords |

**Rule**: all non-isosceles trapezoid diagrams use the general trapezoid shape above. Only diagrams that explicitly state "טרפז שווה שוקיים" use the isosceles shape.

### Chevron helper (parallelism marks)

Orange `#FF8C00`, `sz=7`, `stroke-width=2.5`. Two-pair parallelism: 1 chevron on one pair, 2 chevrons on the other.

```js
function chev(seg, n=1, shift=0) {
  const dx=seg.p2.x-seg.p1.x, dy=seg.p2.y-seg.p1.y, l=Math.hypot(dx,dy);
  const ux=dx/l, uy=dy/l, nx=-uy, ny=ux, sz=7, gap=11;
  const results=[];
  for(let i=0;i<n;i++){
    const off=(i-(n-1)/2)*gap;
    const cx=(seg.p1.x+seg.p2.x)/2+ux*(shift+off), cy=(seg.p1.y+seg.p2.y)/2+uy*(shift+off);
    results.push(`<polyline points="..." fill="none" stroke="${orange}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`);
  }
  return results.join('\n');
}
```

- `n` — number of chevrons (1 = one pair, 2 = other pair)
- `shift` — moves chevron along the segment to avoid overlapping with tick marks or labels

### Right angle mark

Always red `#cc2222`, `stroke-width=2.5`. Use the `rightAngle(V, t1, t2, sq)` helper:

```js
function rightAngle(V, t1, t2, sq=16) {
  const d1=vn({x:t1.x-V.x,y:t1.y-V.y}), d2=vn({x:t2.x-V.x,y:t2.y-V.y});
  const p1={x:V.x+d1.x*sq, y:V.y+d1.y*sq};
  const p2={x:p1.x+d2.x*sq, y:p1.y+d2.y*sq};
  const p3={x:V.x+d2.x*sq, y:V.y+d2.y*sq};
  return `<polyline points="..." fill="none" stroke="${red}" stroke-width="2.5"/>`;
}
```

| Context | `sq` value |
|---|---|
| Rhombus / parallelogram (large diagram) | 22 |
| Standard quadrilateral | 16 |
| Small context (kite intersection) | 14–16 |

### Angle arcs in quadrilaterals

All arcs in quadrilateral diagrams use `strokeOnly: true, strokeWidth: 2` (contour only, no fill). The `noLegs` fill style is **only** used in the angles/parallel-lines category, never in quadrilaterals.

Concentric arcs for multiple equality groups — same rule as triangles:
- 1st group → 1 arc
- 2nd group → 2 concentric arcs (radii e.g. R1=34, R2=46)

### Diagonal lines

All diagonals are **solid**, never dashed. Color:
- **Black** `#1a1a1a`, `width:1.5` — when diagonals are auxiliary (not the theorem's subject)
- **Blue** `#2D5FA6`, `width:2` — when diagonals are the "given equal" elements (e.g., rectangle, isosceles trapezoid)

Never put tick marks on diagonals. Use blue color to signal equality between diagonals.

### Tick marks on diagonal (non-horizontal) legs

`GeoRenderer.ticks()` draws perpendicular to the segment — on a diagonal leg this looks tilted. When tick marks need to be **parallel to the bases** (e.g., midpoint marks on trapezoid legs), draw raw horizontal `<line>` elements instead:

```js
function hTick(p1, p2) {
  const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2;
  return `<line x1="${(mx-14).toFixed(1)}" y1="${my.toFixed(1)}" x2="${(mx+14).toFixed(1)}" y2="${my.toFixed(1)}" stroke="${blue}" stroke-width="3.5" stroke-linecap="round"/>`;
}
```

Use `hTick` whenever equal-halves marks appear on diagonal trapezoid legs (q28, q29).

### Trapezoid angle labels → `inwardLabel`

When a theorem labels angles with Greek letters (e.g., α, β, 180−α), place labels by pushing from vertex toward centroid:

```js
const cx=(TL.x+TR.x+BR.x+BL.x)/4, cy=(TL.y+TR.y+BR.y+BL.y)/4;
function inwardLabel(V, text, offset=38, size=22, nudgeY=0) {
  const dx=cx-V.x, dy=cy-V.y, len=Math.hypot(dx,dy);
  const x=(V.x+(dx/len)*offset).toFixed(1), y=(V.y+(dy/len)*offset+nudgeY).toFixed(1);
  return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle"
    font-family="Assistant,Arial,sans-serif" font-weight="bold" font-size="${size}"
    fill="${red}" direction="ltr">${text}</text>`;
}
```

**Critical**: always add `direction="ltr"` to SVG text with math expressions like "180 - α". Without it, RTL page direction reverses the string to "α - 180".

Fine-tuning per vertex in trapezoid:
- Bottom vertices (BL, BR): `offset=38, size=24` — no nudge
- Top vertices (TL, TR): `offset=36, size=20, nudgeY=-3` to `-10` — smaller because the top base is shorter

### Inline fraction near a segment

For theorems where the formula belongs visually on a segment (not below the diagram), embed it as raw SVG text+line directly in the SVG:

```js
const fx = 205; // x center of fraction
const font = `font-family="Assistant,Arial,sans-serif" font-weight="bold" font-size="20" fill="${blue}"`;
parts.push(`<text x="${fx}" y="134" text-anchor="middle" ${font}>a+b</text>`);
parts.push(`<line x1="${fx-22}" y1="141" x2="${fx+22}" y2="141" stroke="${blue}" stroke-width="1.8"/>`);
parts.push(`<text x="${fx}" y="161" text-anchor="middle" ${font}>2</text>`);
```

Key measurements: numerator baseline → bar `+7px` → denominator `+27px`. Font-size 20 for compact inline fractions (vs. 34 for standalone formula below diagram).

---

## RTL / Hebrew

- `html` has `dir="rtl"` and `lang="he"` — do not override per-element
- Fonts: `Assistant` (UI), `Frank Ruhl Libre` (headings/theorem text)
- Hover transforms use `translateX(-2px)` (RTL direction)
- All text search and URL encoding must handle Hebrew Unicode correctly
