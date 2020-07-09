import * as Joi from '@hapi/joi'

const authValidationSchema = Joi.object({
  jwtSecret: Joi.string().required(),
})

export const authConfig = () => {
  const { JWT_SECRET } = process.env

  const config = {
    jwtSecret: JWT_SECRET,
  }

  const { value, error } = authValidationSchema.validate(config, {
    abortEarly: false,
  })

  if (error) {
    throw error
  }

  return value
}
