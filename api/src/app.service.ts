import { Injectable } from '@nestjs/common'
import { orders } from './fakeDb'
import { type Order } from './socket/interfaces/orderRequest.interface'
import { formatOrder } from './utils/formatOrder'
import { HttpService } from '@nestjs/axios'
import { findCoordinates } from './utils/findCoordinates.utils'
import { SocketGateway } from './socket/socket.gateway'
import { SocketDealerService } from './socket/services/dealer.service'
import { v4 as uuidv4 } from 'uuid'
import { SocketOrderService } from './socket/services/order.service'

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly socketGateway: SocketGateway,
    private readonly socketDealerService: SocketDealerService,
    private readonly socketOrderService: SocketOrderService
  ) {}

  async createOrder(body: Partial<Order>): Promise<any> {
    // Simulamos la creación de una orden
    const order: Order = {
      id: uuidv4(),
      dealer: null,
      shipAddress: body.shipAddress ?? '',
      shopAddress: body.shopAddress ?? '',
      status: 'Pending',
      step: 1
    }

    orders.push(order)

    return await this.socketDealerService.handleFindDealer(
      this.socketGateway.server,
      order
    )
  }

  getAll() {
    return orders
  }

  async getOne(orderId: string) {
    const order = orders.filter((order) => order.id === orderId)[0]
    const shopCoordinates = await findCoordinates(
      this.httpService,
      order.shopAddress
    )
    const shipCoordinates = await findCoordinates(
      this.httpService,
      order.shipAddress
    )

    return formatOrder(order, shipCoordinates, shopCoordinates)
  }

  async updateOrder(orderId: string, body: Partial<Order>) {
    const order = orders.filter((order) => order.id === orderId)[0]
    const index = orders.indexOf(order)
    orders[index] = { ...order, ...body }

    const shopCoordinates = await findCoordinates(
      this.httpService,
      order.shopAddress
    )

    const shipCoordinates = await findCoordinates(
      this.httpService,
      order.shipAddress
    )

    const formatedOrder = formatOrder(
      orders[index],
      shipCoordinates,
      shopCoordinates
    )

    this.socketOrderService.updateOrder(
      this.socketGateway.server,
      formatedOrder
    )

    return formatedOrder
  }

  async nextStep(orderId: string) {
    const order = orders.filter((order) => order.id === orderId)[0]
    const index = orders.indexOf(order)
    orders[index] = {
      ...order,
      step: order.step < 5 ? ((order.step + 1) as 1 | 2 | 3 | 4 | 5) : 5
    }

    if (orders[index].step === 5) {
      orders[index].status = 'Delivered'
    }

    const shopCoordinates = await findCoordinates(
      this.httpService,
      order.shopAddress
    )

    const shipCoordinates = await findCoordinates(
      this.httpService,
      order.shipAddress
    )

    const formatedOrder = formatOrder(
      orders[index],
      shipCoordinates,
      shopCoordinates
    )

    this.socketOrderService.updateOrder(
      this.socketGateway.server,
      formatedOrder
    )

    return formatedOrder
  }
}
