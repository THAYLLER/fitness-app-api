import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class ChatbotMessageDto {
  @ApiProperty({ example: 'Qual o melhor treino pra hipertrofia?' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  message: string;
} 