import { BadRequestException, Controller, Headers, Post, Req } from '@nestjs/common'
import { PaymentsService } from './payments.service'
import RequestWithRawBody from './interface/requestWithRawBody.interface'

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('stripe-webhook')
  async stripeWebHook(@Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header')
    }
    await this.paymentsService.stripeWebhook(signature, request.rawBody)
  }
}
