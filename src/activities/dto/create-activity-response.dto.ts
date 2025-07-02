import { ApiProperty } from '@nestjs/swagger';
import { ActivityIntensity } from './create-activity.dto';

export class CreateActivityResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Corrida' })
  name: string;

  @ApiProperty({ example: 30 })
  duration: number;

  @ApiProperty({ example: 'Alta', enum: ActivityIntensity })
  intensity: ActivityIntensity;

  @ApiProperty({ example: '2025-07-01T00:00:00.000Z' })
  createdAt: Date;
} 