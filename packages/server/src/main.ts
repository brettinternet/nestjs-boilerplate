import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // https://docs.nestjs.com/techniques/logger
    logger: ['verbose', 'debug', 'warn', 'error'],
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  const configService = app.get(ConfigService)
  const port = configService.get('port')
  await app.listen(port)
}

bootstrap()
