import { Injectable } from '@nestjs/common'
import { type Server } from 'socket.io'
import { type Chat } from 'src/chat/entities/chat.mongo-entity'

@Injectable()
export class SocketChatService {
  updateChat(socket: Server, orderId: string, chat: Chat) {
    console.log('updatedChat', chat)
    socket.to(orderId).emit('updatedChat', chat)
  }
}
