
import { Type } from "class-transformer";
import { Order } from "../entities/order.entity";
import { OmitType } from "@nestjs/mapped-types";
import { IsString, IsBoolean, IsInt, IsEmail, IsJSON, IsArray, IsObject, ValidateNested, Min, IsNumber } from "class-validator"
import { User } from "src/socket/interfaces/orderRequest.interface";
import { EnumSteps, type TSteps} from "src/socket/interfaces/step.interface";

export class ProductDto {
    @IsString()
    name: string;
  
    @IsInt()
    @Min(1)
    quantity: number;
  
    @IsNumber()
    @Min(0)
    price: number;
  }

export class CreateOrderDto extends OmitType(Order, ["_id" as keyof Order] as const){

    @IsString()
    dealer: string;
    
    @IsBoolean()
    shipAddress: string;

    @IsBoolean()
    shopAddress: string;

    @IsInt()
    step: EnumSteps.LookingForDealer;  

    @IsObject() // Puedes utilizar un decorador para indicar que chat es un objeto
    chat: {
        id: number;
        messages: string[];
    };
    
    @IsInt()
    price:number;

    @IsString()
    clientName: string;

    @IsEmail()
    clientEmail: string;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: ProductDto[];   

}