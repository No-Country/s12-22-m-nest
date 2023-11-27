
import { IsString, IsBoolean, IsInt, IsEmail } from "class-validator"
export class CreateOrderDto {

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