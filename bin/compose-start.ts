import { execSync } from 'child_process'

require('./config')

const args = process.argv.slice(2)

execSync(`docker-compose up ${args.join(' ')}`, {
  stdio: 'inherit',
})
