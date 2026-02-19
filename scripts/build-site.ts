import { readdirSync, existsSync, rmSync, mkdirSync } from 'fs'
import { join } from 'path'

const talksDir = 'talks'
const distDir = 'dist'
const talksDistDir = join(distDir, 'talks')

// Clean dist
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true })
}
mkdirSync(talksDistDir, { recursive: true })

// Discover all talks (directories with a package.json)
const talks = readdirSync(talksDir).filter((name) => {
  const pkgPath = join(talksDir, name, 'package.json')
  return existsSync(pkgPath)
})

console.log(`Found ${talks.length} talk(s): ${talks.join(', ')}`)

// Build each talk with correct base path
for (const talk of talks) {
  console.log(`\nBuilding ${talk}...`)
  const proc = Bun.spawnSync(
    ['bunx', 'slidev', 'build', '--base', `/talks/${talk}/`, '--out', `../../dist/talks/${talk}`],
    { cwd: join(talksDir, talk), stdio: ['inherit', 'inherit', 'inherit'] },
  )
  if (proc.exitCode !== 0) {
    console.error(`Failed to build ${talk}`)
    process.exit(1)
  }
}

// Build index page
console.log('\nBuilding index page...')
const indexProc = Bun.spawnSync(['bun', 'site/build-index.ts', ...talks], {
  stdio: ['inherit', 'inherit', 'inherit'],
})
if (indexProc.exitCode !== 0) {
  console.error('Failed to build index page')
  process.exit(1)
}

console.log('\nSite build complete! Output in dist/')
