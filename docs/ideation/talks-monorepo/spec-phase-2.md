# Implementation Spec: Talks Monorepo - Phase 2: Theme & Brand Design

**Contract**: ./contract.md
**Estimated Effort**: M

## Technical Approach

Phase 2 designs a personal presentation brand identity and implements it as a custom Slidev theme package (`slidev-theme-birdcar`). The theme provides base layouts, typography, colors, and a per-talk variant system so each presentation has a consistent foundation with customizable accents.

Slidev themes are standard npm packages that can provide layouts, components, styles, and configuration. Our theme will live in `packages/theme/` as a workspace package. It uses UnoCSS (Slidev's default) for utility classes and CSS custom properties for the variant system. The theme will include multiple layouts (cover, section, two-column, code-focus, image-full, end) and define the brand's typography, color palette, and spatial system.

The brand design should be distinctive and memorable — not a generic corporate template. Think about what makes a presentation feel "authored" rather than "generated." The frontend-design skill's philosophy applies here: bold aesthetic direction, intentional typography choices, and cohesive color/spatial composition.

## Feedback Strategy

**Inner-loop command**: `cd talks/example && bunx slidev --port 3030`

**Playground**: Dev server — the example talk from Phase 1 serves as a visual testbed for theme changes. Every layout, color, and typography change is immediately visible.

**Why this approach**: Theme development is inherently visual. The dev server with hot reload provides the fastest feedback for CSS and layout iteration.

## File Changes

### New Files

| File Path | Purpose |
|-----------|---------|
| `packages/theme/styles/base.css` | Core brand CSS: custom properties, reset, typography |
| `packages/theme/styles/code.css` | Code block and syntax highlighting theme |
| `packages/theme/styles/layouts.css` | Layout-specific styles |
| `packages/theme/styles/variants.css` | Per-talk variant system (accent colors, backgrounds) |
| `packages/theme/layouts/cover.vue` | Cover/title slide layout |
| `packages/theme/layouts/default.vue` | Standard content slide layout |
| `packages/theme/layouts/section.vue` | Section divider layout |
| `packages/theme/layouts/two-col.vue` | Two-column layout |
| `packages/theme/layouts/code-focus.vue` | Code-focused layout (large code block + annotation) |
| `packages/theme/layouts/image-full.vue` | Full-bleed background image layout |
| `packages/theme/layouts/end.vue` | Closing/thank-you slide layout |
| `packages/theme/layouts/quote.vue` | Quote/testimonial layout |
| `packages/theme/setup/shiki.ts` | Shiki code highlighting theme config |
| `packages/theme/setup/unocss.ts` | UnoCSS theme extension with brand tokens |

### Modified Files

| File Path | Changes |
|-----------|---------|
| `packages/theme/package.json` | Add proper slidev theme config, deps |
| `packages/theme/styles/index.ts` | Import all style modules |
| `talks/example/slides.md` | Update to use all new layouts for visual testing |
| `site/index.html` | Apply brand styling to the talks index page |

## Implementation Details

### Brand Identity Design

**Overview**: Define the visual identity before writing any CSS. This is a design decision, not a code decision.

The brand should establish:
- **Typography**: A distinctive display font paired with a refined body/code font. Avoid generic choices (Inter, Roboto, system fonts). Consider fonts that signal "technical but approachable" — the talks cover support engineering, product, and technical topics.
- **Color palette**: A primary palette (2-3 core colors) with semantic variants. Define as CSS custom properties. Should work on both projected screens and laptop displays.
- **Spatial system**: Consistent spacing scale, slide padding, content max-width.
- **Visual signature**: One distinctive element that makes slides recognizable — could be a geometric motif, a specific gradient treatment, an accent line pattern, or a text styling choice.

**Key decisions**:
- Brand colors defined as HSL custom properties for easy variant derivation
- Typography loaded via Google Fonts or self-hosted WOFF2 in the theme package
- Spatial system based on an 8px grid

**Implementation steps**:
1. Select display font and body font pairing
2. Define color palette with HSL custom properties
3. Define spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
4. Design the visual signature element
5. Document the brand system in a comment block in base.css

### Base Styles

**Overview**: Core CSS that applies to all slides regardless of layout.

```css
/* packages/theme/styles/base.css */
:root {
  /* Brand colors — HSL for easy variant derivation */
  --brand-primary-h: /* hue */;
  --brand-primary-s: /* saturation */;
  --brand-primary-l: /* lightness */;
  --brand-primary: hsl(var(--brand-primary-h), var(--brand-primary-s), var(--brand-primary-l));

  --brand-accent-h: /* hue */;
  --brand-accent-s: /* saturation */;
  --brand-accent-l: /* lightness */;
  --brand-accent: hsl(var(--brand-accent-h), var(--brand-accent-s), var(--brand-accent-l));

  /* Surfaces */
  --slide-bg: /* background */;
  --text-primary: /* main text */;
  --text-secondary: /* muted text */;
  --text-accent: /* accent text */;

  /* Typography */
  --font-display: /* display font */;
  --font-body: /* body font */;
  --font-mono: /* monospace font */;

  /* Spacing */
  --slide-padding: 48px;
  --content-gap: 24px;
}
```

**Implementation steps**:
1. Create base.css with custom properties
2. Add typography rules (headings, body, lists, links)
3. Add slide container styles (padding, overflow, bg)
4. Import fonts (self-hosted or Google Fonts)
5. Test in dev server with example talk

**Feedback loop**:
- **Playground**: Dev server showing example talk
- **Experiment**: Toggle between slides, verify typography renders at projected resolution (1920x1080), check code blocks, check dark slides vs light slides
- **Check command**: `cd talks/example && bunx slidev --port 3030`

### Per-Talk Variant System

**Overview**: A CSS custom property override system that lets each talk customize accent colors and backgrounds without forking the theme.

Each talk can define variant overrides in its frontmatter:

```yaml
---
theme: slidev-theme-birdcar
variant:
  accent: '#E85D04'
  accentLight: '#FAA307'
  background: '#0D1117'
---
```

The theme reads these via Slidev's headmatter and applies them as CSS overrides.

```css
/* packages/theme/styles/variants.css */
/* Variant overrides applied via slidev's headmatter */
.slidev-page {
  --brand-accent: var(--variant-accent, var(--brand-accent));
  --slide-bg: var(--variant-background, var(--slide-bg));
}
```

**Key decisions**:
- Variants override specific custom properties, not entire stylesheets
- A talk without variant config gets the default brand colors
- Variants are defined in frontmatter, not in separate CSS files

**Implementation steps**:
1. Create variants.css with override cascade
2. Add Slidev setup script to read variant frontmatter and inject CSS vars
3. Test with example talk using custom variant colors
4. Test default (no variant) still looks correct

**Feedback loop**:
- **Playground**: Dev server with two talks — one with variant, one without
- **Experiment**: Change variant colors in frontmatter, verify hot-reload updates, verify default still works
- **Check command**: `cd talks/example && bunx slidev --port 3030`

### Slide Layouts

**Overview**: Vue SFC layouts that provide the structural templates for different slide types.

Each layout is a Vue single-file component in `packages/theme/layouts/`. They use named slots and CSS custom properties from the brand system.

```vue
<!-- packages/theme/layouts/cover.vue (example structure) -->
<template>
  <div class="cover-layout">
    <div class="cover-content">
      <slot />
    </div>
    <div class="cover-meta" v-if="$attrs.author || $attrs.date">
      <span v-if="$attrs.author">{{ $attrs.author }}</span>
      <span v-if="$attrs.date">{{ $attrs.date }}</span>
    </div>
  </div>
</template>

<style scoped>
.cover-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: var(--slide-padding);
  height: 100%;
  background: var(--slide-bg);
}
/* ... */
</style>
```

**Layouts to implement**:
1. `cover` — Title slide with title, subtitle, author, date
2. `default` — Standard content with header and body
3. `section` — Bold section divider with large text
4. `two-col` — Two equal columns with header
5. `code-focus` — Large code block with optional annotation sidebar
6. `image-full` — Full-bleed background image with overlaid text
7. `end` — Closing slide with contact/links
8. `quote` — Centered quote with attribution

**Implementation steps**:
1. Create each layout Vue SFC
2. Apply brand styles via CSS custom properties
3. Update example talk slides to use each layout
4. Verify each layout in dev server at 1920x1080

**Feedback loop**:
- **Playground**: Dev server at 1920x1080 viewport
- **Experiment**: View each layout slide, test with varying content lengths (short title, long title, multiple paragraphs), test with and without optional props
- **Check command**: `cd talks/example && bunx slidev --port 3030`

### Code Highlighting Theme

**Overview**: Custom Shiki theme for code blocks that matches the brand palette.

```typescript
// packages/theme/setup/shiki.ts
import { defineShikiSetup } from '@slidev/types'

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: 'one-dark-pro',  // Or custom theme matching brand
      light: 'github-light',
    },
  }
})
```

**Implementation steps**:
1. Choose dark and light Shiki themes that complement the brand palette
2. Create setup/shiki.ts with theme configuration
3. Optionally create custom theme JSON if stock themes don't match
4. Test with TypeScript, Python, bash, and JSON code blocks

### Talks Index Page Styling

**Overview**: Apply the brand theme to the root index page (site/index.html) so it matches the presentation identity.

**Implementation steps**:
1. Update site/index.html with brand fonts, colors, and layout
2. Style the talk list cards with hover effects and brand accents
3. Ensure responsive layout for mobile viewing
4. Add a subtle visual signature element consistent with slides

## Testing Requirements

### Manual Testing

- [ ] Cover layout renders with title, subtitle, author, date
- [ ] Default layout handles short and long content gracefully
- [ ] Section layout renders bold text at readable size
- [ ] Two-column layout distributes content evenly
- [ ] Code-focus layout renders large code blocks with line numbers
- [ ] Image-full layout renders background image with readable overlaid text
- [ ] End layout shows contact/links in branded style
- [ ] Quote layout centers text with attribution
- [ ] Brand colors render well on projected screens (test at 1920x1080)
- [ ] Typography is readable from back of room (test at 50% zoom)
- [ ] Per-talk variant colors override correctly
- [ ] Default brand applies when no variant is specified
- [ ] Code highlighting theme is readable in both dark and light contexts
- [ ] Talks index page matches brand identity
- [ ] PDF export preserves brand styling and layout fidelity

## Validation Commands

```bash
# Start dev server for visual testing
cd talks/example && bunx slidev --port 3030

# Build to verify no CSS errors
bun run build example

# Export PDF to verify brand fidelity
bun run export example

# Build full site to verify index page styling
bun run build:site
```

---

_This spec is ready for implementation. Follow the patterns and validate at each step._
