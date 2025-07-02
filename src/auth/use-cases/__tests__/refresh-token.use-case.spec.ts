import { RefreshTokenUseCase } from '../refresh-token.use-case';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('RefreshTokenUseCase', () => {
  const validPayload = { sub: 'user-id', email: 'user@stark.com' };

  it('deve gerar novo token com refresh válido', async () => {
    const jwtServiceMock = {
      verifyAsync: jest.fn().mockResolvedValue(validPayload),
      signAsync: jest.fn().mockResolvedValue('novo_token'),
    } as unknown as JwtService;

    const useCase = new RefreshTokenUseCase(jwtServiceMock);

    const response = await useCase.execute({ refreshToken: 'valid_refresh' });

    expect(response.token).toBe('novo_token');
    expect(jwtServiceMock.verifyAsync).toHaveBeenCalledWith('valid_refresh');
  });

  it('deve lançar Unauthorized para refresh inválido', async () => {
    const jwtServiceMock = {
      verifyAsync: jest.fn().mockRejectedValue(new Error('invalid')),
      signAsync: jest.fn(),
    } as unknown as JwtService;

    const useCase = new RefreshTokenUseCase(jwtServiceMock);

    await expect(
      useCase.execute({ refreshToken: 'bad_refresh' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
}); 