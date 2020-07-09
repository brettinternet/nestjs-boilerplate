import { join } from 'path'
import { config } from 'dotenv'

const fromRootFiles = [
  join('packages', 'server', `.env.development`),
  join('packages', 'server', `.env.development.local`),
]

fromRootFiles.forEach((file) => {
  config({
    path: join(__dirname, '..', file),
  })
})
