import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginAuthResponseDto {
  @ApiProperty({ example: 'Login realizado com sucesso.' })
  message: string;

  @ApiProperty({ example: 'jwt_access_token' })
  token: string;

  @ApiPropertyOptional({ example: 'jwt_refresh_token' })
  refreshToken?: string;
} 