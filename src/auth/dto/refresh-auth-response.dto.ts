import { ApiProperty } from '@nestjs/swagger';

export class RefreshAuthResponseDto {
  @ApiProperty({ example: 'novo_jwt_access_token' })
  token: string;
} 