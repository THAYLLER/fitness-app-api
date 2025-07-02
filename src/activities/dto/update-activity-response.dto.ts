import { ApiProperty } from '@nestjs/swagger';

export class UpdateActivityResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Caminhada' })
  name: string;

  @ApiProperty({ example: 45 })
  duration: number;

  @ApiProperty({ example: 'Moderada' })
  intensity: string;

  @ApiProperty({ example: '2025-07-01T00:00:00.000Z' })
  updatedAt: string;
} 