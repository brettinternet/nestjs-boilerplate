import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'

import { User } from 'src/users/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('Auth Controller', () => {
  let authController: AuthController
  let authService: AuthService
  let jwtService: JwtService
  let user: User

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile()

    authController = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
    jwtService = module.get<JwtService>(JwtService)
    // user =
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  // it('should login test user account', async () => {
  //   const { id, email } = user
  //   const accessToken = jwtService.sign({ id, email })
  //   jest.spyOn(authService, 'login').mockImplementation(async () => ({
  //     access_token: accessToken,
  //   }))

  //   expect(await authController.login({ user })).toBe()
  // })
})
