/* eslint-disable @typescript-eslint/indent */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { AppService } from './app.service'
import { type Order } from './socket/interfaces/orderRequest.interface'

// Simulamos el controlador de ordenes
@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getOrders(): Order[] {
    return this.appService.getAll()
  }

  @Get(':id')
  async findOne(@Param('id') orderId: string) {
    return await this.appService.getOne(orderId)
  }

  @Put(':id')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() body: Partial<Order>
  ) {
    return await this.appService.updateOrder(orderId, body)
  }

  @Post('order')
  async createOrder(@Body() body: Partial<Order>): Promise<any> {
    return await this.appService.createOrder(body)
  }

  @Post(':id/nextStep')
  async nextStep(@Param('id') orderId: string): Promise<any> {
    return await this.appService.nextStep(orderId)
  }

  @Post(':id/chat')
  async addMessage(
    @Param('id') orderId: string,
    @Body() body: { sender: string; body: string }
  ): Promise<any> {
    return await this.appService.addMessage(orderId, body)
  }
}
