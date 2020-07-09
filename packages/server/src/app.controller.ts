import { Controller, Get, Render, Request } from '@nestjs/common'
import { CustomRequest } from './auth/auth.controller'

@Controller()
export class AppController {
  @Get()
  @Render('index')
  homeView(@Request() req: CustomRequest) {
    return {
      message: "It's working!",
      user: req.user,
    }
  }
}
