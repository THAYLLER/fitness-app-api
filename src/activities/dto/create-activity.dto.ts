import { IsEnum, IsInt, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ActivityIntensity {
  Baixa = 'Baixa',
  Media = 'Media',
  Alta = 'Alta',
}

export class CreateActivityDto {
  @ApiProperty({ example: 'Corrida' })
  @IsString()
  name: string;

  @ApiProperty({ example: 30 })
  @IsInt()
  @IsPositive()
  duration: number;

  @ApiProperty({ example: 'Alta', enum: ActivityIntensity })
  @IsEnum(ActivityIntensity)
  intensity: ActivityIntensity;
} 