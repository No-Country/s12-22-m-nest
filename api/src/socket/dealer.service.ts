import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { type Socket, type Server } from 'socket.io'
import { calculateDistance } from 'src/utils/calculateDistance.utils'
import { type DealerData, type Order, type OrderRequest } from './interfaces'
import { buildMapsUrl, findCoordinates } from './utils'
import { SocketOrderService } from './order.service'
import { SocketMainService } from './main.service'

@Injectable()
export class SocketDealerService {
  constructor(
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

    const orderRequest: OrderRequest = {
      ...order,
      shipCoordinates,
      shopCoordinates,
      shipMapUrl: buildMapsUrl(order.shipAddress),
      shopMapUrl: buildMapsUrl(order.shopAddress)
    }

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
    console.log('dealers', dealers)
    for (let i = 0; i < dealers.length; i++) {
      const dealer = dealers[i]
      const distance = calculateDistance(
        parseFloat(shopCoordinates.lat),
        parseFloat(shopCoordinates.lon),
        parseFloat(dealer.coordinates.lat),
        parseFloat(dealer.coordinates.lon)
      )

      if (distance <= 5) {
        console.log('asking driver', dealer.clientId)
        const acceptOrder = await this.socketOrderService.sendOrderRequest(
          dealer.sockId,
          orderRequest
        )
        if (acceptOrder) {
          console.log('Dealer accepted', dealer)
          currentDealer = dealer
          const socket = this.connectedClients.get(currentDealer.sockId)
          console.log('currentDealer socket', socket)
          socket.data.taken = true
          break
        }
      }
    }

    if (Object.keys(currentDealer).length === 0) {
      console.log('No hay conductores disponibles')
      return "There aren't available drivers"
    }

    const driverSocket = this.connectedClients.get(currentDealer.sockId)
    await driverSocket.join(order.id)

    // Se deberia llamar al servicio de ordenes para actualizar el estado de la orden
    orderRequest.dealer = currentDealer.clientId
    orderRequest.status = 'In Progress'
    orderRequest.step = 2
    this.socketOrderService.updateOrder(socket, orderRequest)
  }
}
