import { Global, Module } from '@nestjs/common'
import { SocketGateway } from './socket.gateway'
import { HttpModule } from '@nestjs/axios'
import { SocketMainService } from './services/main.service'
import { SocketDealerService } from './services/dealer.service'
import { SocketOrderService } from './services/order.service'
import { SocketChatService } from './services/chat.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
import { Order } from 'src/order/entities/order.entity'
import { MongooseModule } from '@nestjs/mongoose'
import { Chat, ChatSchema } from 'src/chat/entities/chat.mongo-entity'

@Global()
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([User, Order]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }])
  ],
  providers: [
    SocketGateway,
    SocketMainService,
    SocketDealerService,
    SocketOrderService,
    SocketChatService
  ],
  exports: [
    TypeOrmModule,
    SocketGateway,
    MongooseModule,
    SocketMainService,
    SocketDealerService,
    SocketOrderService,
    SocketChatService
  ]
})
export class SocketModule {}
