import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { OrderModule } from './order/orders.module'
import { SocketModule } from './socket/socket.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ChatModule } from './chat/chat.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { ShopsModule } from './shops/shops.module'
import { ProductsModule } from './products/products.module'
import { PaymentsModule } from './payments/payments.module'

@Module({
  imports: [
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
    OrderModule,
    SocketModule,
    UsersModule,
    AuthModule,
    ChatModule,
    CloudinaryModule,
    ShopsModule,
    ProductsModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule]
})
export class AppModule {}
