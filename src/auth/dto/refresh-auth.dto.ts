import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshAuthDto {
  @ApiProperty({ example: 'jwt_refresh_token' })
  @IsString()
  refreshToken: string;
} 