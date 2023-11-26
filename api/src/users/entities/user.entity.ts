import { Transform } from 'class-transformer'
import {
  IsEmail,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number

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

  @Column()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
    password: string

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
    profileImage: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
    updatedAt: Date
}
