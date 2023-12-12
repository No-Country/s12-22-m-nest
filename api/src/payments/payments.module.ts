import { Module } from '@nestjs/common'
import { PaymentsService } from './payments.service'
import { PaymentsController } from './payments.controller'
import { ConfigModule } from '@nestjs/config'
import { OrderService } from 'src/order/orders.service'

@Module({
  controllers: [PaymentsController],
  imports: [ConfigModule.forRoot()],
  providers: [PaymentsService],
  exports: [PaymentsService]
})
export class PaymentsModule {}
