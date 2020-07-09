import * as Joi from '@hapi/joi'

const appValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  includeFixtures: Joi.boolean(),
  isProd: Joi.boolean().required(),
  port: Joi.number().default(3000),
  database: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().default(5432),
    database: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
})

export const appConfig = () => {
  const {
    NODE_ENV,
    PORT,
    INCLUDE_FIXTURES,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
  } = process.env

  const config = {
    isProd: NODE_ENV === 'production',
    port: PORT,
    includeFixtures: INCLUDE_FIXTURES,
    database: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
    },
  }

  const { value, error } = appValidationSchema.validate(config, {
    abortEarly: false,
  })

  if (error) {
    throw error
  }

  return value
}
