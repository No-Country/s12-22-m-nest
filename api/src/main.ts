import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigModule } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  ConfigModule.forRoot()
  app.enableCors({
    credentials: true,
    origin: '*'
  })
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api/')
  await app.listen(3001)
}
bootstrap();
