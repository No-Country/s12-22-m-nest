// TODO: Fix eslint disable
/* eslint-disable @typescript-eslint/indent */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Order } from 'src/order/entities/order.entity'
import { Shop } from 'src/shops/entities/shop.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export interface ProductOrder {
  name: string
  quantity: number
  price: number
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: true })
  @IsString()
  shopId: string

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop

  @Column()
  @IsString()
  name: string

  @Column()
  @IsString()
  description: string

  @Column()
  @IsNotEmpty()
  price: number

  @Column()
  @IsString()
  @IsOptional()
  thumbnail: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[]
}
