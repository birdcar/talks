# Implementation Spec: Talks Monorepo - Phase 1: Monorepo Foundation & Slidev Setup

**Contract**: ./contract.md
**Estimated Effort**: M

## Technical Approach

Phase 1 establishes the monorepo structure using Bun workspaces with Slidev as the presentation engine. The monorepo will contain workspace packages for a shared theme, a shared component addon, individual talks, and CLI tooling. We'll create a template/example talk to validate the entire pipeline: dev server, static build, PDF export, and deployment readiness.

Slidev runs on Vite under the hood and is compatible with Bun for dependency management. Each talk will be its own workspace package with a `slides.md` entry point and a `slidev` config that references the shared theme and addon packages. The root `package.json` will define Bun workspace scripts that proxy to individual talk packages.

Key technical decision: use Bun workspaces (not Turborepo or Nx) to keep tooling minimal. Slidev's CLI handles dev/build/export per talk; our root scripts just route to the right workspace.

## Feedback Strategy

**Inner-loop command**: `cd talks/example && bunx slidev --port 3030`

**Playground**: Dev server — start it and verify slides render after each structural change.

**Why this approach**: Most changes are structural (config files, workspace wiring). The dev server confirms Slidev resolves the monorepo packages correctly.

## File Changes

### New Files

| File Path | Purpose |
|-----------|---------|
| `package.json` | Root workspace config with Bun workspaces and shared scripts |
| `bunfig.toml` | Bun configuration (workspace settings) |
| `.gitignore` | Standard ignores for node_modules, dist, .slidev, etc. |
| `CLAUDE.md` | Project-level Claude instructions with repo conventions |
| `packages/theme/package.json` | Slidev theme package manifest (placeholder for Phase 2) |
| `packages/theme/styles/index.ts` | Theme entry point (placeholder) |
| `packages/components/package.json` | Slidev addon package manifest (placeholder for Phase 3) |
| `packages/components/components/Placeholder.vue` | Placeholder component to validate addon resolution |
| `talks/example/package.json` | Example talk workspace package |
| `talks/example/slides.md` | Example talk slides (5-6 slides testing basic features) |
| `talks/example/slidev.config.ts` | Slidev config referencing theme and addon |
| `scripts/dev.ts` | Bun script: start dev server for a specific talk |
| `scripts/build.ts` | Bun script: build static site for a specific talk |
| `scripts/export.ts` | Bun script: export PDF/PPTX for a specific talk |
| `scripts/new-talk.ts` | Bun script: scaffold a new talk directory from template |
| `scripts/build-site.ts` | Bun script: build entire site (index + all talks) for unified deployment |
| `site/index.html` | Root index page template listing all talks |
| `site/build-index.ts` | Script to generate the talks index page from talk metadata |

### Modified Files

None — greenfield project.

## Implementation Details

### Monorepo Workspace Structure

**Overview**: Configure Bun workspaces to link packages/theme, packages/components, and talks/* as workspace packages.

```
talks/                          # Repository root
├── package.json                # Root: workspaces config
├── bunfig.toml                 # Bun config
├── .gitignore
├── CLAUDE.md
├── packages/
│   ├── theme/                  # slidev-theme-birdcar
│   │   ├── package.json
│   │   └── styles/
│   │       └── index.ts
│   └── components/             # slidev-addon-birdcar
│       ├── package.json
│       └── components/
│           └── Placeholder.vue
├── talks/
│   └── example/                # First talk
│       ├── package.json
│       ├── slides.md
│       └── slidev.config.ts
├── scripts/
│   ├── dev.ts
│   ├── build.ts
│   ├── export.ts
│   └── new-talk.ts
└── docs/
    └── ideation/               # Already exists
```

```json
// Root package.json
{
  "name": "talks",
  "private": true,
  "workspaces": ["packages/*", "talks/*"],
  "scripts": {
    "dev": "bun scripts/dev.ts",
    "build": "bun scripts/build.ts",
    "export": "bun scripts/export.ts",
    "new-talk": "bun scripts/new-talk.ts",
    "build:site": "bun scripts/build-site.ts"
  },
  "devDependencies": {
    "@slidev/cli": "^53.0.0",
    "@slidev/types": "^53.0.0",
    "typescript": "^5.7.0"
  }
}
```

**Key decisions**:
- Bun workspaces glob `["packages/*", "talks/*"]` auto-discovers all packages
- Root devDependencies hold shared Slidev CLI so each talk doesn't duplicate it
- Scripts at root use `--talk <name>` arg to target specific talks

**Implementation steps**:
1. Create root `package.json` with workspace config
2. Create `bunfig.toml` with workspace settings
3. Create `.gitignore` covering node_modules, dist, .slidev, *.pdf, *.pptx
4. Run `bun install` to verify workspace resolution
5. Verify `bun --filter` or script-based routing works

**Feedback loop**:
- **Playground**: Terminal — run `bun install` and verify no resolution errors
- **Experiment**: Add a dependency in talks/example that references packages/components, verify it resolves
- **Check command**: `bun install && bun run --filter example -- echo "resolved"`

### Theme Package Scaffold

**Overview**: Create the theme package with minimal structure so Slidev resolves it. Full theme design is Phase 2.

```json
// packages/theme/package.json
{
  "name": "slidev-theme-birdcar",
  "version": "0.1.0",
  "private": true,
  "keywords": ["slidev-theme", "slidev"],
  "engines": {
    "slidev": ">=0.50.0"
  },
  "slidev": {
    "colorSchema": "both"
  }
}
```

**Implementation steps**:
1. Create `packages/theme/package.json` with Slidev theme metadata
2. Create `packages/theme/styles/index.ts` as empty placeholder
3. Create `packages/theme/layouts/` directory (empty for now)

### Component Addon Scaffold

**Overview**: Create the addon package with a single placeholder component to validate the addon pipeline. Full components are Phase 3.

```json
// packages/components/package.json
{
  "name": "slidev-addon-birdcar",
  "version": "0.1.0",
  "private": true,
  "keywords": ["slidev-addon", "slidev"]
}
```

```vue
<!-- packages/components/components/Placeholder.vue -->
<template>
  <div class="placeholder-component">
    <slot />
  </div>
</template>
```

**Implementation steps**:
1. Create `packages/components/package.json` with Slidev addon metadata
2. Create `packages/components/components/Placeholder.vue`
3. Verify the addon is discoverable from a talk's slidev config

### Example Talk

**Overview**: A working example talk that validates the entire pipeline: theme resolution, addon components, dev server, build, and export.

```yaml
# talks/example/slides.md frontmatter
---
theme: slidev-theme-birdcar
addons:
  - slidev-addon-birdcar
title: Example Talk
info: A template talk to validate the monorepo pipeline
---
```

The example talk should include 5-6 slides testing:
1. Title slide with frontmatter config
2. Slide using a markdown code block with syntax highlighting
3. Slide with speaker notes
4. Slide using the Placeholder component from the addon
5. Slide with click animations (`v-click`)
6. End slide

```typescript
// talks/example/slidev.config.ts
import { defineConfig } from '@slidev/types'

export default defineConfig({
  // Per-talk Slidev config
  remoteAssets: true,
  selectable: true,
  record: false,
})
```

**Implementation steps**:
1. Create `talks/example/package.json` with workspace dependencies
2. Create `talks/example/slides.md` with 5-6 test slides
3. Create `talks/example/slidev.config.ts`
4. Start dev server and verify all slides render
5. Build static site and verify output in dist/
6. Export PDF and verify rendering

**Feedback loop**:
- **Playground**: Dev server at localhost:3030
- **Experiment**: Navigate all 6 slides, verify code highlighting, click animations, speaker notes (presenter mode), addon component renders
- **Check command**: `cd talks/example && bunx slidev build --base /example/`

### CLI Scripts

**Overview**: Bun scripts that route dev/build/export commands to the correct talk workspace.

```typescript
// scripts/dev.ts
const talk = process.argv[2] || Bun.argv.find(a => a.startsWith('--talk='))?.split('=')[1]
if (!talk) {
  console.error('Usage: bun run dev <talk-name>')
  process.exit(1)
}

const proc = Bun.spawn(['bunx', 'slidev', '--open'], {
  cwd: `talks/${talk}`,
  stdio: ['inherit', 'inherit', 'inherit'],
})
await proc.exited
```

```typescript
// scripts/build.ts
const talk = process.argv[2] || Bun.argv.find(a => a.startsWith('--talk='))?.split('=')[1]
if (!talk) {
  console.error('Usage: bun run build <talk-name>')
  process.exit(1)
}

const proc = Bun.spawn(['bunx', 'slidev', 'build', '--base', `/${talk}/`], {
  cwd: `talks/${talk}`,
  stdio: ['inherit', 'inherit', 'inherit'],
})
await proc.exited
```

```typescript
// scripts/export.ts
const args = process.argv.slice(2)
const talk = args[0]
const format = args.includes('--pptx') ? 'pptx' : 'pdf'
if (!talk) {
  console.error('Usage: bun run export <talk-name> [--pdf|--pptx]')
  process.exit(1)
}

const proc = Bun.spawn(['bunx', 'slidev', 'export', '--format', format, '--output', `../../dist/${talk}.${format}`], {
  cwd: `talks/${talk}`,
  stdio: ['inherit', 'inherit', 'inherit'],
})
await proc.exited
```

```typescript
// scripts/new-talk.ts
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const name = process.argv[2]
if (!name) {
  console.error('Usage: bun run new-talk <talk-name>')
  process.exit(1)
}

const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
const talkDir = join('talks', slug)
mkdirSync(talkDir, { recursive: true })

// Copy template from talks/example as base
cpSync('talks/example', talkDir, { recursive: true })

// Update package.json name
const pkgPath = join(talkDir, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
pkg.name = `@talks/${slug}`
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

// Reset slides.md to minimal template
const slidesTemplate = `---
theme: slidev-theme-birdcar
addons:
  - slidev-addon-birdcar
title: ${name}
---

# ${name}

Your presentation starts here.

---

## Slide 2

Content goes here.
`
writeFileSync(join(talkDir, 'slides.md'), slidesTemplate)

console.log(\`Created new talk: \${talkDir}\`)
console.log(\`Run: bun run dev \${slug}\`)
```

**Implementation steps**:
1. Create scripts/dev.ts with talk routing
2. Create scripts/build.ts with base path config
3. Create scripts/export.ts with PDF/PPTX format selection
4. Create scripts/new-talk.ts with template copying
5. Test each script against the example talk

**Feedback loop**:
- **Playground**: Terminal
- **Experiment**: Run `bun run dev example`, `bun run build example`, `bun run export example`, `bun run new-talk "Test Talk"`
- **Check command**: `bun run build example && ls talks/example/dist/`

### Unified Site Build

**Overview**: A build script that compiles all talks into a single deployable site at `dist/` with a root index page and each talk under `/talks/<slug>`.

The unified site structure:
```
dist/
├── index.html              # Talks index page listing all presentations
├── talks/
│   ├── example/            # Built Slidev output for example talk
│   │   ├── index.html
│   │   └── ...
│   └── another-talk/
│       ├── index.html
│       └── ...
```

```typescript
// scripts/build-site.ts
import { readdirSync, existsSync, cpSync, mkdirSync } from 'fs'
import { join } from 'path'

const talksDir = 'talks'
const distDir = 'dist'
const talksDistDir = join(distDir, 'talks')

// Clean dist
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true })
}
mkdirSync(talksDistDir, { recursive: true })

// Discover all talks
const talks = readdirSync(talksDir).filter(name => {
  const pkgPath = join(talksDir, name, 'package.json')
  return existsSync(pkgPath)
})

// Build each talk with correct base path
for (const talk of talks) {
  console.log(`Building ${talk}...`)
  const proc = Bun.spawnSync(
    ['bunx', 'slidev', 'build', '--base', `/talks/${talk}/`, '--out', `../../dist/talks/${talk}`],
    { cwd: join(talksDir, talk), stdio: ['inherit', 'inherit', 'inherit'] }
  )
  if (proc.exitCode !== 0) {
    console.error(`Failed to build ${talk}`)
    process.exit(1)
  }
}

// Build index page
const indexProc = Bun.spawnSync(
  ['bun', 'site/build-index.ts', ...talks],
  { stdio: ['inherit', 'inherit', 'inherit'] }
)
```

```typescript
// site/build-index.ts
// Reads talk metadata (title, description from slides.md frontmatter)
// Generates dist/index.html with links to /talks/<slug>/
```

The index page will be a simple, branded HTML page that lists all talks with their titles and descriptions. In Phase 2, this page will inherit the personal brand theme.

**Key decisions**:
- Each talk's `--base` is set to `/talks/<slug>/` for correct asset resolution
- The index page is generated from talk frontmatter metadata
- Both unified (`bun run build:site`) and individual (`bun run build <talk>`) builds are supported

**Implementation steps**:
1. Create `scripts/build-site.ts` that discovers and builds all talks
2. Create `site/build-index.ts` that generates the root index page
3. Create `site/index.html` as a minimal template
4. Add `build:site` script to root package.json
5. Test unified build produces correct directory structure
6. Verify all talk links work with correct base paths

**Feedback loop**:
- **Playground**: Build output in dist/ served via `bunx serve dist`
- **Experiment**: Build site, serve locally, navigate to index, click through to talks, verify all asset paths resolve
- **Check command**: `bun run build:site && bunx serve dist`

### CLAUDE.md

**Overview**: Project-level Claude instructions for anyone (or Claude itself) working in this repo.

The CLAUDE.md should document:
- Monorepo structure and workspace layout
- How to create a new talk
- How to run dev/build/export
- Coding conventions (Vue SFCs with TypeScript, Slidev markdown syntax)
- Theme and component package conventions
- Available scripts

**Implementation steps**:
1. Write CLAUDE.md at repo root with all conventions
2. Include references to Slidev docs for markdown syntax

## Testing Requirements

### Manual Testing

- [ ] `bun install` succeeds with no resolution errors
- [ ] `bun run dev example` starts Slidev dev server
- [ ] All 6 example slides render correctly
- [ ] Presenter mode works (navigate to /presenter)
- [ ] Placeholder addon component renders on its slide
- [ ] Code syntax highlighting works
- [ ] Click animations (`v-click`) work
- [ ] `bun run build example` produces static files in talks/example/dist/
- [ ] `bun run export example` produces a PDF file
- [ ] `bun run new-talk "My New Talk"` creates talks/my-new-talk/ with correct structure
- [ ] New talk dev server starts successfully
- [ ] `bun run build:site` builds all talks into dist/ with correct structure
- [ ] dist/index.html lists all talks with working links
- [ ] dist/talks/example/index.html serves the example talk with correct base paths
- [ ] Site can be served locally via `bunx serve dist` with all navigation working

## Error Handling

| Error Scenario | Handling Strategy |
|---------------|-------------------|
| Talk name not provided to script | Print usage message and exit with code 1 |
| Talk directory doesn't exist | Print error with list of available talks |
| Slidev build fails | Pass through Slidev's error output |
| PDF export requires Chromium | Print helpful message about installing playwright-chromium |

## Validation Commands

```bash
# Install dependencies
bun install

# Start dev server for example talk
bun run dev example

# Build static site
bun run build example

# Export to PDF (requires playwright-chromium)
bun run export example

# Scaffold new talk
bun run new-talk "Test Talk"

# Verify workspace resolution
bun pm ls --all
```

## Open Items

- [ ] Confirm exact Slidev version compatibility with Bun (vs pnpm)
- [ ] Determine if `@slidev/cli` needs to be in each talk's deps or can stay at root
- [ ] Test PDF export quality — may need `playwright-chromium` as a devDependency

---

_This spec is ready for implementation. Follow the patterns and validate at each step._
