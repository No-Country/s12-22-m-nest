import { type Repository } from 'typeorm'
import { type Order } from './entities/order.entity'
import { type UpdateOrderDto } from './dto/update-order.dto'
import { NotFoundException } from '@nestjs/common'
import { formatOrder } from 'src/utils/formatOrder.utils'
import { findUser } from 'src/users/common'
import { type User } from 'src/users/entities/user.entity'
import { type SocketGateway } from 'src/socket/socket.gateway'
import { type SocketOrderService } from 'src/socket/services/order.service'
import { type Model } from 'mongoose'
import { type Chat } from 'src/chat/entities/chat.mongo-entity'
import { findChat } from 'src/chat/common'

export const findOrder = async (
  id: string,
  orderRepository: Repository<Order>
) => {
  return await orderRepository.findOneBy({ id })
}

export const findActiveOrderByDealer = async (
  id: string,
  orderRepository: Repository<Order>
) => {
  return await orderRepository.find({
    where: {
      dealer: id,
      status: 'In Progress'
    }
  })
}

export const findOrdersByUser = async (
  id: string,
  orderRepository: Repository<Order>
) => {
  return await orderRepository
    .createQueryBuilder('order')
    .where('order.dealerId = :dealerId', { dealerId: id })
    .getMany()
}

export const updateOrder = async (
  id: string,
  updateOrderDto: UpdateOrderDto,
  orderRepository: Repository<Order>,
  userRepository: Repository<User>,
  socketOrderService: SocketOrderService,
  socketGateway: SocketGateway,
  chatModel: Model<Chat>
) => {
  let order = await orderRepository.findOneBy({ id })
  if (!order) throw new NotFoundException('Order not found')
  order = { ...order, ...updateOrderDto }
  console.log(order)
  await orderRepository.save(order)

  const chat = await findChat(order.chat, chatModel)
  const formatedOrder = formatOrder(order, chat)

  console.log('update order', order.dealer)
  if (typeof order.dealer !== 'string') return
  formatedOrder.dealer = await findUser(order.dealer, userRepository)
  console.log('update order ok')

  socketOrderService.updateOrder(socketGateway.server, formatedOrder)

  return formatedOrder
}
