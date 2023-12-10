// Todo: fix eslint error
/* eslint-disable @typescript-eslint/indent */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { OrderService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { type Order } from './entities/order.entity'

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto)
  }

  @Get()
  async findAll() {
    return await this.orderService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id)
  }

  @Put(':id')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() body: Partial<Order>
  ) {
    return await this.orderService.updateOrder(orderId, body)
  }

  @Post(':id/nextStep')
  async nextStep(@Param('id') orderId: string): Promise<any> {
    return await this.orderService.nextStep(orderId)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id)
  }
}
