import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, compare } from 'bcrypt'

import { UsersService } from 'server/users/users.service'
import { User } from 'server/users/user.entity'

export type Payload = {
  id: number
  email: string
}

@Injectable()
export class AuthService {
  saltRounds = 10

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmailWithPasswordHash(email)
    if (user?.passwordHash) {
      const isMatch = await this.comparePasswords(password, user.passwordHash)
      if (isMatch) {
        const { passwordHash: _password, ...result } = user
        return result
      }
    }
  }

  async login(user: User) {
    const { id, email } = user
    const payload: Payload = { id, email }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return hash(password, this.saltRounds)
  }

  private async comparePasswords(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return compare(password, hash)
  }
}
