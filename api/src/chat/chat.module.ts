import { Module, forwardRef } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatController } from './chat.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Chat, ChatSchema } from './entities/chat.mongo-entity'
import { SocketChatService } from 'src/socket/services/chat.service'
import { SocketGateway } from 'src/socket/socket.gateway'
import { SocketModule } from 'src/socket/socket.module'
import { OrderModule } from 'src/order/order.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    forwardRef(() => SocketModule),
    forwardRef(() => OrderModule)
  ],
  controllers: [ChatController],
  providers: [ChatService, SocketChatService, SocketGateway],
  exports: [ChatService, MongooseModule]
})
export class ChatModule {}
