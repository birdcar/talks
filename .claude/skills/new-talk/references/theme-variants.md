# Theme Variants

The birdcar theme supports per-talk color variants via CSS custom properties injected from frontmatter.

## How It Works

1. Add a `variant` block to your talk's frontmatter
2. `global-bottom.vue` reads the variant config at runtime
3. CSS custom properties (`--variant-*`) override the brand defaults
4. All components and layouts automatically pick up the new colors

## Frontmatter Configuration

```yaml
---
theme: slidev-theme-birdcar
addons:
  - slidev-addon-birdcar
title: My Talk
variant:
  accent: '#e89d0e'
  accentLight: '#f0b060'
  background: '#1a1a2e'
---
```

### Available Properties

| Property | CSS Variable | Default | Description |
|----------|-------------|---------|-------------|
| `accent` | `--variant-accent` | `hsl(30, 95%, 55%)` (warm amber) | Primary accent color — markers, borders, highlights |
| `accentLight` | `--variant-accent-light` | `hsl(30, 90%, 70%)` | Lighter accent for hover states and secondary highlights |
| `background` | `--variant-background` | `hsl(230, 25%, 10%)` (deep dark blue) | Slide background color |

## Preset Variants

### Default (Warm Amber)

The brand default. Deep blue background with warm amber accents.

```yaml
variant:
  accent: '#e89d0e'
  accentLight: '#f0b060'
  background: '#1a1a2e'
```

Best for: General purpose, technical talks, product demos.

### Cool Steel

Muted blue accent on a darker background. Professional and calm.

```yaml
variant:
  accent: '#5b8def'
  accentLight: '#8bb4f7'
  background: '#121620'
```

Best for: Enterprise talks, architecture deep-dives, serious topics.

### Emerald

Green accent for growth, success, and sustainability topics.

```yaml
variant:
  accent: '#10b981'
  accentLight: '#6ee7b7'
  background: '#0f1a17'
```

Best for: Developer experience, productivity, "green field" projects.

### Crimson

Red accent for urgency, alerts, and high-energy talks.

```yaml
variant:
  accent: '#ef4444'
  accentLight: '#fca5a5'
  background: '#1a1215'
```

Best for: Security topics, incident response, postmortems, breaking changes.

### Violet

Purple accent for creative and forward-looking talks.

```yaml
variant:
  accent: '#8b5cf6'
  accentLight: '#c4b5fd'
  background: '#15121e'
```

Best for: AI/ML topics, future-looking vision talks, creative tooling.

## Creating Custom Variants

### Choosing Colors

1. **Accent**: Pick a saturated color that works at both small (markers, borders) and large (full-slide background) scales
2. **Accent Light**: Same hue, higher lightness (70-80%). Used for hover states and secondary elements
3. **Background**: Very dark, low saturation. Match the hue family to the accent for cohesion

### Color Relationships

```
Accent:      High saturation, medium lightness (50-60%)
Accent Light: Same hue, lower saturation, higher lightness (70-80%)
Background:   Same hue family, very low saturation (10-20%), very low lightness (6-12%)
```

### Example: Custom Teal

```yaml
variant:
  accent: 'hsl(175, 80%, 45%)'
  accentLight: 'hsl(175, 70%, 70%)'
  background: 'hsl(180, 15%, 8%)'
```

## Accessibility

### Contrast Requirements

The theme's text colors (`--text-primary: hsl(220, 15%, 90%)`) need sufficient contrast against the background.

**Rules of thumb:**
- Background lightness should stay below 15% for readable text
- Accent color should have at least 3:1 contrast against the background for UI elements
- Accent light should have at least 4.5:1 contrast for inline text

### Testing Contrast

Use any WCAG contrast checker with these pairs:
- `--text-primary` (#e0e0e0) vs your `background`
- Your `accent` vs your `background`
- Your `accentLight` vs your `background`

All presets above meet WCAG AA for normal text.

## What Gets Affected

When you set a variant, these elements change:

- **Accent line** on cover and section slides
- **List markers** (bullet points)
- **Link hover** color
- **Component highlights**: AnimatedList borders, TerminalDemo prompts, Callout borders, KeyPoints markers, QuoteBlock borders, SpeakerCard company text
- **Code highlighting** accent in CodeWalkthrough
- **Button and interactive** element colors
