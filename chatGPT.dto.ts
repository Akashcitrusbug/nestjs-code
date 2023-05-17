/*external modules*/
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatGPTDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'test message' })
  message: string;
}
