import { Module } from '@nestjs/common'
import { OrderController } from './orders.controller'
import { OrderService } from './orders.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { HttpModule } from '@nestjs/axios'
import { User } from 'src/users/entities/user.entity'
import { MongooseModule } from '@nestjs/mongoose'
import { Chat, ChatSchema } from 'src/chat/entities/chat.mongo-entity'
import { MailerModule } from 'src/mailer/mailer.module'
import { Shop } from 'src/shops/entities/shop.entity'
import { Product } from 'src/products/entities/product.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Shop, Product]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    HttpModule,
    MailerModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
