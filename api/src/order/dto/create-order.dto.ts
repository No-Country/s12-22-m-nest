
import { Order } from "../entities/order.entity";
import { OmitType } from "@nestjs/mapped-types";
import { IsString, IsBoolean, IsInt, IsEmail } from "class-validator"

export class CreateOrderDto extends OmitType(Order, ["_id" as keyof Order] as const){

    // @IsString()
    // dealer: string;
    
    @IsBoolean()
    shipAddress: string;

    @IsBoolean()
    shopAddress: string;

    @IsInt()
    step: number;  

    // @IsString()
    // chat:string;

    @IsInt()
    price:number;

    @IsString()
    clientName: string;

    @IsEmail()
    clientEmail: string;
    
    // @IsString()
    // products: string 

}