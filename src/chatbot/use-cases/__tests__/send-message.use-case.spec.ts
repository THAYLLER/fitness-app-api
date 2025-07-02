import { SendMessageUseCase } from '../send-message.use-case';

describe('SendMessageUseCase', () => {
  it('deve retornar resposta mockada', async () => {
    const useCase = new SendMessageUseCase();
    const reply = await useCase.execute('Qual o melhor treino pra hipertrofia?');
    expect(reply).toContain('hipertrofia');
  });
}); 