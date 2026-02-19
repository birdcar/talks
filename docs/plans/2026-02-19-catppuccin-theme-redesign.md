# Catppuccin Theme Redesign

## Summary

Redesign slidev-theme-birdcar and slidev-addon-birdcar to use Catppuccin color palettes, expressive typography (Clash Display + Satoshi), geometric accent decorations, Rough Notation integration, and polished animation defaults. The result: text-heavy presentations that are visually dynamic through colorful typography, hand-drawn annotations, and subtle geometric shapes rather than images.

## Color Token System

### Base: Catppuccin Mocha

All 26 Mocha palette colors as `--ctp-*` CSS custom properties on `:root`. Default accent: **sapphire** (`#74c7ec`).

### Semantic Layer

```
--slide-bg:        var(--ctp-base)        /* #1e1e2e */
--slide-bg-alt:    var(--ctp-mantle)      /* #181825 */
--slide-bg-raised: var(--ctp-surface-0)   /* #313244 */
--text-primary:    var(--ctp-text)        /* #cdd6f4 */
--text-secondary:  var(--ctp-subtext-0)   /* #a6adc8 */
--text-muted:      var(--ctp-overlay-1)   /* #7f849c */
--accent:          var(--ctp-sapphire)    /* #74c7ec */
--accent-alt:      var(--ctp-peach)       /* #fab387 */
--border:          var(--ctp-surface-1)   /* #45475a */
```

### Per-Talk Variants

Frontmatter: `variant: { flavor: 'frappe', accent: 'mauve' }`

`global-bottom.vue` reads flavor name, injects that flavor's full `--ctp-*` palette. Accent name remaps `--accent` to the chosen color. All four flavors supported: mocha (default), macchiato, frappe, latte.

### Catppuccin Palette Reference (Mocha)

| Name | Hex | Role |
|------|-----|------|
| rosewater | #f5e0dc | accent |
| flamingo | #f2cdcd | accent |
| pink | #f5c2e7 | accent |
| mauve | #cba6f7 | accent |
| red | #f38ba8 | accent |
| maroon | #eba0ac | accent |
| peach | #fab387 | accent |
| yellow | #f9e2af | accent |
| green | #a6e3a1 | accent |
| teal | #94e2d5 | accent |
| sky | #89dceb | accent |
| sapphire | #74c7ec | accent (default) |
| blue | #89b4fa | accent |
| lavender | #b4befe | accent |
| text | #cdd6f4 | text |
| subtext1 | #bac2de | text |
| subtext0 | #a6adc8 | text |
| overlay2 | #9399b2 | overlay |
| overlay1 | #7f849c | overlay |
| overlay0 | #6c7086 | overlay |
| surface2 | #585b70 | surface |
| surface1 | #45475a | surface |
| surface0 | #313244 | surface |
| base | #1e1e2e | background |
| mantle | #181825 | background |
| crust | #11111b | background |

## Typography

### Font Stack

| Role | Font | Source |
|------|------|--------|
| Display | Clash Display | Fontshare, bundled locally |
| Body | Satoshi | Fontshare, bundled locally |
| Mono | JetBrains Mono | Bundled locally |

Fonts stored in `packages/theme/fonts/` and loaded via `@font-face` in CSS.

### Type Scale

- H1 (cover/section): 4rem, weight 600, -0.03em tracking, 1.05 line-height
- H1 (content): 2.8rem, weight 600, -0.02em tracking
- H2: 2rem, weight 500, -0.01em tracking
- H3: 1.4rem, weight 500
- Body: 1.1rem Satoshi, weight 400, 1.65 line-height
- Code: 0.85rem JetBrains Mono, 1.7 line-height
- Meta/labels: 0.85rem JetBrains Mono, weight 400, uppercase, 0.08em tracking, `--text-muted`

### Typographic Color Highlights

`<Highlight color="peach">word</Highlight>` component colors inline text with any Catppuccin accent name. Primary mechanism for visual dynamism in text-heavy slides.

## Geometric Decoration System

### Shape Vocabulary

- Circles: unfilled rings and filled dots, 20-50% opacity, accent colors, 8px-120px
- Corner brackets: L-shaped crop marks, thin strokes in `--ctp-overlay-0`
- Diagonal accent lines: 30-45 degrees, `--accent` at 15-25% opacity
- Dot grids: small repeating dot patterns as subtle texture

### Per-Layout Behavior

| Layout | Elements |
|--------|----------|
| cover | Corner brackets TL+BR, large ring BR, dot grid TR quadrant |
| section | Vertical accent bar (existing), floating circle cluster left |
| default | Small corner bracket TR only |
| quote | Large unfilled ring behind quote, centered, 10% opacity |
| end | Mirrors cover geometry |
| code-focus | None |
| two-col | Thin vertical divider with diamond at midpoint |

### Implementation

`GeometricAccents.vue` component rendered in `global-top.vue`. Reads current slide layout from `$slidev.nav`, renders SVG with `pointer-events: none`. Shapes fade in with 0.6s delay after slide transition. Can be disabled per-slide via `geometry: false` frontmatter.

## Rough Notation Integration

### RoughMark Component

```html
<RoughMark type="circle" color="red">important</RoughMark>
<RoughMark type="underline" color="peach" :at="3">click 3</RoughMark>
<RoughMark type="highlight" color="yellow">highlighted</RoughMark>
```

Props:
- `type`: underline, circle, highlight, strike-through, crossed-off, bracket, box
- `color`: Catppuccin accent name (resolves to current flavor hex)
- `at`: click number (auto-advances if omitted)

Wraps Slidev's built-in `v-mark` directive. The component resolves Catppuccin color names to hex values and passes them through.

## Animation & Motion

### Slide Transitions

Default: `fade` globally in theme `package.json`. Per-slide override available.

### v-click Defaults

```css
.slidev-vclick-target {
  transition: opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease;
}
.slidev-vclick-hidden {
  opacity: 0;
  transform: translateY(8px);
  filter: blur(2px);
}
```

### AnimatedList Upgrades

- Fix stagger prop: apply `transition-delay` based on item index
- New `animation: 'scale-in'` option: `scale(0.95)` + opacity 0

### Geometric Entrance

Shapes fade in with 0.6s delay, rings scale from 0.8 to 1.0.

## Component Updates

All components swap hardcoded HSL values for Catppuccin semantic tokens:

| Component | Key Changes |
|-----------|-------------|
| Callout | Type colors: info→blue, warning→yellow, tip→green, danger→red. BG at 8% opacity |
| CodePlayground | BG→crust, chrome→mantle, highlights→accent at 15% |
| CodeWalkthrough | Same as CodePlayground, step notes panel on surface-0 |
| TerminalDemo | macOS dots→ctp-red/yellow/green, BG→crust, prompt→accent |
| KeyPoints | Markers→accent, BG→surface-0, border→surface-1 |
| QuoteBlock | Border-left→accent, attribution in mono/uppercase/muted |
| SpeakerCard | Avatar circle→accent, card→surface-0, border→surface-1 |
| SectionHeader | Accent line→accent, icon→accent |
| TwoColumn | Token swap only |
| AnimatedList | Token swap + stagger fix + scale-in animation |

## New Components

- **Highlight.vue**: Inline text coloring with Catppuccin accent names
- **RoughMark.vue**: Rough Notation wrapper with Catppuccin color resolution
- **GeometricAccents.vue**: SVG decoration layer for global-top.vue

## Files Modified

### packages/theme/
- `styles/base.css` — full rewrite: Catppuccin tokens, new typography, new defaults
- `styles/code.css` — token swap
- `styles/layouts.css` — token swap + geometric integration points
- `styles/variants.css` — rewrite: flavor-based variant system
- `styles/fonts.css` — new: @font-face declarations for local fonts
- `styles/index.ts` — add fonts.css import
- `fonts/` — new directory: Clash Display, Satoshi, JetBrains Mono font files
- `global-bottom.vue` — rewrite: flavor-aware variant injection with full palette swap
- `global-top.vue` — new: renders GeometricAccents
- `package.json` — update default fonts, add transition default
- `layouts/*.vue` — token swaps in scoped styles
- `setup/shiki.ts` — consider Catppuccin-compatible Shiki theme

### packages/components/
- All existing `.vue` files — token swaps
- `components/Highlight.vue` — new
- `components/RoughMark.vue` — new
- `components/GeometricAccents.vue` — new
