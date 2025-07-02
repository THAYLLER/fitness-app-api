import { Injectable } from '@nestjs/common';

@Injectable()
export class SendMessageUseCase {
  async execute(message: string): Promise<string> {
    // Mock reply - future integration with AI service
    return 'Para hipertrofia, foque em treinos de força, séries de 8-12 repetições e sobrecarga progressiva.';
  }
} 