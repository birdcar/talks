# Theme Variants

The birdcar theme uses the Catppuccin color system with per-talk flavor and accent switching via frontmatter.

## How It Works

1. Add a `variant` block to your talk's top-level frontmatter with `flavor` and/or `accent`
2. `global-bottom.vue` reads the variant config at runtime
3. It sets a `data-ctp-flavor` attribute on `<html>` and injects all `--ctp-*` CSS custom properties for the chosen flavor
4. It remaps `--accent` to the chosen accent color from the active palette
5. All semantic tokens in `base.css` reference `--ctp-*` vars, so the cascade updates everything automatically

## Frontmatter Configuration

```yaml
---
theme: slidev-theme-birdcar
addons:
  - slidev-addon-birdcar
title: My Talk
variant:
  flavor: frappe
  accent: mauve
---
```

Both properties are optional. Omitted values fall back to defaults.

## Defaults

- **Flavor**: `mocha` (dark, deep blue-black base `#1e1e2e`)
- **Accent**: `sapphire` (`#74c7ec` in Mocha)

With no `variant` block at all, you get Mocha + Sapphire.

## Available Flavors

Four Catppuccin flavors, from darkest to lightest:

| Flavor | Base | Mantle | Crust | Mode |
|--------|------|--------|-------|------|
| `mocha` | `#1e1e2e` | `#181825` | `#11111b` | Dark |
| `macchiato` | `#24273a` | `#1e2030` | `#181926` | Dark |
| `frappe` | `#303446` | `#292c3c` | `#232634` | Dark |
| `latte` | `#eff1f5` | `#e6e9ef` | `#dce0e8` | Light |

### Latte (Light Mode)

Latte is the only light flavor. When active, `variants.css` applies:

```css
:root[data-ctp-flavor="latte"] .slidev-layout {
  color-scheme: light;
}
```

This flips browser-native controls (scrollbars, form elements) to their light variants. Text colors also invert (e.g., `--ctp-text` becomes `#4c4f69` — dark on light).

## Available Accents

14 Catppuccin accent colors. The hex values shown are for Mocha; each flavor has its own version of every accent.

| Name | Mocha Hex | Character |
|------|-----------|-----------|
| `rosewater` | `#f5e0dc` | Warm cream-pink |
| `flamingo` | `#f2cdcd` | Soft pink |
| `pink` | `#f5c2e7` | Bright pink |
| `mauve` | `#cba6f7` | Purple-violet |
| `red` | `#f38ba8` | Soft red |
| `maroon` | `#eba0ac` | Dusty rose |
| `peach` | `#fab387` | Warm orange |
| `yellow` | `#f9e2af` | Muted gold |
| `green` | `#a6e3a1` | Soft green |
| `teal` | `#94e2d5` | Blue-green |
| `sky` | `#89dceb` | Light cyan |
| `sapphire` | `#74c7ec` | Blue (default) |
| `blue` | `#89b4fa` | Periwinkle |
| `lavender` | `#b4befe` | Soft indigo |

## Accent Suggestions by Topic

| Topic | Accent | Why |
|-------|--------|-----|
| General / technical | `sapphire` | Neutral, professional (default) |
| AI / ML / creative | `mauve` | Forward-looking, imaginative |
| Security / incidents | `red` | Urgency, alertness |
| Growth / DX / productivity | `green` | Progress, success |
| Energy / launch / breaking change | `peach` | Warmth, attention |
| Architecture / enterprise | `blue` | Calm authority |
| Community / people | `flamingo` | Friendly warmth |
| Fun / playful | `pink` | Lighthearted |

## What Gets Affected

Setting a variant changes every element that references semantic tokens:

- **Backgrounds**: `--slide-bg` (base), `--slide-bg-alt` (mantle), `--slide-bg-raised` (surface0)
- **Text**: `--text-primary` (text), `--text-secondary` (subtext0), `--text-muted` (overlay1)
- **Accent line** on cover and section slides
- **List markers** (bullet points)
- **Link color and hover** state
- **Component highlights**: AnimatedList borders, TerminalDemo prompts, Callout borders, KeyPoints markers, QuoteBlock borders, SpeakerCard company text
- **Code highlighting** accent in CodeWalkthrough
- **Border color** (`--border` maps to surface1)

## CSS Targeting by Flavor

The `data-ctp-flavor` attribute on `<html>` enables flavor-specific CSS:

```css
:root[data-ctp-flavor="latte"] .my-component {
  /* light-mode overrides */
}

:root[data-ctp-flavor="frappe"] .my-component {
  /* frappe-specific tweaks */
}
```

## Geometric Decorations

The theme renders subtle geometric accent shapes via `GeometricAccents` (injected by `global-top.vue`). To disable them on a per-slide basis, set `geometry: false` in that slide's frontmatter:

```md
---
layout: default
geometry: false
---

# Slide without decorations
```

This is useful for image-heavy or full-bleed slides where the decorations would interfere.
