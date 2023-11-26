import {
  ConflictException,
  Inject,
  Injectable,
  forwardRef
} from '@nestjs/common'
import { type Socket, type Server } from 'socket.io'
import { SocketMainService } from './main.service'
import { type OrderRequest } from '../interfaces/orderRequest.interface'
import { AppService } from 'src/app.service'

@Injectable()
export class SocketOrderService {
  constructor(
    @Inject(forwardRef(() => AppService))
    private readonly orderService: AppService,
    private readonly socketMainService: SocketMainService
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
          resolve(response)
        })
      } else {
        resolve(false)
      }
    })
  }

  updateOrder(socket: Server, order: OrderRequest) {
    socket.to(order.id).emit('updateOrder', order)
  }

  async joinOrderClient(socket: Socket, data: { orderId: string }) {
    await socket.join(data.orderId)
    socket.to(data.orderId).emit('message', 'El cliente se ha unido a la orden')
  }

  async joinOrderDealer(socket: Socket, data: { orderId: string }) {
    const { isAvailable, orderId } =
      await this.orderService.checkDealerAvailability(
        socket.handshake.query.userId.toString()
      )

    console.log('joinOrderDealer', isAvailable, orderId, data.orderId)
    if (isAvailable || orderId !== data.orderId) {
      throw new ConflictException('Dealer does not have this order assigned')
    }

    const isCurrentDealer = true
    if (!isCurrentDealer) {
      return socket.emit('message', 'No tienes permiso para entrar')
    }
    await socket.join(data.orderId)
    socket.to(data.orderId).emit('message', 'El dealer se ha unido a la orden')
    socket.emit('message', 'Bienvenido al chat')
  }
}
