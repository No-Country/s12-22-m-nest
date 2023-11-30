import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Chat } from './entities/chat.mongo-entity'
import { type CreateMessageDto } from './dto/create-message.dto'
import { orders } from 'src/fakeDb'
import { SocketChatService } from 'src/socket/services/chat.service'
import { SocketGateway } from 'src/socket/socket.gateway'

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly ChatModel: Model<Chat>,
    private readonly socketChatService: SocketChatService,
    private readonly socketGateway: SocketGateway
  ) {}

  async create(): Promise<Chat> {
    const newChat = new this.ChatModel()
    newChat.messages = []
    return await newChat.save()
  }

  async createMessage(orderId: string, createMessageDto: CreateMessageDto): Promise<any> {
    const order = orders.filter((order) => order.id === orderId)[0]
    const chat = await this.ChatModel.findById(order.chat.id).exec()
    if (!chat) {
      throw new NotFoundException('Chat not found')
    }
    console.log('la orden es ', order)
    const index = orders.indexOf(order)
    orders[index] = {
      ...order,
      chat: {
        ...order.chat,
        messages: [
          ...order.chat.messages,
          {
            sender: createMessageDto.sender_id,
            body: createMessageDto.body
          }
        ]
      }
    }

    const newMessage = {
      sender: createMessageDto.sender_id,
      body: createMessageDto.body
    }
    chat.messages.push(newMessage)

    await chat.save()

    this.socketChatService.updateChat(
      this.socketGateway.server,
      orders[index].id,
      orders[index].chat
    )

    return orders[index].chat
  }

  async getChatWithMessages(chatId: string): Promise<Chat | null> {
    return await this.ChatModel.findById(chatId).exec()
  }
}
