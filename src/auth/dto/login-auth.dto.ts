import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ example: 'user@stark.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'jarvisrules123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
} 