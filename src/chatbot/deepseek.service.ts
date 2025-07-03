import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class DeepSeekService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  /** Setup retry logic */
  private setupRetry() {
    axiosRetry(this.http.axiosRef, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
    });
  }

  private initialized = false;

  async chat(message: string): Promise<string> {
    if (!this.initialized) {
      this.setupRetry();
      this.initialized = true;
    }

    const apiUrl = this.config.get<string>('DEEPSEEK_API_URL');
    const model = this.config.get<string>('DEEPSEEK_MODEL', 'deepseek-llm');
    const systemPrompt = this.config.get<string>(
      'DEEPSEEK_SYSTEM_PROMPT',
      'Você é um assistente virtual de fitness do aplicativo Fitness Tracker. Seu objetivo é fornecer recomendações seguras de treino, nutrição e recuperação a praticantes de todos os níveis. Use linguagem clara, objetiva e motivadora. Caso a pergunta seja fora do escopo fitness ou requeira aconselhamento médico, oriente o usuário a procurar um profissional de saúde. Responda sempre em português do Brasil.',
    );

    const body = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
    };

    try {
      const response = await firstValueFrom<AxiosResponse<any>>(
        this.http.post(apiUrl, body),
      );
      const reply =
        response.data?.choices?.[0]?.message?.content?.trim() ?? '';
      return reply;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao obter resposta da IA');
    }
  }
} 