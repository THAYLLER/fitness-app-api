import { ApiProperty } from '@nestjs/swagger';

export class ChatbotReplyDto {
  @ApiProperty({ example: 'Para hipertrofia, foque em treinos de força, séries de 8-12 repetições e sobrecarga progressiva.' })
  reply: string;
} 