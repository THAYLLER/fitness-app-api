import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, MaxLength } from 'class-validator';

export class UpdateActivityDto {
  @ApiProperty({ example: 'Caminhada' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 45 })
  @IsInt()
  @Min(1)
  duration: number;

  @ApiProperty({ example: 'Moderada' })
  @IsString()
  @MaxLength(50)
  intensity: string;
} 