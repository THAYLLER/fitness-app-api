import { UpdateActivityUseCase } from '../update-activity.use-case';
import { InMemoryActivitiesRepository } from './in-memory-activities.repository';
import { NotFoundException } from '@nestjs/common';

describe('UpdateActivityUseCase', () => {
  it('deve atualizar atividade', async () => {
    const repo = new InMemoryActivitiesRepository();
    const act = await repo.create({ name: 'Run', duration: 20, intensity: 'Alta', userId: 'u1' });
    const useCase = new UpdateActivityUseCase(repo);
    const updated = await useCase.execute({ id: act.id, userId: 'u1', name: 'Caminhada', duration: 45, intensity: 'Moderada' });
    expect(updated.name).toBe('Caminhada');
  });

  it('deve lançar NotFound se não existir', async () => {
    const repo = new InMemoryActivitiesRepository();
    const useCase = new UpdateActivityUseCase(repo);
    await expect(useCase.execute({ id: 'invalid', userId: 'u1', name: 'C', duration: 1, intensity: 'Baixa' })).rejects.toBeInstanceOf(NotFoundException);
  });
}); 