import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const talks = process.argv.slice(2)

// Extract frontmatter title from each talk's slides.md
function getTalkMeta(slug: string): { title: string; info: string } {
  const slidesPath = join('talks', slug, 'slides.md')
  const content = readFileSync(slidesPath, 'utf-8')
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) return { title: slug, info: '' }

  const fm = frontmatterMatch[1]
  const title = fm.match(/^title:\s*(.+)$/m)?.[1] || slug
  const info = fm.match(/^info:\s*(.+)$/m)?.[1] || ''
  return { title, info }
}

const talkEntries = talks.map((slug) => {
  const meta = getTalkMeta(slug)
  return `    <li><a href="/talks/${slug}/">${meta.title}</a>${meta.info ? ` — ${meta.info}` : ''}</li>`
})

const template = readFileSync('site/index.html', 'utf-8')
const html = template.replace('{{TALK_LIST}}', talkEntries.join('\n'))

writeFileSync('dist/index.html', html)
console.log('Generated dist/index.html')
