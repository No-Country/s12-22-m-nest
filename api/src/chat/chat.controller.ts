import { Controller, Get, Post, Param, Body } from '@nestjs/common'
import { ChatService } from './chat.service'
import { CreateMessageDto } from './dto/create-message.dto'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post(':id/send')
  async sendMessageByChatId(@Param('id') orderId: string, @Body() createMessageDto: CreateMessageDto) {
    return await this.chatService.createMessage(orderId, createMessageDto)
  }

  @Get('messages/:id')
  async getMessagesByChatId(@Param('id') orderId: string) {
    return await this.chatService.getChatWithMessages(orderId)
  }
}
