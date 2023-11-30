import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { Repository } from 'typeorm'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { findCoordinates } from 'src/utils/findCoordinates.utils'
import { HttpService } from '@nestjs/axios'
import { formatOrder } from 'src/utils/formatOrder.utils'
import { users } from 'src/fakeDb'
import { SocketOrderService } from 'src/socket/services/order.service'
import { SocketGateway } from 'src/socket/socket.gateway'
import { EnumSteps } from 'src/socket/interfaces/step.interface'
import { SocketDealerService } from 'src/socket/services/dealer.service'

@Injectable()
export class OrderService {
  constructor(
    private readonly httpService: HttpService,
    private readonly socketOrderService: SocketOrderService,
    private readonly socketGateway: SocketGateway,
    private readonly socketDealerService: SocketDealerService,
    
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ) {}

   async create(body: Partial<Order>): Promise<any> {
     // Simulamos la creación de una orden
     const order: Order = {
       id: "3",
       dealer: null,
       shipAddress: body.shipAddress ?? '',
       shopAddress: body.shopAddress ?? '',
       status: 'Pending',
       step: EnumSteps.LookingForDealer,
       chat: {
         id: "3",
         messages: []
       },
       clientName: 'Pepe Argento',
       clientEmail: 'pepeargento@ejemplo.com',
       shop: 'McDonalds',
       price: 300,
       products: [
         {
           name: 'Hamburguesa con queso',
           quantity: 1,
           price: 100
         },
         {
           name: 'Super Papas',
           quantity: 2,
           price: 100
         }
       ]
     }

     this.orderRepository.save(order)
     return await this.socketDealerService.handleFindDealer(
       this.socketGateway.server,
       order
     )
   }

  async findAll() {
    try {
      return await this.orderRepository.find()
    } catch (error) {
      console.error(error)
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id })
      if (!order) throw new Error('Order not found')
      return order
    } catch (error) {
      console.error(error)
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.orderRepository.findOneBy({ id })
      if (!order) throw new Error('Order not found')
      return await this.orderRepository.update(id, updateOrderDto)
    } catch (error) {
      console.error(error)
    }
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    let order = await this.orderRepository.findOneBy({ id })
     order = { ...order, ...updateOrderDto }

    const shopCoordinates = await findCoordinates(
      this.httpService,
      order.shopAddress
    )

    const shipCoordinates = await findCoordinates(
      this.httpService,
      order.shipAddress
    )

    const formatedOrder = formatOrder(
      order[0],
      shipCoordinates,
      shopCoordinates
    )

    // TODO: populate dealer
    formatedOrder.dealer = users.filter(
      (user) => user.id === formatedOrder.dealer
    )[0]

    this.socketOrderService.updateOrder(
      this.socketGateway.server,
      formatedOrder
    )

    return formatedOrder;
  }

  async remove(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id })
      if (!order) throw new Error('Order not found')
      await this.orderRepository.delete(id)
      return order
    } catch (error) {
      console.error(error)
    }
  }
}
