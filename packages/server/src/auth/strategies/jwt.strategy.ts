import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { UsersService } from 'src/users/users.service'
import { Payload } from 'src/auth/auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwtSecret'),
    })
  }

  async validate(payload: Payload) {
    const user = await this.usersService.findOne(payload.id.toString())
    // lookup a list of revoked tokens
    if (user) {
      return user
    }
  }
}
