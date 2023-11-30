import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Chat } from './entities/chat.mongo-entity'
import { type CreateMessageDto } from './dto/create-message.dto'
import { SocketChatService } from 'src/socket/services/chat.service'
import { SocketGateway } from 'src/socket/socket.gateway'
import { OrderService } from 'src/order/order.service'

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly ChatModel: Model<Chat>,
    private readonly socketChatService: SocketChatService,
    private readonly socketGateway: SocketGateway,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService
  ) {}

  async create(): Promise<Chat> {
    const newChat = new this.ChatModel()
    newChat.messages = []
    return await newChat.save()
  }

  async createMessage(
    orderId: string,
    createMessageDto: CreateMessageDto
  ): Promise<any> {
    const order = await this.orderService.findOne(orderId)
    const chat = await this.ChatModel.findById(order.chat).exec()
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
    return await this.ChatModel.findById(chatId).exec()
  }
}
