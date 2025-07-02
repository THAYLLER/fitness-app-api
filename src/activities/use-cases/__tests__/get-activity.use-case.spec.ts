import { GetActivityUseCase } from '../get-activity.use-case';
import { InMemoryActivitiesRepository } from './in-memory-activities.repository';
import { NotFoundException } from '@nestjs/common';

describe('GetActivityUseCase', () => {
  it('deve retornar atividade', async () => {
    const repo = new InMemoryActivitiesRepository();
    const act = await repo.create({ name: 'Run', duration: 20, intensity: 'Alta', userId: 'u1' });
    const useCase = new GetActivityUseCase(repo);
    const found = await useCase.execute(act.id, 'u1');
    expect(found.id).toBe(act.id);
  });

  it('deve lançar NotFound se não pertencer ou não existir', async () => {
    const repo = new InMemoryActivitiesRepository();
    const useCase = new GetActivityUseCase(repo);
    await expect(useCase.execute('invalid', 'u1')).rejects.toBeInstanceOf(NotFoundException);
  });
}); 