import { IsObject } from "class-validator";
import { User } from "src/socket/interfaces/orderRequest.interface";
import { TSteps } from "src/socket/interfaces/step.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
type OrderStatus = 'Pending' | 'In Progress' | 'Delivered' | 'Canceled';

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @OneToOne(() => User, (user) => user.id, {eager:true})
    // @JoinColumn()
    @Column()
    dealer: string | null; 

    @Column({nullable: false})
    shipAddress:string;

    @Column({nullable:false})
    shopAddress:string;
    
    @Column({nullable: false})
    step:TSteps;


    // @OneToOne (()=> Chat ,(chat)=> chat,{eager:true})
    // @JoinColumn()
    @IsObject()
    chat: {
    id: string;
    messages: [];
    }; 

    @Column({
        nullable: false,
        type: 'bigint'
    })
    price: number;

    @Column({
        nullable: false
    })
    clientName: string;

    @Column({
        nullable: false,
        unique: true
    })
    clientEmail: string;

    // @OneToOne (()=> Product ,(product)=> product ,{eager:true})
    // @JoinColumn()
    @IsObject() 
    productos: {
    name: string;
    quantity: number;
    price: number
    }; 

    @Column()
    status: OrderStatus;

    @Column()
    shop: string;
}