import { DeleteActivityUseCase } from '../delete-activity.use-case';
import { InMemoryActivitiesRepository } from './in-memory-activities.repository';
import { NotFoundException } from '@nestjs/common';

describe('DeleteActivityUseCase', () => {
  it('deve deletar atividade', async () => {
    const repo = new InMemoryActivitiesRepository();
    const act = await repo.create({ name: 'Run', duration: 20, intensity: 'Alta', userId: 'u1' });
    const useCase = new DeleteActivityUseCase(repo);
    await useCase.execute(act.id, 'u1');
    expect(await repo.findById(act.id, 'u1')).toBeNull();
  });

  it('deve lançar NotFound se inexistente', async () => {
    const repo = new InMemoryActivitiesRepository();
    const useCase = new DeleteActivityUseCase(repo);
    await expect(useCase.execute('invalid', 'u1')).rejects.toBeInstanceOf(NotFoundException);
  });
}); 