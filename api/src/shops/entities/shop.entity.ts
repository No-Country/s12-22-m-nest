// TODO: Fix eslint disable
/* eslint-disable @typescript-eslint/indent */
import { IsJSON, IsOptional, IsString } from 'class-validator'
import { Order } from 'src/order/entities/order.entity'
import { Product } from 'src/products/entities/product.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export interface ShopResponse extends Omit<Shop, 'coordinates'> {
  coordinates: Coordinates
}

@Entity()
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[]

  @Column()
  mapUrl: string

  @OneToMany(() => Order, (order) => order.shop)
  orders: Order[]

  @Column()
  @IsString()
  name: string

  @Column()
  @IsString()
  address: string

  @Column()
  @IsString()
  description: string

  @Column()
  @IsString()
  phone: string

  @Column({ nullable: false })
  @IsJSON()
  coordinates: string

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

  @Column({ nullable: true })
  stripeId: string
}
