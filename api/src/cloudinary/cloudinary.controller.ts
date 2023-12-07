import {
  Controller,
  Delete,
  Body,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { DeleteImageDto } from './dto/delete-image.dto'
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const urlImg = (await this.cloudinaryService.uploadImage(file)).secure_url
    return { urlImg, message: 'Image uploaded successfully' }
  }

  @Delete('image')
  async deleteImage(@Body() deleteImageDto: DeleteImageDto) {
    await this.cloudinaryService.deleteImageByURL(deleteImageDto.urlImage)
    return { message: 'Image delete successfully' }
  }
}
