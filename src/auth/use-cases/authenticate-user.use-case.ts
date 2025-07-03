import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: AuthenticateUserRequest) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    let passwordMatches = false;

    if (user.password.startsWith('$2')) {
      passwordMatches = await bcrypt.compare(password, user.password);
    } else {
      passwordMatches = password === user.password;
      if (passwordMatches) {
        const newHash = await bcrypt.hash(password, 10);
        await this.usersRepository.updatePassword(user.id, newHash);
      }
    }

    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = { sub: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      message: 'Login realizado com sucesso.',
      token,
      refreshToken,
    };
  }
} 