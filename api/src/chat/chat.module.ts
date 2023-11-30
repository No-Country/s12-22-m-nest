import { Module, forwardRef } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatController } from './chat.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Chat, ChatSchema } from './entities/chat.mongo-entity'
import { SocketChatService } from 'src/socket/services/chat.service'
import { SocketGateway } from 'src/socket/socket.gateway'
import { SocketModule } from 'src/socket/socket.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema }
    ]), forwardRef(() => SocketModule)
  ],
  controllers: [ChatController],
  providers: [ChatService, SocketChatService, SocketGateway],
  exports: [ChatService]
})
export class ChatModule {}
