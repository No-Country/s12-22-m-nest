import { Module } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatController } from './chat.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Chat, ChatSchema } from './entities/chat.mongo-entity'
import { SocketChatService } from 'src/socket/services/chat.service'
import { SocketGateway } from 'src/socket/socket.gateway'
import { Order } from 'src/order/entities/order.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }])
  ],
  controllers: [ChatController],
  providers: [ChatService, SocketChatService, SocketGateway]
})
export class ChatModule {}
