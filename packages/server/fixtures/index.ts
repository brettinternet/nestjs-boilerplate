import { resolve, basename, join } from 'path'
import {
  Builder,
  fixturesIterator,
  Loader,
  Parser,
  Resolver,
} from 'typeorm-fixtures-cli/dist'
import { createConnection, getRepository } from 'typeorm'
import { User } from '../src/users/user.entity'

require('../config')

const loadFixtures = async (fixturesPath: string) => {
  try {
    const {
      DATABASE_HOST: host,
      DATABASE_PORT,
      DATABASE_NAME: database,
      DATABASE_USERNAME: username,
      DATABASE_PASSWORD: password,
    } = process.env
    const port = Number(DATABASE_PORT) || 5432

    const connection = await createConnection({
      type: 'postgres',
      host,
      port,
      database,
      username,
      password,
      entities: [User],
    })

    await connection.synchronize(true)

    const loader = new Loader()
    loader.load(resolve(fixturesPath))

    const resolver = new Resolver()
    const fixtures = resolver.resolve(loader.fixtureConfigs)
    const builder = new Builder(connection, new Parser())

    for (const fixture of fixturesIterator(fixtures)) {
      fixture.processor = join(__dirname, basename(fixture.processor))
      const entity = await builder.build(fixture)
      await getRepository(entity.constructor.name).save(entity)
    }
    console.info('Fixtures are successfully loaded.')
    await connection.close()
  } catch (err) {
    throw err
  }
}

if (require.main === module && process.env.INCLUDE_FIXTURES) {
  loadFixtures('bin/fixtures').catch(console.error)
}
