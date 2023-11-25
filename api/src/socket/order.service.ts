import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { type Socket, type Server } from 'socket.io'
import { type Order, type OrderRequest } from './interfaces'
import { SocketMainService } from './main.service'

@Injectable()
export class SocketOrderService {
  constructor(
    private readonly httpService: HttpService,
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
        console.log('driverSocket existe', driverSocketId)
        const timeoutId = setTimeout(() => {
          resolve(false)
        }, 60000)

        driverSocket.emit('orderRequest', order, (response) => {
          console.log('response', response)
          clearTimeout(timeoutId)
          resolve(response)
        })
      } else {
        console.log('driverSocket no existe', driverSocketId)
        resolve(false)
      }
    })
  }

  updateOrder(socket: Server, order: Order) {
    socket.to(order.id).emit('updateOrder', order)
  }

  async joinOrder(socket: Socket, data: any) {
    console.log('joinOrder', data.orderId)
    await socket.join(data.orderId)
    socket.to(data.orderId).emit('message', data.orderId)
  }
}
