import { ApiProperty } from '@nestjs/swagger';

export class UserMeResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'user@stark.com' })
  email: string;
} 