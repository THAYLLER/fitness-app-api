import { SendMessageUseCase } from '../send-message.use-case';
import { DeepSeekService } from '../../deepseek.service';

class FakeDeepSeekService {
  async chat(message: string): Promise<string> {
    return 'Resposta mock';
  }
}

describe('SendMessageUseCase', () => {
  it('deve retornar resposta mockada', async () => {
    const useCase = new SendMessageUseCase(new FakeDeepSeekService() as unknown as DeepSeekService);
    const reply = await useCase.execute('Qual o melhor treino pra hipertrofia?');
    expect(reply).toBe('Resposta mock');
  });
}); 