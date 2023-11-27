import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @OneToOne(() => User, (user) => user.id, {eager:true})
    // @JoinColumn()
    // dealer: string; 

    @Column({nullable: false})
    shipAddress:string;

    @Column({nullable:false})
    shopAddress:string;
    
    @Column({nullable: false})
    step:number;

    // @OneToOne (()=> Chat ,(chat)=> chat,{eager:true})
    // @JoinColumn()  
    // chat: chat[]; 

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
    // products: Product[]; 
}