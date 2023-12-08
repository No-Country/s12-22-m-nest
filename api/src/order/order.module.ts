import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { HttpModule } from '@nestjs/axios'
import { User } from 'src/users/entities/user.entity'
import { MongooseModule } from '@nestjs/mongoose'
import { Chat, ChatSchema } from 'src/chat/entities/chat.mongo-entity'
import { MailerModule } from 'src/mailer/mailer.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    HttpModule,
    MailerModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
