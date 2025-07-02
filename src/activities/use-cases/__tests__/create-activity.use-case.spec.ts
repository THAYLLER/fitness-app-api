import { CreateActivityUseCase } from '../create-activity.use-case';
import { InMemoryActivitiesRepository } from './in-memory-activities.repository';

describe('CreateActivityUseCase', () => {
  it('deve criar atividade', async () => {
    const repo = new InMemoryActivitiesRepository();
    const useCase = new CreateActivityUseCase(repo);

    const activity = await useCase.execute({
      name: 'Corrida',
      duration: 30,
      intensity: 'Alta',
      userId: 'user-id',
    });

    expect(activity.id).toBeDefined();
    expect(repo.activities.length).toBe(1);
  });
}); 