import { IsNotEmpty, IsString } from 'class-validator'

export class CreateMessageDto {
  sender_id: string = 'client1'

  @IsNotEmpty()
  @IsString()
    body: string
}
