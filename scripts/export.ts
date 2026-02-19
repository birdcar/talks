import { existsSync } from 'fs'

const args = process.argv.slice(2)
const talk = args[0]
const format = args.includes('--pptx') ? 'pptx' : 'pdf'

if (!talk) {
  console.error('Usage: bun run export <talk-name> [--pdf|--pptx]')
  process.exit(1)
}

const talkDir = `talks/${talk}`
if (!existsSync(talkDir)) {
  console.error(`Talk "${talk}" not found at ${talkDir}`)
  process.exit(1)
}

const proc = Bun.spawn(
  ['bunx', 'slidev', 'export', '--format', format, '--output', `../../dist/${talk}.${format}`],
  {
    cwd: talkDir,
    stdio: ['inherit', 'inherit', 'inherit'],
  },
)
await proc.exited
