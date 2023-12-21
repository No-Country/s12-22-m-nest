import { Injectable } from '@nestjs/common'
import { type CreateShopDto } from './dto/create-shop.dto'
import { type UpdateShopDto } from './dto/update-shop.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Shop } from './entities/shop.entity'
import { Repository } from 'typeorm'
import { HttpService } from '@nestjs/axios'
import { findCoordinates } from 'src/utils/findCoordinates.utils'
import { formatShop } from 'src/utils/formatShop.utils'
import { buildMapsUrl } from 'src/utils/buildMapsUrl.utils'
import { Order } from 'src/order/entities/order.entity'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly httpService: HttpService
  ) {}

  // async create(createShopDto: CreateShopDto) {
  //   const coordinates = await findCoordinates(
  //     this.httpService,
  //     createShopDto.address
  //   )

  //   const mapUrl = buildMapsUrl(createShopDto.address)

  //   return await this.shopRepository.save({
  //     ...createShopDto,
  //     coordinates: JSON.stringify(coordinates),
  //     thumbnail: createShopDto.thumbnail,
  //     mapUrl: mapUrl.toString(),
  //     stripeId: null
  //   })
  // }

  async create(createShopDto: CreateShopDto) {
    const coordinates = await findCoordinates(
      this.httpService,
      createShopDto.address
    )

    const mapUrl = buildMapsUrl(createShopDto.address)

    const shop = await this.shopRepository.save({
      ...createShopDto,
      coordinates: JSON.stringify(coordinates),
      thumbnail: createShopDto.thumbnail,
      mapUrl: mapUrl.toString(),
      stripeId: null
    })

    const user = await this.userRepository.findOne({
      where: { id: createShopDto.userId }
    })

    await this.userRepository.update({ id: user.id }, { shopId: shop.id })

    return shop
  }

  async findAll() {
    return await this.shopRepository.find()
  }

  async findOne(id: string) {
    const shop = await this.shopRepository.findOne({
      where: { id },
      relations: ['products', 'products.shop']
    })

    return formatShop(shop)
  }

  async findShopActiveOrders(id: string) {
    return await this.orderRepository.find({
      where: {
        shopId: id,
        status: 'In Progress'
      }
    })
  }

  async update(id: string, updateShopDto: UpdateShopDto) {
    return await this.shopRepository.update({ id }, updateShopDto)
  }

  async remove(id: string) {
    return await this.shopRepository.delete({ id })
  }
}
