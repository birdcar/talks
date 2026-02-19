# Catppuccin Theme Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign slidev-theme-birdcar and slidev-addon-birdcar with Catppuccin Mocha colors, Clash Display + Satoshi typography, geometric SVG accents, Rough Notation integration, and polished v-click animations.

**Architecture:** All 26 Catppuccin colors defined as CSS custom properties, with a semantic layer mapping them to theme roles. A TypeScript palette data file powers runtime flavor-switching via `global-bottom.vue`. Geometric decorations render as an SVG overlay via `global-top.vue`. Fonts are self-hosted in the theme package.

**Tech Stack:** Vue 3 SFCs, CSS custom properties, Slidev v0.50+, TypeScript, `v-mark` (built-in Rough Notation), `@vueuse/motion`

---

### Task 1: Download and Bundle Fonts

**Files:**
- Create: `packages/theme/fonts/` directory
- Create: `packages/theme/styles/fonts.css`
- Modify: `packages/theme/styles/index.ts:1-4`

**Step 1: Download Clash Display from Fontshare**

Download woff2 files for weights 500, 600, 700:

```bash
mkdir -p packages/theme/fonts
# Clash Display — download from Fontshare
# Visit https://www.fontshare.com/fonts/clash-display and download the font family
# Extract woff2 files for weights 500, 600, 700 into packages/theme/fonts/
# Expected files:
#   ClashDisplay-Medium.woff2    (500)
#   ClashDisplay-Semibold.woff2  (600)
#   ClashDisplay-Bold.woff2      (700)
```

Alternatively, use the Fontshare API CDN to grab them:

```bash
cd packages/theme/fonts
curl -L "https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap" -o /dev/null -D - 2>/dev/null
# Parse the CSS response for woff2 URLs and download each file
```

If Fontshare direct download is difficult, use the npm package `@fontsource/` or manually download from the website. The critical requirement is woff2 files in `packages/theme/fonts/`.

**Step 2: Download Satoshi from Fontshare**

```bash
# Visit https://www.fontshare.com/fonts/satoshi and download
# Extract woff2 files for weights 400, 500, 700 (regular + italic for 400):
#   Satoshi-Regular.woff2    (400)
#   Satoshi-Italic.woff2     (400 italic)
#   Satoshi-Medium.woff2     (500)
#   Satoshi-Bold.woff2       (700)
```

**Step 3: Download JetBrains Mono**

```bash
# From https://github.com/JetBrains/JetBrainsMono/releases
# Or from Google Fonts CDN — download woff2 for weights 400, 700:
#   JetBrainsMono-Regular.woff2  (400)
#   JetBrainsMono-Bold.woff2     (700)
```

**Step 4: Create `packages/theme/styles/fonts.css`**

```css
/* Local font declarations — Clash Display, Satoshi, JetBrains Mono */

@font-face {
  font-family: 'Clash Display';
  src: url('../fonts/ClashDisplay-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Clash Display';
  src: url('../fonts/ClashDisplay-Semibold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Clash Display';
  src: url('../fonts/ClashDisplay-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Satoshi';
  src: url('../fonts/Satoshi-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Satoshi';
  src: url('../fonts/Satoshi-Italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Satoshi';
  src: url('../fonts/Satoshi-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Satoshi';
  src: url('../fonts/Satoshi-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('../fonts/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('../fonts/JetBrainsMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**Step 5: Update `packages/theme/styles/index.ts`**

Replace entire contents:

```typescript
import './fonts.css'
import './base.css'
import './code.css'
import './layouts.css'
import './variants.css'
```

**Step 6: Update `packages/theme/package.json`**

Replace entire contents:

```json
{
  "name": "slidev-theme-birdcar",
  "version": "0.2.0",
  "private": true,
  "keywords": ["slidev-theme", "slidev"],
  "engines": {
    "slidev": ">=0.50.0"
  },
  "slidev": {
    "colorSchema": "dark",
    "defaults": {
      "fonts": {
        "sans": "Satoshi",
        "mono": "JetBrains Mono"
      },
      "highlighter": "shiki",
      "transition": "fade"
    }
  }
}
```

**Step 7: Verify fonts load**

Run: `bun run dev example`
Expected: Slides render (may have broken colors until Task 2). Check browser DevTools → Network tab to confirm woff2 files load. Check Elements panel to confirm `font-family` is applied.

**Step 8: Commit**

```
feat(theme): Bundle local fonts (Clash Display, Satoshi, JetBrains Mono)
```

---

### Task 2: Catppuccin Color Token System

**Files:**
- Create: `packages/theme/palettes.ts`
- Modify: `packages/theme/styles/base.css` (full rewrite)

**Step 1: Create `packages/theme/palettes.ts`**

This file contains all four Catppuccin flavors as a TypeScript data structure. Used by `global-bottom.vue` for runtime flavor switching.

```typescript
export interface CatppuccinPalette {
  rosewater: string
  flamingo: string
  pink: string
  mauve: string
  red: string
  maroon: string
  peach: string
  yellow: string
  green: string
  teal: string
  sky: string
  sapphire: string
  blue: string
  lavender: string
  text: string
  subtext1: string
  subtext0: string
  overlay2: string
  overlay1: string
  overlay0: string
  surface2: string
  surface1: string
  surface0: string
  base: string
  mantle: string
  crust: string
}

export type FlavorName = 'mocha' | 'macchiato' | 'frappe' | 'latte'
export type AccentName = 'rosewater' | 'flamingo' | 'pink' | 'mauve' | 'red' | 'maroon' | 'peach' | 'yellow' | 'green' | 'teal' | 'sky' | 'sapphire' | 'blue' | 'lavender'

export const palettes: Record<FlavorName, CatppuccinPalette> = {
  mocha: {
    rosewater: '#f5e0dc',
    flamingo: '#f2cdcd',
    pink: '#f5c2e7',
    mauve: '#cba6f7',
    red: '#f38ba8',
    maroon: '#eba0ac',
    peach: '#fab387',
    yellow: '#f9e2af',
    green: '#a6e3a1',
    teal: '#94e2d5',
    sky: '#89dceb',
    sapphire: '#74c7ec',
    blue: '#89b4fa',
    lavender: '#b4befe',
    text: '#cdd6f4',
    subtext1: '#bac2de',
    subtext0: '#a6adc8',
    overlay2: '#9399b2',
    overlay1: '#7f849c',
    overlay0: '#6c7086',
    surface2: '#585b70',
    surface1: '#45475a',
    surface0: '#313244',
    base: '#1e1e2e',
    mantle: '#181825',
    crust: '#11111b',
  },
  macchiato: {
    rosewater: '#f4dbd6',
    flamingo: '#f0c6c6',
    pink: '#f5bde6',
    mauve: '#c6a0f6',
    red: '#ed8796',
    maroon: '#ee99a0',
    peach: '#f5a97f',
    yellow: '#eed49f',
    green: '#a6da95',
    teal: '#8bd5ca',
    sky: '#91d7e3',
    sapphire: '#7dc4e4',
    blue: '#8aadf4',
    lavender: '#b7bdf8',
    text: '#cad3f5',
    subtext1: '#b8c0e0',
    subtext0: '#a5adcb',
    overlay2: '#939ab7',
    overlay1: '#8087a2',
    overlay0: '#6e738d',
    surface2: '#5b6078',
    surface1: '#494d64',
    surface0: '#363a4f',
    base: '#24273a',
    mantle: '#1e2030',
    crust: '#181926',
  },
  frappe: {
    rosewater: '#f2d5cf',
    flamingo: '#eebebe',
    pink: '#f4b8e4',
    mauve: '#ca9ee6',
    red: '#e78284',
    maroon: '#ea999c',
    peach: '#ef9f76',
    yellow: '#e5c890',
    green: '#a6d189',
    teal: '#81c8be',
    sky: '#99d1db',
    sapphire: '#85c1dc',
    blue: '#8caaee',
    lavender: '#babbf1',
    text: '#c6d0f5',
    subtext1: '#b5bfe2',
    subtext0: '#a5adce',
    overlay2: '#949cbb',
    overlay1: '#838ba7',
    overlay0: '#737994',
    surface2: '#626880',
    surface1: '#51576d',
    surface0: '#414559',
    base: '#303446',
    mantle: '#292c3c',
    crust: '#232634',
  },
  latte: {
    rosewater: '#dc8a78',
    flamingo: '#dd7878',
    pink: '#ea76cb',
    mauve: '#8839ef',
    red: '#d20f39',
    maroon: '#e64553',
    peach: '#fe640b',
    yellow: '#df8e1d',
    green: '#40a02b',
    teal: '#179299',
    sky: '#04a5e5',
    sapphire: '#209fb5',
    blue: '#1e66f5',
    lavender: '#7287fd',
    text: '#4c4f69',
    subtext1: '#5c5f77',
    subtext0: '#6c6f85',
    overlay2: '#7c7f93',
    overlay1: '#8c8fa1',
    overlay0: '#9ca0b0',
    surface2: '#acb0be',
    surface1: '#bcc0cc',
    surface0: '#ccd0da',
    base: '#eff1f5',
    mantle: '#e6e9ef',
    crust: '#dce0e8',
  },
}

/** All color names in a Catppuccin palette */
export const colorNames = Object.keys(palettes.mocha) as (keyof CatppuccinPalette)[]

/** Accent color names (the 14 non-surface/text colors) */
export const accentNames: AccentName[] = [
  'rosewater', 'flamingo', 'pink', 'mauve', 'red', 'maroon',
  'peach', 'yellow', 'green', 'teal', 'sky', 'sapphire', 'blue', 'lavender',
]
```

**Step 2: Rewrite `packages/theme/styles/base.css`**

Replace entire contents:

```css
/*
 * slidev-theme-birdcar — Catppuccin Mocha base
 *
 * Typography: Clash Display (display) / Satoshi (body) / JetBrains Mono (code)
 * Palette: Catppuccin Mocha, default accent: sapphire
 * Grid: 8px base
 */

:root {
  /* ── Catppuccin Mocha palette ── */
  --ctp-rosewater: #f5e0dc;
  --ctp-flamingo: #f2cdcd;
  --ctp-pink: #f5c2e7;
  --ctp-mauve: #cba6f7;
  --ctp-red: #f38ba8;
  --ctp-maroon: #eba0ac;
  --ctp-peach: #fab387;
  --ctp-yellow: #f9e2af;
  --ctp-green: #a6e3a1;
  --ctp-teal: #94e2d5;
  --ctp-sky: #89dceb;
  --ctp-sapphire: #74c7ec;
  --ctp-blue: #89b4fa;
  --ctp-lavender: #b4befe;
  --ctp-text: #cdd6f4;
  --ctp-subtext1: #bac2de;
  --ctp-subtext0: #a6adc8;
  --ctp-overlay2: #9399b2;
  --ctp-overlay1: #7f849c;
  --ctp-overlay0: #6c7086;
  --ctp-surface2: #585b70;
  --ctp-surface1: #45475a;
  --ctp-surface0: #313244;
  --ctp-base: #1e1e2e;
  --ctp-mantle: #181825;
  --ctp-crust: #11111b;

  /* ── Semantic tokens ── */
  --slide-bg: var(--ctp-base);
  --slide-bg-alt: var(--ctp-mantle);
  --slide-bg-raised: var(--ctp-surface0);
  --text-primary: var(--ctp-text);
  --text-secondary: var(--ctp-subtext0);
  --text-muted: var(--ctp-overlay1);
  --accent: var(--ctp-sapphire);
  --accent-alt: var(--ctp-peach);
  --border: var(--ctp-surface1);

  /* ── Typography ── */
  --font-display: 'Clash Display', system-ui, sans-serif;
  --font-body: 'Satoshi', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* ── Spacing (8px grid) ── */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;

  --slide-padding: var(--space-6);
  --content-gap: var(--space-4);
}

/* ── Base slide ── */
.slidev-layout {
  background: var(--slide-bg);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.65;
  padding: var(--slide-padding);
}

/* ── Typography ── */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.15;
  color: var(--text-primary);
}

h1 {
  font-size: 2.8rem;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  margin-bottom: var(--space-4);
}

h3 {
  font-size: 1.4rem;
  font-weight: 500;
}

/* ── Body text ── */
p {
  margin-bottom: var(--space-3);
  color: var(--text-primary);
}

/* ── Lists ── */
ul, ol {
  margin-bottom: var(--space-3);
  padding-left: var(--space-4);
}

li {
  margin-bottom: var(--space-2);
}

li::marker {
  color: var(--accent);
}

/* ── Links ── */
a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

a:hover {
  border-bottom-color: var(--accent);
}

/* ── Strong / emphasis ── */
strong {
  font-weight: 600;
  color: var(--text-primary);
}

em {
  color: var(--text-secondary);
}

/* ── Accent line — visual signature ── */
.accent-line {
  width: 64px;
  height: 3px;
  background: var(--accent);
  border-radius: 2px;
}

/* ── v-click animation defaults ── */
.slidev-vclick-target {
  transition: opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease;
}

.slidev-vclick-hidden {
  opacity: 0;
  transform: translateY(8px);
  filter: blur(2px);
}
```

**Step 3: Verify base renders**

Run: `bun run dev example`
Expected: Slides render with Catppuccin Mocha dark background (#1e1e2e), sapphire accents, Clash Display headings, Satoshi body text. Some components may still show old HSL fallbacks — that's expected.

**Step 4: Commit**

```
feat(theme): Add Catppuccin Mocha color tokens and new typography
```

---

### Task 3: Variant System and Flavor Switching

**Files:**
- Modify: `packages/theme/styles/variants.css` (full rewrite)
- Modify: `packages/theme/global-bottom.vue` (full rewrite)

**Step 1: Rewrite `packages/theme/styles/variants.css`**

Replace entire contents:

```css
/*
 * Per-talk variant system — Catppuccin flavor + accent switching.
 *
 * Frontmatter: variant: { flavor: 'frappe', accent: 'mauve' }
 * global-bottom.vue injects --ctp-* overrides for the chosen flavor,
 * and remaps --accent to the chosen accent color.
 *
 * No CSS overrides needed here — the semantic tokens in base.css
 * already reference --ctp-* vars, so injecting new --ctp-* values
 * on :root cascades through automatically.
 *
 * This file is kept as a placeholder for any future variant-specific
 * style rules (e.g., latte-specific adjustments for light mode).
 */

/* Latte flavor needs inverted code block treatment */
:root[data-ctp-flavor="latte"] .slidev-layout {
  color-scheme: light;
}
```

**Step 2: Rewrite `packages/theme/global-bottom.vue`**

Replace entire contents:

```vue
<script setup lang="ts">
import { watchEffect, getCurrentInstance } from 'vue'
import { palettes, colorNames, type FlavorName, type AccentName } from '../palettes'

const instance = getCurrentInstance()
const slidev = instance?.appContext.config.globalProperties.$slidev

watchEffect(() => {
  const variant = slidev?.configs?.variant as
    | { flavor?: FlavorName; accent?: AccentName }
    | undefined
  if (!variant) return

  const root = document.documentElement

  // Apply flavor palette
  if (variant.flavor && variant.flavor in palettes) {
    const palette = palettes[variant.flavor]
    root.setAttribute('data-ctp-flavor', variant.flavor)
    for (const name of colorNames) {
      root.style.setProperty(`--ctp-${name}`, palette[name])
    }
  }

  // Remap accent
  if (variant.accent) {
    const flavor = variant.flavor || 'mocha'
    const palette = palettes[flavor]
    const accentKey = variant.accent as keyof typeof palette
    if (accentKey in palette) {
      root.style.setProperty('--accent', palette[accentKey])
    }
  }
})
</script>

<template>
  <div />
</template>
```

**Step 3: Test variant switching**

Temporarily edit `talks/example/slides.md` frontmatter to add:

```yaml
variant:
  flavor: frappe
  accent: mauve
```

Run: `bun run dev example`
Expected: Slides show Frappé colors (#303446 background) with mauve (#ca9ee6) accents.

Revert the test frontmatter change after verifying.

**Step 4: Commit**

```
feat(theme): Add Catppuccin flavor-based variant system
```

---

### Task 4: Code Styling Updates

**Files:**
- Modify: `packages/theme/styles/code.css` (full rewrite)
- Modify: `packages/theme/setup/shiki.ts`

**Step 1: Rewrite `packages/theme/styles/code.css`**

Replace entire contents:

```css
/* Code blocks and inline code — Catppuccin tokens */

code {
  font-family: var(--font-mono);
  font-size: 0.9em;
}

/* Inline code */
:not(pre) > code {
  background: var(--slide-bg-raised);
  color: var(--accent);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85em;
}

/* Code block containers */
.slidev-code-wrapper {
  border-radius: 8px;
  overflow: hidden;
}

pre.slidev-code {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.7;
  padding: var(--space-4);
  border-radius: 8px;
  background: var(--ctp-crust) !important;
}

/* Line numbers */
.slidev-code .line-numbers {
  color: var(--text-muted);
  opacity: 0.5;
}

/* Line highlighting */
.slidev-code .line.highlighted {
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  border-left: 3px solid var(--accent);
  margin-left: -3px;
}
```

**Step 2: Update Shiki theme to Catppuccin**

Replace `packages/theme/setup/shiki.ts` contents:

```typescript
import { defineShikiSetup } from '@slidev/types'

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: 'catppuccin-mocha',
      light: 'catppuccin-latte',
    },
  }
})
```

Note: Shiki ships with Catppuccin themes built-in since v1.0. If the Slidev version uses an older Shiki, check if `catppuccin-mocha` is available. If not, fall back to `vitesse-dark`.

**Step 3: Verify code blocks**

Run: `bun run dev example`
Expected: Code blocks show Catppuccin Mocha syntax colors on `--ctp-crust` (#11111b) background. Line highlighting uses sapphire accent at 15% opacity.

**Step 4: Commit**

```
feat(theme): Update code styling to Catppuccin tokens
```

---

### Task 5: Layout CSS Updates

**Files:**
- Modify: `packages/theme/styles/layouts.css` (full rewrite)
- Modify: `packages/theme/layouts/cover.vue:15-56` (scoped styles)
- Modify: `packages/theme/layouts/default.vue:7-15` (scoped styles)
- Modify: `packages/theme/layouts/section.vue:9-43` (scoped styles)
- Modify: `packages/theme/layouts/two-col.vue:17-41` (scoped styles)
- Modify: `packages/theme/layouts/code-focus.vue:7-29` (scoped styles)
- Modify: `packages/theme/layouts/image-full.vue:23-48` (scoped styles)
- Modify: `packages/theme/layouts/end.vue:10-41` (scoped styles)
- Modify: `packages/theme/layouts/quote.vue:12-48` (scoped styles)

**Step 1: Rewrite `packages/theme/styles/layouts.css`**

Replace entire contents:

```css
/* Layout-specific styles — supplements scoped styles in layout Vue SFCs */

/* Cover layout accent line */
.cover-layout .accent-line {
  margin: var(--space-4) 0;
}

/* Section layout left accent bar */
.section-layout {
  position: relative;
}

.section-layout::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--accent);
}

/* Quote layout */
.quote-layout blockquote {
  border-left: none;
  padding: 0;
  font-size: 1.8rem;
  font-family: var(--font-display);
  font-weight: 500;
  line-height: 1.4;
  color: var(--text-primary);
}

/* Two-col gap */
.two-col-layout .col {
  padding: var(--space-4);
}

/* Code focus layout */
.code-focus-layout pre.slidev-code {
  font-size: 1rem;
  line-height: 1.8;
}
```

**Step 2: Update cover.vue scoped styles**

In `packages/theme/layouts/cover.vue`, replace the entire `<style scoped>` block (lines 15-56) with:

```css
.cover-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: var(--slide-padding);
  height: 100%;
  background: var(--slide-bg);
}

.cover-content {
  margin-top: var(--space-4);
}

.cover-content :deep(h1) {
  font-size: 4rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin-bottom: var(--space-3);
}

.cover-content :deep(p) {
  font-size: 1.3rem;
  color: var(--text-secondary);
}

.cover-meta {
  position: absolute;
  bottom: var(--space-6);
  left: var(--slide-padding);
  font-size: 0.85rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.meta-sep {
  margin: 0 var(--space-2);
  color: var(--accent);
}
```

**Step 3: Update default.vue scoped styles**

In `packages/theme/layouts/default.vue`, replace `<style scoped>` (lines 7-15):

```css
.default-layout {
  display: flex;
  flex-direction: column;
  padding: var(--slide-padding);
  height: 100%;
  background: var(--slide-bg);
}
```

(Identical content — just confirming tokens are correct. `--slide-bg` now resolves to Catppuccin.)

**Step 4: Update section.vue scoped styles**

In `packages/theme/layouts/section.vue`, replace `<style scoped>` (lines 9-43):

```css
.section-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--slide-padding);
  padding-left: calc(var(--slide-padding) + 20px);
  height: 100%;
  background: var(--slide-bg);
  position: relative;
}

.section-layout::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--accent);
}

.section-content :deep(h1),
.section-content :deep(h2) {
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.section-content :deep(p) {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-top: var(--space-3);
}
```

**Step 5: Update end.vue scoped styles**

In `packages/theme/layouts/end.vue`, replace `<style scoped>` (lines 10-41):

```css
.end-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: var(--slide-padding);
  height: 100%;
  background: var(--slide-bg);
}

.end-content {
  margin-top: var(--space-4);
}

.end-content :deep(h1),
.end-content :deep(h2) {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: var(--space-4);
}

.end-content :deep(p) {
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.end-content :deep(a) {
  color: var(--accent);
}
```

**Step 6: Update quote.vue scoped styles**

In `packages/theme/layouts/quote.vue`, replace `<style scoped>` (lines 12-48):

```css
.quote-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--space-7);
  height: 100%;
  background: var(--slide-bg);
}

.quote-content :deep(p) {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.4;
  color: var(--text-primary);
  font-style: italic;
}

.quote-content :deep(p)::before {
  content: '\201C';
  color: var(--accent);
  font-size: 3rem;
  line-height: 0;
  vertical-align: -0.3em;
  margin-right: 4px;
}

.quote-attribution {
  margin-top: var(--space-4);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

**Step 7: Update code-focus.vue scoped styles**

In `packages/theme/layouts/code-focus.vue`, replace `<style scoped>` (lines 7-29):

```css
.code-focus-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-5) var(--space-6);
  height: 100%;
  background: var(--slide-bg);
}

.code-focus-layout :deep(h2),
.code-focus-layout :deep(h3) {
  font-size: 1.3rem;
  margin-bottom: var(--space-3);
  color: var(--text-secondary);
  font-weight: 500;
}

.code-focus-layout :deep(pre.slidev-code) {
  font-size: 1rem;
  line-height: 1.8;
}
```

**Step 8: Verify all layouts**

Run: `bun run dev example`
Expected: All layouts render with Catppuccin Mocha tokens. Cover h1 is now 4rem. Meta text is mono/uppercase. Section bar is sapphire. Quote decoration is sapphire.

**Step 9: Commit**

```
feat(theme): Update all layouts to Catppuccin semantic tokens
```

---

### Task 6: Update Existing Components (Token Swap)

**Files:**
- Modify: `packages/components/components/Callout.vue:34-108`
- Modify: `packages/components/components/CodePlayground.vue:28-69`
- Modify: `packages/components/components/CodeWalkthrough.vue:78-131`
- Modify: `packages/components/components/TerminalDemo.vue:37-106`
- Modify: `packages/components/components/KeyPoints.vue:22-74`
- Modify: `packages/components/components/QuoteBlock.vue:20-48`
- Modify: `packages/components/components/SpeakerCard.vue:46-120`
- Modify: `packages/components/components/SectionHeader.vue:17-42`
- Modify: `packages/components/components/TwoColumn.vue:20-31`

**Step 1: Rewrite Callout.vue styles**

Replace `<style scoped>` (lines 34-109):

```css
.callout {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: 8px;
  border-left: 3px solid;
  margin: var(--space-3) 0;
}

.callout-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.75rem;
}

.callout-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.callout-content {
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Type variants — Catppuccin colors */
.callout-info {
  background: color-mix(in srgb, var(--ctp-blue) 8%, transparent);
  border-color: var(--ctp-blue);
}
.callout-info .callout-icon {
  background: var(--ctp-blue);
  color: var(--ctp-crust);
}
.callout-info .callout-title { color: var(--ctp-blue); }

.callout-warning {
  background: color-mix(in srgb, var(--ctp-yellow) 8%, transparent);
  border-color: var(--ctp-yellow);
}
.callout-warning .callout-icon {
  background: var(--ctp-yellow);
  color: var(--ctp-crust);
}
.callout-warning .callout-title { color: var(--ctp-yellow); }

.callout-tip {
  background: color-mix(in srgb, var(--ctp-green) 8%, transparent);
  border-color: var(--ctp-green);
}
.callout-tip .callout-icon {
  background: var(--ctp-green);
  color: var(--ctp-crust);
}
.callout-tip .callout-title { color: var(--ctp-green); }

.callout-danger {
  background: color-mix(in srgb, var(--ctp-red) 8%, transparent);
  border-color: var(--ctp-red);
}
.callout-danger .callout-icon {
  background: var(--ctp-red);
  color: var(--ctp-crust);
}
.callout-danger .callout-title { color: var(--ctp-red); }
```

**Step 2: Rewrite CodePlayground.vue styles**

Replace `<style scoped>` (lines 28-69):

```css
.code-playground {
  border-radius: 8px;
  overflow: hidden;
  background: var(--ctp-crust);
  border: 1px solid var(--border);
}

.playground-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--slide-bg-alt);
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.playground-filename {
  color: var(--text-primary);
  font-weight: 500;
}

.playground-lang {
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.playground-editor {
  padding: 16px;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.7;
}

.playground-editor :deep(pre) {
  margin: 0;
  background: transparent !important;
}
```

**Step 3: Rewrite CodeWalkthrough.vue styles**

Replace `<style scoped>` (lines 78-131):

```css
.code-walkthrough {
  display: flex;
  gap: var(--space-4);
  border-radius: 8px;
  overflow: hidden;
  background: var(--ctp-crust);
}

.walkthrough-code {
  flex: 1;
  overflow-x: auto;
}

.walkthrough-pre {
  margin: 0;
  padding: var(--space-4);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.8;
}

.walkthrough-line {
  display: block;
  padding: 0 var(--space-2);
  border-left: 3px solid transparent;
  transition: background 0.3s, border-color 0.3s;
}

.walkthrough-line.highlighted {
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  border-left-color: var(--accent);
}

.line-number {
  display: inline-block;
  width: 2.5em;
  color: var(--text-muted);
  opacity: 0.5;
  user-select: none;
  text-align: right;
  margin-right: var(--space-3);
}

.walkthrough-note {
  width: 240px;
  padding: var(--space-4);
  background: var(--slide-bg-alt);
  font-size: 0.9rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  border-left: 1px solid var(--border);
}
```

**Step 4: Rewrite TerminalDemo.vue styles**

Replace `<style scoped>` (lines 37-106):

```css
.terminal-demo {
  border-radius: 8px;
  overflow: hidden;
  background: var(--ctp-crust);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
}

.terminal-chrome {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: var(--slide-bg-alt);
  border-bottom: 1px solid var(--border);
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red { background: var(--ctp-red); }
.dot-yellow { background: var(--ctp-yellow); }
.dot-green { background: var(--ctp-green); }

.terminal-title {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.terminal-body {
  padding: 16px;
  font-size: 0.85rem;
  line-height: 1.6;
}

.terminal-step {
  margin-bottom: 12px;
  transition: opacity 0.3s ease;
}

.terminal-step:last-child {
  margin-bottom: 0;
}

.terminal-prompt {
  color: var(--accent);
}

.terminal-cmd {
  color: var(--text-primary);
}

.terminal-output {
  margin: 4px 0 0 0;
  padding: 0;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.8rem;
  white-space: pre-wrap;
}
```

**Step 5: Rewrite KeyPoints.vue styles**

Replace `<style scoped>` (lines 22-74):

```css
.key-points {
  padding: var(--space-4);
  background: var(--slide-bg-raised);
  border-radius: 8px;
  border: 1px solid var(--border);
}

.key-points-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--accent);
  margin-bottom: var(--space-3);
}

.key-points-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.key-point {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.key-point:last-child {
  margin-bottom: 0;
}

.key-point-marker {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--ctp-crust);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.75rem;
}

.key-point-text {
  font-size: 0.95rem;
  line-height: 1.4;
}
```

**Step 6: Rewrite QuoteBlock.vue styles**

Replace `<style scoped>` (lines 20-48):

```css
.quote-block {
  border: none;
  padding: 0;
  margin: var(--space-4) 0;
  position: relative;
  padding-left: var(--space-4);
  border-left: 3px solid var(--accent);
}

.quote-text {
  font-size: 1.2rem;
  line-height: 1.5;
  font-style: italic;
  color: var(--text-primary);
}

.quote-footer {
  margin-top: var(--space-3);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-style: normal;
}

.quote-author {
  color: var(--accent);
}
```

**Step 7: Rewrite SpeakerCard.vue styles**

Replace `<style scoped>` (lines 46-120):

```css
.speaker-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--slide-bg-raised);
  border-radius: 8px;
  border: 1px solid var(--border);
}

.speaker-avatar {
  flex-shrink: 0;
}

.avatar-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-initials {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--ctp-crust);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.2rem;
}

.speaker-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.speaker-title {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 2px;
}

.speaker-company {
  font-size: 0.85rem;
  color: var(--accent);
  margin-top: 2px;
}

.speaker-links {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.speaker-link {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.speaker-link:hover {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
```

**Step 8: Rewrite SectionHeader.vue styles**

Replace `<style scoped>` (lines 17-42):

```css
.section-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.section-icon {
  font-size: 2rem;
  color: var(--accent);
}

.section-text :deep(h1),
.section-text :deep(h2),
.section-text :deep(h3) {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
}

.accent-line {
  width: 48px;
  height: 3px;
  background: var(--accent);
  border-radius: 2px;
}
```

**Step 9: Rewrite AnimatedList.vue styles**

Replace `<style scoped>` (lines 25-58):

```css
.animated-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.animated-item,
.animated-list :deep(li) {
  margin-bottom: var(--space-3);
  padding-left: var(--space-3);
  border-left: 2px solid var(--accent);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* Stagger support — applied via inline style in template */

/* Fade-up animation */
.animation-fade-up .animated-item.slidev-vclick-hidden,
.animation-fade-up :deep(li.slidev-vclick-hidden) {
  opacity: 0;
  transform: translateY(12px);
}

/* Slide-right animation */
.animation-slide-right .animated-item.slidev-vclick-hidden,
.animation-slide-right :deep(li.slidev-vclick-hidden) {
  opacity: 0;
  transform: translateX(-20px);
}

/* Fade animation */
.animation-fade .animated-item.slidev-vclick-hidden,
.animation-fade :deep(li.slidev-vclick-hidden) {
  opacity: 0;
}

/* Scale-in animation */
.animation-scale-in .animated-item.slidev-vclick-hidden,
.animation-scale-in :deep(li.slidev-vclick-hidden) {
  opacity: 0;
  transform: scale(0.95);
}
```

Also update the AnimatedList.vue `<script>` to add `scale-in` to the type union (line 17):

```typescript
animation?: 'fade-up' | 'slide-right' | 'fade' | 'scale-in' | 'none'
```

And update the template (line 4) to apply stagger delay:

```html
<li v-for="(item, i) in items" :key="i" v-click class="animated-item" :style="stagger ? { transitionDelay: `${i * stagger}ms` } : {}">
```

**Step 10: TwoColumn.vue — no style changes needed**

The component only uses `--space-5` which resolves correctly. No changes.

**Step 11: Verify all components**

Run: `bun run dev example`
Expected: All components render with Catppuccin Mocha colors. Callout colors match palette. Terminal dots are Catppuccin red/yellow/green. Speaker card uses sapphire accent. Code backgrounds are `--ctp-crust`.

**Step 12: Commit**

```
feat(components): Update all components to Catppuccin tokens
```

---

### Task 7: New Component — Highlight.vue

**Files:**
- Create: `packages/components/components/Highlight.vue`

**Step 1: Create `packages/components/components/Highlight.vue`**

```vue
<template>
  <span class="highlight" :style="{ color: resolvedColor }">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  color?: string
}>(), {
  color: 'sapphire',
})

const colorMap: Record<string, string> = {
  rosewater: 'var(--ctp-rosewater)',
  flamingo: 'var(--ctp-flamingo)',
  pink: 'var(--ctp-pink)',
  mauve: 'var(--ctp-mauve)',
  red: 'var(--ctp-red)',
  maroon: 'var(--ctp-maroon)',
  peach: 'var(--ctp-peach)',
  yellow: 'var(--ctp-yellow)',
  green: 'var(--ctp-green)',
  teal: 'var(--ctp-teal)',
  sky: 'var(--ctp-sky)',
  sapphire: 'var(--ctp-sapphire)',
  blue: 'var(--ctp-blue)',
  lavender: 'var(--ctp-lavender)',
}

const resolvedColor = computed(() => colorMap[props.color] || props.color)
</script>

<style scoped>
.highlight {
  font-weight: 600;
}
</style>
```

**Step 2: Test in example slides**

Add to `talks/example/slides.md` after the code highlighting slide:

```markdown
---

## Highlight Component

Text with <Highlight color="peach">colorful</Highlight> words that <Highlight color="mauve">stand out</Highlight> in a <Highlight color="green">visually interesting</Highlight> way.
```

Run: `bun run dev example`
Expected: Words render in their Catppuccin colors with bold weight.

Remove the test slide after verifying.

**Step 3: Commit**

```
feat(components): Add Highlight component for Catppuccin text coloring
```

---

### Task 8: New Component — RoughMark.vue

**Files:**
- Create: `packages/components/components/RoughMark.vue`

**Step 1: Create `packages/components/components/RoughMark.vue`**

This component wraps Slidev's built-in `v-mark` directive, resolving Catppuccin color names to hex values.

```vue
<template>
  <span v-mark="markOptions">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'underline' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket' | 'box'
  color?: string
  at?: number | string
}>(), {
  type: 'underline',
  color: 'sapphire',
})

// Catppuccin Mocha hex values — used as defaults.
// When flavor is switched via variants, the CSS vars change but v-mark
// needs actual hex values, so we read from CSS at render time.
const colorHexMap: Record<string, string> = {
  rosewater: '#f5e0dc',
  flamingo: '#f2cdcd',
  pink: '#f5c2e7',
  mauve: '#cba6f7',
  red: '#f38ba8',
  maroon: '#eba0ac',
  peach: '#fab387',
  yellow: '#f9e2af',
  green: '#a6e3a1',
  teal: '#94e2d5',
  sky: '#89dceb',
  sapphire: '#74c7ec',
  blue: '#89b4fa',
  lavender: '#b4befe',
}

const resolvedColor = computed(() => colorHexMap[props.color] || props.color)

const markOptions = computed(() => {
  const opts: Record<string, unknown> = {
    type: props.type,
    color: resolvedColor.value,
  }
  if (props.at !== undefined) {
    opts.at = props.at
  }
  return opts
})
</script>
```

Note: `v-mark` is provided by Slidev globally and does not need to be imported. The directive accepts an object with `type`, `color`, and `at` fields.

**Step 2: Test in example slides**

Add to `talks/example/slides.md`:

```markdown
---

## Rough Notation

<RoughMark type="underline" color="peach">Underlined text</RoughMark> and
<RoughMark type="circle" color="red">circled text</RoughMark> and
<RoughMark type="highlight" color="yellow">highlighted text</RoughMark>
```

Run: `bun run dev example`
Expected: Each element shows its Rough Notation style on click, using Catppuccin colors.

Remove the test slide after verifying.

**Step 3: Commit**

```
feat(components): Add RoughMark component wrapping Slidev v-mark
```

---

### Task 9: New Component — GeometricAccents.vue + global-top.vue

**Files:**
- Create: `packages/components/components/GeometricAccents.vue`
- Create: `packages/theme/global-top.vue`

**Step 1: Create `packages/components/components/GeometricAccents.vue`**

```vue
<template>
  <svg
    v-if="layout !== 'code-focus' && !disabled"
    class="geometric-accents"
    :viewBox="`0 0 ${width} ${height}`"
    :width="width"
    :height="height"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Corner brackets — top-left -->
    <g v-if="showCornerBrackets" class="corner-bracket corner-tl" opacity="0.35">
      <line :x1="24" :y1="24" :x2="24" :y2="56" stroke="var(--ctp-overlay0)" stroke-width="1.5" />
      <line :x1="24" :y1="24" :x2="56" :y2="24" stroke="var(--ctp-overlay0)" stroke-width="1.5" />
    </g>

    <!-- Corner brackets — bottom-right -->
    <g v-if="showCornerBrackets" class="corner-bracket corner-br" opacity="0.35">
      <line :x1="width - 24" :y1="height - 24" :x2="width - 24" :y2="height - 56" stroke="var(--ctp-overlay0)" stroke-width="1.5" />
      <line :x1="width - 24" :y1="height - 24" :x2="width - 56" :y2="height - 24" stroke="var(--ctp-overlay0)" stroke-width="1.5" />
    </g>

    <!-- Small corner bracket — top-right (default layout) -->
    <g v-if="layout === 'default'" class="corner-bracket corner-tr" opacity="0.25">
      <line :x1="width - 24" :y1="24" :x2="width - 24" :y2="48" stroke="var(--ctp-overlay0)" stroke-width="1" />
      <line :x1="width - 24" :y1="24" :x2="width - 48" :y2="24" stroke="var(--ctp-overlay0)" stroke-width="1" />
    </g>

    <!-- Large ring — bottom-right (cover/end) -->
    <circle
      v-if="showLargeRing"
      class="large-ring"
      :cx="width - 100"
      :cy="height - 80"
      r="60"
      fill="none"
      stroke="var(--accent)"
      stroke-width="1.5"
      opacity="0.2"
    />

    <!-- Dot grid — top-right quadrant (cover/end) -->
    <g v-if="showDotGrid" class="dot-grid" opacity="0.15">
      <circle
        v-for="dot in dotGridPoints"
        :key="`${dot.x}-${dot.y}`"
        :cx="dot.x"
        :cy="dot.y"
        r="1.5"
        :fill="`var(--accent)`"
      />
    </g>

    <!-- Floating circle cluster — left margin (section) -->
    <g v-if="layout === 'section'" class="circle-cluster" opacity="0.25">
      <circle cx="40" cy="200" r="4" fill="var(--accent)" />
      <circle cx="28" cy="230" r="6" fill="var(--accent-alt)" opacity="0.4" />
      <circle cx="50" cy="260" r="3" fill="var(--accent)" opacity="0.6" />
    </g>

    <!-- Large unfilled ring — centered (quote) -->
    <circle
      v-if="layout === 'quote'"
      class="quote-ring"
      :cx="width / 2"
      :cy="height / 2"
      :r="Math.min(width, height) * 0.3"
      fill="none"
      stroke="var(--accent)"
      stroke-width="1"
      opacity="0.08"
    />

    <!-- Two-col center divider with diamond -->
    <g v-if="layout === 'two-col'">
      <line
        :x1="width / 2" :y1="80"
        :x2="width / 2" :y2="height - 40"
        stroke="var(--border)"
        stroke-width="1"
        opacity="0.3"
      />
      <rect
        :x="width / 2 - 4"
        :y="height / 2 - 4"
        width="8"
        height="8"
        :transform="`rotate(45, ${width / 2}, ${height / 2})`"
        fill="var(--accent)"
        opacity="0.4"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  layout?: string
  disabled?: boolean
  width?: number
  height?: number
}>(), {
  layout: 'default',
  disabled: false,
  width: 980,
  height: 552,
})

const showCornerBrackets = computed(() =>
  ['cover', 'end'].includes(props.layout)
)

const showLargeRing = computed(() =>
  ['cover', 'end'].includes(props.layout)
)

const showDotGrid = computed(() =>
  ['cover', 'end'].includes(props.layout)
)

const dotGridPoints = computed(() => {
  const points: { x: number; y: number }[] = []
  const startX = props.width * 0.65
  const endX = props.width - 60
  const startY = 40
  const endY = props.height * 0.35
  const spacing = 20
  for (let x = startX; x < endX; x += spacing) {
    for (let y = startY; y < endY; y += spacing) {
      points.push({ x, y })
    }
  }
  return points
})
</script>

<style scoped>
.geometric-accents {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  animation: geometricFadeIn 0.8s ease 0.6s forwards;
}

@keyframes geometricFadeIn {
  to { opacity: 1; }
}

.large-ring {
  animation: ringScaleIn 0.8s ease 0.6s both;
  transform-origin: center;
}

@keyframes ringScaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 0.2;
  }
}
</style>
```

**Step 2: Create `packages/theme/global-top.vue`**

```vue
<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const slidev = instance?.appContext.config.globalProperties.$slidev

const currentLayout = computed(() => {
  const slide = slidev?.nav?.currentSlideRoute?.meta?.slide
  return slide?.frontmatter?.layout || 'default'
})

const geometryDisabled = computed(() => {
  const slide = slidev?.nav?.currentSlideRoute?.meta?.slide
  return slide?.frontmatter?.geometry === false
})
</script>

<template>
  <GeometricAccents
    :layout="currentLayout"
    :disabled="geometryDisabled"
  />
</template>
```

Note: `GeometricAccents` is auto-imported from the addon's components directory by Slidev.

**Step 3: Test geometric accents**

Run: `bun run dev example`
Expected: Cover slide shows corner brackets, dot grid, and large ring. Section slides show circle clusters. Default slides show small top-right corner bracket. Code-focus slides have no geometry. Geometrics fade in after 0.6s delay.

**Step 4: Commit**

```
feat: Add geometric accent decorations with per-layout SVG overlays
```

---

### Task 10: Layout Spacing Audit

**Files:**
- Modify: `packages/theme/layouts/default.vue` (potentially)
- Modify: `packages/theme/layouts/cover.vue` (potentially)
- Modify: `packages/theme/layouts/section.vue` (potentially)
- Modify: `packages/theme/layouts/end.vue` (potentially)
- Modify: `packages/theme/layouts/quote.vue` (potentially)
- Modify: `packages/theme/layouts/two-col.vue` (potentially)
- Modify: `packages/theme/layouts/code-focus.vue` (potentially)
- Modify: `packages/theme/styles/base.css` (potentially)

Some layouts bunch content at the top of the slide instead of distributing it naturally. This task audits each layout's vertical spacing and fixes alignment issues.

**Step 1: Run dev server and screenshot each layout**

Run: `bun run dev example`
Walk through each slide and note which layouts have content bunched up at the top vs. properly centered/distributed.

**Step 2: Fix vertical alignment per layout type**

Apply these spacing rules:

| Layout | Expected vertical behavior |
|--------|--------------------------|
| cover | Content vertically centered, meta pinned to bottom |
| section | Content vertically centered |
| default | Content flows from top with comfortable padding — but if content is short, it should not bunch at top. Use `justify-content: flex-start` with generous top padding, or center if only 1-2 elements |
| quote | Content centered both axes |
| end | Content vertically centered |
| code-focus | Content vertically centered |
| two-col | Header at top, grid fills remaining space evenly |

Key CSS patterns to check:
- `justify-content: center` for layouts that should center (cover, section, quote, end, code-focus)
- `justify-content: flex-start` for content-flow layouts (default, two-col)
- `flex: 1` on content areas in grid layouts so they stretch
- `gap` between elements so content isn't bunched

For the `default` layout specifically, check if adding `gap: var(--content-gap)` to the flex column helps distribute content vertically. Also check if the `h2` bottom-margin + paragraph spacing creates enough visual breathing room.

**Step 3: Verify spacing looks natural**

Run: `bun run dev example`
Each slide should feel "designed" — content should have clear vertical rhythm and not feel like it's stuck to the top of the slide.

**Step 4: Commit**

```
fix(theme): Improve layout vertical spacing and content distribution
```

---

### Task 11: Update Example Slides and Final Verification

**Files:**
- Modify: `talks/example/slides.md`

**Step 1: Update example slides to showcase new features**

Add slides demonstrating `Highlight`, `RoughMark`, and the new visual system. Add a few slides that show the typography and color in action:

```markdown
---

## Typography & Color

# <Highlight color="sapphire">Catppuccin</Highlight> meets <Highlight color="peach">Clash Display</Highlight>

Text-heavy slides that are <Highlight color="mauve">visually dynamic</Highlight> through colorful typography.

---

## Rough Notation

Words can be <RoughMark type="underline" color="peach">underlined</RoughMark>,
<RoughMark type="circle" color="red">circled</RoughMark>, or
<RoughMark type="highlight" color="yellow">highlighted</RoughMark> with hand-drawn annotations.
```

**Step 2: Full visual verification**

Run: `bun run dev example`

Walk through every slide and verify:
- [ ] Cover slide: 4rem Clash Display heading, sapphire accent line, mono meta, corner brackets + dot grid + ring
- [ ] Code slides: Catppuccin Mocha syntax theme, crust background, sapphire line highlights
- [ ] Section slide: sapphire left bar, circle cluster, 3rem heading
- [ ] AnimatedList: sapphire left borders, smooth rise+deblur on click
- [ ] TerminalDemo: Catppuccin red/yellow/green dots, crust bg, sapphire prompt
- [ ] SpeakerCard: sapphire avatar circle, surface-0 background
- [ ] Callouts: Catppuccin blue/yellow/green/red for each type
- [ ] KeyPoints: sapphire numbered markers, surface-0 background
- [ ] QuoteBlock: sapphire left border
- [ ] Two-col: center divider with diamond
- [ ] Quote layout: large faint ring behind text, sapphire curly quote
- [ ] Highlight component: colored words in body text
- [ ] RoughMark: hand-drawn annotations appear on click
- [ ] End slide: mirrors cover geometry
- [ ] All slides: smooth fade transition between slides
- [ ] All v-click elements: rise + deblur animation

**Step 3: Commit**

```
feat(example): Update demo slides for Catppuccin theme showcase
```

---

### Task 12: Update Reference Docs

**Files:**
- Run `/update-refs` skill to regenerate component/theme reference docs

**Step 1: Run update-refs**

Since components and theme have changed significantly, run the update-refs skill to keep skill reference docs in sync:

```
/update-refs
```

**Step 2: Commit**

```
docs: Regenerate skill reference docs for Catppuccin theme
```
