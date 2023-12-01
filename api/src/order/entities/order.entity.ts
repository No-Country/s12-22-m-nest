// TODO: Fix eslint disable
/* eslint-disable @typescript-eslint/indent */
import { IsJSON } from 'class-validator'
import { TSteps } from 'src/order/entities/step.interface'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

type OrderStatus = 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'

export interface Product {
  name: string
  quantity: number
  price: number
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  // @OneToOne(() => User, (user) => user.id, {eager:true})
  // @JoinColumn()
  @Column({ nullable: true })
  dealer: string | null

  @Column({ nullable: false })
  shipAddress: string

  @Column({ nullable: false })
  shopAddress: string

  @Column({ nullable: false })
  step: TSteps

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

  @Column({
    nullable: false
  })
  clientName: string

  @Column({
    nullable: false
  })
  clientEmail: string

  // @OneToOne (()=> Product ,(product)=> product ,{eager:true})
  // @JoinColumn()
  // TODO: podemos validar que sea un json?
  @Column()
  @IsJSON()
  products: string

  @Column()
  status: OrderStatus

  @Column()
  shop: string

  @Column()
  shipCoordinates: string | null

  @Column()
  shopCoordinates: string | null
}
