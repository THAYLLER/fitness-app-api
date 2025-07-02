import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';

interface RefreshTokenRequest {
  refreshToken: string;
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute({ refreshToken }: RefreshTokenRequest) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken as string);
      const { sub, email } = payload as { sub: string; email: string };
      const newToken = await this.jwtService.signAsync({ sub, email });
      return { token: newToken };
    } catch (err) {
      throw new UnauthorizedException('Refresh token inválido ou expirado.');
    }
  }
} 