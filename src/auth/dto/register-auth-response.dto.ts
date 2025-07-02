import { ApiProperty } from '@nestjs/swagger';

class RegisteredUserDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'user@stark.com' })
  email: string;
}

export class RegisterAuthResponseDto {
  @ApiProperty({ example: 'Usuário registrado com sucesso.' })
  message: string;

  @ApiProperty({ type: RegisteredUserDto })
  user: RegisteredUserDto;
} 