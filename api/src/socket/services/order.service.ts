import { ConflictException, Injectable } from '@nestjs/common'
import { type Socket, type Server } from 'socket.io'
import { SocketMainService } from './main.service'
import { type OrderRequest } from '../interfaces/orderRequest.interface'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { checkIsAvailable } from 'src/utils/isAvailable.utils'
import { Order } from 'src/order/entities/order.entity'
import { findOrder } from 'src/common/orders.common'
import { SocketShopService } from './shop.service'

@Injectable()
export class SocketOrderService {
  constructor(
    private readonly socketMainService: SocketMainService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly socketShopService: SocketShopService
  ) {}

  private readonly connectedClients = this.socketMainService.connectedClients

  async sendOrderRequest(
    driverSocketId: string,
    order: OrderRequest
  ): Promise<boolean> {
    return await new Promise<boolean>((resolve) => {
      const driverSocket = this.connectedClients.get(driverSocketId)
      if (driverSocket) {
        const timeoutId = setTimeout(() => {
          resolve(false)
        }, 60000)

        driverSocket.emit('orderRequest', order, (response) => {
          clearTimeout(timeoutId)
          console.log('orderRequest response', response)
          resolve(response)
        })
      } else {
        resolve(false)
      }
    })
  }

  updateOrder(socket: Server, order: OrderRequest) {
    socket.to(order.id).emit('updateOrder', order)
    this.socketShopService.updateActiveOrders(socket, order.shopId)
  }

  async joinOrderClient(socket: Socket, data: { orderId: string }) {
    await socket.join(data.orderId)
    socket.to(data.orderId).emit('message', 'El cliente se ha unido a la orden')
  }

  async joinOrderDealer(socket: Socket, data: { orderId: string }) {
    const { isAvailable, orderId } = await checkIsAvailable(
      socket.handshake.query.userId.toString(),
      this.orderRepository
    )
    const currentOrderDealer = (
      await findOrder(data.orderId, this.orderRepository)
    ).dealerId
    const requestDealer = socket.handshake.query.userId
    console.log('joinOrderDealer', isAvailable, orderId, data.orderId)
    if (isAvailable || orderId !== data.orderId) {
      throw new ConflictException('Dealer does not have this order assigned')
    }

    // TODO: check if dealer is current dealer
    const isCurrentDealer = currentOrderDealer === requestDealer
    if (!isCurrentDealer) {
      return socket.emit('message', 'No tienes permiso para entrar')
    }

    await socket.join(data.orderId)
    socket.to(data.orderId).emit('message', 'El dealer se ha unido a la orden')
    socket.emit('message', 'Bienvenido al chat')
  }
}
