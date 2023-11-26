import { Injectable } from '@nestjs/common'
import { orders } from './fakeDb'
import { type Order } from './socket/interfaces/orderRequest.interface'
import { formatOrder } from './utils/formatOrder.utils'
import { HttpService } from '@nestjs/axios'
import { findCoordinates } from './utils/findCoordinates.utils'
import { SocketGateway } from './socket/socket.gateway'
import { SocketDealerService } from './socket/services/dealer.service'
import { v4 as uuidv4 } from 'uuid'
import { SocketOrderService } from './socket/services/order.service'
import { EnumSteps } from './socket/interfaces/step.interface'

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
      step: EnumSteps.LookingForDealer
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
      step:
        order.step < EnumSteps.Delivered
          ? ((order.step + 1) as 1 | 2 | 3 | 4 | 5 | 6)
          : EnumSteps.Delivered
    }

    if (orders[index].step === EnumSteps.Delivered) {
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

  async checkDealerAvailability(dealerId: string) {
    // Buscamos en las ordenes si el dealer ya está asignado a una orden activa
    const order = orders.filter(
      (order) => order.dealer === dealerId && order.status === 'In Progress'
    )[0]

    return {
      isAvailable: Boolean(!order),
      orderId: order?.id
    }
  }
}
