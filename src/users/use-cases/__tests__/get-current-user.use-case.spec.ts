import { GetCurrentUserUseCase } from '../get-current-user.use-case';
import { InMemoryUsersRepository } from '../../../auth/use-cases/__tests__/in-memory-users.repository';
import { UnauthorizedException } from '@nestjs/common';

describe('GetCurrentUserUseCase', () => {
  it('deve retornar dados do usuário', async () => {
    const repo = new InMemoryUsersRepository();
    const user = await repo.create({ email: 'user@stark.com', password: '123' });
    const useCase = new GetCurrentUserUseCase(repo);

    const result = await useCase.execute(user.id);
    expect(result.email).toBe('user@stark.com');
  });

  it('deve lançar Unauthorized se usuário não existir', async () => {
    const repo = new InMemoryUsersRepository();
    const useCase = new GetCurrentUserUseCase(repo);
    await expect(useCase.execute('invalid')).rejects.toBeInstanceOf(UnauthorizedException);
  });
}); 