/* eslint-disable @typescript-eslint/indent */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { UpdatePasswordDto } from './dto/update-password.dto'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }

  @Get(':id/availability')
  async checkAvailability(@Param('id') id: string) {
    return await this.usersService.checkDealerAvailability(id)
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('populate') populate: boolean) {
    return await this.usersService.findOneById(id, populate ?? false)
  }

  @Get(':id/orders')
  async findUserOrders(@Param('id') id: string) {
    return await this.usersService.findOrdersByUser(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UseInterceptors(FileInterceptor('profileImage'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() profileImage: Express.Multer.File
  ) {
    console.log('file', profileImage)
    if (profileImage) {
      updateUserDto.profileImage = (
        await this.cloudinaryService.uploadImage(profileImage)
      ).secure_url
    }
    return await this.usersService.update(id, updateUserDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/password')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return await this.usersService.updatePassword(id, updatePasswordDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id)
  }
}
