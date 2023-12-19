import { Injectable, NotFoundException } from '@nestjs/common'
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
      thumbnail: createProductDto.thumbnail
    })
  }

  async findAll(paginate: boolean, page: number = 1, pageSize: number = 10) {
    if (!paginate) {
      const products = await this.productRepository.find({ relations: ['shop'] })
      return products.map((product) => {
        product.shop = {
          ...product.shop,
          coordinates: JSON.parse(product.shop.coordinates)
        }
        return product
      })
    } else {
      const [results, total] = await this.productRepository.findAndCount({
        relations: ['shop'],
        take: pageSize,
        skip: (page - 1) * pageSize
      })

      const paginatedProducts = results.map((product) => {
        product.shop = {
          ...product.shop,
          coordinates: JSON.parse(product.shop.coordinates)
        }
        return product
      })

      const totalPages = Math.ceil(total / pageSize)
      const remainingPages = totalPages - page

      return {
        products: paginatedProducts,
        total,
        page,
        pageSize,
        totalPages,
        remainingPages
      }
    }
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['shop']
    })

    if (!product) throw new NotFoundException('Product not found')

    product.shop = {
      ...product.shop,
      coordinates: JSON.parse(product.shop.coordinates)
    }

    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update({ id }, updateProductDto)
  }

  async remove(id: string) {
    return await this.productRepository.delete({ id })
  }
}
