import { type Repository } from 'typeorm'
import { type Order } from '../order/entities/order.entity'
import { type UpdateOrderDto } from '../order/dto/update-order.dto'
import { NotFoundException } from '@nestjs/common'
import { formatOrder } from 'src/utils/formatOrder.utils'
import { type User } from 'src/users/entities/user.entity'
import { type SocketGateway } from 'src/socket/socket.gateway'
import { type SocketOrderService } from 'src/socket/services/order.service'
import { type Model } from 'mongoose'
import { type Chat } from 'src/chat/entities/chat.mongo-entity'
import { findChat } from 'src/common/chat.common'

export const findOrder = async (
  id: string,
  orderRepository: Repository<Order>,
  populate?: boolean
) => {
  const order = await orderRepository.findOne({
    where: { id },
    ...(populate && { relations: ['dealer'] })
  })

  if (!order) throw new NotFoundException('Order not found')

  return order
}

export const findActiveOrderByDealer = async (
  id: string,
  orderRepository: Repository<Order>
) => {
  console.log('findActiveOrderByDealer', id)
  const orders = await orderRepository.find({
    where: {
      dealerId: id,
      status: 'In Progress'
    }
  })

  return orders
}

export const findOrdersByUser = async (
  userId: string,
  type: 'customer' | 'dealer' | 'shop',
  orderRepository: Repository<Order>
) => {
  const orders = await orderRepository.findBy({
    ...(type === 'customer' && { clientId: userId }),
    ...(type === 'dealer' && { dealerId: userId })
  })
  console.log('findOrdersByUser', orders)
  const formatedOrders = orders.map((order) => {
    return formatOrder(order, null)
  })

  return formatedOrders
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
  let order = await orderRepository.findOne({
    where: { id },
    relations: ['dealer']
  })
  if (!order) throw new NotFoundException('Order not found')
  order = { ...order, ...updateOrderDto }
  console.log(order)
  await orderRepository.save(order)

  const chat = await findChat(order.chat, chatModel)
  const formatedOrder = formatOrder(order, chat)

  socketOrderService.updateOrder(socketGateway.server, formatedOrder)

  return formatedOrder
}
