import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { type Socket, type Server } from 'socket.io'
import { calculateDistance } from 'src/utils/calculateDistance.utils'
import { SocketOrderService } from './order.service'
import { SocketMainService } from './main.service'
import { findCoordinates } from 'src/utils/findCoordinates.utils'
import { type DealerData } from '../interfaces/dealerData.interface'
import { type Order } from '../interfaces/orderRequest.interface'
import { formatOrder } from 'src/utils/formatOrder'
import { AppService } from 'src/app.service'

@Injectable()
export class SocketDealerService {
  constructor(
    @Inject(forwardRef(() => AppService))
    private readonly orderService: AppService,
    private readonly httpService: HttpService,
    private readonly socketOrderService: SocketOrderService,
    private readonly socketMainService: SocketMainService
  ) {}

  private readonly connectedClients = this.socketMainService.connectedClients

  handleConnection(socket: Socket): void {
    const clientId = socket.id
    console.log('clientId connected', socket.handshake.query.userId)
    this.connectedClients.set(clientId, socket)
  }

  handleManageDealer(socket: Socket, data: DealerData) {
    // TODO: Saber si el dealer tiene una orden asignada
    socket.data = {
      coordinates: data.coordinates,
      active: data.active,
      taken: false
    }

    console.log('handleManageDealer', socket.data, socket.id)
  }

  async updateDealerLocation(socket: Socket, data: any) {
    const userId = socket.handshake.query.userId
    console.log('updateDealerLocation, user:', userId)
    socket.to(data.orderId).emit('updatedDealerLocation', data)
  }

  async handleFindDealer(socket: Server, order: Order) {
    console.log('Looking for a dealer', order)
    const { shopAddress } = order
    const shopCoordinates = await findCoordinates(this.httpService, shopAddress)
    const shipCoordinates = await findCoordinates(
      this.httpService,
      order.shipAddress
    )

    const clientsArray = Array.from(this.connectedClients.values())

    const orderRequest = formatOrder(order, shipCoordinates, shopCoordinates)

    let currentDealer = {} as any
    const dealers = clientsArray
      .filter((client) => {
        return client.handshake.query.type === 'dealer' && client.data.active
      })
      .map((dealer) => {
        return {
          sockId: dealer.id,
          clientId: dealer.handshake.query.userId,
          coordinates: dealer.data.coordinates,
          active: dealer.data.active,
          taken: dealer.data.taken
        }
      })

    for (let i = 0; i < dealers.length; i++) {
      const dealer = dealers[i]
      const distance = calculateDistance(
        parseFloat(shopCoordinates.lat),
        parseFloat(shopCoordinates.lon),
        parseFloat(dealer.coordinates.lat),
        parseFloat(dealer.coordinates.lon)
      )

      if (distance <= 5) {
        const acceptOrder = await this.socketOrderService.sendOrderRequest(
          dealer.sockId,
          orderRequest
        )
        if (acceptOrder) {
          currentDealer = dealer
          const socket = this.connectedClients.get(currentDealer.sockId)
          console.log('CurrentDealer', socket)
          socket.data.taken = true
          break
        }
      }
    }

    if (Object.keys(currentDealer).length === 0) {
      console.log('No hay conductores disponibles')
      return "There aren't available drivers"
      // Todo: O se cancela la orden o se pone en espera
    }

    const driverSocket = this.connectedClients.get(currentDealer.sockId)
    await driverSocket.join(order.id)

    return await this.orderService.updateOrder(order.id, {
      dealer: currentDealer.clientId,
      status: 'In Progress',
      step: 2
    })
  }
}
