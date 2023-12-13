/* eslint-disable @typescript-eslint/indent */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common'
import { ShopsService } from './shops.service'
import { CreateShopDto } from './dto/create-shop.dto'
import { UpdateShopDto } from './dto/update-shop.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'

@Controller('shops')
export class ShopsController {
  constructor(
    private readonly shopsService: ShopsService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post()
  async create(@Body() createShopDto: CreateShopDto) {
    return await this.shopsService.create(createShopDto)
  }

  @Get()
  async findAll() {
    return await this.shopsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.shopsService.findOne(id)
  }

  @Get(':id/active-orders')
  async findActiveOrders(@Param('id') id: string) {
    return await this.shopsService.findShopActiveOrders(id)
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  async update(
    @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDto,
    @UploadedFile() thumbnail: Express.Multer.File
  ) {
    if (thumbnail) {
      updateShopDto.thumbnail = (
        await this.cloudinaryService.uploadImage(thumbnail)
      ).secure_url
    }
    return await this.shopsService.update(id, updateShopDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.shopsService.remove(id)
  }
}
