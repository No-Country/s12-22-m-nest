import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Chat } from './entities/chat.mongo-entity'
import { type CreateMessageDto } from './dto/create-message.dto'
import { SocketChatService } from 'src/socket/services/chat.service'
import { SocketGateway } from 'src/socket/socket.gateway'
import { createChat, findChat } from '../common/chat.common'
import { Order } from 'src/order/entities/order.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { findOrder } from 'src/common/orders.common'

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly socketChatService: SocketChatService,
    private readonly socketGateway: SocketGateway
  ) {}

  async create(): Promise<Chat> {
    return await createChat(this.chatModel)
  }

  async createMessage(
    orderId: string,
    createMessageDto: CreateMessageDto
  ): Promise<any> {
    const order = await findOrder(orderId, this.orderRepository)
    const chat = await this.chatModel.findById(order.chat).exec()
    if (!chat) {
      throw new NotFoundException('Chat not found')
    }

    const newMessage = {
      sender: createMessageDto.sender_id,
      body: createMessageDto.body
    }
    chat.messages.push(newMessage)

    await chat.save()

    this.socketChatService.updateChat(this.socketGateway.server, orderId, chat)

    return chat
  }

  async getChatWithMessages(chatId: string): Promise<Chat | null> {
    return await findChat(chatId, this.chatModel)
  }
}
