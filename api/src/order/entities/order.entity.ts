// TODO: Fix eslint disable
/* eslint-disable @typescript-eslint/indent */
import { TSteps } from 'src/order/entities/step.interface'
import { Product } from 'src/products/entities/product.entity'
import { Shop } from 'src/shops/entities/shop.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

type OrderStatus = 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'

// export interface Product {
//   name: string
//   quantity: number
//   price: number
// }

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: true })
  dealerId: string

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  dealer: User

  @Column({ type: 'uuid', nullable: true })
  clientId: string

  @ManyToOne(() => User, (user) => user.clientOrders, { eager: true })
  client: User

  @Column({ nullable: false })
  shipAddress: string

  @Column({ nullable: false })
  shipMapUrl: string

  @Column({ nullable: false })
  step: TSteps

  @ManyToOne(() => Shop, (shop) => shop.orders, { eager: true })
  shop: Shop

  @Column({ type: 'uuid', nullable: true })
  shopId: string

  // @OneToOne (()=> Chat ,(chat)=> chat,{eager:true})
  // @JoinColumn()
  @Column({
    nullable: false
  })
  chat: string

  @Column({
    nullable: false,
    type: 'bigint'
  })
  price: number

  // @OneToOne (()=> Product ,(product)=> product ,{eager:true})
  // @JoinColumn()
  // TODO: podemos validar que sea un json?
  // @OneToMany(() => Order, (order) => order.shop)
  // products: string

  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  products: Product[]

  @Column()
  status: OrderStatus

  @Column('float')
  distance: number

  @Column()
  shipCoordinates: string | null

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
