import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, HttpStatus } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as request from 'supertest'

import { AuthModule } from 'src/auth/auth.module'
import { appConfig } from 'src/app.config'
import { UserFixture } from 'fixtures/user-processor'
import testUser from './user.json'

describe('AuthController (e2e)', () => {
  let app: INestApplication
  let user: UserFixture

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

  it('(POST /login) should reject empty credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({})
      .expect(HttpStatus.UNAUTHORIZED)
  })

  it('(POST /login) should reject invalid password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: 'p@$$w0rd',
      })
      .expect(HttpStatus.UNAUTHORIZED)
  })

  it('(POST /login) should reject invalid email', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'asdf' + user.email,
        password: user.password,
      })
      .expect(HttpStatus.UNAUTHORIZED)
  })

  it('(POST /login) should respond with an access_token when provided correct email and password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(HttpStatus.CREATED)
  })

  afterAll(async () => {
    await app.close()
  })
})
