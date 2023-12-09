import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { ShopsService } from './shops.service'
import { CreateShopDto } from './dto/create-shop.dto'
import { UpdateShopDto } from './dto/update-shop.dto'

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

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

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return await this.shopsService.update(id, updateShopDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.shopsService.remove(id)
  }
}
