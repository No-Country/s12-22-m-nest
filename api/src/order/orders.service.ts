import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { Repository } from 'typeorm'
import { type UpdateOrderDto } from './dto/update-order.dto'
import { findCoordinates } from 'src/utils/findCoordinates.utils'
import { HttpService } from '@nestjs/axios'
import { formatOrder } from 'src/utils/formatOrder.utils'
import { SocketOrderService } from 'src/socket/services/order.service'
import { SocketGateway } from 'src/socket/socket.gateway'
import { EnumSteps, type TSteps } from 'src/order/entities/step.interface'
import { SocketDealerService } from 'src/socket/services/dealer.service'
import { type CreateOrderDto } from './dto/create-order.dto'
import { User } from 'src/users/entities/user.entity'
import { findOrder, updateOrder } from '../common/orders.common'
import { Chat } from 'src/chat/entities/chat.mongo-entity'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { createChat, findChat } from 'src/common/chat.common'
import { MailerService } from 'src/mailer/mailer.service'
import { Shop } from 'src/shops/entities/shop.entity'
import { findUser } from 'src/common/users.common'
import { getFormatProducts } from 'src/utils/getFormatProducts.utils'
import { Product } from 'src/products/entities/product.entity'
import { calculateDistance } from 'src/utils/calculateDistance.utils'
import { buildMapsUrl } from 'src/utils/buildMapsUrl.utils'
import { PaymentsService } from 'src/payments/payments.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    private readonly httpService: HttpService,
    private readonly socketOrderService: SocketOrderService,
    private readonly socketGateway: SocketGateway,
    private readonly socketDealerService: SocketDealerService,
    private readonly mailerService: MailerService,
    private readonly paymentsService: PaymentsService
  ) {}

  async findOne(id: string) {
    const order = await findOrder(id, this.orderRepository, true)
    const chat = await findChat(order.chat, this.chatModel)
    return formatOrder(order, chat)
  }

  async findDealer(id: string) {
    const order = await findOrder(id, this.orderRepository)
    const chat = await findChat(order.chat, this.chatModel)
    const orderRequest = formatOrder(order, chat)
    if (order.status !== 'Pending' && order.paymentStatus !== 'Completed') throw new BadRequestException('Order is not pending or payment is not completed')
    return await this.socketDealerService.handleFindDealer(
      this.socketGateway.server,
      orderRequest
    )
  }

  async findAll() {
    return await this.orderRepository.find({
      order: {
        updatedAt: 'DESC' // Ordenar por la columna date de forma descendente
      }
    })
  }

  async create(body: CreateOrderDto): Promise<any> {
    const chat = await createChat(this.chatModel)
    const client = await findUser(body.client, this.userRepository)
    const shop = await this.shopRepository.findOne({
      where: { id: body.shop }
    })
    const products = await getFormatProducts(
      body.products,
      this.productRepository
    )
    const finalPrice = products.reduce((acc, curr) => acc + curr.price, 0)

    const shipCoordinates = await findCoordinates(
      this.httpService,
      body.shipAddress
    )

    const distance = calculateDistance(
      parseFloat(shipCoordinates.lat),
      parseFloat(shipCoordinates.lon),
      parseFloat(JSON.parse(shop.coordinates).lat),
      parseFloat(JSON.parse(shop.coordinates).lon)
    )

    const orderCreation = this.orderRepository.create({
      dealerId: null,
      clientId: client.id,
      shipAddress: body.shipAddress,
      shipCoordinates: JSON.stringify(shipCoordinates),
      status: 'Pending',
      step: EnumSteps.LookingForDealer,
      chat: String(chat.id),
      shopId: shop.id,
      price: finalPrice,
      products,
      distance,
      shipMapUrl: buildMapsUrl(shop.address).toString(),
      paymentStatus: 'Pending',
      dealerRevenue: distance * 0.5,
      shopRevenue: finalPrice * 0.7
    })

    await this.orderRepository.save(orderCreation)
    const order = await findOrder(orderCreation.id, this.orderRepository)
    // const orderRequest = formatOrder(order, chat)
    const paymentLink = await this.paymentsService.create(order, order.products, distance)
    console.log(paymentLink)
    // await this.mailerService.sendMail({
    //   receiverMail: client.email,
    //   header: 'Sigue tu orden',
    //   body: `Hola, este es el link para seguir tu orden:${process.env.CLIENT_URL}/order-tracking/${order.id}`
    // })

    // return await this.socketDealerService.handleFindDealer(
    //  this.socketGateway.server,
    //  orderRequest
    // )
    return paymentLink
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const orderUpdated = await updateOrder(
      id,
      updateOrderDto,
      this.orderRepository,
      this.userRepository,
      this.socketOrderService,
      this.socketGateway,
      this.chatModel
    )
    if (updateOrderDto.status === 'Canceled') {
      // TODO: send email to client
      // await this.mailerService.sendMail({
      //   receiverMail: updateOrderDto.clientEmail,
      //   header: 'Tu orden ha sido cancelada',
      //   body: 'Hola, te informamos que tu orden ha sido cancelada.'
      // })
    }
    return orderUpdated
  }

  async nextStep(orderId: string) {
    let order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['dealer']
    })

    if (!order) throw new NotFoundException('Order not found')

    order = {
      ...order,
      step:
        order.step < EnumSteps.Delivered
          ? ((order.step + 1) as TSteps)
          : EnumSteps.Delivered
    }

    if (order.step === EnumSteps.Delivered) {
      order.status = 'Delivered'
    }

    const chat = await findChat(order.chat, this.chatModel)
    const formatedOrder = formatOrder(order, chat)

    await this.orderRepository.save(order)
    console.log('formatedOrder', formatedOrder)
    this.socketOrderService.updateOrder(
      this.socketGateway.server,
      formatedOrder
    )

    return formatedOrder
  }

  async remove(id: string) {
    const order = await findOrder(id, this.orderRepository)
    await this.orderRepository.delete(id)
    return order
  }
}
