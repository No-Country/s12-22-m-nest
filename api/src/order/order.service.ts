import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>

    async create( createOrderDto: CreateOrderDto) {
        try {
          return await this.orderRepository.save(createOrderDto);
        } catch (error) {
          console.error(error);
        }
      }
      
      async findAll() {
        try {
          return await this.orderRepository.find();
        } catch (error) {
          console.error(error);
        }
      }
    
      async findOne(id: string) {
        try {
          const order = await this.orderRepository.findOneBy({id});
          if(!order) throw new Error('Order not found');
          return order;
        } catch (error) {
          console.error(error);
        }
      }
    
      async update(id: string, updateOrderDto: UpdateOrderDto) {
        try {
          const order = await this.orderRepository.findOneBy({id});
          if(!order) throw new Error('Order not found');
          return await this.orderRepository.update(id, updateOrderDto);
        } catch (error) {
          console.error(error);
        }
      }
    
      async remove(id: string) {
        try {
          const order = await this.orderRepository.findOneBy({id});
          if(!order) throw new Error('Order not found');
          await this.orderRepository.delete(id);
          return order;
        } catch (error) {
          console.error(error);
        }
      }
}
