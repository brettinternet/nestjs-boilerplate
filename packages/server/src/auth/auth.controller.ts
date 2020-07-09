import { Controller, Request, Post, UseGuards } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

import { User } from 'server/users/user.entity'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthService } from './auth.service'

export interface CustomRequest extends ExpressRequest {
  user?: User
}

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: CustomRequest) {
    return this.authService.login(req.user)
  }
}
