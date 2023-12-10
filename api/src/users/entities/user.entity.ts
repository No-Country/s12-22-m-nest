// TODO: FIX INDENTATION BUG - CONFIGURE ESLINT
/* eslint-disable @typescript-eslint/indent */
import { Transform } from 'class-transformer'
import {
  IsEmail,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Matches
} from 'class-validator'
import { Order } from 'src/order/entities/order.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  firstName: string

  @Column()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  lastName: string

  @Column()
  @IsEmail()
  email: string

  @Column()
  @IsISO8601()
  birthdate: Date

  @Column({ default: 'dealer' })
  @IsString()
  @Matches(/(dealer|customer)/)
  type: 'customer' | 'dealer'

  @Column()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  password: string

  @Column({
    nullable: true
  })
  @IsString()
  @IsOptional()
  profileImage: string

  @OneToMany(() => Order, (order) => order.dealer)
  orders: Order[]

  @OneToMany(() => Order, (order) => order.client)
  clientOrders: Order[]

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
