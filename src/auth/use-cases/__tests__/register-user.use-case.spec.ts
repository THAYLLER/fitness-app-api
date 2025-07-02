import { RegisterUserUseCase } from '../register-user.use-case';
import { InMemoryUsersRepository } from './in-memory-users.repository';
import { BadRequestException } from '@nestjs/common';

describe('RegisterUserUseCase', () => {
  it('deve registrar um usuário com sucesso', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const useCase = new RegisterUserUseCase(usersRepository);

    const response = await useCase.execute({
      email: 'user@stark.com',
      password: 'password123',
    });

    expect(response.user.email).toBe('user@stark.com');
    expect(usersRepository.users.length).toBe(1);
  });

  it('deve lançar exceção se o email já existir', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const useCase = new RegisterUserUseCase(usersRepository);

    await useCase.execute({
      email: 'user@stark.com',
      password: 'password123',
    });

    await expect(
      useCase.execute({ email: 'user@stark.com', password: 'test123' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
}); 