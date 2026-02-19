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

// Copy template from talks/example, excluding build artifacts
cpSync('talks/example', talkDir, {
  recursive: true,
  filter: (src) => !src.includes('node_modules') && !src.includes('/dist'),
})

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

console.log(`Created new talk: ${talkDir}`)
console.log(`Run: bun run dev ${slug}`)
