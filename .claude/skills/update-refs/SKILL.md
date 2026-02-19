---
name: update-refs
description: Regenerate the new-talk skill reference documents from current source files
---

Regenerate the skill reference documents at `.claude/skills/new-talk/references/` by reading the current source files. This keeps the references in sync after adding components, layouts, or theme changes.

## Process

### 1. Detect What Changed

Read `git diff --name-only` and `git diff --cached --name-only` to identify which source files changed. Use this to determine which references need regeneration. If nothing changed (or you were asked to do a full refresh), regenerate all.

### 2. Regenerate components.md

**Source files**: All `.vue` files in `packages/components/components/`

For each component:
1. Read the `.vue` file
2. Extract: component name, props (from `defineProps`), slot usage, purpose
3. Write a reference entry with: name, purpose, props table, usage example, "when to use", PDF behavior

**Structure**: Group by content type (Code, List & Text, Demo, Identity, Layout). Keep the existing format in `.claude/skills/new-talk/references/components.md` as a template.

### 3. Regenerate slidev-syntax.md

**Source files**: All `.vue` files in `packages/theme/layouts/`

Update the "Available Layouts" table and layout examples section:
1. Read each layout file
2. Extract: layout name (from filename), slot names, frontmatter attributes used
3. Update the table and add examples for any new layouts

Keep all other sections (frontmatter, slide separation, click animations, code blocks, speaker notes, etc.) unless they reference specific layouts or components that changed.

### 4. Regenerate theme-variants.md

**Source files**:
- `packages/theme/styles/variants.css` — CSS custom properties
- `packages/theme/global-bottom.vue` — variant injection logic
- `packages/theme/styles/base.css` — default brand values

Update:
1. The "Available Properties" table from what `global-bottom.vue` actually injects
2. Default values from `base.css`
3. Keep preset variants and custom guidance unless the variant system itself changed

### 5. Regenerate design-guide.md

**Source files**:
- `packages/theme/styles/base.css` — typography and spacing values
- All component files — for the component selection table

Update:
1. Typography section with actual font names, sizes, and weights from `base.css`
2. Component selection table if components were added or removed
3. Keep design principles, pacing guidance, and "do this / not that" stable unless explicitly asked to change

### 6. Verify

After regenerating, read each updated reference file and verify:
- All current components are documented
- All current layouts are listed
- Props and types match the source code
- Usage examples are valid Slidev markdown
- No references to deleted components or layouts remain

### 7. Report

Output a summary:
```
Updated references:
- components.md: X components documented
- slidev-syntax.md: X layouts listed
- theme-variants.md: X properties, X presets
- design-guide.md: component table updated
```
