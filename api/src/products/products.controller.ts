/* eslint-disable @typescript-eslint/indent */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
  BadRequestException
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() thumbnail: Express.Multer.File
  ) {
    console.log(createProductDto)
    if (thumbnail) {
      createProductDto.thumbnail = (
        await this.cloudinaryService.uploadImage(thumbnail)
      ).secure_url
    } else {
      throw new BadRequestException('Thumbnail is required')
    }
    return await this.productsService.create(createProductDto)
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return await this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(id)
  }
}
