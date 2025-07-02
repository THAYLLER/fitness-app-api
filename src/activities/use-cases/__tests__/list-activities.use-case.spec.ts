import { ListActivitiesUseCase } from '../list-activities.use-case';
import { InMemoryActivitiesRepository } from './in-memory-activities.repository';

describe('ListActivitiesUseCase', () => {
  it('deve listar atividades por usuário', async () => {
    const repo = new InMemoryActivitiesRepository();
    await repo.create({ name: 'A', duration: 10, intensity: 'Alta', userId: 'u1' });
    await repo.create({ name: 'B', duration: 20, intensity: 'Media', userId: 'u1' });
    await repo.create({ name: 'C', duration: 30, intensity: 'Baixa', userId: 'u2' });

    const useCase = new ListActivitiesUseCase(repo);
    const list = await useCase.execute('u1', 10, 0);
    expect(list.length).toBe(2);
  });
}); 