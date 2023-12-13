import { applyDecorators } from '@nestjs/common'
import { Transform } from 'class-transformer'

export function TransformRevenue(factor: number) {
  return applyDecorators(
    Transform(({ value }) => value / factor, { toClassOnly: true })
  )
}
