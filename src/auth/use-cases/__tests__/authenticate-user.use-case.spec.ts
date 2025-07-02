import { AuthenticateUserUseCase } from '../authenticate-user.use-case';
import { InMemoryUsersRepository } from './in-memory-users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('@nestjs/jwt');

describe('AuthenticateUserUseCase', () => {
  const jwtServiceMock = {
    signAsync: jest.fn().mockResolvedValue('token'),
  } as unknown as JwtService;

  it('deve autenticar com sucesso', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const passwordHash = await bcrypt.hash('password123', 10);
    await usersRepository.create({ email: 'user@stark.com', password: passwordHash });

    const useCase = new AuthenticateUserUseCase(usersRepository, jwtServiceMock);

    const response = await useCase.execute({ email: 'user@stark.com', password: 'password123' });

    expect(response.token).toBe('token');
    expect(jwtServiceMock.signAsync).toHaveBeenCalled();
  });

  it('deve lançar exceção para credenciais inválidas', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const useCase = new AuthenticateUserUseCase(usersRepository, jwtServiceMock);

    await expect(
      useCase.execute({ email: 'invalid@user.com', password: '123456' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
}); 