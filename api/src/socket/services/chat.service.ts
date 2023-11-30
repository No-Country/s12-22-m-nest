import { Injectable } from '@nestjs/common'
import { type Server } from 'socket.io'
import { type Chat } from '../interfaces/orderRequest.interface'

@Injectable()
export class SocketChatService {
  updateChat(socket: Server, orderId: string, chat: Chat) {
    socket.to(orderId).emit('updatedChat', chat)
  }
}
