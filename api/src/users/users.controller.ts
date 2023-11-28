import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto)
    return await this.usersService.create(createUserDto)
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOneById(id)
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.usersService.remove(id)
  }
}
