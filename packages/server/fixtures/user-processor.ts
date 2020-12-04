import { IProcessor } from 'typeorm-fixtures-cli'
import { hash } from 'bcrypt'

import { User } from 'src/users/user.entity'

export interface UserFixture extends User {
  password?: string
}

/**
 * @usage convert user object with `password` field to
 * user with `passwordHash`
 */
export const preProcessUserFixture = async (
  fields: UserFixture,
): Promise<User> => {
  const { password, email, ...values } = fields
  const passwordHash = await hash(password, 10)
  return { ...values, passwordHash, email: email.toLowerCase() }
}

export default class UserProcessor implements IProcessor<User> {
  async preProcess(_name: string, fields: UserFixture): Promise<User> {
    return preProcessUserFixture(fields)
  }
}
