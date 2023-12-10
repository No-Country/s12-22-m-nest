// TODO: Fix eslint disable
/* eslint-disable @typescript-eslint/indent */
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Shop } from 'src/shops/entities/shop.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
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
  @IsNumber()
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
}
