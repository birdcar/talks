import { existsSync } from 'fs'

const talk = process.argv[2]
if (!talk) {
  console.error('Usage: bun run dev <talk-name>')
  process.exit(1)
}

const talkDir = `talks/${talk}`
if (!existsSync(talkDir)) {
  console.error(`Talk "${talk}" not found at ${talkDir}`)
  process.exit(1)
}

const proc = Bun.spawn(['bunx', 'slidev', '--open'], {
  cwd: talkDir,
  stdio: ['inherit', 'inherit', 'inherit'],
})
await proc.exited
