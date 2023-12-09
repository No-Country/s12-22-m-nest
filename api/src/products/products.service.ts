import { Injectable } from '@nestjs/common'
import { type CreateProductDto } from './dto/create-product.dto'
import { type UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save({
      ...createProductDto,
      thumbnail: 'https://i.postimg.cc/WbGN7jvM/6yvpkj.png'
    })
  }

  async findAll() {
    return await this.productRepository.find({ relations: ['shop'] })
  }

  async findOne(id: string) {
    const shop = await this.productRepository.findOne({
      where: { id },
      relations: ['shop']
    })

    return shop
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update({ id }, updateProductDto)
  }

  async remove(id: string) {
    return await this.productRepository.delete({ id })
  }
}
