import { Injectable, BadRequestException } from '@nestjs/common'
import {
  type UploadApiErrorResponse,
  type UploadApiResponse,
  v2 as cloudinary
} from 'cloudinary'
import * as streamifier from 'streamifier'
import { extractPublicId } from 'cloudinary-build-url'
import { SharpPipe } from './pipe/Sharp.pipe'

@Injectable()
export class CloudinaryService {
  constructor(private readonly sharpPipe: SharpPipe) {}
  async uploadImage(
    file: Express.Multer.File
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!file?.buffer) {
      throw new BadRequestException('File Missing!')
    }

    const optimizedImagePath = await this.sharpPipe.transform(file)
    return await new Promise<UploadApiResponse | UploadApiErrorResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error) {
              reject(error)
              return
            }
            resolve(result)
          }
        )
        streamifier.createReadStream(optimizedImagePath).pipe(uploadStream)
      }
    )
  }

  async deleteImageByURL(imageURL: string): Promise<any> {
    const publicId = extractPublicId(imageURL)

    if (!publicId) {
      throw new BadRequestException('Incorrect URL image!')
    }
    const { result } = await cloudinary.uploader.destroy(publicId)
    if (result === 'not found') {
      throw new BadRequestException('Image not found')
    }
  }
}
