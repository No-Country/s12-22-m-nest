import { Module } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { CloudinaryController } from './cloudinary.controller'
import { CloudinaryProvider } from './cloudinary.provider'
import { SharpPipe } from './Sharp.pipe'

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryProvider, SharpPipe],
  exports: [SharpPipe]
})
export class CloudinaryModule {}
