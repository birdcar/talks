import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const talks = process.argv.slice(2)

// Catppuccin Latte color map for variant accent names
const catppuccinLatte: Record<string, string> = {
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
}

const defaultAccent = '#209fb5' // sapphire

function parseYamlString(raw: string): string {
  let s = raw.trim()
  // Strip outer double quotes and unescape
  if (s.startsWith('"') && s.endsWith('"')) {
    s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
  }
  // Strip outer single quotes
  if (s.startsWith("'") && s.endsWith("'")) {
    s = s.slice(1, -1).replace(/''/g, "'")
  }
  return s
}

function resolveAccent(name: string): string {
  const cleaned = parseYamlString(name)
  return catppuccinLatte[cleaned] || cleaned || defaultAccent
}

// Extract frontmatter fields from each talk's slides.md
function getTalkMeta(slug: string): { title: string; info: string; accent: string } {
  const slidesPath = join('talks', slug, 'slides.md')
  const content = readFileSync(slidesPath, 'utf-8')
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) return { title: slug, info: '', accent: defaultAccent }

  const fm = frontmatterMatch[1]
  const title = parseYamlString(fm.match(/^title:\s*(.+)$/m)?.[1] || slug)
  const info = parseYamlString(fm.match(/^info:\s*(.+)$/m)?.[1] || '')
  const accentRaw = fm.match(/^\s*accent:\s*(.+)$/m)?.[1] || ''
  const accent = accentRaw ? resolveAccent(accentRaw) : defaultAccent

  return { title, info, accent }
}

const talkEntries = talks.map((slug) => {
  const meta = getTalkMeta(slug)
  return `        <li><a class="talk-card" href="/talks/${slug}/" style="--card-accent: ${meta.accent}"><div class="talk-title">${meta.title}</div>${meta.info ? `<div class="talk-info">${meta.info}</div>` : ''}</a></li>`
})

const template = readFileSync('site/index.html', 'utf-8')
const html = template.replace('{{TALK_LIST}}', talkEntries.join('\n'))

writeFileSync('dist/index.html', html)
console.log('Generated dist/index.html')
