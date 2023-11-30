import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { SocketModule } from './socket/socket.module'
import { HttpModule } from '@nestjs/axios'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ChatModule } from './chat/chat.module'

@Module({
  imports: [
    // Todo: Eliminar HttpModule
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      ssl: true,
      synchronize: true
    }),
    SocketModule,
    UsersModule,
    AuthModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService, SocketModule, ChatModule],
  exports: [AppModule]
})
export class AppModule {}
