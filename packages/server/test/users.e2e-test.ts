import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, HttpStatus } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as request from 'supertest'

import { AuthModule } from 'server/auth/auth.module'
import { appConfig } from 'server/app.config'
import { User } from 'server/users/user.entity'
import { CreateUserDto } from 'server/users/dto/create-user.dto'
import {
  UserFixture,
  preProcessUserFixture,
} from '../bin/fixtures/user-processor'
import testUser from './user.json'

describe('AuthController (e2e)', () => {
  let app: INestApplication
  let user: UserFixture
  let createUser: CreateUserDto

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.development.local', '.env.development'],
          isGlobal: true,
          load: [appConfig],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            const {
              host,
              port,
              database,
              username,
              password,
            } = configService.get('database')
            return {
              type: 'postgres',
              host,
              port,
              username,
              password,
              database,
              autoLoadEntities: true,
              synchronize: true,
            }
          },
          inject: [ConfigService],
        }),
        AuthModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    user = testUser
  })

  it('(GET /user) should reject empty credentials', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(HttpStatus.UNAUTHORIZED)
  })

  it('(POST /user) should reject an invalid token', () => {
    const badToken = 'asdf'
    return request(app.getHttpServer())
      .post('')
      .set('Authorization', 'Bearer ' + badToken)
      .expect(HttpStatus.UNAUTHORIZED)
  })

  it('(GET /user) provide the user', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(HttpStatus.OK)
      .expect({
        access_token: '',
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
