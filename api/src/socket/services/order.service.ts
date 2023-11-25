import { Injectable } from '@nestjs/common'
import { type Socket, type Server } from 'socket.io'
import { SocketMainService } from './main.service'
import { type OrderRequest } from '../interfaces/orderRequest.interface'

@Injectable()
export class SocketOrderService {
  constructor(private readonly socketMainService: SocketMainService) {}

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

  updateOrder(socket: Server, order: OrderRequest) {
    socket.to(order.id).emit('updateOrder', order)
  }

  async joinOrderClient(socket: Socket, data: { orderId: string }) {
    console.log('joinOrderClient', data.orderId)
    await socket.join(data.orderId)
    socket.to(data.orderId).emit('message', 'El cliente se ha unido a la orden')
  }

  async joinOrderDealer(socket: Socket, data: { orderId: string }) {
    // Todo: validar que este dealer lleva la orden
    const isCurrentDealer = true
    if (!isCurrentDealer) {
      return socket.emit('message', 'No tienes permiso para entrar')
    }
    console.log('joinOrderDealer', data.orderId)
    await socket.join(data.orderId)
    socket.to(data.orderId).emit('message', 'El dealer se ha unido a la orden')
    // Saludar al repartidor
    socket.emit('message', 'Bienvenido al chat')
  }
}
